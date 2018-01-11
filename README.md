# Field Quality
Fluent Field Validation Library

### Usage
Say you have a contact object that needs to be validated. The contact type looks something like this:
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

and could be implemented as follows: :
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

Not too helpful for validation; everything is of type String.

We need to define the shape of the contact object to better our chances of maintaining clean data. This can be accomplished using Field Quality `Model`s.

The `Model` class is intended to be extended using ES6 Classes.
```ts

```