import Order from '../model/Order';

export const validCustomer1Orders = [
	{
		orderDate: '2014-07-05T00:00:00.000Z',
		requiredDate: '2014-08-16T00:00:00.000Z',
		shippedDate: '2014-07-10T00:00:00.000Z',
		freight: 11.61,
		totalPrice: 1875.01,
		shipAddress: {
			line1: '7890 Hanover Sq',
			line2: 'Ste 123',
			city: 'Indianapolis',
			region: 'IN',
			postalCode: '46201',
			country: 'USA'
		},
		products: [
			{
				name: 'Product PWCJB',
				unitPrice: 18.6,
				quantity: 9
			},
			{
				name: 'Product APITJ',
				unitPrice: 42.40,
				quantity: 40
			}
		]
	},
	{
		orderDate: '2015-08-25T00:00:00.000Z',
		requiredDate: '2015-09-22T00:00:00.000Z',
		shippedDate: '2015-09-02T00:00:00.000Z',
		freight: 29.46,
		totalPrice: 1115.46,
		shipAddress: {
			line1: '7890 Hanover Sq',
			line2: 'Ste 123',
			city: 'Indianapolis',
			region: 'IN',
			postalCode: '46201',
			country: 'USA'
		},
		products: [
			{
				name: 'Product OFBNT',
				unitPrice: 45.6000,
				quantity: 15
			},
			{
				name: 'Product LSOFL',
				unitPrice: 18.0000,
				quantity: 21
			},
			{
				name: 'Product CBRRL',
				unitPrice: 12.0000,
				quantity: 2
			}
		]
	}
];

export const validCustomer2Orders = [
	{
		orderDate: '2014-07-04T00:00:00.000Z',
		requiredDate: '2014-08-01T00:00:00.000Z',
		shippedDate: '2014-07-16T00:00:00.000Z',
		freight: 32.38,
		totalPrice: 598.38,
		shipAddress: {
			line1: '8901 Tsawassen Blvd.',
			city: 'Tsawassen',
			region: 'BC',
			postalCode: '10111',
			country: 'Canada'
		},
		products: [
			{
				name: 'Product QMVUN',
				unitPrice: 21.00,
				quantity: 12
			},
			{
				name: 'Product RJVNM',
				unitPrice: 14.00,
				quantity: 10
			},
			{
				name: 'Product GEEOO',
				unitPrice: 34.80,
				quantity: 5
			}
		]
	}
];