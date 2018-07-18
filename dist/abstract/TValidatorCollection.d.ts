import { IValidatable } from "./IValidatable";
import { TPrecondition } from "./TPrecondition";
export declare type TValidatorCollection = Map<IValidatable, {
    name: String;
    precondition: TPrecondition | null;
}>;
