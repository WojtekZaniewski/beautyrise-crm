;
! function() {
    try {
        var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {},
            n = (new e.Error).stack;
        n && ((e._debugIds || (e._debugIds = {}))[n] = "a1323ab3-b29f-a72d-101d-58aa279c9e8e")
    } catch (e) {}
}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 803296, (e, t, a) => {
    t.exports = e.r(55241)
}, 848686, 454494, e => {
    "use strict";
    e.i(638440);
    var t = e.i(730592),
        a = e.i(803296);
    let r = "recaptcha_loaded",
        c = ({
            reCaptchaKey: e,
            language: t,
            useRecaptchaNet: a = !1,
            useEnterprise: r = !1
        } = {}) => {
            let c = `https://www.${a?"recaptcha.net":"google.com"}/recaptcha/${r?"enterprise.js":"api.js"}?`;
            return e && (c += `render=${e}`), t && (c += `&hl=${t}`), c
        },
        n = (e = !1) => e && window.grecaptcha ? .enterprise ? window.grecaptcha.enterprise : window.grecaptcha || null,
        s = (e = !1) => (0, t.useSyncExternalStore)(e => (window.addEventListener(r, e), () => window.removeEventListener(r, e)), () => n(e), () => null);
    e.s(["RECAPTCHA_LOADED_EVENT", () => r, "getGrecaptcha", () => n, "getRecaptchaScriptSrc", () => c, "useGrecaptcha", () => s], 454494);
    let i = (0, t.createContext)({
            reCaptchaKey: null,
            language: null,
            useEnterprise: !1,
            useRecaptchaNet: !1,
            isLoaded: !1,
            isError: !1,
            error: null
        }),
        l = () => (0, t.useContext)(i),
        o = ({
            reCaptchaKey: e,
            useEnterprise: n = !1,
            useRecaptchaNet: s = !1,
            language: l = null,
            children: o,
            strategy: u = "afterInteractive",
            src: p,
            onReady: h,
            onError: d,
            ...C
        }) => {
            let [w, E] = (0, t.useState)(!1), [y, R] = (0, t.useState)(null), f = !!y, g = e || "6Le0qegqAAAAAEeq9YODUpwqriP7_z07liJI9O56", v = p || c({
                reCaptchaKey: g,
                language: l,
                useRecaptchaNet: s,
                useEnterprise: n
            }) || null, m = (0, t.useCallback)(() => {
                R(null), E(!0), window.dispatchEvent(new Event(r)), h ? .()
            }, [h]), A = (0, t.useCallback)(e => {
                R(e), d ? .(e)
            }, [d]), x = (0, t.useMemo)(() => ({
                reCaptchaKey: g,
                language: l,
                useEnterprise: n,
                useRecaptchaNet: s,
                isLoaded: w,
                isError: f,
                error: y
            }), [g, l, n, s, w, f, y]);
            return t.default.createElement(i.Provider, {
                value: x
            }, o, t.default.createElement(a.default, {
                src: v,
                strategy: u,
                onReady: m,
                onError: A,
                ...C
            }))
        };
    e.s(["ReCaptchaContext", () => i, "ReCaptchaProvider", () => o, "useReCaptchaContext", () => l], 848686)
}, 480886, e => {
    "use strict";
    var t = e.i(730592),
        a = e.i(848686),
        r = e.i(454494);
    let c = e => {
        let c = (0, a.useReCaptchaContext)(),
            {
                useEnterprise: n
            } = c,
            s = (0, r.useGrecaptcha)(n),
            i = e || c.reCaptchaKey,
            l = (0, t.useCallback)(async e => {
                if (!i) throw Error("ReCaptcha sitekey is not defined");
                let t = (0, r.getGrecaptcha)(n);
                if ("function" != typeof t ? .execute) throw Error("Recaptcha has not been loaded");
                return "function" == typeof t.ready && await new Promise(e => {
                    t.ready(e)
                }), await t.execute(i, {
                    action: e
                })
            }, [n, i]);
        return { ...c,
            grecaptcha: s,
            reCaptchaKey: i,
            executeRecaptcha: l
        }
    };
    e.s(["useReCaptcha", () => c])
}, 590556, e => {
    "use strict";
    var t = e.i(730592),
        a = e.i(480886);
    let r = ({
        action: e,
        onValidate: r,
        validate: c = !0,
        reCaptchaKey: n
    }) => {
        let {
            isLoaded: s,
            executeRecaptcha: i
        } = (0, a.useReCaptcha)(n);
        return (0, t.useEffect)(() => {
            c && s && "function" == typeof r && (async () => {
                r(await i(e))
            })()
        }, [e, r, c, s, i]), null
    };
    e.s(["ReCaptcha", () => r])
}, 548628, e => {
    "use strict";
    var t = e.i(730592),
        a = e.i(480886);

    function r(e) {
        let r = e.displayName || e.name || "Component",
            c = r => {
                let c = (0, a.useReCaptcha)();
                return t.default.createElement(e, { ...c,
                    ...r
                })
            };
        return c.displayName = `withReCaptcha(${r})`, c
    }
    e.s(["withReCaptcha", () => r])
}]);

//# debugId=a1323ab3-b29f-a72d-101d-58aa279c9e8e
//# sourceMappingURL=b3995a2978165a11.js.map