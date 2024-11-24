import { createObservable } from './observable';

const test = {
	test: 1,
	test2: 2,
	test3: {
		test4: 3,
	},
	test5: [1, 2, 3],
}

const { observe, state } = createObservable(test);

observe('test')((newValue, oldValue) => {
	console.log('test', newValue, oldValue);
});

observe('test2')((newValue, oldValue) => {
	console.log('test2', newValue, oldValue);
});

observe('test3.test4')((newValue, oldValue) => {
	console.log('test3.test4', newValue, oldValue);
});

observe('test5[0]')((newValue, oldValue) => {
	console.log('test5[0]', newValue, oldValue);
});

state.test = 3;
state.test2 = 4;
state.test3.test4 = 5;
state.test5[0] = 6;
