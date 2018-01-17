import { quality } from './quality';

const { isArray, isBufferArray, isBlankObject, isFunction, isObject, isTypedArray, isWindow } = quality;
const hasOwnProperty = Object.prototype.hasOwnProperty;

export default function copy(source: any, destination?: any) {
	let stackSource: Array<any> = [];
	let stackDest: Array<any> = [];

	if (destination) {
		if (isTypedArray(destination) || isBufferArray(destination)) {
			throw new Error('copy: TypedArray destination cannot be mutated');
		}
		if (source === destination) {
			throw new Error('copy: Source and destination are identical.');
		}

		// Empty the destination object
		if (isArray(destination)) {
			destination.length = 0;
		} else {
			Object.keys(destination).forEach((key) => {
				if (key !== '$$hashKey') {
					delete destination[key];
				}
			});
		}

		stackSource.push(source);
		stackDest.push(destination);
		return copyRecurse(source, destination);
	}

	return copyElement(source);

	function copyRecurse(source: any, destination: any) {
		var h = destination.$$hashKey;
		var key;
		if (isArray(source)) {
			for (var i = 0, ii = source.length; i < ii; i++) {
				destination.push(copyElement(source[i]));
			}
		} else if (isBlankObject(source)) {
			// createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
			for (key in source) {
				destination[key] = copyElement(source[key]);
			}
		} else if (source && typeof source.hasOwnProperty === 'function') {
			// Slow path, which must rely on hasOwnProperty
			for (key in source) {
				if (source.hasOwnProperty(key)) {
					destination[key] = copyElement(source[key]);
				}
			}
		} else {
			// Slowest path --- hasOwnProperty can't be called as a method
			for (key in source) {
				if (hasOwnProperty.call(source, key)) {
					destination[key] = copyElement(source[key]);
				}
			}
		}

		return destination;
	}

	function copyElement(source: any): any {
		// Simple values
		if (!isObject(source) && !isArray(source)) {
			return source;
		}

		// Already copied values
		var index = stackSource.indexOf(source);
		if (index !== -1) {
			return stackDest[index];
		}

		if (isWindow(source)) {
			throw new Error('copy: Cannot making copies of Window.');
		}

		var needsRecurse = false;
		var destination = copyType(source);

		if (destination === undefined) {
			destination = isArray(source) ? [] : Object.create(Object.getPrototypeOf(source));
			needsRecurse = true;
		}

		stackSource.push(source);
		stackDest.push(destination);

		return needsRecurse ? copyRecurse(source, destination) : destination;
	}

	function copyType(source: any) {
		switch (Object.prototype.toString.call(source)) {
			case '[object Int8Array]':
			case '[object Int16Array]':
			case '[object Int32Array]':
			case '[object Float32Array]':
			case '[object Float64Array]':
			case '[object Uint8Array]':
			case '[object Uint8ClampedArray]':
			case '[object Uint16Array]':
			case '[object Uint32Array]':
				return new source.constructor(copyElement(source.buffer), source.byteOffset, source.length);

			case '[object ArrayBuffer]':
				//Support: IE10
				if (!source.slice) {
					var copied = new ArrayBuffer(source.byteLength);
					new Uint8Array(copied).set(new Uint8Array(source));
					return copied;
				}
				return source.slice(0);

			case '[object Boolean]':
			case '[object Number]':
			case '[object String]':
			case '[object Date]':
				return new source.constructor(source.valueOf());

			case '[object RegExp]':
				var re = new RegExp(source.source, source.toString().match(/[^\/]*$/)[0]);
				re.lastIndex = source.lastIndex;
				return re;

			case '[object Blob]':
				return new source.constructor([source], { type: source.type });
		}

		if (isFunction(source.cloneNode)) {
			return source.cloneNode(true);
		}
	}
}