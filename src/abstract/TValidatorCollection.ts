import { IValidatable } from "./IValidatable";
import { TPrecondition } from "./TPrecondition";

export type TValidatorCollection = Map<IValidatable, {name: String, precondition: TPrecondition|null}>;