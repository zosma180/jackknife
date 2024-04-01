export const getCookie = (name: string): string | undefined => {
  const list = document.cookie.split('; ').filter(Boolean);
  const search = list.map(c => c.split('=')).find(c => c[0] === name);
  return search ? decodeURIComponent(search[1]) : undefined;
};

export interface CookieOptions {
  expires?: Date;
  maxAge?: number;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

export const setCookie = (name: string, value: string, options: CookieOptions = {}): void => {
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
};

export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;`;
};
