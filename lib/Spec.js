(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ---------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

var OTHER = 1;

var APPLE = 2, GOOGLE = 3, AMAZON = 4, NOKIA = 5, SONY = 6,
    SHARP = 7, FUJITSU = 8, SAMSUNG = 9, LG = 10, HTC = 11;

var BRANDS =
        "APPLE=2,GOOGLE=3,AMAZON=4,NOKIA=5,SONY=6," +
        "SHARP=7,FUJITSU=8,SAMSUNG=9,LG=10,HTC=11,";

var A4 = 2, A5 = 3, A5X = 4, A6 = 5, A6X = 6, A7 = 7,
    QSD8250 = 20, QSD8650 = 21, APQ8055 = 22, APQ8060 = 23, APQ8064 = 24,
    APQ8064T = 25, APQ8064AB = 26, APQ8074 = 27, MSM7227 = 40, MSM7230 = 41,
    MSM8225 = 50, MSM8226 = 51, MSM8227 = 52, MSM8230 = 53, MSM8255 = 54,
    MSM8255T = 55, MSM8260 = 56, MSM8260A = 57,
    MSM8627 = 60, MSM8655 = 61, MSM8660 = 62, MSM8660A = 63,
    MSM8926 = 70, MSM8928 = 71, MSM8930 = 72, MSM8930AB = 73, MSM8960 = 75,
    MSM8960T = 76, MSM8974AA = 77, MSM8974AB = 78, MSM8974AC = 79,
    T20 = 100, AP20H = 101, AP25H = 102, T30L = 103, AP33 = 104, AP37 = 105,
    OMAP3630 = 110, OMAP4430 = 111, OMAP4460 = 112, OMAP4470 = 113,
    S5L8900 = 120, S5PC100 = 121, S5PC110 = 122, EXYNOS4210 = 123, EXYNOS4412 = 124,EXYNOS5250 = 125,
    K3V2 = 130, MTK8125 = 131, MT6582M = 132, APE5R = 133, CXD5315GG = 134,
    Z2560 = 200, Z3580 = 201, Z3745 = 202;

var SOCS =
        "A4=2,A5=3,A5X=4,A6=5,A6X=6,A7=7," +
        "QSD8250=20,QSD8650=21,APQ8055=22,APQ8060=23,APQ8064=24," +
        "APQ8064T=25,APQ8064AB=26,APQ8074=27,MSM7227=40,MSM7230=41," +
        "MSM8225=50,MSM8226=51,MSM8227=52,MSM8230=53,MSM8255=54," +
        "MSM8255T=55,MSM8260=56,MSM8260A=57," +
        "MSM8627=60,MSM8655=61,MSM8660=62,MSM8660A=63," +
        "MSM8926=70,MSM8928=71,MSM8930=72,MSM8930AB=73,MSM8960=75," +
        "MSM8960T=76,MSM8974AA=77,MSM8974AB=78,MSM8974AC=79," +
        "T20=100,AP20H=101,AP25H=102,T30L=103,AP33=104,AP37=105," +
        "OMAP3630=110,OMAP4430=111,OMAP4460=112,OMAP4470=113," +
        "S5L8900=120,S5PC100=121,S5PC110=122,EXYNOS4210=123,EXYNOS4412=124,EXYNOS5250=125," +
        "K3V2=130,MTK8125=131,MT6582M=132,APE5R=133,CXD5315GG=134," +
        "Z2560=200,Z3580=201,Z3745=202,";

var POWER_VR = 2, ADRENO = 3, TEGRA = 4, MALI = 5, IMMERSION = 6, INTEL = 7;
var GPU_TYPES =
        "POWER_VR=2,ADRENO=3,TEGRA=4,MALI=5,IMMERSION=6,INTEL=7,";

var ARM = 2, ARM64 = 3, ATOM = 4;
var CPU_TYPES =
        "ARM=2,ARM64=3,ATOM=4,";

// --- FEATURE ---
var FE_GPS = 0x0001;
var FE_3G  = 0x0002;
var FE_LTE = 0x0004;
var FE_NFC = 0x0008;
// alias
var FE_G___ = FE_GPS;
var FE_G3__ = FE_GPS | FE_3G;
var FE_G3L_ = FE_GPS | FE_3G | FE_LTE;
var FE_G3LN = FE_GPS | FE_3G | FE_LTE | FE_NFC;
var FE_G__N = FE_GPS |                  FE_NFC;
var FE__3L_ =          FE_3G | FE_LTE;
var FE_G3_N = FE_GPS | FE_3G |          FE_NFC;

// --- OS_HIGHEST_VERSION ---
var IVER = 712; // 2014-07-01
var AVER = 443; // 2014-04-10

// --- class / interfaces ----------------------------------
function Spec(param) { // @arg Object = {} - { dpr, touch, width, height, language, userAgent }
                       // @param.dpr Number = 1.0
                       // @param.touch Integer = 0
                       // @param.width Integer = 0
                       // @param.height Integer = 0
                       // @param.language String = "en"
                       // @param.userAgent String = ""
                       // @ret SpecObject - { ID, SOC, ... }
//{@dev
    $valid($type(param, "Object|omit"), Spec, "param");
    $valid($keys(param, "dpr|touch|width|height|language|userAgent"), Spec, "param");
//}@dev

    param = param || {};

    var spec   = Spec_createSpecObject();
    var screen = global["screen"]    || {};
    var nav    = global["navigator"] || {};
    var dpr    = param["dpr"]        || global["devicePixelRatio"] || 1.0;
    var touch  = param["touch"]      || nav["maxTouchPoints"] || 0;
    var width  = param["width"]      || screen["width"]  || 0;
    var height = param["height"]     || screen["height"] || 0;
    var lang   = param["language"]   || nav["language"]  || "en";
    var ua     = param["userAgent"]  || nav["userAgent"] || "";

    spec["LANGUAGE"] = lang.split("-", 1)[0]; // "en-us" -> "en"
    spec["USER_AGENT"] = ua;
    spec["DISPLAY_DPR"] = dpr;
    spec["DISPLAY_LONG"] = Math.max(width, height);
    spec["DISPLAY_SHORT"] = Math.min(width, height);
    spec["DISPLAY_TOUCH"] = touch;

    if (ua) {
        _detectOS(spec, ua);      // OS, OS_VERSION
        _detectID(spec, ua);      // ID
        _detectBrowser(spec, ua); // BROWSER_NAME, BROWSER_ENGINE, BROWSER_VERSION

        var id = spec["ID"];

        if ( Spec_has(id) ) { // cataloged?
            _setDeviceSpec(spec, id);
            spec["DETECTED"] = true;
        } else {
            // unknown device -> set alternate device id
            var alt = _getAlternateDeviceID(spec);

            if ( alt && Spec_has(alt) ) {
                _setDeviceSpec(spec, alt);
                spec["DETECTED"] = false;
                spec["ID_CANDIDATE"] = [id];
                spec["OS_RELEASE_VERSION"] = "0.0.0";
                spec["OS_HIGHEST_VERSION"] = "0.0.0";
            }
        }
    }
    return spec;
}

//{@dev
Spec["repository"] = "https://github.com/uupaa/Spec.js";
//}@dev

Spec["has"]              = Spec_has;              // Spec.has(id:DeviceIDString):Boolean
Spec["get"]              = Spec_get;              // Spec.get(id:DeviceIDString):SpecObject|null
Spec["createSpecObject"] = Spec_createSpecObject; // Spec.createSpecObject():SpecObject

// --- implements ------------------------------------------
function Spec_has(id) { // @arg DeviceIDString
                        // @ret Boolean
    return id && id in Spec["catalog"]["device"];
}

function Spec_get(id) { // @arg DeviceIDString
                        // @ret SpecObject|null
    return Spec_has(id) ? _setDeviceSpec(Spec(), id)
                        : null;
}

function _getAlternateDeviceID(spec) {
    var ver = parseFloat(spec["OS_VERSION"]);

    switch (spec["OS"]) {
    case "iOS":           return "iPhone 5s";
    case "Android":       return ver >= 4.3 ? "Nexus 5" : "XT1058";
    case "Windows Phone": return "Lumia 1520";
    }
    return "";
}

function Spec_createSpecObject() {
    return {
        // --- DEVICE ---
        "ID":                 "",      // Device ID picked up from the UserAgent string. eg: "iPhone 5"
        "SOC":                "",      // System on chip name (UPPER_CASE STRING). eg: "MSM8974", "A5X"
        "BRAND":              "",      // Device brand name or device maker name (UPPER_CASE STRING). eg: "OTHER", "APPLE", "GOOGLE", "AMAZON"...
        "FEATURE":            0,       // A bit pattern that indicates the features and functionality of the device.
        "LANGUAGE":           "",      // Browser/Content language. "en", "ja", ...
        "DETECTED":           false,   // Device is described in the catalog.
        "ID_CANDIDATE":       [],      // Candidate the device ID lists. If cannot be device id determined. ["iPhone 5", "iPhone 5c", "iPhone 5s"]
        // --- OS ---
        "OS":                 "",      // The OS name. eg: "Android", "iOS", "Windows Phone", "Windows", "Mac", "Firefox OS", "Fire OS", "Game"
        "OS_VERSION":         "0.0.0", // Detected Current OS version from User Agent string. format "{{Major}},{{Minor}},{{Patch}}"
                                       // Convert to a floating point number are `parseFloat(spec["OS_VERSION"])`
        "OS_RELEASE_VERSION": "0.0.0", // The OS version of the device at the release date. format "{{Major}},{{Minor}},{{Patch}}"
        "OS_HIGHEST_VERSION": "0.0.0", // The OS version of the end of support. format "{{Major}},{{Minor}},{{Patch}}"
        // --- CPU / GPU / MEMORY ---
        "CPU_TYPE":           "",      // CPU type. "ARM", "ARM64", "ATOM"
        "CPU_CLOCK":          0.0,     // CPU clock, GHz.
        "CPU_CORES":          0,       // CPU cores. 1(single core), 2(dual core), 4(quad core)
        "GPU_TYPE":           "",      // GPU type (UPPER CASE STRING). eg: "ADRENO", "TEGRA", "POWER_VR", "MALI", "IMMERSION", ...
        "GPU_ID":             "",      // GPU ID. eg: "330"
        "RAM":                0.0,     // RAM size, MBs.
        // --- DISPLAY ---
        "DISPLAY_DPR":        0.0,     // Display Device Pixel Ratio. window.devicePixelRatio value
        "DISPLAY_PPI":        0,       // Display Pixel Per Inch.
        "DISPLAY_SIZE":       0.0,     // Display size, Inches.
        "DISPLAY_LONG":       0,       // Display long edge, pixels.
        "DISPLAY_SHORT":      0,       // Display short edge, pixels.
        "DISPLAY_TOUCH":      0,       // Display multi touch fingers. device catalog value or navigator.maxTouchPoints value
                                       // see https://code.google.com/p/android/issues/detail?id=11909
        // --- BROWSER ---
        "USER_AGENT":         "",      // navigator.userAgent value or Spec({ userAgent: ... }) value.
        "WEB_VIEW":           false,   // Is WebView flag. This value set by user.
                                       // Some functions refer to this value, the results will change.
        "BROWSER_NAME":       "",      // Browser name. "Chrome", "Firefox", "Browser", "IE", "Safari", "WebKit"
                                       // Android Browser -> "Browser"
                                       // Android WebView -> "Browser"
                                       // Chrome WebView  -> "Chrome"
                                       // S Browser       -> "Chrome"
                                       // Fire Phone      -> "Browser"
                                       // Kindle          -> "Browser"
        "BROWSER_ENGINE":     "",      // Browser render engine. "Blink", "Trident", "Gecko", "WebKit"
        "BROWSER_VERSION":    "0.0.0"  // Browser version from UserAgent String. format: "{{Major}}.{{Minor}}.{{Patch}}"
    };
}

function _setDeviceSpec(spec, id) {
    var data    = Spec["catalog"]["device"][id];
    var socid   = _num2str(SOCS, data[1]);
    var socdata = Spec["catalog"]["soc"][socid]; // [TYPE, CPU-CLOCK, CPU-CORES, GPU-TYPE, GPU-ID]

    spec["ID"]                  = id;
    spec["SOC"]                 = socid;
    spec["BRAND"]               = _num2str(BRANDS, data[0]);
    spec["FEATURE"]             = data[11];
  //spec["LANGUAGE"]
  //spec["DETECTED"]
  //spec["ID_CANDIDATE"]
  //spec["OS"]
  //spec["OS_VERSION"]
    spec["OS_RELEASE_VERSION"]  = _toVersionString(data[2]);
    spec["OS_HIGHEST_VERSION"]  = _toVersionString(data[3]);
    spec["CPU_TYPE"]            = _num2str(CPU_TYPES, socdata[0]);
    spec["CPU_CLOCK"]           = socdata[1];
    spec["CPU_CORES"]           = socdata[2];
    spec["GPU_TYPE"]            = _num2str(GPU_TYPES, socdata[3]);
    spec["GPU_ID"]              = socdata[4];
    spec["RAM"]                 = data[8];
    spec["DISPLAY_DPR"]         = data[7] || spec["DISPLAY_DPR"];
    spec["DISPLAY_PPI"]         = data[6];
    spec["DISPLAY_SIZE"]        = data[10];
    spec["DISPLAY_LONG"]        = Math.max(data[4], data[5]) || spec["DISPLAY_LONG"];
    spec["DISPLAY_SHORT"]       = Math.min(data[4], data[5]) || spec["DISPLAY_SHORT"];
    spec["DISPLAY_TOUCH"]       = data[9] || spec["DISPLAY_TOUCH"];
  //spec["USER_AGENT"]
  //spec["WEB_VIEW"]
  //spec["BROWSER_NAME"]
  //spec["BROWSER_ENGINE"]
  //spec["BROWSER_VERSION"]

    return spec;
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

function _toVersionString(number) {
    var s = (10000 + number).toString();

    return parseInt(s[1] + s[2], 10) + "." + s[3] + "." + s[4];
}

function _detectOS(spec, ua) {
    var type = "";
    var ver = "0.0.0";

    if ( /PlayStation|Xbox|Nintendo/i.test(ua) ) {
        type = "Game";
//  } else if ( /FireOS/.test(ua) ) {
//      TBD
    } else if ( /Android/.test(ua) ) {
        // Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; KFTT        Build/IML74K) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.4    Mobile Safari/535.19 Silk-Accelerated=true
        // Mozilla/5.0 (Linux; U; Android 2.2;   ja-jp; INFOBAR A01 Build/S9081)  AppleWebKit/533.1  (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1
        // Mozilla/5.0 (Linux; U; Android 2.3.3; ja-jp; INFOBAR A01 Build/S9081)  AppleWebKit/533.1  (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1
        //                                ~~~~~
        //                                | | +-- Patch
        //                                | +---- Minor
        //                                +------ Major
        type = "Android";
        ver = _getVersion(type, ua);
    } else if ( /iPhone|iPad|iPod/.test(ua) ) {
        // Mozilla/5.0 (iPhone; CPU iPhone OS 6_0   like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25
        // Mozilla/5.0 (iPod;   CPU iPhone OS 5_0_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A405 Safari/7534.48.3
        //                                    ~~~~~
        //                                    | | +-- Patch
        //                                    | +---- Minor
        //                                    +------ Major
        type = "iOS";
        ver = _getVersion(/OS /, ua);
    } else if ( /Windows Phone/.test(ua) ) {
        type = "Windows Phone";
        ver = _getVersion(/Windows Phone (?:OS )?/, ua);
    } else if ( /Mac OS X/.test(ua) ) {
        type = "Mac";
        ver = _getVersion(/Mac OS X /, ua);
    } else if ( /Windows NT/.test(ua) ) {
        type = "Windows";
        ver = _getVersion(/Windows NT/, ua);
    } else if ( /Firefox/.test(ua) ) {
        // Mozilla/5.0 (Android; Mobile; rv:13.0) Gecko/13.0 Firefox/13.0
        type = "Firefox OS";
    }
    spec["OS"] = type;
    spec["OS_VERSION"] = ver;
}

function _detectID(spec, ua) {
    var id = "";

    switch (spec["OS"]) {
    case "iOS":             id = _getiOSDeviceID(ua, spec); break;
    case "Game":            id = _getGameDeviceID(ua); break;
    case "Android":         id = _getAndroidDeviceID(ua, spec); break;
//  case "Fire OS":         id = _getFireOSDeviceID(ua); break;
    case "Windows Phone":   id = _getWindowsPhoneDeviceID(ua, spec);
    }
    spec["ID"] = id;
}

function _getGameDeviceID(ua) {
    var id = /PlayStation 4/i.test(ua)    ? "PS 4"
           : /PlayStation Vita/i.test(ua) ? "PS Vita"
           : /Xbox One/i.test(ua)         ? "Xbox One"
           : /WiiU/i.test(ua)             ? "Wii U"
                                          : "";
    return id;
}

function _getAndroidDeviceID(ua, spec) {
    // Examples:
    //      Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; KFTT               Build/IML74K)      AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.4 Mobile Safari/535.19 Silk-Accelerated=true
    //      Mozilla/5.0 (Linux;    Android 4.1.1;        Nexus 7            Build/JRO03S)      AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19
    //      Mozilla/5.0 (Linux; U; Android 1.5;   ja-jp; GDDJ-09            Build/CDB56)       AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1
    //      Mozilla/5.0 (Linux; U; Android 2.3.3; ja-jp; INFOBAR A01        Build/S9081)       AppleWebKit/533.1  (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1
    //      Mozilla/5.0 (Linux; U; Android 3.2;   ja-jp; SC-01D             Build/MASTER)      AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13
    //      Mozilla/5.0 (Linux; U; Android 4.0.1; ja-jp; Galaxy Nexus       Build/ITL41D)      AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
    //      Mozilla/5.0 (Linux; U; Android 3.2;   ja-jp; Sony Tablet S      Build/THMAS11000)  AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13
    //      Mozilla/5.0 (Linux; U; Android 4.0.3; ja-jp; URBANO PROGRESSO   Build/010.0.3000)  AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
    //                                                   ~~~~~~~~~~~~~~~~
    //                                                     device id
    //
    // Exceptional pattern:
    //      Mozilla/5.0 (Android; Mobile; rv:13.0) Gecko/13.0 Firefox/13.0
    //          -> is not Android
    //      Mozilla/5.0 (Linux; U; Android 4.2.2; en-us; HTC6500LVW 4G      Build/JDQ39)       AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
    //                                                   ~~~~~~~~~~
    //      Mozilla/5.0 (Linux; U; Android 2.3;   ja-jp; SonyEricssonSO-01C Build/3.0.A.1.34)  AppleWebKit/533.1  (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1
    //                                                               ~~~~~~
    //      Mozilla/5.0 (Linux; U; Android 4.0.4; ja-jp; SonySO-04D         Build/7.0.D.1.117) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
    //                                                       ~~~~~~
    //

    if (/Firefox/.test(ua)) {
        return "";
    }
    var id = ua.split("Build/")[0].split(";").slice(-1).join().trim().
             replace(/^SonyEricsson/, "").replace(/ 4G$/, "");

    // overwrite device id
    switch (id) {
    case "Nexus 7": // -> "Nexus 7 (2013)"
        id = spec["DISPLAY_DPR"] >= 2 ? "Nexus 7 (2013)" // Nexus 7 (2013)
                                      : "Nexus 7";       // Nexus 7 (2012)
    }
    return id;
}

function _getiOSDeviceID(ua, spec) {
    // Examples:
    //
    //      Mozilla/5.0 (iPad;   CPU        OS 6_0   like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25
    //      Mozilla/5.0 (iPod;   CPU iPhone OS 5_0_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A405 Safari/7534.48.3
    //      Mozilla/5.0 (iPhone; CPU iPhone OS 6_0   like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25
    //                   ~~~~~~
    //                  device id
    var id = "";
    var ver = parseFloat(spec["OS_VERSION"]);
    var retina = spec["DISPLAY_DPR"] >= 2;
    var longEdge = spec["DISPLAY_LONG"]; // iPhone 4S: 480, iPhone 5: 568
    var candidate = [];

    if ( /iPhone/.test(ua) ) {
        id = "iPhone 6";
        if (!retina) {
            id = "iPhone 3GS";
        } else if (longEdge <= 480) {
            id = ver < 8 ? "iPhone 4" : "iPhone 4S"; // iPhone 4 stopped in iOS 7.
        } else if (longEdge <= 568) {
            id = "iPhone 5";
            candidate = ["iPhone 5", "iPhone 5c", "iPhone 5s"];
        }
    } else if ( /iPad/.test(ua) ) {
        id = "iPad 3";
        candidate = ["iPad 3", "iPad 4", "iPad Air", "iPad mini Retina"];
        if (!retina) {
            id = "iPad 2";
            candidate = ["iPad 2", "iPad mini"];
        }
    } else if ( /iPod/.test(ua) ) {
        id = "iPod touch 5";
        if (longEdge <= 480) {
            id = retina ? "iPod touch 4" : "iPod touch 3";
        }
    }
    spec["ID_CANDIDATE"] = candidate;
    return id;
}

function _getWindowsPhoneDeviceID(ua, spec) {
    // Examples:
    //      Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; HUAWEI; W1-U00   )
    //      Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA;  Lumia 920)
    //                                                                                                             ~~~~~~~~~

    // Is Nokia device.
    if ( /Lumia/.test(ua) ) {
        return "Lumia " + ua.split("Lumia ")[1].split(/[^\w\.]/)[0];
    }

    // Dispatches to Nokia device, if not Nokia device.
    // Because of them.
    //  - http://thenextweb.com/microsoft/2013/11/27/nokia-now-controls-90-windows-phone-8-market-low-end-lumia-520-accounting-35-share/
    //  - http://www.techradar.com/news/phone-and-communications/mobile-phones/nokia-ends-2013-with-92-of-windows-phone-market-1211347
    var ver = parseFloat(spec["OS_VERSION"]);

    if (ver <= 7.5) { // Windows Phone 7.0, 7.5
        return "Lumia 510";
    }
    if (ver <= 8.0) { // Windows Phone 8.0
        return "Lumia 520";
    }
    return "Lumia 630";
}

function _detectBrowser(spec, ua) {
    var browserName    = "";      // browser name: "Chrome", "Chromium", "IE", "Firefox", "Safari", "AndroidBrowser"
    var browserEngine  = "";      // browser engine: "WebKit", "Blink", "Trident":
    var browserVersion = "0.0.0"; // "Major.Minor.Patch"

    if ( /Chrome/.test(ua) ) { // Chrome and Opera.next
        // Chrome for Android
        //      Mozilla/5.0 (Linux; Android 4.2;          Nexus 7 Build/JOP40C)  AppleWebKit/535.19 (KHTML, like Gecko)             Chrome/18.0.1025.166        Safari/535.19
        //      Mozilla/5.0 (Linux; Android 4.1.1;        HTL21   Build/JRO03C)  AppleWebKit/537.36 (KHTML, like Gecko)             Chrome/33.0.1750.136 Mobile Safari/537.36
        //
        // GALAXY S4 (S Browser)
        //      Mozilla/5.0 (Linux; Android 4.2.2; ja-jp; SC-04E  Build/JDQ39)   AppleWebKit/535.19 (KHTML, like Gecko) Version/1.0 Chrome/18.0.1025.308 Mobile Safari/535.19
        //
        // Android Chrome WebView
        //      Mozilla/5.0 (Linux; Android 4.4;          Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0      Mobile Safari/537.36
        //
        browserName    = "Chrome";
        browserEngine  = "Blink"; // Chrome version 28+, Opera version 15+
        browserVersion = _getVersion("Chrome/", ua);
    } else if ( /Firefox/.test(ua) ) {
        browserName    = "Firefox";
        browserEngine  = "Gecko";
        browserVersion = _getVersion("Firefox/", ua);
    } else if ( /Android/.test(ua) ) {
        browserName    = "Browser"; // Android default browser
        browserEngine  = "WebKit";
        browserVersion = _getVersion(/Silk/.test(ua) ? "Silk/" : "Version/", ua);
    } else if ( /MSIE|Trident/.test(ua) ) {
        browserName    = "IE";
        browserEngine  = "Trident";
        browserVersion = /IEMobile/.test(ua) ? _getVersion("IEMobile/", ua)
                       : /MSIE/.test(ua)     ? _getVersion("MSIE ", ua) // IE 10.
                                             : _getVersion("rv:", ua);  // IE 11+
    } else if ( /Safari/.test(ua) ) {
        browserName    = "Safari";
        browserEngine  = "WebKit";
        browserVersion = _getVersion("Version/", ua);
    } else if ( /AppleWebKit/.test(ua) ) {
        browserName    = "WebKit";
        browserEngine  = "WebKit";
    }

    spec["BROWSER_NAME"]    = browserName;
    spec["BROWSER_ENGINE"]  = browserEngine;
    spec["BROWSER_VERSION"] = browserVersion;
}

function _getVersion(token, ua) {
    return _normalizeVersionString( ua.split(token)[1].trim().split(/[^\w\.]/)[0] );
}

function _normalizeVersionString(version) { // @arg String - "Major.Minor.Patch"
                                            // @ret String - "Major.Minor.Patch"
    var ary = version.split(/[\._]/); // "1_2_3" -> ["1", "2", "3"]
                                      // "1.2.3" -> ["1", "2", "3"]
    return ( parseInt(ary[0], 10) || 0 ) + "." +
           ( parseInt(ary[1], 10) || 0 ) + "." +
           ( parseInt(ary[2], 10) || 0 );
}


// Device list: https://www.handsetdetection.com/properties/vendormodel/
Spec["catalog"] = {
    "device": {
        //                   [0]       [1]        [2] [3]  [4]  [5]   [6]  [7]  [8]  [9]   [10]  [11]
        //                   BRAND     SOC        OS_VER  SHORT,LONG  PPI  DPR  RAM TOUCH  SIZE  FEATURE
        // --- iOS ---
        "iPhone 5s":        [APPLE,    A7,        700,IVER, 640,1136, 326,  2, 1024,  5,     4,  FE_G3L_],
        "iPhone 5c":        [APPLE,    A6,        700,IVER, 640,1136, 326,  2, 1024,  5,     4,  FE_G3L_],
        "iPhone 5":         [APPLE,    A6,        600,IVER, 640,1136, 326,  2, 1024,  5,     4,  FE_G3L_],
        "iPhone 4S":        [APPLE,    A5,        511,IVER, 640,960,  326,  2,  512,  5,   3.5,  FE_G3__],
        "iPhone 4":         [APPLE,    A4,        400,712,  640,960,  326,  2,  512,  5,   3.5,  FE_G3__],
        "iPhone 3GS":       [APPLE,    S5PC100,   300,615,  320,480,  163,  1,  256,  5,   3.5,  FE_G3__],
        "iPhone 3G":        [APPLE,    S5L8900,   200,421,  320,480,  163,  1,  128,  5,   3.5,  FE_G3__],
        "iPad Air":         [APPLE,    A7,        700,IVER,1536,2048, 264,  2, 1024, 10,   9.7,  FE_G3L_],
        "iPad 4":           [APPLE,    A6X,       600,IVER,1536,2048, 264,  2, 1024, 10,   9.7,  FE_G3L_],
        "iPad 3":           [APPLE,    A5X,       510,IVER,1536,2048, 264,  2, 1024, 10,   9.7,  FE_G3__],
        "iPad 2":           [APPLE,    A5,        430,IVER, 768,1024, 132,  1,  512, 10,   9.7,  FE_G3__],
        "iPad 1":           [APPLE,    A4,        320,615,  768,1024, 132,  1,  256, 10,   9.7,  FE_G___],
        "iPad mini Retina": [APPLE,    A7,        700,IVER,1536,2048, 326,  2, 1024, 10,   7.9,  FE_G3L_],
        "iPad mini":        [APPLE,    A5,        600,IVER, 768,1024, 132,  1,  512, 10,   7.9,  FE_G3__],
        "iPod touch 5":     [APPLE,    A5,        600,IVER, 640,1136, 326,  2,  512,  5,     4,  0      ],
        "iPod touch 4":     [APPLE,    A4,        410,615,  640,960,  326,  2,  256,  5,     4,  0      ],
      //"iPod touch 3":     [APPLE,    CortexA8,  310,511,  640,960,  326,  2,  256,  5,   3.5,  0      ], // iPod touch 32/64GB Model
        "iPod touch 3":     [APPLE,    S5PC100,   310,511,  640,960,  326,  2,  128,  5,   3.5,  0      ], // iPod touch 8GB Model

        //                   [0]       [1]        [2] [3]  [4]  [5]   [6]  [7]  [8]  [9]   [10]  [11]
        //                   BRAND     SOC        OS_VER  SHORT,LONG  PPI  DPR  RAM TOUCH  SIZE  FEATURE
        // --- Android global model ---
        "C6806":            [SONY,     MSM8974AA, 422,AVER,1080,1920, 342,  0, 2048,  5,   6.4,  FE_G3LN], // Xperia Z Ultra Google Edition
        "HTC6500LVW":       [HTC,      APQ8064T,  422,AVER,1080,1920, 468,  0, 2048, 10,   4.7,  FE_G3LN], // HTC One Google Play Edition
        "GT-I9505G":        [SAMSUNG,  APQ8064AB, 422,AVER,1080,1920, 441,  0, 2048,  5,     5,  FE_G3LN], // Galaxy S4 Google Play Edition
        "XT1058":           [OTHER,    MSM8960T,  422,AVER, 720,1280,   0,  0, 2048,  5,   4.7,  FE_G3LN], // MOTOROLA Moto X
        "Nexus 10":         [GOOGLE,   EXYNOS5250,420,AVER,1600,2560, 300,  2, 2048, 10,    10,  FE_G__N],
    //  "Nexus 9":          [GOOGLE,   K1,        443,AVER,1440,2048, 281,  3, 2048, 10,   8.9,  FE_G3LN],
        "Nexus 7 (2013)":   [GOOGLE,   APQ8064,   430,AVER,1200,1920, 323,  2, 2048,  5,     7,  FE_G3LN],
        "Nexus 7":          [GOOGLE,   T30L,      411,AVER, 800,1280, 216,1.33,1024,  5,     7,  FE_G3LN],
        "Nexus 5":          [GOOGLE,   MSM8974AA, 440,AVER,1080,1920, 445,  3, 2048,  5,     5,  FE_G3LN],
        "Nexus 4":          [GOOGLE,   APQ8064,   420,AVER, 768,1280, 318,  2, 2048,  5,   4.7,  FE_G3LN],
        "Galaxy Nexus":     [GOOGLE,   OMAP4460,  400,422,  720,1280, 316,  2, 1024,  2,   4.7,  FE_G3LN], // LTE (partial)
        "Nexus S":          [GOOGLE,   S5PC110,   232,410,  480,800,  233,1.5,  512,  5,     4,  FE_G3_N],
        "Nexus One":        [GOOGLE,   QSD8250,   210,236,  480,800,  252,1.5,  512,  2,   3.7,  FE_G3__],
        "SGP412JP":         [SONY,     APQ8074,   420,420, 1080,1920, 342,  0, 2048,  5,   6.4,  FE_G__N], // Xperia Z Ultra WiFi Edition
        // --- Android maker edition ---
        "NW-Z1000Series":   [SONY,     AP20H,     230,404,  480,800,    0,  0,  512,  5,   4.3,  0      ], // NW-Z1050, NW-Z1060, NW-Z1070
    //  "Sony Tablet S":
    //  "Sony Tablet P":
    //  "Xperia Z Ultra":
    //  "Xperia Tablet S":
    //  "Xperia Tablet Z":
    //  "Xperia Tablet Z2":
        "Kobo Arc 7":       [OTHER,    MTK8125,   422,422,  600,1024,   0,  0, 1024,  5,     7,  0      ], // RAKUTEN Kobo Arc 7
        "MeMo Pad 7":       [OTHER,    Z3745,     442,442,  800,1280,   0,  0, 1024, 10,     7,  FE_G___], // ASUS MeMo Pad 7
        "MeMo Pad HD7":     [OTHER,    MTK8125,   421,421,  800,1280,   0,  0, 1024, 10,     7,  FE_G___], // ASUS MeMo Pad HD7
        "MeMo Pad FHD10":   [OTHER,    Z2560,     422,422, 1200,1920,   0,  0, 2048, 10,  10.1,  FE_G___], // ASUS MeMo Pad FHD10, FE_DIRECT
        "FXC5A":            [OTHER,    MT6582M,   442,442,  540,960,    0,  0,  512,  4,     5,  FE_G3__], // JENESIS AEON geanee
    //  "Mi Pad":           [XIAOMI,   K1,        ---,---, 1536,2048,   0,  0, 2048, 10,   7.9,  0      ], // Xiaomi Mi Pad
    //  "Redmi":            [XIAOMI,   MT6592,    ---,---,    0,0,      0,  0,    0, 10,   5.5,  0      ], // Xiaomi Redmi

//{@androidjp
        // --- Android carrier edition ---
        //                   [0]       [1]        [2] [3]  [4]  [5]   [6]  [7]  [8]  [9]   [10]  [11]
        //                   BRAND     SOC        OS_VER  SHORT,LONG  PPI  DPR  RAM TOUCH  SIZE  FEATURE
        // --- docomo ---
        // http://spec.nttdocomo.co.jp/spmss/
        // 2014 summer
        "SC-04F":           [SAMSUNG,  MSM8974AC, 442,442, 1080,1920, 480,  3, 2048,  5,   5.1,  FE_G3LN], // GALAXY S5, S Browser
        "SO-03F":           [SONY,     MSM8974AB, 442,442, 1080,1920, 480,  3, 3072,  5,   5.2,  FE_G3LN], // Xperia Z2 (Sirius)
        "SO-04F":           [SONY,     MSM8974AA, 442,442,  720,1280, 320,  2, 2048,  5,   4.3,  FE_G3LN], // Xperia A2
        "SO-05F":           [SONY,     MSM8974AB, 442,442, 1200,1920, 320,  2,    0, 10,  10.1,  FE_G3LN], // Xperia Z2 Tablet
        "SH-04F":           [SHARP,    MSM8974AB, 442,442, 1080,1920, 480,  3,    0,  5,   5.4,  FE_G3LN], // AQUOS ZETA
        "SH-05F":           [SHARP,    MSM8974AA, 420,420, 1080,1920, 480,  3,    0,  5,   5.0,  FE_G3LN], // Disney Mobile on docomo SH-05F
        "SH-06F":           [SHARP,    MSM8974AB, 442,442, 1200,1920, 320,  2,    0, 10,   7.0,  FE_G3L_], // AQUOS PAD
        "F-05F":            [FUJITSU,  MSM8974AB, 442,442, 1080,1920, 480,  3,    0,  5,   5.0,  FE_G3LN], // ARROWS NX
        "F-06F":            [FUJITSU,  MSM8926,   442,442,  720,1280, 320,  2,    0,  5,   4.5,  FE_G3LN], // for Silver
        // 2013 winter
        "L-01F":            [LG,       MSM8974AA, 422,422, 1080,1776, 480,  3, 2048,  5,   5.2,  FE_G3LN], // G2 L-01F
        "SC-01F":           [SAMSUNG,  MSM8974AA, 430,433, 1080,1920, 480,  3, 2048,  5,   5.7,  FE_G3LN], // GALAXY Note 3, S Browser
        "SC-02F":           [SAMSUNG,  MSM8974AA, 430,430, 1080,1920, 480,  3, 2048,  5,     5,  FE_G3LN], // GALAXY J SC-02F, S Browser
        "SH-01F":           [SHARP,    MSM8974AA, 422,422, 1080,1776, 480,  3, 2048,  5,     5,  FE_G3LN], // AQUOS PHONE ZETA SH-01F
        "SH-01FDQ":         [SHARP,    MSM8974AA, 422,422, 1080,1776, 480,  3, 2048,  5,     5,  FE_G3LN], // SH-01F DRAGON QUEST
        "SH-02F":           [SHARP,    MSM8974AA, 422,422, 1080,1920, 480,  3, 2048,  5,   4.5,  FE_G3LN], // AQUOS PHONE EX SH-02F
        "SH-03F":           [SHARP,    MSM8960,   404,404,  540,888,  240,1.5,  680,  5,   4.1,  FE_G3L_], // FE_NO_STORE // JUNIOR 2 (no Google Play)
        "SO-01F":           [SONY,     MSM8974AA, 422,422, 1080,1776, 480,  3, 2048,  5,     5,  FE_G3LN], // Xperia Z1
        "SO-02F":           [SONY,     MSM8974AA, 422,422,  720,1184, 320,  2, 2048,  5,   4.3,  FE_G3LN], // Xperia Z1 f SO-02F
        "F-01F":            [FUJITSU,  MSM8974AA, 422,422, 1080,1776, 480,  3, 2048,  5,     5,  FE_G3LN], // ARROWS NX F-01F
        "F-02F":            [FUJITSU,  MSM8974AA, 422,422, 1504,2560, 320,  2, 2048,  5,  10.1,  FE_G3LN], // ARROWS Tab F-02F
        "F-03F":            [FUJITSU,  MSM8974AA, 422,422,  720,1184, 320,  2, 2048,  5,   4.7,  FE_G3LN], // Disney Mobile on docomo F-03F
        "F-04F":            [FUJITSU,  APQ8064T,  422,422,  540,888,  240,1.5, 2048,  5,   4.3,  FE_G3__], // FE_NO_STORE // (no Google Play)
        // 2013 summer
        "L-05E":            [LG,       APQ8064T,  422,422,  720,1280, 320,  2, 2048,  5,   4.5,  FE_G3LN],
        "N-06E":            [OTHER,    APQ8064T,  422,422,  720,1184, 320,  2, 2048,  5,   4.7,  FE_G3LN], // NEC_CASIO
        "SC-04E":           [SAMSUNG,  APQ8064T,  422,430, 1080,1920, 480,  3, 2048,  5,     5,  FE_G3LN], // Galaxy S4, S Browser
        "SO-04E":           [SONY,     APQ8064,   412,422,  720,1184, 320,  2, 2048,  5,   4.6,  FE_G3LN], // Xperia A SO-04E
        "SO-04EM":          [SONY,     APQ8064,   422,422,  720,1184, 320,  2, 2048,  5,   4.6,  FE_G3LN], // Xperia feat. HATSUNE MIKU SO-04E
        "SH-06E":           [SHARP,    APQ8064T,  422,422, 1080,1920, 480,  3, 2048,  5,   4.8,  FE_G3LN], // 
        "SH-07E":           [SHARP,    APQ8064T,  422,422,  720,1280, 320,  2, 2048,  2,   4.3,  FE_G3LN],
        "SH-08E":           [SHARP,    APQ8064T,  422,422, 1200,1824, 320,  2, 2048,  5,     7,  FE_G3LN],
        "P-03E":            [OTHER,    APQ8064T,  422,422, 1080,1920, 480,  3, 2048,  5,   4.7,  FE_G3LN], // PANASONIC
        "F-06E":            [FUJITSU,  APQ8064T,  422,422, 1080,1776, 480,  3, 2048,  5,   5.2,  FE_G3LN],
        "F-07E":            [FUJITSU,  APQ8064T,  422,422,  720,1184, 320,  2, 2048,  5,   4.7,  FE_G3LN],
        "F-08E":            [FUJITSU,  APQ8064T,  422,422,  540,867,  240,1.5, 2048,  5,   4.3,  FE_G3L_],
        "F-09E":            [FUJITSU,  APQ8064T,  422,422,  540,888,  240,1.5, 2048,  5,   4.3,  FE_G3L_],
        // 2012 Q3
        "L-01E":            [LG,       APQ8064,   404,412,  720,1280, 320,  0, 2048,  5,   4.7,  FE_G3L_],
        "L-02E":            [LG,       MSM8960,   404,412,  720,1280, 320,  0, 1024,  5,   4.5,  FE_G3L_],
        "L-04E":            [LG,       APQ8064T,  412,412, 1080,1920, 480,  0, 2048,  5,     5,  FE_G3LN],
        "N-02E":            [OTHER,    MSM8960,   404,412,  480,800,  240,  0, 1024,  5,     4,  FE_G3L_], // NEC_CASIO
        "N-03E":            [OTHER,    APQ8064,   404,412,  720,1280, 320,  0, 2048,  5,   4.7,  FE_G3L_], // NEC_CASIO
        "N-04E":            [OTHER,    APQ8064,   412,412,  720,1280, 320,  0, 2048,  5,   4.7,  FE_G3L_], // NEC_CASIO
        "N-05E":            [OTHER,    MSM8960,   412,412,  540,960,  240,  0, 1024,  5,   4.3,  FE_G3L_], // NEC_CASIO
        "SC-01E":           [SAMSUNG,  APQ8060,   404,404,  800,1280, 160,  0, 1024,  5,   7.7,  FE_G3L_],
        "SC-02E":           [SAMSUNG,  EXYNOS4412,411,430,  720,1280, 320,  0, 2048,  5,   5.5,  FE_G3L_],
        "SC-03E":           [SAMSUNG,  EXYNOS4412,411,430,  720,1280, 320,  0, 2048,  5,   4.8,  FE_G3L_],
        "SH-01E":           [SHARP,    MSM8960,   404,412,  540,888,  240,  0, 1024,  2,   4.1,  FE_G3L_],
        "SH-01EVW":         [SHARP,    MSM8960,   404,412,  540,888,  240,  0, 1024,  2,   4.1,  FE_G3L_],
        "SH-02E":           [SHARP,    APQ8064,   404,412,  720,1280, 320,  0, 2048,  2,   4.9,  FE_G3LN],
        "SH-04E":           [SHARP,    APQ8064,   412,412,  720,1184, 320,  0, 2048,  5,   4.5,  FE_G3LN],
        "SH-05E":           [SHARP,    MSM8960,   404,404,  540,960,  240,  0, 1024,  2,   4.1,  FE_G3L_], // FE_NO_STORE // JUNIOR (no Google Play, no WiFi)
        "SO-01E":           [SONY,     MSM8960,   404,412,  720,1184, 320,  0, 1024,  5,   4.3,  FE_G3LN],
        "SO-02E":           [SONY,     APQ8064,   412,422,  720,1184, 320,  3, 1024,  5,     5,  FE_G3LN], // Xperia Z
        "SO-03E":           [SONY,     APQ8064,   412,412, 1128,1920, 240,  0, 2048,  5,  10.1,  FE_G3LN],
        "P-02E":            [OTHER,    APQ8064,   412,412, 1080,1920, 480,  0, 2048,  5,     5,  FE_G3LN], // PANASONIC
        "F-02E":            [FUJITSU,  AP37,      412,412, 1080,1920, 480,  0, 2048,  5,     5,  FE_G3LN],
        "F-03E":            [FUJITSU,  MSM8960,   404,412,  540,960,  240,  0, 1024,  5,     4,  FE_G3LN],
        "F-04E":            [FUJITSU,  AP33,      404,422,  720,1280, 320,  0, 2048,  5,   4.7,  FE_G3LN],
        "F-05E":            [FUJITSU,  AP37,      404,412, 1200,1920, 240,  0, 2048,  5,  10.1,  FE_G3LN],
        "HW-01E":           [OTHER,    MSM8960,   404,404,  720,1280, 320,  0, 1024,  5,   4.5,  FE_G3L_], // HUAWEI
        "HW-03E":           [OTHER,    K3V2,      412,412,  720,1280, 320,  0, 2048,  5,   4.7,  FE_G3L_], // HUAWEI
        "dtab01":           [OTHER,    K3V2,      412,412,  800,1280, 160,  0, 1024,  5,  10.1,  FE_G3__], // HUAWEI dtab
        // 2012 Q1
        "L-05D":            [LG,       MSM8960,   404,412,  480,800,  240,1.5, 1024,  5,     4,  FE_G3L_], // Optimus it
        "L-06D":            [LG,       APQ8060,   404,404,  768,1024, 320,  0, 1024,  5,     5,  FE_G3L_],
        "L-06DJOJO":        [LG,       APQ8060,   404,404,  768,1024, 320,  0, 1024,  5,     5,  FE_G3L_],
        "N-07D":            [OTHER,    MSM8960,   404,412,  720,1280, 342,  0, 1024,  5,   4.3,  FE_G3L_], // NEC_CASIO
        "N-08D":            [OTHER,    MSM8960,   404,404,  800,1280, 213,  0, 1024,  5,     7,  FE_G3L_], // NEC_CASIO
        "SC-06D":           [SAMSUNG,  MSM8960,   404,412,  720,1280, 320,  2, 2048,  5,   4.8,  FE_G3L_], // Galaxy S III
        "SH-06D":           [SHARP,    OMAP4460,  235,404,  720,1280, 320,  0, 1024,  5,   4.5,  FE_G3__],
        "SH-06DNERV":       [SHARP,    OMAP4460,  235,404,  720,1280, 320,  0, 1024,  2,   4.5,  FE_G3__],
        "SH-07D":           [SHARP,    MSM8255,   404,404,  480,854,  240,  0, 1024,  2,   3.4,  FE_G3__],
        "SH-09D":           [SHARP,    MSM8960,   404,412,  720,1280, 312,  0, 1024,  2,   4.7,  FE_G3L_],
        "SH-10D":           [SHARP,    MSM8960,   404,412,  720,1280, 320,  0, 1024,  2,   4.5,  FE_G3L_],
        "SO-04D":           [SONY,     MSM8960,   404,412,  720,1184, 320,  0, 1024,  5,   4.6,  FE_G3L_],
        "SO-05D":           [SONY,     MSM8960,   404,412,  540,888,  240,1.5, 1024,  5,   3.7,  FE_G3L_], // Xperia SX
        "P-06D":            [OTHER,    OMAP4460,  404,404,  720,1280, 320,  0, 1024,  5,   4.6,  FE_G3__], // PANASONIC
        "P-07D":            [OTHER,    MSM8960,   404,404,  720,1280, 320,  0, 1024,  5,     5,  FE_G3L_], // PANASONIC
        "P-08D":            [OTHER,    OMAP4460,  404,404,  800,1280, 160,  0, 1024,  5,  10.1,  FE_G3__], // PANASONIC
        "F-09D":            [FUJITSU,  MSM8255,   403,403,  480,800,  240,  0, 1024,  2,   3.7,  FE_G3__],
        "F-10D":            [FUJITSU,  AP33,      403,422,  720,1280, 323,  2, 1024,  5,   4.6,  FE_G3L_], // ARROWS X
        "F-11D":            [FUJITSU,  MSM8255,   403,422,  480,800,  240,  0, 1024,  5,   3.7,  FE_G3__],
        "F-12D":            [FUJITSU,  MSM8255,   403,403,  480,800,  235,  0, 1024,  5,   4.0,  FE_G3__],
        "T-02D":            [FUJITSU,  MSM8960,   404,412,  540,960,  257,  0, 1024,  5,   4.3,  FE_G3L_],
        // 2011 Q3
        "L-01D":            [LG,       APQ8060,   235,404,  720,1280, 320,  0, 1024,  5,   4.5,  FE_G3L_],
        "L-02D":            [LG,       OMAP4430,  237,404,  480,800,  240,  0, 1024,  5,   4.3,  FE_G3__],
        "N-01D":            [OTHER,    MSM8255T,  235,235,  480,800,  235,  0,  512,  5,     4,  FE_G3__], // NEC_CASIO
        "N-04D":            [OTHER,    APQ8060,   236,404,  720,1280, 342,  0, 1024,  5,   4.3,  FE_G3L_], // NEC_CASIO
        "N-05D":            [OTHER,    MSM8260,   236,404,  720,1280, 320,  0, 1024,  5,   4.3,  FE_G3__], // NEC_CASIO
        "N-06D":            [OTHER,    APQ8060,   236,404,  800,1280, 213,  0, 1024,  5,     7,  FE_G3L_], // NEC_CASIO
        "SC-01D":           [SAMSUNG,  APQ8060,   320,404,  800,1200, 160,  0, 1024,  5,  10.1,  FE_G3L_],
        "SC-02D":           [SAMSUNG,  EXYNOS4210,320,404,  600,1024, 160,  0, 1024,  5,     7,  FE_G3__],
        "SC-03D":           [SAMSUNG,  APQ8060,   236,404,  480,800,  240,1.5, 1024,  5,   4.5,  FE_G3LN], // GALAXY S II LTE
        "SC-04D":           [SAMSUNG,  OMAP4460,  401,422,  720,1280, 320,  2, 1024,  5,   4.7,  FE_G3_N], // Galaxy Nexus
        "SC-05D":           [SAMSUNG,  APQ8060,   236,412,  800,1280, 320,  0, 1024,  5,   5.3,  FE_G3LN],
        "SH-01D":           [SHARP,    OMAP4430,  235,404,  720,1280, 328,  0, 1024,  2,   4.5,  FE_G3__],
        "SH-02D":           [SHARP,    MSM8255,   235,235,  540,960,  300,  0,  512,  2,   3.7,  FE_G3__],
        "SH-04D":           [SHARP,    MSM8255,   234,234,  540,960,  300,  0,  512,  2,   3.7,  FE_G3__],
        "SO-01D":           [SONY,     MSM8255,   234,234,  480,854,  240,1.5,  512,  2,     4,  FE_G3__], // Xperia Play
        "SO-02D":           [SONY,     MSM8260,   237,404,  720,1280, 320,  0, 1024,  5,   4.3,  FE_G3__],
        "SO-03D":           [SONY,     MSM8260,   237,404,  720,1280, 320,  0, 1024,  5,   4.3,  FE_G3__],
        "P-01D":            [OTHER,    MSM8255,   234,234,  480,800,  240,1.5,  512,  2,   3.2,  FE_G3__], // PANASONIC
        "P-02D":            [OTHER,    OMAP4430,  235,404,  540,960,  240,  0, 1024,  2,     4,  FE_G3__], // PANASONIC
        "P-04D":            [OTHER,    OMAP4430,  235,404,  540,960,  257,  0, 1024,  5,   4.3,  FE_G3__], // PANASONIC
        "P-05D":            [OTHER,    OMAP4430,  235,404,  540,960,  257,  0, 1024,  5,   4.3,  FE_G3__], // PANASONIC
        "F-01D":            [FUJITSU,  OMAP4430,  320,403,  800,1280, 160,  0, 1024,  5,  10.1,  FE_G3L_],
        "F-03D":            [FUJITSU,  MSM8255,   235,235,  480,800,  240,  0,  512,  2,   3.7,  FE_G3__],
        "F-05D":            [FUJITSU,  OMAP4430,  235,403,  720,1280, 342,  0, 1024,  2,   4.3,  FE_G3L_],
        "F-07D":            [FUJITSU,  MSM8255,   235,235,  480,800,  235,  0,  512,  5,     4,  FE_G3__],
        "F-08D":            [FUJITSU,  OMAP4430,  235,403,  720,1280, 342,  0, 1024,  2,   4.3,  FE_G3__],
        "T-01D":            [FUJITSU,  OMAP4430,  235,403,  720,1280, 320,  0, 1024,  2,   4.3,  FE_G3__],
        // 2011 Q1
        "SC-02C":           [SAMSUNG,  EXYNOS4210,403,403,  480,800,  240,  0, 1024,  5,   4.3,  FE_G3__], // Galaxy S II
        "SO-01C":           [SONY,     MSM8255,   232,234,  480,854,    0,1.5,  512,  2,   4.2,  FE_G3__], // Xperia arc
        "SO-02C":           [SONY,     MSM8255,   233,234,  480,854,    0,  0,  512,  2,   4.2,  FE_G3__], // Xperia acro
        "SO-03C":           [SONY,     MSM8255,   234,234,  480,854,    0,  0,  512,  2,   3.3,  FE_G3__], // Xperia acro
        "SH-12C":           [SHARP,    MSM8255T,  233,233,  540,960,    0,  0,  512,  2,   4.2,  FE_G3__],
        "SH-13C":           [SHARP,    MSM8255,   234,234,  540,960,    0,  0,  512,  2,   3.7,  FE_G3__],
        "N-04C":            [OTHER,    MSM7230,   220,233,  480,854,    0,  0,  512,  2,     4,  FE_G3__], // NEC_CASIO
        "N-06C":            [OTHER,    MSM8255,   230,230,  480,854,    0,  0,  512,  2,     4,  FE_G3__], // NEC_CASIO
        "P-07C":            [OTHER,    OMAP3630,  230,230,  480,800,    0,  0,  512,  2,   4.3,  FE_G3__], // PANASONIC
        "F-12C":            [FUJITSU,  MSM8255,   230,230,  480,800,    0,  0,  512,  2,   3.7,  FE_G3__],
        "L-04C":            [LG,       MSM7227,   220,230,  320,480,    0,  0,  512,  2,   3.2,  FE_G3__],
        "L-06C":            [LG,       T20,       300,310,  768,1280,   0,  0, 1024,  2,   8.9,  FE_G3__],
        "L-07C":            [LG,       OMAP3630,  233,233,  480,800,    0,  0,  512,  2,     4,  FE_G3__],
        "T-01C":            [FUJITSU,  QSD8250,   211,222,  480,854,    0,1.5,    0,  2,     4,  FE_G3__], // REGZA Phone
        "SH-03C":           [SONY,     QSD8250,   211,222,  480,800,    0,  0,    0,  2,   3.8,  FE_G3__],
        "SC-01C":           [SAMSUNG,  S5PC110,   220,236,  600,1024,   0,1.5,    0,  2,     7,  FE_G3__], // GALAXY Tab
        "SC-02B":           [SAMSUNG,  S5PC110,   220,236,  480,800,    0,1.5,    0,  2,     4,  FE_G3__], // GALAXY S
        "SH-10B":           [SHARP,    QSD8250,   160,160,  480,960,    0,  1,    0,  2,     5,  FE_G3__], // LYNX
        "SO-01B":           [SONY,     QSD8250,   160,211,  480,854,    0,1.5,  384,  1,     4,  FE_G3__], // Xperia
        // --- au ---
        // http://www.au.kddi.com/developer/android/
        // 2014 summer
        //                   [0]       [1]        [2] [3]  [4]  [5]   [6]  [7]  [8]  [9]   [10]  [11]
        //                   BRAND     SOC        OS_VER  SHORT,LONG  PPI  DPR  RAM TOUCH  SIZE  FEATURE
        "LGL24":            [LG,       MSM8974AB, 442,442, 1440,2560, 538,  3, 2048, 10,   5.5,  FE_G3LN], // isai FL
        "SOL25":            [SONY,     MSM8974AB, 442,442, 1080,1920,   0,  3, 3072, 10,   5.0,  FE_G3LN], // Xperia ZL2 SOL25
        "SCL23":            [SAMSUNG,  MSM8974AC, 442,442, 1080,1920,   0,  3, 2048, 10,   5.1,  FE_G3LN], // Galaxy S5, S Browser
        "SHL25":            [SHARP,    MSM8974AB, 442,442, 1080,1920, 428,  0, 2048, 10,   5.2,  FE_G3LN], // AQUOS PHONE SERIE SHL25
        "URBANO L03":       [OTHER,    MSM8974AB, 442,442, 1080,1920,   0,  0, 2048, 10,   5.0,  FE_G3LN], // KYOCERA URBANO L03
        "TORQUE":           [OTHER,    MSM8928,   442,442,  720,1280,   0,  0, 2048, 10,   4.5,  FE_G3LN], // KYOCERA TORQUE
        "SOT21":            [SONY,     MSM8974AB, 442,442, 1080,1920, 224,  3, 3072, 10,  10.1,  FE_G3LN], // Xperia Z2 Tablet SOT21
        "MeMo Pad 8":       [OTHER,    Z3580,     442,442, 1200,1920, 283,  0, 2048, 10,     8,  FE_G3LN], // ASUS MeMo Pad 8
        // 2014 spring
        "SHT22":            [SHARP,    MSM8974AA, 422,422, 1200,1920, 322,  0, 2048, 10,     7,  FE_G3LN], // AQUOS PAD SHT22
        "SHL24":            [SHARP,    MSM8974AA, 422,422, 1080,1920, 486,  0, 2048, 10,   4.5,  FE_G3LN], // AQUOS PHONE SERIE mini SHL24
        "URBANO L02":       [OTHER,    MSM8960,   422,422,  720,1280, 314,  0, 2048, 10,   4.7,  FE_G3LN], // KYOCERA URBANO L02
        "LGL23":            [LG,       MSM8974AA, 422,422,  720,1280, 246,  0, 2048, 10,     6,  FE_G3LN], // G Flex LGL23
        "SOL24":            [SONY,     MSM8974AA, 422,422, 1080,1920, 341,  0, 2048, 10,   6.4,  FE_G3LN], // Xperia Z Ultra SOL24
        // 2013 winter
        "FJT21":            [FUJITSU,  MSM8974AA, 422,422, 1600,2560, 300,  0, 2048, 10,  10.1,  FE_G3LN],
        "SOL23":            [SONY,     MSM8974AA, 422,422, 1080,1920, 442,  3, 2048, 10,     5,  FE_G3LN], // Xperia Z1
        "SCL22":            [SAMSUNG,  MSM8974AA, 430,430, 1080,1920, 386,  0, 3072, 10,   5.7,  FE_G3LN], // S Browser
        "KYL22":            [OTHER,    MSM8974AA, 422,422, 1080,1920, 443,  0, 2048,  5,     5,  FE_G3LN], // KYOCERA
        "LGL22":            [LG,       MSM8974AA, 422,422, 1080,1920, 422,  0, 2048, 10,   5.2,  FE_G3LN], // isai
        "SHL23":            [SHARP,    MSM8974AA, 422,422, 1080,1920, 460,  0, 2048,  5,   4.8,  FE_G3LN],
        "FJL22":            [FUJITSU,  MSM8974AA, 422,422, 1080,1920, 444,  0, 2048, 10,     5,  FE_G3LN],
        // 2013 spring and summer
        "SHL22":            [SHARP,    APQ8064T,  422,422,  720,1280, 302,  0, 2048,  5,   4.9,  FE_G3LN],
        "KYY21":            [OTHER,    MSM8960,   422,422,  720,1280, 314,  0, 2048,  5,   4.7,  FE_G3LN], // KYOCERA URBANO L01
        "HTL22":            [HTC,      APQ8064T,  412,422, 1080,1920, 468,  0, 2048, 10,   4.7,  FE_G3LN], // HTC J One
        "SOL22":            [SONY,     APQ8064,   412,422, 1080,1920, 443,  0, 2048, 10,     5,  FE_G3LN], // Xperia UL
        "HTX21":            [HTC,      APQ8064,   411,411,  720,1280, 314,  0, 1024, 10,   4.7,  FE_G3LN], // INFOBAR A02
        // 2012 fall and winter
        "SHT21":            [SHARP,    MSM8960,   404,412,  800,1280, 216,  0, 1024,  2,     7,  FE_G3LN], // AQUOS PAD
        "HTL21":            [HTC,      APQ8064,   411,411, 1080,1920, 444,  3, 2048, 10,     5,  FE_G3LN], // HTC J Butterfly
        "SCL21":            [SAMSUNG,  MSM8960,   404,412,  720,1280, 306,  0, 2048, 10,   4.8,  FE_G3L_], // GALAXY SIII Progre
        "CAL21":            [OTHER,    MSM8960,   404,404,  480,800,  236,  0, 1024,  5,     4,  FE_G3L_], // NEC_CASIO G'zOne TYPE-L
        "SHL21":            [SHARP,    MSM8960,   404,412,  720,1280, 309,  0, 1024,  2,   4.7,  FE_G3L_], // AUOS PHONE SERIE
        "KYL21":            [OTHER,    MSM8960,   404,404,  720,1280, 314,  0, 1024,  5,   4.7,  FE_G3L_], // KYOCERA DIGNO S
        "FJL21":            [FUJITSU,  MSM8960,   404,404,  720,1280, 342,  2, 1024, 10,   4.3,  FE_G3L_], // ARROWS ef
        "SOL21":            [SONY,     MSM8960,   404,412,  720,1280, 345,  0, 1024, 10,   4.3,  FE_G3L_], // Xperia VL
        "LGL21":            [LG,       APQ8064,   404,404,  720,1280, 315,  0, 2048, 10,   4.7,  FE_G3L_], // Optimus G
        "PTL21":            [OTHER,    MSM8960,   404,412,  720,1280, 342,  0, 1024,  5,   4.3,  FE_G3L_], // PANTECH VEGA
        // 2012 summer
        "ISW13F":           [FUJITSU,  AP33,      403,403,  720,1280, 322,  0, 1024,  3,   4.6,  FE_G3__], // ARROWS Z ISW13F
        "IS17SH":           [SHARP,    MSM8655,   404,404,  540,960,  240,  0, 1024,  2,   4.2,  FE_G3__], // AQUOS PHONE CL
        "IS15SH":           [SHARP,    MSM8655,   404,404,  540,960,  298,  0, 1024,  2,   3.7,  FE_G3__], // AQUOS PHONE SL
        "ISW16SH":          [SHARP,    MSM8660A,  404,404,  720,1280, 318,  2, 1024,  2,   4.6,  FE_G3__], // AQUOS PHONE SERIE
        "URBANO PROGRESSO": [OTHER,    MSM8655,   403,403,  480,800,  235,  0, 1024,  5,     4,  FE_G3__], // KYOCERA
        "ISW13HT":          [HTC,      MSM8660A,  403,403,  540,960,  204,  0, 1024,  4,   4.3,  FE_G3__], // HTC J
        // 2012 spring
        "IS12S":            [SONY,     MSM8660,   237,404,  720,1280, 342,  0, 1024, 10,   4.3,  FE_G3__], // Xperia acro HD
        "IS12M":            [OTHER,    OMAP4430,  236,404,  540,960,  256,  0, 1024, 10,   4.3,  FE_G3__], // MOTOROLA RAZR
        "INFOBAR C01":      [SHARP,    MSM8655,   235,235,  480,854,  309,  0,  512,  2,   3.2,  FE_G3__], // INFOBAR C01
        "ISW11SC":          [SAMSUNG,  EXYNOS4210,236,404,  720,1080, 315,  2, 1024, 10,   4.7,  FE_G3__], // GALAXY SII WiMAX
        "IS11LG":           [LG,       AP25H,     237,404,  480,800,  235,  0, 1024, 10,     4,  FE_G3__], // Optimus X
        "IS12F":            [FUJITSU,  MSM8655,   235,235,  480,800,  235,  0,  512,  4,     4,  FE_G3__], // ARROWS ES
        // 2011 fall and winter
        "IS14SH":           [SHARP,    MSM8655,   235,235,  540,960,  298,  0,  512,  2,   3.7,  FE_G3__], // AQUOS PHONE
        "IS11N":            [OTHER,    MSM8655,   235,235,  480,800,  262,  0,  512,  5,   3.6,  FE_G3__], // NEC_CASIO MEDIAS BR
        "ISW11F":           [FUJITSU,  OMAP4430,  235,403,  720,1280, 342,  0, 1024,  3,   4.3,  FE_G3__], // ARROWS Z
        "ISW11K":           [OTHER,    MSM8655,   235,235,  480,800,  234,  0, 1024, 10,     4,  FE_G3__], // KYOCERA DIGNO
        "IS13SH":           [SHARP,    MSM8655,   235,235,  540,960,  258,  0,  512,  2,   4.2,  FE_G3__], // AQUOS PHONE
        "ISW12HT":          [HTC,      MSM8660,   234,403,  540,960,  256,  0, 1024,  4,   4.3,  FE_G3__], // HTC EVO 3D
        "ISW11M":           [OTHER,    T20,       234,234,  540,960,  256,  0, 1024,  2,   4.3,  FE_G3__], // MOTOROLA PHOTON
        // 2011 summer
        "EIS01PT":          [OTHER,    MSM8655,   234,234,  480,800,  254,  0,  512,  5,   3.7,  FE_G3__], // PANTECH
        "IS11PT":           [OTHER,    MSM8655,   234,234,  480,800,  254,  0,  512,  5,   3.7,  FE_G3__], // PANTECH MIRACH
        "IS11T":            [FUJITSU,  MSM8655,   234,234,  480,854,  243,  0,  512,  3,     4,  FE_G3__], // REGZA Phone
        "IS11CA":           [OTHER,    MSM8655,   233,233,  480,800,  262,  0,  512,  5,   3.6,  FE_G3__], // NEC_CASIO G'zOne
        "INFOBAR A01":      [SHARP,    MSM8655,   233,233,  540,960,  265,1.5,  512,  2,   3.7,  FE_G3__], // INFOBAR A01
        "IS12SH":           [SHARP,    MSM8655,   233,233,  540,960,  263,  0,  512,  2,   4.2,  FE_G3__], // AQUOS PHONE
        "IS11SH":           [SHARP,    MSM8655,   233,233,  540,960,  298,  0,  512,  2,   3.7,  FE_G3__], // AQUOS PHONE
        "IS11S":            [SONY,     MSM8655,   233,234,  480,854,  232,  0,  512,  2,   4.2,  FE_G3__], // Xperia acro
        // 2011 spring and legacy
        "ISW11HT":          [HTC,      QSD8650,   221,234,  480,800,  254,1.5,  512,  2,   4.3,  FE_G3__], // HTC EVO WiMAX
        "IS06":             [OTHER,    QSD8650,   221,221,  480,800,  254,1.5,  512,  5,   3.7,  FE_G3__], // PANTECH SIRIUS alpha
        "IS05":             [SHARP,    MSM8655,   221,234,  480,854,  290,  0,  512,  2,   3.4,  FE_G3__],
        "IS04":             [FUJITSU,  QSD8650,   210,222,  480,854,  290,  0,  512,  2,   4.0,  FE_G3__],
        "IS03":             [SHARP,    QSD8650,   210,221,  640,960,  331,  2,  512,  2,   3.5,  FE_G3__],
        "IS01":             [SHARP,    QSD8650,   160,160,  480,960,  213,  1,  256,  1,   5.0,  FE_G3__],
        //                   [0]       [1]        [2] [3]  [4]  [5]   [6]  [7]  [8]  [9]   [10]  [11]
        //                   BRAND     SOC        OS_VER  SHORT,LONG  PPI  DPR  RAM TOUCH  SIZE  FEATURE
        // --- SoftBank ---
        // https://www.support.softbankmobile.co.jp/partner/smp_info/smp_info_search_t.cfm
        "SBM304SH":         [SHARP,    MSM8974AB, 442,442, 1080,1920,   0,  0, 2048,  5,   5.2,  FE_G3LN], // AQUOS Xx
        "WX05SH":           [SHARP,    MSM8260A,  412,412,  480,854,    0,  0, 1024,  5,     4,  FE_G3LN],
        "SBM303SH":         [SHARP,    MSM8974AA, 422,422, 1080,1920,   0,  0, 2048,  5,   4.5,  FE_G3LN], // AQUOS PHONE Xx mini 303SH
        "DM016SH":          [SHARP,    MSM8974AA, 422,422, 1080,1920,   0,  0, 2048,  2,   5.2,  FE_G3LN],
        "301F":             [FUJITSU,  MSM8974AA, 422,422, 1080,1920,   0,  0, 2048,  2,     5,  FE_G3LN],
        "SBM302SH":         [SHARP,    MSM8974AA, 422,422, 1080,1920,   0,  0, 2048,  5,   5.2,  FE_G3LN],
    //  "EM01L":            [GOOGLE,   MSM8974AA, 440,440, 1080,1920, 445,  3, 2048,  5,     5,  FE_G3LN], // E-Mobile Nexus 5 EM01L
        "101F":             [FUJITSU,  MSM8960,   404,412,  540,960,    0,  0, 1024,  2,   4.3,  FE_G3LN],
        "WX04SH":           [SHARP,    MSM8260A,  412,412,  480,854,    0,  0, 1024,  5,     4,  FE_G3LN],
        "204HW":            [OTHER,    MSM8225,   410,410,  480,800,    0,  0, 1024,  2,     4,  FE_G3__], // HUAWEI for Silver Age
        "EM01F":            [FUJITSU,  APQ8064,   412,412,  720,1280,   0,  0, 2048,  5,   4.7,  FE_G3LN], // ARROWS S EM01F
        "DM015K":           [OTHER,    MSM8960,   422,422,  720,1280,   0,  0, 1536,  2,   4.3,  FE_G3L_], // KYOCERA
        "WX10K":            [OTHER,    MSM8960,   422,422,  720,1280,   0,  0, 1024,  2,   4.7,  FE_G3L_], // KYOCERA
        "202K":             [OTHER,    MSM8960,   422,422,  720,1280, 340,  0, 1024,  2,   4.3,  FE_G3L_], // KYOCERA
        "202F":             [FUJITSU,  APQ8064T,  422,422, 1080,1920,   0,  0, 2048,  2,     5,  FE_G3__],
        "SBM206SH":         [SHARP,    APQ8064T,  422,422, 1080,1920,   0,  0, 2048,  2,     5,  FE_G3__],
        "SBM205SH":         [SHARP,    MSM8960,   412,412,  480,854,    0,  0, 1024,  2,     4,  FE_G3L_],
        "DM014SH":          [SHARP,    MSM8960,   404,412,  720,1280,   0,  0, 1024,  2,   4.5,  FE_G3L_],
        "SBM204SH":         [SHARP,    MSM8255,   404,404,  480,800,    0,  0, 1024,  2,     4,  FE_G3__],
        "WX04K":            [OTHER,    APE5R,     234,411,  480,800,    0,  0, 1024,  2,     4,  FE_G3__], // KYOCERA
        "SBM203SH":         [SHARP,    APQ8064,   412,412,  720,1280,   0,  0, 2048,  2,   4.9,  FE_G3_N],
        "201F":             [FUJITSU,  APQ8064,   412,412,  720,1280,   0,  0, 2048,  2,   4.7,  FE_G3_N],
        "201K":             [OTHER,    MSM8960,   412,412,  480,800,    0,  0, 1024,  2,   3.7,  FE_G3L_], // KYOCERA
        "SBM200SH":         [SHARP,    MSM8960,   404,410,  720,1280,   0,  0, 1024,  2,   4.5,  FE_G3LN],
        "DM013SH":          [SHARP,    MSM8255,   404,404,  480,854,    0,  0, 1024,  2,   3.7,  FE_G3__],
        "SBM107SHB":        [SHARP,    MSM8255,   404,404,  480,854,    0,  0, 1024,  2,   3.7,  FE_G3__],
        "WX06K":            [OTHER,    APE5R,     234,234,  480,800,    0,  0,  512,  2,   3.5,  FE_G3__], // KYOCERA
        "SBM107SH":         [SHARP,    MSM8255,   404,404,  480,854,    0,  0, 1024,  2,   3.7,  FE_G3__],
        "SBM102SH2":        [SHARP,    OMAP4430,  235,404,  720,1280,   0,  0, 1024,  2,   4.5,  FE_G3__],
        "SBM106SH":         [SHARP,    MSM8260A,  404,404,  720,1280,   0,  0, 1024,  2,   4.7,  FE_G3__],
        "102P":             [OTHER,    OMAP4430,  235,235,  540,960,  275,  0, 1024,  2,   4.3,  FE_G3__], // PANASONIC
        "101DL":            [OTHER,    MSM8260,   235,235,  540,960,    0,  0, 1024,  2,   4.3,  FE_G3__], // DELL
        "SBM104SH":         [SHARP,    OMAP4460,  403,403,  720,1280, 326,  0, 1024,  2,   4.5,  FE_G3__],
        "DM012SH":          [SHARP,    MSM8255,   235,235,  540,960,    0,  0,  512,  2,     4,  FE_G3__],
        "101K":             [OTHER,    APE5R,     234,234,  480,800,    0,  0,  512,  2,   3.5,  FE_G3__], // KYOCERA
        "SBM103SH":         [SHARP,    MSM8255,   235,235,  540,960,  275,  0,  512,  2,     4,  FE_G3__],
        "101N":             [OTHER,    MSM8255,   235,235,  480,800,    0,  0,  512,  2,     4,  FE_G3__], // NEC_CASIO
        "101P":             [OTHER,    OMAP4430,  235,235,  480,854,    0,  0, 1024,  2,     4,  FE_G3__], // PANASONIC
        "SBM102SH":         [SHARP,    OMAP4430,  235,404,  720,1280, 326,  0, 1024,  2,   4.5,  FE_G3__],
        "DM011SH":          [SHARP,    MSM8255,   235,235,  480,854,  288,  0,  512,  2,   3.4,  FE_G3__],
        "SBM101SH":         [SHARP,    MSM8255,   235,235,  480,854,  288,  0,  512,  2,   3.4,  FE_G3__],
        "DM010SH":          [SHARP,    MSM8255,   234,234,  540,960,    0,  0,  512,  2,     4,  FE_G3__],
        "DM009SH":          [SHARP,    MSM8255,   220,234,  480,800,    0,  0,  512,  2,     4,  FE_G3__],
        "SBM009SHY":        [SHARP,    MSM8255,   234,234,  540,960,  288,  0,  512,  2,     4,  FE_G3__],
        "SBM007SHK":        [SHARP,    MSM8255,   233,233,  480,854,  288,  0,  512,  2,   3.4,  FE_G3__],
        "SBM009SH":         [SHARP,    MSM8255,   234,234,  540,960,    0,  0,  512,  2,     4,  FE_G3__],
        "003P":             [OTHER,    OMAP3630,  233,233,  480,854,    0,  0,  512,  2,   4.3,  FE_G3__], // PANASONIC
        "SBM007SHJ":        [SHARP,    MSM8255,   233,233,  480,854,  288,  0,  512,  2,   3.4,  FE_G3__],
        "SBM007SH":         [SHARP,    MSM8255,   233,233,  480,854,  288,  0,  512,  2,   3.4,  FE_G3__],
        "SBM006SH":         [SHARP,    MSM8255,   233,233,  540,960,    0,  0,  512,  2,   4.2,  FE_G3__],
        "SBM005SH":         [SHARP,    MSM8255,   221,221,  480,800,    0,  0,  512,  2,   3.8,  FE_G3__],
        "001DL":            [OTHER,    QSD8250,   220,220,  480,800,    0,  0,  512,  2,     5,  FE_G3__], // DELL
        "SBM003SH":         [SHARP,    MSM8255,   220,234,  480,800,    0,1.5,  512,  2,   3.8,  FE_G3__],
        "001HT":            [HTC,      MSM8255,   220,233,  480,800,    0,1.5,  384,  2,   4.3,  FE_G3__],
    //  "SBM201HW":         [OTHER,    MSM8960,   400,400,  540,960,    0,  0, 1024,  2,   4.3,  FE_G3L_], // HUAWEI
    //  "SBM007HW":         [OTHER,    MSM8255,   234,234,  480,800,    0,  0,  512,  2,   3.7,  FE_G3__], // HUAWEI Vision
    //  "X06HT":            [HTC,      QSD8250,   210,220,  480,800,    0,  1,  512,  2,   3.7,  FE_G3__],
    //  "009Z":             [OTHER,    MSM8255,   234,234,  480,800,    0,  0,  512,  2,   3.8,  FE_G3__], // ZTE STAR7
    //  "008Z":             [OTHER,    MSM8255,   230,230,  480,800,    0,  0,  512,  2,   3.8,  FE_G3__], // ZTE
    //  "003Z":             [OTHER,    MSM7227,   220,220,  480,800,    0,  0,  512,  2,   3.5,  FE_G3__], // ZTE Libero
    //  "201M":             [OTHER,    MSM8960,   400,410,  540,960,    0,  0, 1024,  2,   4.3,  FE_G3L_], // Motorola RAZR
//}@androidjp

//{@kindle
        // --- Kindle ---
        "KFOT":             [AMAZON,   OMAP4430,  234,234,  600,1024,   0,  0,  512,  5,     7,  0      ], // Kindle Fire
        "KFTT":             [AMAZON,   OMAP4460,  403,403,  800,1280,   0,  2, 1024,  5,     7,  0      ], // Kindle Fire HD
        "KFJWI":            [AMAZON,   OMAP4470,  403,403, 1200,1920,   0,  3, 1024,  5,   8.9,  FE__3L_], // Kindle Fire HD 8.9
        "KFJWA":            [AMAZON,   OMAP4470,  403,403, 1200,1920,   0,  3, 1024,  5,   8.9,  FE__3L_], // Kindle Fire HD 8.9 4G
        "KFSOWI":           [AMAZON,   OMAP4470,  422,422,  800,1280,   0,  2, 1024,  5,     7,  0      ], // Kindle Fire HD 7 (2nd)
        "KFTHWI":           [AMAZON,   MSM8974AA, 422,422, 1200,1920,   0,  3, 2048,  5,     7,  FE__3L_], // Kindle Fire HDX 7 (3rd)
        "KFTHWA":           [AMAZON,   MSM8974AA, 422,422, 1200,1920,   0,  3, 2048,  5,     7,  FE__3L_], // Kindle Fire HDX 7 (3rd) 4G
        "KFAPWI":           [AMAZON,   MSM8974AA, 422,422, 1600,2560,   0,  0, 2048,  5,   8.9,  FE__3L_], // Kindle Fire HDX 8.9 (3rd)
        "KFAPWA":           [AMAZON,   MSM8974AA, 422,422, 1600,2560,   0,  0, 2048,  5,   8.9,  FE__3L_], // Kindle Fire HDX 8.9 (3rd) 4G

        // --- Fire Phone --- 
    //  "FP":               [AMAZON,   MSM8974AA, 350,350,  720,1280, 315,  2, 2048,  5,   4.7,  FE_G3LN], // Fire Phone
//}@kindle

//{@windowsphone
        //                   [0]       [1]        [2] [3]  [4]  [5]   [6]  [7]  [8]  [9]   [10]  [11]
        //                   BRAND     SOC        OS_VER  SHORT,LONG  PPI  DPR  RAM TOUCH  SIZE  FEATURE
        // --- Windows Phone 7.5 ---
        // https://www.handsetdetection.com/properties/vendormodel/
        // http://en.wikipedia.org/wiki/List_of_Windows_Phone_7_devices
    //  "Allegro":          [ACER,     MSM8255,   750,750,  480,800,  259,  0,  512,  4,     0,  FE_G3__],
    //  "OneTouchView":     [ALCATEL,  MSM7227,   750,780,  480,800,    0,  0,  512,  4,     0,  FE_G3__],
    //  "IS12T":            [FUJITSU,  MSM8655,   750,750,  480,800,    0,  0,  512,  4,     0,  FE_G3__],
    //  "Radar":            [HTC,      MSM8255,   750,750,  480,800,  246,  0,  512,  4,     0,  FE_G3__],
    //  "P6800":            [HTC,      MSM8255T,  750,750,  480,800,  198,  0,  512,  4,     0,  FE_G3__], // Titan
    //  "PI86100":          [HTC,      MSM8255T,  750,750,  480,800,  198,  0,  512,  4,     0,  FE_G3L_], // Titan II
        "Lumia 510":        [NOKIA,    MSM7227,   750,750,  480,800,    0,  0,  256,  4,     0,  FE_G3__],
        "Lumia 610":        [NOKIA,    MSM7227,   750,750,  480,800,    0,  0,  256,  4,     0,  FE_G3__],
        "Lumia 710":        [NOKIA,    MSM8255,   750,750,  480,800,    0,  0,  512,  4,     0,  FE_G3__],
        "Lumia 800":        [NOKIA,    MSM8255,   750,750,  480,800,    0,  0,  512,  4,     0,  FE_G3__],
        "Lumia 900":        [NOKIA,    APQ8055,   750,750,  480,800,    0,  0,  512,  4,     0,  FE_G3__],
    //  "SGH-i667":         [SAMSUNG,  MSM8255T,  750,750,  480,800,  233,  0,  512,  4,     0,  FE_G3__], // Focus 2
    //  "SGH-i937":         [SAMSUNG,  MSM8255,   750,750,  480,800,  217,  0,  512,  4,     0,  FE_G3__], // Focus S
    //  "GT-S7530":         [SAMSUNG,  MSM7227,   750,750,  480,800,  233,  0,  384,  4,     0,  FE_G3__], // Omnia M
    //  "GT-I8350":         [SAMSUNG,  MSM8255,   750,750,  480,800,  252,  0,  512,  4,     0,  FE_G3__], // Omnia W
    //  "Orbit":            [OTHER,    MSM7227,   750,750,  480,800,  233,  0,  512,  4,     0,  FE_G3__], // ZTE
    //  "Tania":            [OTHER,    MSM8255,   750,750,  480,800,  217,  0,  512,  4,     0,  FE_G3__], // ZTE
        // --- Windows Phone 8 ---
        // http://en.wikipedia.org/wiki/List_of_Windows_Phone_8_devices
    //  "8S":               [HTC,      MSM8627,   800,800,  480,800,    0,  0,  512,  4,     0,  FE_G3__],
    //  "8X":               [HTC,      MSM8960,   800,800,  720,1280, 342,  0, 1024,  4,     0,  FE_G3_N], // LTE not impl
    //  "8XT":              [HTC,      MSM8930,   800,800,  480,800,    0,  0, 1024,  4,     0,  FE_G3_N],
    //  "W1-U00":           [OTHER,    MSM8230,   800,800,  480,800,    0,  0,  512,  4,     0,  FE_G3__], // HUAWEI Ascend W1
    //  "W2-U00":           [OTHER,    MSM8230,   800,800,  480,800,    0,  0,  512,  4,     0,  FE_G3__], // HUAWEI Ascend W2
        "Lumia 520":        [NOKIA,    MSM8227,   800,800,  480,800,  235,  0,  512,  4,     0,  FE_G3__],
        "Lumia 525":        [NOKIA,    MSM8227,   800,800,  480,800,  235,  0, 1024,  4,     0,  FE_G3__],
        "Lumia 620":        [NOKIA,    MSM8960,   800,800,  480,800,  246,  0,  512,  4,     0,  FE_G3_N], // LTE not impl
        "Lumia 625":        [NOKIA,    MSM8930,   800,800,  480,800,  201,  0,  512,  4,     0,  FE_G3L_],
        "Lumia 720":        [NOKIA,    MSM8227,   800,800,  480,800,  217,  0,  512,  4,     0,  FE_G3_N],
        "Lumia 810":        [NOKIA,    MSM8260A,  800,800,  480,800,  217,  0,  512,  4,     0,  FE_G3_N],
        "Lumia 820":        [NOKIA,    MSM8960,   800,800,  480,800,  217,  0, 1024,  4,     0,  FE_G3LN],
        "Lumia 822":        [NOKIA,    MSM8960,   800,800,  480,800,  217,  0, 1024,  4,     0,  FE_G3LN],
        "Lumia 920":        [NOKIA,    MSM8960,   800,800,  768,1280, 334,  0, 1024,  4,     0,  FE_G3LN],
        "Lumia 925":        [NOKIA,    MSM8960,   800,800,  768,1280, 334,  0, 1024,  4,     0,  FE_G3LN],
        "Lumia 928":        [NOKIA,    MSM8960,   800,800,  768,1280, 334,  0, 1024,  4,     0,  FE_G3LN],
        "Lumia 1020":       [NOKIA,    MSM8960,   800,800,  768,1280, 334,  0, 2048,  4,     0,  FE_G3LN],
        "Lumia 1320":       [NOKIA,    MSM8930AB, 800,800,  768,1280, 245,  0, 1024,  4,     0,  FE_G3L_], // not NFC
        "Lumia 1520":       [NOKIA,    MSM8974AA, 800,800, 1080,1920, 367,  0, 2048,  4,     6,  FE_G3LN],
        "Lumia Icon":       [NOKIA,    MSM8974AA, 800,800, 1080,1920, 441,  0, 2048,  4,     5,  FE_G3LN],
    //  "GT-I8750":         [SAMSUNG,  MSM8960,   800,800,  720,1280, 306,  0, 1024,  4,     0,  FE_G3LN], // ATIV S
    //  "SGH-T899M":        [SAMSUNG,  MSM8960,   800,800,  720,1280, 306,  0, 1024,  4,     0,  FE_G3LN], // ATIV S
    //  "SPH-I800":         [SAMSUNG,  MSM8930,   800,800,  720,1280, 308,  0, 1024,  4,     0,  FE_G3LN], // ATIV S Neo, SoC MSM8930AA -> MSM8930
    //  "SCH-I930":         [SAMSUNG,  MSM8960,   800,800,  480,800,  233,  0, 1024,  4,     0,  FE_G3LN], // ATIV Odyssey
        // --- Windows Phone 8.1 ---
        // http://en.wikipedia.org/wiki/List_of_Windows_Phone_8.1_devices
        "Lumia 630":        [NOKIA,    MSM8226,   810,810,  480,854,  221,  0,  512,  4,   4.5,  FE_G3LN],
        "Lumia 635":        [NOKIA,    MSM8926,   810,810,  480,854,  221,  0,  512,  4,   4.5,  FE_G3LN],
        "Lumia 930":        [NOKIA,    MSM8974AA, 810,810, 1080,1920, 441,  0, 2048,  4,     5,  FE_G3LN],
//}@windowsphone

        // --- Firefox OS ---
//{@firefoxos
        // https://wiki.mozilla.org/Compatibility/UADetectionLibraries
//      "ZTEOPEN":          [OTHER,    MSM7225A,  100,100,  320,480,    0,  0,  256,  5,   3.5,  FE_G3__], // ZTE Open
//}@firefoxos

        // --- Game and Console device ---
        "PS 4":             [SONY,     OTHER,       0,0,      0,0,      0,  0, 8192,  0,     0,  0      ], // PlayStation 4
        "PS Vita":          [SONY,     CXD5315GG,   0,0,    544,960,  220,  0,  512,  5,     0,  FE_G3__], // PlayStation Vita
        "Xbox One":         [OTHER,    OTHER,       0,0,      0,0,      0,  0, 8192,  0,     0,  0      ], // MICROSOFT Xbox One
        "Wii U":            [OTHER,    OTHER,       0,0,      0,0,      0,  0, 2048,  0,     0,  0      ], // NINTENDO Wii U
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
    //  "K1":         [ARM,  2.3,  4,     TEGRA,    "???"           ],
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
        // --- HiSilicon ---
        "K3V2":       [ARM,  1.2,  4,     IMMERSION,"Immersion.16"  ],
    //  "KIRIN910":   [ARM,  1.6,  4,     MALI,     "T450MP4"       ], // MediaPad X1, MediaPad M1
        // --- MediaTek ---
        "MTK8125":    [ARM,  1.2,  4,     POWER_VR,  "SGX544"        ], // MeMo Pad HD7, Kobo Arc 7
        "MT6582M":    [ARM,  1.3,  4,     MALI,     "400"           ], // FXC5A
    //  "MT6572":     [ARM,  1.3,  2,     MALI,     "400MP1"        ],
    //  "MT6582":     [ARM,  1.3,  4,     MALI,     "400MP2"        ],
    //  "MT6588":     [ARM,  1.7,  4,     MALI,     "450MP4"        ],
    //  "MT6592":     [ARM,  2.0,  8,     MALI,     "450MP4"        ],
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
        "Z3580":      [ATOM, 2.3,  4,     POWER_VR, "G6430"         ], // Moorefield
        "Z3745":      [ATOM, 1.8,  4,     INTEL,    "HDGraphics"    ], // Bay Trail-T
    }
};

// --- validate / assertions -------------------------------
//{@dev
function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
//function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- exports ---------------------------------------------
if ("process" in global) {
    module["exports"] = Spec;
}
global["Spec" in global ? "Spec_" : "Spec"] = Spec; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule

