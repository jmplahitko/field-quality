import { Validator } from '../concrete/Validator';

export type TValidatorConstructor = new (entity: { [key: string]: any }) => Validator;
