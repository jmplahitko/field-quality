import { TValidationResult } from './TValidationResult';

import { Field } from '../concrete/Field';

export interface IValidatable {
	value: any;
	isSerializable: boolean;
	get(fieldName?: string): any;
	set(fieldNameOrValue: any, value?: any): TValidationResult;
	serialize(): Object;
	setValidity(result: TValidationResult): void;
	validate(): TValidationResult;
}
