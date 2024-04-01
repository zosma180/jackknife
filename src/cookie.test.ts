import { deleteCookie, getCookie, setCookie } from './cookie';

describe('Cookie', () => {
  beforeEach(() => {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: 'name=value',
    });
  });

  it('getCookie', () => {
    expect(getCookie('')).toBe(undefined);
    expect(getCookie('name')).toBe('value');
  });

  it('setCookie', () => {
    setCookie('name', 'value-2');
    const check = document.cookie.includes('name=value-2;');
    expect(check).toBe(true);
  });

  it('deleteCookie', () => {
    deleteCookie('name');
    const check = document.cookie.includes('name=value;');
    expect(check).toBe(false);
  });
});
