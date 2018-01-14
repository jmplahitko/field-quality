import { TValidationResult } from './TValidationResult';

export interface IValidatable {
	validate(value: any, prop?: string|Array<string>): TValidationResult;
}
