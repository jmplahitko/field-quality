import { TFieldErrorCollection } from "./TFieldErrorCollection";
export declare type TModelErrorCollection = {
    [fieldName: string]: TFieldErrorCollection | TModelErrorCollection;
};
