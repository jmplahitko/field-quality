---
id: "collectionrule"
title: "Class: CollectionRule<TParentValue, TCustomOptions>"
---

# Class: CollectionRule\<TParentValue, TCustomOptions>

## Type parameters

Name | Default |
------ | ------ |
`TParentValue` | any |
`TCustomOptions` | any |

## Hierarchy

* [Rule](rule.md)\<TParentValue, TCustomOptions>

  ↳ **CollectionRule**

## Implements

* [IValidatable](../interfaces/ivalidatable.md)\<TParentValue, TCustomOptions>

## Constructors

### constructor

\+ **new CollectionRule**(`propertyName?`: string): [CollectionRule](collectionrule.md)

*Inherited from [Rule](rule.md).[constructor](rule.md#constructor)*

*Defined in Rule.ts:16*

#### Parameters:

Name | Type |
------ | ------ |
`propertyName?` | string |

**Returns:** [CollectionRule](collectionrule.md)

## Properties

### propertyName

•  **propertyName**: string

*Implementation of [IValidatable](../interfaces/ivalidatable.md).[propertyName](../interfaces/ivalidatable.md#propertyname)*

*Inherited from [Rule](rule.md).[propertyName](rule.md#propertyname)*

*Defined in Rule.ts:13*

## Methods

### cascade

▸ **cascade**(): void

*Inherited from [Rule](rule.md).[cascade](rule.md#cascade)*

*Defined in Rule.ts:190*

**Returns:** void

___

### enum

▸ **enum**(`allowedValues`: Array\<string \| number>): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Inherited from [Rule](rule.md).[enum](rule.md#enum)*

*Defined in Rule.ts:22*

#### Parameters:

Name | Type |
------ | ------ |
`allowedValues` | Array\<string \| number> |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### if

▸ **if**(`precondition`: [TPrecondition](../globals.md#tprecondition)\<TParentValue, TCustomOptions>, `define`: (rule: [Rule](rule.md)\<TParentValue, TCustomOptions>) => void): [Rule](rule.md)

*Inherited from [Rule](rule.md).[if](rule.md#if)*

*Defined in Rule.ts:209*

#### Parameters:

Name | Type |
------ | ------ |
`precondition` | [TPrecondition](../globals.md#tprecondition)\<TParentValue, TCustomOptions> |
`define` | (rule: [Rule](rule.md)\<TParentValue, TCustomOptions>) => void |

**Returns:** [Rule](rule.md)

___

### length

▸ **length**(`min`: number, `max`: number): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Inherited from [Rule](rule.md).[length](rule.md#length)*

*Defined in Rule.ts:38*

#### Parameters:

Name | Type |
------ | ------ |
`min` | number |
`max` | number |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### lengthOrEmpty

▸ **lengthOrEmpty**(`min`: number, `max`: number): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Inherited from [Rule](rule.md).[lengthOrEmpty](rule.md#lengthorempty)*

*Defined in Rule.ts:53*

#### Parameters:

Name | Type |
------ | ------ |
`min` | number |
`max` | number |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### matches

▸ **matches**(`rx`: RegExp): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Inherited from [Rule](rule.md).[matches](rule.md#matches)*

*Defined in Rule.ts:68*

#### Parameters:

Name | Type |
------ | ------ |
`rx` | RegExp |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### max

▸ **max**(`num`: number): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Inherited from [Rule](rule.md).[max](rule.md#max)*

*Defined in Rule.ts:112*

#### Parameters:

Name | Type |
------ | ------ |
`num` | number |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### maxExclusiveOf

▸ **maxExclusiveOf**(`num`: number): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Inherited from [Rule](rule.md).[maxExclusiveOf](rule.md#maxexclusiveof)*

*Defined in Rule.ts:128*

#### Parameters:

Name | Type |
------ | ------ |
`num` | number |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### min

▸ **min**(`num`: number): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Inherited from [Rule](rule.md).[min](rule.md#min)*

*Defined in Rule.ts:144*

#### Parameters:

Name | Type |
------ | ------ |
`num` | number |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### minExclusiveOf

▸ **minExclusiveOf**(`num`: number): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Inherited from [Rule](rule.md).[minExclusiveOf](rule.md#minexclusiveof)*

*Defined in Rule.ts:160*

#### Parameters:

Name | Type |
------ | ------ |
`num` | number |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### must

▸ **must**(`qualifier`: [TQualifier](../globals.md#tqualifier)\<TParentValue, TCustomOptions>): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Inherited from [Rule](rule.md).[must](rule.md#must)*

*Defined in Rule.ts:176*

#### Parameters:

Name | Type |
------ | ------ |
`qualifier` | [TQualifier](../globals.md#tqualifier)\<TParentValue, TCustomOptions> |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### notEmpty

▸ **notEmpty**(): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Inherited from [Rule](rule.md).[notEmpty](rule.md#notempty)*

*Defined in Rule.ts:98*

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### notNull

▸ **notNull**(): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Inherited from [Rule](rule.md).[notNull](rule.md#notnull)*

*Defined in Rule.ts:84*

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### using

▸ **using**(`validatable`: [IValidatable](../interfaces/ivalidatable.md)\<TParentValue, TCustomOptions>): [CollectionRule](collectionrule.md)\<TParentValue, TCustomOptions>

*Overrides [Rule](rule.md).[using](rule.md#using)*

*Defined in CollectionRule.ts:13*

#### Parameters:

Name | Type |
------ | ------ |
`validatable` | [IValidatable](../interfaces/ivalidatable.md)\<TParentValue, TCustomOptions> |

**Returns:** [CollectionRule](collectionrule.md)\<TParentValue, TCustomOptions>

___

### validate

▸ **validate**(`value`: any, `parentValue?`: TParentValue, `customOptions?`: TCustomOptions): [ValidationResultList](validationresultlist.md)

*Implementation of [IValidatable](../interfaces/ivalidatable.md)*

*Inherited from [Rule](rule.md).[validate](rule.md#validate)*

*Defined in Rule.ts:283*

#### Parameters:

Name | Type |
------ | ------ |
`value` | any |
`parentValue?` | TParentValue |
`customOptions?` | TCustomOptions |

**Returns:** [ValidationResultList](validationresultlist.md)

___

### where

▸ **where**(`filter`: [TCollectionFilter](../globals.md#tcollectionfilter)\<TParentValue, TCustomOptions>, `define`: (rule: [Rule](rule.md)\<TParentValue, TCustomOptions>) => void): [CollectionRule](collectionrule.md)\<TParentValue, TCustomOptions>

*Defined in CollectionRule.ts:28*

#### Parameters:

Name | Type |
------ | ------ |
`filter` | [TCollectionFilter](../globals.md#tcollectionfilter)\<TParentValue, TCustomOptions> |
`define` | (rule: [Rule](rule.md)\<TParentValue, TCustomOptions>) => void |

**Returns:** [CollectionRule](collectionrule.md)\<TParentValue, TCustomOptions>
