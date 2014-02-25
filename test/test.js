new Test().add([
        testSpec,
        testSpecOverrideUserAgent,
        testSpecOverrideDeviceInfo,
    ]).run().worker(function(err, test) {
        if (!err) {
            var undo = Test.swap(Spec, Spec_);

            new Test(test).run(function(err, test) {
                undo = Test.undo(undo);
            });
        }
    });

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
        console.log("testSpecOverrideUserAgent ng.");
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
        console.log("testSpecOverrideDeviceInfo ng.");
        next && next.miss();
    }
}

