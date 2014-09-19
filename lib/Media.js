//{@spec_media
(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

var AUDIO_MIME_TYPES = {
        "mp3":  "audio/mpeg",
        "mp4":  "audio/mp4",
        "ogg":  'audio/ogg; codecs="vorbis"',
        "wav":  "audio/wav",
        "webm": "audio/webm"
    };
var VIDEO_MIME_TYPES = {
        "mp4":  "audio/mp4",
        "ogg":  "audio/ogg",
        "webm": "audio/webm"
    };

var _ready = {
        detected:   false,
        "audio":    false,
        "video":    false,
        "webaudio": false,
        "mp3":      false,
        "mp4":      false, // HE-AAC, AAC-LE
        "ogg":      false,
        "wav":      false,
        "webm":     false
    };

// --- class / interfaces ----------------------------------
var methods = {
    "canMedia":                     Spec_canMedia,                      // Spec#canMedia(type:IgnoreCaseString):Boolean
    "isWebAudioCreateMediaStream":  Spec_isWebAudioCreateMediaStream,   // Spec#isWebAudioCreateMediaStream():Boolean
};

// --- implements ------------------------------------------
function Spec_canMedia(type) { // @arg IgnoreCaseString "audio", "video", "webaudio",
                               //                       "mp3", "mp4", "ogg", "wav", "webm"
                               // @ret Boolean
                               // @desc be capable of...
//{@dev
    $valid($type(type, "IgnoreCaseString"),                                Spec_canMedia, "type");
    $valid($some(type, "audio|video|webaudio|mp3|mp4|ogg|wav|webm", true), Spec_canMedia, "type");
//}@dev

    type = type.toLowerCase();

    if (!_ready.detected) {
        _detectMediaState(this);
    }

    switch (type) {
    case "audio": return _ready[type] && _some(false);
    case "video": return _ready[type] && _some(true);
    case "webaudio": return _ready[type] && _some(false);
    }
    return _ready[type] || false;
}

function _some(video) { // @arg Boolean = false
    var types = video ? VIDEO_MIME_TYPES : AUDIO_MIME_TYPES;

    for (var mime in types) {
        if (_ready[mime]) {
            return true;
        }
    }
    return false;
}

function _detectMediaState(that) {
    _ready.detected = true;

    var audio = null;
    var video = null;
    var audioContext = null;
    var type = "";

    try {
        if (global["HTMLAudioElement"]) {
            audio = document.createElement("audio");

            for (type in AUDIO_MIME_TYPES) {
                if ( audio["canPlayType"]( AUDIO_MIME_TYPES[type] ) ) {
                    _ready["audio"] = true;
                    _ready[type] = true;
                }
            }
        }
    } catch (o_o) { }
    audio = null; // [!] GC

    try {
        if (global["HTMLVideoElement"]) {
            video = document.createElement("video");

            for (type in VIDEO_MIME_TYPES) {
                if ( video["canPlayType"]( VIDEO_MIME_TYPES[type] ) ) {
                    _ready["video"] = true;
                    _ready[type] = true;
                }
            }
        }
    } catch (o_o) { }
    video = null; // [!] GC

    try {
        var AudioContext = global[ that.prefix(global, "AudioContext") ];

        if (AudioContext) {
            audioContext = new AudioContext();
            if (audioContext && audioContext["destination"]) {
                _ready["webaudio"] = true;
            }
        }
    } catch (o_o) { }
    audioContext = null; // [!] GC
}

function Spec_isWebAudioCreateMediaStream() { // @ret Boolean - support AudioContext#createMediaStreanSource
    if (!_ready.detected) {
        _detectMediaState(this);
    }
    var AudioContext = global[ this.prefix(global, "AudioContext") ];

    return "createMediaStreamSource" in AudioContext;
}

// --- validate / assertions -------------------------------
//{@dev
function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
//function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
function $some(val, str, ignore) { return global["Valid"] ? global["Valid"].some(val, str, ignore) : true; }
//function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- exports ---------------------------------------------
for (var name in methods) {
    global["Spec_" in global ? "Spec_" : "Spec"]["prototype"][name] = methods[name];
}

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule
//}@spec_media

