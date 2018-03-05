export declare const qualifiers: {
    beBoolean: (value: any) => boolean;
    beInRange: (num1: number, num2: number) => (value: any) => boolean;
    beValidEnum: (arr: (string | number)[]) => (value: any) => boolean;
    length: (num1: number, num2: number) => (value: any) => boolean;
    match: (rx: RegExp) => (value: any) => boolean;
    notNull: (value: any) => boolean;
    notEmpty: (value: any) => boolean;
};
