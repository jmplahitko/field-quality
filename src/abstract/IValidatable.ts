import ValidationResultList from '../concrete/ValidationResultList'

export interface IValidatable {
	name?: string;
	validate(value: any, parentValue?: any, customOptions?: any): ValidationResultList;
}
