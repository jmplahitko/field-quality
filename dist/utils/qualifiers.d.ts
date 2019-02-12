declare function beBoolean(value: any): boolean;
declare function beInRange(num1: number, num2: number): (value: any) => boolean;
declare function beValidEnum(arr: Array<string | number>): (value: any) => boolean;
declare function length(num1: number, num2: number): (value: any) => boolean;
declare function lengthOrEmpty(num1: number, num2: number): (value: any) => boolean;
declare function match(rx: RegExp): (value: any) => boolean;
declare function notNull(value: any): boolean;
declare function notEmpty(value: any): boolean;
export declare const qualifiers: {
    beBoolean: typeof beBoolean;
    beInRange: typeof beInRange;
    beValidEnum: typeof beValidEnum;
    length: typeof length;
    lengthOrEmpty: typeof lengthOrEmpty;
    match: typeof match;
    notNull: typeof notNull;
    notEmpty: typeof notEmpty;
};
export {};
