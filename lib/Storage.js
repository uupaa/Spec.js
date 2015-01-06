//{@spec_storage
(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _isNodeOrNodeWebKit = !!global.global;
//var _runOnNodeWebKit =  _isNodeOrNodeWebKit && /native/.test(setTimeout);
//var _runOnNode       =  _isNodeOrNodeWebKit && !/native/.test(setTimeout);
//var _runOnWorker     = !_isNodeOrNodeWebKit && "WorkerLocation" in global;
//var _runOnBrowser    = !_isNodeOrNodeWebKit && "document" in global;

// --- class / interfaces ----------------------------------
var methods = {
    "isWebStorage":             Spec_isWebStoage,       // Spec#isWebStorage():Boolean
    "isWebSQL":                 Spec_isWebSQL,          // Spec#isWebSQL():Boolean
    "isIndexedDB":              Spec_isIndexedDB,       // Spec#isIndexedDB():Boolean
    "isApplicationCache":       Spec_isApplicationCache,// Spec#isApplicationCache():Boolean
    "isDiskQuota":              Spec_isDiskQuota,       // Spec#isDiskQuota():Boolean
};

for (var name in methods) {
    global["Spec_" in global ? "Spec_" : "Spec"]["prototype"][name] = methods[name];
}

// --- implements ------------------------------------------
function Spec_isWebStoage() { // @ret Boolean
                              // @desc enable and writable WebStorage
    if ( !("sessionStorage" in global) &&
         !("localStorage" in global) ) {
        return false;
    }

    return _writeSesscionStorage(global["sessionStorage"], "__SPEC__", "OK") &&
           _writeSesscionStorage(global["localStorage"],   "__SPEC__", "OK");

    function _writeSesscionStorage(storage, key, value) {
        try {
            if (storage && storage.setItem) {
                storage.setItem(key, value);
                if (storage.getItem(key) === value) {
                    storage.removeItem(key);
                    return true;
                }
            }
        } catch (o_o) {}
        return false;
    }
}

function Spec_isWebSQL() { // @ret Boolean
                           // @desc enable WebSQL
    return "openDatabase" in global;
}

function Spec_isIndexedDB() { // @ret Boolean
                              // @desc enable IndexedDB
    return "indexedDB" in global;
}

function Spec_isApplicationCache() { // @ret Boolean
                                     // @desc enable ApplicationCache
    return "applicationCache" in global;
}

function Spec_isDiskQuota() { // @ret Boolean
                              // @desc enable Disk quota
    if ("navigator" in global) {
        var temporaryStorage = navigator["temporaryStorage"] ||
                               navigator["webkitTemporaryStorage"];
        return !!temporaryStorage;
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
//}@spec_storage

