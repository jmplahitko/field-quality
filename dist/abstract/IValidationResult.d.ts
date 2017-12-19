import { TFieldErrorCollection } from "./TFieldErrorCollection";
import { TModelErrorCollection } from "./TModelErrorCollection";
export interface IValidationResult {
    errors: TFieldErrorCollection | TModelErrorCollection;
    isValid: boolean;
    value: any;
}
