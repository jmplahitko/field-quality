export declare type TValidationResult = {
    isValid: boolean;
    messages: {
        [fieldName: string]: Array<string>;
    };
};
