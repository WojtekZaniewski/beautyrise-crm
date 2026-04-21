;
! function() {
    try {
        var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {},
            n = (new e.Error).stack;
        n && ((e._debugIds || (e._debugIds = {}))[n] = "623ac69f-9a89-a4dd-66de-08f554061f84")
    } catch (e) {}
}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 644340, e => {
    "use strict";
    var t = e.i(730592);

    function n(e, t) {
        if ("function" == typeof e) return e(t);
        null != e && (e.current = t)
    }

    function r(...e) {
        return t => {
            let r = !1,
                o = e.map(e => {
                    let o = n(e, t);
                    return r || "function" != typeof o || (r = !0), o
                });
            if (r) return () => {
                for (let t = 0; t < o.length; t++) {
                    let r = o[t];
                    "function" == typeof r ? r() : n(e[t], null)
                }
            }
        }
    }

    function o(...e) {
        return t.useCallback(r(...e), e)
    }
    e.s(["composeRefs", () => r, "useComposedRefs", () => o])
}, 291967, 626250, e => {
    "use strict";

    function t(e, n, {
        checkForDefaultPrevented: r = !0
    } = {}) {
        return function(t) {
            if (e ? .(t), !1 === r || !t.defaultPrevented) return n ? .(t)
        }
    }
    "u" > typeof window && window.document && window.document.createElement, e.s(["composeEventHandlers", () => t], 291967);
    var n = e.i(730592),
        r = e.i(253719);

    function o(e, t) {
        let o = n.createContext(t),
            i = e => {
                let {
                    children: t,
                    ...i
                } = e, a = n.useMemo(() => i, Object.values(i));
                return (0, r.jsx)(o.Provider, {
                    value: a,
                    children: t
                })
            };
        return i.displayName = e + "Provider", [i, function(r) {
            let i = n.useContext(o);
            if (i) return i;
            if (void 0 !== t) return t;
            throw Error(`\`${r}\` must be used within \`${e}\``)
        }]
    }

    function i(e, t = []) {
        let o = [],
            a = () => {
                let t = o.map(e => n.createContext(e));
                return function(r) {
                    let o = r ? .[e] || t;
                    return n.useMemo(() => ({
                        [`__scope${e}`]: { ...r,
                            [e]: o
                        }
                    }), [r, o])
                }
            };
        return a.scopeName = e, [function(t, i) {
            let a = n.createContext(i),
                u = o.length;
            o = [...o, i];
            let c = t => {
                let {
                    scope: o,
                    children: i,
                    ...c
                } = t, s = o ? .[e] ? .[u] || a, l = n.useMemo(() => c, Object.values(c));
                return (0, r.jsx)(s.Provider, {
                    value: l,
                    children: i
                })
            };
            return c.displayName = t + "Provider", [c, function(r, o) {
                let c = o ? .[e] ? .[u] || a,
                    s = n.useContext(c);
                if (s) return s;
                if (void 0 !== i) return i;
                throw Error(`\`${r}\` must be used within \`${t}\``)
            }]
        }, function(...e) {
            let t = e[0];
            if (1 === e.length) return t;
            let r = () => {
                let r = e.map(e => ({
                    useScope: e(),
                    scopeName: e.scopeName
                }));
                return function(e) {
                    let o = r.reduce((t, {
                        useScope: n,
                        scopeName: r
                    }) => {
                        let o = n(e)[`__scope${r}`];
                        return { ...t,
                            ...o
                        }
                    }, {});
                    return n.useMemo(() => ({
                        [`__scope${t.scopeName}`]: o
                    }), [o])
                }
            };
            return r.scopeName = t.scopeName, r
        }(a, ...t)]
    }
    e.s(["createContext", () => o, "createContextScope", () => i], 626250)
}, 797521, e => {
    "use strict";
    var t = e.i(730592),
        n = globalThis ? .document ? t.useLayoutEffect : () => {};
    e.s(["useLayoutEffect", () => n])
}, 693650, e => {
    "use strict";
    var t = e.i(730592),
        n = e.i(797521),
        r = t[" useId ".trim().toString()] || (() => void 0),
        o = 0;

    function i(e) {
        let [i, a] = t.useState(r());
        return (0, n.useLayoutEffect)(() => {
            e || a(e => e ? ? String(o++))
        }, [e]), e || (i ? `radix-${i}` : "")
    }
    e.s(["useId", () => i])
}, 228864, e => {
    "use strict";
    var t = e.i(730592),
        n = e.i(797521);
    t[" useEffectEvent ".trim().toString()], t[" useInsertionEffect ".trim().toString()];
    var r = t[" useInsertionEffect ".trim().toString()] || n.useLayoutEffect;

    function o({
        prop: e,
        defaultProp: n,
        onChange: o = () => {},
        caller: i
    }) {
        let [a, u, c] = function({
            defaultProp: e,
            onChange: n
        }) {
            let [o, i] = t.useState(e), a = t.useRef(o), u = t.useRef(n);
            return r(() => {
                u.current = n
            }, [n]), t.useEffect(() => {
                a.current !== o && (u.current ? .(o), a.current = o)
            }, [o, a]), [o, i, u]
        }({
            defaultProp: n,
            onChange: o
        }), s = void 0 !== e, l = s ? e : a; {
            let n = t.useRef(void 0 !== e);
            t.useEffect(() => {
                let e = n.current;
                if (e !== s) {
                    let t = s ? "controlled" : "uncontrolled";
                    console.warn(`${i} is changing from ${e?"controlled":"uncontrolled"} to ${t}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`)
                }
                n.current = s
            }, [s, i])
        }
        return [l, t.useCallback(t => {
            if (s) {
                let n = "function" == typeof t ? t(e) : t;
                n !== e && c.current ? .(n)
            } else u(t)
        }, [s, e, u, c])]
    }
    Symbol("RADIX:SYNC_STATE"), e.s(["useControllableState", () => o], 228864)
}, 649618, 587377, 483864, 775161, e => {
    "use strict";
    var t, n = e.i(730592),
        r = e.i(291967),
        o = e.i(675847),
        i = e.i(644340),
        a = e.i(253719);

    function u(e) {
        var t;
        let r, o = (t = e, (r = n.forwardRef((e, t) => {
                let {
                    children: r,
                    ...o
                } = e;
                if (n.isValidElement(r)) {
                    var a;
                    let e, u, c = (a = r, (u = (e = Object.getOwnPropertyDescriptor(a.props, "ref") ? .get) && "isReactWarning" in e && e.isReactWarning) ? a.ref : (u = (e = Object.getOwnPropertyDescriptor(a, "ref") ? .get) && "isReactWarning" in e && e.isReactWarning) ? a.props.ref : a.props.ref || a.ref),
                        s = function(e, t) {
                            let n = { ...t
                            };
                            for (let r in t) {
                                let o = e[r],
                                    i = t[r];
                                /^on[A-Z]/.test(r) ? o && i ? n[r] = (...e) => {
                                    let t = i(...e);
                                    return o(...e), t
                                } : o && (n[r] = o) : "style" === r ? n[r] = { ...o,
                                    ...i
                                } : "className" === r && (n[r] = [o, i].filter(Boolean).join(" "))
                            }
                            return { ...e,
                                ...n
                            }
                        }(o, r.props);
                    return r.type !== n.Fragment && (s.ref = t ? (0, i.composeRefs)(t, c) : c), n.cloneElement(r, s)
                }
                return n.Children.count(r) > 1 ? n.Children.only(null) : null
            })).displayName = `${t}.SlotClone`, r),
            u = n.forwardRef((e, t) => {
                let {
                    children: r,
                    ...i
                } = e, u = n.Children.toArray(r), c = u.find(l);
                if (c) {
                    let e = c.props.children,
                        r = u.map(t => t !== c ? t : n.Children.count(e) > 1 ? n.Children.only(null) : n.isValidElement(e) ? e.props.children : null);
                    return (0, a.jsx)(o, { ...i,
                        ref: t,
                        children: n.isValidElement(e) ? n.cloneElement(e, void 0, r) : null
                    })
                }
                return (0, a.jsx)(o, { ...i,
                    ref: t,
                    children: r
                })
            });
        return u.displayName = `${e}.Slot`, u
    }
    var c = Symbol("radix.slottable");

    function s(e) {
        let t = ({
            children: e
        }) => (0, a.jsx)(a.Fragment, {
            children: e
        });
        return t.displayName = `${e}.Slottable`, t.__radixId = c, t
    }

    function l(e) {
        return n.isValidElement(e) && "function" == typeof e.type && "__radixId" in e.type && e.type.__radixId === c
    }
    e.s(["createSlot", () => u, "createSlottable", () => s], 587377);
    var d = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"].reduce((e, t) => {
        let r = u(`Primitive.${t}`),
            o = n.forwardRef((e, n) => {
                let {
                    asChild: o,
                    ...i
                } = e;
                return "u" > typeof window && (window[Symbol.for("radix-ui")] = !0), (0, a.jsx)(o ? r : t, { ...i,
                    ref: n
                })
            });
        return o.displayName = `Primitive.${t}`, { ...e,
            [t]: o
        }
    }, {});

    function f(e, t) {
        e && o.flushSync(() => e.dispatchEvent(t))
    }

    function v(e) {
        let t = n.useRef(e);
        return n.useEffect(() => {
            t.current = e
        }), n.useMemo(() => (...e) => t.current ? .(...e), [])
    }
    e.s(["Primitive", () => d, "dispatchDiscreteCustomEvent", () => f], 483864), e.s(["useCallbackRef", () => v], 775161);
    var m = "dismissableLayer.update",
        p = n.createContext({
            layers: new Set,
            layersWithOutsidePointerEventsDisabled: new Set,
            branches: new Set
        }),
        h = n.forwardRef((e, o) => {
            let {
                disableOutsidePointerEvents: u = !1,
                onEscapeKeyDown: c,
                onPointerDownOutside: s,
                onFocusOutside: l,
                onInteractOutside: f,
                onDismiss: h,
                ...E
            } = e, b = n.useContext(p), [w, C] = n.useState(null), S = w ? .ownerDocument ? ? globalThis ? .document, [, R] = n.useState({}), L = (0, i.useComposedRefs)(o, e => C(e)), x = Array.from(b.layers), [P] = [...b.layersWithOutsidePointerEventsDisabled].slice(-1), _ = x.indexOf(P), N = w ? x.indexOf(w) : -1, T = b.layersWithOutsidePointerEventsDisabled.size > 0, k = N >= _, A = function(e, t = globalThis ? .document) {
                let r = v(e),
                    o = n.useRef(!1),
                    i = n.useRef(() => {});
                return n.useEffect(() => {
                    let e = e => {
                            if (e.target && !o.current) {
                                let n = function() {
                                        g("dismissableLayer.pointerDownOutside", r, o, {
                                            discrete: !0
                                        })
                                    },
                                    o = {
                                        originalEvent: e
                                    };
                                "touch" === e.pointerType ? (t.removeEventListener("click", i.current), i.current = n, t.addEventListener("click", i.current, {
                                    once: !0
                                })) : n()
                            } else t.removeEventListener("click", i.current);
                            o.current = !1
                        },
                        n = window.setTimeout(() => {
                            t.addEventListener("pointerdown", e)
                        }, 0);
                    return () => {
                        window.clearTimeout(n), t.removeEventListener("pointerdown", e), t.removeEventListener("click", i.current)
                    }
                }, [t, r]), {
                    onPointerDownCapture: () => o.current = !0
                }
            }(e => {
                let t = e.target,
                    n = [...b.branches].some(e => e.contains(t));
                k && !n && (s ? .(e), f ? .(e), e.defaultPrevented || h ? .())
            }, S), M = function(e, t = globalThis ? .document) {
                let r = v(e),
                    o = n.useRef(!1);
                return n.useEffect(() => {
                    let e = e => {
                        e.target && !o.current && g("dismissableLayer.focusOutside", r, {
                            originalEvent: e
                        }, {
                            discrete: !1
                        })
                    };
                    return t.addEventListener("focusin", e), () => t.removeEventListener("focusin", e)
                }, [t, r]), {
                    onFocusCapture: () => o.current = !0,
                    onBlurCapture: () => o.current = !1
                }
            }(e => {
                let t = e.target;
                ![...b.branches].some(e => e.contains(t)) && (l ? .(e), f ? .(e), e.defaultPrevented || h ? .())
            }, S);
            return ! function(e, t = globalThis ? .document) {
                let r = v(e);
                n.useEffect(() => {
                    let e = e => {
                        "Escape" === e.key && r(e)
                    };
                    return t.addEventListener("keydown", e, {
                        capture: !0
                    }), () => t.removeEventListener("keydown", e, {
                        capture: !0
                    })
                }, [r, t])
            }(e => {
                N === b.layers.size - 1 && (c ? .(e), !e.defaultPrevented && h && (e.preventDefault(), h()))
            }, S), n.useEffect(() => {
                if (w) return u && (0 === b.layersWithOutsidePointerEventsDisabled.size && (t = S.body.style.pointerEvents, S.body.style.pointerEvents = "none"), b.layersWithOutsidePointerEventsDisabled.add(w)), b.layers.add(w), y(), () => {
                    u && 1 === b.layersWithOutsidePointerEventsDisabled.size && (S.body.style.pointerEvents = t)
                }
            }, [w, S, u, b]), n.useEffect(() => () => {
                w && (b.layers.delete(w), b.layersWithOutsidePointerEventsDisabled.delete(w), y())
            }, [w, b]), n.useEffect(() => {
                let e = () => R({});
                return document.addEventListener(m, e), () => document.removeEventListener(m, e)
            }, []), (0, a.jsx)(d.div, { ...E,
                ref: L,
                style: {
                    pointerEvents: T ? k ? "auto" : "none" : void 0,
                    ...e.style
                },
                onFocusCapture: (0, r.composeEventHandlers)(e.onFocusCapture, M.onFocusCapture),
                onBlurCapture: (0, r.composeEventHandlers)(e.onBlurCapture, M.onBlurCapture),
                onPointerDownCapture: (0, r.composeEventHandlers)(e.onPointerDownCapture, A.onPointerDownCapture)
            })
        });

    function y() {
        let e = new CustomEvent(m);
        document.dispatchEvent(e)
    }

    function g(e, t, n, {
        discrete: r
    }) {
        let o = n.originalEvent.target,
            i = new CustomEvent(e, {
                bubbles: !1,
                cancelable: !0,
                detail: n
            });
        t && o.addEventListener(e, t, {
            once: !0
        }), r ? f(o, i) : o.dispatchEvent(i)
    }
    h.displayName = "DismissableLayer", n.forwardRef((e, t) => {
        let r = n.useContext(p),
            o = n.useRef(null),
            u = (0, i.useComposedRefs)(t, o);
        return n.useEffect(() => {
            let e = o.current;
            if (e) return r.branches.add(e), () => {
                r.branches.delete(e)
            }
        }, [r.branches]), (0, a.jsx)(d.div, { ...e,
            ref: u
        })
    }).displayName = "DismissableLayerBranch", e.s(["DismissableLayer", () => h], 649618)
}, 731818, e => {
    "use strict";
    var t = e.i(730592),
        n = e.i(675847),
        r = e.i(483864),
        o = e.i(797521),
        i = e.i(253719),
        a = t.forwardRef((e, a) => {
            let {
                container: u,
                ...c
            } = e, [s, l] = t.useState(!1);
            (0, o.useLayoutEffect)(() => l(!0), []);
            let d = u || s && globalThis ? .document ? .body;
            return d ? n.default.createPortal((0, i.jsx)(r.Primitive.div, { ...c,
                ref: a
            }), d) : null
        });
    a.displayName = "Portal", e.s(["Portal", () => a])
}, 645751, e => {
    "use strict";
    var t = function(e) {
            return "u" < typeof document ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body
        },
        n = new WeakMap,
        r = new WeakMap,
        o = {},
        i = 0,
        a = function(e) {
            return e && (e.host || a(e.parentNode))
        },
        u = function(e, t, u, c) {
            var s = (Array.isArray(e) ? e : [e]).map(function(e) {
                if (t.contains(e)) return e;
                var n = a(e);
                return n && t.contains(n) ? n : (console.error("aria-hidden", e, "in not contained inside", t, ". Doing nothing"), null)
            }).filter(function(e) {
                return !!e
            });
            o[u] || (o[u] = new WeakMap);
            var l = o[u],
                d = [],
                f = new Set,
                v = new Set(s),
                m = function(e) {
                    !e || f.has(e) || (f.add(e), m(e.parentNode))
                };
            s.forEach(m);
            var p = function(e) {
                !e || v.has(e) || Array.prototype.forEach.call(e.children, function(e) {
                    if (f.has(e)) p(e);
                    else try {
                        var t = e.getAttribute(c),
                            o = null !== t && "false" !== t,
                            i = (n.get(e) || 0) + 1,
                            a = (l.get(e) || 0) + 1;
                        n.set(e, i), l.set(e, a), d.push(e), 1 === i && o && r.set(e, !0), 1 === a && e.setAttribute(u, "true"), o || e.setAttribute(c, "true")
                    } catch (t) {
                        console.error("aria-hidden: cannot operate on ", e, t)
                    }
                })
            };
            return p(t), f.clear(), i++,
                function() {
                    d.forEach(function(e) {
                        var t = n.get(e) - 1,
                            o = l.get(e) - 1;
                        n.set(e, t), l.set(e, o), t || (r.has(e) || e.removeAttribute(c), r.delete(e)), o || e.removeAttribute(u)
                    }), --i || (n = new WeakMap, n = new WeakMap, r = new WeakMap, o = {})
                }
        },
        c = function(e, n, r) {
            void 0 === r && (r = "data-aria-hidden");
            var o = Array.from(Array.isArray(e) ? e : [e]),
                i = n || t(e);
            return i ? (o.push.apply(o, Array.from(i.querySelectorAll("[aria-live]"))), u(o, i, r, "aria-hidden")) : function() {
                return null
            }
        },
        s = function(e, n, r) {
            void 0 === r && (r = "data-inert-ed");
            var o = n || t(e);
            return o ? u(e, o, r, "inert") : function() {
                return null
            }
        },
        l = function() {
            return "u" > typeof HTMLElement && HTMLElement.prototype.hasOwnProperty("inert")
        },
        d = function(e, t, n) {
            return void 0 === n && (n = "data-suppressed"), (l() ? s : c)(e, t, n)
        };
    e.s(["hideOthers", () => c, "supportsInert", () => l, "suppressOthers", () => d])
}, 652942, e => {
    "use strict";
    let t;
    var n = e.i(730592),
        r = e.i(644340),
        o = e.i(483864),
        i = e.i(775161),
        a = e.i(253719),
        u = "focusScope.autoFocusOnMount",
        c = "focusScope.autoFocusOnUnmount",
        s = {
            bubbles: !1,
            cancelable: !0
        },
        l = n.forwardRef((e, t) => {
            let {
                loop: l = !1,
                trapped: p = !1,
                onMountAutoFocus: h,
                onUnmountAutoFocus: y,
                ...g
            } = e, [E, b] = n.useState(null), w = (0, i.useCallbackRef)(h), C = (0, i.useCallbackRef)(y), S = n.useRef(null), R = (0, r.useComposedRefs)(t, e => b(e)), L = n.useRef({
                paused: !1,
                pause() {
                    this.paused = !0
                },
                resume() {
                    this.paused = !1
                }
            }).current;
            n.useEffect(() => {
                if (p) {
                    let e = function(e) {
                            if (L.paused || !E) return;
                            let t = e.target;
                            E.contains(t) ? S.current = t : v(S.current, {
                                select: !0
                            })
                        },
                        t = function(e) {
                            if (L.paused || !E) return;
                            let t = e.relatedTarget;
                            null !== t && (E.contains(t) || v(S.current, {
                                select: !0
                            }))
                        };
                    document.addEventListener("focusin", e), document.addEventListener("focusout", t);
                    let n = new MutationObserver(function(e) {
                        if (document.activeElement === document.body)
                            for (let t of e) t.removedNodes.length > 0 && v(E)
                    });
                    return E && n.observe(E, {
                        childList: !0,
                        subtree: !0
                    }), () => {
                        document.removeEventListener("focusin", e), document.removeEventListener("focusout", t), n.disconnect()
                    }
                }
            }, [p, E, L.paused]), n.useEffect(() => {
                if (E) {
                    m.add(L);
                    let e = document.activeElement;
                    if (!E.contains(e)) {
                        let t = new CustomEvent(u, s);
                        E.addEventListener(u, w), E.dispatchEvent(t), t.defaultPrevented || (function(e, {
                            select: t = !1
                        } = {}) {
                            let n = document.activeElement;
                            for (let r of e)
                                if (v(r, {
                                        select: t
                                    }), document.activeElement !== n) return
                        }(d(E).filter(e => "A" !== e.tagName), {
                            select: !0
                        }), document.activeElement === e && v(E))
                    }
                    return () => {
                        E.removeEventListener(u, w), setTimeout(() => {
                            let t = new CustomEvent(c, s);
                            E.addEventListener(c, C), E.dispatchEvent(t), t.defaultPrevented || v(e ? ? document.body, {
                                select: !0
                            }), E.removeEventListener(c, C), m.remove(L)
                        }, 0)
                    }
                }
            }, [E, w, C, L]);
            let x = n.useCallback(e => {
                if (!l && !p || L.paused) return;
                let t = "Tab" === e.key && !e.altKey && !e.ctrlKey && !e.metaKey,
                    n = document.activeElement;
                if (t && n) {
                    var r;
                    let t, o = e.currentTarget,
                        [i, a] = [f(t = d(r = o), r), f(t.reverse(), r)];
                    i && a ? e.shiftKey || n !== a ? e.shiftKey && n === i && (e.preventDefault(), l && v(a, {
                        select: !0
                    })) : (e.preventDefault(), l && v(i, {
                        select: !0
                    })) : n === o && e.preventDefault()
                }
            }, [l, p, L.paused]);
            return (0, a.jsx)(o.Primitive.div, {
                tabIndex: -1,
                ...g,
                ref: R,
                onKeyDown: x
            })
        });

    function d(e) {
        let t = [],
            n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
                acceptNode: e => {
                    let t = "INPUT" === e.tagName && "hidden" === e.type;
                    return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
                }
            });
        for (; n.nextNode();) t.push(n.currentNode);
        return t
    }

    function f(e, t) {
        for (let n of e)
            if (! function(e, {
                    upTo: t
                }) {
                    if ("hidden" === getComputedStyle(e).visibility) return !0;
                    for (; e && (void 0 === t || e !== t);) {
                        if ("none" === getComputedStyle(e).display) return !0;
                        e = e.parentElement
                    }
                    return !1
                }(n, {
                    upTo: t
                })) return n
    }

    function v(e, {
        select: t = !1
    } = {}) {
        if (e && e.focus) {
            var n;
            let r = document.activeElement;
            e.focus({
                preventScroll: !0
            }), e !== r && (n = e) instanceof HTMLInputElement && "select" in n && t && e.select()
        }
    }
    l.displayName = "FocusScope";
    var m = (t = [], {
        add(e) {
            let n = t[0];
            e !== n && n ? .pause(), (t = p(t, e)).unshift(e)
        },
        remove(e) {
            t = p(t, e), t[0] ? .resume()
        }
    });

    function p(e, t) {
        let n = [...e],
            r = n.indexOf(t);
        return -1 !== r && n.splice(r, 1), n
    }
    e.s(["FocusScope", () => l])
}, 457999, e => {
    "use strict";
    var t = e.i(730592),
        n = 0;

    function r() {
        t.useEffect(() => {
            let e = document.querySelectorAll("[data-radix-focus-guard]");
            return document.body.insertAdjacentElement("afterbegin", e[0] ? ? o()), document.body.insertAdjacentElement("beforeend", e[1] ? ? o()), n++, () => {
                1 === n && document.querySelectorAll("[data-radix-focus-guard]").forEach(e => e.remove()), n--
            }
        }, [])
    }

    function o() {
        let e = document.createElement("span");
        return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e
    }
    e.s(["useFocusGuards", () => r])
}, 833937, e => {
    "use strict";
    var t, n, r, o, i, a, u, c = e.i(824627),
        s = e.i(730592),
        l = "right-scroll-bar-position",
        d = "width-before-scroll-bar";

    function f(e, t) {
        return "function" == typeof e ? e(t) : e && (e.current = t), e
    }
    var v = "u" > typeof window ? s.useLayoutEffect : s.useEffect,
        m = new WeakMap,
        p = (void 0 === t && (t = {}), (void 0 === n && (n = function(e) {
            return e
        }), r = [], o = !1, i = {
            read: function() {
                if (o) throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
                return r.length ? r[r.length - 1] : null
            },
            useMedium: function(e) {
                var t = n(e, o);
                return r.push(t),
                    function() {
                        r = r.filter(function(e) {
                            return e !== t
                        })
                    }
            },
            assignSyncMedium: function(e) {
                for (o = !0; r.length;) {
                    var t = r;
                    r = [], t.forEach(e)
                }
                r = {
                    push: function(t) {
                        return e(t)
                    },
                    filter: function() {
                        return r
                    }
                }
            },
            assignMedium: function(e) {
                o = !0;
                var t = [];
                if (r.length) {
                    var n = r;
                    r = [], n.forEach(e), t = r
                }
                var i = function() {
                        var n = t;
                        t = [], n.forEach(e)
                    },
                    a = function() {
                        return Promise.resolve().then(i)
                    };
                a(), r = {
                    push: function(e) {
                        t.push(e), a()
                    },
                    filter: function(e) {
                        return t = t.filter(e), r
                    }
                }
            }
        }).options = (0, c.__assign)({
            async: !0,
            ssr: !1
        }, t), i),
        h = function() {},
        y = s.forwardRef(function(e, t) {
            var n, r, o, i, a = s.useRef(null),
                u = s.useState({
                    onScrollCapture: h,
                    onWheelCapture: h,
                    onTouchMoveCapture: h
                }),
                l = u[0],
                d = u[1],
                y = e.forwardProps,
                g = e.children,
                E = e.className,
                b = e.removeScrollBar,
                w = e.enabled,
                C = e.shards,
                S = e.sideCar,
                R = e.noIsolation,
                L = e.inert,
                x = e.allowPinchZoom,
                P = e.as,
                _ = e.gapMode,
                N = (0, c.__rest)(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]),
                T = (n = [a, t], r = function(e) {
                    return n.forEach(function(t) {
                        return f(t, e)
                    })
                }, (o = (0, s.useState)(function() {
                    return {
                        value: null,
                        callback: r,
                        facade: {
                            get current() {
                                return o.value
                            },
                            set current(value) {
                                var e = o.value;
                                e !== value && (o.value = value, o.callback(value, e))
                            }
                        }
                    }
                })[0]).callback = r, i = o.facade, v(function() {
                    var e = m.get(i);
                    if (e) {
                        var t = new Set(e),
                            r = new Set(n),
                            o = i.current;
                        t.forEach(function(e) {
                            r.has(e) || f(e, null)
                        }), r.forEach(function(e) {
                            t.has(e) || f(e, o)
                        })
                    }
                    m.set(i, n)
                }, [n]), i),
                k = (0, c.__assign)((0, c.__assign)({}, N), l);
            return s.createElement(s.Fragment, null, w && s.createElement(S, {
                sideCar: p,
                removeScrollBar: b,
                shards: C,
                noIsolation: R,
                inert: L,
                setCallbacks: d,
                allowPinchZoom: !!x,
                lockRef: a,
                gapMode: _
            }), y ? s.cloneElement(s.Children.only(g), (0, c.__assign)((0, c.__assign)({}, k), {
                ref: T
            })) : s.createElement(void 0 === P ? "div" : P, (0, c.__assign)({}, k, {
                className: E,
                ref: T
            }), g))
        });
    y.defaultProps = {
        enabled: !0,
        removeScrollBar: !0,
        inert: !1
    }, y.classNames = {
        fullWidth: d,
        zeroRight: l
    };
    var g = function(e) {
        var t = e.sideCar,
            n = (0, c.__rest)(e, ["sideCar"]);
        if (!t) throw Error("Sidecar: please provide `sideCar` property to import the right car");
        var r = t.read();
        if (!r) throw Error("Sidecar medium not found");
        return s.createElement(r, (0, c.__assign)({}, n))
    };
    g.isSideCarExport = !0;
    var E = function() {
            var e = 0,
                t = null;
            return {
                add: function(n) {
                    if (0 == e && (t = function() {
                            if (!document) return null;
                            var e = document.createElement("style");
                            e.type = "text/css";
                            var t = u || ("u" > typeof __webpack_nonce__ ? __webpack_nonce__ : void 0);
                            return t && e.setAttribute("nonce", t), e
                        }())) {
                        var r, o;
                        (r = t).styleSheet ? r.styleSheet.cssText = n : r.appendChild(document.createTextNode(n)), o = t, (document.head || document.getElementsByTagName("head")[0]).appendChild(o)
                    }
                    e++
                },
                remove: function() {
                    --e || !t || (t.parentNode && t.parentNode.removeChild(t), t = null)
                }
            }
        },
        b = function() {
            var e = E();
            return function(t, n) {
                s.useEffect(function() {
                    return e.add(t),
                        function() {
                            e.remove()
                        }
                }, [t && n])
            }
        },
        w = function() {
            var e = b();
            return function(t) {
                return e(t.styles, t.dynamic), null
            }
        },
        C = {
            left: 0,
            top: 0,
            right: 0,
            gap: 0
        },
        S = function(e) {
            return parseInt(e || "", 10) || 0
        },
        R = function(e) {
            var t = window.getComputedStyle(document.body),
                n = t["padding" === e ? "paddingLeft" : "marginLeft"],
                r = t["padding" === e ? "paddingTop" : "marginTop"],
                o = t["padding" === e ? "paddingRight" : "marginRight"];
            return [S(n), S(r), S(o)]
        },
        L = function(e) {
            if (void 0 === e && (e = "margin"), "u" < typeof window) return C;
            var t = R(e),
                n = document.documentElement.clientWidth,
                r = window.innerWidth;
            return {
                left: t[0],
                top: t[1],
                right: t[2],
                gap: Math.max(0, r - n + t[2] - t[0])
            }
        },
        x = w(),
        P = "data-scroll-locked",
        _ = function(e, t, n, r) {
            var o = e.left,
                i = e.top,
                a = e.right,
                u = e.gap;
            return void 0 === n && (n = "margin"), "\n  .".concat("with-scroll-bars-hidden", " {\n   overflow: hidden ").concat(r, ";\n   padding-right: ").concat(u, "px ").concat(r, ";\n  }\n  body[").concat(P, "] {\n    overflow: hidden ").concat(r, ";\n    overscroll-behavior: contain;\n    ").concat([t && "position: relative ".concat(r, ";"), "margin" === n && "\n    padding-left: ".concat(o, "px;\n    padding-top: ").concat(i, "px;\n    padding-right: ").concat(a, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(u, "px ").concat(r, ";\n    "), "padding" === n && "padding-right: ".concat(u, "px ").concat(r, ";")].filter(Boolean).join(""), "\n  }\n  \n  .").concat(l, " {\n    right: ").concat(u, "px ").concat(r, ";\n  }\n  \n  .").concat(d, " {\n    margin-right: ").concat(u, "px ").concat(r, ";\n  }\n  \n  .").concat(l, " .").concat(l, " {\n    right: 0 ").concat(r, ";\n  }\n  \n  .").concat(d, " .").concat(d, " {\n    margin-right: 0 ").concat(r, ";\n  }\n  \n  body[").concat(P, "] {\n    ").concat("--removed-body-scroll-bar-size", ": ").concat(u, "px;\n  }\n")
        },
        N = function() {
            var e = parseInt(document.body.getAttribute(P) || "0", 10);
            return isFinite(e) ? e : 0
        },
        T = function() {
            s.useEffect(function() {
                return document.body.setAttribute(P, (N() + 1).toString()),
                    function() {
                        var e = N() - 1;
                        e <= 0 ? document.body.removeAttribute(P) : document.body.setAttribute(P, e.toString())
                    }
            }, [])
        },
        k = function(e) {
            var t = e.noRelative,
                n = e.noImportant,
                r = e.gapMode,
                o = void 0 === r ? "margin" : r;
            T();
            var i = s.useMemo(function() {
                return L(o)
            }, [o]);
            return s.createElement(x, {
                styles: _(i, !t, o, n ? "" : "!important")
            })
        },
        A = !1;
    if ("u" > typeof window) try {
        var M = Object.defineProperty({}, "passive", {
            get: function() {
                return A = !0, !0
            }
        });
        window.addEventListener("test", M, M), window.removeEventListener("test", M, M)
    } catch (e) {
        A = !1
    }
    var D = !!A && {
            passive: !1
        },
        O = function(e, t) {
            if (!(e instanceof Element)) return !1;
            var n = window.getComputedStyle(e);
            return "hidden" !== n[t] && (n.overflowY !== n.overflowX || "TEXTAREA" === e.tagName || "visible" !== n[t])
        },
        W = function(e, t) {
            var n = t.ownerDocument,
                r = t;
            do {
                if ("u" > typeof ShadowRoot && r instanceof ShadowRoot && (r = r.host), I(e, r)) {
                    var o = F(e, r);
                    if (o[1] > o[2]) return !0
                }
                r = r.parentNode
            } while (r && r !== n.body) return !1
        },
        I = function(e, t) {
            return "v" === e ? O(t, "overflowY") : O(t, "overflowX")
        },
        F = function(e, t) {
            return "v" === e ? [t.scrollTop, t.scrollHeight, t.clientHeight] : [t.scrollLeft, t.scrollWidth, t.clientWidth]
        },
        j = function(e, t, n, r, o) {
            var i, a = (i = window.getComputedStyle(t).direction, "h" === e && "rtl" === i ? -1 : 1),
                u = a * r,
                c = n.target,
                s = t.contains(c),
                l = !1,
                d = u > 0,
                f = 0,
                v = 0;
            do {
                var m = F(e, c),
                    p = m[0],
                    h = m[1] - m[2] - a * p;
                (p || h) && I(e, c) && (f += h, v += p), c = c instanceof ShadowRoot ? c.host : c.parentNode
            } while (!s && c !== document.body || s && (t.contains(c) || t === c)) return d && (o && 1 > Math.abs(f) || !o && u > f) ? l = !0 : !d && (o && 1 > Math.abs(v) || !o && -u > v) && (l = !0), l
        },
        B = function(e) {
            return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0]
        },
        $ = function(e) {
            return [e.deltaX, e.deltaY]
        },
        K = function(e) {
            return e && "current" in e ? e.current : e
        },
        H = 0,
        X = [];
    let Y = (a = function(e) {
        var t = s.useRef([]),
            n = s.useRef([0, 0]),
            r = s.useRef(),
            o = s.useState(H++)[0],
            i = s.useState(w)[0],
            a = s.useRef(e);
        s.useEffect(function() {
            a.current = e
        }, [e]), s.useEffect(function() {
            if (e.inert) {
                document.body.classList.add("block-interactivity-".concat(o));
                var t = (0, c.__spreadArray)([e.lockRef.current], (e.shards || []).map(K), !0).filter(Boolean);
                return t.forEach(function(e) {
                        return e.classList.add("allow-interactivity-".concat(o))
                    }),
                    function() {
                        document.body.classList.remove("block-interactivity-".concat(o)), t.forEach(function(e) {
                            return e.classList.remove("allow-interactivity-".concat(o))
                        })
                    }
            }
        }, [e.inert, e.lockRef.current, e.shards]);
        var u = s.useCallback(function(e, t) {
                if ("touches" in e && 2 === e.touches.length || "wheel" === e.type && e.ctrlKey) return !a.current.allowPinchZoom;
                var o, i = B(e),
                    u = n.current,
                    c = "deltaX" in e ? e.deltaX : u[0] - i[0],
                    s = "deltaY" in e ? e.deltaY : u[1] - i[1],
                    l = e.target,
                    d = Math.abs(c) > Math.abs(s) ? "h" : "v";
                if ("touches" in e && "h" === d && "range" === l.type) return !1;
                var f = W(d, l);
                if (!f) return !0;
                if (f ? o = d : (o = "v" === d ? "h" : "v", f = W(d, l)), !f) return !1;
                if (!r.current && "changedTouches" in e && (c || s) && (r.current = o), !o) return !0;
                var v = r.current || o;
                return j(v, t, e, "h" === v ? c : s, !0)
            }, []),
            l = s.useCallback(function(e) {
                if (X.length && X[X.length - 1] === i) {
                    var n = "deltaY" in e ? $(e) : B(e),
                        r = t.current.filter(function(t) {
                            var r;
                            return t.name === e.type && (t.target === e.target || e.target === t.shadowParent) && (r = t.delta, r[0] === n[0] && r[1] === n[1])
                        })[0];
                    if (r && r.should) {
                        e.cancelable && e.preventDefault();
                        return
                    }
                    if (!r) {
                        var o = (a.current.shards || []).map(K).filter(Boolean).filter(function(t) {
                            return t.contains(e.target)
                        });
                        (o.length > 0 ? u(e, o[0]) : !a.current.noIsolation) && e.cancelable && e.preventDefault()
                    }
                }
            }, []),
            d = s.useCallback(function(e, n, r, o) {
                var i = {
                    name: e,
                    delta: n,
                    target: r,
                    should: o,
                    shadowParent: function(e) {
                        for (var t = null; null !== e;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
                        return t
                    }(r)
                };
                t.current.push(i), setTimeout(function() {
                    t.current = t.current.filter(function(e) {
                        return e !== i
                    })
                }, 1)
            }, []),
            f = s.useCallback(function(e) {
                n.current = B(e), r.current = void 0
            }, []),
            v = s.useCallback(function(t) {
                d(t.type, $(t), t.target, u(t, e.lockRef.current))
            }, []),
            m = s.useCallback(function(t) {
                d(t.type, B(t), t.target, u(t, e.lockRef.current))
            }, []);
        s.useEffect(function() {
            return X.push(i), e.setCallbacks({
                    onScrollCapture: v,
                    onWheelCapture: v,
                    onTouchMoveCapture: m
                }), document.addEventListener("wheel", l, D), document.addEventListener("touchmove", l, D), document.addEventListener("touchstart", f, D),
                function() {
                    X = X.filter(function(e) {
                        return e !== i
                    }), document.removeEventListener("wheel", l, D), document.removeEventListener("touchmove", l, D), document.removeEventListener("touchstart", f, D)
                }
        }, []);
        var p = e.removeScrollBar,
            h = e.inert;
        return s.createElement(s.Fragment, null, h ? s.createElement(i, {
            styles: "\n  .block-interactivity-".concat(o, " {pointer-events: none;}\n  .allow-interactivity-").concat(o, " {pointer-events: all;}\n")
        }) : null, p ? s.createElement(k, {
            gapMode: e.gapMode
        }) : null)
    }, p.useMedium(a), g);
    var z = s.forwardRef(function(e, t) {
        return s.createElement(y, (0, c.__assign)({}, e, {
            ref: t,
            sideCar: Y
        }))
    });
    z.classNames = y.classNames, e.s(["RemoveScroll", 0, z], 833937)
}]);

//# debugId=623ac69f-9a89-a4dd-66de-08f554061f84
//# sourceMappingURL=b00e673a6342a7ca.js.map