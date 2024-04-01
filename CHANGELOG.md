<a name="4.0.0"></a>

## [4.0.0](https://github.com/zosma180/jackknife/compare/3.8.0...4.0.0) (2024-03-30)

### Features

- Added the new APIs:
    - `unique`
- Renamed the APIs:
    - `unique` -> `identifier`
    - `getCode` -> `code`
    - `getColor` -> `color`
    - `getNested` -> `nested`
    - `getQuery` -> `querystring`
- Removed the obsolote APIs:
    - `requestFullscreen`
    - `exitFullscreen`
    - `querystringParam`
    - `getQueue`
    - `clone`
    - `KeyValue`
    - `objToQuery`
    - `objToParams`
    - `getPassword`
- Added the CommonJS output.
- Reviewed the codebase.
- Replaced jasmine test tool with jest.

---

<a name="3.0.0"></a>

## [3.0.0](https://github.com/zosma180/jackknife/compare/2.8.1...3.0.0) (2022-10-31)

### Features

- Compiled the project as ES2015 module.

---

<a name="2.8.1"></a>

## [2.8.1](https://github.com/zosma180/jackknife/compare/2.8.0...2.8.1) (2022-07-22)

### Bug Fixes

- Updated the package-lock to fix the security issues.

---

<a name="2.8.0"></a>

## [2.8.0](https://github.com/zosma180/jackknife/compare/2.7.2...2.8.0) (2020-04-11)

### Features

* Added the `datetime` API.
* Added the `pad` API.

---

<a name="2.7.2"></a>

## [2.7.2](https://github.com/zosma180/jackknife/compare/2.7.1...2.7.2) (2020-04-04)

### Fixes

* Fixed the HTMLElement type issue with NodeJS.

---

<a name="2.7.1"></a>

## [2.7.1](https://github.com/zosma180/jackknife/compare/2.7.0...2.7.1) (2020-03-22)

### Improvements

* Rebuilded the project after the security patch of the dependencies.

---

<a name="2.7.0"></a>

## [2.7.0](https://github.com/zosma180/jackknife/compare/2.6.2...2.7.0) (2020-01-31)

### Features

* Added the optional `keepEmpty` parameters to `objToParams` API to maintain the empty values in the result.

---

<a name="2.6.2"></a>

## [2.6.2](https://github.com/zosma180/jackknife/compare/2.6.1...2.6.2) (2020-01-29)

### Fixes

* Fixed the `objToParams` API null/object casting.

---

<a name="2.6.1"></a>

## [2.6.1](https://github.com/zosma180/jackknife/compare/2.6.0...2.6.1) (2020-01-26)

### Improvements

* Updated the `getPassword` API (default length and symbols).

---

<a name="2.6.0"></a>

## [2.6.0](https://github.com/zosma180/jackknife/compare/2.5.0...2.6.0) (2020-01-08)

### Features

* Added the `getColor` API.
* Added the `LabelValue` interface.

---

<a name="2.5.0"></a>

## [2.5.0](https://github.com/zosma180/jackknife/compare/2.4.2...2.5.0) (2019-12-30)

### Features

* Added the `range` API.

---

<a name="2.4.2"></a>

## [2.4.2](https://github.com/zosma180/jackknife/compare/2.4.1...2.4.2) (2019-12-19)

### Improvements

* Updated the logo.
* Converted the development scripts to node.

---

<a name="2.4.1"></a>

## [2.4.1](https://github.com/zosma180/jackknife/compare/2.4.0...2.4.1) (2019-12-16)

### Improvements

* Added `src` folder to npmignore.

---

<a name="2.4.0"></a>

## [2.4.0](https://github.com/zosma180/jackknife/compare/2.3.1...2.4.0) (2019-12-16)

### Features

* Added the `unique` API.

---

<a name="2.3.1"></a>

## [2.3.1](https://github.com/zosma180/jackknife/compare/2.3.0...2.3.1) (2019-12-15)

### Improvements

* Added npmignore file to reduce the package output.

---

<a name="2.3.0"></a>

## [2.3.0](https://github.com/zosma180/jackknife/compare/2.2.0...2.3.0) (2019-12-13)

### Features

* Added the `objToParams` API.

---

<a name="2.2.0"></a>

## [2.2.0](https://github.com/zosma180/jackknife/compare/2.1.0...2.2.0) (2019-11-26)

### Improvements

* Added right links to the README anchors.

---

<a name="2.1.0"></a>

## [2.1.0](https://github.com/zosma180/jackknife/compare/2.0.0...2.1.0) (2019-08-23)

### Features

* `random`: *WARNING* - replaced `float` option with the customizable `decimals` count.
* `getPassword`: *WARNING* - minimum `length` has been increased to `6`.

---

<a name="2.0.0"></a>

## [2.0.0](https://github.com/zosma180/jackknife/compare/1.0.0...2.0.0) (2019-08-22)

### Features

* Added the `KeyValue` interface.
* Added the `nested` API.

### Improvements

* Implemented `Typescript` codebase.

---

<a name="1.0.0"></a>

## 1.0.0 (2019-08-17)

### Features

* Released the project.