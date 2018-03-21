import { quality } from './quality';
const { isObject } = quality;

export default function getProperty(obj: any, prop: string): any {
	if (!isObject(obj)) {
		return;
	}

	if (obj.hasOwnProperty(prop)) {
		return obj[prop];
	} else {
		let props = prop.split('.');
		if (props.length > 1) {
			if (obj.hasOwnProperty(props[0])) {
				return getProperty(obj[props[0]], props.slice(1).join('.'));
			} else {
				return undefined;
			}
		} else {
			return undefined;
		}
	}
}