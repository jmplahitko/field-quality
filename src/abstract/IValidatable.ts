import { Field } from '../Field';
import { TValidationResult } from './TValidationResult';

export interface IValidatable {
	value: any;
	get(fieldName?: string): any;
	set(fieldNameOrValue: any, value?: any): TValidationResult;
	setValidity(result: TValidationResult): void;
	validate(): TValidationResult;
}
