import { bytes, code, color, datetime, pad } from './string';

describe('String', () => {
  it('datetime', () => {
    const date = new Date('2024-01-01T01:00:00');
    expect(datetime(date)).toBe('01/01/2024 01:00:00 GMT+1');
    expect(datetime(date, false)).toBe('01/01/2024');
  });

  it('bytes', () => {
    expect(bytes(1024 * 1024)).toBe('1.00 MB');
  });

  it('code', () => {
    expect(code().length).toBe(10);
    expect(code(4).length).toBe(4);
    expect(code(4, 'ò')).toBe('òòòò');
    expect(code(10, 'alphanumeric')).toMatch(/^[a-zA-Z0-9]+$/g);
    expect(code(10, 'letters')).toMatch(/^[a-zA-Z]+$/g);
    expect(code(10, 'lower-letters')).toMatch(/^[a-z]+$/g);
    expect(code(10, 'upper-letters')).toMatch(/^[A-Z]+$/g);
    expect(code(10, 'numbers')).toMatch(/^[0-9]+$/g);
    expect(code(10, 'symbols')).toMatch(/['!$%&=?^+*@#.:,;\-_']+/g);
  });

  it('color', () => {
    expect(color()).toMatch(/^#[0-9A-F]{6}$/);
  });

  it('pad', () => {
    expect(pad(8, 4, '0')).toBe('0008');
  });
});
