/*

- DEVICE
    - docomo        http://spec.nttdocomo.co.jp/spmss/
    - au            http://www.au.kddi.com/developer/android/
    - softbank      https://www.support.softbankmobile.co.jp/partner/smp_info/smp_info_search_t.cfm
    - mozilla       https://wiki.mozilla.org/Compatibility/UADetectionLibraries
    - Device list   https://www.handsetdetection.com/properties/vendormodel/
    - Windows Phone
        - WindowsPhone 7.x http://en.wikipedia.org/wiki/List_of_Windows_Phone_7_devices   (2014-10-14 end of support)
        - WindowsPhone 8.0 http://en.wikipedia.org/wiki/List_of_Windows_Phone_8_devices   (2015-12-14 end of support)
        - WindowsPhone 8.1 http://en.wikipedia.org/wiki/List_of_Windows_Phone_8.1_devices (2017-07-11 end of support)
- GPU
    - Snapdragon http://en.wikipedia.org/wiki/Snapdragon_(system_on_chip)
    - HiSilicon  http://en.wikipedia.org/wiki/HiSilicon
    - PowerVR    http://en.wikipedia.org/wiki/PowerVR
    - Adreno     https://developer.qualcomm.com/mobile-development/maximize-hardware/mobile-gaming-graphics-adreno/adreno-gpu
    - TEGRA      http://www.nvidia.com/object/tegra-superchip.html
    - OMAP       http://en.wikipedia.org/wiki/OMAP
    - Mali       http://en.wikipedia.org/wiki/Mali_%28GPU%29
    - Apple      https://developer.apple.com/library/ios/documentation/DeviceInformation/Reference/iOSDeviceCompatibility/OpenGLESPlatforms/OpenGLESPlatforms.html
    - Intel
        - http://ark.intel.com/ja/products/series/76761/Intel-Atom-Processor-Z3700-Series
        - http://ja.wikipedia.org/wiki/Intel_HD_Graphics
        - https://software.intel.com/sites/default/files/managed/68/de/Introducing%204th%20Generation%20Intel%C2%AE%20Atom%E2%84%A2%20Processor,%20BayTrail,%20to%20Android%20Developers.pdf
    - GFLOPS
        - http://kyokojap.myweb.hinet.net/gpu_gflops/
    - OpenGL ES support level
        - Open GL ES 2.x, 3.x は Hardware(GPU)とSoftware(OS)の両方がサポートしていないと利用可能にならない
        - OS Version Limit
            - Android 5.0 >= OpenGL ES 3.1 (API Level 21)
            - Android 4.3 >= OpenGL ES 3.0 (API Level 18)
            - Android 2.2 >= OpenGL ES 2.0 (API Level 8)
            - Android 1.0 >= OpenGL ES 1.0 / 1.1
                - http://developer.android.com/guide/topics/graphics/opengl.html
            - iOS 8 >= OpenGL ES 3.0 + Metal
            - iOS 7 >= OpenGL ES 3.0
            - iOS 3 >= OpenGL ES 2.0
        - get Open GL ES version string
            - gl.getParameter(gl.VERSION)
                - "WebGL 1.0 (OpenGL ES 2.0 APPLE-10.1.5)" (in iPhone 5s)
                - "WebGL 1.0 (OpenGL ES 2.0 Chromium)"     (in Opera Mac)
                - "WebGL 1.0 (OpenGL ES 2.0 Chromium)"     (in Chrome Mac)
                - "WebGL 1.0"                              (in Firefox Mac)
    - GPU Rasterization in Chrome
        - Chrome 38+
        - Android 4.4+
        - OpenGL ES 3.0+
        - `<meta name="viewport" content="width=device-width, minimum-scale=1.0">`
    - WebGL support devices http://ja.wikipedia.org/wiki/WebGL
        - iOS 8.0+
        - Chrome 30+ && OpenGL ES 3.0+
            - NEED GL_ARB_robustness or GL_EXT_robustness SUPPORT
        - Chromium WebView 5.0+
        - Open GL ES 1.1 -> NO WebGL
        - Open GL ES 2.0 -> WebGL1.0 Ready
        - Open GL ES 3.0 -> WebGL2.0 Ready
        - Open GL ES 3.1 -> WebGL2.0 Ready
        - Open GL ES 3.3 -> WebGL2.0 Ready

 */

(function(global) {
"use strict";

// --- FEATURES ---
var IOS         = 0x0001; // DEVICE     | iOS
var FXOS        = 0x0002; // DEVICE     | FirefoxOS
var KINDLE      = 0x0004; // DEVICE     | Kindle
var WINDOWS     = 0x0008; // DEVICE     | WindowsPhone
var CONSOLE     = 0x0010; // DEVICE     | Console device
var ARM         = 0x0020; //        SOC | ARM, ARM64, NVIDIA DENVER
var INTEL       = 0x0040; //        SOC | INTEL ATOM
var X64         = 0x0080; //        SOC | 64bit
var BLE         = 0x0100; // DEVICE SOC | Bluetooth LE, Android 4.3+
var NFC         = 0x0200; // DEVICE SOC | NFC
var A___        = ARM;
var AB__        = ARM   | BLE;
var AB_6        = ARM   | BLE       | X64;
var A_N_        = ARM         | NFC;
var ABN_        = ARM   | BLE | NFC;
var ABN6        = ARM   | BLE | NFC | X64;
var IBN6        = INTEL | BLE | NFC | X64;

var FEATURE = {
    "IOS":      IOS,
    "FIREFOXOS":FXOS,
    "KINDLE":   KINDLE,
    "WINDOWS":  WINDOWS,
    "CONSOLE":  CONSOLE,
    "ARM":      ARM,
    "INTEL":    INTEL,
    "64BIT":    X64,
    "BLE":      BLE,
    "NFC":      NFC,
};

// --- LIMITS ---
var LE          = 0x0001; // LOW END
var NGP         = 0x0002; // NO STORE (NO GOOGLE PLAY)
var NO_SIMD     = 0x0004; // NO SIMD (Tegra 2)

var LIMIT = {
    "LOW_END":  LE,
    "NO_STORE": NGP,
    "NO_SIMD":  NO_SIMD,
};

// --- PREINSTALLED APPS ---
var AOSP        = 0x0001; // AOSP(Android) browser
var SBROWSER    = 0x0002; // S Browser(Chromium based browser)
var CHROME      = 0x0004; // Google Chrome for Android
var CHROMEWB    = 0x0008; // Chromium WebView based browser
var SAFARI      = 0x0010; // Safari, Mobile Safari, WebKit based browser

var APP = {
    "AOSP":          AOSP,
    "SBROWSER":      SBROWSER,
    "CHROME":        CHROME,
    "CHROMIUMWEBVIEW": CHROMEWB,
};

var DEVICE = {
    //                    SOC_ID       OS_VERS    DISP1 DISP2 INCH RAM TOUCH FEATURE  LIMIT       APP
    // -- iOS Devices ---
    "iPhone 6 Plus":    [ "A8",        "800-",     414,  736,  5.5,  8,  5,  IOS,     0,          SAFARI          ], // scree{width:414,height:736},inner{width:980,height:1487}
    "iPhone 6":         [ "A8",        "800-",     375,  667,  4.7,  8,  5,  IOS,     0,          SAFARI          ], // scree{width:375,height:667},inner{width:980,height:1461}
    "iPhone 5s":        [ "A7",        "700-",     320,  568,  4.0,  8,  5,  IOS,     0,          SAFARI          ], // scree{width:320,height:568},inner{width:980,height:1409}
    "iPhone 5c":        [ "A6",        "700-",     320,  568,  4.0,  8,  5,  IOS,     0,          SAFARI          ],
    "iPhone 5":         [ "A6",        "600-",     320,  568,  4.0,  8,  5,  IOS,     0,          SAFARI          ],
    "iPhone 4S":        [ "A5",        "511-",     320,  480,  3.5,  4,  5,  IOS|BLE, LE,         SAFARI          ], // scree{width:320,height:480},inner{width:980,height:1139}
    "iPhone 4":         [ "A4",        "400-712",  320,  480,  3.5,  4,  5,  IOS,     LE,         SAFARI          ],
    "iPhone 3GS":       [ "S5PC100",   "300-615",  320,  480,  3.5,  2,  5,  IOS,     LE,         SAFARI          ],
    "iPhone 3G":        [ "S5L8900",   "200-421",  320,  480,  3.5,  1,  5,  IOS,     LE,         SAFARI          ],
    "iPad Air 2":       [ "A8X",       "810-",     768, 1024,  9.7, 16, 11,  IOS,     0,          SAFARI          ],
    "iPad Air":         [ "A7",        "700-",     768, 1024,  9.7,  8, 11,  IOS,     0,          SAFARI          ],
    "iPad 4":           [ "A6X",       "600-",     768, 1024,  9.7,  8, 11,  IOS,     0,          SAFARI          ],
    "iPad 3":           [ "A5X",       "510-",     768, 1024,  9.7,  8, 11,  IOS,     0,          SAFARI          ],
    "iPad 2":           [ "A5",        "430-",     768, 1024,  9.7,  4, 11,  IOS,     LE,         SAFARI          ], // NO BLE
    "iPad 1":           [ "A4",        "320-615",  768, 1024,  9.7,  2, 11,  IOS,     LE,         SAFARI          ],
    "iPad mini 3":      [ "A7",        "810-",     768, 1024,  7.9,  8, 11,  IOS,     0,          SAFARI          ],
    "iPad mini 2":      [ "A7",        "700-",     768, 1024,  7.9,  8, 11,  IOS,     0,          SAFARI          ],
    "iPad mini":        [ "A5",        "600-",     768, 1024,  7.9,  4, 11,  IOS|BLE, LE,         SAFARI          ],
    "iPod touch 5":     [ "A5",        "600-",     320,  568,  4.0,  4,  5,  IOS|BLE, LE,         SAFARI          ],
    "iPod touch 4":     [ "A4",        "410-615",  320,  480,  4.0,  2,  5,  IOS,     LE,         SAFARI          ],
  //"iPod touch 3":     [ "CORTEXA8",  "310-511",  320,  480,  3.5,  2,  5,  IOS,     LE,         SAFARI          ], // iPod touch 32/64GB Model
    "iPod touch 3":     [ "S5PC100",   "310-511",  320,  480,  3.5,  1,  5,  IOS,     LE,         SAFARI          ], // iPod touch 8GB Model
    // --- Android global model ---
    "Android One":      [ "MT6582",    "444-",     480,  854,  4.5,  8,  5,  0,       0,          CHROME          ], // Android One, Sparkle V,
  //"C6806":            [ "MSM8974AA", "422-",    1080, 1920,  6.4, 16,  5,  0,       0,          CHROME          ], // Xperia Z Ultra Google Edition
  //"HTC6500LVW":       [ "APQ8064T",  "422-",    1080, 1920,  4.7, 16,  5,  0,       0,          CHROME          ], // HTC One Google Play Edition
  // GT-I9505G":        [ "APQ8064AB", "422-",    1080, 1920,  5.0, 16,  5,  0,       0,          CHROME|SBROWSER ], // SAMSUNG Galaxy S4 Google Play Edition
    "XT1058":           [ "MSM8960T",  "422-",     720, 1280,  4.7, 16,  5,  0,       0,          CHROME          ], // MOTOROLA Moto X
    "Nexus 10":         [ "EXYNOS5250","420-",    1600, 2560, 10.0, 16,  5,  0,       0,          CHROME          ], // Nexus 10
    "Nexus 9":          [ "T132",      "500-",    1536, 2048,  8.9, 16,  5,  0,       0,          CHROME          ], // Nexus 9
    "Nexus 7 2nd":      [ "APQ8064",   "430-",    1200, 1920,  7.0, 16,  5,  0,       0,          CHROME          ], // Nexus 7 (2013)
    "Nexus 7":          [ "T30L",      "411-",     800, 1280,  7.0,  8,  5,  0,       LE,         CHROME          ], // Nexus 7 (2012)
    "Nexus 6":          [ "APQ8084",   "500-",    1440, 2560,  6.0, 24,  5,  0,       0,          CHROME          ], // 2014-12-11, Nexus 6
    "Nexus 5":          [ "MSM8974AA", "440-",    1080, 1920,  5.0, 16,  5,  0,       0,          CHROME          ], // Nexus 5
    "Nexus 4":          [ "APQ8064",   "420-",     768, 1280,  4.7, 16,  5,  0,       LE,         CHROME          ], // Nexus 4
    "Galaxy Nexus":     [ "OMAP4460",  "400-422",  720, 1280,  4.7,  8,  2,  0,       LE|NFC,            AOSP     ], // Galaxy Nexus LTE (partial)
    "Nexus S":          [ "S5PC110",   "232-410",  480,  800,  4.0,  4,  5,  0,       LE,                AOSP     ], // Nexus
    "Nexus One":        [ "QSD8250",   "210-236",  480,  800,  3.7,  4,  2,  0,       LE,                AOSP     ], // Nexus
    "Mi Pad":           [ "T124",      "444-444", 1536, 2048,  7.9, 16,  5,  0,       0,          0               ], // Xiaomi Mi Pad
    "Redmi Note":       [ "MT6592",    "420-420",  720, 1280,  5.5, 16,  5,  0,       0,          0               ], // Xiaomi Redmi Note
    "ASUS_T00J":        [ "Z2560",     "430-442",  720, 1280,  5.0,  8,  5,  0,       0,          CHROME          ], // ASUS ZenFone 5 (A501CG)(ATOM 1.6GHz 2Cores)
    "ASUS_T00F":        [ "Z2580",     "430-442",  720, 1280,  5.0, 16,  5,  0,       0,          CHROME          ], // ASUS ZenFone 5 (A500CG)(ATOM 2GHz 2Cores)
    "ASUS_T00P":        [ "MSM8926",   "430-442",  720, 1280,  5.0, 16,  5,  0,       0,          CHROME          ], // ASUS ZenFone 5 (A500KL)(Snapdragon 400 1.2GHz 4Cores)
    "K017":             [ "Z3745",     "442-442",  800, 1280,  7.0,  8,  5,  0,       0,          CHROME          ], // ASUS MeMo Pad 7
    "ME173X":           [ "MTK8125",   "421-421",  800, 1280,  7.0,  8,  5,  0,       0,          CHROME          ], // ASUS MeMo Pad HD7
    "ME302C":           [ "Z2560",     "422-422", 1200, 1920, 10.1, 16,  5,  0,       0,          CHROME          ], // ASUS MeMo Pad FHD10
    "ME581C":           [ "Z3560",     "442-442", 1200, 1920, 10.1, 16,  5,  0,       0,          CHROME          ], // ASUS MeMo Pad ME581C
    "SHIELD Tablet":    [ "T124",      "442-",    1200, 1920,  8.0, 16,  5,  0,       0,          CHROME          ], // SHIELD Tablet
    // --- Console device ---
  //"SHIELD":           [ "TX1",       "500-",      0,     0,  0.0, 24,  0,  CONSOLE, 0,          0               ], // SHIELD
    "Nexus Player":     [ "Z3560",     "500-",    1080, 1920,  0.0,  8,  0,  CONSOLE, 0,          0               ], // Nexus Player
  //"PS 4":             [ "",          "",           0,    0,  0.0,  0,  0,  CONSOLE, 0,          0               ], // PlayStation 4
  //"PS Vita":          [ "PSVITA",    "",         544,  960,  0.0,  4,  5,  CONSOLE, 0,          0               ], // PlayStation Vita
  //"Xbox One":         [ "",          "",           0,    0,  0.0, 64,  0,  CONSOLE, 0,          0               ], // MICROSOFT Xbox One
  //"Wii U":            [ "",          "",           0,    0,  0.0, 16,  0,  CONSOLE, 0,          0               ], // NINTENDO Wii U
//{@devicejp
    // --- docomo ---
    // 2015 spring
//  "SC-04G":           [ "EXYNOS7420","502-502", 1440, 2560,  5.1, 24,  5,  0,       0,          CHROME|SBROWSER ], // 2015-04-10 GALAXY S6 Edge
//  "SC-05G":           [ "EXYNOS7420","502-502", 1440, 2560,  5.1, 24,  5,  0,       0,          CHROME|SBROWSER ], // 2015-04-10 GALAXY S6
    // 2014 winter
    "SO-01G":           [ "MSM8974AC", "444-444", 1080, 1920,  5.2, 24,  5,  0,       0,          CHROME|CHROMEWB ], // Xperia Z3
    "SO-02G":           [ "MSM8974AC", "442-442",  720, 1280,  4.6, 16,  5,  0,       0,          CHROME|CHROMEWB ], // Xperia Z3 Compact
    "SC-01G":           [ "APQ8084",   "442-442", 1440, 2560,  5.6, 24,  5,  0,       0,          CHROME|SBROWSER ], // SAMSUNG GALAXY Note Edge
    "SC-02G":           [ "MSM8974AC", "442-442", 1080, 1920,  5.1, 16,  5,  0,       0,          CHROME|SBROWSER ], // SAMSUNG GALAXY S5 ACTIVE
    "SC-03G":           [ "MSM8974AC", "442-442", 1600, 2560,  8.4, 24,  5,  0,       0,          CHROME|SBROWSER ], // SAMSUNG GALAXY Tab S 8.4
    "SH-01G":           [ "MSM8974AB", "442-442", 1080, 1920,  5.5, 16,  5,  0,       0,          CHROME          ], // SHARP AQUOS ZETA
    "SH-02G":           [ "MSM8974AB", "442-442", 1080, 1920,  5.5, 16,  5,  0,       0,          CHROME          ], // SHARP Disney Mobile on docomo
    "F-02G":            [ "MSM8974AB", "442-442", 1440, 2560,  5.2, 24,  5,  0,       0,          CHROME|CHROMEWB ], // ARROWS NX
    "F-03G":            [ "MSM8974AB", "442-442", 1600, 2560, 10.5, 16,  5,  0,       0,          CHROME|CHROMEWB ], // ARROWS Tab
    // 2014 summer
    "SC-04F":           [ "MSM8974AC", "442-442", 1080, 1920,  5.1, 16,  5,  0,       0,          CHROME|SBROWSER ], // SAMSUNG GALAXY S5
    "SO-03F":           [ "MSM8974AB", "442-442", 1080, 1920,  5.2, 24,  5,  0,       0,          CHROME|CHROMEWB ], // Xperia Z2 (Sirius)
    "SO-04F":           [ "MSM8974AA", "442-442",  720, 1280,  4.3, 16,  5,  0,       0,          CHROME|AOSP     ], // Xperia A2
    "SO-05F":           [ "MSM8974AB", "442-442", 1200, 1920, 10.1, 24,  5,  0,       0,          CHROME|AOSP     ], // Xperia Z2 Tablet
    "SH-04F":           [ "MSM8974AB", "442-442", 1080, 1920,  5.4,  0,  5,  0,       0,          CHROME|CHROMEWB ], // SHARP AQUOS ZETA
    "SH-05F":           [ "MSM8974AA", "422-422", 1080, 1920,  5.0,  0,  5,  0,       0,          CHROME|AOSP     ], // SHARP Disney Mobile on docomo SH-05F
    "SH-06F":           [ "MSM8974AB", "442-442", 1200, 1920,  7.0,  0,  5,  0,       0,          CHROME|CHROMEWB ], // SHARP AQUOS PAD
    "F-05F":            [ "MSM8974AB", "442-442", 1080, 1920,  5.0, 16,  5,  0,       0,          CHROME|CHROMEWB ], // FUJITSU ARROWS NX
    "F-06F":            [ "MSM8926",   "442-442",  720, 1280,  4.5,  0,  5,  0,       0,                 CHROMEWB ], // FUJITSU for Silver
    // 2013 winter
    "L-01F":            [ "MSM8974AA", "422-422", 1080, 1776,  5.2, 16,  5,  0,       0,          CHROME|AOSP     ], // LG G2 L-01F
    "SC-01F":           [ "MSM8974AA", "430-442", 1080, 1920,  5.7, 16,  5,  0,       0,          CHROME|SBROWSER ], // SAMSUNG GALAXY Note 3
    "SC-02F":           [ "MSM8974AA", "430-442", 1080, 1920,  5.0, 16,  5,  0,       0,          CHROME|SBROWSER ], // SAMSUNG GALAXY J SC-02F
    "SH-01F":           [ "MSM8974AA", "422-442", 1080, 1776,  5.0, 16,  5,  0,       0,          CHROME|AOSP     ], // SHARP AQUOS PHONE ZETA SH-01F
    "SH-01FDQ":         [ "MSM8974AA", "422-422", 1080, 1776,  5.0, 16,  5,  0,       0,          CHROME|AOSP     ], // SHARP SH-01F DRAGON QUEST
    "SH-02F":           [ "MSM8974AA", "422-422", 1080, 1920,  4.5, 16,  5,  0,       0,          CHROME|AOSP     ], // SHARP AQUOS PHONE EX SH-02F
    "SH-03F":           [ "MSM8960",   "404-404",  540,  888,  4.1,  4,  5,  0,       NGP,               AOSP     ], // SHARP JUNIOR 2 RAM 680MB
    "SO-01F":           [ "MSM8974AA", "422-442", 1080, 1776,  5.0, 16,  5,  0,       0,          CHROME          ], // Xperia Z1
    "SO-02F":           [ "MSM8974AA", "422-442",  720, 1184,  4.3, 16,  5,  0,       0,          CHROME|AOSP     ], // Xperia Z1 f SO-02F
    "F-01F":            [ "MSM8974AA", "422-442", 1080, 1776,  5.0, 16,  5,  0,       0,          CHROME|AOSP     ], // FUJITSU ARROWS NX F-01F
    "F-02F":            [ "MSM8974AA", "422-442", 1504, 2560, 10.1, 16,  5,  0,       0,          CHROME|AOSP     ], // FUJITSU ARROWS Tab F-02F
    "F-03F":            [ "MSM8974AA", "422-422",  720, 1184,  4.7, 16,  5,  0,       0,          CHROME|AOSP     ], // FUJITSU Disney Mobile on docomo F-03F
    "F-04F":            [ "APQ8064T",  "422-422",  540,  888,  4.3, 16,  5,  0,       NGP,               AOSP     ], // FUJITSU Silver age model
    // 2013 summer
    "L-05E":            [ "APQ8064T",  "422-422",  720, 1280,  4.5, 16,  5,  0,       0,          CHROME|AOSP     ],
    "N-06E":            [ "APQ8064T",  "422-422",  720, 1184,  4.7, 16,  5,  0,       0,          CHROME|AOSP     ], // NEC_CASIO
    "SC-04E":           [ "APQ8064T",  "422-442", 1080, 1920,  5.0, 16,  5,  0,       0,          CHROME|SBROWSER ], // SAMSUNG Galaxy S4
    "SO-04E":           [ "APQ8064",   "412-422",  720, 1184,  4.6, 16,  5,  0,       0,          CHROME|AOSP     ], // Xperia A SO-04E
    "SO-04EM":          [ "APQ8064",   "422-422",  720, 1184,  4.6, 16,  5,  0,       0,          CHROME|AOSP     ], // Xperia feat. HATSUNE MIKU SO-04E
    "SH-06E":           [ "APQ8064T",  "422-422", 1080, 1920,  4.8, 16,  5,  0,       0,          CHROME|AOSP     ], // SHARP
    "SH-07E":           [ "APQ8064T",  "422-422",  720, 1280,  4.3, 16,  2,  0,       0,          CHROME|AOSP     ], // SHARP
    "SH-08E":           [ "APQ8064T",  "422-422", 1200, 1824,  7.0, 16,  5,  0,       0,          CHROME|AOSP     ], // SHARP
    "P-03E":            [ "APQ8064T",  "422-422", 1080, 1920,  4.7, 16,  5,  0,       0,          CHROME|AOSP     ], // PANASONIC
    "F-06E":            [ "APQ8064T",  "422-422", 1080, 1776,  5.2, 16,  5,  0,       0,          CHROME|AOSP     ], // FUJITSU
    "F-07E":            [ "APQ8064T",  "422-422",  720, 1184,  4.7, 16,  5,  0,       0,          CHROME|AOSP     ], // FUJITSU
    "F-08E":            [ "APQ8064T",  "422-422",  540,  867,  4.3, 16,  5,  0,       0,                 AOSP     ], // FUJITSU
    "F-09E":            [ "APQ8064T",  "422-422",  540,  888,  4.3, 16,  5,  0,       0,          CHROME|AOSP     ], // FUJITSU
    // 2012 Q3
    "L-01E":            [ "APQ8064",   "404-412",  720, 1280,  4.7, 16,  5,  0,       LE,         CHROME|AOSP     ], // LG
    "L-02E":            [ "MSM8960",   "404-412",  720, 1280,  4.5,  8,  5,  0,       LE,         CHROME|AOSP     ], // LG
    "L-04E":            [ "APQ8064T",  "412-412", 1080, 1920,  5.0, 16,  5,  0,       LE,         CHROME|AOSP     ], // LG
    "N-02E":            [ "MSM8960",   "404-412",  480,  800,  4.0,  8,  5,  0,       LE,         CHROME|AOSP     ], // NEC_CASIO
    "N-03E":            [ "APQ8064",   "404-412",  720, 1280,  4.7, 16,  5,  0,       LE,         CHROME|AOSP     ], // NEC_CASIO
    "N-04E":            [ "APQ8064",   "412-412",  720, 1280,  4.7, 16,  5,  0,       LE,         CHROME|AOSP     ], // NEC_CASIO
    "N-05E":            [ "MSM8960",   "412-412",  540,  960,  4.3,  8,  5,  0,       LE,         CHROME|AOSP     ], // NEC_CASIO
    "SC-01E":           [ "APQ8060",   "404-404",  800, 1280,  7.7,  8,  5,  0,       LE,                AOSP     ], // SAMSUNG GALAXY Tab 7.7 Plus
    "SC-02E":           [ "EXYNOS4412","411-430",  720, 1280,  5.5, 16,  5,  0,       LE,         CHROME|AOSP     ], // SAMSUNG GALAXY Note II
    "SC-03E":           [ "EXYNOS4412","411-430",  720, 1280,  4.8, 16,  5,  0,       LE,         CHROME|AOSP     ], // SAMSUNG GALAXY S III alpha
    "SH-01E":           [ "MSM8960",   "404-412",  540,  888,  4.1,  8,  2,  0,       LE,         CHROME|AOSP     ], // SHARP AQUOS PHONE si
    "SH-01EVW":         [ "MSM8960",   "404-412",  540,  888,  4.1,  8,  2,  0,       LE,         CHROME|AOSP     ], // SHARP AQUOS PHONE SH-01E Vivienne Westwood
    "SH-02E":           [ "APQ8064",   "404-412",  720, 1280,  4.9, 16,  2,  0,       LE,         CHROME|AOSP     ], // SHARP AQUOS PHONE ZETA
    "SH-04E":           [ "APQ8064",   "412-412",  720, 1184,  4.5, 16,  5,  0,       LE,         CHROME|AOSP     ], // SHARP AQUOS PHONE EX
  //"SH-05E":           [ "MSM8960",   "404-404",  540,  960,  4.1,  8,  2,  0,       LE|NGP,     CHROME|AOSP     ], // SHARP JUNIOR Phone (no WiFi)
    "SO-01E":           [ "MSM8960",   "404-412",  720, 1184,  4.3,  8,  5,  0,       LE,         CHROME|AOSP     ], // Xperia AX SO-01E
    "SO-02E":           [ "APQ8064",   "412-442",  720, 1184,  5.0,  8,  5,  0,       LE,         CHROME|AOSP     ], // Xperia Z
    "SO-03E":           [ "APQ8064",   "412-412", 1128, 1920, 10.1, 16,  5,  0,       LE,         CHROME|AOSP     ], // Xperia Tablet Z
    "P-02E":            [ "APQ8064",   "412-412", 1080, 1920,  5.0, 16,  5,  0,       LE,         CHROME|AOSP     ], // PANASONIC ELUGA X
    "F-02E":            [ "AP37",      "412-412", 1080, 1920,  5.0, 16,  5,  0,       LE,         CHROME|AOSP     ], // FUJITSU ARROWS X
    "F-03E":            [ "MSM8960",   "404-412",  540,  960,  4.0,  8,  5,  0,       LE,         CHROME|AOSP     ], // FUJITSU ARROWS Kiss
    "F-04E":            [ "AP33",      "404-422",  720, 1280,  4.7, 16,  5,  0,       LE,         CHROME|AOSP     ], // FUJITSU ARROWS V
    "F-05E":            [ "AP37",      "404-412", 1200, 1920, 10.1, 16,  5,  0,       LE,         CHROME|AOSP     ], // FUJITSU ARROWS Tab
    "HW-01E":           [ "MSM8960",   "404-404",  720, 1280,  4.5,  8,  5,  0,       LE,         CHROME|AOSP     ], // HUAWEI Ascend
    "HW-03E":           [ "K3V2",      "412-412",  720, 1280,  4.7, 16,  5,  0,       LE,         CHROME|AOSP     ], // HUAWEI Ascend D2
    "dtab01":           [ "K3V2",      "412-412",  800, 1280, 10.1,  8,  5,  0,       LE,         CHROME|AOSP     ], // HUAWEI dtab
    // 2012 Q1
    "L-05D":            [ "MSM8960",   "404-412",  480,  800,  4.0,  8,  5,  0,       LE,         CHROME|AOSP     ], // LG Optimus it
    "L-06D":            [ "APQ8060",   "404-404",  768, 1024,  5.0,  8,  5,  0,       LE,                AOSP     ], // LG Optimus Vu L-06D
    "L-06DJOJO":        [ "APQ8060",   "404-404",  768, 1024,  5.0,  8,  5,  0,       LE,                AOSP     ], // LG Optimus JOJO
    "N-07D":            [ "MSM8960",   "404-412",  720, 1280,  4.3,  8,  5,  0,       LE,         CHROME|AOSP     ], // NEC CASIO MEDIAS X
    "N-08D":            [ "MSM8960",   "404-404",  800, 1280,  7.0,  8,  5,  0,       LE,                AOSP     ], // NEC CASIO MEDIAS TAB UL
    "SC-06D":           [ "MSM8960",   "404-412",  720, 1280,  4.8, 16,  5,  0,       LE,         CHROME|AOSP     ], // SAMSUNG Galaxy S III
    "SH-06DNERV":       [ "OMAP4460",  "235-404",  720, 1280,  4.5,  8,  2,  0,       LE,                AOSP     ], // SHARP SH-06D NERV
    "SH-07D":           [ "MSM8255",   "404-404",  480,  854,  3.4,  8,  2,  0,       LE,                AOSP     ], // SHARP AQUOS PHONE st SH-07D
    "SH-09D":           [ "MSM8960",   "404-412",  720, 1280,  4.7,  8,  2,  0,       LE,         CHROME|AOSP     ], // SHARP AQUOS PHONE ZETA SH-09D
    "SH-10D":           [ "MSM8960",   "404-412",  720, 1280,  4.5,  8,  2,  0,       LE,         CHROME|AOSP     ], // SHARP AQUOS PHONE sv SH-10D
    "SO-04D":           [ "MSM8960",   "404-412",  720, 1184,  4.6,  8,  5,  0,       LE,         CHROME|AOSP     ], // Xperia GX SO-04D
    "SO-05D":           [ "MSM8960",   "404-412",  540,  888,  3.7,  8,  5,  0,       LE,         CHROME|AOSP     ], // Xperia SX
    "P-06D":            [ "OMAP4460",  "404-404",  720, 1280,  4.6,  8,  5,  0,       LE,                AOSP     ], // PANASONIC ELUGA V P-06D
    "P-07D":            [ "MSM8960",   "404-404",  720, 1280,  5.0,  8,  5,  0,       LE,                AOSP     ], // PANASONIC ELUGA power P-07D
    "P-08D":            [ "OMAP4460",  "404-404",  800, 1280, 10.1,  8,  5,  0,       LE,                AOSP     ], // PANASONIC ELUGA Live P-08D
    "F-09D":            [ "MSM8255",   "403-403",  480,  800,  3.7,  8,  2,  0,       LE,                AOSP     ], // FUJITSU F-09D ANTEPRIMA
    "F-10D":            [ "AP33",      "403-422",  720, 1280,  4.6,  8,  5,  0,       LE,         CHROME|AOSP     ], // FUJITSU ARROWS X F-10D
    "F-11D":            [ "MSM8255",   "403-422",  480,  800,  3.7,  8,  5,  0,       LE,                AOSP     ], // FUJITSU ARROWS Me F-11D
    "F-12D":            [ "MSM8255",   "403-403",  480,  800,  4.0,  8,  5,  0,       LE,                AOSP     ], // FUJITSU for Silver age
    "T-02D":            [ "MSM8960",   "404-412",  540,  960,  4.3,  8,  5,  0,       LE,         CHROME|AOSP     ], // REGZA Phone T-02D
    // 2011 Q3
    "L-01D":            [ "APQ8060",   "235-404",  720, 1280,  4.5,  8,  5,  0,       LE,                AOSP     ], // LG Optimus LTE L-01D
    "L-02D":            [ "OMAP4430",  "237-404",  480,  800,  4.3,  8,  5,  0,       LE,                AOSP     ], // PRADA phone by LG L-02D
    "N-01D":            [ "MSM8255T",  "235-235",  480,  800,  4.0,  4,  5,  0,       LE,                AOSP     ], // NEC_CASIO
    "N-04D":            [ "APQ8060",   "236-404",  720, 1280,  4.3,  8,  5,  0,       LE,                AOSP     ], // NEC_CASIO
    "N-05D":            [ "MSM8260",   "236-404",  720, 1280,  4.3,  8,  5,  0,       LE,                AOSP     ], // NEC_CASIO
    "N-06D":            [ "APQ8060",   "236-404",  800, 1280,  7.0,  8,  5,  0,       LE,                AOSP     ], // NEC_CASIO
    "SC-01D":           [ "APQ8060",   "320-404",  800, 1200, 10.1,  8,  5,  0,       LE,                AOSP     ], // SAMSUNG
    "SC-02D":           [ "EXYNOS4210","320-404",  600, 1024,  7.0,  8,  5,  0,       LE,                AOSP     ], // SAMSUNG GALAXY Tab 7.0 Plus
    "SC-03D":           [ "APQ8060",   "236-404",  480,  800,  4.5,  8,  5,  0,       LE,                AOSP     ], // SAMSUNG GALAXY S II LTE
    "SC-04D":           [ "OMAP4460",  "401-422",  720, 1280,  4.7,  8,  5,  0,       LE,                AOSP     ], // SAMSUNG Galaxy Nexus
    "SC-05D":           [ "APQ8060",   "236-412",  800, 1280,  5.3,  8,  5,  0,       LE,                AOSP     ], // SAMSUNG
    "SH-01D":           [ "OMAP4430",  "235-404",  720, 1280,  4.5,  8,  2,  0,       LE,                AOSP     ], // SHARP
    "SH-02D":           [ "MSM8255",   "235-235",  540,  960,  3.7,  4,  2,  0,       LE,                AOSP     ], // SHARP
    "SH-04D":           [ "MSM8255",   "234-234",  540,  960,  3.7,  4,  2,  0,       LE,                AOSP     ], // SHARP
    "SH-06D":           [ "OMAP4460",  "235-404",  720, 1280,  4.5,  8,  5,  0,       LE,                AOSP     ], // SHARP AQUOS PHONE SH-06D
    "SO-01D":           [ "MSM8255",   "234-234",  480,  854,  4.0,  4,  2,  0,       LE,                AOSP     ], // Xperia Play
    "SO-02D":           [ "MSM8260",   "237-404",  720, 1280,  4.3,  8,  5,  0,       LE,                AOSP     ],
    "SO-03D":           [ "MSM8260",   "237-404",  720, 1280,  4.3,  8,  5,  0,       LE,                AOSP     ],
    "P-01D":            [ "MSM8255",   "234-234",  480,  800,  3.2,  4,  2,  0,       LE,                AOSP     ], // PANASONIC
    "P-02D":            [ "OMAP4430",  "235-404",  540,  960,  4.0,  8,  2,  0,       LE,                AOSP     ], // PANASONIC
    "P-04D":            [ "OMAP4430",  "235-404",  540,  960,  4.3,  8,  5,  0,       LE,                AOSP     ], // PANASONIC
    "P-05D":            [ "OMAP4430",  "235-404",  540,  960,  4.3,  8,  5,  0,       LE,                AOSP     ], // PANASONIC
    "F-01D":            [ "OMAP4430",  "320-403",  800, 1280, 10.1,  8,  5,  0,       LE,                AOSP     ], // FUJITSU
    "F-03D":            [ "MSM8255",   "235-235",  480,  800,  3.7,  4,  2,  0,       LE,                AOSP     ], // FUJITSU
    "F-05D":            [ "OMAP4430",  "235-403",  720, 1280,  4.3,  8,  2,  0,       LE,                AOSP     ], // FUJITSU
    "F-07D":            [ "MSM8255",   "235-235",  480,  800,  4.0,  4,  5,  0,       LE,                AOSP     ], // FUJITSU
    "F-08D":            [ "OMAP4430",  "235-403",  720, 1280,  4.3,  8,  2,  0,       LE,                AOSP     ], // FUJITSU
    "T-01D":            [ "OMAP4430",  "235-403",  720, 1280,  4.3,  8,  2,  0,       LE,                AOSP     ], // FUJITSU
    // 2011 Q1
    "SC-02C":           [ "EXYNOS4210","403-403",  480,  800,  4.3,  8,  5,  0,       LE,                AOSP     ], // SAMSUNG Galaxy S II
    "SO-01C":           [ "MSM8255",   "232-234",  480,  854,  4.2,  4,  2,  0,       LE,                AOSP     ], // Xperia arc
    "SO-02C":           [ "MSM8255",   "233-234",  480,  854,  4.2,  4,  2,  0,       LE,                AOSP     ], // Xperia acro
    "SO-03C":           [ "MSM8255",   "234-234",  480,  854,  3.3,  4,  2,  0,       LE,                AOSP     ], // Xperia acro
    "SH-12C":           [ "MSM8255T",  "233-233",  540,  960,  4.2,  4,  2,  0,       LE,                AOSP     ], // SHARP
    "SH-13C":           [ "MSM8255",   "234-234",  540,  960,  3.7,  4,  2,  0,       LE,                AOSP     ], // SHARP
    "N-04C":            [ "MSM7230",   "220-233",  480,  854,  4.0,  4,  2,  0,       LE,                AOSP     ], // NEC_CASIO
    "N-06C":            [ "MSM8255",   "230-230",  480,  854,  4.0,  4,  2,  0,       LE,                AOSP     ], // NEC_CASIO
    "P-07C":            [ "OMAP3630",  "230-230",  480,  800,  4.3,  4,  2,  0,       LE,                AOSP     ], // PANASONIC
    "F-12C":            [ "MSM8255",   "230-230",  480,  800,  3.7,  4,  2,  0,       LE,                AOSP     ], // FUJITSU
    "L-04C":            [ "MSM7227",   "220-230",  320,  480,  3.2,  4,  2,  0,       LE,                AOSP     ], // LG
    "L-06C":            [ "T20",       "300-310",  768, 1280,  8.9,  8,  2,  0,       LE,                AOSP     ], // LG
    "L-07C":            [ "OMAP3630",  "233-233",  480,  800,  4.0,  4,  2,  0,       LE,                AOSP     ], // LG
    "T-01C":            [ "QSD8250",   "211-222",  480,  854,  4.0,  4,  2,  0,       LE,                AOSP     ], // FUJITSU REGZA Phone
    "SH-03C":           [ "QSD8250",   "211-222",  480,  800,  3.8,  4,  2,  0,       LE,                AOSP     ],
    "SC-01C":           [ "S5PC110",   "220-236",  600, 1024,  7.0,  4,  2,  0,       LE,                AOSP     ], // SAMSUNG Galaxy Tab
    "SC-02B":           [ "S5PC110",   "220-236",  480,  800,  4.0,  4,  2,  0,       LE,                AOSP     ], // SAMSUNG Galaxy S
    "SH-10B":           [ "QSD8250",   "160-160",  480,  960,  5.0,  2,  2,  0,       LE,                AOSP     ], // SHARP LYNX
    "SO-01B":           [ "QSD8250",   "160-211",  480,  854,  4.0,  3,  1,  0,       LE,                AOSP     ], // Xperia RAM384MB
    // --- au ---
    // 2015 spring
    "KYV33":            [ "MSM8974AB", "444-444", 1080, 1920,  4.5, 16,  5,  0,       0,          CHROME          ], // 2015-02-20, INFOBAR A03
    "SHV31":            [ "MSM8974AB", "444-444", 1080, 1920,  4.5, 16,  5,  0,       0,          CHROME          ], // 2015-01-29, SHARP AQUOS SERIE mini SHV31
    "KYV32":            [ "MSM8974AB", "444-444", 1080, 1920,  5.0, 16,  5,  0,       0,          CHROME|CHROMEWB ], // 2015-02-13, KYOCERA BASIO KYV32
    "KYL23":            [ "MSM8926",   "444-444",  540,  960,  4.5, 12,  5,  0,       NGP,               CHROMEWB ], // 2015-01-30, KYOCERA miraie KYL23
    "SHF31":            [ "MSM8926",   "444-444",  540,  960,  3.4,  8,  5,  0,       0,                 CHROMEWB ], // 2015-02-20, SHARP AQUOS K
    // 2014 fall and winter
    "SCT21":            [ "MSM8974AC", "444-444", 1600, 2560, 10.5, 24,  5,  0,       0,          CHROME|SBROWSER ], // 2014-12-04, SAMSUNG GALAXY Tab S SCT21
    "LGV31":            [ "MSM8974AC", "442-442", 1440, 2560,  5.5, 24,  5,  0,       0,          CHROME|CHROMEWB ], // 2014-12-12, isai VL LGV31
    "KYV31":            [ "MSM8974AB", "444-444", 1080, 1920,  5.0, 16,  5,  0,       0,          CHROME          ], // 2014-12-12, URBANO V01
    "SOL26":            [ "MSM8974AC", "444-444", 1080, 1920,  5.2, 24,  5,  0,       0,          CHROME|CHROMEWB ], // 2014-10-23, Xperia Z3 SOL26
    "SCL24":            [ "APQ8084",   "444-444", 1440, 2560,  5.6, 24,  5,  0,       0,          CHROME|SBROWSER ], // 2014-10-23, SAMSUNG GALAXY Note Edge SCL24
    // 2014 summer
    "AST21":            [ "Z3580",     "442-442", 1200, 1920,  8.0, 16,  5,  0,       0,          CHROME|CHROMEWB ], // 2014-08-22, ASUS MeMO Pad 8 AST21
    "SOT21":            [ "MSM8974AB", "442-442", 1200, 1920, 10.1, 24,  5,  0,       0,          CHROME|AOSP     ], // 2014-07-05, Xperia Z2 Tablet SOT21
    "HTL23":            [ "MSM8974AC", "442-442", 1080, 1920,  5.0, 16,  5,  0,       0,          CHROME|AOSP     ], // 2014-08-29, HTC J butterfly HTL23
    "KYY24":            [ "MSM8928",   "442-442",  720, 1280,  4.5, 16,  5,  0,       0,          CHROME|CHROMEWB ], // 2014-07-25, KYOCERA TORQUE G01
    "KYY23":            [ "MSM8974AB", "442-442", 1080, 1920,  5.0, 16,  5,  0,       0,          CHROME|CHROMEWB ], // 2014-06-28, KYOCERA URBANO L03
    "SHL25":            [ "MSM8974AB", "442-442", 1080, 1920,  5.2, 16,  5,  0,       0,          CHROME|CHROMEWB ], // 2014-06-13, SHARP AQUOS PHONE SERIE SHL25
    "SCL23":            [ "MSM8974AC", "442-442", 1080, 1920,  5.1, 16,  5,  0,       0,          CHROME|SBROWSER ], // 2014-05-15, SAMSUNG Galaxy S5
    "SOL25":            [ "MSM8974AB", "442-442", 1080, 1920,  5.0, 24,  5,  0,       0,          CHROME|AOSP     ], // 2014-05-23, Xperia ZL2 SOL25
    "LGL24":            [ "MSM8974AC", "442-442", 1440, 2560,  5.5, 16,  5,  0,       0,          CHROME|CHROMEWB ], // 2014-07-18, LG isai FL LGL24
    // 2014 spring
    "SHT22":            [ "MSM8974AA", "422-422", 1200, 1920,  7.0, 16,  5,  0,       0,          CHROME|AOSP     ], // 2014-02-26, SHARP AQUOS PAD SHT22
    "SHL24":            [ "MSM8974AA", "422-422", 1080, 1920,  4.5, 16,  5,  0,       0,          CHROME|AOSP     ], // 2014-02-22, SHARP AQUOS PHONE SERIE mini SHL24
    "URBANO L02":       [ "MSM8960",   "422-422",  720, 1280,  4.7, 16,  5,  0,       0,          CHROME|AOSP     ], // 2014-02-08, KYOCERA URBANO L02
    "LGL23":            [ "MSM8974AA", "422-422",  720, 1280,  6.0, 16,  5,  0,       0,          CHROME|AOSP     ], // 2014-01-25, LG G Flex LGL23
    "SOL24":            [ "MSM8974AA", "422-442", 1080, 1920,  6.4, 16,  5,  0,       0,          CHROME|AOSP     ], // 2014-01-25, Xperia Z Ultra SOL24
    // 2013 winter
    "FJT21":            [ "MSM8974AA", "422-422", 1600, 2560, 10.1, 16,  5,  0,       0,          CHROME|AOSP     ], // 2013-11-29, FUJITSU ARROWS Tab FJT21
    "SOL23":            [ "MSM8974AA", "422-442", 1080, 1920,  5.0, 16,  5,  0,       0,          CHROME|AOSP     ], // 2014-10-23, Xperia Z1
    "SCL22":            [ "MSM8974AA", "430-442", 1080, 1920,  5.7, 24,  5,  0,       0,          CHROME|SBROWSER ], // 2013-10-17, SAMSUNG GALAXY Note 3 SCL22
    "KYL22":            [ "MSM8974AA", "422-422", 1080, 1920,  5.0, 16,  5,  0,       0,          CHROME|AOSP     ], // 2013-11-23, KYOCERA DIGNO M KYL22
    "LGL22":            [ "MSM8974AA", "422-442", 1080, 1920,  5.2, 16,  5,  0,       0,          CHROME|AOSP     ], // 2013-11-23, LG isai LGL22
    "SHL23":            [ "MSM8974AA", "422-422", 1080, 1920,  4.8, 16,  5,  0,       0,          CHROME|AOSP     ], // 2013-11-15, SHARP AQUOS PHONE SERIE
    "FJL22":            [ "MSM8974AA", "422-422", 1080, 1920,  5.0, 16,  5,  0,       0,          CHROME|AOSP     ], // 2013-11-22, FUJITSU ARROWS Z FJL22
    // 2013 spring and summer
    "SHL22":            [ "APQ8064T",  "422-422",  720, 1280,  4.9, 16,  5,  0,       0,          CHROME|AOSP     ], // 2013-07-12, SHARP AQUOS PHONE SERIE SHL22
    "KYY21":            [ "MSM8960",   "422-422",  720, 1280,  4.7, 16,  5,  0,       0,          CHROME|AOSP     ], // 2013-06-21, KYOCERA URBANO L01
    "HTL22":            [ "APQ8064T",  "412-442", 1080, 1920,  4.7, 16,  5,  0,       0,          CHROME|AOSP     ], // 2013-06-01, HTC J One
    "SOL22":            [ "APQ8064",   "412-422", 1080, 1920,  5.0, 16,  5,  0,       0,          CHROME|AOSP     ], // 2013-05-25, Xperia UL
    "HTX21":            [ "APQ8064",   "411-411",  720, 1280,  4.7,  8,  5,  0,       LE,         CHROME|AOSP     ], // 2013-02-15, HTC INFOBAR A02
    // 2012 fall and winter
    "SHT21":            [ "MSM8960",   "404-412",  800, 1280,  7.0,  8,  2,  0,       LE,         CHROME|AOSP     ], // 2014-06-05, SHARP AQUOS PAD SHT21
    "HTL21":            [ "APQ8064",   "411-411", 1080, 1920,  5.0, 16,  5,  0,       LE,         CHROME|AOSP     ], // 2012-12-09, HTC J Butterfly
    "SCL21":            [ "MSM8960",   "404-412",  720, 1280,  4.8, 16,  5,  0,       LE,         CHROME|SBROWSER ], // 2012-12-02, SAMSUNG GALAXY SIII Progre SCL21
    "CAL21":            [ "MSM8960",   "404-404",  480,  800,  4.0,  8,  5,  0,       LE,         CHROME|AOSP     ], // 2012-11-02, NEC CASIO G'zOne TYPE-L CAL21
    "SHL21":            [ "MSM8960",   "404-412",  720, 1280,  4.7,  8,  2,  0,       LE,         CHROME|AOSP     ], // 2012-11-02, SHARP AQUOS PHONE SERIE SHL21
    "KYL21":            [ "MSM8960",   "404-404",  720, 1280,  4.7,  8,  5,  0,       LE,         CHROME|AOSP     ], // 2012-11-09, KYOCERA DIGNO S KYL21
    "FJL21":            [ "MSM8960",   "404-412",  720, 1280,  4.3,  8,  5,  0,       LE,         CHROME|AOSP     ], // 2012-11-02, FUJITSU ARROWS ef FJL21
    "SOL21":            [ "MSM8960",   "404-412",  720, 1280,  4.3,  8,  5,  0,       LE,         CHROME|AOSP     ], // 2012-11-02, Xperia VL SOL21
    "LGL21":            [ "APQ8064",   "404-404",  720, 1280,  4.7, 16,  5,  0,       LE,         CHROME|AOSP     ], // 2012-11-02, LG Optimus G LGL21
    "PTL21":            [ "MSM8960",   "404-412",  720, 1280,  4.3,  8,  5,  0,       LE,         CHROME|AOSP     ], // 2012-11-02, PANTECH VEGA PTL21
    // 2012 summer
    "ISW13F":           [ "AP33",      "403-403",  720, 1280,  4.6,  8,  3,  0,       LE,                AOSP     ], // 2012-07-20, FUJITSU ARROWS Z ISW13F
    "IS17SH":           [ "MSM8655",   "404-404",  540,  960,  4.2,  8,  2,  0,       LE,                AOSP     ], // 2012-07-20, SHARP AQUOS PHONE CL IS17SH
    "IS15SH":           [ "MSM8655",   "404-404",  540,  960,  3.7,  8,  2,  0,       LE,                AOSP     ], // 2012-07-06, SHARP AQUOS PHONE SL IS15SH
    "ISW16SH":          [ "MSM8660A",  "404-404",  720, 1280,  4.6,  8,  2,  0,       LE,                AOSP     ], // 2012-06-28, SHARP AQUOS PHONE SERIE ISW16SH
    "URBANO PROGRESSO": [ "MSM8655",   "403-403",  480,  800,  4.0,  8,  5,  0,       LE,                AOSP     ], // 2012-05-30, KYOCERA URBANO PROGRESSO
    "ISW13HT":          [ "MSM8660A",  "403-403",  540,  960,  4.3,  8,  5,  0,       LE,                AOSP     ], // 2012-05-25, HTC J ISW13HT
    // 2012 spring
    "IS12S":            [ "MSM8660",   "237-404",  720, 1280,  4.3,  8,  5,  0,       LE,                AOSP     ], // 2012-03-10, Xperia acro HD
    "IS12M":            [ "OMAP4430",  "236-404",  540,  960,  4.3,  8,  5,  0,       LE,                AOSP     ], // 2012-03-01, MOTOROLA RAZR IS12M
    "INFOBAR C01":      [ "MSM8655",   "235-235",  480,  854,  3.2,  4,  2,  0,       LE,                AOSP     ], // 2012-02-03, SHARP INFOBAR C01
    "ISW11SC":          [ "EXYNOS4210","236-404",  720, 1080,  4.7,  8,  5,  0,       LE,                AOSP     ], // 2012-01-20, SAMSUNG GALAXY SII WiMAX ISW11SC
    "IS11LG":           [ "AP25",      "237-404",  480,  800,  4.0,  8,  5,  0,       LE,                AOSP     ], // 2012-01-20, LG Optimus X IS11LG
    "IS12F":            [ "MSM8655",   "235-235",  480,  800,  4.0,  4,  5,  0,       LE,                AOSP     ], // 2012-01-07, FUJITSU ARROWS ES IS12F
    // 2011 fall and winter
    "IS14SH":           [ "MSM8655",   "235-235",  540,  960,  3.7,  4,  2,  0,       LE,                AOSP     ], // 2011-12-23, SHARP AQUOS PHONE IS14SH
    "IS11N":            [ "MSM8655",   "235-235",  480,  800,  3.6,  4,  5,  0,       LE,                AOSP     ], // 2011-12-23, NEC CASIO MEDIAS BR IS11N
    "ISW11F":           [ "OMAP4430",  "235-403",  720, 1280,  4.3,  8,  3,  0,       LE,                AOSP     ], // 2011-12-17, FUJITSU ARROWS Z ISW11F
    "ISW11K":           [ "MSM8655",   "235-235",  480,  800,  4.0,  8,  5,  0,       LE,                AOSP     ], // 2011-11-29, KYOCERA DIGNO ISW11K
    "IS13SH":           [ "MSM8655",   "235-235",  540,  960,  4.2,  4,  2,  0,       LE,                AOSP     ], // 2011-11-18, SHARP AQUOS PHONE IS13SH
    "ISW12HT":          [ "MSM8660",   "234-403",  540,  960,  4.3,  8,  5,  0,       LE,                AOSP     ], // 2011-10-07, HTC EVO 3D ISW12HT
    "ISW11M":           [ "T20",       "234-234",  540,  960,  4.3,  8,  2,  0,       LE,                AOSP     ], // 2011-10-07, MOTOROLA PHOTON ISW11M
    // 2011 summer
    "EIS01PT":          [ "MSM8655",   "234-234",  480,  800,  3.7,  4,  5,  0,       LE,                AOSP     ], // 2011-09-20, PANTECH EIS01PT
    "IS11PT":           [ "MSM8655",   "234-234",  480,  800,  3.7,  4,  5,  0,       LE,                AOSP     ], // 2011-09-22, PANTECH MIRACH IS11PT
    "IS11T":            [ "MSM8655",   "234-234",  480,  854,  4.0,  4,  3,  0,       LE,                AOSP     ], // 2011-09-09, FUJITSU REGZA Phone IS11T
    "IS11CA":           [ "MSM8655",   "233-233",  480,  800,  3.6,  4,  5,  0,       LE,                AOSP     ], // 2011-07-14, NEC CASIO G'zOne IS11CA
    "INFOBAR A01":      [ "MSM8655",   "233-233",  540,  960,  3.7,  4,  2,  0,       LE,                AOSP     ], // 2011-06-30, SHARP INFOBAR A01
    "IS12SH":           [ "MSM8655",   "233-233",  540,  960,  4.2,  4,  2,  0,       LE,                AOSP     ], // 2011-06-29, SHARP AQUOS PHONE IS12SH
    "IS11SH":           [ "MSM8655",   "233-233",  540,  960,  3.7,  4,  2,  0,       LE,                AOSP     ], // 2011-06-24, SHARP AQUOS PHONE IS11SH
    "IS11S":            [ "MSM8655",   "233-234",  480,  854,  4.2,  4,  2,  0,       LE,                AOSP     ], // 2011-06-24, Xperia acro IS11S
    // 2011 spring and legacy
    "ISW11HT":          [ "QSD8650",   "221-234",  480,  800,  4.3,  4,  2,  0,       LE,                AOSP     ], // 2011-04-15, HTC EVO WiMAX ISW11HT
    "IS06":             [ "QSD8650",   "221-221",  480,  800,  3.7,  4,  5,  0,       LE,                AOSP     ], // 2010-12-23, PANTECH SIRIUS alpha IS06
    "IS05":             [ "MSM8655",   "221-234",  480,  854,  3.4,  4,  2,  0,       LE,                AOSP     ], // 2011-03-10, SHARP IS05
    "IS04":             [ "QSD8650",   "210-222",  480,  854,  4.0,  4,  2,  0,       LE,                AOSP     ], // 2011-02-10, FUJITSU REGZA Phone IS04
    "IS03":             [ "QSD8650",   "210-221",  640,  960,  3.5,  4,  2,  0,       LE,                AOSP     ], // 2010-11-26, SHARP IS03
    "IS01":             [ "QSD8650",   "160-160",  480,  960,  5.0,  1,  1,  0,       LE,                AOSP     ], // 2010-06-24, SHARP IS01 (RAM 256MB)
    // --- SoftBank ---
    "402LG":            [ "MSM8926",   "442-442",  720, 1280,  4.5, 12,  5,  0,       0,          CHROME|AOSP     ], // 2015-02-19, Spray
    "403SC":            [ "MSM8926",   "442-442",  800, 1280,  7.0, 12,  5,  0,       0,          CHROME|SBROWSER ], // 2014-12-22, SAMSUNG GALAXY Tab 4
    "402SH":            [ "MSM8974AB", "444-444", 1080, 1920,  5.5, 16,  5,  0,       0,          CHROME          ], // 2014-12-19, SHARP AQUOS CRYSTAL X
    "403HW":            [ "KIRIN910",  "442-442",  800, 1280,  8.0,  8,  5,  0,       0,          CHROME|AOSP     ], // 2014-12-05, MediaPad M1 8.0
    "401SH":            [ "MSM8926",   "442-442",  720, 1280,  4.5, 12,  5,  0,       0,                 AOSP     ], // 2014-11-28, SHARP Simple Smart Phone 2
    "401SO":            [ "MSM8974AC", "444-444", 1080, 1920,  5.2, 24,  5,  0,       0,          CHROME|CHROMEWB ], // 2014-11-21, Xperia Z3 401SO
    "302KC":            [ "MSM8926",   "442-442",  540,  960,  4.5, 12,  5,  0,       0,          CHROME|CHROMEWB ], // 2014-09-12, 302KC
    "305SH":            [ "MSM8926",   "442-442",  720, 1280,  5.2, 12,  5,  0,       0,          CHROME|CHROMEWB ], // 2014-09-01, SHARP AQUOS CRYSTAL
    "304SH":            [ "MSM8974AB", "442-442", 1080, 1920,  5.2, 16,  5,  0,       0,          CHROME|CHROMEWB ], // 2014-05-26, SHARP AQUOS Xx
    "WX05SH":           [ "MSM8260A",  "412-412",  480,  854,  4.0,  8,  5,  0,       0,          CHROME|AOSP     ], // 2014-03-06, SHARP WX05SH
    "SBM303SH":         [ "MSM8974AA", "422-422", 1080, 1920,  4.5, 16,  5,  0,       0,          CHROME|AOSP     ], // 2014-02-21, SHARP AQUOS PHONE Xx mini 303SH
    "DM016SH":          [ "MSM8974AA", "422-422", 1080, 1920,  5.2, 16,  2,  0,       0,                 AOSP     ], // 2014-01-24, SHARP Disney Mobile on Softbank
    "301F":             [ "MSM8974AA", "422-422", 1080, 1920,  5.0, 16,  2,  0,       0,                 AOSP     ], // 2013-12-06, FUJITSU 301F
    "SBM302SH":         [ "MSM8974AA", "422-422", 1080, 1920,  5.2, 16,  5,  0,       0,          CHROME|AOSP     ], // 2013-12-06, SHARP 302SH
//  "EM01L":            [ "MSM8974AA", "440-440", 1080, 1920,  5.0, 16,  5,  0,       0,          CHROME          ], // 2013-11-15, E-Mobile Nexus 5 EM01L
    "101F":             [ "MSM8960",   "404-412",  540,  960,  4.3,  8,  2,  0,       LE,         CHROME|AOSP     ], // 2013-11-14, FUJITSU 101F
    "WX04SH":           [ "MSM8260A",  "412-412",  480,  854,  4.0,  8,  5,  0,       LE,                AOSP     ], // 2013-11-14, SHARP WX04SH
    "204HW":            [ "MSM8225",   "410-410",  480,  800,  4.0,  8,  2,  0,       LE,                AOSP     ], // 2013-09-13, HUAWEI for Silver Age
    "EM01F":            [ "APQ8064",   "412-412",  720, 1280,  4.7, 16,  5,  0,       LE,         CHROME|AOSP     ], // 2013-08-20, FUJITSU ARROWS S EM01F
    "DM015K":           [ "MSM8960",   "422-422",  720, 1280,  4.3, 12,  2,  0,       0,                 AOSP     ], // 2013-08-02, KYOCERA
    "WX10K":            [ "MSM8960",   "422-422",  720, 1280,  4.7,  8,  2,  0,       0,                 AOSP     ], // 2013-07-18, KYOCERA
    "202K":             [ "MSM8960",   "422-422",  720, 1280,  4.3,  8,  2,  0,       0,                 AOSP     ], // 2013-07-08, KYOCERA
    "202F":             [ "APQ8064T",  "422-422", 1080, 1920,  5.0, 16,  2,  0,       0,                 AOSP     ], // 2013-06-28, FUJITSU
    "SBM206SH":         [ "APQ8064T",  "422-422", 1080, 1920,  5.0, 16,  2,  0,       0,                 AOSP     ], // 2013-06-28, SHARP
    "SBM205SH":         [ "MSM8960",   "412-412",  480,  854,  4.0,  8,  2,  0,       LE,                AOSP     ], // 2013-06-21, SHARP
    "DM014SH":          [ "MSM8960",   "404-412",  720, 1280,  4.5,  8,  2,  0,       LE,         CHROME|AOSP     ], // 2013-03-01, SHARP Disney Mobile
    "SBM204SH":         [ "MSM8255",   "404-404",  480,  800,  4.0,  8,  2,  0,       LE,                AOSP     ], // 2013-05-10, SHARP
    "WX04K":            [ "APE5R",     "234-411",  480,  800,  4.0,  8,  2,  0,       LE,         CHROME|AOSP     ], // 2012-06-21, KYOCERA
    "SBM203SH":         [ "APQ8064",   "412-412",  720, 1280,  4.9, 16,  2,  0,       LE,         CHROME|AOSP     ], // 2013-03-08, SHARP
    "201F":             [ "APQ8064",   "412-412",  720, 1280,  4.7, 16,  2,  0,       LE,         CHROME|AOSP     ], // 2013-02-16, FUJITSU
    "201K":             [ "MSM8960",   "412-412",  480,  800,  3.7,  8,  2,  0,       LE,         CHROME|AOSP     ], // 2013-01-25, KYOCERA
    "SBM200SH":         [ "MSM8960",   "404-410",  720, 1280,  4.5,  8,  2,  0,       LE,         CHROME|AOSP     ], // 2012-12-21, SHARP
    "DM013SH":          [ "MSM8255",   "404-404",  480,  854,  3.7,  8,  2,  0,       LE,         CHROME|AOSP     ], // 2012-12-14, SHARP
    "SBM107SHB":        [ "MSM8255",   "404-404",  480,  854,  3.7,  8,  2,  0,       LE,                AOSP     ], // 2012-09-07, SHARP
    "WX06K":            [ "APE5R",     "234-234",  480,  800,  3.5,  4,  2,  0,       LE,                AOSP     ], // 2012-08-23, KYOCERA
    "SBM107SH":         [ "MSM8255",   "404-404",  480,  854,  3.7,  8,  2,  0,       LE,                AOSP     ], // 2012-07-14, SHARP
    "SBM102SH2":        [ "OMAP4430",  "235-404",  720, 1280,  4.5,  8,  2,  0,       LE,                AOSP     ], // 2012-07-12, SHARP
    "SBM106SH":         [ "MSM8260A",  "404-404",  720, 1280,  4.7,  8,  2,  0,       LE,                AOSP     ], // 2012-07-06, SHARP
    "102P":             [ "OMAP4430",  "235-235",  540,  960,  4.3,  8,  2,  0,       LE,                AOSP     ], // 2012-03-23, PANASONIC
    "101DL":            [ "MSM8260",   "235-235",  540,  960,  4.3,  8,  2,  0,       LE,                AOSP     ], // 2012-03-03, DELL
    "SBM104SH":         [ "OMAP4460",  "403-403",  720, 1280,  4.5,  8,  2,  0,       LE,                AOSP     ], // 2012-02-24, SHARP
    "DM012SH":          [ "MSM8255",   "235-235",  540,  960,  4.0,  4,  2,  0,       LE,                AOSP     ], // 2012-02-17, SHARP
    "101K":             [ "APE5R",     "234-234",  480,  800,  3.5,  4,  2,  0,       LE,                AOSP     ], // 2012-01-27, KYOCERA
    "SBM103SH":         [ "MSM8255",   "235-235",  540,  960,  4.0,  4,  2,  0,       LE,                AOSP     ], // 2012-02-20, SHARP
    "101N":             [ "MSM8255",   "235-235",  480,  800,  4.0,  4,  2,  0,       LE,                AOSP     ], // 2012-01-20, NEC CASIO
    "101P":             [ "OMAP4430",  "235-235",  480,  854,  4.0,  8,  2,  0,       LE,                AOSP     ], // 2012-01-14, PANASONIC
    "SBM102SH":         [ "OMAP4430",  "235-404",  720, 1280,  4.5,  8,  2,  0,       LE,                AOSP     ], // 2011-12-16, SHARP
    "DM011SH":          [ "MSM8255",   "235-235",  480,  854,  3.4,  4,  2,  0,       LE,                AOSP     ], // 2011-12-02, SHARP
    "SBM101SH":         [ "MSM8255",   "235-235",  480,  854,  3.4,  4,  2,  0,       LE,                AOSP     ], // 2011-11-18, SHARP
    "DM010SH":          [ "MSM8255",   "234-234",  540,  960,  4.0,  4,  2,  0,       LE,                AOSP     ], // 2011-10-08, SHARP
    "DM009SH":          [ "MSM8255",   "220-234",  480,  800,  4.0,  4,  2,  0,       LE,                AOSP     ], // 2011-02-18, SHARP DM009SH
    "SBM009SHY":        [ "MSM8255",   "234-234",  540,  960,  4.0,  4,  2,  0,       LE,                AOSP     ], // 2011-09-23, SHARP 009SH Y
    "SBM007SHK":        [ "MSM8255",   "233-233",  480,  854,  3.4,  4,  2,  0,       LE,                AOSP     ], // 2011-09-09, SHARP 007SH KT
    "SBM009SH":         [ "MSM8255",   "234-234",  540,  960,  4.0,  4,  2,  0,       LE,                AOSP     ], // 2011-08-26, SHARP 009SH
    "003P":             [ "OMAP3630",  "233-233",  480,  854,  4.3,  4,  2,  0,       LE,                AOSP     ], // 2011-08-12, PANASONIC 003P
    "SBM007SHJ":        [ "MSM8255",   "233-233",  480,  854,  3.4,  4,  2,  0,       LE,                AOSP     ], // 2011-07-22, SHARP 007SH J
    "SBM007SH":         [ "MSM8255",   "233-233",  480,  854,  3.4,  4,  2,  0,       LE,                AOSP     ], // 2011-06-17, SHARP 007SH
    "SBM006SH":         [ "MSM8255",   "233-233",  540,  960,  4.2,  4,  2,  0,       LE,                AOSP     ], // 2011-06-04, SHARP 006SH
    "SBM005SH":         [ "MSM8255",   "221-221",  480,  800,  3.8,  4,  2,  0,       LE,                AOSP     ], // 2011-02-25, SHARP 005SH
    "001DL":            [ "QSD8250",   "220-220",  480,  800,  5.0,  4,  2,  0,       LE,                AOSP     ], // 2010-12-21, DELL 001DL
    "SBM003SH":         [ "MSM8255",   "220-234",  480,  800,  3.8,  4,  2,  0,       LE,                AOSP     ], // 2010-12-17, SHARP 003SH
    "001HT":            [ "MSM8255",   "220-233",  480,  800,  4.3,  3,  2,  0,       LE,                AOSP     ], // 2010-11-12, HTC 001HT
    // --- OTHER ---
    "SGP412JP":         [ "APQ8074",   "420-420", 1080, 1920,  6.4, 16,  5,  0,       0,          CHROME          ], // Xperia Z Ultra WiFi Edition
    "NW-Z1000":         [ "AP20",      "230-404",  480,  800,  4.3,  4,  5,  0,       LE,                AOSP     ], // NW-Z1050, NW-Z1060, NW-Z1070
    "Kobo Arc 7":       [ "MTK8125",   "422-422",  600, 1024,  7.0,  8,  5,  0,       0,          CHROME|AOSP     ], // RAKUTEN Kobo Arc 7
    // --- SIM FREE ---
  //"ARROWS M01":       [ "MSM8926",   "442-442",  720, 1280,  4.5,  8,  5,  0,       LE,         ?               ], // ARROWS M01
  //"FXC5A":            [ "MT6582",    "442-442",  540,  960,  5.0,  4,  5,  0,       0,                 AOSP     ], // JENESIS AEON geanee
//}@devicejp
//{@devicefx
    "LGL25":            [ "MSM8926",   "200-200",  720, 1280,  4.7, 12,  5,  FXOS,    0,          0               ], // au LG Fx0, Firefox OS
//}@devicefx
//{@kindle
    "KFOT":             [ "OMAP4430",  "234-234",  600, 1024,  7.0,  4,  5,  KINDLE,  LE,         0               ], // Kindle Fire
    "KFTT":             [ "OMAP4460",  "403-403",  800, 1280,  7.0,  8,  5,  KINDLE,  LE,         0               ], // Kindle Fire HD
    "KFJWI":            [ "OMAP4470",  "403-403", 1200, 1920,  8.9,  8,  5,  KINDLE,  LE,         0               ], // Kindle Fire HD 8.9
    "KFJWA":            [ "OMAP4470",  "403-403", 1200, 1920,  8.9,  8,  5,  KINDLE,  LE,         0               ], // Kindle Fire HD 8.9 4G
    "KFSOWI":           [ "OMAP4470",  "422-422",  800, 1280,  7.0,  8,  5,  KINDLE,  0,          0               ], // Kindle Fire HD 7 (2nd)
    "KFTHWI":           [ "MSM8974AA", "422-422", 1200, 1920,  7.0, 16,  5,  KINDLE,  0,          0               ], // Kindle Fire HDX 7 (3rd)
    "KFTHWA":           [ "MSM8974AA", "422-422", 1200, 1920,  7.0, 16,  5,  KINDLE,  0,          0               ], // Kindle Fire HDX 7 (3rd) 4G
    "KFAPWI":           [ "MSM8974AA", "422-422", 1600, 2560,  8.9, 16,  5,  KINDLE,  0,          0               ], // Kindle Fire HDX 8.9 (3rd)
    "KFAPWA":           [ "MSM8974AA", "422-422", 1600, 2560,  8.9, 16,  5,  KINDLE,  0,          0               ], // Kindle Fire HDX 8.9 (3rd) 4G
//}@kindle
//{@windowsphone
    // --- Windows Phone 8.0 ---
    "Lumia 520":        [ "MSM8227",   "800-800",  480,  800,  4.0,  4,  4,  WINDOWS, LE,         0               ], // NOKIA
    "Lumia 525":        [ "MSM8227",   "800-800",  480,  800,  4.0,  8,  4,  WINDOWS, LE,         0               ], // NOKIA
    "Lumia 620":        [ "MSM8960",   "800-800",  480,  800,  3.8,  4,  4,  WINDOWS, 0,          0               ], // NOKIA LTE not impl
    "Lumia 625":        [ "MSM8930",   "800-800",  480,  800,  4.7,  4,  4,  WINDOWS, 0,          0               ], // NOKIA
    "Lumia 720":        [ "MSM8227",   "800-800",  480,  800,  4.3,  4,  4,  WINDOWS, LE,         0               ], // NOKIA
    "Lumia 810":        [ "MSM8260A",  "800-800",  480,  800,  4.3,  4,  4,  WINDOWS, 0,          0               ], // NOKIA
    "Lumia 820":        [ "MSM8960",   "800-800",  480,  800,  4.3,  8,  4,  WINDOWS, 0,          0               ], // NOKIA
    "Lumia 822":        [ "MSM8960",   "800-800",  480,  800,  4.3,  8,  4,  WINDOWS, 0,          0               ], // NOKIA
    "Lumia 920":        [ "MSM8960",   "800-800",  768, 1280,  4.5,  8,  4,  WINDOWS, 0,          0               ], // NOKIA
    "Lumia 925":        [ "MSM8960",   "800-800",  768, 1280,  4.5,  8,  4,  WINDOWS, 0,          0               ], // NOKIA
    "Lumia 928":        [ "MSM8960",   "800-800",  768, 1280,  4.5,  8,  4,  WINDOWS, 0,          0               ], // NOKIA
    "Lumia 1020":       [ "MSM8960",   "800-800",  768, 1280,  4.5, 16,  4,  WINDOWS, 0,          0               ], // NOKIA
    "Lumia 1320":       [ "MSM8930AB", "800-800",  768, 1280,  6.0,  8,  4,  WINDOWS, 0,          0               ], // NOKIA NO_NFC
    "Lumia 1520":       [ "MSM8974AA", "800-800", 1080, 1920,  6.0, 16,  4,  WINDOWS, 0,          0               ], // NOKIA
    "Lumia Icon":       [ "MSM8974AA", "800-800", 1080, 1920,  5.0, 16,  4,  WINDOWS, 0,          0               ], // NOKIA
    // --- Windows Phone 8.1 ---
    "Lumia 435":        [ "MSM8212",   "810-810",  480,  800,  4.0,  8,  4,  WINDOWS, LE,         0               ], // NOKIA
    "Lumia 530":        [ "MSM8212",   "810-810",  480,  854,  4.0,  4,  4,  WINDOWS, LE,         0               ], // NOKIA
    "Lumia 532":        [ "MSM8212",   "810-810",  480,  800,  4.0,  8,  4,  WINDOWS, LE,         0               ], // NOKIA
    "Lumia 535":        [ "MSM8212",   "810-810",  480,  800,  5.0,  8,  4,  WINDOWS, LE,         0               ], // NOKIA
    "Lumia 630":        [ "MSM8226",   "810-810",  480,  854,  4.5,  4,  4,  WINDOWS, 0,          0               ], // NOKIA
    "Lumia 635":        [ "MSM8926",   "810-810",  480,  854,  4.5,  4,  4,  WINDOWS, 0,          0               ], // NOKIA
    "Lumia 930":        [ "MSM8974AA", "810-810", 1080, 1920,  5.0, 16,  4,  WINDOWS, 0,          0               ], // NOKIA
//}@windowsphone
};
var SOC = {
    //                 CLOCK CORES GPU_ID              FEATURE          LIMIT
    "A4":               [ 0.8, 1, "POWERVR SGX535"   , A___           , 0           ], // iPhone 4, iPad 1, iPod touch 4
    "A5":               [ 0.8, 2, "POWERVR SGX543MP2", A___           , 0           ], // iPhone 4S, iPad 2, iPad mini, iPod touch 5
    "A5X":              [ 1.0, 2, "POWERVR SGX543MP4", AB__           , 0           ], // iPad 3
    "A6":               [ 1.3, 2, "POWERVR SGX543MP3", AB__           , 0           ], // iPhone 5, iPhone 5c
    "A6X":              [ 1.4, 2, "POWERVR SGX554MP4", AB__           , 0           ], // iPad 4
    "A7":               [ 1.3, 2, "POWERVR G6430"    , AB_6           , 0           ], // iPhone 5s, iPad Air, iPad mini 2, iPad mini 3
    "A8":               [ 1.4, 2, "POWERVR GX6450"   , ABN6           , 0           ], // iPhone 6, iPhone 6 plus
    "A8X":              [ 1.5, 3, "POWERVR GX6450"   , AB_6           , 0           ], // iPad Air 2
    "QSD8250":          [ 1.0, 1, "ADRENO 200"       , A___           , 0           ], // Snapdragon S1, Nexus One
    "QSD8650":          [ 1.0, 1, "ADRENO 200"       , A___           , 0           ], // Snapdragon S1
    "APQ8060":          [ 1.2, 2, "ADRENO 220"       , ABN_           , 0           ], // Snapdragon S3
    "APQ8064":          [ 1.5, 4, "ADRENO 320"       , ABN_           , 0           ], // Snapdragon S4 Pro, Nexus 7 2nd
    "APQ8064T":         [ 1.7, 4, "ADRENO 320"       , ABN_           , 0           ], // Snapdragon 600
    "APQ8064AB":        [ 1.9, 4, "ADRENO 320"       , ABN_           , 0           ], // Snapdragon 600
    "APQ8074":          [ 2.2, 4, "ADRENO 330"       , ABN_           , 0           ], // Snapdragon 800
    "APQ8084":          [ 2.7, 4, "ADRENO 405"       , ABN_           , 0           ], // Snapdragon 805
    "MSM7227":          [ 0.6, 1, "ADRENO 200"       , A___           , 0           ], // Snapdragon S1
    "MSM7230":          [ 0.8, 1, "ADRENO 205"       , A___           , 0           ], // Snapdragon S2
    "MSM8212":          [ 1.2, 4, "ADRENO 302"       , ABN_           , 0           ], // Snapdragon 200 (dual-core or quad-core)
    "MSM8225":          [ 1.2, 1, "ADRENO 203"       , AB__           , 0           ], // Snapdragon S4
    "MSM8226":          [ 1.2, 4, "ADRENO 305"       , ABN_           , 0           ], // Snapdragon 400
    "MSM8227":          [ 1.0, 2, "ADRENO 305"       , ABN_           , 0           ], // Snapdragon S4
    "MSM8255":          [ 1.0, 1, "ADRENO 205"       , A___           , 0           ], // Snapdragon S2
    "MSM8255T":         [ 1.4, 1, "ADRENO 205"       , A___           , 0           ], // Snapdragon S2
    "MSM8260":          [ 1.7, 2, "ADRENO 220"       , A___           , 0           ], // Snapdragon S3
    "MSM8260A":         [ 1.5, 2, "ADRENO 225"       , ABN_           , 0           ], // Snapdragon S4
    "MSM8655":          [ 1.0, 1, "ADRENO 205"       , A___           , 0           ], // Snapdragon S2
    "MSM8660":          [ 1.2, 2, "ADRENO 220"       , A___           , 0           ], // Snapdragon S3
    "MSM8660A":         [ 1.5, 2, "ADRENO 225"       , A___           , 0           ], // Snapdragon S4
    "MSM8926":          [ 1.2, 4, "ADRENO 305"       , ABN_           , 0           ], // Snapdragon 400
    "MSM8928":          [ 1.6, 4, "ADRENO 305"       , ABN_           , 0           ], // Snapdragon 400
    "MSM8930":          [ 1.2, 2, "ADRENO 305"       , ABN_           , 0           ], // Snapdragon S4 / Snapdragon 400
    "MSM8930AB":        [ 1.7, 2, "ADRENO 305"       , ABN_           , 0           ], // Snapdragon 400
    "MSM8960":          [ 1.5, 2, "ADRENO 225"       , ABN_           , 0           ], // Snapdragon S4
    "MSM8960T":         [ 1.7, 2, "ADRENO 320"       , ABN_           , 0           ], // Snapdragon S4 Pro
    "MSM8974AA":        [ 2.2, 4, "ADRENO 330"       , ABN_           , 0           ], // Snapdragon 800, Nexus 5
    "MSM8974AB":        [ 2.3, 4, "ADRENO 330"       , ABN_           , 0           ], // Snapdragon 801
    "MSM8974AC":        [ 2.5, 4, "ADRENO 330"       , ABN_           , 0           ], // Snapdragon 801
    "T20":              [ 1.0, 2, "TEGRA T20"        , A___           , 0           ], // NO_SIMD
    "AP20":             [ 1.0, 2, "TEGRA AP20"       , A___           , 0           ], // NO_SIMD
    "AP25":             [ 1.2, 2, "TEGRA AP25"       , A___           , 0           ], // NO_SIMD
    "T30L":             [ 1.3, 4, "TEGRA T30L"       , A_N_           , 0           ], // Nexus 7 (2012)
    "AP33":             [ 1.5, 4, "TEGRA AP33"       , ABN_           , 0           ], //
    "AP37":             [ 1.7, 4, "TEGRA AP37"       , ABN_           , 0           ], //
    "T124":             [ 2.3, 4, "TEGTA T124"       , ABN_           , 0           ], // 32bit K1, Mi Pad
    "T132":             [ 2.2, 4, "TEGRA T132"       , ABN6           , 0           ], // 64bit K1, Nexus 9
  //"X1":               [ 2.2, 4, "TEGRA T132"       , ABN6           , 0           ], // 64bit X1, SHILED
    "OMAP3630":         [ 1.0, 1, "POWERVR SGX530"   , A___           , 0           ], //
    "OMAP4430":         [ 1.2, 2, "POWERVR SGX540"   , A___           , 0           ], //
    "OMAP4460":         [ 1.2, 2, "POWERVR SGX540"   , A___           , 0           ], // Galaxy Nexus
    "OMAP4470":         [ 1.3, 2, "POWERVR SGX544"   , A___           , 0           ], //
    "S5L8900":          [ 0.4, 1, "POWERVR MBX LITE" , A___           , 0           ], // iPhone 3G, ARMv6
    "S5PC100":          [ 0.6, 1, "POWERVR SGX535"   , A___           , 0           ], // iPhone 3GS, iPod touch 3
    "S5PC110":          [ 1.0, 1, "POWERVR SGX540"   , A_N_           , 0           ], // Nexus S
    "EXYNOS4210":       [ 1.2, 2, "MALI 400MP4"      , A___           , 0           ], // SC-02C, SC-02D, ISW11SC
    "EXYNOS4412":       [ 1.4, 4, "MALI 400MP4"      , AB__           , 0           ], // SC-02E, SC-03E
    "EXYNOS5250":       [ 1.7, 2, "MALI T604MP4"     , A_N_           , 0           ], // Nexus 10
    "EXYNOS7420":       [ 1.5, 4, "MALI T760MP4"     , ABN_           , 0           ], // Galaxy S6, S6 edge
    "MT8125":           [ 1.2, 4, "POWERVR SGX544"   , ABN_           , 0           ], // MediaTek, MeMo Pad HD7, Kobo Arc 7
    "MT6582":           [ 1.3, 4, "MALI 400MP2"      , AB__           , 0           ], // MediaTek, FXC5A
    "MT6592":           [ 2.0, 8, "MALI 450MP4"      , AB__           , 0           ], // MediaTek, Redmi Nite
    "K3V2":             [ 1.2, 4, "GC 4000"          , AB__           , 0           ], // VIVANTE GC 4000
    "KIRIN910":         [ 1.6, 4, "MALI 450MP4"      , ABN_           , 0           ], // MediaPad X1, MediaPad M1
    "APE5R":            [ 1.2, 2, "POWERVR SGX543MP2", A___           , 0           ], // R-Mobile, 101K
    "Z2560":            [ 1.6, 2, "POWERVR SGX544MP2", IBN6           , 0           ], // Clover Trail+,
    "Z2580":            [ 2.0, 2, "POWERVR SGX544MP2", IBN6           , 0           ], // Clover Trail+
    "Z3560":            [ 1.8, 4, "POWERVR G6430"    , IBN6           , 0           ], // Moorefield
    "Z3580":            [ 2.3, 4, "POWERVR G6430"    , IBN6           , 0           ], // Moorefield
    "Z3745":            [ 1.8, 4, "HD GRAPHICS G7"   , IBN6           , 0           ], // Bay Trail-T
  //"PSVITA":           [ 1.2, 4, "POWERVR SGX543MP4", A___           , 0           ], // aka CXD5315GG
};
var GPU = {
    //                    GFLOPS       GLES TEXTURE  FEATURE   LIMIT
    "POWERVR MBX LITE": [   0.1,        1.1,     1,  0       , LE          ], // iPhone 3G
    "POWERVR SGX530":   [   1.6,        2.0,     2,  0       , LE          ],
    "POWERVR SGX535":   [   1.6,        2.0,     2,  0       , LE          ], // iPhone 3GS, iPhone 4, iPad 1, iPod touch 3, iPod touch 4
    "POWERVR SGX540":   [   3.2,        2.0,     2,  0       , LE          ], // Nexus S, Galaxy Nexus
    "POWERVR SGX543MP2":[   7.2 * 2,    2.0,     4,  0       , LE          ], // iPhone 4S, iPad 2, iPad mini, iPod touch 5
    "POWERVR SGX543MP3":[   7.2 * 3,    2.0,     4,  0       , 0           ], // iPhone 5, iPhone 5c
    "POWERVR SGX543MP4":[   7.2 * 4,    2.0,     4,  0       , 0           ], // iPad 3
    "POWERVR SGX544":   [   7.2,        2.0,     4,  0       , LE          ],
    "POWERVR SGX544MP2":[   7.2 * 2,    2.0,     4,  0       , LE          ],
    "POWERVR SGX554MP4":[  14.4 * 4,    2.0,     4,  0       , 0           ], // iPad 4
    "POWERVR G6430":    [ 115.2,        3.1,     4,  0       , 0           ], // A7, iPhone 5s, iPad Air, iPad mini 2, iPad mini 3
    "POWERVR GX6450":   [ 166.4,        3.1,    16,  0       , 0           ], // iPhone 6, iPhone 6 plus, iPad Air 2
    "ADRENO 200":       [   2.1,        2.0,     2,  0       , LE          ], // Snapdragon S1, Nexus One
    "ADRENO 203":       [   7.8,        2.0,     4,  0       , LE          ], // Snapdragon 200
    "ADRENO 205":       [   7.8,        3.0,     4,  0       , LE          ], // Snapdragon 400
    "ADRENO 220":       [  17.0,        2.0,     4,  0       , LE          ], // Snapdragon S3
    "ADRENO 225":       [  19.2,        2.0,     4,  0       , LE          ], // Snapdragon S4
    "ADRENO 302":       [  19.2,        3.0,     4,  0       , LE          ], // Snapdragon 200
    "ADRENO 305":       [  19.2,        3.0,     4,  0       , LE          ], // Snapdragon 400
    "ADRENO 320":       [  57.6,        3.0,     4,  0       , 0           ], // Snapdragon 600, Nexus 4, Nexus 7 (2013)
    "ADRENO 330":       [ 158.4,        3.0,     4,  0       , 0           ], // Snapdragon 800/801/610, Nexus 5
    "ADRENO 405":       [  59.4,        3.1,     4,  0       , 0           ], // Snapdragon 615, Nexus 6
    "ADRENO 420":       [ 144.0,        3.1,    16,  0       , 0           ], // Snapdragon 805
    "TEGRA T20":        [   5.6,        2.0,     2,  0       , LE|NO_SIMD  ], // TEGRA 2
    "TEGRA AP20":       [   5.6,        2.0,     2,  0       , LE|NO_SIMD  ], // TEGRA 2, NW-Z1000
    "TEGRA AP25":       [   5.6,        2.0,     2,  0       , LE|NO_SIMD  ], // TEGRA 2
    "TEGRA AP33":       [  12.5,        2.0,     2,  0       , LE          ], // TEGRA 3
    "TEGRA AP37":       [  12.5,        2.0,     2,  0       , LE          ], // TEGRA 3, F-02E, F-05E
    "TEGRA T30L":       [  12.5,        2.0,     2,  0       , LE          ], // TEGRA 3, Nexus 7 (2012)
    "TEGRA T124":       [ 365.0,        3.1,    16,  0       , 0           ], // TEGRA K1, SHIELD Tablet, Mi Pad
    "TEGRA T132":       [ 365.0,        3.1,    16,  0       , 0           ], // TEGRA K1, Nexus 9
//  "TEGRA TX1":        [ 365.0 * 1.3,  3.1,    16,  0       , 0           ], // TEGRA X1, SHIELD
    "MALI 400MP2":      [   5.0 * 2,    2.0,     4,  0       , LE          ], // Mali-400
    "MALI 400MP4":      [   5.0 * 4,    2.0,     4,  0       , LE          ], // Mali-400
    "MALI 450MP4":      [  14.6 * 4,    2.0,     4,  0       , 0           ], // Mali-450
    "MALI T604MP4":     [  17.0 * 4,    3.1,     4,  0       , 0           ], // Mali-T604 Nexus 10
    "MALI T760MP4":     [  68.0 * 4,    3.1,     4,  0       , 0           ], // Mali-T760 Galaxy S6
    "GC 4000":          [  30.7,        2.0,     8,  0       , LE          ], // (IMMERSION.16) HW-03E, dtab01
    "HD GRAPHICS G7":   [  50.0,        3.3,     4,  0       , 0           ], // Bay Trail-T 7th generation, E4U (Z3745, Clock 778MHz)
};

global["SpecCatalog"] = {
    "FEATURE": FEATURE,
    "LIMIT":   LIMIT,
    "APP":     APP,
    "DEVICE":  DEVICE,
    "SOC":     SOC,
    "GPU":     GPU,
};

})((this || 0).self || global);

