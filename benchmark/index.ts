import { PerformanceObserver, performance } from 'perf_hooks';

import CustomerValidator from '../spec/support/validators/CustomerValidator';
import { validCustomer } from '../spec/support/instances/customer';
import { Validator } from 'src';

const simpleValidate = (validator: Validator, tick: number) => {
	const start = performance.now();
	validator.validate(validCustomer);
	const end = performance.now();
	console.log(`${tick} -> ${start}: ${end - start}`);
}

let tick = 0;
const startTest = performance.now();
console.log(`Start Time => ${startTest}`);

const syncValidator = new CustomerValidator();

while(tick ++ < 5) {
	simpleValidate(syncValidator, tick);
}

const endTest = performance.now();
console.log(`End Time => ${endTest}, Duration => ${endTest - startTest}`);

// TODO: async
const startAsyncTest = performance.now();
console.log(`Start Time => ${startAsyncTest}`);

const asyncValidator = new CustomerValidator();

const simpleValidatePromise = (validator: Validator, tick: number) => new Promise(resolve => resolve(simpleValidate(validator, tick)));

Promise.all([
	simpleValidatePromise(asyncValidator, 1),
	simpleValidatePromise(asyncValidator, 2),
	simpleValidatePromise(asyncValidator, 3),
	simpleValidatePromise(asyncValidator, 4),
	simpleValidatePromise(asyncValidator, 5),
]).then(() => {
	const endTest = performance.now();
	console.log(`End Time => ${endTest}, Duration => ${endTest - startAsyncTest}`);
})