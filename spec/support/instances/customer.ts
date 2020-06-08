import Customer from '../model/Customer';
import PhoneType from '../model/PhoneType';
import { validCustomer1Orders, validCustomer2Orders } from './order';
import Phone from '../model/Phone';

export const validCustomer1: Customer = {
	companyName: 'Customer NRZBB',
	contact: {
		firstName: 'Michael',
		lastName: 'Allen',
		title: 'Sales Representative',
		phone: [
			{
				type: PhoneType.work,
				value: '3175555555',
				display: 'Work',
				isInternational: false
			},
			{
				type: PhoneType.mobile,
				value: '3175656666',
				display: 'Cell',
				isInternational: false
			}
		]
	},
	address: {
		line1: '7890 Hanover Sq',
		line2: 'Ste 123',
		city: 'Indianapolis',
		region: 'IN',
		postalCode: '46201',
		country: 'USA'
	},
	orders: validCustomer1Orders
};

const invalidPhoneCustomer1: Customer = { ...validCustomer1 };
invalidPhoneCustomer1.contact.phone = [
	{
		// @ts-ignore - We are intentionally setting a bad enum value here.
		type: 'badType',
		value: '3175555555',
		display: 'Work',
		isInternational: false
	},
	{
		type: PhoneType.mobile,
		value: '3175656666',
		display: 'Cell',
		isInternational: false
	}
];

export { invalidPhoneCustomer1 };

export const validCustomer2: Customer = {
	companyName: 'Customer EEALV',
	contact: {
		firstName: 'Scott',
		middleName: 'M',
		lastName: 'Culp',
		title: 'Account Manager',
		phone: [
			{
				type: PhoneType.work,
				value: '6049012345',
				display: 'Work',
				isInternational: false
			},
			{
				type: PhoneType.mobile,
				value: '+44 7911 123456',
				display: 'Cell',
				isInternational: true
			}
		]
	},
	address: {
		line1: '8901 Tsawassen Blvd.',
		city: 'Tsawassen',
		region: 'BC',
		postalCode: '10111',
		country: 'Canada'
	},
	orders: validCustomer2Orders
};

const invalidPhoneForCustomer2: Phone[] = [
	{
		type: PhoneType.work,
		value: '6049012345',
		display: 'Work',
		isInternational: false
	},
	{
		type: PhoneType.mobile,
		value: '+44 7911 123456',
		display: 'Cell',
		isInternational: false
	}
];

export { invalidPhoneForCustomer2 };