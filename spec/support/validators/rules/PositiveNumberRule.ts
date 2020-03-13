import { Rule, rx } from '../../../../src'

export default class PositiveNumberRule extends Rule {
	constructor(displayPropertyName?: string) {
		super()

		this
			.min(0)
			.withMessage(() => `${displayPropertyName} must be positive.`);
	}
}