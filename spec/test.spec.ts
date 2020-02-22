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
	it('should provide results as an object', () => {
		const resultsObject = results.toObject();
		expect(Object.keys(resultsObject)).toEqual(['test1', 'test2', 'test3', 'test4'])
	});
});