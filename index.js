/**
 * @author zosma
 * https://github.com/zosma180
 */

'use strict';


/*********************************** Cookie ***********************************/
function getCookie(name) {
  if (typeof name !== 'string') { return null; }
  var result = null;
  var list = document.cookie.split('; ');

  for (var i = 0, l = list.length; i < l && result === null; i++) {
    var cookie = list[i].split('=');

    if (cookie[0] === name) {
      result = decodeURIComponent(cookie[1]);
    }
  }

  return result;
}

function setCookie(name, value, options) {
  if (typeof name !== 'string') { return; }
  value = typeof value !== 'string' ? 'Invalid value' : value;
  var encodedValue = encodeURIComponent(value);
  var attributes = '';
  options = options || {};

  if (options.expires) {
    attributes += '; Expires=' + options.expires.toUTCString();
  }

  if (options.maxAge) {
    attributes += '; Max-Age=' + options.maxAge;
  }

  if (options.domain) {
    attributes += '; Domain=' + options.domain;
  }

  attributes += '; Path=' + (options.path || '/');

  if (options.secure) {
    attributes += '; Secure';
  }

  if (options.httpOnly) {
    attributes += '; HttpOnly';
  }

  if (options.sameSite && ['Strict', 'Lax', 'None'].indexOf(options.sameSite) > -1) {
    attributes += '; SameSite=' + options.sameSite;
  }

  document.cookie = name + '=' + encodedValue + attributes;
}

function deleteCookie(name) {
  if (typeof name !== 'string') { return; }
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


/*********************************** Math ***********************************/
function random(min, max, float) {
  min = min === undefined ? 0 : min;
  max = max === undefined ? min + 1 : max;

  var result = Math.random() * (max - min) + min;
  if (!float) { result = Math.round(result); }

  return result;
}

function round(value, decimals) {
  decimals = decimals === undefined ? 2 : decimals;
  var factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

function radToDeg(radians) {
  return (radians * 180) / Math.PI;
}


/*********************************** Array ***********************************/
function chunks(array, chunkSize) {
  chunkSize = chunkSize === undefined ? array.length : chunkSize;
  var result = [];

  for (var i = 0, l = array.length; i < l; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}

function sort(array, key, sortType) {
  var result = array.slice(0);
  if (typeof key !== 'string') { return result; }
  var sort = sortType === 'desc' ? -1 : 1;

  return result.sort(function(a, b) {
    var A = a[key];
    var B = b[key];

    if (typeof A === 'string') { A = A.toLowerCase(); }
    if (typeof B === 'string') { B = B.toLowerCase(); }

    if (A > B) { return sort; }
    if (A < B) { return - sort; }
    return 0;
  });
}

function shuffle(array) {
  var result = array.slice(0);

  for (var i = result.length - 1; i > 0; i--) {
    var random = Math.floor(Math.random() * (i + 1));
    var item = result[i];
    result[i] = result[random];
    result[random] = item;
  }

  return result;
}


/*********************************** String ***********************************/
function getCode(length, chars) {
  length = typeof length === 'number' && length > 0 ? length : 10;
  chars = chars || 'all';

  var lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
  var upperLetters = lowerLetters.toUpperCase();
  var numbers = '0123456789';
  var symbols = '!$%&=?^+*@#.:,;-_';

  var options = {
    'all': upperLetters + lowerLetters + numbers + symbols,
    'alphanumeric': upperLetters + lowerLetters + numbers,
    'letters': upperLetters + lowerLetters,
    'lower-letters': lowerLetters,
    'upper-letters': upperLetters,
    'numbers': numbers,
    'symbols': symbols
  };

  if (options[chars]) { chars = options[chars]; }

  var result = '';

  for (var i = 0; i < length; i++) {
    var random = Math.floor(Math.random() * chars.length);
    result += chars.charAt(random);
  }

  return result;
}

function getPassword(length) {
  length = typeof length === 'number' && length >= 3 ? length : 10;
  var alphanumericCount = Math.round(length / 3);

  var letters = getCode(alphanumericCount, 'letters');
  var numbers = getCode(alphanumericCount, 'numbers');
  var symbols = getCode(length - (alphanumericCount * 2), 'symbols');
  var result = (letters + numbers + symbols).split('');

  return shuffle(result).join('');
}


/*********************************** Object ***********************************/
function clone(target, sameClass) {
  sameClass = sameClass === undefined ? true : sameClass;
  if (typeof target !== 'object' || target === null) { return target; }
  if (target instanceof Date) { return new Date(target); }
  var result;

  if (target instanceof Array) {
    result = [];
  } else if (sameClass) {
    result = new target.constructor();
  } else {
    result = {};
  }

  var keys = Object.keys(target);

  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    result[key] = clone(target[key], sameClass);
  }

  return result;
}


/*********************************** Query string ***********************************/
function getQuery() {
  var result = {};
  var query = window.location.search.replace('?', '');
  if (!query) { return result; }

  var params = query.split('&');

  for (var i = 0, l = params.length; i < l; i++) {
    var pair = params[i].split('=');
    result[pair[0]] = decodeURIComponent(pair[1] || '');
  }

  return result;
}

function getQueryParam(name) {
  var query = getQuery();
  return query && query[name] !== undefined ? query[name] : null;
}

function objToQuery(target) {
  if (!target || typeof target !== 'object') { return ''; }
  var result = [];

  var keys = Object.keys(target);

  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    var value = String(target[key]);
    var param = encodeURIComponent(key) + '=' + encodeURIComponent(value);
    result.push(param);
  }

  return result.join('&');
}


/*********************************** Misc ***********************************/
function getQueue(tasks) {
  if (!('Promise' in window)) {
    return console.error('jackknife: Promise not supported by your browser.');
  }

  var queue = tasks.reduce(function(next, task) {
    return next.then(function(results) {
      return task().then(function(result) {
        results.push(result);
        return results;
      });
    });
  }, Promise.resolve([]));

  return queue;
}

function requestFullscreen(element) {
  var api = element.requestFullscreen || element.webkitRequestFullscreen || element.mozRequestFullscreen || element.msRequestFullscreen;
  if (!api) { throw new Error('jackknife: requestFullscreen not supported by your browser.'); }
  return api.call(element);
}

function exitFullscreen() {
  var api = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
  if (!api) { throw new Error('jackknife: exitFullscreen not supported by your browser.'); }
  return api.call(document);
}


/*********************************** Exports ***********************************/
exports.getCookie = getCookie;
exports.setCookie = setCookie;
exports.deleteCookie = deleteCookie;
exports.random = random;
exports.round = round;
exports.degToRad = degToRad;
exports.radToDeg = radToDeg;
exports.chunks = chunks;
exports.sort = sort;
exports.shuffle = shuffle;
exports.getCode = getCode;
exports.getPassword = getPassword;
exports.clone = clone;
exports.getQuery = getQuery;
exports.getQueryParam = getQueryParam;
exports.objToQuery = objToQuery;
exports.getQueue = getQueue;
exports.requestFullscreen = requestFullscreen;
exports.exitFullscreen = exitFullscreen;
