import 'jasmine';
import { Rule, ValidationResult, rx } from '../src';
import AddressValidator from './support/validators/AddressValidator';

describe('Rule#cascade', () => {
	it('should run all qualifiers and contained rules regardless of validity', () => {
		const rule = new Rule('cascade');

		rule
			.must(function returnFalse1() { return false; })
			.must(function returnFalse2() { return false; })
			.must(function returnFalse3() { return false; })
			.cascade();

		const result = rule.validate(null).get('cascade');

		// @ts-ignore
		expect(result.errorCount).toBe(3);
	});
});

describe('Rule#enum', () => {
	it('should check that a value one of a set of allowable values', () => {
		const rule = new Rule('enum');
		rule.enum(['test1', 'test2']);

		let result = rule.validate('test');
		expect(result.isValid).toBeFalse();

		result = rule.validate('test1');
		expect(result.isValid).toBeTrue();
	});
});

describe('Rule#length', () => {
	const rule = new Rule('length');
	rule.length(2, 3);

	it('should check the length of a string', () => {
		let result = rule.validate('a');
		expect(result.isValid).toBeFalse();

		result = rule.validate('abcd');
		expect(result.isValid).toBeFalse();

		result = rule.validate('ab');
		expect(result.isValid).toBeTrue();

		result = rule.validate('abc');
		expect(result.isValid).toBeTrue();
	});

	it('should check the length of an array', () => {
		let result = rule.validate(new Array(1));
		expect(result.isValid).toBeFalse();

		result = rule.validate(new Array(4));
		expect(result.isValid).toBeFalse();

		result = rule.validate(new Array(2));
		expect(result.isValid).toBeTrue();

		result = rule.validate(new Array(3));
		expect(result.isValid).toBeTrue();
	});

	it('should treat empty strings and arrays as invalid', () => {
		let result = rule.validate('');
		expect(result.isValid).toBeFalse();

		result = rule.validate([]);
		expect(result.isValid).toBeFalse();
	});
});

describe('Rule#lengthOrEmpty', () => {
	const rule = new Rule('lengthOrEmpty');
	rule.lengthOrEmpty(2, 3);

	it('should check the length of a string', () => {
		let result = rule.validate('a');
		expect(result.isValid).toBeFalse();

		result = rule.validate('abcd');
		expect(result.isValid).toBeFalse();

		result = rule.validate('ab');
		expect(result.isValid).toBeTrue();

		result = rule.validate('abc');
		expect(result.isValid).toBeTrue();
	});

	it('should check the length of an array', () => {
		let result = rule.validate(new Array(1));
		expect(result.isValid).toBeFalse();

		result = rule.validate(new Array(4));
		expect(result.isValid).toBeFalse();

		result = rule.validate(new Array(2));
		expect(result.isValid).toBeTrue();

		result = rule.validate(new Array(3));
		expect(result.isValid).toBeTrue();
	});

	it('should treat empty strings and arrays as valid', () => {
		let result = rule.validate('');
		expect(result.isValid).toBeTrue();

		result = rule.validate([]);
		expect(result.isValid).toBeTrue();
	});
});

describe('Rule#matches', () => {
	it('should validate a string against a regular expression', () => {
		const rule = new Rule('matches');
		rule.matches(rx.lettersonly);

		let result = rule.validate(0);
		expect(result.isValid).toBeFalse();

		result = rule.validate('asdf');
		expect(result.isValid).toBeTrue();
	});
});

describe('Rule#notNull', () => {
	const rule = new Rule('notNull');
	rule.notNull();

	it('should treat null as invalid', () => {
		let result = rule.validate(null);
		expect(result.isValid).toBeFalse();
	});

	it('should treat other falsy values as valid', () => {
		let result = rule.validate(undefined);
		expect(result.isValid).toBeTrue();

		result = rule.validate('');
		expect(result.isValid).toBeTrue();

		result = rule.validate(false);
		expect(result.isValid).toBeTrue();

		result = rule.validate([]);
		expect(result.isValid).toBeTrue();

		result = rule.validate({});
		expect(result.isValid).toBeTrue();

		result = rule.validate(0);
		expect(result.isValid).toBeTrue();

		result = rule.validate(-0);
		expect(result.isValid).toBeTrue();
	});
});

describe('Rule#notEmpty', () => {
	const rule = new Rule('notEmpty');
	rule.notEmpty();

	it('should treat null as invalid', () => {
		let result = rule.validate(null);
		expect(result.isValid).toBeFalse();
	});

	it('should treat undefined as invalid', () => {
		let result = rule.validate(undefined);
		expect(result.isValid).toBeFalse();
	});

	it('should treat empty arrays as invalid', () => {
		let result = rule.validate([]);
		expect(result.isValid).toBeFalse();
	});

	it('should treat empty objects as invalid', () => {
		let result = rule.validate({});
		expect(result.isValid).toBeFalse();
	});

	it('should treat empty strings as invalid', () => {
		let result = rule.validate('');
		expect(result.isValid).toBeFalse();
	});
});

describe('Rule#min', () => {
	it('should check that a number is greater than or equal to another number', () => {
		const rule = new Rule('min');
		rule.min(2);

		let result = rule.validate(1);
		expect(result.isValid).toBeFalse();

		result = rule.validate(2);
		expect(result.isValid).toBeTrue();

		result = rule.validate(3);
		expect(result.isValid).toBeTrue();
	});
});

describe('Rule#minExclusiveOf', () => {
	it('should check that a number is greater than another number', () => {
		const rule = new Rule('minExclusiveOf');
		rule.minExclusiveOf(2);

		let result = rule.validate(1);
		expect(result.isValid).toBeFalse();

		result = rule.validate(2);
		expect(result.isValid).toBeFalse();

		result = rule.validate(3);
		expect(result.isValid).toBeTrue();
	});
});

describe('Rule#max', () => {
	it('should check that a number is less than or equal to another number', () => {
		const rule = new Rule('max');
		rule.max(2);

		let result = rule.validate(3);
		expect(result.isValid).toBeFalse();

		result = rule.validate(2);
		expect(result.isValid).toBeTrue();

		result = rule.validate(1);
		expect(result.isValid).toBeTrue();
	});
});

describe('Rule#maxExclusiveOf', () => {
	it('should check that a number is less than another number', () => {
		const rule = new Rule('maxExclusiveOf');
		rule.maxExclusiveOf(2);

		let result = rule.validate(3);
		expect(result.isValid).toBeFalse();

		result = rule.validate(2);
		expect(result.isValid).toBeFalse();

		result = rule.validate(1);
		expect(result.isValid).toBeTrue();
	});
});

describe('Rule#must', () => {

});

describe('Rule#using', () => {

});

describe('Rule#if', () => {

});