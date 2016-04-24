// Spec test

require("../../lib/WebModule.js");

WebModule.VERIFY  = true;
WebModule.VERBOSE = true;
WebModule.PUBLISH = true;

require("../../node_modules/uupaa.useragent.js/lib/UserAgent.js");
require("../wmtools.js");
require("../../lib/SpecCatalog.js");
require("../../lib/SpecCatalogFP.js");
require("../../lib/Spec.js");
require("../../release/Spec.n.min.js");
require("../testcase.js");

