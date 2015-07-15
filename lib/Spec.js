(function moduleExporter(name, closure) {
"use strict";

var entity = GLOBAL["WebModule"]["exports"](name, closure);

if (typeof module !== "undefined") {
    module["exports"] = entity;
}
return entity;

})("Spec", function moduleClosure(global) {
"use strict";

// --- dependency modules ----------------------------------
var Catalog = global["WebModule"]["SpecCatalog"];
var Tags = Catalog["Tags"];

// --- define / local variables ----------------------------
// --- class / interfaces ----------------------------------
function Spec() {
    var nav = global["navigator"] || {};

    _detectFeatures();

    this._CURRENT_TIME = Date.now();
    this._PIN_DISPLAY_DPR = 0;
    this._PIN_DISPLAY_LONG = 0;
    this._PIN_DISPLAY_SHORT = 0;

    _init.call(this, nav["userAgent"] || "");
}

Spec["repository"] = "https://github.com/uupaa/Spec.js";
Spec["prototype"] = Object.create(Spec, {
    "constructor":          { "value": Spec     }, // new Spec():Spec
    "has":                  { "value": Spec_has }, // Spec#has(id:IDString):Boolean
    // --- DEVICE ---
    "DEVICE":               { "get":   function()  { return this._DEVICE;           } }, // Device ID picked up from the UserAgent string. eg: "iPhone 5"
    "SOC":                  { "get":   function()  { return this._SOC;              } }, // System On Chip ID (UPPER_CASE STRING). eg: "MSM8974", "A5X"
    "GPU":                  { "get":   function()  { return this._GPU;              } }, // GPU ID. eg: "ADRENO 330"
    "RAM":                  { "get":   function()  { return this._RAM;              } }, // Memory (MB)
    // --- OS ---
    "OS":                   { "get":   function()  { return this._OS;               } }, // OS name. eg: "Android", "iOS", "Windows", "Mac", "Firefox", ""
    "OS_VERSION":           { "get":   function()  { return this._OS_VERSION;       } }, // Detected OS version from UserAgent string. semver format "{{Major}},{{Minor}},{{Patch}}"
    // --- BROWSER ---
    "USER_AGENT":           { "get":   function()  { return this._USER_AGENT;       },
                              "set":   function(v) { _init.call(this, v);           } },
    "BROWSER":              { "get":   function()  { return this._BROWSER;          } }, // Browser name. "Chrome", "Firefox", "AOSP", "IE", "Safari", "WebKit", "Chrome for iOS"
                                                                                         //  AOSP: Android Browser, WebView, Amazon Silk
                                                                                         //  Chrome: Chromium WebView, SBrowser, Vivaldi, Amazon Silk
    "BROWSER_ENGINE":       { "get":   function()  { return this._BROWSER_ENGINE;   } }, // Browser render engine. "Blink", "Trident", "Gecko", "WebKit"
    "BROWSER_VERSION":      { "get":   function()  { return this._BROWSER_VERSION;  } }, // Browser version from UserAgent String. semver
    "LANGUAGE":             { "get":   function()  { return this._LANGUAGE;         } }, // Content language.
    // --- DISPLAY ---
    "DISPLAY_DPR":          { "get":   function()  { return this._PIN_DISPLAY_DPR ||
                                                            this._DISPLAY_DPR;      },
                              "set":   function(v) { this._PIN_DISPLAY_DPR = v;     } },
    "DISPLAY_INCH":         { "get":   function()  { return this._DISPLAY_INCH;     } },
    "DISPLAY_LONG":         { "get":   function()  { return this._PIN_DISPLAY_LONG ||
                                                            this._DISPLAY_LONG;     },
                              "set":   function(v) { this._PIN_DISPLAY_LONG = v;    } },
    "DISPLAY_SHORT":        { "get":   function()  { return this._PIN_DISPLAY_SHORT ||
                                                            this._DISPLAY_SHORT;    },
                              "set":   function(v) { this._PIN_DISPLAY_SHORT = v;   } },
    // --- DEVELOP / EXPERIMENTAL ---
    "LEGACY_DEVICE":        { "get":   function()  { return _query(this).legacy;                    } }, // IDArray
    "SUPPORT_DEVICE":       { "get":   function()  { return _query(this).support;                   } }, // IDArray
    "SLOW_CPU":             { "get":   function()  { return this._SLOW_CPU;                         } }, // Slow CPU.
    "SLOW_GPU":             { "get":   function()  { return this._SLOW_GPU;                         } }, // Slow GPU.
    "OLD_DEVICE":           { "get":   function()  { return this._OLD_DEVICE;                       } }, // Old device. (30 months elapsed) or (24 months elapsed and not version-up)
    "BLE":                  { "get":   function()  { return this._TAGS & Tags["BLE"];               } }, // BLE Ready. Bluetooth 4.0+ and OS support(iOS 5+, Android 4.3+)
    "NFC":                  { "get":   function()  { return this._TAGS & Tags["NFC"];               } }, // NFC Ready. Android 2.3+
    "ATOM":                 { "get":   function()  { return this._TAGS & Tags["ATOM"];              } }, // Intel ATOM.
    "SIMD":                 { "get":   function()  { return !/^(T20|AP20|AP25)$/.test(this._SOC);   } }, // SIMD Support. Tegra 2 does not supports NEON.
    "WEBP":                 { "get":   function()  { return Spec["FEATURES"]["WEBP"];               } },
    "WEB_VIEW":             { "get":   function()  { return _isWebView.call(this);                  } }, // Open the page in WebView.
    "CPU_MAX_THREADS":      { "get":   function()  { return Spec["FEATURES"]["CPU_MAX_THREADS"];    } }, // Max Worker Threads.
    "GPU_MAX_TEXTURE_SIZE": { "get":   function()  { return this._MAX_TEXTURE_SIZE;                 } },
    "MAX_TOUCH_POINTS":     { "get":   function()  { return this._MAX_TOUCH_POINTS;                 } },
    "WEBGL_CONTEXT":        { "get":   function()  { return Spec["FEATURES"]["WEBGL_CONTEXT"];      } },
    "WEBGL_VERSION":        { "get":   function()  { return Spec["FEATURES"]["WEBGL_VERSION"];      } },
    "CHROME_TRIGGER":       { "get":   function()  { return _isChromeTrigger.call(this);            } },
    // --- UINT TEST ---
    "CURRENT_TIME":         { "set":   function(v) { this._CURRENT_TIME = v;                        } },
});

Spec["FEATURES"] = {
    "DETECTED":             0,
    "WEBP":                 0x0,    // 0x0 = unsupported, 0x1 = lossy, 0x2 = lossless, 0x4 = alpha, 0x8 = animation
    "CPU_MAX_THREADS":      2,      // navigator.hardwareConcurrency
    "GPU_MAX_TEXTURE_SIZE": 0,      // MAX_TEXTURE_SIZE (1024 - 16384)
    "WEBGL_VERSION":        "",     // WebGL version string.
    "WEBGL_CONTEXT":        "",     // WebGL context. "webgl", "webgl2", "experimental-webgl", ...
};
Spec["SETTING"] = {
    "CPU_SPEED_THRESHOLD":  1.2,    // Speed threshold.
    "CPU_CORES_THRESHOLD":  2,      // Cores threshold.
    "GPU_GFLOPS_THRESHOLD": 19,     // GFLOPS threshold.
    "OLD_DEVICE_THRESHOLD": 24,     // Number of months until expiration.
};

// --- implements ------------------------------------------
function Spec_has(id) { // @arg IDString - DEVICE ID or SOC ID or GPU ID
                        // @ret Boolean
    return id in Catalog["iOS"] || id in Catalog["Android"] || id in Catalog["Windows"] ||
           id in Catalog["SOC"] || id in Catalog["GPU"];
}

function _query(that) { // @ret IDArrayObject - { legacy: [DeviceID, ...], support: [DeviceID, ...] }
    return ["iOS", "Android", "Windows"].reduce(function(result, os) {
        for (var devid in Catalog[os]) {
            var devData = Catalog[os][devid];
            var socData = Catalog["SOC"][devData[0]]; // [ CLOCK, CORES, GPU_ID ]
            var gpuData = Catalog["GPU"][socData[0]]; // [ GFLOPS, GLES, TEXTURE ]

            if ((socData[1] <= Spec["SETTING"]["CPU_SPEED_THRESHOLD"] &&
                 socData[2] <= Spec["SETTING"]["CPU_CORES_THRESHOLD"]) ||
                 gpuData[0] <= Spec["SETTING"]["GPU_GFLOPS_THRESHOLD"] ||
                 _isOldDevice.call(that, devData[1], devData[2])) {
                result.legacy.push(devid);
            } else {
                result.support.push(devid);
            }
        }
        return result;
    }, { legacy: [], support: [] });
}

function _init(ua) { // @arg String
                     // @bind this
    var nav                 = global["navigator"] || {};
    var lang                = nav["language"]  || "en";
    var screen              = global["screen"] || {};
    var screenWidth         = screen["width"]  || 0;
    var screenHeight        = screen["height"] || 0;
    var osName              = _detectOSName(ua);                // (Android|iOS|Windows|Mac|Firefox)
    var osVer               = _detectOSVersion(osName, ua);     // SemverString("major.minor.patch")
    var browserName         = _detectBrowserName(osName, ua);   // (Chrome|Firefox|AOSP|IE|Safari|WebKit|Chrome for iOS)
    var devid               = _detectDeviceID.call(this, osName, ua, parseFloat(osVer));
    var BROWSER_ENGINES     = {
        "Chrome": "Blink", "Firefox": "Gecko", "IE": "Trident", "AOSP": "WebKit",
        "Safari": "WebKit", "WebKit": "WebKit", "Chrome for iOS": "WebKit"
    };

    // --- DEVICE ---
    this._DEVICE            = devid;
    this._SOC               = "";
    this._GPU               = "";
    this._RAM               = 0;
    // --- OS ---
    this._OS                = osName;
    this._OS_VERSION        = osVer;
    // --- BROWSER ---
    this._USER_AGENT        = ua;
    this._BROWSER           = browserName;
    this._BROWSER_ENGINE    = BROWSER_ENGINES[browserName] || "";     // (Blink|Gecko|Trident|WebKit)
    this._BROWSER_VERSION   = _detectBrowserVersion(browserName, ua); // SemverString("major.minor.patch")
    this._LANGUAGE          = lang.split("-", 1)[0];                  // "en-us" -> "en"
    // --- DISPLAY ---
    this._DISPLAY_DPR       = this._PIN_DISPLAY_DPR   || global["devicePixelRatio"] || 1.0;
    this._DISPLAY_INCH      = 0;
    this._DISPLAY_LONG      = this._PIN_DISPLAY_LONG  || Math.max(screenWidth, screenHeight);
    this._DISPLAY_SHORT     = this._PIN_DISPLAY_SHORT || Math.min(screenWidth, screenHeight);
    // --- DEVELOP / EXPERIMENTAL ---
    this._SLOW_CPU          = false;
    this._SLOW_GPU          = false;
    this._OLD_DEVICE        = false;
    this._MAX_TEXTURE_SIZE  = 0;
    this._MAX_TOUCH_POINTS  = nav["maxTouchPoints"] || 0;
    this._TAGS              = 0;

    if (devid && osName) {
        var devData = _getDeviceData(devid) || _getAltDeviceData(osName);
        if (devData) {
            var socData = Catalog["SOC"][devData[0]]; // [ CLOCK, CORES, GPU_ID ]
            var gpuData = Catalog["GPU"][socData[0]]; // [ GFLOPS, GLES, TEXTURE ]

            this._TAGS              = devData[8];
            this._SOC               = devData[0];
            this._GPU               = socData[0];
            this._RAM               = devData[6] * 128;
            this._SLOW_CPU          = socData[1] <= Spec["SETTING"]["CPU_SPEED_THRESHOLD"] &&
                                      socData[2] <= Spec["SETTING"]["CPU_CORES_THRESHOLD"];
            this._SLOW_GPU          = gpuData[0] <= Spec["SETTING"]["GPU_GFLOPS_THRESHOLD"];
            this._OLD_DEVICE        = _isOldDevice.call(this, devData[1], devData[2]);
            this._DISPLAY_SHORT     = devData[3]; // overwrite
            this._DISPLAY_LONG      = devData[4]; // overwrite
            this._DISPLAY_INCH      = devData[5];
            this._MAX_TEXTURE_SIZE  = (gpuData[2] * 1024) ||
                                      Spec["FEATURES"]["GPU_MAX_TEXTURE_SIZE"];
            this._MAX_TOUCH_POINTS  = Math.max(devData[7], this._MAX_TOUCH_POINTS);

            // BLE ready for Android 4.3+ (API Level 18+)
            // https://developer.android.com/guide/topics/connectivity/bluetooth-le.html
            if (this._OS === "Android" && parseFloat(this._OS_VERSION) < 4.3) {
                this._TAGS &= ~(Tags["BLE"]); // BLE bit off
            }
            if (this._OS === "Android" && parseFloat(this._OS_VERSION) < 4.0) {
                // Android 2.x, 3.x Browsers does not support multitouch events
                // https://code.google.com/p/android/issues/detail?id=11909
                this._MAX_TOUCH_POINTS = this._MAX_TOUCH_POINTS ? 1 : 0; // to Binary
            }
        }
    }
}

function _getDeviceData(devid) { // @arg String
                                 // @ret DeviceDataArray - [ SOC_ID, DATE, OS_VERS, DISP1, DISP2, INCH, RAM, TOUCH, TAG ]
    return Catalog["iOS"][devid] || Catalog["Android"][devid] || Catalog["Windows"][devid] || null;
}

function _getAltDeviceData(osName) {
    switch (osName) {
    case "iOS":     return _getDeviceData("iPhone 5");
    case "Android": return _getDeviceData("Nexus 5");
    }
    return null;
}

function _isOldDevice(yymm,         // @arg Number - device release date. yymm
                      osVersions) { // @arg String - "234-404"
                                    // @ret Boolean
                                    // @bind this

    var versions = osVersions.split("-"); // ["234", "404"]
    var firstVersion = versions[0];
    var finalVersion = versions[1] || "9999";
    var expiration = Spec["SETTING"]["OLD_DEVICE_THRESHOLD"];
    var month = 31 * 24 * 60 * 60 * 1000;
    var releaseDate = new Date(2000 + ((yymm / 100) | 0), (yymm % 100) - 1, 1).getTime();

    // --- DESERT DEVICE ---
    // Devices that even once has not been updated.
    if (this._CURRENT_TIME > releaseDate + (expiration + 1) * month) {
        if (firstVersion === finalVersion) { // This device has not been version-up even once.
            return true;
        }
    }
    // --- WELL-KNOWN DEVICE / POPULAR DEVICE ---
    // Updated device, 6 months extension.
    if (this._CURRENT_TIME > releaseDate + (expiration + 1 + 6) * month) {
        return true;
    }
    return false;
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

//function _toSemver(number) {
//    var s = (10000 + parseInt(number)).toString();
//    return parseInt(s[1] + s[2], 10) + "." + s[3] + "." + s[4];
//}

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
                     replace(/^SonyEricsson/, "").
                     replace(/^Sony/, "").replace(/ 4G$/, "");

        if (result === "Nexus 7") {
            return (this._PIN_DISPLAY_DPR || this._DISPLAY_DPR) < 2 ? "Nexus 7"      // Nexus 7 (2012)
                                                                    : "Nexus 7 2nd"; // Nexus 7 (2013)
        }
        return result;
    } catch ( o__o ) {
        // ignore
    }
    return "";
}

function _getiOSDeviceID(ua, osVer) {
    var glVersion = Spec["FEATURES"]["WEBGL_VERSION"];
    var retina   = (this._PIN_DISPLAY_DPR || this._DISPLAY_DPR) >= 2;
    var longEdge = Math.max(this._PIN_DISPLAY_LONG  || this._DISPLAY_LONG,
                            this._PIN_DISPLAY_SHORT || this._DISPLAY_SHORT); // iPhone 4S: 480, iPhone 5: 568
  //var SGX535 = /535/.test(glVersion); // iPhone 3GS, iPhone 4
    var SGX543 = /543/.test(glVersion); // iPhone 4s/5/5c, iPad 2/3, iPad mini
    var SGX554 = /554/.test(glVersion); // iPad 4
    var A7     = /A7/.test(glVersion);  // iPhone 5s, iPad mini 2/3, iPad Air
    var A8     = /A8/.test(glVersion);  // A8, A8X, iPhone 6/6+, iPad Air 2, iPod touch 6

    if (/iPhone/.test(ua)) {
        return !retina         ? "iPhone 3GS"
             : longEdge <= 480 ? (SGX543 || osVer >= 8 ? "iPhone 4S" : "iPhone 4") // iPhone 4 stopped in iOS 7.
             : longEdge <= 568 ? (!A7 ? "iPhone 5" : "iPhone 5s") // iPhone 5c
             : longEdge <= 667 ? "iPhone 6"
             : longEdge <= 736 ? "iPhone 6 Plus" : "";
    } else if (/iPad/.test(ua)) {
        return !retina         ? "iPad 2" // iPad 1/2, iPad mini
             : SGX543          ? "iPad 3"
             : SGX554          ? "iPad 4"
             : A7              ? "iPad mini 2" // iPad mini 3, iPad Air
             : A8              ? "iPad Air 2" : "";
    } else if (/iPod/.test(ua)) {
        return longEdge <= 480 ? (!retina ? "iPod touch 3" : "iPod touch 4")
                               : (!A8     ? "iPod touch 5" : "iPod touch 6");
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
    } catch ( o__o ) {
        // ignore
    }
    return "";
}

function _getFirefoxOSDeviceID(ua) {
    try {
        if (/Mobile;/.test(ua) && !/Mobile; rv:/.test(ua)) {
            return ua.split("; rv:")[0].split(";").slice(-1).join().trim();
        }
    } catch ( o__o ) {
        // ignore
    }
    return "";
}

function _detectFeatures() {
    var feat = Spec["FEATURES"];

    if (feat["DETECTED"]++) { return; }
    if (IN_NW || IN_BROWSER) {
        _CPU();
        _GPU();
        _WEBP();
    }

    function _CPU() {
        // PROTECT iOS DEVICE FINGERPRINTING: if (iOS) { maxCoresToReport = 2 }
        //  http://trac.webkit.org/browser/trunk/Source/WebCore/page/Navigator.cpp#L143
        feat["CPU_MAX_THREADS"] = Math.max(2, navigator["hardwareConcurrency"] || 0);
    }
    function _GPU() {
        var canvas = document.createElement("canvas");
        if (canvas) {
            var ctxs = ["webgl2", "experimental-webgl2",
                        "webgl",  "experimental-webgl"];
            for (var i = 0, iz = ctxs.length; i < iz; ++i) {
                var ctx = ctxs[i];
                var gl = canvas.getContext(ctx);
                if (gl) {
                    feat["WEBGL_CONTEXT"] = ctx;
                    feat["WEBGL_VERSION"] = gl["getParameter"](gl["VERSION"]);
                    feat["GPU_MAX_TEXTURE_SIZE"] = gl["getParameter"](gl["MAX_TEXTURE_SIZE"]);
                    break;
                }
            }
        }
    }
    function _WEBP() {
        // original source code is here: https://developers.google.com/speed/webp/faq
        //  - WebP lossy support
        //      - Google Chrome (desktop) 17+
        //      - Google Chrome for Android version 25+
        //      - Opera 11.10+
        //      - Native web browser, Android 4.0+ (ICS)
        //  - WebP lossy, lossless & alpha support (libwebp v0.2.0)
        //      - Google Chrome (desktop) 23+
        //      - Google Chrome for Android version 25+
        //      - Google Chrome for iOS version 29+
        //      - Opera 12.10+
        //      - Native web browser, Android 4.2+ (JB-MR1)
        //  - WebP animation
        //      - Google Chrome 32+
        var magic = {
            1: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
            2: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
            4: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
            8: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
        };
        _try(new Image(), 1); // lossy
        _try(new Image(), 2); // lossless
        _try(new Image(), 4); // alpha
        _try(new Image(), 8); // animation

        function _try(img, feature) {
            img.onload = function() {
                feat["WEBP"] |= ((img.width > 0 && img.height > 0) ? feature : 0);
            };
            img.src = "data:image/webp;base64," + magic[feature];
        }
    }
}

function _isWebView() { // @ret Boolean
                        // @bind this
    if (IN_NW || IN_BROWSER) {
        var supportFullScreen = "fullscreenEnabled"       in document ||
                                "webkitFullscreenEnabled" in document || false;
        var supportFileSystem = "requestFileSystem"       in global ||
                                "webkitRequestFileSystem" in global || false;

        // WebView detection: https://gist.github.com/uupaa/d9947bb7153a5dcd0d73
        if (this._BROWSER === "WebKit") {
            return !supportFullScreen;
        } else if (this._BROWSER === "Chrome") { // ignore "Chrome for iOS"
            return !(supportFullScreen && supportFileSystem);
        }
    }
    return false;
}

function _isChromeTrigger() { // @ret Boolean
                              // @bind this
    var osVer = parseFloat(this._OS_VERSION);

    if (this._BROWSER === "AOSP" && osVer >= 4 && osVer < 4.4) {
        return !_isWebView.call(this);
    }
    return false;
}

return Spec; // return entity

});

