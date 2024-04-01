import { nested, querystring } from './object';

describe('Object', () => {
  it('nested', () => {
    const test = { a: { b: [{ c: 'value' }] } };
    expect(nested<string>(test, '')).toBe(undefined);
    expect(nested<string>(test, 'a.d')).toBe(undefined);
    expect(nested<string>(test, 'a.b.0.c')).toBe('value');
  });

  it('querystring', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { search: '?name=value' },
    });

    expect(querystring()).toEqual({ name: 'value' });
  });
});
