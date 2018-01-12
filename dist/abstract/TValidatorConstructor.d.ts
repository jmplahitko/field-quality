import { Validator } from '../concrete/Validator';
export declare type TValidatorConstructor = new (entity: {
    [key: string]: any;
}) => Validator;
