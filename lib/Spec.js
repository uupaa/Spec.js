// @name: Spec.js
// @require: Valid.js

(function(global) {
"use strict";

// --- variable --------------------------------------------
//{@assert
var Valid = global["Valid"] || require("uupaa.valid.js");
//}@assert

var _inNode = "process" in global;

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function Spec(override) { // @arg Object(= null): { USER_AGENT, DEVICE_INFO }
                          //   override.USER_AGENT - String(= navigator.userAgent): override user agent.
                          //   override.DEVICE_INFO - Object(= {}): override device info. { screen, devicePixelRatio, ... }
                          // @ret SpecObject: { DEVICE, OS, CPU, GPU, INPUT,
                          //                    MEMORY, DISPLAY, NETWORK, BROWSER, FUNCTION }
                          // @help: Spec
                          // @desc: Create SpecObject.
//{@assert
    _if(!Valid.type(override, "Object/omit", "USER_AGENT,DEVICE_INFO"), "Spec(override)");
//}@assert

    override = override || {};
    var userAgent  = override["USER_AGENT"]  || (global["navigator"] || {})["userAgent"] || "";
    var deviceInfo = override["DEVICE_INFO"] || {};

//{@assert
    _if(!Valid.type(userAgent,  "String"), "Spec(override.USER_AGENT)");
    _if(!Valid.type(deviceInfo, "Object"), "Spec(override.DEVICE_INFO)");
//}@assert

    return _createSpecObject(userAgent, deviceInfo);
}

Spec["name"] = "Spec";
Spec["repository"] = "https://github.com/uupaa/Spec.js";

// --- implement -------------------------------------------
function _createSpecObject(userAgent,    // @arg String: user agent.
                           deviceInfo) { // @arg Object:
                                         // @ret SpecObject: { DEVICE, OS, CPU, GPU, INPUT,
                                         //                    MEMORY, DISPLAY, NETWORK, BROWSER, FUNCTION }
    return {
        "DEVICE": {
            "ID":           "",         // [UserAgent.js]: Device ID.
            "MAYBE":        false,      // [Device.js]: Maybe Device ID.
            "BRAND":        "",         // [Device.js]: Device brand or maker name. eg: "Google", "SONY"
            "SOC":          "",         // [Device.js]: System on chip name. eg: "MSM8974"
            "INFO":         deviceInfo  // [Spec.js]: override device info.
        },
        "OS": {
            "TYPE":         "",         // [UserAgent.js]: OS type. "Android", "iOS", "Windows Phone", "Windows", "Mac OS X", "Game"
            "VERSION":      "0.0.0",    // [UserAgent.js]: OS version.
            "RELEASE_VERSION": "0.0.0", // [Device.js]: OS release version.
            "HIGHEST_VERSION": "0.0.0"  // [Device.js]: OS highest version.
        },
        "CPU": {
            "TYPE":         "",         // [Device.js]: CPU type. "ARM", "ARM64", "ATOM"
            "CLOCK":        0.0,        // [Device.js]: CPU clock (unit: GHz).
            "CORES":        0,          // [Device.js]: CPU cores. 1(single), 2(dual), 4(quad)
            "SIMD":         false       // [Device.js]: Enable SIMD (aka ARM-NEON).
        },
        "GPU": {
            "TYPE":         "",         // [Device.js]: GPU type. eg: "Adreno"
            "ID":           ""          // [Device.js]: GPU ID. eg: "330"
        },
        "INPUT": {
            "TOUCH":        0,          // [Device.js]: Touch fingers.
        },
        "MEMORY": {
            "RAM":          0.0         // [Device.js]: RAM size (unit: GB).
        },
        "DISPLAY": {
            "DPR":          0.0,        // [Device.js]: Device pixel ratio.
            "PPI":          0,          // [Device.js]: Display pixel per inch.
            "INCH":         0.0,        // [Device.js]: Display size(inch).
            "LONG":         0,          // [Device.js]: Display long edge.
            "SHORT":        0           // [Device.js]: Display short,edge.
        },
        "NETWORK": {
            "GPS":          false,      // [Device.js]: Enable GPS
            "3G":           false,      // [Device.js]: Enable 3G.
            "LTE":          false,      // [Device.js]: Enable LTE.
            "NFC":          false,      // [Device.js]: Enable NFC.
            "WIFI":         false,      // [Device.js]: Enable Wi-Fi.
            "BTLE":         false,      // [Device.js]: Enable Bluetooth low energy.
            "DIRECT":       false,      // [Device.js]: Enable Wi-Fi Direct.
            "MAX_CONNECTION": 0,        // [Browser.js]: Max connections.
            "CONNECTION_PER_HOST": 0    // [Browser.js]: Connection per host.
        },
        "BROWSER": {
            "USER_AGENT":   userAgent,  // [Spec.js]:
            "NAME":         "",         // [Browser.js]: Browser name. Chrome, Chromium, Firfox, AndroidBrowser, IE, Safari, WebKit
            "ENGINE":       "",         // [Browser.js]: Render Engine. "Blink", "Trident", "Gecko", "WebKit"
            "MOBILE":       false,      // [Browser.js]: true is Mobile Browser. Android or iOS or Windows Phone
            "LANGUAGE":     "",         // [Browser.js]: Content language. "en", "ja", ...
            "VERSION":      "0.0.0"     // [Browser.js]: Browser Version.
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
    };
}

//{@assert
function _if(value, msg) {
    if (value) {
        console.error(Valid.stack(msg));
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

