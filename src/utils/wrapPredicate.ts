import { TPredicate, TPredicateWrapper } from 'src/types';

export function wrapPredicate<T, U>(predicate: TPredicate<T, U>): TPredicateWrapper<T, U> {
	return (v: any, p: T, c?: U) => ({ isValid: predicate(v, p, c) });
}