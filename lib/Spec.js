(function moduleExporter(name, closure) { // http://git.io/WebModule
"use strict";

return GLOBAL["WebModule"] ? GLOBAL["WebModule"]["exports"](name, closure)
                           : closure(GLOBAL);

})("Spec", function moduleClosure(global) {
"use strict";

// --- dependency modules ----------------------------------
var Catalog = global["WebModule"]["SpecCatalog"];

// --- define / local variables ----------------------------
var ALT_DEVICE_ID    = { "Android": "Nexus 5", "iOS": "iPhone 5" };
var WEBGL_CONTEXTS   = [ "webgl2", "experimental-webgl2",
                         "webgl",  "experimental-webgl" ];
var BROWSER_ENGINES  = { "Chrome": "Blink", "Firefox": "Gecko", "IE": "Trident",
                         "AOSP": "WebKit", "Safari": "WebKit", "WebKit": "WebKit",
                         "Chrome for iOS": "WebKit" };
var CANVAS_DETECTED  = 0;
var WEBGL_CONTEXT    = ""; // WebGL Context. "webgl", "webgl2", "experimental-webgl", ...
var GPU_VERSION      = "";
var MAX_TEXTURE_SIZE = 0;  // GL_MAX_TEXTURE_SIZE (0, 1024 - 16384)
var WEBP_DETECTED    = 0;
var WEBP_FEATURES    = 0x0; // 0x0 = unsupported, 0x1 = lossy, 0x2 = lossless, 0x4 = alpha, 0x8 = animation

// --- class / interfaces ----------------------------------
function Spec(mutable) { // @arg Boolean = false - true is mutable, false is immutable.
    var width = 0, height = 0;

    if (IN_NW || IN_BROWSER) {
        _detectCanvas();
        _detectWebP();
        width  = screen["width"];
        height = screen["height"];
    }
    this._FEATURE = { DEVICE: 0x0, SOC: 0x0, GPU: 0x0 };
    this._LIMIT   = { DEVICE: 0x0, SOC: 0x0, GPU: 0x0 };
    // --- DEVICE/SOC/CPU/GPU/APP ---
    this._DEVICE_ID         = "";       // Device ID picked up from the UserAgent string. eg: "iPhone 5"
    this._KNOWN_DEVICE      = false;    // Known Device.
    this._LOW_END_DEVICE    = false;    // Low end device.
    this._APP               = 0;        // Preinstalled app in device.
    this._RAM               = 0;        // RAM (MB)
    this._SOC_ID            = "";       // System On Chip ID (UPPER_CASE STRING). eg: "MSM8974", "A5X"
    this._CPU_CLOCK         = 0.0;      // CPU clock, GHz.
    this._CPU_CORES         = 1;        // CPU cores. 1(single core), 2(dual core), 4(quad core)
    this._GPU_ID            = "";       // GPU ID. eg: "ADRENO 330"
    this._GPU_GFLOPS        = 0.0;      // GPU GFLOPS. 0.0 - 999.9
    this._LOW_END_GPU       = false;    // Low end GPU.
    this._MAX_TEXTURE_SIZE  = MAX_TEXTURE_SIZE;
    // --- OS ---
    this._OS_NAME           = "";       // OS name. eg: "Android", "iOS", "Windows", "Mac", "Firefox", ""
    this._OS_VERSION        = "";       // Detected OS version from UserAgent string. semver format "{{Major}},{{Minor}},{{Patch}}"
    this._OS_FIRST_VERSION  = "0.0.0";  // OS first(release) version. semver
    this._OS_FINAL_VERSION  = "0.0.0";  // OS final(end of life) version. semver
    // --- BROWSER ---
    this._USER_AGENT        = "";
    this._BROWSER_NAME      = "";       // Base browser. "Chrome", "Firefox", "AOSP", "IE", "Safari", "WebKit", "Chrome for iOS"
                                        //  AOSP: Android Browser, WebView, Amazon Silk
                                        //  Chrome: Chromium WebView, SBrowser, Vivaldi, Amazon Silk
    this._BROWSER_ENGINE    = "";       // Browser render engine. "Blink", "Trident", "Gecko", "WebKit"
    this._BROWSER_VERSION   = "0.0.0";  // Browser version from UserAgent String. semver
    this._LANGUAGE          = "en";     // Content language.
    this._WEB_VIEW          = false;    // Open the page in WebView.
    this._CHROME_TRIGGER    = false;    // Enable Chrome Trigger.
    // --- DISPLAY ---
    this._DISPLAY_DPR       = global["devicePixelRatio"] || 1.0;
    this._DISPLAY_INCH      = 0;
    this._DISPLAY_LONG      = Math.max(width, height);
    this._DISPLAY_SHORT     = Math.min(width, height);
    this._MAX_TOUCH_POINTS  = 0;
    // --- DEVELOP ---
  //this._GPU_VERSION       = GPU_VERSION;
    this._GLES_VERSION      = 0.0;      // 2.0, 3.0, 3.1, ...

    if (global["navigator"]) {
        this._CPU_CORES     = Math.max(this._CPU_CORES, navigator["hardwareConcurrency"] || 0);
        Spec_setUserAgent.call(this, global["navigator"]["userAgent"]);
    }
    if (!mutable) {
        Object.freeze(this);
    }
}

//{@dev
Spec["repository"] = "https://github.com/uupaa/Spec.js";
//}@dev

Spec["prototype"] = Object.create(Spec, {
    "constructor":          { "value": Spec             }, // new Spec():Spec
    // --- method ---
    "has":                  { "value": Spec_has         }, // Spec#has(id:IDString):Boolean
    "hasApp":               { "value": Spec_hasApp      }, // Spec#hasApp(name:AppNameString):Boolean
    "hasFeature":           { "value": Spec_hasFeature  }, // Spec#hasFeature(name:FeatureNameString):Boolean
    // --- property accessor ---
    // --- DEVICE/SOC/CPU/GPU/APP ---
    "DEVICE":               { "get":   function()  { return this._DEVICE_ID;        } },
    "KNOWN_DEVICE":         { "get":   function()  { return this._KNOWN_DEVICE;     } },
    "LOW_END_DEVICE":       { "get":   function()  { return this._LOW_END_DEVICE;   } },
    "RAM":                  { "get":   function()  { return this._RAM;              } },
    "SOC":                  { "get":   function()  { return this._SOC_ID;           } },
    "CPU_CLOCK":            { "get":   function()  { return this._CPU_CLOCK;        } },
    "CPU_CORES":            { "get":   function()  { return this._CPU_CORES;        } },
    "GPU":                  { "get":   function()  { return this._GPU_ID;           } },
    "GPU_GFLOPS":           { "get":   function()  { return this._GPU_GFLOPS;       } },
    "LOW_END_GPU":          { "get":   function()  { return this._LOW_END_GPU;      } },
    "WEBGL_CONTEXT":        { "get":   function()  { return WEBGL_CONTEXT;          } },
    "MAX_TEXTURE_SIZE":     { "get":   function()  { return this._MAX_TEXTURE_SIZE; } },
    "APP":                  { "get":   function()  { return this._APP;              } },
    // --- OS ---
    "OS":                   { "get":   function()  { return this._OS_NAME;          } },
    "OS_VERSION":           { "get":   function()  { return this._OS_VERSION;       } },
    "OS_FIRST_VERSION":     { "get":   function()  { return this._OS_FIRST_VERSION; } },
    "OS_FINAL_VERSION":     { "get":   function()  { return this._OS_FINAL_VERSION; } },
    // --- BROWSER ---
    "USER_AGENT":           { "get":   function()  { return this._USER_AGENT;       },
                              "set":   Spec_setUserAgent },
    "BROWSER":              { "get":   function()  { return this._BROWSER_NAME;     } },
    "BROWSER_ENGINE":       { "get":   function()  { return this._BROWSER_ENGINE;   } },
    "BROWSER_VERSION":      { "get":   function()  { return this._BROWSER_VERSION;  } },
    "LANGUAGE":             { "get":   function()  { return this._LANGUAGE;         } },
    "WEB_VIEW":             { "get":   function()  { return this._WEB_VIEW;         } },
    "CHROME_TRIGGER":       { "get":   function()  { return this._CHROME_TRIGGER;   } },
    // --- DISPLAY ---
    "DISPLAY_DPR":          { "get":   function()  { return this._DISPLAY_DPR;      },
                              "set":   function(v) { this._DISPLAY_DPR = v;         } },
    "DISPLAY_INCH":         { "get":   function()  { return this._DISPLAY_INCH;     } },
    "DISPLAY_LONG":         { "get":   function()  { return this._DISPLAY_LONG;     },
                              "set":   function(v) { this._DISPLAY_LONG = v;        } },
    "DISPLAY_SHORT":        { "get":   function()  { return this._DISPLAY_SHORT;    },
                              "set":   function(v) { this._DISPLAY_SHORT = v;       } },
    "MAX_TOUCH_POINTS":     { "get":   function()  { return this._MAX_TOUCH_POINTS; } },
    // --- DEVELOP ---
    "GPU_VERSION":          { "get":   function()  { return GPU_VERSION;            } },
    "GLES_VERSION":         { "get":   function()  { return this._GLES_VERSION;     } },
    "WEBP":                 { "get":   function()  { return WEBP_FEATURES;          } },
});

// --- implements ------------------------------------------
function Spec_has(id) { // @arg IDString - DEVICE ID or SOC ID or GPU ID. ignore case
                        // @ret Boolean
    id = id.toUpperCase();
    return (id in Catalog["DEVICE"]) ||
           (id in Catalog["SOC"])    ||
           (id in Catalog["GPU"]);
}

function Spec_hasApp(name) { // @arg AppNameString - Preinstalled Application name. ignore case.
                             //      "AOSP", "SBrowser", "Chrome", "ChromeWebView"
                             // @ret Boolean
    return !!(this._APP & Catalog["APP"][name.toUpperCase()]);
}

function Spec_hasFeature(name) { // @arg FeatureNameString - Feature name. ignore case.
                                 //      "iOS", "FirefoxOS", "Kindle", "Windows", "ARM", "Intel", "64bit", "BLE", "NFC"
                                 // @ret Boolean
    var value = Catalog["FEATURE"][name.toUpperCase()];
    if (value) {
        return !!( (this._FEATURE.DEVICE & value) ||
                   (this._FEATURE.SOC    & value) ||
                   (this._FEATURE.GPU    & value) );
    }
    return false;
}

function Spec_setUserAgent(ua) { // @arg UserAgentString
    if (ua && this._USER_AGENT !== ua) {
        var osName      = _detectOSName(ua);                // (Android|iOS|Windows|Mac|Firefox)
        var osVer       = _detectOSVersion(osName, ua);     // SemverString("major.minor.patch")
        var browserName = _detectBrowserName(osName, ua);   // (Chrome|Firefox|AOSP|IE|Safari|WebKit|Chrome for iOS)
        var deviceID    = _detectDeviceID.call(this, osName, ua, parseFloat(osVer));

        this._DEVICE_ID       = deviceID;
        this._KNOWN_DEVICE    = true;
        this._OS_NAME         = osName;
        this._OS_VERSION      = osVer;
        this._USER_AGENT      = ua;
        this._BROWSER_NAME    = browserName;
        this._BROWSER_ENGINE  = BROWSER_ENGINES[browserName] || "";     // (Blink|Gecko|Trident|WebKit)
        this._BROWSER_VERSION = _detectBrowserVersion(browserName, ua); // SemverString("major.minor.patch")
        if (deviceID && osName) {
            _collectDeviceInfo.call(this, deviceID, osName);
        }
        if (IN_NW || IN_BROWSER) {
            var nav = global["navigator"] || {};
            var ver = parseFloat(osVer);
            var supportFullScreen = "fullscreenEnabled" in document || "webkitFullscreenEnabled" in document || false;
            var supportFileSystem = "requestFileSystem" in global   || "webkitRequestFileSystem" in global   || false;

            // WebView detection: https://gist.github.com/uupaa/d9947bb7153a5dcd0d73
            if (browserName === "WebKit") {
                this._WEB_VIEW = !supportFullScreen;
            } else if (browserName === "Chrome") { // ignore "Chrome for iOS"
                this._WEB_VIEW = !(supportFullScreen && supportFileSystem);
            }
            this._LANGUAGE = (nav["language"] || "en").split("-", 1)[0]; // "en-us" -> "en"
            this._CHROME_TRIGGER = !this._WEB_VIEW && browserName === "AOSP" && ver >= 4 && ver < 4.4;
        }
    }
}
function _collectDeviceInfo(deviceID, // "Nexus 5"
                            osName) { // "Android"
    var devs = Catalog["DEVICE"][deviceID]; // [ SOC_ID, OS_VERS, DISP1, DISP2, INCH, RAM, TOUCH, FEATURE, LIMIT, APP ]
    if (!devs) { // unknown device -> alternative device id
        this._KNOWN_DEVICE = false;
        deviceID = ALT_DEVICE_ID[osName] || deviceID;
        devs = Catalog["DEVICE"][deviceID];
    }
    if (devs) {
        var nav    = global["navigator"] || {};
        var socID  = devs[0];
        var osVers = devs[1].split("-"); // ["234", "404"]
        var socs   = Catalog["SOC"][socID]; // [ CLOCK, CORES, GPU_ID, FEATURE, LIMIT ]
        var gpuID  = socs[2];
        var gpus   = Catalog["GPU"][gpuID]; // [ GFLOPS, GLES, TEXTURE, FEATURE, LIMIT ]

        this._RAM               = devs[5] * 128;
        this._FEATURE.DEVICE    = devs[7];
        this._FEATURE.SOC       = socs[3];
        this._FEATURE.GPU       = gpus[3];
        this._LIMIT.DEVICE      = devs[8];
        this._LIMIT.SOC         = socs[4];
        this._LIMIT.GPU         = gpus[4];
        this._LOW_END_DEVICE    = !!(this._LIMIT.DEVICE & Catalog["LIMIT"]["LOW_END"]);
        this._LOW_END_GPU       = !!(this._LIMIT.GPU    & Catalog["LIMIT"]["LOW_END"]);
        this._DISPLAY_SHORT     = devs[2];
        this._DISPLAY_LONG      = devs[3];
        this._DISPLAY_INCH      = devs[4];
        this._APP               = devs[9];
        this._SOC_ID            = socID;
        this._CPU_CLOCK         = socs[0];
        // http://trac.webkit.org/browser/trunk/Source/WebCore/page/Navigator.cpp#L143
        // protect fingerprinting, if (iOS) { maxCoresToReport = 2 }
        this._CPU_CORES         = Math.max(this._CPU_CORES, nav["hardwareConcurrency"] || 0, socs[1]);
        this._GPU_ID            = gpuID;
        this._GPU_GFLOPS        = gpus[0];
        this._OS_FIRST_VERSION  = _toSemver(osVers[0]);
        this._OS_FINAL_VERSION  = _toSemver(osVers[1] || "9999");
        this._GLES_VERSION      = gpus[1] || 0.0;
        this._MAX_TEXTURE_SIZE  = this._MAX_TEXTURE_SIZE || ((gpus[2] || 4) * 1024); // default 4096
        this._MAX_TOUCH_POINTS  = !devs[6] ? 0 : Math.max( nav["maxTouchPoints"] || 0, devs[6] );
    }
    function _toSemver(number) {
        var s = (10000 + parseInt(number)).toString();
        return parseInt(s[1] + s[2], 10) + "." + s[3] + "." + s[4];
    }
}

function _detectOSName(ua) {
    switch (true) {
    case /Android/.test(ua):            return "Android";
    case /iPhone|iPad|iPod/.test(ua):   return "iOS";
    case /Windows/.test(ua):            return "Windows";
    case /Mac OS X/.test(ua):           return "Mac";
    case /Firefox/.test(ua):            return "Firefox";
    }
    return "";
}
function _detectOSVersion(osName, ua) {
    switch (osName) {
    case "Android": return _getVersion("Android", ua);
    case "iOS":     return _getVersion(/OS /, ua);
    case "Windows": return _getVersion(/Phone/.test(ua) ? /Windows Phone (?:OS )?/
                                                        : /Windows NT/, ua);
    case "Mac":     return _getVersion(/Mac OS X /, ua);
    case "Firefox":
        // https://developer.mozilla.org/ja/docs/Gecko_user_agent_string_reference
        var ver = parseFloat(_getVersion("Gecko/", ua)); // 0.0
        if (ver === 32.0) {
            return "2.0.0";
        }
    }
    return "0.0.0";
}
function _detectBrowserName(osName, ua) {
    if (!osName) { return ""; }
    switch (true) {
    case /CriOS/.test(ua):        return "Chrome for iOS"; // https://developer.chrome.com/multidevice/user-agent
    case /Chrome/.test(ua):       return "Chrome";
    case /Firefox/.test(ua):      return "Firefox";
    case /Android/.test(ua):      return "AOSP"; // AOSP stock browser. aka: Android default browser
    case /MSIE|Trident/.test(ua): return "IE";
    case /Safari/.test(ua):       return "Safari";
    case /AppleWebKit/.test(ua):  return "WebKit";
    }
    return "";
}
function _detectBrowserVersion(browserName, ua) {
    switch (browserName) {
    case "Chrome":  return _getVersion("Chrome/", ua);
    case "Firefox": return _getVersion("Firefox/", ua);
    case "AOSP":    return _getVersion(/Silk/.test(ua) ? "Silk/" : "Version/", ua);
    case "IE":      return /IEMobile/.test(ua) ? _getVersion("IEMobile/", ua)
                         : /MSIE/.test(ua)     ? _getVersion("MSIE ", ua) // IE 10.
                                               : _getVersion("rv:", ua);  // IE 11+
    case "Safari":  return _getVersion("Version/", ua);
    case "Chrome for iOS":
                    return _getVersion("CriOS/", ua);
    }
    return "0.0.0";
}
function _getVersion(token, ua) { // @ret SemverString - "0.0.0"
    try {
        return _normalizeSemverString( ua.split(token)[1].trim().split(/[^\w\.]/)[0] );
    } catch ( o_O ) {
        // ignore
    }
    return "0.0.0";
}
function _normalizeSemverString(version) { // @arg String - "Major.Minor.Patch"
                                           // @ret SemverString - "Major.Minor.Patch"
    var ary = version.split(/[\._]/); // "1_2_3" -> ["1", "2", "3"]
                                      // "1.2.3" -> ["1", "2", "3"]
    return ( parseInt(ary[0], 10) || 0 ) + "." +
           ( parseInt(ary[1], 10) || 0 ) + "." +
           ( parseInt(ary[2], 10) || 0 );
}
function _detectDeviceID(osName, ua, osVer) {
    switch (osName) {
    case "Android": return _getAndroidDeviceID.call(this, ua);
    case "iOS":     return _getiOSDeviceID.call(this, ua, osVer);
    case "Windows": return /Windows Phone/.test(ua) ? _getWindowsPhoneDeviceID(ua, osVer) : "";
    case "Firefox": return _getFirefoxOSDeviceID(ua);
    }
    return "";
}
function _getAndroidDeviceID(ua) {
    if (/Firefox/.test(ua)) { return ""; }
    try {
        var result = ua.split("Build/")[0].split(";").slice(-1).join().trim().
                     replace(/^SonyEricsson/, "").replace(/ 4G$/, "");

        if (result === "Nexus 7") {
            return this._DISPLAY_DPR < 2 ? "Nexus 7"      // Nexus 7 (2012)
                                         : "Nexus 7 2nd"; // Nexus 7 (2013)
        }
        return result;
    } catch ( o_O ) {
        // ignore
    }
    return "";
}
function _getiOSDeviceID(ua, osVer) {
    var retina   = this._DISPLAY_DPR >= 2;
    var longEdge = Math.max(this._DISPLAY_LONG, this._DISPLAY_SHORT); // iPhone 4S: 480, iPhone 5: 568
  //var SGX535 = /535/.test(GPU_VERSION); // iPhone 3GS, iPhone 4
    var SGX543 = /543/.test(GPU_VERSION); // iPhone 4s/5/5c, iPad 2/3, iPad mini
    var SGX554 = /554/.test(GPU_VERSION); // iPad 4
    var A7     = /A7/.test(GPU_VERSION);  // iPhone 5s, iPad mini 2/3, iPad Air
    var A8     = /A8/.test(GPU_VERSION);  // iPhone 6/6+, iPad Air 2

    if (/iPhone/.test(ua)) {
        return !retina ? "iPhone 3GS"
             : longEdge <= 480 ? (SGX543 || osVer >= 8 ? "iPhone 4S"
                                                       : "iPhone 4") // iPhone 4 stopped in iOS 7.
             : longEdge <= 568 ? (A7 ? "iPhone 5s"
                                     : "iPhone 5") // iPhone 5c
             : longEdge <= 667 ? "iPhone 6"
             : longEdge <= 736 ? "iPhone 6 Plus" : "";
    } else if (/iPad/.test(ua)) {
        if (!retina) { return "iPad 2"; } // iPad 1/2, iPad mini
        if (SGX543)  { return "iPad 3"; }
        if (SGX554)  { return "iPad 4"; }
        if (A7)      { return "iPad mini 2"; } // iPad mini 3, iPad Air
        if (A8)      { return "iPad Air 2";  }
        return "iPad 3";
    } else if (/iPod/.test(ua)) {
        return longEdge <= 480 ? (!retina ? "iPod touch 3"
                                          : "iPod touch 4")
                               : "iPod touch 5";
    }
    return "";
}
function _getWindowsPhoneDeviceID(ua, osVer) {
    // Dispatches to Nokia device, if not Nokia device.
    // Because of them.
    //  - http://thenextweb.com/microsoft/2013/11/27/nokia-now-controls-90-windows-phone-8-market-low-end-lumia-520-accounting-35-share/
    //  - http://www.techradar.com/news/phone-and-communications/mobile-phones/nokia-ends-2013-with-92-of-windows-phone-market-1211347
    try {
        return /Lumia/.test(ua) ? ("Lumia " + ua.split("Lumia ")[1].split(/[^\w\.]/)[0])
                                : osVer <= 8.0 ? "Lumia 520" // Windows Phone 8.0
                                : "Lumia 630";
    } catch ( o_O ) {
        // ignore
    }
    return "";
}
function _getFirefoxOSDeviceID(ua) {
    try {
        if (/Mobile;/.test(ua) && !/Mobile; rv:/.test(ua)) {
            return ua.split("; rv:")[0].split(";").slice(-1).join().trim();
        }
    } catch ( o_O ) {
        // ignore
    }
    return "";
}

function _detectCanvas() {
    if (CANVAS_DETECTED++) { return; }

    var canvas = document.createElement("canvas");

    if (canvas) {
        for (var i = 0, iz = WEBGL_CONTEXTS.length; i < iz; ++i) {
            var token = WEBGL_CONTEXTS[i];
            var gl = canvas.getContext(token);

            if (gl) {
                WEBGL_CONTEXT    = token;
                GPU_VERSION      = gl["getParameter"](gl["VERSION"]);
                MAX_TEXTURE_SIZE = gl["getParameter"](gl["MAX_TEXTURE_SIZE"]);
                break;
            }
        }
    }
}

function _detectWebP() {
    if (WEBP_DETECTED++) { return; }

    // original source code is here: https://developers.google.com/speed/webp/faq
/*
- WebP lossy support
    - Google Chrome (desktop) 17+
    - Google Chrome for Android version 25+
    - Opera 11.10+
    - Native web browser, Android 4.0+ (ICS)
- WebP lossy, lossless & alpha support (libwebp v0.2.0)
    - Google Chrome (desktop) 23+
    - Google Chrome for Android version 25+
    - Google Chrome for iOS version 29+
    - Opera 12.10+
    - Native web browser, Android 4.2+ (JB-MR1)
- WebP animation
    - Google Chrome 32+
 */
    var magic = {
        1: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
        2: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
        4: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
        8: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
    };

    canWebPFeature(new Image(), 1, function(feature) { WEBP_FEATURES |= feature; }); // lossy
    canWebPFeature(new Image(), 2, function(feature) { WEBP_FEATURES |= feature; }); // lossless
    canWebPFeature(new Image(), 4, function(feature) { WEBP_FEATURES |= feature; }); // alpha
    canWebPFeature(new Image(), 8, function(feature) { WEBP_FEATURES |= feature; }); // animation


    function canWebPFeature(img, feature, callback) {
        img.onload = function() {
            var value = (img.width > 0 && img.height > 0) ? feature : 0;
            callback(value);
        };
        img.src = "data:image/webp;base64," + magic[feature];
    }
}



return Spec; // return entity

});

