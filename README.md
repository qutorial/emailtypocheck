# Email Domain Typo Checker

This package allows you to check the email addresses for typos in the domain names.


## Installation

From npmjs:

```
npm install emailtypocheck --save
```

## Usage 

var etc = require('../dist/emailtypocheck.js');
etc.checkEmailTypos("test@gmsil.com");
// [gmail.com] - typo correction
tlds.checkEmailTypos("test@gmail.com");
// [] - no typos

## Developer Setup

Run `make install` to install dependencies.

