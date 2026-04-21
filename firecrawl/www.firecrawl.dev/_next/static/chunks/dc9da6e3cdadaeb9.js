;
! function() {
    try {
        var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {},
            n = (new e.Error).stack;
        n && ((e._debugIds || (e._debugIds = {}))[n] = "de59c3e6-9f62-6412-3505-c33af0dd1f65")
    } catch (e) {}
}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 916827, 843803, 343094, 711477, e => {
    "use strict";
    var t, r = e.i(730592);
    let n = (e, t) => {
            if (t) return "row";
            switch (e) {
                case "horizontal":
                    return "row";
                case "horizontal-reverse":
                    return "row-reverse";
                case "vertical":
                default:
                    return "column";
                case "vertical-reverse":
                    return "column-reverse"
            }
        },
        o = e => "number" == typeof e ? `${e}px` : e;
    var i = e.i(253719),
        c = (0, r.memo)(({
            visible: e,
            flex: t,
            gap: r,
            direction: c,
            horizontal: l,
            align: u,
            justify: f,
            distribution: a,
            height: b,
            width: y,
            padding: s,
            paddingInline: p,
            paddingBlock: m,
            prefixCls: v,
            as: O = "div",
            className: j,
            style: g,
            children: h,
            wrap: d,
            ref: w,
            ...P
        }) => {
            let S = f || a,
                x = "row" === n(c, l) && !y && (e => {
                    if (e) return ["space-between", "space-around", "space-evenly"].includes(e)
                })(S) ? "100%" : o(y),
                D = { ...void 0 !== t ? {
                        "--lobe-flex": String(t)
                    } : {},
                    ...c || l ? {
                        "--lobe-flex-direction": n(c, l)
                    } : {},
                    ...void 0 !== d ? {
                        "--lobe-flex-wrap": d
                    } : {},
                    ...void 0 !== S ? {
                        "--lobe-flex-justify": S
                    } : {},
                    ...void 0 !== u ? {
                        "--lobe-flex-align": u
                    } : {},
                    ...void 0 !== x ? {
                        "--lobe-flex-width": x
                    } : {},
                    ...void 0 !== b ? {
                        "--lobe-flex-height": o(b)
                    } : {},
                    ...void 0 !== s ? {
                        "--lobe-flex-padding": o(s)
                    } : {},
                    ...void 0 !== p ? {
                        "--lobe-flex-padding-inline": o(p)
                    } : {},
                    ...void 0 !== m ? {
                        "--lobe-flex-padding-block": o(m)
                    } : {},
                    ...void 0 !== r ? {
                        "--lobe-flex-gap": o(r)
                    } : {},
                    ...g
                },
                E = "lobe-flex",
                z = [E, !1 === e ? `${E}--hidden` : void 0, v ? `${v}-flex` : void 0, j].filter(Boolean).join(" ");
            return (0, i.jsx)(O, {
                ref: w,
                ...P,
                className: z,
                style: D,
                children: h
            })
        }),
        l = ({
            children: e,
            ref: t,
            ...r
        }) => (0, i.jsx)(c, { ...r,
            align: "center",
            justify: "center",
            ref: t,
            children: e
        }),
        u = (0, r.createContext)({
            appearance: "light",
            setAppearance: function() {},
            isDarkMode: !1,
            themeMode: "light",
            setThemeMode: function() {},
            browserPrefers: null != (t = "u" > typeof window ? matchMedia && matchMedia("(prefers-color-scheme: ".concat("dark", ")")) : {
                matches: !1
            }) && t.matches ? "dark" : "light"
        }),
        f = function(e, t) {
            if (t) {
                if (e && "#000" === t) return "0 0 0 1px rgba(255,255,255,0.1) inset";
                else if (!e && "#fff" === t) return "0 0 0 1px rgba(0,0,0,0.05) inset"
            }
        };

    function a(e) {
        return (a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var b = ["shape", "color", "background", "size", "style", "iconMultiple", "Icon", "iconStyle", "iconClassName"];

    function y(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }

    function s(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? y(Object(r), !0).forEach(function(t) {
                var n, o, i;
                n = e, o = t, i = r[t], (o = function(e) {
                    var t = function(e, t) {
                        if ("object" != a(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, t || "default");
                            if ("object" != a(n)) return n;
                            throw TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === t ? String : Number)(e)
                    }(e, "string");
                    return "symbol" == a(t) ? t : String(t)
                }(o)) in n ? Object.defineProperty(n, o, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : n[o] = i
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : y(Object(r)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            })
        }
        return e
    }
    var p = (0, r.memo)(function(e) {
        var t = e.shape,
            n = e.color,
            o = void 0 === n ? "#fff" : n,
            c = e.background,
            a = e.size,
            y = e.style,
            p = e.iconMultiple,
            m = e.Icon,
            v = e.iconStyle,
            O = e.iconClassName,
            j = function(e, t) {
                if (null == e) return {};
                var r, n, o = function(e, t) {
                    if (null == e) return {};
                    var r, n, o = {},
                        i = Object.keys(e);
                    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
                    return o
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (n = 0; n < i.length; n++) r = i[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r])
                }
                return o
            }(e, b),
            g = (0, r.useContext)(u).isDarkMode;
        return (0, i.jsx)(l, s(s({
            flex: "none",
            style: s({
                background: c,
                borderRadius: "circle" === (void 0 === t ? "circle" : t) ? "50%" : Math.floor(.1 * a),
                boxShadow: f(g, c),
                color: o,
                height: a,
                width: a
            }, y)
        }, j), {}, {
            children: m && (0, i.jsx)(m, {
                className: O,
                color: o,
                size: a,
                style: s({
                    transform: "scale(".concat(void 0 === p ? .75 : p, ")")
                }, v)
            })
        }))
    });
    e.s(["default", 0, p], 843803);
    var m = "Claude",
        v = "#D97757";

    function O(e) {
        return (O = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var j = ["size", "style"];

    function g(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }

    function h(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? g(Object(r), !0).forEach(function(t) {
                var n, o, i;
                n = e, o = t, i = r[t], (o = function(e) {
                    var t = function(e, t) {
                        if ("object" != O(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, t || "default");
                            if ("object" != O(n)) return n;
                            throw TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === t ? String : Number)(e)
                    }(e, "string");
                    return "symbol" == O(t) ? t : String(t)
                }(o)) in n ? Object.defineProperty(n, o, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : n[o] = i
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : g(Object(r)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            })
        }
        return e
    }
    var d = (0, r.memo)(function(e) {
        var t = e.size,
            r = void 0 === t ? "1em" : t,
            n = e.style,
            o = function(e, t) {
                if (null == e) return {};
                var r, n, o = function(e, t) {
                    if (null == e) return {};
                    var r, n, o = {},
                        i = Object.keys(e);
                    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
                    return o
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (n = 0; n < i.length; n++) r = i[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r])
                }
                return o
            }(e, j);
        return (0, i.jsxs)("svg", h(h({
            fill: "currentColor",
            fillRule: "evenodd",
            height: r,
            style: h({
                flex: "none",
                lineHeight: 1
            }, n),
            viewBox: "0 0 24 24",
            width: r,
            xmlns: "http://www.w3.org/2000/svg"
        }, o), {}, {
            children: [(0, i.jsx)("title", {
                children: m
            }), (0, i.jsx)("path", {
                d: "M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"
            })]
        }))
    });

    function w(e) {
        return (w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function P(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }
    var S = (0, r.memo)(function(e) {
        var t = Object.assign({}, (function(e) {
            if (null == e) throw TypeError("Cannot destructure " + e)
        }(e), e));
        return (0, i.jsx)(p, function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? P(Object(r), !0).forEach(function(t) {
                    var n, o, i;
                    n = e, o = t, i = r[t], (o = function(e) {
                        var t = function(e, t) {
                            if ("object" != w(e) || !e) return e;
                            var r = e[Symbol.toPrimitive];
                            if (void 0 !== r) {
                                var n = r.call(e, t || "default");
                                if ("object" != w(n)) return n;
                                throw TypeError("@@toPrimitive must return a primitive value.")
                            }
                            return ("string" === t ? String : Number)(e)
                        }(e, "string");
                        return "symbol" == w(t) ? t : String(t)
                    }(o)) in n ? Object.defineProperty(n, o, {
                        value: i,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : n[o] = i
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : P(Object(r)).forEach(function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                })
            }
            return e
        }({
            Icon: d,
            "aria-label": m,
            background: v,
            color: "#fff",
            iconMultiple: .75
        }, t))
    });

    function x(e) {
        return (x = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var D = ["size", "style"];

    function E(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }

    function z(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? E(Object(r), !0).forEach(function(t) {
                var n, o, i;
                n = e, o = t, i = r[t], (o = function(e) {
                    var t = function(e, t) {
                        if ("object" != x(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, t || "default");
                            if ("object" != x(n)) return n;
                            throw TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === t ? String : Number)(e)
                    }(e, "string");
                    return "symbol" == x(t) ? t : String(t)
                }(o)) in n ? Object.defineProperty(n, o, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : n[o] = i
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : E(Object(r)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            })
        }
        return e
    }
    var C = (0, r.memo)(function(e) {
        var t = e.size,
            r = void 0 === t ? "1em" : t,
            n = e.style,
            o = function(e, t) {
                if (null == e) return {};
                var r, n, o = function(e, t) {
                    if (null == e) return {};
                    var r, n, o = {},
                        i = Object.keys(e);
                    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
                    return o
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (n = 0; n < i.length; n++) r = i[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r])
                }
                return o
            }(e, D);
        return (0, i.jsxs)("svg", z(z({
            height: r,
            style: z({
                flex: "none",
                lineHeight: 1
            }, n),
            viewBox: "0 0 24 24",
            width: r,
            xmlns: "http://www.w3.org/2000/svg"
        }, o), {}, {
            children: [(0, i.jsx)("title", {
                children: m
            }), (0, i.jsx)("path", {
                d: "M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z",
                fill: "#D97757",
                fillRule: "nonzero"
            })]
        }))
    });

    function M(e) {
        return (M = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var k = ["Icon", "style", "Text", "color", "size", "spaceMultiple", "textMultiple", "extra", "extraStyle", "showText", "showLogo", "extraClassName", "iconProps", "inverse"];

    function T(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }

    function I(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? T(Object(r), !0).forEach(function(t) {
                var n, o, i;
                n = e, o = t, i = r[t], (o = function(e) {
                    var t = function(e, t) {
                        if ("object" != M(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, t || "default");
                            if ("object" != M(n)) return n;
                            throw TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === t ? String : Number)(e)
                    }(e, "string");
                    return "symbol" == M(t) ? t : String(t)
                }(o)) in n ? Object.defineProperty(n, o, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : n[o] = i
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : T(Object(r)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            })
        }
        return e
    }
    var L = (0, r.memo)(function(e) {
        var t = e.Icon,
            r = e.style,
            n = e.Text,
            o = e.color,
            l = e.size,
            u = void 0 === l ? 24 : l,
            f = e.spaceMultiple,
            a = void 0 === f ? 1 : f,
            b = e.textMultiple,
            y = void 0 === b ? 1 : b,
            s = e.extra,
            p = e.extraStyle,
            m = e.showText,
            v = e.showLogo,
            O = e.extraClassName,
            j = e.iconProps,
            g = e.inverse,
            h = function(e, t) {
                if (null == e) return {};
                var r, n, o = function(e, t) {
                    if (null == e) return {};
                    var r, n, o = {},
                        i = Object.keys(e);
                    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
                    return o
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (n = 0; n < i.length; n++) r = i[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r])
                }
                return o
            }(e, k),
            d = t && (void 0 === v || v) && (0, i.jsx)(t, I(I({
                size: u
            }, j), {}, {
                style: g ? I({
                    marginLeft: u * a
                }, null == j ? void 0 : j.style) : I({
                    marginRight: u * a
                }, null == j ? void 0 : j.style)
            })),
            w = (void 0 === m || m) && n && (0, i.jsx)(n, {
                size: u * y
            });
        return (0, i.jsxs)(c, I(I({
            align: "center",
            flex: "none",
            horizontal: !0,
            justify: "flex-start",
            style: I({
                color: o
            }, r)
        }, h), {}, {
            children: [g ? (0, i.jsxs)(i.Fragment, {
                children: [w, d]
            }) : (0, i.jsxs)(i.Fragment, {
                children: [d, w]
            }), s && (0, i.jsx)("span", {
                className: O,
                style: I({
                    fontSize: u * y * .95,
                    lineHeight: 1
                }, p),
                children: s
            })]
        }))
    });

    function V(e) {
        return (V = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    e.s(["default", 0, L], 343094);
    var N = ["size", "style"];

    function A(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }

    function H(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? A(Object(r), !0).forEach(function(t) {
                var n, o, i;
                n = e, o = t, i = r[t], (o = function(e) {
                    var t = function(e, t) {
                        if ("object" != V(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, t || "default");
                            if ("object" != V(n)) return n;
                            throw TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === t ? String : Number)(e)
                    }(e, "string");
                    return "symbol" == V(t) ? t : String(t)
                }(o)) in n ? Object.defineProperty(n, o, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : n[o] = i
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : A(Object(r)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            })
        }
        return e
    }
    var B = (0, r.memo)(function(e) {
        var t = e.size,
            r = e.style,
            n = function(e, t) {
                if (null == e) return {};
                var r, n, o = function(e, t) {
                    if (null == e) return {};
                    var r, n, o = {},
                        i = Object.keys(e);
                    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
                    return o
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (n = 0; n < i.length; n++) r = i[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r])
                }
                return o
            }(e, N);
        return (0, i.jsxs)("svg", H(H({
            fill: "currentColor",
            fillRule: "nonzero",
            height: void 0 === t ? "1em" : t,
            style: H({
                flex: "none",
                lineHeight: 1
            }, r),
            viewBox: "0 0 97 24",
            xmlns: "http://www.w3.org/2000/svg"
        }, n), {}, {
            children: [(0, i.jsx)("title", {
                children: m
            }), (0, i.jsx)("path", {
                d: "M13.623 20.222c-3.417 0-5.753-1.901-6.855-4.827a12.992 12.992 0 01-.838-4.772c0-4.907 2.206-8.315 7.08-8.315 3.275 0 5.297 1.425 6.448 4.826h1.402l-.19-4.69C18.709 1.18 16.258.543 13.276.543c-4.2 0-7.775 1.874-9.763 5.254a11.357 11.357 0 00-1.511 5.872c0 3.753 1.777 7.08 5.113 8.926a11.95 11.95 0 005.943 1.398c3.254 0 5.835-.617 8.122-1.697l.593-5.172h-1.43c-.858 2.362-1.88 3.78-3.574 4.534-.831.373-1.88.564-3.146.564zm14.74-17.914L28.499 0h-.967L23.23 1.29v.699l1.907.882v16.142c0 1.1-.565 1.344-2.043 1.528v1.18h7.319v-1.18c-1.484-.184-2.042-.428-2.042-1.528V2.315l-.007-.007zm29.104 19.685h.565l4.95-.937v-1.208l-.695-.054c-1.157-.109-1.457-.346-1.457-1.29V9.897l.137-2.763h-.783l-4.678.672v1.181l.457.082c1.266.183 1.64.536 1.64 1.419v7.67c-1.212.937-2.369 1.527-3.744 1.527-1.525 0-2.471-.774-2.471-2.58V9.905l.136-2.763h-.804l-4.684.672v1.181l.484.082c1.266.183 1.64.536 1.64 1.418v7.08c0 3 1.703 4.426 4.412 4.426 2.07 0 3.765-1.1 5.038-2.627L57.474 22l-.007-.007zm-13.602-9.55c0-3.836-2.043-5.309-5.733-5.309-3.254 0-5.616 1.344-5.616 3.57 0 .666.238 1.175.721 1.528l2.478-.326c-.109-.746-.163-1.201-.163-1.391 0-1.263.674-1.901 2.042-1.901 2.022 0 3.044 1.419 3.044 3.7v.746l-5.106 1.527c-1.702.462-2.67.863-3.316 1.8a3.386 3.386 0 00-.476 1.9c0 2.172 1.497 3.706 4.057 3.706 1.852 0 3.493-.835 4.922-2.416.51 1.581 1.294 2.416 2.69 2.416 1.13 0 2.15-.455 3.063-1.344l-.272-.937a4.363 4.363 0 01-1.178.163c-.783 0-1.157-.617-1.157-1.826v-5.607zm-6.536 7.378c-1.396 0-2.26-.808-2.26-2.226 0-.964.456-1.528 1.43-1.854l4.139-1.31v3.965c-1.321.997-2.097 1.425-3.31 1.425zm43.095 1.235v-1.208l-.701-.054c-1.158-.109-1.45-.346-1.45-1.29V2.308L78.409 0h-.974l-4.302 1.29v.699l1.906.882V8.18a6.024 6.024 0 00-3.656-1.046c-4.276 0-7.612 3.245-7.612 8.098 0 3.998 2.397 6.761 6.346 6.761 2.042 0 3.819-.99 4.922-2.525l-.136 2.525h.571l4.95-.937zm-8.96-12.313c2.043 0 3.575 1.181 3.575 3.353v6.11a4.91 4.91 0 01-3.547 1.425c-2.928 0-4.412-2.308-4.412-5.39 0-3.462 1.695-5.498 4.385-5.498zm19.424 3.055c-.381-1.792-1.484-2.81-3.016-2.81-2.288 0-3.874 1.717-3.874 4.18 0 3.646 1.934 6.008 5.059 6.008a5.858 5.858 0 005.03-2.953l.913.245c-.408 3.163-3.281 5.525-6.808 5.525-4.14 0-6.992-3.054-6.992-7.399 0-4.378 3.098-7.46 7.237-7.46 3.09 0 5.27 1.853 5.97 5.07l-10.783 3.3V14.05l7.264-2.247v-.006z"
            })]
        }))
    });

    function F(e) {
        return (F = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var R = ["type"];

    function U(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }
    var G = (0, r.memo)(function(e) {
        var t = e.type,
            r = function(e, t) {
                if (null == e) return {};
                var r, n, o = function(e, t) {
                    if (null == e) return {};
                    var r, n, o = {},
                        i = Object.keys(e);
                    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
                    return o
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (n = 0; n < i.length; n++) r = i[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r])
                }
                return o
            }(e, R),
            n = "color" === (void 0 === t ? "mono" : t) ? C : d;
        return (0, i.jsx)(L, function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? U(Object(r), !0).forEach(function(t) {
                    var n, o, i;
                    n = e, o = t, i = r[t], (o = function(e) {
                        var t = function(e, t) {
                            if ("object" != F(e) || !e) return e;
                            var r = e[Symbol.toPrimitive];
                            if (void 0 !== r) {
                                var n = r.call(e, t || "default");
                                if ("object" != F(n)) return n;
                                throw TypeError("@@toPrimitive must return a primitive value.")
                            }
                            return ("string" === t ? String : Number)(e)
                        }(e, "string");
                        return "symbol" == F(t) ? t : String(t)
                    }(o)) in n ? Object.defineProperty(n, o, {
                        value: i,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : n[o] = i
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : U(Object(r)).forEach(function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                })
            }
            return e
        }({
            Icon: n,
            Text: B,
            "aria-label": m,
            spaceMultiple: .1,
            textMultiple: .8
        }, r))
    });
    d.Color = C, d.Text = B, d.Combine = G, d.Avatar = S, d.colorPrimary = v, d.title = m, e.s(["Claude", 0, d], 916827);
    var $ = "OpenAI",
        K = "#000",
        _ = "#19C37D",
        W = "#AB68FF",
        q = "#F86AA4",
        J = "#F9C322",
        Q = "#0099FF",
        X = "#0000FE";

    function Y(e) {
        return (Y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var Z = ["size", "style"];

    function ee(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }

    function et(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? ee(Object(r), !0).forEach(function(t) {
                var n, o, i;
                n = e, o = t, i = r[t], (o = function(e) {
                    var t = function(e, t) {
                        if ("object" != Y(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, t || "default");
                            if ("object" != Y(n)) return n;
                            throw TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === t ? String : Number)(e)
                    }(e, "string");
                    return "symbol" == Y(t) ? t : String(t)
                }(o)) in n ? Object.defineProperty(n, o, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : n[o] = i
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ee(Object(r)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            })
        }
        return e
    }
    var er = (0, r.memo)(function(e) {
        var t = e.size,
            r = void 0 === t ? "1em" : t,
            n = e.style,
            o = function(e, t) {
                if (null == e) return {};
                var r, n, o = function(e, t) {
                    if (null == e) return {};
                    var r, n, o = {},
                        i = Object.keys(e);
                    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
                    return o
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (n = 0; n < i.length; n++) r = i[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r])
                }
                return o
            }(e, Z);
        return (0, i.jsxs)("svg", et(et({
            fill: "currentColor",
            fillRule: "evenodd",
            height: r,
            style: et({
                flex: "none",
                lineHeight: 1
            }, n),
            viewBox: "0 0 24 24",
            width: r,
            xmlns: "http://www.w3.org/2000/svg"
        }, o), {}, {
            children: [(0, i.jsx)("title", {
                children: $
            }), (0, i.jsx)("path", {
                d: "M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z"
            })]
        }))
    });

    function en(e) {
        return (en = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var eo = ["type"];

    function ei(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }
    var ec = (0, r.memo)(function(e) {
        var t = e.type,
            n = void 0 === t ? "normal" : t,
            o = function(e, t) {
                if (null == e) return {};
                var r, n, o = function(e, t) {
                    if (null == e) return {};
                    var r, n, o = {},
                        i = Object.keys(e);
                    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
                    return o
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (n = 0; n < i.length; n++) r = i[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r])
                }
                return o
            }(e, eo),
            c = (0, r.useMemo)(function() {
                switch (n) {
                    case "gpt3":
                        return _;
                    case "gpt4":
                        return W;
                    case "gpt5":
                        return q;
                    case "o3":
                    case "o1":
                        return J;
                    case "oss":
                        return Q;
                    case "platform":
                        return X;
                    default:
                        return K
                }
            }, [n]);
        return (0, i.jsx)(p, function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? ei(Object(r), !0).forEach(function(t) {
                    var n, o, i;
                    n = e, o = t, i = r[t], (o = function(e) {
                        var t = function(e, t) {
                            if ("object" != en(e) || !e) return e;
                            var r = e[Symbol.toPrimitive];
                            if (void 0 !== r) {
                                var n = r.call(e, t || "default");
                                if ("object" != en(n)) return n;
                                throw TypeError("@@toPrimitive must return a primitive value.")
                            }
                            return ("string" === t ? String : Number)(e)
                        }(e, "string");
                        return "symbol" == en(t) ? t : String(t)
                    }(o)) in n ? Object.defineProperty(n, o, {
                        value: i,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : n[o] = i
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ei(Object(r)).forEach(function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                })
            }
            return e
        }({
            Icon: er,
            "aria-label": $,
            background: c,
            color: "#fff",
            iconMultiple: .75
        }, o))
    });

    function el(e) {
        return (el = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var eu = ["size", "style"];

    function ef(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }

    function ea(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? ef(Object(r), !0).forEach(function(t) {
                var n, o, i;
                n = e, o = t, i = r[t], (o = function(e) {
                    var t = function(e, t) {
                        if ("object" != el(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, t || "default");
                            if ("object" != el(n)) return n;
                            throw TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === t ? String : Number)(e)
                    }(e, "string");
                    return "symbol" == el(t) ? t : String(t)
                }(o)) in n ? Object.defineProperty(n, o, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : n[o] = i
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ef(Object(r)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            })
        }
        return e
    }
    var eb = (0, r.memo)(function(e) {
        var t = e.size,
            r = e.style,
            n = function(e, t) {
                if (null == e) return {};
                var r, n, o = function(e, t) {
                    if (null == e) return {};
                    var r, n, o = {},
                        i = Object.keys(e);
                    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
                    return o
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (n = 0; n < i.length; n++) r = i[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r])
                }
                return o
            }(e, eu);
        return (0, i.jsxs)("svg", ea(ea({
            fill: "currentColor",
            fillRule: "evenodd",
            height: void 0 === t ? "1em" : t,
            style: ea({
                flex: "none",
                lineHeight: 1
            }, r),
            viewBox: "0 0 84 24",
            xmlns: "http://www.w3.org/2000/svg"
        }, n), {}, {
            children: [(0, i.jsx)("title", {
                children: $
            }), (0, i.jsx)("path", {
                d: "M2 10.955c0 5.276 3.376 8.955 8.054 8.955 4.678 0 8.054-3.679 8.054-8.955S14.732 2 10.054 2C5.423 2 2.068 5.606 2 10.797L2 10.955zm13.021 0c0 3.775-2.05 6.22-4.967 6.22-2.918 0-4.968-2.445-4.968-6.22 0-3.776 2.05-6.22 4.968-6.22 2.917 0 4.967 2.444 4.967 6.22zm11.778 8.955c3.545 0 5.57-3.001 5.57-6.607 0-3.607-2.025-6.608-5.57-6.608-1.64 0-2.845.654-3.64 1.598V6.937h-2.894V24h2.893v-5.688c.796.944 2.002 1.598 3.641 1.598zm-3.713-6.97c0-2.397 1.35-3.703 3.135-3.703 2.097 0 3.23 1.645 3.23 4.066 0 2.42-1.133 4.066-3.23 4.066-1.785 0-3.135-1.332-3.135-3.68v-.75zM40.2 19.91c2.532 0 4.533-1.331 5.425-3.558l-2.483-.944c-.386 1.307-1.52 2.033-2.942 2.033-1.857 0-3.159-1.331-3.376-3.51h8.874v-.967c0-3.485-1.953-6.269-5.619-6.269-3.665 0-6.028 2.88-6.028 6.608 0 3.92 2.532 6.607 6.15 6.607zm-.145-10.77c1.833 0 2.701 1.21 2.725 2.614H36.97c.434-1.719 1.591-2.614 3.086-2.614zm7.814 10.504h2.894v-7.455c0-1.815 1.326-2.783 2.628-2.783 1.591 0 2.218 1.137 2.218 2.71v7.528h2.894V11.27c0-2.735-1.592-4.575-4.244-4.575-1.64 0-2.773.75-3.496 1.598V6.937h-2.894v12.707zM66.978 2.266l-6.56 17.378h3.063l1.471-3.97h7.475l1.495 3.97h3.11L70.475 2.266h-3.496zm1.687 3.437l2.75 7.26h-5.45l2.7-7.26zM82 2.317h-3.086v17.377H82V2.317z"
            })]
        }))
    });

    function ey(e) {
        return (ey = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var es = ["extraStyle"];

    function ep(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }

    function em(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? ep(Object(r), !0).forEach(function(t) {
                var n, o, i;
                n = e, o = t, i = r[t], (o = function(e) {
                    var t = function(e, t) {
                        if ("object" != ey(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, t || "default");
                            if ("object" != ey(n)) return n;
                            throw TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === t ? String : Number)(e)
                    }(e, "string");
                    return "symbol" == ey(t) ? t : String(t)
                }(o)) in n ? Object.defineProperty(n, o, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : n[o] = i
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ep(Object(r)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            })
        }
        return e
    }
    var ev = (0, r.memo)(function(e) {
        var t = e.extraStyle,
            r = function(e, t) {
                if (null == e) return {};
                var r, n, o = function(e, t) {
                    if (null == e) return {};
                    var r, n, o = {},
                        i = Object.keys(e);
                    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
                    return o
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (n = 0; n < i.length; n++) r = i[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r])
                }
                return o
            }(e, es);
        return (0, i.jsx)(L, em({
            Icon: er,
            Text: eb,
            "aria-label": $,
            extraStyle: em({
                fontWeight: 600
            }, t),
            spaceMultiple: .1,
            textMultiple: .75
        }, r))
    });
    er.Text = eb, er.Combine = ev, er.Avatar = ec, er.colorPrimary = K, er.colorGpt3 = _, er.colorGpt4 = W, er.colorGpt5 = q, er.colorO1 = J, er.colorO3 = J, er.colorOss = Q, er.colorPlatform = X, er.title = $, e.s(["OpenAI", 0, er], 711477)
}, 74146, 36101, 528772, e => {
    "use strict";
    var t = e.i(730592),
        r = e.i(843803),
        n = "Cursor",
        o = "#000",
        i = e.i(253719);

    function c(e) {
        return (c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var l = ["size", "style"];

    function u(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }

    function f(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? u(Object(r), !0).forEach(function(t) {
                var n, o, i;
                n = e, o = t, i = r[t], (o = function(e) {
                    var t = function(e, t) {
                        if ("object" != c(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, t || "default");
                            if ("object" != c(n)) return n;
                            throw TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === t ? String : Number)(e)
                    }(e, "string");
                    return "symbol" == c(t) ? t : String(t)
                }(o)) in n ? Object.defineProperty(n, o, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : n[o] = i
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : u(Object(r)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            })
        }
        return e
    }
    var a = (0, t.memo)(function(e) {
        var t = e.size,
            r = void 0 === t ? "1em" : t,
            o = e.style,
            c = function(e, t) {
                if (null == e) return {};
                var r, n, o = function(e, t) {
                    if (null == e) return {};
                    var r, n, o = {},
                        i = Object.keys(e);
                    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
                    return o
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (n = 0; n < i.length; n++) r = i[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r])
                }
                return o
            }(e, l);
        return (0, i.jsxs)("svg", f(f({
            fill: "currentColor",
            fillRule: "evenodd",
            height: r,
            style: f({
                flex: "none",
                lineHeight: 1
            }, o),
            viewBox: "0 0 24 24",
            width: r,
            xmlns: "http://www.w3.org/2000/svg"
        }, c), {}, {
            children: [(0, i.jsx)("title", {
                children: n
            }), (0, i.jsx)("path", {
                d: "M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z"
            })]
        }))
    });

    function b(e) {
        return (b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function y(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }
    var s = (0, t.memo)(function(e) {
            var t = Object.assign({}, (function(e) {
                if (null == e) throw TypeError("Cannot destructure " + e)
            }(e), e));
            return (0, i.jsx)(r.default, function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? y(Object(r), !0).forEach(function(t) {
                        var n, o, i;
                        n = e, o = t, i = r[t], (o = function(e) {
                            var t = function(e, t) {
                                if ("object" != b(e) || !e) return e;
                                var r = e[Symbol.toPrimitive];
                                if (void 0 !== r) {
                                    var n = r.call(e, t || "default");
                                    if ("object" != b(n)) return n;
                                    throw TypeError("@@toPrimitive must return a primitive value.")
                                }
                                return ("string" === t ? String : Number)(e)
                            }(e, "string");
                            return "symbol" == b(t) ? t : String(t)
                        }(o)) in n ? Object.defineProperty(n, o, {
                            value: i,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : n[o] = i
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : y(Object(r)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    })
                }
                return e
            }({
                Icon: a,
                "aria-label": n,
                background: o,
                color: "#fff",
                iconMultiple: .6
            }, t))
        }),
        p = e.i(343094);

    function m(e) {
        return (m = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var v = ["size", "style"];

    function O(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }

    function j(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? O(Object(r), !0).forEach(function(t) {
                var n, o, i;
                n = e, o = t, i = r[t], (o = function(e) {
                    var t = function(e, t) {
                        if ("object" != m(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, t || "default");
                            if ("object" != m(n)) return n;
                            throw TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === t ? String : Number)(e)
                    }(e, "string");
                    return "symbol" == m(t) ? t : String(t)
                }(o)) in n ? Object.defineProperty(n, o, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : n[o] = i
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : O(Object(r)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            })
        }
        return e
    }
    var g = (0, t.memo)(function(e) {
        var t = e.size,
            r = e.style,
            o = function(e, t) {
                if (null == e) return {};
                var r, n, o = function(e, t) {
                    if (null == e) return {};
                    var r, n, o = {},
                        i = Object.keys(e);
                    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
                    return o
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (n = 0; n < i.length; n++) r = i[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r])
                }
                return o
            }(e, v);
        return (0, i.jsxs)("svg", j(j({
            fill: "currentColor",
            fillRule: "evenodd",
            height: void 0 === t ? "1em" : t,
            style: j({
                flex: "none",
                lineHeight: 1
            }, r),
            viewBox: "0 0 123 24",
            xmlns: "http://www.w3.org/2000/svg"
        }, o), {}, {
            children: [(0, i.jsx)("title", {
                children: n
            }), (0, i.jsx)("path", {
                d: "M11.995 2.33h6.516v3.582h-6.295C8.82 5.912 6.169 7.868 6.169 12c0 4.133 2.65 6.089 6.047 6.089h6.295v3.581H11.72C6.03 21.67 2 18.336 2 12c0-6.337 4.307-9.67 9.995-9.67zm9.829 0h4.03V14.15c0 2.947 1.354 4.325 4.53 4.325 3.175 0 4.528-1.377 4.528-4.325V2.33h4.03v12.644c0 4.297-2.733 7.025-8.559 7.025-5.826 0-8.56-2.755-8.56-7.052V2.33zm38.185 5.483c0 2.149-1.243 3.801-2.9 4.518v.055c1.74.248 2.624 1.488 2.65 3.169l.084 6.115h-4.031l-.083-5.454c-.027-1.212-.745-1.956-2.181-1.956h-6.71v7.41h-4.03V2.33h11.127c3.644 0 6.074 1.846 6.074 5.483zm-4.059.55c0-1.652-.883-2.561-2.54-2.561H46.84v5.123h6.626c1.518 0 2.485-.909 2.485-2.562zm19.3 7.66c0-1.378-.884-1.957-2.209-2.067l-4.473-.413c-3.866-.358-5.881-1.873-5.881-5.537 0-3.664 2.485-5.675 6.046-5.675h9.885V5.8h-9.609c-1.38 0-2.263.717-2.263 2.094 0 1.378.91 2.039 2.291 2.15l4.556.385c3.452.303 5.715 1.874 5.715 5.565 0 3.691-2.402 5.675-5.798 5.675H63.184V18.2h9.94c1.297 0 2.126-.882 2.126-2.177zM91.097 2c6.074 0 9.912 3.884 9.912 9.972C101.01 18.061 97.006 22 90.932 22s-9.912-3.94-9.912-10.028C81.02 5.884 85.024 2 91.098 2zm5.743 10c0-4.077-2.374-6.474-5.826-6.474-3.451 0-5.826 2.397-5.826 6.474s2.375 6.473 5.826 6.473c3.452 0 5.826-2.396 5.826-6.473zM121 7.813c0 2.149-1.242 3.801-2.899 4.518v.055c1.739.248 2.623 1.488 2.65 3.169l.083 6.115h-4.031l-.083-5.454c-.027-1.212-.745-1.956-2.181-1.956h-6.709v7.41h-4.031V2.33h11.127c3.645 0 6.074 1.846 6.074 5.483zm-4.059.55c0-1.652-.883-2.561-2.54-2.561h-6.571v5.123h6.626c1.518 0 2.485-.909 2.485-2.562z"
            })]
        }))
    });

    function h(e) {
        return (h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function d(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }
    var w = (0, t.memo)(function(e) {
        var t = Object.assign({}, (function(e) {
            if (null == e) throw TypeError("Cannot destructure " + e)
        }(e), e));
        return (0, i.jsx)(p.default, function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? d(Object(r), !0).forEach(function(t) {
                    var n, o, i;
                    n = e, o = t, i = r[t], (o = function(e) {
                        var t = function(e, t) {
                            if ("object" != h(e) || !e) return e;
                            var r = e[Symbol.toPrimitive];
                            if (void 0 !== r) {
                                var n = r.call(e, t || "default");
                                if ("object" != h(n)) return n;
                                throw TypeError("@@toPrimitive must return a primitive value.")
                            }
                            return ("string" === t ? String : Number)(e)
                        }(e, "string");
                        return "symbol" == h(t) ? t : String(t)
                    }(o)) in n ? Object.defineProperty(n, o, {
                        value: i,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : n[o] = i
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : d(Object(r)).forEach(function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                })
            }
            return e
        }({
            Icon: a,
            Text: g,
            "aria-label": n,
            spaceMultiple: .1,
            textMultiple: .7
        }, t))
    });
    a.Text = g, a.Combine = w, a.Avatar = s, a.colorPrimary = o, a.title = n, e.s(["Cursor", 0, a], 74146);
    var P = "Gemini",
        S = "#fff";
    let x = /\p{Lu}?\p{Ll}+|[0-9]+|\p{Lu}+(?!\p{Ll})|\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{L}+/gu;

    function D(e) {
        return Array.from(e.match(x) ? ? []).map(e => e.toLowerCase()).join("-")
    }
    var E = function(e) {
            var r = "lobe-icons-".concat(D(e), "-fill");
            return (0, t.useMemo)(function() {
                return {
                    fill: "url(#".concat(r, ")"),
                    id: r
                }
            }, [e])
        },
        z = function(e, r) {
            return (0, t.useMemo)(function() {
                return Array.from({
                    length: r
                }, function(t, r) {
                    var n = "lobe-icons-".concat(D(e), "-fill-").concat(r);
                    return {
                        fill: "url(#".concat(n, ")"),
                        id: n
                    }
                })
            }, [e, r])
        };

    function C(e) {
        return (C = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    e.s(["useFillId", () => E, "useFillIds", () => z], 36101);
    var M = ["size", "style"];

    function k(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }

    function T(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? k(Object(r), !0).forEach(function(t) {
                var n, o, i;
                n = e, o = t, i = r[t], (o = function(e) {
                    var t = function(e, t) {
                        if ("object" != C(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, t || "default");
                            if ("object" != C(n)) return n;
                            throw TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === t ? String : Number)(e)
                    }(e, "string");
                    return "symbol" == C(t) ? t : String(t)
                }(o)) in n ? Object.defineProperty(n, o, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : n[o] = i
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : k(Object(r)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            })
        }
        return e
    }

    function I(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
        return n
    }
    var L = (0, t.memo)(function(e) {
        var t, r = e.size,
            n = void 0 === r ? "1em" : r,
            o = e.style,
            c = function(e, t) {
                if (null == e) return {};
                var r, n, o = function(e, t) {
                    if (null == e) return {};
                    var r, n, o = {},
                        i = Object.keys(e);
                    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
                    return o
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (n = 0; n < i.length; n++) r = i[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r])
                }
                return o
            }(e, M),
            l = function(e) {
                if (Array.isArray(e)) return e
            }(t = z(P, 3)) || function(e, t) {
                var r = null == e ? null : "u" > typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                if (null != r) {
                    var n, o, i, c, l = [],
                        u = !0,
                        f = !1;
                    try {
                        i = (r = r.call(e)).next, !1;
                        for (; !(u = (n = i.call(r)).done) && (l.push(n.value), 3 !== l.length); u = !0);
                    } catch (e) {
                        f = !0, o = e
                    } finally {
                        try {
                            if (!u && null != r.return && (c = r.return(), Object(c) !== c)) return
                        } finally {
                            if (f) throw o
                        }
                    }
                    return l
                }
            }(t, 3) || function(e, t) {
                if (e) {
                    if ("string" == typeof e) return I(e, 3);
                    var r = Object.prototype.toString.call(e).slice(8, -1);
                    if ("Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r) return Array.from(e);
                    if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return I(e, 3)
                }
            }(t, 3) || function() {
                throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }(),
            u = l[0],
            f = l[1],
            a = l[2];
        return (0, i.jsxs)("svg", T(T({
            height: n,
            style: T({
                flex: "none",
                lineHeight: 1
            }, o),
            viewBox: "0 0 24 24",
            width: n,
            xmlns: "http://www.w3.org/2000/svg"
        }, c), {}, {
            children: [(0, i.jsx)("title", {
                children: P
            }), (0, i.jsx)("path", {
                d: "M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z",
                fill: "#3186FF"
            }), (0, i.jsx)("path", {
                d: "M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z",
                fill: u.fill
            }), (0, i.jsx)("path", {
                d: "M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z",
                fill: f.fill
            }), (0, i.jsx)("path", {
                d: "M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z",
                fill: a.fill
            }), (0, i.jsxs)("defs", {
                children: [(0, i.jsxs)("linearGradient", {
                    gradientUnits: "userSpaceOnUse",
                    id: u.id,
                    x1: "7",
                    x2: "11",
                    y1: "15.5",
                    y2: "12",
                    children: [(0, i.jsx)("stop", {
                        stopColor: "#08B962"
                    }), (0, i.jsx)("stop", {
                        offset: "1",
                        stopColor: "#08B962",
                        stopOpacity: "0"
                    })]
                }), (0, i.jsxs)("linearGradient", {
                    gradientUnits: "userSpaceOnUse",
                    id: f.id,
                    x1: "8",
                    x2: "11.5",
                    y1: "5.5",
                    y2: "11",
                    children: [(0, i.jsx)("stop", {
                        stopColor: "#F94543"
                    }), (0, i.jsx)("stop", {
                        offset: "1",
                        stopColor: "#F94543",
                        stopOpacity: "0"
                    })]
                }), (0, i.jsxs)("linearGradient", {
                    gradientUnits: "userSpaceOnUse",
                    id: a.id,
                    x1: "3.5",
                    x2: "17.5",
                    y1: "13.5",
                    y2: "12",
                    children: [(0, i.jsx)("stop", {
                        stopColor: "#FABC12"
                    }), (0, i.jsx)("stop", {
                        offset: ".46",
                        stopColor: "#FABC12",
                        stopOpacity: "0"
                    })]
                })]
            })]
        }))
    });

    function V(e) {
        return (V = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function N(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }
    var A = (0, t.memo)(function(e) {
        var t = Object.assign({}, (function(e) {
            if (null == e) throw TypeError("Cannot destructure " + e)
        }(e), e));
        return (0, i.jsx)(r.default, function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? N(Object(r), !0).forEach(function(t) {
                    var n, o, i;
                    n = e, o = t, i = r[t], (o = function(e) {
                        var t = function(e, t) {
                            if ("object" != V(e) || !e) return e;
                            var r = e[Symbol.toPrimitive];
                            if (void 0 !== r) {
                                var n = r.call(e, t || "default");
                                if ("object" != V(n)) return n;
                                throw TypeError("@@toPrimitive must return a primitive value.")
                            }
                            return ("string" === t ? String : Number)(e)
                        }(e, "string");
                        return "symbol" == V(t) ? t : String(t)
                    }(o)) in n ? Object.defineProperty(n, o, {
                        value: i,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : n[o] = i
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : N(Object(r)).forEach(function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                })
            }
            return e
        }({
            Icon: L,
            "aria-label": P,
            background: S,
            color: "#fff",
            iconMultiple: .8
        }, t))
    });

    function H(e) {
        return (H = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var B = ["size", "style"];

    function F(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }

    function R(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? F(Object(r), !0).forEach(function(t) {
                var n, o, i;
                n = e, o = t, i = r[t], (o = function(e) {
                    var t = function(e, t) {
                        if ("object" != H(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, t || "default");
                            if ("object" != H(n)) return n;
                            throw TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === t ? String : Number)(e)
                    }(e, "string");
                    return "symbol" == H(t) ? t : String(t)
                }(o)) in n ? Object.defineProperty(n, o, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : n[o] = i
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : F(Object(r)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            })
        }
        return e
    }
    var U = (0, t.memo)(function(e) {
        var t = e.size,
            r = void 0 === t ? "1em" : t,
            n = e.style,
            o = function(e, t) {
                if (null == e) return {};
                var r, n, o = function(e, t) {
                    if (null == e) return {};
                    var r, n, o = {},
                        i = Object.keys(e);
                    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
                    return o
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (n = 0; n < i.length; n++) r = i[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r])
                }
                return o
            }(e, B);
        return (0, i.jsxs)("svg", R(R({
            fill: "currentColor",
            fillRule: "evenodd",
            height: r,
            style: R({
                flex: "none",
                lineHeight: 1
            }, n),
            viewBox: "0 0 24 24",
            width: r,
            xmlns: "http://www.w3.org/2000/svg"
        }, o), {}, {
            children: [(0, i.jsx)("title", {
                children: P
            }), (0, i.jsx)("path", {
                d: "M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"
            })]
        }))
    });

    function G(e) {
        return (G = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var $ = ["size", "style"];

    function K(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }

    function _(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? K(Object(r), !0).forEach(function(t) {
                var n, o, i;
                n = e, o = t, i = r[t], (o = function(e) {
                    var t = function(e, t) {
                        if ("object" != G(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, t || "default");
                            if ("object" != G(n)) return n;
                            throw TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === t ? String : Number)(e)
                    }(e, "string");
                    return "symbol" == G(t) ? t : String(t)
                }(o)) in n ? Object.defineProperty(n, o, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : n[o] = i
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : K(Object(r)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            })
        }
        return e
    }
    var W = (0, t.memo)(function(e) {
        var t = e.size,
            r = e.style,
            n = function(e, t) {
                if (null == e) return {};
                var r, n, o = function(e, t) {
                    if (null == e) return {};
                    var r, n, o = {},
                        i = Object.keys(e);
                    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
                    return o
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (n = 0; n < i.length; n++) r = i[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r])
                }
                return o
            }(e, $);
        return (0, i.jsxs)("svg", _(_({
            fill: "currentColor",
            fillRule: "evenodd",
            height: void 0 === t ? "1em" : t,
            style: _({
                flex: "none",
                lineHeight: 1
            }, r),
            viewBox: "0 0 98 24",
            xmlns: "http://www.w3.org/2000/svg"
        }, n), {}, {
            children: [(0, i.jsx)("title", {
                children: P
            }), (0, i.jsx)("path", {
                d: "M21.186 12.67c0 2.649-.786 4.759-2.359 6.33-1.766 1.87-4.09 2.806-6.969 2.806-2.756 0-5.088-.953-6.996-2.86C2.954 17.04 2 14.693 2 11.904c0-2.789.954-5.137 2.862-7.043C6.77 2.953 9.102 2 11.858 2c1.396 0 2.712.247 3.949.741 1.236.495 2.252 1.192 3.047 2.092l-1.749 1.748c-.583-.706-1.338-1.258-2.266-1.655a7.49 7.49 0 00-2.981-.596c-2.067 0-3.816.715-5.247 2.145-1.413 1.448-2.12 3.257-2.12 5.428s.707 3.98 2.12 5.428c1.431 1.43 3.18 2.145 5.247 2.145 1.89 0 3.463-.53 4.717-1.588 1.254-1.06 1.979-2.516 2.173-4.37h-6.89v-2.277h9.196c.088.495.132.971.132 1.43m7.652-4.633c1.946 0 3.494.629 4.645 1.886 1.15 1.257 1.726 3.018 1.726 5.282l-.027.268H24.877c.036 1.284.464 2.318 1.285 3.102.82.785 1.802 1.177 2.944 1.177 1.57 0 2.802-.784 3.694-2.354l2.195 1.07a6.54 6.54 0 01-2.45 2.595C31.503 21.688 30.32 22 29 22c-1.927 0-3.516-.66-4.765-1.98-1.249-1.319-1.873-2.986-1.873-5.001 0-1.997.606-3.66 1.82-4.988 1.213-1.329 2.766-1.993 4.657-1.993m-.053 2.247c-.928 0-1.727.285-2.396.856-.67.57-1.11 1.337-1.325 2.3h7.522c-.071-.91-.442-1.663-1.111-2.26-.67-.598-1.566-.896-2.69-.896M39.247 21.53h-2.455V8.465h2.348v1.813h.107c.374-.64.947-1.173 1.721-1.6.774-.427 1.544-.64 2.309-.64.96 0 1.806.222 2.535.667a3.931 3.931 0 011.601 1.84c1.085-1.671 2.589-2.507 4.51-2.507 1.513 0 2.678.462 3.496 1.387.819.924 1.228 2.24 1.228 3.946v8.16h-2.455v-7.786c0-1.227-.223-2.112-.668-2.654-.444-.542-1.192-.813-2.241-.813-.943 0-1.735.4-2.375 1.2-.64.8-.961 1.742-.961 2.826v7.227h-2.455v-7.786c0-1.227-.223-2.112-.668-2.654-.444-.542-1.191-.813-2.241-.813-.943 0-1.735.4-2.375 1.2-.64.8-.961 1.742-.961 2.826v7.227zM61.911 3.93c0 .48-.17.89-.508 1.228a1.675 1.675 0 01-1.23.508c-.48 0-.89-.17-1.229-.508a1.673 1.673 0 01-.508-1.228c0-.481.17-.89.508-1.229a1.675 1.675 0 011.23-.508c.48 0 .89.17 1.23.508.338.338.507.748.507 1.228m-.11 4.514v13.088h-2.857V8.443h2.857zM80 3.93c0 .48-.17.89-.508 1.228a1.675 1.675 0 01-1.23.508c-.48 0-.89-.17-1.229-.508a1.673 1.673 0 01-.508-1.228c0-.481.17-.89.508-1.229a1.675 1.675 0 011.23-.508c.48 0 .89.17 1.23.508.338.338.507.748.507 1.228m-.11 4.514v13.088h-2.857V8.443h2.857zm-16.343.022h2.349v1.813h.107c.373-.64.947-1.173 1.721-1.6a4.935 4.935 0 012.415-.64c1.601 0 2.833.458 3.696 1.373.863.916 1.294 2.218 1.294 3.907v8.213h-2.455v-8.053c-.053-2.133-1.13-3.2-3.229-3.2-.978 0-1.797.395-2.455 1.187-.658.79-.987 1.737-.987 2.84v7.226h-2.456V8.465z"
            })]
        }))
    });

    function q(e) {
        return (q = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var J = ["type"];

    function Q(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }
    var X = (0, t.memo)(function(e) {
        var t = e.type,
            r = function(e, t) {
                if (null == e) return {};
                var r, n, o = function(e, t) {
                    if (null == e) return {};
                    var r, n, o = {},
                        i = Object.keys(e);
                    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
                    return o
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (n = 0; n < i.length; n++) r = i[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r])
                }
                return o
            }(e, J),
            n = "color" === (void 0 === t ? "mono" : t) ? L : U;
        return (0, i.jsx)(p.default, function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? Q(Object(r), !0).forEach(function(t) {
                    var n, o, i;
                    n = e, o = t, i = r[t], (o = function(e) {
                        var t = function(e, t) {
                            if ("object" != q(e) || !e) return e;
                            var r = e[Symbol.toPrimitive];
                            if (void 0 !== r) {
                                var n = r.call(e, t || "default");
                                if ("object" != q(n)) return n;
                                throw TypeError("@@toPrimitive must return a primitive value.")
                            }
                            return ("string" === t ? String : Number)(e)
                        }(e, "string");
                        return "symbol" == q(t) ? t : String(t)
                    }(o)) in n ? Object.defineProperty(n, o, {
                        value: i,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : n[o] = i
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Q(Object(r)).forEach(function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                })
            }
            return e
        }({
            Icon: n,
            Text: W,
            "aria-label": P,
            spaceMultiple: .2,
            textMultiple: .8
        }, r))
    });
    U.Color = L, U.Text = W, U.Combine = X, U.Avatar = A, U.colorPrimary = S, U.title = P, e.s(["Gemini", 0, U], 528772)
}]);

//# debugId=de59c3e6-9f62-6412-3505-c33af0dd1f65
//# sourceMappingURL=c1ed709cb61f8631.js.map