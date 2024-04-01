<p align="center"><img src="logo.png" alt="jackknife logo" height="120"></p>

# jackknife

![npm](https://img.shields.io/npm/v/jackknife?style=flat-square)
![npm bundle size](https://img.shields.io/bundlephobia/min/jackknife?style=flat-square)
![license](https://img.shields.io/npm/l/jackknife?style=flat-square)
[![Issues](https://img.shields.io/github/issues/zosma180/jackknife.svg?style=flat-square)](https://github.com/zosma180/jackknife/issues)

---

## Description
**jackknife** is a multi-tool that provides a set of utility functions to face the wild projects.  
All the blades are typescript compatible.

---

## Installation
```bash
npm i jackknife
```

In order to use any API you have to import them:
```typescript
// Typescript
import { clone, getPassword, sort } from 'jackknife';

// or Node
const { clone, getPassword, sort } = require('jackknife');
```

---

## Browser support
Latest versions of Chrome, Firefox, Opera, Safari and Edge.

---

## Test, Bugs and Feature requests
If you want to execute unit test run:
```bash
npm test
```
For bugs and feature requests, please create an issue.

---

## API

* Array
  - [chunks](#chunks)
  - [shuffle](#shuffle)
  - [sort](#sort)
  - [unique](#unique)
* Number
  - [round](#round)
  - [random](#random)
  - [identifier](#identifier)
  - [range](#range)
  - [degToRad](#degtorad)
  - [radToDeg](#radtodeg)
* String
  - [datetime](#datetime)
  - [bytes](#bytes)
  - [code](#code)
  - [color](#color)
  - [pad](#pad)
* Object
  - [nested](#nested)
  - [querystring](#querystring)
  - [LabelValue](#labelvalue)
* Cookie
  - [getCookie](#getcookie)
  - [setCookie](#setcookie)
  - [deleteCookie](#deletecookie)

---

### chunks
<code>chunks\<T\>(array: T[], chunkSize: number): T[][]</code>

Split an array in a defined number of chunks.

<pre>
const array = ['a', 'b', 'c', 'd', 'e'];
const arrayChunks = chunks&lt;string&gt;(array, 2);
console.log(arrayChunks); // [['a', 'b'], ['c', 'd'], ['e']];
</pre>

---

### shuffle
<code>shuffle\<T\>(array: T[]): T[]</code>

Shuffle an array.

<pre>
const array = ['a', 'b', 'c', 'd', 'e'];
const shuffled = shuffle&lt;string&gt;(array);
console.log(shuffled); // e.g. ['b', 'd', 'c', 'a', 'e']
</pre>

---

### sort
<code>
  sort&lt;T&gt;(
    array: T[],
    getField: (item: T) =&gt; string | number | Date,
    sortType: 'asc' | 'desc' = 'asc'
  ): T[]
</code>

Sort an array of objects by an object property defined by the getField function.  

<pre>
interface TestItem { name: string; }
const array: TestItem[] = [{ name: 'b' }, { name: 'c' }, { name: 'a' }];
const sorted = sort&lt;TestItem&gt;(array, item =&gt; item.name);
console.log(sorted); // [{ name: 'a' }, { name: 'b' }, { name: 'c' }]
</pre>

---

### unique
<code>unique\<T\>(array: T[]): T[]</code>

Remove the duplicated values from an array.

<pre>
const array = ['a', 'b', 'a', 'b'];
const result = unique&lt;string&gt;(array);
console.log(result); // ['a', 'b']
</pre>

---

### random
<code>random(min: number, max: number, decimals = 0): number</code>

Generate a random number (integer or float) in the defined range (inclusive).

<pre>
const randomInteger = random(5, 10);
console.log(randomInteger); // e.g. 7

const randomFloat = random(5, 10, 3);
console.log(randomFloat); // e.g. 8.842
</pre>

---

### round
<code>round(value: number, decimals = 2): number</code>

Round a number with the defined precision of decimals.

<pre>
const rounded = round(0.15666, 3);
console.log(rounded); // 0.157
</pre>

---

### identifier
<code>identifier(): number</code>

Generate a numeric identifier useful as an ID value.

<pre>
const id = identifier();
console.log(id); // 15764928947236012
</pre>

---

### range
<code>range(min: number, max: number): number[]</code>

Generate an array of numbers in a defined range.

<pre>
const array = range(8, 12);
console.log(array); // [8, 9, 10, 11, 12]
</pre>

---

### degToRad
<code>degToRad(degrees: number): number</code>

Convert degrees to radians.

<pre>
const radians = degToRad(180);
console.log(radians); // PI value
</pre>

---

### radToDeg
<code>radToDeg(radians: number): number</code>

Convert radians to degrees.

<pre>
const degrees = radToDeg(Math.PI);
console.log(degrees); // 180
</pre>

---

### datetime
<code>datetime(date: Date | string | number, withTime = true): string</code>

Get a human-readable format of a date value.

<pre>
const now = datetime(Date.now());
console.log(now); // e.g. '10/04/2024 23:46:24 CET'
</pre>

---

### bytes
<code>bytes(value: number, decimals = 2): string</code>

Get a human-readable format of a bytes value.

<pre>
const label = bytes(1024 * 1024);
console.log(label); // 1.00 MB
</pre>

---

### code
<code>code(length = 10, chars = 'all'): string</code>

Generate a random string.  
**chars** is the set of characters to use. It can be a predefined set between '**alphanumeric**', '**letters**', '**lower-letters**', '**upper-letters**', '**numbers**', '**symbols**', '**all**' or a custom set.

<pre>
// Default
console.log(code()); // e.g. 'nk3IGBPiOh'

// Predefined set
console.log(code(10, 'letters')); // e.g. 'LTaezrWFom'
console.log(code(10, 'numbers')); // e.g. '9060379844'

// Custom set
console.log(code(10, 'abc123$%&')); // e.g. '12&%c222ac'
</pre>

---

### color
<code>color(): string</code>

Generate a random color in hexadecimal notation.

<pre>
const color = color();
console.log(color); // e.g. '#BC37D3'
</pre>

---

### pad
<code>pad(value: number | string, length: number, symbol: string): string</code>

Add a start padding to a value.

<pre>
const padded = pad(2, 4, '0');
console.log(padded); // 0002
</pre>

---

### nested
<code>nested\<T\>(root: Record\<any, unknown\>, path: string): T | undefined</code>

Get the nested value of a object property by a string path.

<pre>
const test = { a: { b: [{ c: 'banana' }] } };
const nested = nested&lt;string&gt;(test, 'a.b.0.c');
console.log(nested); // 'banana'
</pre>

---

### querystring
<code>querystring(): Record\<string, string\></code>

Get the query string of the current url.

<pre>
const query = querystring();
console.log(query); // e.g. { param: 'value' }
</pre>

---

### LabelValue
<code>interface LabelValue\<T\> { label: string; value: T; }</code>

An useful interface to cast the objects with the common label-value pair structure.

<pre>
const stringCasted: LabelValue&lt;string&gt; = {
  label: 'A label',
  value: 'A string';
};

const numberCasted: LabelValue&lt;number&gt; = {
  label: 'A label',
  value: 8;
};

const genericCasted: LabelValue&lt;any&gt; = {
  label: 'A label',
  value: ...a mysterious thing
};
</pre>

---

### getCookie
<code>getCookie(name: string): string | undefined</code>

Get the value of a cookie.

<pre>
const token = getCookie('token');
console.log(token); // cookie value
</pre>

---

### setCookie
<code>setCookie(name: string, value: string, options: CookieOptions = {}): void</code>

Set the value of a cookie.

<pre>setCookie('token', 'abc');</pre>

CookieOptions are:

<pre>
class CookieOptions {
  expires?: Date;
  maxAge?: number;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}
</pre>

For the details of CookieOptions see
[MDN reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies).

---

### deleteCookie
<code>deleteCookie(name: string): void</code>

Delete a cookie.

<pre>deleteCookie('token');</pre>