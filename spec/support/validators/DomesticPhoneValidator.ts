import { Validator, rx } from '../../../src';
import Phone from '../model/Phone';

function beFalse(val: any) {
	return val === false;
}

export default class DomesticPhoneValidator extends Validator<Phone> {
	constructor() {
		super();

		this.ruleFor('value')
			.notEmpty()
			.withMessage(() => 'Value is required.')
			.matches(rx.domesticphone)
			.withMessage(() => 'Invalid domestic phone number.');

		this.ruleFor('isInternational')
			.must(beFalse)
			.withMessage(() => 'isInternational must be false.');
	}
}