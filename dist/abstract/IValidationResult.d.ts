import { TMessages } from "./TMessages";
export interface IValidationResult {
    value: any;
    isValid: boolean;
    messages: TMessages;
}
