var ModuleTestSpec = (function(global) {

global["BENCHMARK"] = false;

var Spec = WebModule["Spec"];

var test = new Test("Spec", {
        disable:    false, // disable all tests.
        browser:    true,  // enable browser test.
        worker:     true,  // enable worker test.
        node:       true,  // enable node test.
        nw:         true,  // enable nw.js test.
        el:         true,  // enable Electron test.
        button:     true,  // show button.
        both:       true,  // test the primary and secondary modules.
        ignoreError:false, // ignore error.
        callback:   function() {
        },
        errorback:  function(error) {
        }
    }).add([
        // --- properties ---
        testSpec_UNKNOWN,
        testSpec_SOC,
        testSpec_GPU,
        testSpec_RAM,
        testSpec_BLE,
        testSpec_NFC,
        testSpec_ATOM,
        testSpec_SIMD,
        testSpec_MAX_THREADS,
        testSpec_MAX_TOUCH_POINTS,
        testSpec_MAX_TEXTURE_SIZE,
        testSpec_LOW_END,
        testSpec_OUTMODED,
        testSpec_H265,
        testSpec_ForceTouch,
        testSpec_ForceClick,
        // --- static methods ---
        testSpec_has,
        testSpec_dump_modern,
        testSpec_dump_lowend,
        testSpec_dump_outmoded,
        testSpec_dump_onehand,
        testSpec_dump_bothhands,
    ]);

if (IN_BROWSER || IN_NW) {
    test.add([
    ]);
} else if (IN_WORKER) {
    test.add([
        // worker test
    ]);
} else if (IN_NODE) {
    test.add([
        // node.js and io.js test
    ]);
}

// --- test cases ------------------------------------------
function testSpec_UNKNOWN(test, pass, miss) {
    // Android 4.4 is BLE READY
    // "Mozilla/5.0 (Linux; Android 4.4; Nexus 99 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    var spec1 = new Spec({ OS: "Android", OS_VERSION: "4.4.0", DEVICE: "Nexus 99" });

    if (spec1.UNKNOWN) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_SOC(test, pass, miss) {
    // Android 4.4 is BLE READY
    // "Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    var spec1 = new Spec({ OS: "Android", OS_VERSION: "4.4.0", DEVICE: "Nexus 5" });

    if (spec1.SOC === "MSM8974AA") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_GPU(test, pass, miss) {
    // Android 4.4 is BLE READY
    // "Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    var spec1 = new Spec({ OS: "Android", OS_VERSION: "4.4.0", DEVICE: "Nexus 5" });

    if (spec1.GPU === "ADRENO 330") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_RAM(test, pass, miss) {
    // Android 4.4 is BLE READY
    // "Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    var spec1 = new Spec({ OS: "Android", OS_VERSION: "4.4.0", DEVICE: "Nexus 5" });

    if (spec1.RAM === 2048) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_BLE(test, pass, miss) {
    // Android 4.4 is BLE READY
    // "Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    var spec1 = new Spec({ OS: "Android", OS_VERSION: "4.4.0", DEVICE: "Nexus 5" });

    // Android 4.2 is BLE NOT READY
    // "Mozilla/5.0 (Linux; Android 4.2; Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    var spec2 = new Spec({ OS: "Android", OS_VERSION: "4.2.0", DEVICE: "Nexus 5" });

    if (spec1.BLE && !spec2.BLE) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_NFC(test, pass, miss) {
    // SO-03E BLE READY
    // "Mozilla/5.0 (Linux; Android 4.4; SO-03E Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    var spec1 = new Spec({ OS: "Android", OS_VERSION: "4.4.4", DEVICE: "SO-03E" });

    // SH-07D BLE NOT READY
    // "Mozilla/5.0 (Linux; Android 4.2; SH-07D Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    var spec2 = new Spec({ OS: "Android", OS_VERSION: "4.2.0", DEVICE: "SH-07D" });

    if (spec1.NFC && !spec2.NFC) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_ATOM(test, pass, miss) {
    // AST21 is ATOM
    // "Mozilla/5.0 (Linux; Android 4.4; AST21 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    var spec1 = new Spec({ OS: "Android", OS_VERSION: "4.4.0", DEVICE: "AST21" });

    // SOT21 is NOT ATOM
    // "Mozilla/5.0 (Linux; Android 4.2; SOT21 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    var spec2 = new Spec({ OS: "Android", OS_VERSION: "4.2.0", DEVICE: "SOT21" });

    if (spec1.ATOM && !spec2.ATOM) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_SIMD(test, pass, miss) {
    // NW-Z1000Series is unsupportd SIMD(NEON)
    // "Mozilla/5.0 (Linux; Android 4.0.2; NW-Z1000Series Build/xxxx) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19";
    var spec1 = new Spec({ OS: "Android", OS_VERSION: "4.0.2", DEVICE: "NW-Z1000Series" });

    // Nexus 7 is supported SIMD(NEON)
    // "Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JWR66N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.111 Safari/537.36";
    var spec2 = new Spec({ OS: "Android", OS_VERSION: "4.3.0", DEVICE: "Nexus 7" });

    if (!spec1.SIMD && spec2.SIMD) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_MAX_THREADS(test, pass, miss) {
    var ua = new UserAgent();
    var spec = new Spec(ua);

    if (spec.MAX_THREADS >= 2) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_MAX_TOUCH_POINTS(test, pass, miss) {
    // Android 4.0 is MultiTouch READY
    // "Mozilla/5.0 (Linux; Android 4.0; Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    var spec1 = new Spec({ OS: "Android", OS_VERSION: "4.0.0", DEVICE: "Nexus 5" });

    // Android 2.3 is MultiTouch NOT READY
    // "Mozilla/5.0 (Linux; Android 2.3; Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    var spec2 = new Spec({ OS: "Android", OS_VERSION: "2.3.0", DEVICE: "Nexus 5" });

    if (spec1.MAX_TOUCH_POINTS >= 2 &&
        spec2.MAX_TOUCH_POINTS <  2) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_MAX_TEXTURE_SIZE(test, pass, miss) {
    // LGV32 is GPU_MAX_TEXTURE_SIZE = 16 * 1024
    // "Mozilla/5.0 (Linux; Android 4.0; LGV32 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    var spec1 = new Spec({ OS: "Android", OS_VERSION: "4.0.0", DEVICE: "LGV32" });

    // Galaxy S6 is GPU_MAX_TEXTURE_SIZE = 4 * 1024
    // "Mozilla/5.0 (Linux; Android 4.0; SC-05G Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    var spec2 = new Spec({ OS: "Android", OS_VERSION: "4.0.0", DEVICE: "SC-05G" });

    if (spec1.MAX_TEXTURE_SIZE === 16 * 1024 &&
        spec2.MAX_TEXTURE_SIZE ===  4 * 1024) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_LOW_END(test, pass, miss) {
    // SC-01E APQ8060 1.2GHz x 2 Cores -> LOW_END_CPU
    // "Mozilla/5.0 (Linux; Android 4.4; SC-01E Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    var spec1 = new Spec({ OS: "Android", OS_VERSION: "4.4.0", DEVICE: "SC-01E"  });

    // Nexus 7 (2012) T30L 1.3GHz x 4 Cores -> NOT LOW_END_CPU
    // "Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JWR66N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.111 Safari/537.36";
    var spec2 = new Spec({ OS: "Android", OS_VERSION: "4.3.0", DEVICE: "Nexus 7" });

    // Nexus 7 (2012) T30L 12.5 GFLOPS -> LOW_END_GPU
    // "Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JWR66N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.111 Safari/537.36";
    var spec3 = new Spec({ OS: "Android", OS_VERSION: "4.3.0", DEVICE: "Nexus 7" });

    // VAIO Phone MSM8916 ADRENO 306 21.6 GFLOPS -> NOT LOW_END_GPU
    // "Mozilla/5.0 (Linux; Android 4.4; VA-10 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    var spec4 = new Spec({ OS: "Android", OS_VERSION: "4.4.0", DEVICE: "VA-10"   });

    if (spec1.LOW_END && !spec2.LOW_END || spec3.LOW_END && !spec4.LOW_END) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_OUTMODED(test, pass, miss) {
    var stack = _save({ OUTMODED: 24 }); // 24 months

    var future_2017_03 = (new Date(2017, 2, 30)).getTime(); // 2017-03
    var future_2017_04 = (new Date(2017, 3, 30)).getTime(); // 2017-04

    // Nexus 7 2012-07 -> OUTMODED DEVICE
    // "Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JWR66N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.111 Safari/537.36";
    var spec1 = new Spec({ OS: "Android", OS_VERSION: "4.3.0", DEVICE: "Nexus 7" }, { DATE: future_2017_03 });

    // SH-04E 2013-01 and NOT VERSION UP -> MODERN DEVICE
    // "Mozilla/5.0 (Linux; Android 4.4; SH-04E Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    var spec2 = new Spec({ OS: "Android", OS_VERSION: "4.4.0", DEVICE: "SH-04E" }, { DATE: future_2017_03 });

    // 2015年03月に発売された VA-10J が2年後の2017年03月までは MODERN DEVICE として扱われる事を確認する
    // VA-10J 2015-03 -> MODERN DEVICE (expire 2017-03)
    // "Mozilla/5.0 (Linux; Android 4.4; VA-10J Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    var spec3 = new Spec({ OS: "Android", OS_VERSION: "4.4.0", DEVICE: "VA-10J" }, { DATE: future_2017_03 });

    // 2017年04月に VA-10J が OUTMODED DEVICE になる事を確認する
    // VA-10J 2015-03 -> MODERNOLD DEVICE (expire 2017-03)
    // "Mozilla/5.0 (Linux; Android 4.4; VA-10J Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
    var spec4 = new Spec({ OS: "Android", OS_VERSION: "4.4.0", DEVICE: "VA-10J" }, { DATE: future_2017_04 });

    _restore(stack);

    if (spec1.OUTMODED && spec2.OUTMODED && !spec3.OUTMODED && spec4.OUTMODED) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_has(test, pass, miss) {
    // Species
    // "Mozilla/5.0 (Linux; Android 6.0.5; en-us; Nexus Ace Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19";
    var ua = { OS: "Android", OS_VERSION: "6.0.5", DEVICE: "Nexus Ace" };

    if ( Spec.has(ua.DEVICE) ) {
        test.done(miss());
    } else {
        test.done(pass());
    }
}

function testSpec_dump_modern(test, pass, miss) {
    var stack = _save({ OUTMODED: 24 });
    var list = Spec.dump("modern");

    console.log(list.join(","));
    _restore(stack);

    if (list.length) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_dump_lowend(test, pass, miss) {
    var stack = _save({});
    var list = Spec.dump("lowend");

    console.log(list.join(","));
    _restore(stack);

    if (list.length) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_dump_outmoded(test, pass, miss) {
    var stack = _save({ OUTMODED: 24 });
    var list = Spec.dump("outdated");

    console.log(list.join(","));
    _restore(stack);

    if (list.length) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_dump_onehand(test, pass, miss) {
    var stack = _save({});
    var list = Spec.dump("onehand");

    console.log(list.join(","));
    _restore(stack);

    if (list.length) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_dump_bothhands(test, pass, miss) {
    var stack = _save({});
    var list = Spec.dump("bothhands");

    console.log(list.join(","));
    _restore(stack);

    if (list.length) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_H265(test, pass, miss) {
    var spec1 = new Spec({ OS: "Android", OS_VERSION: "6.0.0", DEVICE: "Nexus 5"  });
    var spec2 = new Spec({ OS: "Android", OS_VERSION: "6.0.0", DEVICE: "Nexus 5X" });
    var spec3 = new Spec({ OS: "Android", OS_VERSION: "6.0.0", DEVICE: "SOV31"    });

    if ( spec1.H265 === 0x00 && // Nexus 5 has not H.265 function
         spec2.H265 === 0x02 && // Nexus 5X has H.265 decoder
         spec3.H265 === 0x03) { // Xperia Z4 has H.265 encoder and decoder
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_ForceTouch(test, pass, miss) {
    var spec1 = new Spec({ OS: "iOS", DEVICE: "iPhone 6s"      });
    var spec2 = new Spec({ OS: "iOS", DEVICE: "iPhone 6s Plus" });
    var spec3 = new Spec({ OS: "iOS", DEVICE: "iPhone 6" });

    if ( spec1.FORCE_TOUCH &&
         spec2.FORCE_TOUCH &&
        !spec3.FORCE_TOUCH) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSpec_ForceClick(test, pass, miss) {
    var spec1 = new Spec({ OS: "iOS", DEVICE: "iPhone 6s"      });
    var spec2 = new Spec({ OS: "iOS", DEVICE: "iPhone 6s Plus" });
    var spec3 = new Spec({ OS: "iOS", DEVICE: "iPhone 6" });

    if ( spec1.FORCE_CLICK &&
         spec2.FORCE_CLICK &&
        !spec3.FORCE_CLICK) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function _save(keyValue) {
    var stack = JSON.parse(JSON.stringify(Spec["THRESHOLD"]));

    for (var id in keyValue) {
        Spec["THRESHOLD"][id] = keyValue[id];
    }
    return stack;
}

function _restore(stack) {
    Spec["THRESHOLD"] = stack;
}

return test.run();

})(GLOBAL);

