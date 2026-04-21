;
! function() {
    try {
        var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {},
            n = (new e.Error).stack;
        n && ((e._debugIds || (e._debugIds = {}))[n] = "8154106c-08c8-55d2-5a8c-0822714e749a")
    } catch (e) {}
}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 872969, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    });
    var n = {
        callServer: function() {
            return a.callServer
        },
        createServerReference: function() {
            return o.createServerReference
        },
        findSourceMapURL: function() {
            return i.findSourceMapURL
        }
    };
    for (var l in n) Object.defineProperty(r, l, {
        enumerable: !0,
        get: n[l]
    });
    let a = e.r(82924),
        i = e.r(245010),
        o = e.r(281497)
}, 138445, e => {
    "use strict";
    var t = e.i(253719),
        r = e.i(730592),
        n = e.i(420851),
        l = e.i(825489),
        a = e.i(296809);

    function i(i) {
        let o = (0, r.useRef)(null),
            s = (0, r.useRef)(null);
        return (0, r.useEffect)(() => {
            let t;
            return e.A(316301).then(({
                default: e
            }) => {
                if (!o.current) return;
                let {
                    ctx: r,
                    textWidth: n,
                    textHeight: i
                } = (0, l.setupAsciiCanvas)(o.current, e[0], 8, 10, "Roboto Mono, monospace");
                (0, l.renderAsciiFrame)(r, e[0], n, i, 8, 10, "Roboto Mono, monospace", "rgba(0, 0, 0, 0.2)");
                let u = 0;
                t = (0, a.setIntervalOnVisible)({
                    element: s.current,
                    callback: () => {
                        ++u >= e.length && (u = 0), (0, l.renderAsciiFrame)(r, e[u], n, i, 8, 10, "Roboto Mono, monospace", "rgba(0, 0, 0, 0.2)")
                    },
                    interval: 80
                })
            }), () => t ? .()
        }, []), (0, t.jsx)(t.Fragment, {
            children: (0, t.jsx)("div", {
                className: "absolute inset-10 -z-[10] overflow-clip",
                children: (0, t.jsx)("div", {
                    ref: s,
                    ...i,
                    className: (0, n.cn)("cw-[1110px] ch-470 absolute pointer-events-none select-none", i.className),
                    children: (0, t.jsx)("canvas", {
                        ref: o,
                        className: "fc-decoration"
                    })
                })
            })
        })
    }
    e.s(["CoreFlame", () => i])
}, 889647, e => {
    "use strict";
    e.i(138445), e.s([])
}, 323576, e => {
    "use strict";
    var t = e.i(253719),
        r = e.i(420851);

    function n({
        fill: e = "var(--border-faint)",
        ...r
    }) {
        return (0, t.jsx)("svg", {
            fill: "none",
            height: "11",
            viewBox: "0 0 11 11",
            width: "11",
            xmlns: "http://www.w3.org/2000/svg",
            ...r,
            children: (0, t.jsx)("path", {
                d: "M11 1L11 11L10 11L10 7C10 3.68629 7.31371 1 4 1L-4.37114e-08 1L0 -4.80825e-07L11 4.37114e-07L11 1Z",
                fill: e
            })
        })
    }

    function l({
        className: e,
        allSides: l,
        x: a,
        y: i,
        left: o,
        right: s,
        top: u,
        bottom: c,
        topLeft: d,
        topRight: f,
        bottomLeft: h,
        bottomRight: p,
        ...v
    }) {
        let m = d || u || o || a || l,
            g = f || u || s || a || l,
            b = h || c || o || i || l,
            w = p || c || s || i || l;
        return (0, t.jsxs)("div", {
            className: (0, r.cn)(e, "pointer-events-none contain-[layout,paint] curvy-rect"),
            ...v,
            children: [m && (0, t.jsx)(n, {
                className: "-rotate-90 absolute top-0 left-0"
            }), g && (0, t.jsx)(n, {
                className: "absolute top-0 right-0"
            }), b && (0, t.jsx)(n, {
                className: "rotate-180 absolute bottom-0 left-0"
            }), w && (0, t.jsx)(n, {
                className: "rotate-90 absolute bottom-0 right-0"
            })]
        })
    }
    e.s(["Connector", 0, ({
        className: e,
        ...n
    }) => (0, t.jsx)("svg", {
        fill: "none",
        height: "21",
        viewBox: "0 0 22 21",
        width: "22",
        xmlns: "http://www.w3.org/2000/svg",
        ...n,
        className: (0, r.cn)("pointer-events-none contain-[layout,paint] absolute", e),
        children: (0, t.jsx)("path", {
            d: "M10.5 4C10.5 7.31371 7.81371 10 4.5 10H0.5V11H4.5C7.81371 11 10.5 13.6863 10.5 17V21H11.5V17C11.5 13.6863 14.1863 11 17.5 11H21.5V10H17.5C14.1863 10 11.5 7.31371 11.5 4V0H10.5V4Z",
            fill: "var(--border-faint)"
        })
    }), "ConnectorToBottom", 0, ({
        className: e,
        ...n
    }) => (0, t.jsx)("svg", {
        fill: "none",
        height: "11",
        viewBox: "0 0 21 11",
        width: "21",
        xmlns: "http://www.w3.org/2000/svg",
        ...n,
        className: (0, r.cn)("pointer-events-none contain-[layout,paint] absolute", e),
        children: (0, t.jsx)("path", {
            d: "M11 7C11 3.68629 13.6863 1 17 1H21V0H0V1H4C7.31371 1 10 3.68629 10 7V11H11V7Z",
            fill: "var(--border-faint)"
        })
    }), "ConnectorToLeft", 0, ({
        className: e,
        ...n
    }) => (0, t.jsx)("svg", {
        fill: "none",
        height: "21",
        viewBox: "0 0 11 21",
        width: "11",
        xmlns: "http://www.w3.org/2000/svg",
        ...n,
        className: (0, r.cn)("pointer-events-none contain-[layout,paint] absolute", e),
        children: (0, t.jsx)("path", {
            d: "M11 21H10V17C10 13.6863 7.31371 11 4 11H0V10H4C7.31371 10 10 7.31371 10 4V0H11V21Z",
            fill: "var(--border-faint)"
        })
    }), "ConnectorToRight", 0, ({
        className: e,
        ...n
    }) => (0, t.jsx)("svg", {
        fill: "none",
        height: "21",
        viewBox: "0 0 11 21",
        width: "11",
        xmlns: "http://www.w3.org/2000/svg",
        ...n,
        className: (0, r.cn)("pointer-events-none contain-[layout,paint] absolute", e),
        children: (0, t.jsx)("path", {
            d: "M1 4C1 7.31371 3.68629 10 7 10H11V11H7C3.68629 11 1 13.6863 1 17V21H0V0H1V4Z",
            fill: "var(--border-faint)"
        })
    }), "ConnectorToTop", 0, ({
        className: e,
        ...n
    }) => (0, t.jsx)("svg", {
        fill: "none",
        height: "11",
        viewBox: "0 0 21 11",
        width: "21",
        xmlns: "http://www.w3.org/2000/svg",
        ...n,
        className: (0, r.cn)("pointer-events-none contain-[layout,paint] absolute", e),
        children: (0, t.jsx)("path", {
            d: "M11 4C11 7.31371 13.6863 10 17 10H21V11H0V10H4C7.31371 10 10 7.31371 10 4V0H11V4Z",
            fill: "var(--border-faint)"
        })
    }), "default", () => l], 323576)
}, 50712, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "useMergedRef", {
        enumerable: !0,
        get: function() {
            return l
        }
    });
    let n = e.r(730592);

    function l(e, t) {
        let r = (0, n.useRef)(null),
            l = (0, n.useRef)(null);
        return (0, n.useCallback)(n => {
            if (null === n) {
                let e = r.current;
                e && (r.current = null, e());
                let t = l.current;
                t && (l.current = null, t())
            } else e && (r.current = a(e, n)), t && (l.current = a(t, n))
        }, [e, t])
    }

    function a(e, t) {
        if ("function" != typeof e) return e.current = t, () => {
            e.current = null
        }; {
            let r = e(t);
            return "function" == typeof r ? r : () => e(null)
        }
    }("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", {
        value: !0
    }), Object.assign(r.default, r), t.exports = r.default)
}, 444534, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "errorOnce", {
        enumerable: !0,
        get: function() {
            return n
        }
    });
    let n = e => {}
}, 134841, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    });
    var n = {
        default: function() {
            return g
        },
        useLinkStatus: function() {
            return w
        }
    };
    for (var l in n) Object.defineProperty(r, l, {
        enumerable: !0,
        get: n[l]
    });
    let a = e.r(744066),
        i = e.r(253719),
        o = a._(e.r(730592)),
        s = e.r(112014),
        u = e.r(693881),
        c = e.r(50712),
        d = e.r(272196),
        f = e.r(62095);
    e.r(577933);
    let h = e.r(300888),
        p = e.r(295095),
        v = e.r(667440);

    function m(e) {
        return "string" == typeof e ? e : (0, s.formatUrl)(e)
    }

    function g(t) {
        var r;
        let n, l, a, [s, g] = (0, o.useOptimistic)(h.IDLE_LINK_STATUS),
            w = (0, o.useRef)(null),
            {
                href: y,
                as: x,
                children: j,
                prefetch: _ = null,
                passHref: k,
                replace: C,
                shallow: E,
                scroll: M,
                onClick: S,
                onMouseEnter: O,
                onTouchStart: P,
                legacyBehavior: N = !1,
                onNavigate: R,
                ref: L,
                unstable_dynamicOnHover: T,
                ...A
            } = t;
        n = j, N && ("string" == typeof n || "number" == typeof n) && (n = (0, i.jsx)("a", {
            children: n
        }));
        let D = o.default.useContext(u.AppRouterContext),
            V = !1 !== _,
            I = !1 !== _ ? null === (r = _) || "auto" === r ? v.FetchStrategy.PPR : v.FetchStrategy.Full : v.FetchStrategy.PPR,
            {
                href: H,
                as: U
            } = o.default.useMemo(() => {
                let e = m(y);
                return {
                    href: e,
                    as: x ? m(x) : e
                }
            }, [y, x]);
        if (N) {
            if (n ? .$$typeof === Symbol.for("react.lazy")) throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."), "__NEXT_ERROR_CODE", {
                value: "E863",
                enumerable: !1,
                configurable: !0
            });
            l = o.default.Children.only(n)
        }
        let W = N ? l && "object" == typeof l && l.ref : L,
            z = o.default.useCallback(e => (null !== D && (w.current = (0, h.mountLinkInstance)(e, H, D, I, V, g)), () => {
                w.current && ((0, h.unmountLinkForCurrentNavigation)(w.current), w.current = null), (0, h.unmountPrefetchableInstance)(e)
            }), [V, H, D, I, g]),
            B = {
                ref: (0, c.useMergedRef)(z, W),
                onClick(t) {
                    N || "function" != typeof S || S(t), N && l.props && "function" == typeof l.props.onClick && l.props.onClick(t), !D || t.defaultPrevented || function(t, r, n, l, a, i, s) {
                        if ("u" > typeof window) {
                            let u, {
                                nodeName: c
                            } = t.currentTarget;
                            if ("A" === c.toUpperCase() && ((u = t.currentTarget.getAttribute("target")) && "_self" !== u || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey || t.nativeEvent && 2 === t.nativeEvent.which) || t.currentTarget.hasAttribute("download")) return;
                            if (!(0, p.isLocalURL)(r)) {
                                a && (t.preventDefault(), location.replace(r));
                                return
                            }
                            if (t.preventDefault(), s) {
                                let e = !1;
                                if (s({
                                        preventDefault: () => {
                                            e = !0
                                        }
                                    }), e) return
                            }
                            let {
                                dispatchNavigateAction: d
                            } = e.r(555628);
                            o.default.startTransition(() => {
                                d(n || r, a ? "replace" : "push", i ? ? !0, l.current)
                            })
                        }
                    }(t, H, U, w, C, M, R)
                },
                onMouseEnter(e) {
                    N || "function" != typeof O || O(e), N && l.props && "function" == typeof l.props.onMouseEnter && l.props.onMouseEnter(e), D && V && (0, h.onNavigationIntent)(e.currentTarget, !0 === T)
                },
                onTouchStart: function(e) {
                    N || "function" != typeof P || P(e), N && l.props && "function" == typeof l.props.onTouchStart && l.props.onTouchStart(e), D && V && (0, h.onNavigationIntent)(e.currentTarget, !0 === T)
                }
            };
        return (0, d.isAbsoluteUrl)(U) ? B.href = U : N && !k && ("a" !== l.type || "href" in l.props) || (B.href = (0, f.addBasePath)(U)), a = N ? o.default.cloneElement(l, B) : (0, i.jsx)("a", { ...A,
            ...B,
            children: n
        }), (0, i.jsx)(b.Provider, {
            value: s,
            children: a
        })
    }
    e.r(444534);
    let b = (0, o.createContext)(h.IDLE_LINK_STATUS),
        w = () => (0, o.useContext)(b);
    ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", {
        value: !0
    }), Object.assign(r.default, r), t.exports = r.default)
}, 796620, e => {
    "use strict";
    e.i(638440);
    var t = e.i(253719),
        r = e.i(730592),
        n = e.i(232181),
        l = e.i(912826),
        a = e.i(480637),
        i = e.i(156485),
        o = e.i(443390),
        s = r,
        u = e.i(346835);
    class c extends s.Component {
        getSnapshotBeforeUpdate(e) {
            let t = this.props.childRef.current;
            if (t && e.isPresent && !this.props.isPresent) {
                let e = t.offsetParent,
                    r = (0, o.isHTMLElement)(e) && e.offsetWidth || 0,
                    n = this.props.sizeRef.current;
                n.height = t.offsetHeight || 0, n.width = t.offsetWidth || 0, n.top = t.offsetTop, n.left = t.offsetLeft, n.right = r - n.width - n.left
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
        isPresent: r,
        anchorX: n,
        root: l
    }) {
        let a = (0, s.useId)(),
            i = (0, s.useRef)(null),
            o = (0, s.useRef)({
                width: 0,
                height: 0,
                top: 0,
                left: 0,
                right: 0
            }),
            {
                nonce: d
            } = (0, s.useContext)(u.MotionConfigContext);
        return (0, s.useInsertionEffect)(() => {
            let {
                width: e,
                height: t,
                top: s,
                left: u,
                right: c
            } = o.current;
            if (r || !i.current || !e || !t) return;
            let f = "left" === n ? `left: ${u}` : `right: ${c}`;
            i.current.dataset.motionPopId = a;
            let h = document.createElement("style");
            d && (h.nonce = d);
            let p = l ? ? document.head;
            return p.appendChild(h), h.sheet && h.sheet.insertRule(`
          [data-motion-pop-id="${a}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${t}px !important;
            ${f}px !important;
            top: ${s}px !important;
          }
        `), () => {
                p.contains(h) && p.removeChild(h)
            }
        }, [r]), (0, t.jsx)(c, {
            isPresent: r,
            childRef: i,
            sizeRef: o,
            children: s.cloneElement(e, {
                ref: i
            })
        })
    }
    let f = ({
        children: e,
        initial: n,
        isPresent: a,
        onExitComplete: o,
        custom: s,
        presenceAffectsLayout: u,
        mode: c,
        anchorX: f,
        root: p
    }) => {
        let v = (0, l.useConstant)(h),
            m = (0, r.useId)(),
            g = !0,
            b = (0, r.useMemo)(() => (g = !1, {
                id: m,
                initial: n,
                isPresent: a,
                custom: s,
                onExitComplete: e => {
                    for (let t of (v.set(e, !0), v.values()))
                        if (!t) return;
                    o && o()
                },
                register: e => (v.set(e, !1), () => v.delete(e))
            }), [a, v, o]);
        return u && g && (b = { ...b
        }), (0, r.useMemo)(() => {
            v.forEach((e, t) => v.set(t, !1))
        }, [a]), r.useEffect(() => {
            a || v.size || !o || o()
        }, [a]), "popLayout" === c && (e = (0, t.jsx)(d, {
            isPresent: a,
            anchorX: f,
            root: p,
            children: e
        })), (0, t.jsx)(i.PresenceContext.Provider, {
            value: b,
            children: e
        })
    };

    function h() {
        return new Map
    }
    var p = e.i(177426);
    let v = e => e.key || "";

    function m(e) {
        let t = [];
        return r.Children.forEach(e, e => {
            (0, r.isValidElement)(e) && t.push(e)
        }), t
    }
    let g = ({
        children: e,
        custom: i,
        initial: o = !0,
        onExitComplete: s,
        presenceAffectsLayout: u = !0,
        mode: c = "sync",
        propagate: d = !1,
        anchorX: h = "left",
        root: g
    }) => {
        let [b, w] = (0, p.usePresence)(d), y = (0, r.useMemo)(() => m(e), [e]), x = d && !b ? [] : y.map(v), j = (0, r.useRef)(!0), _ = (0, r.useRef)(y), k = (0, l.useConstant)(() => new Map), [C, E] = (0, r.useState)(y), [M, S] = (0, r.useState)(y);
        (0, a.useIsomorphicLayoutEffect)(() => {
            j.current = !1, _.current = y;
            for (let e = 0; e < M.length; e++) {
                let t = v(M[e]);
                x.includes(t) ? k.delete(t) : !0 !== k.get(t) && k.set(t, !1)
            }
        }, [M, x.length, x.join("-")]);
        let O = [];
        if (y !== C) {
            let e = [...y];
            for (let t = 0; t < M.length; t++) {
                let r = M[t],
                    n = v(r);
                x.includes(n) || (e.splice(t, 0, r), O.push(r))
            }
            return "wait" === c && O.length && (e = O), S(m(e)), E(y), null
        }
        let {
            forceRender: P
        } = (0, r.useContext)(n.LayoutGroupContext);
        return (0, t.jsx)(t.Fragment, {
            children: M.map(e => {
                let r = v(e),
                    n = (!d || !!b) && (y === M || x.includes(r));
                return (0, t.jsx)(f, {
                    isPresent: n,
                    initial: (!j.current || !!o) && void 0,
                    custom: i,
                    presenceAffectsLayout: u,
                    mode: c,
                    root: g,
                    onExitComplete: n ? void 0 : () => {
                        if (!k.has(r)) return;
                        k.set(r, !0);
                        let e = !0;
                        k.forEach(t => {
                            t || (e = !1)
                        }), e && (P ? .(), S(_.current), d && w ? .(), s && s())
                    },
                    anchorX: h,
                    children: e
                }, r)
            })
        })
    };
    e.s(["AnimatePresence", () => g], 796620)
}, 468060, e => {
    "use strict";
    var t = e.i(253719),
        r = e.i(420851);
    let n = (0, e.i(730592).forwardRef)(({
        className: e,
        disabled: n,
        ...l
    }, a) => (0, t.jsx)("label", {
        className: (0, r.cn)("py-8 px-12 rounded-8 transition-all w-full block gap-4 cursor-text", "relative bg-surface", "before:inside-border before:border-black-alpha-8 hover:before:border-black-alpha-12 hover:bg-black-alpha-2 focus-within:!bg-surface focus-within:before:!border-heat-100 focus-within:before:!border-[1.25px]", "has-[:disabled]:cursor-not-allowed has-[:disabled]:hover:before:border-black-alpha-8 has-[:disabled]:hover:bg-surface", "text-body-medium", e),
        children: (0, t.jsx)("input", {
            ref: a,
            disabled: n,
            className: (0, r.cn)("outline-none w-full resize-none bg-transparent", n && "cursor-not-allowed"),
            ...l
        })
    }));
    n.displayName = "Input", e.s(["default", 0, n])
}, 602206, 278925, e => {
    "use strict";
    let t, r;
    var n = e.i(730592);
    let l = {
            get url() {
                return `file://${e.P("node_modules/.pnpm/jotai@2.12.5_@types+react@19.2.8_react@19.2.3/node_modules/jotai/esm/vanilla/internals.mjs")}`
            }
        },
        a = (e, t) => e.unstable_is ? e.unstable_is(t) : t === e,
        i = e => "v" in e || "e" in e,
        o = e => {
            if ("e" in e) throw e.e;
            if ((l.env ? l.env.MODE : void 0) !== "production" && !("v" in e)) throw Error("[Bug] atom state is not initialized");
            return e.v
        },
        s = new WeakMap,
        u = e => {
            var t;
            return d(e) && !!(null == (t = s.get(e)) ? void 0 : t[0])
        },
        c = (e, t) => {
            let r = s.get(e);
            if (!r) {
                r = [!0, new Set], s.set(e, r);
                let t = () => {
                    r[0] = !1
                };
                e.then(t, t)
            }
            r[1].add(t)
        },
        d = e => "function" == typeof(null == e ? void 0 : e.then),
        f = (e, t, r) => {
            r.p.has(e) || (r.p.add(e), t.then(() => {
                r.p.delete(e)
            }, () => {
                r.p.delete(e)
            }))
        },
        h = (e, t, r) => {
            let n = r(e),
                l = "v" in n,
                a = n.v;
            if (d(t))
                for (let l of n.d.keys()) f(e, t, r(l));
            if (n.v = t, delete n.e, !l || !Object.is(a, n.v)) {
                let e;
                ++n.n, d(a) && (null == (e = s.get(a)) ? void 0 : e[0]) && (e[0] = !1, e[1].forEach(e => e()))
            }
        },
        p = (e, t, r) => {
            var n;
            let l = new Set;
            for (let t of (null == (n = r.get(e)) ? void 0 : n.t) || []) r.has(t) && l.add(t);
            for (let e of t.p) l.add(e);
            return l
        },
        v = () => {
            let e = {},
                t = new WeakMap,
                r = r => {
                    var n, l;
                    null == (n = t.get(e)) || n.forEach(e => e(r)), null == (l = t.get(r)) || l.forEach(e => e())
                };
            return r.add = (r, n) => {
                let l = r || e,
                    a = (t.has(l) ? t : t.set(l, new Set)).get(l);
                return a.add(n), () => {
                    null == a || a.delete(n), a.size || t.delete(l)
                }
            }, r
        },
        m = Symbol(),
        g = (e = new WeakMap, t = new WeakMap, r = new WeakMap, n = new Set, s = new Set, v = new Set, g = {}, b = (e, ...t) => e.read(...t), w = (e, ...t) => e.write(...t), y = (e, t) => {
            var r;
            return null == (r = e.unstable_onInit) ? void 0 : r.call(e, t)
        }, x = (e, t) => {
            var r;
            return null == (r = e.onMount) ? void 0 : r.call(e, t)
        }, ...j) => {
            let _ = j[0] || (t => {
                    if ((l.env ? l.env.MODE : void 0) !== "production" && !t) throw Error("Atom is undefined or null");
                    let r = e.get(t);
                    return r || (r = {
                        d: new Map,
                        p: new Set,
                        n: 0
                    }, e.set(t, r), null == y || y(t, R)), r
                }),
                k = j[1] || (() => {
                    let e = [],
                        r = t => {
                            try {
                                t()
                            } catch (t) {
                                e.push(t)
                            }
                        };
                    do {
                        g.f && r(g.f);
                        let e = new Set,
                            l = e.add.bind(e);
                        n.forEach(e => {
                            var r;
                            return null == (r = t.get(e)) ? void 0 : r.l.forEach(l)
                        }), n.clear(), v.forEach(l), v.clear(), s.forEach(l), s.clear(), e.forEach(r), n.size && C()
                    } while (n.size || v.size || s.size) if (e.length) throw AggregateError(e)
                }),
                C = j[2] || (() => {
                    let e = [],
                        a = new WeakSet,
                        i = new WeakSet,
                        o = Array.from(n);
                    for (; o.length;) {
                        let n = o[o.length - 1],
                            s = _(n);
                        if (i.has(n)) {
                            o.pop();
                            continue
                        }
                        if (a.has(n)) {
                            if (r.get(n) === s.n) e.push([n, s]);
                            else if ((l.env ? l.env.MODE : void 0) !== "production" && r.has(n)) throw Error("[Bug] invalidated atom exists");
                            i.add(n), o.pop();
                            continue
                        }
                        for (let e of (a.add(n), p(n, s, t))) a.has(e) || o.push(e)
                    }
                    for (let t = e.length - 1; t >= 0; --t) {
                        let [l, a] = e[t], i = !1;
                        for (let e of a.d.keys())
                            if (e !== l && n.has(e)) {
                                i = !0;
                                break
                            }
                        i && (E(l), O(l)), r.delete(l)
                    }
                }),
                E = j[3] || (e => {
                    var s;
                    let p, v, m = _(e);
                    if (i(m) && (t.has(e) && r.get(e) !== m.n || Array.from(m.d).every(([e, t]) => E(e).n === t))) return m;
                    m.d.clear();
                    let w = !0,
                        y = () => {
                            t.has(e) && (O(e), C(), k())
                        },
                        x = m.n;
                    try {
                        let r = b(e, r => {
                            var n;
                            if (a(e, r)) {
                                let e = _(r);
                                if (!i(e))
                                    if ("init" in r) h(r, r.init, _);
                                    else throw Error("no atom init");
                                return o(e)
                            }
                            let l = E(r);
                            try {
                                return o(l)
                            } finally {
                                m.d.set(r, l.n), u(m.v) && f(e, m.v, l), null == (n = t.get(r)) || n.t.add(e), w || y()
                            }
                        }, {
                            get signal() {
                                return p || (p = new AbortController), p.signal
                            },
                            get setSelf() {
                                return (l.env ? l.env.MODE : void 0) === "production" || e.write || console.warn("setSelf function cannot be used with read-only atom"), !v && e.write && (v = (...t) => {
                                    if ((l.env ? l.env.MODE : void 0) !== "production" && w && console.warn("setSelf function cannot be called in sync"), !w) try {
                                        return S(e, ...t)
                                    } finally {
                                        C(), k()
                                    }
                                }), v
                            }
                        });
                        return h(e, r, _), d(r) && (c(r, () => null == p ? void 0 : p.abort()), r.then(y, y)), m
                    } catch (e) {
                        return delete m.v, m.e = e, ++m.n, m
                    } finally {
                        w = !1, x !== m.n && r.get(e) === x && (r.set(e, m.n), n.add(e), null == (s = g.c) || s.call(g, e))
                    }
                }),
                M = j[4] || (e => {
                    let n = [e];
                    for (; n.length;) {
                        let e = n.pop(),
                            l = _(e);
                        for (let a of p(e, l, t)) {
                            let e = _(a);
                            r.set(a, e.n), n.push(a)
                        }
                    }
                }),
                S = j[5] || ((e, ...t) => {
                    let r = !0;
                    try {
                        return w(e, e => o(E(e)), (t, ...l) => {
                            var i;
                            let o = _(t);
                            try {
                                if (!a(e, t)) return S(t, ...l); {
                                    if (!("init" in t)) throw Error("atom not writable");
                                    let e = o.n,
                                        r = l[0];
                                    h(t, r, _), O(t), e !== o.n && (n.add(t), null == (i = g.c) || i.call(g, t), M(t));
                                    return
                                }
                            } finally {
                                r || (C(), k())
                            }
                        }, ...t)
                    } finally {
                        r = !1
                    }
                }),
                O = j[6] || (e => {
                    var r;
                    let l = _(e),
                        a = t.get(e);
                    if (a && !u(l.v)) {
                        for (let [t, i] of l.d)
                            if (!a.d.has(t)) {
                                let l = _(t);
                                P(t).t.add(e), a.d.add(t), i !== l.n && (n.add(t), null == (r = g.c) || r.call(g, t), M(t))
                            }
                        for (let t of a.d || [])
                            if (!l.d.has(t)) {
                                a.d.delete(t);
                                let r = N(t);
                                null == r || r.t.delete(e)
                            }
                    }
                }),
                P = j[7] || (e => {
                    var r;
                    let n = _(e),
                        l = t.get(e);
                    if (!l) {
                        for (let t of (E(e), n.d.keys())) P(t).t.add(e);
                        l = {
                            l: new Set,
                            d: new Set(n.d.keys()),
                            t: new Set
                        }, t.set(e, l), null == (r = g.m) || r.call(g, e), e.write && s.add(() => {
                            let t = !0;
                            try {
                                let r = x(e, (...r) => {
                                    try {
                                        return S(e, ...r)
                                    } finally {
                                        t || (C(), k())
                                    }
                                });
                                r && (l.u = () => {
                                    t = !0;
                                    try {
                                        r()
                                    } finally {
                                        t = !1
                                    }
                                })
                            } finally {
                                t = !1
                            }
                        })
                    }
                    return l
                }),
                N = j[8] || (e => {
                    var r;
                    let n = _(e),
                        l = t.get(e);
                    if (l && !l.l.size && !Array.from(l.t).some(r => {
                            var n;
                            return null == (n = t.get(r)) ? void 0 : n.d.has(e)
                        })) {
                        for (let a of (l.u && v.add(l.u), l = void 0, t.delete(e), null == (r = g.u) || r.call(g, e), n.d.keys())) {
                            let t = N(a);
                            null == t || t.t.delete(e)
                        }
                        return
                    }
                    return l
                }),
                R = {
                    get: e => o(E(e)),
                    set: (e, ...t) => {
                        try {
                            return S(e, ...t)
                        } finally {
                            C(), k()
                        }
                    },
                    sub: (e, t) => {
                        let r = P(e).l;
                        return r.add(t), k(), () => {
                            r.delete(t), N(e), k()
                        }
                    }
                };
            return Object.defineProperty(R, m, {
                value: [e, t, r, n, s, v, g, b, w, y, x, _, k, C, E, M, S, O, P, N]
            }), R
        },
        b = {
            get url() {
                return `file://${e.P("node_modules/.pnpm/jotai@2.12.5_@types+react@19.2.8_react@19.2.3/node_modules/jotai/esm/vanilla.mjs")}`
            }
        },
        w = 0;

    function y(e, t) {
        let r = `atom${++w}`,
            n = {
                toString() {
                    return (b.env ? b.env.MODE : void 0) !== "production" && this.debugLabel ? r + ":" + this.debugLabel : r
                }
            };
        return "function" == typeof e ? n.read = e : (n.init = e, n.read = x, n.write = j), t && (n.write = t), n
    }

    function x(e) {
        return e(this)
    }

    function j(e, t, r) {
        return t(this, "function" == typeof r ? r(e(this)) : r)
    }

    function _() {
        if (t) return t();
        if ((b.env ? b.env.MODE : void 0) !== "production") {
            var e;
            let t, r, n, l, a, i, o, s;
            return t = 0, (e = {}).c || (e.c = v()), e.m || (e.m = v()), e.u || (e.u = v()), e.f || (r = new Set, (n = () => {
                r.forEach(e => e())
            }).add = e => (r.add(e), () => {
                r.delete(e)
            }), e.f = n), l = e, a = new WeakMap, o = g(a, i = new WeakMap, void 0, void 0, void 0, void 0, l, void 0, (e, r, n, ...l) => t ? n(e, ...l) : e.write(r, n, ...l)), s = new Set, l.m.add(void 0, e => {
                s.add(e), a.get(e).m = i.get(e)
            }), l.u.add(void 0, e => {
                s.delete(e);
                let t = a.get(e);
                delete t.m
            }), Object.assign(o, {
                dev4_get_internal_weak_map: () => (console.log("Deprecated: Use devstore from the devtools library"), a),
                dev4_get_mounted_atoms: () => s,
                dev4_restore_atoms: e => {
                    o.set({
                        read: () => null,
                        write: (r, n) => {
                            ++t;
                            try {
                                for (let [t, r] of e) "init" in t && n(t, r)
                            } finally {
                                --t
                            }
                        }
                    })
                }
            })
        }
        return g()
    }

    function k() {
        return r || (r = _(), (b.env ? b.env.MODE : void 0) !== "production" && (globalThis.__JOTAI_DEFAULT_STORE__ || (globalThis.__JOTAI_DEFAULT_STORE__ = r), globalThis.__JOTAI_DEFAULT_STORE__ !== r && console.warn("Detected multiple Jotai instances. It may cause unexpected behavior with the default store. https://github.com/pmndrs/jotai/discussions/2044"))), r
    }
    e.s(["atom", () => y, "createStore", () => _, "getDefaultStore", () => k], 278925);
    let C = {
            get url() {
                return `file://${e.P("node_modules/.pnpm/jotai@2.12.5_@types+react@19.2.8_react@19.2.3/node_modules/jotai/esm/react.mjs")}`
            }
        },
        E = (0, n.createContext)(void 0);

    function M(e) {
        let t = (0, n.useContext)(E);
        return (null == e ? void 0 : e.store) || t || k()
    }
    let S = e => "function" == typeof(null == e ? void 0 : e.then),
        O = e => {
            e.status || (e.status = "pending", e.then(t => {
                e.status = "fulfilled", e.value = t
            }, t => {
                e.status = "rejected", e.reason = t
            }))
        },
        P = n.default.use || (e => {
            if ("pending" === e.status) throw e;
            if ("fulfilled" === e.status) return e.value;
            if ("rejected" === e.status) throw e.reason;
            throw O(e), e
        }),
        N = new WeakMap,
        R = (e, t) => {
            let r = N.get(e);
            return r || (r = new Promise((n, l) => {
                let a = e,
                    i = e => t => {
                        a === e && n(t)
                    },
                    o = e => t => {
                        a === e && l(t)
                    },
                    s = () => {
                        try {
                            let e = t();
                            S(e) ? (N.set(e, r), a = e, e.then(i(e), o(e)), c(e, s)) : n(e)
                        } catch (e) {
                            l(e)
                        }
                    };
                e.then(i(e), o(e)), c(e, s)
            }), N.set(e, r)), r
        };

    function L(e, t) {
        let {
            delay: r,
            unstable_promiseStatus: l = !n.default.use
        } = t || {}, a = M(t), [
            [i, o, s], u
        ] = (0, n.useReducer)(t => {
            let r = a.get(e);
            return Object.is(t[0], r) && t[1] === a && t[2] === e ? t : [r, a, e]
        }, void 0, () => [a.get(e), a, e]), c = i;
        if ((o !== a || s !== e) && (u(), c = a.get(e)), (0, n.useEffect)(() => {
                let t = a.sub(e, () => {
                    if (l) try {
                        let t = a.get(e);
                        S(t) && O(R(t, () => a.get(e)))
                    } catch (e) {}
                    "number" == typeof r ? setTimeout(u, r) : u()
                });
                return u(), t
            }, [a, e, r, l]), (0, n.useDebugValue)(c), S(c)) {
            let t = R(c, () => a.get(e));
            return l && O(t), P(t)
        }
        return c
    }

    function T(e, t) {
        let r = M(t);
        return (0, n.useCallback)((...t) => {
            if ((C.env ? C.env.MODE : void 0) !== "production" && !("write" in e)) throw Error("not writable atom");
            return r.set(e, ...t)
        }, [r, e])
    }

    function A(e, t) {
        return [L(e, t), T(e, t)]
    }
    e.s(["useAtom", () => A, "useAtomValue", () => L, "useSetAtom", () => T], 602206)
}, 677254, e => {
    "use strict";
    let t = (0, e.i(486856).default)("arrow-left", [
        ["path", {
            d: "m12 19-7-7 7-7",
            key: "1l729n"
        }],
        ["path", {
            d: "M19 12H5",
            key: "x3x0zl"
        }]
    ]);
    e.s(["ArrowLeft", () => t], 677254)
}, 872557, e => {
    "use strict";
    var t = e.i(253719),
        r = e.i(534026),
        n = e.i(730592);

    function l({
        children: e,
        ...l
    }) {
        let a = (0, n.useRef)(null),
            [i, o] = (0, n.useState)("auto");
        return (0, n.useEffect)(() => {
            let e = a.current ? .children[0],
                t = () => {
                    e && o(e.clientWidth)
                };
            t();
            let r = new ResizeObserver(t);
            return r.observe(e), () => r.disconnect()
        }, []), (0, t.jsx)(r.motion.div, { ...l,
            animate: {
                width: i,
                ...l.animate
            },
            className: "overflow-hidden",
            initial: {
                width: i,
                ...l.initial
            },
            ref: a,
            children: (0, t.jsx)("div", {
                className: "w-max whitespace-nowrap",
                children: e
            })
        })
    }
    e.s(["default", () => l])
}, 912953, e => {
    "use strict";
    var t = e.i(253719),
        r = e.i(730592);
    let n = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    function l({
        text: e,
        delay: l,
        duration: a = 1.5,
        isInView: i
    }) {
        let [o, s] = (0, r.useState)(e), [u, c] = (0, r.useState)(!1), d = (0, r.useRef)(void 0), f = (0, r.useRef)(void 0), [h, p] = (0, r.useState)(!1), v = (0, r.useRef)(null);
        return (0, r.useEffect)(() => {
            c(!0)
        }, []), (0, r.useEffect)(() => {
            if (v.current) {
                v.current.style.visibility = "hidden", v.current.textContent = e;
                let t = v.current.offsetWidth;
                v.current.textContent = o, v.current.style.width = `${t}px`, v.current.style.display = "inline-block", v.current.style.visibility = "visible"
            }
        }, [e]), (0, r.useEffect)(() => {
            if (!u || !i || h) return;
            s(Array(e.length).fill(0).map(() => n[Math.floor(Math.random() * n.length)]).join(""));
            let t = setTimeout(() => {
                f.current = Date.now();
                let t = () => {
                    let r = Math.min((Date.now() - (f.current || 0)) / (1e3 * a), 1);
                    if (r < 1) {
                        let l = Math.floor((1 - r) * e.length),
                            a = e.length - l;
                        s(e.slice(0, a) + Array(l).fill(0).map(() => n[Math.floor(Math.random() * n.length)]).join("")), d.current = setTimeout(t, 30)
                    } else s(e), p(!0)
                };
                t()
            }, 1e3 * l);
            return () => {
                clearTimeout(t), d.current && clearTimeout(d.current)
            }
        }, [e, l, a, i, h, u]), (0, t.jsx)("span", {
            ref: v,
            className: "inline-block whitespace-pre",
            style: {
                fontVariantNumeric: "tabular-nums"
            },
            children: o
        })
    }
    e.s(["default", () => l])
}, 750444, e => {
    "use strict";
    e.i(590556), e.i(848686), e.i(480886), e.i(548628), e.s([])
}, 325329, e => {
    "use strict";
    let t = (0, e.i(486856).default)("lock", [
        ["rect", {
            width: "18",
            height: "11",
            x: "3",
            y: "11",
            rx: "2",
            ry: "2",
            key: "1w4ew1"
        }],
        ["path", {
            d: "M7 11V7a5 5 0 0 1 10 0v4",
            key: "fwvmzm"
        }]
    ]);
    e.s(["Lock", () => t], 325329)
}, 260813, e => {
    "use strict";
    let t = (0, e.i(486856).default)("mail", [
        ["path", {
            d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",
            key: "132q7q"
        }],
        ["rect", {
            x: "2",
            y: "4",
            width: "20",
            height: "16",
            rx: "2",
            key: "izxlao"
        }]
    ]);
    e.s(["Mail", () => t], 260813)
}, 791411, e => {
    "use strict";
    let t = (0, e.i(486856).default)("building-2", [
        ["path", {
            d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",
            key: "1b4qmf"
        }],
        ["path", {
            d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",
            key: "i71pzd"
        }],
        ["path", {
            d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",
            key: "10jefs"
        }],
        ["path", {
            d: "M10 6h4",
            key: "1itunk"
        }],
        ["path", {
            d: "M10 10h4",
            key: "tcdvrf"
        }],
        ["path", {
            d: "M10 14h4",
            key: "kelpxr"
        }],
        ["path", {
            d: "M10 18h4",
            key: "1ulq68"
        }]
    ]);
    e.s(["Building2", () => t], 791411)
}, 474010, e => {
    "use strict";
    var t = e.i(253719),
        r = e.i(730592);
    e.i(889647);
    var n = e.i(138445),
        l = e.i(912953);

    function a() {
        let [e] = (0, r.useState)(!0);
        return (0, t.jsxs)("div", {
            className: "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background-base",
            children: [(0, t.jsx)("div", {
                className: "absolute inset-0",
                children: (0, t.jsx)(n.CoreFlame, {
                    className: "opacity-[0.08] animate-pulse"
                })
            }), (0, t.jsxs)("div", {
                className: "relative z-10 flex flex-col items-center gap-24",
                children: [(0, t.jsxs)("div", {
                    className: "relative flex items-center justify-center",
                    children: [(0, t.jsx)("div", {
                        className: "absolute rounded-full bg-heat-100/10 blur-24",
                        style: {
                            width: 120,
                            height: 120
                        },
                        "aria-hidden": !0
                    }), (0, t.jsx)("div", {
                        className: "relative rounded-full border-2 border-black-alpha-12 border-t-heat-100/60 animate-spin",
                        style: {
                            width: 72,
                            height: 72
                        },
                        "aria-hidden": !0
                    }), (0, t.jsx)("div", {
                        className: "absolute rounded-full border-2 border-transparent border-b-heat-100 animate-spin",
                        style: {
                            width: 56,
                            height: 56,
                            animationDuration: "0.8s",
                            animationDirection: "reverse"
                        },
                        "aria-hidden": !0
                    }), (0, t.jsx)("span", {
                        className: "sr-only",
                        children: "Loading"
                    })]
                }), (0, t.jsx)("div", {
                    className: "text-label-large text-black-alpha-56",
                    children: (0, t.jsx)(l.default, {
                        text: "Loading...",
                        delay: .1,
                        duration: 1.2,
                        isInView: e
                    })
                })]
            })]
        })
    }
    e.s(["FullPageLoading", () => a])
}, 152823, e => {
    "use strict";
    var t = e.i(730592),
        r = {
            color: void 0,
            size: void 0,
            className: void 0,
            style: void 0,
            attr: void 0
        },
        n = t.default.createContext && t.default.createContext(r),
        l = ["attr", "size", "title"];

    function a() {
        return (a = Object.assign.bind()).apply(this, arguments)
    }

    function i(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }

    function o(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? i(Object(r), !0).forEach(function(t) {
                var n, l, a;
                n = e, l = t, a = r[t], (l = function(e) {
                    var t = function(e, t) {
                        if ("object" != typeof e || null === e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, t || "default");
                            if ("object" != typeof n) return n;
                            throw TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === t ? String : Number)(e)
                    }(e, "string");
                    return "symbol" == typeof t ? t : String(t)
                }(l)) in n ? Object.defineProperty(n, l, {
                    value: a,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : n[l] = a
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : i(Object(r)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            })
        }
        return e
    }

    function s(e) {
        return r => t.default.createElement(u, a({
            attr: o({}, e.attr)
        }, r), function e(r) {
            return r && r.map((r, n) => t.default.createElement(r.tag, o({
                key: n
            }, r.attr), e(r.child)))
        }(e.child))
    }

    function u(e) {
        var i = r => {
            var n, {
                    attr: i,
                    size: s,
                    title: u
                } = e,
                c = function(e, t) {
                    if (null == e) return {};
                    var r, n, l = function(e, t) {
                        if (null == e) return {};
                        var r, n, l = {},
                            a = Object.keys(e);
                        for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) >= 0 || (l[r] = e[r]);
                        return l
                    }(e, t);
                    if (Object.getOwnPropertySymbols) {
                        var a = Object.getOwnPropertySymbols(e);
                        for (n = 0; n < a.length; n++) r = a[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (l[r] = e[r])
                    }
                    return l
                }(e, l),
                d = s || r.size || "1em";
            return r.className && (n = r.className), e.className && (n = (n ? n + " " : "") + e.className), t.default.createElement("svg", a({
                stroke: "currentColor",
                fill: "currentColor",
                strokeWidth: "0"
            }, r.attr, i, c, {
                className: n,
                style: o(o({
                    color: e.color || r.color
                }, r.style), e.style),
                height: d,
                width: d,
                xmlns: "http://www.w3.org/2000/svg"
            }), u && t.default.createElement("title", null, u), e.children)
        };
        return void 0 !== n ? t.default.createElement(n.Consumer, null, e => i(e)) : i(r)
    }
    e.s(["GenIcon", () => s], 152823)
}, 823263, e => {
    "use strict";
    let t = (0, e.i(486856).default)("github", [
        ["path", {
            d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
            key: "tonef"
        }],
        ["path", {
            d: "M9 18c-4.51 2-5-2-7-2",
            key: "9comsn"
        }]
    ]);
    e.s(["default", () => t])
}, 227425, e => {
    "use strict";

    function t(e) {
        if (!e) return null;
        let t = e.trim();
        return t && "/" !== t && t.startsWith("/") && !t.startsWith("//") ? t : null
    }
    e.s(["getURL", 0, (e = "") => {
        console.log("[helpers] process.env.NEXT_PUBLIC_SITE_URL:", "https://www.firecrawl.dev"), console.log("[helpers] process.env.NEXT_PUBLIC_VERCEL_URL:", "firecrawl-efd1qc4d4-side-guide.vercel.app"), console.log("[helpers] path:", e);
        let t = "" !== "https://www.firecrawl.dev".trim() ? "https://www.firecrawl.dev" : "" !== "firecrawl-efd1qc4d4-side-guide.vercel.app".trim() ? "firecrawl-efd1qc4d4-side-guide.vercel.app" : "https://www.firecrawl.dev/";
        return t = (t = t.replace(/\/+$/, "")).includes("http") ? t : `https://${t}`, (e = e.replace(/^\/+/, "")) ? `${t}/${e}` : t
    }, "getValidRedirect", () => t])
}, 399269, e => {
    "use strict";
    var t = e.i(152064),
        r = e.i(227425),
        n = e.i(912313);
    async function l({
        formEvent: e,
        referralCode: l,
        teamInvitationCode: a,
        teamInvitationName: i,
        redirect: o
    }) {
        e.preventDefault();
        let s = String(new FormData(e.currentTarget).get("provider")).trim();
        try {
            localStorage.setItem("lastUsedOAuthProvider", s)
        } catch (e) {
            console.warn("Failed to store last used OAuth provider:", e)
        }
        let u = (0, n.createClient)(),
            c = {
                redirectTo: t.createWebRoute.auth.callback({
                    baseUrl: (0, r.getURL)(),
                    teamInvitationCode: a,
                    teamInvitationName: i,
                    rid: l,
                    redirect: o
                }),
                ...l && {
                    queryParams: {
                        rid: l
                    }
                }
            };
        await u.auth.signInWithOAuth({
            provider: s,
            options: c
        })
    }
    async function a(e, l, a, i, o) {
        let s = (0, n.createClient)(),
            u = "";
        u = "faire" === e.toLowerCase() ? "org_01K4ZNS1PH3BNRYCNM76V33S2R" : "canva" === e.toLowerCase() ? "org_01KAW4YP17BQSHVRVNF4Y8VJPG" : "ada" === e.toLowerCase() ? "org_01KC9ZDHQN4HY00P7F8EKCCACH" : "arabbank" === e.toLowerCase() ? "org_01KECG9VD5YS4MR83P4N0N0G77" : "zapier" === e.toLowerCase() ? "org_01KBZTRQM92WDMSHF5WWXYT3K3" : e;
        let c = t.createWebRoute.auth.callback({
                baseUrl: (0, r.getURL)(),
                rid: l ? ? void 0,
                teamInvitationCode: a ? ? void 0,
                teamInvitationName: i ? ? void 0,
                redirect: o ? ? void 0
            }),
            {
                error: d
            } = await s.auth.signInWithOAuth({
                provider: "workos",
                options: {
                    redirectTo: c,
                    queryParams: {
                        organization: u,
                        ...l && {
                            rid: l
                        }
                    }
                }
            });
        if (d) throw d
    }
    e.s(["signInWithOAuth", () => l, "signInWithSSO", () => a])
}, 747861, e => {
    "use strict";
    var t = e.i(253719),
        r = e.i(872557),
        n = e.i(420851),
        l = e.i(796620),
        a = e.i(534026),
        i = e.i(730592);

    function o({
        icon: e,
        iconPosition: o = "left",
        children: s,
        className: u,
        size: c = "md",
        fullWidth: d = !1,
        variant: f = "primary",
        loading: h = !1,
        disabled: p,
        ...v
    }) {
        let [m, g] = i.default.useState(!1), b = {
            sm: "w-14 h-14",
            md: "w-16 h-16",
            lg: "w-16 h-16"
        }, w = p || h;
        return (0, t.jsx)("button", {
            className: (0, n.cn)("inline-flex items-center justify-center rounded-full  transition-all duration-200", {
                sm: "h-32 px-16 text-label-small gap-6",
                md: "h-40 px-20 text-label-medium gap-8",
                lg: "h-40 px-20 text-label-medium gap-8"
            }[c], {
                primary: ["bg-heat-100 text-accent-white", "hover:bg-heat-200", "active:scale-[0.98]", "shadow-[0_1px_2px_var(--black-alpha-5)]", "hover:shadow-[0_4px_12px_rgba(250,93,25,0.25)]"],
                secondary: ["bg-black text-accent-white", "hover:bg-black-alpha-90", "active:scale-[0.98]", "shadow-[0_1px_2px_var(--black-alpha-5)]", "hover:shadow-[0_4px_12px_var(--black-alpha-16)]"],
                tertiary: ["bg-surface text-accent-black border border-black-alpha-8", "hover:bg-black-alpha-4 hover:border-black-alpha-12", "active:scale-[0.98]"],
                ghost: ["bg-transparent text-black-alpha-60", "hover:text-accent-black hover:bg-black-alpha-4", "active:scale-[0.98]"]
            }[f], d && "w-full", w && ["opacity-50 cursor-not-allowed", "hover:shadow-none hover:bg-current"], m && "scale-[0.98]", u),
            disabled: w,
            onMouseDown: () => !w && g(!0),
            onMouseUp: () => g(!1),
            onMouseLeave: () => g(!1),
            ...v,
            children: (0, t.jsx)(r.default, {
                initial: {
                    width: "auto"
                },
                children: (0, t.jsx)(l.AnimatePresence, {
                    initial: !1,
                    mode: "popLayout",
                    children: h ? (0, t.jsx)(a.motion.div, {
                        animate: {
                            opacity: 1,
                            filter: "blur(0px)",
                            scale: 1
                        },
                        className: "flex gap-8 items-center justify-center",
                        exit: {
                            opacity: 0,
                            filter: "blur(2px)",
                            scale: .9
                        },
                        initial: {
                            opacity: 0,
                            filter: "blur(2px)",
                            scale: .95
                        },
                        children: (0, t.jsx)("span", {
                            children: "Loading..."
                        })
                    }, "loading") : (0, t.jsxs)(a.motion.div, {
                        animate: {
                            opacity: 1,
                            filter: "blur(0px)",
                            scale: 1
                        },
                        className: "flex gap-8 items-center justify-center",
                        exit: {
                            opacity: 0,
                            filter: "blur(2px)",
                            scale: .9
                        },
                        initial: {
                            opacity: 0,
                            filter: "blur(2px)",
                            scale: .95
                        },
                        children: [e && "left" === o && (0, t.jsx)("span", {
                            className: (0, n.cn)(b[c], "flex-shrink-0 inline-flex items-center justify-center"),
                            children: (0, t.jsx)(e, {
                                className: "w-full h-full"
                            })
                        }), (0, t.jsx)("span", {
                            children: s
                        }), e && "right" === o && (0, t.jsx)("span", {
                            className: (0, n.cn)(b[c], "flex-shrink-0 inline-flex items-center justify-center"),
                            children: (0, t.jsx)(e, {
                                className: "w-full h-full"
                            })
                        })]
                    }, "content")
                })
            })
        })
    }
    e.s(["CapsuleButton", () => o])
}, 316301, e => {
    e.v(t => Promise.all(["static/chunks/8eb7005e263fac85.js"].map(t => e.l(t))).then(() => t(900392)))
}, 816109, e => {
    e.v(t => Promise.all(["static/chunks/8d7b2f5a44b60aed.js"].map(t => e.l(t))).then(() => t(80828)))
}]);

//# debugId=8154106c-08c8-55d2-5a8c-0822714e749a
//# sourceMappingURL=fd913d652b77adfd.js.map