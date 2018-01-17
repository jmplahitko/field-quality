import { TValidationResult } from './TValidationResult';

export interface IValidatable {
	name: string;
	validate(value: any, prop?: string|Array<string>): TValidationResult;
}
