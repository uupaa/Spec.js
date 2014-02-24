// @name: Spec.js

(function(global) {

// --- variable --------------------------------------------
var _inNode = "process" in global;

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function Spec(param) { // @arg Object(= null): { ua, env }
                       //   param.ua - UserAgentString(= navigator.userAgent):
                       //   param.env - Object(= null): emulate spec values. { screen, devicePixelRatio, ... }
                       // @ret SpecObject: { DEVICE, OS, CPU, GPU, INPUT,
                       //                    MEMORY, DISPLAY, NETWORK, BROWSER }
                       // @help: Spec
                       // @desc: Create SpecObject.
//{@assert
    _if(!_type(param, "Object/omit", "ua,env"), "Spec(param)");
//}@assert

    param = param || {};
    var userAgent         = param["ua"]  || (global["navigator"] || {})["userAgent"] || "";
    var emulateDeviceInfo = param["env"] || {};

//{@assert
    _if(!_type(userAgent,         "String"), "Spec(param.ua)");
    _if(!_type(emulateDeviceInfo, "Object"), "Spec(param.env)");
//}@assert

    return _createSpecObject(userAgent, emulateDeviceInfo);
}

Spec["name"] = "Spec";
Spec["repository"] = "https://github.com/uupaa/Spec.js";

// --- implement -------------------------------------------
function _createSpecObject(userAgent,           // @arg String: user agent.
                           emulateDeviceInfo) { // @arg Object:
                                                // @ret SpecObject: { DEVICE, OS, CPU, GPU, INPUT,
                                                //                    MEMORY, DISPLAY, NETWORK, BROWSER }
    return {
        "DEVICE": {
            valueOf: function() { return this["ID"]; },
            "ID":    "",        // Device ID.
            "MAYBE": false,     // Maybe Device ID.
            "BRAND": "",        // Device brand or maker name. eg: "Google", "SONY"
            "SOC":   "",        // System on chip name. eg: "MSM8974"
            "GPS":   false,     // GPS enable.
            "EMULATE": emulateDeviceInfo
        },
        "OS": {
            valueOf: _typeValueOf,
            "TYPE":  "",        // OS type. "Android", "iOS", "Windows Phone", "Windows", "Mac OS X", "Game"
            "VERSION": {
                valueOf: _versionValueOf,
                "MAJOR": 0,
                "MINOR": 0,
                "PATCH": 0,
                "PRE": {        // Pre-installed OS Version.
                    valueOf: _versionValueOf,
                    "MAJOR": 0,
                    "MINOR": 0,
                    "PATCH": 0
                },
                "HIGHEST": {    // Highest Supported OS Version.
                    valueOf: _versionValueOf,
                    "MAJOR": 0,
                    "MINOR": 0,
                    "PATCH": 0
                }
            }
        },
        "CPU": {
            valueOf: _typeValueOf,
            "TYPE":  "",        // CPU type. "ARM", "ARM64", "ATOM"
            "CLOCK": 0.0,       // CPU clock (unit: GHz).
            "CORES": 0,         // CPU cores. 1(single), 2(dual), 4(quad)
            "SIMD":  false      // Enable SIMD (aka ARM-NEON).
        },
        "GPU": {
            valueOf: _typeValueOf,
            "TYPE":  "",        // GPU type. eg: "Adreno"
            "ID":    ""         // GPU ID. eg: "330"
        },
        "INPUT": {
            "TOUCH": false,     // Touch enable.
            "TOUCHES": 0        // Touch points.
        },
        "MEMORY": {
            "RAM":   0.0        // RAM size (unit: GB).
        },
        "DISPLAY": {
            "DPR":   0.0,       // Device pixel ratio.
            "PPI":   0,         // Display pixel per inch.
            "INCH":  0.0,       // Display size(inch).
            "LONG":  0,         // Display long edge.
            "SHORT": 0          // Display short,edge.
        },
        "NETWORK": {
            "3G":    false,     // Enable 3G.
            "LTE":   false,     // Enable LTE.
            "NFC":   false,     // Enable NFC.
            "WIFI":  false,     // Enable Wi-Fi.
            "CONNECTION": {
                "MAX":  0,      // Max connections.
                "HOST": 0       // Connection per host.
            }
        },
        "BROWSER": {
            valueOf: _nameValueOf,
            "USER_AGENT":   userAgent,
            "NAME":         "",     // Browser name. Chrome, Chromium, Firfox, AndroidBrowser, IE, Safari, WebKit
            "ENGINE":       "",     // Render Engine. "Blink", "Trident", "Gecko", "WebKit"
            "MOBILE":       false,  // true is Mobile Browser. Android or iOS or Windows Phone
            "WEB_VIEW":     false,  // true is WebView.
            "FUNCTION": {           // Browser Functions.
            },
            "LANGUAGE":     "",     // Content language. "en", "ja", ...
            "VERSION": {            // Browser Version.
                valueOf: _versionValueOf,
                "MAJOR": 0,
                "MINOR": 0,
                "PATCH": 0
            }
        }
    };
}

function _versionValueOf() {
    return parseFloat(this["MAJOR"] + "." + this["MINOR"]);
}

function _typeValueOf() {
    return this["TYPE"];
}

function _nameValueOf() {
    return this["NAME"];
}

//{@assert
function _type(value, types, keys) {
    return types.split(/[\|\/]/).some(judge);

    function judge(type) {
        switch (type.toLowerCase()) {
        case "omit":      return value === undefined || value === null;
        case "array":     return Array.isArray(value);
        case "integer":   return typeof value === "number" && Math.ceil(value) === value;
        case "object":    return (keys && value && !hasKeys(value, keys)) ? false
                               : (value || 0).constructor === ({}).constructor;
        default:          return typeof value === type.toLowerCase();
        }
    }
    function hasKeys(value, keys) {
        var ary = keys ? keys.split(",") : null;

        return Object.keys(value).every(function(key) {
            return ary.indexOf(key) >= 0;
        });
    }
}
function _if(value, msg) {
    if (value) {
        throw new Error(msg);
    }
}
//}@assert

// --- export ----------------------------------------------
//{@node
if (_inNode) {
    module["exports"] = Spec;
}
//}@node
if (global["Spec"]) {
    global["Spec_"] = Spec; // already exsists
} else {
    global["Spec"]  = Spec;
}

})(this.self || global);


