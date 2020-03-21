import { Validator, rx } from '../../../src';
import Phone from '../model/Phone';

function beTrue(val: any) {
	return val === true;
}

export default class InternationalPhoneValidator extends Validator<Phone> {
	constructor() {
		super();

		this.ruleFor('value')
			.notEmpty()
			.withMessage(() => 'Value is required.')
			.matches(rx.foreignphone)
			.withMessage(() => 'Invalid international phone number.');

		this.ruleFor('isInternational')
			.must(beTrue)
			.withMessage(() => 'isInternational must be true.');
	}
}