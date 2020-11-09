---
id: "validationresultlist"
title: "Class: ValidationResultList"
---

# Class: ValidationResultList

## Hierarchy

* **ValidationResultList**

## Constructors

### constructor

\+ **new ValidationResultList**(`args?`: [ValidationResult](validationresult.md)[], `propertyName?`: string, `value?`: any): [ValidationResultList](validationresultlist.md)

*Defined in ValidationResultList.ts:6*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`args` | [ValidationResult](validationresult.md)[] | [] |
`propertyName?` | string | - |
`value?` | any | - |

**Returns:** [ValidationResultList](validationresultlist.md)

## Properties

### propertyName

•  **propertyName**: string \| undefined

*Defined in ValidationResultList.ts:5*

___

### value

•  **value**: any

*Defined in ValidationResultList.ts:6*

## Accessors

### entries

• get **entries**(): [ValidationResult](validationresult.md)[]

*Defined in ValidationResultList.ts:26*

**Returns:** [ValidationResult](validationresult.md)[]

___

### isValid

• get **isValid**(): boolean

*Defined in ValidationResultList.ts:14*

**Returns:** boolean

___

### length

• get **length**(): number

*Defined in ValidationResultList.ts:18*

**Returns:** number

___

### withErrors

• get **withErrors**(): [ValidationResultList](validationresultlist.md)

*Defined in ValidationResultList.ts:30*

**Returns:** [ValidationResultList](validationresultlist.md)

___

### withWarnings

• get **withWarnings**(): [ValidationResultList](validationresultlist.md)

*Defined in ValidationResultList.ts:34*

**Returns:** [ValidationResultList](validationresultlist.md)

## Methods

### clear

▸ **clear**(): void

*Defined in ValidationResultList.ts:38*

**Returns:** void

___

### forEach

▸ **forEach**(`cb`: (value: [ValidationResult](validationresult.md), index: number, array: [ValidationResult](validationresult.md)[]) => void): void

*Defined in ValidationResultList.ts:22*

#### Parameters:

Name | Type |
------ | ------ |
`cb` | (value: [ValidationResult](validationresult.md), index: number, array: [ValidationResult](validationresult.md)[]) => void |

**Returns:** void

___

### get

▸ **get**(`propertyName`: string): [ValidationResult](validationresult.md) \| void

*Defined in ValidationResultList.ts:43*

#### Parameters:

Name | Type |
------ | ------ |
`propertyName` | string |

**Returns:** [ValidationResult](validationresult.md) \| void

___

### getWithRelatedResults

▸ **getWithRelatedResults**(`propertyName`: string): [ValidationResultList](validationresultlist.md)

*Defined in ValidationResultList.ts:47*

#### Parameters:

Name | Type |
------ | ------ |
`propertyName` | string |

**Returns:** [ValidationResultList](validationresultlist.md)

___

### merge

▸ **merge**(`resultList`: [ValidationResultList](validationresultlist.md)): [ValidationResultList](validationresultlist.md)

*Defined in ValidationResultList.ts:66*

#### Parameters:

Name | Type |
------ | ------ |
`resultList` | [ValidationResultList](validationresultlist.md) |

**Returns:** [ValidationResultList](validationresultlist.md)

___

### push

▸ **push**(`result`: [ValidationResult](validationresult.md)): void

*Defined in ValidationResultList.ts:70*

#### Parameters:

Name | Type |
------ | ------ |
`result` | [ValidationResult](validationresult.md) |

**Returns:** void

___

### remove

▸ **remove**(`propertyName`: string): [ValidationResult](validationresult.md) \| null

*Defined in ValidationResultList.ts:79*

#### Parameters:

Name | Type |
------ | ------ |
`propertyName` | string |

**Returns:** [ValidationResult](validationresult.md) \| null

___

### removeWithRelatedResults

▸ **removeWithRelatedResults**(`propertyName`: string): [ValidationResultList](validationresultlist.md)

*Defined in ValidationResultList.ts:91*

#### Parameters:

Name | Type |
------ | ------ |
`propertyName` | string |

**Returns:** [ValidationResultList](validationresultlist.md)

___

### toArray

▸ **toArray**(): [ValidationResult](validationresult.md)[]

*Defined in ValidationResultList.ts:110*

**Returns:** [ValidationResult](validationresult.md)[]

___

### toObject

▸ **toObject**(): object

*Defined in ValidationResultList.ts:114*

**Returns:** object

___

### merge

▸ `Static`**merge**(`dest`: [ValidationResultList](validationresultlist.md), `src`: [ValidationResultList](validationresultlist.md)): [ValidationResultList](validationresultlist.md)

*Defined in ValidationResultList.ts:120*

#### Parameters:

Name | Type |
------ | ------ |
`dest` | [ValidationResultList](validationresultlist.md) |
`src` | [ValidationResultList](validationresultlist.md) |

**Returns:** [ValidationResultList](validationresultlist.md)
