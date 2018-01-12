# Field Quality
## Fluent Field Validation Library

This library is intended to be used to validate data. The library relies on ES6 classes and specifically the extension of a base class named `Validator`. The terms **model** and **field** will be used to specify validation objects and their corresponding properties respectively. Complex data structures (i.e., objects) are referred to as models while primitive data types are referred to as fields.

Additionally, this library employes a *fluent interface* (method chaining) approach for defining validation rules and associated behavior, with the intent of affording increased readability.

## How to Use this Library

Say you have a contact object that you would like to validate. The contact object and its fields/types might look something like this:

```ts
type contact = {
	name: String,
	phone: String,
	email: String,
	address: {
		line1: String,
		line2: String,
		city: String,
		state: String,
		zip: String
	}
}
```

and could be implemented as such:

```ts
let contact = {
	name: 'Korbin Dallas',
	phone: '888-555-2323',
	email: 'korbin@TaxiDriversRUs.com',
	address: {
		line1: '45 South West St',
		line2: 'PO Box 23',
		city: 'Fictional City',
		state: 'IN',
		zip: '46223-8998'
	}
}
```

Notice that the above is not entirely helpful on its own; we basically only know that everything is supposed to be of a type String. That information does little to give us knowledge of runtime issues. It also does not take in to consideration the *shape* of the contact object. In order to address our runtime concerns as well as give us a sense of the shape of the contact object, we'll want to explicitly define rules for concerning fields. We can also reason about the shape of our to-be-validated objects when defining rules. Doing so will help to maintain cleaner, more predictable data.

In order to go about defining rules and shaping our data, we'll want to begin by importing and extending the Field Quality Library's `Validator` class. The `Validator` class can be imported within a Typescript file (.ts).

Here we'll use a `Contact` class to define our validation rules for our contact object:

```ts
import { Validator } from 'field-quality';

class Contact extends Validator {
	// rules will be defined here
}
```

After importing and extending, we'll want to implement a protected `define` method on our `Contact` class. The `define` method will accept one argument (`model`) of the type `Contact`. With the `define` method in place, we are now ready to start defining validation rules. The rules will be defined by calling chained methods on `define`'s `model` argument:

```ts
import { Validator } from 'field-quality';

class Contact extends Validator {
	protected define(model: Contact) {
		model.ruleFor('name')
			.notEmpty()
			.withMessage('The name field cannot be empty.')
			.length(10, 20)
			.withMessage('Name must be between 10 and 20 characters.')
	}
}
```

Here, it's useful to note that Typescript will allow your IDE to tell you which methods are available in the flow of the rule chain (VS Code provides a dropdown list as you type). Also worth noting is the fact that if a message is not specified with the `withMessage` method, then a generic error message will be applied.

What's more, in order to specifiy stopping behavior within the rule chain, you can use the `stopOnFirstFailuer` method (NOTE: there are no additional validation methods allowed after calling `stopOnFirstFailure`). This method tells the validator to stop checking rules and return a result as soon as any rule is found to return an invalid result. Implementing `stopOnFirstFailure` looks like this:

```ts
import { Validator } from 'field-quality';

class Contact extends Validator {
	protected define(model: Contact) {
		model.ruleFor('name')
			.notEmpty()
			.withMessage('The name field cannot be empty.')
			.length(10, 20)
			.withMessage('Name must be between 10 and 20 characters.')
			.stopOnFirstFailure();
	}
}
```

For more complex data (e.g., objects within objects) such as the address object in our original contact object, if you'd like to validate the fields of the nested object, then you'll want to use the `setValidator` method in conjuction with a call `ruleFor`. With our contact object example, in order to validate the fields of the contact object's nested address object, we'll want to create an additional `Address` validator class and pass it to the aforementioned `setValidator` method. Adding that functionality to our existing example looks like this:

 ```ts
import { Validator } from 'field-quality';

class Address extends Validator {
	protected define(model: Address) {
		model.ruleFor('line1')
			.notEmpty()
			.withMessage('Address line1 cannot be empty.');
	}
}

class Contact extends Validator {
	protected define(model: Contact) {
		model.ruleFor('name')
			.notEmpty()
			.withMessage('The name field cannot be empty.')
			.length(10, 20)
			.withMessage('Name must be between 10 and 20 characters.')
			.stopOnFirstFailure();

		model.ruleFor('address')
			.setValidator(Address);
	}
}
```

This part can be a bit tricky... Just remember, if you need to validate primitive data, then you'll want to use specific rules inside of a validator class. If, on the other hand, you need to validate complex data (i.e., nested objects), then you'll pass an additionally created validator to the `setValidator` method within the parent validator.

Finally, you can get the result of a validation object by creating an instance of your newly extended validator class and calling its `validate` method. Here we would instantiate a `new Contact()`, passing it the contact object that we've been using, and then calling the `validate` method of that newly created instance:

```ts
import { Validator } from 'field-quality';

class Address extends Validator {
	protected define(model: Address) {
		model.ruleFor('line1')
			.notEmpty()
			.withMessage('Address line1 cannot be empty.');
	}
}

class Contact extends Validator {
	protected define(model: Contact) {
		model.ruleFor('name')
			.notEmpty()
			.withMessage('The name field cannot be empty.')
			.length(10, 20)
			.withMessage('Name must be between 10 and 20 characters.')
			.stopOnFirstFailure();

		model.ruleFor('address')
			.setValidator(Address);
	}
}

let validationObj = new Contact(contact);
let validationResult = validationObj.validate();

console.log(validationResult); // will provide an interrogable object with an isValid method, as well as relevant errors
```
`if`

You can define conditionals to control whether or not rules are applied. Let's say you only want to check validation on a field if another field isn't blank. To accomplish that, you will want to use the `if` method in conjunction with your rules. The `if` method accepts a predicate lambda function. If the lambda function returns `true`, then the rules within the if block are applied and validation is checked as normal. If the lambda returns `false`, then the following rules/validation checks will not be applied.

Specifically, if we wanted to run validation on a last name field IF AND ONLY IF the first name field isn't blank, then we would construct a validator that looks something like this:

```ts
import { Model, quality, rx } from 'field-quality';
const { isEmpty, isNull } = quality;

let contact = {
	firstName: '',
	lastName: 'Smith'
};

class Contact extends Validator {
	protected define(model: Contact) {
		model.ruleFor('firstName')
			.matches(rx.name)
			.withMessage('Name must meet the requirements for a name.');

		model.ruleFor('lastName')
			.if(contact => !isEmpty(contact.firstName), rule => {
				rule
					.notEmpty()
					.withMessage('If you provide a first name, then you must provide a last name.')
					.length(10, 50)
					.stopOnFirstFailure();
			})
	}
}
```

In the above example, the checks on last name will only be run if firstName filed of the object being validated is not empty.

And that's the gist of it! You have an object you want to validate, you extend the base `Validator` class and declare a `protected define` method that accepts a `model` argument. You then define rules on the `model` parameter within the `define` method. If you're validating primitive data/fields, then you chain together rules. If you're validating objects within objects, then you'll extend an additional `Validator` class and pass that class to the `setValidator` method within the parent validator. You can use the `if` method to specify conditions under which rules should be evaluated.

## Additional Considerations

`quality` and `rx`

The `quality` and `rx` modules are handy utilities can be imported and utlilized in your validation classes. The `quality` module provides helper methods such as `isEmpty`. The `rx` module is the collection of default regular expressions used to validate common field types such as addresses or phone numbers.

Importing those modules and using the `rx` module to create a rule saying that the `name` field must match the regex for name looks like this:

```ts
import { Validator, quality, rx } from 'field-quality';

class Contact extends Validator {
	protected define(model: Contact) {
		model.ruleFor('name')
			.matches(rx.name)
			.withMessage('Name field needs to conform to the name regex.')
			.stopOnFirstFailure();
	}
}
```