---
id: "globals"
title: "field-quality"
---

# field-quality

## Index

### Enumerations

* [Severity](enums/severity.md)

### Classes

* [CollectionRule](classes/collectionrule.md)
* [Rule](classes/rule.md)
* [RuleApi](classes/ruleapi.md)
* [ValidationResult](classes/validationresult.md)
* [ValidationResultList](classes/validationresultlist.md)
* [Validator](classes/validator.md)

### Interfaces

* [IValidatable](interfaces/ivalidatable.md)

### Type aliases

* [TCollectionFilter](globals.md#tcollectionfilter)
* [TErrorCollection](globals.md#terrorcollection)
* [TMessageFactory](globals.md#tmessagefactory)
* [TPrecondition](globals.md#tprecondition)
* [TQualifier](globals.md#tqualifier)
* [TQualifierCollection](globals.md#tqualifiercollection)
* [TRuleCollection](globals.md#trulecollection)
* [TSelector](globals.md#tselector)
* [TSubsetRuleCollection](globals.md#tsubsetrulecollection)
* [TSubsetRuleMetadata](globals.md#tsubsetrulemetadata)
* [TValidatableMetadata](globals.md#tvalidatablemetadata)
* [TValidatorCollection](globals.md#tvalidatorcollection)

### Variables

* [address](globals.md#address)
* [allcharacters](globals.md#allcharacters)
* [banknumber](globals.md#banknumber)
* [city](globals.md#city)
* [currency](globals.md#currency)
* [date](globals.md#date)
* [domesticphone](globals.md#domesticphone)
* [ein](globals.md#ein)
* [email](globals.md#email)
* [floatsonly](globals.md#floatsonly)
* [foreignphone](globals.md#foreignphone)
* [fullname](globals.md#fullname)
* [hasOwnProperty](globals.md#hasownproperty)
* [iso8601](globals.md#iso8601)
* [iso8601constricted](globals.md#iso8601constricted)
* [lastname](globals.md#lastname)
* [lettersonly](globals.md#lettersonly)
* [militarytime](globals.md#militarytime)
* [name](globals.md#name)
* [nospecialcharacters](globals.md#nospecialcharacters)
* [numbersonly](globals.md#numbersonly)
* [password](globals.md#password)
* [routingnumber](globals.md#routingnumber)
* [ssn](globals.md#ssn)
* [title](globals.md#title)
* [username](globals.md#username)
* [zipcode](globals.md#zipcode)

### Functions

* [beBoolean](globals.md#beboolean)
* [beInRange](globals.md#beinrange)
* [beValidEnum](globals.md#bevalidenum)
* [cleanseAssertionOperators](globals.md#cleanseassertionoperators)
* [copy](globals.md#copy)
* [getMemberPath](globals.md#getmemberpath)
* [getProperty](globals.md#getproperty)
* [hasAnyFlags](globals.md#hasanyflags)
* [hasFlags](globals.md#hasflags)
* [is](globals.md#is)
* [isArray](globals.md#isarray)
* [isBlankObject](globals.md#isblankobject)
* [isBoolean](globals.md#isboolean)
* [isBufferArray](globals.md#isbufferarray)
* [isDate](globals.md#isdate)
* [isEmpty](globals.md#isempty)
* [isEqual](globals.md#isequal)
* [isFunction](globals.md#isfunction)
* [isHash](globals.md#ishash)
* [isInteger](globals.md#isinteger)
* [isIso8601DateString](globals.md#isiso8601datestring)
* [isNull](globals.md#isnull)
* [isNumber](globals.md#isnumber)
* [isObject](globals.md#isobject)
* [isPromise](globals.md#ispromise)
* [isRegExp](globals.md#isregexp)
* [isString](globals.md#isstring)
* [isTypedArray](globals.md#istypedarray)
* [isUndefined](globals.md#isundefined)
* [isWindow](globals.md#iswindow)
* [length](globals.md#length)
* [lengthOrEmpty](globals.md#lengthorempty)
* [match](globals.md#match)
* [max](globals.md#max)
* [min](globals.md#min)
* [normalizeValidateArgs](globals.md#normalizevalidateargs)
* [notEmpty](globals.md#notempty)
* [notNull](globals.md#notnull)
* [simpleCompare](globals.md#simplecompare)
* [split](globals.md#split)

## Type aliases

### TCollectionFilter

Ƭ  **TCollectionFilter**\<TParentValue, TCustomOptions>: (value: any, index: number, collection: Array\<any>, parentValue: TParentValue, customOptions: TCustomOptions) => boolean

*Defined in types.ts:13*

#### Type parameters:

Name |
------ |
`TParentValue` |
`TCustomOptions` |

___

### TErrorCollection

Ƭ  **TErrorCollection**: { [ruleName:string]: string;  }

*Defined in types.ts:15*

___

### TMessageFactory

Ƭ  **TMessageFactory**\<TParentValue, TCustomOptions>: (value: any, parentValue: TParentValue, customOptions: TCustomOptions) => string

*Defined in types.ts:19*

#### Type parameters:

Name | Default |
------ | ------ |
`TParentValue` | any |
`TCustomOptions` | any |

___

### TPrecondition

Ƭ  **TPrecondition**\<TParentValue, TCustomOptions>: (parentValue: TParentValue, customOptions: TCustomOptions) => boolean

*Defined in types.ts:29*

#### Type parameters:

Name | Default |
------ | ------ |
`TParentValue` | any |
`TCustomOptions` | any |

___

### TQualifier

Ƭ  **TQualifier**\<TParentValue, TCustomOptions>: (value: any, parentValue: TParentValue, customOptions: TCustomOptions) => boolean

*Defined in types.ts:31*

#### Type parameters:

Name | Default |
------ | ------ |
`TParentValue` | any |
`TCustomOptions` | any |

___

### TQualifierCollection

Ƭ  **TQualifierCollection**\<TParentValue, TCustomOptions>: Map\<[TQualifier](globals.md#tqualifier)\<TParentValue, TCustomOptions>, [TValidatableMetadata](globals.md#tvalidatablemetadata)\<TParentValue, TCustomOptions>>

*Defined in types.ts:33*

#### Type parameters:

Name |
------ |
`TParentValue` |
`TCustomOptions` |

___

### TRuleCollection

Ƭ  **TRuleCollection**\<TParentValue, TCustomOptions>: { [ruleName:string]: Array\<[Rule](classes/rule.md)\<TParentValue, TCustomOptions>>;  }

*Defined in types.ts:35*

#### Type parameters:

Name |
------ |
`TParentValue` |
`TCustomOptions` |

___

### TSelector

Ƭ  **TSelector**\<T>: (src: T) => any

*Defined in types.ts:11*

#### Type parameters:

Name |
------ |
`T` |

___

### TSubsetRuleCollection

Ƭ  **TSubsetRuleCollection**\<TParentValue, TCustomOptions>: Map\<[IValidatable](interfaces/ivalidatable.md)\<TParentValue, TCustomOptions>, [TSubsetRuleMetadata](globals.md#tsubsetrulemetadata)\<TParentValue, TCustomOptions>>

*Defined in types.ts:37*

#### Type parameters:

Name |
------ |
`TParentValue` |
`TCustomOptions` |

___

### TSubsetRuleMetadata

Ƭ  **TSubsetRuleMetadata**\<TParentValue, TCustomOptions>: { filter: [TCollectionFilter](globals.md#tcollectionfilter)\<TParentValue, TCustomOptions> ; name: string  }

*Defined in types.ts:39*

#### Type parameters:

Name | Default |
------ | ------ |
`TParentValue` | any |
`TCustomOptions` | any |

#### Type declaration:

Name | Type |
------ | ------ |
`filter` | [TCollectionFilter](globals.md#tcollectionfilter)\<TParentValue, TCustomOptions> |
`name` | string |

___

### TValidatableMetadata

Ƭ  **TValidatableMetadata**\<TParentValue, TCustomOptions>: { isValidIfEmpty: boolean ; message: [TMessageFactory](globals.md#tmessagefactory)\<TParentValue, TCustomOptions> ; name: string ; precondition: [TPrecondition](globals.md#tprecondition)\<TParentValue, TCustomOptions> \| null ; severity: [Severity](enums/severity.md)  }

*Defined in types.ts:21*

#### Type parameters:

Name | Default |
------ | ------ |
`TParentValue` | any |
`TCustomOptions` | any |

#### Type declaration:

Name | Type |
------ | ------ |
`isValidIfEmpty` | boolean |
`message` | [TMessageFactory](globals.md#tmessagefactory)\<TParentValue, TCustomOptions> |
`name` | string |
`precondition` | [TPrecondition](globals.md#tprecondition)\<TParentValue, TCustomOptions> \| null |
`severity` | [Severity](enums/severity.md) |

___

### TValidatorCollection

Ƭ  **TValidatorCollection**\<TParentValue, TCustomOptions>: Map\<[IValidatable](interfaces/ivalidatable.md)\<TParentValue, TCustomOptions>, [TValidatableMetadata](globals.md#tvalidatablemetadata)\<TParentValue, TCustomOptions>>

*Defined in types.ts:44*

#### Type parameters:

Name |
------ |
`TParentValue` |
`TCustomOptions` |

## Variables

### address

• `Const` **address**: RegExp = /^(?:[^\|~%\<>@$*+={}:;]*)$/

*Defined in utils/rx.ts:1*

___

### allcharacters

• `Const` **allcharacters**: RegExp = /^(?:[^\|~"]*)$/

*Defined in utils/rx.ts:2*

___

### banknumber

• `Const` **banknumber**: RegExp = /^(?:[0-9\-]{4,17})$/

*Defined in utils/rx.ts:3*

___

### city

• `Const` **city**: RegExp = /^[a-zA-Z\.\-' ]*$/

*Defined in utils/rx.ts:4*

___

### currency

• `Const` **currency**: RegExp = /^(\d*)(\.{1}\d{0,2})?$/

*Defined in utils/rx.ts:5*

___

### date

• `Const` **date**: RegExp = /^(?:(?:(?:0?[13578]\|1[02])[- \/.]31\|(?:0?[13456789]\|1[0-2])[- \/.](?:0?[1-9]\|[12][\d]\|30))[- \/.]\d{4}\|0?2[- \/.](?:(?:0?[1-9]\|[12][0-8]\|19)[- \/.]\d{4}\|29[- \/.](?:\d{2}(?:0[48]\|[2468][048]\|[13579][26])\|(?:[02468][048]\|[1359][26])00)))$/

*Defined in utils/rx.ts:6*

___

### domesticphone

• `Const` **domesticphone**: RegExp = /^(([+]?1[ -.]?)?[(]?[2-9]\d{2}[)]?[ -.]?[1-9]\d{2}[ -.]?\d{4}([ ]?((x)\|(ext[.]?)\|(extension))[ .]?\d+)?)?$/

*Defined in utils/rx.ts:7*

___

### ein

• `Const` **ein**: RegExp = /^\d{2}[-]?\d{7}$/

*Defined in utils/rx.ts:8*

___

### email

• `Const` **email**: RegExp = /^[a-zA-Z0-9.!#$%&''*+\/=?^\_\`{\|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

*Defined in utils/rx.ts:9*

___

### floatsonly

• `Const` **floatsonly**: RegExp = /^[0-9]*(\|\.[0-9]+)$/

*Defined in utils/rx.ts:10*

___

### foreignphone

• `Const` **foreignphone**: RegExp = /^[+]?(((\d+)\|(([(]{1}\d+[)]{1})))[ -.]?)+$/

*Defined in utils/rx.ts:11*

___

### fullname

• `Const` **fullname**: RegExp = /^[a-zA-Z\-' .,]*$/

*Defined in utils/rx.ts:12*

___

### hasOwnProperty

• `Const` **hasOwnProperty**: hasOwnProperty = Object.prototype.hasOwnProperty

*Defined in utils/copy.ts:3*

___

### iso8601

• `Const` **iso8601**: RegExp = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]\|1[0-2])(\3([12]\d\|0[1-9]\|3[01]))?\|W([0-4]\d\|5[0-2])(-?[1-7])?\|(00[1-9]\|0[1-9]\d\|[12]\d{2}\|3([0-5]\d\|6[1-6])))([T\s]((([01]\d\|2[0-3])((:?)[0-5]\d)?\|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?(Z\|([\+-])([01]\d\|2[0-3]):?([0-5]\d)?)?)?)?$/i

*Defined in utils/rx.ts:13*

___

### iso8601constricted

• `Const` **iso8601constricted**: RegExp = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)\|Z)?$/i

*Defined in utils/rx.ts:14*

___

### lastname

• `Const` **lastname**: RegExp = /^[a-zA-Z\-' .,]*$/

*Defined in utils/rx.ts:15*

___

### lettersonly

• `Const` **lettersonly**: RegExp = /^[a-zA-Z\s]*$/

*Defined in utils/rx.ts:16*

___

### militarytime

• `Const` **militarytime**: RegExp = /^([0-1][0-9]\|2[0-3]):[0-5][0-9]$/

*Defined in utils/rx.ts:17*

___

### name

• `Const` **name**: RegExp = /^[a-zA-Z\-' .]*$/

*Defined in utils/rx.ts:18*

___

### nospecialcharacters

• `Const` **nospecialcharacters**: RegExp = /^(?:[^\|~"%\<>#@$()*+={}:;]*)$/

*Defined in utils/rx.ts:19*

___

### numbersonly

• `Const` **numbersonly**: RegExp = /^[0-9]*$/

*Defined in utils/rx.ts:20*

___

### password

• `Const` **password**: RegExp = /^(?:(?!.*[\<>])(?:(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])\|(?=.*[@#$%^&*\_+=\[\]\{\}\|\\:',?\/\`~"();.-])(?=.*[A-Z])(?=.*[0-9])\|(?=.*[@#$%^&*\_+=\[\]\{\}\|\\:',?\/\`~"();.-])(?=.*[a-z])(?=.*[0-9])\|(?=.*[@#$%^&*\_+=\[\]\{\}\|\\:',?\/\`~"();.-])(?=.*[a-z])(?=.*[A-Z])\|(?=.*[@#$%^&*\_+=\[\]\{\}\|\\:',?\/\`~"();.-])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))).*$/

*Defined in utils/rx.ts:21*

___

### routingnumber

• `Const` **routingnumber**: RegExp = /^(?:((0[0-9])\|(1[0-2])\|(2[1-9])\|(3[0-2])\|(6[1-9])\|(7[0-2])\|(80)){1}\d{7})$/

*Defined in utils/rx.ts:22*

___

### ssn

• `Const` **ssn**: RegExp = /^\b(?!000)(?!666)(?!9)[0-9]{3}[ -]?(?!00)[0-9]{2}[ -]?(?!0000)[0-9]{4}\b$/

*Defined in utils/rx.ts:23*

___

### title

• `Const` **title**: RegExp = /^[a-zA-Z\/\\&' .,-]*$/

*Defined in utils/rx.ts:24*

___

### username

• `Const` **username**: RegExp = /^[a-zA-Z0-9\_@.-]*$/

*Defined in utils/rx.ts:25*

___

### zipcode

• `Const` **zipcode**: RegExp = /^(?:\d{5}([-]{1}\d{4})?)$/

*Defined in utils/rx.ts:26*

## Functions

### beBoolean

▸ **beBoolean**(`value`: any): boolean

*Defined in utils/qualifiers.ts:3*

#### Parameters:

Name | Type |
------ | ------ |
`value` | any |

**Returns:** boolean

___

### beInRange

▸ **beInRange**(`num1`: number, `num2`: number): beInRange

*Defined in utils/qualifiers.ts:7*

#### Parameters:

Name | Type |
------ | ------ |
`num1` | number |
`num2` | number |

**Returns:** beInRange

___

### beValidEnum

▸ **beValidEnum**(`arr`: Array\<string \| number>): beValidEnum

*Defined in utils/qualifiers.ts:13*

#### Parameters:

Name | Type |
------ | ------ |
`arr` | Array\<string \| number> |

**Returns:** beValidEnum

___

### cleanseAssertionOperators

▸ **cleanseAssertionOperators**(`parsedName`: string): string

*Defined in utils/getMemberPath.ts:36*

#### Parameters:

Name | Type |
------ | ------ |
`parsedName` | string |

**Returns:** string

___

### copy

▸ **copy**(`source`: any, `destination?`: any): any

*Defined in utils/copy.ts:5*

#### Parameters:

Name | Type |
------ | ------ |
`source` | any |
`destination?` | any |

**Returns:** any

___

### getMemberPath

▸ **getMemberPath**\<T>(`fn`: [TSelector](globals.md#tselector)\<T>): string

*Defined in utils/getMemberPath.ts:7*

https://github.com/nartc/mapper/blob/master/src/utils/getMemberPath.ts
This implementation is copied from @nartc/automapper

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type |
------ | ------ |
`fn` | [TSelector](globals.md#tselector)\<T> |

**Returns:** string

___

### getProperty

▸ **getProperty**(`obj`: any, `prop`: string): any

*Defined in utils/getProperty.ts:3*

#### Parameters:

Name | Type |
------ | ------ |
`obj` | any |
`prop` | string |

**Returns:** any

___

### hasAnyFlags

▸ **hasAnyFlags**(`flags`: any, `mask`: any): boolean

*Defined in utils/quality.ts:7*

#### Parameters:

Name | Type |
------ | ------ |
`flags` | any |
`mask` | any |

**Returns:** boolean

___

### hasFlags

▸ **hasFlags**(`flags`: any, `mask`: any): boolean

*Defined in utils/quality.ts:18*

#### Parameters:

Name | Type |
------ | ------ |
`flags` | any |
`mask` | any |

**Returns:** boolean

___

### is

▸ **is**(`val1`: any, `val2`: any): boolean

*Defined in utils/quality.ts:29*

#### Parameters:

Name | Type |
------ | ------ |
`val1` | any |
`val2` | any |

**Returns:** boolean

___

### isArray

▸ **isArray**(`val`: any): boolean

*Defined in utils/quality.ts:34*

#### Parameters:

Name | Type |
------ | ------ |
`val` | any |

**Returns:** boolean

___

### isBlankObject

▸ **isBlankObject**(`val`: any): boolean

*Defined in utils/quality.ts:42*

#### Parameters:

Name | Type |
------ | ------ |
`val` | any |

**Returns:** boolean

___

### isBoolean

▸ **isBoolean**(`val`: any): boolean

*Defined in utils/quality.ts:46*

#### Parameters:

Name | Type |
------ | ------ |
`val` | any |

**Returns:** boolean

___

### isBufferArray

▸ **isBufferArray**(`val`: any): boolean

*Defined in utils/quality.ts:38*

#### Parameters:

Name | Type |
------ | ------ |
`val` | any |

**Returns:** boolean

___

### isDate

▸ **isDate**(`val`: any): boolean

*Defined in utils/quality.ts:50*

#### Parameters:

Name | Type |
------ | ------ |
`val` | any |

**Returns:** boolean

___

### isEmpty

▸ **isEmpty**(`val`: any): boolean

*Defined in utils/quality.ts:64*

#### Parameters:

Name | Type |
------ | ------ |
`val` | any |

**Returns:** boolean

___

### isEqual

▸ **isEqual**(`o1`: any, `o2`: any): boolean

*Defined in utils/quality.ts:98*

#### Parameters:

Name | Type |
------ | ------ |
`o1` | any |
`o2` | any |

**Returns:** boolean

___

### isFunction

▸ **isFunction**(`val`: any): boolean

*Defined in utils/quality.ts:147*

#### Parameters:

Name | Type |
------ | ------ |
`val` | any |

**Returns:** boolean

___

### isHash

▸ **isHash**(`val`: any): boolean

*Defined in utils/quality.ts:151*

#### Parameters:

Name | Type |
------ | ------ |
`val` | any |

**Returns:** boolean

___

### isInteger

▸ **isInteger**(`val`: any): boolean

*Defined in utils/quality.ts:155*

#### Parameters:

Name | Type |
------ | ------ |
`val` | any |

**Returns:** boolean

___

### isIso8601DateString

▸ **isIso8601DateString**(`val`: any): boolean

*Defined in utils/quality.ts:54*

#### Parameters:

Name | Type |
------ | ------ |
`val` | any |

**Returns:** boolean

___

### isNull

▸ **isNull**(`val`: any): boolean

*Defined in utils/quality.ts:172*

#### Parameters:

Name | Type |
------ | ------ |
`val` | any |

**Returns:** boolean

___

### isNumber

▸ **isNumber**(`val`: any): boolean

*Defined in utils/quality.ts:176*

#### Parameters:

Name | Type |
------ | ------ |
`val` | any |

**Returns:** boolean

___

### isObject

▸ **isObject**(`val`: any): boolean

*Defined in utils/quality.ts:180*

#### Parameters:

Name | Type |
------ | ------ |
`val` | any |

**Returns:** boolean

___

### isPromise

▸ **isPromise**(`val`: any): boolean

*Defined in utils/quality.ts:184*

#### Parameters:

Name | Type |
------ | ------ |
`val` | any |

**Returns:** boolean

___

### isRegExp

▸ **isRegExp**(`val`: any): boolean

*Defined in utils/quality.ts:159*

#### Parameters:

Name | Type |
------ | ------ |
`val` | any |

**Returns:** boolean

___

### isString

▸ **isString**(`val`: any): boolean

*Defined in utils/quality.ts:163*

#### Parameters:

Name | Type |
------ | ------ |
`val` | any |

**Returns:** boolean

___

### isTypedArray

▸ **isTypedArray**(`val`: any): boolean

*Defined in utils/quality.ts:167*

#### Parameters:

Name | Type |
------ | ------ |
`val` | any |

**Returns:** boolean

___

### isUndefined

▸ **isUndefined**(`val`: any): boolean

*Defined in utils/quality.ts:60*

#### Parameters:

Name | Type |
------ | ------ |
`val` | any |

**Returns:** boolean

___

### isWindow

▸ **isWindow**(`val`: any): boolean

*Defined in utils/quality.ts:188*

#### Parameters:

Name | Type |
------ | ------ |
`val` | any |

**Returns:** boolean

___

### length

▸ **length**(`num1`: number, `num2`: number): beValidLength

*Defined in utils/qualifiers.ts:19*

#### Parameters:

Name | Type |
------ | ------ |
`num1` | number |
`num2` | number |

**Returns:** beValidLength

___

### lengthOrEmpty

▸ **lengthOrEmpty**(`num1`: number, `num2`: number): beValidLengthOrEmpty

*Defined in utils/qualifiers.ts:25*

#### Parameters:

Name | Type |
------ | ------ |
`num1` | number |
`num2` | number |

**Returns:** beValidLengthOrEmpty

___

### match

▸ **match**(`rx`: RegExp): matches

*Defined in utils/qualifiers.ts:35*

#### Parameters:

Name | Type |
------ | ------ |
`rx` | RegExp |

**Returns:** matches

___

### max

▸ **max**(`num`: number): beLessThan

*Defined in utils/qualifiers.ts:41*

#### Parameters:

Name | Type |
------ | ------ |
`num` | number |

**Returns:** beLessThan

___

### min

▸ **min**(`num`: number): beGreaterThan

*Defined in utils/qualifiers.ts:47*

#### Parameters:

Name | Type |
------ | ------ |
`num` | number |

**Returns:** beGreaterThan

___

### normalizeValidateArgs

▸ **normalizeValidateArgs**\<TParentValue, TCustomOptions>(`value`: any, `parentValue?`: any, `customOptions?`: any): [any, TParentValue, TCustomOptions]

*Defined in utils/normalizeValidateArgs.ts:3*

#### Type parameters:

Name |
------ |
`TParentValue` |
`TCustomOptions` |

#### Parameters:

Name | Type |
------ | ------ |
`value` | any |
`parentValue?` | any |
`customOptions?` | any |

**Returns:** [any, TParentValue, TCustomOptions]

___

### notEmpty

▸ **notEmpty**(`value`: any): boolean

*Defined in utils/qualifiers.ts:57*

#### Parameters:

Name | Type |
------ | ------ |
`value` | any |

**Returns:** boolean

___

### notNull

▸ **notNull**(`value`: any): boolean

*Defined in utils/qualifiers.ts:53*

#### Parameters:

Name | Type |
------ | ------ |
`value` | any |

**Returns:** boolean

___

### simpleCompare

▸ **simpleCompare**(`a`: any, `b`: any): boolean

*Defined in utils/quality.ts:3*

#### Parameters:

Name | Type |
------ | ------ |
`a` | any |
`b` | any |

**Returns:** boolean

___

### split

▸ **split**(`arr`: Array\<any>, `ndx`: number): Array\<Array\<any>>

*Defined in utils/split.ts:1*

#### Parameters:

Name | Type |
------ | ------ |
`arr` | Array\<any> |
`ndx` | number |

**Returns:** Array\<Array\<any>>
