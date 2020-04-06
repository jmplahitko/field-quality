import 'jasmine';

describe('ValidationResultList#isValid', () => {
	it('should be true when #withErrors().length is 0', () => {

	});

	it('should be false when #withErrors().length is greater than 0', () => {

	});

	it('should be true when #withWarnings().length is greater than 0', () => {

	});
});

describe('ValidationResultList#withErrors', () => {
	it('should return a new ValidationResultList', () => {

	});

	it('should return a new ValidationResultList who\'s entries all contain errors', () => {

	});
});

describe('ValidationResultList#withWarnings', () => {
	it('should return a new ValidationResultList', () => {

	});

	it('should return a new ValidationResultList who\'s entries all contain warnings', () => {

	});
});

describe('ValidationResultList#clear', () => {
	it('should remove all entries', () => {

	});
});

describe('ValidationResultList#get', () => {
	it('should return a ValidationResult if found, null if not found', () => {

	});
});

describe('ValidationResultList#getWithRelatedResults', () => {
	it('should return a new ValidationResultList', () => {

	});

	it('should return a ValidationResultList containing a ValidationResult for an array property and for each of its contained elements', () => {

	});

	it('should return a ValidationResultList containing a ValidationResult for an object property and for each of its own keys', () => {

	});
});

describe('ValidationResultList#merge', () => {
	it('should not break reference from itself when merging another ValidationResultList', () => {

	});

	it('should merge entries of two ValidationResultLists', () => {

	});
});

describe('ValidationResultList#push', () => {
	it('should increase entry length by one when an entry with matching propertyName does not exist', () => {

	});

	it('should merge a push candidate with an existing entry when propertyName matches', () => {

	});
});

describe('ValidationResultList#remove', () => {
	it('should remove a ValidationResult from its entries', () => {

	});

	it('should return the ValidationResult when successfully removed', () => {

	});

	it('should return null when ValidationResult is not successfully removed', () => {

	});
});

describe('ValidationResultList#removeWithRelatedResults', () => {
	it('should return a new ValidationResultList', () => {

	});

	it('should remove the ValidationResult for an array property and each of its contained elements', () => {

	});

	it('should return a ValidationResultList containing the removed ValidationResult for an array property and for each of its contained elements', () => {

	});

	it('should remove the ValidationResult for an object property and each of its contained elements', () => {

	});

	it('should return a ValidationResultList containing the removed ValidationResult for an object property and for each of its own keys', () => {

	});
});

describe('ValidationResultList#toArray', () => {
	it('should return a new array that accurately represents the ValidationResultList\'s entries', () => {

	});
});

describe('ValidationResultList#toObject', () => {
	it('should return a key/value pair where each value is a ValidationResult and each key is it\'s value\'s propertyName', () => {

	});
});