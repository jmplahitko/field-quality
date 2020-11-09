---
id: "ruleapi"
title: "Class: RuleApi<TParentValue, TCustomOptions>"
---

# Class: RuleApi\<TParentValue, TCustomOptions>

## Type parameters

Name |
------ |
`TParentValue` |
`TCustomOptions` |

## Hierarchy

* **RuleApi**

## Constructors

### constructor

\+ **new RuleApi**(`validatable`: [Rule](rule.md)\<TParentValue, TCustomOptions>, `meta`: [TValidatableMetadata](../globals.md#tvalidatablemetadata)\<TParentValue, TCustomOptions>): [RuleApi](ruleapi.md)

*Defined in RuleApi.ts:8*

#### Parameters:

Name | Type |
------ | ------ |
`validatable` | [Rule](rule.md)\<TParentValue, TCustomOptions> |
`meta` | [TValidatableMetadata](../globals.md#tvalidatablemetadata)\<TParentValue, TCustomOptions> |

**Returns:** [RuleApi](ruleapi.md)

## Methods

### as

▸ **as**(`qualifierName`: string): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Defined in RuleApi.ts:71*

#### Parameters:

Name | Type |
------ | ------ |
`qualifierName` | string |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### asWarning

▸ **asWarning**(): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Defined in RuleApi.ts:76*

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### cascade

▸ **cascade**(): void

*Defined in RuleApi.ts:63*

**Returns:** void

___

### enum

▸ **enum**(`allowedValues`: Array\<string \| number>): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Defined in RuleApi.ts:15*

#### Parameters:

Name | Type |
------ | ------ |
`allowedValues` | Array\<string \| number> |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### if

▸ **if**(`precondition`: [TPrecondition](../globals.md#tprecondition)\<TParentValue, TCustomOptions>, `define`: (rule: [Rule](rule.md)\<TParentValue, TCustomOptions>) => void): [Rule](rule.md)\<TParentValue, TCustomOptions>

*Defined in RuleApi.ts:19*

#### Parameters:

Name | Type |
------ | ------ |
`precondition` | [TPrecondition](../globals.md#tprecondition)\<TParentValue, TCustomOptions> |
`define` | (rule: [Rule](rule.md)\<TParentValue, TCustomOptions>) => void |

**Returns:** [Rule](rule.md)\<TParentValue, TCustomOptions>

___

### length

▸ **length**(`min`: number, `max`: number): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Defined in RuleApi.ts:23*

#### Parameters:

Name | Type |
------ | ------ |
`min` | number |
`max` | number |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### lengthOrEmpty

▸ **lengthOrEmpty**(`min`: number, `max`: number): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Defined in RuleApi.ts:27*

#### Parameters:

Name | Type |
------ | ------ |
`min` | number |
`max` | number |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### matches

▸ **matches**(`rx`: RegExp): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Defined in RuleApi.ts:31*

#### Parameters:

Name | Type |
------ | ------ |
`rx` | RegExp |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### max

▸ **max**(`num`: number): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Defined in RuleApi.ts:35*

#### Parameters:

Name | Type |
------ | ------ |
`num` | number |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### maxExclusiveOf

▸ **maxExclusiveOf**(`num`: number): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Defined in RuleApi.ts:39*

#### Parameters:

Name | Type |
------ | ------ |
`num` | number |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### min

▸ **min**(`num`: number): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Defined in RuleApi.ts:43*

#### Parameters:

Name | Type |
------ | ------ |
`num` | number |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### minExclusiveOf

▸ **minExclusiveOf**(`num`: number): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Defined in RuleApi.ts:47*

#### Parameters:

Name | Type |
------ | ------ |
`num` | number |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### must

▸ **must**(`qualifier`: [TQualifier](../globals.md#tqualifier)\<TParentValue, TCustomOptions>): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Defined in RuleApi.ts:51*

#### Parameters:

Name | Type |
------ | ------ |
`qualifier` | [TQualifier](../globals.md#tqualifier)\<TParentValue, TCustomOptions> |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### notEmpty

▸ **notEmpty**(): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Defined in RuleApi.ts:59*

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### notNull

▸ **notNull**(): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Defined in RuleApi.ts:55*

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### using

▸ **using**(`validatable`: [IValidatable](../interfaces/ivalidatable.md)): [Rule](rule.md)\<any, any>

*Defined in RuleApi.ts:67*

#### Parameters:

Name | Type |
------ | ------ |
`validatable` | [IValidatable](../interfaces/ivalidatable.md) |

**Returns:** [Rule](rule.md)\<any, any>

___

### when

▸ **when**(`precondition`: [TPrecondition](../globals.md#tprecondition)\<TParentValue, TCustomOptions>): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Defined in RuleApi.ts:81*

#### Parameters:

Name | Type |
------ | ------ |
`precondition` | [TPrecondition](../globals.md#tprecondition)\<TParentValue, TCustomOptions> |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

___

### withMessage

▸ **withMessage**(`message`: [TMessageFactory](../globals.md#tmessagefactory)\<TParentValue, TCustomOptions>): [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>

*Defined in RuleApi.ts:86*

#### Parameters:

Name | Type |
------ | ------ |
`message` | [TMessageFactory](../globals.md#tmessagefactory)\<TParentValue, TCustomOptions> |

**Returns:** [RuleApi](ruleapi.md)\<TParentValue, TCustomOptions>
