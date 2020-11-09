---
id: "validator"
title: "Class: Validator<TParentValue, TCustomOptions>"
---

# Class: Validator\<TParentValue, TCustomOptions>

## Type parameters

Name | Default |
------ | ------ |
`TParentValue` | any |
`TCustomOptions` | any |

## Hierarchy

* **Validator**

## Implements

* [IValidatable](../interfaces/ivalidatable.md)\<TParentValue, TCustomOptions>

## Accessors

### propertyName

• get **propertyName**(): string

*Defined in Validator.ts:14*

**Returns:** string

• set **propertyName**(`propertyName`: string \| undefined): void

*Defined in Validator.ts:18*

#### Parameters:

Name | Type |
------ | ------ |
`propertyName` | string \| undefined |

**Returns:** void

## Methods

### validate

▸ **validate**(`value`: any, `parentValue?`: TParentValue \| TCustomOptions, `customOptions?`: TCustomOptions): [ValidationResultList](validationresultlist.md)

*Defined in Validator.ts:74*

The overload is used internally in order to allow for Validator and Rule instances to be grouped together in
a TValidatorCollection. Note that if used externally, parentValue will be ignored and the third argument supplied
will be used as customOptions.

#### Parameters:

Name | Type |
------ | ------ |
`value` | any |
`parentValue?` | TParentValue \| TCustomOptions |
`customOptions?` | TCustomOptions |

**Returns:** [ValidationResultList](validationresultlist.md)

___

### validateProperty

▸ **validateProperty**(`propertyName`: string, `parentValue`: TParentValue, `customOptions?`: TCustomOptions, `outResultList?`: [ValidationResultList](validationresultlist.md)): [ValidationResultList](validationresultlist.md)

*Defined in Validator.ts:48*

#### Parameters:

Name | Type |
------ | ------ |
`propertyName` | string |
`parentValue` | TParentValue |
`customOptions?` | TCustomOptions |
`outResultList?` | [ValidationResultList](validationresultlist.md) |

**Returns:** [ValidationResultList](validationresultlist.md)
