import { Model } from '../concrete/Model';
export declare type TModelConstructor = new (entity: {
    [key: string]: any;
}) => Model;
