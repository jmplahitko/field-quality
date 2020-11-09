---
id: "validationresult"
title: "Class: ValidationResult"
---

# Class: ValidationResult

## Hierarchy

* **ValidationResult**

## Constructors

### constructor

\+ **new ValidationResult**(`propertyName`: string, `value?`: any): [ValidationResult](validationresult.md)

*Defined in ValidationResult.ts:9*

#### Parameters:

Name | Type |
------ | ------ |
`propertyName` | string |
`value?` | any |

**Returns:** [ValidationResult](validationresult.md)

## Properties

### errors

•  **errors**: { [qualifierName:string]: string;  }

*Defined in ValidationResult.ts:6*

___

### propertyName

•  **propertyName**: string

*Defined in ValidationResult.ts:8*

___

### value

•  **value**: any

*Defined in ValidationResult.ts:9*

___

### warnings

•  **warnings**: { [qualifierName:string]: string;  }

*Defined in ValidationResult.ts:7*

## Accessors

### errorCount

• get **errorCount**(): number

*Defined in ValidationResult.ts:20*

**Returns:** number

___

### isValid

• get **isValid**(): boolean

*Defined in ValidationResult.ts:16*

**Returns:** boolean

___

### warningCount

• get **warningCount**(): number

*Defined in ValidationResult.ts:24*

**Returns:** number

## Methods

### merge

▸ **merge**(`result`: [ValidationResult](validationresult.md)): [ValidationResult](validationresult.md)

*Defined in ValidationResult.ts:28*

#### Parameters:

Name | Type |
------ | ------ |
`result` | [ValidationResult](validationresult.md) |

**Returns:** [ValidationResult](validationresult.md)

___

### toValidationResultList

▸ **toValidationResultList**(): [ValidationResultList](validationresultlist.md)

*Defined in ValidationResult.ts:32*

**Returns:** [ValidationResultList](validationresultlist.md)

___

### merge

▸ `Static`**merge**(`dest`: [ValidationResult](validationresult.md), `src`: [ValidationResult](validationresult.md)): [ValidationResult](validationresult.md)

*Defined in ValidationResult.ts:36*

#### Parameters:

Name | Type |
------ | ------ |
`dest` | [ValidationResult](validationresult.md) |
`src` | [ValidationResult](validationresult.md) |

**Returns:** [ValidationResult](validationresult.md)
