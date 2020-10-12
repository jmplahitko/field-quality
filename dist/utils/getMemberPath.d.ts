import { TSelector } from '../types';
/**
 * https://github.com/nartc/mapper/blob/master/src/utils/getMemberPath.ts
 * This implementation is copied from @nartc/automapper
 */
export default function getMemberPath<T>(fn: TSelector<T>): string;
