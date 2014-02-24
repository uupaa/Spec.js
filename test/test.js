new Test().add([
        testSpec,
        testSpecWithUserAgent,
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

function testSpecWithUserAgent(next) {
    var ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25";
    var spec = Spec({ ua: ua });

    if (spec.BROWSER.USER_AGENT === ua) {
        console.log("testSpecWithUserAgent ok.");
        next && next.pass();
    } else {
        console.log("testSpecWithUserAgent ng.");
        next && next.miss();
    }
}

