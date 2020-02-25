import { TPrecondition } from './TPrecondition';
import Severity from './Severity';

export type TMeta = {
	name: string;
	message: string;
	precondition: TPrecondition | null;
	isValidIfEmpty: boolean;
	severity: Severity;
};
