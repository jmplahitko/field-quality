import { Validator, rx } from '../../../src';

export default class PhoneValidator extends Validator {
	constructor() {
		super();

		this.ruleFor('type')
		.notEmpty()
		.withMessage(() => 'Type is required.')
		.enum(['home', 'cell'])
		.withMessage(() => 'Type must be "home" or "cell".');

	this.ruleFor('value')
		.notEmpty()
		.withMessage(() => 'Value is required.')
		.matches(rx.domesticphone)
		.withMessage(() => 'Invalid phone number.');

	this.ruleFor('display')
		.notEmpty()
		.withMessage(() => 'Display is required')
		.matches(rx.title)
		.withMessage(() => 'Invalid display value.');
	}
}