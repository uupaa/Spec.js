=========
Spec.js
=========

![](https://travis-ci.org/uupaa/Spec.js.png)

Spec detection.

# Document

- [WebModule](https://github.com/uupaa/WebModule) ([Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html))
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [Spec.js wiki](https://github.com/uupaa/Spec.js/wiki/Spec)


# How to use

```js
<script src="lib/Spec.js">
<script>
// for Browser
console.log( Spec() );
</script>
```

```js
// for WebWorkers
importScripts("lib/Spec.js");
console.log( Spec() );
```

```js
// for Node.js
var Spec = require("lib/Spec.js");
console.log( Spec() );
```
