(function(global) {
"use strict";

// --- dependency module -----------------------------------
// --- local variable --------------------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function Spec(param) { // @arg Object = {} - { dpr, width, height, language, userAgent }
                       // @param.dpr Number = 1
                       // @param.width Integer = 0
                       // @param.height Integer = 0
                       // @param.language String = "en"
                       // @param.userAgent String = ""
                       // @ret SpecObject - { DEVICE, OS, CPU, GPU, INPUT,
                       //                     MEMORY, DISPLAY, NETWORK, BROWSER }
                       // @desc Create SpecObject.
//{@dev
    $valid($type(param, "Object|omit"), Spec, "param");
    $valid($keys(param, "dpr,width,height,language,userAgent"), Spec, "param");
//}@dev

    param = param || {};

    var spec      = _createSpecObject();
    var screen    = global["screen"]    || {};
    var nav       = global["navigator"] || {};
    var dpr       = param["dpr"]        || global["devicePixelRatio"] || 1;
    var width     = param["width"]      || screen["width"]  || 0;
    var height    = param["height"]     || screen["height"] || 0;
    var language  = param["language"]   || nav["language"]  || "en";
    var userAgent = param["userAgent"]  || nav["userAgent"] || "";

    spec["LANGUAGE"] = language.split("-", 1)[0]; // "en-us" -> "en"
    spec["USER_AGENT"] = userAgent;
    spec["DISPLAY_DPR"] = dpr;
    spec["DISPLAY_LONG"] = Math.max(width, height);
    spec["DISPLAY_SHORT"] = Math.min(width, height);

    _detectOS(spec, userAgent);
    _detectID(spec, userAgent);
    _detectBrowser(spec, userAgent);
    _detectNetwork(spec);

    return spec;
}

Spec["repository"] = "https://github.com/uupaa/Spec.js";

// --- implement -------------------------------------------
function _createSpecObject() {
    // [S] = Set in Spec.js
    // [D] = Set in Device.js
    return {
        // --- DEVICE ---
        "ID":                   "",     // [S] Device ID picked up from the UserAgent string.
                                        //     デバイスのIDです。
                                        //     2012年に発売された Nexus 7 は "Nexus 7" に、2013年モデルの Nexus 7 は "Nexus 7 (2013)" になります。
        "ID_CANDIDATE":         [],     // [S] Device ID candidate. eg: ["iPhone 5", "iPhone 5c", "iPhone 5s"]
                                        //     デバイスID が特定できない場合に候補のデバイスIDのリストを提示します。
        "SOC":                  "",     // [D] System on chip name. eg: "MSM8974"
                                        //     端末に搭載されている SoC の型番です。MSM8974 や A5X といった値になります。
        "BRAND":                "",     // [D] Brand name or maker name. eg: Google, Apple, SONY, Nokia, MicroSoft, Nintendo...
                                        //     端末のブランド名またはメーカー名です。
        "MOBILE":               false,  // [S] Mobile/Tablet Device. Maybe Android or iOS or Windows Phone
        "DETECTED":             false,  // [D] Device detected.
                                        //     デバイスID が Device.js のカタログに存在し、特定済みの場合に true になります。
        "LANGUAGE":             "",     // [S] Device/Browser language. "en", "ja", ...
                                        //     デバイスの表示言語です
        // --- OS ---
        "OS_TYPE":              "",     // [S] OS type. "Android", "iOS", "Windows Phone", "Windows", "Mac OS X", "Firefox OS", "Game"
                                        //     OS種別です。
        "OS_VERSION":           "0.0.0",// [S] Current OS version.
                                        //     UserAgent から求めた OS のバージョン(Major, Minor, Patch)番号です。
                                        //     Major.Minor を数値として取り出すには、parseFloat(spec["OS_VERSION"]) を使ってください。
        "OS_RELEASE_VERSION":   "0.0.0",// [D] Release OS version.
                                        //     端末発売時のバージョン(Major, Minor, Patch)番号です。
        "OS_HIGHEST_VERSION":   "0.0.0",// [D] Highest OS version.
                                        //     OSの更新が停止したバージョン(Major, Minor, Patch)番号です。
        // --- CPU ---
        "CPU_TYPE":             "",     // [D] CPU type. "ARM", "ARM64", "ATOM"
                                        //     CPU 種別です。
        "CPU_CLOCK":            0.0,    // [D] CPU clock (GHz).
                                        //     CPU クロックの値です。単位は GHzです。
        "CPU_CORES":            0,      // [D] CPU cores. 1(single), 2(dual), 4(quad)
                                        //     CPU コア数です。2 がデュアル, 4 はクアッドコアになります。
        "CPU_SIMD":             false,  // [D] Enable SIMD (aka ARM-NEON). Tegra 2 is false.
                                        //     SIMD(NEON) をサポートしている場合に true になります。Tegra 2 では false です。
        // --- GPU ---
        "GPU_TYPE":             "",     // [D] GPU type. eg: "Adreno", "Tegra", "PowerVR", "Mali", "Immersion", ...
                                        //     GPU 種別です。
        "GPU_ID":               "",     // [D] GPU ID. eg: "330"
        // --- MEMORY ---
        "RAM":                  0.0,    // [D] RAM size. eg: 2048 (2GB)
                                        //     端末に搭載されている RAM サイズです。単位は MB です。
        // --- DISPLAY ---
        "DISPLAY_DPR":          0.0,    // [S] Display Device Pixel Ratio.
                                        //     Device Pixel Ratio (`window.devicePixelRatio`) の値です。
        "DISPLAY_PPI":          0,      // [D] Display Pixel Per Inch.
                                        //     Pixel Per Inch の値です。この値が大きいほど高精細になります。
        "DISPLAY_SIZE":         0.0,    // [D] Display size(inch).
        "DISPLAY_LONG":         0,      // [D] Display long edge.
                                        //     ディスプレイの長辺の値(long edge)です。単位は Pixel です。縦または横の大きいほうの値になります。
        "DISPLAY_SHORT":        0,      // [D] Display short edge.
                                        //     ディスプレイの短辺の値(short edge)です。単位は Pixel です。縦または横の小さいほうの値になります。
        "DISPLAY_TOUCH":        0,      // [D] Display touch fingers.
                                        //     同時に認識するタッチポイントの数です。5なら五本の指を同時にトラッキングできます。
                                        //     AndroidBrowser 4.0 未満であれば、この値は 0 または 1 になります https://code.google.com/p/android/issues/detail?id=11909
        // --- NETWORK ---
        "NETWORK_GPS":          false,  // [D] Enable GPS
                                        //     デバイスに GPS が搭載されている場合に true になります。GPSを省略した廉価版が混在している場合は false になります。
        "NETWORK_3G":           false,  // [D] Enable 3G.
                                        //     デバイスに 3G が搭載されている場合に true になります。
        "NETWORK_LTE":          false,  // [D] Enable LTE. (4G)
                                        //     デバイスに LTE が搭載されている場合に true になります。
        "NETWORK_NFC":          false,  // [D] Enable NFC.
                                        //     デバイスに NFC が搭載されている場合に true になります。
        "NETWORK_WIFI":         false,  // [D] Enable Wi-Fi.
                                        //     デバイスに WiFi が搭載されている場合に true になります。
        "NETWORK_BTLE":         false,  // [D] Enable Bluetooth low energy.
                                        //     デバイスに Bluetooth low energy が搭載されている場合に true になります。
        "NETWORK_DIRECT":       false,  // [D] Enable Wi-Fi Direct.
                                        //     デバイスに Wi-Fi Direct が搭載されている場合に true になります。
        "NETWORK_CPH":          0,      // [S] Device/Browser connection per host.
                                        //     デバイス(ブラウザ)がホスト毎に同時にリクエストできるコネクションの最大値です
        "NETWORK_MAX_CONNECTION": 0,    // [S] Device/Browser max connections.
                                        //     デバイス(ブラウザ)が同時にリクエストできるコネクションの最大値です
        // --- BROWSER ---
        "USER_AGENT":           "",     // [S] navigator.userAgent string.
                                        //     navigator.userAgent または Spec({ userAgent }) の値です。
        "BROWSER_NAME":         "",     // [S] Browser name. "Chrome", "Firfox", "AndroidBrowser", "IE", "Safari", "WebKit"
                                        //     ブラウザ名です。
                                        //     Kindle は AndroidBrowser に、S Browser は Chrome になります。
        "BROWSER_ENGINE":       "",     // [S] Browser render engine. "Blink", "Trident", "Gecko", "WebKit"
        "BROWSER_VERSION":      "0.0.0" // [S] Browser Version.
                                        //     UserAgent から求めた ブラウザのバージョン番号(Major, Minor, Patch)番号です
                                        //     Major.Minor を数値として取り出すには、parseFloat(spec["BROWSER_VERSION"]) を使ってください。
    };
}

function _detectOS(spec, ua) {
    var type = "";      // OS.TYPE
    var ver  = "0.0.0"; // OS.VERSION

    if ( /PlayStation|Xbox|Nintendo/i.test(ua) ) {
        type = "Game";
    } else if ( /Android/.test(ua) ) {
        // Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; KFTT               Build/IML74K)      AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.4    Mobile Safari/535.19 Silk-Accelerated=true
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
    } else if ( /Windows Phone/.test(ua) ) {
        type = "Windows Phone";
        ver = ua.split(/Windows Phone (?:OS )?/)[1].split(";")[0];
    } else if ( /Mac OS X/.test(ua) ) {
        type = "Mac OS X";
        ver = ua.split("Mac OS X ")[1].split(")")[0];
    } else if ( /Windows/.test(ua) ) {
        type = "Windows";
        ver = ua.replace(" NT ", " ").split("Windows ")[1].split(";")[0];
    } else if ( /Firefox/.test(ua) ) {
        type = "Firefox OS";
    }
    spec["MOBILE"] = /Android|iOS|Windows Phone/.test(type);
    spec["OS_TYPE"] = type;
    spec["OS_VERSION"] = _normalizeVersionString(ver);
}

function _detectID(spec, ua) {
    // "Mozilla/5.0 (Linux; U; Android 4.0.4; ja-jp; SonySO-04D Build/7.0.D.1.117)..."
    //                                                   ~~~~~~
    //                                                  device id
    var id = ""; // DEVICE.ID

    switch (spec["OS_TYPE"]) {
    case "Game":            id = _getGameDeviceID(ua); break;
    case "Android":         id = _getAndroidDeviceID(ua); break;
    case "iOS":             id = _getiOSDeviceID(ua, spec); break;
    case "Windows Phone":   id = _getWindowsPhoneDeviceID(ua); break;
    case "Mac OS X":        break;
    case "Windows":         break;
    case "Firefox OS":      break;
    }

    // overwrite DEVICE.ID
    switch (id) {
    case "Nexus 7": // -> "Nexus 7 (2013)"
        id = (spec["DISPLAY_DPR"] || 1) === 2 ? "Nexus 7 (2013)" // Nexus 7 (2013)
                                              : "Nexus 7";       // Nexus 7 (2012)
    }
    spec["ID"] = id;
}

function _getGameDeviceID(ua) {
    var id = /PlayStation 3/i.test(ua)        ? "PS 3"
           : /PlayStation 4/i.test(ua)        ? "PS 4"
           : /PlayStation Vita/i.test(ua)     ? "PS Vita"
           : /PlayStation Portable/i.test(ua) ? "PSP"
           : /Xbox One/i.test(ua)             ? "Xbox One"
           : /Xbox/i.test(ua)                 ? "Xbox 360"
           : /WiiU/i.test(ua)                 ? "Wii U"
           : /Wii/i.test(ua)                  ? "Wii"
           : /3DS/i.test(ua)                  ? "3DS"
                                              : "";
    return id;
}

function _getAndroidDeviceID(ua) {
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

    if (/Firefox/.test(ua)) {
        return "";
    }
    var id = ua.replace(" 4G ", "").split("Build/")[0].split(";").slice(-1).join().trim();

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

function _getiOSDeviceID(ua, spec) {
    // Examples:
    //
    //      Mozilla/5.0 (iPad;   CPU        OS 6_0   like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25
    //      Mozilla/5.0 (iPod;   CPU iPhone OS 5_0_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A405 Safari/7534.48.3
    //      Mozilla/5.0 (iPhone; CPU iPhone OS 6_0   like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25
    //                   ~~~~~~
    //                  device id

    var id = /iPad/.test(ua) ? "iPad"
           : /iPod/.test(ua) ? "iPod"
                             : "iPhone";
    var ver = parseFloat(spec["OS_VERSION"]);
    var dpr = spec["DISPLAY_DPR"];
    var longEdge = spec["DISPLAY_LONG"]; // iPhone 4S: 480, iPhone 5: 568
    var candidate = [];

    switch (id) {
    case "iPad":
        if (dpr === 1) {
            id = "iPad 2";
            candidate = ["iPad 2", "iPad mini"];
        } else {
            id = "iPad 3";
            candidate = ["iPad 3", "iPad 4", "iPad Air", "iPad mini Retina"];
        }
        break;
    case "iPhone":
        if (dpr === 1) {
            id = "iPhone 3GS";
        } else if (longEdge <= 480) {
            id = ver < 8 ? "iPhone 4" : "iPhone 4S"; // iPhone 4 stopped in iOS 7.
        } else if (longEdge <= 568) {
            id = "iPhone 5";
            candidate = ["iPhone 5", "iPhone 5c", "iPhone 5s"];
        } else {
            id = "iPhone 6";
        }
        break;
    case "iPod":
        if (longEdge <= 480) {
            id = dpr === 1 ? "iPod touch 3" : "iPod touch 4";
        } else {
            id = "iPod touch 5";
        }
    }
    spec["ID_CANDIDATE"] = candidate;
    return id;
}

function _getWindowsPhoneDeviceID(ua) {
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
    var token = ua.split("(")[1].split(")")[0].
                   replace("ARM; ", "").replace("Touch; ", "").
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

function _detectBrowser(spec, ua) {
    var browserName    = "";      // browser name: "Chrome", "Chromium", "IE", "Firefox", "Safari", "AndroidBrowser"
    var browserEngine  = "";      // browser engine: "WebKit", "Blink", "Trident":
    var browserVersion = "0.0.0"; // "Major.Minor.Patch"

    if ( /Chrome/.test(ua) ) { // Chrome and Opera.next
        // Chrome for Android
        //      Mozilla/5.0 (Linux; Android 4.2;          Nexus 7 Build/JOP40C)  AppleWebKit/535.19 (KHTML, like Gecko)             Chrome/18.0.1025.166        Safari/535.19
        //      Mozilla/5.0 (Linux; Android 4.1.1;        HTL21   Build/JRO03C)  AppleWebKit/537.36 (KHTML, like Gecko)             Chrome/33.0.1750.136 Mobile Safari/537.36
        //
        // GALAXY S4 (Chromium based custom browser)
        //      Mozilla/5.0 (Linux; Android 4.2.2; ja-jp; SC-04E  Build/JDQ39)   AppleWebKit/535.19 (KHTML, like Gecko) Version/1.0 Chrome/18.0.1025.308 Mobile Safari/535.19
        //
        // Android Chrome WebView
        //      Mozilla/5.0 (Linux; Android 4.4;          Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0      Mobile Safari/537.36
        browserName    = "Chrome";
        browserEngine  = "Blink"; // Chrome version 28+, Opera version 15+
        browserVersion = _getBrowserVersion(ua, "Chrome/");
    } else if ( /Firefox/.test(ua) ) {
        browserName    = "Firefox";
        browserEngine  = "Gecko";
        browserVersion = _getBrowserVersion(ua, "Firefox/");
    } else if ( /Android/.test(ua) ) {
        browserEngine  = "WebKit";
        browserName    = "AndroidBrowser";
        browserVersion = _getBrowserVersion(ua, /Silk/.test(ua) ? "Silk/" : "Version/");
    } else if ( /MSIE|Trident/.test(ua) ) {
        browserName    = "IE";
        browserEngine  = "Trident";
        browserVersion = /MSIE/.test(ua) ? _getBrowserVersion(ua, "MSIE ") // IE 10.
                                         : _getBrowserVersion(ua, "rv:");  // IE 11+
        if ( /IEMobile/.test(ua) ) {
            browserVersion = _getBrowserVersion(ua, "IEMobile/");
        }
    } else if ( /Safari/.test(ua) ) {
        browserName    = "Safari";
        browserEngine  = "WebKit";
        browserVersion = _getBrowserVersion(ua, "Version/");
    } else if ( /AppleWebKit/.test(ua) ) {
        browserName    = "WebKit";
        browserEngine  = "WebKit";
    }
    spec["BROWSER_NAME"]    = browserName;
    spec["BROWSER_ENGINE"]  = browserEngine;
    spec["BROWSER_VERSION"] = _normalizeVersionString(browserVersion);
}

function _getBrowserVersion(ua, pile) {
    return ua.split(pile)[1].split(" ")[0];
}

function _normalizeVersionString(version) { // @arg String - "Major.Minor.Patch"
                                            // @ret String - "Major.Minor.Patch"
    var ary = version.split(/[\._]/); // "1_2_3" -> ["1", "2", "3"]
                                      // "1.2.3" -> ["1", "2", "3"]
    return ( parseInt(ary[0], 10) || 0 ) + "." +
           ( parseInt(ary[1], 10) || 0 ) + "." +
           ( parseInt(ary[2], 10) || 0 );
}

function _detectNetwork(spec) {
    var ver = parseFloat(spec["OS_VERSION"]);
    var cph = 6;
    var max = 16;

    switch ( spec["BROWSER_NAME"] ) {
    case "AndroidBrowser":
        max = ver < 4.0 ? 10 : 16;
        cph = ver < 4.0 ?  8 :  6;
        break;
    case "IE":
        cph = (ver < 10) ? 6
            : (ver < 11) ? 8
                         : 13;
    }
    spec["NETWORK_CPH"] = cph;
    spec["NETWORK_MAX_CONNECTION"] = max;
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

