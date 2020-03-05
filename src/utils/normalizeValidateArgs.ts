import copy from '../utils/copy';

export default function normalizeValidateArgs<TParentValue, TCustomOptions>(value: any, parentValue?: any, customOptions?: any): [any, TParentValue, TCustomOptions] {
	const _value = copy(value);
	const _parentValue = value;
	let _customOptions;

	if (arguments.length === 3) {
		_customOptions = customOptions;
	} else if (arguments.length === 2) {
		_customOptions = parentValue;
	}

	return [_value, _parentValue, _customOptions];
}