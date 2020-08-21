import { PerformanceObserver, performance } from 'perf_hooks';

import CustomerValidator from '../spec/support/validators/CustomerValidator';
import CustomerValidator1x from './field-quality-1x/validators/CustomerValidator';
import { validCustomer, invalidPhoneContactCustomer } from '../spec/support/instances/customer';
import { Validator } from '../src';
import { Validator as Validator1x } from './field-quality-1x/dist';

const simpleValidate = (validator: Validator | Validator1x, tick: number, valid: boolean = true) => {
	const start = performance.now();
	validator.validate(valid ? validCustomer : invalidPhoneContactCustomer);
	const end = performance.now();
	console.log(`${tick} -> ${start}: ${end - start}`);
}

const runPerformanceTestFor = (testName: string, syncValidator: Validator | Validator1x) => {
	let tick = 0;
	const startTest = performance.now();
	console.log(`${testName}: Start Time => ${startTest}`);

	// while(tick ++ < 5) {
	// 	simpleValidate(syncValidator, tick);
	// }

	simpleValidate(syncValidator, tick);
	simpleValidate(syncValidator, tick, false);

	const endTest = performance.now();
	console.log(`${testName}: End Time => ${endTest}, Duration => ${endTest - startTest}`);
}

runPerformanceTestFor('1.x', new CustomerValidator1x());
// @ts-ignore
runPerformanceTestFor('2.x', new CustomerValidator());


// TODO: async
// const startAsyncTest = performance.now();
// console.log(`Start Time => ${startAsyncTest}`);

// const asyncValidator = new CustomerValidator();

// const simpleValidatePromise = (validator: Validator, tick: number) => new Promise(resolve => resolve(simpleValidate(validator, tick)));

// Promise.all([
// 	simpleValidatePromise(asyncValidator, 1),
// 	simpleValidatePromise(asyncValidator, 2),
// 	simpleValidatePromise(asyncValidator, 3),
// 	simpleValidatePromise(asyncValidator, 4),
// 	simpleValidatePromise(asyncValidator, 5),
// ]).then(() => {
// 	const endTest = performance.now();
// 	console.log(`End Time => ${endTest}, Duration => ${endTest - startAsyncTest}`);
// });