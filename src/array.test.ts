import { chunks, shuffle, sort, unique } from './array';

describe('Array', () => {
  it('chunks', () => {
    const test = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    expect(chunks(test, 2).length).toBe(4);
    expect(chunks(test, 4).length).toBe(2);
    expect(chunks(test, 10).length).toBe(1);
  });

  it('sort', () => {
    const test = [{ data: { name: 'b' } }, { data: { name: 'c' } }, { data: { name: 'a' } }];
    expect(sort(test, o => o.data.name)[0].data.name).toBe('a');
    expect(sort(test, o => o.data.name, 'asc')[0].data.name).toBe('a');
    expect(sort(test, o => o.data.name, 'desc')[0].data.name).toBe('c');
  });

  it('shuffle', () => {
    const test = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const shuffled = shuffle(test);
    expect(shuffled.length).toBe(test.length);
    expect(JSON.stringify(shuffled)).not.toBe(JSON.stringify(test));
  });

  it('unique', () => {
    const array = ['a', 'b', 'a', 'b'];
    const result = unique(array);
    expect(result).toEqual(['a', 'b']);
  });
});
