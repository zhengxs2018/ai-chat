import { useList } from 'react-use';

// hack
export type ListActions<T> = ReturnType<typeof useList<T>>[1];

export { useList };
