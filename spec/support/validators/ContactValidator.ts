import { Validator, rx } from '../../../src';
import PhoneValidator from './PhoneValidator';
import AddressValidator from './AddressValidator';
import Contact from '../model/Contact';

export default class ContactValidator extends Validator<Contact> {
	constructor() {
		super();

		this.ruleFor('firstName')
			.notEmpty()
			.withMessage(() => 'First Name is required.')
			.matches(rx.name)
			.withMessage(() => 'Invalid first name.');

		this.ruleFor('middleName')
			.matches(rx.name)
			.length(2, 50)
			.asWarning()
			.withMessage((value) => `Are you sure ${value} is your full middle name?`);

		this.ruleFor('lastName')
			.notEmpty()
			.withMessage(() => 'Last Name is required.')
			.matches(rx.lastname)
			.withMessage(() => 'Invalid last name.');

		this.ruleFor('title')
			.matches(rx.title)
			.withMessage(() => 'Invalid title.');

		this.ruleFor('phone')
			.length(1, 2)
			.withMessage((value) => {
				let message;
				if (!value.length) {
					message = 'You must supply at least one phone contact.';
				} else {
					message = 'You cannot have more than two phone contacts.';
				}
				return message;
			});

		this.ruleForEach('phone')
			.using(new PhoneValidator());

		this.ruleFor('address')
			.using(new AddressValidator());
	}
}