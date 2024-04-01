import { random } from './number';

export const chunks = <T>(array: T[], chunkSize: number): T[][] => {
  if (typeof chunkSize !== 'number' || chunkSize < 1) {
    throw new Error('jackknife: called "chunks" with invalid chunkSize.');
  }

  const result = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
};

export const shuffle = <T>(array: T[]): T[] => {
  const result = Array.from(array);

  for (let i = result.length - 1; i > 0; i--) {
    const randomIndex = random(0, result.length - 1);
    const movedItem = result[i];
    result[i] = result[randomIndex];
    result[randomIndex] = movedItem;
  }

  return result;
};

export const sort = <T>(
  array: T[],
  getField: (item: T) => string | number | Date,
  sortType: 'asc' | 'desc' = 'asc',
): T[] => {
  const result = Array.from(array);
  const sortValue = sortType === 'asc' ? 1 : -1;

  return result.sort((a, b) => {
    let A = getField(a);
    let B = getField(b);

    if (typeof A === 'string') {
      A = A.toLowerCase();
    }

    if (typeof B === 'string') {
      B = B.toLowerCase();
    }

    if (A > B) {
      return sortValue;
    } else if (A < B) {
      return -sortValue;
    } else {
      return 0;
    }
  });
};

export const unique = <T>(array: T[]): T[] => {
  return Array.from(new Set(array).values());
};
