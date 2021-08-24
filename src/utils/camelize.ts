export default function camelize(str: string): string {
	return `${str[0].toLowerCase()}${str.substr(1)}`.replace(/\s/g, '');
}