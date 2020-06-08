import 'jasmine';
import { CollectionRule, rx, ValidationResult } from '../src';
import PositiveNumberRule from './support/validators/rules/PositiveNumberRule';
import PhoneValidator from './support/validators/PhoneValidator';
import { invalidPhoneCustomer1 } from './support/instances/customer';
import { quality as q } from '../src';

describe('CollectionRule#using', () => {
	const positiveNumbersRule = new CollectionRule('using');
	positiveNumbersRule.using(new PositiveNumberRule());

	const singleNumberResult = positiveNumbersRule.validate([-1]).get('using[0]');
	const multipleNumberResult = positiveNumbersRule.validate([-1, 0, 1]);

	const phoneRule = new CollectionRule('using');
	phoneRule.using(new PhoneValidator());

	const singlePhoneResult = phoneRule.validate([{}]);
	const multiplePhoneResult = phoneRule.validate(invalidPhoneCustomer1.contact.phone);

	const tupleArrayRule = new CollectionRule('using');
	tupleArrayRule.using(positiveNumbersRule);

	const tupleArrayResult = tupleArrayRule.validate([[-1, 0], [1, 2], [3, 4]]);

	const mixedArrayRule = new CollectionRule('using');
	const mixedArrayTupleRule = new CollectionRule();
	mixedArrayTupleRule.using(new PositiveNumberRule());

	mixedArrayRule
		.where(x => Number.isInteger(x), rule => rule.using(new PositiveNumberRule()))
		.where(x => q.isObject(x), rule => rule.using(new PhoneValidator()))
		.where(x => Array.isArray(x), rule => rule.using(mixedArrayTupleRule));

	const mixedArrayResult = mixedArrayRule.validate([1, invalidPhoneCustomer1.contact.phone[0], [-1, 0]]);

	it('should return the correct propertyNames in validation results for primative collections', () => {
		expect(Object.keys(multipleNumberResult.toObject())).toEqual(jasmine.arrayWithExactContents([
			'using[0]', 'using[1]', 'using[2]'
		]));
	});

	it('should return the correct propertyNames in validation results for object collections ', () => {
		expect(Object.keys(multiplePhoneResult.toObject())).toEqual(jasmine.arrayWithExactContents([
			'using[0]', 'using[0].type', 'using[0].value', 'using[0].display', 'using[0].isInternational',
			'using[0]', 'using[1].type', 'using[1].value', 'using[1].display', 'using[1].isInternational',
		]));
	});

	it('should return the correct propertyNames in validation results for a collection of collections', () => {
		expect(tupleArrayResult.length).toBe(9);
		expect(tupleArrayResult.isValid).toBeFalse();
		expect(tupleArrayResult.withErrors.length).toBe(2);
		expect(Object.keys(tupleArrayResult.toObject())).toEqual(jasmine.arrayWithExactContents([
			'using[0]', 'using[0][0]', 'using[0][1]', 'using[1]', 'using[1][0]', 'using[1][1]', 'using[2]', 'using[2][0]', 'using[2][1]'
		]));
	});

	it('should return the correct propertyNames in validation results for mixed type collections', () => {
		expect(mixedArrayResult.length).toBe(9);
		expect(mixedArrayResult.isValid).toBeFalse();
		expect(Object.keys(mixedArrayResult.toObject())).toEqual(jasmine.arrayWithExactContents([
			'using[0]',
			'using[1]', 'using[1].type', 'using[1].value', 'using[1].display', 'using[1].isInternational',
			'using[2]', 'using[2][0]', 'using[2][1]'
		]));
	});

	it('should delegate validation to another rule for each value in a collection', () => {
		expect((<ValidationResult>singleNumberResult).isValid).toBeFalse();
		expect((<ValidationResult>singleNumberResult).errors.beGreaterThanOrEqual).toBeDefined();


		expect(multipleNumberResult.length).toBe(3);
		expect(multipleNumberResult.isValid).toBeFalse();
		expect(multipleNumberResult.withErrors.length).toBe(2);
	});

	it('should delegate validation to a validator for each value in a collection', () => {
		expect(singlePhoneResult.length).toBe(5);
		expect(singlePhoneResult.withErrors.length).toBe(4);

		expect(multiplePhoneResult.length).toBe(10);
		expect(multiplePhoneResult.isValid).toBeFalse();
		expect(multiplePhoneResult.withErrors.length).toBe(1);
	});
});

describe('CollectionRule#where', () => {
	it('should run a rule on elements that match a condition', () => {
		const collection = [-1, 0, 1, '1', 'two'];
		const rule = new CollectionRule('where');
		rule
			.where(x => Number.isInteger(x), _rule => _rule.using(new PositiveNumberRule()));

		const numbersOnlyResult = rule.validate(collection);

		expect(numbersOnlyResult.length).toBe(5)
		expect(numbersOnlyResult.isValid).toBeFalse();
		expect(numbersOnlyResult.withErrors.length).toBe(2);

		rule.where(x => q.isString(x), rule => rule.matches(rx.numbersonly));

		const stringsAndNumbersResult = rule.validate(collection);

		expect(stringsAndNumbersResult.length).toBe(5);
		expect(stringsAndNumbersResult.isValid).toBeFalse();
		expect(stringsAndNumbersResult.withErrors.length).toBe(3);
	});
});

describe('CollectionRule#validate', () => {
	it('should pass the correct parameters for value, parentValue, and customOptions to qualifiers', () => {
		const rule = new CollectionRule('must');
		const parentValue = { value: [1, 2, 3, 4, 5] };
		const customOptions = { someProp: true };
		let expectedValue = 1;
		rule.must((val, parent, customOpts) => {
			expect(val).toEqual(expectedValue++);
			expect(parent).toEqual(parentValue);
			expect(customOpts).toEqual(customOptions);
			return true;
		})

		rule.validate(parentValue.value, parentValue, customOptions);
	});

	it('should pass the correct parameters for parentValue and customOptions to preconditions', () => {
		const rule = new CollectionRule('if');
		const parentValue = { value: [1, 2, 3, 4, 5] };
		const customOptions = { value: 'customOptions' };

		rule
			.must(() => false)
			.when((_parentValue, _customOptions) => {
				expect(_parentValue).toEqual(parentValue);
				expect(_customOptions).toEqual(customOptions);
				return true;
			})
			.if((_parentValue, _customOptions) => {
				expect(_parentValue).toEqual(parentValue);
				expect(_customOptions).toEqual(customOptions);
				return true;
			}, () => {});

		rule.validate(parentValue.value, parentValue, customOptions);
	});

	it('should pass the correct parameters for value, parentValue, and customOptions to message factories', () => {
		const rule = new CollectionRule('withMessage');
		const parentValue = { value: [1, 2, 3, 4, 5] };
		const customOptions = { value: 'customOptions' };

		rule.min(0).withMessage((value, _parentValue, _customOptions) => {
			expect(value).toEqual(parentValue.value);
			expect(_parentValue).toEqual(parentValue);
			expect(_customOptions).toEqual(customOptions);
			return '';
		});

		rule.validate(parentValue.value, parentValue, customOptions);
	});
});