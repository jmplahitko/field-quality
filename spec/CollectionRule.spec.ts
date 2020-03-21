import 'jasmine';
import { CollectionRule } from '../src';
import PositiveNumberRule from './support/validators/rules/PositiveNumberRule';
import PhoneValidator from './support/validators/PhoneValidator';

describe('CollectionRule#using', () => {
	it('should delegate validation to another rule', () => {
		const rule = new CollectionRule('using');
		rule.using(new PositiveNumberRule());

		const result = rule.validate([-1]).get('using[0]');
		// @ts-ignore
		expect(result.isValid).toBeFalse();
		// @ts-ignore
		expect(result.errors.beGreaterThanOrEqual).toBeDefined();
	});

	it('should delegate validation to a validator', () => {
		const rule = new CollectionRule('using');
		rule.using(new PhoneValidator());

		const result = rule.validate([{}]);
		expect(result.length).toBe(5);
		expect(result.withErrors.length).toBe(4);
	});
});

describe('CollectionRule#where', () => {

});

describe('CollectionRule#validate', () => {

});