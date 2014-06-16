(function(global) {
"use strict";

// --- dependency module -----------------------------------
//{@dev
//  This code block will be removed in `$ npm run build-release`. http://git.io/Minify
//var Valid = global["Valid"] || require("uupaa.valid.js"); // http://git.io/Valid
//}@dev

// --- local variable --------------------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function Spec(override) { // @arg Object = null - { USER_AGENT, DEVICE_INFO }
                          // @override.USER_AGENT String = navigator.userAgent - override user agent.
                          // @override.DEVICE_INFO Object = {}                 - override device info. { screen, devicePixelRatio, ... }
                          // @ret SpecObject - { DEVICE, OS, CPU, GPU, INPUT,
                          //                     MEMORY, DISPLAY, NETWORK, BROWSER }
                          // @desc Create SpecObject.
//{@dev
    $valid($type(override, "Object|omit"), Spec, "override");
    $valid($keys(override, "USER_AGENT,DEVICE_INFO"), Spec, "override");
//}@dev

    override = override || {};
    var userAgent  = override["USER_AGENT"]  || (global["navigator"] || {})["userAgent"] || "";
    var deviceInfo = override["DEVICE_INFO"] || {};

//{@dev
    $valid($type(userAgent,  "String"), Spec, "override.USER_AGENT");
    $valid($type(deviceInfo, "Object"), Spec, "override.DEVICE_INFO");
//}@dev

    return _detectDeviceID(
                _detectOSTypeAndVersion(
                    _createSpecObject(userAgent, deviceInfo)));
}

Spec["repository"] = "https://github.com/uupaa/Spec.js";
Spec["normalizeVersionString"] = Spec_normalizeVersionString; // Spec.normalizeVersionString(version:String):String

// --- implement -------------------------------------------
function _createSpecObject(userAgent,    // @arg String - user agent.
                           deviceInfo) { // @arg Object
                                         // @ret SpecObject - { DEVICE, OS, CPU, GPU, INPUT,
                                         //                     MEMORY, DISPLAY, NETWORK, BROWSER }
    return {
        "DEVICE": {
            "ID":           "",         // [Spec.js]: Device ID.
            "MAYBE":        false,      // [Device.js]: Maybe Device ID.
            "LISTED":       false,      // [Device.js]: Listed in the catalog.
            "BRAND":        "",         // [Device.js]: Device brand or maker name. eg: "Google", "SONY"
            "SOC":          "",         // [Device.js]: System on chip name. eg: "MSM8974"
            "INFO":         deviceInfo  // [Spec.js]: override device info.
        },
        "OS": {
            "TYPE":         "",         // [Spec.js]: OS type. "Android", "iOS", "Windows Phone", "Windows", "Mac OS X", "Game"
            "VERSION":      "0.0.0",    // [Spec.js]: OS version.
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
        }
    };
}

function _detectOSTypeAndVersion(spec) { // @arg SpecObject
                                         // @ret SpecObject
    var ua   = spec["BROWSER"]["USER_AGENT"];
    var type = "";      // OS.TYPE
    var ver  = "0.0.0"; // OS.VERSION

    if ( /PlayStation|Xbox|Nintendo/i.test(ua) ) {
        type = "Game";
    } else if ( /Android/.test(ua) ) {
        // Mozilla/5.0 (Linux; U; Android 2.2;   ja-jp; INFOBAR A01        Build/S9081)       AppleWebKit/533.1  (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1
        // Mozilla/5.0 (Linux; U; Android 2.3.3; ja-jp; INFOBAR A01        Build/S9081)       AppleWebKit/533.1  (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1
        //                                ~~~~~
        //                                | | +-- Patch
        //                                | +---- Minor
        //                                +------ Major
        type = "Android";
        ver = ua.split("Android")[1].split(";")[0];
    } else if ( /iPhone|iPad|iPod/.test(ua) ) {
        // Mozilla/5.0 (iPhone; CPU iPhone OS 6_0   like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25
        // Mozilla/5.0 (iPod;   CPU iPhone OS 5_0_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A405 Safari/7534.48.3
        //                                    ~~~~~
        //                                    | | +-- Patch
        //                                    | +---- Minor
        //                                    +------ Major
        type = "iOS";
        ver = ua.split(/OS /)[1].split(" ")[0];
//{@windowsphone
    } else if ( /Windows Phone/.test(ua) ) {
        type = "Windows Phone";
        ver = ua.split(/Windows Phone (?:OS )?/)[1].split(";")[0];
//}@windowsphone
    } else if ( /Mac OS X/.test(ua) ) {
        type = "Mac OS X";
        ver = ua.split("Mac OS X ")[1].split(")")[0];
    } else if ( /Windows/.test(ua) ) {
        type = "Windows";
        ver = ua.replace(" NT ", " ").split("Windows ")[1].split(";")[0];
    } else if ( /Firefox/.test(ua) ) {
        type = "Firefox OS";
    }
    spec["OS"]["TYPE"] = type;
    spec["OS"]["VERSION"] = Spec_normalizeVersionString(ver);
    return spec;
}

function _detectDeviceID(spec) { // @arg SpecObject
                                 // @ret SpecObject
    // "Mozilla/5.0 (Linux; U; Android 4.0.4; ja-jp; SonySO-04D Build/7.0.D.1.117)..."
    //                                                   ~~~~~~
    //                                                  device id
    var ua   = spec["BROWSER"]["USER_AGENT"];
    var info = spec["DEVICE"]["INFO"] || {};
    var id   = ""; // DEVICE.ID

    switch (spec["OS"]["TYPE"]) {
    case "Game":            id = _getGameDeviceID(ua); break;
    case "Android":         id = _getAndroidDeviceID(ua); break;
    case "iOS":             id = _getiOSDeviceID(ua, info); break;
    case "Windows Phone":   id = _getWindowsPhoneDeviceID(ua); break;
    case "Mac OS X":        break;
    case "Windows":         break;
    case "Firefox OS":      break;
    }

    // overwrite DEVICE.ID
    switch (id) {
    case "Nexus 7": // -> "Nexus 7 (2013)"
        id = (info["devicePixelRatio"] || 1) === 2 ? "Nexus 7 (2013)" // Nexus 7 (2013)
                                                   : "Nexus 7";       // Nexus 7 (2012)
    }
    spec["DEVICE"]["ID"] = id;
    if (id) {
        spec["DEVICE"]["LISTED"] = true;
    }
    return spec;
}

function _getGameDeviceID(userAgent) { // @arg String
                                       // @ret String - id
    var id = /PlayStation 3/i.test(userAgent)        ? "PS 3"
           : /PlayStation 4/i.test(userAgent)        ? "PS 4"
           : /PlayStation Vita/i.test(userAgent)     ? "PS Vita"
           : /PlayStation Portable/i.test(userAgent) ? "PSP"
           : /Xbox One/i.test(userAgent)             ? "Xbox One"
           : /Xbox/i.test(userAgent)                 ? "Xbox 360"
           : /WiiU/i.test(userAgent)                 ? "Wii U"
           : /Wii/i.test(userAgent)                  ? "Wii"
           : /3DS/i.test(userAgent)                  ? "3DS"
                                                     : "";
    return id;
}

function _getAndroidDeviceID(userAgent) { // @arg String
                                          // @ret String - id
    // Examples:
    //
    //      Mozilla/5.0 (Linux; U; Android 4.2.2; en-us; HTC6500LVW      4G Build/JDQ39)       AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
    //      Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; KFTT               Build/IML74K)      AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.4 Mobile Safari/535.19 Silk-Accelerated=true
    //      Mozilla/5.0 (Linux;    Android 4.1.1;        Nexus 7            Build/JRO03S)      AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19
    //      Mozilla/5.0 (Linux; U; Android 1.5;   ja-jp; GDDJ-09            Build/CDB56)       AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1
    //      Mozilla/5.0 (Linux; U; Android 2.3.3; ja-jp; INFOBAR A01        Build/S9081)       AppleWebKit/533.1  (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1
    //      Mozilla/5.0 (Linux; U; Android 3.2;   ja-jp; SC-01D             Build/MASTER)      AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13
    //      Mozilla/5.0 (Linux; U; Android 4.0.1; ja-jp; Galaxy Nexus       Build/ITL41D)      AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
    //      Mozilla/5.0 (Linux; U; Android 4.0.3; ja-jp; URBANO PROGRESSO   Build/010.0.3000)  AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
    //      Mozilla/5.0 (Linux; U; Android 3.2;   ja-jp; Sony Tablet S      Build/THMAS11000)  AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13
    //                                                   ~~~~~~~~~~~~~~~~
    //                                                     device id
    //
    // Exceptional pattern:
    //
    //      Mozilla/5.0 (Linux; U; Android 2.3;   ja-jp; SonyEricssonSO-01C Build/3.0.A.1.34)  AppleWebKit/533.1  (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1
    //                                                               ~~~~~~
    //      Mozilla/5.0 (Linux; U; Android 4.0.4; ja-jp; SonySO-04D         Build/7.0.D.1.117) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
    //                                                       ~~~~~~
    //      Mozilla/5.0 (Android; Mobile; rv:13.0) Gecko/13.0 Firefox/13.0

    if (/Firefox/.test(userAgent)) {
        return "";
    }
    var id = userAgent.replace(" 4G ", "").split("Build/")[0].split(";").slice(-1).join().trim();

    if ( /^Sony/.test(id) ) {
        if ( /Tablet/.test(id) ) {
            // Sony Tablet
        } else {
            // Remove "Sony" and "Ericsson" prefixes.
            id = id.replace(/^Sony/, "").
                    replace(/^Ericsson/, "");
        }
    }
    return id;
}

function _getiOSDeviceID(userAgent,    // @arg String
                         deviceInfo) { // @arg Object - override device info. { screen:Object, devicePixelRatio }
                                       // @ret String - id
    // Examples:
    //
    //      Mozilla/5.0 (iPad;   CPU        OS 6_0   like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25
    //      Mozilla/5.0 (iPod;   CPU iPhone OS 5_0_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A405 Safari/7534.48.3
    //      Mozilla/5.0 (iPhone; CPU iPhone OS 6_0   like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25
    //                   ~~~~~~
    //                  device id

    deviceInfo = deviceInfo || global;

    var id = /iPad/.test(userAgent) ? "iPad"
           : /iPod/.test(userAgent) ? "iPod"
                                    : "iPhone";
    var dpr = deviceInfo["devicePixelRatio"] || 1;
    var longEdge = Math.max( (deviceInfo["screen"] || {})["width"]  || 0,
                             (deviceInfo["screen"] || {})["height"] || 0 ); // iPhone 4S: 480, iPhone 5: 568

    switch (id) {
    case "iPad":
        id = (dpr === 1) ? "iPad 2"  // maybe, candidate: iPad 2, iPad mini
                         : "iPad 3"; // maybe, candidate: iPad 3, iPad 4, iPad Air, iPad mini Retina, ...
        break;
    case "iPhone":
        id = (dpr === 1)      ? "iPhone 3GS"
           : (longEdge > 480) ? "iPhone 5"   // maybe, candidate: iPhone 5, iPhone 5c, iPhone 5s, iPhone 6...
                              : "iPhone 4";  // maybe, condidate: iPhone 4, iPhone 4S
        break;
    case "iPod":
        id = (longEdge > 480) ? "iPod touch 5"  // maybe, candidate: iPod touch 5, iPod touch 6...
           : (dpr === 2)      ? "iPod touch 4"
                              : "iPod touch 3";
    }
    return id;
}

//{@windowsphone
function _getWindowsPhoneDeviceID(userAgent) { // @arg String
                                               // @ret String - id
    // Examples:
    //      Mozilla/4.0 (compatible; MSIE 7.0; Windows Phone OS 7.0; Trident/3.1; IEMobile/7.0; LG;                         GW910         )
    //      Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0; FujitsuToshibaMobileCommun; IS12T;    KDDI)
    //      Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0; SAMSUNG;                    SGH-i917      )
    //                                                                                                                      ~~~~~~~~
    //                                                                                                                      device id
    //
    //      Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; HUAWEI; W1-U00   )
    //      Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA;  Lumia 920)
    //                                                                                                             ~~~~~~~~~
    //
    // Exceptional pattern:
    //
    //      Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0;            HTC; Windows Phone 8S by HTC; 1.04.163.03)
    //                                                                                                                        ~~
    //      Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; HTC; Windows Phone 8S by HTC)
    //      Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; HTC; Windows Phone 8S by HTC) BMID/E67A464280
    //                                                                                                                        ~~
    //      Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; HTC; Windows Phone 8X by HTC)
    //                                                                                                                        ~~

    var ua = userAgent.split("(")[1].split(")")[0];
    var token = ua.replace("ARM; ", "").replace("Touch; ", "").
                   replace(/LG; /i, "").replace(/ZTE; /i, "").
                   replace(/HTC; /i, "").replace(/DELL; /i, "").
                   replace(/ACER; /i, "").replace(/Alcatel; /i, "").
                   replace(/NOKIA; /i, "").replace(/SAMSUNG; /i, "").
                   replace(/FujitsuToshibaMobileCommun; /i, "").
                   replace(/Windows Phone /g, "").replace(" by HTC", ""). // nonsense!
                   split(/IEMobile\//)[1].split("; ");

//  var ieVersion = token[0];
    var id = (token[1] || "").trim();

    return id;
}
//}@windowsphone

function Spec_normalizeVersionString(version) { // @arg String - "Major.Minor.Patch"
                                                // @ret String - "Major.Minor.Patch"
//{@dev
    $valid($type(version, "String"), Spec_normalizeVersionString, "version");
//}@dev

    var ary = version.split(/[\._]/); // "1_2_3" -> ["1", "2", "3"]
                                      // "1.2.3" -> ["1", "2", "3"]
    return ( parseInt(ary[0], 10) || 0 ) + "." +
           ( parseInt(ary[1], 10) || 0 ) + "." +
           ( parseInt(ary[2], 10) || 0 );
}

//{@dev
function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
//}@dev

// --- export ----------------------------------------------
if ("process" in global) {
    module["exports"] = Spec;
}
global["Spec" in global ? "Spec_" : "Spec"] = Spec; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule

