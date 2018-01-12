import { Model } from '../concrete/Model';

export type TModelConstructor = new (entity: { [key: string]: any }) => Model;
