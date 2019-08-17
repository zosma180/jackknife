'use strict';

describe('jackknife', function() {

  /*********************************** Cookie ***********************************/
  describe('Cookie', function() {
    it('getCookie', function() {
      expect(getCookie()).toBe(null);
      expect(getCookie(123)).toBe(null);
      expect(getCookie([])).toBe(null);
      expect(getCookie({})).toBe(null);
      expect(getCookie('abc')).toBe(null);
    });

    it('setCookie', function() {
      var value = 'test value';
      var expires = new Date(Date.now() + (60 * 1000));

      setCookie('token-1', value);
      expect(getCookie('token-1')).toBe(value);

      setCookie('token-2', value, { expires: expires });
      expect(getCookie('token-2')).toBe(value);

      setCookie('token-3');
      expect(getCookie('token-3')).toBe('Invalid value');
    });

    it('deleteCookie', function() {
      deleteCookie('token-1');
      deleteCookie('token-2');
      deleteCookie('token-3');
      expect(getCookie('token-1')).toBe(null);
      expect(getCookie('token-2')).toBe(null);
      expect(getCookie('token-3')).toBe(null);
    });
  });


  /*********************************** Math ***********************************/
  describe('Math', function() {
    it('random', function() {
      expect(random()).toEqual(jasmine.any(Number));
      expect(random(5)).toBeGreaterThanOrEqual(5);
      expect(random(5, 10)).toBeLessThanOrEqual(10);
      expect(random(5, 10, true).toString()).toContain('.');
    });

    it('round', function() {
      var test = 0.123456789;
      var decimals = function(value) { return value.toString().replace(/^[0-9]+\.?/g, '').length; }
      expect(decimals(round(test))).toBe(2);
      expect(decimals(round(test, 5))).toBe(5);
      expect(decimals(round(test, 0))).toBe(0);
      expect(decimals(round(test, 20))).toBe(9);
    });

    it('degToRad', function() {
      expect(degToRad(0)).toBe(0);
      expect(degToRad(90)).toBe(Math.PI / 2);
      expect(degToRad(180)).toBe(Math.PI);
    });

    it('radToDeg', function() {
      expect(radToDeg(0)).toBe(0);
      expect(radToDeg(Math.PI / 2)).toBe(90);
      expect(radToDeg(Math.PI)).toBe(180);
    });
  });


  /*********************************** Array ***********************************/
  describe('Array', function() {
    it('chunks', function() {
      var test = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      expect(chunks(test).length).toBe(1);
      expect(chunks(test, 2).length).toBe(4);
      expect(chunks(test, 3).length).toBe(3);
      expect(chunks(test, 4).length).toBe(2);
      expect(chunks(test, 6).length).toBe(2);
      expect(chunks(test, 10).length).toBe(1);
    });

    it('sort', function() {
      var test = [{ name: 'b' }, { name: 'c' }, { name: 'a' }];
      expect(sort(test, 'name')[0].name).toBe('a');
      expect(sort(test, 'name', 'asc')[0].name).toBe('a');
      expect(sort(test, 'name', 'desc')[0].name).toBe('c');
    });

    it('shuffle', function() {
      var test = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      var shuffled = shuffle(test);
      expect(JSON.stringify(shuffled)).not.toBe(JSON.stringify(test));
    });
  });


  /*********************************** String ***********************************/
  describe('String', function() {
    it('getCode', function() {
      expect(getCode().length).toBe(10);
      expect(getCode('a').length).toBe(10);
      expect(getCode(-1).length).toBe(10);
      expect(getCode(0).length).toBe(10);
      expect(getCode(4).length).toBe(4);
      expect(getCode(4, 'ò')).toBe('òòòò');
      expect(getCode(10, 'alphanumeric')).toMatch(/^[a-zA-Z0-9]+$/g);
      expect(getCode(10, 'letters')).toMatch(/^[a-zA-Z]+$/g);
      expect(getCode(10, 'lower-letters')).toMatch(/^[a-z]+$/g);
      expect(getCode(10, 'upper-letters')).toMatch(/^[A-Z]+$/g);
      expect(getCode(10, 'numbers')).toMatch(/^[0-9]+$/g);
      expect(getCode(10, 'symbols')).toMatch(/[\'\!\$\%\&\=\?\^\+\*\@\#\.\:\,\;\-\_\']+/g);
    });

    it('getPassword', function() {
      expect(getPassword().length).toBe(10);
      expect(getPassword('a').length).toBe(10);
      expect(getPassword(-1).length).toBe(10);
      expect(getPassword(0).length).toBe(10);
      expect(getPassword(2).length).toBe(10);
      expect(getPassword(3).length).toBe(3);
      expect(getPassword(6).length).toBe(6);
    });
  });


  /*********************************** Object ***********************************/
  describe('Object', function() {
    it('clone', function() {
      function TEST() {
        this.a = undefined;
        this.b = null;
        this.c = false;
        this.d = 'abc';
        this.e = 3;
        this.f = NaN;
        this.g = Infinity;
        this.h = new Date('2019-01-01');
        this.i = function() { };
        this.j = {
          a1: 1,
          b1: [{ a2: {} }, { b2: [] }]
        };
      };

      var test = new TEST();
      var cloned = clone(test);

      expect(cloned).not.toBe(test);
      expect(cloned).toEqual(test);
      expect(cloned instanceof TEST).toBe(true);
      expect(JSON.stringify(cloned)).toBe(JSON.stringify(test));
    });
  });


  /*********************************** Query string ***********************************/
  describe('Query string', function() {
    it('getQuery', function() {
      expect(getQuery()).toEqual({ param: 'the value' });
    });

    it('getQueryParam', function() {
      expect(getQueryParam()).toBe(null);
      expect(getQueryParam(1)).toBe(null);
      expect(getQueryParam('kiwi')).toBe(null);
      expect(getQueryParam([])).toBe(null);
      expect(getQueryParam('param')).toBe('the value');
    });

    it('objToQuery', function() {
      expect(objToQuery()).toBe('');
      expect(objToQuery(1)).toBe('');
      expect(objToQuery('a')).toBe('');
      expect(objToQuery([])).toBe('');
      expect(objToQuery({ param: 'the value' })).toBe('param=the%20value');
    });
  });


  /*********************************** Misc ***********************************/
  describe('Misc', function() {
    it('getQueue', function() {
      if (!('Promise' in window)) {
        console.error = jasmine.createSpy('log');
        getQueue([]);
        var message = 'jackknife: Promise not supported by your browser.';
        return expect(console.error).toHaveBeenCalledWith(message);
      }

      var tasks = [
        function() {
          return new Promise(function(resolve) {
            setTimeout(function() { resolve(1); }, 100);
          });
        },
        function() {
          return new Promise(function(resolve) { resolve(2); });
        },
        function() {
          return new Promise(function(resolve) { resolve(3); });
        }
      ];

      return getQueue(tasks).then(function(results) {
        expect(results.join('')).toBe('123');
      });
    });
  });

});
