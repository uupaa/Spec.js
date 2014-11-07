// http://git.io/Spec

(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

var OTHER = 1;

var APPLE = 2, GOOGLE = 3, AMAZON = 4, NOKIA = 5, SONY = 6,
    SHARP = 7, SAMSUNG = 8, LG = 9, HTC = 10;
var DEVICE_BRAND = "APPLE=2,GOOGLE=3,AMAZON=4,NOKIA=5,SONY=6," +
                   "SHARP=7,SAMSUNG=8,LG=9,HTC=10,";

var A4 = 2, A5 = 3, A5X = 4, A6 = 5, A6X = 6, A7 = 7, A8 = 8, A8X = 9,
    QSD8250 = 20, QSD8650 = 21, APQ8055 = 22, APQ8060 = 23, APQ8064 = 24,
    APQ8064T = 25, APQ8064AB = 26, APQ8074 = 27, APQ8084 = 28, MSM7227 = 40, MSM7230 = 41,
    MSM8225 = 50, MSM8226 = 51, MSM8227 = 52, /*MSM8230 = 53,*/ MSM8255 = 54,
    MSM8255T = 55, MSM8260 = 56, MSM8260A = 57,
  /*MSM8627 = 60,*/ MSM8655 = 61, MSM8660 = 62, MSM8660A = 63,
    MSM8926 = 70, MSM8928 = 71, MSM8930 = 72, MSM8930AB = 73, MSM8960 = 75,
    MSM8960T = 76, MSM8974AA = 77, MSM8974AB = 78, MSM8974AC = 79,
    T20 = 100, AP20H = 101, AP25H = 102, T30L = 103, AP33 = 104, AP37 = 105,
    K1 = 106,
    OMAP3630 = 110, OMAP4430 = 111, OMAP4460 = 112, OMAP4470 = 113,
    S5L8900 = 120, S5PC100 = 121, S5PC110 = 122,
    EXYNOS4210 = 123, EXYNOS4412 = 124, EXYNOS5250 = 125,
    K3V2 = 130, APE5R = 131, CXD5315GG = 132,
    MTK8125 = 150, MT6582 = 151,
    Z2560 = 200, Z3560 = 201, Z3580 = 202, Z3745 = 203;
var SOC_IDS = "A4=2,A5=3,A5X=4,A6=5,A6X=6,A7=7,A8=8,A8X=9," +
       "QSD8250=20,QSD8650=21,APQ8055=22,APQ8060=23,APQ8064=24," +
       "APQ8064T=25,APQ8064AB=26,APQ8074=27,APQ8084=28,MSM7227=40,MSM7230=41," +
       "MSM8225=50,MSM8226=51,MSM8227=52,MSM8255=54," +
       "MSM8255T=55,MSM8260=56,MSM8260A=57," +
                   "MSM8655=61,MSM8660=62,MSM8660A=63," +
       "MSM8926=70,MSM8928=71,MSM8930=72,MSM8930AB=73,MSM8960=75," +
       "MSM8960T=76,MSM8974AA=77,MSM8974AB=78,MSM8974AC=79," +
       "T20=100,AP20H=101,AP25H=102,T30L=103,AP33=104,AP37=105," +
       "K1=106," +
       "OMAP3630=110,OMAP4430=111,OMAP4460=112,OMAP4470=113," +
       "S5L8900=120,S5PC100=121,S5PC110=122," +
       "EXYNOS4210=123,EXYNOS4412=124,EXYNOS5250=125," +
       "K3V2=130,APE5R=131,CXD5315GG=132," +
       "MTK8125=150,MT6582=151," +
       "Z2560=200,Z3560=201,Z3580=202,Z3745=203,";

var POWER_VR = 2, ADRENO = 3, TEGRA = 4, MALI = 5, IMMERSION = 6, INTEL = 7;
var GPU_TYPES = "POWER_VR=2,ADRENO=3,TEGRA=4,MALI=5,IMMERSION=6,INTEL=7,";

var ARM = 2, ARM64 = 3, ATOM = 4;
var CPU_TYPES = "ARM=2,ARM64=3,ATOM=4,";

// --- DEVICE_FEATURE ---
var FE_GPS          = 0x0001;
var FE_3G           = 0x0002;
var FE_LTE          = 0x0004;
var FE_NFC          = 0x0008;
var FE_FINGER_PRINT = 0x0010;
var FE_BAROMETER    = 0x0020;
//var FE_BT40         = 0x0040; // Bluetooth 4.0
var FE_BT41         = 0x0080; // Bluetooth 4.1
// alias
var FE_G___ = FE_GPS;
var FE_G3__ = FE_GPS | FE_3G;
var FE_G3L_ = FE_GPS | FE_3G | FE_LTE;
var FE_G3LN = FE_GPS | FE_3G | FE_LTE | FE_NFC;
var FE_G__N = FE_GPS |                  FE_NFC;
var FE__3L_ =          FE_3G | FE_LTE;
var FE_G3_N = FE_GPS | FE_3G |          FE_NFC;

// --- OS_FINAL_VERSION ---
var IVER = 810; // 2014-10-20
var AVER = 500; // 2014-10-20

// --- class / interfaces ----------------------------------
function Spec(env) { // @arg Object = {} - { alt, DISPLAY_DPR, DISPLAY_TOUCH, DISPLAY_LONG, DISPLAY_SHORT, LANGUAGE, USER_AGENT }
                     // @env.alt Boolean = false - use alternate device id.
                     // @env.DISPLAY_DPR Number = 1.0 - devicePixelRatio
                     // @env.DISPLAY_TOUCH Integer = 0
                     // @env.DISPLAY_LONG Integer = 0
                     // @env.DISPLAY_SHORT Integer = 0
                     // @env.LANGUAGE String = "en" - content language
                     // @env.USER_AGENT String = ""
                     // @desc http://git.io/Spec
//{@dev
    $valid($type(env, "Object|omit"), Spec, "env");
    $valid($keys(env, "alt|DISPLAY_DPR|DISPLAY_TOUCH|DISPLAY_LONG|DISPLAY_SHORT|LANGUAGE|USER_AGENT"), Spec, "env");
//}@dev

    env = env || {};

    var screen = global["screen"]     || {};
    var nav    = global["navigator"]  || {};
    var alt    = env["alt"]           || false;
    var dpr    = env["DISPLAY_DPR"]   || global["devicePixelRatio"] || 1.0;
    var touch  = env["DISPLAY_TOUCH"] || nav["maxTouchPoints"] || 0;
    var width  = env["DISPLAY_LONG"]  || screen["width"]  || 0;
    var height = env["DISPLAY_SHORT"] || screen["height"] || 0;
    var lang   = (env["LANGUAGE"]     || nav["language"]  || "en").split("-", 1)[0]; // "en-us" -> "en"
    var ua     = env["USER_AGENT"]    || nav["userAgent"] || "";
    var long_  = Math.max(width, height);
    var short_ = Math.min(width, height);
    var os     = _detectOS(ua);
    var osVer  = _detectOSVersion(os, ua);
    var browserName = _detectBrowserName(ua);
    var browserEngine = _detectBrowserEngine(browserName);
    var browserVersion = _detectBrowserVersion(browserName, ua);

    // --- DEVICE ---
    this["DEVICE_ID"] = "";             // Device ID picked up from the UserAgent string. eg: "iPhone 5"
    this["DEVICE_RAM"] = 0.0;           // RAM MBs.
    this["DEVICE_BRAND"] = "";          // Device brand name or device maker name (UPPER_CASE STRING). eg: "OTHER", "APPLE", "GOOGLE", "AMAZON"...
    this["DEVICE_FEATURE"] = 0;         // A bit pattern that indicates the features and functionality of the device.
    this["DEVICE_DETECTED"] = false;    // Device is described in the catalog.
    this["DEVICE_CANDIDATE"] = [];      // Candidate the device ID lists. If cannot be device id determined. ["iPhone 5", "iPhone 5c", "iPhone 5s"]
    this["SOC_ID"] = "";                // System On Chip ID (UPPER_CASE STRING). eg: "MSM8974", "A5X"
    // --- OS ---
    this["OS"] = os;                    // OS name. eg: "Android", "iOS", "WPhone", "Windows", "Mac", "Firefox", "Fire", "Game"
    this["OS_VERSION"] = osVer;         // Detected OS version from UserAgent string. format "{{Major}},{{Minor}},{{Patch}}"
                                        // Convert to a floating point number are `parseFloat(spec["OS_VERSION"])`
    this["OS_RELEASE_VERSION"]="0.0.0"; // OS release version. format "{{Major}},{{Minor}},{{Patch}}"
    this["OS_FINAL_VERSION"] = "0.0.0"; // OS final version.   format "{{Major}},{{Minor}},{{Patch}}"
    // --- GPU ---
    this["GPU_ID"] = "";                // GPU ID. eg: "330"
    this["GPU_TYPE"] = "";              // GPU type (UPPER CASE STRING). eg: "ADRENO", "TEGRA", "POWER_VR", "MALI", "IMMERSION", ...
    // --- CPU ---
    this["CPU_TYPE"] = "";              // CPU type. "ARM", "ARM64", "ATOM"
    this["CPU_CLOCK"] = 0.0;            // CPU clock, GHz.
    this["CPU_CORES"] = 0;              // CPU cores. 1(single core), 2(dual core), 4(quad core)
    // --- DISPLAY ---
    this["DISPLAY_DPR"] = dpr;          // Display Device Pixel Ratio. window.devicePixelRatio value
    this["DISPLAY_PPI"] = 0;            // Display Pixel Per Inch.
    this["DISPLAY_INCH"] = 0.0;         // Display inches.
    this["DISPLAY_LONG"] = long_;       // Display long edge, pixels.
    this["DISPLAY_SHORT"] = short_;     // Display short edge, pixels.
    this["DISPLAY_TOUCH"] = touch;      // Display multi touch fingers. device catalog value or navigator.maxTouchPoints value
                                        // see https://code.google.com/p/android/issues/detail?id=11909
    // --- BROWSER ---
    this["WEB_VIEW"] = false;           // Is WebView flag. This value set by user.
    this["USER_AGENT"] = ua;            // navigator.userAgent value or Spec({ userAgent: ... }) value.
                                        // Some functions refer to this value, the results will change.
    this["BROWSER_NAME"] = browserName; // Browser name. "Chrome", "Firefox", "Browser", "IE", "Safari", "WebKit"
                                        // Android Browser -> "Browser"
                                        // Android WebView -> "Browser"
                                        // Chrome WebView  -> "Chrome"
                                        // S Browser       -> "Chrome"
                                        // Fire Phone      -> "Browser"
                                        // Kindle          -> "Browser"
    this["BROWSER_ENGINE"] = browserEngine;   // Browser render engine. "Blink", "Trident", "Gecko", "WebKit"
    this["BROWSER_VERSION"] = browserVersion; // Browser version from UserAgent String. format: "{{Major}}.{{Minor}}.{{Patch}}"
    this["CONTENT_LANGUAGE"] = lang;    // Browser/Content language. "en", "ja", ...

    if (ua) {
        var deviceID = _overwriteVagueDeviceID(this, _detectDeviceID(ua, os));

        this["DEVICE_ID"] = deviceID;
        this["DEVICE_CANDIDATE"] = _getDeviceCandidateID(deviceID);

        if ( this["hasDeviceID"](deviceID) ) { // wellknown device?
            _setDeviceSpec(this, deviceID);
            this["DEVICE_DETECTED"] = true;
        } else if (alt) { // unknown device -> set alternate device id
            var altDeviceID = _getAlternateDeviceID(os);

            if ( altDeviceID && this["hasDeviceID"](altDeviceID) ) {
                _setDeviceSpec(this, altDeviceID);
                this["DEVICE_ID"] = altDeviceID;
                this["DEVICE_DETECTED"] = false;
                this["DEVICE_CANDIDATE"] = [deviceID];
            }
        }
    }

    function _getAlternateDeviceID(os) {
        switch (os) {
        case "iOS":     return "iPhone 5s";
        case "Android": return "Android One";
        case "WPhone":  return "Lumia 1520";
        }
        return "";
    }
}

//{@dev
Spec["repository"] = "https://github.com/uupaa/Spec.js";
//}@dev

Spec["prototype"] = {
    "constructor":          Spec,                                           // new Spec()
    "hasDeviceID":          Spec_hasDeviceID,                               // Spec#hasDeviceID(deviceID:String):Boolean
    "getSpecObject":        Spec_getSpecObject,                             // Spec#getSpecObject(deviceID:String, env:Object = {}):Object|null
    "canDeviceFeature":     Spec_canDeviceFeature,                          // Spec#canDeviceFeature(feature:IgnoreCaseString):Boolean
    "dump":                 Spec_dump,                                      // Spec#dump():Object
    "setWebView":           Spec_setWebView,                                // Spec#setWebView(value:Boolean):this
    "prefix":               Spec_prefix,                                    // Spec#prefix(target:Object, property:String):String
    // --- property accessor ---
    "getDeviceID":          function() { return this["DEVICE_ID"]; },       // Spec#getDeviceID():String
    "getDeviceRAM":         function() { return this["DEVICE_RAM"]; },      // Spec#getDeviceRAM():Number
    "getDeviceBrand":       function() { return this["DEVICE_BRAND"]; },    // Spec#getDeviceBrand():String
    "getDeviceFeature":     function() { return this["DEVICE_FEATURE"]; },  // Spec#getDeviceFeature():Integer
    "isDeviceDetected":     function() { return this["DEVICE_DETECTED"]; }, // Spec#isDeviceDetected():Boolean
    "getDeviceCandidate":   function() { return this["DEVICE_CANDIDATE"]; },// Spec#getDeviceCandidate():StringArray
    "getSoCID":             function() { return this["SOC_ID"]; },          // Spec#getSoCID():String
    "getOS":                function() { return this["OS"]; },              // Spec#getOS():String
    "getOSVersion":         function() { return this["OS_VERSION"]; },      // Spec#getOSVersion():String
    "getOSReleaseVersion":  function() { return this["OS_RELEASE_VERSION"];},// Spec#getOSReleaseVersion():String
    "getOSFinalVersion":    function() { return this["OS_FINAL_VERSION"]; },// Spec#getOSFinalVersion():String
    "getGPUID":             function() { return this["GPU_ID"]; },          // Spec#getGPUID():String
    "getGPUType":           function() { return this["GPU_TYPE"]; },        // Spec#getGPUType():String
    "getCPUType":           function() { return this["CPU_TYPE"]; },        // Spec#getCPUType():String
    "getCPUClock":          function() { return this["CPU_CLOCK"]; },       // Spec#getCPUClock():Number
    "getCPUCores":          function() { return this["CPU_CORES"]; },       // Spec#getCPUCores():Integer
    "getDisplayDPR":        function() { return this["DISPLAY_DPR"]; },     // Spec#getDisplayDPR():Number
    "getDisplayPPI":        function() { return this["DISPLAY_PPI"]; },     // Spec#getDisplayPPI():Integer
    "getDisplayInch":       function() { return this["DISPLAY_INCH"]; },    // Spec#getDisplayInch():Number
    "getDisplayLong":       function() { return this["DISPLAY_LONG"]; },    // Spec#getDisplayLong():Integer
    "getDisplayShort":      function() { return this["DISPLAY_SHORT"]; },   // Spec#getDisplayShort():Integer
    "getDisplayTouch":      function() { return this["DISPLAY_TOUCH"]; },   // Spec#getDisplayTouch():Integer
    "isWebView":            function() { return this["WEB_VIEW"]; },        // Spec#isWebView():Boolean
    "getUserAgent":         function() { return this["USER_AGENT"]; },      // Spec#getUserAgent():String
    "getBrowserName":       function() { return this["BROWSER_NAME"]; },    // Spec#getBrowserName():String
    "getBrowserEngine":     function() { return this["BROWSER_ENGINE"]; },  // Spec#getBrowserEngine():String
    "getBrowserVersion":    function() { return this["BROWSER_VERSION"]; }, // Spec#getBrowserVersion():String
    "getContentLanguage":   function() { return this["CONTENT_LANGUAGE"]; },// Spec#getContentLanguage():String
    // --- convenient ---
    "isDeviceBrand":        Spec_isDeviceBrand,                             // Spec#isDeviceBrand(name:IgnoreCaseString):Boolean
    "isOS":                 Spec_isOS,                                      // Spec#isOS(name:IgnoreCaseString):Boolean
    "isGPU":                Spec_isGPU,                                     // Spec#isGPU(name:IgnoreCaseString):Boolean
    "isBrowser":            Spec_isBrowser,                                 // Spec#isBrowser(name:IgnoreCaseString):Boolean
    "isBrowserEngine":      Spec_isBrowserEngine                            // Spec#isBrowserEngine(name:IgnoreCaseString):Boolean
};

// --- implements ------------------------------------------
function Spec_isDeviceBrand(name) { // @arg IgnoreCaseString - OS name
                                    // @ret Boolean
//{@dev
    $valid($type(name, "String"), Spec_isDeviceBrand, "name");
    $valid($some(name, "apple|google|amazon|nokia|sony|sharp|samsung|lg|htc", true), Spec_isDeviceBrand, "name");
//}@dev

    return this["DEVICE_BRAND"].toLowerCase() === name.toLowerCase();
}

function Spec_isOS(name) { // @arg IgnoreCaseString - OS name
                           // @ret Boolean
//{@dev
    $valid($type(name, "String"), Spec_isOS, "name");
    $valid($some(name, "android|ios|wphone|windows|mac|firefox|fire|game", true), Spec_isOS, "name");
//}@dev

    return this["OS"].toLowerCase() === name.toLowerCase();
}

function Spec_isGPU(name) { // @arg IgnoreCaseString - GPU Type + GPU ID
                            // @ret Boolean
//{@dev
    $valid($type(name, "String"), Spec_isOS, "name");
//}@dev

    return (this["GPU_TYPE"] +
            this["GPU_ID"]).toLowerCase() === name.replace(/\s+/g, "").toLowerCase();
}

function Spec_isBrowser(name) { // @arg IgnoreCaseString - browser name
                                // @ret Boolean
//{@dev
    $valid($type(name, "String"), Spec_isBrowser, "name");
    $valid($some(name, "chrome|firefox|browser|ie|safari|webKit", true), Spec_isBrowser, "name");
//}@dev

    return this["BROWSER_NAME"].toLowerCase() === name.toLowerCase();
}

function Spec_isBrowserEngine(name) { // @arg IgnoreCaseString - browser engine name
                                      // @ret Boolean
//{@dev
    $valid($type(name, "String"), Spec_isBrowserEngine, "name");
    $valid($some(name, "blink|trident|gecko|webkit", true), Spec_isBrowserEngine, "name");
//}@dev

    return this["BROWSER_ENGINE"].toLowerCase() === name.toLowerCase();
}

function _setDeviceSpec(that, deviceID) {
    var data    = Spec["catalog"]["device"][deviceID];
    var socID   = _num2str(SOC_IDS, data[1]);
    var socdata = Spec["catalog"]["soc"][socID]; // [TYPE, CPU-CLOCK, CPU-CORES, GPU-TYPE, GPU-ID]

  //that["DEVICE_ID"]       = deviceID;
    that["DEVICE_RAM"]      = data[8] * 128;
    that["DEVICE_BRAND"]    = _num2str(DEVICE_BRAND, data[0]);
    that["DEVICE_FEATURE"]  = data[11];
  //that["DEVICE_DETECTED"]
  //that["DEVICE_CANDIDATE"]
    that["SOC_ID"]          = socID;
  //that["OS"]
  //that["OS_VERSION"]
    that["OS_RELEASE_VERSION"] = _toVersionString(data[2]);
    that["OS_FINAL_VERSION"]   = _toVersionString(data[3]);
    that["GPU_ID"]          = socdata[4];
    that["GPU_TYPE"]        = _num2str(GPU_TYPES, socdata[3]);
    that["CPU_TYPE"]        = _num2str(CPU_TYPES, socdata[0]);
    that["CPU_CLOCK"]       = socdata[1];
    that["CPU_CORES"]       = socdata[2];
    that["DISPLAY_DPR"]     = data[7] || that["DISPLAY_DPR"];
    that["DISPLAY_PPI"]     = data[6];
    that["DISPLAY_INCH"]    = data[10];
    that["DISPLAY_LONG"]    = Math.max(data[4], data[5]) || that["DISPLAY_LONG"];
    that["DISPLAY_SHORT"]   = Math.min(data[4], data[5]) || that["DISPLAY_SHORT"];
    that["DISPLAY_TOUCH"]   = data[9] || that["DISPLAY_TOUCH"];
  //that["WEB_VIEW"]
  //that["USER_AGENT"]
  //that["BROWSER_NAME"]
  //that["BROWSER_ENGINE"]
  //that["BROWSER_VERSION"]
  //that["CONTENT_LANGUAGE"]

    return that;

    function _toVersionString(number) {
        var s = (10000 + number).toString();

        return parseInt(s[1] + s[2], 10) + "." + s[3] + "." + s[4];
    }

    function _num2str(str, num) {
        if (num === OTHER) {
            return "OTHER";
        }
        // "APPLE=2,GOOGLE=3,"
        //  ~~~~~
        var match = new RegExp("(\\w+)=" + num + ",").exec(str);

        return match ? match[1]
                     : "";
    }
}

function Spec_hasDeviceID(deviceID) { // @arg String
                                      // @ret Boolean
                                      // @desc device in the device catalog.
//{@dev
    $valid($type(deviceID, "String"), Spec_hasDeviceID, "deviceID");
//}@dev

    return deviceID && deviceID in Spec["catalog"]["device"];
}

function Spec_getSpecObject(deviceID, // @arg String
                            env) {    // @arg Object = {}
                                      // @ret Object|null
                                      // @desc get device static information.
//{@dev
    $valid($type(deviceID, "String"), Spec_getSpecObject, "deviceID");
    $valid($type(env, "Object|omit"), Spec_getSpecObject, "env");
//}@dev

    return this["hasDeviceID"](deviceID) ? _setDeviceSpec(new Spec(env), deviceID).dump()
                                         : null;
}

function Spec_canDeviceFeature(feature) { // @arg IgnoreCaseString - "3G" or "GPS" or "LTE" or "NFC"
                                          // @ret Boolean
                                          // @desc can feature function.
//{@dev
    $valid($type(feature, "IgnoreCaseString"),     Spec_canDeviceFeature, "feature");
    $valid($some(feature, "3G|GPS|LTE|NFC", true), Spec_canDeviceFeature, "feature");
//}@dev

    var value = this["DEVICE_FEATURE"];

    switch ( feature.toUpperCase() ) {
    case "3G":  return !!(value & FE_3G);
    case "GPS": return !!(value & FE_GPS);
    case "LTE": return !!(value & FE_LTE);
    case "NFC": return !!(value & FE_NFC);
    }
    return false;
}

function Spec_dump() { // @ret Object - { DEVICE_ID, SOC_ID, ... BROWSER_VERSION }
                       // @desc dump spec object.
    var result = {}, keys = Object.keys(this);

    for (var i = 0, iz = keys.length; i < iz; ++i) {
        var key = keys[i];

        result[key] = this[key];
    }
    return result;
}

function Spec_setWebView(value) { // @arg Boolean
                                  // @ret this
//{@dev
    $valid($type(value, "Boolean"), Spec_setWebView, "value");
//}@dev

    this["WEB_VIEW"] = value;
    return this;
}

function Spec_prefix(target,     // @arg Object - target Object
                     property) { // @arg String - target property
                                 // @ret String - property or vendor + Property
                                 // @desc solve vendor prefix
//{@dev
    $valid(!$type(target, "null|undefined"), Spec_prefix, "target");
    $valid($type(property, "String"),        Spec_prefix, "property");
//}@dev

    if (property in target) {
        return property;
    }
    var prefix = "";

    switch (this["BROWSER_ENGINE"]) {
    case "WebKit":
    case "Blink":   prefix = "webkit"; break;
    case "Gecko":   prefix = "moz"; break;
    case "Trident": prefix = "ms";
    }
    var prefixed = prefix + property[0].toUpperCase() + property.slice(1);

    if (prefixed in target) {
        return prefixed;
    }
    return property;
}

function _detectOS(ua) {
    switch (true) {
    case /PlayStation|Xbox|Nintendo/i.test(ua): return "Game";
//  case /FireOS/.test(ua):                     return "Fire";
    case /Android/.test(ua):                    return "Android";
    case /iPhone|iPad|iPod/.test(ua):           return "iOS";
    case /Windows Phone/.test(ua):              return "WPhone";
    case /Mac OS X/.test(ua):                   return "Mac";
    case /Windows NT/.test(ua):                 return "Windows";
    case /Firefox/.test(ua):                    return "Firefox";
    }
    return "";
}

function _detectOSVersion(os, ua) {
    switch (os) {
    case "Android": return _getVersion("Android", ua);
    case "iOS":     return _getVersion(/OS /, ua);
    case "WPhone":  return _getVersion(/Windows Phone (?:OS )?/, ua);
    case "Mac":     return _getVersion(/Mac OS X /, ua);
    case "Windows": return _getVersion(/Windows NT/, ua);
    }
    return "0.0.0";
}

function _detectDeviceID(ua, os) {
    switch (os) {
    case "Android": return _getAndroidDeviceID(ua);
    case "iOS":     return /iPhone/.test(ua) ? "Vague_iPhone"
                         : /iPad/.test(ua)   ? "Vague_iPad"
                                             : "Vague_iPod";
    case "WPhone":  return _getWindowsPhoneDeviceID(ua);
    case "Game":    return _getGameDeviceID(ua);
//  case "Fire":    return _getFireOSDeviceID(that, ua);
    }
    return "";
}

function _overwriteVagueDeviceID(that, deviceID) {
    var osVer = parseFloat(that["OS_VERSION"]);
    var retina = that["DISPLAY_DPR"] >= 2;
    var longEdge = that["DISPLAY_LONG"]; // iPhone 4S: 480, iPhone 5: 568

    // overwrite device id
    switch (deviceID) {
    case "Nexus 7": // -> "Nexus 7 (2013)"
        deviceID = retina ? "Nexus 7 (2013)" // Nexus 7 (2013)
                          : "Nexus 7";       // Nexus 7 (2012)
        break;
    case "Vague_iPhone":
        deviceID = "iPhone 7";
        if (!retina) {
            deviceID = "iPhone 3GS";
        } else if (longEdge <= 480) { // iPhone 4, 4S
            deviceID = osVer < 8 ? "iPhone 4" : "iPhone 4S"; // iPhone 4 stopped in iOS 7.
        } else if (longEdge <= 568) { // iPhone 5, 5c, 5s
            deviceID = "iPhone 5";  // DEVICE_CANDIDATE = ["iPhone 5", "iPhone 5c", "iPhone 5s"]
        } else if (longEdge <= 667) { // iPhone 6
            deviceID = "iPhone 6";
        } else if (longEdge <= 736) { // iPhone 6 Plus
            deviceID = "iPhone 6 Plus";
        }
        break;
    case "Vague_iPad":
        deviceID = "iPad 3";        // DEVICE_CANDIDATE = ["iPad 3", "iPad 4", "iPad Air", "iPad Air 2", "iPad mini 2", "iPad mini 3"]
        if (!retina) {
            deviceID = "iPad 2";    // DEVICE_CANDIDATE = ["iPad2", "iPad mini"]
        }
        break;
    case "Vague_iPod":
        deviceID = "iPod touch 5";
        if (longEdge <= 480) {
            deviceID = retina ? "iPod touch 4" : "iPod touch 3";
        }
        break;
    case "Vague_WPhone":
        deviceID = "Lumia 630";
        if (osVer <= 7.5) { // Windows Phone 7.0, 7.5, 7.8
            deviceID = "Lumia 510";
        } else if (osVer <= 8.0) { // Windows Phone 8.0
            deviceID = "Lumia 520";
        }
    }
    return deviceID;
}

function _getAndroidDeviceID(ua) {
    if (/Firefox/.test(ua)) {
        return "";
    }
    try {
        return ua.split("Build/")[0].split(";").slice(-1).join().trim().
               replace(/^SonyEricsson/, "").replace(/ 4G$/, "");
    } catch (o_O) {}
    return "";
}

function _getWindowsPhoneDeviceID(ua) {
    // Dispatches to Nokia device, if not Nokia device.
    // Because of them.
    //  - http://thenextweb.com/microsoft/2013/11/27/nokia-now-controls-90-windows-phone-8-market-low-end-lumia-520-accounting-35-share/
    //  - http://www.techradar.com/news/phone-and-communications/mobile-phones/nokia-ends-2013-with-92-of-windows-phone-market-1211347
    try {
        return /Lumia/.test(ua) ? "Lumia " + ua.split("Lumia ")[1].split(/[^\w\.]/)[0]
                                : "Vague_WPhone";
    } catch (o_O) {}
    return "";
}

function _getGameDeviceID(ua) {
    switch (true) {
    case /PlayStation 4/i.test(ua): return "PS 4";
    case /Vita/i.test(ua):          return "PS Vita";
    case /Xbox One/i.test(ua):      return "Xbox One";
    case /WiiU/i.test(ua):          return "Wii U";
    }
    return "";
}

function _getDeviceCandidateID(deviceID) {
    switch (deviceID) {
    case "iPhone 5": return ["iPhone 5", "iPhone 5c", "iPhone 5s"];
    case "iPad 3":   return ["iPad 3", "iPad 4", "iPad Air", "iPad Air 2", "iPad mini 2", "iPad mini 3"];
    case "iPad 2":   return ["iPad 2", "iPad mini"];
    }
    return [];
}

function _detectBrowserName(ua) {
    switch (true) {
    case /Chrome/.test(ua):       return "Chrome";
    case /Firefox/.test(ua):      return "Firefox";
    case /Android/.test(ua):      return "Browser"; // Android default browser
    case /MSIE|Trident/.test(ua): return "IE";
    case /Safari/.test(ua):       return "Safari";
    case /AppleWebKit/.test(ua):  return "WebKit";
    }
    return "";
}

function _detectBrowserEngine(browserName) {
    switch (browserName) {
    case "Chrome":  return "Blink";
    case "Firefox": return "Gecko";
    case "IE":      return "Trident";
    case "Browser":
    case "Safari":
    case "WebKit":  return "WebKit";
    }
    return "";
}

function _detectBrowserVersion(browserName, ua) {
    switch (browserName) {
    case "Chrome":  return _getVersion("Chrome/", ua);
    case "Firefox": return _getVersion("Firefox/", ua);
    case "Browser": return _getVersion(/Silk/.test(ua) ? "Silk/" : "Version/", ua);
    case "IE":      return /IEMobile/.test(ua) ? _getVersion("IEMobile/", ua)
                         : /MSIE/.test(ua)     ? _getVersion("MSIE ", ua) // IE 10.
                                               : _getVersion("rv:", ua);  // IE 11+
    case "Safari":  return _getVersion("Version/", ua);
//  case "WebKit":
    }
    return "0.0.0";
}

function _getVersion(token, ua) { // @ret SemverString - "0.0.0"
    try {
        return _normalizeVersionString( ua.split(token)[1].trim().split(/[^\w\.]/)[0] );
    } catch (o_O) {}
    return "0.0.0";
}

function _normalizeVersionString(version) { // @arg String - "Major.Minor.Patch"
                                            // @ret String - "Major.Minor.Patch"
    var ary = version.split(/[\._]/); // "1_2_3" -> ["1", "2", "3"]
                                      // "1.2.3" -> ["1", "2", "3"]
    return ( parseInt(ary[0], 10) || 0 ) + "." +
           ( parseInt(ary[1], 10) || 0 ) + "." +
           ( parseInt(ary[2], 10) || 0 );
}

//Keep it.
//function _detectWebView(that) { // @this
//                                // @ret Boolean
//    if (_runOnBrowser) {
//        // Chrome WebView: document.webkitFullscreenEnabled -> false
//        // Chrome:         document.webkitFullscreenEnabled -> true
//        if (that["BROWSER_NAME"] === "Chrome") {
//            var fullscreenEnabled = that["prefix"](document, "fullscreenEnabled");
//
//            return document[fullscreenEnabled];
//        }
//    }
//    return false;
//}

// Device list: https://www.handsetdetection.com/properties/vendormodel/
Spec["catalog"] = {
    "device": {
        //                   [0]       [1]        [2] [3]  [4]  [5]   [6]  [7] [8] [9]   [10] [11]
        //                   BRAND     SOC_ID     OS_VER  SHORT,LONG  PPI  DPR RAM TOUCH INCH FEATURE
        // --- iOS ---
        "iPhone 6 Plus":    [APPLE,    A8,        810,IVER, 414,736,  401,  3,  8,  5,   5.5,  FE_G3LN | FE_FINGER_PRINT | FE_BAROMETER], // scree{width:414,height:736},inner{width:980,height:1487}
        "iPhone 6":         [APPLE,    A8,        810,IVER, 375,667,  326,  2,  8,  5,   4.7,  FE_G3LN | FE_FINGER_PRINT | FE_BAROMETER], // scree{width:375,height:667},inner{width:980,height:1461}
        "iPhone 5s":        [APPLE,    A7,        700,IVER, 320,568,  326,  2,  8,  5,     4,  FE_G3L_ | FE_FINGER_PRINT], // scree{width:320,height:568},inner{width:980,height:1409}
        "iPhone 5c":        [APPLE,    A6,        700,IVER, 320,568,  326,  2,  8,  5,     4,  FE_G3L_],
        "iPhone 5":         [APPLE,    A6,        600,IVER, 320,568,  326,  2,  8,  5,     4,  FE_G3L_],
        "iPhone 4S":        [APPLE,    A5,        511,IVER, 320,480,  326,  2,  4,  5,   3.5,  FE_G3__], // scree{width:320,height:480},inner{width:980,height:1139}
        "iPhone 4":         [APPLE,    A4,        400,712,  320,480,  326,  2,  4,  5,   3.5,  FE_G3__],
        "iPhone 3GS":       [APPLE,    S5PC100,   300,615,  320,480,  163,  1,  2,  5,   3.5,  FE_G3__],
        "iPhone 3G":        [APPLE,    S5L8900,   200,421,  320,480,  163,  1,  1,  5,   3.5,  FE_G3__],
        "iPad Air 2":       [APPLE,    A8X,       810,IVER, 768,1024, 264,  2, 16, 10,   9.7,  FE_G3L_ | FE_FINGER_PRINT | FE_BAROMETER],
        "iPad Air":         [APPLE,    A7,        700,IVER, 768,1024, 264,  2,  8, 10,   9.7,  FE_G3L_],
        "iPad 4":           [APPLE,    A6X,       600,IVER, 768,1024, 264,  2,  8, 10,   9.7,  FE_G3L_],
        "iPad 3":           [APPLE,    A5X,       510,IVER, 768,1024, 264,  2,  8, 10,   9.7,  FE_G3__],
        "iPad 2":           [APPLE,    A5,        430,IVER, 768,1024, 132,  1,  4, 10,   9.7,  FE_G3__],
        "iPad 1":           [APPLE,    A4,        320,615,  768,1024, 132,  1,  2, 10,   9.7,  FE_G___],
        "iPad mini 3":      [APPLE,    A7,        810,IVER, 768,1024, 326,  2,  8, 10,   7.9,  FE_G3L_ | FE_FINGER_PRINT],
        "iPad mini 2":      [APPLE,    A7,        700,IVER, 768,1024, 326,  2,  8, 10,   7.9,  FE_G3L_],
        "iPad mini":        [APPLE,    A5,        600,IVER, 768,1024, 163,  1,  4, 10,   7.9,  FE_G3__],
        "iPod touch 5":     [APPLE,    A5,        600,IVER, 320,568,  326,  2,  4,  5,     4,  0      ],
        "iPod touch 4":     [APPLE,    A4,        410,615,  320,480,  326,  2,  2,  5,     4,  0      ],
      //"iPod touch 3":     [APPLE,    CortexA8,  310,511,  320,480,  326,  2,  2,  5,   3.5,  0      ], // iPod touch 32/64GB Model
        "iPod touch 3":     [APPLE,    S5PC100,   310,511,  320,480,  326,  2,  1,  5,   3.5,  0      ], // iPod touch 8GB Model

        //                   [0]       [1]        [2] [3]  [4]  [5]   [6]  [7] [8] [9]   [10] [11]
        //                   BRAND     SOC_ID     OS_VER  SHORT,LONG  PPI  DPR RAM TOUCH INCH FEATURE
        // --- Android global model ---
        "Android One":      [GOOGLE,   MT6582,    444,AVER, 480, 854,   0,  0,  8,  5,   4.5,  FE_G3__], // Android One, Sparkle V,
        "C6806":            [SONY,     MSM8974AA, 422,AVER,1080,1920, 342,  0, 16,  5,   6.4,  FE_G3LN], // Xperia Z Ultra Google Edition
        "HTC6500LVW":       [HTC,      APQ8064T,  422,AVER,1080,1920, 468,  0, 16, 10,   4.7,  FE_G3LN], // HTC One Google Play Edition
        "GT-I9505G":        [SAMSUNG,  APQ8064AB, 422,AVER,1080,1920, 441,  0, 16,  5,     5,  FE_G3LN], // Galaxy S4 Google Play Edition
        "XT1058":           [OTHER,    MSM8960T,  422,AVER, 720,1280,   0,  0, 16,  5,   4.7,  FE_G3LN], // MOTOROLA Moto X
        "Nexus Player":     [GOOGLE,   Z3560,     500,AVER,1080,1920,   0,  0,  8,  0,     0,  0      ], // Nexus Player
        "Nexus 10":         [GOOGLE,   EXYNOS5250,420,AVER,1600,2560, 300,  2, 16, 10,    10,  FE_G__N],
        "Nexus 9":          [GOOGLE,   K1,        500,AVER,1536,2048,   0,  0, 16, 10,   8.9,  FE_G3LN | FE_BT41],
        "Nexus 7 (2013)":   [GOOGLE,   APQ8064,   430,AVER,1200,1920, 323,  2, 16,  5,     7,  FE_G3LN],
        "Nexus 7":          [GOOGLE,   T30L,      411,AVER, 800,1280, 216,1.33, 8,  5,     7,  FE_G3LN],
        "Nexus 6":          [GOOGLE,   APQ8084,   500,AVER,1440,2560, 493,  3, 24,  5,  5.96,  FE_G3LN | FE_BT41 | FE_BAROMETER],
        "Nexus 5":          [GOOGLE,   MSM8974AA, 440,AVER,1080,1920, 445,  3, 16,  5,     5,  FE_G3LN],
        "Nexus 4":          [GOOGLE,   APQ8064,   420,AVER, 768,1280, 318,  2, 16,  5,   4.7,  FE_G3LN],
        "Galaxy Nexus":     [GOOGLE,   OMAP4460,  400,422,  720,1280, 316,  2,  8,  2,   4.7,  FE_G3LN], // LTE (partial)
        "Nexus S":          [GOOGLE,   S5PC110,   232,410,  480,800,  233,1.5,  4,  5,     4,  FE_G3_N],
        "Nexus One":        [GOOGLE,   QSD8250,   210,236,  480,800,  252,1.5,  4,  2,   3.7,  FE_G3__],
        "SGP412JP":         [SONY,     APQ8074,   420,420, 1080,1920, 342,  0, 16,  5,   6.4,  FE_G__N], // Xperia Z Ultra WiFi Edition
        // --- Android maker edition ---
        "NW-Z1000Series":   [SONY,     AP20H,     230,404,  480,800,    0,  0,  4,  5,   4.3,  0      ], // NW-Z1050, NW-Z1060, NW-Z1070
    //  "Sony Tablet S":
    //  "Sony Tablet P":
    //  "Xperia Z Ultra":
    //  "Xperia Tablet S":
    //  "Xperia Tablet Z":
    //  "Xperia Tablet Z2":
        "Kobo Arc 7":       [OTHER,    MTK8125,   422,422,  600,1024,   0,  0,  8,  5,     7,  0      ], // RAKUTEN Kobo Arc 7
        "MeMo Pad 7":       [OTHER,    Z3745,     442,442,  800,1280,   0,  0,  8, 10,     7,  FE_G___], // ASUS MeMo Pad 7
        "MeMo Pad HD7":     [OTHER,    MTK8125,   421,421,  800,1280,   0,  0,  8, 10,     7,  FE_G___], // ASUS MeMo Pad HD7
        "MeMo Pad FHD10":   [OTHER,    Z2560,     422,422, 1200,1920,   0,  0, 16, 10,  10.1,  FE_G___], // ASUS MeMo Pad FHD10, FE_DIRECT
        "FXC5A":            [OTHER,    MT6582,    442,442,  540,960,    0,  0,  4,  4,     5,  FE_G3__], // JENESIS AEON geanee
    //  "Mi Pad":           [XIAOMI,   K1,        ---,---, 1536,2048,   0,  0, 16, 10,   7.9,  0      ], // Xiaomi Mi Pad
    //  "Redmi":            [XIAOMI,   MT6592,    ---,---,    0,0,      0,  0,  0, 10,   5.5,  0      ], // Xiaomi Redmi
    //  "Iconia One Tab 8": [ACER,     Z3735G,    442,442,  800,1280,   0,  0,  0, 10,     8,  0      ], // Iconia One Tab 8
    //  "ZenFone 5":        [ACER,     Z2560,     430,442,  720,1280, 294,  0,  8, 10,     5,  0      ], // ASUS ZenFone 5 (A501CG)(ATOM 1.6GHz 2Cores)
    //  "ZenFone 5":        [ACER,     Z2580,     430,442,  720,1280, 294,  0, 16, 10,     5,  0      ], // ASUS ZenFone 5 (A500CG)(ATOM 2GHz 2Cores)
    //  "ZenFone 5":        [ACER,     MSM8926,   430,442,  720,1280, 294,  0, 16, 10,     5,  0      ], // ASUS ZenFone 5 (A500KL)(Snapdragon 400 1.2GHz 4Cores)

//{@androidjp
        //                   [0]       [1]        [2] [3]  [4]  [5]   [6]  [7] [8] [9]   [10] [11]
        //                   BRAND     SOC_ID     OS_VER  SHORT,LONG  PPI  DPR RAM TOUCH INCH FEATURE
        // --- docomo ---
        // http://spec.nttdocomo.co.jp/spmss/
        // 2014 winter
        "SO-01G":           [SONY,     MSM8974AC, 444,444, 1080,1920, 428,  3, 24, 10,   5.2,  FE_G3LN], // Xperia Z3
        "SO-02G":           [SONY,     MSM8974AC, 442,442,  720,1280, 320,  3, 16,  5,   4.6,  FE_G3LN], // Xperia Z3 Compact
        "SC-01G":           [SAMSUNG,  APQ8084,   442,442, 1440,2560, 540,  3, 24, 10,   5.6,  FE_G3LN], // GALAXY Note Edge
        "SC-02G":           [SAMSUNG,  MSM8974AC, 442,442, 1080,1920, 480,  3, 16,  5,   5.1,  FE_G3LN], // GALAXY S5 ACTIVE
        "SC-03G":           [SAMSUNG,  MSM8974AC, 442,442, 1600,2560, 480,  3, 24, 10,   8.4,  FE_G3LN], // GALAXY Tab S 8.4
        "SH-01G":           [SHARP,    MSM8974AB, 442,442, 1080,1920, 480,  3, 16,  5,   5.5,  FE_G3LN], // AQUOS ZETA
        "SH-02G":           [SHARP,    MSM8974AB, 442,442, 1080,1920, 480,  3, 16,  5,   5.5,  FE_G3LN], // Disney Mobile on docomo
        "F-02G":            [OTHER,    MSM8974AB, 442,442, 1440,2560, 480,  3, 24,  5,   5.2,  FE_G3LN], // ARROWS NX
        "F-03G":            [OTHER,    MSM8974AB, 442,442, 1600,2560, 480,  3, 16, 10,  10.5,  FE_G3LN], // ARROWS Tab
        // 2014 summer
        "SC-04F":           [SAMSUNG,  MSM8974AC, 442,442, 1080,1920, 480,  3, 16, 10,   5.1,  FE_G3LN], // GALAXY S5, S Browser
        "SO-03F":           [SONY,     MSM8974AB, 442,442, 1080,1920, 480,  3, 24,  5,   5.2,  FE_G3LN], // Xperia Z2 (Sirius)
        "SO-04F":           [SONY,     MSM8974AA, 442,442,  720,1280, 320,  2, 16,  5,   4.3,  FE_G3LN], // Xperia A2
        "SO-05F":           [SONY,     MSM8974AB, 442,442, 1200,1920, 320,  2, 24, 10,  10.1,  FE_G3LN], // Xperia Z2 Tablet
        "SH-04F":           [SHARP,    MSM8974AB, 442,442, 1080,1920, 480,  3,  0,  5,   5.4,  FE_G3LN], // AQUOS ZETA
        "SH-05F":           [SHARP,    MSM8974AA, 422,422, 1080,1920, 480,  3,  0,  5,   5.0,  FE_G3LN], // Disney Mobile on docomo SH-05F
        "SH-06F":           [SHARP,    MSM8974AB, 442,442, 1200,1920, 320,  2,  0, 10,   7.0,  FE_G3L_], // AQUOS PAD
        "F-05F":            [OTHER,    MSM8974AB, 442,442, 1080,1920, 480,  3, 16,  5,   5.0,  FE_G3LN], // FUJITSU ARROWS NX
        "F-06F":            [OTHER,    MSM8926,   442,442,  720,1280, 320,  2,  0,  5,   4.5,  FE_G3LN], // FUJITSU for Silver
        // 2013 winter
        "L-01F":            [LG,       MSM8974AA, 422,422, 1080,1776, 480,  3, 16,  5,   5.2,  FE_G3LN], // G2 L-01F
        "SC-01F":           [SAMSUNG,  MSM8974AA, 430,442, 1080,1920, 480,  3, 16,  5,   5.7,  FE_G3LN], // GALAXY Note 3, S Browser
        "SC-02F":           [SAMSUNG,  MSM8974AA, 430,442, 1080,1920, 480,  3, 16,  5,     5,  FE_G3LN], // GALAXY J SC-02F, S Browser
        "SH-01F":           [SHARP,    MSM8974AA, 422,442, 1080,1776, 480,  3, 16,  5,     5,  FE_G3LN], // AQUOS PHONE ZETA SH-01F
        "SH-01FDQ":         [SHARP,    MSM8974AA, 422,422, 1080,1776, 480,  3, 16,  5,     5,  FE_G3LN], // SH-01F DRAGON QUEST
        "SH-02F":           [SHARP,    MSM8974AA, 422,422, 1080,1920, 480,  3, 16,  5,   4.5,  FE_G3LN], // AQUOS PHONE EX SH-02F
        "SH-03F":           [SHARP,    MSM8960,   404,404,  540,888,  240,1.5,  4,  5,   4.1,  FE_G3L_], // FE_NO_STORE // JUNIOR 2 (no Google Play) RAM 680MB
        "SO-01F":           [SONY,     MSM8974AA, 422,422, 1080,1776, 480,  3, 16,  5,     5,  FE_G3LN], // Xperia Z1
        "SO-02F":           [SONY,     MSM8974AA, 422,422,  720,1184, 320,  2, 16,  5,   4.3,  FE_G3LN], // Xperia Z1 f SO-02F
        "F-01F":            [OTHER,    MSM8974AA, 422,422, 1080,1776, 480,  3, 16,  5,     5,  FE_G3LN], // FUJITSU ARROWS NX F-01F
        "F-02F":            [OTHER,    MSM8974AA, 422,422, 1504,2560, 320,  2, 16,  5,  10.1,  FE_G3LN], // FUJITSU ARROWS Tab F-02F
        "F-03F":            [OTHER,    MSM8974AA, 422,422,  720,1184, 320,  2, 16,  5,   4.7,  FE_G3LN], // FUJITSU Disney Mobile on docomo F-03F
        "F-04F":            [OTHER,    APQ8064T,  422,422,  540,888,  240,1.5, 16,  5,   4.3,  FE_G3__], // FUJITSU FE_NO_STORE // (no Google Play)
        // 2013 summer
        "L-05E":            [LG,       APQ8064T,  422,422,  720,1280, 320,  2, 16,  5,   4.5,  FE_G3LN],
        "N-06E":            [OTHER,    APQ8064T,  422,422,  720,1184, 320,  2, 16,  5,   4.7,  FE_G3LN], // NEC_CASIO
        "SC-04E":           [SAMSUNG,  APQ8064T,  422,442, 1080,1920, 480,  3, 16,  5,     5,  FE_G3LN], // Galaxy S4, S Browser
        "SO-04E":           [SONY,     APQ8064,   412,422,  720,1184, 320,  2, 16,  5,   4.6,  FE_G3LN], // Xperia A SO-04E
        "SO-04EM":          [SONY,     APQ8064,   422,422,  720,1184, 320,  2, 16,  5,   4.6,  FE_G3LN], // Xperia feat. HATSUNE MIKU SO-04E
        "SH-06E":           [SHARP,    APQ8064T,  422,422, 1080,1920, 480,  3, 16,  5,   4.8,  FE_G3LN], // 
        "SH-07E":           [SHARP,    APQ8064T,  422,422,  720,1280, 320,  2, 16,  2,   4.3,  FE_G3LN],
        "SH-08E":           [SHARP,    APQ8064T,  422,422, 1200,1824, 320,  2, 16,  5,     7,  FE_G3LN],
        "P-03E":            [OTHER,    APQ8064T,  422,422, 1080,1920, 480,  3, 16,  5,   4.7,  FE_G3LN], // PANASONIC
        "F-06E":            [OTHER,    APQ8064T,  422,422, 1080,1776, 480,  3, 16,  5,   5.2,  FE_G3LN], // FUJITSU
        "F-07E":            [OTHER,    APQ8064T,  422,422,  720,1184, 320,  2, 16,  5,   4.7,  FE_G3LN], // FUJITSU
        "F-08E":            [OTHER,    APQ8064T,  422,422,  540,867,  240,1.5, 16,  5,   4.3,  FE_G3L_], // FUJITSU
        "F-09E":            [OTHER,    APQ8064T,  422,422,  540,888,  240,1.5, 16,  5,   4.3,  FE_G3L_], // FUJITSU
        // 2012 Q3
        "L-01E":            [LG,       APQ8064,   404,412,  720,1280, 320,  0, 16,  5,   4.7,  FE_G3L_],
        "L-02E":            [LG,       MSM8960,   404,412,  720,1280, 320,  0,  8,  5,   4.5,  FE_G3L_],
        "L-04E":            [LG,       APQ8064T,  412,412, 1080,1920, 480,  0, 16,  5,     5,  FE_G3LN],
        "N-02E":            [OTHER,    MSM8960,   404,412,  480,800,  240,  0,  8,  5,     4,  FE_G3L_], // NEC_CASIO
        "N-03E":            [OTHER,    APQ8064,   404,412,  720,1280, 320,  0, 16,  5,   4.7,  FE_G3L_], // NEC_CASIO
        "N-04E":            [OTHER,    APQ8064,   412,412,  720,1280, 320,  0, 16,  5,   4.7,  FE_G3L_], // NEC_CASIO
        "N-05E":            [OTHER,    MSM8960,   412,412,  540,960,  240,  0,  8,  5,   4.3,  FE_G3L_], // NEC_CASIO
        "SC-01E":           [SAMSUNG,  APQ8060,   404,404,  800,1280, 160,  0,  8,  5,   7.7,  FE_G3L_],
        "SC-02E":           [SAMSUNG,  EXYNOS4412,411,430,  720,1280, 320,  0, 16,  5,   5.5,  FE_G3L_],
        "SC-03E":           [SAMSUNG,  EXYNOS4412,411,430,  720,1280, 320,  0, 16,  5,   4.8,  FE_G3L_],
        "SH-01E":           [SHARP,    MSM8960,   404,412,  540,888,  240,  0,  8,  2,   4.1,  FE_G3L_],
        "SH-01EVW":         [SHARP,    MSM8960,   404,412,  540,888,  240,  0,  8,  2,   4.1,  FE_G3L_],
        "SH-02E":           [SHARP,    APQ8064,   404,412,  720,1280, 320,  0, 16,  2,   4.9,  FE_G3LN],
        "SH-04E":           [SHARP,    APQ8064,   412,412,  720,1184, 320,  0, 16,  5,   4.5,  FE_G3LN],
        "SH-05E":           [SHARP,    MSM8960,   404,404,  540,960,  240,  0,  8,  2,   4.1,  FE_G3L_], // FE_NO_STORE // JUNIOR (no Google Play, no WiFi)
        "SO-01E":           [SONY,     MSM8960,   404,412,  720,1184, 320,  0,  8,  5,   4.3,  FE_G3LN],
        "SO-02E":           [SONY,     APQ8064,   412,442,  720,1184, 320,  3,  8,  5,     5,  FE_G3LN], // Xperia Z
        "SO-03E":           [SONY,     APQ8064,   412,412, 1128,1920, 240,  0, 16,  5,  10.1,  FE_G3LN],
        "P-02E":            [OTHER,    APQ8064,   412,412, 1080,1920, 480,  0, 16,  5,     5,  FE_G3LN], // PANASONIC
        "F-02E":            [OTHER,    AP37,      412,412, 1080,1920, 480,  0, 16,  5,     5,  FE_G3LN], // FUJITSU
        "F-03E":            [OTHER,    MSM8960,   404,412,  540,960,  240,  0,  8,  5,     4,  FE_G3LN], // FUJITSU
        "F-04E":            [OTHER,    AP33,      404,422,  720,1280, 320,  0, 16,  5,   4.7,  FE_G3LN], // FUJITSU
        "F-05E":            [OTHER,    AP37,      404,412, 1200,1920, 240,  0, 16,  5,  10.1,  FE_G3LN], // FUJITSU
        "HW-01E":           [OTHER,    MSM8960,   404,404,  720,1280, 320,  0,  8,  5,   4.5,  FE_G3L_], // HUAWEI
        "HW-03E":           [OTHER,    K3V2,      412,412,  720,1280, 320,  0, 16,  5,   4.7,  FE_G3L_], // HUAWEI
        "dtab01":           [OTHER,    K3V2,      412,412,  800,1280, 160,  0,  8,  5,  10.1,  FE_G3__], // HUAWEI dtab
        // 2012 Q1
        "L-05D":            [LG,       MSM8960,   404,412,  480,800,  240,1.5,  8,  5,     4,  FE_G3L_], // Optimus it
        "L-06D":            [LG,       APQ8060,   404,404,  768,1024, 320,  0,  8,  5,     5,  FE_G3L_],
        "L-06DJOJO":        [LG,       APQ8060,   404,404,  768,1024, 320,  0,  8,  5,     5,  FE_G3L_],
        "N-07D":            [OTHER,    MSM8960,   404,412,  720,1280, 342,  0,  8,  5,   4.3,  FE_G3L_], // NEC_CASIO
        "N-08D":            [OTHER,    MSM8960,   404,404,  800,1280, 213,  0,  8,  5,     7,  FE_G3L_], // NEC_CASIO
        "SC-06D":           [SAMSUNG,  MSM8960,   404,412,  720,1280, 320,  2, 16,  5,   4.8,  FE_G3L_], // Galaxy S III
        "SH-06D":           [SHARP,    OMAP4460,  235,404,  720,1280, 320,  0,  8,  5,   4.5,  FE_G3__],
        "SH-06DNERV":       [SHARP,    OMAP4460,  235,404,  720,1280, 320,  0,  8,  2,   4.5,  FE_G3__],
        "SH-07D":           [SHARP,    MSM8255,   404,404,  480,854,  240,  0,  8,  2,   3.4,  FE_G3__],
        "SH-09D":           [SHARP,    MSM8960,   404,412,  720,1280, 312,  0,  8,  2,   4.7,  FE_G3L_],
        "SH-10D":           [SHARP,    MSM8960,   404,412,  720,1280, 320,  0,  8,  2,   4.5,  FE_G3L_],
        "SO-04D":           [SONY,     MSM8960,   404,412,  720,1184, 320,  0,  8,  5,   4.6,  FE_G3L_],
        "SO-05D":           [SONY,     MSM8960,   404,412,  540,888,  240,1.5,  8,  5,   3.7,  FE_G3L_], // Xperia SX
        "P-06D":            [OTHER,    OMAP4460,  404,404,  720,1280, 320,  0,  8,  5,   4.6,  FE_G3__], // PANASONIC
        "P-07D":            [OTHER,    MSM8960,   404,404,  720,1280, 320,  0,  8,  5,     5,  FE_G3L_], // PANASONIC
        "P-08D":            [OTHER,    OMAP4460,  404,404,  800,1280, 160,  0,  8,  5,  10.1,  FE_G3__], // PANASONIC
        "F-09D":            [OTHER,    MSM8255,   403,403,  480,800,  240,  0,  8,  2,   3.7,  FE_G3__], // FUJITSU
        "F-10D":            [OTHER,    AP33,      403,422,  720,1280, 323,  2,  8,  5,   4.6,  FE_G3L_], // FUJITSU ARROWS X
        "F-11D":            [OTHER,    MSM8255,   403,422,  480,800,  240,  0,  8,  5,   3.7,  FE_G3__], // FUJITSU
        "F-12D":            [OTHER,    MSM8255,   403,403,  480,800,  235,  0,  8,  5,   4.0,  FE_G3__], // FUJITSU
        "T-02D":            [OTHER,    MSM8960,   404,412,  540,960,  257,  0,  8,  5,   4.3,  FE_G3L_], // FUJITSU
        // 2011 Q3
        "L-01D":            [LG,       APQ8060,   235,404,  720,1280, 320,  0,  8,  5,   4.5,  FE_G3L_],
        "L-02D":            [LG,       OMAP4430,  237,404,  480,800,  240,  0,  8,  5,   4.3,  FE_G3__],
        "N-01D":            [OTHER,    MSM8255T,  235,235,  480,800,  235,  0,  4,  5,     4,  FE_G3__], // NEC_CASIO
        "N-04D":            [OTHER,    APQ8060,   236,404,  720,1280, 342,  0,  8,  5,   4.3,  FE_G3L_], // NEC_CASIO
        "N-05D":            [OTHER,    MSM8260,   236,404,  720,1280, 320,  0,  8,  5,   4.3,  FE_G3__], // NEC_CASIO
        "N-06D":            [OTHER,    APQ8060,   236,404,  800,1280, 213,  0,  8,  5,     7,  FE_G3L_], // NEC_CASIO
        "SC-01D":           [SAMSUNG,  APQ8060,   320,404,  800,1200, 160,  0,  8,  5,  10.1,  FE_G3L_],
        "SC-02D":           [SAMSUNG,  EXYNOS4210,320,404,  600,1024, 160,  0,  8,  5,     7,  FE_G3__],
        "SC-03D":           [SAMSUNG,  APQ8060,   236,404,  480,800,  240,1.5,  8,  5,   4.5,  FE_G3LN], // GALAXY S II LTE
        "SC-04D":           [SAMSUNG,  OMAP4460,  401,422,  720,1280, 320,  2,  8,  5,   4.7,  FE_G3_N], // Galaxy Nexus
        "SC-05D":           [SAMSUNG,  APQ8060,   236,412,  800,1280, 320,  0,  8,  5,   5.3,  FE_G3LN],
        "SH-01D":           [SHARP,    OMAP4430,  235,404,  720,1280, 328,  0,  8,  2,   4.5,  FE_G3__],
        "SH-02D":           [SHARP,    MSM8255,   235,235,  540,960,  300,  0,  4,  2,   3.7,  FE_G3__],
        "SH-04D":           [SHARP,    MSM8255,   234,234,  540,960,  300,  0,  4,  2,   3.7,  FE_G3__],
        "SO-01D":           [SONY,     MSM8255,   234,234,  480,854,  240,1.5,  4,  2,     4,  FE_G3__], // Xperia Play
        "SO-02D":           [SONY,     MSM8260,   237,404,  720,1280, 320,  0,  8,  5,   4.3,  FE_G3__],
        "SO-03D":           [SONY,     MSM8260,   237,404,  720,1280, 320,  0,  8,  5,   4.3,  FE_G3__],
        "P-01D":            [OTHER,    MSM8255,   234,234,  480,800,  240,1.5,  4,  2,   3.2,  FE_G3__], // PANASONIC
        "P-02D":            [OTHER,    OMAP4430,  235,404,  540,960,  240,  0,  8,  2,     4,  FE_G3__], // PANASONIC
        "P-04D":            [OTHER,    OMAP4430,  235,404,  540,960,  257,  0,  8,  5,   4.3,  FE_G3__], // PANASONIC
        "P-05D":            [OTHER,    OMAP4430,  235,404,  540,960,  257,  0,  8,  5,   4.3,  FE_G3__], // PANASONIC
        "F-01D":            [OTHER,    OMAP4430,  320,403,  800,1280, 160,  0,  8,  5,  10.1,  FE_G3L_], // FUJITSU
        "F-03D":            [OTHER,    MSM8255,   235,235,  480,800,  240,  0,  4,  2,   3.7,  FE_G3__], // FUJITSU
        "F-05D":            [OTHER,    OMAP4430,  235,403,  720,1280, 342,  0,  8,  2,   4.3,  FE_G3L_], // FUJITSU
        "F-07D":            [OTHER,    MSM8255,   235,235,  480,800,  235,  0,  4,  5,     4,  FE_G3__], // FUJITSU
        "F-08D":            [OTHER,    OMAP4430,  235,403,  720,1280, 342,  0,  8,  2,   4.3,  FE_G3__], // FUJITSU
        "T-01D":            [OTHER,    OMAP4430,  235,403,  720,1280, 320,  0,  8,  2,   4.3,  FE_G3__], // FUJITSU
        // 2011 Q1
        "SC-02C":           [SAMSUNG,  EXYNOS4210,403,403,  480,800,  240,  0,  8,  5,   4.3,  FE_G3__], // Galaxy S II
        "SO-01C":           [SONY,     MSM8255,   232,234,  480,854,    0,1.5,  4,  2,   4.2,  FE_G3__], // Xperia arc
        "SO-02C":           [SONY,     MSM8255,   233,234,  480,854,    0,  0,  4,  2,   4.2,  FE_G3__], // Xperia acro
        "SO-03C":           [SONY,     MSM8255,   234,234,  480,854,    0,  0,  4,  2,   3.3,  FE_G3__], // Xperia acro
        "SH-12C":           [SHARP,    MSM8255T,  233,233,  540,960,    0,  0,  4,  2,   4.2,  FE_G3__],
        "SH-13C":           [SHARP,    MSM8255,   234,234,  540,960,    0,  0,  4,  2,   3.7,  FE_G3__],
        "N-04C":            [OTHER,    MSM7230,   220,233,  480,854,    0,  0,  4,  2,     4,  FE_G3__], // NEC_CASIO
        "N-06C":            [OTHER,    MSM8255,   230,230,  480,854,    0,  0,  4,  2,     4,  FE_G3__], // NEC_CASIO
        "P-07C":            [OTHER,    OMAP3630,  230,230,  480,800,    0,  0,  4,  2,   4.3,  FE_G3__], // PANASONIC
        "F-12C":            [OTHER,    MSM8255,   230,230,  480,800,    0,  0,  4,  2,   3.7,  FE_G3__], // FUJITSU
        "L-04C":            [LG,       MSM7227,   220,230,  320,480,    0,  0,  4,  2,   3.2,  FE_G3__],
        "L-06C":            [LG,       T20,       300,310,  768,1280,   0,  0,  8,  2,   8.9,  FE_G3__],
        "L-07C":            [LG,       OMAP3630,  233,233,  480,800,    0,  0,  4,  2,     4,  FE_G3__],
        "T-01C":            [OTHER,    QSD8250,   211,222,  480,854,    0,1.5,  0,  2,     4,  FE_G3__], // FUJITSU REGZA Phone
        "SH-03C":           [SONY,     QSD8250,   211,222,  480,800,    0,  0,  0,  2,   3.8,  FE_G3__],
        "SC-01C":           [SAMSUNG,  S5PC110,   220,236,  600,1024,   0,1.5,  0,  2,     7,  FE_G3__], // Galaxy Tab
        "SC-02B":           [SAMSUNG,  S5PC110,   220,236,  480,800,    0,1.5,  0,  2,     4,  FE_G3__], // Galaxy S
        "SH-10B":           [SHARP,    QSD8250,   160,160,  480,960,    0,  1,  0,  2,     5,  FE_G3__], // LYNX
        "SO-01B":           [SONY,     QSD8250,   160,211,  480,854,    0,1.5,  3,  1,     4,  FE_G3__], // Xperia RAM384MB
        // --- au ---
        // http://www.au.kddi.com/developer/android/
        //                   [0]       [1]        [2] [3]  [4]  [5]   [6]  [7] [8] [9]   [10] [11]
        //                   BRAND     SOC_ID     OS_VER  SHORT,LONG  PPI  DPR RAM TOUCH INCH FEATURE
        // 2014 fall and winter
        "SOL26":            [SONY,     MSM8974AC, 444,444, 1080,1920, 428,  3, 24, 10,   5.2,  FE_G3LN], // Xperia Z3 SOL26
        "SCL24":            [SAMSUNG,  APQ8084,   442,442, 1440,2560, 540,  3, 24, 10,   5.6,  FE_G3LN], // GALAXY Note Edge SCL24
        // 2014 summer
        "LGL24":            [LG,       MSM8974AB, 442,442, 1440,2560, 538,  3, 16, 10,   5.5,  FE_G3LN], // isai FL
        "SOL25":            [SONY,     MSM8974AB, 442,442, 1080,1920,   0,  3, 24, 10,   5.0,  FE_G3LN], // Xperia ZL2 SOL25
        "SCL23":            [SAMSUNG,  MSM8974AC, 442,442, 1080,1920,   0,  3, 16, 10,   5.1,  FE_G3LN], // Galaxy S5, S Browser
        "SHL25":            [SHARP,    MSM8974AB, 442,442, 1080,1920, 428,  0, 16, 10,   5.2,  FE_G3LN], // AQUOS PHONE SERIE SHL25
        "KYY23":            [OTHER,    MSM8974AB, 442,442, 1080,1920,   0,  0, 16,  5,   5.0,  FE_G3LN], // KYOCERA URBANO L03
        "KYY24":            [OTHER,    MSM8928,   442,442,  720,1280,   0,  0, 16,  5,   4.5,  FE_G3LN], // KYOCERA TORQUE G01
        "SOT21":            [SONY,     MSM8974AB, 442,442, 1080,1920, 224,  3, 24, 10,  10.1,  FE_G3LN], // Xperia Z2 Tablet SOT21
        "AST21":            [OTHER,    Z3580,     442,442, 1200,1920, 283,  0, 16, 10,     8,  FE_G3LN], // ASUS MeMo Pad 8 AST21
        "HTL23":            [HTC,      MSM8974AC, 442,442, 1080,1920, 445,480, 24, 10,     5,  FE_G3LN], // HTC J butterfly HTL23
        // 2014 spring
        "SHT22":            [SHARP,    MSM8974AA, 422,422, 1200,1920, 322,  0, 16, 10,     7,  FE_G3LN], // AQUOS PAD SHT22
        "SHL24":            [SHARP,    MSM8974AA, 422,422, 1080,1920, 486,  0, 16, 10,   4.5,  FE_G3LN], // AQUOS PHONE SERIE mini SHL24
        "URBANO L02":       [OTHER,    MSM8960,   422,422,  720,1280, 314,  0, 16,  5,   4.7,  FE_G3LN], // KYOCERA URBANO L02
        "LGL23":            [LG,       MSM8974AA, 422,422,  720,1280, 246,  0, 16, 10,     6,  FE_G3LN], // G Flex LGL23
        "SOL24":            [SONY,     MSM8974AA, 422,442, 1080,1920, 341,  0, 16, 10,   6.4,  FE_G3LN], // Xperia Z Ultra SOL24
        // 2013 winter
        "FJT21":            [OTHER,    MSM8974AA, 422,422, 1600,2560, 300,  0, 16, 10,  10.1,  FE_G3LN], // FUJITSU
        "SOL23":            [SONY,     MSM8974AA, 422,442, 1080,1920, 442,  3, 16, 10,     5,  FE_G3LN], // Xperia Z1
        "SCL22":            [SAMSUNG,  MSM8974AA, 430,442, 1080,1920, 386,  0, 24, 10,   5.7,  FE_G3LN], // S Browser
        "KYL22":            [OTHER,    MSM8974AA, 422,422, 1080,1920, 443,  0, 16,  5,     5,  FE_G3LN], // KYOCERA
        "LGL22":            [LG,       MSM8974AA, 422,442, 1080,1920, 422,  0, 16, 10,   5.2,  FE_G3LN], // isai
        "SHL23":            [SHARP,    MSM8974AA, 422,422, 1080,1920, 460,  0, 16,  5,   4.8,  FE_G3LN], // AQUOS PHONE SERIE
        "FJL22":            [OTHER,    MSM8974AA, 422,422, 1080,1920, 444,  0, 16, 10,     5,  FE_G3LN], // FUJITSU ARROWS Z
        // 2013 spring and summer
        "SHL22":            [SHARP,    APQ8064T,  422,422,  720,1280, 302,  0, 16,  5,   4.9,  FE_G3LN],
        "KYY21":            [OTHER,    MSM8960,   422,422,  720,1280, 314,  0, 16,  5,   4.7,  FE_G3LN], // KYOCERA URBANO L01
        "HTL22":            [HTC,      APQ8064T,  412,442, 1080,1920, 468,  0, 16, 10,   4.7,  FE_G3LN], // HTC J One
        "SOL22":            [SONY,     APQ8064,   412,422, 1080,1920, 443,  0, 16, 10,     5,  FE_G3LN], // Xperia UL
        "HTX21":            [HTC,      APQ8064,   411,411,  720,1280, 314,  0,  8, 10,   4.7,  FE_G3LN], // INFOBAR A02
        // 2012 fall and winter
        "SHT21":            [SHARP,    MSM8960,   404,412,  800,1280, 216,  0,  8,  2,     7,  FE_G3LN], // AQUOS PAD
        "HTL21":            [HTC,      APQ8064,   411,411, 1080,1920, 444,  3, 16, 10,     5,  FE_G3LN], // HTC J Butterfly
        "SCL21":            [SAMSUNG,  MSM8960,   404,412,  720,1280, 306,  0, 16, 10,   4.8,  FE_G3L_], // GALAXY SIII Progre
        "CAL21":            [OTHER,    MSM8960,   404,404,  480,800,  236,  0,  8,  5,     4,  FE_G3L_], // NEC_CASIO G'zOne TYPE-L
        "SHL21":            [SHARP,    MSM8960,   404,412,  720,1280, 309,  0,  8,  2,   4.7,  FE_G3L_], // AUOS PHONE SERIE
        "KYL21":            [OTHER,    MSM8960,   404,404,  720,1280, 314,  0,  8,  5,   4.7,  FE_G3L_], // KYOCERA DIGNO S
        "FJL21":            [OTHER,    MSM8960,   404,404,  720,1280, 342,  2,  8, 10,   4.3,  FE_G3L_], // FUJITSU ARROWS ef
        "SOL21":            [SONY,     MSM8960,   404,412,  720,1280, 345,  0,  8, 10,   4.3,  FE_G3L_], // Xperia VL
        "LGL21":            [LG,       APQ8064,   404,404,  720,1280, 315,  0, 16, 10,   4.7,  FE_G3L_], // Optimus G
        "PTL21":            [OTHER,    MSM8960,   404,412,  720,1280, 342,  0,  8,  5,   4.3,  FE_G3L_], // PANTECH VEGA
        // 2012 summer
        "ISW13F":           [OTHER,    AP33,      403,403,  720,1280, 322,  0,  8,  3,   4.6,  FE_G3__], // FUJITSU ARROWS Z ISW13F
        "IS17SH":           [SHARP,    MSM8655,   404,404,  540,960,  240,  0,  8,  2,   4.2,  FE_G3__], // AQUOS PHONE CL
        "IS15SH":           [SHARP,    MSM8655,   404,404,  540,960,  298,  0,  8,  2,   3.7,  FE_G3__], // AQUOS PHONE SL
        "ISW16SH":          [SHARP,    MSM8660A,  404,404,  720,1280, 318,  2,  8,  2,   4.6,  FE_G3__], // AQUOS PHONE SERIE
        "URBANO PROGRESSO": [OTHER,    MSM8655,   403,403,  480,800,  235,  0,  8,  5,     4,  FE_G3__], // KYOCERA
        "ISW13HT":          [HTC,      MSM8660A,  403,403,  540,960,  204,  0,  8,  4,   4.3,  FE_G3__], // HTC J
        // 2012 spring
        "IS12S":            [SONY,     MSM8660,   237,404,  720,1280, 342,  0,  8, 10,   4.3,  FE_G3__], // Xperia acro HD
        "IS12M":            [OTHER,    OMAP4430,  236,404,  540,960,  256,  0,  8, 10,   4.3,  FE_G3__], // MOTOROLA RAZR
        "INFOBAR C01":      [SHARP,    MSM8655,   235,235,  480,854,  309,  0,  4,  2,   3.2,  FE_G3__], // INFOBAR C01
        "ISW11SC":          [SAMSUNG,  EXYNOS4210,236,404,  720,1080, 315,  2,  8, 10,   4.7,  FE_G3__], // GALAXY SII WiMAX
        "IS11LG":           [LG,       AP25H,     237,404,  480,800,  235,  0,  8, 10,     4,  FE_G3__], // Optimus X
        "IS12F":            [OTHER,    MSM8655,   235,235,  480,800,  235,  0,  4,  4,     4,  FE_G3__], // FUJITSU ARROWS ES
        // 2011 fall and winter
        "IS14SH":           [SHARP,    MSM8655,   235,235,  540,960,  298,  0,  4,  2,   3.7,  FE_G3__], // AQUOS PHONE
        "IS11N":            [OTHER,    MSM8655,   235,235,  480,800,  262,  0,  4,  5,   3.6,  FE_G3__], // NEC_CASIO MEDIAS BR
        "ISW11F":           [OTHER,    OMAP4430,  235,403,  720,1280, 342,  0,  8,  3,   4.3,  FE_G3__], // FUJITSU ARROWS Z
        "ISW11K":           [OTHER,    MSM8655,   235,235,  480,800,  234,  0,  8, 10,     4,  FE_G3__], // KYOCERA DIGNO
        "IS13SH":           [SHARP,    MSM8655,   235,235,  540,960,  258,  0,  4,  2,   4.2,  FE_G3__], // AQUOS PHONE
        "ISW12HT":          [HTC,      MSM8660,   234,403,  540,960,  256,  0,  8,  4,   4.3,  FE_G3__], // HTC EVO 3D
        "ISW11M":           [OTHER,    T20,       234,234,  540,960,  256,  0,  8,  2,   4.3,  FE_G3__], // MOTOROLA PHOTON
        // 2011 summer
        "EIS01PT":          [OTHER,    MSM8655,   234,234,  480,800,  254,  0,  4,  5,   3.7,  FE_G3__], // PANTECH
        "IS11PT":           [OTHER,    MSM8655,   234,234,  480,800,  254,  0,  4,  5,   3.7,  FE_G3__], // PANTECH MIRACH
        "IS11T":            [OTHER,    MSM8655,   234,234,  480,854,  243,  0,  4,  3,     4,  FE_G3__], // FUJITSU REGZA Phone
        "IS11CA":           [OTHER,    MSM8655,   233,233,  480,800,  262,  0,  4,  5,   3.6,  FE_G3__], // NEC_CASIO G'zOne
        "INFOBAR A01":      [SHARP,    MSM8655,   233,233,  540,960,  265,1.5,  4,  2,   3.7,  FE_G3__], // INFOBAR A01
        "IS12SH":           [SHARP,    MSM8655,   233,233,  540,960,  263,  0,  4,  2,   4.2,  FE_G3__], // AQUOS PHONE
        "IS11SH":           [SHARP,    MSM8655,   233,233,  540,960,  298,  0,  4,  2,   3.7,  FE_G3__], // AQUOS PHONE
        "IS11S":            [SONY,     MSM8655,   233,234,  480,854,  232,  0,  4,  2,   4.2,  FE_G3__], // Xperia acro
        // 2011 spring and legacy
        "ISW11HT":          [HTC,      QSD8650,   221,234,  480,800,  254,1.5,  4,  2,   4.3,  FE_G3__], // HTC EVO WiMAX
        "IS06":             [OTHER,    QSD8650,   221,221,  480,800,  254,1.5,  4,  5,   3.7,  FE_G3__], // PANTECH SIRIUS alpha
        "IS05":             [SHARP,    MSM8655,   221,234,  480,854,  290,  0,  4,  2,   3.4,  FE_G3__],
        "IS04":             [OTHER,    QSD8650,   210,222,  480,854,  290,  0,  4,  2,   4.0,  FE_G3__], // FUJITSU
        "IS03":             [SHARP,    QSD8650,   210,221,  640,960,  331,  2,  4,  2,   3.5,  FE_G3__],
        "IS01":             [SHARP,    QSD8650,   160,160,  480,960,  213,  1,  1,  1,   5.0,  FE_G3__],
        //                   [0]       [1]        [2] [3]  [4]  [5]   [6]  [7] [8] [9]   [10] [11]
        //                   BRAND     SOC_ID     OS_VER  SHORT,LONG  PPI  DPR RAM TOUCH INCH FEATURE
        // --- SoftBank ---
        // https://www.support.softbankmobile.co.jp/partner/smp_info/smp_info_search_t.cfm
        "305SH":            [SHARP,    MSM8926,   442,442,  720,1280,   0,  0, 12,  5,   5.2,  FE_G3L_], // AQUOS CRYSTAL
        "SBM304SH":         [SHARP,    MSM8974AB, 442,442, 1080,1920,   0,  0, 16,  5,   5.2,  FE_G3LN], // AQUOS Xx
        "WX05SH":           [SHARP,    MSM8260A,  412,412,  480,854,    0,  0,  8,  5,     4,  FE_G3LN],
        "SBM303SH":         [SHARP,    MSM8974AA, 422,422, 1080,1920,   0,  0, 16,  5,   4.5,  FE_G3LN], // AQUOS PHONE Xx mini 303SH
        "DM016SH":          [SHARP,    MSM8974AA, 422,422, 1080,1920,   0,  0, 16,  2,   5.2,  FE_G3LN],
        "301F":             [OTHER,    MSM8974AA, 422,422, 1080,1920,   0,  0, 16,  2,     5,  FE_G3LN], // FUJITSU
        "SBM302SH":         [SHARP,    MSM8974AA, 422,422, 1080,1920,   0,  0, 16,  5,   5.2,  FE_G3LN],
    //  "EM01L":            [GOOGLE,   MSM8974AA, 440,440, 1080,1920, 445,  3, 16,  5,     5,  FE_G3LN], // E-Mobile Nexus 5 EM01L
        "101F":             [OTHER,    MSM8960,   404,412,  540,960,    0,  0,  8,  2,   4.3,  FE_G3LN], // FUJITSU
        "WX04SH":           [SHARP,    MSM8260A,  412,412,  480,854,    0,  0,  8,  5,     4,  FE_G3LN],
        "204HW":            [OTHER,    MSM8225,   410,410,  480,800,    0,  0,  8,  2,     4,  FE_G3__], // HUAWEI for Silver Age
        "EM01F":            [OTHER,    APQ8064,   412,412,  720,1280,   0,  0, 16,  5,   4.7,  FE_G3LN], // FUJITSU ARROWS S EM01F
        "DM015K":           [OTHER,    MSM8960,   422,422,  720,1280,   0,  0, 12,  2,   4.3,  FE_G3L_], // KYOCERA
        "WX10K":            [OTHER,    MSM8960,   422,422,  720,1280,   0,  0,  8,  2,   4.7,  FE_G3L_], // KYOCERA
        "202K":             [OTHER,    MSM8960,   422,422,  720,1280, 340,  0,  8,  2,   4.3,  FE_G3L_], // KYOCERA
        "202F":             [OTHER,    APQ8064T,  422,422, 1080,1920,   0,  0, 16,  2,     5,  FE_G3__], // FUJITSU
        "SBM206SH":         [SHARP,    APQ8064T,  422,422, 1080,1920,   0,  0, 16,  2,     5,  FE_G3__],
        "SBM205SH":         [SHARP,    MSM8960,   412,412,  480,854,    0,  0,  8,  2,     4,  FE_G3L_],
        "DM014SH":          [SHARP,    MSM8960,   404,412,  720,1280,   0,  0,  8,  2,   4.5,  FE_G3L_],
        "SBM204SH":         [SHARP,    MSM8255,   404,404,  480,800,    0,  0,  8,  2,     4,  FE_G3__],
        "WX04K":            [OTHER,    APE5R,     234,411,  480,800,    0,  0,  8,  2,     4,  FE_G3__], // KYOCERA
        "SBM203SH":         [SHARP,    APQ8064,   412,412,  720,1280,   0,  0, 16,  2,   4.9,  FE_G3_N],
        "201F":             [OTHER,    APQ8064,   412,412,  720,1280,   0,  0, 16,  2,   4.7,  FE_G3_N], // FUJITSU
        "201K":             [OTHER,    MSM8960,   412,412,  480,800,    0,  0,  8,  2,   3.7,  FE_G3L_], // KYOCERA
        "SBM200SH":         [SHARP,    MSM8960,   404,410,  720,1280,   0,  0,  8,  2,   4.5,  FE_G3LN],
        "DM013SH":          [SHARP,    MSM8255,   404,404,  480,854,    0,  0,  8,  2,   3.7,  FE_G3__],
        "SBM107SHB":        [SHARP,    MSM8255,   404,404,  480,854,    0,  0,  8,  2,   3.7,  FE_G3__],
        "WX06K":            [OTHER,    APE5R,     234,234,  480,800,    0,  0,  4,  2,   3.5,  FE_G3__], // KYOCERA
        "SBM107SH":         [SHARP,    MSM8255,   404,404,  480,854,    0,  0,  8,  2,   3.7,  FE_G3__],
        "SBM102SH2":        [SHARP,    OMAP4430,  235,404,  720,1280,   0,  0,  8,  2,   4.5,  FE_G3__],
        "SBM106SH":         [SHARP,    MSM8260A,  404,404,  720,1280,   0,  0,  8,  2,   4.7,  FE_G3__],
        "102P":             [OTHER,    OMAP4430,  235,235,  540,960,  275,  0,  8,  2,   4.3,  FE_G3__], // PANASONIC
        "101DL":            [OTHER,    MSM8260,   235,235,  540,960,    0,  0,  8,  2,   4.3,  FE_G3__], // DELL
        "SBM104SH":         [SHARP,    OMAP4460,  403,403,  720,1280, 326,  0,  8,  2,   4.5,  FE_G3__],
        "DM012SH":          [SHARP,    MSM8255,   235,235,  540,960,    0,  0,  4,  2,     4,  FE_G3__],
        "101K":             [OTHER,    APE5R,     234,234,  480,800,    0,  0,  4,  2,   3.5,  FE_G3__], // KYOCERA
        "SBM103SH":         [SHARP,    MSM8255,   235,235,  540,960,  275,  0,  4,  2,     4,  FE_G3__],
        "101N":             [OTHER,    MSM8255,   235,235,  480,800,    0,  0,  4,  2,     4,  FE_G3__], // NEC_CASIO
        "101P":             [OTHER,    OMAP4430,  235,235,  480,854,    0,  0,  8,  2,     4,  FE_G3__], // PANASONIC
        "SBM102SH":         [SHARP,    OMAP4430,  235,404,  720,1280, 326,  0,  8,  2,   4.5,  FE_G3__],
        "DM011SH":          [SHARP,    MSM8255,   235,235,  480,854,  288,  0,  4,  2,   3.4,  FE_G3__],
        "SBM101SH":         [SHARP,    MSM8255,   235,235,  480,854,  288,  0,  4,  2,   3.4,  FE_G3__],
        "DM010SH":          [SHARP,    MSM8255,   234,234,  540,960,    0,  0,  4,  2,     4,  FE_G3__],
        "DM009SH":          [SHARP,    MSM8255,   220,234,  480,800,    0,  0,  4,  2,     4,  FE_G3__],
        "SBM009SHY":        [SHARP,    MSM8255,   234,234,  540,960,  288,  0,  4,  2,     4,  FE_G3__],
        "SBM007SHK":        [SHARP,    MSM8255,   233,233,  480,854,  288,  0,  4,  2,   3.4,  FE_G3__],
        "SBM009SH":         [SHARP,    MSM8255,   234,234,  540,960,    0,  0,  4,  2,     4,  FE_G3__],
        "003P":             [OTHER,    OMAP3630,  233,233,  480,854,    0,  0,  4,  2,   4.3,  FE_G3__], // PANASONIC
        "SBM007SHJ":        [SHARP,    MSM8255,   233,233,  480,854,  288,  0,  4,  2,   3.4,  FE_G3__],
        "SBM007SH":         [SHARP,    MSM8255,   233,233,  480,854,  288,  0,  4,  2,   3.4,  FE_G3__],
        "SBM006SH":         [SHARP,    MSM8255,   233,233,  540,960,    0,  0,  4,  2,   4.2,  FE_G3__],
        "SBM005SH":         [SHARP,    MSM8255,   221,221,  480,800,    0,  0,  4,  2,   3.8,  FE_G3__],
        "001DL":            [OTHER,    QSD8250,   220,220,  480,800,    0,  0,  4,  2,     5,  FE_G3__], // DELL
        "SBM003SH":         [SHARP,    MSM8255,   220,234,  480,800,    0,1.5,  4,  2,   3.8,  FE_G3__],
        "001HT":            [HTC,      MSM8255,   220,233,  480,800,    0,1.5,  3,  2,   4.3,  FE_G3__],
    //  "SBM201HW":         [OTHER,    MSM8960,   400,400,  540,960,    0,  0,  8,  2,   4.3,  FE_G3L_], // HUAWEI
    //  "SBM007HW":         [OTHER,    MSM8255,   234,234,  480,800,    0,  0,  4,  2,   3.7,  FE_G3__], // HUAWEI Vision
    //  "X06HT":            [HTC,      QSD8250,   210,220,  480,800,    0,  1,  4,  2,   3.7,  FE_G3__],
    //  "009Z":             [OTHER,    MSM8255,   234,234,  480,800,    0,  0,  4,  2,   3.8,  FE_G3__], // ZTE STAR7
    //  "008Z":             [OTHER,    MSM8255,   230,230,  480,800,    0,  0,  4,  2,   3.8,  FE_G3__], // ZTE
    //  "003Z":             [OTHER,    MSM7227,   220,220,  480,800,    0,  0,  4,  2,   3.5,  FE_G3__], // ZTE Libero
    //  "201M":             [OTHER,    MSM8960,   400,410,  540,960,    0,  0,  8,  2,   4.3,  FE_G3L_], // Motorola RAZR
//}@androidjp

//{@kindle
        // --- Kindle ---
        "KFOT":             [AMAZON,   OMAP4430,  234,234,  600,1024,   0,  0,  4,  5,     7,  0      ], // Kindle Fire
        "KFTT":             [AMAZON,   OMAP4460,  403,403,  800,1280,   0,  2,  8,  5,     7,  0      ], // Kindle Fire HD
        "KFJWI":            [AMAZON,   OMAP4470,  403,403, 1200,1920,   0,  3,  8,  5,   8.9,  FE__3L_], // Kindle Fire HD 8.9
        "KFJWA":            [AMAZON,   OMAP4470,  403,403, 1200,1920,   0,  3,  8,  5,   8.9,  FE__3L_], // Kindle Fire HD 8.9 4G
        "KFSOWI":           [AMAZON,   OMAP4470,  422,422,  800,1280,   0,  2,  8,  5,     7,  0      ], // Kindle Fire HD 7 (2nd)
        "KFTHWI":           [AMAZON,   MSM8974AA, 422,422, 1200,1920,   0,  3, 16,  5,     7,  FE__3L_], // Kindle Fire HDX 7 (3rd)
        "KFTHWA":           [AMAZON,   MSM8974AA, 422,422, 1200,1920,   0,  3, 16,  5,     7,  FE__3L_], // Kindle Fire HDX 7 (3rd) 4G
        "KFAPWI":           [AMAZON,   MSM8974AA, 422,422, 1600,2560,   0,  0, 16,  5,   8.9,  FE__3L_], // Kindle Fire HDX 8.9 (3rd)
        "KFAPWA":           [AMAZON,   MSM8974AA, 422,422, 1600,2560,   0,  0, 16,  5,   8.9,  FE__3L_], // Kindle Fire HDX 8.9 (3rd) 4G

        // --- Fire Phone --- 
    //  "FP":               [AMAZON,   MSM8974AA, 350,350,  720,1280, 315,  2, 16,  5,   4.7,  FE_G3LN], // Fire Phone
//}@kindle

//{@windowsphone
        //                   [0]       [1]        [2] [3]  [4]  [5]   [6]  [7] [8] [9]   [10] [11]
        //                   BRAND     SOC_ID     OS_VER  SHORT,LONG  PPI  DPR RAM TOUCH INCH FEATURE
        // --- Windows Phone 7.5, 7.8 ---
        // https://www.handsetdetection.com/properties/vendormodel/
        // http://en.wikipedia.org/wiki/List_of_Windows_Phone_7_devices
        // 2014-10-15 End of support of Version 7.8
    //  "Allegro":          [ACER,     MSM8255,   750,750,  480,800,  259,  0,  4,  4,     0,  FE_G3__],
    //  "OneTouchView":     [ALCATEL,  MSM7227,   750,780,  480,800,    0,  0,  4,  4,     0,  FE_G3__],
    //  "IS12T":            [OTHER,    MSM8655,   750,780,  480,800,    0,  0,  4,  4,     0,  FE_G3__], // FUJITSU
    //  "Radar":            [HTC,      MSM8255,   750,750,  480,800,  246,  0,  4,  4,     0,  FE_G3__],
    //  "P6800":            [HTC,      MSM8255T,  750,750,  480,800,  198,  0,  4,  4,     0,  FE_G3__], // Titan
    //  "PI86100":          [HTC,      MSM8255T,  750,750,  480,800,  198,  0,  4,  4,     0,  FE_G3L_], // Titan II
        "Lumia 510":        [NOKIA,    MSM7227,   750,750,  480,800,    0,  0,  1,  4,     0,  FE_G3__],
        "Lumia 610":        [NOKIA,    MSM7227,   750,750,  480,800,    0,  0,  1,  4,     0,  FE_G3__],
        "Lumia 710":        [NOKIA,    MSM8255,   750,750,  480,800,    0,  0,  4,  4,     0,  FE_G3__],
        "Lumia 800":        [NOKIA,    MSM8255,   750,750,  480,800,    0,  0,  4,  4,     0,  FE_G3__],
        "Lumia 900":        [NOKIA,    APQ8055,   750,750,  480,800,    0,  0,  4,  4,     0,  FE_G3__],
    //  "SGH-i667":         [SAMSUNG,  MSM8255T,  750,750,  480,800,  233,  0,  4,  4,     0,  FE_G3__], // Focus 2
    //  "SGH-i937":         [SAMSUNG,  MSM8255,   750,750,  480,800,  217,  0,  4,  4,     0,  FE_G3__], // Focus S
    //  "GT-S7530":         [SAMSUNG,  MSM7227,   750,750,  480,800,  233,  0,  3,  4,     0,  FE_G3__], // Omnia M
    //  "GT-I8350":         [SAMSUNG,  MSM8255,   750,750,  480,800,  252,  0,  4,  4,     0,  FE_G3__], // Omnia W
    //  "Orbit":            [OTHER,    MSM7227,   750,750,  480,800,  233,  0,  4,  4,     0,  FE_G3__], // ZTE
    //  "Tania":            [OTHER,    MSM8255,   750,750,  480,800,  217,  0,  4,  4,     0,  FE_G3__], // ZTE
        // --- Windows Phone 8 ---
        // http://en.wikipedia.org/wiki/List_of_Windows_Phone_8_devices
    //  "8S":               [HTC,      MSM8627,   800,800,  480,800,    0,  0,  4,  4,     0,  FE_G3__],
    //  "8X":               [HTC,      MSM8960,   800,800,  720,1280, 342,  0,  8,  4,     0,  FE_G3_N], // LTE not impl
    //  "8XT":              [HTC,      MSM8930,   800,800,  480,800,    0,  0,  8,  4,     0,  FE_G3_N],
    //  "W1-U00":           [OTHER,    MSM8230,   800,800,  480,800,    0,  0,  4,  4,     0,  FE_G3__], // HUAWEI Ascend W1
    //  "W2-U00":           [OTHER,    MSM8230,   800,800,  480,800,    0,  0,  4,  4,     0,  FE_G3__], // HUAWEI Ascend W2
        "Lumia 520":        [NOKIA,    MSM8227,   800,800,  480,800,  235,  0,  4,  4,     0,  FE_G3__],
        "Lumia 525":        [NOKIA,    MSM8227,   800,800,  480,800,  235,  0,  8,  4,     0,  FE_G3__],
        "Lumia 620":        [NOKIA,    MSM8960,   800,800,  480,800,  246,  0,  4,  4,     0,  FE_G3_N], // LTE not impl
        "Lumia 625":        [NOKIA,    MSM8930,   800,800,  480,800,  201,  0,  4,  4,     0,  FE_G3L_],
        "Lumia 720":        [NOKIA,    MSM8227,   800,800,  480,800,  217,  0,  4,  4,     0,  FE_G3_N],
        "Lumia 810":        [NOKIA,    MSM8260A,  800,800,  480,800,  217,  0,  4,  4,     0,  FE_G3_N],
        "Lumia 820":        [NOKIA,    MSM8960,   800,800,  480,800,  217,  0,  8,  4,     0,  FE_G3LN],
        "Lumia 822":        [NOKIA,    MSM8960,   800,800,  480,800,  217,  0,  8,  4,     0,  FE_G3LN],
        "Lumia 920":        [NOKIA,    MSM8960,   800,800,  768,1280, 334,  0,  8,  4,     0,  FE_G3LN],
        "Lumia 925":        [NOKIA,    MSM8960,   800,800,  768,1280, 334,  0,  8,  4,     0,  FE_G3LN],
        "Lumia 928":        [NOKIA,    MSM8960,   800,800,  768,1280, 334,  0,  8,  4,     0,  FE_G3LN],
        "Lumia 1020":       [NOKIA,    MSM8960,   800,800,  768,1280, 334,  0, 16,  4,     0,  FE_G3LN],
        "Lumia 1320":       [NOKIA,    MSM8930AB, 800,800,  768,1280, 245,  0,  8,  4,     0,  FE_G3L_], // not NFC
        "Lumia 1520":       [NOKIA,    MSM8974AA, 800,800, 1080,1920, 367,  0, 16,  4,     6,  FE_G3LN],
        "Lumia Icon":       [NOKIA,    MSM8974AA, 800,800, 1080,1920, 441,  0, 16,  4,     5,  FE_G3LN],
    //  "GT-I8750":         [SAMSUNG,  MSM8960,   800,800,  720,1280, 306,  0,  8,  4,     0,  FE_G3LN], // ATIV S
    //  "SGH-T899M":        [SAMSUNG,  MSM8960,   800,800,  720,1280, 306,  0,  8,  4,     0,  FE_G3LN], // ATIV S
    //  "SPH-I800":         [SAMSUNG,  MSM8930,   800,800,  720,1280, 308,  0,  8,  4,     0,  FE_G3LN], // ATIV S Neo, SoC_ID MSM8930AA -> MSM8930
    //  "SCH-I930":         [SAMSUNG,  MSM8960,   800,800,  480,800,  233,  0,  8,  4,     0,  FE_G3LN], // ATIV Odyssey
        // --- Windows Phone 8.1 ---
        // http://en.wikipedia.org/wiki/List_of_Windows_Phone_8.1_devices
        "Lumia 630":        [NOKIA,    MSM8226,   810,810,  480,854,  221,  0,  4,  4,   4.5,  FE_G3LN],
        "Lumia 635":        [NOKIA,    MSM8926,   810,810,  480,854,  221,  0,  4,  4,   4.5,  FE_G3LN],
        "Lumia 930":        [NOKIA,    MSM8974AA, 810,810, 1080,1920, 441,  0, 16,  4,     5,  FE_G3LN],
//}@windowsphone

        // --- Firefox OS ---
//{@firefoxos
        // https://wiki.mozilla.org/Compatibility/UADetectionLibraries
//      "ZTEOPEN":          [OTHER,    MSM7225A,  100,100,  320,480,    0,  0,  1,  5,   3.5,  FE_G3__], // ZTE Open
//}@firefoxos

        // --- Game and Console device ---
        "PS 4":             [SONY,     OTHER,       0,0,      0,0,      0,  0, 64,  0,     0,  0      ], // PlayStation 4
        "PS Vita":          [SONY,     CXD5315GG,   0,0,    544,960,  220,  0,  4,  5,     0,  FE_G3__], // PlayStation Vita
        "Xbox One":         [OTHER,    OTHER,       0,0,      0,0,      0,  0, 64,  0,     0,  0      ], // MICROSOFT Xbox One
        "Wii U":            [OTHER,    OTHER,       0,0,      0,0,      0,  0, 16,  0,     0,  0      ], // NINTENDO Wii U
    },
    "soc": {
        //            [0]    [1]   [2]    [3]       [4]
        //            CPU    CPU   CPU    GPU       GPU
        //            TYPE   CLOCK CORES  TYPE      ID
        "OTHER":      [OTHER,2.0,  4,     POWER_VR, ""              ],
        // --- Apple ---
        "A4":         [ARM,  0.8,  1,     POWER_VR, "SGX535"        ],
        "A5":         [ARM,  0.8,  2,     POWER_VR, "SGX543MP2"     ],
        "A5X":        [ARM,  1.0,  2,     POWER_VR, "SGX543MP4"     ],
        "A6":         [ARM,  1.3,  2,     POWER_VR, "SGX543MP3"     ],
        "A6X":        [ARM,  1.4,  2,     POWER_VR, "SGX554MP4"     ],
        "A7":         [ARM64,1.3,  2,     POWER_VR, "G6430"         ],
        "A8":         [ARM64,1.4,  2,     POWER_VR, "G6450"         ],
        "A8X":        [ARM64,1.5,  3,     POWER_VR, "G6450"         ],
        // --- Snapdragon ---
        // http://en.wikipedia.org/wiki/Snapdragon_(system_on_chip)
        "QSD8250":    [ARM,  1.0,  1,     ADRENO,   "200"           ], // Adreno 200
        "QSD8650":    [ARM,  1.0,  1,     ADRENO,   "200"           ], // Adreno 200
        "APQ8055":    [ARM,  1.4,  1,     ADRENO,   "205"           ], // Adreno 205
        "APQ8060":    [ARM,  1.2,  2,     ADRENO,   "220"           ], // Adreno 220
        "APQ8064":    [ARM,  1.5,  4,     ADRENO,   "320"           ], // Adreno 320
        "APQ8064T":   [ARM,  1.7,  4,     ADRENO,   "320"           ], // Adreno 320
        "APQ8064AB":  [ARM,  1.9,  4,     ADRENO,   "320"           ], // Adreno 320
        "APQ8074":    [ARM,  2.2,  4,     ADRENO,   "330"           ], // Adreno 330
        "APQ8084":    [ARM,  2.7,  4,     ADRENO,   "420"           ], // Adreno 420 // Snapdragon 805
    //  "MSM7225A":   [ARM,  1.0,  1,     ADRENO,   "200"           ], // Adreno 200 // Snapdragon S1, ZTE Open
        "MSM7227":    [ARM,  0.6,  1,     ADRENO,   "200"           ], // Adreno 200
        "MSM7230":    [ARM,  0.8,  1,     ADRENO,   "205"           ], // Adreno 205
        "MSM8225":    [ARM,  1.2,  1,     ADRENO,   "203"           ], // Adreno 203
        "MSM8226":    [ARM,  1.2,  4,     ADRENO,   "305"           ], // Adreno 305 // Snapdragon 400
        "MSM8227":    [ARM,  1.0,  2,     ADRENO,   "305"           ], // Adreno 305
    //  "MSM8230":    [ARM,  1.2,  2,     ADRENO,   "305"           ], // Adreno 305
        "MSM8255":    [ARM,  1.0,  1,     ADRENO,   "205"           ], // Adreno 205
        "MSM8255T":   [ARM,  1.4,  1,     ADRENO,   "205"           ], // Adreno 205
        "MSM8260":    [ARM,  1.7,  2,     ADRENO,   "220"           ], // Adreno 220
        "MSM8260A":   [ARM,  1.5,  2,     ADRENO,   "225"           ], // Adreno 225
    //  "MSM8627":    [ARM,  1.0,  2,     ADRENO,   "305"           ], // Adreno 305
        "MSM8655":    [ARM,  1.0,  1,     ADRENO,   "205"           ], // Adreno 205
        "MSM8660":    [ARM,  1.2,  2,     ADRENO,   "220"           ], // Adreno 220
        "MSM8660A":   [ARM,  1.5,  2,     ADRENO,   "225"           ], // Adreno 225
        "MSM8926":    [ARM,  1.2,  4,     ADRENO,   "305"           ], // Adreno 305 // Snapdragon 400
        "MSM8928":    [ARM,  1.6,  4,     ADRENO,   "305"           ], // Adreno 305 // Snapdragon 400
        "MSM8930":    [ARM,  1.2,  2,     ADRENO,   "305"           ], // Adreno 305
        "MSM8930AB":  [ARM,  1.7,  2,     ADRENO,   "305"           ], // Adreno 305
        "MSM8960":    [ARM,  1.5,  2,     ADRENO,   "225"           ], // Adreno 225
        "MSM8960T":   [ARM,  1.7,  2,     ADRENO,   "320"           ], // Adreno 320 // Moto X
        "MSM8974AA":  [ARM,  2.2,  4,     ADRENO,   "330"           ], // Adreno 330
        "MSM8974AB":  [ARM,  2.3,  4,     ADRENO,   "330"           ], // Adreno 330
        "MSM8974AC":  [ARM,  2.5,  4,     ADRENO,   "330"           ], // Adreno 330 // Snapdragon 801
    //  "---------":  [ARM64,2.5,  4,     ADRENO,   "405"           ], // Adreno 405 // Snapdragon 610
    //  "---------":  [ARM64,2.5,  8,     ADRENO,   "405"           ], // Adreno 405 // Snapdragon 615
        // --- Tegra ---
        // http://en.wikipedia.org/wiki/Tegra
        "T20":        [ARM,  1.0,  2,     TEGRA,    "T20"           ], // NO_SIMD
        "AP20H":      [ARM,  1.0,  2,     TEGRA,    "AP20"          ], // NO_SIMD NVIDIA Tegra 2 250 AP20H (ARMv7-A). http://pdadb.net/index.php?m=cpu&id=a20aph&c=nvidia_tegra_2_250_ap20h
        "AP25H":      [ARM,  1.2,  2,     TEGRA,    "AP25"          ], // NO_SIMD
        "T30L":       [ARM,  1.3,  4,     TEGRA,    "T30L"          ],
        "AP33":       [ARM,  1.5,  4,     TEGRA,    "AP33"          ],
        "AP37":       [ARM,  1.7,  4,     TEGRA,    "AP37"          ],
        "K1":         [ARM64,2.3,  4,     TEGRA,    "Kepler"        ], // Kepler 192 cores
        // --- OMAP ---
        // http://en.wikipedia.org3wiki/OMAP
        "OMAP3630":   [ARM,  1.0,  1,     POWER_VR, "SGX530"        ],
        "OMAP4430":   [ARM,  1.2,  2,     POWER_VR, "SGX540"        ],
        "OMAP4460":   [ARM,  1.2,  2,     POWER_VR, "SGX540"        ],
        "OMAP4470":   [ARM,  1.3,  2,     POWER_VR, "SGX544"        ],
        // --- Samsung, Exynos ---
        // http://ja.wikipedia.org/wiki/Exynos
        "S5L8900":    [ARM,  0.4,  1,     POWER_VR, "MBX Lite"      ], // iPhone 3G, ARMv6
        "S5PC100":    [ARM,  0.6,  1,     POWER_VR, "SGX535"        ], // iPhone 3GS, iPod touch 3
        "S5PC110":    [ARM,  1.0,  1,     POWER_VR, "SGX540"        ],
        "Exynos4210": [ARM,  1.2,  2,     MALI,     "400MP4"        ],
        "Exynos4412": [ARM,  1.4,  4,     MALI,     "400MP4"        ],
        "Exynos5250": [ARM,  1.7,  2,     MALI,     "T604"          ],
    //  "Exynos5422": [ARM,  2.1,  4,     MALI,     "T628MP6"       ],
        // --- MediaTek ---
        "MTK8125":    [ARM,  1.2,  4,     POWER_VR,  "SGX544"       ], // MeMo Pad HD7, Kobo Arc 7
    //  "MT6572":     [ARM,  1.3,  2,     MALI,     "400MP1"        ],
        "MT6582":     [ARM,  1.3,  4,     MALI,     "400MP2"        ], // FXC5A
    //  "MT6588":     [ARM,  1.7,  4,     MALI,     "450MP4"        ],
    //  "MT6592":     [ARM,  2.0,  8,     MALI,     "450MP4"        ],
    //  "MT6595":     [ARM,  2.0,  8,     POWER_VR, "G6430"         ],
    //  "MT6732":     [ARM64,1.5,  4,     MALI,     "T760"          ],
    //  "MT6752":     [ARM64,2.0,  8,     MALI,     "T760"          ],
    //  "MT6795":     [ARM64,2.2,  8,     POWER_VR, "G6430"         ],
        // --- HiSilicon ---
        "K3V2":       [ARM,  1.2,  4,     IMMERSION,"Immersion.16"  ],
    //  "KIRIN910":   [ARM,  1.6,  4,     MALI,     "T450MP4"       ], // MediaPad X1, MediaPad M1
        // --- Spreadtrum ---
    //  "SC6821":     [ARM,  1.0,  1,     POWER_VR, "SC6821"        ], // Firefox OS, maybe
        // --- R-Mobile ---  
        "APE5R":      [ARM,  1.2,  2,     POWER_VR, "SGX543MP"      ],
        // --- Game ---
        "CXD5315GG":  [ARM,  1.2,  4,     POWER_VR, "SGX543MP4+"    ],
        // --- Intel ---
        // http://ja.wikipedia.org/wiki/Intel_HD_Graphics
        // http://ark.intel.com/ja/products/series/76761/Intel-Atom-Processor-Z3700-Series
        "Z2560":      [ATOM, 1.6,  2,     POWER_VR, "SGX544MP2"     ],
        "Z3560":      [ATOM, 1.8,  4,     POWER_VR, "G6430"         ], // Moorefield
        "Z3580":      [ATOM, 2.3,  4,     POWER_VR, "G6430"         ], // Moorefield
        "Z3745":      [ATOM, 1.8,  4,     INTEL,    "HDGraphics"    ], // Bay Trail-T
    }
};

// --- validate / assertions -------------------------------
//{@dev
function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
function $some(val, str, ignore) { return global["Valid"] ? global["Valid"].some(val, str, ignore) : true; }
//function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- exports ---------------------------------------------
if ("process" in global) {
    module["exports"] = Spec;
}
global["Spec" in global ? "Spec_" : "Spec"] = Spec; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule

