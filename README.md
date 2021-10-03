# js-sanitizer

Sanitize js code provided as string. This is a js sanitizer and not an Html sanitizer! Prevents any js code written as a
string to access global variables (In Node , and window in browser).

## Motivation

Using `eval()` or the newer `new Function()` is a known security risk and it is generally a bad idea to use them.

However there are some use cases where one is forced to use them, i.e to run a function which is written as a string.

This library is written for the sole purpose of reducing the security risks associated with running a function from a
string. This is done by trying to sanitize the string, in this case preventing access to any global/window variable
inside the string. Under the hood this library forces the function in a scope where the global/window variables are
undefined.

⚠️ DISCLAIMER: ⚠️ I do not claim this library to be 100% safe (or even close), use at your own risk.

## Installation

```
npm add js-sanitizer
// or
yarn add js-sanitizer
```

## Usage

Typescript:

```
import { sanitize } from 'js-sanitizer';

const data = 'test';
const myFn = sanitize('(x) => x');
console.log({ ran: myFn(data) });
```

Javascript:

```
const { sanitize } = require('js-sanitizer');

const data = 'test';
const myFn = sanitize('(x) => x');
console.log({ ran: myFn(data) });
```

## Options

The sanitizer may take some options:

```
interface SanitizerOptions {
   /*
      allow the user to use specific functions/classes.
      Note: a property added in both this and the expandBanList option will be allowed;
      e.g sanitize(fn, {allow: ['JSON']}) will allow the user to use JSON functions (e.g JSON.stringify)
   */
   allow: string[]; 
   /*
      Set true if you need to prevent usage of window properties
   */
   sanitizeWindowProperties: boolean; 
   /*
      causes an error if a specific js keyword is present in the string
   */
   preventKeyWord: KeywordType[]; 
   /*
      causes an error if any string here is present in the string to be sanitized
   */
   preventString: string[]; 
   /*
      expand the current ban list to add other functions/classes which should not be accessible
      it is generally a good idea to add all the global variables you defined here
   */
   expandBanList: string[]; 
   /*
      does a console.error instead of throwing the error
      Note: This doesnt prevent error inside from the sanitized function to be thrown
   */
   failSilently: boolean; 
}
```
