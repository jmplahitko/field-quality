import { NestedPaths, Transaction } from './types';
import { setDeepValue } from './utils/setDeepValue';

export function createSnapshot(target: any): any {
	if (target === undefined) return target;

	// For arrays
	if (Array.isArray(target)) {
		return [...target];
	}

	// For objects
	if (typeof target === 'object' && target !== null) {
		return { ...target };
	}

	return target;
}

export const createTransaction = <T extends object>(target: T): Transaction<T> => {
	const snapshots = new Map<NestedPaths<T>, any>();
	const transaction: Transaction<T> = {
		changes: new Set<string>(),
		ensureSnapshot: (propertyKey: NestedPaths<T>, value: any) => {
			if (!snapshots.has(propertyKey)) {
				const snapshot = createSnapshot(value);
				snapshots.set(propertyKey, snapshot);
				return snapshot;
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

