---
id: "ivalidatable"
title: "Interface: IValidatable<TParentValue, TCustomOptions>"
---

# Interface: IValidatable\<TParentValue, TCustomOptions>

## Type parameters

Name | Default |
------ | ------ |
`TParentValue` | any |
`TCustomOptions` | any |

## Hierarchy

* **IValidatable**

## Implemented by

* [CollectionRule](../classes/collectionrule.md)
* [Rule](../classes/rule.md)
* [Validator](../classes/validator.md)

## Properties

### propertyName

• `Optional` **propertyName**: string

*Defined in types.ts:7*

## Methods

### validate

▸ **validate**(`value`: any, `parentValue?`: TParentValue, `customOptions?`: TCustomOptions): [ValidationResultList](../classes/validationresultlist.md)

*Defined in types.ts:8*

#### Parameters:

Name | Type |
------ | ------ |
`value` | any |
`parentValue?` | TParentValue |
`customOptions?` | TCustomOptions |

**Returns:** [ValidationResultList](../classes/validationresultlist.md)
