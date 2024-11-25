import { bench, describe } from 'vitest';
import { createObservable } from '../index';

describe('Observable Performance', () => {
	const complexData = {
		simple: 'value',
		nested: { value: 'test' },
		array: [{ value: 'test' }],
		deepArray: [[{ value: 'test' }]],
		list: Array.from({ length: 1000 }, (_, i) => ({ id: i, value: `item${i}` }))
	};

	bench('create observable with complex data', () => {
		createObservable(complexData);
	});

	bench('register 1000 simple observers', () => {
		const observable = createObservable(complexData);
		for (let i = 0; i < 1000; i++) {
			observable.observe('simple')(() => { });
		}
	});

	bench('register and cleanup 1000 observers', () => {
		const observable = createObservable(complexData);
		const cleanups: (() => void)[] = [];

		for (let i = 0; i < 1000; i++) {
			cleanups.push(observable.observe('simple')(() => { }));
		}

		cleanups.forEach(cleanup => cleanup());
	});

	bench('update with 1000 observers', () => {
		const observable = createObservable(complexData);
		for (let i = 0; i < 1000; i++) {
			observable.observe('simple')(() => { });
		}
		observable.state.simple = 'new value';
	});

	bench('array operations with observers', () => {
		const observable = createObservable(complexData);
		observable.observe('list[0].value')(() => { });
		observable.observe('list')(() => { });

		observable.state.list.push({ id: 1001, value: 'new' });
		observable.state.list[0].value = 'updated';
		observable.state.list.pop();
	});

	bench('nested path updates', () => {
		const observable = createObservable(complexData);
		observable.observe('nested.value')(() => { });
		observable.observe('array[0].value')(() => { });
		observable.observe('deepArray[0][0].value')(() => { });

		observable.state.nested.value = 'new';
		observable.state.array[0].value = 'new';
		observable.state.deepArray[0][0].value = 'new';
	});

	bench('concurrent updates', () => {
		const observable = createObservable(complexData);
		const paths = ['simple', 'nested.value', 'array[0].value'];

		paths.forEach(path => {
			observable.observe(path)(() => { });
		});

		Promise.all(paths.map((_, i) => {
			observable.state.simple = `value${i}`;
			observable.state.nested.value = `value${i}`;
			observable.state.array[0].value = `value${i}`;
		}));
	});
}); 