<p align="center"><img src="logo.png" alt="jackknife logo"></p>

# jackknife

![npm](https://img.shields.io/npm/v/jackknife?style=flat-square)
![npm bundle size](https://img.shields.io/bundlephobia/min/jackknife?style=flat-square)
![license](https://img.shields.io/npm/l/jackknife?style=flat-square)
[![Issues](https://img.shields.io/github/issues/zosma180/jackknife.svg?style=flat-square)](https://github.com/zosma180/jackknife/issues)

---

## Description
**jackknife** is a multi-tool that provides a set of utility functions to face the wild projects.  
All blades are typescript compatible.


## Installation
```
npm i jackknife
```

In order to use any API you have to import them.
```typescript
// Typescript
import { clone, getPassword, sort } from 'jackknife';

// or Node
const { clone, getPassword, sort } = require('jackknife');
```


## Browser support
Latest versions of Chrome, Firefox, Opera, Safari, Edge and IE 9+.  
Special notes for IE:
- **getQueue** API require **Promise** support, so it doesn't work on all IE versions.
- **requestFullscreen** and **exitFullscreen** API require **Fullscreen** support, available only in IE 11.


## Bugs and feature requests
For bugs and feature requests, please create an issue.


## API

* Cookie
  - [getCookie](#getCookie)
  - [setCookie](#setCookie)
  - [deleteCookie](#deleteCookie)
* Math
  - [random](#random)
  - [round](#round)
  - [degToRad](#degToRad)
  - [radToDeg](#radToDeg)
* Array
  - [chunks](#chunks)
  - [sort](#sort)
  - [shuffle](#shuffle)
* String
  - [getCode](#getCode)
  - [getPassword](#getPassword)
* Object
  - [clone](#clone)
* Query string
  - [getQuery](#getQuery)
  - [getQueryParam](#getQueryParam)
  - [objToQuery](#objToQuery)
* Misc
  - [getQueue](#getQueue)
  - [requestFullscreen](#requestFullscreen)
  - [exitFullscreen](#exitFullscreen)

---

### getCookie
<code>getCookie(name: string): string | null;</code>

Get the value of a cookie.

<pre>const token = getCookie('token');</pre>

---

### setCookie
<code>setCookie(name: string, value: string, options?: Partial\<CookieOptions\>): void;</code>

Set the value of a cookie.

<pre>setCookie('token', 'abc');</pre>

CookieOptions are:

<pre>
class CookieOptions {
  expires: Date;
  maxAge: number;
  domain: string;
  path: string;
  secure: boolean;
  httpOnly: boolean;
  sameSite: 'Strict' | 'Lax' | 'None';
}
</pre>

For the details of CookieOptions see
[MDN reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies).

---

### deleteCookie
<code>deleteCookie(name: string): void;</code>

Delete a cookie.

<pre>deleteCookie('token');</pre>

---

### random
<code>random(min: number, max: number, float?: boolean): number;</code>

Generate a random number (integer or float) in the defined range.

<pre>
const randomInteger = random(5, 10);
const randomFloat = random(5, 10, true);
</pre>

---

### round
<code>round(value: number, decimals?: number): number;</code>

Round a number with the defined precision of decimals.
**decimals** is **2** by default.

<pre>const rounded = round(0.15666, 3); // 0.157</pre>

---

### degToRad
<code>degToRad(degrees: number): number;</code>

Convert degrees to radians.

<pre>const radians = degToRad(180); // PI value</pre>

---

### radToDeg
<code>radToDeg(radians: number): number;</code>

Convert radians to degrees.

<pre>const degrees = radToDeg(Math.PI); // 180</pre>

---

### chunks
<code>chunks\<T\>(array: T[], chunkSize: number): T[][];</code>

Split an array in a defined number of chunks.

<pre>
const array = ['a', 'b', 'c', 'd', 'e'];
const arrayChunks = chunks(array, 2);
console.log(arrayChunks); // [['a', 'b'], ['c', 'd'], ['e']];
</pre>

---

### sort
<code>sort\<T\>(array: T[], key: string, sortType?: string): T[];</code>

Sort an array of objects by a defined object property.  
**sortType** can be '**asc**' or '**desc**', default is '**asc**'.

<pre>
const array = [{ name: 'b' }, { name: 'c' }, { name: 'a' }];
const sorted = sort(array, 'name');
console.log(sorted); // [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
</pre>

---

### shuffle
<code>shuffle\<T\>(array: T[]): T[];</code>

Shuffle an array.

<pre>
const array = ['a', 'b', 'c', 'd', 'e'];
const shuffled = shuffle(array);
console.log(shuffled); // i.e. ['b', 'd', 'c', 'a', 'e']
</pre>

---

### getCode
<code>getCode(length?: number, chars?: string): string;</code>

Generate a random string.  
**length** is **10** by default.  
**chars** is the set of characters to use. It can be a predefined set between '**alphanumeric**', '**letters**', '**lower-letters**', '**upper-letters**', '**numbers**', '**symbols**', '**all**' or a custom set.
It is '**all**' by default.

<pre>
// Default
console.log(getCode()); // i.e. 'nk3IGBPiOh'

// Predefined set
console.log(getCode(10, 'letters')); // i.e. 'LTaezrWFom'
console.log(getCode(10, 'numbers')); // i.e. '9060379844'

// Custom set
console.log(getCode(10, 'abc123$%&')); // i.e. '12&%c222ac'
</pre>

---

### getPassword
<code>getPassword(length?: number): string;</code>

Generate a strong password. It mix up letters, numbers and symbols proportionally.  
**length** is **10** by default.

<pre>
const password = getPassword();
console.log(password); // i.e. ';7hsE_%-77'
</pre>

---

### clone
<code>clone\<T\>(target: T, sameClass?: boolean): T;</code>

Clone an object and its nested content.  
If **sameClass** is true, the cloned object and its nested objects mantain the original class type instead of a generic 'Object' but it can create issues if the constructor of the objects to clone require any parameters.  
In this case set the sameClass option to false and the objects will be cloned only by their content, skipping the contructor and loosing the class type.  
sameClass is **true** by default.

<pre>const cloned = clone(myObject);</pre>

---

### getQuery
<code>getQuery(): { [key: string]: string };</code>

Get the query string of the current url.

<pre>
const query = getQuery();
console.log(query); // i.e. { param: 'value' }
</pre>

---

### getQueryParam
<code>getQueryParam(name: string): string | null;</code>

Get a specific param of the current query string.

<pre>
const param = getQueryParam('param');
console.log(param); // i.e. 'value'
</pre>

---

### objToQuery
<code>objToQuery(obj: { [key: string]: any }): string;</code>

Convert an object to a valid query string.

<pre>
const query = objToQuery({ param1: 'value 1', param2: 'value 2' );
console.log(query); // 'param1=value%201&param2=value%202'
</pre>

---

### getQueue
<code>getQueue<T>(tasks: (() => Promise\<T\>)[]): Promise\<T[]\>;</code>

Serialize and execute a list of Promises in the provided order.  
It return a Promise with the array of all ordered results.  
Note: 'tasks' is an array of **functions** that return a **Promise**.

<pre>
const tasks = [
  () => {
    return new Promise(resolve => {
      setTimeout(() => resolve(1), 100);
    });
  },
  () => new Promise(resolve => resolve(2)),
  () => new Promise(resolve => resolve(3))
];

getQueue(tasks)
  .then(results => console.log(results)); // [1, 2, 3]
</pre>

---

### requestFullscreen
<code>requestFullscreen(element: HTMLElement): Promise\<void\>;</code>

Make the element be displayed in full-screen mode.  
This api is only a shortcut for all browser-specific 'requestFullscreen' (webkit, moz, ms).

<pre>
const element = document.getElementById('my-element');
requestFullscreen(element);
</pre>

---

### exitFullscreen
<code>exitFullscreen(): Promise\<void\>;</code>

Exit from the full-screen mode.  
This api is only a shortcut for all browser-specific 'exitFullscreen' (webkit, moz, ms).

<pre>exitFullscreen();</pre>