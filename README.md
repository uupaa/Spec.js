# Spec.js [![Build Status](https://travis-ci.org/uupaa/Spec.js.png)](http://travis-ci.org/uupaa/Spec.js)

[![npm](https://nodei.co/npm/uupaa.spec.js.png?downloads=true&stars=true)](https://nodei.co/npm/uupaa.spec.js/)

Spec detection.

# Document

- [Spec.js wiki](https://github.com/uupaa/Spec.js/wiki/Spec)
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [WebModule](https://github.com/uupaa/WebModule)
    - [Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html)
    - [Development](https://github.com/uupaa/WebModule/wiki/Development)


# How to use

```js
<script src="lib/Spec.js">
<script>
// for Browser
console.log( JSON.stringify( new Spec().dump(), null, 2 ) );
</script>
```

```js
// for WebWorkers
importScripts("lib/Spec.js");
console.log( JSON.stringify( new Spec().dump(), null, 2 ) );
```

```js
// for Node.js
var Spec = require("lib/Spec.js");
console.log( JSON.stringify( new Spec().dump(), null, 2 ) );
```
