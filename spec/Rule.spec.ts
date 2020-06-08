import 'jasmine';
import { Rule, rx, ValidationResultList, ValidationResult } from '../src';
import PositiveNumberRule from './support/validators/rules/PositiveNumberRule';
import PhoneValidator from './support/validators/PhoneValidator';

describe('Rule#cascade', () => {
	it('should run all qualifiers and contained rules regardless of validity', () => {
		const rule = new Rule('cascade');

		rule
			.must(function returnFalse1() { return false; })
			.must(function returnFalse2() { return false; })
			.must(function returnFalse3() { return false; })
			.cascade();

		const result = rule.validate(null).get('cascade');

		expect((<ValidationResult>result).errorCount).toBe(3);
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
	it('should describe a custom qualifier to be executed when calling Rule#validate', () => {
		const rule = new Rule('must');
		function returnFalse() {
			return false;
		}
		rule.must(returnFalse);

		let result = rule.validate(null);
		expect(result.isValid).toBe(false);
		let propertyResult = result.get('must');

		expect((<ValidationResult>propertyResult).errors.returnFalse).not.toBeUndefined();
	});
});

describe('Rule#using', () => {
	it('should delegate validation to another rule', () => {
		const rule = new Rule('using');
		rule.using(new PositiveNumberRule());

		const result = rule.validate(-1).get('using');

		expect((<ValidationResult>result).isValid).toBeFalse();
		expect((<ValidationResult>result).errors.beGreaterThanOrEqual).toBeDefined();
	});

	it('should delegate validation to a validator', () => {
		const rule = new Rule('using');
		rule.using(new PhoneValidator());

		const result = rule.validate({});
		expect(result.length).toBe(5);
		expect(result.withErrors.length).toBe(4);
	});
});

describe('Rule#if', () => {
	it('should tell a rule to run only if a condition is met', () => {
		const rule = new Rule('if');
		rule.if((parentValue) => parentValue.validate, rule => rule.must(function returnFalse1() { return false; }));
		rule.if((parentValue) => !parentValue.validate, rule => rule.must(function returnFalse2() { return false; }));

		const result1 = rule.validate(null, { validate: true });
		const result2 = rule.validate(null, { validate: false });

		expect((<ValidationResult>(<ValidationResultList>result1).get('if')).errors.returnFalse1).toBeDefined();
		expect((<ValidationResult>(<ValidationResultList>result1).get('if')).errors.returnFalse2).toBeUndefined();
		expect((<ValidationResult>(<ValidationResultList>result2).get('if')).errors.returnFalse1).toBeUndefined();
		expect((<ValidationResult>(<ValidationResultList>result2).get('if')).errors.returnFalse2).toBeDefined();
	});
});

describe('Rule#validate', () => {
	it('should return an accurate ValidationResultList', () => {
		const rule = new PositiveNumberRule('number');
		let validResult = rule.validate(1);
		let numberResult = validResult.get('number');

		expect(validResult).toBeInstanceOf(ValidationResultList);
		expect(validResult.isValid).toBeTrue();
		expect(numberResult).toBeDefined();
		expect((<ValidationResult>numberResult).isValid).toBeTrue();

		let invalidResult = rule.validate(-1);
		numberResult = invalidResult.get('number');

		expect(invalidResult.isValid).toBeFalse();
		expect(numberResult).toBeDefined();
		expect((<ValidationResult>numberResult).isValid).toBeFalse();
		expect((<ValidationResult>numberResult).errors.beGreaterThanOrEqual).toBeDefined();
	});

	it('should pass the correct parameters for value, parentValue, and customOptions to qualifiers', () => {
		const rule = new Rule('must');
		const parentValue = { value: 'test' };
		const customOptions = { someProp: true };
		rule.must((val, parent, customOpts) => {
			expect(val).toEqual(parentValue.value);
			expect(parent).toEqual(parentValue);
			expect(customOpts).toEqual(customOptions);
			return true;
		})

		rule.validate(parentValue.value, parentValue, customOptions);
	});

	it('should pass the correct parameters for parentValue and customOptions to preconditions', () => {
		const rule = new Rule('if');
		const parentValue = { value: 'parentValue' };
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
		const rule = new Rule('withMessage');
		const parentValue = { value: 0 };
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

describe('RuleApi#as', () => {
	it('should rename a qualifier', () => {
		const rule = new Rule('as');
		rule.min(1).as('min');
		const result = rule.validate(0);
		const minResult = result.get('as');

		expect((<ValidationResult>minResult).errors.min).toBeDefined();
		expect((<ValidationResult>minResult).errors.beGreaterThanOrEqual).toBeUndefined();
	});

	it('should name custom qualifiers defined with arrow functions', () => {
		const rule = new Rule('as');
		rule.must(() => false).as('returnFalse');

		const result = rule.validate(null);
		const propResult = result.get('as');

		expect((<ValidationResult>propResult).errors.returnFalse).toBeDefined();
	});
});

describe('RuleApi#asWarning', () => {
	it('should mark the severity of a qualifier as a warning', () => {
		const rule = new Rule('warning');
		rule.min(1).asWarning();

		const result = rule.validate(0);
		expect(result.withErrors.length).toBe(0);
		expect(result.withWarnings.length).toBe(1);
		expect(result.isValid).toBeTrue();
	});
});

describe('RuleApi#when', () => {
	it('should mark an individual qualifier only to be run if a condition is met', () => {
		const rule = new Rule('when');
		const willValidate = { value: 0, validate: true };
		const wontValidate = { value: 0, validate: false };
		rule.min(1).when((_parentValue) => _parentValue.validate);

		const didValidate = rule.validate(willValidate.value, willValidate);
		const didntValidate = rule.validate(wontValidate.value, wontValidate);
		expect(didValidate.isValid).toBeFalse();
		expect(didntValidate.isValid).toBeTrue();
	});
});

describe('RuleApi#withMessage', () => {
	it('should define a custom message for a qualifier', () => {
		const rule = new Rule('withMessage');
		const invalidQualifierMessage = 'Pirates be passin bad numberrrrrrsss';
		rule.min(1).withMessage(() => invalidQualifierMessage);

		const result = rule.validate(0).get('withMessage');

		expect((<ValidationResult>result).errors.beGreaterThanOrEqual).toBe(invalidQualifierMessage);
	});
})