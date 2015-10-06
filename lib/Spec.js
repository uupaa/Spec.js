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

// --- define / local variables ----------------------------
// --- class / interfaces ----------------------------------
function Spec(ua,        // @arg UserAgentObject - WebModule.UserAgent object
              options) { // @arg Object = null - { DATE, MAX_THREADS, MAX_TOUCH_POINTS }
    _init.call(this, ua, options || {});
}

Spec["repository"] = "https://github.com/uupaa/Spec.js";
Spec["prototype"] = Object.create(Spec, {
    "constructor":      { "value": Spec     }, // new Spec():Spec
    // --- DEVICE ---
    "UNKNOWN":          { "get":   function()  { return this._UNKNOWN;          } }, // Unknown device.
    "SOC":              { "get":   function()  { return this._SOC;              } }, // System On Chip ID (UPPER_CASE STRING). eg: "MSM8974", "A5X"
    "GPU":              { "get":   function()  { return this._GPU;              } }, // GPU ID. eg: "ADRENO 330"
    "RAM":              { "get":   function()  { return this._RAM;              } }, // Memory (MB)
    "BLE":              { "get":   function()  { return this._BLE;              } }, // BLE Ready. Bluetooth 4.0+ and OS support(iOS 5+, Android 4.3+)
    "NFC":              { "get":   function()  { return this._NFC;              } }, // NFC Ready. Android 2.3+
    "ATOM":             { "get":   function()  { return this._ATOM;             } }, // Intel ATOM.
    "SIMD":             { "get":   function()  { return this._SIMD;             } }, // SIMD Support. Tegra 2 does not supports NEON.
    "H265":             { "get":   function()  { return this._H265;             } }, // H.264 Support. 0x01 = encode, 0x02 = decode, 0x03 = both
    "FORCE_TOUCH":      { "get":   function()  { return this._FORCE_TOUCH;      } }, // Force touch.
    "FORCE_CLICK":      { "get":   function()  { return this._FORCE_CLICK;      } }, // Force click on link navigation
    "MAX_THREADS":      { "get":   function()  { return this._MAX_THREADS;      } }, // Max threads in WebWorkers.
    "MAX_TOUCH_POINTS": { "get":   function()  { return this._MAX_TOUCH_POINTS; } }, // Max touch points.
    "MAX_TEXTURE_SIZE": { "get":   function()  { return this._MAX_TEXTURE_SIZE; } }, // GPU Max texture size.
    "LOW_END":          { "get":   function()  { return this._LOW_END;          } }, // is low end CPU or low end GPU.
    "OUTMODED":         { "get":   function()  { return this._OUTMODED;         } }, // is outmoded device. (30 months elapsed) or (24 months elapsed and not version-up)
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
    var WebGLDetector = global["WebModule"]["WebGLDetector"] || {};

    var nav       = global["navigator"] || {};
    var device    = ua["DEVICE"];
    var os        = ua["OS"];
    var osVersion = parseFloat(ua["OS_VERSION"]);
    // --- DEVICE ---
    this._UNKNOWN           = true;
    this._SOC               = "";
    this._GPU               = "";
    this._RAM               = 0;
    this._BLE               = false;
    this._NFC               = false;
    this._ATOM              = false;
    this._SIMD              = false;
    this._H265              = 0x00;
    this._FORCE_TOUCH       = false;
    this._FORCE_CLICK       = false;
    this._MAX_THREADS       = options["MAX_THREADS"] ||
                              Math.max(2, nav["hardwareConcurrency"] || 0);
    this._MAX_TOUCH_POINTS  = options["MAX_TOUCH_POINTS"] || nav["maxTouchPoints"] || 0;
    this._MAX_TEXTURE_SIZE  = WebGLDetector["MAX_TEXTURE_SIZE"] || 1024;
    this._LOW_END           = false;
    this._OUTMODED          = false;

    if (device) {
        // [ SOC_ID, DATE, OS_VERS, DISP1, DISP2, INCH, RAM, TOUCH, TAG ]
        var dev = Catalog["iOS"][device] || Catalog["Android"][device] || null;
        if (dev) {
            var tags = Catalog["Tags"];
            var soc  = Catalog["SOC"][dev[0]]; // [ CLOCK, CORES, GPU_ID ]
            var gpu  = Catalog["GPU"][soc[0]]; // [ GFLOPS, GLES, TEXTURE ]
            var bits = dev[8]; // tag bits

            this._UNKNOWN           = false;
            this._SOC               = dev[0];
            this._GPU               = soc[0];
            this._RAM               = dev[6] * 128;
            this._BLE               = !!(bits & tags["BLE"]);
            this._NFC               = !!(bits & tags["NFC"]);
            this._ATOM              = !!(bits & tags["ATOM"]);
            this._SIMD              = !/^(T20|AP20|AP25)$/.test(this._SOC);
            this._H265              = _getH265FunctionState(bits, tags);
            this._FORCE_TOUCH       = !!(bits & tags["FORCE_TOUCH"]);
            this._FORCE_CLICK       = !!(bits & tags["FORCE_CLICK"]);
            this._MAX_TOUCH_POINTS  = options["MAX_TOUCH_POINTS"] || dev[7];        // update
            this._MAX_TEXTURE_SIZE  = options["MAX_TEXTURE_SIZE"] || gpu[2] * 1024; // update
            this._LOW_END           = _isLowEndCPU(soc) || _isLowEndGPU(gpu);
            this._OUTMODED          = _isOutmodedDevice(dev[1], dev[2],
                                                        options["DATE"] || Date.now());
        }
    }
    // BLE ready for Android 4.3+ (API Level 18+)
    // https://developer.android.com/guide/topics/connectivity/bluetooth-le.html
    if (os === "Android" && osVersion < 4.3) {
        this._BLE = false; // disable BLE
    }
    if (os === "Android" && osVersion < 4.0) {
        // Android 2.x, 3.x Browsers does not support multitouch events
        // https://code.google.com/p/android/issues/detail?id=11909
        this._MAX_TOUCH_POINTS = this._MAX_TOUCH_POINTS ? 1 : 0; // to Binary
    }
}

function Spec_has(id) { // @arg IDString - DEVICE ID or SOC ID or GPU ID
                        // @ret Boolean
    return id in Catalog["iOS"] || id in Catalog["Android"] ||
           id in Catalog["SOC"] || id in Catalog["GPU"];
}

function Spec_dump(type,      // @arg String = "modern" - "modern", "lowend", "outdated", "onehand", "bothhands"
                   options) { // @arg Object = null - { DATE }
                              // @ret DeviceIDArray
//{@dev
    $valid($type(type,    "String|omit"), Spec_dump, "type");
    $valid($type(options, "Object|omit"), Spec_dump, "options");
    $valid($some(type,    "modern|lowend|outdated|onehand|bothhands"), Spec_dump, "type");
//}@dev

    options = options || {};

    var now = options["DATE"] || Date.now();
    var fn = {
            "modern":    _modern,
            "lowend":    _lowend,
            "outdated":  _outdated,
            "onehand":   _isOnehandDevice,
            "bothhands": _isBothhandsDevice,
        }[type || "modern"];

    return ["iOS", "Android"].reduce(function(result, os) {
        for (var id in Catalog[os]) {
            var dev = Catalog[os][id];
            var soc = Catalog["SOC"][dev[0]]; // [ CLOCK, CORES, GPU_ID ]
            var gpu = Catalog["GPU"][soc[0]]; // [ GFLOPS, GLES, TEXTURE ]

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
    function _outdated(dev) {
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

function _getH265FunctionState(bits, tags) {
    var result = 0x00;
    if (bits & tags["H265E"]) { result |= 0x01; } // H.265 encoder
    if (bits & tags["H265D"]) { result |= 0x02; } // H.265 decoder
    return result;
}

return Spec; // return entity

});

