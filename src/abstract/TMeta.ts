import { TPrecondition } from "./TPrecondition";

export type TMeta = {
	name: string;
	message: string;
	precondition: TPrecondition | null;
	isValidIfEmpty: boolean
};
