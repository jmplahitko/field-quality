import { createObservable } from './observable';

// const test = {
// 	test: 1,
// 	test2: 2,
// 	test3: {
// 		test4: 3,
// 	},
// 	test5: [1, 2, 3],
// 	test6: [
// 		{
// 			test7: 4,
// 		},
// 		{
// 			test7: 5,
// 		},
// 	],
// };

// const { observe, state, derive } = createObservable(test);

// const sum = derive((_state) => _state.test + _state.test2);

// sum.observe((newValue, oldValue) => {
// 	console.log('sum', newValue, oldValue);
// });

// console.log(sum())

// observe('test')((newValue, oldValue) => {
// 	console.log('test', newValue, oldValue);
// });

// observe('test2')((newValue, oldValue) => {
// 	console.log('test2', newValue, oldValue);
// });

// observe('test3.test4')((newValue, oldValue) => {
// 	console.log('test3.test4', newValue, oldValue);
// });

// observe('test5')((newValue, oldValue) => {
// 	console.log('test5', newValue, oldValue);
// });

// observe('test5.0')((newValue, oldValue) => {
// 	console.log('test5.0', newValue, oldValue);
// });

// observe('test6.0')((newValue, oldValue) => {
// 	console.log('test6.0', newValue, oldValue);
// });

// observe('test6.0.test7')((newValue, oldValue) => {
// 	console.log('test6.0.test7', newValue, oldValue);
// });

// state.test = 3;
// state.test2 = 4;
// state.test3.test4 = 5;
// state.test5[0] = 6;
// state.test6[0].test7 = 7;

const observable = createObservable({
	price: 10,
	quantity: 2
});

const total = observable.derive((state) =>
	state.price * state.quantity
);
// const mock = vi.fn();

total.observe((newValue, oldValue) => {
	console.log(newValue, oldValue);
	// mock(newValue, oldValue);
});
observable.state.price = 20;

// expect(mock).toHaveBeenCalledWith(40, 20);
