;
! function() {
    try {
        var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {},
            n = (new e.Error).stack;
        n && ((e._debugIds || (e._debugIds = {}))[n] = "cc66c8d8-de4e-40d5-da09-4a83ab566b11")
    } catch (e) {}
}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 110335, o => {
    "use strict";
    var t = o.i(253719),
        e = o.i(517387),
        a = o.i(296809),
        l = o.i(978939),
        n = o.i(710842);
    let r = ["-ooooooooooo-", "-oo-------oo-", "ooo-------ooo", "-oo-------oo-", "-oo-------oo-"],
        i = [
            ["---ooooooo---", "--o-------o--", "--o-------o--", "--o-------o--", "--o-------o--"],
            ["--o-------o--", "-o---------o-", "-o---------o-", "-o---------o-", "-o---------o-"],
            ["-o---------o-", "-------------", "o-----------o", "-------------", "-------------"],
            ["-------------", "-------------", "o-----------o", "-------------", "-------------"]
        ],
        h = o => {
            let t = [],
                e = [];
            for (let a = 0; a < r.length; a++) {
                let i = r[a];
                for (let r = 0; r < i.length; r++) "o" === i[r] && (t.push((0, l.default)({ ...o,
                    x: 101 * r,
                    y: 101 * a
                })), e.push({
                    cell: function(o) {
                        let t = (0, n.default)({
                            app: o.app,
                            x: o.x + .5,
                            y: o.y + .5,
                            width: 101,
                            height: 101,
                            radius: 0,
                            alpha: 0,
                            color: 0,
                            centering: !1
                        });
                        return o.app.stage.addChild(t.graphic), {
                            trigger: async () => {
                                let o = 0,
                                    e = async () => {
                                        await t.animate({
                                            alpha: .04 * Math.random()
                                        }, {
                                            ease: "linear",
                                            duration: .03
                                        }), o < 5 ? (o += 1, e()) : (await t.animate({
                                            alpha: 0
                                        }), t.graphic.destroy())
                                    };
                                e()
                            }
                        }
                    }({ ...o,
                        x: 101 * r,
                        y: 101 * a
                    }),
                    row: a,
                    column: r
                }))
            }
            let h = () => (0, a.default)({
                element: o.canvas,
                callback: () => {
                    let o = t[Math.floor(Math.random() * t.length)];
                    o && o.trigger().then(() => h())
                },
                timeout: 3e3 * Math.random()
            });
            for (let o = 0; o < 5; o++) h();
            let c = -1,
                s = () => {
                    c += 1;
                    for (let o = 0; o < i[c].length; o++) {
                        let t = i[c][o];
                        for (let a = 0; a < t.length; a++) "o" === t[a] && e.find(t => t.row === o && t.column === a) ? .cell.trigger()
                    }
                    c < i.length - 1 && setTimeout(() => {
                        s()
                    }, 150)
                };
            s()
        };

    function c() {
        return (0, t.jsx)(e.default, {
            canvasAttrs: {
                className: "cw-[1314px] h-506 absolute top-100 lg-max:hidden"
            },
            initOptions: {
                backgroundAlpha: 0
            },
            smartStop: !1,
            tickers: [h]
        })
    }
    o.s(["default", () => c], 110335)
}, 159887, o => {
    o.n(o.i(110335))
}]);

//# debugId=cc66c8d8-de4e-40d5-da09-4a83ab566b11
//# sourceMappingURL=d582f64f49ebafda.js.map