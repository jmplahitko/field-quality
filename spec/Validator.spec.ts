import 'jasmine';
import { Validator, Rule, CollectionRule, ValidationResultList } from '../src';

describe('Validator#ruleFor', () => {
	it('should return a Rule', () => {
		class MyValidator extends Validator {
			constructor() {
				super();

				const returnedValue = this.ruleFor('test');

				expect(returnedValue).toBeInstanceOf(Rule);
			}
		}

		new MyValidator();
	});
});

describe('Validator#ruleForEach', () => {
	it('should return a CollectionRule', () => {
		class MyValidator extends Validator {
			constructor() {
				super();

				const returnedValue = this.ruleForEach('test');

				expect(returnedValue).toBeInstanceOf(CollectionRule);
			}
		}

		new MyValidator();
	});
});

describe('Validator#validateProperty', () => {
	it('should return a validation result for the given property', () => {

	});

	it('should pass the correct parameters for value, parentValue, and customOptions to rules', () => {
		let spy;

		class MyValidator extends Validator {
			constructor() {
				super();

				let observedRule = this.ruleFor('test');
				spy = spyOn(observedRule, 'validate')
					.and.returnValue(new ValidationResultList());
			}
		}

		const validator = new MyValidator();
		const val = { test: 'test' };
		const customOptions = { someOption: true };
		validator.validateProperty('test', val, customOptions);

		expect(spy).toHaveBeenCalledWith(val.test, val, customOptions);
	});

	it('should return an accurate ValidationResultList', () => {

	});
});

describe('Validator#validate', () => {

});