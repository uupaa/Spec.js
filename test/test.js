var ModuleTestSpec = (function(global) {

var _runOnNode = "process" in global;
var _runOnWorker = "WorkerLocation" in global;
var _runOnBrowser = "document" in global;

var test = new Test("Spec", {
        disable:    false,
        browser:    true,
        worker:     true,
        node:       true,
        button:     true,
        both:       true,
    }).add([
        // ---
        testSpec,
        testSpecParamUserAgent,
        testSpecParamDeviceInfo,
        //testSpec_normalizeVersionString,
        // ---
        testDeviceiPhone5,
        testDeviceNexus5,
        testDeviceRevision_Nexus7_2013,
        testFirefoxMobileForAndroid,
        testDeviceFirefoxOS,
        testDevice_INFOBAR_A01,
        testDeviceWindowsPhone8S,
        testDeviceWindowsPhoneLumia920,
        testDeviceKindle,
        testDeviceGooglePlayEdition,
        // ---
        testOS,
        testMacPro,
        testIE11Preview,
        testIE10,
        testWindowsPhone75,
        testFirefox11,
        // ---
        testBrowser,
        testAlternateDevice,
        testUnknownDevice,
        // ---
        testCanDeviceFeature,
        // ---
        testPrefix,
        // --- Media.js ---
        testMediaSpec,
    ]);

if (_runOnBrowser) {
    test.add([
        test_isGoodByeAndroidBrowser,
        test_getHardwareConcurrency,
        test_getMaxConnections,
        test_getConnectionsPerHost,
        test_isMobileDevice,
    ]);
}

var userAgents = {
    IE11Preview: {
        ua: "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko",
        os: "Windows",
        osVer: 6.1,
        browserVer: 11.0,
        engine: "Trident",
        browser: "IE",
    },
    IE10: {
        ua: "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)",
        os: "Windows",
        osVer: 6.1,
        browserVer: 10.0,
        engine: "Trident",
        browser: "IE",
    },
    IE9: {
        ua: "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
        os: "Windows",
        osVer: 6.1,
        browserVer: 9.0,
        engine: "Trident",
        browser: "IE",
    },
    IE8: {
        ua: "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)",
        os: "Windows",
        osVer: 6.1,
        browserVer: 8.0,
        engine: "Trident",
        browser: "IE",
    },
    "WP7.5": {
        ua: "Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)",
        os: "WPhone",
        osVer: 7.5,
        browserVer: 9.0,
        engine: "Trident",
        browser: "IE",
    },
    WP7: {
        ua: "Mozilla/4.0 (compatible; MSIE 7.0; Windows Phone OS 7.0; Trident/3.1; IEMobile/7.0)",
        os: "WPhone",
        osVer: 7.0,
        browserVer: 7.0,
        engine: "Trident",
        browser: "IE",
    },
    OPNext: {
        ua: "Mozilla/5.0 (Linux; Android 4.0.4; L-01D Build/IMM76D) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.123 Mobile Safari/537.22 OPR/14.0.1025.53005",
        os: "Android",
        osVer: 4.0,
        browserVer: 25.0,
        engine: "Blink",
        browser: "Chrome",
    },
    Firefox16: {
        ua: "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:16.0) Gecko/20100101 Firefox/16.0",
        os: "Windows",
        osVer: 6.1,
        browserVer: 16.0,
        engine: "Gecko",
        browser: "Firefox",
    },
    FirefoxMobile: {
        ua: "Mozilla/5.0 (Android; Mobile; rv:13.0) Gecko/13.0 Firefox/13.0",
        os: "Android",
        osVer: 0.0,
        browserVer: 13.0,
        engine: "Gecko",
        browser: "Firefox",
    },
    FirefoxTablet: {
        ua: "Mozilla/5.0 (Android; Tablet; rv:13.0) Gecko/13.0 Firefox/13.0",
        os: "Android",
        osVer: 0.0,
        browserVer: 13.0,
        engine: "Gecko",
        browser: "Firefox",
    },
    Safari6: {
        ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/536.30.1 (KHTML, like Gecko) Version/6.0.5 Safari/536.30.1",
        os: "Mac",
        osVer: 10.8,
        browserVer: 6.0,
        engine: "WebKit",
        browser: "Safari",
    },
    "Android Browser": {
        ua: "Mozilla/5.0 (Linux; U; Android 4.2.2; ja-jp; SonySOL23 Build/14.1.C.0.467) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
        //                          ~~~~~~~~~~~~~  ~~~~~  ~~~~~~~~~ ~~~~~                                                                  ~~~~~~ 
        os: "Android",
        osVer: 4.2,
        webView: false,
        browserVer: 4.0,
        engine: "WebKit",
        browser: "Browser",
    },
    "Android Browser WebView": {
        ua: "Mozilla/5.0 (Linux; U; Android 4.1.1; en-gb; Build/KLP) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30",
        //                          ~~~~~~~~~~~~~  ~~~~~  ~~~~~                                                        |(not Mobile)
        os: "Android",
        osVer: 4.1,
        webView: true,
        browserVer: 4.0,
        engine: "WebKit",
        browser: "Browser",
    },
    "S Browser": {
        ua: "Mozilla/5.0 (Linux; Android 4.2.2; ja-jp; SC-04E Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Version/1.0 Chrome/18.0.1025.308 Mobile Safari/535.19",
        //                       ~~~~~~~~~~~~~  ~~~~~  ~~~~~~ ~~~~~                                                           ~~~~~~~~~~~          ~~~~~~
        os: "Android",
        osVer: 4.2,
        webView: false,
        browserVer: 18.0,
        engine: "Blink",
        browser: "Chrome",
    },
    "Android KitKat Chrome WebView": {
        ua: "Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36",
        //                       ~~~~~~~~~~~  ~~~~~~~ ~~~~~                                                             ~~~~~~~~~~~     ~~~~~~
        os: "Android",
        osVer: 4.4,
        webView: true,
        browserVer: 30.0,
        engine: "Blink",
        browser: "Chrome",
    },
    "Kindle": {
        ua: "Mozilla/5.0 (Linux; Android 4.0.3; en-us; KFTT    Build/IML74K)  AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.4 Mobile Safari/535.19 Silk-Accelerated=true",
        //                       ~~~~~~~~~~~~~         ~~~~~~~ ~~~~~                                                 ~~~~~~~~
        os: "Android",
        osVer: 4.0,
        webView: false,
        browserVer: 3.4,
        engine: "WebKit",
        browser: "Browser",
    },
    "Nexus7 Android 4.2 Chrome 18": {
        ua: "Mozilla/5.0 (Linux; Android 4.2; Nexus 7 Build/JOP40C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19",
        //                       ~~~~~~~~~~~  ~~~~~~  ~~~~~                                                ~~~~~~~~~~~         |(not Mobile)
        os: "Android",
        osVer: 4.2,
        webView: false,
        browserVer: 18.0,
        engine: "Blink",
        browser: "Chrome",
    },
    "Xperia X10": {
        ua: "Mozilla/5.0 (Linux; U; Android 1.6; en-gb; SonyEricssonX10i Build/R1AA040) AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1",
        os: "Android",
        osVer: 1.6,
        browserVer: 3.1,
        engine: "WebKit",
        browser: "Browser",
    },
    "iPhone 5 iOS 7 beta 6": {
        ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/6.0 Mobile/11A4449d Safari/9537.53.25",
        os: "iOS",
        osVer: 7.0,
        browserVer: 6.0,
        engine: "WebKit",
        browser: "Safari",
    },
    "iPhone 4s iOS 7.0.3": {
        ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_3 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11B511 Safari/9537.53",
        os: "iOS",
        osVer: 7.0,
        browserVer: 7.0,
        engine: "WebKit",
        browser: "Safari",
    },
    "iPad 2 iOS 6 beta": {
        ua: "Mozilla/5.0 (iPad; CPU OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B176 Safari/7534.48.3",
        os: "iOS",
        osVer: 5.1,
        browserVer: 5.1,
        engine: "WebKit",
        browser: "Safari",
    },
    "Xbox One": {
        ua: "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; Xbox; Xbox One)",
        //                                               ~~~~~~ don't look
        os: "Game",
        osVer: 0.0,
        browserVer: 10.0,
        engine: "Trident",
        browser: "IE",
    },
    "Xbox 360": { // IEMobile Based Browser.
        ua: "Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0; Xbox)",
        //                                                    ~~~~~~ don't look
        os: "Game",
        osVer: 0.0,
        browserVer: 9.0,
        engine: "Trident",
        browser: "IE",
    },
    "PS 4": { // WebKit Based Browser.
        ua: "Mozilla/5.0 (PlayStation 4 1.52) AppleWebKit/536.26 (KHTML, like Gecko)",
        //                            ~~~~~~ don't look
        os: "Game",
        osVer: 0.0,
        browserVer: 0.0,
        engine: "WebKit",
        browser: "WebKit",
    },
    "PS 3(WebKit)": { // WebKit Based Browser.
        ua: "Mozilla/5.0 (PLAYSTATION 3 4.10) AppleWebKit/531.22.8 (KHTML, like Gecko)",
        //                            ~~~~~~ don't look
        os: "Game",
        osVer: 0.0,
        browserVer: 0.0,
        engine: "WebKit",
        browser: "WebKit",
    },
    "PS 3": { // Sony Original Browser.
        ua: "Mozilla/5.0 (PLAYSTATION 3; 2.50) + Flash 9",
        //                            ~~~~~~~ don't look
        os: "Game",
        osVer: 0.0,
        browserVer: 0.0,
        engine: "",
        browser: "",
    },
    "PS 2": { // NetFront Based Browser.
        ua: "Mozilla/4.0 (PS2; PlayStation BB Navigator 1.0) NetFront/3.0",
        os: "Game",
        osVer: 0.0,
        browserVer: 0.0,
        engine: "",
        browser: "",
    },
    "PSP": { // NetFront Based Browser.
        ua: "Mozilla/4.0 (PSP PlayStation Portable); 2.00)",
        os: "Game",
        osVer: 0.0,
        browserVer: 0.0,
        engine: "",
        browser: "",
    },
    "PS Vita": { // WebKit Based Browser.
        ua: "Mozilla/5.0 (PlayStation Vita 1.50) AppleWebKit/531.22.8 (KHTML, like Gecko) Silk/3.2",
        os: "Game",
        osVer: 0.0,
        browserVer: 0.0,
        engine: "WebKit",
        browser: "WebKit",
    },
    "Wii": { // Opera Browser.
        ua: "Opera/9.30 (Nintendo Wii; U; ; 3642; ja) with Flash Lite 3.1",
        //                                  ~~~~~ don't look
        os: "Game",
        osVer: 0.0,
        browserVer: 0.0,
        engine: "",
        browser: "",
    },
    "Wii U": { // NetFrontNX Browser.
        ua: "Mozilla/5.0 (Nintendo WiiU) AppleWebKit/536.28 (KHTML, like Gecko) NX/*** NintendoBrowser/***.JP",
        os: "Game",
        osVer: 0.0,
        browserVer: 0.0,
        engine: "WebKit",
        browser: "WebKit",
    },
    "3DS": { // NetFront Based Browser.
        ua: "Mozilla/5.0 (Nintendo 3DS; U; ; ja) Version/1.7412.JP",
        //                                               ~~~~~~~~~ don't look
        os: "Game",
        osVer: 0.0,
        browserVer: 0.0,
        engine: "",
        browser: "",
    }
};

return test.run().clone();

function testSpec(test, pass, miss) {
    var spec = new Spec();

    test.done(pass());
}

function testSpecParamUserAgent(test, pass, miss) {
    var ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25";
    var spec = new Spec({ USER_AGENT: ua });

    if (spec.USER_AGENT === ua) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpecParamDeviceInfo(test, pass, miss) {
    var ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25";
    var spec = new Spec({ USER_AGENT: ua, DISPLAY_DPR: 2 });

    if (spec.DISPLAY_DPR === 2) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

/*
function testSpec_normalizeVersionString(test, pass, miss) {
    var result = [
            "0.0.0",    Spec.normalizeVersionString("0.0.0"),
            "1.2.3",    Spec.normalizeVersionString("1.2.3"),
            "10.11.12", Spec.normalizeVersionString("10.11.12"),
            "10.11.12", Spec.normalizeVersionString("10.11.12a"),
            "0.0.0",    Spec.normalizeVersionString("0"),
            "0.1.0",    Spec.normalizeVersionString("0.1"),
            "0.0.1",    Spec.normalizeVersionString("0.0.1"),
        ];

    var ok = true;

    for (var i = 0, iz = result.length; i < iz; i += 2) {
        if ( result[i] !== result[i + 1] ) {
            ok = false;
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

// ------------------------------------------
function testDeviceiPhone5(test, pass, miss) {
    var env = {
            DISPLAY_DPR: 2,
            DISPLAY_LONG: 320,
            DISPLAY_SHORT: 568,
            USER_AGENT: "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25"
        };

    var spec = new Spec(env);

    if (spec.DEVICE_ID === "iPhone 5" &&
        spec.OS === "iOS") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testDeviceNexus5(test, pass, miss) {
    var userAgent = "Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    var spec = new Spec({ USER_AGENT: userAgent });

    if (spec.DEVICE_ID === "Nexus 5" &&
        spec.OS === "Android") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testDeviceRevision_Nexus7_2013(test, pass, miss) {
    var env = {
            USER_AGENT: "Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JWR66N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.111 Safari/537.36",
            DISPLAY_DPR: 2
        };

    var spec = new Spec(env);

    if (spec.DEVICE_ID === "Nexus 7 (2013)" &&
        spec.OS === "Android") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testFirefoxMobileForAndroid(test, pass, miss) {
    var env = {
            USER_AGENT: "Mozilla/5.0 (Android; Mobile; rv:13.0) Gecko/13.0 Firefox/13.0"
        };

    var spec = new Spec(env);

    if (//spec.ID === "" &&
        spec.OS === "Android") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testDeviceFirefoxOS(test, pass, miss) {
    var env = {
            USER_AGENT: "Mozilla/5.0 (Mobile; rv:18.0) Gecko/18.0 Firefox/18.0"
        };

    var spec = new Spec(env);

    if (spec.DEVICE_ID === "" &&
        spec.OS === "Firefox") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}


function testDevice_INFOBAR_A01(test, pass, miss) {
    var env = {
            USER_AGENT: "Mozilla/5.0 (Linux; U; Android 2.3.3; ja-jp; INFOBAR A01 Build/S6160) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
        };

    var spec = new Spec(env);

    if (spec.DEVICE_ID === "INFOBAR A01" &&
        spec.OS === "Android") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testDeviceWindowsPhone8S(test, pass, miss) {
    var env = {
            USER_AGENT: "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; HTC; Windows Phone 8S by HTC)"
        };

    var spec = new Spec(env);

    if (spec.DEVICE_ID === "Lumia 520" &&
//      spec.DEVICE_ID === "8S" &&
        spec.OS === "WPhone") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testDeviceWindowsPhoneLumia920(test, pass, miss) {
    var env = {
            USER_AGENT: "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)"
        };

    var spec = new Spec(env);

    if (spec.DEVICE_ID === "Lumia 920" &&
        spec.OS === "WPhone") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testDeviceKindle(test, pass, miss) {
    var env = {
            USER_AGENT: "Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; KFTT Build/IML74K) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.4 Mobile Safari/535.19 Silk-Accelerated=true"
        };

    var spec = new Spec(env);

    if (spec.DEVICE_ID === "KFTT" &&
        spec.OS === "Android") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testDeviceGooglePlayEdition(test, pass, miss) {
    var env = {
            USER_AGENT: "Mozilla/5.0 (Linux; U; Android 4.2.2; en-us; HTC6500LVW 4G Build/JDQ39) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"
        };

    var spec = new Spec(env);

    if (spec.DEVICE_ID === "HTC6500LVW" &&
        spec.OS === "Android") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testOS(test, pass, miss) {
    var spec = new Spec();

    test.done(pass());
}

function testMacPro(test, pass, miss) {
    var env = {
            USER_AGENT: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36"
        };
    var spec = new Spec(env);

    if (spec.OS === "Mac" &&
        parseFloat(spec.OS_VERSION) === 10.8 &&
        spec.OS_VERSION === "10.8.5") {

        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testIE11Preview(test, pass, miss) {
    var env = {
            USER_AGENT: "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko"
        };
    var spec = new Spec(env);

    if (spec.OS === "Windows" &&
        parseFloat(spec.OS_VERSION) === 6.1 &&
        spec.OS_VERSION === "6.1.0") {

        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testIE10(test, pass, miss) {
    var env = {
            USER_AGENT: "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)"
        };
    var spec = new Spec(env);

    if (spec.OS === "Windows" &&
        parseFloat(spec.OS_VERSION) === 6.1 &&
        spec.OS_VERSION === "6.1.0") {

        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testWindowsPhone75(test, pass, miss) {
    var env = {
            USER_AGENT: "Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)"
        };
    var spec = new Spec(env);

    if (spec.OS === "WPhone" &&
        parseFloat(spec.OS_VERSION) === 7.5 &&
        spec.OS_VERSION === "7.5.0") {

        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testFirefox11(test, pass, miss) {
    var env = {
            USER_AGENT: "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:11.0) Gecko/20100101 Firefox/11.0"
        };
    var spec = new Spec(env);

    if (spec.OS == "Windows" &&
        parseFloat(spec.OS_VERSION) === 6.1 &&
        spec.OS_VERSION === "6.1.0") {

        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testBrowser(test, pass, miss) {

    var result = true;

    for (var id in userAgents) {
        var data = userAgents[id];
        var spec = null;
        var env = { USER_AGENT: data.ua };

        try {
            console.log(data.ua);
            spec = new Spec(env);
        } catch (err) {
            console.log( "ERROR: " + data.ua);
            result = false;
            break;
        }
        var ok = true;

        if (data.os !== spec.OS) {
            console.log( "OS             : " + data.os,         " -> " + spec.OS );
            ok = false;
        }
        if (data.osVer != parseFloat(spec.OS_VERSION)) {
            console.log( "OS_VERSION     : " + data.osVer,      " -> " + spec.OS_VERSION );
            ok = false;
        }
        if (data.browserVer != parseFloat(spec.BROWSER_VERSION)) {
            console.log( "BROWSER_VERSION: " + data.browserVer, " -> " + spec.BROWSER_VERSION );
            ok = false;
        }
        if (data.engine != spec.BROWSER_ENGINE) {
            console.log( "BROWSER_ENGINE : " + data.engine,     " -> " + spec.BROWSER_ENGINE );
            ok = false;
        }
        if (data.browser != spec.BROWSER_NAME) {
            console.log( "BROWSER_NAME   : " + data.browser,    " -> " + spec.BROWSER_NAME );
            ok = false;
        }
        if (!ok) {
            debugger;
            result = false;
            break;
        }
    }
    if (result) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testAlternateDevice(test, pass, miss) {
    var override = {
            alt: true,
            USER_AGENT: "Mozilla/5.0 (Linux; Android 6.0.5; en-us; Nexus Ace Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
        };

    var spec = new Spec(override);

    if ( spec.DETECTED === false &&
         spec.CANDIDATE[0] === "Nexus Ace" &&
         spec.OS_VERSION === "6.0.5") {

        test.done(pass());
    } else {
        test.done(miss());
    }
}
function testUnknownDevice(test, pass, miss) {
    var override = {
            alt: false,
            USER_AGENT: "Mozilla/5.0 (Linux; Android 6.0.5; en-us; Nexus Ace Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
        };

    var spec = new Spec(override);

    if ( spec.DETECTED === false &&
         spec.CANDIDATE.length === 0 &&
         spec.OS_VERSION === "6.0.5") {

        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testCanDeviceFeature(test, pass, miss) {
    var env = {
            USER_AGENT: "Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JWR66N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.111 Safari/537.36",
            DISPLAY_DPR: 2
        };

    var spec = new Spec(env);

    if ( spec.canDeviceFeature("NFC") &&
         spec.canDeviceFeature("3G")  &&
         spec.canDeviceFeature("LTE") &&
         spec.canDeviceFeature("NFC") ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}


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

function test_getHardwareConcurrency(test, pass, miss) {
    var env = {
            USER_AGENT: "Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36"
        };
    var result = new Spec(env).getHardwareConcurrency();

    if (result > 0) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function test_getMaxConnections(test, pass, miss) {
    var env = {
            USER_AGENT: "Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36"
        };
    var result = new Spec(env).getMaxConnections();

    if (result > 0) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function test_getConnectionsPerHost(test, pass, miss) {
    var env = {
            USER_AGENT: "Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36"
        };
    var result = new Spec(env).getConnectionsPerHost();

    if (result > 0) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function test_isMobileDevice(test, pass, miss) {
    var env = {
            USER_AGENT: "Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36"
        };
    var result = new Spec(env).isMobileDevice();

    if (result) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testPrefix(test, pass, miss) {
    var env = {
            USER_AGENT: "Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36"
        };
    var parentObject = {
            "webkitAudioContext": function() {
            }
        };

    var result = new Spec(env).prefix(parentObject, "AudioContext");

    if (result) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

// --- Media.js ---
function testMediaSpec(test, pass, miss) {

    var spec = new Spec();
    var audioReady = spec.canMedia("AUDIO");
    var videoReady = spec.canMedia("video");
    var webAudioReady = spec.canMedia("webaudio");

    if ( audioReady ||
         videoReady ||
         webAudioReady ) {

        console.log("MP3: " + spec.canMedia("mp3"));
        console.log("MP4: " + spec.canMedia("MP4"));
        console.log("Ogg: " + spec.canMedia("ogg"));
        console.log("Wav: " + spec.canMedia("wav"));
        console.log("WebM:" + spec.canMedia("webm"));

        console.log("testMediaSpec ok");
        test.done(pass());
    } else {
        console.log("Media disabled");

        if (_runOnNode || _runOnWorker) {
            console.log("testMediaSpec ok");
            test.done(pass());
        } else {
            console.log("testMediaSpec ng");
            test.done(miss());
        }
    }
}

})((this || 0).self || global);

