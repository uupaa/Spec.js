// @name: Spec.js

(function(global) {
"use strict";

// --- variable --------------------------------------------
var _inNode = "process" in global;

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function Spec(override) { // @arg Object(= null): { USER_AGENT, DEVICE_INFO }
                          //   override.USER_AGENT - String(= navigator.userAgent): override user agent.
                          //   override.DEVICE_INFO - Object(= null): override device info. { screen, devicePixelRatio, ... }
                          // @ret SpecObject: { DEVICE, OS, CPU, GPU, INPUT,
                          //                    MEMORY, DISPLAY, NETWORK, BROWSER }
                          // @help: Spec
                          // @desc: Create SpecObject.
//{@assert
    _if(!_type(override, "Object/omit", "USER_AGENT,DEVICE_INFO"), "Spec(override)");
//}@assert

    override = override || {};
    var userAgent  = override["USER_AGENT"]  || (global["navigator"] || {})["userAgent"] || "";
    var deviceInfo = override["DEVICE_INFO"] || {};

//{@assert
    _if(!_type(userAgent,  "String"), "Spec(override.USER_AGENT)");
    _if(!_type(deviceInfo, "Object"), "Spec(override.DEVICE_INFO)");
//}@assert

    return _createSpecObject(userAgent, deviceInfo);
}

Spec["name"] = "Spec";
Spec["repository"] = "https://github.com/uupaa/Spec.js";

// --- implement -------------------------------------------
function _createSpecObject(userAgent,    // @arg String: user agent.
                           deviceInfo) { // @arg Object:
                                         // @ret SpecObject: { DEVICE, OS, CPU, GPU, INPUT,
                                         //                    MEMORY, DISPLAY, NETWORK, BROWSER }
    return {
        "DEVICE": {
            valueOf: function() { return this["ID"]; },
            "ID":    "",        // [UserAgent.js][Device.js]: Device ID.
            "MAYBE": false,     // [Device.js]: Maybe Device ID.
            "BRAND": "",        // [Device.js]: Device brand or maker name. eg: "Google", "SONY"
            "SOC":   "",        // [Device.js]: System on chip name. eg: "MSM8974"
            "GPS":   false,     // [Device.js]: GPS enable.
            "INFO":  deviceInfo // override device info.
        },
        "OS": {
            valueOf: _typeValueOf,
            "TYPE":  "",        // [UserAgent.js][Device.js]: OS type. "Android", "iOS", "Windows Phone", "Windows", "Mac OS X", "Game"
            "VERSION": {
                valueOf: _versionValueOf,
                "MAJOR": 0,     // [UserAgent.js]:
                "MINOR": 0,     // [UserAgent.js]:
                "PATCH": 0,     // [UserAgent.js]:
                "PRE": {        // Pre-installed OS Version.
                    valueOf: _versionValueOf,
                    "MAJOR": 0, // [Device.js]:
                    "MINOR": 0, // [Device.js]:
                    "PATCH": 0  // [Device.js]:
                },
                "HIGHEST": {    // Highest Supported OS Version.
                    valueOf: _versionValueOf,
                    "MAJOR": 0, // [Device.js]:
                    "MINOR": 0, // [Device.js]:
                    "PATCH": 0  // [Device.js]:
                }
            }
        },
        "CPU": {
            valueOf: _typeValueOf,
            "TYPE":  "",        // [Device.js]: CPU type. "ARM", "ARM64", "ATOM"
            "CLOCK": 0.0,       // [Device.js]: CPU clock (unit: GHz).
            "CORES": 0,         // [Device.js]: CPU cores. 1(single), 2(dual), 4(quad)
            "SIMD":  false      // [Device.js]: Enable SIMD (aka ARM-NEON).
        },
        "GPU": {
            valueOf: _typeValueOf,
            "TYPE":  "",        // [Device.js]: GPU type. eg: "Adreno"
            "ID":    ""         // [Device.js]: GPU ID. eg: "330"
        },
        "INPUT": {
            "TOUCH": false,     // [Device.js]: Touch enable.
            "TOUCHES": 0        // [Device.js]: Touch points.
        },
        "MEMORY": {
            "RAM":   0.0        // [Device.js]: RAM size (unit: GB).
        },
        "DISPLAY": {
            "DPR":   0.0,       // [Device.js]: Device pixel ratio.
            "PPI":   0,         // [Device.js]: Display pixel per inch.
            "INCH":  0.0,       // [Device.js]: Display size(inch).
            "LONG":  0,         // [Device.js]: Display long edge.
            "SHORT": 0          // [Device.js]: Display short,edge.
        },
        "NETWORK": {
            "3G":    false,     // [Device.js]: Enable 3G.
            "LTE":   false,     // [Device.js]: Enable LTE.
            "NFC":   false,     // [Device.js]: Enable NFC.
            "WIFI":  false,     // [Device.js]: Enable Wi-Fi.
            "CONNECTION": {
                "MAX":  0,      // [Browser.js]: Max connections.
                "HOST": 0       // [Browser.js]: Connection per host.
            }
        },
        "BROWSER": {
            valueOf: _nameValueOf,
            "USER_AGENT":   userAgent,      // [Spec.js]:
            "NAME":         "",             // [Browser.js]: Browser name. Chrome, Chromium, Firfox, AndroidBrowser, IE, Safari, WebKit
            "ENGINE":       "",             // [Browser.js]: Render Engine. "Blink", "Trident", "Gecko", "WebKit"
            "MOBILE":       false,          // [Browser.js]: true is Mobile Browser. Android or iOS or Windows Phone
            "WEB_VIEW":     false,          // [Browser.js]: true is WebView.
            "LANGUAGE":     "",             // [Browser.js]: Content language. "en", "ja", ...
            "VERSION": {                    // [Browser.js]: Browser Version.
                valueOf:    _versionValueOf,
                "MAJOR":    0,              // [Browser.js]: Major version.
                "MINOR":    0,              // [Browser.js]: Minor version.
                "PATCH":    0               // [Browser.js]: Patch version.
            },
            "FUNCTION": {                   // [Browser.js]: Browser Functions.
                "WEB_AUDIO": {              // [Browser.js]: WebAudio
                    "READY":    false,      // [Browser.js]: true is WebAudio ready.
                    "FORMAT":   ""          // [Browser.js]: can play format. "MP3 MP4 OGG"
                },
                "AUDIO": {                  // [Browser.js]: Audio
                    "READY":    false,      // [Browser.js]: true is Audio ready.
                    "FORMAT":   ""          // [Browser.js]: can play format. "MP3 MP4 OGG"
                },
                "WEB_STORAGE": {            // [Browser.js]: WebStorage
                    "READY":    false       // [Browser.js]: true is WebStorage ready.
                },
                "WEB_SQL": {                // [Browser.js]: WebSQL
                    "READY":    false       // [Browser.js]: true is WebSQL ready.
                }
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
        case "omit":    return value === undefined || value === null;
        case "array":   return Array.isArray(value);
        case "integer": return typeof value === "number" && Math.ceil(value) === value;
        case "object":  return (keys && value && !hasKeys(value, keys)) ? false
                             : (value || 0).constructor === ({}).constructor;
        default:        return Object.prototype.toString.call(value) === "[object " + type + "]";
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

})((this || 0).self || global);

