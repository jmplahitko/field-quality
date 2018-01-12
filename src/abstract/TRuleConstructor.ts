import { Rule } from '../concrete/Rule';

export type TRuleConstructor = new (name?: string) => Rule;
