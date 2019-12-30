import { chunks, clone, degToRad, deleteCookie, getCode, getCookie, getNested, getPassword, getQuery, getQueryParam, getQueue, objToParams, objToQuery, radToDeg, random, range, round, setCookie, shuffle, sort, unique } from './jackknife';

describe('jackknife', () => {

  /*********************************** Cookie ***********************************/
  describe('Cookie', () => {
    it('getCookie/setCookie/deleteCookie', () => {
      // Get
      expect(getCookie(undefined as any)).toBe(null);
      expect(getCookie(null as any)).toBe(null);
      expect(getCookie('')).toBe(null);
      expect(getCookie('abc')).toBe(null);

      // Set
      const value = 'test value';
      const expires = new Date(Date.now() + (60 * 1000));

      setCookie('token-1', value);
      expect(getCookie('token-1')).toBe(value);

      setCookie('token-2', value, { expires });
      expect(getCookie('token-2')).toBe(value);

      setCookie('token-3', undefined as any);
      expect(getCookie('token-3')).toBe('undefined');

      // Delete
      deleteCookie('token-1');
      deleteCookie('token-2');
      deleteCookie('token-3');
      expect(getCookie('token-1')).toBe(null);
      expect(getCookie('token-2')).toBe(null);
      expect(getCookie('token-3')).toBe(null);
    });
  });

  /*********************************** Math ***********************************/
  describe('Math', () => {
    it('random', () => {
      const error = new Error('jackknife: called "random" with invalid decimals.');
      expect(() => random(5, 10, null as any)).toThrow(error);
      expect(() => random(5, 10, -3)).toThrow(error);
      expect(random(undefined as any, undefined as any)).toBeNaN();
      expect(random(5, undefined as any)).toBeNaN();
      expect(random(5, 10)).toBeGreaterThanOrEqual(5);
      expect(random(5, 10)).toBeLessThanOrEqual(10);
      expect(random(5, 10, 3).toString()).toContain('.');
    });

    it('round', () => {
      const test = 0.123456789;
      const decimals = (value: number) => value.toString().replace(/^[0-9]+\.?/g, '').length;
      const error = new Error('jackknife: called "round" with invalid decimals.');
      expect(() => round(test, null as any)).toThrow(error);
      expect(() => round(test, -3)).toThrow(error);
      expect(decimals(round(test))).toBe(2);
      expect(decimals(round(test, 5))).toBe(5);
      expect(decimals(round(test, 0))).toBe(0);
      expect(decimals(round(test, 20))).toBe(9);
    });

    it('unique', () => {
      expect(typeof unique()).toBe('number');
      expect(unique()).not.toBe(unique());
    });

    it('degToRad', () => {
      expect(degToRad(0)).toBe(0);
      expect(degToRad(90)).toBe(Math.PI / 2);
      expect(degToRad(180)).toBe(Math.PI);
    });

    it('radToDeg', () => {
      expect(radToDeg(0)).toBe(0);
      expect(radToDeg(Math.PI / 2)).toBe(90);
      expect(radToDeg(Math.PI)).toBe(180);
    });
  });

  /*********************************** Array ***********************************/
  describe('Array', () => {
    it('chunks', () => {
      const test = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      const error = new Error('jackknife: called "chunks" with invalid chunkSize.');
      expect(() => chunks(test, undefined as any)).toThrow(error);
      expect(() => chunks(test, null as any)).toThrow(error);
      expect(() => chunks(test, -1)).toThrow(error);
      expect(chunks(test, 2).length).toBe(4);
      expect(chunks(test, 3).length).toBe(3);
      expect(chunks(test, 4).length).toBe(2);
      expect(chunks(test, 6).length).toBe(2);
      expect(chunks(test, 10).length).toBe(1);
    });

    it('sort', () => {
      const test = [{ data: { name: 'b' } }, { data: { name: 'c' } }, { data: { name: 'a' } }];
      expect(sort(test, 'data.name')[0].data.name).toBe('a');
      expect(sort(test, 'data.name', 'asc')[0].data.name).toBe('a');
      expect(sort(test, 'data.name', 'desc')[0].data.name).toBe('c');
    });

    it('shuffle', () => {
      const test = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      const shuffled = shuffle(test);
      expect(shuffled.length).toBe(test.length);
      expect(JSON.stringify(shuffled)).not.toBe(JSON.stringify(test));
    });

    it('range', () => {
      const array = range(8, 18);
      expect(array[0]).toBe(8);
      expect(array[4]).toBe(12);
      expect(array[array.length - 1]).toBe(18);
      expect(array.length).toBe(11);

      const error = new Error('jackknife: called "range" with "min" greater than "max".');
      expect(() => range(8, 1)).toThrow(error);
    });
  });

  /*********************************** String ***********************************/
  describe('String', () => {
    it('getCode', () => {
      const lengthError = new Error('jackknife: called "getCode" with invalid length.');
      const charsError = new Error('jackknife: called "getCode" with invalid chars.');
      expect(() => getCode(null as any)).toThrow(lengthError);
      expect(() => getCode(-1)).toThrow(lengthError);
      expect(() => getCode(0)).toThrow(lengthError);
      expect(() => getCode(10, null as any)).toThrow(charsError);
      expect(() => getCode(10, '')).toThrow(charsError);

      expect(getCode().length).toBe(10);
      expect(getCode(4).length).toBe(4);
      expect(getCode(4, 'ò')).toBe('òòòò');
      expect(getCode(10, 'alphanumeric')).toMatch(/^[a-zA-Z0-9]+$/g);
      expect(getCode(10, 'letters')).toMatch(/^[a-zA-Z]+$/g);
      expect(getCode(10, 'lower-letters')).toMatch(/^[a-z]+$/g);
      expect(getCode(10, 'upper-letters')).toMatch(/^[A-Z]+$/g);
      expect(getCode(10, 'numbers')).toMatch(/^[0-9]+$/g);
      expect(getCode(10, 'symbols')).toMatch(/[\'\!\$\%\&\=\?\^\+\*\@\#\.\:\,\;\-\_\']+/g);
    });

    it('getPassword', () => {
      const error = new Error('jackknife: called "getPassword" with invalid length.');
      expect(() => getPassword(null as any)).toThrow(error);
      expect(() => getPassword(-1)).toThrow(error);
      expect(() => getPassword(0)).toThrow(error);
      expect(() => getPassword(2)).toThrow(error);
      expect(getPassword().length).toBe(10);
      expect(getPassword(6).length).toBe(6);
    });
  });

  /*********************************** Object ***********************************/
  describe('Object', () => {
    it('clone', () => {
      class TestClass {
        a = undefined;
        b = null;
        c = false;
        d = 'abc';
        e = 3;
        f = NaN;
        g = Infinity;
        h = new Date('2019-01-01');
        i = {
          a1: 1,
          b1: [{ a2: {} }, { b2: [] }],
        };
        j = () => '';
      }

      const test = new TestClass();
      const cloned = clone(test);

      expect(cloned).not.toBe(test);
      expect(cloned).toEqual(test);
      expect(cloned instanceof TestClass).toBe(true);
      expect(JSON.stringify(cloned)).toBe(JSON.stringify(test));
    });

    it('getNested', () => {
      const test = { a: { b: [{ c: 'value' }] } };
      expect(getNested<string>(test, '')).toBe(null);
      expect(getNested<string>(test, 'a.d')).toBe(null);
      expect(getNested<string>(test, 'a.b.0.c')).toBe('value');
    });
  });

  /*********************************** Query string ***********************************/
  describe('Query string', () => {
    it('getQuery', () => {
      expect(getQuery()).toEqual({ param: 'the value' });
    });

    it('getQueryParam', () => {
      expect(getQueryParam(undefined as any)).toBe(null);
      expect(getQueryParam(null as any)).toBe(null);
      expect(getQueryParam('not-exists')).toBe(null);
      expect(getQueryParam('param')).toBe('the value');
    });

    it('objToQuery', () => {
      expect(objToQuery(undefined as any)).toBe('');
      expect(objToQuery(null as any)).toBe('');
      expect(objToQuery([])).toBe('');
      expect(objToQuery({})).toBe('');
      expect(objToQuery({ param: 'the value' })).toBe('param=the%20value');
    });

    it('objToParams', () => {
      expect(objToParams(undefined as any)).toEqual({});
      expect(objToParams(null as any)).toEqual({});
      expect(objToParams([])).toEqual({});
      expect(objToParams({})).toEqual({});
      expect(objToParams({ a: 'value', b: 2, c: new Date('2020-01-01'), d: [2, 3], e: {} }))
        .toEqual({ a: 'value', b: '2', c: '2020-01-01T00:00:00.000Z', d: '2,3' });
    });
  });

  /*********************************** Misc ***********************************/
  describe('Misc', () => {
    it('getQueue', () => {
      const promise = (window as any).Promise as PromiseConstructor;

      if (!promise) {
        const error = new Error('jackknife: getQueue not supported by your browser.');
        return expect(() => getQueue([])).toThrow(error);
      }

      const tasks = [
        () => new promise(resolve => setTimeout(() => resolve(1), 100)),
        () => new promise(resolve => resolve(2)),
        () => new promise(resolve => resolve(3)),
      ];

      return getQueue(tasks)
        .then(results => expect(results.join('')).toBe('123'));
    });
  });

});
