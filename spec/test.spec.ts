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

let results = new ValidationResultList(validationResults, 'test');

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

class StringLengthRule extends Rule {
	constructor(name?: string) {
		super(name);

		this.length(1, 4);
	}
}

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

class OnlyNumbersCollectionRule extends CollectionRule {
	constructor(name?: string) {
		super(name);

		this.where(x => isNumber(x), (rule) => {
			rule.using(new MinMaxNumberRule());
		});
	}
}

class MixedNumberStringCollectionRule extends CollectionRule {
	constructor(name?: string) {
		super(name);

		this.where(x => isNumber(x), (rule) => {
			rule.using(new MinMaxNumberRule());
		});

		this.where(x => isString(x), (rule) => {
			rule.using(new StringLengthRule());
		});
	}
}

class CustomOptionsTestStringRule extends Rule {
	constructor(name?: string) {
		super(name);

		this.must((val, parentValue, customOptions) => {
			expect(customOptions).toBe('test');
			return true;
		});
	}
}

class UsingCustomOptionsTestStringCollectionRule extends CollectionRule {
	constructor(name?: string) {
		super(name);

		this.using(new CustomOptionsTestStringRule());
	}
}

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

class ContactValidator extends Validator {
	constructor(name?: string) {
		super();
		this.name = name;

		this.ruleFor('address')
			.notNull()
			.using(new AddressValidator());

		this.ruleFor('phone')
			.length(1, 2);

		this.ruleForEach('phone')
			.using(new PhoneValidator());

	}
}

class ProfileValidator extends Validator {
	constructor(name?: string) {
		super();
		this.name = name;

		this.ruleFor('firstName')
			.notEmpty()
			.matches(rx.name);

		this.ruleFor('middleName')
			.matches(rx.name)
			.length(2, 50)
			.asWarning();

		this.ruleFor('lastName')
			.notEmpty()
			.matches(rx.lastname);
	}
}

class UserValidator extends Validator {
	constructor(name?: string) {
		super();
		this.name = name;

		this.ruleFor('profile')
			.must((val => val.missingProp))
			.using(new ProfileValidator())
			.cascade();

		this.ruleFor('contact')
			.using(new ContactValidator());
	}
}

import fs from 'fs';
import path from 'path';
import { isNumber, isString } from 'util';

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
	it('should not break reference from itself when merging another ValidationResult', () => {
		let result1 = new ValidationResult('test1', 1);
		let result2 = new ValidationResult('test1', 1);
		let merged = result1.merge(result2);
		expect(merged).toBe(result1);
	});
});

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
	it('should get a specific result and its related properties\' results', () => {
		const validator = new ContactValidator();
		const contact = {
			address: {
				line1: '100 E Street',
				line2: 'P.O. Box 3',
				city: 'Indianapolis',
				state: 'IN',
				zip: 46234
			},
			phone: [
				{
					type: 'cell',
					value: 3175555555,
					display: 'Work'
				},
				{
					type: 'home',
					value: 3175555555,
					display: 'Work'
				}
			]
		}

		const result = validator.validate(contact);
		const addressResults = result.getWithRelatedResults('address').toObject();
		const phoneResults = result.getWithRelatedResults('phone').toObject();

		expect(Object.keys(addressResults)).toEqual(jasmine.arrayWithExactContents([
			'address',
			'address.line1',
			'address.line2',
			'address.city',
			'address.state',
			'address.zip',
		]));

		expect(Object.keys(phoneResults)).toEqual(jasmine.arrayWithExactContents([
			'phone',
			'phone[0]',
			'phone[0].type',
			'phone[0].value',
			'phone[0].display',
			'phone[1]',
			'phone[1].type',
			'phone[1].value',
			'phone[1].display',
		]))
	});
	it('should provide results as an object', () => {
		const resultsObject = results.toObject();
		expect(Object.keys(resultsObject)).toEqual(['test1', 'test2', 'test3', 'test4'])
	});
});

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

	it('should pass custom options to qualifiers', () => {
		const rule = new CustomOptionsTestStringRule();
		rule.validate(null, null, 'test');
	});
});

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

	it('should conditionally validate items in an array', () => {
		const numbersOnlyValidator = new OnlyNumbersCollectionRule();
		const numbersAndStringsValidator = new MixedNumberStringCollectionRule();
		const collection = [1, 2, 3, 'test', 4, 'test1', {}, 5, 6];

		const numberResult = numbersOnlyValidator.validate(collection);
		expect(numberResult.length).toBe(9);
		expect(numberResult.withErrors.length).toBe(2);
		expect(Object.keys(numberResult.withErrors.toObject())).toEqual(jasmine.arrayWithExactContents(['[0]', '[8]']));

		const numberAndStringResult = numbersAndStringsValidator.validate(collection);
		expect(numberAndStringResult.length).toBe(9);
		expect(numberAndStringResult.withErrors.length).toBe(3);
		expect(Object.keys(numberAndStringResult.withErrors.toObject())).toEqual(jasmine.arrayWithExactContents(['[0]', '[5]', '[8]']));
	});

	it('should pass custom options to qualifiers', () => {
		const rule = new UsingCustomOptionsTestStringCollectionRule();
		rule.validate(null, null, 'test');
	});
});

describe('Validator', () => {
	it('should validate a simple object', () => {
		const validator = new ProfileValidator();
		const result = validator.validate({
			firstName: 'Bob',
			middleName: 'M',
			lastName: 'Smith'
		});

		expect(result.length).toBe(3);
		expect(result.withErrors.length).toBe(0);
		expect(result.withWarnings.length).toBe(1);
	});

	it('should validate nested structures', () => {
		const validator = new UserValidator();
		const result = validator.validate({
			profile: {
				middleName: 'M',
				lastName: 'Smith'
			},
			contact: {
				address: {
					line1: 33,
					line2: 'P.O. Box',
					city: 'Indianapolis',
					state: 'IN',
				},
				phone: [
					{
						type: 'work',
						value: 3175555555,
						display: 'Work'
					},
					{
						type: 'cell',
						value: 3175555555,
						display: 'Work'
					},
					{
						type: 'home',
						value: 3175555555,
						display: 'Work'
					}
				]
			}
		});

		expect(result.entries.length).toBe(24);
		expect(result.withErrors.length).toBe(5);
		expect(result.withWarnings.length).toBe(1);

		// fs.writeFile(path.join(__dirname, 'test-result.json'), JSON.stringify(result.toObject(), null, '\t'), () => {});
	});

	it('should properly namespace propertyNames on results', () => {
		const contact = { address: {} };
		const validator = new ContactValidator();
		const namedValidator = new ContactValidator('contact');

		const unnamed = validator.validate(contact);
		const named = namedValidator.validate(contact);

		expect(Object.keys(unnamed.toObject())).toEqual(jasmine.arrayWithExactContents([
			'address',
			'address.line1',
			'address.line2',
			'address.city',
			'address.state',
			'address.zip',
			'phone'
		]));

		expect(Object.keys(named.toObject())).toEqual(jasmine.arrayWithExactContents([
			'contact.address',
			'contact.address.line1',
			'contact.address.line2',
			'contact.address.city',
			'contact.address.state',
			'contact.address.zip',
			'contact.phone'
		]));
	});

	it('should validate a single propery', () => {
		const validator = new ContactValidator();
		const results = validator.validateProperty('address', {});

		expect(results.length).toBe(6);
		expect(results.propertyName).toBe('address');
	});

	it('should validate collections', () => {
		const validator = new ContactValidator();
		const results = validator.validateProperty('phone', { phone: [{
			type: 'work',
		}] });

		expect(Object.keys(results.toObject())).toEqual(jasmine.arrayWithExactContents([
			'phone', 'phone[0]', 'phone[0].type', 'phone[0].value', 'phone[0].display'
		]));
	});

	it('should cache results', () => {
		const validator = new ContactValidator();
		const contact1 = {
			address: {
				line1: '100 E Street',
				line2: 'P.O. Box 3',
				city: 'Indianapolis',
				state: 'IN',
			},
			phone: [
				{
					type: 'work',
					value: 3175555555,
					display: 'Work'
				},
				{
					type: 'cell',
					value: 3175555555,
					display: 'Work'
				},
				{
					type: 'home',
					value: 3175555555,
					display: 'Work'
				}
			]
		}
		const contact2 = {
			address: {
				line1: '100 E Street',
				line2: 'P.O. Box 3',
				city: 'Indianapolis',
				state: 'IN',
			},
			phone: [
				{
					type: 'cell',
					value: 3175555555,
					display: 'Work'
				},
				{
					type: 'home',
					value: 3175555555,
					display: 'Work'
				}
			]
		}

		const results1 = validator.validate(contact1);
		const results2 = validator.validate(contact2);

		expect(results1.get('address')).toBe(results2.get('address'));
		expect(results1.get('address.line1')).toBe(results2.get('address.line1'));
		expect(results1.get('address.line2')).toBe(results2.get('address.line2'));
		expect(results1.get('address.city')).toBe(results2.get('address.city'));
		expect(results1.get('address.state')).toBe(results2.get('address.state'));
		expect(results1.get('address.zip')).toBe(results2.get('address.zip'));

		expect(results1.get('phone')).not.toBe(results2.get('phone'));
		expect(results1.get('phone[0]')).not.toBe(results2.get('phone[0]'));
		expect(results1.get('phone[1]')).not.toBe(results2.get('phone[1]'));
		expect(results2.get('phone[2]')).toBeUndefined();
	});
});