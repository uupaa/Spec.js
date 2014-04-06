Spec.js
=========

Spec detection.

# Document

- https://github.com/uupaa/Spec.js/wiki/Spec

and

- https://github.com/uupaa/UserAgent.js/wiki/UserAgent
- https://github.com/uupaa/Device.js/wiki/Device
- https://github.com/uupaa/Browser.js/wiki/Browser
- https://github.com/uupaa/WebModule and [slide](http://uupaa.github.io/Slide/slide/WebModule/index.html)
- https://github.com/uupaa/Help.js and [slide](http://uupaa.github.io/Slide/slide/Help.js/index.html)

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

# for Developers

1. Install development dependency tools

    ```sh
    $ brew install closure-compiler
    $ brew install node
    $ npm install -g plato
    ```

2. Clone Repository and Install

    ```sh
    $ git clone git@github.com:uupaa/Spec.js.git
    $ cd Spec.js
    $ npm install
    ```

3. Build and Minify

    `$ npm run build`

4. Test

    `$ npm run test`

5. Lint

    `$ npm run lint`

