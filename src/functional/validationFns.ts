import pipe from 'ramda/src/pipe';

import Severity from '../Severity';
import { IValidatable, TMessageFactory, TPredicate, Requirement, TPrecondition, RequirementType, IReturnRequirement } from '../types';
import {
	length as _length,
	max as _max,
	min as _min,
	notNull as _notNull,
	notEmpty as _notEmpty,
	beValidEnum,
	match
} from '../utils/predicates';
import { isEmpty, isNull } from '../utils/quality';
import { wrapPredicate } from '../utils/wrapPredicate';

function __def<T, U>() {
	const req: Requirement<T, U> = {
		name: '',
		message: null,
		precondition: null,
		isValidIfEmpty: false,
		severity: Severity.default,
		stopOnFirstFailure: true,
		type: RequirementType.validation,
		validate: () => ({ isValid: true })
	};

	return req;
};

export function composeRequirement<T, U>(
	behaviors: IReturnRequirement<T, U>[],
	requirement: Partial<Requirement<T, U>>,
): Requirement<T, U> {
	let req: Requirement<T, U> = {
		...__def(),
		...requirement
	}

	req = isEmpty(behaviors)
		? req
		// @ts-ignore
		: pipe(...behaviors)(req) as Requirement<T, U>;

	return req;
}

export function enumerable<T, U>(allowedValues: Array<string|number>, ...behaviors: IReturnRequirement<T, U>[]): IReturnRequirement<T, U> {
	return ({ name }) => composeRequirement(behaviors, {
		name: `beEnumeratedValue`,
		isValidIfEmpty: true,
		message: () =>  `${name} must be one of the following: "${allowedValues.join(', ')}".`,
		validate: wrapPredicate<T, U>(beValidEnum(allowedValues))
	});
}

export function length<T, U>(range: [number, number], ...behaviors: IReturnRequirement<T, U>[]): IReturnRequirement<T, U> {
	return ({ name }) => composeRequirement(behaviors, {
		name: `beBetween${range[0]}and${range[1]}`,
		message: () =>  `${name} must be between ${range[0]} and ${range[1]}.`,
		validate: wrapPredicate<T, U>(_length(range[0], range[1]))
	});
}

export function lengthOrEmpty<T, U>(range: [number, number], ...behaviors: IReturnRequirement<T, U>[]): IReturnRequirement<T, U> {
	return ({ name }) => composeRequirement(behaviors, {
		isValidIfEmpty: true,
		name: `beBetween${range[0]}and${range[1]}OrEmpty`,
		message: () =>  `${name} must be between ${range[0]} and ${range[1]}.`,
		validate: wrapPredicate<T, U>(_length(range[0], range[1]))
	});
}

export function matches<T, U>(rx: RegExp, ...behaviors: IReturnRequirement<T, U>[]): IReturnRequirement<T, U> {
	return ({ name }) => composeRequirement(behaviors, {
		isValidIfEmpty: true,
		name: 'match',
		message: () =>  `${name} is an invalid format.`,
		validate: wrapPredicate<T, U>((val: any) => isNull(val) || match(rx)(val))
	});
}

export function notEmpty<T, U>(...behaviors: IReturnRequirement<T, U>[]): IReturnRequirement<T, U> {
	return ({ name }) => composeRequirement(behaviors, {
		name: _notEmpty.name,
		message: () =>  `${name} cannot be empty.`,
		validate: wrapPredicate<T, U>(_notEmpty)
	});
}

export function notNull<T, U>(...behaviors: IReturnRequirement<T, U>[]): IReturnRequirement<T, U> {
	return ({ name }) => composeRequirement<T, U>(behaviors, {
		name: _notNull.name,
		message: () => `${name} cannot be null.`,
		validate: wrapPredicate<T, U>(_notNull)
	});
}

export function max<T, U>(num: number, ...behaviors: IReturnRequirement<T, U>[]): IReturnRequirement<T, U> {
	return ({ name }) => composeRequirement(behaviors, {
		name: 'beLessThanOrEqual',
		message: () =>  `${name} cannot be greater than or equal to ${num}.`,
		validate: wrapPredicate<T, U>(_max(num))
	});
}

export function maxExclusiveOf<T, U>(num: number, ...behaviors: IReturnRequirement<T, U>[]): IReturnRequirement<T, U> {
	return ({ name }) => composeRequirement(behaviors, {
		name: 'beLessThan',
		message: () =>  `${name} cannot be greater than ${num}.`,
		validate: wrapPredicate<T, U>(_max(num - 1))
	});
}

export function min<T, U>(num: number, ...behaviors: IReturnRequirement<T, U>[]): IReturnRequirement<T, U> {
	return ({ name }) => composeRequirement(behaviors, {
		name: 'beGreaterThanOrEqual',
		message: () =>  `${name} cannot be less than or equal to ${num}.`,
		validate: wrapPredicate<T, U>( _min(num))
	});
}

export function minExclusiveOf<T, U>(num: number, ...behaviors: IReturnRequirement<T, U>[]): IReturnRequirement<T, U> {
	return ({ name }) => composeRequirement(behaviors, {
		name: 'beGreaterThan',
		message: () =>  `${name} cannot be less than ${num}.`,
		validate: wrapPredicate<T, U>(_min(num + 1))
	});
}

export function must<T, U>(predicate: TPredicate<T, U>, ...behaviors: IReturnRequirement<T, U>[]): IReturnRequirement<T, U> {
	return ({ name }) => composeRequirement(behaviors, {
		name: predicate.name ?? must,
		message: () =>  `${name} is invalid.`,
		validate: wrapPredicate<T, U>(predicate)
	});
}

export function using<T, U>(validatable: IValidatable<T, U>, ...behaviors: IReturnRequirement<T, U>[]): IReturnRequirement<T, U> {
	return ({ name }) => composeRequirement(behaviors, {
		name: name ?? validatable.propertyName ?? '',
		validate: validatable.validate
	});
}