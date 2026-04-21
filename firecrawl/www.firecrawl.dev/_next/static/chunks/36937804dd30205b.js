;
! function() {
    try {
        var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {},
            n = (new e.Error).stack;
        n && ((e._debugIds || (e._debugIds = {}))[n] = "069edb3c-d685-8d58-9641-24500778ce65")
    } catch (e) {}
}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 796620, e => {
    "use strict";
    e.i(638440);
    var n = e.i(253719),
        t = e.i(730592),
        r = e.i(232181),
        a = e.i(912826),
        i = e.i(480637),
        s = e.i(156485),
        o = e.i(443390),
        l = t,
        c = e.i(346835);
    class u extends l.Component {
        getSnapshotBeforeUpdate(e) {
            let n = this.props.childRef.current;
            if (n && e.isPresent && !this.props.isPresent) {
                let e = n.offsetParent,
                    t = (0, o.isHTMLElement)(e) && e.offsetWidth || 0,
                    r = this.props.sizeRef.current;
                r.height = n.offsetHeight || 0, r.width = n.offsetWidth || 0, r.top = n.offsetTop, r.left = n.offsetLeft, r.right = t - r.width - r.left
            }
            return null
        }
        componentDidUpdate() {}
        render() {
            return this.props.children
        }
    }

    function d({
        children: e,
        isPresent: t,
        anchorX: r,
        root: a
    }) {
        let i = (0, l.useId)(),
            s = (0, l.useRef)(null),
            o = (0, l.useRef)({
                width: 0,
                height: 0,
                top: 0,
                left: 0,
                right: 0
            }),
            {
                nonce: d
            } = (0, l.useContext)(c.MotionConfigContext);
        return (0, l.useInsertionEffect)(() => {
            let {
                width: e,
                height: n,
                top: l,
                left: c,
                right: u
            } = o.current;
            if (t || !s.current || !e || !n) return;
            let f = "left" === r ? `left: ${c}` : `right: ${u}`;
            s.current.dataset.motionPopId = i;
            let _ = document.createElement("style");
            d && (_.nonce = d);
            let h = a ? ? document.head;
            return h.appendChild(_), _.sheet && _.sheet.insertRule(`
          [data-motion-pop-id="${i}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${n}px !important;
            ${f}px !important;
            top: ${l}px !important;
          }
        `), () => {
                h.contains(_) && h.removeChild(_)
            }
        }, [t]), (0, n.jsx)(u, {
            isPresent: t,
            childRef: s,
            sizeRef: o,
            children: l.cloneElement(e, {
                ref: s
            })
        })
    }
    let f = ({
        children: e,
        initial: r,
        isPresent: i,
        onExitComplete: o,
        custom: l,
        presenceAffectsLayout: c,
        mode: u,
        anchorX: f,
        root: h
    }) => {
        let p = (0, a.useConstant)(_),
            v = (0, t.useId)(),
            m = !0,
            g = (0, t.useMemo)(() => (m = !1, {
                id: v,
                initial: r,
                isPresent: i,
                custom: l,
                onExitComplete: e => {
                    for (let n of (p.set(e, !0), p.values()))
                        if (!n) return;
                    o && o()
                },
                register: e => (p.set(e, !1), () => p.delete(e))
            }), [i, p, o]);
        return c && m && (g = { ...g
        }), (0, t.useMemo)(() => {
            p.forEach((e, n) => p.set(n, !1))
        }, [i]), t.useEffect(() => {
            i || p.size || !o || o()
        }, [i]), "popLayout" === u && (e = (0, n.jsx)(d, {
            isPresent: i,
            anchorX: f,
            root: h,
            children: e
        })), (0, n.jsx)(s.PresenceContext.Provider, {
            value: g,
            children: e
        })
    };

    function _() {
        return new Map
    }
    var h = e.i(177426);
    let p = e => e.key || "";

    function v(e) {
        let n = [];
        return t.Children.forEach(e, e => {
            (0, t.isValidElement)(e) && n.push(e)
        }), n
    }
    let m = ({
        children: e,
        custom: s,
        initial: o = !0,
        onExitComplete: l,
        presenceAffectsLayout: c = !0,
        mode: u = "sync",
        propagate: d = !1,
        anchorX: _ = "left",
        root: m
    }) => {
        let [g, x] = (0, h.usePresence)(d), w = (0, t.useMemo)(() => v(e), [e]), b = d && !g ? [] : w.map(p), y = (0, t.useRef)(!0), C = (0, t.useRef)(w), j = (0, a.useConstant)(() => new Map), [E, L] = (0, t.useState)(w), [k, N] = (0, t.useState)(w);
        (0, i.useIsomorphicLayoutEffect)(() => {
            y.current = !1, C.current = w;
            for (let e = 0; e < k.length; e++) {
                let n = p(k[e]);
                b.includes(n) ? j.delete(n) : !0 !== j.get(n) && j.set(n, !1)
            }
        }, [k, b.length, b.join("-")]);
        let R = [];
        if (w !== E) {
            let e = [...w];
            for (let n = 0; n < k.length; n++) {
                let t = k[n],
                    r = p(t);
                b.includes(r) || (e.splice(n, 0, t), R.push(t))
            }
            return "wait" === u && R.length && (e = R), N(v(e)), L(w), null
        }
        let {
            forceRender: M
        } = (0, t.useContext)(r.LayoutGroupContext);
        return (0, n.jsx)(n.Fragment, {
            children: k.map(e => {
                let t = p(e),
                    r = (!d || !!g) && (w === k || b.includes(t));
                return (0, n.jsx)(f, {
                    isPresent: r,
                    initial: (!y.current || !!o) && void 0,
                    custom: s,
                    presenceAffectsLayout: c,
                    mode: u,
                    root: m,
                    onExitComplete: r ? void 0 : () => {
                        if (!j.has(t)) return;
                        j.set(t, !0);
                        let e = !0;
                        j.forEach(n => {
                            n || (e = !1)
                        }), e && (M ? .(), N(C.current), d && x ? .(), l && l())
                    },
                    anchorX: _,
                    children: e
                }, t)
            })
        })
    };
    e.s(["AnimatePresence", () => m], 796620)
}, 872969, (e, n, t) => {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = {
        callServer: function() {
            return i.callServer
        },
        createServerReference: function() {
            return o.createServerReference
        },
        findSourceMapURL: function() {
            return s.findSourceMapURL
        }
    };
    for (var a in r) Object.defineProperty(t, a, {
        enumerable: !0,
        get: r[a]
    });
    let i = e.r(82924),
        s = e.r(245010),
        o = e.r(281497)
}, 624609, e => {
    "use strict";
    let n = (0, e.i(486856).default)("arrow-up-right", [
        ["path", {
            d: "M7 7h10v10",
            key: "1tivn9"
        }],
        ["path", {
            d: "M7 17 17 7",
            key: "1vkiza"
        }]
    ]);
    e.s(["ArrowUpRight", () => n], 624609)
}, 351853, (e, n, t) => {
    var r = 0 / 0,
        a = /^\s+|\s+$/g,
        i = /^[-+]0x[0-9a-f]+$/i,
        s = /^0b[01]+$/i,
        o = /^0o[0-7]+$/i,
        l = parseInt,
        c = e.g && e.g.Object === Object && e.g,
        u = "object" == typeof self && self && self.Object === Object && self,
        d = c || u || Function("return this")(),
        f = Object.prototype.toString,
        _ = Math.max,
        h = Math.min,
        p = function() {
            return d.Date.now()
        };

    function v(e) {
        var n = typeof e;
        return !!e && ("object" == n || "function" == n)
    }

    function m(e) {
        if ("number" == typeof e) return e;
        if ("symbol" == typeof(n = e) || n && "object" == typeof n && "[object Symbol]" == f.call(n)) return r;
        if (v(e)) {
            var n, t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = v(t) ? t + "" : t
        }
        if ("string" != typeof e) return 0 === e ? e : +e;
        e = e.replace(a, "");
        var c = s.test(e);
        return c || o.test(e) ? l(e.slice(2), c ? 2 : 8) : i.test(e) ? r : +e
    }
    n.exports = function(e, n, t) {
        var r, a, i, s, o, l, c = 0,
            u = !1,
            d = !1,
            f = !0;
        if ("function" != typeof e) throw TypeError("Expected a function");

        function g(n) {
            var t = r,
                i = a;
            return r = a = void 0, c = n, s = e.apply(i, t)
        }

        function x(e) {
            var t = e - l,
                r = e - c;
            return void 0 === l || t >= n || t < 0 || d && r >= i
        }

        function w() {
            var e, t, r, a = p();
            if (x(a)) return b(a);
            o = setTimeout(w, (e = a - l, t = a - c, r = n - e, d ? h(r, i - t) : r))
        }

        function b(e) {
            return (o = void 0, f && r) ? g(e) : (r = a = void 0, s)
        }

        function y() {
            var e, t = p(),
                i = x(t);
            if (r = arguments, a = this, l = t, i) {
                if (void 0 === o) return c = e = l, o = setTimeout(w, n), u ? g(e) : s;
                if (d) return o = setTimeout(w, n), g(l)
            }
            return void 0 === o && (o = setTimeout(w, n)), s
        }
        return n = m(n) || 0, v(t) && (u = !!t.leading, i = (d = "maxWait" in t) ? _(m(t.maxWait) || 0, n) : i, f = "trailing" in t ? !!t.trailing : f), y.cancel = function() {
            void 0 !== o && clearTimeout(o), c = 0, r = l = a = o = void 0
        }, y.flush = function() {
            return void 0 === o ? s : b(p())
        }, y
    }
}, 536925, e => {
    "use strict";
    var n = e.i(730592);
    e.i(351853);
    var t = "u" > typeof window ? n.useLayoutEffect : n.useEffect,
        r = "u" < typeof window;

    function a(e, {
        defaultValue: i = !1,
        initializeWithValue: s = !0
    } = {}) {
        let o = e => r ? i : window.matchMedia(e).matches,
            [l, c] = (0, n.useState)(() => s ? o(e) : i);

        function u() {
            c(o(e))
        }
        return t(() => {
            let n = window.matchMedia(e);
            return u(), n.addListener ? n.addListener(u) : n.addEventListener("change", u), () => {
                n.removeListener ? n.removeListener(u) : n.removeEventListener("change", u)
            }
        }, [e]), l
    }
    e.s(["useMediaQuery", () => a])
}, 924192, e => {
    "use strict";
    var n = e.i(253719),
        t = e.i(599926),
        r = e.i(730592);
    let a = (0, r.createContext)(void 0);
    e.s(["HeaderProvider", 0, ({
        children: e
    }) => {
        let [i, s] = (0, r.useState)(null), [o, l] = (0, r.useState)(0), c = (0, r.useRef)(0), u = (0, r.useRef)(0), d = (0, t.usePathname)(), f = (0, r.useRef)(null), _ = () => {
            f.current && clearTimeout(f.current)
        };
        return (0, r.useEffect)(() => {
            s(null)
        }, [d]), (0, r.useEffect)(() => {
            let e = document.querySelector(".header");
            if (e) {
                let n = new ResizeObserver(e => {
                    for (let n of e) c.current = n.contentRect.height
                });
                n.observe(e), c.current = e.clientHeight, u.current = e.getBoundingClientRect().top;
                let t = () => {
                    u.current = e.getBoundingClientRect().top
                };
                return window.addEventListener("scroll", t, {
                    passive: !0
                }), () => {
                    n.disconnect(), window.removeEventListener("scroll", t)
                }
            }
        }, [d]), (0, n.jsx)(a.Provider, {
            value: {
                dropdownContent: i,
                setDropdownContent: e => {
                    _(), e !== i && (l(e => e + 1), s(e))
                },
                clearDropdown: e => {
                    e ? s(null) : (f.current && clearTimeout(f.current), f.current = window.setTimeout(() => {
                        s(null)
                    }, 500))
                },
                resetDropdownTimeout: _,
                dropdownKey: o,
                headerHeight: c,
                headerTop: u
            },
            children: e
        })
    }, "useHeaderContext", 0, () => {
        let e = (0, r.useContext)(a);
        if (!e) throw Error("useHeaderContext must be used within a HeaderProvider");
        return e
    }, "useHeaderHeight", 0, () => {
        let [e, n] = (0, r.useState)(0);
        return (0, r.useEffect)(() => {
            let e = document.querySelector(".header");
            if (e) {
                let t = new ResizeObserver(e => {
                    for (let t of e) n(t.contentRect.height)
                });
                return t.observe(e), n(e.clientHeight), () => {
                    t.disconnect()
                }
            }
        }, []), {
            headerHeight: e
        }
    }])
}, 803296, (e, n, t) => {
    n.exports = e.r(55241)
}, 119654, e => {
    "use strict";
    var n = e.i(253719),
        t = e.i(154712),
        r = e.i(730592),
        a = e.i(420851),
        i = e.i(672154);

    function s({
        active: e,
        alwaysHeat: s = !1,
        triggerOnHover: o = !1,
        size: l = 20
    }) {
        let c = (0, r.useRef)(null),
            u = (0, r.useRef)({
                activate: () => {},
                deactivate: () => {}
            });
        return (0, r.useEffect)(() => {
            let e = c.current;
            if (!e) return;
            let n = (0, i.default)(e),
                r = !1,
                a = !1,
                s = 0,
                d = [.4, .04, .2, .4, .2, 0, 0, .04, .04, 0, 0, .2, .4, .2, .04, .4],
                f = Array.from({
                    length: 16
                }, () => .2 + .2 * Math.random()),
                _ = l / 20,
                h = () => {
                    n.fillStyle = "#FF4C00", n.clearRect(0, 0, e.width, e.height);
                    for (let e = 0; e < 16; e++)[5, 6, 9, 10].includes(e) || (n.globalAlpha = d[e] + s * f[e], n.globalAlpha = Math.min(n.globalAlpha, .4) - Math.max(n.globalAlpha - .4, 0), n.fillRect((3 + e % 4 * 4) * _, (3 + 4 * Math.floor(e / 4)) * _, 2 * _, 2 * _));
                    n.globalAlpha = 1, n.fillRect(7 * _, 7 * _, 6 * _, 2 * _), n.globalAlpha = .4, n.fillRect(7 * _, 11 * _, (2 + 4 * s) * _, 2 * _), r && requestAnimationFrame(h)
                },
                p = [],
                v = 0,
                m = () => {
                    r = !0, (0, t.animate)(s, 1, {
                        duration: .3,
                        onUpdate: e => {
                            s = e < .5 ? 2 * e : 1 - (e - .5) * 2
                        }
                    }), p.forEach(e => {
                        window.clearTimeout(e)
                    }), p.push(window.setTimeout(() => {
                        r = !1
                    }, 300)), 3 !== (v += 1) && a && p.push(window.setTimeout(() => {
                        m()
                    }, 300))
                };
            if (u.current = {
                    activate: () => {
                        a || (a = !0, v = 0, m(), h())
                    },
                    deactivate: () => {
                        a && (a = !1)
                    }
                }, h(), e.addEventListener("resize", h), o) {
                let e = c.current.closest(".group");
                if (e) return e.addEventListener("mouseenter", u.current.activate), e.addEventListener("mouseleave", u.current.deactivate), () => {
                    e.removeEventListener("mouseenter", u.current.activate), e.removeEventListener("mouseleave", u.current.deactivate)
                }
            }
        }, [l, o]), (0, r.useEffect)(() => {
            if (o) return;
            let n = new IntersectionObserver(([n]) => {
                n.isIntersecting && e ? u.current.activate() : u.current.deactivate()
            }, {
                threshold: .5
            });
            return n.observe(c.current), () => {
                n.disconnect()
            }
        }, [e, o]), (0, n.jsx)("canvas", {
            className: (0, a.cn)(s ? "" : ["[&.grayscale]:opacity-60 transition-[filter,opacity]", !e && "grayscale"]),
            ref: c,
            style: {
                width: l,
                height: l
            }
        })
    }
    e.s(["default", () => s])
}, 418890, e => {
    "use strict";
    e.s(["default", 0, function(e) {
        var n = typeof e;
        return null != e && ("object" == n || "function" == n)
    }])
}, 961502, 268890, e => {
    "use strict";
    var n = e.g && e.g.Object === Object && e.g;
    e.s(["default", 0, n], 268890);
    var t = "object" == typeof self && self && self.Object === Object && self,
        r = n || t || Function("return this")();
    e.s(["default", 0, r], 961502)
}, 717235, 112380, e => {
    "use strict";
    var n = e.i(961502);
    e.s(["default", 0, function() {
        return n.default.Date.now()
    }], 717235);
    var t = /\s/;
    let r = function(e) {
        for (var n = e.length; n-- && t.test(e.charAt(n)););
        return n
    };
    var a = /^\s+/;
    e.s(["default", 0, function(e) {
        return e ? e.slice(0, r(e) + 1).replace(a, "") : e
    }], 112380)
}, 239780, 192595, 104979, 161184, e => {
    "use strict";
    var n = e.i(961502).default.Symbol;
    e.s(["default", 0, n], 192595);
    var t = Object.prototype,
        r = t.hasOwnProperty,
        a = t.toString,
        i = n ? n.toStringTag : void 0;
    let s = function(e) {
        var n = r.call(e, i),
            t = e[i];
        try {
            e[i] = void 0;
            var s = !0
        } catch (e) {}
        var o = a.call(e);
        return s && (n ? e[i] = t : delete e[i]), o
    };
    var o = Object.prototype.toString,
        l = n ? n.toStringTag : void 0;
    let c = function(e) {
        return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : l && l in Object(e) ? s(e) : o.call(e)
    };
    e.s(["default", 0, c], 104979);
    let u = function(e) {
        return null != e && "object" == typeof e
    };
    e.s(["default", 0, u], 161184), e.s(["default", 0, function(e) {
        return "symbol" == typeof e || u(e) && "[object Symbol]" == c(e)
    }], 239780)
}, 672154, e => {
    "use strict";
    var n = e.i(418890),
        t = e.i(717235),
        r = e.i(112380),
        a = e.i(239780),
        i = 0 / 0,
        s = /^[-+]0x[0-9a-f]+$/i,
        o = /^0b[01]+$/i,
        l = /^0o[0-7]+$/i,
        c = parseInt;
    let u = function(e) {
        if ("number" == typeof e) return e;
        if ((0, a.default)(e)) return i;
        if ((0, n.default)(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = (0, n.default)(t) ? t + "" : t
        }
        if ("string" != typeof e) return 0 === e ? e : +e;
        e = (0, r.default)(e);
        var u = o.test(e);
        return u || l.test(e) ? c(e.slice(2), u ? 2 : 8) : s.test(e) ? i : +e
    };
    var d = Math.max,
        f = Math.min;
    let _ = function(e, r, a) {
        var i, s, o, l, c, _, h = 0,
            p = !1,
            v = !1,
            m = !0;
        if ("function" != typeof e) throw TypeError("Expected a function");

        function g(n) {
            var t = i,
                r = s;
            return i = s = void 0, h = n, l = e.apply(r, t)
        }

        function x(e) {
            var n = e - _,
                t = e - h;
            return void 0 === _ || n >= r || n < 0 || v && t >= o
        }

        function w() {
            var e, n, a, i = (0, t.default)();
            if (x(i)) return b(i);
            c = setTimeout(w, (e = i - _, n = i - h, a = r - e, v ? f(a, o - n) : a))
        }

        function b(e) {
            return (c = void 0, m && i) ? g(e) : (i = s = void 0, l)
        }

        function y() {
            var e, n = (0, t.default)(),
                a = x(n);
            if (i = arguments, s = this, _ = n, a) {
                if (void 0 === c) return h = e = _, c = setTimeout(w, r), p ? g(e) : l;
                if (v) return clearTimeout(c), c = setTimeout(w, r), g(_)
            }
            return void 0 === c && (c = setTimeout(w, r)), l
        }
        return r = u(r) || 0, (0, n.default)(a) && (p = !!a.leading, o = (v = "maxWait" in a) ? d(u(a.maxWait) || 0, r) : o, m = "trailing" in a ? !!a.trailing : m), y.cancel = function() {
            void 0 !== c && clearTimeout(c), h = 0, i = _ = s = c = void 0
        }, y.flush = function() {
            return void 0 === c ? l : b((0, t.default)())
        }, y
    };
    e.s(["default", 0, e => {
        let {
            width: n,
            height: t
        } = e.getBoundingClientRect(), r = e.getContext("2d");
        e.style.width = `${n}px`, e.style.height = `${t}px`;
        let a = () => {
            let a = window.visualViewport ? .scale || 1,
                i = (window.devicePixelRatio || 1) * a;
            e.width = n * i, e.height = t * i, r.scale(i, i), e.dispatchEvent(new Event("resize"))
        };
        a();
        let i = _(a, 500);
        return window.addEventListener("resize", i), window.visualViewport ? .addEventListener("resize", i), r
    }], 672154)
}, 512022, e => {
    "use strict";
    var n = e.i(253719),
        t = e.i(154712),
        r = e.i(730592),
        a = e.i(420851),
        i = e.i(672154);

    function s({
        active: e,
        disabledCells: s,
        alwaysHeat: o = !1,
        triggerOnHover: l = !1,
        size: c = 20
    }) {
        let u = (0, r.useRef)(null),
            d = (0, r.useRef)({
                activate: () => {},
                deactivate: () => {}
            });
        return (0, r.useEffect)(() => {
            let e = u.current;
            if (!e) return;
            let n = (0, i.default)(e),
                r = !1,
                a = !1,
                o = 2,
                f = [.2, .4, 1, .12],
                _ = c / 20,
                h = () => {
                    n.fillStyle = "#FF4C00", n.clearRect(0, 0, e.width, e.height);
                    for (let e = 0; e < 16; e++) s && s.includes(e) || (n.globalAlpha = f[Math.floor(e / 4)], n.fillRect((3 + e % 4 * 4) * _, (3 + 4 * Math.floor(e / 4)) * _, 2 * _, 2 * _));
                    r && requestAnimationFrame(h)
                },
                p = [],
                v = 0,
                m = () => {
                    r = !0, o = (o + 1) % 5, f.forEach((e, n) => {
                        let r = e;
                        n === o ? r = 1 : n === (o + 1) % 4 ? r = .12 : n === (o + 2) % 4 ? r = .2 : n === (o + 3) % 4 && (r = .4), (0, t.animate)(e, r, {
                            duration: .05,
                            onUpdate: e => {
                                f[n] = e
                            }
                        })
                    }), p.forEach(e => {
                        window.clearTimeout(e)
                    }), p.push(window.setTimeout(() => {
                        r = !1
                    }, 400)), 3 === o && (v += 1), (2 !== v && a || 2 !== o) && p.push(window.setTimeout(() => {
                        m()
                    }, 50))
                };
            if (d.current = {
                    activate: () => {
                        a || (a = !0, v = 0, m(), h())
                    },
                    deactivate: () => {
                        a && (a = !1)
                    }
                }, h(), e.addEventListener("resize", h), l) {
                let e = u.current.closest(".group");
                if (e) return e.addEventListener("mouseenter", d.current.activate), e.addEventListener("mouseleave", d.current.deactivate), () => {
                    e.removeEventListener("mouseenter", d.current.activate), e.removeEventListener("mouseleave", d.current.deactivate)
                }
            }
        }, [s, c, l]), (0, r.useEffect)(() => {
            if (l) return;
            let n = new IntersectionObserver(([n]) => {
                n.isIntersecting && e ? d.current.activate() : d.current.deactivate()
            }, {
                threshold: .5
            });
            return n.observe(u.current), () => {
                n.disconnect()
            }
        }, [e, l]), (0, n.jsx)("canvas", {
            className: (0, a.cn)(o ? "" : ["[&.grayscale]:opacity-60 transition-[filter,opacity]", !e && "grayscale"]),
            ref: u,
            style: {
                width: c,
                height: c
            }
        })
    }
    e.s(["default", () => s])
}, 427286, e => {
    "use strict";
    var n = e.i(253719),
        t = e.i(420851),
        r = e.i(672154),
        a = e.i(154712),
        i = e.i(730592);

    function s({
        active: e,
        alwaysHeat: s = !1,
        triggerOnHover: o = !1,
        disabledCells: l = [],
        size: c = 20
    }) {
        let u = (0, i.useRef)(null),
            d = (0, i.useRef)({
                activate: () => {},
                deactivate: () => {}
            });
        return (0, i.useEffect)(() => {
            let e = u.current;
            if (!e) return;
            let n = (0, r.default)(e),
                t = !1,
                i = !1,
                s = 0,
                f = [0, .2, .4, 0, .4, 1, .4, .2, .2, .4, 1, .4, 0, .4, .2, 0],
                _ = Array.from({
                    length: 16
                }, () => .2 + .2 * Math.random());
            _[5] = .6, _[6] = .6, _[9] = .6, _[10] = .6;
            let h = c / 20,
                p = () => {
                    n.fillStyle = "#FF4C00", n.clearRect(0, 0, e.width, e.height);
                    for (let e = 0; e < 16; e++) {
                        if ([0, 3, 12, 15].includes(e) || l && l.includes(e)) continue;
                        let t = [5, 6, 9, 10].includes(e) ? 1 : .4,
                            r = f[e] + s * _[e];
                        n.globalAlpha = Math.min(Math.min(r, t) - Math.max(r - t, 0), 1), n.fillRect((3 + e % 4 * 4) * h, (3 + 4 * Math.floor(e / 4)) * h, 2 * h, 2 * h)
                    }
                    t && requestAnimationFrame(p)
                },
                v = [],
                m = 0,
                g = () => {
                    t = !0, (0, a.animate)(s, 1, {
                        duration: .3,
                        onUpdate: e => {
                            s = e < .5 ? 2 * e : 1 - (e - .5) * 2
                        }
                    }), v.forEach(e => {
                        window.clearTimeout(e)
                    }), v.push(window.setTimeout(() => {
                        t = !1
                    }, 300)), 3 !== (m += 1) && i && v.push(window.setTimeout(() => {
                        g()
                    }, 300))
                };
            if (d.current = {
                    activate: () => {
                        i || (i = !0, m = 0, g(), p())
                    },
                    deactivate: () => {
                        i && (i = !1)
                    }
                }, p(), e.addEventListener("resize", p), o) {
                let e = u.current.closest(".group");
                if (e) return e.addEventListener("mouseenter", d.current.activate), e.addEventListener("mouseleave", d.current.deactivate), () => {
                    e.removeEventListener("mouseenter", d.current.activate), e.removeEventListener("mouseleave", d.current.deactivate)
                }
            }
        }, [l, c, o]), (0, i.useEffect)(() => {
            if (o) return;
            let n = new IntersectionObserver(([n]) => {
                n.isIntersecting && e ? d.current.activate() : d.current.deactivate()
            }, {
                threshold: .5
            });
            return n.observe(u.current), () => {
                n.disconnect()
            }
        }, [e, o]), (0, n.jsx)("canvas", {
            ref: u,
            style: {
                width: c,
                height: c
            },
            className: (0, t.cn)(s ? "" : ["[&.grayscale]:opacity-60 transition-[filter,opacity]", !e && "grayscale"])
        })
    }
    e.s(["default", () => s])
}, 921936, e => {
    "use strict";
    var n = e.i(253719),
        t = e.i(154712),
        r = e.i(730592),
        a = e.i(420851),
        i = e.i(672154);

    function s({
        active: e,
        alwaysHeat: s = !1,
        triggerOnHover: o = !1,
        size: l = 20
    }) {
        let c = (0, r.useRef)(null),
            u = (0, r.useRef)({
                activate: () => {},
                deactivate: () => {}
            });
        return (0, r.useEffect)(() => {
            let e = c.current;
            if (!e) return;
            let n = (0, i.default)(e),
                r = !1,
                a = !1,
                s = 0,
                d = [.2, .4, 1, .04],
                f = [
                    [24],
                    [16, 18, 30, 32],
                    [8, 12, 36, 40],
                    [0, 3, 6, 21, 27, 42, 45, 48]
                ],
                _ = l / 20,
                h = () => {
                    for (let t of (n.fillStyle = "#FF4C00", n.clearRect(0, 0, e.width, e.height), f.slice(0, 4)))
                        for (let e of (n.globalAlpha = d[f.indexOf(t)], t)) n.fillRect((3 + e % 7 * 2) * _, (3 + 2 * Math.floor(e / 7)) * _, 2 * _, 2 * _);
                    r && requestAnimationFrame(h)
                },
                p = [],
                v = 0,
                m = () => {
                    r = !0, s = (s + 1) % 5, d.forEach((e, n) => {
                        let r = e;
                        n === s ? r = 1 : n === (s + 1) % 4 ? r = .12 : n === (s + 2) % 4 ? r = .2 : n === (s + 3) % 4 && (r = .4), (0, t.animate)(e, r, {
                            duration: .05,
                            onUpdate: e => {
                                d[n] = e
                            }
                        })
                    }), p.forEach(e => {
                        window.clearTimeout(e)
                    }), p.push(window.setTimeout(() => {
                        r = !1
                    }, 300)), 3 === s && (v += 1), (2 !== v && a || 2 !== s) && p.push(window.setTimeout(() => {
                        m()
                    }, 50))
                };
            if (u.current = {
                    activate: () => {
                        a || (a = !0, v = 0, m(), h())
                    },
                    deactivate: () => {
                        a && (a = !1)
                    }
                }, h(), e.addEventListener("resize", h), o) {
                let e = c.current.closest(".group");
                if (e) return e.addEventListener("mouseenter", u.current.activate), e.addEventListener("mouseleave", u.current.deactivate), () => {
                    e.removeEventListener("mouseenter", u.current.activate), e.removeEventListener("mouseleave", u.current.deactivate)
                }
            }
        }, [o, l]), (0, r.useEffect)(() => {
            if (o) return;
            let n = new IntersectionObserver(([n]) => {
                n.isIntersecting && e ? u.current.activate() : u.current.deactivate()
            }, {
                threshold: .5
            });
            return n.observe(c.current), () => {
                n.disconnect()
            }
        }, [e, o]), (0, n.jsx)("canvas", {
            className: (0, a.cn)(s ? "" : ["[&.grayscale]:opacity-60 transition-[filter,opacity]", !e && "grayscale"]),
            ref: c,
            style: {
                width: l,
                height: l
            }
        })
    }
    e.s(["default", () => s])
}, 164530, e => {
    "use strict";
    var n = e.i(253719),
        t = e.i(154712),
        r = e.i(730592),
        a = e.i(420851),
        i = e.i(672154);

    function s({
        active: e,
        alwaysHeat: s = !1,
        triggerOnHover: o = !1,
        size: l = 20
    }) {
        let c = (0, r.useRef)(null),
            u = (0, r.useRef)({
                activate: () => {},
                deactivate: () => {}
            });
        return (0, r.useEffect)(() => {
            let e = c.current;
            if (!e) return;
            let n = (0, i.default)(e),
                r = !1,
                a = !1,
                s = 2,
                d = [.2, .4, 1, .12],
                f = [
                    [0, 1, 4],
                    [2, 5, 8],
                    [3, 6, 9],
                    [7, 10, 11]
                ],
                _ = l / 20,
                h = () => {
                    n.fillStyle = "#FF4C00", n.clearRect(0, 0, e.width, e.height), n.globalAlpha = .35, n.fillRect(3 * _, 3 * _, 2 * _, 2 * _), n.fillRect(7 * _, 3 * _, 10 * _, 2 * _);
                    for (let e = 0; e < f.length; e++)
                        for (let t of (n.globalAlpha = d[e], f[e])) {
                            let e = t % 4,
                                r = Math.floor(t / 4);
                            n.fillRect((3 + 4 * e) * _, (7 + 4 * r) * _, 2 * _, 2 * _)
                        }
                    r && requestAnimationFrame(h)
                },
                p = [],
                v = 0,
                m = () => {
                    r = !0, s = (s + 1) % 5, d.forEach((e, n) => {
                        let r = e;
                        n === s ? r = 1 : n === (s + 1) % 4 ? r = .12 : n === (s + 2) % 4 ? r = .2 : n === (s + 3) % 4 && (r = .4), (0, t.animate)(e, r, {
                            duration: .05,
                            onUpdate: e => {
                                d[n] = e
                            }
                        })
                    }), p.forEach(e => {
                        window.clearTimeout(e)
                    }), p.push(window.setTimeout(() => {
                        r = !1
                    }, 350)), 3 === s && (v += 1), (2 !== v && a || 2 !== s) && p.push(window.setTimeout(() => {
                        m()
                    }, 50))
                };
            if (u.current = {
                    activate: () => {
                        a || (a = !0, v = 0, m(), h())
                    },
                    deactivate: () => {
                        a && (a = !1)
                    }
                }, h(), e.addEventListener("resize", h), o) {
                let e = c.current.closest(".group");
                if (e) return e.addEventListener("mouseenter", u.current.activate), e.addEventListener("mouseleave", u.current.deactivate), () => {
                    e.removeEventListener("mouseenter", u.current.activate), e.removeEventListener("mouseleave", u.current.deactivate)
                }
            }
        }, [l, o]), (0, r.useEffect)(() => {
            if (o) return;
            let n = new IntersectionObserver(([n]) => {
                n.isIntersecting && e ? u.current.activate() : u.current.deactivate()
            }, {
                threshold: .5
            });
            return n.observe(c.current), () => {
                n.disconnect()
            }
        }, [e, o]), (0, n.jsx)("canvas", {
            className: (0, a.cn)(s ? "" : ["[&.grayscale]:opacity-60 transition-[filter,opacity]", !e && "grayscale"]),
            ref: c,
            style: {
                width: l,
                height: l
            }
        })
    }
    e.s(["default", () => s])
}, 810578, e => {
    "use strict";
    var n = e.i(253719),
        t = e.i(730592),
        r = e.i(420851);

    function a({
        variant: e = "primary",
        size: t = "default",
        disabled: a,
        ...s
    }) {
        let o = i(s.children);
        return (0, n.jsxs)("button", { ...s,
            type: s.type ? ? "button",
            className: (0, r.cn)(s.className, "[&>span]:px-6 flex items-center justify-center button relative [&>*]:relative", "text-label-medium lg-max:[&_svg]:size-24", `button-${e} group/button`, {
                "rounded-8 p-6": "default" === t,
                "rounded-10 p-8 gap-2": "large" === t,
                "text-accent-white active:[scale:0.995]": "primary" === e,
                "text-accent-black active:[scale:0.99] active:bg-black-alpha-7": ["secondary", "tertiary", "playground"].includes(e),
                "bg-black-alpha-4 hover:bg-black-alpha-6": "secondary" === e,
                "hover:bg-black-alpha-4": "tertiary" === e
            }, "playground" === e && ["before:inside-border before:border-black-alpha-4", a ? "before:opacity-0 bg-black-alpha-4 text-black-alpha-24" : "hover:bg-black-alpha-4 hover:before:opacity-0 active:before:opacity-0"]),
            disabled: a,
            children: ["primary" === e && (0, n.jsx)("div", {
                className: "overlay button-background !absolute"
            }), o]
        })
    }
    let i = e => t.Children.toArray(e).map(e => "string" == typeof e ? (0, n.jsx)("span", {
        children: e
    }, e) : e);
    e.s(["default", () => a])
}, 838148, e => {
    "use strict";
    let n = new Set;

    function t(e, t, r) {
        t ? n.add(e) : n.delete(e);
        let a = n.size > 0;
        document.body.classList.toggle("overflow-hidden", a), r && r(a)
    }
    e.s(["lockBody", () => t])
}, 121583, (e, n, t) => {
    n.exports = function() {
        var e = document.getSelection();
        if (!e.rangeCount) return function() {};
        for (var n = document.activeElement, t = [], r = 0; r < e.rangeCount; r++) t.push(e.getRangeAt(r));
        switch (n.tagName.toUpperCase()) {
            case "INPUT":
            case "TEXTAREA":
                n.blur();
                break;
            default:
                n = null
        }
        return e.removeAllRanges(),
            function() {
                "Caret" === e.type && e.removeAllRanges(), e.rangeCount || t.forEach(function(n) {
                    e.addRange(n)
                }), n && n.focus()
            }
    }
}, 26012, (e, n, t) => {
    "use strict";
    var r = e.r(121583),
        a = {
            "text/plain": "Text",
            "text/html": "Url",
            default: "Text"
        };
    n.exports = function(e, n) {
        var t, i, s, o, l, c, u, d, f = !1;
        n || (n = {}), s = n.debug || !1;
        try {
            if (l = r(), c = document.createRange(), u = document.getSelection(), (d = document.createElement("span")).textContent = e, d.ariaHidden = "true", d.style.all = "unset", d.style.position = "fixed", d.style.top = 0, d.style.clip = "rect(0, 0, 0, 0)", d.style.whiteSpace = "pre", d.style.webkitUserSelect = "text", d.style.MozUserSelect = "text", d.style.msUserSelect = "text", d.style.userSelect = "text", d.addEventListener("copy", function(t) {
                    if (t.stopPropagation(), n.format)
                        if (t.preventDefault(), void 0 === t.clipboardData) {
                            s && console.warn("unable to use e.clipboardData"), s && console.warn("trying IE specific stuff"), window.clipboardData.clearData();
                            var r = a[n.format] || a.default;
                            window.clipboardData.setData(r, e)
                        } else t.clipboardData.clearData(), t.clipboardData.setData(n.format, e);
                    n.onCopy && (t.preventDefault(), n.onCopy(t.clipboardData))
                }), document.body.appendChild(d), c.selectNodeContents(d), u.addRange(c), !document.execCommand("copy")) throw Error("copy command was unsuccessful");
            f = !0
        } catch (r) {
            s && console.error("unable to copy using execCommand: ", r), s && console.warn("trying IE specific stuff");
            try {
                window.clipboardData.setData(n.format || "text", e), n.onCopy && n.onCopy(window.clipboardData), f = !0
            } catch (r) {
                s && console.error("unable to copy using clipboardData: ", r), s && console.error("falling back to prompt"), t = "message" in n ? n.message : "Copy to clipboard: #{key}, Enter", i = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C", o = t.replace(/#{\s*key\s*}/g, i), window.prompt(o, e)
            }
        } finally {
            u && ("function" == typeof u.removeRange ? u.removeRange(c) : u.removeAllRanges()), d && document.body.removeChild(d), l()
        }
        return f
    }
}, 106080, e => {
    "use strict";
    var n = e.i(253719),
        t = e.i(534026),
        r = e.i(730592),
        a = e.i(420851);

    function i({
        children: e,
        ...i
    }) {
        let s = (0, r.useRef)(null),
            [o, l] = (0, r.useState)("auto");
        return (0, r.useEffect)(() => {
            let e = s.current ? .children[0],
                n = () => {
                    e && l(e.clientHeight)
                };
            n();
            let t = new ResizeObserver(n);
            return t.observe(e), () => t.disconnect()
        }, []), (0, n.jsx)(t.motion.div, { ...i,
            animate: {
                height: o,
                ...i.animate
            },
            className: (0, a.cn)(i.className),
            initial: {
                height: o,
                ...i.initial
            },
            ref: s,
            children: (0, n.jsx)("div", {
                className: "h-max",
                children: e
            })
        })
    }
    e.s(["default", () => i])
}, 229658, e => {
    "use strict";
    var n = e.i(638440);
    e.s(["isProductionEnvironment", 0, () => !0, "isVercelPreviewEnvironment", 0, () => "preview" === n.default.env.VERCEL_ENV, "shouldEnableLiveChat", 0, () => !"https://www.firecrawl.dev".includes("localhost")])
}, 210015, e => {
    "use strict";
    var n = e.i(253719),
        t = e.i(730592),
        r = e.i(803296),
        a = e.i(242092),
        i = e.i(872969);
    let s = (0, i.createServerReference)("0051a53c11276bd958d66ab63773337c1b4cda1318", i.callServer, void 0, i.findSourceMapURL, "getPylonEmailHash"),
        o = "da167302-89d0-41fa-b794-0f8d19c70b68",
        l = ({
            user: e
        }) => {
            let [i, l] = (0, t.useState)(null), {
                resolvedTheme: c
            } = (0, a.useTheme)();
            return ((0, t.useEffect)(() => {
                if (!c) return;
                let e = () => {
                    try {
                        window.Pylon && window.Pylon("setTheme", c)
                    } catch {}
                };
                e();
                let n = setInterval(e, 500),
                    t = setTimeout(() => clearInterval(n), 1e4);
                return () => {
                    clearInterval(n), clearTimeout(t)
                }
            }, [c]), (0, t.useEffect)(() => {
                e ? .email && (async () => {
                    l(await s())
                })()
            }, [e ? .email]), (0, t.useEffect)(() => {
                if (e ? .email && null !== i) return window.pylon = {
                    chat_settings: {
                        app_id: o,
                        email: e.email,
                        name: e.email,
                        email_hash: i
                    }
                }, () => {
                    try {
                        console.log("Unmounting Pylon script..."), window.Pylon && "function" == typeof window.Pylon.remove && window.Pylon.remove();
                        let e = document.getElementById("pylon-script");
                        e && e.remove(), delete window.Pylon, delete window.pylon
                    } catch (e) {
                        console.error("Error unmounting Pylon script:", e)
                    }
                }
            }, [e, i]), e ? .email) ? null === i ? null : (0, n.jsx)(r.default, {
                id: "pylon-script",
                strategy: "afterInteractive",
                onLoad: () => {},
                onError: e => {
                    console.error("Error loading Pylon script:", e)
                },
                dangerouslySetInnerHTML: {
                    __html: `
          (function(){
            var e=window;
            var t=document;
            var n=function(){n.e(arguments)};
            n.q=[];
            n.e=function(e){n.q.push(e)};
            e.Pylon=n;
            var r=function(){
              var s=t.createElement("script");
              s.setAttribute("type","text/javascript");
              s.setAttribute("async","true");
              s.setAttribute("src","https://widget.usepylon.com/widget/${o}");
              var o=t.getElementsByTagName("script")[0];
              o.parentNode.insertBefore(s,o)
            };
            if(t.readyState==="complete"){
              r()
            } else if(e.addEventListener){
              e.addEventListener("load",r,false)
            }
          })();
        `
                }
            }) : (console.log("No user email found, not rendering Pylon chat"), null)
        };
    var c = e.i(821423),
        u = e.i(229658);
    e.s(["default", 0, () => {
        let {
            optionalUser: e,
            loading: t
        } = (0, c.useOptionalUser)();
        return (0, u.shouldEnableLiveChat)() ? (0, n.jsx)("div", {
            className: "flex justify-center items-center",
            children: !t && (0, n.jsx)(n.Fragment, {
                children: e && (0, n.jsx)(l, {
                    user: e
                })
            })
        }) : null
    }], 210015)
}, 863635, e => {
    e.v(JSON.parse("[\"                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                           ''.-_,.''                            \\n                          '.:;==+^_.'                           \\n                           '-\\\";+;:,'                            \\n                              '''''                             \\n                                                                \\n                                                                \",\"                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                             '''                                \\n                           '-:\\\"\\\":,.'                            \\n                           .:;+++;^:-'                          \\n                          '-\\\"+===+;\\\"-'                          \\n                          ',^+==++;:.'                          \\n                           ',\\\"^^\\\":,.'                           \\n                             '''''                              \\n                                                                \",\"                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                            .::,''                              \\n                          '-\\\";;^\\\"\\\":,'                           \\n                         '.:\\\";++;;;\\\"_-''                        \\n                          .:;+===++;\\\",'                         \\n                          '_;+====+;:,''                        \\n                          '_;++=++;\\\",.'                         \\n                          '-\\\"^^^\\\":_.''                          \\n                           '.--.'''                             \\n                                                                \",\"                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                           '-::,'                               \\n                          ':;+;^^\\\",.'                           \\n                         .:\\\";+++;;^\\\":.                          \\n                        '-\\\"^;+====+;\\\":-'''                      \\n                        '-::;=====++;^:-''                      \\n                         ',\\\"+======+^:,-'                       \\n                         '-:;+=====;\\\",.''                       \\n                          ._^;++=+;\\\"-''                         \\n                          '-::::,.'''                           \\n                          ''-..''                               \\n                                                                \",\"                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                           '-_:_'                               \\n                         -^;++++;;;.                            \\n                        .\\\"+======+^:,_'                         \\n                       .\\\";;+=====+;:__-                         \\n                        -:_^+=====+;\\\"::,'''                     \\n                        .-.\\\"+=======+^:__-.'                    \\n                        '.._\\\"+======+\\\",-.''                     \\n                         '..,;======;_''''                      \\n                         '.._;+===++:.'                         \\n                          '',::^\\\":.'''                          \\n                          '''..''                               \\n                           '''                                  \\n                                                                \",\"                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                           -\\\"^++\\\".                              \\n                       ';++=====+;^:-                           \\n                      '\\\"+========+;;^'                          \\n                      -;;;;++====+;\\\",,,.                        \\n                     ':,__:;;;+===+^___-.                       \\n                      '...-^;++++==+;::^:,'                     \\n                        ''--,\\\"++=====;\\\"_,,-''                   \\n                         ''''_+++===++;-.,_-'                   \\n                         '''.\\\";;+;^\\\"^_-'''''                    \\n                          ''._;\\\"\\\":_--'                          \\n                           ''._:_-'  '                          \\n                           '''''''                              \\n                           '''                                  \\n                                                                \\n                                                                \",\"                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                            '-_,-'                              \\n                        '':^+=====^'                            \\n                     ':++========+;.                            \\n                    ^+============+^;;-                         \\n                    ,;;;;;+++====+^\\\";^:                         \\n                    ';;^\\\":\\\";++++++;;:::_'                       \\n                    ,,:_-,,\\\";^\\\"^;+=+;:::_-'                     \\n                     '-.'''..,--,:,-_:;;+;^_                    \\n                         ''''--.-..'._:\\\";\\\"_.'                   \\n                          '''..-,_-''.''..-.''                  \\n                           ''.-:,:_'''''''..'                   \\n                          ' ''.,_,-''                           \\n                            '''--.'                             \\n                              '..'                              \\n                               '                                \\n                                                                \\n                                                                \\n                                                                \",\"                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                           '^+++\\\"::-                            \\n                      ''':^;+=======^                           \\n                    '++=============+                           \\n                  -;;++===+======++^:                           \\n                 .++++++++;;+++++++^\\\"\\\"\\\",                        \\n                 '_\\\";;;;++;;^;;^;++;;;;;.                       \\n                   ';;:_,_\\\"^\\\"_,_^++;;;;^:-                      \\n                    \\\"\\\":,--:+;_-,,---,__\\\"^::.'                   \\n                   '.-,.''..-.''''''''.-\\\";++^.                  \\n                       ''''-----,.'''''',:\\\"\\\"^,                  \\n                           '',--,-.'''''.-_,''                  \\n                              ''-.''''''''''  '                 \\n                              ''-.'''     ''                    \\n                              '.,'                              \\n                             '.--'                              \\n                             '''''                              \\n                                '                               \\n                                                                \\n                                                                \\n                                                                \",\"                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                             ''''                               \\n                          '\\\"+====^;+\\\"-                          \\n                     ''-+=============+'                        \\n                   :+==========+=+====+-                        \\n                  '+========++++++++==+                         \\n                :^+++==++;;+;;+=====+;-                         \\n               '++++++++;^\\\"\\\"\\\";++;+;\\\"\\\"^\\\":-                       \\n                -^;;;;++;\\\"__:\\\";;^;;\\\":\\\";++:                      \\n                 '.\\\"^;^:::\\\"\\\"::\\\":::\\\"\\\":::\\\";+:.                    \\n                   .:\\\":_,,__:,--''--,___::;;:'                  \\n                    -_,,-,,__--.'''''..._:;++;-                 \\n                      ''-::::_::--....''-,:\\\"^;\\\"                 \\n                        '''':^\\\":__----...-,::^-                 \\n                            '''''--'''''.'-:-'                  \\n                               '.'      '''                     \\n                              '.-'                              \\n                             '.-''                              \\n                            '..-.'                              \\n                             '..''                              \\n                                ''                              \\n                                                                \\n                                                                \\n                                                                \",\"                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                             '-:_'                              \\n                       '.' -;+++++:-\\\":'                         \\n                     ,+===++==++++=====+-                       \\n                  .:^+=========;+===+===='                      \\n                ';+=========++++;;++++==+-                      \\n                .;====++++++;;;;;+++++++.                       \\n              '-:;==++;^;;;;^;;+++==++=+                        \\n             '+++++++;;;;^^\\\"^^^^^;++^\\\"^^_''                     \\n              ,:;+;;;+;;\\\"_:::::\\\"\\\"::__::^;;+:                    \\n                .,:\\\"^;;^:,::_:,,_:\\\":_,__\\\"\\\";;-                   \\n                  ,:\\\"\\\":_,___,-...---_,,___::;\\\"'                 \\n                   .::_,,::::_-..,-.--,__,:^;+;'                \\n                     ''.,:\\\"\\\"\\\";:-,,---...,:^\\\";;;:'               \\n                         '-'\\\"^_\\\":_::_-----,,:\\\"^:                \\n                            ''''.....''.--,,-_:                 \\n                               '''      '-_-                    \\n                             '''''                              \\n                            '.-''                               \\n                           '.---.'                              \\n                             '---'                              \\n                             ''..'                              \\n                                '                               \\n                                                                \\n                                                                \\n                                                                \",\"                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                              '-,.'                             \\n                     '..'  ':++++++_                            \\n                   '+====+;+++++;+;+;;;^'                       \\n                   +=====++=++=+;;++;+===+_                     \\n                '\\\";=======++++++;;++=++===+'                    \\n               ,++=======++++;;;;;;+++++=+:                     \\n              '++==++++++++;;^;;;;+++++++^-                     \\n              '\\\"==+++;;;;^^\\\":::^;+++;;++;'                      \\n            -;;+++;;;^^^\\\":::::\\\"^+++++\\\"^\\\"::-,.'                  \\n            _++;;;^;;;;;\\\"::_:\\\"\\\"\\\"::_:\\\":___:\\\"^;^                  \\n             -.,\\\"^^^^^\\\"::___::::__,--,,:::\\\"^\\\":'                 \\n                .-:\\\";\\\"::::_:::__,-,_,,-----_:_,                 \\n                 .:\\\"^\\\"::_::::::::,,--,,,---,:^^-                \\n                   .,_::__,_\\\"\\\":\\\"^:--_,,,,_:\\\"^;;^'               \\n                       '--.-,_\\\"\\\"::__,_,,-,::\\\"\\\"\\\"\\\",               \\n                            '''------,___,-,:_\\\"\\\"'               \\n                               ''    ''',,.''.'                 \\n                             '''                                \\n                            .--''                               \\n                           '..--'                               \\n                            '.--'                               \\n                             .---.                              \\n                             ''..'                              \\n                                                                \\n                                                                \\n                                                                \\n                                                                \",\"                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                               ''                               \\n                    '''    '-;;++;;\\\"'                           \\n                  .^+++++::;;;;;;;;;+^.'                        \\n                ';======++++++;+;;;;;;;^\\\"'                      \\n                .+====+++++++++++;;;^;;++=+\\\"'                   \\n               -:+==++=+==+++;;;;^;;++++===+:                   \\n              ,;+====+++++++;;;;;;;;++++++++,                   \\n             ,+++++++++;++++;;;;;;;;++++;;\\\"'                    \\n             :+==++;;+;;;;^^^\\\"^;;;;;;;;;;^:                     \\n            ':+++;;;;;;^^\\\"\\\"::_::\\\";;;^,:_,-_,:,-'                \\n           -;;;;;^^^;^\\\"\\\"\\\"::::___::^^:,,----,:^\\\":'               \\n           ';;^:::::\\\"\\\":::::::::_,,_::-,,__:\\\"\\\"::-'               \\n            '''-_:\\\"\\\"\\\"^\\\"::\\\"::__:::_-,,,,:----_:,'                \\n               '.-:\\\"^^^^\\\":::_:\\\":\\\":___,_:_-,-,:_.                \\n                 ._:^\\\"\\\"\\\":,,__::::____-----_:_:^_                \\n                    '''''.-.-::_,,--,---_::\\\"\\\"^^\\\"'               \\n                          ' ''---..-:::,____,,,_-               \\n                              ''    '''''.'.--,-                \\n                             ''                                 \\n                           '.-.'                                \\n                           ''.-'                                \\n                            '..''                               \\n                            '.-..'                              \\n                             ...-'                              \\n                             '''''                              \\n                                                                \\n                                                                \\n                                                                \\n                                                                \",\"                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                            .^^^;\\\".''                           \\n                 '_^;^-''',:^;;;+;;;;;,                         \\n               '\\\"+==++++++;;^\\\"\\\"^;;;;;;;\\\".                       \\n              '+======+++++;;;;^;^\\\"^;^^;^_'                     \\n              \\\"+++===++++++++++;++\\\"\\\"^;^;;;++\\\"                   \\n              -\\\"+++++++++=++++;;;;;;^;++++++++:                 \\n             :;+===++++++++++;;;;;;;;;+++++++\\\"'                 \\n            .^+++++++;;+++;;^;;^;;;;;;++;;;;^.                  \\n            _+++++;;+;;;;;;;;^^^^^;;;;;;^:,.                    \\n            _++++;;;;;;;^^^\\\"\\\"::::\\\"\\\"::\\\"\\\"::,..-,,''               \\n            ,++;;^^^^^\\\":::::______:_-------..-:::-              \\n           -^;;^::::::::\\\"\\\"\\\":_______,,---__,-_:::__'             \\n            :^:,,_::::\\\"\\\"^^^:_:::__,__,,-,,__:__.''              \\n               '.,::\\\"\\\"^^\\\"::_::\\\":::__,::_,_:_,,-'                \\n                '',:\\\"^^^:.--,::_____,,,__,_,,__-                \\n                 ''-,-.'''''',-----__,,____,_::-                \\n                             ''''''__---_,__:::-                \\n                                   '''''''.-..-.                \\n                            '''            ''''                 \\n                           ''''                                 \\n                            ''''                                \\n                            '''''                               \\n                           '''''''                              \\n                            ''''''                              \\n                             '''''                              \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \",\"                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                            .--.--'                             \\n                 ''''     ',\\\"^^;;;;:,-'                         \\n               ,;++;;\\\"\\\"..__\\\"\\\"\\\"\\\"^;;;^^^;\\\"'                       \\n              :+===++;;;;;;;\\\"\\\"\\\":::\\\"^^;^\\\"\\\"_'                     \\n            ';+====+++;;;++;;;^:::\\\"\\\"^^^^^\\\":'                    \\n            :++++++++++;;++++++^\\\";;\\\"^^^;;\\\"^;;\\\"'                 \\n            .;;+++++;;++++++;;;;;^^^^^^;;;;+++\\\"'                \\n            ,\\\"+++=+++;;++++;;;;;;;;;\\\"\\\"^;++;+++;;'               \\n            :;+++=++;;;;++;;;;^^;;;;;^;;;;;;;;-'                \\n           -^;++;;+;;^^;;^^\\\"^^^^^;;;;;;;^\\\"::_-                  \\n           '^+++;;;;;;;^^^\\\"^;\\\"\\\":\\\":::\\\"::,--'''''''               \\n            :++;^\\\"^^^\\\"\\\"\\\"\\\"\\\":::,,-,_,,------.'''.---.             \\n            _;^\\\"::__:::::\\\"::,,,--------''------,,_,             \\n           ':\\\"\\\":__,,:::\\\"::___:_,------..-,__,-,,,,-'            \\n            '--..-_:::\\\"\\\":---_:::,-,_:,----,,--.''               \\n                ''-_:\\\"\\\"\\\"_''.__::,,,,,,,--.-.---'                \\n                  '-_\\\"_.    '''''-_,---,-..--,,-                \\n                                 '--.'..----,,-'                \\n                                  '''''''''....'                \\n                                          '''''                 \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \",\"                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                          '_:::\\\"^^\\\"_                            \\n               '._-''     -\\\"\\\"\\\"\\\"\\\"^;;;:_-'                        \\n            '\\\"++;;^^\\\"\\\"\\\":_:\\\"^\\\"\\\"\\\":\\\"\\\"\\\"^^\\\"\\\"^:.                      \\n            -+===++;;;;;;;;^\\\"::::_:\\\"\\\"\\\"\\\"\\\"::-'                    \\n           ,+=====++;;;;;+;;^^::_:\\\"\\\"\\\"\\\"\\\"\\\"^^\\\":'                   \\n          '++==++=++;;;;+++;++;^_::::\\\"^^^^\\\":\\\":,-                \\n           \\\"++++++;;;;;++++;;;;;:\\\"\\\":\\\"\\\"\\\"^^^^\\\";++\\\"                \\n           ':++==+;;;;;++++;;;;;;\\\"\\\"^\\\"::^;+;^\\\";++_               \\n           _^++++=+;;;;++++;;;^^^^^^\\\"::\\\";;;;;;\\\"\\\"\\\"-              \\n           -^+++++++;;^;+;;^^;^\\\"^^^^;^^^\\\"\\\":\\\"\\\":.'                \\n           _;++;;;;;;;^^^\\\"\\\"\\\"\\\"\\\"^\\\"^^\\\"\\\"^^^\\\":_,-.''                 \\n           ':++;;^\\\"\\\"^^\\\"\\\"::_______,---,,.'''..'''''              \\n            .;;\\\"::::__:___,-,,--......''''...-.''''.            \\n            '-___----_:::_-,_-,-..-....''.-......-.'            \\n            '.__---,::::::,,_,-------.......''''.-.'            \\n               '..-,_::::-'-__-.--,-...'''..'..'                \\n                  '.--_:'  '.'''.--''''''''''..'                \\n                                 '--.'''''''..''                \\n                                   ''   ''''.''                 \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \",\"                                                                \\n                                                                \\n                                                                \\n                            ''''''''                            \\n                          ._::_:\\\"^^^,                           \\n            '...__.'     ',_\\\":::\\\"\\\"^^^:,'                        \\n          '_+++;;;\\\"::__::\\\"^\\\"\\\"::____:\\\"\\\":::_'                     \\n          -;==++;;;;;;^;;^^^\\\"\\\":_,,_:::::,_,.                    \\n          .;+=+++;;;^;^;;^^^:::_,_::::::::\\\":-                   \\n         ^+++=++=+;^^^^^++;^;;^\\\",---:\\\"\\\"\\\"^\\\"\\\":_.' '               \\n         :;;++++;;;;^\\\"\\\"^;+;^;^^\\\":_,,,::\\\"\\\":__,:\\\"^:'              \\n          -\\\"+++++;;;^\\\":\\\";;;^;;^;^::_:::\\\"^\\\"\\\"^-,\\\"^^'              \\n           -;+;++++;^^;;;;;;;;^;^\\\":::.-\\\"^^\\\"\\\"_:^^^:              \\n          -:;+;;;;;;^^^;;+;;\\\"^\\\"::::\\\":,-_\\\"^^^:\\\"_-,-'             \\n          '_^;;;;;;;;\\\"\\\"^;;;^\\\"\\\"\\\":::\\\"\\\"\\\"\\\"::::____'                 \\n           ,;;;;;\\\"::^^^\\\"\\\":_:_:______::\\\"_-.''''                  \\n            -;;^\\\":::::::_,----.'''''....''''''''                \\n             ,,--,,--,::,-,--..'''''''''''  ''''   '            \\n             ''.-...-_::,---..-.''..'''''''  ''''''             \\n              ''...--_--,-'-.''...''''' '''''' '''              \\n                '''''.'..  '.'''.'''''  '''''''                 \\n                                '''''''     '''                 \\n                                  ''     '''''                  \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \",\"                                                                \\n                                                                \\n                          '.-,-'.,..'                           \\n                         '-,::__:\\\"\\\"\\\"\\\"-                          \\n           '..-\\\":.'      '_::::_::::::_.'                       \\n         .\\\";+;;;;;^\\\"\\\"\\\"::\\\"\\\"^^\\\"::_,-,:_:::_,-'                    \\n        -;+==+;;;;^^^^^^;^\\\":::_,-..-___,----'                   \\n         _;++;;;^^\\\"\\\"^\\\"\\\";^\\\"::,-.,-.--_:::,-__,'                  \\n        -\\\";;;;++;^^\\\"^\\\"\\\"\\\";;^:\\\"::__-'.,_::\\\"\\\":::.                  \\n       .;;;++++;;^^\\\":::^+;;^\\\"\\\"\\\"::,''---_::-,,..--..             \\n        -:\\\";;+;;^\\\"\\\"\\\"::_:\\\"^\\\"^^\\\":::,----,,_:,-.'.,_-              \\n         ',;;;;;;;^^\\\"::::^^^^^^^\\\":_--,::::-,.'-::^.             \\n          '_;;;;;^\\\"\\\":^;^\\\"^;;^^\\\"\\\"\\\"::,,._:::__--,__,'             \\n         '-_^;;+;;\\\"::::^;;;;^\\\":_:___-..,,::_,,-''.'             \\n          '-\\\"^;;;\\\"\\\"\\\"\\\"::\\\"\\\"^\\\"^\\\"\\\":_,__,,,_,-----.                  \\n          '_\\\":\\\"^\\\"::::\\\"\\\"\\\":,.-,-.'''..-,_.' ''''                  \\n           ''-:_--.--,_:-....''  '''''''     '                  \\n             ''...''.-_,-.'''.'''''''                           \\n               '''...-.''''''''                                 \\n                '''''''    ''''                                 \\n                               ''''                             \\n                                   '                            \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \",\"                                                                \\n                          '.,--.-_-.'                           \\n              '          '-_:__,_:::_,'                         \\n          ..._^\\\"-' '     .:;\\\"_,,,,_,---''                       \\n        -\\\";++;;;;^^^^\\\":^^^;^\\\",-.-..---,__.''                    \\n       \\\"+==++;;;;^\\\"\\\"^\\\"\\\"\\\"^^:_--.'''''.-,,-''''                   \\n      ':;++;;^^^^^\\\"::_\\\"^^:,-..''.'''.___-.''-.                  \\n        ,^^^^^;;\\\"\\\"\\\"\\\":_:\\\"\\\"\\\"::,---..''-,,__::::.'                 \\n      ':^;;;;;;;\\\"::::::;+;;^\\\":\\\"__-'''..-,_--_,'                 \\n      ':\\\"\\\"^;;;^\\\":,_:_,_\\\"\\\":\\\"^\\\":_,--''.''''..'.' '..''            \\n       '.-:;+;^\\\"\\\":___,--_:\\\"^^\\\":::_.'-_-.--.''  '.,.             \\n         ._\\\";;;;;\\\":::_:_::^^\\\"^\\\"\\\"\\\":-'._::,...' .,.,-'            \\n          ',^;;+;\\\"_,_:\\\"\\\":\\\";;^\\\":::_-.'-,---..'''.'''             \\n         '.-:\\\";+;^:-_,_:\\\"^;;^:_---..''''.--.''''''              \\n          '.-_\\\"\\\"\\\"::::___::_:\\\":_''...--.''''''                   \\n          ',-.,_...-,__:,.'''''     ''''                        \\n             '-.'''''..'''''                                    \\n              '''''''''   '                                     \\n                   ''                                           \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \",\"                          '.,--.'-.''                           \\n             ''          ''_:,..-,__'-'                         \\n        '..'::^_''''    '-_\\\"^-..''..'''''                       \\n       '^;+++;;^\\\"\\\"^\\\":-:\\\"^^\\\"\\\":-'''''''''''''                     \\n     ':+==++;+;;;^\\\"\\\"^\\\":::_-.'''  '' ''.--'                      \\n     _+==+;\\\"^^^^^\\\"_,-,_:\\\"-..'''   '  '-,,'                      \\n     ',:^\\\":\\\"\\\"::::::,,___:,-_,' '' '''---.-,,.-'                 \\n       ,^^::\\\"^;:____,_^;^\\\"\\\"::,,..''''''''...--'                 \\n      ::\\\"^\\\"^^\\\"\\\"_-.----,\\\":::\\\":__..'' ''  '''''.'                 \\n      .,_,\\\";^^\\\"_-.'''..--_\\\"^:_,,-'''''   '' '    ''             \\n        '-^;+;;;\\\":-,_,--.,\\\"^:::::,''-,.''''      ''             \\n         .-\\\";;;;\\\"_-,_____::;^\\\"::_'''.,.'''''  ''''''            \\n          '':^;;;\\\"::,___,_:;^:_--''''''''''                     \\n          ''._:\\\"\\\"\\\"\\\":_,,,::\\\"^\\\":.'''''''   ''                     \\n           '.----.--..---''._-'                                 \\n           '''''''''''''                                        \\n              ''                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \",\"            '-'           '.:,' ''''' '                         \\n        ''',::,'''''     '.-,.     ''                           \\n      '\\\";;+;;^\\\":::_,,'-,,,,-..                                  \\n     .\\\"++++;;;;;::,,_:,,,.''''                                  \\n    _+==;^\\\"\\\":::::,..-_---'''          '..'                      \\n    _^;;\\\":__-..--.'.'..--.''.'       ''''.'''                   \\n     '.__-,_,-......'-_.'..'.'''      ''' '''''                 \\n      ..---_-__-''.''-::---.-,.'                                \\n     '--,,::::,''''''''.'.,_-..''                               \\n      '''.\\\"^;;^:..'--.'''-::..--''''                            \\n         .:\\\";+;;:----..'.._::_:-''''''                          \\n         '.,:^^^^\\\":,,..-.--:\\\"_-.'   ''                          \\n           '.-_:_,,:_-.--.-::-'                                 \\n             '.-.'''''''.''--.                                  \\n             '.''''        '.'                                  \\n              ''                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \",\"         '-__.' ''       '''''      '                           \\n      _;+++;^\\\"_--.''''''''''''                                  \\n     _;++++;;;\\\"_,..'..-,'''''''                                 \\n   ':++^\\\"\\\":-..'.'''.'.-''' '                                    \\n   :==+^:_-'  ''' ''''''''' '                                   \\n   '_\\\"^_.-.'     ''''''  '''''                                  \\n      '''''''''''''''..'''''''                                  \\n      ''''----''''''..'''''''''                                 \\n     ''''-\\\"^\\\"\\\"_.''..''''''--''''                                \\n         ':^;+;^-'.-.''''-,-...'                                \\n          -:;++;^::::-''''.-:_.'                                \\n          ''_:,,:,..__'''''':-'                                 \\n           ''''''''     '''.-'                                  \\n             '.''''        ''                                   \\n               '''                                              \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \",\"     ':;;+\\\"::'                                                  \\n    .;+++=;:,.'''     ''                                        \\n    ,:\\\"\\\"^\\\",''   ' ''                                            \\n  ,\\\"=^:_--.       '.' '                                         \\n  :++;:-''        ''                                            \\n   '-:-'         '                                              \\n          ''  ''''''''                                          \\n        ',\\\":,-..'.'''         '                                 \\n         ._\\\"^\\\"_-'''-.-'  ''                                     \\n          ':;=++:.'.'.'  ''''-'                                 \\n           .\\\"+;;\\\"__,.-'    ',.                                  \\n            ''''''          ''                                  \\n              '''                                               \\n              ''                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \",\"   '_;^;=;''                                                    \\n   '-,:^^,'                                                     \\n   '.'-_-'         ''                                           \\n '-+_.'          ''                                             \\n ,\\\"^^,'                                                         \\n    '.'       '''                                               \\n         ..''''''''                                             \\n          ',,''                                                 \\n           .._,,'                                               \\n           ';=+;.   '       '''                                 \\n            '''-,'''                                            \\n                                                                \\n               ''                                               \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \\n                                                                \"]"))
}, 241994, e => {
    "use strict";
    var n = e.i(253719),
        t = e.i(134841),
        r = e.i(730592),
        a = e.i(323576),
        i = e.i(420851);

    function s({
        size: e
    }) {
        return (0, n.jsxs)("svg", {
            width: e,
            height: e,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "rgba(255, 255, 255, 0.5)",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: [(0, n.jsx)("path", {
                d: "m10 20-1.25-2.5L6 18"
            }), (0, n.jsx)("path", {
                d: "M10 4 8.75 6.5 6 6"
            }), (0, n.jsx)("path", {
                d: "m14 20 1.25-2.5L18 18"
            }), (0, n.jsx)("path", {
                d: "m14 4 1.25 2.5L18 6"
            }), (0, n.jsx)("path", {
                d: "m17 21-3-6h-4"
            }), (0, n.jsx)("path", {
                d: "m17 3-3 6 1.5 3"
            }), (0, n.jsx)("path", {
                d: "M2 12h6.5L10 9"
            }), (0, n.jsx)("path", {
                d: "m20 10-1.5 2 1.5 2"
            }), (0, n.jsx)("path", {
                d: "M22 12h-6.5L14 15"
            }), (0, n.jsx)("path", {
                d: "m4 10 1.5 2L4 14"
            }), (0, n.jsx)("path", {
                d: "m7 21 3-6-1.5-3"
            }), (0, n.jsx)("path", {
                d: "m7 3 3 6h4"
            })]
        })
    }

    function o() {
        let e = Array.from({
            length: 10
        }, (e, n) => ({
            id: n,
            left: `${10.5*n%100}%`,
            delay: `${-(.8*n)}s`,
            duration: `${3.5+n%3*.8}s`,
            size: 8 + n % 4 * 2
        }));
        return (0, n.jsx)("div", {
            className: "absolute inset-0 overflow-hidden pointer-events-none",
            children: e.map(e => (0, n.jsx)("span", {
                className: "absolute top-0 animate-snowfall",
                style: {
                    left: e.left,
                    animationDelay: e.delay,
                    animationDuration: e.duration
                },
                children: (0, n.jsx)(s, {
                    size: e.size
                })
            }, e.id))
        })
    }

    function l({
        variant: e,
        children: t
    }) {
        return (0, n.jsxs)("div", {
            className: "container p-12 relative z-[102]",
            children: [(0, n.jsxs)("div", {
                className: (0, i.cn)("p-10 rounded-10 overflow-hidden relative text-body-medium text-center", {
                    "bg-heat-100 text-accent-white": "primary" === e,
                    "bg-accent-black text-accent-white": "dark" === e,
                    "bg-black-alpha-4 text-accent-black": "secondary" === e,
                    "text-accent-white selection-on-colored": "holiday" === e
                }),
                style: "holiday" === e ? {
                    background: "radial-gradient(ellipse 120% 100% at 50% 50%, #eb3424 0%, #d42d1f 50%, #bf2819 100%)"
                } : void 0,
                children: ["holiday" === e && (0, n.jsx)(o, {}), (0, n.jsx)("div", {
                    className: (0, i.cn)("overlay pointer-events-none select-none lg-max:hidden", {
                        "text-heat-100": "secondary" === e || "dark" === e
                    })
                }), (0, n.jsx)("span", {
                    className: "relative z-10",
                    children: t
                })]
            }), (0, n.jsx)("div", {
                className: "bottom-0 absolute h-1 w-screen left-[calc(50%-50vw)] bg-border-faint"
            }), (0, n.jsx)(a.Connector, {
                className: "absolute -bottom-10 -left-[10.5px]"
            }), (0, n.jsx)(a.Connector, {
                className: "absolute -bottom-10 -right-[10.5px]"
            })]
        })
    }
    let c = [{
        text: "Introducing web-agent, an open framework for building web agents. Fork it, swap models, and add Skills.",
        linkText: "Start building →",
        linkHref: "https://github.com/firecrawl/web-agent?utm_source=firecrawl-website&utm_medium=banner&utm_campaign=open-source-agent-launch&utm_content=start-building"
    }];

    function u() {
        let e = (0, r.useMemo)(() => {
            let e = Math.floor(Math.random() * c.length);
            return c[e]
        }, []);
        return (0, n.jsxs)(l, {
            variant: e.variant ? ? "primary",
            children: [e.text, " ", (0, n.jsx)(t.default, {
                href: e.linkHref,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-label-medium underline",
                children: e.linkText
            })]
        })
    }
    e.s(["default", () => u], 241994)
}, 835630, e => {
    "use strict";
    var n = e.i(253719),
        t = e.i(730592),
        r = e.i(219721),
        a = e.i(825489),
        i = e.i(296809);
    let s = "Roboto Mono, monospace",
        o = "#FA5D19";

    function l() {
        let e = (0, t.useRef)(null),
            l = (0, t.useRef)(null);
        return (0, t.useEffect)(() => {
            if (!e.current) return;
            let {
                ctx: n,
                textWidth: t,
                textHeight: c
            } = (0, a.setupAsciiCanvas)(e.current, r.default[0], 8, 10, s);
            (0, a.renderAsciiFrame)(n, r.default[0], t, c, 8, 10, s, o);
            let u = 0,
                d = (0, i.setIntervalOnVisible)({
                    element: l.current,
                    callback: () => {
                        ++u >= r.default.length && (u = 0), (0, a.renderAsciiFrame)(n, r.default[u], t, c, 8, 10, s, o)
                    },
                    interval: 85
                });
            return () => d ? .()
        }, []), (0, n.jsx)("div", {
            className: "absolute inset-10 overflow-clip pointer-events-none select-none",
            ref: l,
            children: (0, n.jsx)("canvas", {
                className: "absolute left-15 lg-max:top-20 top-90 fc-decoration",
                ref: e
            })
        })
    }
    e.s(["default", () => l])
}, 483585, e => {
    "use strict";
    var n = e.i(253719),
        t = e.i(397038);
    e.i(928448);
    var r = e.i(358794),
        a = e.i(134841),
        i = e.i(872969);
    let s = (0, i.createServerReference)("005d7dd21982b662490295e3911e1e6eb5bc0fcf20", i.callServer, void 0, i.findSourceMapURL, "fetchSystemStatus");
    var o = e.i(730592);

    function l() {
        let [e, i] = (0, o.useState)(null);
        (0, o.useEffect)(() => {
            s().then(i)
        }, []);
        let {
            state: l,
            label: c
        } = e ? ? {
            state: "unknown",
            label: "Loading status..."
        };
        return (0, n.jsxs)("div", {
            className: "p-16 lg:p-24 text-body-medium -mt-1 relative",
            children: [(0, n.jsx)(r.CurvyRect, {
                className: "overlay",
                allSides: !0
            }), (0, n.jsx)("div", {
                className: "h-full lg-max:hidden w-1 top-0 left-[calc(50%-0.5px)] absolute bg-border-faint"
            }), (0, n.jsx)(a.default, {
                className: "contents",
                href: "https://status.firecrawl.dev",
                target: "_blank",
                children: (0, n.jsxs)(t.default, {
                    size: "large",
                    variant: "tertiary",
                    children: [(0, n.jsx)("div", {
                        className: "size-20 flex-center",
                        children: (0, n.jsx)("div", {
                            className: `size-6 rounded-full ${"operational"===l?"bg-accent-bluetron":"degraded"===l||"maintenance"===l?"bg-yellow-400":"down"===l?"bg-red-500":"bg-neutral-400"}`
                        })
                    }), (0, n.jsx)("span", {
                        className: "operational" === l ? "text-accent-bluetron" : "degraded" === l || "maintenance" === l ? "text-yellow-400" : "down" === l ? "text-red-500" : "text-neutral-400",
                        children: c
                    })]
                })
            })]
        })
    }
    e.s(["default", () => l], 483585)
}, 545471, e => {
    "use strict";
    var n = e.i(253719),
        t = e.i(998690);

    function r() {
        return (0, n.jsxs)("svg", {
            fill: "none",
            height: "15",
            viewBox: "0 0 79 15",
            width: "79",
            className: "text-accent-black",
            xmlns: "http://www.w3.org/2000/svg",
            children: [(0, n.jsx)("path", {
                d: "M0.599609 14.4311V0.576888H9.45474V2.59564H2.87778V6.61335H8.30575V8.57272H2.87778V14.4311H0.599609Z",
                fill: "currentColor"
            }), (0, n.jsx)("path", {
                d: "M11.9737 2.87272C11.2407 2.87272 10.6663 2.33835 10.6663 1.58626C10.6663 0.83418 11.2407 0.299805 11.9737 0.299805C12.7067 0.299805 13.2812 0.83418 13.2812 1.58626C13.2812 2.33835 12.7067 2.87272 11.9737 2.87272ZM10.8842 14.4311V4.29772H13.0237V14.4311H10.8842Z",
                fill: "currentColor"
            }), (0, n.jsx)("path", {
                d: "M20.1527 4.29772H20.6281V6.29668H19.6772C17.7755 6.29668 17.1613 7.78105 17.1613 9.3446V14.4311H15.0219V4.29772H16.9236L17.1613 5.82168C17.6764 4.97064 18.4886 4.29772 20.1527 4.29772Z",
                fill: "currentColor"
            }), (0, n.jsx)("path", {
                d: "M26.1788 14.5498C22.9894 14.5498 20.9886 12.4915 20.9886 9.38418C20.9886 6.2571 22.9894 4.17897 25.9807 4.17897C28.9126 4.17897 30.8738 6.03939 30.9333 9.00814C30.9333 9.26543 30.9135 9.54251 30.8738 9.8196H23.2271V9.95814C23.2865 11.68 24.3761 12.8081 26.06 12.8081C27.3674 12.8081 28.3183 12.155 28.6155 11.0269H30.755C30.3984 13.0258 28.6947 14.5498 26.1788 14.5498ZM23.3064 8.25605H28.7145C28.5362 6.75189 27.4863 5.90085 26.0005 5.90085C24.6336 5.90085 23.4648 6.81126 23.3064 8.25605Z",
                fill: "currentColor"
            }), (0, n.jsx)("path", {
                d: "M37.2193 14.5498C34.1487 14.5498 32.1875 12.5508 32.1875 9.38418C32.1875 6.2571 34.2081 4.17897 37.2787 4.17897C39.8936 4.17897 41.5181 5.62376 41.9341 7.9196H39.6955C39.4182 6.7321 38.5664 5.9998 37.2391 5.9998C35.5156 5.9998 34.3864 7.38522 34.3864 9.38418C34.3864 11.3633 35.5156 12.729 37.2391 12.729C38.5465 12.729 39.4182 11.9769 39.6757 10.8092H41.9341C41.5379 13.105 39.8144 14.5498 37.2193 14.5498Z",
                fill: "currentColor"
            }), (0, n.jsx)("path", {
                d: "M48.6034 4.29772H49.0789V6.29668H48.128C46.2262 6.29668 45.6121 7.78105 45.6121 9.3446V14.4311H43.4726V4.29772H45.3744L45.6121 5.82168C46.1272 4.97064 46.9394 4.29772 48.6034 4.29772Z",
                fill: "currentColor"
            }), (0, n.jsx)("path", {
                d: "M54.3679 4.17897C57.0621 4.17897 58.6073 5.46543 58.6073 7.86022V14.4311H56.7451L56.5668 12.9863C55.8735 13.8967 54.9028 14.5498 53.2981 14.5498C51.0794 14.5498 49.5936 13.4613 49.5936 11.5811C49.5936 9.50293 51.0992 8.33522 53.9519 8.33522H56.4876V7.72168C56.4876 6.59355 55.6754 5.90085 54.2688 5.90085C53.001 5.90085 52.1491 6.4946 51.9907 7.38522H49.8908C50.1087 5.40605 51.8124 4.17897 54.3679 4.17897ZM53.6547 12.8873C55.4376 12.8873 56.4678 11.8383 56.4876 10.2748V9.91855H53.833C52.5057 9.91855 51.7728 10.4133 51.7728 11.4425C51.7728 12.2936 52.4859 12.8873 53.6547 12.8873Z",
                fill: "currentColor"
            }), (0, n.jsx)("path", {
                d: "M62.7912 14.4311L59.4829 4.29772H61.7413L64.0591 12.0561L66.3768 4.29772H68.3381L70.5568 12.0561L72.9538 4.29772H75.1329L71.7652 14.4311H69.4672L67.3277 7.54355L65.109 14.4311H62.7912Z",
                fill: "currentColor"
            }), (0, n.jsx)("path", {
                d: "M76.1601 14.4311V0.576888H78.2996V14.4311H76.1601Z",
                fill: "currentColor"
            })]
        })
    }
    var a = e.i(924192),
        i = e.i(420851),
        s = e.i(26012),
        o = e.i(624609),
        l = e.i(154712),
        c = e.i(989873),
        u = e.i(796620),
        d = e.i(534026),
        f = e.i(134841),
        _ = e.i(730592);

    function h() {
        return (0, n.jsx)("svg", {
            fill: "none",
            height: "20",
            viewBox: "0 0 20 20",
            width: "20",
            className: "text-accent-black",
            xmlns: "http://www.w3.org/2000/svg",
            children: (0, n.jsx)("path", {
                className: "group-hover:stroke-heat-100 duration-[200ms] transition-all",
                d: "M12.8334 10.8334L10.4715 13.1953C10.2111 13.4557 9.78904 13.4557 9.52869 13.1953L7.16675 10.8334M10.0001 3.83337V13.1667M14.8334 16.1667H5.16675",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "1.25"
            })
        })
    }

    function p() {
        return (0, n.jsx)("svg", {
            fill: "none",
            height: "20",
            viewBox: "0 0 20 20",
            width: "20",
            className: "text-accent-black",
            xmlns: "http://www.w3.org/2000/svg",
            children: (0, n.jsx)("path", {
                className: "group-hover:stroke-heat-100 duration-[200ms] transition-all",
                d: "M10.0001 7.16663C10.0001 6.06206 10.8955 5.16663 12.0001 5.16663H15.8334C16.3857 5.16663 16.8334 5.61434 16.8334 6.16663V13.8333C16.8334 14.3856 16.3857 14.8333 15.8334 14.8333H12.1847C11.7311 14.8333 11.2865 14.9427 10.9006 15.1812C10.5148 15.4197 10.2029 15.7609 10.0001 16.1666M10.0001 7.16663C10.0001 6.06206 9.10465 5.16663 8.00008 5.16663H4.16675C3.61446 5.16663 3.16675 5.61434 3.16675 6.16663V13.8333C3.16675 14.3856 3.61446 14.8333 4.16675 14.8333H7.81541C8.26902 14.8333 8.71367 14.9427 9.09953 15.1812C9.48539 15.4197 9.79722 15.7609 10.0001 16.1666M10.0001 7.16663V16.1666",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "1.25"
            })
        })
    }

    function v() {
        return (0, n.jsx)("svg", {
            fill: "none",
            height: "20",
            viewBox: "0 0 20 20",
            width: "20",
            className: "text-accent-black",
            xmlns: "http://www.w3.org/2000/svg",
            children: (0, n.jsx)("path", {
                className: "group-hover:fill-heat-100 duration-[200ms] transition-all",
                d: "M13.7605 6.61389C13.138 6.79867 12.6687 7.21667 12.3251 7.67073C12.2513 7.76819 12.0975 7.69495 12.1268 7.57552C12.7848 4.86978 11.9155 2.6209 9.20582 1.51393C9.06836 1.4576 8.92527 1.58097 8.96132 1.72519C10.1939 6.67417 5.00941 6.25673 5.66459 11.8671C5.67585 11.9634 5.56769 12.0293 5.48882 11.973C5.2432 11.7967 4.96885 11.4288 4.78069 11.1702C4.72548 11.0942 4.60605 11.1156 4.5807 11.2063C4.43085 11.7482 4.35986 12.2586 4.35986 12.7656C4.35986 14.7373 5.37333 16.473 6.90734 17.4791C6.99522 17.5366 7.10789 17.4543 7.07804 17.3535C6.99917 17.0887 6.95466 16.8093 6.95128 16.5203C6.95128 16.3429 6.96255 16.1615 6.99015 15.9925C7.05438 15.5677 7.20197 15.1632 7.44985 14.7948C8.29995 13.5188 10.0041 12.2862 9.73199 10.6125C9.71453 10.5066 9.83959 10.4368 9.91846 10.5094C11.119 11.6063 11.3567 13.0817 11.1595 14.405C11.1426 14.5199 11.2868 14.5813 11.3595 14.4912C11.5432 14.2613 11.7674 14.0596 12.0113 13.9081C12.0722 13.8703 12.1533 13.8991 12.1764 13.9667C12.3121 14.3616 12.5138 14.7323 12.7042 15.1029C12.9318 15.5485 13.0529 16.0573 13.0338 16.5958C13.0242 16.8578 12.9808 17.1113 12.9082 17.3524C12.8772 17.4543 12.9887 17.5394 13.0783 17.4808C14.6134 16.4747 15.6275 14.739 15.6275 12.7662C15.6275 12.0806 15.5075 11.4085 15.2804 10.7787C14.8044 9.45766 13.5966 8.46561 13.9019 6.74403C13.9166 6.66178 13.8405 6.59023 13.7605 6.61389Z",
                fill: "currentColor"
            })
        })
    }

    function m() {
        let [e, i] = (0, _.useState)(!1), {
            dropdownContent: s,
            clearDropdown: o
        } = (0, a.useHeaderContext)();
        return (0, _.useEffect)(() => {
            document.addEventListener("click", () => {
                i(!1)
            })
        }, [e]), (0, _.useEffect)(() => {
            s && i(!1)
        }, [s]), (0, n.jsxs)("div", {
            className: "relative",
            children: [(0, n.jsxs)(f.default, {
                className: "flex items-center gap-2 relative brand-kit-menu",
                href: "/",
                onContextMenu: n => {
                    n.preventDefault(), i(!e), e || o(!0)
                },
                children: [(0, n.jsx)(t.default, {
                    className: "size-28 -top-2 relative"
                }), (0, n.jsx)(r, {})]
            }), (0, n.jsx)(u.AnimatePresence, {
                initial: !1,
                mode: "popLayout",
                children: e && (0, n.jsx)(g, {
                    setOpen: i
                })
            })]
        })
    }
    let g = ({
            setOpen: e
        }) => {
            let t = (0, _.useRef)(null),
                r = (0, _.useRef)(null),
                a = (0, _.useCallback)(e => {
                    r.current && clearTimeout(r.current);
                    let n = e.target,
                        a = n instanceof HTMLButtonElement ? n : n.closest("button");
                    t.current && ((0, l.animate)(t.current, {
                        scale: .98,
                        opacity: 1
                    }).then(() => {
                        t.current && (0, l.animate)(t.current, {
                            scale: 1
                        })
                    }), (0, l.animate)(t.current, {
                        y: a.offsetTop - 4
                    }, {
                        ease: (0, c.cubicBezier)(.1, .1, .25, 1),
                        duration: .2
                    }))
                }, []),
                i = (0, _.useCallback)(() => {
                    r.current && clearTimeout(r.current), r.current = window.setTimeout(() => {
                        t.current && (0, l.animate)(t.current, {
                            scale: 1,
                            opacity: 0
                        })
                    }, 100)
                }, []);
            return (0, n.jsxs)(d.motion.div, {
                animate: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)"
                },
                className: "absolute w-220 whitespace-nowrap rounded-16 p-4 bg-surface left-0 top-[calc(100%+8px)] z-[2000] border border-border-faint",
                exit: {
                    opacity: 0,
                    y: 8,
                    scale: .98,
                    filter: "blur(1px)"
                },
                initial: {
                    opacity: 0,
                    y: -6,
                    filter: "blur(1px)"
                },
                style: {
                    boxShadow: "0px 12px 24px var(--black-alpha-8), 0px 4px 8px var(--black-alpha-4)"
                },
                transition: {
                    ease: (0, c.cubicBezier)(.1, .1, .25, 1),
                    duration: .2
                },
                children: [(0, n.jsx)("div", {
                    className: "absolute top-4 opacity-0 z-[2] pointer-events-none inset-x-4 bg-black-alpha-4 rounded-12 h-32",
                    ref: t
                }), (0, n.jsxs)(x, {
                    onClick: () => {
                        window.open("/", "_blank"), e(!1)
                    },
                    onMouseEnter: a,
                    onMouseLeave: i,
                    children: [(0, n.jsx)(o.ArrowUpRight, {
                        className: "w-18 h-18"
                    }), "Open in new tab"]
                }), (0, n.jsx)("div", {
                    className: "px-8 py-4",
                    children: (0, n.jsx)("div", {
                        className: "h-1 w-full bg-black-alpha-5"
                    })
                }), (0, n.jsxs)(x, {
                    onClick: () => {
                        (0, s.default)(`<svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M13.7605 6.61389C13.138 6.79867 12.6687 7.21667 12.3251 7.67073C12.2513 7.76819 12.0975 7.69495 12.1268 7.57552C12.7848 4.86978 11.9155 2.6209 9.20582 1.51393C9.06836 1.4576 8.92527 1.58097 8.96132 1.72519C10.1939 6.67417 5.00941 6.25673 5.66459 11.8671C5.67585 11.9634 5.56769 12.0293 5.48882 11.973C5.2432 11.7967 4.96885 11.4288 4.78069 11.1702C4.72548 11.0942 4.60605 11.1156 4.5807 11.2063C4.43085 11.7482 4.35986 12.2586 4.35986 12.7656C4.35986 14.7373 5.37333 16.473 6.90734 17.4791C6.99522 17.5366 7.10789 17.4543 7.07804 17.3535C6.99917 17.0887 6.95466 16.8093 6.95128 16.5203C6.95128 16.3429 6.96255 16.1615 6.99015 15.9925C7.05438 15.5677 7.20197 15.1632 7.44985 14.7948C8.29995 13.5188 10.0041 12.2862 9.73199 10.6125C9.71453 10.5066 9.83959 10.4368 9.91846 10.5094C11.119 11.6063 11.3567 13.0817 11.1595 14.405C11.1426 14.5199 11.2868 14.5813 11.3595 14.4912C11.5432 14.2613 11.7674 14.0596 12.0113 13.9081C12.0722 13.8703 12.1533 13.8991 12.1764 13.9667C12.3121 14.3616 12.5138 14.7323 12.7042 15.1029C12.9318 15.5485 13.0529 16.0573 13.0338 16.5958C13.0242 16.8578 12.9808 17.1113 12.9082 17.3524C12.8772 17.4543 12.9887 17.5394 13.0783 17.4808C14.6134 16.4747 15.6275 14.739 15.6275 12.7662C15.6275 12.0806 15.5075 11.4085 15.2804 10.7787C14.8044 9.45766 13.5966 8.46561 13.9019 6.74403C13.9166 6.66178 13.8405 6.59023 13.7605 6.61389Z"
    fill="currentColor"
  />
</svg>`), e(!1)
                    },
                    onMouseEnter: a,
                    onMouseLeave: i,
                    children: [(0, n.jsx)(v, {}), "Copy logo as SVG"]
                }), (0, n.jsxs)(x, {
                    onClick: () => {
                        try {
                            window.open("/brand/brand-assets.zip", "_blank")
                        } catch (e) {
                            console.error(e)
                        }
                        e(!1)
                    },
                    onMouseEnter: a,
                    onMouseLeave: i,
                    children: [(0, n.jsx)(h, {}), "Download brand assets"]
                }), (0, n.jsx)("div", {
                    className: "px-8 py-4",
                    children: (0, n.jsx)("div", {
                        className: "h-1 w-full bg-black-alpha-5"
                    })
                }), (0, n.jsxs)(x, {
                    onClick: () => {
                        try {
                            window.open("/brand", "_blank")
                        } catch (e) {
                            console.error(e)
                        }
                        e(!1)
                    },
                    onMouseEnter: a,
                    onMouseLeave: i,
                    children: [(0, n.jsx)(p, {}), "Visit brand guidelines"]
                })]
            })
        },
        x = e => (0, n.jsx)("button", { ...e,
            className: (0, i.cn)("flex gap-8 w-full items-center text-label-small group text-accent-black p-6", e.className),
            children: e.children
        });
    e.s(["default", () => m], 545471)
}, 178268, e => {
    "use strict";
    var n = e.i(253719),
        t = e.i(796620),
        r = e.i(989873),
        a = e.i(534026),
        i = e.i(730592),
        s = e.i(323576),
        o = e.i(924192),
        l = e.i(838148),
        c = e.i(106080);

    function u() {
        let {
            dropdownContent: e,
            resetDropdownTimeout: u,
            clearDropdown: d,
            dropdownKey: f,
            headerHeight: _,
            headerTop: h
        } = (0, o.useHeaderContext)(), [p, v] = (0, i.useState)(null);
        (0, i.useEffect)(() => {
            (0, l.lockBody)("header-dropdown", !!e)
        }, [e]), (0, i.useEffect)(() => {
            let e = () => {
                v(window.visualViewport ? .height ? ? window.innerHeight)
            };
            return e(), window.addEventListener("resize", e), window.visualViewport ? .addEventListener("resize", e), window.visualViewport ? .addEventListener("scroll", e), () => {
                window.removeEventListener("resize", e), window.visualViewport ? .removeEventListener("resize", e), window.visualViewport ? .removeEventListener("scroll", e)
            }
        }, []);
        let m = h.current + _.current + 1,
            g = p ? Math.max(p - m, 0) : null;
        return (0, n.jsx)(t.AnimatePresence, {
            children: e && (0, n.jsxs)(a.motion.div, {
                animate: {
                    opacity: 1
                },
                className: "h-screen w-screen fixed left-0 z-[2000] bg-black-alpha-40",
                exit: {
                    opacity: 0,
                    transition: {
                        duration: .3,
                        delay: .1,
                        ease: (0, r.cubicBezier)(.4, 0, .2, 1)
                    }
                },
                initial: {
                    opacity: 0
                },
                style: {
                    top: m,
                    height: g ? `${g}px` : void 0
                },
                transition: {
                    duration: .3,
                    ease: (0, r.cubicBezier)(.4, 0, .2, 1)
                },
                children: [(0, n.jsx)("div", {
                    className: "overlay",
                    onClick: () => {
                        window.innerWidth < 996 && d(!0)
                    },
                    onMouseEnter: () => {
                        window.innerWidth > 996 && d(!0)
                    }
                }), (0, n.jsx)(c.default, {
                    animate: {
                        transition: {
                            duration: .5,
                            ease: (0, r.cubicBezier)(.4, 0, .2, 1)
                        }
                    },
                    className: "overflow-clip relative",
                    exit: {
                        height: 0,
                        transition: {
                            duration: .3,
                            ease: (0, r.cubicBezier)(.4, 0, .2, 1)
                        }
                    },
                    initial: {
                        height: 0
                    },
                    children: (0, n.jsx)(t.AnimatePresence, {
                        mode: "popLayout",
                        children: (0, n.jsxs)(a.motion.div, {
                            className: "bg-background-base hide-scrollbar relative overflow-x-clip overflow-y-auto",
                            style: {
                                maxHeight: g ? `${g}px` : `calc(100vh - ${m}px)`
                            },
                            onMouseEnter: u,
                            onMouseLeave: () => {
                                window.innerWidth < 996 || d()
                            },
                            children: [(0, n.jsxs)("div", {
                                className: "cmw-[1112px] absolute h-full pointer-events-none top-0 border-x border-border-faint",
                                children: [(0, n.jsx)(s.Connector, {
                                    className: "absolute -left-[11.5px] -top-11"
                                }), (0, n.jsx)(s.Connector, {
                                    className: "absolute -right-[11.5px] -top-11"
                                })]
                            }), (0, n.jsx)(a.motion.div, {
                                animate: {
                                    opacity: 1
                                },
                                exit: {
                                    opacity: 0,
                                    pointerEvents: "none"
                                },
                                initial: {
                                    opacity: 0
                                },
                                transition: {
                                    duration: .3,
                                    ease: (0, r.cubicBezier)(.4, 0, .2, 1)
                                },
                                children: e
                            })]
                        }, f)
                    })
                })]
            })
        })
    }
    e.s(["default", () => u])
}, 671434, e => {
    "use strict";
    var n = e.i(253719),
        t = e.i(730592),
        r = e.i(825489),
        a = e.i(420851),
        i = e.i(296809),
        s = e.i(863635);
    let o = "Roboto Mono, monospace",
        l = "rgba(0, 0, 0, 0.2)";

    function c(e) {
        let c = (0, t.useRef)(null),
            u = (0, t.useRef)(null);
        return (0, t.useEffect)(() => {
            if (!c.current) return;
            let {
                ctx: e,
                textWidth: n,
                textHeight: t
            } = (0, r.setupAsciiCanvas)(c.current, s.default[0], 8, 10, o);
            (0, r.renderAsciiFrame)(e, s.default[0], n, t, 8, 10, o, l);
            let a = 0,
                d = (0, i.setIntervalOnVisible)({
                    element: u.current,
                    callback: () => {
                        ++a >= s.default.length && (a = 0), (0, r.renderAsciiFrame)(e, s.default[a], n, t, 8, 10, o, l)
                    },
                    interval: 60
                });
            return () => d ? .()
        }, []), (0, n.jsx)("div", {
            className: "absolute -top-20 left-180 w-194 h-192",
            style: {
                maskImage: "url('/assets-original/github-mask.png')",
                maskSize: "100% 100%"
            },
            children: (0, n.jsx)("div", {
                ref: u,
                ...e,
                className: (0, a.cn)("w-308 h-380 -top-20 -left-40 absolute pointer-events-none select-none", e.className),
                children: (0, n.jsx)("canvas", {
                    className: "relative top-0 left-0 fc-decoration",
                    ref: c
                })
            })
        })
    }
    e.s(["default", () => c])
}, 625466, e => {
    "use strict";
    var n = e.i(253719),
        t = e.i(730592),
        r = e.i(219721),
        a = e.i(825489),
        i = e.i(420851),
        s = e.i(296809);
    let o = "Roboto Mono, monospace",
        l = "rgba(0, 0, 0, 0.2)";

    function c(e) {
        let c = (0, t.useRef)(null),
            u = (0, t.useRef)(null);
        return (0, t.useEffect)(() => {
            if (!c.current) return;
            let {
                ctx: e,
                textWidth: n,
                textHeight: t
            } = (0, a.setupAsciiCanvas)(c.current, r.default[0], 8, 10, o);
            (0, a.renderAsciiFrame)(e, r.default[0], n, t, 8, 10, o, l);
            let i = 0,
                d = (0, s.setIntervalOnVisible)({
                    element: u.current,
                    callback: () => {
                        ++i >= r.default.length && (i = 0), (0, a.renderAsciiFrame)(e, r.default[i], n, t, 8, 10, o, l)
                    },
                    interval: 60
                });
            return () => d ? .()
        }, []), (0, n.jsx)("div", {
            className: "absolute right-10 bottom-10 w-194 h-165",
            style: {
                maskImage: "url('/assets-original/replit-mask.png')",
                maskSize: "100% 100%"
            },
            children: (0, n.jsx)("div", {
                ref: u,
                ...e,
                className: (0, i.cn)("w-308 h-380 -top-20 -left-40 absolute pointer-events-none select-none", e.className),
                children: (0, n.jsx)("canvas", {
                    className: "relative top-0 left-0 fc-decoration",
                    ref: c
                })
            })
        })
    }
    e.s(["default", () => c])
}, 787375, e => {
    "use strict";
    var n = e.i(253719),
        t = e.i(536925);
    e.s(["RenderEndpointIcon", 0, ({
        icon: e,
        ...r
    }) => {
        let a = (0, t.useMediaQuery)("(max-width: 996px)");
        return (0, n.jsx)(e, { ...r,
            size: a ? 24 : 20
        })
    }])
}, 212433, e => {
    "use strict";
    var n = e.i(253719),
        t = e.i(924192),
        r = e.i(420851);

    function a() {
        return (0, n.jsx)("svg", {
            fill: "none",
            height: "20",
            viewBox: "0 0 18 20",
            width: "18",
            className: "text-accent-black",
            xmlns: "http://www.w3.org/2000/svg",
            children: (0, n.jsx)("path", {
                d: "M6 9.5L9 12.5L12 9.5",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeOpacity: "0.56",
                strokeWidth: "1.25"
            })
        })
    }
    var i = e.i(134841);

    function s({
        label: e,
        href: s,
        dropdown: o
    }) {
        let {
            dropdownContent: l,
            setDropdownContent: c,
            clearDropdown: u
        } = (0, t.useHeaderContext)(), d = l === o;
        return (0, n.jsxs)(i.default, {
            className: "p-6 relative flex h-32 group rounded-8 active:scale-[0.98] transition-all duration-[50ms] active:duration-[100ms]",
            href: s,
            onMouseEnter: () => {
                o ? c(o) : u(!0)
            },
            onMouseLeave: () => {
                o && u()
            },
            children: [(0, n.jsx)("span", {
                className: (0, r.cn)("overlay pointer-events-none group-hover:bg-black-alpha-4 transition-all scale-95 group-active:duration-[100ms] duration-[150ms] group-hover:scale-100 group-active:bg-black-alpha-7", d && "!scale-100 !bg-black-alpha-4")
            }), (0, n.jsx)("span", {
                className: "px-4 text-label-medium text-accent-black",
                children: e
            }), o && (0, n.jsx)(a, {})]
        })
    }
    e.s(["default", () => s], 212433)
}, 697516, e => {
    "use strict";
    var n = e.i(253719),
        t = e.i(599926),
        r = e.i(730592),
        a = e.i(420851);

    function i({
        children: e
    }) {
        let [i, s] = (0, r.useState)(!1), o = (0, t.usePathname)();
        return (0, r.useEffect)(() => {
            let e = document.getElementById("hero-content") ? .clientHeight || 100,
                n = () => {
                    s(window.scrollY > e)
                };
            n(), window.addEventListener("scroll", n)
        }, [o]), (0, n.jsx)("div", {
            className: (0, a.cn)("container lg:px-56 px-16 flex justify-between transition-[padding] duration-[200ms] items-center", i ? "py-20" : "py-20 lg:py-34"),
            children: e
        })
    }
    e.s(["default", () => i])
}, 831746, e => {
    "use strict";
    var n = e.i(253719),
        t = e.i(397038),
        r = e.i(924192),
        a = e.i(420851);

    function i({
        dropdownContent: e
    }) {
        let {
            dropdownContent: i,
            clearDropdown: s,
            setDropdownContent: o
        } = (0, r.useHeaderContext)();
        return (0, n.jsx)(t.default, {
            className: "lg:hidden",
            variant: "tertiary",
            onClick: () => {
                e === i ? s(!0) : o(e)
            },
            "aria-label": "Toggle menu",
            children: (0, n.jsxs)("svg", {
                className: "!size-20 text-accent-black",
                fill: "none",
                height: "20",
                viewBox: "0 0 20 20",
                width: "20",
                xmlns: "http://www.w3.org/2000/svg",
                children: [(0, n.jsx)("path", {
                    className: (0, a.cn)("transition-all origin-center", {
                        "rotate-45 -translate-y-4": i
                    }),
                    d: "M2.28906 13.9609H17.7057",
                    stroke: "currentColor",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "1.25",
                    style: {
                        transformBox: "fill-box"
                    }
                }), (0, n.jsx)("path", {
                    className: (0, a.cn)("transition-all origin-center", {
                        "-rotate-45 translate-y-3 translate-x-[2.5px]": i
                    }),
                    d: "M2.28906 6.03906H17.7057",
                    stroke: "currentColor",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "1.25"
                })]
            })
        })
    }
    e.s(["default", () => i])
}, 347211, e => {
    "use strict";
    var n = e.i(253719),
        t = e.i(796620),
        r = e.i(989873),
        a = e.i(534026),
        i = e.i(730592),
        s = e.i(323576),
        o = e.i(420851),
        l = e.i(134841);

    function c({
        item: e
    }) {
        let [c, u] = (0, i.useState)(!1);
        return (0, n.jsxs)(n.Fragment, {
            children: [(0, n.jsxs)(l.default, {
                className: "p-24 flex group relative",
                href: e.href,
                onClick: n => {
                    e.dropdown && (n.preventDefault(), u(e => !e))
                },
                children: [(0, n.jsx)("div", {
                    className: "h-1 bottom-0 absolute left-0 w-full bg-border-faint"
                }), (0, n.jsx)(s.ConnectorToRight, {
                    className: "-top-11 left-0"
                }), (0, n.jsx)(s.ConnectorToRight, {
                    className: "-bottom-10 left-0"
                }), (0, n.jsx)(s.ConnectorToLeft, {
                    className: "-top-11 right-0"
                }), (0, n.jsx)(s.ConnectorToLeft, {
                    className: "-bottom-10 right-0"
                }), (0, n.jsx)("span", {
                    className: "px-4 flex-1 text-label-medium text-accent-black",
                    children: e.label
                }), e.dropdown && (0, n.jsx)("svg", {
                    className: (0, o.cn)("transition-all duration-200", c ? "rotate-180 text-accent-black" : "text-black-alpha-48"),
                    fill: "none",
                    height: "24",
                    viewBox: "0 0 24 24",
                    width: "24",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: (0, n.jsx)("path", {
                        d: "M8.4001 10.2L12.0001 13.8L15.6001 10.2",
                        stroke: "currentColor",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "1.25"
                    })
                })]
            }), (0, n.jsx)(t.AnimatePresence, {
                children: c && (0, n.jsxs)(a.motion.div, {
                    animate: {
                        height: "auto",
                        opacity: 1,
                        filter: "blur(0px)"
                    },
                    className: "overflow-hidden",
                    exit: {
                        height: 0,
                        opacity: 0,
                        filter: "blur(4px)"
                    },
                    initial: {
                        height: 0,
                        opacity: 0,
                        filter: "blur(4px)"
                    },
                    transition: {
                        duration: .3,
                        ease: (0, r.cubicBezier)(.4, 0, .2, 1)
                    },
                    children: [e.dropdown, (0, n.jsxs)("div", {
                        className: "h-44 relative",
                        children: [(0, n.jsx)(s.ConnectorToRight, {
                            className: "-top-11 left-0"
                        }), (0, n.jsx)(s.ConnectorToRight, {
                            className: "-bottom-10 left-0"
                        }), (0, n.jsx)(s.ConnectorToLeft, {
                            className: "-top-11 right-0"
                        }), (0, n.jsx)(s.ConnectorToLeft, {
                            className: "-bottom-10 right-0"
                        }), (0, n.jsx)("div", {
                            className: "h-1 bottom-0 absolute left-0 w-full bg-border-faint"
                        })]
                    })]
                })
            })]
        })
    }
    e.s(["default", () => c])
}, 520837, e => {
    "use strict";
    var n = e.i(253719),
        t = e.i(810578),
        r = e.i(152064),
        a = e.i(821423),
        i = e.i(134841);

    function s() {
        let {
            optionalUser: e,
            loading: s
        } = (0, a.useOptionalUser)(), o = e ? r.createWebRoute.app.page() : r.createWebRoute.signin.page({
            view: "signup"
        });
        return (0, n.jsx)(i.default, {
            href: o,
            "aria-disabled": s,
            onClick: () => {
                window.dataLayer = window.dataLayer || [], e ? window.dataLayer.push({
                    event: "cta_click",
                    cta_type: "dashboard",
                    cta_location: "header",
                    destination: "/app"
                }) : window.dataLayer.push({
                    event: "signup_cta_click",
                    cta_location: "header",
                    cta_text: "Sign up"
                })
            },
            children: (0, n.jsx)(t.default, {
                variant: e ? "secondary" : "primary",
                className: "w-full",
                children: e ? "Dashboard" : "Sign up"
            })
        })
    }
    e.s(["default", () => s])
}, 316301, e => {
    e.v(n => Promise.all(["static/chunks/8eb7005e263fac85.js"].map(n => e.l(n))).then(() => n(900392)))
}]);

//# debugId=069edb3c-d685-8d58-9641-24500778ce65
//# sourceMappingURL=36a2b9bb8d1e213c.js.map