import { bench, describe } from 'vitest';
import { createObservable } from '../index';

describe('Performance Comparison Benchmarks', () => {
	const ITERATIONS = 10000;

	bench('write speed', () => {
		const store = createObservable({ count: 0 });
		for (let i = 0; i < ITERATIONS; i++) {
			store.state.count++;
		}
	});

	bench('read speed', () => {
		const store = createObservable({ count: 0 });
		for (let i = 0; i < ITERATIONS; i++) {
			const value = store.state.count;
		}
	});

	bench('observer notification', () => {
		const store = createObservable({ value: 0 });
		const observers = Array.from({ length: 100 }, () => () => { });
		observers.forEach(obs => store.observe('value')(obs));

		for (let i = 0; i < 100; i++) {
			store.state.value++;
		}
	});

	bench('computed chain', () => {
		const store = createObservable({ count: 0 });
		const d1 = store.derive(s => s.count + 1);
		const d2 = store.derive(s => d1() + 1);
		const d3 = store.derive(s => d2() + 1);

		for (let i = 0; i < 1000; i++) {
			store.state.count++;
			d3();
		}
	});

	bench('nested updates', () => {
		const store = createObservable({
			items: Array.from({ length: 1000 }, (_, i) => ({
				nested: { value: i }
			}))
		});

		store.transaction(() => {
			for (let i = 0; i < 100; i++) {
				store.state.items[i].nested.value++;
			}
		});
	});
});