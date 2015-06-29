// Spec test

require("../lib/WebModule.js");

//publish to global. eg: window.WebModule.Class -> window.Class
//WebModule.publish = true;


require("./wmtools.js");
require("../lib/SpecCatalog.js");
require("../lib/Spec.js");
require("../release/Spec.n.min.js");
require("./testcase.js");

