# Spec.js [![Build Status](https://travis-ci.org/uupaa/Spec.js.svg)](https://travis-ci.org/uupaa/Spec.js)

[![npm](https://nodei.co/npm/uupaa.spec.js.svg?downloads=true&stars=true)](https://nodei.co/npm/uupaa.spec.js/)

Spec detection.

## Document

- Spec.js made of [WebModule](https://github.com/uupaa/WebModule).
- [Spec](https://github.com/uupaa/Spec.js/wiki/Spec)

## Browser and NW.js(node-webkit)

```js
<script src="<your-install-dir>/lib/WebModule.js"></script>
<script src="<your-install-dir>/lib/Spec.js"></script>
<script src="<your-install-dir>/lib/SpecCatalog.js"></script>
<script>

var spec = new WebModule.Spec();
console.log(spec.USER_AGENT);   // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36";
console.log(spec.BROWSER);      // "Chrome"

</script>
```

## WebWorkers

```js
importScripts("<your-install-dir>lib/WebModule.js");
importScripts("<your-install-dir>lib/Spec.js");

```

## Node.js

```js
require("<your-install-dir>lib/WebModule.js");
require("<your-install-dir>lib/Spec.js");

```

