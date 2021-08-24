import { Proxify } from './types';
export default class FormProperty<T> {
    readonly name: string;
    value: Proxify<T>;
    private _value;
    private _isDirty;
    private _originalValue;
    constructor(name: string, originalValue: T);
    get isDirty(): boolean;
    reset(pristine?: boolean): void;
}
