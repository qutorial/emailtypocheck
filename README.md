# Top Level Domain Checker

This package allows you to check the email addresses and the urls to have
valid top level domains (TLDs) from IANA. 

## Installation

From npmjs:

```
npm install tldcheck --save
```

## Usage 

var tlds = require('../dist/tldcheck.js');
tlds.checkTldEmail("test@hello.de");
// true
tlds.checkTldEmail("test@hello.dde");
// false

## Developer Setup

Run `make install` to install dependencies.

