import { Rule } from '../Rule';
import { Model } from '../Model';

export type TModelConstructor = new (entity: { [key: string]: any }) => Model;
