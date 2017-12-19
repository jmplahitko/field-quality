import { TModelErrorCollection } from "./TModelErrorCollection";
export declare type TModelValidationResult = {
    errors: TModelErrorCollection;
    isValid: boolean;
    value: any;
};
