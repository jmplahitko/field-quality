import { Validator, rx } from '../../../src';
import PositiveNumberRule from './rules/PositiveNumberRule';

export default class OrderProductValidator extends Validator {
	constructor() {
		super();

		this.ruleFor('name')
			.notEmpty()
			.withMessage(() => 'Product name is required.')
			.matches(rx.name)
			.withMessage((value) => `${value} is not a valid product name.`);

		this.ruleFor('unitPrice')
			.notEmpty()
			.withMessage(() => `Unit price is required`)
			.using(new PositiveNumberRule('Unit price'));

		this.ruleFor('quantity')
			.notEmpty()
			.withMessage(() => `Quantity is required`)
			.using(new PositiveNumberRule('Quantity'));
	}
}