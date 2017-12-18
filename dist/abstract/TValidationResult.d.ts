export declare type TValidationResult = {
    value: any;
    isValid: boolean;
    messages: {
        [fieldName: string]: Array<string>;
    };
};
