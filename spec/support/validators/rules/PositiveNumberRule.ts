import { Rule, rx } from '../../../../src'

export default class PositiveNumberRule extends Rule {
	constructor(displayPropertyName?: string) {
		super()

		this
			.matches(rx.numbersonly)
			.withMessage((value) => `${value} is not a valid number.`)
			.min(0)
			.withMessage(() => `${displayPropertyName} must be positive.`);
	}
}