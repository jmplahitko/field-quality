import { NestedPaths, Transaction } from './types';
import { setDeepValue } from './utils/setDeepValue';

export function createSnapshot(target: any): any {
	return target !== undefined
		? JSON.parse(JSON.stringify(target))
		: target
}

export const createTransaction = <T extends object>(target: T): Transaction<T> => {
	const snapshots = new Map<NestedPaths<T>, any>();
	const transaction: Transaction<T> = {
		changes: new Set<string>(),
		ensureSnapshot: (propertyKey: NestedPaths<T>, value: any) => {
			if (!snapshots.has(propertyKey)) {
				snapshots.set(propertyKey, createSnapshot(value));
			}
		},
		begin: <R>(
			callback: () => R,
			onCommit?: (snapshots: Map<NestedPaths<T>, any>) => void,
			onRollback?: () => void
		) => {
			try {
				const result = callback();
				onCommit?.(snapshots);
				return result;
			} catch (error) {
				// Restore only modified objects
				snapshots.forEach((snapshot, propertyKey) => {
					setDeepValue(propertyKey, target, snapshot);
				});
				onRollback?.();
				throw error;
			}
		}
	};

	return transaction;
};

