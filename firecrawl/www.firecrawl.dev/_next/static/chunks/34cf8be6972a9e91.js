;
! function() {
    try {
        var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {},
            n = (new e.Error).stack;
        n && ((e._debugIds || (e._debugIds = {}))[n] = "e743da40-b0df-8ea5-388b-461381802209")
    } catch (e) {}
}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 451642, t => {
    "use strict";
    let e = globalThis;
    t.s(["GLOBAL_OBJ", () => e])
}, 668523, t => {
    "use strict";
    t.s(["SDK_VERSION", () => "10.25.0"])
}, 260397, 521180, 499960, 870395, 911899, 621777, 877128, 181906, 513670, 944610, 64298, 237147, 212381, 846336, 745727, 547786, 469456, 938357, 863516, 184287, 90146, 308890, 409137, 683865, 201353, 382137, 220205, 581428, 103317, 583019, 394636, 741873, 920280, 501230, t => {
    "use strict";
    let e, n, r, i, s, o, a;
    var c = t.i(668523),
        u = t.i(451642);

    function l() {
        return p(u.GLOBAL_OBJ), u.GLOBAL_OBJ
    }

    function p(t) {
        let e = t.__SENTRY__ = t.__SENTRY__ || {};
        return e.version = e.version || c.SDK_VERSION, e[c.SDK_VERSION] = e[c.SDK_VERSION] || {}
    }

    function d(t, e, n = u.GLOBAL_OBJ) {
        let r = n.__SENTRY__ = n.__SENTRY__ || {},
            i = r[c.SDK_VERSION] = r[c.SDK_VERSION] || {};
        return i[t] || (i[t] = e())
    }
    t.s(["getGlobalSingleton", () => d, "getMainCarrier", () => l, "getSentryCarrier", () => p], 521180);
    let f = "u" < typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__;
    t.s(["DEBUG_BUILD", () => f], 499960);
    let _ = Object.prototype.toString;

    function h(t) {
        switch (_.call(t)) {
            case "[object Error]":
            case "[object Exception]":
            case "[object DOMException]":
            case "[object WebAssembly.Exception]":
                return !0;
            default:
                return N(t, Error)
        }
    }

    function g(t, e) {
        return _.call(t) === `[object ${e}]`
    }

    function m(t) {
        return g(t, "ErrorEvent")
    }

    function S(t) {
        return g(t, "DOMError")
    }

    function y(t) {
        return g(t, "DOMException")
    }

    function E(t) {
        return g(t, "String")
    }

    function b(t) {
        return "object" == typeof t && null !== t && "__sentry_template_string__" in t && "__sentry_template_values__" in t
    }

    function v(t) {
        return null === t || b(t) || "object" != typeof t && "function" != typeof t
    }

    function T(t) {
        return g(t, "Object")
    }

    function x(t) {
        return "u" > typeof Event && N(t, Event)
    }

    function I(t) {
        return "u" > typeof Element && N(t, Element)
    }

    function O(t) {
        return g(t, "RegExp")
    }

    function A(t) {
        return !!(t ? .then && "function" == typeof t.then)
    }

    function C(t) {
        return T(t) && "nativeEvent" in t && "preventDefault" in t && "stopPropagation" in t
    }

    function N(t, e) {
        try {
            return t instanceof e
        } catch {
            return !1
        }
    }

    function w(t) {
        return !!("object" == typeof t && null !== t && (t.__isVue || t._isVue))
    }

    function R(t) {
        return "u" > typeof Request && N(t, Request)
    }
    t.s(["isDOMError", () => S, "isDOMException", () => y, "isElement", () => I, "isError", () => h, "isErrorEvent", () => m, "isEvent", () => x, "isInstanceOf", () => N, "isParameterizedString", () => b, "isPlainObject", () => T, "isPrimitive", () => v, "isRegExp", () => O, "isRequest", () => R, "isString", () => E, "isSyntheticEvent", () => C, "isThenable", () => A, "isVueViewModel", () => w], 870395);
    let k = u.GLOBAL_OBJ;

    function L(t, e = {}) {
        if (!t) return "<unknown>";
        try {
            let n, r = t,
                i = [],
                s = 0,
                o = 0,
                a = Array.isArray(e) ? e : e.keyAttrs,
                c = !Array.isArray(e) && e.maxStringLength || 80;
            for (; r && s++ < 5 && (n = function(t, e) {
                    let n = [];
                    if (!t ? .tagName) return "";
                    if (k.HTMLElement && t instanceof HTMLElement && t.dataset) {
                        if (t.dataset.sentryComponent) return t.dataset.sentryComponent;
                        if (t.dataset.sentryElement) return t.dataset.sentryElement
                    }
                    n.push(t.tagName.toLowerCase());
                    let r = e ? .length ? e.filter(e => t.getAttribute(e)).map(e => [e, t.getAttribute(e)]) : null;
                    if (r ? .length) r.forEach(t => {
                        n.push(`[${t[0]}="${t[1]}"]`)
                    });
                    else {
                        t.id && n.push(`#${t.id}`);
                        let e = t.className;
                        if (e && E(e))
                            for (let t of e.split(/\s+/)) n.push(`.${t}`)
                    }
                    for (let e of ["aria-label", "type", "name", "title", "alt"]) {
                        let r = t.getAttribute(e);
                        r && n.push(`[${e}="${r}"]`)
                    }
                    return n.join("")
                }(r, a), "html" !== n && (!(s > 1) || !(o + 3 * i.length + n.length >= c)));) i.push(n), o += n.length, r = r.parentNode;
            return i.reverse().join(" > ")
        } catch {
            return "<unknown>"
        }
    }

    function M() {
        try {
            return k.document.location.href
        } catch {
            return ""
        }
    }

    function P(t) {
        if (!k.HTMLElement) return null;
        let e = t;
        for (let t = 0; t < 5 && e; t++) {
            if (e instanceof HTMLElement) {
                if (e.dataset.sentryComponent) return e.dataset.sentryComponent;
                if (e.dataset.sentryElement) return e.dataset.sentryElement
            }
            e = e.parentNode
        }
        return null
    }
    t.s(["getComponentName", () => P, "getLocationHref", () => M, "htmlTreeAsString", () => L], 911899);
    let D = ["debug", "info", "warn", "error", "log", "assert", "trace"],
        $ = {};

    function j(t) {
        if (!("console" in u.GLOBAL_OBJ)) return t();
        let e = u.GLOBAL_OBJ.console,
            n = {},
            r = Object.keys($);
        r.forEach(t => {
            let r = $[t];
            n[t] = e[t], e[t] = r
        });
        try {
            return t()
        } finally {
            r.forEach(t => {
                e[t] = n[t]
            })
        }
    }

    function B() {
        return F().enabled
    }

    function U(t, ...e) {
        f && B() && j(() => {
            u.GLOBAL_OBJ.console[t](`Sentry Logger [${t}]:`, ...e)
        })
    }

    function F() {
        return f ? d("loggerSettings", () => ({
            enabled: !1
        })) : {
            enabled: !1
        }
    }
    let G = {
        enable: function() {
            F().enabled = !0
        },
        disable: function() {
            F().enabled = !1
        },
        isEnabled: B,
        log: function(...t) {
            U("log", ...t)
        },
        warn: function(...t) {
            U("warn", ...t)
        },
        error: function(...t) {
            U("error", ...t)
        }
    };

    function H(t, e, n) {
        if (!(e in t)) return;
        let r = t[e];
        if ("function" != typeof r) return;
        let i = n(r);
        "function" == typeof i && K(i, r);
        try {
            t[e] = i
        } catch {
            f && G.log(`Failed to replace method "${e}" in object`, t)
        }
    }

    function J(t, e, n) {
        try {
            Object.defineProperty(t, e, {
                value: n,
                writable: !0,
                configurable: !0
            })
        } catch {
            f && G.log(`Failed to add non-enumerable property "${e}" to object`, t)
        }
    }

    function K(t, e) {
        try {
            let n = e.prototype || {};
            t.prototype = e.prototype = n, J(t, "__sentry_original__", e)
        } catch {}
    }

    function V(t) {
        return t.__sentry_original__
    }

    function Y(t) {
        if (h(t)) return {
            message: t.message,
            name: t.name,
            stack: t.stack,
            ...W(t)
        };
        if (!x(t)) return t; {
            let e = {
                type: t.type,
                target: z(t.target),
                currentTarget: z(t.currentTarget),
                ...W(t)
            };
            return "u" > typeof CustomEvent && N(t, CustomEvent) && (e.detail = t.detail), e
        }
    }

    function z(t) {
        try {
            return I(t) ? L(t) : Object.prototype.toString.call(t)
        } catch {
            return "<unknown>"
        }
    }

    function W(t) {
        if ("object" != typeof t || null === t) return {}; {
            let e = {};
            for (let n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e
        }
    }

    function q(t) {
        let e = Object.keys(Y(t));
        return e.sort(), e[0] ? e.join(", ") : "[object has no keys]"
    }

    function X(t, e = 0) {
        return "string" != typeof t || 0 === e || t.length <= e ? t : `${t.slice(0,e)}...`
    }

    function Q(t, e) {
        let n = t,
            r = n.length;
        if (r <= 150) return n;
        e > r && (e = r);
        let i = Math.max(e - 60, 0);
        i < 5 && (i = 0);
        let s = Math.min(i + 140, r);
        return s > r - 5 && (s = r), s === r && (i = Math.max(s - 140, 0)), n = n.slice(i, s), i > 0 && (n = `'{snip} ${n}`), s < r && (n += " {snip}"), n
    }

    function Z(t, e) {
        if (!Array.isArray(t)) return "";
        let n = [];
        for (let e = 0; e < t.length; e++) {
            let r = t[e];
            try {
                w(r) ? n.push("[VueViewModel]") : n.push(String(r))
            } catch {
                n.push("[value cannot be serialized]")
            }
        }
        return n.join(e)
    }

    function tt(t, e, n = !1) {
        return !!E(t) && (O(e) ? e.test(t) : !!E(e) && (n ? t === e : t.includes(e)))
    }

    function te(t, e = [], n = !1) {
        return e.some(e => tt(t, e, n))
    }

    function tn(t = function() {
        let t = u.GLOBAL_OBJ;
        return t.crypto || t.msCrypto
    }()) {
        try {
            if (t ? .randomUUID) return t.randomUUID().replace(/-/g, "")
        } catch {}
        return e || (e = "10000000100040008000100000000000"), e.replace(/[018]/g, t => (t ^ (15 & 16 * Math.random()) >> t / 4).toString(16))
    }

    function tr(t) {
        return t.exception ? .values ? .[0]
    }

    function ti(t) {
        let {
            message: e,
            event_id: n
        } = t;
        if (e) return e;
        let r = tr(t);
        return r ? r.type && r.value ? `${r.type}: ${r.value}` : r.type || r.value || n || "<unknown>" : n || "<unknown>"
    }

    function ts(t, e, n) {
        let r = t.exception = t.exception || {},
            i = r.values = r.values || [],
            s = i[0] = i[0] || {};
        s.value || (s.value = e || ""), s.type || (s.type = n || "Error")
    }

    function to(t, e) {
        let n = tr(t);
        if (!n) return;
        let r = n.mechanism;
        if (n.mechanism = {
                type: "generic",
                handled: !0,
                ...r,
                ...e
            }, e && "data" in e) {
            let t = { ...r ? .data,
                ...e.data
            };
            n.mechanism.data = t
        }
    }

    function ta(t, e, n = 5) {
        if (void 0 === e.lineno) return;
        let r = t.length,
            i = Math.max(Math.min(r - 1, e.lineno - 1), 0);
        e.pre_context = t.slice(Math.max(0, i - n), i).map(t => Q(t, 0)), e.context_line = Q(t[Math.min(r - 1, i)], e.colno || 0), e.post_context = t.slice(Math.min(i + 1, r), i + 1 + n).map(t => Q(t, 0))
    }

    function tc(t) {
        if (function(t) {
                try {
                    return t.__sentry_captured__
                } catch {}
            }(t)) return !0;
        try {
            J(t, "__sentry_captured__", !0)
        } catch {}
        return !1
    }

    function tu() {
        return Date.now() / 1e3
    }

    function tl() {
        return (n ? ? (n = function() {
            let {
                performance: t
            } = u.GLOBAL_OBJ;
            if (!t ? .now || !t.timeOrigin) return tu;
            let e = t.timeOrigin;
            return () => (e + t.now()) / 1e3
        }()))()
    }

    function tp() {
        return r || (r = function() {
            let {
                performance: t
            } = u.GLOBAL_OBJ;
            if (!t ? .now) return [void 0, "none"];
            let e = t.now(),
                n = Date.now(),
                r = t.timeOrigin ? Math.abs(t.timeOrigin + e - n) : 36e5,
                i = t.timing ? .navigationStart,
                s = "number" == typeof i ? Math.abs(i + e - n) : 36e5;
            if (r < 36e5 || s < 36e5)
                if (r <= s) return [t.timeOrigin, "timeOrigin"];
                else return [i, "navigationStart"];
            return [n, "dateNow"]
        }()), r[0]
    }

    function td(t) {
        let e = tl(),
            n = {
                sid: tn(),
                init: !0,
                timestamp: e,
                started: e,
                duration: 0,
                status: "ok",
                errors: 0,
                ignoreDuration: !1,
                toJSON: () => {
                    var t;
                    return t = n, {
                        sid: `${t.sid}`,
                        init: t.init,
                        started: new Date(1e3 * t.started).toISOString(),
                        timestamp: new Date(1e3 * t.timestamp).toISOString(),
                        status: t.status,
                        errors: t.errors,
                        did: "number" == typeof t.did || "string" == typeof t.did ? `${t.did}` : void 0,
                        duration: t.duration,
                        abnormal_mechanism: t.abnormal_mechanism,
                        attrs: {
                            release: t.release,
                            environment: t.environment,
                            ip_address: t.ipAddress,
                            user_agent: t.userAgent
                        }
                    }
                }
            };
        return t && tf(n, t), n
    }

    function tf(t, e = {}) {
        if (e.user && (!t.ipAddress && e.user.ip_address && (t.ipAddress = e.user.ip_address), t.did || e.did || (t.did = e.user.id || e.user.email || e.user.username)), t.timestamp = e.timestamp || tl(), e.abnormal_mechanism && (t.abnormal_mechanism = e.abnormal_mechanism), e.ignoreDuration && (t.ignoreDuration = e.ignoreDuration), e.sid && (t.sid = 32 === e.sid.length ? e.sid : tn()), void 0 !== e.init && (t.init = e.init), !t.did && e.did && (t.did = `${e.did}`), "number" == typeof e.started && (t.started = e.started), t.ignoreDuration) t.duration = void 0;
        else if ("number" == typeof e.duration) t.duration = e.duration;
        else {
            let e = t.timestamp - t.started;
            t.duration = e >= 0 ? e : 0
        }
        e.release && (t.release = e.release), e.environment && (t.environment = e.environment), !t.ipAddress && e.ipAddress && (t.ipAddress = e.ipAddress), !t.userAgent && e.userAgent && (t.userAgent = e.userAgent), "number" == typeof e.errors && (t.errors = e.errors), e.status && (t.status = e.status)
    }

    function t_(t, e) {
        let n = {};
        e ? n = {
            status: e
        } : "ok" === t.status && (n = {
            status: "exited"
        }), tf(t, n)
    }

    function th(t, e, n = 2) {
        if (!e || "object" != typeof e || n <= 0) return e;
        if (t && 0 === Object.keys(e).length) return t;
        let r = { ...t
        };
        for (let t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = th(r[t], e[t], n - 1));
        return r
    }

    function tg() {
        return tn()
    }

    function tm() {
        return tn().substring(16)
    }
    t.s(["CONSOLE_LEVELS", () => D, "consoleSandbox", () => j, "debug", () => G, "originalConsoleMethods", () => $], 621777), t.s(["addNonEnumerableProperty", () => J, "convertToPlainObject", () => Y, "extractExceptionKeysForMessage", () => q, "fill", () => H, "getOriginalFunction", () => V, "markFunctionWrapped", () => K], 877128), t.s(["isMatchingPattern", () => tt, "safeJoin", () => Z, "snipLine", () => Q, "stringMatchesSomePattern", () => te, "truncate", () => X], 181906), t.s(["addContextToFrame", () => ta, "addExceptionMechanism", () => to, "addExceptionTypeValue", () => ts, "checkOrSetAlreadyCaught", () => tc, "getEventDescription", () => ti, "uuid4", () => tn], 513670), t.s(["browserPerformanceTimeOrigin", () => tp, "dateTimestampInSeconds", () => tu, "timestampInSeconds", () => tl], 944610), t.s(["closeSession", () => t_, "makeSession", () => td, "updateSession", () => tf], 64298), t.s(["merge", () => th], 237147), t.s(["generateSpanId", () => tm, "generateTraceId", () => tg], 212381);
    let tS = "_sentrySpan";

    function ty(t, e) {
        e ? J(t, tS, e) : delete t[tS]
    }

    function tE(t) {
        return t[tS]
    }
    t.s(["_getSpanForScope", () => tE, "_setSpanForScope", () => ty], 846336);
    class tb {
        constructor() {
            this._notifyingListeners = !1, this._scopeListeners = [], this._eventProcessors = [], this._breadcrumbs = [], this._attachments = [], this._user = {}, this._tags = {}, this._extra = {}, this._contexts = {}, this._sdkProcessingMetadata = {}, this._propagationContext = {
                traceId: tg(),
                sampleRand: Math.random()
            }
        }
        clone() {
            let t = new tb;
            return t._breadcrumbs = [...this._breadcrumbs], t._tags = { ...this._tags
            }, t._extra = { ...this._extra
            }, t._contexts = { ...this._contexts
            }, this._contexts.flags && (t._contexts.flags = {
                values: [...this._contexts.flags.values]
            }), t._user = this._user, t._level = this._level, t._session = this._session, t._transactionName = this._transactionName, t._fingerprint = this._fingerprint, t._eventProcessors = [...this._eventProcessors], t._attachments = [...this._attachments], t._sdkProcessingMetadata = { ...this._sdkProcessingMetadata
            }, t._propagationContext = { ...this._propagationContext
            }, t._client = this._client, t._lastEventId = this._lastEventId, ty(t, this[tS]), t
        }
        setClient(t) {
            this._client = t
        }
        setLastEventId(t) {
            this._lastEventId = t
        }
        getClient() {
            return this._client
        }
        lastEventId() {
            return this._lastEventId
        }
        addScopeListener(t) {
            this._scopeListeners.push(t)
        }
        addEventProcessor(t) {
            return this._eventProcessors.push(t), this
        }
        setUser(t) {
            return this._user = t || {
                email: void 0,
                id: void 0,
                ip_address: void 0,
                username: void 0
            }, this._session && tf(this._session, {
                user: t
            }), this._notifyScopeListeners(), this
        }
        getUser() {
            return this._user
        }
        setTags(t) {
            return this._tags = { ...this._tags,
                ...t
            }, this._notifyScopeListeners(), this
        }
        setTag(t, e) {
            return this._tags = { ...this._tags,
                [t]: e
            }, this._notifyScopeListeners(), this
        }
        setExtras(t) {
            return this._extra = { ...this._extra,
                ...t
            }, this._notifyScopeListeners(), this
        }
        setExtra(t, e) {
            return this._extra = { ...this._extra,
                [t]: e
            }, this._notifyScopeListeners(), this
        }
        setFingerprint(t) {
            return this._fingerprint = t, this._notifyScopeListeners(), this
        }
        setLevel(t) {
            return this._level = t, this._notifyScopeListeners(), this
        }
        setTransactionName(t) {
            return this._transactionName = t, this._notifyScopeListeners(), this
        }
        setContext(t, e) {
            return null === e ? delete this._contexts[t] : this._contexts[t] = e, this._notifyScopeListeners(), this
        }
        setSession(t) {
            return t ? this._session = t : delete this._session, this._notifyScopeListeners(), this
        }
        getSession() {
            return this._session
        }
        update(t) {
            if (!t) return this;
            let e = "function" == typeof t ? t(this) : t,
                {
                    tags: n,
                    extra: r,
                    user: i,
                    contexts: s,
                    level: o,
                    fingerprint: a = [],
                    propagationContext: c
                } = (e instanceof tb ? e.getScopeData() : T(e) ? t : void 0) || {};
            return this._tags = { ...this._tags,
                ...n
            }, this._extra = { ...this._extra,
                ...r
            }, this._contexts = { ...this._contexts,
                ...s
            }, i && Object.keys(i).length && (this._user = i), o && (this._level = o), a.length && (this._fingerprint = a), c && (this._propagationContext = c), this
        }
        clear() {
            return this._breadcrumbs = [], this._tags = {}, this._extra = {}, this._user = {}, this._contexts = {}, this._level = void 0, this._transactionName = void 0, this._fingerprint = void 0, this._session = void 0, ty(this, void 0), this._attachments = [], this.setPropagationContext({
                traceId: tg(),
                sampleRand: Math.random()
            }), this._notifyScopeListeners(), this
        }
        addBreadcrumb(t, e) {
            let n = "number" == typeof e ? e : 100;
            if (n <= 0) return this;
            let r = {
                timestamp: tu(),
                ...t,
                message: t.message ? X(t.message, 2048) : t.message
            };
            return this._breadcrumbs.push(r), this._breadcrumbs.length > n && (this._breadcrumbs = this._breadcrumbs.slice(-n), this._client ? .recordDroppedEvent("buffer_overflow", "log_item")), this._notifyScopeListeners(), this
        }
        getLastBreadcrumb() {
            return this._breadcrumbs[this._breadcrumbs.length - 1]
        }
        clearBreadcrumbs() {
            return this._breadcrumbs = [], this._notifyScopeListeners(), this
        }
        addAttachment(t) {
            return this._attachments.push(t), this
        }
        clearAttachments() {
            return this._attachments = [], this
        }
        getScopeData() {
            return {
                breadcrumbs: this._breadcrumbs,
                attachments: this._attachments,
                contexts: this._contexts,
                tags: this._tags,
                extra: this._extra,
                user: this._user,
                level: this._level,
                fingerprint: this._fingerprint || [],
                eventProcessors: this._eventProcessors,
                propagationContext: this._propagationContext,
                sdkProcessingMetadata: this._sdkProcessingMetadata,
                transactionName: this._transactionName,
                span: this[tS]
            }
        }
        setSDKProcessingMetadata(t) {
            return this._sdkProcessingMetadata = th(this._sdkProcessingMetadata, t, 2), this
        }
        setPropagationContext(t) {
            return this._propagationContext = t, this
        }
        getPropagationContext() {
            return this._propagationContext
        }
        captureException(t, e) {
            let n = e ? .event_id || tn();
            if (!this._client) return f && G.warn("No client configured on scope - will not capture exception!"), n;
            let r = Error("Sentry syntheticException");
            return this._client.captureException(t, {
                originalException: t,
                syntheticException: r,
                ...e,
                event_id: n
            }, this), n
        }
        captureMessage(t, e, n) {
            let r = n ? .event_id || tn();
            if (!this._client) return f && G.warn("No client configured on scope - will not capture message!"), r;
            let i = Error(t);
            return this._client.captureMessage(t, e, {
                originalException: t,
                syntheticException: i,
                ...n,
                event_id: r
            }, this), r
        }
        captureEvent(t, e) {
            let n = e ? .event_id || tn();
            return this._client ? this._client.captureEvent(t, { ...e,
                event_id: n
            }, this) : f && G.warn("No client configured on scope - will not capture event!"), n
        }
        _notifyScopeListeners() {
            this._notifyingListeners || (this._notifyingListeners = !0, this._scopeListeners.forEach(t => {
                t(this)
            }), this._notifyingListeners = !1)
        }
    }
    t.s(["Scope", () => tb], 745727);
    class tv {
        constructor(t, e) {
            let n, r;
            n = t || new tb, r = e || new tb, this._stack = [{
                scope: n
            }], this._isolationScope = r
        }
        withScope(t) {
            let e, n = this._pushScope();
            try {
                e = t(n)
            } catch (t) {
                throw this._popScope(), t
            }
            return A(e) ? e.then(t => (this._popScope(), t), t => {
                throw this._popScope(), t
            }) : (this._popScope(), e)
        }
        getClient() {
            return this.getStackTop().client
        }
        getScope() {
            return this.getStackTop().scope
        }
        getIsolationScope() {
            return this._isolationScope
        }
        getStackTop() {
            return this._stack[this._stack.length - 1]
        }
        _pushScope() {
            let t = this.getScope().clone();
            return this._stack.push({
                client: this.getClient(),
                scope: t
            }), t
        }
        _popScope() {
            return !(this._stack.length <= 1) && !!this._stack.pop()
        }
    }

    function tT() {
        let t = p(l());
        return t.stack = t.stack || new tv(d("defaultCurrentScope", () => new tb), d("defaultIsolationScope", () => new tb))
    }

    function tx(t) {
        return tT().withScope(t)
    }

    function tI(t, e) {
        let n = tT();
        return n.withScope(() => (n.getStackTop().scope = t, e(t)))
    }

    function tO(t) {
        return tT().withScope(() => t(tT().getIsolationScope()))
    }

    function tA(t) {
        let e = p(t);
        return e.acs ? e.acs : {
            withIsolationScope: tO,
            withScope: tx,
            withSetScope: tI,
            withSetIsolationScope: (t, e) => tO(e),
            getCurrentScope: () => tT().getScope(),
            getIsolationScope: () => tT().getIsolationScope()
        }
    }

    function tC() {
        return tA(l()).getCurrentScope()
    }

    function tN() {
        return tA(l()).getIsolationScope()
    }

    function tw() {
        return d("globalScope", () => new tb)
    }

    function tR(...t) {
        let e = tA(l());
        if (2 === t.length) {
            let [n, r] = t;
            return n ? e.withSetScope(n, r) : e.withScope(r)
        }
        return e.withScope(t[0])
    }

    function tk(...t) {
        let e = tA(l());
        if (2 === t.length) {
            let [n, r] = t;
            return n ? e.withSetIsolationScope(n, r) : e.withIsolationScope(r)
        }
        return e.withIsolationScope(t[0])
    }

    function tL() {
        return tC().getClient()
    }

    function tM(t) {
        let {
            traceId: e,
            parentSpanId: n,
            propagationSpanId: r
        } = t.getPropagationContext(), i = {
            trace_id: e,
            span_id: r || tm()
        };
        return n && (i.parent_span_id = n), i
    }
    t.s(["getAsyncContextStrategy", () => tA], 547786), t.s(["getClient", () => tL, "getCurrentScope", () => tC, "getGlobalScope", () => tw, "getIsolationScope", () => tN, "getTraceContextFromScope", () => tM, "withIsolationScope", () => tk, "withScope", () => tR], 469456);
    let tP = "production";

    function tD(t) {
        return new tj(e => {
            e(t)
        })
    }

    function t$(t) {
        return new tj((e, n) => {
            n(t)
        })
    }
    t.s(["DEFAULT_ENVIRONMENT", () => tP], 938357);
    class tj {
        constructor(t) {
            this._state = 0, this._handlers = [], this._runExecutor(t)
        }
        then(t, e) {
            return new tj((n, r) => {
                this._handlers.push([!1, e => {
                    if (t) try {
                        n(t(e))
                    } catch (t) {
                        r(t)
                    } else n(e)
                }, t => {
                    if (e) try {
                        n(e(t))
                    } catch (t) {
                        r(t)
                    } else r(t)
                }]), this._executeHandlers()
            })
        } catch (t) {
            return this.then(t => t, t)
        } finally(t) {
            return new tj((e, n) => {
                let r, i;
                return this.then(e => {
                    i = !1, r = e, t && t()
                }, e => {
                    i = !0, r = e, t && t()
                }).then(() => {
                    i ? n(r) : e(r)
                })
            })
        }
        _executeHandlers() {
            if (0 === this._state) return;
            let t = this._handlers.slice();
            this._handlers = [], t.forEach(t => {
                t[0] || (1 === this._state && t[1](this._value), 2 === this._state && t[2](this._value), t[0] = !0)
            })
        }
        _runExecutor(t) {
            let e = (t, e) => {
                    if (0 === this._state) {
                        if (A(e)) return void e.then(n, r);
                        this._state = t, this._value = e, this._executeHandlers()
                    }
                },
                n = t => {
                    e(1, t)
                },
                r = t => {
                    e(2, t)
                };
            try {
                t(n, r)
            } catch (t) {
                r(t)
            }
        }
    }
    t.s(["rejectedSyncPromise", () => t$, "resolvedSyncPromise", () => tD], 863516);
    let tB = "sentry.source",
        tU = "sentry.sample_rate",
        tF = "sentry.previous_trace_sample_rate",
        tG = "sentry.op",
        tH = "sentry.origin",
        tJ = "sentry.custom_span_name";
    t.s(["SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME", () => "sentry.exclusive_time", "SEMANTIC_ATTRIBUTE_HTTP_REQUEST_METHOD", () => "http.request.method", "SEMANTIC_ATTRIBUTE_PROFILE_ID", () => "sentry.profile_id", "SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME", () => tJ, "SEMANTIC_ATTRIBUTE_SENTRY_IDLE_SPAN_FINISH_REASON", () => "sentry.idle_span_finish_reason", "SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_UNIT", () => "sentry.measurement_unit", "SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_VALUE", () => "sentry.measurement_value", "SEMANTIC_ATTRIBUTE_SENTRY_OP", () => tG, "SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN", () => tH, "SEMANTIC_ATTRIBUTE_SENTRY_PREVIOUS_TRACE_SAMPLE_RATE", () => tF, "SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE", () => tU, "SEMANTIC_ATTRIBUTE_SENTRY_SOURCE", () => tB, "SEMANTIC_ATTRIBUTE_URL_FULL", () => "url.full", "SEMANTIC_LINK_ATTRIBUTE_LINK_TYPE", () => "sentry.link.type"], 184287);
    let tK = "sentry-",
        tV = /^sentry-/;

    function tY(t) {
        let e = tW(t);
        if (!e) return;
        let n = Object.entries(e).reduce((t, [e, n]) => (e.match(tV) && (t[e.slice(tK.length)] = n), t), {});
        return Object.keys(n).length > 0 ? n : void 0
    }

    function tz(t) {
        if (t) {
            var e = Object.entries(t).reduce((t, [e, n]) => (n && (t[`${tK}${e}`] = n), t), {});
            return 0 !== Object.keys(e).length ? Object.entries(e).reduce((t, [e, n], r) => {
                let i = `${encodeURIComponent(e)}=${encodeURIComponent(n)}`,
                    s = 0 === r ? i : `${t},${i}`;
                return s.length > 8192 ? (f && G.warn(`Not adding key: ${e} with val: ${n} to baggage header due to exceeding baggage size limits.`), t) : s
            }, "") : void 0
        }
    }

    function tW(t) {
        if (t && (E(t) || Array.isArray(t))) return Array.isArray(t) ? t.reduce((t, e) => (Object.entries(tq(e)).forEach(([e, n]) => {
            t[e] = n
        }), t), {}) : tq(t)
    }

    function tq(t) {
        return t.split(",").map(t => {
            let e = t.indexOf("=");
            return -1 === e ? [] : [t.slice(0, e), t.slice(e + 1)].map(t => {
                try {
                    return decodeURIComponent(t.trim())
                } catch {
                    return
                }
            })
        }).reduce((t, [e, n]) => (e && n && (t[e] = n), t), {})
    }
    t.s(["SENTRY_BAGGAGE_KEY_PREFIX", () => tK, "baggageHeaderToDynamicSamplingContext", () => tY, "dynamicSamplingContextToSentryBaggageHeader", () => tz, "parseBaggageHeader", () => tW], 90146);
    let tX = /^o(\d+)\./,
        tQ = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;

    function tZ(t, e = !1) {
        let {
            host: n,
            path: r,
            pass: i,
            port: s,
            projectId: o,
            protocol: a,
            publicKey: c
        } = t;
        return `${a}://${c}${e&&i?`:${i}`:""}@${n}${s?`:${s}`:""}/${r?`${r}/`:r}${o}`
    }

    function t0(t) {
        let e = tQ.exec(t);
        if (!e) return void j(() => {
            console.error(`Invalid Sentry Dsn: ${t}`)
        });
        let [n, r, i = "", s = "", o = "", a = ""] = e.slice(1), c = "", u = a, l = u.split("/");
        if (l.length > 1 && (c = l.slice(0, -1).join("/"), u = l.pop()), u) {
            let t = u.match(/^\d+/);
            t && (u = t[0])
        }
        return t1({
            host: s,
            pass: i,
            path: c,
            projectId: u,
            port: o,
            protocol: n,
            publicKey: r
        })
    }

    function t1(t) {
        return {
            protocol: t.protocol,
            publicKey: t.publicKey || "",
            pass: t.pass || "",
            host: t.host,
            port: t.port || "",
            path: t.path || "",
            projectId: t.projectId
        }
    }

    function t2(t) {
        let e, n = t.getOptions(),
            {
                host: r
            } = t.getDsn() || {};
        if (n.orgId) e = String(n.orgId);
        else {
            let t;
            r && (t = r.match(tX), e = t ? .[1])
        }
        return e
    }

    function t3(t) {
        let e = "string" == typeof t ? t0(t) : t1(t);
        if (e && function(t) {
                if (!f) return !0;
                let {
                    port: e,
                    projectId: n,
                    protocol: r
                } = t;
                return !["protocol", "publicKey", "host", "projectId"].find(e => !t[e] && (G.error(`Invalid Sentry Dsn: ${e} missing`), !0)) && (n.match(/^\d+$/) ? "http" !== r && "https" !== r ? (G.error(`Invalid Sentry Dsn: Invalid protocol ${r}`), !1) : !(e && isNaN(parseInt(e, 10))) || (G.error(`Invalid Sentry Dsn: Invalid port ${e}`), !1) : (G.error(`Invalid Sentry Dsn: Invalid projectId ${n}`), !1))
            }(e)) return e
    }

    function t4(t) {
        if ("boolean" == typeof __SENTRY_TRACING__ && !__SENTRY_TRACING__) return !1;
        let e = t || tL() ? .getOptions();
        return !!e && (null != e.tracesSampleRate || !!e.tracesSampler)
    }

    function t8(t) {
        if (t < 400 && t >= 100) return {
            code: 1
        };
        if (t >= 400 && t < 500) switch (t) {
            case 401:
                return {
                    code: 2,
                    message: "unauthenticated"
                };
            case 403:
                return {
                    code: 2,
                    message: "permission_denied"
                };
            case 404:
                return {
                    code: 2,
                    message: "not_found"
                };
            case 409:
                return {
                    code: 2,
                    message: "already_exists"
                };
            case 413:
                return {
                    code: 2,
                    message: "failed_precondition"
                };
            case 429:
                return {
                    code: 2,
                    message: "resource_exhausted"
                };
            case 499:
                return {
                    code: 2,
                    message: "cancelled"
                };
            default:
                return {
                    code: 2,
                    message: "invalid_argument"
                }
        }
        if (t >= 500 && t < 600) switch (t) {
            case 501:
                return {
                    code: 2,
                    message: "unimplemented"
                };
            case 503:
                return {
                    code: 2,
                    message: "unavailable"
                };
            case 504:
                return {
                    code: 2,
                    message: "deadline_exceeded"
                }
        }
        return {
            code: 2,
            message: "internal_error"
        }
    }

    function t6(t, e) {
        t.setAttribute("http.response.status_code", e);
        let n = t8(e);
        "unknown_error" !== n.message && t.setStatus(n)
    }
    t.s(["dsnFromString", () => t0, "dsnToString", () => tZ, "extractOrgIdFromClient", () => t2, "makeDsn", () => t3], 308890), t.s(["hasSpansEnabled", () => t4], 409137), t.s(["SPAN_STATUS_ERROR", () => 2, "SPAN_STATUS_OK", () => 1, "SPAN_STATUS_UNSET", () => 0, "getSpanStatusFromHttpCode", () => t8, "setHttpStatus", () => t6], 683865);
    let t5 = "_sentryScope",
        t9 = "_sentryIsolationScope";

    function t7(t, e, n) {
        t && (J(t, t9, function(t) {
            try {
                let e = u.GLOBAL_OBJ.WeakRef;
                if ("function" == typeof e) return new e(t)
            } catch {}
            return t
        }(n)), J(t, t5, e))
    }

    function et(t) {
        return {
            scope: t[t5],
            isolationScope: function(t) {
                if (t) {
                    if ("object" == typeof t && "deref" in t && "function" == typeof t.deref) try {
                        return t.deref()
                    } catch {
                        return
                    }
                    return t
                }
            }(t[t9])
        }
    }

    function ee(t) {
        if ("boolean" == typeof t) return Number(t);
        let e = "string" == typeof t ? parseFloat(t) : t;
        if (!("number" != typeof e || isNaN(e)) && !(e < 0) && !(e > 1)) return e
    }
    t.s(["getCapturedScopesOnSpan", () => et, "setCapturedScopesOnSpan", () => t7], 201353), t.s(["parseSampleRate", () => ee], 382137);
    let en = RegExp("^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$");

    function er(t) {
        let e;
        if (!t) return;
        let n = t.match(en);
        if (n) return "1" === n[3] ? e = !0 : "0" === n[3] && (e = !1), {
            traceId: n[1],
            parentSampled: e,
            parentSpanId: n[2]
        }
    }

    function ei(t, e) {
        let n = er(t),
            r = tY(e);
        if (!n ? .traceId) return {
            traceId: tg(),
            sampleRand: Math.random()
        };
        let i = function(t, e) {
            let n = ee(e ? .sample_rand);
            if (void 0 !== n) return n;
            let r = ee(e ? .sample_rate);
            return r && t ? .parentSampled !== void 0 ? t.parentSampled ? Math.random() * r : r + Math.random() * (1 - r) : Math.random()
        }(n, r);
        r && (r.sample_rand = i.toString());
        let {
            traceId: s,
            parentSpanId: o,
            parentSampled: a
        } = n;
        return {
            traceId: s,
            parentSpanId: o,
            sampled: a,
            dsc: r || {},
            sampleRand: i
        }
    }

    function es(t = tg(), e = tm(), n) {
        let r = "";
        return void 0 !== n && (r = n ? "-1" : "-0"), `${t}-${e}${r}`
    }

    function eo(t = tg(), e = tm(), n) {
        return `00-${t}-${e}-${n?"01":"00"}`
    }

    function ea(t, e) {
        let n = t2(t);
        return e && n && e !== n ? (G.log(`Won't continue trace because org IDs don't match (incoming baggage: ${e}, SDK options: ${n})`), !1) : !t.getOptions().strictTraceContinuation || (!e || !!n) && (!!e || !n) || (G.log(`Starting a new trace because strict trace continuation is enabled but one org ID is missing (incoming baggage: ${e}, Sentry client: ${n})`), !1)
    }
    t.s(["TRACEPARENT_REGEXP", () => en, "extractTraceparentData", () => er, "generateSentryTraceHeader", () => es, "generateTraceparentHeader", () => eo, "propagationContextFromHeaders", () => ei, "shouldContinueTrace", () => ea], 220205);
    let ec = !1;

    function eu(t) {
        let {
            spanId: e,
            traceId: n
        } = t.spanContext(), {
            data: r,
            op: i,
            parent_span_id: s,
            status: o,
            origin: a,
            links: c
        } = eg(t);
        return {
            parent_span_id: s,
            span_id: e,
            trace_id: n,
            data: r,
            op: i,
            status: o,
            origin: a,
            links: c
        }
    }

    function el(t) {
        let {
            spanId: e,
            traceId: n,
            isRemote: r
        } = t.spanContext(), i = r ? e : eg(t).parent_span_id, s = et(t).scope;
        return {
            parent_span_id: i,
            span_id: r ? s ? .getPropagationContext().propagationSpanId || tm() : e,
            trace_id: n
        }
    }

    function ep(t) {
        let {
            traceId: e,
            spanId: n
        } = t.spanContext();
        return es(e, n, em(t))
    }

    function ed(t) {
        let {
            traceId: e,
            spanId: n
        } = t.spanContext();
        return eo(e, n, em(t))
    }

    function ef(t) {
        return t && t.length > 0 ? t.map(({
            context: {
                spanId: t,
                traceId: e,
                traceFlags: n,
                ...r
            },
            attributes: i
        }) => ({
            span_id: t,
            trace_id: e,
            sampled: 1 === n,
            attributes: i,
            ...r
        })) : void 0
    }

    function e_(t) {
        return "number" == typeof t ? eh(t) : Array.isArray(t) ? t[0] + t[1] / 1e9 : t instanceof Date ? eh(t.getTime()) : tl()
    }

    function eh(t) {
        return t > 0x2540be3ff ? t / 1e3 : t
    }

    function eg(t) {
        var e;
        if ("function" == typeof t.getSpanJSON) return t.getSpanJSON();
        let {
            spanId: n,
            traceId: r
        } = t.spanContext();
        if ((e = t).attributes && e.startTime && e.name && e.endTime && e.status) {
            let {
                attributes: e,
                startTime: i,
                name: s,
                endTime: o,
                status: a,
                links: c
            } = t;
            return {
                span_id: n,
                trace_id: r,
                data: e,
                description: s,
                parent_span_id: "parentSpanId" in t ? t.parentSpanId : "parentSpanContext" in t ? t.parentSpanContext ? .spanId : void 0,
                start_timestamp: e_(i),
                timestamp: e_(o) || void 0,
                status: eS(a),
                op: e[tG],
                origin: e[tH],
                links: ef(c)
            }
        }
        return {
            span_id: n,
            trace_id: r,
            start_timestamp: 0,
            data: {}
        }
    }

    function em(t) {
        let {
            traceFlags: e
        } = t.spanContext();
        return 1 === e
    }

    function eS(t) {
        if (t && 0 !== t.code) return 1 === t.code ? "ok" : t.message || "internal_error"
    }
    let ey = "_sentryChildSpans",
        eE = "_sentryRootSpan";

    function eb(t, e) {
        let n = t[eE] || t;
        J(e, eE, n), t[ey] ? t[ey].add(e) : J(t, ey, new Set([e]))
    }

    function ev(t, e) {
        t[ey] && t[ey].delete(e)
    }

    function eT(t) {
        let e = new Set;
        return ! function t(n) {
            if (!e.has(n) && em(n))
                for (let r of (e.add(n), n[ey] ? Array.from(n[ey]) : [])) t(r)
        }(t), Array.from(e)
    }

    function ex(t) {
        return t[eE] || t
    }

    function eI() {
        let t = tA(l());
        return t.getActiveSpan ? t.getActiveSpan() : tC()[tS]
    }

    function eO() {
        ec || (j(() => {
            console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")
        }), ec = !0)
    }

    function eA(t, e) {
        t.updateName(e), t.setAttributes({
            [tB]: "custom",
            [tJ]: e
        })
    }
    t.s(["TRACE_FLAG_NONE", () => 0, "TRACE_FLAG_SAMPLED", () => 1, "addChildSpanToSpan", () => eb, "convertSpanLinksForEnvelope", () => ef, "getActiveSpan", () => eI, "getRootSpan", () => ex, "getSpanDescendants", () => eT, "getStatusMessage", () => eS, "removeChildSpanFromSpan", () => ev, "showSpanDropWarning", () => eO, "spanIsSampled", () => em, "spanTimeInputToSeconds", () => e_, "spanToJSON", () => eg, "spanToTraceContext", () => el, "spanToTraceHeader", () => ep, "spanToTraceparentHeader", () => ed, "spanToTransactionTraceContext", () => eu, "updateSpanName", () => eA], 581428);
    let eC = "_frozenDsc";

    function eN(t, e) {
        J(t, eC, e)
    }

    function ew(t, e) {
        let n = e.getOptions(),
            {
                publicKey: r
            } = e.getDsn() || {},
            i = {
                environment: n.environment || tP,
                release: n.release,
                public_key: r,
                trace_id: t,
                org_id: t2(e)
            };
        return e.emit("createDsc", i), i
    }

    function eR(t, e) {
        let n = e.getPropagationContext();
        return n.dsc || ew(n.traceId, t)
    }

    function ek(t) {
        let e = tL();
        if (!e) return {};
        let n = ex(t),
            r = eg(n),
            i = r.data,
            s = n.spanContext().traceState,
            o = s ? .get("sentry.sample_rate") ? ? i[tU] ? ? i[tF];

        function a(t) {
            return ("number" == typeof o || "string" == typeof o) && (t.sample_rate = `${o}`), t
        }
        let c = n[eC];
        if (c) return a(c);
        let u = s ? .get("sentry.dsc"),
            l = u && tY(u);
        if (l) return a(l);
        let p = ew(t.spanContext().traceId, e),
            d = i[tB],
            f = r.description;
        return "url" !== d && f && (p.transaction = f), t4() && (p.sampled = String(em(n)), p.sample_rand = s ? .get("sentry.sample_rand") ? ? et(n).scope ? .getPropagationContext().sampleRand.toString()), a(p), e.emit("createDsc", p, n), p
    }

    function eL(t) {
        return tz(ek(t))
    }

    function eM(t, e) {
        var n, r, i, s, o, a, c, u;
        let l, p, {
            fingerprint: d,
            span: f,
            breadcrumbs: _,
            sdkProcessingMetadata: h
        } = e;
        (function(t, e) {
            let {
                extra: n,
                tags: r,
                user: i,
                contexts: s,
                level: o,
                transactionName: a
            } = e;
            Object.keys(n).length && (t.extra = { ...n,
                ...t.extra
            }), Object.keys(r).length && (t.tags = { ...r,
                ...t.tags
            }), Object.keys(i).length && (t.user = { ...i,
                ...t.user
            }), Object.keys(s).length && (t.contexts = { ...s,
                ...t.contexts
            }), o && (t.level = o), a && "transaction" !== t.type && (t.transaction = a)
        })(t, e), f && ((n = t).contexts = {
            trace: el(r = f),
            ...n.contexts
        }, n.sdkProcessingMetadata = {
            dynamicSamplingContext: ek(r),
            ...n.sdkProcessingMetadata
        }, (l = eg(ex(r)).description) && !n.transaction && "transaction" === n.type && (n.transaction = l)), i = t, s = d, i.fingerprint = i.fingerprint ? Array.isArray(i.fingerprint) ? i.fingerprint : [i.fingerprint] : [], s && (i.fingerprint = i.fingerprint.concat(s)), i.fingerprint.length || delete i.fingerprint, o = t, a = _, p = [...o.breadcrumbs || [], ...a], o.breadcrumbs = p.length ? p : void 0, c = t, u = h, c.sdkProcessingMetadata = { ...c.sdkProcessingMetadata,
            ...u
        }
    }

    function eP(t, e) {
        let {
            extra: n,
            tags: r,
            user: i,
            contexts: s,
            level: o,
            sdkProcessingMetadata: a,
            breadcrumbs: c,
            fingerprint: u,
            eventProcessors: l,
            attachments: p,
            propagationContext: d,
            transactionName: f,
            span: _
        } = e;
        eD(t, "extra", n), eD(t, "tags", r), eD(t, "user", i), eD(t, "contexts", s), t.sdkProcessingMetadata = th(t.sdkProcessingMetadata, a, 2), o && (t.level = o), f && (t.transactionName = f), _ && (t.span = _), c.length && (t.breadcrumbs = [...t.breadcrumbs, ...c]), u.length && (t.fingerprint = [...t.fingerprint, ...u]), l.length && (t.eventProcessors = [...t.eventProcessors, ...l]), p.length && (t.attachments = [...t.attachments, ...p]), t.propagationContext = { ...t.propagationContext,
            ...d
        }
    }

    function eD(t, e, n) {
        t[e] = th(t[e], n, 1)
    }

    function e$(t) {
        let e = u.GLOBAL_OBJ._sentryDebugIds,
            n = u.GLOBAL_OBJ._debugIds;
        if (!e && !n) return {};
        let r = e ? Object.keys(e) : [],
            c = n ? Object.keys(n) : [];
        if (a && r.length === s && c.length === o) return a;
        s = r.length, o = c.length, a = {}, i || (i = {});
        let l = (e, n) => {
            for (let r of e) {
                let e = n[r],
                    s = i ? .[r];
                if (s && a && e) a[s[0]] = e, i && (i[r] = [s[0], e]);
                else if (e) {
                    let n = t(r);
                    for (let t = n.length - 1; t >= 0; t--) {
                        let s = n[t],
                            o = s ? .filename;
                        if (o && a && i) {
                            a[o] = e, i[r] = [o, e];
                            break
                        }
                    }
                }
            }
        };
        return e && l(r, e), n && l(c, n), a
    }

    function ej(t, e) {
        let n = e$(t);
        if (!n) return [];
        let r = [];
        for (let t of e) t && n[t] && r.push({
            type: "sourcemap",
            code_file: t,
            debug_id: n[t]
        });
        return r
    }
    t.s(["freezeDscOnSpan", () => eN, "getDynamicSamplingContextFromScope", () => eR, "getDynamicSamplingContextFromSpan", () => ek, "spanToBaggageHeader", () => eL], 103317), t.s(["applyScopeDataToEvent", () => eM, "mergeScopeData", () => eP], 583019), t.s(["getDebugImagesForResources", () => ej, "getFilenameToDebugIdMap", () => e$], 394636);
    let eB = /\(error: (.*)\)/,
        eU = /captureMessage|captureException/;

    function eF(...t) {
        let e = t.sort((t, e) => t[0] - e[0]).map(t => t[1]);
        return (t, n = 0, r = 0) => {
            let i = [],
                s = t.split("\n");
            for (let t = n; t < s.length; t++) {
                let n = s[t];
                n.length > 1024 && (n = n.slice(0, 1024));
                let o = eB.test(n) ? n.replace(eB, "$1") : n;
                if (!o.match(/\S*Error: /)) {
                    for (let t of e) {
                        let e = t(o);
                        if (e) {
                            i.push(e);
                            break
                        }
                    }
                    if (i.length >= 50 + r) break
                }
            }
            var o = i.slice(r);
            if (!o.length) return [];
            let a = Array.from(o);
            return /sentryWrapped/.test(eH(a).function || "") && a.pop(), a.reverse(), eU.test(eH(a).function || "") && (a.pop(), eU.test(eH(a).function || "") && a.pop()), a.slice(0, 50).map(t => ({ ...t,
                filename: t.filename || eH(a).filename,
                function: t.function || "?"
            }))
        }
    }

    function eG(t) {
        return Array.isArray(t) ? eF(...t) : t
    }

    function eH(t) {
        return t[t.length - 1] || {}
    }
    let eJ = "<anonymous>";

    function eK(t) {
        try {
            if (!t || "function" != typeof t) return eJ;
            return t.name || eJ
        } catch {
            return eJ
        }
    }

    function eV(t) {
        let e = t.exception;
        if (e) {
            let t = [];
            try {
                return e.values.forEach(e => {
                    e.stacktrace.frames && t.push(...e.stacktrace.frames)
                }), t
            } catch {}
        }
    }

    function eY(e, n = 100, r = Infinity) {
        try {
            return function e(n, r, i = Infinity, s = Infinity, o = function() {
                let t = new WeakSet;
                return [function(e) {
                    return !!t.has(e) || (t.add(e), !1)
                }, function(e) {
                    t.delete(e)
                }]
            }()) {
                let [a, c] = o;
                if (null == r || ["boolean", "string"].includes(typeof r) || "number" == typeof r && Number.isFinite(r)) return r;
                let u = function(e, n) {
                    try {
                        var r;
                        let i;
                        if ("domain" === e && n && "object" == typeof n && n._events) return "[Domain]";
                        if ("domainEmitter" === e) return "[DomainEmitter]";
                        if (n === t.g) return "[Global]";
                        if ("u" > typeof window && n === window) return "[Window]";
                        if ("u" > typeof document && n === document) return "[Document]";
                        if (w(n)) return "[VueViewModel]";
                        if (C(n)) return "[SyntheticEvent]";
                        if ("number" == typeof n && !Number.isFinite(n)) return `[${n}]`;
                        if ("function" == typeof n) return `[Function: ${eK(n)}]`;
                        if ("symbol" == typeof n) return `[${String(n)}]`;
                        if ("bigint" == typeof n) return `[BigInt: ${String(n)}]`;
                        let s = (r = n, i = Object.getPrototypeOf(r), i ? .constructor ? i.constructor.name : "null prototype");
                        if (/^HTML(\w*)Element$/.test(s)) return `[HTMLElement: ${s}]`;
                        return `[object ${s}]`
                    } catch (t) {
                        return `**non-serializable** (${t})`
                    }
                }(n, r);
                if (!u.startsWith("[object ")) return u;
                if (r.__sentry_skip_normalization__) return r;
                let l = "number" == typeof r.__sentry_override_normalization_depth__ ? r.__sentry_override_normalization_depth__ : i;
                if (0 === l) return u.replace("object ", "");
                if (a(r)) return "[Circular ~]";
                if (r && "function" == typeof r.toJSON) try {
                    let t = r.toJSON();
                    return e("", t, l - 1, s, o)
                } catch {}
                let p = Array.isArray(r) ? [] : {},
                    d = 0,
                    f = Y(r);
                for (let t in f) {
                    if (!Object.prototype.hasOwnProperty.call(f, t)) continue;
                    if (d >= s) {
                        p[t] = "[MaxProperties ~]";
                        break
                    }
                    let n = f[t];
                    p[t] = e(t, n, l - 1, s, o), d++
                }
                return c(r), p
            }("", e, n, r)
        } catch (t) {
            return {
                ERROR: `**non-serializable** (${t})`
            }
        }
    }

    function ez(t, e, n, r, i, s) {
        var o, a, c;
        let u, {
                normalizeDepth: l = 3,
                normalizeMaxBreadth: p = 1e3
            } = t,
            d = { ...e,
                event_id: e.event_id || n.event_id || tn(),
                timestamp: e.timestamp || tu()
            },
            _ = n.integrations || t.integrations.map(t => t.name);
        (function(t, e) {
            let {
                environment: n,
                release: r,
                dist: i,
                maxValueLength: s
            } = e;
            t.environment = t.environment || n || tP, !t.release && r && (t.release = r), !t.dist && i && (t.dist = i);
            let o = t.request;
            o ? .url && (o.url = s ? X(o.url, s) : o.url)
        })(d, t), o = d, (a = _).length > 0 && (o.sdk = o.sdk || {}, o.sdk.integrations = [...o.sdk.integrations || [], ...a]), i && i.emit("applyFrameMetadata", e), void 0 === e.type && (c = d, u = e$(t.stackParser), c.exception ? .values ? .forEach(t => {
            t.stacktrace ? .frames ? .forEach(t => {
                t.filename && (t.debug_id = u[t.filename])
            })
        }));
        let h = function(t, e) {
            if (!e) return t;
            let n = t ? t.clone() : new tb;
            return n.update(e), n
        }(r, n.captureContext);
        n.mechanism && to(d, n.mechanism);
        let g = i ? i.getEventProcessors() : [],
            m = tw().getScopeData();
        s && eP(m, s.getScopeData()), h && eP(m, h.getScopeData());
        let S = [...n.attachments || [], ...m.attachments];
        return S.length && (n.attachments = S), eM(d, m), (function(t, e, n, r = 0) {
            try {
                let i = function t(e, n, r, i) {
                    let s = r[i];
                    if (!e || !s) return e;
                    let o = s({ ...e
                    }, n);
                    return (f && null === o && G.log(`Event processor "${s.id||"?"}" dropped event`), A(o)) ? o.then(e => t(e, n, r, i + 1)) : t(o, n, r, i + 1)
                }(e, n, t, r);
                return A(i) ? i : tD(i)
            } catch (t) {
                return t$(t)
            }
        })([...g, ...m.eventProcessors], d, n).then(t => (t && function(t) {
            let e = {};
            if (t.exception ? .values ? .forEach(t => {
                    t.stacktrace ? .frames ? .forEach(t => {
                        t.debug_id && (t.abs_path ? e[t.abs_path] = t.debug_id : t.filename && (e[t.filename] = t.debug_id), delete t.debug_id)
                    })
                }), 0 === Object.keys(e).length) return;
            t.debug_meta = t.debug_meta || {}, t.debug_meta.images = t.debug_meta.images || [];
            let n = t.debug_meta.images;
            Object.entries(e).forEach(([t, e]) => {
                n.push({
                    type: "sourcemap",
                    code_file: t,
                    debug_id: e
                })
            })
        }(t), "number" == typeof l && l > 0) ? function(t, e, n) {
            if (!t) return null;
            let r = { ...t,
                ...t.breadcrumbs && {
                    breadcrumbs: t.breadcrumbs.map(t => ({ ...t,
                        ...t.data && {
                            data: eY(t.data, e, n)
                        }
                    }))
                },
                ...t.user && {
                    user: eY(t.user, e, n)
                },
                ...t.contexts && {
                    contexts: eY(t.contexts, e, n)
                },
                ...t.extra && {
                    extra: eY(t.extra, e, n)
                }
            };
            return t.contexts ? .trace && r.contexts && (r.contexts.trace = t.contexts.trace, t.contexts.trace.data && (r.contexts.trace.data = eY(t.contexts.trace.data, e, n))), t.spans && (r.spans = t.spans.map(t => ({ ...t,
                ...t.data && {
                    data: eY(t.data, e, n)
                }
            }))), t.contexts ? .flags && r.contexts && (r.contexts.flags = eY(t.contexts.flags, 3, n)), r
        }(t, l, p) : t)
    }

    function eW(t) {
        if (t) {
            var e;
            return (e = t) instanceof tb || "function" == typeof e || Object.keys(t).some(t => eq.includes(t)) ? {
                captureContext: t
            } : t
        }
    }
    t.s(["UNKNOWN_FUNCTION", () => "?", "createStackParser", () => eF, "getFramesFromEvent", () => eV, "getFunctionName", () => eK, "stackParserFromStackParserOptions", () => eG], 741873), t.s(["normalize", () => eY, "normalizeToSize", () => function t(e, n = 3, r = 102400) {
        let i = eY(e, n);
        return ~-encodeURI(JSON.stringify(i)).split(/%..|./).length > r ? t(e, n - 1, r) : i
    }], 920280);
    let eq = ["user", "level", "extra", "contexts", "tags", "fingerprint", "propagationContext"];

    function eX(t, e) {
        return tC().captureException(t, eW(e))
    }

    function eQ(t, e) {
        let n = "string" == typeof e ? e : void 0,
            r = "string" != typeof e ? {
                captureContext: e
            } : void 0;
        return tC().captureMessage(t, n, r)
    }

    function eZ(t, e) {
        return tC().captureEvent(t, e)
    }

    function e0(t, e) {
        tN().setContext(t, e)
    }

    function e1(t) {
        tN().setExtras(t)
    }

    function e2(t, e) {
        tN().setExtra(t, e)
    }

    function e3(t) {
        tN().setTags(t)
    }

    function e4(t, e) {
        tN().setTag(t, e)
    }

    function e8(t) {
        tN().setUser(t)
    }

    function e6() {
        return tN().lastEventId()
    }

    function e5(t, e) {
        let n = tC(),
            r = tL();
        if (r)
            if (r.captureCheckIn) return r.captureCheckIn(t, e, n);
            else f && G.warn("Cannot capture check-in. Client does not support sending check-ins.");
        else f && G.warn("Cannot capture check-in. No client defined.");
        return tn()
    }
    async function e9(t) {
        let e = tL();
        return e ? e.flush(t) : (f && G.warn("Cannot flush events. No client defined."), Promise.resolve(!1))
    }
    async function e7(t) {
        let e = tL();
        return e ? e.close(t) : (f && G.warn("Cannot flush events and disable SDK. No client defined."), Promise.resolve(!1))
    }

    function nt() {
        return !!tL()
    }

    function ne() {
        let t = tL();
        return t ? .getOptions().enabled !== !1 && !!t ? .getTransport()
    }

    function nn(t) {
        tN().addEventProcessor(t)
    }

    function nr(t) {
        let e = tN(),
            n = tC(),
            {
                userAgent: r
            } = u.GLOBAL_OBJ.navigator || {},
            i = td({
                user: n.getUser() || e.getUser(),
                ...r && {
                    userAgent: r
                },
                ...t
            }),
            s = e.getSession();
        return s ? .status === "ok" && tf(s, {
            status: "exited"
        }), ni(), e.setSession(i), i
    }

    function ni() {
        let t = tN(),
            e = tC().getSession() || t.getSession();
        e && t_(e), ns(), t.setSession()
    }

    function ns() {
        let t = tN(),
            e = tL(),
            n = t.getSession();
        n && e && e.captureSession(n)
    }

    function no(t = !1) {
        t ? ni() : ns()
    }
    t.s(["parseEventHintOrCaptureContext", () => eW, "prepareEvent", () => ez], 501230), t.s(["addEventProcessor", () => nn, "captureCheckIn", () => e5, "captureEvent", () => eZ, "captureException", () => eX, "captureMessage", () => eQ, "captureSession", () => no, "close", () => e7, "endSession", () => ni, "flush", () => e9, "isEnabled", () => ne, "isInitialized", () => nt, "lastEventId", () => e6, "setContext", () => e0, "setExtra", () => e2, "setExtras", () => e1, "setTag", () => e4, "setTags", () => e3, "setUser", () => e8, "startSession", () => nr], 260397)
}]);

//# debugId=e743da40-b0df-8ea5-388b-461381802209
//# sourceMappingURL=c9c71944364f590a.js.map