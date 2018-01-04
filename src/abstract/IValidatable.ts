import { Field } from '../Field';
import { TValidationResult } from './TValidationResult';

export interface IValidatable {
	value: any;
	isSerializable: boolean;
	get(fieldName?: string): any;
	set(fieldNameOrValue: any, value?: any): TValidationResult;
	serialize(): Object;
	setValidity(result: TValidationResult): void;
	validate(): TValidationResult;
}
