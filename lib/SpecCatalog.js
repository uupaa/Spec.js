(function moduleExporter(name, closure) {
"use strict";

var entity = GLOBAL["WebModule"]["exports"](name, closure);

if (typeof module !== "undefined") {
    module["exports"] = entity;
}
return entity;

})("SpecCatalog", function moduleClosure() {
"use strict";
/*

- DEVICE
    - docomo        http://spec.nttdocomo.co.jp/spmss/
        - update    https://www.nttdocomo.co.jp/support/utilization/product_update/
    - au            http://www.au.kddi.com/developer/android/
        - update    http://www.au.kddi.com/information/notice_mobile/update/list/
        - update    http://www.au.kddi.com/information/notice_mobile/update/
    - softbank      https://www.support.softbankmobile.co.jp/partner/smp_info/smp_info_search_t.cfm
        - update    http://www.softbank.jp/mobile/info/personal/software/archive/_year_2015/
    - mozilla       https://wiki.mozilla.org/Compatibility/UADetectionLibraries
    - Device list   https://www.handsetdetection.com/properties/vendormodel/
    - Snapdragon    https://en.wikipedia.org/wiki/Qualcomm_Snapdragon
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
    - Vulkan
        - http://www.4gamer.net/games/293/G029343/20150304076/

 */

// --- Tags ---
var AOSP        =  0x1;     // APP: AOSP Stock Browser (Android Browser)
var SBROWSER    =  0x2;     // APP: S Browser (Chromium Based Browser)
var CHROME      =  0x4;     // APP: Google Chrome for Android
var CHROMEWB    =  0x8;     // APP: Chromium WebView Based Browser
var ARM64       = 0x10;     // CPU: ARM64 (64bit), Cortex-A57, NVIDIA DENVER K1 (64bit), NVIDIA X1, Snapdragon 410+, 610+, 810+
var ATOM        = 0x20;     // CPU: ATOM (64bit)
var BLE         = 0x40;     // NET: Bluetooth LE, Android 4.3+ (API Level 18+)
var NFC         = 0x80;     // NET: NFC
var H265E       = 0x100;    // MEDIA: H.265 encoder (Snapdragon 810+, NVIDIA X1)
var H265D       = 0x200;    // MEDIA: H.265 decoder (Snapdragon 805+, 808+, NVIDIA X1)
var H265        = H265E | H265D; // MEDIA: H.265 both (encoder and decoder)
var FORCE_TOUCH = 0x400;    // DISPLAY: Force touch
var FORCE_CLICK = 0x800;    // DISPLAY: Force click on link navigation

var Tags = {
    "AOSP":         AOSP,
    "SBROWSER":     SBROWSER,
    "CHROME":       CHROME,
    "CHROMEWB":     CHROMEWB,
    "ARM64":        ARM64,
    "ATOM":         ATOM,
    "BLE":          BLE,
    "NFC":          NFC,
    "H265E":        H265E,
    "H265D":        H265D,
    "FORCE_TOUCH":  FORCE_TOUCH,
    "FORCE_CLICK":  FORCE_CLICK,
};

var iOS = {
    //                     SOC          DATE   OS_VERS   DISP1 DISP2 INCH RAM TOUCH TAGS
    // -- iOS Devices ---
    "iPhone 6s Plus":   [ "A9",         1509, "900-",     414,  736,  5.5,  8,  5,  ARM64 | BLE | NFC | FORCE_TOUCH | FORCE_CLICK ],
    "iPhone 6s":        [ "A9",         1509, "900-",     375,  667,  4.7,  8,  5,  ARM64 | BLE | NFC | FORCE_TOUCH | FORCE_CLICK ],
    "iPhone 6 Plus":    [ "A8",         1409, "800-",     414,  736,  5.5,  8,  5,  ARM64 | BLE | NFC ], // screen{width:414,height:736},inner{width:980,height:1487}
    "iPhone 6":         [ "A8",         1409, "800-",     375,  667,  4.7,  8,  5,  ARM64 | BLE | NFC ], // screen{width:375,height:667},inner{width:980,height:1461}
    "iPhone 5s":        [ "A7",         1309, "700-",     320,  568,  4.0,  8,  5,  ARM64 | BLE       ], // screen{width:320,height:568},inner{width:980,height:1409}
    "iPhone 5c":        [ "A6",         1309, "700-",     320,  568,  4.0,  8,  5,          BLE       ], //
    "iPhone 5":         [ "A6",         1209, "600-",     320,  568,  4.0,  8,  5,          BLE       ], //
    "iPhone 4s":        [ "A5",         1110, "511-",     320,  480,  3.5,  4,  5,          BLE       ], // screen{width:320,height:480},inner{width:980,height:1139}
    "iPhone 4":         [ "A4",         1006, "400-712",  320,  480,  3.5,  4,  5,                    ], //
    "iPhone 3GS":       [ "S5PC100",     906, "300-615",  320,  480,  3.5,  2,  5,                    ], //
    "iPhone 3G":        [ "S5L8900",     807, "200-421",  320,  480,  3.5,  1,  5,                    ], //
//  "iPad Pro":         [ "A9X",        1511, "900-",    1024, 1366, 12.9, 16, 11,  ARM64 | BLE       ], //
    "iPad Air 2":       [ "A8X",        1410, "810-",     768, 1024,  9.7, 16, 11,  ARM64 | BLE       ], //
    "iPad Air":         [ "A7",         1311, "700-",     768, 1024,  9.7,  8, 11,  ARM64 | BLE       ], //
    "iPad 4":           [ "A6X",        1211, "600-",     768, 1024,  9.7,  8, 11,          BLE       ], //
    "iPad 3":           [ "A5X",        1203, "510-",     768, 1024,  9.7,  8, 11,          BLE       ], //
    "iPad 2":           [ "A5",         1103, "430-",     768, 1024,  9.7,  4, 11,                    ], //
    "iPad":             [ "A4",         1004, "320-615",  768, 1024,  9.7,  2, 11,                    ], //
    "iPad mini 4":      [ "A8",         1509, "900-",     768, 1024,  7.9, 16, 11,  ARM64 | BLE       ], //
    "iPad mini 3":      [ "A7",         1410, "810-",     768, 1024,  7.9,  8, 11,  ARM64 | BLE       ], //
    "iPad mini 2":      [ "A7",         1311, "700-",     768, 1024,  7.9,  8, 11,  ARM64 | BLE       ], //
    "iPad mini":        [ "A5",         1211, "600-",     768, 1024,  7.9,  4, 11,          BLE       ], //
    "iPod touch 6":     [ "A8",         1507, "840-",     320,  568,  4.0,  8,  5,          BLE       ], //
    "iPod touch 5":     [ "A5",         1209, "600-",     320,  568,  4.0,  4,  5,          BLE       ], //
    "iPod touch 4":     [ "A4",         1009, "410-615",  320,  480,  4.0,  2,  5,                    ], //
  //"iPod touch 3":     [ "CORTEXA8",    909, "310-511",  320,  480,  3.5,  2,  5,                    ], // 32/64GB Model
    "iPod touch 3":     [ "S5PC100",     909, "310-511",  320,  480,  3.5,  1,  5,                    ], // 8GB Model
};

var Android = {
    //                     SOC          DATE   OS_VERS   DISP1 DISP2 INCH RAM TOUCH TAGS
    // --- Android global model ---
    "Android One":      [ "MT6582",     1409, "444-",     480,  854,  4.5,  8,  5,          BLE       | CHROME            ], // Android One, Sparkle V,
  //"C6806":            [ "MSM8974AA",  1312, "422-",    1080, 1920,  6.4, 16,  5,          BLE | NFC | CHROME            ], // Xperia Z Ultra Google Edition
  //"HTC6500LVW":       [ "APQ8064T",   1306, "422-",    1080, 1920,  4.7, 16,  5,          BLE | NFC | CHROME            ], // HTC One Google Play Edition
  // GT-I9505G":        [ "APQ8064AB",  1306, "422-",    1080, 1920,  5.0, 16,  5,          BLE | NFC | CHROME | SBROWSER ], // Galaxy S4 Google Play Edition
    "XT1058":           [ "MSM8960T",   1307, "422-",     720, 1280,  4.7, 16,  5,          BLE | NFC | CHROME            ], // MOTOROLA Moto X
    "Pixel C":          [ "X1",         1512, "600-",    1800, 2560, 10.2, 24, 10,  ARM64 | BLE | NFC | CHROME            | H265  ], // Google Pixel C
    "Nexus 10":         [ "EXYNOS5250", 1211, "420-",    1600, 2560, 10.0, 16,  5,                NFC | CHROME            ], // Nexus 10
    "Nexus 9":          [ "T132",       1411, "500-",    1536, 2048,  8.9, 16,  5,  ARM64 | BLE | NFC | CHROME            ], // Nexus 9
    "Nexus 7 2nd":      [ "APQ8064",    1307, "430-",    1200, 1920,  7.0, 16,  5,          BLE | NFC | CHROME            ], // Nexus 7 (2013)
    "Nexus 7":          [ "T30L",       1207, "411-",     800, 1280,  7.0,  8,  5,                NFC | CHROME            ], // Nexus 7 (2012)
    "Nexus 6P":         [ "MSM8994",    1510, "600-",    1440, 2560,  5.7, 24,  5,  ARM64 | BLE | NFC | CHROME            | H265  ], // Nexus 6P
    "Nexus 6":          [ "APQ8084",    1412, "500-",    1440, 2560,  6.0, 24,  5,          BLE | NFC | CHROME            | H265D ], // Nexus 6
    "Nexus 5X":         [ "MSM8992",    1510, "600-",    1080, 1920,  5.2, 16,  5,  ARM64 | BLE | NFC | CHROME            | H265D ], // Nexus 5X
    "Nexus 5":          [ "MSM8974AA",  1311, "440-",    1080, 1920,  5.0, 16,  5,          BLE | NFC | CHROME            ], // Nexus 5
    "Nexus 4":          [ "APQ8064",    1211, "420-",     768, 1280,  4.7, 16,  5,          BLE | NFC | CHROME            ], // Nexus 4
    "Galaxy Nexus":     [ "OMAP4460",   1111, "400-422",  720, 1280,  4.7,  8,  2,                NFC |         AOSP      ], // Galaxy Nexus LTE (partial)
    "Nexus S":          [ "S5PC110",    1012, "232-410",  480,  800,  4.0,  4,  5,                NFC |         AOSP      ], // Nexus S
    "Nexus One":        [ "QSD8250",    1001, "210-236",  480,  800,  3.7,  4,  2,                              AOSP      ], // Nexus One
//  "Mi 4i":            [ "MSM8939",    1504, "502-502", 1080, 1920,  5.0, 16,  5,  ARM64 | BLE | NFC | CHROME            | H265D ], // Mi 4i
    "Mi Pad":           [ "T124",       1407, "444-444", 1536, 2048,  7.9, 16,  5,          BLE | NFC | CHROME            ], // Xiaomi Mi Pad
    "Redmi Note":       [ "MT6592",     1407, "420-420",  720, 1280,  5.5, 16,  5,                      CHROME            ], // Xiaomi Redmi Note
    "ASUS_T00J":        [ "Z2560",      1411, "430-442",  720, 1280,  5.0,  8,  5,  ATOM  | BLE | NFC | CHROME            ], // ASUS ZenFone 5 (A501CG)(ATOM 1.6GHz 2Cores)
    "ASUS_T00F":        [ "Z2580",      1411, "430-442",  720, 1280,  5.0, 16,  5,  ATOM  | BLE | NFC | CHROME            ], // ASUS ZenFone 5 (A500CG)(ATOM 2GHz 2Cores)
    "ASUS_T00P":        [ "MSM8926",    1411, "430-442",  720, 1280,  5.0, 16,  5,          BLE | NFC | CHROME            ], // ASUS ZenFone 5 (A500KL)(Snapdragon 400 1.2GHz 4Cores)

    "ASUS_Z00AD":       [ "Z3560",      1505, "500-500", 1080, 1920,  5.5, 16,  5,  ATOM  | BLE | NFC | CHROME | CHROMEWB ], // ASUS ZenFone 2 (2GB RAM)
  //"ZE551ML":          [ "Z3580",      1506, "500-500", 1080, 1920,  5.5, 32,  5,  ATOM  | BLE | NFC | CHROME | CHROMEWB ], // ASUS ZenFone 2 (4GB RAM)
  //"ASUS_Z380C":       [ "C3200",      1507, "500-500", 1536, 2048,  8.0,  8, 10,  ATOM  | BLE | NFC | CHROME | CHROMEWB ], // ASUS ZenPad S8.0 (2GB RAM)
  //"ASUS_Z380KL":      [ "MSM8916",    1507, "500-500", 1536, 2048,  8.0, 16, 10,  ARM64 | BLE | NFC | CHROME | CHROMEWB ], // ASUS ZenPad S8.0 (2GB RAM)
  //"ASUS_Z580C":       [ "Z3580",      1507, "500-500", 1536, 2048,  8.0, 16, 10,  ATOM  | BLE | NFC | CHROME | CHROMEWB ], // ASUS ZenPad S8.0 (2GB RAM)
  //"ASUS_Z580CA":      [ "Z3580",      1507, "500-500", 1536, 2048,  8.0, 32, 10,  ATOM  | BLE | NFC | CHROME | CHROMEWB ], // ASUS ZenPad S8.0 (4GB RAM)

    "K017":             [ "Z3745",      1410, "442-442",  800, 1280,  7.0,  8,  5,  ATOM  | BLE | NFC | CHROME            ], // ASUS MeMo Pad 7
    "ME173X":           [ "MT8125",     1307, "421-421",  800, 1280,  7.0,  8,  5,                NFC | CHROME            ], // ASUS MeMo Pad HD7
    "ME302C":           [ "Z2560",      1308, "422-422", 1200, 1920, 10.1, 16,  5,  ATOM  |       NFC | CHROME            ], // ASUS MeMo Pad FHD10
    "ME581C":           [ "Z3560",      1412, "442-442", 1200, 1920, 10.1, 16,  5,  ATOM  | BLE | NFC | CHROME            ], // ASUS MeMo Pad ME581C
    "SHIELD Tablet":    [ "T124",       1410, "440-442", 1200, 1920,  8.0, 16,  5,          BLE | NFC | CHROME            ], // NVIDIA SHIELD Tablet
    // --- Console device ---
  //"SHIELD":           [ "TX1",        0000, "500-",       0,    0,  0.0, 24,  0,  ARM64 | BLE | NFC | CHROME            ], // NVIDIA SHIELD
    "Nexus Player":     [ "Z3560",      1502, "500-",    1080, 1920,  0.0,  8,  0,  ATOM  | BLE | NFC | CHROME            ], // Nexus Player
  //"PS 4":             [ "",           1311, "",           0,    0,  0.0,  0,  0,  OOS                                   ], // PlayStation 4
  //"PS Vita":          [ "PSVITA",     1112, "",         544,  960,  0.0,  4,  5,  OOS                                   ], // PlayStation Vita
  //"Xbox One":         [ "",           1311, "",           0,    0,  0.0, 64,  0,  OOS                                   ], // MicroSoft Xbox One
  //"Wii U":            [ "",           1211, "",           0,    0,  0.0, 16,  0,  OOS                                   ], // Nintendo Wii U
//{@devicejp
    //                     SOC          DATE   OS_VERS   DISP1 DISP2 INCH RAM TOUCH TAGS
    // --- docomo ---
    // 2015 summer
    "SO-03G":           [ "MSM8994",    1506, "502-502", 1080, 1920,  5.2, 24,  5,  ARM64 | BLE | NFC | CHROME | CHROMEWB | H265  ], // Xperia Z4
    "SO-04G":           [ "MSM8974AC",  1506, "500-500",  720, 1280,  4.6, 16,  5,          BLE | NFC | CHROME | CHROMEWB         ], // Xperia A4
    "SO-05G":           [ "MSM8994",    1507, "500-500", 1600, 2560, 10.1, 24, 10,  ARM64 | BLE | NFC | CHROME            | H265  ], // Xperia Z4 Tablet
    "SC-04G":           [ "EXYNOS7420", 1504, "502-502", 1440, 2560,  5.1, 24,  5,          BLE | NFC | CHROME | SBROWSER         ], // GALAXY S6 Edge
    "SC-05G":           [ "EXYNOS7420", 1504, "502-502", 1440, 2560,  5.1, 24,  5,          BLE | NFC | CHROME | SBROWSER         ], // GALAXY S6
    "SH-03G":           [ "MSM8994",    1505, "500-500", 1080, 1920,  5.5, 24,  5,  ARM64 | BLE | NFC | CHROME            | H265  ], // AQUOS ZETA
    "SH-04G":           [ "MSM8926",    1506, "502-502",  720, 1280,  5.0, 16,  5,          BLE | NFC | CHROME                    ], // AQUOS EVER
    "SH-05G":           [ "MSM8994",    1507, "502-502", 1200, 1920,  7.0, 16, 10,  ARM64 | BLE | NFC | CHROME            | H265  ], // AQUOS PAD
    "F-04G":            [ "MSM8994",    1505, "500-500", 1440, 2560,  5.2, 24,  5,  ARM64 | BLE | NFC | CHROME | CHROMEWB | H265  ], // ARROWS NX
//  "F-05G":            [ "???",        1506, "444-444",  480,  854,  3.4,  0,  0,                      CHROME                    ], // ARROWS Galapagosization Android device, NO_LTE
    "DM-01G":           [ "MSM8974AC",  1505, "500-500", 1080, 1920,  5.2, 16,  5,          BLE | NFC | CHROME                    ], // Disney Mobile on docomo
    // 2014 winter
    "SO-01G":           [ "MSM8974AC",  1410, "444-502", 1080, 1920,  5.2, 24,  5,          BLE | NFC | CHROME | CHROMEWB ], // Xperia Z3
    "SO-02G":           [ "MSM8974AC",  1411, "442-502",  720, 1280,  4.6, 16,  5,          BLE | NFC | CHROME | CHROMEWB ], // Xperia Z3 Compact
    "SC-01G":           [ "APQ8084",    1410, "442-501", 1440, 2560,  5.6, 24,  5,          BLE | NFC | CHROME | SBROWSER | H265D ], // GALAXY Note Edge
    "SC-02G":           [ "MSM8974AC",  1410, "442-500", 1080, 1920,  5.1, 16,  5,          BLE | NFC | CHROME | SBROWSER ], // GALAXY S5 ACTIVE
    "SC-03G":           [ "MSM8974AC",  1412, "442-442", 1600, 2560,  8.4, 24,  5,          BLE | NFC | CHROME | SBROWSER ], // GALAXY Tab S 8.4
    "SH-01G":           [ "MSM8974AB",  1411, "442-442", 1080, 1920,  5.5, 16,  5,          BLE | NFC | CHROME            ], // AQUOS ZETA SH-01G
    "SH-02G":           [ "MSM8974AB",  1411, "442-442", 1080, 1920,  5.5, 16,  5,          BLE | NFC | CHROME            ], // Disney Mobile on docomo SH-02G
    "F-02G":            [ "MSM8974AB",  1411, "442-442", 1440, 2560,  5.2, 24,  5,          BLE | NFC | CHROME | CHROMEWB ], // ARROWS NX F-02G
    "F-03G":            [ "MSM8974AB",  1411, "442-442", 1600, 2560, 10.5, 16,  5,          BLE | NFC | CHROME | CHROMEWB ], // ARROWS Tab F-03G
    // 2014 summer
    "SC-04F":           [ "MSM8974AC",  1405, "442-500", 1080, 1920,  5.1, 16,  5,          BLE | NFC | CHROME | SBROWSER ], // GALAXY S5
    "SO-03F":           [ "MSM8974AB",  1405, "442-502", 1080, 1920,  5.2, 24,  5,          BLE | NFC | CHROME | CHROMEWB ], // Xperia Z2
    "SO-04F":           [ "MSM8974AA",  1406, "442-442",  720, 1280,  4.3, 16,  5,          BLE | NFC | CHROME | AOSP     ], // Xperia A2
    "SO-05F":           [ "MSM8974AB",  1405, "442-442", 1200, 1920, 10.1, 24,  5,          BLE | NFC | CHROME | AOSP     ], // Xperia Z2 Tablet
    "SH-04F":           [ "MSM8974AB",  1405, "442-442", 1080, 1920,  5.4,  0,  5,          BLE | NFC | CHROME | CHROMEWB ], // AQUOS ZETA SH-04F
    "SH-05F":           [ "MSM8974AA",  1405, "422-422", 1080, 1920,  5.0,  0,  5,                NFC | CHROME | AOSP     ], // Disney Mobile on docomo SH-05F
    "SH-06F":           [ "MSM8974AB",  1406, "442-442", 1200, 1920,  7.0,  0,  5,          BLE | NFC | CHROME | CHROMEWB ], // AQUOS PAD SH-06F
    "F-05F":            [ "MSM8974AB",  1405, "442-442", 1080, 1920,  5.0, 16,  5,          BLE | NFC | CHROME | CHROMEWB ], // ARROWS NX F-05F
    "F-06F":            [ "MSM8926",    1407, "442-442",  720, 1280,  4.5,  0,  5,          BLE | NFC |          CHROMEWB ], // Silver age model F-06F
    // 2013 winter
    "L-01F":            [ "MSM8974AA",  1310, "422-422", 1080, 1776,  5.2, 16,  5,                NFC | CHROME | AOSP     ], // LG G2
    "SC-01F":           [ "MSM8974AA",  1310, "430-442", 1080, 1920,  5.7, 16,  5,          BLE | NFC | CHROME | SBROWSER ], // GALAXY Note 3
    "SC-02F":           [ "MSM8974AA",  1310, "430-442", 1080, 1920,  5.0, 16,  5,          BLE | NFC | CHROME | SBROWSER ], // GALAXY J
    "SH-01F":           [ "MSM8974AA",  1311, "422-442", 1080, 1776,  5.0, 16,  5,          BLE | NFC | CHROME | AOSP     ], // AQUOS PHONE ZETA SH-01F
    "SH-01FDQ":         [ "MSM8974AA",  1312, "422-422", 1080, 1776,  5.0, 16,  5,                NFC | CHROME | AOSP     ], // AQUOS PHONE ZETA SH-01F DRAGON QUEST
    "SH-02F":           [ "MSM8974AA",  1401, "422-422", 1080, 1920,  4.5, 16,  5,                NFC | CHROME | AOSP     ], // AQUOS PHONE EX SH-02F
    "SH-03F":           [ "MSM8960",    1402, "404-404",  540,  888,  4.1,  4,  5,                NFC |          AOSP     ], // SH-03F SmartPhone for Junior 2 (no Google Play)
    "SO-01F":           [ "MSM8974AA",  1310, "422-442", 1080, 1776,  5.0, 16,  5,          BLE | NFC | CHROME            ], // Xperia Z1
    "SO-02F":           [ "MSM8974AA",  1312, "422-442",  720, 1184,  4.3, 16,  5,          BLE | NFC | CHROME | AOSP     ], // Xperia Z1 f
    "F-01F":            [ "MSM8974AA",  1310, "422-442", 1080, 1776,  5.0, 16,  5,          BLE | NFC | CHROME | AOSP     ], // ARROWS NX F-01F
    "F-02F":            [ "MSM8974AA",  1311, "422-442", 1504, 2560, 10.1, 16,  5,          BLE | NFC | CHROME | AOSP     ], // ARROWS Tab F-02F
    "F-03F":            [ "MSM8974AA",  1312, "422-422",  720, 1184,  4.7, 16,  5,                NFC | CHROME | AOSP     ], // Disney Mobile on docomo F-03F
    "F-04F":            [ "APQ8064T",   1401, "422-422",  540,  888,  4.3, 16,  5,                NFC |          AOSP     ], // Silver age model F-04F (no Google Play)
    // 2013 summer
    "L-05E":            [ "APQ8064T",   1306, "422-422",  720, 1280,  4.5, 16,  5,                NFC | CHROME | AOSP     ], // LG Optimus it L-05E
    "N-06E":            [ "APQ8064T",   1306, "422-422",  720, 1184,  4.7, 16,  5,                NFC | CHROME | AOSP     ], // MEDIAS X N-06E
    "SC-04E":           [ "APQ8064T",   1305, "422-442", 1080, 1920,  5.0, 16,  5,                NFC | CHROME | SBROWSER ], // Galaxy S4
    "SO-04E":           [ "APQ8064",    1305, "412-422",  720, 1184,  4.6, 16,  5,                NFC | CHROME | AOSP     ], // Xperia A
    "SO-04EM":          [ "APQ8064",    1309, "422-422",  720, 1184,  4.6, 16,  5,                NFC | CHROME | AOSP     ], // Xperia feat. HATSUNE MIKU
    "SH-06E":           [ "APQ8064T",   1305, "422-422", 1080, 1920,  4.8, 16,  5,                NFC | CHROME | AOSP     ], // AQUOS PHONE ZETA SH-06E
    "SH-07E":           [ "APQ8064T",   1306, "422-422",  720, 1280,  4.3, 16,  2,                NFC | CHROME | AOSP     ], // AQUOS PHONE si SH-07E
    "SH-08E":           [ "APQ8064T",   1308, "422-422", 1200, 1824,  7.0, 16,  5,                NFC | CHROME | AOSP     ], // AQUOS PAD SH-08E
    "P-03E":            [ "APQ8064T",   1306, "422-422", 1080, 1920,  4.7, 16,  5,                NFC | CHROME | AOSP     ], // ELUGA P P-03E
    "F-06E":            [ "APQ8064T",   1306, "422-422", 1080, 1776,  5.2, 16,  5,                NFC | CHROME | AOSP     ], // ARROWS NX F-06E
    "F-07E":            [ "APQ8064T",   1307, "422-422",  720, 1184,  4.7, 16,  5,                NFC | CHROME | AOSP     ], // Disney Mobile on docomo F-07E
    "F-08E":            [ "APQ8064T",   1308, "422-422",  540,  867,  4.3, 16,  5,                NFC |          AOSP     ], // Silver age model F-08E
    "F-09E":            [ "APQ8064T",   1310, "422-422",  540,  888,  4.3, 16,  5,                NFC | CHROME | AOSP     ], // Silver age model F-09E
    // 2012 Q3
    "L-01E":            [ "APQ8064",    1210, "404-412",  720, 1280,  4.7, 16,  5,                NFC | CHROME | AOSP     ], // Optimus G L-01E
    "L-02E":            [ "MSM8960",    1212, "404-412",  720, 1280,  4.5,  8,  5,                NFC | CHROME | AOSP     ], // Optimus LIFE L-02E
    "L-04E":            [ "APQ8064T",   1304, "412-412", 1080, 1920,  5.0, 16,  5,                NFC | CHROME | AOSP     ], // Optimus G pro L-04E
    "N-02E":            [ "MSM8960",    1212, "404-412",  480,  800,  4.0,  8,  5,                NFC | CHROME | AOSP     ], // MEDIAS U N-02E
    "N-03E":            [ "APQ8064",    1212, "404-412",  720, 1280,  4.7, 16,  5,                NFC | CHROME | AOSP     ], // Disney Mobile on docomo N-03E
    "N-04E":            [ "APQ8064",    1303, "412-412",  720, 1280,  4.7, 16,  5,                NFC | CHROME | AOSP     ], // MEDIAS X N-04E
    "N-05E":            [ "MSM8960",    1304, "412-412",  540,  960,  4.3,  8,  5,                NFC | CHROME | AOSP     ], // MEDIAS W N-05E
    "SC-01E":           [ "APQ8060",    1210, "404-404",  800, 1280,  7.7,  8,  5,                NFC |          AOSP     ], // GALAXY Tab 7.7 Plus
    "SC-02E":           [ "EXYNOS4412", 1211, "411-430",  720, 1280,  5.5, 16,  5,                      CHROME | AOSP     ], // GALAXY Note II
    "SC-03E":           [ "EXYNOS4412", 1212, "411-430",  720, 1280,  4.8, 16,  5,                      CHROME | AOSP     ], // GALAXY S III alpha
    "SH-01E":           [ "MSM8960",    1210, "404-412",  540,  888,  4.1,  8,  2,                NFC | CHROME | AOSP     ], // AQUOS PHONE si SH-01E
    "SH-01EVW":         [ "MSM8960",    1210, "404-412",  540,  888,  4.1,  8,  2,                NFC | CHROME | AOSP     ], // AQUOS PHONE SH-01E Vivienne Westwood
    "SH-02E":           [ "APQ8064",    1211, "404-412",  720, 1280,  4.9, 16,  2,                NFC | CHROME | AOSP     ], // AQUOS PHONE ZETA SH-02E
    "SH-04E":           [ "APQ8064",    1301, "412-412",  720, 1184,  4.5, 16,  5,                NFC | CHROME | AOSP     ], // AQUOS PHONE EX SH-04E
  //"SH-05E":           [ "MSM8960",    1302, "404-404",  540,  960,  4.1,  8,  2,                NFC | CHROME | AOSP     ], // JUNIOR Phone (no WiFi) (no Google Play)
    "SO-01E":           [ "MSM8960",    1211, "404-412",  720, 1184,  4.3,  8,  5,                NFC | CHROME | AOSP     ], // Xperia AX SO-01E
    "SO-02E":           [ "APQ8064",    1302, "412-442",  720, 1184,  5.0,  8,  5,                NFC | CHROME | AOSP     ], // Xperia Z
    "SO-03E":           [ "APQ8064",    1304, "412-412", 1128, 1920, 10.1, 16,  5,                NFC | CHROME | AOSP     ], // Xperia Tablet Z
    "P-02E":            [ "APQ8064",    1301, "412-412", 1080, 1920,  5.0, 16,  5,                NFC | CHROME | AOSP     ], // ELUGA X P-02E
    "F-02E":            [ "AP37",       1302, "412-412", 1080, 1920,  5.0, 16,  5,                NFC | CHROME | AOSP     ], // ARROWS X F-02E
    "F-03E":            [ "MSM8960",    1212, "404-412",  540,  960,  4.0,  8,  5,                NFC | CHROME | AOSP     ], // ARROWS Kiss
    "F-04E":            [ "AP33",       1211, "404-422",  720, 1280,  4.7, 16,  5,                NFC | CHROME | AOSP     ], // ARROWS V F-04E
    "F-05E":            [ "AP37",       1212, "404-412", 1200, 1920, 10.1, 16,  5,                NFC | CHROME | AOSP     ], // ARROWS Tab F-05E
    "HW-01E":           [ "MSM8960",    1211, "404-404",  720, 1280,  4.5,  8,  5,                NFC | CHROME | AOSP     ], // Ascend HW-01E
    "HW-03E":           [ "K3V2",       1305, "412-412",  720, 1280,  4.7, 16,  5,                      CHROME | AOSP     ], // Ascend D2 HW-03E
    "dtab01":           [ "K3V2",       1303, "412-412",  800, 1280, 10.1,  8,  5,                      CHROME | AOSP     ], // dtab docomo
    // 2012 Q1
    "L-05D":            [ "MSM8960",    1206, "404-412",  480,  800,  4.0,  8,  5,                NFC | CHROME | AOSP     ], // LG Optimus it L-05D
    "L-06D":            [ "APQ8060",    1208, "404-404",  768, 1024,  5.0,  8,  5,                               AOSP     ], // LG Optimus Vu L-06D
    "L-06DJOJO":        [ "APQ8060",    1208, "404-404",  768, 1024,  5.0,  8,  5,                               AOSP     ], // LG Optimus JOJO
    "N-07D":            [ "MSM8960",    1207, "404-412",  720, 1280,  4.3,  8,  5,                NFC | CHROME | AOSP     ], // MEDIAS X N-07D
    "N-08D":            [ "MSM8960",    1209, "404-404",  800, 1280,  7.0,  8,  5,                NFC |          AOSP     ], // MEDIAS TAB UL N-08D
    "SC-06D":           [ "MSM8960",    1206, "404-412",  720, 1280,  4.8, 16,  5,                NFC | CHROME | AOSP     ], // GALAXY S III
    "SH-06DNERV":       [ "OMAP4460",   1206, "235-404",  720, 1280,  4.5,  8,  2,                               AOSP     ], // SH-06D NERV
    "SH-07D":           [ "MSM8255",    1206, "404-404",  480,  854,  3.4,  8,  2,                               AOSP     ], // AQUOS PHONE st SH-07D
    "SH-09D":           [ "MSM8960",    1206, "404-412",  720, 1280,  4.7,  8,  2,                NFC | CHROME | AOSP     ], // AQUOS PHONE ZETA SH-09D
    "SH-10D":           [ "MSM8960",    1208, "404-412",  720, 1280,  4.5,  8,  2,                NFC | CHROME | AOSP     ], // AQUOS PHONE sv SH-10D
    "SO-04D":           [ "MSM8960",    1208, "404-412",  720, 1184,  4.6,  8,  5,                NFC | CHROME | AOSP     ], // Xperia GX
    "SO-05D":           [ "MSM8960",    1208, "404-412",  540,  888,  3.7,  8,  5,                NFC | CHROME | AOSP     ], // Xperia SX
    "P-06D":            [ "OMAP4460",   1207, "404-404",  720, 1280,  4.6,  8,  5,                               AOSP     ], // ELUGA V P-06D
    "P-07D":            [ "MSM8960",    1208, "404-404",  720, 1280,  5.0,  8,  5,                NFC |          AOSP     ], // ELUGA power P-07D
    "P-08D":            [ "OMAP4460",   1209, "404-404",  800, 1280, 10.1,  8,  5,                               AOSP     ], // ELUGA Live P-08D
    "F-09D":            [ "MSM8255",    1206, "403-403",  480,  800,  3.7,  8,  2,                               AOSP     ], // F-09D ANTEPRIMA
    "F-10D":            [ "AP33",       1207, "403-422",  720, 1280,  4.6,  8,  5,                NFC | CHROME | AOSP     ], // ARROWS X F-10D
    "F-11D":            [ "MSM8255",    1208, "403-422",  480,  800,  3.7,  8,  5,                               AOSP     ], // ARROWS Me F-11D
    "F-12D":            [ "MSM8255",    1208, "403-403",  480,  800,  4.0,  8,  5,                               AOSP     ], // Silver age model F-12D
    "T-02D":            [ "MSM8960",    1207, "404-412",  540,  960,  4.3,  8,  5,                NFC | CHROME | AOSP     ], // REGZA Phone T-02D
    // 2011 Q3
    "L-01D":            [ "APQ8060",    1112, "235-404",  720, 1280,  4.5,  8,  5,                               AOSP     ], // Optimus LTE L-01D
    "L-02D":            [ "OMAP4430",   1201, "237-404",  480,  800,  4.3,  8,  5,                               AOSP     ], // PRADA phone by LG L-02D
    "N-01D":            [ "MSM8255T",   1112, "235-235",  480,  800,  4.0,  4,  5,                               AOSP     ], // MEDIAS PP N-01D
    "N-04D":            [ "APQ8060",    1202, "236-404",  720, 1280,  4.3,  8,  5,                               AOSP     ], // MEDIAS LTE N-04D
    "N-05D":            [ "MSM8260",    1203, "236-404",  720, 1280,  4.3,  8,  5,                               AOSP     ], // MEDIAS ES N-05D
    "N-06D":            [ "APQ8060",    1203, "236-404",  800, 1280,  7.0,  8,  5,                               AOSP     ], // MEDIAS TAB N-06D
    "SC-01D":           [ "APQ8060",    1110, "320-404",  800, 1200, 10.1,  8,  5,                               AOSP     ], // GALAXY Tab 10.1 LTE SC-01D
    "SC-02D":           [ "EXYNOS4210", 1112, "320-404",  600, 1024,  7.0,  8,  5,                               AOSP     ], // GALAXY Tab 7.0 Plus SC-02D
    "SC-03D":           [ "APQ8060",    1111, "236-404",  480,  800,  4.5,  8,  5,                NFC |          AOSP     ], // GALAXY S II LTE SC-03D
    "SC-04D":           [ "OMAP4460",   1112, "401-422",  720, 1280,  4.7,  8,  5,                               AOSP     ], // GALAXY NEXUS SC-04D
    "SC-05D":           [ "APQ8060",    1204, "236-412",  800, 1280,  5.3,  8,  5,                NFC |          AOSP     ], // GALAXY Note SC-05D
    "SH-01D":           [ "OMAP4430",   1112, "235-404",  720, 1280,  4.5,  8,  2,                               AOSP     ], // AQUOS PHONE SH-01D
    "SH-02D":           [ "MSM8255",    1112, "235-235",  540,  960,  3.7,  4,  2,                               AOSP     ], // AQUOS PHONE Slider SH-02D
    "SH-04D":           [ "MSM8255",    1202, "234-234",  540,  960,  3.7,  4,  2,                               AOSP     ], // Q-pot. Phone SH-04D
    "SH-06D":           [ "OMAP4460",   1203, "235-404",  720, 1280,  4.5,  8,  5,                               AOSP     ], // AQUOS PHONE SH-06D
    "SO-01D":           [ "MSM8255",    1110, "234-234",  480,  854,  4.0,  4,  2,                               AOSP     ], // Xperia PLAY SO-01D
    "SO-02D":           [ "MSM8260",    1202, "237-404",  720, 1280,  4.3,  8,  5,                               AOSP     ], // Xperia NX SO-02D
    "SO-03D":           [ "MSM8260",    1203, "237-404",  720, 1280,  4.3,  8,  5,                               AOSP     ], // Xperia acro HD SO-03D
    "P-01D":            [ "MSM8255",    1110, "234-234",  480,  800,  3.2,  4,  2,                               AOSP     ], // PANASONIC P-01D
    "P-02D":            [ "OMAP4430",   1112, "235-404",  540,  960,  4.0,  8,  2,                               AOSP     ], // PANASONIC LUMIX Phone P-02D
    "P-04D":            [ "OMAP4430",   1203, "235-404",  540,  960,  4.3,  8,  5,                               AOSP     ], // PANASONIC P-04D
    "P-05D":            [ "OMAP4430",   1203, "235-404",  540,  960,  4.3,  8,  5,                               AOSP     ], // PANASONIC Disney Mobile on docomo P-05D
    "F-01D":            [ "OMAP4430",   1110, "320-403",  800, 1280, 10.1,  8,  5,                               AOSP     ], // ARROWS Tab LTE F-01D
    "F-03D":            [ "MSM8255",    1201, "235-235",  480,  800,  3.7,  4,  2,                               AOSP     ], // F-03D Girls
    "F-05D":            [ "OMAP4430",   1112, "235-403",  720, 1280,  4.3,  8,  2,                               AOSP     ], // ARROWS X LTE F-05D
    "F-07D":            [ "MSM8255",    1201, "235-235",  480,  800,  4.0,  4,  5,                               AOSP     ], // ARROWS micro F-07D
    "F-08D":            [ "OMAP4430",   1202, "235-403",  720, 1280,  4.3,  8,  2,                               AOSP     ], // Disney Mobile on docomo F-08D
    "T-01D":            [ "OMAP4430",   1111, "235-403",  720, 1280,  4.3,  8,  2,                               AOSP     ], // REGZA Phone T-01D
    // 2011 Q1
    "SC-02C":           [ "EXYNOS4210", 1106, "403-403",  480,  800,  4.3,  8,  5,                               AOSP     ], // GALAXY S II SC-02C
    "SO-01C":           [ "MSM8255",    1103, "232-234",  480,  854,  4.2,  4,  2,                               AOSP     ], // Xperia arc SO-01C
    "SO-02C":           [ "MSM8255",    1107, "233-234",  480,  854,  4.2,  4,  2,                               AOSP     ], // Xperia acro SO-02C
    "SO-03C":           [ "MSM8255",    1108, "234-234",  480,  854,  3.3,  4,  2,                               AOSP     ], // Xperia ray SO-03C
    "SH-12C":           [ "MSM8255T",   1105, "233-233",  540,  960,  4.2,  4,  2,                               AOSP     ], // AQUOS PHONE SH-12C
    "SH-13C":           [ "MSM8255",    1108, "234-234",  540,  960,  3.7,  4,  2,                               AOSP     ], // AQUOS PHONE f SH-13C
    "N-04C":            [ "MSM7230",    1103, "220-233",  480,  854,  4.0,  4,  2,                               AOSP     ], // MEDIAS N-04C
    "N-06C":            [ "MSM8255",    1106, "230-230",  480,  854,  4.0,  4,  2,                               AOSP     ], // MEDIAS WP N-06C
    "P-07C":            [ "OMAP3630",   1108, "230-230",  480,  800,  4.3,  4,  2,                               AOSP     ], // PANASONIC P-07C
    "F-12C":            [ "MSM8255",    1108, "230-230",  480,  800,  3.7,  4,  2,                               AOSP     ], // FUJITSU F-12C
    "L-04C":            [ "MSM7227",    1103, "220-230",  320,  480,  3.2,  4,  2,                               AOSP     ], // LG Optimus chat L-04C
    "L-06C":            [ "T20",        1103, "300-310",  768, 1280,  8.9,  8,  2,                               AOSP     ], // LG Optimus Pad L-06C
    "L-07C":            [ "OMAP3630",   1106, "233-233",  480,  800,  4.0,  4,  2,                               AOSP     ], // LG Optimus bright L-07C
    "T-01C":            [ "QSD8250",    1012, "211-222",  480,  854,  4.0,  4,  2,                               AOSP     ], // REGZA Phone T-01C
    "SH-03C":           [ "QSD8250",    1012, "211-222",  480,  800,  3.8,  4,  2,                               AOSP     ], // SHARP LYNX 3D SH-03C
    "SC-01C":           [ "S5PC110",    1011, "220-236",  600, 1024,  7.0,  4,  2,                               AOSP     ], // GALAXY Tab SC-01C
    "SC-02B":           [ "S5PC110",    1010, "220-236",  480,  800,  4.0,  4,  2,                               AOSP     ], // GALAXY S SC-02B
    "SH-10B":           [ "QSD8250",    1007, "160-160",  480,  960,  5.0,  2,  2,                               AOSP     ], // SHARP LYNX SH-10B
    "SO-01B":           [ "QSD8250",    1004, "160-211",  480,  854,  4.0,  3,  1,                               AOSP     ], // Xperia SO-01B (RAM:384MB)
    //                     SOC          DATE   OS_VERS   DISP1 DISP2 INCH RAM TOUCH TAGS
    // --- au ---
    // 2015 spring and summer
    "SCV31":            [ "EXYNOS7420", 1504, "502-502", 1440, 2560,  5.1, 24,  5,          BLE | NFC | CHROME | SBROWSER         ], // GALAXY S6 Edge
    "SOV31":            [ "MSM8994",    1506, "500-500", 1080, 1920,  5.2, 24,  5,  ARM64 | BLE | NFC | CHROME | CHROMEWB | H265  ], // Xperia Z4
    "SOT31":            [ "MSM8994",    1507, "502-502", 1600, 2560, 10.1, 24, 10,  ARM64 | BLE | NFC | CHROME | CHROMEWB | H265  ], // Xperia Z4 Tablet
    "HTV31":            [ "MSM8994",    1506, "502-502", 1440, 2560,  5.2, 24, 10,  ARM64 | BLE | NFC | CHROME            | H265  ], // HTC J butterfly
    "LGV32":            [ "MSM8992",    1505, "510-510", 1440, 2560,  5.5, 24,  5,          BLE | NFC | CHROME | CHROMEWB | H265D ], // isai VL
    "SHV32":            [ "MSM8994",    1506, "502-502", 1080, 1920,  5.5, 24,  5,  ARM64 | BLE | NFC | CHROME            | H265  ], // AQUOS SERIE
    "KYV35":            [ "MSM8928",    1507, "510-510",  720, 1280,  4.7, 16,  5,          BLE | NFC | CHROME                    ], // KYOCERA TORQUE G02
    "KYV34":            [ "MSM8928",    1506, "510-510",  720, 1280,  5.0, 16,  5,          BLE | NFC | CHROME                    ], // URBANO V02
    "KYT31":            [ "MSM8939",    1506, "510-510", 1080, 1920,  5.0, 16, 10,  ARM64 | BLE | NFC | CHROME            | H265D ], // KYOCERA Qua tab 01
    "KYV33":            [ "MSM8974AB",  1502, "444-444", 1080, 1920,  4.5, 16,  5,          BLE | NFC | CHROME                    ], // INFOBAR A03
    "SHV31":            [ "MSM8974AB",  1501, "444-444", 1080, 1920,  4.5, 16,  5,          BLE | NFC | CHROME                    ], // SHARP AQUOS SERIE mini
    "KYV32":            [ "MSM8974AB",  1502, "444-444", 1080, 1920,  5.0, 16,  5,          BLE | NFC | CHROME | CHROMEWB         ], // KYOCERA BASIO
    "KYL23":            [ "MSM8926",    1501, "444-444",  540,  960,  4.5, 12,  5,          BLE | NFC |          CHROMEWB         ], // KYOCERA miraie (no Google Play)
    "SHF32":            [ "MSM8926",    1507, "444-444",  540,  960,  3.4,  8,  5,          BLE | NFC |          CHROMEWB         ], // SHARP AQUOS K
    "SHF31":            [ "MSM8926",    1502, "444-444",  540,  960,  3.4,  8,  5,          BLE | NFC |          CHROMEWB         ], // SHARP AQUOS K
    // 2014 fall and winter
  //"SCT21":            [ "MSM8974AC",  1412, "444-502", 1600, 2560, 10.5, 24,  5,          BLE | NFC | CHROME | SBROWSER ], // SAMSUNG GALAXY Tab S
    "SCT21":            [ "MSM8974AC",  1412, "444-444", 1600, 2560, 10.5, 24,  5,          BLE | NFC | CHROME | SBROWSER ], // SAMSUNG GALAXY Tab S
    "LGV31":            [ "MSM8974AC",  1412, "442-442", 1440, 2560,  5.5, 24,  5,          BLE | NFC | CHROME | CHROMEWB ], // isai VL
    "KYV31":            [ "MSM8974AB",  1412, "444-444", 1080, 1920,  5.0, 16,  5,          BLE | NFC | CHROME            ], // URBANO V01
    "SOL26":            [ "MSM8974AC",  1410, "444-444", 1080, 1920,  5.2, 24,  5,          BLE | NFC | CHROME | CHROMEWB ], // Xperia Z3
    "SCL24":            [ "APQ8084",    1410, "444-444", 1440, 2560,  5.6, 24,  5,          BLE | NFC | CHROME | SBROWSER | H265D ], // SAMSUNG GALAXY Note Edge
    // 2014 summer
    "AST21":            [ "Z3580",      1408, "442-442", 1200, 1920,  8.0, 16,  5,  ATOM  | BLE | NFC | CHROME | CHROMEWB ], // ASUS MeMO Pad 8
    "SOT21":            [ "MSM8974AB",  1407, "442-442", 1200, 1920, 10.1, 24,  5,          BLE | NFC | CHROME | AOSP     ], // Xperia Z2 Tablet
    "HTL23":            [ "MSM8974AC",  1408, "442-444", 1080, 1920,  5.0, 16,  5,          BLE | NFC | CHROME | CHROMEWB ], // HTC J butterfly. AOSP -> OS Update -> CHROMEWB
    "KYY24":            [ "MSM8928",    1407, "442-442",  720, 1280,  4.5, 16,  5,          BLE | NFC | CHROME | CHROMEWB ], // KYOCERA TORQUE G01
    "KYY23":            [ "MSM8974AB",  1406, "442-442", 1080, 1920,  5.0, 16,  5,          BLE | NFC | CHROME | CHROMEWB ], // KYOCERA URBANO L03
    "SHL25":            [ "MSM8974AB",  1406, "442-442", 1080, 1920,  5.2, 16,  5,          BLE | NFC | CHROME | CHROMEWB ], // SHARP AQUOS PHONE SERIE
    "SCL23":            [ "MSM8974AC",  1405, "442-500", 1080, 1920,  5.1, 16,  5,          BLE | NFC | CHROME | SBROWSER ], // SAMSUNG Galaxy S5
    "SOL25":            [ "MSM8974AB",  1405, "442-442", 1080, 1920,  5.0, 24,  5,          BLE | NFC | CHROME | AOSP     ], // Xperia ZL2
    "LGL24":            [ "MSM8974AC",  1407, "442-442", 1440, 2560,  5.5, 16,  5,          BLE | NFC | CHROME | CHROMEWB ], // LG isai FL
    // 2014 spring
    "SHT22":            [ "MSM8974AA",  1402, "422-422", 1200, 1920,  7.0, 16,  5,                NFC | CHROME | AOSP     ], // SHARP AQUOS PAD
    "SHL24":            [ "MSM8974AA",  1402, "422-422", 1080, 1920,  4.5, 16,  5,                NFC | CHROME | AOSP     ], // SHARP AQUOS PHONE SERIE mini
    "URBANO L02":       [ "MSM8960",    1402, "422-422",  720, 1280,  4.7, 16,  5,                NFC | CHROME | AOSP     ], // KYOCERA URBANO L02
    "LGL23":            [ "MSM8974AA",  1401, "422-422",  720, 1280,  6.0, 16,  5,                NFC | CHROME | AOSP     ], // LG G Flex
    "SOL24":            [ "MSM8974AA",  1401, "422-442", 1080, 1920,  6.4, 16,  5,                NFC | CHROME | AOSP     ], // Xperia Z Ultra
    // 2013 winter
    "FJT21":            [ "MSM8974AA",  1311, "422-422", 1600, 2560, 10.1, 16,  5,                NFC | CHROME | AOSP     ], // FUJITSU ARROWS Tab
    "SOL23":            [ "MSM8974AA",  1410, "422-442", 1080, 1920,  5.0, 16,  5,          BLE | NFC | CHROME | AOSP     ], // Xperia Z1
  //"SCL22":            [ "MSM8974AA",  1310, "430-502", 1080, 1920,  5.7, 24,  5,          BLE | NFC | CHROME | SBROWSER ], // SAMSUNG GALAXY Note 3
    "SCL22":            [ "MSM8974AA",  1310, "430-442", 1080, 1920,  5.7, 24,  5,          BLE | NFC | CHROME | SBROWSER ], // SAMSUNG GALAXY Note 3
    "KYL22":            [ "MSM8974AA",  1311, "422-422", 1080, 1920,  5.0, 16,  5,                NFC | CHROME | AOSP     ], // KYOCERA DIGNO M
    "LGL22":            [ "MSM8974AA",  1311, "422-442", 1080, 1920,  5.2, 16,  5,          BLE | NFC | CHROME | AOSP     ], // LG isai
    "SHL23":            [ "MSM8974AA",  1311, "422-422", 1080, 1920,  4.8, 16,  5,                NFC | CHROME | AOSP     ], // SHARP AQUOS PHONE SERIE
    "FJL22":            [ "MSM8974AA",  1311, "422-422", 1080, 1920,  5.0, 16,  5,                NFC | CHROME | AOSP     ], // FUJITSU ARROWS Z
    // 2013 spring and summer
    "SHL22":            [ "APQ8064T",   1307, "422-422",  720, 1280,  4.9, 16,  5,                NFC | CHROME | AOSP     ], // SHARP AQUOS PHONE SERIE
    "KYY21":            [ "MSM8960",    1306, "422-422",  720, 1280,  4.7, 16,  5,                NFC | CHROME | AOSP     ], // KYOCERA URBANO L01
    "HTL22":            [ "APQ8064T",   1306, "412-442", 1080, 1920,  4.7, 16,  5,          BLE | NFC | CHROME | AOSP     ], // HTC J One
    "SOL22":            [ "APQ8064",    1305, "412-422", 1080, 1920,  5.0, 16,  5,                NFC | CHROME | AOSP     ], // Xperia UL
    "HTX21":            [ "APQ8064",    1302, "411-411",  720, 1280,  4.7,  8,  5,                NFC | CHROME | AOSP     ], // HTC INFOBAR A02
    // 2012 fall and winter
    "SHT21":            [ "MSM8960",    1212, "404-412",  800, 1280,  7.0,  8,  2,                NFC | CHROME | AOSP     ], // SHARP AQUOS PAD
    "HTL21":            [ "APQ8064",    1212, "411-411", 1080, 1920,  5.0, 16,  5,                NFC | CHROME | AOSP     ], // HTC J Butterfly
    "SCL21":            [ "MSM8960",    1212, "404-412",  720, 1280,  4.8, 16,  5,                NFC | CHROME | SBROWSER ], // SAMSUNG GALAXY SIII Progre
    "CAL21":            [ "MSM8960",    1211, "404-404",  480,  800,  4.0,  8,  5,                NFC | CHROME | AOSP     ], // NEC CASIO G'zOne TYPE-L
    "SHL21":            [ "MSM8960",    1211, "404-412",  720, 1280,  4.7,  8,  2,                NFC | CHROME | AOSP     ], // SHARP AQUOS PHONE SERIE
    "KYL21":            [ "MSM8960",    1211, "404-404",  720, 1280,  4.7,  8,  5,                NFC | CHROME | AOSP     ], // KYOCERA DIGNO S
    "FJL21":            [ "MSM8960",    1211, "404-412",  720, 1280,  4.3,  8,  5,                NFC | CHROME | AOSP     ], // FUJITSU ARROWS ef
    "SOL21":            [ "MSM8960",    1211, "404-412",  720, 1280,  4.3,  8,  5,                NFC | CHROME | AOSP     ], // Xperia VL
    "LGL21":            [ "APQ8064",    1211, "404-404",  720, 1280,  4.7, 16,  5,                NFC | CHROME | AOSP     ], // LG Optimus G
    "PTL21":            [ "MSM8960",    1211, "404-412",  720, 1280,  4.3,  8,  5,                NFC | CHROME | AOSP     ], // PANTECH VEGA
    // 2012 summer
    "ISW13F":           [ "AP33",       1207, "403-403",  720, 1280,  4.6,  8,  3,                NFC |          AOSP     ], // FUJITSU ARROWS Z
    "IS17SH":           [ "MSM8655",    1207, "404-404",  540,  960,  4.2,  8,  2,                               AOSP     ], // SHARP AQUOS PHONE CL
    "IS15SH":           [ "MSM8655",    1207, "404-404",  540,  960,  3.7,  8,  2,                               AOSP     ], // SHARP AQUOS PHONE SL
    "ISW16SH":          [ "MSM8660A",   1206, "404-404",  720, 1280,  4.6,  8,  2,                               AOSP     ], // SHARP AQUOS PHONE SERIE
    "URBANO PROGRESSO": [ "MSM8655",    1205, "403-403",  480,  800,  4.0,  8,  5,                               AOSP     ], // KYOCERA URBANO PROGRESSO
    "ISW13HT":          [ "MSM8660A",   1205, "403-403",  540,  960,  4.3,  8,  5,                               AOSP     ], // HTC J
    // 2012 spring
    "IS12S":            [ "MSM8660",    1203, "237-404",  720, 1280,  4.3,  8,  5,                               AOSP     ], // Xperia acro HD
    "IS12M":            [ "OMAP4430",   1203, "236-404",  540,  960,  4.3,  8,  5,                               AOSP     ], // MOTOROLA RAZR
    "INFOBAR C01":      [ "MSM8655",    1202, "235-235",  480,  854,  3.2,  4,  2,                               AOSP     ], // SHARP INFOBAR C01
    "ISW11SC":          [ "EXYNOS4210", 1201, "236-404",  720, 1080,  4.7,  8,  5,                               AOSP     ], // SAMSUNG GALAXY SII WiMAX
    "IS11LG":           [ "AP25",       1201, "237-404",  480,  800,  4.0,  8,  5,                               AOSP     ], // LG Optimus X
    "IS12F":            [ "MSM8655",    1201, "235-235",  480,  800,  4.0,  4,  5,                               AOSP     ], // FUJITSU ARROWS ES
    // 2011 fall and winter
    "IS14SH":           [ "MSM8655",    1112, "235-235",  540,  960,  3.7,  4,  2,                               AOSP     ], // SHARP AQUOS PHONE
    "IS11N":            [ "MSM8655",    1112, "235-235",  480,  800,  3.6,  4,  5,                               AOSP     ], // NEC CASIO MEDIAS BR
    "ISW11F":           [ "OMAP4430",   1112, "235-403",  720, 1280,  4.3,  8,  3,                               AOSP     ], // FUJITSU ARROWS Z
    "ISW11K":           [ "MSM8655",    1111, "235-235",  480,  800,  4.0,  8,  5,                               AOSP     ], // KYOCERA DIGNO
    "IS13SH":           [ "MSM8655",    1111, "235-235",  540,  960,  4.2,  4,  2,                               AOSP     ], // SHARP AQUOS PHONE
    "ISW12HT":          [ "MSM8660",    1110, "234-403",  540,  960,  4.3,  8,  5,                               AOSP     ], // HTC EVO 3D
    "ISW11M":           [ "T20",        1110, "234-234",  540,  960,  4.3,  8,  2,                               AOSP     ], // MOTOROLA PHOTON
    // 2011 summer
    "EIS01PT":          [ "MSM8655",    1109, "234-234",  480,  800,  3.7,  4,  5,                               AOSP     ], // PANTECH EIS01PT
    "IS11PT":           [ "MSM8655",    1109, "234-234",  480,  800,  3.7,  4,  5,                               AOSP     ], // PANTECH MIRACH
    "IS11T":            [ "MSM8655",    1109, "234-234",  480,  854,  4.0,  4,  3,                               AOSP     ], // FUJITSU REGZA Phone
    "IS11CA":           [ "MSM8655",    1107, "233-233",  480,  800,  3.6,  4,  5,                               AOSP     ], // NEC CASIO G'zOne
    "INFOBAR A01":      [ "MSM8655",    1106, "233-233",  540,  960,  3.7,  4,  2,                               AOSP     ], // SHARP INFOBAR A01
    "IS12SH":           [ "MSM8655",    1106, "233-233",  540,  960,  4.2,  4,  2,                               AOSP     ], // SHARP AQUOS PHONE IS12SH
    "IS11SH":           [ "MSM8655",    1106, "233-233",  540,  960,  3.7,  4,  2,                               AOSP     ], // SHARP AQUOS PHONE IS11SH
    "IS11S":            [ "MSM8655",    1106, "233-234",  480,  854,  4.2,  4,  2,                               AOSP     ], // Xperia acro
    // 2011 spring and legacy
    "ISW11HT":          [ "QSD8650",    1104, "221-234",  480,  800,  4.3,  4,  2,                               AOSP     ], // HTC EVO WiMAX
    "IS06":             [ "QSD8650",    1012, "221-221",  480,  800,  3.7,  4,  5,                               AOSP     ], // PANTECH SIRIUS alpha
    "IS05":             [ "MSM8655",    1103, "221-234",  480,  854,  3.4,  4,  2,                               AOSP     ], // SHARP IS05
    "IS04":             [ "QSD8650",    1102, "210-222",  480,  854,  4.0,  4,  2,                               AOSP     ], // FUJITSU REGZA Phone IS04
    "IS03":             [ "QSD8650",    1011, "210-221",  640,  960,  3.5,  4,  2,                               AOSP     ], // SHARP IS03
    "IS01":             [ "QSD8650",    1006, "160-160",  480,  960,  5.0,  1,  1,                               AOSP     ], // SHARP IS01
    //                     SOC          DATE   OS_VERS   DISP1 DISP2 INCH RAM TOUCH TAGS
    // --- SoftBank ---
    "402SO":            [ "MSM8994",    1506, "502-502", 1080, 1920,  5.2, 24,  5,  ARM64 | BLE | NFC | CHROME            | H265D ], // Xperia Z4
    "404SH":            [ "MSM8994",    1506, "502-502", 1080, 1920,  5.7, 24,  5,  ARM64 | BLE | NFC | CHROME            | H265D ], // SHARP AQUOS Xx
    "403SH":            [ "MSM8926",    1507, "502-502",  720, 1280,  5.2, 16,  5,          BLE | NFC | CHROME            ], // SHARP AQUOS CRYSTAL 2
    "404SC":            [ "EXYNOS7420", 1505, "502-502", 1440, 2560,  5.1, 24,  5,          BLE | NFC | CHROME | SBROWSER ], // GALAXY S6 Edge
    "404KC":            [ "MSM8916",    1502, "444-444",  540,  960,  5.0,  8,  5,  ARM64 | BLE       | CHROME            ], // KYOCERA DIGNO U
    "402LG":            [ "MSM8926",    1502, "442-442",  720, 1280,  4.5, 12,  5,          BLE | NFC | CHROME | AOSP     ], // Spray
    "403SC":            [ "MSM8926",    1412, "442-442",  800, 1280,  7.0, 12,  5,          BLE | NFC | CHROME | SBROWSER ], // SAMSUNG GALAXY Tab 4
    "402SH":            [ "MSM8974AB",  1412, "444-444", 1080, 1920,  5.5, 16,  5,          BLE | NFC | CHROME            ], // SHARP AQUOS CRYSTAL X
    "403HW":            [ "KIRIN910",   1412, "442-442",  800, 1280,  8.0,  8,  5,          BLE | NFC | CHROME | AOSP     ], // MediaPad M1 8.0
    "401SH":            [ "MSM8926",    1411, "442-442",  720, 1280,  4.5, 12,  5,          BLE | NFC |          AOSP     ], // SHARP Simple Smart Phone 2
    "401SO":            [ "MSM8974AC",  1411, "444-444", 1080, 1920,  5.2, 24,  5,          BLE | NFC | CHROME | CHROMEWB ], // Xperia Z3
    "302KC":            [ "MSM8926",    1409, "442-442",  540,  960,  4.5, 12,  5,          BLE | NFC | CHROME | CHROMEWB ], // DIGNO T
    "305SH":            [ "MSM8926",    1409, "442-442",  720, 1280,  5.2, 12,  5,          BLE | NFC | CHROME | CHROMEWB ], // SHARP AQUOS CRYSTAL 305SH
    "304SH":            [ "MSM8974AB",  1405, "442-442", 1080, 1920,  5.2, 16,  5,          BLE | NFC | CHROME | CHROMEWB ], // SHARP AQUOS Xx 304SH
    "WX05SH":           [ "MSM8260A",   1403, "412-412",  480,  854,  4.0,  8,  5,                NFC | CHROME | AOSP     ], // SHARP WX05SH
    "SBM303SH":         [ "MSM8974AA",  1402, "422-422", 1080, 1920,  4.5, 16,  5,                NFC | CHROME | AOSP     ], // SHARP AQUOS PHONE Xx mini
    "DM016SH":          [ "MSM8974AA",  1401, "422-422", 1080, 1920,  5.2, 16,  2,                NFC |          AOSP     ], // SHARP Disney Mobile on Softbank
    "301F":             [ "MSM8974AA",  1312, "422-422", 1080, 1920,  5.0, 16,  2,                NFC |          AOSP     ], // FUJITSU ARROWS A
    "SBM302SH":         [ "MSM8974AA",  1312, "422-422", 1080, 1920,  5.2, 16,  5,                NFC | CHROME | AOSP     ], // SHARP AQUOS PHONE Xx SBM302SH
  //"EM01L":            [ "MSM8974AA",  1311, "440-440", 1080, 1920,  5.0, 16,  5,          BLE | NFC | CHROME            ], // E-Mobile Nexus 5
    "101F":             [ "MSM8960",    1311, "404-412",  540,  960,  4.3,  8,  2,                NFC | CHROME | AOSP     ], // FUJITSU ARROWS A
    "WX04SH":           [ "MSM8260A",   1311, "412-412",  480,  854,  4.0,  8,  5,                NFC |          AOSP     ], // SHARP AQUOS PHONE es
    "204HW":            [ "MSM8225",    1309, "410-410",  480,  800,  4.0,  8,  2,                               AOSP     ], // HUAWEI for Silver Age
    "EM01F":            [ "APQ8064",    1308, "412-412",  720, 1280,  4.7, 16,  5,                NFC | CHROME | AOSP     ], // FUJITSU ARROWS S
    "DM015K":           [ "MSM8960",    1308, "422-422",  720, 1280,  4.3, 12,  2,                NFC |          AOSP     ], // KYOCERA DM015K
    "WX10K":            [ "MSM8960",    1307, "422-422",  720, 1280,  4.7,  8,  2,                NFC |          AOSP     ], // KYOCERA DIGNO DUAL2
    "202K":             [ "MSM8960",    1307, "422-422",  720, 1280,  4.3,  8,  2,                NFC |          AOSP     ], // KYOCERA DIGNO
    "202F":             [ "APQ8064T",   1306, "422-422", 1080, 1920,  5.0, 16,  2,                NFC |          AOSP     ], // FUJITSU
    "SBM206SH":         [ "APQ8064T",   1306, "422-422", 1080, 1920,  5.0, 16,  2,                NFC |          AOSP     ], // SHARP
    "SBM205SH":         [ "MSM8960",    1306, "412-412",  480,  854,  4.0,  8,  2,                NFC |          AOSP     ], // SHARP
    "DM014SH":          [ "MSM8960",    1303, "404-412",  720, 1280,  4.5,  8,  2,                NFC | CHROME | AOSP     ], // SHARP Disney Mobile
    "SBM204SH":         [ "MSM8255",    1305, "404-404",  480,  800,  4.0,  8,  2,                               AOSP     ], // SHARP
    "WX04K":            [ "APE5R",      1206, "234-411",  480,  800,  4.0,  8,  2,                      CHROME | AOSP     ], // KYOCERA
    "SBM203SH":         [ "APQ8064",    1303, "412-412",  720, 1280,  4.9, 16,  2,                NFC | CHROME | AOSP     ], // SHARP
    "201F":             [ "APQ8064",    1302, "412-412",  720, 1280,  4.7, 16,  2,                NFC | CHROME | AOSP     ], // FUJITSU
    "201K":             [ "MSM8960",    1301, "412-412",  480,  800,  3.7,  8,  2,                NFC | CHROME | AOSP     ], // KYOCERA
    "SBM200SH":         [ "MSM8960",    1212, "404-410",  720, 1280,  4.5,  8,  2,                NFC | CHROME | AOSP     ], // SHARP
    "DM013SH":          [ "MSM8255",    1212, "404-404",  480,  854,  3.7,  8,  2,                      CHROME | AOSP     ], // SHARP
    "SBM107SHB":        [ "MSM8255",    1209, "404-404",  480,  854,  3.7,  8,  2,                               AOSP     ], // SHARP
    "WX06K":            [ "APE5R",      1208, "234-234",  480,  800,  3.5,  4,  2,                               AOSP     ], // KYOCERA
    "SBM107SH":         [ "MSM8255",    1207, "404-404",  480,  854,  3.7,  8,  2,                               AOSP     ], // SHARP
    "SBM102SH2":        [ "OMAP4430",   1207, "235-404",  720, 1280,  4.5,  8,  2,                               AOSP     ], // SHARP
    "SBM106SH":         [ "MSM8260A",   1207, "404-404",  720, 1280,  4.7,  8,  2,                               AOSP     ], // SHARP
    "102P":             [ "OMAP4430",   1203, "235-235",  540,  960,  4.3,  8,  2,                               AOSP     ], // PANASONIC
    "101DL":            [ "MSM8260",    1203, "235-235",  540,  960,  4.3,  8,  2,                               AOSP     ], // DELL
    "SBM104SH":         [ "OMAP4460",   1202, "403-403",  720, 1280,  4.5,  8,  2,                               AOSP     ], // SHARP
    "DM012SH":          [ "MSM8255",    1202, "235-235",  540,  960,  4.0,  4,  2,                               AOSP     ], // SHARP
    "101K":             [ "APE5R",      1201, "234-234",  480,  800,  3.5,  4,  2,                               AOSP     ], // KYOCERA
    "SBM103SH":         [ "MSM8255",    1202, "235-235",  540,  960,  4.0,  4,  2,                               AOSP     ], // SHARP
    "101N":             [ "MSM8255",    1201, "235-235",  480,  800,  4.0,  4,  2,                               AOSP     ], // NEC CASIO
    "101P":             [ "OMAP4430",   1201, "235-235",  480,  854,  4.0,  8,  2,                               AOSP     ], // PANASONIC
    "SBM102SH":         [ "OMAP4430",   1112, "235-404",  720, 1280,  4.5,  8,  2,                               AOSP     ], // SHARP
    "DM011SH":          [ "MSM8255",    1112, "235-235",  480,  854,  3.4,  4,  2,                               AOSP     ], // SHARP
    "SBM101SH":         [ "MSM8255",    1111, "235-235",  480,  854,  3.4,  4,  2,                               AOSP     ], // SHARP
    "DM010SH":          [ "MSM8255",    1110, "234-234",  540,  960,  4.0,  4,  2,                               AOSP     ], // SHARP
    "DM009SH":          [ "MSM8255",    1102, "220-234",  480,  800,  4.0,  4,  2,                               AOSP     ], // SHARP DM009SH
    "SBM009SHY":        [ "MSM8255",    1109, "234-234",  540,  960,  4.0,  4,  2,                               AOSP     ], // SHARP 009SH Y
    "SBM007SHK":        [ "MSM8255",    1109, "233-233",  480,  854,  3.4,  4,  2,                               AOSP     ], // SHARP 007SH KT
    "SBM009SH":         [ "MSM8255",    1108, "234-234",  540,  960,  4.0,  4,  2,                               AOSP     ], // SHARP 009SH
    "003P":             [ "OMAP3630",   1108, "233-233",  480,  854,  4.3,  4,  2,                               AOSP     ], // PANASONIC 003P
    "SBM007SHJ":        [ "MSM8255",    1107, "233-233",  480,  854,  3.4,  4,  2,                               AOSP     ], // SHARP 007SH J
    "SBM007SH":         [ "MSM8255",    1106, "233-233",  480,  854,  3.4,  4,  2,                               AOSP     ], // SHARP 007SH
    "SBM006SH":         [ "MSM8255",    1106, "233-233",  540,  960,  4.2,  4,  2,                               AOSP     ], // SHARP 006SH
    "SBM005SH":         [ "MSM8255",    1102, "221-221",  480,  800,  3.8,  4,  2,                               AOSP     ], // SHARP 005SH
    "001DL":            [ "QSD8250",    1012, "220-220",  480,  800,  5.0,  4,  2,                               AOSP     ], // DELL 001DL
    "SBM003SH":         [ "MSM8255",    1012, "220-234",  480,  800,  3.8,  4,  2,                               AOSP     ], // SHARP 003SH
    "001HT":            [ "MSM8255",    1011, "220-233",  480,  800,  4.3,  3,  2,                               AOSP     ], // HTC 001HT
    // --- OTHER ---
  //"SGP412JP":         [ "APQ8074",    1401, "420-420", 1080, 1920,  6.4, 16,  5,                NFC | CHROME            ], // Xperia Z Ultra WiFi Edition
    "NW-Z1000Series":   [ "AP20",       1112, "230-404",  480,  800,  4.3,  4,  5,                               AOSP     ], // NW-Z1050, NW-Z1060, NW-Z1070
    "Kobo Arc 7":       [ "MT8125",     1312, "422-422",  600, 1024,  7.0,  8,  5,                NFC | CHROME | AOSP     ], // RAKUTEN Kobo Arc 7
    "LGL25":            [ "MSM8926",    1501, "200-200",  720, 1280,  4.7, 12,  5,          BLE | NFC                     ], // au LG Fx0, Firefox OS
    // --- SIM FREE ---
  //"J1":               [ "MSM8974AA",  1504, "442-442",  720, 1280,  4.3, 16,  5,          BLE | NFC | CHROME | AOSP     ], // Xperia J1 Compact
    "VA-10J":           [ "MSM8916",    1503, "500-500",  720, 1280,  5.0, 16,  5,  ARM64 | BLE       | CHROME            ], // VAIO Phone
  //"ARROWS M01":       [ "MSM8926",    1503, "442-442",  720, 1280,  4.5,  8,  5,          BLE | NFC | CHROME | AOSP     ], // ARROWS M01
  //"FXC5A":            [ "MT6582",     1407, "442-442",  540,  960,  5.0,  4,  5,          BLE       |          AOSP     ], // JENESIS AEON geanee
//}@devicejp
//{@kindle
    "KFSAWA":           [ "APQ8084",    1410, "442-442", 1600, 2560,  8.9, 16, 10,          BLE                | CHROMEWB | H265D ], // Fire HDX 8.9 (4th) 4G
    "KFSAWI":           [ "APQ8084",    1410, "442-442", 1600, 2560,  8.9, 16, 10,          BLE                | CHROMEWB | H265D ], // Fire HDX 8.9 (4th)
    "KFASWI":           [ "MT8135",     1410, "442-442",  800, 1280,  7.0,  8, 10,          BLE                | CHROMEWB ], // Fire HD 7 (4th)
    "KFARWI":           [ "MT8135",     1410, "442-442",  800, 1280,  6.0,  8, 10,          BLE                | CHROMEWB ], // Fire HD 6 (4th)
    "KFAPWA":           [ "MSM8974AA",  1410, "422-422", 1600, 2560,  8.9, 16,  5,                               CHROMEWB ], // Kindle Fire HDX 8.9 (3rd) 4G
    "KFAPWI":           [ "MSM8974AA",  1309, "422-422", 1600, 2560,  8.9, 16,  5,                               CHROMEWB ], // Kindle Fire HDX 8.9 (3rd)
    "KFTHWA":           [ "MSM8974AA",  1410, "422-422", 1200, 1920,  7.0, 16,  5,                               CHROMEWB ], // Kindle Fire HDX 7 (3rd) 4G
    "KFTHWI":           [ "MSM8974AA",  1309, "422-422", 1200, 1920,  7.0, 16,  5,                               CHROMEWB ], // Kindle Fire HDX 7 (3rd)
    "KFSOWI":           [ "OMAP4470",   1309, "422-422",  800, 1280,  7.0,  8,  5,                               AOSP     ], // Kindle Fire HD 7 (2nd)
    "KFJWA":            [ "OMAP4470",   1209, "403-403", 1200, 1920,  8.9,  8,  5,                               AOSP     ], // Kindle Fire HD 8.9 4G
    "KFJWI":            [ "OMAP4470",   1209, "403-403", 1200, 1920,  8.9,  8,  5,                               AOSP     ], // Kindle Fire HD 8.9
    "KFTT":             [ "OMAP4460",   1209, "403-403",  800, 1280,  7.0,  8,  5,                               AOSP     ], // Kindle Fire HD
    "KFOT":             [ "OMAP4430",   1109, "234-234",  600, 1024,  7.0,  4,  5,                               AOSP     ], // Kindle Fire
  //"SD4930UR":         [                                                                                         CHROMEWB ], // Fire Phone
//}@kindle
};

var Windows = {
/*
//{@windows
    //                     SOC          DATE   OS_VERS   DISP1 DISP2 INCH RAM TOUCH TAGS
    // --- Windows Phone 8.1 ---
    "Lumia 930":        [ "MSM8974AA",  1407, "810-810", 1080, 1920,  5.0, 16,  4,          BLE | NFC ], // NOKIA
    "Lumia 635":        [ "MSM8926",    1405, "810-810",  480,  854,  4.5,  4,  4,          BLE | NFC ], // NOKIA
    "Lumia 630":        [ "MSM8226",    1405, "810-810",  480,  854,  4.5,  4,  4,          BLE | NFC ], // NOKIA
    "Lumia 535":        [ "MSM8212",    1411, "810-810",  480,  800,  5.0,  8,  4,          BLE | NFC ], // NOKIA
    "Lumia 532":        [ "MSM8212",    1502, "810-810",  480,  800,  4.0,  8,  4,          BLE | NFC ], // NOKIA
    "Lumia 530":        [ "MSM8212",    1408, "810-810",  480,  854,  4.0,  4,  4,          BLE | NFC ], // NOKIA
    "Lumia 435":        [ "MSM8212",    1502, "810-810",  480,  800,  4.0,  8,  4,          BLE | NFC ], // NOKIA
    // --- Windows Phone 8.0 ---
    "Lumia Icon":       [ "MSM8974AA",  1402, "800-800", 1080, 1920,  5.0, 16,  4,                NFC ], // NOKIA
    "Lumia 1520":       [ "MSM8974AA",  1311, "800-800", 1080, 1920,  6.0, 16,  4,                NFC ], // NOKIA
    "Lumia 1320":       [ "MSM8930AB",  1312, "800-800",  768, 1280,  6.0,  8,  4,                    ], // NOKIA
    "Lumia 1020":       [ "MSM8960",    1307, "800-800",  768, 1280,  4.5, 16,  4,                NFC ], // NOKIA
    "Lumia 928":        [ "MSM8960",    1305, "800-800",  768, 1280,  4.5,  8,  4,                NFC ], // NOKIA
    "Lumia 925":        [ "MSM8960",    1306, "800-800",  768, 1280,  4.5,  8,  4,                NFC ], // NOKIA
    "Lumia 920":        [ "MSM8960",    1211, "800-800",  768, 1280,  4.5,  8,  4,                NFC ], // NOKIA
    "Lumia 822":        [ "MSM8960",    1211, "800-800",  480,  800,  4.3,  8,  4,                NFC ], // NOKIA
    "Lumia 820":        [ "MSM8960",    1211, "800-800",  480,  800,  4.3,  8,  4,                NFC ], // NOKIA
    "Lumia 810":        [ "MSM8260A",   1211, "800-800",  480,  800,  4.3,  4,  4,                NFC ], // NOKIA
    "Lumia 720":        [ "MSM8227",    1301, "800-800",  480,  800,  4.3,  4,  4,                NFC ], // NOKIA
    "Lumia 625":        [ "MSM8930",    1308, "800-800",  480,  800,  4.7,  4,  4,                NFC ], // NOKIA
    "Lumia 620":        [ "MSM8960",    1301, "800-800",  480,  800,  3.8,  4,  4,                NFC ], // NOKIA NO_LTE
    "Lumia 525":        [ "MSM8227",    1312, "800-800",  480,  800,  4.0,  8,  4,                NFC ], // NOKIA
    "Lumia 520":        [ "MSM8227",    1304, "800-800",  480,  800,  4.0,  4,  4,                NFC ], // NOKIA
//}@windows
 */
};

var SOC = {
    //                     GPU_ID             CLOCK CORES
    "A4":               [ "POWERVR SGX535",    0.8, 1 ], // iPhone 4, iPad 1, iPod touch 4
    "A5":               [ "POWERVR SGX543MP2", 0.8, 2 ], // iPhone 4S, iPad 2, iPad mini, iPod touch 5
    "A5X":              [ "POWERVR SGX543MP4", 1.0, 2 ], // iPad 3
    "A6":               [ "POWERVR SGX543MP3", 1.3, 2 ], // iPhone 5, iPhone 5c
    "A6X":              [ "POWERVR SGX554MP4", 1.4, 2 ], // iPad 4
    "A7":               [ "POWERVR G6430",     1.3, 2 ], // iPhone 5s, iPad Air, iPad mini 2, iPad mini 3
    "A8":               [ "POWERVR GX6450",    1.4, 2 ], // iPhone 6, iPhone 6 plus
    "A8X":              [ "POWERVR GX6450",    1.5, 3 ], // iPad Air 2
    "A9":               [ "POWERVR GX6450",    1.8, 2 ], // iPhone 6s, iPhone 6s Plus
//  "A9X":              [ "POWERVR GX6450",    1.8, 2 ], // iPad Pro
    "QSD8250":          [ "ADRENO 200",        1.0, 1 ], // Snapdragon S1, Nexus One
    "QSD8650":          [ "ADRENO 200",        1.0, 1 ], // Snapdragon S1
    "APQ8060":          [ "ADRENO 220",        1.2, 2 ], // Snapdragon S3
    "APQ8064":          [ "ADRENO 320",        1.5, 4 ], // Snapdragon S4 Pro, Nexus 7 2nd
    "APQ8064T":         [ "ADRENO 320",        1.7, 4 ], // Snapdragon 600
    "APQ8064AB":        [ "ADRENO 320",        1.9, 4 ], // Snapdragon 600
    "APQ8074":          [ "ADRENO 330",        2.2, 4 ], // Snapdragon 800
    "APQ8084":          [ "ADRENO 420",        2.5, 4 ], // Snapdragon 805, H265D. Nexus 6, SC-01G, SCL24, KFSAWA, KFSAWI
    "MSM7227":          [ "ADRENO 200",        0.6, 1 ], // Snapdragon S1
    "MSM7230":          [ "ADRENO 205",        0.8, 1 ], // Snapdragon S2
//  "MSM8212":          [ "ADRENO 302",        1.2, 4 ], // Snapdragon 200 (dual-core or quad-core)
    "MSM8225":          [ "ADRENO 203",        1.2, 1 ], // Snapdragon S4
//  "MSM8226":          [ "ADRENO 305",        1.2, 4 ], // Snapdragon 400
//  "MSM8227":          [ "ADRENO 305",        1.0, 2 ], // Snapdragon S4
    "MSM8255":          [ "ADRENO 205",        1.0, 1 ], // Snapdragon S2
    "MSM8255T":         [ "ADRENO 205",        1.4, 1 ], // Snapdragon S2
    "MSM8260":          [ "ADRENO 220",        1.7, 2 ], // Snapdragon S3
    "MSM8260A":         [ "ADRENO 225",        1.5, 2 ], // Snapdragon S4
    "MSM8655":          [ "ADRENO 205",        1.0, 1 ], // Snapdragon S2
    "MSM8660":          [ "ADRENO 220",        1.2, 2 ], // Snapdragon S3
    "MSM8660A":         [ "ADRENO 225",        1.5, 2 ], // Snapdragon S4
    "MSM8926":          [ "ADRENO 305",        1.2, 4 ], // Snapdragon 400
    "MSM8916":          [ "ADRENO 306",        1.2, 4 ], // Snapdragon 410, ARM64. VAIO Phone
    "MSM8928":          [ "ADRENO 305",        1.6, 4 ], // Snapdragon 400
//  "MSM8930":          [ "ADRENO 305",        1.2, 2 ], // Snapdragon S4 / Snapdragon 400
//  "MSM8930AB":        [ "ADRENO 305",        1.7, 2 ], // Snapdragon 400
//  "MSM8936":          [ "ADRENO 405",        1.7, 4 ], // Snapdragon 610, ARM64, H265D
    "MSM8939":          [ "ADRENO 405",        1.7, 4 ], // Snapdragon 615, ARM64, H265D. KYV31
    "MSM8960":          [ "ADRENO 225",        1.5, 2 ], // Snapdragon S4
    "MSM8960T":         [ "ADRENO 320",        1.7, 2 ], // Snapdragon S4 Pro
    "MSM8974AA":        [ "ADRENO 330",        2.2, 4 ], // Snapdragon 800, Nexus 5
    "MSM8974AB":        [ "ADRENO 330",        2.3, 4 ], // Snapdragon 801
    "MSM8974AC":        [ "ADRENO 330",        2.5, 4 ], // Snapdragon 801
    "MSM8992":          [ "ADRENO 418",        1.8, 2 ], // Snapdragon 808, H265D. LGV32, Nexus 5X
    "MSM8994":          [ "ADRENO 430",        2.0, 4 ], // Snapdragon 810, H265, ARM64
    "T20":              [ "TEGRA T20",         1.0, 2 ], // NO_SIMD
    "AP20":             [ "TEGRA AP20",        1.0, 2 ], // NO_SIMD
    "AP25":             [ "TEGRA AP25",        1.2, 2 ], // NO_SIMD
    "T30L":             [ "TEGRA T30L",        1.3, 4 ], // Nexus 7 (2012)
    "AP33":             [ "TEGRA AP33",        1.5, 4 ], //
    "AP37":             [ "TEGRA AP37",        1.7, 4 ], //
    "T124":             [ "TEGRA T124",        2.3, 4 ], // 32bit K1, Mi Pad
    "T132":             [ "TEGRA T132",        2.3, 2 ], // 64bit K1, Nexus 9
    "X1":               [ "TEGRA TX1",         2.0, 4 ], // 64bit X1, H264. SHILED, Pixel C
    "OMAP3630":         [ "POWERVR SGX530",    1.0, 1 ], //
    "OMAP4430":         [ "POWERVR SGX540",    1.2, 2 ], //
    "OMAP4460":         [ "POWERVR SGX540",    1.2, 2 ], // Galaxy Nexus
    "OMAP4470":         [ "POWERVR SGX544",    1.3, 2 ], //
    "S5L8900":          [ "POWERVR MBX LITE",  0.4, 1 ], // iPhone 3G, ARMv6
    "S5PC100":          [ "POWERVR SGX535",    0.6, 1 ], // iPhone 3GS, iPod touch 3
    "S5PC110":          [ "POWERVR SGX540",    1.0, 1 ], // Nexus S
    "EXYNOS4210":       [ "MALI 400MP4",       1.2, 2 ], // SC-02C, SC-02D, ISW11SC
    "EXYNOS4412":       [ "MALI 400MP4",       1.4, 4 ], // SC-02E, SC-03E
    "EXYNOS5250":       [ "MALI T604MP4",      1.7, 2 ], // Nexus 10
    "EXYNOS7420":       [ "MALI T760MP4",      1.5, 4 ], // Galaxy S6, S6 edge
    "MT8125":           [ "POWERVR SGX544",    1.2, 4 ], // MediaTek, MeMo Pad HD7, Kobo Arc 7
    "MT8135":           [ "POWERVR G6200",     1.2, 2 ], // Kindle
    "MT6582":           [ "MALI 400MP2",       1.3, 4 ], // MediaTek, FXC5A
    "MT6592":           [ "MALI 450MP4",       2.0, 8 ], // MediaTek, Redmi Nite
    "K3V2":             [ "GC 4000",           1.2, 4 ], // VIVANTE GC 4000
    "KIRIN910":         [ "MALI 450MP4",       1.6, 4 ], // MediaPad X1, MediaPad M1
    "APE5R":            [ "POWERVR SGX543MP2", 1.2, 2 ], // R-Mobile, 101K
    "Z2560":            [ "POWERVR SGX544MP2", 1.6, 2 ], // Clover Trail+,
    "Z2580":            [ "POWERVR SGX544MP2", 2.0, 2 ], // Clover Trail+
    "Z3560":            [ "POWERVR G6430",     1.8, 4 ], // Moorefield
    "Z3580":            [ "POWERVR G6430",     2.3, 4 ], // Moorefield
    "Z3745":            [ "HD GRAPHICS G7",    1.8, 4 ], // Bay Trail-T
  //"PSVITA":           [ "POWERVR SGX543MP4", 1.2, 4 ], // aka CXD5315GG
};
var GPU = {
    //                    GFLOPS            GLES TEXTURE
    "POWERVR MBX LITE": [   0.1,            1.1,     1 ], // iPhone 3G
    "POWERVR SGX530":   [   1.6,            2.0,     2 ],
    "POWERVR SGX535":   [   1.6,            2.0,     2 ], // iPhone 3GS, iPhone 4, iPad 1, iPod touch 3, iPod touch 4
    "POWERVR SGX540":   [   3.2,            2.0,     2 ], // Nexus S, Galaxy Nexus
    "POWERVR SGX543MP2":[   7.2 * 2,        2.0,     4 ], // iPhone 4S, iPad 2, iPad mini, iPod touch 5
    "POWERVR SGX543MP3":[   7.2 * 3,        2.0,     4 ], // iPhone 5, iPhone 5c
    "POWERVR SGX543MP4":[   7.2 * 4,        2.0,     4 ], // iPad 3
    "POWERVR SGX544":   [   7.2,            2.0,     4 ],
    "POWERVR SGX544MP2":[   7.2 * 2,        2.0,     4 ],
    "POWERVR SGX554MP4":[  14.4 * 4,        2.0,     4 ], // iPad 4
    "POWERVR G6200":    [ 105.0,            3.0,     4 ], // KINDLE
    "POWERVR G6430":    [ 115.2,            3.1,     4 ], // A7, iPhone 5s, iPad Air, iPad mini 2, iPad mini 3
    "POWERVR GX6450":   [ 166.4,            3.1,    16 ], // iPhone 6, 6s, 6 Plus, 6s Plus, iPad Air 2
    "ADRENO 200":       [   2.1,            2.0,     2 ], // Snapdragon S1, Nexus One
    "ADRENO 203":       [   7.8,            2.0,     4 ], // Snapdragon 200
    "ADRENO 205":       [   7.8,            3.0,     4 ], // Snapdragon 400
    "ADRENO 220":       [  17.0,            2.0,     4 ], // Snapdragon S3
    "ADRENO 225":       [  19.2,            2.0,     4 ], // Snapdragon S4
    "ADRENO 302":       [  19.2,            3.0,     4 ], // Snapdragon 200
    "ADRENO 305":       [  19.2,            3.0,     4 ], // Snapdragon 400
    "ADRENO 306":       [  21.6,            3.0,     4 ], // Snapdragon 410
    "ADRENO 320":       [  57.6,            3.0,     4 ], // Snapdragon 600, Nexus 4, Nexus 7 (2013)
    "ADRENO 330":       [ 158.4,            3.0,     4 ], // Snapdragon 800/801/610, Nexus 5
    "ADRENO 405":       [  59.4,            3.1,     4 ], // Snapdragon 615, Mi 4i, KYV31
    "ADRENO 418":       [ 172.8,            3.1,    16 ], // Snapdragon 808, LGV32
    "ADRENO 420":       [ 144.0,            3.1,    16 ], // Snapdragon 805, Nexus 6
    "ADRENO 430":       [(144.0 * 1.3) | 0, 3.1,    16 ], // Snapdragon 810, SO-03G, SH-03G, F-04G
    "TEGRA T20":        [   5.6,            2.0,     2 ], // TEGRA 2
    "TEGRA AP20":       [   5.6,            2.0,     2 ], // TEGRA 2, NW-Z1000
    "TEGRA AP25":       [   5.6,            2.0,     2 ], // TEGRA 2
    "TEGRA AP33":       [  12.5,            2.0,     2 ], // TEGRA 3
    "TEGRA AP37":       [  12.5,            2.0,     2 ], // TEGRA 3, F-02E, F-05E
    "TEGRA T30L":       [  12.5,            2.0,     2 ], // TEGRA 3, Nexus 7 (2012)
    "TEGRA T124":       [ 365.0,            3.1,    16 ], // TEGRA K1, SHIELD Tablet, Mi Pad
    "TEGRA T132":       [ 365.0,            3.1,    16 ], // TEGRA K1, Nexus 9
    "TEGRA TX1":        [ 512.0,            3.1,    16 ], // TEGRA X1. SHIELD, Pixel C
    "MALI 400MP2":      [   5.0 * 2,        2.0,     4 ], // Mali-400
    "MALI 400MP4":      [   5.0 * 4,        2.0,     4 ], // Mali-400
    "MALI 450MP4":      [  14.6 * 4,        2.0,     4 ], // Mali-450
    "MALI T604MP4":     [  17.0 * 4,        3.1,     4 ], // Mali-T604 Nexus 10
    "MALI T760MP4":     [  68.0 * 4,        3.1,     4 ], // Mali-T760 Galaxy S6
    "GC 4000":          [  30.7,            2.0,     8 ], // (IMMERSION.16) HW-03E, dtab01
    "HD GRAPHICS G7":   [  50.0,            3.3,     4 ], // Bay Trail-T 7th generation, E4U (Z3745, Clock 778MHz)
};

return {
    "Tags":     Tags,
    "iOS":      iOS,
    "Android":  Android,
    "Windows":  Windows,
    "SOC":      SOC,
    "GPU":      GPU,
};

});

