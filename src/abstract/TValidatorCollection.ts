import { IValidatable } from "./IValidatable";

export type TValidatorCollection = Map<IValidatable, {name: String, precondition: ((validator: any) => boolean)|null}>;