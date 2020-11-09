---
id: "rule"
title: "Class: Rule<TParentValue, TCustomOptions>"
---

# Class: Rule\<TParentValue, TCustomOptions>

## Type parameters

Name | Default |
------ | ------ |
`TParentValue` | any |
`TCustomOptions` | any |

## Hierarchy

* **Rule**

  ↳ [CollectionRule](collectionrule.md)

## Implements

* [IValidatable](../interfaces/ivalidatable.md)\<TParentValue, TCustomOptions>

## Constructors

### constructor

\+ **new Rule**(`propertyName?`: string): [Rule](rule.md)

*Defined in Rule.ts:16*

#### Parameters:

Name | Type |
------ | ------ |
`propertyName?` | string |

**Returns:** [Rule](rule.md)

## Properties

### propertyName

•  **propertyName**: string

*Implementation of [IValidatable](../interfaces/ivalidatable.md).[propertyName](../interfaces/ivalidatable.md#propertyname)*

*Defined in Rule.ts:13*

## Methods

### cascade

▸ **cascade**(): void

*Defined in Rule.ts:190*

**Returns:** void

___

### enum

▸ **enum**(`allowedValues`: Array\<string \| number>): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Defined in Rule.ts:22*

#### Parameters:

Name | Type |
------ | ------ |
`allowedValues` | Array\<string \| number> |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### if

▸ **if**(`precondition`: [TPrecondition](../globals.md#tprecondition)\<TParentValue, TCustomOptions>, `define`: (rule: [Rule](rule.md)\<TParentValue, TCustomOptions>) => void): [Rule](rule.md)

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

*Defined in Rule.ts:68*

#### Parameters:

Name | Type |
------ | ------ |
`rx` | RegExp |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### max

▸ **max**(`num`: number): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Defined in Rule.ts:112*

#### Parameters:

Name | Type |
------ | ------ |
`num` | number |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### maxExclusiveOf

▸ **maxExclusiveOf**(`num`: number): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Defined in Rule.ts:128*

#### Parameters:

Name | Type |
------ | ------ |
`num` | number |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### min

▸ **min**(`num`: number): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Defined in Rule.ts:144*

#### Parameters:

Name | Type |
------ | ------ |
`num` | number |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### minExclusiveOf

▸ **minExclusiveOf**(`num`: number): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Defined in Rule.ts:160*

#### Parameters:

Name | Type |
------ | ------ |
`num` | number |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### must

▸ **must**(`qualifier`: [TQualifier](../globals.md#tqualifier)\<TParentValue, TCustomOptions>): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Defined in Rule.ts:176*

#### Parameters:

Name | Type |
------ | ------ |
`qualifier` | [TQualifier](../globals.md#tqualifier)\<TParentValue, TCustomOptions> |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### notEmpty

▸ **notEmpty**(): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Defined in Rule.ts:98*

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### notNull

▸ **notNull**(): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Defined in Rule.ts:84*

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### using

▸ **using**(`validatable`: [IValidatable](../interfaces/ivalidatable.md)\<TParentValue, TCustomOptions>): [Rule](rule.md)

*Defined in Rule.ts:194*

#### Parameters:

Name | Type |
------ | ------ |
`validatable` | [IValidatable](../interfaces/ivalidatable.md)\<TParentValue, TCustomOptions> |

**Returns:** [Rule](rule.md)

___

### validate

▸ **validate**(`value`: any, `parentValue?`: TParentValue, `customOptions?`: TCustomOptions): [ValidationResultList](validationresultlist.md)

*Implementation of [IValidatable](../interfaces/ivalidatable.md)*

*Defined in Rule.ts:283*

#### Parameters:

Name | Type |
------ | ------ |
`value` | any |
`parentValue?` | TParentValue |
`customOptions?` | TCustomOptions |

**Returns:** [ValidationResultList](validationresultlist.md)
