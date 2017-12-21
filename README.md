```js
import { Model, Rule } from 'field-quality';

const beValidColor = (color: string) => {
	let colors = ['white', 'black', 'calico'];
	return colors.includes(color);
}

const beValidFurType = (type: string) => {
	let types = ['long', 'short', 'bald'];
	return types.includes(type);
}

// type TAddress = {
// 	line1: string,
// 	line2: string,
// 	city: string,
// 	state: string,
// 	zip: string
// }

const beValidString = (val: any) => {
	return typeof val === 'string';
}

class Address extends Model {
	protected define(model: Address) {
		model.ruleFor('line1')
			.must('beValidString', beValidString)
			.withMessage('Line 1 must be a string');

		model.ruleFor('line2')
			.must('beValidString', beValidString)
			.withMessage('Line 2 must be a string');

		model.ruleFor('city')
			.must('beValidString', beValidString)
			.withMessage('City must be a string');

		model.ruleFor('state')
			.must('beValidString', beValidString)
			.withMessage('State must be a string');

		model.ruleFor('zip')
			.must('beValidString', beValidString)
			.withMessage('Zip must be a string');
	}
}

class Owner extends Model {
	protected define(model: Owner) {
		model.ruleFor('address')
			.as(Address);
	}
}

class Cat extends Model {
	protected define(model: Cat) {
		model.ruleFor('color')
			.must('beValidColor', beValidColor)
			.withMessage(`Cat's color must be white, black, or calico.`);


		model.ruleFor('furType')
			.must('beValidFurType', beValidFurType)
			.withMessage(`Cat's color must be white, black, or calico.`);

		model.ruleFor('owner')
			.as(Owner);
	}
}

let cat = new Cat({
	color: 'white',
	furType: 'long',
	owner: {
		address: {
			line1: 445,
			line2: 'Apt 3',
			city: 'Indianapolis',
			state: 'In',
			zip: '46234'
		}
	}
});

let line1 = cat.get('owner.address.line1');
line1.set('445');
console.log(line1.value);
let result = line1.rollback();
console.log(line1.value);
```