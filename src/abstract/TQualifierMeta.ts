import { TPrecondition } from "./TPrecondition";

export type TQualifierMeta = {
	name: string;
	message: string;
	precondition: TPrecondition | null;
};
