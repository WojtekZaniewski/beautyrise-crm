;
! function() {
    try {
        var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {},
            n = (new e.Error).stack;
        n && ((e._debugIds || (e._debugIds = {}))[n] = "ebe3d2da-10dc-f105-ac02-dc695b1cff16")
    } catch (e) {}
}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 599926, (e, t, r) => {
    t.exports = e.r(502334)
}, 264458, (e, t, r) => {
    ! function() {
        "use strict";
        var r = {}.hasOwnProperty;

        function a() {
            for (var e = "", t = 0; t < arguments.length; t++) {
                var o = arguments[t];
                o && (e = n(e, function(e) {
                    if ("string" == typeof e || "number" == typeof e) return e;
                    if ("object" != typeof e) return "";
                    if (Array.isArray(e)) return a.apply(null, e);
                    if (e.toString !== Object.prototype.toString && !e.toString.toString().includes("[native code]")) return e.toString();
                    var t = "";
                    for (var o in e) r.call(e, o) && e[o] && (t = n(t, o));
                    return t
                }(o)))
            }
            return e
        }

        function n(e, t) {
            return t ? e ? e + " " + t : e + t : e
        }
        if (t.exports) a.default = a, t.exports = a;
        else if ("function" == typeof define && "object" == typeof define.amd && define.amd) void 0 !== a && e.v(a);
        else window.classNames = a
    }()
}, 420851, e => {
    "use strict";
    var t = e.i(264458);

    function r(...e) {
        return (0, t.default)(...e)
    }
    e.s(["cn", () => r])
}, 296809, e => {
    "use strict";

    function t({
        element: e,
        callback: t,
        timeout: r,
        threshold: a = .01
    }) {
        if (!e) return;
        let n = null,
            o = !1,
            i = e.getBoundingClientRect(),
            l = i.top < window.innerHeight && i.bottom > 0,
            s = () => {
                o || (n = setTimeout(() => {
                    o || (t(), n = null, o = !0)
                }, r))
            };
        l && !n && s();
        let u = new IntersectionObserver(e => {
            e.forEach(e => {
                e.isIntersecting ? n || (s(), u.disconnect()) : n && (clearTimeout(n), n = null)
            })
        }, {
            threshold: a
        });
        return u.observe(e), () => {
            n && clearTimeout(n), u.disconnect()
        }
    }

    function r({
        element: e,
        callback: t,
        interval: r,
        threshold: a = .01
    }) {
        if (!e) return;
        let n = null,
            o = new IntersectionObserver(e => {
                e.forEach(e => {
                    e.isIntersecting ? n || (n = setInterval(t, r)) : n && (clearInterval(n), n = null)
                })
            }, {
                threshold: a
            });
        return o.observe(e), () => {
            n && clearInterval(n), o.disconnect()
        }
    }
    e.s(["default", 0, t, "setIntervalOnVisible", () => r, "setTimeoutOnVisible", () => t])
}, 825489, e => {
    "use strict";

    function t(e, t, r, a, n) {
        let o = 0,
            i = 0;
        for (let e of "string" == typeof t ? [t] : t) {
            let t = e.split("\n");
            t.length > 0 && "" === t[t.length - 1] && t.pop(), o = Math.max(o, ...t.map(e => e.length)), i = Math.max(i, t.length)
        }
        let l = document.createElement("canvas").getContext("2d");
        l.font = `${r}px ${n}`;
        let s = o * l.measureText("X").width,
            u = i * a,
            c = window.devicePixelRatio || 1;
        e.width = s * c, e.height = u * c, e.style.width = `${s}px`, e.style.height = `${u}px`;
        let d = e.getContext("2d");
        return d.scale(c, c), {
            ctx: d,
            textWidth: s,
            textHeight: u
        }
    }

    function r(e, t, r, a, n, o, i, l) {
        e.clearRect(0, 0, r, a), e.font = `${n}px ${i}`, e.fillStyle = l, e.textBaseline = "top";
        let s = t.split("\n");
        for (let t = 0; t < s.length; t++) e.fillText(s[t], 0, t * o)
    }
    e.s(["renderAsciiFrame", () => r, "setupAsciiCanvas", () => t])
}, 397038, e => {
    "use strict";
    var t = e.i(253719),
        r = e.i(420851);
    let a = (0, e.i(730592).forwardRef)(({
        variant: e = "primary",
        size: a = "default",
        disabled: n,
        isLoading: o = !1,
        loadingLabel: i = "Loading…",
        ...l
    }, s) => {
        let u = !!(n || o);
        return (0, t.jsxs)("button", { ...l,
            ref: s,
            type: l.type ? ? "button",
            "aria-disabled": u || void 0,
            "aria-busy": o || void 0,
            "aria-live": o ? "polite" : void 0,
            "data-state": o ? "loading" : u ? "disabled" : "idle",
            className: (0, r.cn)(l.className, "flex items-center justify-center button relative [&>*]:relative", "text-label-medium lg-max:[&_svg]:size-24", `button-${e} group/button`, "primary" === e || "destructive" === e ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-heat-100" : "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-border-muted", "disabled:cursor-not-allowed", u && "cursor-not-allowed", "default" === a && "rounded-8 px-10 py-6 gap-4", "large" === a && "rounded-10 px-12 py-8 gap-6", "primary" === e && ["text-accent-white", !u && "hover:bg-[color:var(--heat-90)] active:[scale:0.995]", "disabled:opacity-80", "disabled:[&_.button-background]:opacity-70"], ["secondary", "tertiary", "playground"].includes(e) && ["text-accent-black", !u && "active:[scale:0.99] active:bg-black-alpha-7"], "secondary" === e && ["bg-black-alpha-4", !u && "hover:bg-black-alpha-6", "disabled:bg-black-alpha-3", "disabled:text-black-alpha-48", "disabled:hover:bg-black-alpha-3"], "tertiary" === e && [!u && "hover:bg-black-alpha-4", "disabled:text-black-alpha-48", "disabled:hover:bg-transparent"], "destructive" === e && ["bg-red-600 text-accent-white", !u && "hover:bg-red-700 active:scale-[0.98]", "disabled:bg-red-600/70", "disabled:text-white-alpha-72", "disabled:hover:bg-red-600/70"], "playground" === e && ["before:inside-border before:border-black-alpha-4", u ? "before:opacity-0 bg-black-alpha-4 text-black-alpha-24" : "hover:bg-black-alpha-4 hover:before:opacity-0 active:before:opacity-0"]),
            disabled: u,
            children: ["primary" === e && (0, t.jsx)("div", {
                className: "overlay button-background !absolute"
            }), o && (0, t.jsx)("div", {
                className: (0, r.cn)("w-16 h-16 border-2 rounded-full animate-spin", "primary" === e || "destructive" === e ? "border-white/30 border-t-white" : "border-black/30 border-t-black"),
                "aria-hidden": !0
            }), o && (0, t.jsx)("span", {
                className: "sr-only",
                children: i
            }), l.children]
        })
    });
    a.displayName = "Button", e.s(["default", 0, a])
}, 867707, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "BailoutToCSR", {
        enumerable: !0,
        get: function() {
            return n
        }
    });
    let a = e.r(248824);

    function n({
        reason: e,
        children: t
    }) {
        if ("u" < typeof window) throw Object.defineProperty(new a.BailoutToCSRError(e), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: !1,
            configurable: !0
        });
        return t
    }
}, 351279, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "PreloadChunks", {
        enumerable: !0,
        get: function() {
            return s
        }
    });
    let a = e.r(253719),
        n = e.r(675847),
        o = e.r(648117),
        i = e.r(330698),
        l = e.r(991182);

    function s({
        moduleIds: e
    }) {
        if ("u" > typeof window) return null;
        let t = o.workAsyncStorage.getStore();
        if (void 0 === t) return null;
        let r = [];
        if (t.reactLoadableManifest && e) {
            let a = t.reactLoadableManifest;
            for (let t of e) {
                if (!a[t]) continue;
                let e = a[t].files;
                r.push(...e)
            }
        }
        if (0 === r.length) return null;
        let s = (0, l.getDeploymentIdQueryOrEmptyString)();
        return (0, a.jsx)(a.Fragment, {
            children: r.map(e => {
                let r = `${t.assetPrefix}/_next/${(0,i.encodeURIPath)(e)}${s}`;
                return e.endsWith(".css") ? (0, a.jsx)("link", {
                    precedence: "dynamic",
                    href: r,
                    rel: "stylesheet",
                    as: "style",
                    nonce: t.nonce
                }, e) : ((0, n.preload)(r, {
                    as: "script",
                    fetchPriority: "low",
                    nonce: t.nonce
                }), null)
            })
        })
    }
}, 292344, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "default", {
        enumerable: !0,
        get: function() {
            return u
        }
    });
    let a = e.r(253719),
        n = e.r(730592),
        o = e.r(867707),
        i = e.r(351279);

    function l(e) {
        return {
            default: e && "default" in e ? e.default : e
        }
    }
    let s = {
            loader: () => Promise.resolve(l(() => null)),
            loading: null,
            ssr: !0
        },
        u = function(e) {
            let t = { ...s,
                    ...e
                },
                r = (0, n.lazy)(() => t.loader().then(l)),
                u = t.loading;

            function c(e) {
                let l = u ? (0, a.jsx)(u, {
                        isLoading: !0,
                        pastDelay: !0,
                        error: null
                    }) : null,
                    s = !t.ssr || !!t.loading,
                    c = s ? n.Suspense : n.Fragment,
                    d = t.ssr ? (0, a.jsxs)(a.Fragment, {
                        children: ["u" < typeof window ? (0, a.jsx)(i.PreloadChunks, {
                            moduleIds: t.modules
                        }) : null, (0, a.jsx)(r, { ...e
                        })]
                    }) : (0, a.jsx)(o.BailoutToCSR, {
                        reason: "next/dynamic",
                        children: (0, a.jsx)(r, { ...e
                        })
                    });
                return (0, a.jsx)(c, { ...s ? {
                        fallback: l
                    } : {},
                    children: d
                })
            }
            return c.displayName = "LoadableComponent", c
        }
}, 152520, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "default", {
        enumerable: !0,
        get: function() {
            return n
        }
    });
    let a = e.r(481258)._(e.r(292344));

    function n(e, t) {
        let r = {};
        "function" == typeof e && (r.loader = e);
        let n = { ...r,
            ...t
        };
        return (0, a.default)({ ...n,
            modules: n.loadableGenerated ? .modules
        })
    }("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", {
        value: !0
    }), Object.assign(r.default, r), t.exports = r.default)
}, 35166, e => {
    "use strict";

    function t(e) {
        var t = Object.create(null);
        return function(r) {
            return void 0 === t[r] && (t[r] = e(r)), t[r]
        }
    }
    e.s(["default", () => t])
}, 486856, e => {
    "use strict";
    var t = e.i(730592);
    let r = e => {
            let t = e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, r) => r ? r.toUpperCase() : t.toLowerCase());
            return t.charAt(0).toUpperCase() + t.slice(1)
        },
        a = (...e) => e.filter((e, t, r) => !!e && "" !== e.trim() && r.indexOf(e) === t).join(" ").trim();
    var n = {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round"
    };
    let o = (0, t.forwardRef)(({
            color: e = "currentColor",
            size: r = 24,
            strokeWidth: o = 2,
            absoluteStrokeWidth: i,
            className: l = "",
            children: s,
            iconNode: u,
            ...c
        }, d) => (0, t.createElement)("svg", {
            ref: d,
            ...n,
            width: r,
            height: r,
            stroke: e,
            strokeWidth: i ? 24 * Number(o) / Number(r) : o,
            className: a("lucide", l),
            ...!s && !(e => {
                for (let t in e)
                    if (t.startsWith("aria-") || "role" === t || "title" === t) return !0
            })(c) && {
                "aria-hidden": "true"
            },
            ...c
        }, [...u.map(([e, r]) => (0, t.createElement)(e, r)), ...Array.isArray(s) ? s : [s]])),
        i = (e, n) => {
            let i = (0, t.forwardRef)(({
                className: i,
                ...l
            }, s) => (0, t.createElement)(o, {
                ref: s,
                iconNode: n,
                className: a(`lucide-${r(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`, `lucide-${e}`, i),
                ...l
            }));
            return i.displayName = r(e), i
        };
    e.s(["default", () => i], 486856)
}, 808778, (e, t, r) => {
    "use strict";
    let a;
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), r.parse = function(e, t) {
        let r = new u,
            a = e.length;
        if (a < 2) return r;
        let n = t ? .decode || f,
            o = 0;
        do {
            let t = e.indexOf("=", o);
            if (-1 === t) break;
            let i = e.indexOf(";", o),
                l = -1 === i ? a : i;
            if (t > l) {
                o = e.lastIndexOf(";", t - 1) + 1;
                continue
            }
            let s = c(e, o, t),
                u = d(e, t, s),
                f = e.slice(s, u);
            if (void 0 === r[f]) {
                let a = c(e, t + 1, l),
                    o = d(e, l, a),
                    i = n(e.slice(a, o));
                r[f] = i
            }
            o = l + 1
        } while (o < a) return r
    }, r.serialize = function(e, t, r) {
        let a = r ? .encode || encodeURIComponent;
        if (!n.test(e)) throw TypeError(`argument name is invalid: ${e}`);
        let u = a(t);
        if (!o.test(u)) throw TypeError(`argument val is invalid: ${t}`);
        let c = e + "=" + u;
        if (!r) return c;
        if (void 0 !== r.maxAge) {
            if (!Number.isInteger(r.maxAge)) throw TypeError(`option maxAge is invalid: ${r.maxAge}`);
            c += "; Max-Age=" + r.maxAge
        }
        if (r.domain) {
            if (!i.test(r.domain)) throw TypeError(`option domain is invalid: ${r.domain}`);
            c += "; Domain=" + r.domain
        }
        if (r.path) {
            if (!l.test(r.path)) throw TypeError(`option path is invalid: ${r.path}`);
            c += "; Path=" + r.path
        }
        if (r.expires) {
            var d;
            if (d = r.expires, "[object Date]" !== s.call(d) || !Number.isFinite(r.expires.valueOf())) throw TypeError(`option expires is invalid: ${r.expires}`);
            c += "; Expires=" + r.expires.toUTCString()
        }
        if (r.httpOnly && (c += "; HttpOnly"), r.secure && (c += "; Secure"), r.partitioned && (c += "; Partitioned"), r.priority) switch ("string" == typeof r.priority ? r.priority.toLowerCase() : void 0) {
            case "low":
                c += "; Priority=Low";
                break;
            case "medium":
                c += "; Priority=Medium";
                break;
            case "high":
                c += "; Priority=High";
                break;
            default:
                throw TypeError(`option priority is invalid: ${r.priority}`)
        }
        if (r.sameSite) switch ("string" == typeof r.sameSite ? r.sameSite.toLowerCase() : r.sameSite) {
            case !0:
            case "strict":
                c += "; SameSite=Strict";
                break;
            case "lax":
                c += "; SameSite=Lax";
                break;
            case "none":
                c += "; SameSite=None";
                break;
            default:
                throw TypeError(`option sameSite is invalid: ${r.sameSite}`)
        }
        return c
    };
    let n = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
        o = /^[\u0021-\u003A\u003C-\u007E]*$/,
        i = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
        l = /^[\u0020-\u003A\u003D-\u007E]*$/,
        s = Object.prototype.toString,
        u = ((a = function() {}).prototype = Object.create(null), a);

    function c(e, t, r) {
        do {
            let r = e.charCodeAt(t);
            if (32 !== r && 9 !== r) return t
        } while (++t < r) return r
    }

    function d(e, t, r) {
        for (; t > r;) {
            let r = e.charCodeAt(--t);
            if (32 !== r && 9 !== r) return t + 1
        }
        return r
    }

    function f(e) {
        if (-1 === e.indexOf("%")) return e;
        try {
            return decodeURIComponent(e)
        } catch (t) {
            return e
        }
    }
}, 549805, (e, t, r) => {}, 912313, e => {
    "use strict";
    let t;
    var r = e.i(638440),
        a = e.i(401066),
        n = e.i(808778);

    function o() {
        return "u" > typeof window && void 0 !== window.document
    }
    n.parse, n.serialize;
    let i = {
            path: "/",
            sameSite: "lax",
            httpOnly: !1,
            maxAge: 3456e4
        },
        l = /^(.*)[.](0|[1-9][0-9]*)$/;

    function s(e, t) {
        if (e === t) return !0;
        let r = e.match(l);
        return !!r && r[1] === t
    }

    function u(e, t, r) {
        let a = r ? ? 3180,
            n = encodeURIComponent(t);
        if (n.length <= a) return [{
            name: e,
            value: t
        }];
        let o = [];
        for (; n.length > 0;) {
            let e = n.slice(0, a),
                t = e.lastIndexOf("%");
            t > a - 3 && (e = e.slice(0, t));
            let r = "";
            for (; e.length > 0;) try {
                r = decodeURIComponent(e);
                break
            } catch (t) {
                if (t instanceof URIError && "%" === e.at(-3) && e.length > 3) e = e.slice(0, e.length - 3);
                else throw t
            }
            o.push(r), n = n.slice(e.length)
        }
        return o.map((t, r) => ({
            name: `${e}.${r}`,
            value: t
        }))
    }
    async function c(e, t) {
        let r = await t(e);
        if (r) return r;
        let a = [];
        for (let r = 0;; r++) {
            let n = `${e}.${r}`,
                o = await t(n);
            if (!o) break;
            a.push(o)
        }
        return a.length > 0 ? a.join("") : null
    }
    let d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),
        f = " 	\n\r=".split(""),
        m = (() => {
            let e = Array(128);
            for (let t = 0; t < e.length; t += 1) e[t] = -1;
            for (let t = 0; t < f.length; t += 1) e[f[t].charCodeAt(0)] = -2;
            for (let t = 0; t < d.length; t += 1) e[d[t].charCodeAt(0)] = t;
            return e
        })();

    function p(e) {
        let t = [],
            r = 0,
            a = 0;
        if (function(e, t) {
                for (let r = 0; r < e.length; r += 1) {
                    let a = e.charCodeAt(r);
                    if (a > 55295 && a <= 56319) {
                        let t = (a - 55296) * 1024 & 65535;
                        a = (e.charCodeAt(r + 1) - 56320 & 65535 | t) + 65536, r += 1
                    }! function(e, t) {
                        if (e <= 127) return t(e);
                        if (e <= 2047) {
                            t(192 | e >> 6), t(128 | 63 & e);
                            return
                        }
                        if (e <= 65535) {
                            t(224 | e >> 12), t(128 | e >> 6 & 63), t(128 | 63 & e);
                            return
                        }
                        if (e <= 1114111) {
                            t(240 | e >> 18), t(128 | e >> 12 & 63), t(128 | e >> 6 & 63), t(128 | 63 & e);
                            return
                        }
                        throw Error(`Unrecognized Unicode codepoint: ${e.toString(16)}`)
                    }(a, t)
                }
            }(e, e => {
                for (r = r << 8 | e, a += 8; a >= 6;) {
                    let e = r >> a - 6 & 63;
                    t.push(d[e]), a -= 6
                }
            }), a > 0)
            for (r <<= 6 - a, a = 6; a >= 6;) {
                let e = r >> a - 6 & 63;
                t.push(d[e]), a -= 6
            }
        return t.join("")
    }

    function h(e) {
        let t = [],
            r = e => {
                t.push(String.fromCodePoint(e))
            },
            a = {
                utf8seq: 0,
                codepoint: 0
            },
            n = 0,
            o = 0;
        for (let t = 0; t < e.length; t += 1) {
            let i = m[e.charCodeAt(t)];
            if (i > -1)
                for (n = n << 6 | i, o += 6; o >= 8;)(function(e, t, r) {
                    if (0 === t.utf8seq) {
                        if (e <= 127) return r(e);
                        for (let r = 1; r < 6; r += 1)
                            if ((e >> 7 - r & 1) == 0) {
                                t.utf8seq = r;
                                break
                            }
                        if (2 === t.utf8seq) t.codepoint = 31 & e;
                        else if (3 === t.utf8seq) t.codepoint = 15 & e;
                        else if (4 === t.utf8seq) t.codepoint = 7 & e;
                        else throw Error("Invalid UTF-8 sequence");
                        t.utf8seq -= 1
                    } else if (t.utf8seq > 0) {
                        if (e <= 127) throw Error("Invalid UTF-8 sequence");
                        t.codepoint = t.codepoint << 6 | 63 & e, t.utf8seq -= 1, 0 === t.utf8seq && r(t.codepoint)
                    }
                })(n >> o - 8 & 255, a, r), o -= 8;
            else if (-2 === i) continue;
            else throw Error(`Invalid Base64-URL character "${e.at(t)}" at position ${t}`)
        }
        return t.join("")
    }
    let g = "base64-";
    async function b({
        getAll: e,
        setAll: t,
        setItems: r,
        removedItems: a
    }, n) {
        let o = n.cookieEncoding,
            l = n.cookieOptions ? ? null,
            c = await e([...r ? Object.keys(r) : [], ...a ? Object.keys(a) : []]),
            d = c ? .map(({
                name: e
            }) => e) || [],
            f = Object.keys(a).flatMap(e => d.filter(t => s(t, e))),
            m = Object.keys(r).flatMap(e => {
                let t = new Set(d.filter(t => s(t, e))),
                    a = r[e];
                "base64url" === o && (a = g + p(a));
                let n = u(e, a);
                return n.forEach(e => {
                    t.delete(e.name)
                }), f.push(...t), n
            }),
            h = { ...i,
                ...l,
                maxAge: 0
            },
            b = { ...i,
                ...l,
                maxAge: i.maxAge
            };
        delete h.name, delete b.name, await t([...f.map(e => ({
            name: e,
            value: "",
            options: h
        })), ...m.map(({
            name: e,
            value: t
        }) => ({
            name: e,
            value: t,
            options: b
        }))])
    }
    if (e.i(549805), void 0 !== r.default && r.default.env ? .npm_package_name) {
        let e = r.default.env.npm_package_name;
        ["@supabase/auth-helpers-nextjs", "@supabase/auth-helpers-react", "@supabase/auth-helpers-remix", "@supabase/auth-helpers-sveltekit"].includes(e) && console.warn(`
╔════════════════════════════════════════════════════════════════════════════╗
║ ⚠️  IMPORTANT: Package Consolidation Notice                                ║
║                                                                            ║
║ The ${e.padEnd(35)} package name is deprecated.  ║
║                                                                            ║
║ You are now using @supabase/ssr - a unified solution for all frameworks.  ║
║                                                                            ║
║ The auth-helpers packages have been consolidated into @supabase/ssr       ║
║ to provide better maintenance and consistent APIs across frameworks.      ║
║                                                                            ║
║ Please update your package.json to use @supabase/ssr directly:            ║
║   npm uninstall ${e.padEnd(42)} ║
║   npm install @supabase/ssr                                               ║
║                                                                            ║
║ For more information, visit:                                              ║
║ https://supabase.com/docs/guides/auth/server-side                         ║
╚════════════════════════════════════════════════════════════════════════════╝
    `)
    }
    e.s(["createClient", 0, () => (function(e, r, l) {
        let d = o();
        if (d && t) return t;
        if (!e || !r) throw Error(`@supabase/ssr: Your project's URL and API key are required to create a Supabase client!

Check your Supabase project's API settings to find these values

https://supabase.com/dashboard/project/_/settings/api`);
        let {
            storage: f
        } = function(e, t) {
            let r, a, l = e.cookies ? ? null,
                d = e.cookieEncoding,
                f = {},
                m = {};
            if (l)
                if ("get" in l) {
                    let e = async e => {
                        let t = e.flatMap(e => [e, ...Array.from({
                                length: 5
                            }).map((t, r) => `${e}.${r}`)]),
                            r = [];
                        for (let e = 0; e < t.length; e += 1) {
                            let a = await l.get(t[e]);
                            (a || "string" == typeof a) && r.push({
                                name: t[e],
                                value: a
                            })
                        }
                        return r
                    };
                    if (r = async t => await e(t), "set" in l && "remove" in l) a = async e => {
                        for (let t = 0; t < e.length; t += 1) {
                            let {
                                name: r,
                                value: a,
                                options: n
                            } = e[t];
                            a ? await l.set(r, a, n) : await l.remove(r, n)
                        }
                    };
                    else if (t) a = async () => {
                        console.warn("@supabase/ssr: createServerClient was configured without set and remove cookie methods, but the client needs to set cookies. This can lead to issues such as random logouts, early session termination or increased token refresh requests. If in NextJS, check your middleware.ts file, route handlers and server actions for correctness. Consider switching to the getAll and setAll cookie methods instead of get, set and remove which are deprecated and can be difficult to use correctly.")
                    };
                    else throw Error("@supabase/ssr: createBrowserClient requires configuring a getAll and setAll cookie method (deprecated: alternatively both get, set and remove can be used)")
                } else if ("getAll" in l)
                if (r = async () => await l.getAll(), "setAll" in l) a = l.setAll;
                else if (t) a = async () => {
                console.warn("@supabase/ssr: createServerClient was configured without the setAll cookie method, but the client needs to set cookies. This can lead to issues such as random logouts, early session termination or increased token refresh requests. If in NextJS, check your middleware.ts file, route handlers and server actions for correctness.")
            };
            else throw Error("@supabase/ssr: createBrowserClient requires configuring both getAll and setAll cookie methods (deprecated: alternatively both get, set and remove can be used)");
            else throw Error(`@supabase/ssr: ${t?"createServerClient":"createBrowserClient"} requires configuring getAll and setAll cookie methods (deprecated: alternatively use get, set and remove).${o()?" As this is called in a browser runtime, consider removing the cookies option object to use the document.cookie API automatically.":""}`);
            else if (!t && o()) r = () => {
                let e;
                return Object.keys(e = (0, n.parse)(document.cookie)).map(t => ({
                    name: t,
                    value: e[t] ? ? ""
                }))
            }, a = e => {
                e.forEach(({
                    name: e,
                    value: t,
                    options: r
                }) => {
                    document.cookie = (0, n.serialize)(e, t, r)
                })
            };
            else if (t) throw Error("@supabase/ssr: createServerClient must be initialized with cookie options that specify getAll and setAll functions (deprecated, not recommended: alternatively use get, set and remove)");
            else r = () => [], a = () => {
                throw Error("@supabase/ssr: createBrowserClient in non-browser runtimes (including Next.js pre-rendering mode) was not initialized cookie options that specify getAll and setAll functions (deprecated: alternatively use get, set and remove), but they were needed")
            };
            return t ? {
                getAll: r,
                setAll: a,
                setItems: f,
                removedItems: m,
                storage: {
                    isServer: !0,
                    getItem: async e => {
                        if ("string" == typeof f[e]) return f[e];
                        if (m[e]) return null;
                        let t = await r([e]),
                            a = await c(e, async e => {
                                let r = t ? .find(({
                                    name: t
                                }) => t === e) || null;
                                return r ? r.value : null
                            });
                        if (!a) return null;
                        let n = a;
                        return "string" == typeof a && a.startsWith(g) && (n = h(a.substring(g.length))), n
                    },
                    setItem: async (t, n) => {
                        t.endsWith("-code-verifier") && await b({
                            getAll: r,
                            setAll: a,
                            setItems: {
                                [t]: n
                            },
                            removedItems: {}
                        }, {
                            cookieOptions: e ? .cookieOptions ? ? null,
                            cookieEncoding: d
                        }), f[t] = n, delete m[t]
                    },
                    removeItem: async e => {
                        delete f[e], m[e] = !0
                    }
                }
            } : {
                getAll: r,
                setAll: a,
                setItems: f,
                removedItems: m,
                storage: {
                    isServer: !1,
                    getItem: async e => {
                        let t = await r([e]),
                            a = await c(e, async e => {
                                let r = t ? .find(({
                                    name: t
                                }) => t === e) || null;
                                return r ? r.value : null
                            });
                        if (!a) return null;
                        let n = a;
                        return a.startsWith(g) && (n = h(a.substring(g.length))), n
                    },
                    setItem: async (t, n) => {
                        let o = await r([t]),
                            l = new Set((o ? .map(({
                                name: e
                            }) => e) || []).filter(e => s(e, t))),
                            c = n;
                        "base64url" === d && (c = g + p(n));
                        let f = u(t, c);
                        f.forEach(({
                            name: e
                        }) => {
                            l.delete(e)
                        });
                        let m = { ...i,
                                ...e ? .cookieOptions,
                                maxAge : 0
                            },
                            h = { ...i,
                                ...e ? .cookieOptions,
                                maxAge : i.maxAge
                            };
                        delete m.name, delete h.name;
                        let b = [...[...l].map(e => ({
                            name: e,
                            value: "",
                            options: m
                        })), ...f.map(({
                            name: e,
                            value: t
                        }) => ({
                            name: e,
                            value: t,
                            options: h
                        }))];
                        b.length > 0 && await a(b)
                    },
                    removeItem: async t => {
                        let n = await r([t]),
                            o = (n ? .map(({
                                name: e
                            }) => e) || []).filter(e => s(e, t)),
                            l = { ...i,
                                ...e ? .cookieOptions,
                                maxAge : 0
                            };
                        delete l.name, o.length > 0 && await a(o.map(e => ({
                            name: e,
                            value: "",
                            options: l
                        })))
                    }
                }
            }
        }({ ...void 0,
            cookieEncoding: (void 0) ? ? "base64url"
        }, !1), m = (0, a.createClient)(e, r, { ...void 0,
            global: { ...void 0,
                headers: { ...void 0,
                    "X-Client-Info": "supabase-ssr/0.8.0 createBrowserClient"
                }
            },
            auth: { ...void 0,
                ...null,
                flowType: "pkce",
                autoRefreshToken: o(),
                detectSessionInUrl: o(),
                persistSession: !0,
                storage: f,
                ...null
            }
        });
        return d && (t = m), m
    })("https://alttmdsdujxrfnakrkyi.supabase.co", "sb_publishable_1CcTB4SxsdcfOIjABzs4HA_hS7GdDDC")], 912313)
}, 821423, e => {
    "use strict";
    var t = e.i(253719),
        r = e.i(912313),
        a = e.i(730592);
    let n = (0, a.createContext)(void 0);

    function o() {
        let e = (0, a.useContext)(n);
        if (void 0 === e) throw Error("useOptionalUser must be used within an OptionalUserProvider");
        return e
    }

    function i({
        children: e
    }) {
        let [o, i] = (0, a.useState)(null), [l, s] = (0, a.useState)(null), [u, c] = (0, a.useState)(null), [d, f] = (0, a.useState)([]), [m, p] = (0, a.useState)(!0), h = (0, a.useRef)(null), g = (0, a.useCallback)(async () => {
            h.current && await h.current.auth.signOut(), i(null), s(null), c(null), f([]), window.location.href = "/"
        }, []);
        return (0, a.useEffect)(() => {
            if (!o) {
                s(null), c(null), f([]);
                return
            }(async () => {
                try {
                    let e = await fetch("/api/user/team");
                    if (e.ok) {
                        let t = await e.json();
                        s(t.teamId ? ? null), c(t.apiKey ? ? null), f(Array.isArray(t.apiKeys) ? t.apiKeys : [])
                    }
                } catch {
                    s(null), c(null), f([])
                }
            })()
        }, [o]), (0, a.useEffect)(() => {
            let e = (0, r.createClient)();
            h.current = e;
            let t = !0;
            (async () => {
                let {
                    data: r
                } = await e.auth.getSession(), a = r.session ? .user ? ? null, {
                    data: n,
                    error: o
                } = await e.auth.getUser();
                if (t) {
                    if (o) {
                        401 === o.status || 403 === o.status ? (await e.auth.signOut(), i(null), s(null), c(null)) : i(a), p(!1);
                        return
                    }
                    i(n.user ? ? a), p(!1)
                }
            })();
            let {
                data: {
                    subscription: a
                }
            } = e.auth.onAuthStateChange((e, r) => {
                t && (i(r ? .user ? ? null), r || c(null))
            });
            return () => {
                t = !1, a.unsubscribe()
            }
        }, []), (0, t.jsx)(n.Provider, {
            value: {
                optionalUser: o,
                teamId: l,
                apiKey: u,
                apiKeys: d,
                loading: m,
                signOut: g
            },
            children: e
        })
    }
    e.s(["OptionalUserProvider", () => i, "useOptionalUser", () => o])
}, 990907, e => {
    "use strict";
    var t = e.i(253719),
        r = e.i(730592);
    let a = [{
            code: "USD",
            flag: "🇺🇸",
            symbol: "$",
            name: "US Dollar"
        }, {
            code: "EUR",
            flag: "🇪🇺",
            symbol: "€",
            name: "Euro"
        }, {
            code: "GBP",
            flag: "🇬🇧",
            symbol: "£",
            name: "British Pound"
        }, {
            code: "JPY",
            flag: "🇯🇵",
            symbol: "¥",
            name: "Japanese Yen"
        }, {
            code: "CNY",
            flag: "🇨🇳",
            symbol: "¥",
            name: "Chinese Yuan"
        }, {
            code: "CAD",
            flag: "🇨🇦",
            symbol: "$",
            name: "Canadian Dollar"
        }, {
            code: "AUD",
            flag: "🇦🇺",
            symbol: "$",
            name: "Australian Dollar"
        }, {
            code: "CHF",
            flag: "🇨🇭",
            symbol: "CHF",
            name: "Swiss Franc"
        }, {
            code: "HKD",
            flag: "🇭🇰",
            symbol: "$",
            name: "Hong Kong Dollar"
        }, {
            code: "SGD",
            flag: "🇸🇬",
            symbol: "$",
            name: "Singapore Dollar"
        }, {
            code: "SEK",
            flag: "🇸🇪",
            symbol: "kr",
            name: "Swedish Krona"
        }, {
            code: "NOK",
            flag: "🇳🇴",
            symbol: "kr",
            name: "Norwegian Krone"
        }, {
            code: "DKK",
            flag: "🇩🇰",
            symbol: "kr",
            name: "Danish Krone"
        }, {
            code: "NZD",
            flag: "🇳🇿",
            symbol: "$",
            name: "New Zealand Dollar"
        }, {
            code: "MXN",
            flag: "🇲🇽",
            symbol: "$",
            name: "Mexican Peso"
        }, {
            code: "BRL",
            flag: "🇧🇷",
            symbol: "R$",
            name: "Brazilian Real"
        }, {
            code: "ARS",
            flag: "🇦🇷",
            symbol: "$",
            name: "Argentine Peso"
        }, {
            code: "CLP",
            flag: "🇨🇱",
            symbol: "$",
            name: "Chilean Peso"
        }, {
            code: "COP",
            flag: "🇨🇴",
            symbol: "$",
            name: "Colombian Peso"
        }, {
            code: "PEN",
            flag: "🇵🇪",
            symbol: "S/",
            name: "Peruvian Sol"
        }, {
            code: "UYU",
            flag: "🇺🇾",
            symbol: "$",
            name: "Uruguayan Peso"
        }, {
            code: "INR",
            flag: "🇮🇳",
            symbol: "₹",
            name: "Indian Rupee"
        }, {
            code: "RUB",
            flag: "🇷🇺",
            symbol: "₽",
            name: "Russian Ruble"
        }, {
            code: "ZAR",
            flag: "🇿🇦",
            symbol: "R",
            name: "South African Rand"
        }, {
            code: "KRW",
            flag: "🇰🇷",
            symbol: "₩",
            name: "South Korean Won"
        }, {
            code: "THB",
            flag: "🇹🇭",
            symbol: "฿",
            name: "Thai Baht"
        }, {
            code: "MYR",
            flag: "🇲🇾",
            symbol: "RM",
            name: "Malaysian Ringgit"
        }, {
            code: "IDR",
            flag: "🇮🇩",
            symbol: "Rp",
            name: "Indonesian Rupiah"
        }, {
            code: "PHP",
            flag: "🇵🇭",
            symbol: "₱",
            name: "Philippine Peso"
        }, {
            code: "PLN",
            flag: "🇵🇱",
            symbol: "zł",
            name: "Polish Złoty"
        }, {
            code: "HUF",
            flag: "🇭🇺",
            symbol: "Ft",
            name: "Hungarian Forint"
        }, {
            code: "RON",
            flag: "🇷🇴",
            symbol: "lei",
            name: "Romanian Leu"
        }, {
            code: "BGN",
            flag: "🇧🇬",
            symbol: "лв",
            name: "Bulgarian Lev"
        }, {
            code: "UAH",
            flag: "🇺🇦",
            symbol: "₴",
            name: "Ukrainian Hryvnia"
        }, {
            code: "TRY",
            flag: "🇹🇷",
            symbol: "₺",
            name: "Turkish Lira"
        }, {
            code: "AED",
            flag: "🇦🇪",
            symbol: "د.إ",
            name: "UAE Dirham"
        }, {
            code: "SAR",
            flag: "🇸🇦",
            symbol: "﷼",
            name: "Saudi Riyal"
        }, {
            code: "ILS",
            flag: "🇮🇱",
            symbol: "₪",
            name: "Israeli Shekel"
        }, {
            code: "CZK",
            flag: "🇨🇿",
            symbol: "Kč",
            name: "Czech Koruna"
        }],
        n = (0, r.createContext)(void 0);

    function o({
        children: e
    }) {
        let [o, i] = (0, r.useState)("USD"), [l, s] = (0, r.useState)(null), [u, c] = (0, r.useState)(!1), [d, f] = (0, r.useState)(null);
        (0, r.useEffect)(() => {
            (async () => {
                let e = localStorage.getItem("selectedCurrency");
                if (e && a.some(t => t.code === e)) return i(e);
                try {
                    let e = await fetch("/api/detect-currency");
                    if (e.ok) {
                        let t = await e.json(),
                            r = t.currency;
                        if (r && a.some(e => e.code === r)) {
                            i(r), localStorage.setItem("selectedCurrency", r), console.log(`Currency auto-detected: ${r} (${t.country})`);
                            return
                        }
                    }
                } catch (e) {
                    console.log("Could not detect location, using USD as default")
                }
                i("USD"), localStorage.setItem("selectedCurrency", "USD")
            })()
        }, []), (0, r.useEffect)(() => {
            localStorage.setItem("selectedCurrency", o)
        }, [o]), (0, r.useEffect)(() => {
            (async () => {
                if ("USD" !== o || !l) {
                    c(!0), f(null);
                    try {
                        let e = sessionStorage.getItem("exchangeRates"),
                            t = sessionStorage.getItem("exchangeRatesTime");
                        if (e && t && Date.now() - parseInt(t) < 36e5) {
                            s(JSON.parse(e)), c(!1);
                            return
                        }
                        let r = await fetch("/api/exchange-rates");
                        if (!r.ok) throw Error(`Failed to fetch exchange rates: ${r.statusText}`);
                        let a = await r.json();
                        if (a.rates) s(a.rates), sessionStorage.setItem("exchangeRates", JSON.stringify(a.rates)), sessionStorage.setItem("exchangeRatesTime", Date.now().toString());
                        else throw Error("Invalid response format")
                    } catch (e) {
                        console.error("Error fetching exchange rates:", e), f(e instanceof Error ? e.message : "Failed to fetch exchange rates"), s(null), "USD" !== o && (console.log("Exchange rates unavailable, switching to USD"), i("USD"), localStorage.setItem("selectedCurrency", "USD"))
                    } finally {
                        c(!1)
                    }
                }
            })()
        }, []);
        let m = e => {
                if ("USD" === o || !l) return e;
                let t = l[o];
                return t ? e * t : e
            },
            p = e => a.find(t => t.code === e);
        return (0, t.jsx)(n.Provider, {
            value: {
                selectedCurrency: o,
                setSelectedCurrency: i,
                exchangeRates: l,
                loading: u,
                error: d,
                convertPrice: m,
                formatPrice: (e, t = !0) => {
                    let r = m(e);
                    return p(o) ? new Intl.NumberFormat("en-US", {
                        style: t ? "currency" : "decimal",
                        currency: o,
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    }).format(r) : `$${e}`
                },
                getCurrencyInfo: p
            },
            children: e
        })
    }

    function i() {
        let e = (0, r.useContext)(n);
        if (void 0 === e) throw Error("useCurrency must be used within a CurrencyProvider");
        return e
    }
    e.s(["CURRENCIES", 0, a, "CurrencyProvider", () => o, "useCurrency", () => i])
}]);

//# debugId=ebe3d2da-10dc-f105-ac02-dc695b1cff16
//# sourceMappingURL=69f314feac42273d.js.map