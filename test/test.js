var ModuleTest = (function(global) {

return new Test({
        disable:    false,
        node:       true,
        browser:    true,
        worker:     true,
        button:     true,
        both:       true,
        primary:    global["Spec"],
        secondary:  global["Spec_"],
    }).add([
        testSpec,
        testSpecOverrideUserAgent,
        testSpecOverrideDeviceInfo,
        testSpec_normalizeVersionString,
    ]).run().clone();

function testSpec(next) {
    var spec = Spec();

    console.log("testSpec ok.");
    next && next.pass();
}

function testSpecOverrideUserAgent(next) {
    var ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25";
    var spec = Spec({ USER_AGENT: ua });

    if (spec.BROWSER.USER_AGENT === ua) {
        console.log("testSpecOverrideUserAgent ok.");
        next && next.pass();
    } else {
        console.error("testSpecOverrideUserAgent ng.");
        next && next.miss();
    }
}

function testSpecOverrideDeviceInfo(next) {
    var ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25";
    var info = { devicePixelRatio: 2 };
    var spec = Spec({ USER_AGENT: ua, DEVICE_INFO: info });

    if (spec.DEVICE.INFO.devicePixelRatio === info.devicePixelRatio) {
        console.log("testSpecOverrideDeviceInfo ok.");
        next && next.pass();
    } else {
        console.error("testSpecOverrideDeviceInfo ng.");
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
        console.log("testSpec_normalizeVersionString ok.");
        next && next.pass();
    } else {
        console.error("testSpec_normalizeVersionString ng.");
        next && next.miss();
    }
}

})((this || 0).self || global);

