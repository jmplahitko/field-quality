export declare type TQualifierMeta = {
    name: string;
    message: string;
    precondition: ((entity: any) => boolean) | null;
};
