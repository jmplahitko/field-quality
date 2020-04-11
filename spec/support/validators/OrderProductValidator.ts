import { Validator, rx } from '../../../src';
import PositiveNumberRule from './rules/PositiveNumberRule';
import OrderProduct from '../model/OrderProduct';

export default class OrderProductValidator extends Validator<OrderProduct> {
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
			.using(new PositiveNumberRule('unitPrice', 'Unit price'));

		this.ruleFor('quantity')
			.notEmpty()
			.withMessage(() => `Quantity is required`)
			.using(new PositiveNumberRule('quantity', 'Quantity'));
	}
}