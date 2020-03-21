import 'jasmine';
import { CollectionRule } from '../src';
import PositiveNumberRule from './support/validators/rules/PositiveNumberRule';
import PhoneValidator from './support/validators/PhoneValidator';
import Phone from './support/model/Phone';
import { invalidPhoneCustomer1 } from './support/instances/customer';

describe('CollectionRule#using', () => {
	const positiveNumbersRule = new CollectionRule<number[]>('using');
	positiveNumbersRule.using(new PositiveNumberRule());

	const singleNumberResult = positiveNumbersRule.validate([-1]).get('using[0]');
	const multipleNumberResult = positiveNumbersRule.validate([-1, 0, 1]);

	const phoneRule = new CollectionRule<Phone[]>('using');
	phoneRule.using(new PhoneValidator());

	const singlePhoneResult = phoneRule.validate([{}]);
	const multiplePhoneResult = phoneRule.validate(invalidPhoneCustomer1.contact.phone);

	it('should return the correct propertyNames in validation results', () => {
		expect(Object.keys(multipleNumberResult.toObject())).toEqual(jasmine.arrayWithExactContents([
			'using[0]', 'using[1]', 'using[2]'
		]));

		expect(Object.keys(multiplePhoneResult.toObject())).toEqual(jasmine.arrayWithExactContents([
			'using[0]', 'using[0].type', 'using[0].value', 'using[0].display', 'using[0].isInternational',
			'using[0]', 'using[1].type', 'using[1].value', 'using[1].display', 'using[1].isInternational',
		]))
	})

	it('should delegate validation to another rule for each value in a collection', () => {
		// @ts-ignore
		expect(singleNumberResult.isValid).toBeFalse();
		// @ts-ignore
		expect(singleNumberResult.errors.beGreaterThanOrEqual).toBeDefined();


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

});

describe('CollectionRule#validate', () => {

});