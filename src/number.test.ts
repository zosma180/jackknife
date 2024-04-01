import { degToRad, identifier, radToDeg, random, range, round } from './number';

describe('Math', () => {
  it('random', () => {
    const integer = random(5, 10);
    expect(integer).toBeGreaterThanOrEqual(5);
    expect(integer).toBeLessThanOrEqual(10);

    const decimal = random(10, 20, 3).toString().split('.');
    expect(decimal[0].length).toBe(2);
    expect(decimal[1].length).toBeLessThanOrEqual(3);
  });

  it('round', () => {
    const test = 0.123456789;
    const decimals = (value: number) => value.toString().split('.')[1]?.length || 0;

    expect(decimals(round(test))).toBe(2);
    expect(decimals(round(test, 5))).toBe(5);
    expect(decimals(round(test, 0))).toBe(0);
    expect(decimals(round(test, 20))).toBe(9);
  });

  it('identifier', () => {
    expect(typeof identifier()).toBe('number');
    expect(identifier()).not.toBe(identifier());
  });

  it('range', () => {
    const array = range(8, 18);
    expect(array[0]).toBe(8);
    expect(array[4]).toBe(12);
    expect(array[array.length - 1]).toBe(18);
    expect(array.length).toBe(11);
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
