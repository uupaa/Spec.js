var ModuleTestSpec = (function(global) {

global["BENCHMARK"] = false;

var Spec = WebModule["Spec"];

var test = new Test("Spec", {
        disable:    false, // disable all tests.
        browser:    true,  // enable browser test.
        worker:     true,  // enable worker test.
        node:       true,  // enable node test.
        nw:         true,  // enable nw.js test.
        button:     true,  // show button.
        both:       true,  // test the primary and secondary modules.
        ignoreError:false, // ignore error.
        callback:   function() {
        },
        errorback:  function(error) {
        }
    }).add([
        //testWKWebView,
        // ---
        testSpecParamUserAgent,
        testDeviceiPhone6Plus,
        testDeviceiPhone6,
        testDeviceNexus5,
        testDeviceNexus7_2nd,
        testFirefoxMobileForAndroid,
        testDeviceFirefoxOS,
        testDevice_INFOBAR_A01,
        testDeviceWindowsPhone8S,
        testDeviceWindowsPhoneLumia920,
        testDeviceKindle,
        testDeviceGooglePlayEdition,
        testIsOS,
        testIsBrowser,
        testIsBrowserEngine,
        // ---
        testMacPro,
        testIE11Preview,
        testIE10,
        testFirefox11,
        testFirefox20,
        // ---
        testAlternateDevice,
        testDeviceFeature,
        testBrowser,
//      testScriptHash,
        // ---
        testSpec_LegacySonyDevice,
        testSpec_SLOW_CPU,
        testSpec_SLOW_GPU,
        testSpec_OLD_DEVICE,
        testSpec_BLE,
        testSpec_NFC,
        testSpec_ATOM,
        testSpec_SIMD,
        testSpec_CPU_MAX_THREADS,
        testSpec_GPU_MAX_TEXTURE_SIZE,
        testSpec_MAX_TOUCH_POINTS,
        testSpec_WEBGL_CONTEXT,
        testSpec_WEBGL_VERSION,
        testSpec_WEBP,
      //testSpec_CHROME_TRIGGER,
        // --- WebView ---
        testSpec_SpecialUserAgent,
    ]);

/*
if (IN_BROWSER || IN_NW) {
    test.add([
        //test_getHardwareConcurrency,
    ]);
} else if (IN_WORKER) {
    test.add([
        // worker test
    ]);
} else if (IN_NODE) {
    test.add([
        // node.js and io.js test
    ]);
}
 */

// --- test cases ------------------------------------------
function testWKWebView(test, pass, miss) {
    var spec = new Spec();

    var supportFullScreen = "fullscreenEnabled" in document || "webkitFullscreenEnabled" in document || false;
    var supportFileSystem = "requestFileSystem" in global   || "webkitRequestFileSystem" in global   || false;

    document.body.innerHTML += JSON.stringify({ "requestFileSystem": "requestFileSystem" in window });
    document.body.innerHTML += JSON.stringify({ "webkitRequestFileSystem": "webkitRequestFileSystem" in window });

    document.body.innerHTML += JSON.stringify({ "webkitIsFullScreen": "webkitIsFullScreen" in document });
    document.body.innerHTML += JSON.stringify({ "webkitIsFullScreen": document.webkitIsFullScreen });
    document.body.innerHTML += JSON.stringify({ "USER_AGENT": spec.USER_AGENT });
    document.body.innerHTML += JSON.stringify({ "BROWSER": spec.BROWSER });
    document.body.innerHTML += JSON.stringify({ "supportFullScreen": supportFullScreen });
    document.body.innerHTML += JSON.stringify({ "supportFileSystem": supportFileSystem });
    document.body.innerHTML += JSON.stringify({ "WEB_VIEW": this.WEB_VIEW });

    test.done(pass());
}

function testSpecParamUserAgent(test, pass, miss) {
    var ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25";
    var spec = new Spec();
    spec.USER_AGENT = ua;

    if (spec.USER_AGENT === ua) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testDeviceiPhone6Plus(test, pass, miss) {
    var spec = new Spec();
    spec.DISPLAY_DPR = 3;
    spec.DISPLAY_LONG = 736;
    spec.DISPLAY_SHORT = 414;
    spec.USER_AGENT = "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25";

    if (spec.DEVICE === "iPhone 6 Plus") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}
function testDeviceiPhone6(test, pass, miss) {
    var spec = new Spec();
    spec.DISPLAY_DPR = 2;
    spec.DISPLAY_LONG = 667;
    spec.DISPLAY_SHORT = 375;
    spec.USER_AGENT = "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25";

    if (spec.DEVICE === "iPhone 6") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testDeviceNexus5(test, pass, miss) {
    var spec = new Spec();
    spec.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";

    if (spec.DEVICE === "Nexus 5" && spec.OS === "Android") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testDeviceNexus7_2nd(test, pass, miss) {
    var spec = new Spec();
    spec.DISPLAY_DPR = 2;
    spec.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JWR66N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.111 Safari/537.36";

    if (spec.DEVICE === "Nexus 7 2nd") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testFirefoxMobileForAndroid(test, pass, miss) {
    var spec = new Spec();
    spec.USER_AGENT = "Mozilla/5.0 (Android; Mobile; rv:13.0) Gecko/13.0 Firefox/13.0";

    if (spec.OS === "Android" && spec.BROWSER === "Firefox") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testDeviceFirefoxOS(test, pass, miss) {
    var spec = new Spec();
    spec.USER_AGENT =  "Mozilla/5.0 (Mobile; rv:18.0) Gecko/18.0 Firefox/18.0";

    if (spec.DEVICE === "" && spec.OS === "Firefox") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}


function testDevice_INFOBAR_A01(test, pass, miss) {
    var spec = new Spec();
    spec.USER_AGENT = "Mozilla/5.0 (Linux; U; Android 2.3.3; ja-jp; INFOBAR A01 Build/S6160) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1";

    if (spec.DEVICE === "INFOBAR A01" && spec.OS === "Android") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testDeviceWindowsPhone8S(test, pass, miss) {
    var spec = new Spec();
    spec.USER_AGENT = "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; HTC; Windows Phone 8S by HTC)";

    if (spec.DEVICE === "Lumia 520" && spec.OS === "Windows") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testDeviceWindowsPhoneLumia920(test, pass, miss) {
    var spec = new Spec();
    spec.USER_AGENT = "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)";

    if (spec.DEVICE === "Lumia 920" && spec.OS === "Windows") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testDeviceKindle(test, pass, miss) {
    var spec = new Spec();
    spec.USER_AGENT = "Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; KFTT Build/IML74K) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.4 Mobile Safari/535.19 Silk-Accelerated=true";

    if (spec.DEVICE === "KFTT" && spec.OS === "Android") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testDeviceGooglePlayEdition(test, pass, miss) {
    var spec = new Spec();
    spec.USER_AGENT = "Mozilla/5.0 (Linux; U; Android 4.2.2; en-us; HTC6500LVW 4G Build/JDQ39) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";

    if (spec.DEVICE === "HTC6500LVW" && spec.OS === "Android") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testIsOS(test, pass, miss) {
    var spec = new Spec();
    spec.USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36";

    if (spec.OS === "Mac") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testIsBrowser(test, pass, miss) {
    var spec = new Spec();
    spec.USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36";

    if (spec.BROWSER === "Chrome") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testIsBrowserEngine(test, pass, miss) {
    var spec = new Spec();
    spec.USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36";

    if (spec.BROWSER_ENGINE === "Blink") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testMacPro(test, pass, miss) {
    var spec = new Spec();
    spec.USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36";

    if (spec.OS === "Mac" && parseFloat(spec.OS_VERSION) === 10.8 &&
        spec.OS_VERSION === "10.8.5") {

        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testIE11Preview(test, pass, miss) {
    var spec = new Spec();
    spec.USER_AGENT = "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko";

    if (spec.OS === "Windows" &&
        parseFloat(spec.OS_VERSION) === 6.1 &&
        spec.OS_VERSION === "6.1.0") {

        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testIE10(test, pass, miss) {
    var spec = new Spec();
    spec.USER_AGENT = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)";

    if (spec.OS === "Windows" &&
        parseFloat(spec.OS_VERSION) === 6.1 &&
        spec.OS_VERSION === "6.1.0") {

        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testFirefox11(test, pass, miss) {
    var spec = new Spec();
    spec.USER_AGENT = "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:11.0) Gecko/20100101 Firefox/11.0";

    if (spec.OS === "Windows" &&
        parseFloat(spec.OS_VERSION) === 6.1 &&
        spec.OS_VERSION === "6.1.0") {

        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testFirefox20(test, pass, miss) {
    var spec = new Spec();
    spec.USER_AGENT = "Mozilla/5.0 (Mobile; LGL25; rv:32.0) Gecko/32.0 Firefox/32.0";

    if (spec.OS === "Firefox" &&
        spec.DEVICE === "LGL25" &&
        parseFloat(spec.OS_VERSION) === 2.0 &&
        spec.OS_VERSION === "2.0.0") {

        test.done(pass());
    } else {
        test.done(miss());
    }
}


function testAlternateDevice(test, pass, miss) {
    var spec = new Spec();
    spec.USER_AGENT = "Mozilla/5.0 (Linux; Android 6.0.5; en-us; Nexus Ace Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19";

    if ( spec.DEVICE === "Nexus Ace" &&
         spec.OS_VERSION === "6.0.5") {

        var nexus5 = new Spec();
        nexus5.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";

        if (nexus5.SOC === spec.SOC &&
            nexus5.GPU === spec.GPU) {
            test.done(pass());
            return;
        }
    }
    test.done(miss());
}

function testDeviceFeature(test, pass, miss) {
    var spec = new Spec();
    spec.DISPLAY_DPR = 2;
    spec.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JWR66N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.111 Safari/537.36";

    if ( spec.BLE &&
         spec.NFC ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}



var userAgents = {
    IE11Preview: {
        USER_AGENT: "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko",
        OS: "Windows",
        OS_VERSION: 6.1,
        BROWSER: "IE",
        BROWSER_ENGINE: "Trident",
        BROWSER_VERSION: 11.0,
    },
    IE10: {
        USER_AGENT: "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)",
        OS: "Windows",
        OS_VERSION: 6.1,
        BROWSER: "IE",
        BROWSER_ENGINE: "Trident",
        BROWSER_VERSION: 10.0,
    },
    IE9: {
        USER_AGENT: "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
        OS: "Windows",
        OS_VERSION: 6.1,
        BROWSER: "IE",
        BROWSER_ENGINE: "Trident",
        BROWSER_VERSION: 9.0,
    },
    IE8: {
        USER_AGENT: "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)",
        OS: "Windows",
        OS_VERSION: 6.1,
        BROWSER: "IE",
        BROWSER_ENGINE: "Trident",
        BROWSER_VERSION: 8.0,
    },
/* http://borg4.vdomains.jp/~goro/diary/2015/2912
    Spartan: {
        USER_AGENT: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0",
        OS: "Windows",
        OS_VERSION: 10.0,
        BROWSER: "IE",
        BROWSER_ENGINE: "Trident",
        BROWSER_VERSION: 0.0,
    },
 */
    "WP7.5": {
        USER_AGENT: "Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)",
        OS: "Windows",
        OS_VERSION: 7.5,
        BROWSER: "IE",
        BROWSER_ENGINE: "Trident",
        BROWSER_VERSION: 9.0,
    },
    WP7: {
        USER_AGENT: "Mozilla/4.0 (compatible; MSIE 7.0; Windows Phone OS 7.0; Trident/3.1; IEMobile/7.0)",
        OS: "Windows",
        OS_VERSION: 7.0,
        BROWSER: "IE",
        BROWSER_ENGINE: "Trident",
        BROWSER_VERSION: 7.0,
    },
    OPNext: {
        USER_AGENT: "Mozilla/5.0 (Linux; Android 4.0.4; L-01D Build/IMM76D) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.123 Mobile Safari/537.22 OPR/14.0.1025.53005",
        OS: "Android",
        OS_VERSION: 4.0,
        BROWSER: "Chrome",
        BROWSER_ENGINE: "Blink",
        BROWSER_VERSION: 25.0,
    },
    Firefox16: {
        USER_AGENT: "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:16.0) Gecko/20100101 Firefox/16.0",
        OS: "Windows",
        OS_VERSION: 6.1,
        BROWSER_VERSION: 16.0,
        BROWSER_ENGINE: "Gecko",
        BROWSER: "Firefox",
    },
    FirefoxMobile: {
        USER_AGENT: "Mozilla/5.0 (Android; Mobile; rv:13.0) Gecko/13.0 Firefox/13.0",
        OS: "Android",
        OS_VERSION: 0.0,
        BROWSER_VERSION: 13.0,
        BROWSER_ENGINE: "Gecko",
        BROWSER: "Firefox",
    },
    FirefoxTablet: {
        USER_AGENT: "Mozilla/5.0 (Android; Tablet; rv:13.0) Gecko/13.0 Firefox/13.0",
        OS: "Android",
        OS_VERSION: 0.0,
        BROWSER_VERSION: 13.0,
        BROWSER_ENGINE: "Gecko",
        BROWSER: "Firefox",
    },
    Safari6: {
        USER_AGENT: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/536.30.1 (KHTML, like Gecko) Version/6.0.5 Safari/536.30.1",
        OS: "Mac",
        OS_VERSION: 10.8,
        BROWSER_VERSION: 6.0,
        BROWSER_ENGINE: "WebKit",
        BROWSER: "Safari",
    },
    "Android Browser": {
        USER_AGENT: "Mozilla/5.0 (Linux; U; Android 4.2.2; ja-jp; SonySOL23 Build/14.1.C.0.467) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
        //                                  ~~~~~~~~~~~~~  ~~~~~  ~~~~~~~~~ ~~~~~                                                                  ~~~~~~ 
        OS: "Android",
        OS_VERSION: 4.2,
        BROWSER_VERSION: 4.0,
        BROWSER_ENGINE: "WebKit",
        BROWSER: "AOSP",
    },
    "Android Browser WebView": {
        USER_AGENT: "Mozilla/5.0 (Linux; U; Android 4.1.1; en-gb; Build/KLP) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30",
        //                                  ~~~~~~~~~~~~~  ~~~~~  ~~~~~                                                        |(not Mobile)
        OS: "Android",
        OS_VERSION: 4.1,
        BROWSER_VERSION: 4.0,
        BROWSER_ENGINE: "WebKit",
        BROWSER: "AOSP",
    },
    "S Browser": {
        USER_AGENT: "Mozilla/5.0 (Linux; Android 4.2.2; ja-jp; SC-04E Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Version/1.0 Chrome/18.0.1025.308 Mobile Safari/535.19",
        //                               ~~~~~~~~~~~~~  ~~~~~  ~~~~~~ ~~~~~                                                           ~~~~~~~~~~~          ~~~~~~
        OS: "Android",
        OS_VERSION: 4.2,
        BROWSER_VERSION: 18.0,
        BROWSER_ENGINE: "Blink",
        BROWSER: "Chrome",
    },
    "Android KitKat Chrome WebView": {
        USER_AGENT: "Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36",
        //                               ~~~~~~~~~~~  ~~~~~~~ ~~~~~                                                             ~~~~~~~~~~~     ~~~~~~
        OS: "Android",
        OS_VERSION: 4.4,
        BROWSER_VERSION: 30.0,
        BROWSER_ENGINE: "Blink",
        BROWSER: "Chrome",
    },
    "Kindle": {
        USER_AGENT: "Mozilla/5.0 (Linux; Android 4.0.3; en-us; KFTT    Build/IML74K)  AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.4 Mobile Safari/535.19 Silk-Accelerated=true",
        //                               ~~~~~~~~~~~~~         ~~~~~~~ ~~~~~                                                 ~~~~~~~~
        OS: "Android",
        OS_VERSION: 4.0,
        BROWSER_VERSION: 3.4,
        BROWSER_ENGINE: "WebKit",
        BROWSER: "AOSP",
    },
    "Nexus7 Android 4.2 Chrome 18": {
        USER_AGENT: "Mozilla/5.0 (Linux; Android 4.2; Nexus 7 Build/JOP40C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19",
        //                               ~~~~~~~~~~~  ~~~~~~  ~~~~~                                                ~~~~~~~~~~~         |(not Mobile)
        OS: "Android",
        OS_VERSION: 4.2,
        BROWSER_VERSION: 18.0,
        BROWSER_ENGINE: "Blink",
        BROWSER: "Chrome",
    },
    "Xperia X10": {
        USER_AGENT: "Mozilla/5.0 (Linux; U; Android 1.6; en-gb; SonyEricssonX10i Build/R1AA040) AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1",
        OS: "Android",
        OS_VERSION: 1.6,
        BROWSER_VERSION: 3.1,
        BROWSER_ENGINE: "WebKit",
        BROWSER: "AOSP"
    },
    "iPhone 5 iOS 7 beta 6": {
        USER_AGENT: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/6.0 Mobile/11A4449d Safari/9537.53.25",
        OS: "iOS",
        OS_VERSION: 7.0,
        BROWSER_VERSION: 6.0,
        BROWSER_ENGINE: "WebKit",
        BROWSER: "Safari",
    },
    "iPhone 4s iOS 7.0.3": {
        USER_AGENT: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_3 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11B511 Safari/9537.53",
        OS: "iOS",
        OS_VERSION: 7.0,
        BROWSER_VERSION: 7.0,
        BROWSER_ENGINE: "WebKit",
        BROWSER: "Safari",
    },
    "iPad 2 iOS 6 beta": {
        USER_AGENT: "Mozilla/5.0 (iPad; CPU OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B176 Safari/7534.48.3",
        OS: "iOS",
        OS_VERSION: 5.1,
        BROWSER_VERSION: 5.1,
        BROWSER_ENGINE: "WebKit",
        BROWSER: "Safari",
    },
    "Xbox One": {
        USER_AGENT: "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; Xbox; Xbox One)",
        //                                                       ~~~~~~ don't look
        OS: "Windows",
        OS_VERSION: 6.2,
        BROWSER_VERSION: 10.0,
        BROWSER_ENGINE: "Trident",
        BROWSER: "IE",
    },
    "Xbox 360": { // IEMobile Based Browser.
        USER_AGENT: "Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0; Xbox)",
        //                                                            ~~~~~~ don't look
        OS: "Windows",
        OS_VERSION: 7.5,
        BROWSER_VERSION: 9.0,
        BROWSER_ENGINE: "Trident",
        BROWSER: "IE",
    },
    "PS 4": { // WebKit Based Browser.
        USER_AGENT: "Mozilla/5.0 (PlayStation 4 1.52) AppleWebKit/536.26 (KHTML, like Gecko)",
        //                                    ~~~~~~ don't look
        OS: "",
        OS_VERSION: 0.0,
        BROWSER_VERSION: 0.0,
        BROWSER_ENGINE: "",
        BROWSER: "",
    },
    "PS 3(WebKit)": { // WebKit Based Browser.
        USER_AGENT: "Mozilla/5.0 (PLAYSTATION 3 4.10) AppleWebKit/531.22.8 (KHTML, like Gecko)",
        //                                    ~~~~~~ don't look
        OS: "",
        OS_VERSION: 0.0,
        BROWSER_VERSION: 0.0,
        BROWSER_ENGINE: "",
        BROWSER: "",
    },
    "PS 3": { // Sony Original Browser.
        USER_AGENT: "Mozilla/5.0 (PLAYSTATION 3; 2.50) + Flash 9",
        //                                    ~~~~~~~ don't look
        OS: "",
        OS_VERSION: 0.0,
        BROWSER_VERSION: 0.0,
        BROWSER_ENGINE: "",
        BROWSER: "",
    },
    "PS 2": { // NetFront Based Browser.
        USER_AGENT: "Mozilla/4.0 (PS2; PlayStation BB Navigator 1.0) NetFront/3.0",
        OS: "",
        OS_VERSION: 0.0,
        BROWSER_VERSION: 0.0,
        BROWSER_ENGINE: "",
        BROWSER: "",
    },
    "PSP": { // NetFront Based Browser.
        USER_AGENT: "Mozilla/4.0 (PSP PlayStation Portable); 2.00)",
        OS: "",
        OS_VERSION: 0.0,
        BROWSER_VERSION: 0.0,
        BROWSER_ENGINE: "",
        BROWSER: "",
    },
    "PS Vita": { // WebKit Based Browser.
        USER_AGENT: "Mozilla/5.0 (PlayStation Vita 1.50) AppleWebKit/531.22.8 (KHTML, like Gecko) Silk/3.2",
        OS: "",
        OS_VERSION: 0.0,
        BROWSER_VERSION: 0.0,
        BROWSER_ENGINE: "",
        BROWSER: "",
    },
    "Wii": { // Opera Browser.
        USER_AGENT: "Opera/9.30 (Nintendo Wii; U; ; 3642; ja) with Flash Lite 3.1",
        //                                          ~~~~~ don't look
        OS: "",
        OS_VERSION: 0.0,
        BROWSER_VERSION: 0.0,
        BROWSER_ENGINE: "",
        BROWSER: "",
    },
    "Wii U": { // NetFrontNX Browser.
        USER_AGENT: "Mozilla/5.0 (Nintendo WiiU) AppleWebKit/536.28 (KHTML, like Gecko) NX/*** NintendoBrowser/***.JP",
        OS: "",
        OS_VERSION: 0.0,
        BROWSER_VERSION: 0.0,
        BROWSER_ENGINE: "",
        BROWSER: "",
    },
    "3DS": { // NetFront Based Browser.
        USER_AGENT: "Mozilla/5.0 (Nintendo 3DS; U; ; ja) Version/1.7412.JP",
        //                                                       ~~~~~~~~~ don't look
        OS: "",
        OS_VERSION: 0.0,
        BROWSER_VERSION: 0.0,
        BROWSER_ENGINE: "",
        BROWSER: "",
    }
};


function testBrowser(test, pass, miss) {

    var result = true;

    for (var testID in userAgents) {
        var data = userAgents[testID];
        var spec = new Spec();
        spec.USER_AGENT = data.USER_AGENT;

        for (var key in data) {
            if (/VERSION/.test(key)) {
                if (parseFloat(data[key]) !== parseFloat(spec[key])) {
                    console.log( key + ": " + data[key] + " -> " + spec[key] );
                    debugger;
                    result = false;
                    break;
                }
            } else if (data[key] !== spec[key]) {
                console.log( key + ": " + data[key] + " -> " + spec[key] );
                debugger;
                result = false;
                break;
            }
        }
    }
    if (result) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

/*
function test_isGoodByeAndroidBrowser(test, pass, miss) {

    var Chrom18             = "Mozilla/5.0 (Linux; Android 4.2;          Nexus 7   Build/JOP40C)       AppleWebKit/535.19 (KHTML, like Gecko)             Chrome/18.0.1025.166        Safari/535.19";
    var SBrowser            = "Mozilla/5.0 (Linux; Android 4.2.2; ja-jp; SC-04E    Build/JDQ39)        AppleWebKit/535.19 (KHTML, like Gecko) Version/1.0 Chrome/18.0.1025.308 Mobile Safari/535.19";
    var Browser422          = "Mozilla/5.0 (Linux; Android 4.2.2; ja-jp; SonySOL23 Build/14.1.C.0.467) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0                      Mobile Safari/534.30";
    var Browser411WebView   = "Mozilla/5.0 (Linux; Android 4.1.1; en-gb;           Build/KLP)          AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0                             Safari/534.30";
    var KitKatChromeWebView = "Mozilla/5.0 (Linux; Android 4.4;          Nexus 5   Build/BuildID)      AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0      Mobile Safari/537.36";

    var result = {
            0: new Spec({ USER_AGENT: Chrom18 }).isGoodByeAndroidBrowser() === false,
            1: new Spec({ USER_AGENT: SBrowser }).isGoodByeAndroidBrowser() === true,
            2: new Spec({ USER_AGENT: Browser422 }).isGoodByeAndroidBrowser() === true,
            3: new Spec({ USER_AGENT: Browser411WebView }).isGoodByeAndroidBrowser() === true,
            4: new Spec({ USER_AGENT: KitKatChromeWebView }).isGoodByeAndroidBrowser() === false,
        };

    var ok = true;

    for (var id in result) {
        ok = result[id];
        if (!ok) {
            break;
        }
    }
    if (ok) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}
 */

/*
function test_getHardwareConcurrency(test, pass, miss) {
    var spec = new Spec();
    spec.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";

    if (spec.CPU_CORES > 0) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}
 */

function testScriptHash(test, pass, miss) {
/*
    if ( !global["Hash"] ) {
        test.done(miss());
    }
    var Hash = global["Hash"];

    if (Hash["XXHash"](Hash["STR_U8A"](Spec)
 */
        test.done(pass());
}


function testSpec_LegacySonyDevice(test, pass, miss) {
    var spec = new Spec();

    spec.USER_AGENT = "Mozilla/5.0 (Linux; U; Android 4.2.2; ja-jp; SonySOL23 Build/14.1.C.0.467) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";
          //                                  ~~~~~~~~~~~~~  ~~~~~  ~~~~~~~~~ ~~~~~                                                                  ~~~~~~ 
    if (spec.OS === "Android" &&
        parseFloat(spec.OS_VERSION) === 4.2 &&
        parseFloat(spec.BROWSER_VERSION) === 4.0 &&
        spec.BROWSER_ENGINE === "WebKit" &&
        spec.BROWSER === "AOSP") {

        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_SLOW_CPU(test, pass, miss) {
    var spec1 = new Spec();
    var spec2 = new Spec();

    // SC-01E APQ8060 1.2GHz x 2 Cores -> SLOW
    spec1.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.4; SC-01E Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";

    // Nexus 7 (2012) T30L 1.3GHz x 4 Cores -> NOT SLOW
    spec2.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JWR66N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.111 Safari/537.36";

    if (spec1.SLOW_CPU && !spec2.SLOW_CPU) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_SLOW_GPU(test, pass, miss) {
    var spec1 = new Spec();
    var spec2 = new Spec();

    // Nexus 7 (2012) T30L 12.5 GFLOPS -> SLOW
    spec1.DISPLAY_DPR = 1.5;
    spec1.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JWR66N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.111 Safari/537.36";

    // VAIO Phone MSM8916 ADRENO 306 21.6 GFLOPS -> SLOW
    spec2.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.4; VA-10 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";

    if (spec1.SLOW_GPU && !spec2.SLOW_GPU) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_OLD_DEVICE(test, pass, miss) {
    var keep = Spec["SETTING"]["OLD_DEVICE_THRESHOLD"]; // 現在の設定を保存

    Spec["SETTING"]["OLD_DEVICE_THRESHOLD"] = 24; // 24ヶ月にセット

    var spec1 = new Spec();
    var spec2 = new Spec();
    var spec3 = new Spec();
    var spec4 = new Spec();

    var now = (new Date(2017, 2, 30)).getTime(); // 2017-03

    // Nexus 7 2012-07 -> OLD DEVICE
    spec1.CURRENT_TIME = now;
    spec1.DISPLAY_DPR = 1.5;
    spec1.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JWR66N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.111 Safari/537.36";

    // SH-04E 2013-01 and NOT VERSION UP -> OLD DEVICE
    spec2.CURRENT_TIME = now;
    spec2.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.4; SH-04E Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";

    // 2015年03月に発売された VA-10J が2年後の2017年03月までは NEW_DEVICE として扱われる事を確認する
    // VA-10J 2015-03 -> NEW DEVICE (expire 2017-03)
    spec3.CURRENT_TIME = now;
    spec3.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.4; VA-10J Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";

    // 2017年04月に VA-10J が OLD_DEVICE になる事を確認する
    // VA-10J 2015-03 -> OLD DEVICE (expire 2017-03)
    spec4.CURRENT_TIME = (new Date(2017, 3, 30)).getTime(); // 2017-04
    spec4.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.4; VA-10J Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";

    Spec["SETTING"]["OLD_DEVICE_THRESHOLD"] = keep; // 設定を元に戻す

    if (spec1.OLD_DEVICE && spec2.OLD_DEVICE && !spec3.OLD_DEVICE && spec4.OLD_DEVICE) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_BLE(test, pass, miss) {
    var spec1 = new Spec();
    var spec2 = new Spec();

    // Android 4.4 is BLE READY
    spec1.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    // Android 4.2 is BLE NOT READY
    spec2.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.2; Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";

    if (spec1.BLE && !spec2.BLE) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_NFC(test, pass, miss) {
    var spec1 = new Spec();
    var spec2 = new Spec();

    // SO-03E BLE READY
    spec1.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.4; SO-03E Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    // SH-07D BLE NOT READY
    spec2.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.2; SH-07D Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";

    if (spec1.NFC && !spec2.NFC) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_ATOM(test, pass, miss) {
    var spec1 = new Spec();
    var spec2 = new Spec();

    // AST21 is ATOM
    spec1.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.4; AST21 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    // SOT21 is NOT ATOM
    spec2.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.2; SOT21 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";

    if (spec1.ATOM && !spec2.ATOM) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_SIMD(test, pass, miss) {
    var spec1 = new Spec();
    var spec2 = new Spec();

    // NW-Z1000Series is unsupportd SIMD(NEON)
    spec1.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.0.2; NW-Z1000Series Build/xxxx) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19";
    // Nexus 7 is supported SIMD(NEON)
    spec2.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JWR66N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.111 Safari/537.36";

    if (!spec1.SIMD && spec2.SIMD) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_WEBP(test, pass, miss) {
    var spec = new Spec();

    setTimeout(function() {
        if (spec.WEBP & 0x01) { console.log("WebP lossy ready"); }
        if (spec.WEBP & 0x02) { console.log("WebP lossless ready"); }
        if (spec.WEBP & 0x04) { console.log("WebP alpha ready"); }
        if (spec.WEBP & 0x08) { console.log("WebP animation ready"); }
        test.done(pass());
    }, 100); // because async detection.
}

function testSpec_CPU_MAX_THREADS(test, pass, miss) {
    var spec = new Spec();

    if (spec.CPU_MAX_THREADS >= 2) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_GPU_MAX_TEXTURE_SIZE(test, pass, miss) {
    var spec1 = new Spec();
    var spec2 = new Spec();

    // LGV32 is GPU_MAX_TEXTURE_SIZE = 16 * 1024
    spec1.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.0; LGV32 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    // Galaxy S6 is GPU_MAX_TEXTURE_SIZE = 4 * 1024
    spec2.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.0; Galaxy S6 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";

    if (spec1.GPU_MAX_TEXTURE_SIZE === 16 * 1024 && spec2.GPU_MAX_TEXTURE_SIZE === 4 * 1024) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_MAX_TOUCH_POINTS(test, pass, miss) {
    var spec1 = new Spec();
    var spec2 = new Spec();

    // Android 4.0 is MultiTouch READY
    spec1.USER_AGENT = "Mozilla/5.0 (Linux; Android 4.0; Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    // Android 2.3 is MultiTouch NOT READY
    spec2.USER_AGENT = "Mozilla/5.0 (Linux; Android 2.3; Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";

    if (spec1.MAX_TOUCH_POINTS >= 2 && spec2.MAX_TOUCH_POINTS < 2) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_WEBGL_CONTEXT(test, pass, miss) {
    var spec = new Spec();

    switch ( spec.WEBGL_CONTEXT ) {
    case "webgl2":
    case "experimental-webgl2":
    case "webgl":
    case "experimental-webgl":
        test.done(pass());
        break;
    case "":
        test.done(pass());
        break;
    default:
        test.done(miss());
    }
}

function testSpec_WEBGL_VERSION(test, pass, miss) {
    var spec = new Spec();

    var version = spec.WEBGL_VERSION; // WebGL 1.0 (OpenGL ES 2.0 IMGSGX543-113.3)

    if (IN_BROWSER || IN_NW) {
        if (/WebGL/.test(version)) {
            test.done(pass());
            return;
        }
    }
    if (!version) {
        test.done(pass());
        return;
    }
    test.done(miss());
}

function testSpec_SpecialUserAgent(test, pass, miss) {

    var source = [
        // http://www.au.kddi.com/developer/android/kishu/ua/
        "Mozilla/5.0 (Linux; Android 5.0.2; SOT31 Build/xxxx; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/42.0.2311.138 Safari/537.36",
        "Mozilla/5.0 (Linux; Android 5.1; KYT31 Build/xxxx; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/42.0.2311.137 Safari/537.36",
        "Mozilla/5.0 (Linux; Android 5.0.2; SHV32 Build/S5231; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/42.0.2311.129 Mobile Safari/537.36",
    ];
    var result = [
        "SOT31",
        "KYT31",
        "SHV32"
    ];

    var ok = source.every(function(ua, index) {
        var spec = new Spec();

        spec.USER_AGENT = ua;

        //alert(spec.DEVICE + ":" + spec.WEB_VIEW);
        return spec.DEVICE === result[index];
    });

    if (ok) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}


return test.run();

})(GLOBAL);

