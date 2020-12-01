# Getting Started

## Predicates

A predicate is just a function that takes in a value, checks that the value passes a condition, and returns `true` or `false`.

For instance:

```ts
function notNull(val: any): boolean {
  return val !== null;
}

notNull(null);    // false
notNull('test');  // true
```

FieldQuality is built on the concept of checking values with predicate functions, and provides a number of built-in predicates in the form of [stand-alone functions](./built-ins#predicate-functions). Predicate functions can be combined to validate a value:

```ts
import { predicates, rx } from 'field-quality';
const { match, notNull } = predicates;
const matchesDomesticPhone = match(rx.domesticphone)

function notNullAndMatchesDomesticPhone(val: any) {
  return notNull(val) && matchesDomesticPhone(val);
}

notNullAndMatchesDomesticPhone(null)            // false
notNullAndMatchesDomesticPhone('test')          // false
notNullAndMatchesDomesticPhone('317-555-5555')  // true
```

## Creating Rules

Composing predicate functions together can help with isolating conditions, but this technique doesn't scale. For this reason, FieldQuality provides a `Rule` class to help with the composition of predicates by allowing for **method chaining** by way of a **fluent interface**.

```ts
import { Rule, rx } from 'field-quality';

const rule = new Rule('phone');

rule
  .notNull()
  .match(rx.domesticphone);
```

The above code does the same thing as `notNullAndMatchesDomesticPhone`, but is much easier to read, and doesn't have any mile-long function names. However, this technique is only good for one-off validations, as it doesn't provide for a clean unit of reuse. We can do better than this by extending `Rule`.

```ts
import { Rule, rx } from 'field-quality';

class DomesticPhoneRule extends Rule {
  constructor() {
    super('phone');
    this.notNull().match(rx.domesticphone);
  }
}

const rule = new DomesticPhoneRule();
```

Both ways will validate the same way by calling `validate`.

```ts
let result = rule.validate(null);
result.isValid; // false

result = rule.validate('test');
result.isValid; // false

result = rule.validate('317-555-5555');
result.isValid; // true
```

## Validation Results

When `Rule` validates a value, it returns a `ValidationResult`, which has the following public properties:

* `isValid: boolean` - Whether the value passed to `validate` passes validation

* `propertyName: string` - The name that represents the value passed. This is provided via the `Rule` constructor ('phone' in the previous example).

* `value: any` - A **deep copy** of the value that was validated. FieldQuality will never mutate or return a validated value or reference.

* `errors: { [predicateName: string]: string }` - Contains validation messages, keyed to the names of the predicate functions that failed the passed value. By default, `Rule` will stop validating when it encounters a failed predicate, so errors will only have one entry. To allow all predicates to validate regardless of failure, see how to set [Cascade Mode](./configuring-rules#cascade-mode) on a `Rule`. Messages can also be configured by providing [Custom Messages](./configuring-rules#custom-messages).

* `warnings: { [predicateName: string]: string }` - Contains validation messages, keyed to the names of predicate functions that failed the passed value, but with a severity level of `Severity.warning`. See how to configure a predicate's [Severity](./configuring-rules#severity).

There are also the following convenience properties:

* `errorCount: number` - The number of errors in the result

* `warningCount: number` - The number of warnings in the result

The previous example will yield the following ValidationResults:

```ts
let result = rule.validate(null);
result.isValid;       // false
result.propertyName;  // 'phone'
result.value;         // null
result.errors;        // { notNull: 'phone cannot be null.' }
result.warnings;      // {}
result.errorCount;    // 1
result.warningCount;  // 0

result = rule.validate('test');
result.isValid;       // false
result.propertyName;  // 'phone'
result.value;         // 'test'
result.errors;        // { matchRx: 'phone is an invalid format.' }
result.warnings;      // {}
result.errorCount;    // 1
result.warningCount;  // 0

result = rule.validate('317-555-5555');
result.isValid;       // true
result.propertyName;  // 'phone'
result.value;         // '317-555-5555'
result.errors;        // {}
result.warnings;      // {}
result.errorCount;    // 0
result.warningCount;  // 0
```

See [Advanced Techniques](./advanced-techniques) for more ideas on how to use `ValidationResult`s.

## Creating Validators

## Validation Result Lists

## Creating Rules for Collections

## Reusing Rules and Validators
