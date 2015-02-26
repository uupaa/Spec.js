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
<script src="lib/Spec.js"></script>
<script src="lib/SpecCatalog.js"></script>
<script>

var spec = new Spec();
console.log(spec.USER_AGENT);   // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36";
console.log(spec.BROWSER_NAME); // "Chrome"

</script>
```

```js
// for WebWorkers
importScripts("lib/Spec.js");
importScripts("lib/SpecCatalog.js");

...
```

```js
// for Node.js
require("lib/Spec.js");
require("lib/SpecCatalog.js");

...
```
