import pipe from 'ramda/src/pipe';
import getMemberPath from '../../utils/getMemberPath';
import { TSelector, Requirement, IReturnRequirement, RequirementType } from '../../types';
import copy from '../../utils/copy';
import ValidationResultList from '../../ValidationResultList';
import { isEmpty } from 'ramda';
import Severity from '../../Severity';
import ValidationResult from '../../ValidationResult';

function aggregateRequirements<T, U>(reqs: Requirement<T, U>[]): Record<RequirementType, Requirement<T, U>[]> {
	return {
		[RequirementType.behavioral]: reqs.filter(r => r.type === RequirementType.behavioral),
		[RequirementType.validation]: reqs.filter(r => r.type === RequirementType.validation),
	}
}

export function ruleFor<TParentValue, TCustomOptions = unknown>(
	selector: TSelector<TParentValue>,
	...requirements: IReturnRequirement<TParentValue, TCustomOptions>[]
): Requirement<TParentValue, TCustomOptions> {
	let self: Requirement<TParentValue, TCustomOptions> = {
		name: getMemberPath(selector),
		message: null,
		precondition: null,
		isValidIfEmpty: false,
		severity: Severity.default,
		stopOnFirstFailure: true,
		type: RequirementType.validation,
	};

	const reqs = aggregateRequirements(requirements.map(x => x(self)));

	self = isEmpty(reqs.behavioral)
		? self
		// @ts-ignore
		: pipe(...reqs.behavioral)(self) as Requirement<TParentValue, TCustomOptions>;

	return {
		...self,
		validate(v: any, p: TParentValue, c?: TCustomOptions) {
			v = copy(v);
			p = copy(p);

			const results = new ValidationResultList([], self.name, v);
			const result = new ValidationResult(self.name, v);

			for (let requirement of reqs.validation) {
				if (isEmpty(v) && requirement.isValidIfEmpty) {
					continue;
				}

				if (!requirement.precondition || requirement.precondition(p, c)) {
					const isValid = requirement.validate?.(v, p, c).isValid ?? true;

					if (!isValid) {
						const message = requirement.message?.(v, p, c) ?? '';

						if (requirement.severity === Severity.error) {
							result.errors[requirement.name] = message;

							// Short-circuit if we have to stopOnFirstFailure
							if (self.stopOnFirstFailure) {
								break;
							}
						} else {
							result.warnings[requirement.name] = message;
						}
					}
				}
			}

			results.push(result);

			return results;
		}
	}
}