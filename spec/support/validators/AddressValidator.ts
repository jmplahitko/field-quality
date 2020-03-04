import { Validator, rx } from '../../../src';

export default class AddressValidator extends Validator {
	constructor() {
		super();

		this.ruleFor('line1')
			.notEmpty()
			.withMessage(() => 'Line 1 is required.')
			.matches(rx.address)
			.withMessage(() => 'Invalid address line.');

		this.ruleFor('line2')
			.matches(rx.address)
			.withMessage(() => 'Invalid address line.');

		this.ruleFor('city')
			.notEmpty()
			.withMessage(() => 'City is required.')
			.matches(rx.city)
			.withMessage(() => 'Invalid City.');

		this.ruleFor('region')
			.notEmpty()
			.when((x) => x.country === 'USA' || x.country === 'Canada')
			.withMessage(() => 'Region is required when country is USA or Canada.');

		this.ruleFor('postalCode')
			.notEmpty()
			.withMessage(() => 'Postal code is required.')
			.matches(rx.zipcode)
			.withMessage(() => 'Invalid postal code.');

		this.ruleFor('country')
			.notEmpty()
			.withMessage(() => 'Country is required.');
	}
}