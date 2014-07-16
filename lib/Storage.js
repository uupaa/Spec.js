(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

// --- class / interfaces ----------------------------------
var methods = {
    "isWebStorage":             Spec_isWebStoage,       // Spec#isWebStorage():Boolean
    "isWebSQL":                 Spec_isWebSQL,          // Spec#isWebSQL():Boolean
    "isIndexedDB":              Spec_isIndexedDB,       // Spec#isIndexedDB():Boolean
    "isApplicationCache":       Spec_isApplicationCache,// Spec#isApplicationCache():Boolean
    "isQuota":                  Spec_isQuota,           // Spec#isQuota():Boolean
};

for (var name in methods) {
    global["Spec_" in global ? "Spec_" : "Spec"]["prototype"][name] = methods[name];
}

// --- implements ------------------------------------------
function Spec_isWebStoage() { // @ret Boolean
                              // @desc enable WebStorage
    if ("localStorage" in global) {
        return !_isPrivateMode();
    }
    return false;
}

function Spec_isWebSQL() { // @ret Boolean
                           // @desc enable WebSQL
    if ("openDatabase" in global) {
        return !_isPrivateMode();
    }
    return false;
}

function Spec_isIndexedDB() { // @ret Boolean
                              // @desc enable IndexedDB
    if ("indexedDB" in global) {
        return !_isPrivateMode();
    }
    return false;
}

function Spec_isApplicationCache() { // @ret Boolean
                                     // @desc enable ApplicationCache
    if ("applicationCache" in global) {
        return !_isPrivateMode();
    }
    return false;
}

function Spec_isQuota() { // @ret Boolean
                          // @desc enable Disk quota
    var persistentStorage = this.prefix(navigator, "persistentStorage");

    if (persistentStorage) {
        return !_isPrivateMode();
    }
    return false;
}

function _isPrivateMode() {
    if ("sessionStorage" in global) {
        global["sessionStorage"].setItem("__SPEC__", "ok");
        if ( global["sessionStorage"].getItem("__SPEC__") === "ok" ) {
            return false;
        }
    }
    return false;
}

// --- validate / assertions -------------------------------
//{@dev
//function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
//function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
//function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
//function $some(val, str, ignore) { return global["Valid"] ? global["Valid"].some(val, str, ignore) : true; }
//function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- exports ---------------------------------------------

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule

