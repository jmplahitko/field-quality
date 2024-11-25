import { describe, it, expect, vi } from 'vitest';
import { createObservable } from '../index';

describe('Observable', () => {
	describe('Basic Properties', () => {
		it('observes simple property changes', () => {
			const observable = createObservable({ count: 0 });
			const mock = vi.fn();

			observable.observe('count')(mock);
			observable.state.count = 1;

			expect(mock).toHaveBeenCalledWith(1, 0);
		});

		it('can observe multiple properties', () => {
			const observable = createObservable({ x: 0, y: 0 });
			const mockX = vi.fn();
			const mockY = vi.fn();

			observable.observe('x')(mockX);
			observable.observe('y')(mockY);

			observable.state.x = 1;
			observable.state.y = 2;

			expect(mockX).toHaveBeenCalledWith(1, 0);
			expect(mockY).toHaveBeenCalledWith(2, 0);
		});
	});

	describe('Nested Objects', () => {
		it('observes nested property changes', () => {
			const observable = createObservable({
				user: { name: 'John', age: 30 }
			});
			const mock = vi.fn();

			observable.observe('user.name')(mock);
			observable.state.user.name = 'Jane';

			expect(mock).toHaveBeenCalledWith('Jane', 'John');
		});
	});

	describe('Arrays', () => {
		it('observes array element changes', () => {
			const observable = createObservable({
				list: [1, 2, 3]
			});
			const mock = vi.fn();

			observable.observe('list.0')(mock);
			observable.state.list[0] = 10;

			expect(mock).toHaveBeenCalledWith(10, 1);
		});

		it('observes nested array objects', () => {
			const observable = createObservable({
				users: [{ name: 'John' }]
			});
			const mock = vi.fn();

			observable.observe('users.0.name')(mock);
			observable.state.users[0].name = 'Jane';

			expect(mock).toHaveBeenCalledWith('Jane', 'John');
		});
	});

	describe('Derived Values', () => {
		it('computes derived values', () => {
			const observable = createObservable({
				x: 1,
				y: 2
			});

			const sum = observable.derive((state) => state.x + state.y);
			expect(sum()).toBe(3);

			observable.state.x = 2;
			expect(sum()).toBe(4);
		});

		it('observes derived value changes', () => {
			const observable = createObservable({
				price: 10,
				quantity: 2
			});

			const total = observable.derive((state) =>
				state.price * state.quantity
			);
			const mock = vi.fn();

			total.observe((newValue, oldValue) => {
				console.log(newValue, oldValue);
				mock(newValue, oldValue);
			});
			observable.state.price = 20;

			expect(mock).toHaveBeenCalledWith(40, 20);
		});

		it('handles nested derived values', () => {
			const observable = createObservable({
				items: [{ price: 10 }, { price: 20 }]
			});

			const total = observable.derive((state) =>
				state.items.reduce((sum, item) => sum + item.price, 0)
			);

			expect(total()).toBe(30);

			observable.state.items[0].price = 15;
			expect(total()).toBe(35);
		});
	});

	describe('Cleanup', () => {
		it('allows unsubscribing from observations', () => {
			const observable = createObservable({ count: 0 });
			const mock = vi.fn();

			const cleanup = observable.observe('count')(mock);
			cleanup();

			observable.state.count = 1;
			expect(mock).not.toHaveBeenCalled();
		});

		it('supports one-time observations', () => {
			const observable = createObservable({ count: 0 });
			const mock = vi.fn();

			observable.observeOnce('count')(mock);

			observable.state.count = 1;
			observable.state.count = 2;

			expect(mock).toHaveBeenCalledTimes(1);
			expect(mock).toHaveBeenCalledWith(1, 0);
		});
	});
});
