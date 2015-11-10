# Spec.js [![Build Status](https://travis-ci.org/uupaa/Spec.js.svg)](https://travis-ci.org/uupaa/Spec.js)

[![npm](https://nodei.co/npm/uupaa.spec.js.svg?downloads=true&stars=true)](https://nodei.co/npm/uupaa.spec.js/)

Mobile Device Spec detection.


This module made of [WebModule](https://github.com/uupaa/WebModule).

## Documentation
- [Spec](https://github.com/uupaa/Spec.js/wiki/)
- [API Spec](https://github.com/uupaa/Spec.js/wiki/Spec)

## Browser, NW.js and Electron

```js
<script src="<module-dir>/lib/WebModule.js"></script>
<script src="<module-dir>/lib/WebGLDetector.js"></script>
<script src="<module-dir>/lib/UserAgent.js"></script>
<script src="<module-dir>/lib/SpecCatalog.js"></script>
<script src="<module-dir>/lib/Spec.js"></script>
<script>

var ua = new UserAgent(); // iPhone 6
var spec = new Spec(ua);

spec.UNKNOWN            // -> false
spec.SOC                // -> "A8"
spec.GPU                // -> "POWERVR GX6450",
spec.RAM                // -> 1024
spec.BLE                // -> true
spec.NFC                // -> false
spec.ATOM               // -> false
spec.SIMD               // -> true
spec.FORCE_TOUCH        // -> false
spec.FORCE_CLICK        // -> false
spec.MAX_THREADS        // -> 2
spec.MAX_TOUCH_POINTS   // -> 5
spec.MAX_TEXTURE_SIZE   // -> 16384
spec.LOW_END            // -> false
spec.OUTMODED           // -> false

</script>
```

## WebWorkers

```js
importScripts("<module-dir>lib/WebModule.js");
importScripts("<module-dir>lib/SpecCatalog.js");
importScripts("<module-dir>lib/Spec.js");

```

## Node.js

```js
require("<module-dir>lib/WebModule.js");
require("<module-dir>lib/SpecCatalog.js");
require("<module-dir>lib/Spec.js");

```

