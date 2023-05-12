import { as, asWarning, when, withMessage } from '../src/functional/behaviorFns';
import { enumerable, length, notNull } from '../src/functional/validationFns';
import { ruleFor } from '../src/functional/rules/ruleFor';
import Contact from './support/model/Contact';
import { validContact, invalidPhoneContact } from './support/instances/contact';

const rule = ruleFor<Contact>(x => x.firstName,
	notNull(
		// when(x => !!x.address),
		withMessage((val, parent) => 'First Name is null!'),
		// asWarning(),
		as('FirstName'),
	)
);

const result = rule.validate?.(validContact.firstName, validContact);
const result2 = rule.validate?.(null, validContact);

console.log(rule, result, result2);
