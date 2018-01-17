import { IValidatable } from "./IValidatable";
export declare type TValidatorCollection = Map<IValidatable, {
    name: String;
    precondition: ((validator: any) => boolean) | null;
}>;
