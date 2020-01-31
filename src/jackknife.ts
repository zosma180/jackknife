/**
 * @author zosma
 * https://github.com/zosma180
 */

/*********************************** Cookie ***********************************/
export class CookieOptions {
  expires?: Date;
  maxAge?: number;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

export function getCookie(name: string): string | null {
  if (typeof name !== 'string') { return null; }
  let result = null;
  const list = document.cookie.split('; ').filter(Boolean);

  for (let i = 0; i < list.length && result === null; i++) {
    const cookie = list[i].split('=');

    if (cookie[0] === name) {
      result = decodeURIComponent(cookie[1]);
    }
  }

  return result;
}

export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  if (typeof name !== 'string') { return; }
  const encodedValue = encodeURIComponent(value);
  let attributes = '';

  if (options.expires) {
    attributes += `; Expires=${options.expires.toUTCString()}`;
  }

  if (options.maxAge) {
    attributes += `; Max-Age=${options.maxAge}`;
  }

  if (options.domain) {
    attributes += `; Domain=${options.domain}`;
  }

  attributes += `; Path=${options.path || '/'}`;

  if (options.secure) {
    attributes += '; Secure';
  }

  if (options.httpOnly) {
    attributes += '; HttpOnly';
  }

  if (options.sameSite && ['Strict', 'Lax', 'None'].indexOf(options.sameSite) > -1) {
    attributes += `; SameSite=${options.sameSite}`;
  }

  document.cookie = `${name}=${encodedValue}${attributes}`;
}

export function deleteCookie(name: string): void {
  if (typeof name !== 'string') { return; }
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;`;
}

/*********************************** Math ***********************************/
export function random(min: number, max: number, decimals = 0): number {
  if (typeof decimals !== 'number' || decimals < 0) {
    throw new Error('jackknife: called "random" with invalid decimals.');
  }

  let result = Math.random() * (max - min) + min;
  result = round(result, decimals);

  return result;
}

export function round(value: number, decimals = 2): number {
  if (typeof decimals !== 'number' || decimals < 0) {
    throw new Error('jackknife: called "round" with invalid decimals.');
  }

  const factor = Math.pow(10, decimals);

  return Math.round(value * factor) / factor;
}

export function unique(): number {
  return Number(Date.now().toString() + random(1000, 9999).toString());
}

export function degToRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function radToDeg(radians: number): number {
  return (radians * 180) / Math.PI;
}

/*********************************** Array ***********************************/
export function chunks<T>(array: T[], chunkSize: number): T[][] {
  if (typeof chunkSize !== 'number' || chunkSize < 1) {
    throw new Error('jackknife: called "chunks" with invalid chunkSize.');
  }

  const result = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}

export function sort<T>(array: T[], key: string, sortType: 'asc' | 'desc' = 'asc'): T[] {
  if (typeof key !== 'string') {
    throw new Error('jackknife: called "sort" with invalid key.');
  }

  const result = array.slice(0);
  const sortValue = sortType === 'asc' ? 1 : -1;

  return result.sort((a: T, b: T) => {
    let A = getNested<any>(a, key);
    let B = getNested<any>(b, key);

    if (typeof A === 'string') { A = A.toLowerCase(); }
    if (typeof B === 'string') { B = B.toLowerCase(); }

    if (A > B) { return sortValue; }
    if (A < B) { return - sortValue; }

    return 0;
  });
}

export function shuffle<T>(array: T[]): T[] {
  const result = array.slice(0);

  for (let i = result.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const item = result[i];
    result[i] = result[randomIndex];
    result[randomIndex] = item;
  }

  return result;
}

export function range(min: number, max: number): number[] {
  if (max < min) {
    throw new Error('jackknife: called "range" with "min" greater than "max".');
  }

  const result: number[] = [];

  for (let n = min; n <= max; n++) {
    result.push(n);
  }

  return result;
}

/*********************************** String ***********************************/
export function getCode(length = 10, chars = 'all'): string {
  if (typeof length !== 'number' || length < 1) {
    throw new Error('jackknife: called "getCode" with invalid length.');
  }

  if (!chars) {
    throw new Error('jackknife: called "getCode" with invalid chars.');
  }

  const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
  const upperLetters = lowerLetters.toUpperCase();
  const numbers = '0123456789';
  const symbols = '!$%&=?^+*@#.:,;-_';

  const options: KeyValue<string> = {
    'all': upperLetters + lowerLetters + numbers + symbols,
    'alphanumeric': upperLetters + lowerLetters + numbers,
    'letters': upperLetters + lowerLetters,
    'lower-letters': lowerLetters,
    'numbers': numbers,
    'symbols': symbols,
    'upper-letters': upperLetters,
  };

  const charset = options[chars] || chars;
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
  }

  return result;
}

export function getPassword(length = 12): string {
  if (typeof length !== 'number' || length < 6) {
    throw new Error('jackknife: called "getPassword" with invalid length.');
  }

  const alphanumericCount = Math.round(length / 3);

  const letters = getCode(alphanumericCount, 'letters');
  const numbers = getCode(alphanumericCount, 'numbers');
  const symbols = getCode(length - (alphanumericCount * 2), '!$%&=?+*@#-_');
  const result = (letters + numbers + symbols).split('');
  const shuffled = shuffle(result);

  return shuffled.join('');
}

export function getColor(): string {
  return '#' + getCode(6, '0123456789ABCDEF');
}

/*********************************** Object ***********************************/
type Constructor<T> = new (...args: any[]) => T;

export function clone<T>(target: T, sameClass = true): T {
  if (typeof target !== 'object' || target === null) { return target; }
  const casted = target as KeyValue<any>;
  const constructor = casted.constructor as Constructor<T>;
  if (casted instanceof Date) { return new constructor(casted); }

  const result = sameClass ? new constructor() : {} as T;
  const keys = Object.keys(casted);

  for (const key of keys) {
    (result as KeyValue<any>)[key] = clone(casted[key], sameClass);
  }

  return result;
}

export function getNested<T>(root: KeyValue<any>, path: string): T | null {
  const steps = path.split('.');
  let result: T | null = null;

  for (let i = 0; i < steps.length && (i === 0 || result); i++) {
    const step = steps[i];
    const parent = (i === 0 ? root : result) as KeyValue<any>;
    result = parent[step] || null;
  }

  return result;
}

export interface KeyValue<T> { [key: string]: T; }
export interface LabelValue<T> { label: string; value: T; }

/*********************************** Query string ***********************************/
export function getQuery(): KeyValue<string> {
  const result: { [key: string]: string } = {};
  const query = window.location.search.replace('?', '');
  if (!query) { return result; }

  const params = query.split('&');

  for (const param of params) {
    const pair = param.split('=');
    result[pair[0]] = decodeURIComponent(pair[1] || '');
  }

  return result;
}

export function getQueryParam(name: string): string | null {
  const query = getQuery();

  return query && query[name] !== undefined ? query[name] : null;
}

export function objToQuery(target: KeyValue<any>): string {
  if (!target || typeof target !== 'object') { return ''; }
  const result = [];
  const keys = Object.keys(target);

  for (const key of keys) {
    const value = String(target[key]);
    const param = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    result.push(param);
  }

  return result.join('&');
}

export function objToParams(target: KeyValue<any>, keepEmpty = false): KeyValue<string> {
  if (!target || typeof target !== 'object') { return {}; }
  const result: KeyValue<string> = {};
  const keys = Object.keys(target);

  for (const key of keys) {
    const value = target[key];
    let stringValue = '';

    if (Array.isArray(value)) {
      stringValue = value.join(',');
    } else if (value instanceof Date) {
      stringValue = value.toISOString();
    } else if (typeof value === 'number') {
      stringValue = String(value);
    } else if (typeof value === 'string') {
      stringValue = value;
    }

    if (stringValue || keepEmpty) {
      result[key] = stringValue;
    }
  }

  return result;
}

/*********************************** Misc ***********************************/
export function getQueue<T>(tasks: Array<() => Promise<T>>): Promise<T[]> {
  const promise = (window as any).Promise;

  if (!promise) {
    throw Error('jackknife: getQueue not supported by your browser.');
  }

  let queue = promise.resolve();
  const results: T[] = [];

  tasks.forEach(task => {
    queue = queue.then(() => task())
      .then((result: T) => results.push(result));
  });

  return queue.then(() => results);
}

export function requestFullscreen(element: HTMLElement): Promise<void> {
  const api = element.requestFullscreen
    || (element as any).webkitRequestFullscreen
    || (element as any).mozRequestFullscreen
    || (element as any).msRequestFullscreen;

  if (!api) { throw new Error('jackknife: requestFullscreen not supported by your browser.'); }

  return api.call(element);
}

export function exitFullscreen(): Promise<void> {
  const api = document.exitFullscreen
    || (document as any).webkitExitFullscreen
    || (document as any).mozCancelFullScreen
    || (document as any).msExitFullscreen;

  if (!api) { throw new Error('jackknife: exitFullscreen not supported by your browser.'); }

  return api.call(document);
}
