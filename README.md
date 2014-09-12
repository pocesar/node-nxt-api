[![Build Status](https://travis-ci.org/pocesar/node-nxt-api.svg?branch=master)](https://travis-ci.org/pocesar/node-nxt-api)
[![Coverage Status](https://img.shields.io/coveralls/pocesar/node-nxt-api.svg)](https://coveralls.io/r/pocesar/node-nxt-api?branch=master)

NXT API
============

API request wrapper for [NXT crypto](http://wiki.nxtcrypto.org/wiki/Nxt_API) for Node.js and the browser.
It just has all the currently public API methods for NXT along side with a dual API Promise/Callback based interface.

Plus it's created using Typescript, which should ensure the proper parameters for each API call.

## Install

For node.js

```
npm install nxt-api
```

For the browser

```
bower install nxt-api
```

## Usage

In Node.js:

```javascript
var NXT = require('nxt-api');

// start your NRS client first
var API = new NXT.API('http://127.0.0.1:6876');

API.getNextBlockGenerators().then(function (answer) {
    console.log(answer);
});

API.rsConvert({ account: 'x' }).then(function (answer) {
    // should error
}, function (error) {
    console.log(error);
});
```

In the browser (needs to have `nxt.apiServerCORS=true` in your NXT config file, otherwise you need to access it from same port and hostname):

```html
<script src="nxt-api.js"></script>
<script>
    var instance = new NXT.API('http://127.0.0.1:7876');

    instance.getNextBlockGenerators().then(function(answer){
        console.log(answer);
    });
</script>
```

## Example

Start the NRS in testNet mode, then run

```
npm run example
```

## TODO

- Missing JSDocs for most of the functions

## Support

* `BTC: 1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu`
* `NXT: NXT-7TJT-8NS2-8QBS-5Y89X`