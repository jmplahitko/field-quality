import 'jasmine';

import normalizeValidateArgs from '../src/utils/normalizeValidateArgs';

describe('normalizeValidateArgs', () => {
	it('should return all arguments in order when given 3 arguments', () => {
		const [value, parentValue, customOptions] = normalizeValidateArgs(1, 2, 3);
		expect(value).toBe(1);
		expect(parentValue).toBe(2);
		expect(customOptions).toBe(3);
	});

	it('should return second parameter as customOptions when given 2 arguments', () => {
		const [value, parentValue, customOptions] = normalizeValidateArgs(1, 2);
		expect(value).toBe(1);
		expect(parentValue).toBe(undefined);
		expect(customOptions).toBe(2);
	});

	it('should return undefined parentValue and customOptions when given 1 argument', () => {
		const [value, parentValue, customOptions] = normalizeValidateArgs(1);
		expect(value).toBe(1);
		expect(parentValue).toBe(undefined);
		expect(customOptions).toBe(undefined);
	});
});


import ValidationResultList from '../src/concrete/ValidationResultList';
import ValidationResult from '../src/concrete/ValidationResult';

const validationResult1 = new ValidationResult('test1', 1);
const validationResult2 = new ValidationResult('test2', 2);
const validationResult3 = new ValidationResult('test3', 3);
const validationResult4 = new ValidationResult('test4', 4);

validationResult1.errors['beValid'] = 'Must be valid';
validationResult2.errors['beValid'] = 'Must be valid';
validationResult3.warnings['shouldBeValid'] = 'Should be valid';
validationResult4.warnings['shouldBeValid'] = 'Should be valid';

const validationResults = [
	validationResult1,
	validationResult2,
	validationResult3,
	validationResult4,
];

describe('ValidationResult', () => {
	it('should have a propertyName', () => {
		expect(validationResult1.propertyName).toBe('test1');
		expect(validationResult2.propertyName).toBe('test2');
		expect(validationResult3.propertyName).toBe('test3');
		expect(validationResult4.propertyName).toBe('test4');
	});
	it('should have a value', () => {
		expect(validationResult1.value).toBe(1);
		expect(validationResult2.value).toBe(2);
		expect(validationResult3.value).toBe(3);
		expect(validationResult4.value).toBe(4);
	});
	it('should report correct validity', () => {
		expect(validationResult1.isValid).toBe(false);
		expect(validationResult2.isValid).toBe(false);
		expect(validationResult3.isValid).toBe(true);
		expect(validationResult4.isValid).toBe(true);
	});
	it('should count errors correctly', () => {
		expect(validationResult1.errorCount).toBe(1);
		expect(validationResult2.errorCount).toBe(1);
		expect(validationResult3.errorCount).toBe(0);
		expect(validationResult4.errorCount).toBe(0);
	});
	it('should count warnings correctly', () => {
		expect(validationResult1.warningCount).toBe(0);
		expect(validationResult2.warningCount).toBe(0);
		expect(validationResult3.warningCount).toBe(1);
		expect(validationResult4.warningCount).toBe(1);
	});
	it('should not merge the same instance into itself', () => {
		let result = new ValidationResult('test1', 1);
		expect(() => result.merge(result)).toThrow();
	});
	it('should not break reference from itself when merging another ValidationResult', () => {
		let result1 = new ValidationResult('test1', 1);
		let result2 = new ValidationResult('test1', 1);
		let merged = result1.merge(result2);
		expect(merged).toBe(result1);
	});
});

let results = new ValidationResultList('test', null, validationResults);

describe('ValidationResultList', () => {
	it('should report correct validity', () => {
		expect(results.isValid === false);
	});
	it('should report results with errors correctly', () => {
		expect(results.withErrors.length === 2);
	});
	it('should report results with warnings correctly', () => {
		expect(results.withWarnings.length === 2);
	});
	it('should get a specific ValidationResult', () => {
		const test1 = results.get('test1');
		const noResult = results.get('test5');
		expect(test1 === validationResult1);
		expect(noResult).toBeUndefined();
	});

	it('should not merge the same instance into itself', () => {
		let result = new ValidationResultList('test', null);
		expect(() => result.merge(result)).toThrow();
	});
	it('should provide results as an object', () => {
		const resultsObject = results.toObject();
		expect(Object.keys(resultsObject)).toEqual(['test1', 'test2', 'test3', 'test4'])
	});
});

import Rule from '../src/concrete/Rule';

class MinMaxNumberRule extends Rule {
	constructor(name?: string) {
		super(name);

		this
			.max(5)
			.min(2)
	}
}
class UsingMinMaxRule extends Rule {
	constructor(name?: string) {
		super(name);

		this.using(new MinMaxNumberRule());
	}
}

describe('Rule#max', () => {
	it('should validate a max number range', () => {
		const minmax = new MinMaxNumberRule('minmax');
		const result = minmax.validate(6);
		expect(result.withErrors.length).toBe(1);
	});
});

describe('Rule#min', () => {
	it('should validate a min number range', () => {
		const minmax = new MinMaxNumberRule('minmax');
		const result = minmax.validate(1);
		expect(result.withErrors.length).toBe(1);
	});
});

describe('Rule#using', () => {
	it('should mix in other rules', () => {
		const usingMinMax = new UsingMinMaxRule('usingMinmax');
		const result = usingMinMax.validate(1);
		expect(result.withErrors.length).toBe(1);
	});

	it('should set name on validatables to own name', () => {
		const usingMinMax = new UsingMinMaxRule('usingMinmax');
		const result = usingMinMax.validate(1);
		expect(result.length).toBe(1);
	});
});

import CollectionRule from '../src/concrete/CollectionRule';
class NumberCollectionRule extends CollectionRule {
	constructor(name?: string) {
		super(name);

		// this.using(new MinMaxNumberRule());
		this.min(2).max(5);
	}
}

class UsingMinMaxCollectionRule extends CollectionRule {
	constructor(name?: string) {
		super(name);

		this.using(new MinMaxNumberRule());
	}
}

describe('CollectionRule', () => {
	it('should run own qualifiers on all collection values', () => {
		const minMaxCollection = new NumberCollectionRule('minmaxCollection');
		const results = minMaxCollection.validate([1, 2, 3, 4, 5, 6]);
		expect(results.withErrors.length).toBe(2);
	});

	it('should run rules on all collection values', () => {
		const minMaxCollection = new UsingMinMaxCollectionRule('minmaxCollection');
		const results = minMaxCollection.validate([1, 2, 3, 4, 5, 6]);
		expect(results.withErrors.length).toBe(2);
	});
});

import Validator from '../src/concrete/Validator';
import * as rx from '../src/utils/rx'

class AddressValidator extends Validator {
	constructor() {
		super();

		this.ruleFor('line1')
			.notEmpty()
			.matches(rx.address);

		this.ruleFor('line2')
			.matches(rx.address);

		this.ruleFor('city')
			.notEmpty()
			.matches(rx.city);

		this.ruleFor('state')
			.notEmpty();

		this.ruleFor('zip')
			.notEmpty()
			.matches(rx.zipcode);
	}
}

class PhoneValidator extends Validator {
	constructor() {
		super();

		this.ruleFor('type')
			.notEmpty()
			.enum(['home', 'cell']);

		this.ruleFor('value')
			.notEmpty()
			.matches(rx.domesticphone);

		this.ruleFor('display')
			.notEmpty()
			.matches(rx.title);
	}
}

class UserValidator extends Validator {
	constructor(name?: string) {
		super();
		this.name = name;

		this.ruleFor('address')
			.notNull()
			.using(new AddressValidator());

		this.ruleFor('phone')
			.notEmpty();

		this.ruleForEach('phone')
			.using(new PhoneValidator());

	}
}

describe('Validator', () => {
	it('should validate a simple object', () => {


	});

	it('should properly namespace propertyNames on results', () => {
		const user = { address: {} };
		const validator = new UserValidator();
		const namedValidator = new UserValidator('user');

		const unnamed = validator.validate(user);
		const named = namedValidator.validate(user);

		expect(Object.keys(unnamed.toObject())).toEqual([
			'address',
			'address.line1',
			'address.line2',
			'address.city',
			'address.state',
			'address.zip',
			'phone'
		]);

		expect(Object.keys(named.toObject())).toEqual([
			'user.address',
			'user.address.line1',
			'user.address.line2',
			'user.address.city',
			'user.address.state',
			'user.address.zip',
			'user.phone'
		]);
	});

	it('should validate a single propery', () => {
		const validator = new UserValidator();
		const results = validator.validateProperty('address', {});

		expect(results.length).toBe(6);
		expect(results.propertyName).toBe('address');
	});

	it('should validate collections', () => {
		const validator = new UserValidator();
		const results = validator.validateProperty('phone', { phone: [{
			type: 'work',
		}] });

		expect(Object.keys(results.toObject())).toEqual([
			'phone', 'phone[0]', 'phone[0].type', 'phone[0].value', 'phone[0].display'
		]);
	});
});