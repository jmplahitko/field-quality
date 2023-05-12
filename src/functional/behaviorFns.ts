import Severity from '../../src/Severity';
import { TMessageFactory, TPrecondition, IReturnRequirement } from '../../src/types';


export function as<T, U>(name: string): IReturnRequirement<T, U> {
	return req => ({ ...req, name });
}

export function asWarning<T, U>(): IReturnRequirement<T, U> {
	return req => ({ ...req, severity: Severity.warning });
}

export function cascade<T, U>(): IReturnRequirement<T, U> {
	return req => ({ ...req, stopOnFirstFailure: false });
}

export function when<T, U>(precondition: TPrecondition<T, U>): IReturnRequirement<T, U> {
	return req => ({ ...req, precondition });
}

export function withMessage<T, U>(message: TMessageFactory<T, U>): IReturnRequirement<T, U> {
	return req => ({ ...req, message });
}