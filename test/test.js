var ModuleTestSpec = (function(global) {

var _inNode    = "process"        in global;
var _inWorker  = "WorkerLocation" in global;
var _inBrowser = "document"       in global;

return new Test("Spec", {
        disable:    false,
        browser:    true,
        worker:     true,
        node:       true,
        button:     true,
        both:       true,
    }).add([
        testSpec,
        testSpecOverrideUserAgent,
        testSpecOverrideDeviceInfo,
        testSpec_normalizeVersionString,
    ]).run().clone();

function testSpec(next) {
    var spec = Spec();

    next && next.pass();
}

function testSpecOverrideUserAgent(next) {
    var ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25";
    var spec = Spec({ USER_AGENT: ua });

    if (spec.BROWSER.USER_AGENT === ua) {
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testSpecOverrideDeviceInfo(next) {
    var ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25";
    var info = { devicePixelRatio: 2 };
    var spec = Spec({ USER_AGENT: ua, DEVICE_INFO: info });

    if (spec.DEVICE.INFO.devicePixelRatio === info.devicePixelRatio) {
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testSpec_normalizeVersionString(next) {
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
        next && next.pass();
    } else {
        next && next.miss();
    }
}

})((this || 0).self || global);

