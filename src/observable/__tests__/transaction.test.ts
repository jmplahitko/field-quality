import { describe, it, expect, vi } from 'vitest';
import { createObservable } from '../index';

describe('Observable Transactions', () => {
	it('should batch multiple changes into a single notification', () => {
		const initial = { count: 0, name: 'test' };
		const observable = createObservable(initial);
		const onChange = vi.fn();

		observable.observe('count')(onChange);

		observable.transaction(() => {
			observable.state.count = 1;
			observable.state.count = 2;
			observable.state.count = 3;
		});

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toHaveBeenCalledWith(3, 0);
	});

	it('should rollback changes on error', () => {
		const initial = { count: 0 };
		const observable = createObservable(initial);

		expect(() => {
			observable.transaction(() => {
				observable.state.count = 42;
				throw new Error('oops');
			});
		}).toThrow('oops');

		expect(observable.state.count).toBe(0);
	});

	it('should not allow nested transactions', () => {
		const observable = createObservable({ value: 0 });

		expect(() => {
			observable.transaction(() => {
				observable.transaction(() => {
					observable.state.value = 1;
				});
			});
		}).toThrow('Nested transactions are not supported');
	});

	it('should handle multiple observers during a transaction', () => {
		const initial = { user: { name: 'Alice', age: 30 } };
		const observable = createObservable(initial);
		const nameObserver = vi.fn();
		const ageObserver = vi.fn();

		observable.observe('user.name')(nameObserver);
		observable.observe('user.age')(ageObserver);

		observable.transaction(() => {
			observable.state.user.name = 'Bob';
			observable.state.user.age = 31;
		});

		expect(nameObserver).toHaveBeenCalledTimes(1);
		expect(nameObserver).toHaveBeenCalledWith('Bob', 'Alice');
		expect(ageObserver).toHaveBeenCalledTimes(1);
		expect(ageObserver).toHaveBeenCalledWith(31, 30);
	});

	it('should update derivations only once after transaction', () => {
		const initial = { x: 1, y: 2 };
		const observable = createObservable(initial);
		const derived = observable.derive(state => state.x + state.y);
		const derivedObserver = vi.fn();

		derived.observe(derivedObserver);

		observable.transaction(() => {
			observable.state.x = 10;
			observable.state.y = 20;
		});

		expect(derivedObserver).toHaveBeenCalledTimes(1);
		expect(derivedObserver).toHaveBeenCalledWith(30, 3);
	});

	it('should handle array mutations within transaction', () => {
		let ct = 0;
		const initial = { items: [1, 2, 3] };
		const observable = createObservable(initial);
		const observer = vi.fn()

		observable.observe('items')(observer);

		observable.transaction(() => {
			observable.state.items.push(4);
			observable.state.items.pop();
			observable.state.items.unshift(0);
		});

		expect(observer).toHaveBeenCalledTimes(1);
		expect(observable.state.items).toEqual([0, 1, 2, 3]);
	});

	it('should handle deep nested object changes', () => {
		const initial = {
			company: {
				departments: {
					engineering: {
						employees: ['Alice']
					}
				}
			}
		};
		const observable = createObservable(initial);
		const observer = vi.fn();
		const observer2 = vi.fn();

		observable.observe('company.departments.engineering.employees')(observer);
		observable.observe('company.departments.engineering.employees.1')(observer2);

		observable.transaction(() => {
			observable.state.company.departments.engineering.employees.push('Bob');
			observable.state.company.departments.engineering.employees[0] = 'Carol';
		});


		expect(observer2).toHaveBeenCalledTimes(1);
		expect(observer).toHaveBeenCalledTimes(1);
		expect(observable.state.company.departments.engineering.employees)
			.toEqual(['Carol', 'Bob']);
	});

	it('should maintain object references when transaction succeeds', () => {
		const initial = { nested: { value: 1 } };
		const observable = createObservable(initial);
		const originalNested = observable.state.nested;

		observable.transaction(() => {
			observable.state.nested.value = 2;
		});

		expect(observable.state.nested).toBe(originalNested);
		expect(observable.state.nested.value).toBe(2);
	});
});