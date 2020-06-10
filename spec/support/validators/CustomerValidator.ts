import { Validator, rx } from '../../../src';
import Customer from '../model/Customer';
import ContactValidator from './ContactValidator';
import AddressValidator from './AddressValidator';
import OrderValidator from './OrderValidator';

export default class CustomerValidator extends Validator<Customer> {
	constructor() {
		super();

		this.ruleFor('companyName')
			.notEmpty()
			.withMessage(() => 'Company name is required')
			.matches(rx.fullname);

		this.ruleFor('contact')
			.using(new ContactValidator());

		this.ruleForEach('orders')
			.using(new OrderValidator());
	}
}