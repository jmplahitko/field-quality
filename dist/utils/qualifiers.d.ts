export declare namespace qualifiers {
    function length(num1: number, num2: number): (value: any) => boolean;
    function match(rx: RegExp): (value: any) => boolean;
    function notNull(value: any): boolean;
    function notEmpty(value: any): boolean;
}
