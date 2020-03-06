import Customer from '../model/Customer';
import PhoneType from '../model/PhoneType';
import { validCustomer1Orders, validCustomer2Orders } from './order';

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
				display: 'Work'
			},
			{
				type: PhoneType.mobile,
				value: '3175656666',
				display: 'Cell'
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