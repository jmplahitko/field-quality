import copy from '../utils/copy';

export default function normalizeValidateArgs(value: any, parentValue?: any, customOptions?: any): any[] {
	value = copy(value);

	if (arguments.length === 3) {
		parentValue = copy(arguments[1]);
		customOptions = copy(arguments[2]);
	} else if (arguments.length === 2) {
		parentValue = undefined;
		customOptions = copy(arguments[1]);
	}

	return [value, parentValue, customOptions];
}