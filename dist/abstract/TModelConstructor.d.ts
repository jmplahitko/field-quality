import { Rule } from "../Rule";
import { Model } from "../Model";
export declare type TModelConstructor = new (entity: {
    [key: string]: any;
}, _rule?: Rule) => Model;
