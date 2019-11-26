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
Latest versions of Chrome, Firefox, Opera, Safari, Edge and IE 9+ (*).

\* **Notes** for **IE**:
- **getQueue** API require **Promise** support, so it doesn't work on all IE versions.
- **requestFullscreen** and **exitFullscreen** API require **Fullscreen** support, available in IE 11 only.

---

## Test, Bugs and Feature requests
If you want to execute unit test run:
```bash
npm test
```
For bugs and feature requests, please create an issue.

---

## API

* Cookie
  - [getCookie](#getcookie)
  - [setCookie](#setcookie)
  - [deleteCookie](#deletecookie)
* Math
  - [random](#random)
  - [round](#round)
  - [degToRad](#degtorad)
  - [radToDeg](#radtodeg)
* Array
  - [chunks](#chunks)
  - [sort](#sort)
  - [shuffle](#shuffle)
* String
  - [getCode](#getcode)
  - [getPassword](#getpassword)
* Object
  - [KeyValue](#keyvalue)
  - [clone](#clone)
  - [getNested](#getnested)
* Query string
  - [getQuery](#getquery)
  - [getQueryParam](#getqueryparam)
  - [objToQuery](#objtoquery)
* Misc
  - [getQueue](#getqueue)
  - [requestFullscreen](#requestfullscreen)
  - [exitFullscreen](#exitfullscreen)

---

### getCookie
<code>getCookie(name: string): string | null</code>

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

---

### random
<code>random(min: number, max: number, decimals = 0): number</code>

Generate a random number (integer or float) in the defined range.

<pre>
const randomInteger = random(5, 10);
console.log(randomInteger); // i.e. 7

const randomFloat = random(5, 10, 3);
console.log(randomFloat); // i.e. 8.842
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

### chunks
<code>chunks\<T\>(array: T[], chunkSize: number): T[][]</code>

Split an array in a defined number of chunks.

<pre>
const array = ['a', 'b', 'c', 'd', 'e'];
const arrayChunks = chunks&lt;string&gt;(array, 2);
console.log(arrayChunks); // [['a', 'b'], ['c', 'd'], ['e']];
</pre>

---

### sort
<code>sort\<T\>(array: T[], key: string, sortType: 'asc' | 'desc' = 'asc'): T[]</code>

Sort an array of objects by a defined object property.  
'key' can be a nested property (see [getNested](#getNested)).

<pre>
interface TestItem { name: string; }
const array: TestItem[] = [{ name: 'b' }, { name: 'c' }, { name: 'a' }];
const sorted = sort&lt;TestItem&gt;(array, 'name');
console.log(sorted); // [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
</pre>

---

### shuffle
<code>shuffle\<T\>(array: T[]): T[]</code>

Shuffle an array.

<pre>
const array = ['a', 'b', 'c', 'd', 'e'];
const shuffled = shuffle&lt;string&gt;(array);
console.log(shuffled); // i.e. ['b', 'd', 'c', 'a', 'e']
</pre>

---

### getCode
<code>getCode(length = 10, chars = 'all'): string</code>

Generate a random string.  
**chars** is the set of characters to use. It can be a predefined set between '**alphanumeric**', '**letters**', '**lower-letters**', '**upper-letters**', '**numbers**', '**symbols**', '**all**' or a custom set.

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
<code>getPassword(length = 10): string</code>

Generate a strong password. It mix up letters, numbers and symbols proportionally.  
**length** must be >= **6**.

<pre>
const password = getPassword();
console.log(password); // i.e. ';7hsE_%-77'
</pre>

---

### KeyValue
<code>interface KeyValue\<T\> { [key: string]: T; }</code>

An useful generic interface to cast common key-value objects.

<pre>
const stringCasted = myObject as KeyValue&lt;string&gt;;
const choiceCasted = myObject as KeyValue&lt;string | number&gt;;
const genericCasted = myObject as KeyValue&lt;any&gt;;
</pre>

---

### clone
<code>clone\<T\>(target: T, sameClass = true): T</code>

Clone an object and its nested content.  
If **sameClass** is true, the cloned object and its nested objects mantain the original class type instead of a generic 'Object' but it can create issues if the constructor of the objects to clone require any parameters.  
In this case set the sameClass option to false and the objects will be cloned only by their content, skipping the contructor and loosing the class type.

<pre>
const cloned = clone(myObject);
console.log(cloned); // object cloned
</pre>

---

### getNested
<code>getNested\<T\>(root: KeyValue\<any\>, path: string): T | null</code>

Get the nested value of a object property by a string path.

<pre>
const test = { a: { b: [{ c: 'banana' }] } };
const nested = getNested&lt;string&gt;(test, 'a.b.0.c');
console.log(nested); // 'banana'
</pre>

---

### getQuery
<code>getQuery(): { [key: string]: string }</code>

Get the query string of the current url.

<pre>
const query = getQuery();
console.log(query); // i.e. { param: 'value' }
</pre>

---

### getQueryParam
<code>getQueryParam(name: string): string | null</code>

Get a specific param of the current query string.

<pre>
const param = getQueryParam('param');
console.log(param); // i.e. 'value'
</pre>

---

### objToQuery
<code>objToQuery(target: KeyValue\<any\>): string</code>

Convert an object to a valid query string.

<pre>
const query = objToQuery({ param1: 'value 1', param2: 'value 2' );
console.log(query); // 'param1=value%201&param2=value%202'
</pre>

---

### getQueue
<code>getQueue\<T\>(tasks: Array\<() => Promise\<T\>\>): Promise\<T[]\></code>

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

getQueue&lt;number&gt;(tasks)
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