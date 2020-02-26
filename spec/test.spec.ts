import 'jasmine';
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



let results = new ValidationResultList(validationResults);

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
		let result = new ValidationResultList();
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
})