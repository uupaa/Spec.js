// Spec test

require("../../lib/WebModule.js");

// publish to global
WebModule.publish = true;

require("../../node_modules/uupaa.useragent.js/node_modules/uupaa.webgldetector.js/lib/WebGLDetector.js");
require("../../node_modules/uupaa.useragent.js/lib/UserAgent.js");
require("../wmtools.js");
require("../../lib/SpecCatalog.js");
require("../../lib/Spec.js");
require("../../release/Spec.n.min.js");
require("../testcase.js");

