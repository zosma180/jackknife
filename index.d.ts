export class CookieOptions {
  expires: Date;
  maxAge: number;
  domain: string;
  path: string;
  secure: boolean;
  httpOnly: boolean;
  sameSite: 'Strict' | 'Lax' | 'None';
}

/*********************************** Cookie ***********************************/
export function getCookie(name: string): string | null;
export function setCookie(name: string, value: string, options?: Partial<CookieOptions>): void;
export function deleteCookie(name: string): void;

/*********************************** Math ***********************************/
export function random(min: number, max: number, float?: boolean): number;
export function round(value: number, decimals?: number): number;
export function degToRad(degrees: number): number;
export function radToDeg(radians: number): number;

/*********************************** Array ***********************************/
export function chunks<T>(array: T[], chunkSize: number): T[][];
export function sort<T>(array: T[], key: string, sortType?: string): T[];
export function shuffle<T>(array: T[]): T[];

/*********************************** String ***********************************/
export function getCode(length?: number, chars?: string): string;
export function getPassword(length?: number): string;

/*********************************** Object ***********************************/
export function clone<T>(target: T, sameClass?: boolean): T;

/*********************************** Query string ***********************************/
export function getQuery(): { [key: string]: string };
export function getQueryParam(name: string): string | null;
export function objToQuery(obj: { [key: string]: any }): string;

/*********************************** Misc ***********************************/
export function getQueue<T>(tasks: (() => Promise<T>)[]): Promise<T[]>;
export function requestFullscreen(element: HTMLElement): Promise<void>;
export function exitFullscreen(): Promise<void>;