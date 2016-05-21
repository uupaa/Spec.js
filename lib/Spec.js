(function moduleExporter(name, closure) {
"use strict";

var entity = GLOBAL["WebModule"]["exports"](name, closure);

if (typeof module !== "undefined") {
    module["exports"] = entity;
}
return entity;

})("Spec", function moduleClosure(global, WebModule, VERIFY /*, VERBOSE */) {
"use strict";

// --- technical terms / data structure --------------------
// --- dependency modules ----------------------------------
var Catalog   = WebModule["SpecCatalog"];
var CatalogFP = WebModule["SpecCatalogFP"];
// --- import / local extract functions --------------------
// --- define / local variables ----------------------------
// --- class / interfaces ----------------------------------
function Spec(ua,        // @arg UserAgent|Object - WebModule.UserAgent object
              options) { // @arg Object = null - { DATE, MAX_THREADS, MAX_TOUCH_POINTS }
//{@dev
    if (VERIFY) {
        $valid($type(ua, "UserAgent|Object"), Spec, "ua");
    }
//}@dev

    _init.call(this, ua, options || {});
}

Spec["repository"] = "https://github.com/uupaa/Spec.js";
Spec["prototype"] = Object.create(Spec, {
    "constructor":      { "value": Spec }, // new Spec():Spec
    "UNKNOWN":          { "get":   function()  { return this._UNKNOWN;          } }, // Unknown device.
    // --- for Smart Phone ---
    "SOC":              { "get":   function()  { return this._SOC;              } }, // System On Chip ID (UPPER_CASE STRING). eg: "MSM8974", "A5X"
    "GPU":              { "get":   function()  { return this._GPU;              } }, // GPU ID. eg: "ADRENO 330"
    "RAM":              { "get":   function()  { return this._RAM;              } }, // Memory (MB)
    "BLE":              { "get":   function()  { return this._BLE;              } }, // BLE Ready. Bluetooth 4.0+ and OS support(iOS 5+, Android 4.3+)
    "NFC":              { "get":   function()  { return this._NFC;              } }, // NFC Ready. Android 2.3+
    "OTG":              { "get":   function()  { return this._OTG;              } }, // USB On-the-Go. USB HOST.
    "ATOM":             { "get":   function()  { return this._ATOM;             } }, // Intel ATOM.
    "SIMD":             { "get":   function()  { return this._SIMD;             } }, // SIMD(NEON) support. Tegra 2 does not supports NEON.
    "H265_ENCODER":     { "get":   function()  { return this._H265_ENCODER;     } }, // H.265 hardware encoder.
    "H265_DECODER":     { "get":   function()  { return this._H265_DECODER;     } }, // H.265 hardware decoder.
    "FORCE_TOUCH":      { "get":   function()  { return this._FORCE_TOUCH;      } }, // Force touch support.
    "FORCE_CLICK":      { "get":   function()  { return this._FORCE_CLICK;      } }, // Force click on link navigation.
    "MAX_THREADS":      { "get":   function()  { return this._MAX_THREADS;      } }, // Max threads in WebWorkers.
    "MAX_TOUCH_POINTS": { "get":   function()  { return this._MAX_TOUCH_POINTS; } }, // Max touch points.
    "MAX_TEXTURE_SIZE": { "get":   function()  { return this._MAX_TEXTURE_SIZE; } }, // GPU Max texture size.
    "GLES":             { "get":   function()  { return this._GLES;             } }, // OpenGL ES version.
    "METAL":            { "get":   function()  { return this._METAL;            } }, // METAL version.
    "VULKAN":           { "get":   function()  { return this._VULKAN;           } }, // VULKAN version.
    "LOW_END":          { "get":   function()  { return this._LOW_END;          } }, // low-end CPU or low-end GPU.
    "OUTMODED":         { "get":   function()  { return this._OUTMODED;         } }, // Outmoded device. Device was elapsed for 24 or 30 months.
                                                                                     //     24 months: OS was not updated.
                                                                                     //     24 + 6 months: OS was updated.
    // --- for Feature Phone ---
    "FP_TLS":           { "get":   function()  { return this._FP_UTF8;          } }, // TLS support
    "FP_UTF8":          { "get":   function()  { return this._FP_TLS;           } }, // UTF8 support
    "FP_COOKIE":        { "get":   function()  { return this._FP_COOKIE;        } }, // Cookie support
    "FP_CERT_SHA1":     { "get":   function()  { return this._FP_CERT_SHA1;     } }, // Device is affected by the disabled of SHA1 server certificate.
    "FP_FLASH_LITE":    { "get":   function()  { return this._FP_FLASH_LITE;    } }, // FlashLite version. 1.0 / 1.1 / 2.0 / 3.0 / 3.1 or 0.0
    "FP_MALFUNCTION":   { "get":   function()  { return this._FP_MALFUNCTION;   } }, // Device malfunction.
    "FP_DISPLAY_LONG":  { "get":   function()  { return this._FP_DISPLAY_LONG;  } }, // Display long edge
    "FP_DISPLAY_SHORT": { "get":   function()  { return this._FP_DISPLAY_SHORT; } }, // Display short edge
});

Spec["has"]  = Spec_has;  // Spec.has(id:IDString):Boolean
Spec["dump"] = Spec_dump; // Spec.dump(type:String = "modern"):DeviceIDArray

Spec["THRESHOLD"] = { // threshold settings
    "OUTMODED":             24, // 24 months was passed.
    "LOW_END_CPU_CORES":     2, // dual core
    "LOW_END_CPU_SPEED":   1.2, // 1.2 MHz
    "LOW_END_GPU_GFLOPS":   19, // 19 GFLOPS
};

// --- implements ------------------------------------------
function _init(ua, options) { // @bind this
    var WebGLDetector       = global["WebModule"]["WebGLDetector"] || {};
    var nav                 = global["navigator"] || {};
    var device              = ua["DEVICE"];
    var os                  = ua["OS"];
    var osVersion           = parseFloat(ua["OS_VERSION"]);
    // --- for Smart Phone ---
    this._UNKNOWN           = true;
    this._SOC               = "";
    this._GPU               = "";
    this._RAM               = 0;
    this._BLE               = false;
    this._NFC               = false;
    this._OTG               = false;
    this._ATOM              = false;
    this._SIMD              = false;
    this._H265_ENCODER      = false;
    this._H265_DECODER      = false;
    this._FORCE_TOUCH       = false;
    this._FORCE_CLICK       = false;
    this._MAX_THREADS       = options["MAX_THREADS"] ||
                              Math.max(2, nav["hardwareConcurrency"] || 0);
    this._MAX_TOUCH_POINTS  = options["MAX_TOUCH_POINTS"] || nav["maxTouchPoints"] || 0;
    this._MAX_TEXTURE_SIZE  = WebGLDetector["MAX_TEXTURE_SIZE"] || 1024;
    this._GLES              = 0.0;
    this._METAL             = 0.0;
    this._VULKAN            = 0.0;
    this._LOW_END           = false;
    this._OUTMODED          = false;
    // --- for Feature Phone ---
    this._FP_TLS            = false;
    this._FP_UTF8           = false;
    this._FP_COOKIE         = false;
    this._FP_CERT_SHA1      = false;
    this._FP_FLASH_LITE     = 0.0;
    this._FP_MALFUNCTION    = false;
    this._FP_DISPLAY_LONG   = false;
    this._FP_DISPLAY_SHORT  = false;

    if (device) {
        if (CatalogFP && ua["FEATURE_PHONE"]) {
            _initFP.call(this, ua, device);
        } else if (Catalog) {
            _initSP.call(this, ua, device, options);
        }
    }
    if (os === "Android" && osVersion < 4.3) {
        // BLE ready for Android 4.3+ (API Level 18+)
        // https://developer.android.com/guide/topics/connectivity/bluetooth-le.html
        this._BLE = false; // disable BLE
    }
    if (os === "Android" && osVersion < 4.0) {
        // USB On-the-Go ready for Android 2.3.4+ (4.0.0+)
        this._OTG = false; // disable OTG
    }
    if (os === "Android" && osVersion < 4.0) {
        // Android 2.x, 3.x Browsers does not support multitouch events
        // https://code.google.com/p/android/issues/detail?id=11909
        this._MAX_TOUCH_POINTS = this._MAX_TOUCH_POINTS ? 1 : 0; // to Binary
    }
    if (os === "iOS" && osVersion >= 8.0 && this._GLES >= 3.1) {
        // Metal support. PowerVR G6430/GX6450/GX6850 (Apple A7,A8,A8X,A9,A9X)
        this._METAL = 1.0;
    }
    if (os === "Android" && osVersion >= 7.0 && this._GLES >= 3.1) {
        // Vulkan support
        this._VULKAN = 1.0;
    }
}

function _initSP(ua, device, options) {
    // [ SOC, DATE, OS_VERS, DISP1, DISP2, INCH, RAM, TOUCH, TAG ]
    var record = Catalog["iOS"][device]     ||
                 Catalog["Android"][device] ||
              /* Catalog["Windows"][device] || */ null;
    if (record) {
        var primary_soc = record[0].split("/")[0]; // "Z3560/Z3580" -> "Z3560"
        var tags = Catalog["DEVICE_TAGS"];
        var soc  = Catalog["SOC"][primary_soc]; // [ CLOCK, CORES, GPU_ID ]
        var gpu  = Catalog["GPU"][soc[0]];      // [ GFLOPS, TEXTURE, GPU_TAGS ]
        var bits = record[8]; // tag bits

        this._UNKNOWN           = false;
        this._SOC               = record[0];
        this._GPU               = soc[0];
        this._RAM               = record[6] * 128;
        this._BLE               = !!(bits & tags["BLE"]);
        this._NFC               = !!(bits & tags["NFC"]);
        this._OTG               = !!(bits & tags["OTG"]);
        this._ATOM              = !!(bits & tags["ATOM"]);
        this._SIMD              = !/^(T20|AP20|AP25)$/.test(primary_soc);
        this._H265_ENCODER      = !!(bits & tags["H265E"]);
        this._H265_DECODER      = !!(bits & tags["H265D"]);
        this._FORCE_TOUCH       = !!(bits & tags["FORCE_TOUCH"]);
        this._FORCE_CLICK       = !!(bits & tags["FORCE_CLICK"]);
        this._MAX_TOUCH_POINTS  = options["MAX_TOUCH_POINTS"] || record[7];     // update
        this._MAX_TEXTURE_SIZE  = options["MAX_TEXTURE_SIZE"] || gpu[1] * 1024; // update
        this._GLES              = _getOpenGLESVersion(gpu[2]);
        this._LOW_END           = _isLowEndCPU(soc) || _isLowEndGPU(gpu);
        this._OUTMODED          = _isOutmodedDevice(record[1], record[2],
                                                    options["DATE"] || Date.now());
    }
}

function _getOpenGLESVersion(tags) { // @arg UINT32
    if (tags & Catalog["GPU_TAGS"]["GLES33"]) { return 3.3; }
    if (tags & Catalog["GPU_TAGS"]["GLES32"]) { return 3.2; }
    if (tags & Catalog["GPU_TAGS"]["GLES31"]) { return 3.1; }
    if (tags & Catalog["GPU_TAGS"]["GLES30"]) { return 3.0; }
    if (tags & Catalog["GPU_TAGS"]["GLES20"]) { return 2.0; }
    if (tags & Catalog["GPU_TAGS"]["GLES11"]) { return 1.1; }
    return 0.0;
}

function _initFP(ua, device) {
    // [ FLASH_LITE_VERSION, DISP1, DISP2, BROWSER_VERSION ]
    var record = CatalogFP["DOCOMO"][device]   ||
                 CatalogFP["KDDI"][device]     ||
                 CatalogFP["SOFTBANK"][device] || null;
    if (record) {
        var fpBrowserVersion    = record[3];
        var tags = CatalogFP["DEVICE_TAGS"];
        var bits = record[4]; // tag bits

        this._UNKNOWN           = false;
        this._FP_TLS            = _canTLS(ua["CARRIER"], fpBrowserVersion);
        this._FP_UTF8           = _canUTF8(ua["CARRIER"], fpBrowserVersion);
        this._FP_COOKIE         = _canCookie(ua["CARRIER"], fpBrowserVersion);
        this._FP_CERT_SHA1      = !!(bits & tags["CERT_SHA1"]);
        this._FP_FLASH_LITE     = record[0];
        this._FP_MALFUNCTION    = !!(bits & tags["MALFUNCTION"]) || this._FP_CERT_SHA1;
        this._FP_DISPLAY_LONG   = Math.max(record[1], record[2]);
        this._FP_DISPLAY_SHORT  = Math.min(record[1], record[2]);
    }
}

function Spec_has(id) { // @arg IDString - DEVICE ID or SOC ID or GPU ID
                        // @ret Boolean
    if (Catalog) {
        return id in Catalog["iOS"]     ||
               id in Catalog["Android"] ||
            // id in Catalog["Windows"] ||
               id in Catalog["SOC"]     ||
               id in Catalog["GPU"];
    }
    if (CatalogFP) {
        return id in CatalogFP["DOCOMO"] ||
               id in CatalogFP["KDDI"]   ||
               id in CatalogFP["SOFTBANK"];
    }
    return false;
}

function Spec_dump(type,      // @arg String = "modern" - "modern", "lowend", "outmoded", "onehand", "bothhands"
                   options) { // @arg Object = null - { DATE }
                              // @ret DeviceIDArray
//{@dev
    if (VERIFY) {
        $valid($type(type,    "String|omit"), Spec_dump, "type");
        $valid($type(options, "Object|omit"), Spec_dump, "options");
        $valid($some(type,    "modern|lowend|outdated|onehand|bothhands|outmoded"), Spec_dump, "type");
    }
//}@dev

    options = options || {};

    var now = options["DATE"] || Date.now();
    var fn = {
            "modern":    _modern,
            "lowend":    _lowend,
            "outmoded":  _outmoded,
            "outdated":  _outmoded, // [DEPRECATED]
            "onehand":   _isOnehandDevice,
            "bothhands": _isBothhandsDevice,
        }[type || "modern"];

    return ["iOS", "Android"].reduce(function(result, os) {
        for (var id in Catalog[os]) {
            var dev = Catalog[os][id];
            var primary_soc = dev[0].split("/")[0]; // "Z3560/Z3580" -> "Z3560"
            var soc = Catalog["SOC"][primary_soc];  // [ CLOCK, CORES, GPU_ID ]
            var gpu = Catalog["GPU"][soc[0]];       // [ GFLOPS, TEXTURE_SIZE, GPU_TAGS ]

            if (fn(dev, soc, gpu, os)) {
                result.push(id);
            }
        }
        return result;
    }, []);

    function _modern(dev, soc, gpu) {
        return !_isLowEndCPU(soc) && !_isLowEndGPU(gpu) &&
               !_isOutmodedDevice(dev[1], dev[2], now);
    }
    function _lowend(dev, soc, gpu) {
        return _isLowEndCPU(soc) || _isLowEndGPU(gpu);
    }
    function _outmoded(dev) {
        return _isOutmodedDevice(dev[1], dev[2], now);
    }
}

function _isLowEndCPU(soc) {
    return soc[1] <= Spec["THRESHOLD"]["LOW_END_CPU_SPEED"] &&
           soc[2] <= Spec["THRESHOLD"]["LOW_END_CPU_CORES"];
}
function _isLowEndGPU(gpu) {
    return gpu[0] <= Spec["THRESHOLD"]["LOW_END_GPU_GFLOPS"];
}
function _isOnehandDevice(dev) {
    return dev[5] <= 4.5; // onhand device <= 4.5 inch
}
function _isBothhandsDevice(dev) {
    return !_isOnehandDevice(dev);
}
function _isOutmodedDevice(yymm,       // @arg Integer - device release date. yymm
                           osVersions, // @arg String - OS version. "234-404", "{{IN_RELEASE}}-{{IN_LAST_UPDATE}}"
                           now) {      // @arg Integer - current time.
                                       // @ret Boolean
    var versions = osVersions.split("-"); // ["234", "404"]
    var firstVersion = versions[0];
    var finalVersion = versions[1] || "9999";
    var outmoded = Spec["THRESHOLD"]["OUTMODED"];
    var month = 31 * 24 * 60 * 60 * 1000;
    var releaseDate = new Date(2000 + ((yymm / 100) | 0), (yymm % 100) - 1, 1).getTime();

    // --- DESERT DEVICE ---
    // Devices that even once has not been updated.
    if (now > releaseDate + (outmoded + 1) * month) {
        if (firstVersion === finalVersion) { // This device has not been version-up even once.
            return true;
        }
    }
    // --- WELL-KNOWN DEVICE / POPULAR DEVICE ---
    // Updated device, 6 months extension.
    if (now > releaseDate + (outmoded + 1 + 6) * month) {
        return true;
    }
    return false;
}

function _canUTF8(carrier, fpBrowserVersion) { // @ret Boolean
    switch (carrier) {
    case "DOCOMO":
        // | Charset    | i-mode 1.0  | i-mode 2.0 | i-mode 2.1 |
        // |------------|-------------|------------|------------|
        // | Shift_JIS  | OK          | OK         | OK         |
        // | UTF-8      |             | OK         | OK         |
        return fpBrowserVersion >= 2.0;
    case "KDDI":
        // | Charset           | Browser 6.2 | Browser 7.2 |
        // |-------------------|-------------|-------------|
        // | Shift_JIS         | OK          | OK          |
        // | UTF-8 (HTML)      |             | WRONG       |
        // | UTF-8 (HTML+SSL)  |             | OK          |
        // | UTF-8 (XHTML)     |             | OK          |
        // | UTF-8 (XHTML+SSL) |             | OK          |
        return fpBrowserVersion >= 7.2;
    case "SOFTBANK":
        // | Charset    | Browser     |
        // |------------|-------------|
        // | Shift_JIS  | OK          |
        // | UTF-8      | OK          |
        // | EUC-JP     | OK          |
        return true;
    }
    return false;
}

function _canTLS(carrier, fpBrowserVersion) { // @ret Boolean - TLS 1.0 supported
    switch (carrier) {
    case "DOCOMO":
        // https://www.nttdocomo.co.jp/service/developer/make/content/ssl/spec/index.html
        //
        // | SSL/TLS    | i-mode 1.0  | i-mode 2.0  | i-mode 2.1 |
        // |------------|-------------|-------------|------------|
        // | SSL 2.0    | OK          | OK          | OK         |
        // | SSL 3.0    | OK          | OK          | OK         |
        // | TLS 1.0    |             | OK          | OK         |
        return fpBrowserVersion >= 2.0;
    case "KDDI":
        // http://www.au.kddi.com/ezfactory/web/pdf/contents_guide.pdf (P42)
        //
        // | SSL/TLS    | Browser 6.2 | Browser 7.2 |
        // |------------|-------------|-------------|
        // | SSL 3.0    | OK          | OK          |
        // | TLS 1.0    | OK          | OK          |
        return true;
    case "SOFTBANK":
        // http://creation.mb.softbank.jp/mc/tech/tech_web/web_ssl.html
        //
        // | SSL/TLS    | Browser     |
        // |------------|-------------|
        // | SSL 3.0    | OK          |
        // | TLS 1.0    | OK          |
        return true;
    }
    return false;
}

function _canCookie(carrier, fpBrowserVersion) { // @ret Boolean
    switch (carrier) {
    case "DOCOMO":
        // |            | i-mode 1.0  | i-mode 2.0   | i-mode 2.1 |
        // |------------|-------------|--------------|------------|
        // | Cookie     |             | OK           | OK         |
        return fpBrowserVersion >= 2.0;
    case "KDDI":
        // |            | Browser 6.2 | Browser 7.2  |
        // |------------|-------------|--------------|
        // | Cookie     | OK          | OK           |
        return fpBrowserVersion >= 7.2;
    case "SOFTBANK":
        // |            | Browser     |
        // |------------|-------------|
        // | Cookie     | OK          |
        return true;
    }
    return false;
}

return Spec; // return entity

});

