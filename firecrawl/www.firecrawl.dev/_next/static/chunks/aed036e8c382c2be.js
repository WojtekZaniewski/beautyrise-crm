;
! function() {
    try {
        var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {},
            n = (new e.Error).stack;
        n && ((e._debugIds || (e._debugIds = {}))[n] = "6033802f-efbd-f638-556f-fd9eb7e467ef")
    } catch (e) {}
}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 530761, (e, n, t) => {
    n.exports = function() {
        for (var e = {}, n = 0; n < arguments.length; n++) {
            var t = arguments[n];
            for (var r in t) a.call(t, r) && (e[r] = t[r])
        }
        return e
    };
    var a = Object.prototype.hasOwnProperty
}, 555444, (e, n, t) => {
    "use strict";
    n.exports = r;
    var a = r.prototype;

    function r(e, n, t) {
        this.property = e, this.normal = n, t && (this.space = t)
    }
    a.space = null, a.normal = {}, a.property = {}
}, 197438, (e, n, t) => {
    "use strict";
    var a = e.r(530761),
        r = e.r(555444);
    n.exports = function(e) {
        for (var n, t, o = e.length, l = [], i = [], c = -1; ++c < o;) n = e[c], l.push(n.property), i.push(n.normal), t = n.space;
        return new r(a.apply(null, l), a.apply(null, i), t)
    }
}, 515525, (e, n, t) => {
    "use strict";
    n.exports = function(e) {
        return e.toLowerCase()
    }
}, 314575, (e, n, t) => {
    "use strict";
    n.exports = r;
    var a = r.prototype;

    function r(e, n) {
        this.property = e, this.attribute = n
    }
    a.space = null, a.attribute = null, a.property = null, a.boolean = !1, a.booleanish = !1, a.overloadedBoolean = !1, a.number = !1, a.commaSeparated = !1, a.spaceSeparated = !1, a.commaOrSpaceSeparated = !1, a.mustUseProperty = !1, a.defined = !1
}, 617317, (e, n, t) => {
    "use strict";
    var a = 0;

    function r() {
        return Math.pow(2, ++a)
    }
    t.boolean = r(), t.booleanish = r(), t.overloadedBoolean = r(), t.number = r(), t.spaceSeparated = r(), t.commaSeparated = r(), t.commaOrSpaceSeparated = r()
}, 370773, (e, n, t) => {
    "use strict";
    var a = e.r(314575),
        r = e.r(617317);
    n.exports = i, i.prototype = new a, i.prototype.defined = !0;
    var o = ["boolean", "booleanish", "overloadedBoolean", "number", "commaSeparated", "spaceSeparated", "commaOrSpaceSeparated"],
        l = o.length;

    function i(e, n, t, i) {
        var c, s, u, p, g, d, f = -1;
        for (c = this, (s = i) && (c.space = s), a.call(this, e, n); ++f < l;) {
            u = this, p = d = o[f], (g = (t & r[d]) === r[d]) && (u[p] = g)
        }
    }
}, 496936, (e, n, t) => {
    "use strict";
    var a = e.r(515525),
        r = e.r(555444),
        o = e.r(370773);
    n.exports = function(e) {
        var n, t, l = e.space,
            i = e.mustUseProperty || [],
            c = e.attributes || {},
            s = e.properties,
            u = e.transform,
            p = {},
            g = {};
        for (n in s) t = new o(n, u(c, n), s[n], l), -1 !== i.indexOf(n) && (t.mustUseProperty = !0), p[n] = t, g[a(n)] = n, g[a(t.attribute)] = n;
        return new r(p, g, l)
    }
}, 86799, (e, n, t) => {
    "use strict";
    n.exports = e.r(496936)({
        space: "xlink",
        transform: function(e, n) {
            return "xlink:" + n.slice(5).toLowerCase()
        },
        properties: {
            xLinkActuate: null,
            xLinkArcRole: null,
            xLinkHref: null,
            xLinkRole: null,
            xLinkShow: null,
            xLinkTitle: null,
            xLinkType: null
        }
    })
}, 653936, (e, n, t) => {
    "use strict";
    n.exports = e.r(496936)({
        space: "xml",
        transform: function(e, n) {
            return "xml:" + n.slice(3).toLowerCase()
        },
        properties: {
            xmlLang: null,
            xmlBase: null,
            xmlSpace: null
        }
    })
}, 591849, (e, n, t) => {
    "use strict";
    n.exports = function(e, n) {
        return n in e ? e[n] : n
    }
}, 77465, (e, n, t) => {
    "use strict";
    var a = e.r(591849);
    n.exports = function(e, n) {
        return a(e, n.toLowerCase())
    }
}, 346236, (e, n, t) => {
    "use strict";
    n.exports = e.r(496936)({
        space: "xmlns",
        attributes: {
            xmlnsxlink: "xmlns:xlink"
        },
        transform: e.r(77465),
        properties: {
            xmlns: null,
            xmlnsXLink: null
        }
    })
}, 145031, (e, n, t) => {
    "use strict";
    var a = e.r(617317),
        r = e.r(496936),
        o = a.booleanish,
        l = a.number,
        i = a.spaceSeparated;
    n.exports = r({
        transform: function(e, n) {
            return "role" === n ? n : "aria-" + n.slice(4).toLowerCase()
        },
        properties: {
            ariaActiveDescendant: null,
            ariaAtomic: o,
            ariaAutoComplete: null,
            ariaBusy: o,
            ariaChecked: o,
            ariaColCount: l,
            ariaColIndex: l,
            ariaColSpan: l,
            ariaControls: i,
            ariaCurrent: null,
            ariaDescribedBy: i,
            ariaDetails: null,
            ariaDisabled: o,
            ariaDropEffect: i,
            ariaErrorMessage: null,
            ariaExpanded: o,
            ariaFlowTo: i,
            ariaGrabbed: o,
            ariaHasPopup: null,
            ariaHidden: o,
            ariaInvalid: null,
            ariaKeyShortcuts: null,
            ariaLabel: null,
            ariaLabelledBy: i,
            ariaLevel: l,
            ariaLive: null,
            ariaModal: o,
            ariaMultiLine: o,
            ariaMultiSelectable: o,
            ariaOrientation: null,
            ariaOwns: i,
            ariaPlaceholder: null,
            ariaPosInSet: l,
            ariaPressed: o,
            ariaReadOnly: o,
            ariaRelevant: null,
            ariaRequired: o,
            ariaRoleDescription: i,
            ariaRowCount: l,
            ariaRowIndex: l,
            ariaRowSpan: l,
            ariaSelected: o,
            ariaSetSize: l,
            ariaSort: null,
            ariaValueMax: l,
            ariaValueMin: l,
            ariaValueNow: l,
            ariaValueText: null,
            role: null
        }
    })
}, 320806, (e, n, t) => {
    "use strict";
    var a = e.r(617317),
        r = e.r(496936),
        o = e.r(77465),
        l = a.boolean,
        i = a.overloadedBoolean,
        c = a.booleanish,
        s = a.number,
        u = a.spaceSeparated,
        p = a.commaSeparated;
    n.exports = r({
        space: "html",
        attributes: {
            acceptcharset: "accept-charset",
            classname: "class",
            htmlfor: "for",
            httpequiv: "http-equiv"
        },
        transform: o,
        mustUseProperty: ["checked", "multiple", "muted", "selected"],
        properties: {
            abbr: null,
            accept: p,
            acceptCharset: u,
            accessKey: u,
            action: null,
            allow: null,
            allowFullScreen: l,
            allowPaymentRequest: l,
            allowUserMedia: l,
            alt: null,
            as: null,
            async: l,
            autoCapitalize: null,
            autoComplete: u,
            autoFocus: l,
            autoPlay: l,
            capture: l,
            charSet: null,
            checked: l,
            cite: null,
            className: u,
            cols: s,
            colSpan: null,
            content: null,
            contentEditable: c,
            controls: l,
            controlsList: u,
            coords: s | p,
            crossOrigin: null,
            data: null,
            dateTime: null,
            decoding: null,
            default: l,
            defer: l,
            dir: null,
            dirName: null,
            disabled: l,
            download: i,
            draggable: c,
            encType: null,
            enterKeyHint: null,
            form: null,
            formAction: null,
            formEncType: null,
            formMethod: null,
            formNoValidate: l,
            formTarget: null,
            headers: u,
            height: s,
            hidden: l,
            high: s,
            href: null,
            hrefLang: null,
            htmlFor: u,
            httpEquiv: u,
            id: null,
            imageSizes: null,
            imageSrcSet: p,
            inputMode: null,
            integrity: null,
            is: null,
            isMap: l,
            itemId: null,
            itemProp: u,
            itemRef: u,
            itemScope: l,
            itemType: u,
            kind: null,
            label: null,
            lang: null,
            language: null,
            list: null,
            loading: null,
            loop: l,
            low: s,
            manifest: null,
            max: null,
            maxLength: s,
            media: null,
            method: null,
            min: null,
            minLength: s,
            multiple: l,
            muted: l,
            name: null,
            nonce: null,
            noModule: l,
            noValidate: l,
            onAbort: null,
            onAfterPrint: null,
            onAuxClick: null,
            onBeforePrint: null,
            onBeforeUnload: null,
            onBlur: null,
            onCancel: null,
            onCanPlay: null,
            onCanPlayThrough: null,
            onChange: null,
            onClick: null,
            onClose: null,
            onContextMenu: null,
            onCopy: null,
            onCueChange: null,
            onCut: null,
            onDblClick: null,
            onDrag: null,
            onDragEnd: null,
            onDragEnter: null,
            onDragExit: null,
            onDragLeave: null,
            onDragOver: null,
            onDragStart: null,
            onDrop: null,
            onDurationChange: null,
            onEmptied: null,
            onEnded: null,
            onError: null,
            onFocus: null,
            onFormData: null,
            onHashChange: null,
            onInput: null,
            onInvalid: null,
            onKeyDown: null,
            onKeyPress: null,
            onKeyUp: null,
            onLanguageChange: null,
            onLoad: null,
            onLoadedData: null,
            onLoadedMetadata: null,
            onLoadEnd: null,
            onLoadStart: null,
            onMessage: null,
            onMessageError: null,
            onMouseDown: null,
            onMouseEnter: null,
            onMouseLeave: null,
            onMouseMove: null,
            onMouseOut: null,
            onMouseOver: null,
            onMouseUp: null,
            onOffline: null,
            onOnline: null,
            onPageHide: null,
            onPageShow: null,
            onPaste: null,
            onPause: null,
            onPlay: null,
            onPlaying: null,
            onPopState: null,
            onProgress: null,
            onRateChange: null,
            onRejectionHandled: null,
            onReset: null,
            onResize: null,
            onScroll: null,
            onSecurityPolicyViolation: null,
            onSeeked: null,
            onSeeking: null,
            onSelect: null,
            onSlotChange: null,
            onStalled: null,
            onStorage: null,
            onSubmit: null,
            onSuspend: null,
            onTimeUpdate: null,
            onToggle: null,
            onUnhandledRejection: null,
            onUnload: null,
            onVolumeChange: null,
            onWaiting: null,
            onWheel: null,
            open: l,
            optimum: s,
            pattern: null,
            ping: u,
            placeholder: null,
            playsInline: l,
            poster: null,
            preload: null,
            readOnly: l,
            referrerPolicy: null,
            rel: u,
            required: l,
            reversed: l,
            rows: s,
            rowSpan: s,
            sandbox: u,
            scope: null,
            scoped: l,
            seamless: l,
            selected: l,
            shape: null,
            size: s,
            sizes: null,
            slot: null,
            span: s,
            spellCheck: c,
            src: null,
            srcDoc: null,
            srcLang: null,
            srcSet: p,
            start: s,
            step: null,
            style: null,
            tabIndex: s,
            target: null,
            title: null,
            translate: null,
            type: null,
            typeMustMatch: l,
            useMap: null,
            value: c,
            width: s,
            wrap: null,
            align: null,
            aLink: null,
            archive: u,
            axis: null,
            background: null,
            bgColor: null,
            border: s,
            borderColor: null,
            bottomMargin: s,
            cellPadding: null,
            cellSpacing: null,
            char: null,
            charOff: null,
            classId: null,
            clear: null,
            code: null,
            codeBase: null,
            codeType: null,
            color: null,
            compact: l,
            declare: l,
            event: null,
            face: null,
            frame: null,
            frameBorder: null,
            hSpace: s,
            leftMargin: s,
            link: null,
            longDesc: null,
            lowSrc: null,
            marginHeight: s,
            marginWidth: s,
            noResize: l,
            noHref: l,
            noShade: l,
            noWrap: l,
            object: null,
            profile: null,
            prompt: null,
            rev: null,
            rightMargin: s,
            rules: null,
            scheme: null,
            scrolling: c,
            standby: null,
            summary: null,
            text: null,
            topMargin: s,
            valueType: null,
            version: null,
            vAlign: null,
            vLink: null,
            vSpace: s,
            allowTransparency: null,
            autoCorrect: null,
            autoSave: null,
            disablePictureInPicture: l,
            disableRemotePlayback: l,
            prefix: null,
            property: null,
            results: s,
            security: null,
            unselectable: null
        }
    })
}, 512130, (e, n, t) => {
    "use strict";
    var a = e.r(197438),
        r = e.r(86799);
    n.exports = a([e.r(653936), r, e.r(346236), e.r(145031), e.r(320806)])
}, 303204, (e, n, t) => {
    "use strict";
    var a = e.r(515525),
        r = e.r(370773),
        o = e.r(314575),
        l = "data";
    n.exports = function(e, n) {
        var t, g, d, f = a(n),
            m = n,
            h = o;
        return f in e.normal ? e.property[e.normal[f]] : (f.length > 4 && f.slice(0, 4) === l && i.test(n) && ("-" === n.charAt(4) ? m = l + (t = n.slice(5).replace(c, p)).charAt(0).toUpperCase() + t.slice(1) : (d = (g = n).slice(4), n = c.test(d) ? g : ("-" !== (d = d.replace(s, u)).charAt(0) && (d = "-" + d), l + d)), h = r), new h(m, n))
    };
    var i = /^data[-\w.:]+$/i,
        c = /-[a-z]/g,
        s = /[A-Z]/g;

    function u(e) {
        return "-" + e.toLowerCase()
    }

    function p(e) {
        return e.charAt(1).toUpperCase()
    }
}, 66760, (e, n, t) => {
    "use strict";
    n.exports = function(e, n) {
        for (var t, r, o, l = e || "", i = n || "div", c = {}, s = 0; s < l.length;) a.lastIndex = s, o = a.exec(l), (t = l.slice(s, o ? o.index : l.length)) && (r ? "#" === r ? c.id = t : c.className ? c.className.push(t) : c.className = [t] : i = t, s += t.length), o && (r = o[0], s++);
        return {
            type: "element",
            tagName: i,
            properties: c,
            children: []
        }
    };
    var a = /[#.]/g
}, 887411, (e, n, t) => {
    "use strict";
    t.parse = function(e) {
        var n = String(e || "").trim();
        return "" === n ? [] : n.split(a)
    }, t.stringify = function(e) {
        return e.join(" ").trim()
    };
    var a = /[ \t\n\r\f]+/g
}, 835773, (e, n, t) => {
    "use strict";
    t.parse = function(e) {
        for (var n, t = [], a = String(e || ""), r = a.indexOf(","), o = 0, l = !1; !l;) - 1 === r && (r = a.length, l = !0), ((n = a.slice(o, r).trim()) || !l) && t.push(n), o = r + 1, r = a.indexOf(",", o);
        return t
    }, t.stringify = function(e, n) {
        var t = n || {},
            a = !1 === t.padLeft ? "" : " ",
            r = t.padRight ? " " : "";
        return "" === e[e.length - 1] && (e = e.concat("")), e.join(r + "," + a).trim()
    }
}, 65677, (e, n, t) => {
    "use strict";
    var a = e.r(303204),
        r = e.r(515525),
        o = e.r(66760),
        l = e.r(887411).parse,
        i = e.r(835773).parse;
    n.exports = function(e, n, t) {
        var r = t ? function(e) {
            for (var n, t = e.length, a = -1, r = {}; ++a < t;) r[(n = e[a]).toLowerCase()] = n;
            return r
        }(t) : null;
        return function(t, u) {
            var p, g, d, f, m, h, y = o(t, n),
                v = Array.prototype.slice.call(arguments, 2),
                b = y.tagName.toLowerCase();
            if (y.tagName = r && c.call(r, b) ? r[b] : b, u && (p = u, g = y, "string" == typeof p || "length" in p || (d = g.tagName, m = (f = p).type, "input" !== d && m && "string" == typeof m && ("object" == typeof f.children && "length" in f.children || ((m = m.toLowerCase(), "button" === d) ? "menu" !== m && "submit" !== m && "reset" !== m && "button" !== m : "value" in f)))) && (v.unshift(u), u = null), u)
                for (h in u) ! function(n, t, r) {
                    var o, c, u;
                    null != r && r == r && (c = (o = a(e, t)).property, "string" == typeof(u = r) && (o.spaceSeparated ? u = l(u) : o.commaSeparated ? u = i(u) : o.commaOrSpaceSeparated && (u = l(i(u).join(" ")))), "style" === c && "string" != typeof r && (u = function(e) {
                        var n, t = [];
                        for (n in e) t.push([n, e[n]].join(": "));
                        return t.join("; ")
                    }(u)), "className" === c && n.className && (u = n.className.concat(u)), n[c] = function(e, n, t) {
                        var a, r, o;
                        if ("object" != typeof t || !("length" in t)) return s(e, n, t);
                        for (r = t.length, a = -1, o = []; ++a < r;) o[a] = s(e, n, t[a]);
                        return o
                    }(o, c, u))
                }(y.properties, h, u[h]);
            return function e(n, t) {
                var a, r;
                if ("string" == typeof t || "number" == typeof t) return void n.push({
                    type: "text",
                    value: String(t)
                });
                if ("object" == typeof t && "length" in t) {
                    for (a = -1, r = t.length; ++a < r;) e(n, t[a]);
                    return
                }
                if ("object" != typeof t || !("type" in t)) throw Error("Expected node, nodes, or string, got `" + t + "`");
                n.push(t)
            }(y.children, v), "template" === y.tagName && (y.content = {
                type: "root",
                children: y.children
            }, y.children = []), y
        }
    };
    var c = {}.hasOwnProperty;

    function s(e, n, t) {
        var a = t;
        return e.number || e.positiveNumber ? isNaN(a) || "" === a || (a = Number(a)) : (e.boolean || e.overloadedBoolean) && "string" == typeof a && ("" === a || r(t) === r(n)) && (a = !0), a
    }
}, 853863, (e, n, t) => {
    "use strict";
    var a = e.r(512130),
        r = e.r(65677)(a, "div");
    r.displayName = "html", n.exports = r
}, 850885, (e, n, t) => {
    "use strict";
    n.exports = e.r(853863)
}, 823840, (e, n, t) => {
    "use strict";
    n.exports = function(e) {
        var n = "string" == typeof e ? e.charCodeAt(0) : e;
        return n >= 48 && n <= 57
    }
}, 344085, (e, n, t) => {
    "use strict";
    n.exports = function(e) {
        var n = "string" == typeof e ? e.charCodeAt(0) : e;
        return n >= 97 && n <= 102 || n >= 65 && n <= 70 || n >= 48 && n <= 57
    }
}, 136747, (e, n, t) => {
    "use strict";
    n.exports = function(e) {
        var n = "string" == typeof e ? e.charCodeAt(0) : e;
        return n >= 97 && n <= 122 || n >= 65 && n <= 90
    }
}, 631273, (e, n, t) => {
    "use strict";
    var a = e.r(136747),
        r = e.r(823840);
    n.exports = function(e) {
        return a(e) || r(e)
    }
}, 963965, (e, n, t) => {
    "use strict";
    var a;
    n.exports = function(e) {
        var n, t = "&" + e + ";";
        return (a = a || document.createElement("i")).innerHTML = t, (59 !== (n = a.textContent).charCodeAt(n.length - 1) || "semi" === e) && n !== t && n
    }
}, 495802, (e, n, t) => {
    "use strict";
    var a = e.r(740496),
        r = e.r(127707),
        o = e.r(823840),
        l = e.r(344085),
        i = e.r(631273),
        c = e.r(963965);
    n.exports = function(e, n) {
        var t, o, l = {};
        for (o in n || (n = {}), g) t = n[o], l[o] = null == t ? g[o] : t;
        return (l.position.indent || l.position.start) && (l.indent = l.position.indent || [], l.position = l.position.start),
            function(e, n) {
                var t, o, l, g, b, x, w, k, S, A, F, N, j, O, C, L, P, E, $, T, D, M = n.additional,
                    I = n.nonTerminated,
                    _ = n.text,
                    R = n.reference,
                    z = n.warning,
                    B = n.textContext,
                    U = n.referenceContext,
                    H = n.warningContext,
                    W = n.position,
                    q = n.indent || [],
                    Z = e.length,
                    V = 0,
                    G = -1,
                    K = W.column || 1,
                    J = W.line || 1,
                    X = "",
                    Y = [];
                for ("string" == typeof M && (M = M.charCodeAt(0)), E = Q(), A = z ? function(e, n) {
                        var t = Q();
                        t.column += n, t.offset += n, z.call(H, v[e], t, e)
                    } : p, V--, Z++; ++V < Z;)
                    if (10 === w && (K = q[G] || 1), 38 === (w = e.charCodeAt(V))) {
                        if (9 === (S = e.charCodeAt(V + 1)) || 10 === S || 12 === S || 32 === S || 38 === S || 60 === S || S != S || M && S === M) {
                            X += u(w), K++;
                            continue
                        }
                        for (O = C = V + 1, D = C, 35 === S ? (D = ++O, 88 === (S = e.charCodeAt(D)) || 120 === S ? (L = f, D = ++O) : L = m) : L = d, l = "", j = "", x = "", P = y[L], D--; ++D < Z && P(S = e.charCodeAt(D));) x += u(S), L === d && s.call(a, x) && (l = x, j = a[x]);
                        if ((b = 59 === e.charCodeAt(D)) && (D++, (g = L === d && c(x)) && (l = x, j = g)), T = 1 + D - C, b || I) {
                            x ? L === d ? (b && !j ? A(5, 1) : (l !== x && (T = 1 + (D = O + l.length) - O, b = !1), b || (F = l ? 1 : 3, n.attribute ? 61 === (S = e.charCodeAt(D)) ? (A(F, T), j = null) : i(S) ? j = null : A(F, T) : A(F, T))), k = j) : (b || A(2, T), (t = k = parseInt(x, h[L])) >= 55296 && t <= 57343 || t > 1114111 ? (A(7, T), k = u(65533)) : k in r ? (A(6, T), k = r[k]) : (N = "", ((o = k) >= 1 && o <= 8 || 11 === o || o >= 13 && o <= 31 || o >= 127 && o <= 159 || o >= 64976 && o <= 65007 || (65535 & o) == 65535 || (65535 & o) == 65534) && A(6, T), k > 65535 && (k -= 65536, N += u(k >>> 10 | 55296), k = 56320 | 1023 & k), k = N + u(k))) : L !== d && A(4, T)
                        }
                        k ? (ee(), E = Q(), V = D - 1, K += D - C + 1, Y.push(k), $ = Q(), $.offset++, R && R.call(U, k, {
                            start: E,
                            end: $
                        }, e.slice(C - 1, D)), E = $) : (x = e.slice(C - 1, D), X += x, K += x.length, V = D - 1)
                    } else 10 === w && (J++, G++, K = 0), w == w ? (X += u(w), K++) : ee();
                return Y.join("");

                function Q() {
                    return {
                        line: J,
                        column: K,
                        offset: V + (W.offset || 0)
                    }
                }

                function ee() {
                    X && (Y.push(X), _ && _.call(B, X, {
                        start: E,
                        end: Q()
                    }), X = "")
                }
            }(e, l)
    };
    var s = {}.hasOwnProperty,
        u = String.fromCharCode,
        p = Function.prototype,
        g = {
            warning: null,
            reference: null,
            text: null,
            warningContext: null,
            referenceContext: null,
            textContext: null,
            position: {},
            additional: null,
            attribute: !1,
            nonTerminated: !0
        },
        d = "named",
        f = "hexadecimal",
        m = "decimal",
        h = {};
    h[f] = 16, h[m] = 10;
    var y = {};
    y[d] = i, y[m] = o, y[f] = l;
    var v = {};
    v[1] = "Named character references must be terminated by a semicolon", v[2] = "Numeric character references must be terminated by a semicolon", v[3] = "Named character references cannot be empty", v[4] = "Numeric character references cannot be empty", v[5] = "Named character references must be known", v[6] = "Numeric character references cannot be disallowed", v[7] = "Numeric character references cannot be outside the permissible Unicode range"
}, 308894, (e, n, t) => {
    var a = function(e) {
        var n = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,
            t = 0,
            a = {},
            r = {
                manual: e.Prism && e.Prism.manual,
                disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler,
                util: {
                    encode: function e(n) {
                        return n instanceof o ? new o(n.type, e(n.content), n.alias) : Array.isArray(n) ? n.map(e) : n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                    },
                    type: function(e) {
                        return Object.prototype.toString.call(e).slice(8, -1)
                    },
                    objId: function(e) {
                        return e.__id || Object.defineProperty(e, "__id", {
                            value: ++t
                        }), e.__id
                    },
                    clone: function e(n, t) {
                        var a, o;
                        switch (t = t || {}, r.util.type(n)) {
                            case "Object":
                                if (t[o = r.util.objId(n)]) return t[o];
                                for (var l in a = {}, t[o] = a, n) n.hasOwnProperty(l) && (a[l] = e(n[l], t));
                                return a;
                            case "Array":
                                if (t[o = r.util.objId(n)]) return t[o];
                                return a = [], t[o] = a, n.forEach(function(n, r) {
                                    a[r] = e(n, t)
                                }), a;
                            default:
                                return n
                        }
                    },
                    getLanguage: function(e) {
                        for (; e;) {
                            var t = n.exec(e.className);
                            if (t) return t[1].toLowerCase();
                            e = e.parentElement
                        }
                        return "none"
                    },
                    setLanguage: function(e, t) {
                        e.className = e.className.replace(RegExp(n, "gi"), ""), e.classList.add("language-" + t)
                    },
                    currentScript: function() {
                        if ("u" < typeof document) return null;
                        if ("currentScript" in document) return document.currentScript;
                        try {
                            throw Error()
                        } catch (a) {
                            var e = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(a.stack) || [])[1];
                            if (e) {
                                var n = document.getElementsByTagName("script");
                                for (var t in n)
                                    if (n[t].src == e) return n[t]
                            }
                            return null
                        }
                    },
                    isActive: function(e, n, t) {
                        for (var a = "no-" + n; e;) {
                            var r = e.classList;
                            if (r.contains(n)) return !0;
                            if (r.contains(a)) return !1;
                            e = e.parentElement
                        }
                        return !!t
                    }
                },
                languages: {
                    plain: a,
                    plaintext: a,
                    text: a,
                    txt: a,
                    extend: function(e, n) {
                        var t = r.util.clone(r.languages[e]);
                        for (var a in n) t[a] = n[a];
                        return t
                    },
                    insertBefore: function(e, n, t, a) {
                        var o = (a = a || r.languages)[e],
                            l = {};
                        for (var i in o)
                            if (o.hasOwnProperty(i)) {
                                if (i == n)
                                    for (var c in t) t.hasOwnProperty(c) && (l[c] = t[c]);
                                t.hasOwnProperty(i) || (l[i] = o[i])
                            }
                        var s = a[e];
                        return a[e] = l, r.languages.DFS(r.languages, function(n, t) {
                            t === s && n != e && (this[n] = l)
                        }), l
                    },
                    DFS: function e(n, t, a, o) {
                        o = o || {};
                        var l = r.util.objId;
                        for (var i in n)
                            if (n.hasOwnProperty(i)) {
                                t.call(n, i, n[i], a || i);
                                var c = n[i],
                                    s = r.util.type(c);
                                "Object" !== s || o[l(c)] ? "Array" !== s || o[l(c)] || (o[l(c)] = !0, e(c, t, i, o)) : (o[l(c)] = !0, e(c, t, null, o))
                            }
                    }
                },
                plugins: {},
                highlightAll: function(e, n) {
                    r.highlightAllUnder(document, e, n)
                },
                highlightAllUnder: function(e, n, t) {
                    var a = {
                        callback: t,
                        container: e,
                        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                    };
                    r.hooks.run("before-highlightall", a), a.elements = Array.prototype.slice.apply(a.container.querySelectorAll(a.selector)), r.hooks.run("before-all-elements-highlight", a);
                    for (var o, l = 0; o = a.elements[l++];) r.highlightElement(o, !0 === n, a.callback)
                },
                highlightElement: function(n, t, a) {
                    var o = r.util.getLanguage(n),
                        l = r.languages[o];
                    r.util.setLanguage(n, o);
                    var i = n.parentElement;
                    i && "pre" === i.nodeName.toLowerCase() && r.util.setLanguage(i, o);
                    var c = n.textContent,
                        s = {
                            element: n,
                            language: o,
                            grammar: l,
                            code: c
                        };

                    function u(e) {
                        s.highlightedCode = e, r.hooks.run("before-insert", s), s.element.innerHTML = s.highlightedCode, r.hooks.run("after-highlight", s), r.hooks.run("complete", s), a && a.call(s.element)
                    }
                    if (r.hooks.run("before-sanity-check", s), (i = s.element.parentElement) && "pre" === i.nodeName.toLowerCase() && !i.hasAttribute("tabindex") && i.setAttribute("tabindex", "0"), !s.code) {
                        r.hooks.run("complete", s), a && a.call(s.element);
                        return
                    }
                    if (r.hooks.run("before-highlight", s), !s.grammar) return void u(r.util.encode(s.code));
                    if (t && e.Worker) {
                        var p = new Worker(r.filename);
                        p.onmessage = function(e) {
                            u(e.data)
                        }, p.postMessage(JSON.stringify({
                            language: s.language,
                            code: s.code,
                            immediateClose: !0
                        }))
                    } else u(r.highlight(s.code, s.grammar, s.language))
                },
                highlight: function(e, n, t) {
                    var a = {
                        code: e,
                        grammar: n,
                        language: t
                    };
                    if (r.hooks.run("before-tokenize", a), !a.grammar) throw Error('The language "' + a.language + '" has no grammar.');
                    return a.tokens = r.tokenize(a.code, a.grammar), r.hooks.run("after-tokenize", a), o.stringify(r.util.encode(a.tokens), a.language)
                },
                tokenize: function(e, n) {
                    var t = n.rest;
                    if (t) {
                        for (var a in t) n[a] = t[a];
                        delete n.rest
                    }
                    var s = new i;
                    return c(s, s.head, e),
                        function e(n, t, a, i, s, u) {
                            for (var p in a)
                                if (a.hasOwnProperty(p) && a[p]) {
                                    var g = a[p];
                                    g = Array.isArray(g) ? g : [g];
                                    for (var d = 0; d < g.length; ++d) {
                                        if (u && u.cause == p + "," + d) return;
                                        var f = g[d],
                                            m = f.inside,
                                            h = !!f.lookbehind,
                                            y = !!f.greedy,
                                            v = f.alias;
                                        if (y && !f.pattern.global) {
                                            var b = f.pattern.toString().match(/[imsuy]*$/)[0];
                                            f.pattern = RegExp(f.pattern.source, b + "g")
                                        }
                                        for (var x = f.pattern || f, w = i.next, k = s; w !== t.tail && (!u || !(k >= u.reach)); k += w.value.length, w = w.next) {
                                            var S, A = w.value;
                                            if (t.length > n.length) return;
                                            if (!(A instanceof o)) {
                                                var F = 1;
                                                if (y) {
                                                    if (!(S = l(x, k, n, h)) || S.index >= n.length) break;
                                                    var N = S.index,
                                                        j = S.index + S[0].length,
                                                        O = k;
                                                    for (O += w.value.length; N >= O;) O += (w = w.next).value.length;
                                                    if (O -= w.value.length, k = O, w.value instanceof o) continue;
                                                    for (var C = w; C !== t.tail && (O < j || "string" == typeof C.value); C = C.next) F++, O += C.value.length;
                                                    F--, A = n.slice(k, O), S.index -= k
                                                } else if (!(S = l(x, 0, A, h))) continue;
                                                var N = S.index,
                                                    L = S[0],
                                                    P = A.slice(0, N),
                                                    E = A.slice(N + L.length),
                                                    $ = k + A.length;
                                                u && $ > u.reach && (u.reach = $);
                                                var T = w.prev;
                                                if (P && (T = c(t, T, P), k += P.length), function(e, n, t) {
                                                        for (var a = n.next, r = 0; r < t && a !== e.tail; r++) a = a.next;
                                                        n.next = a, a.prev = n, e.length -= r
                                                    }(t, T, F), w = c(t, T, new o(p, m ? r.tokenize(L, m) : L, v, L)), E && c(t, w, E), F > 1) {
                                                    var D = {
                                                        cause: p + "," + d,
                                                        reach: $
                                                    };
                                                    e(n, t, a, w.prev, k, D), u && D.reach > u.reach && (u.reach = D.reach)
                                                }
                                            }
                                        }
                                    }
                                }
                        }(e, s, n, s.head, 0),
                        function(e) {
                            for (var n = [], t = e.head.next; t !== e.tail;) n.push(t.value), t = t.next;
                            return n
                        }(s)
                },
                hooks: {
                    all: {},
                    add: function(e, n) {
                        var t = r.hooks.all;
                        t[e] = t[e] || [], t[e].push(n)
                    },
                    run: function(e, n) {
                        var t = r.hooks.all[e];
                        if (t && t.length)
                            for (var a, o = 0; a = t[o++];) a(n)
                    }
                },
                Token: o
            };

        function o(e, n, t, a) {
            this.type = e, this.content = n, this.alias = t, this.length = 0 | (a || "").length
        }

        function l(e, n, t, a) {
            e.lastIndex = n;
            var r = e.exec(t);
            if (r && a && r[1]) {
                var o = r[1].length;
                r.index += o, r[0] = r[0].slice(o)
            }
            return r
        }

        function i() {
            var e = {
                    value: null,
                    prev: null,
                    next: null
                },
                n = {
                    value: null,
                    prev: e,
                    next: null
                };
            e.next = n, this.head = e, this.tail = n, this.length = 0
        }

        function c(e, n, t) {
            var a = n.next,
                r = {
                    value: t,
                    prev: n,
                    next: a
                };
            return n.next = r, a.prev = r, e.length++, r
        }
        if (e.Prism = r, o.stringify = function e(n, t) {
                if ("string" == typeof n) return n;
                if (Array.isArray(n)) {
                    var a = "";
                    return n.forEach(function(n) {
                        a += e(n, t)
                    }), a
                }
                var o = {
                        type: n.type,
                        content: e(n.content, t),
                        tag: "span",
                        classes: ["token", n.type],
                        attributes: {},
                        language: t
                    },
                    l = n.alias;
                l && (Array.isArray(l) ? Array.prototype.push.apply(o.classes, l) : o.classes.push(l)), r.hooks.run("wrap", o);
                var i = "";
                for (var c in o.attributes) i += " " + c + '="' + (o.attributes[c] || "").replace(/"/g, "&quot;") + '"';
                return "<" + o.tag + ' class="' + o.classes.join(" ") + '"' + i + ">" + o.content + "</" + o.tag + ">"
            }, !e.document) return e.addEventListener && (r.disableWorkerMessageHandler || e.addEventListener("message", function(n) {
            var t = JSON.parse(n.data),
                a = t.language,
                o = t.code,
                l = t.immediateClose;
            e.postMessage(r.highlight(o, r.languages[a], a)), l && e.close()
        }, !1)), r;
        var s = r.util.currentScript();

        function u() {
            r.manual || r.highlightAll()
        }
        if (s && (r.filename = s.src, s.hasAttribute("data-manual") && (r.manual = !0)), !r.manual) {
            var p = document.readyState;
            "loading" === p || "interactive" === p && s && s.defer ? document.addEventListener("DOMContentLoaded", u) : window.requestAnimationFrame ? window.requestAnimationFrame(u) : window.setTimeout(u, 16)
        }
        return r
    }("u" > typeof window ? window : "u" > typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {});
    n.exports && (n.exports = a), e.g.Prism = a
}, 534504, (e, n, t) => {
    "use strict";

    function a(e) {
        e.languages.markup = {
            comment: {
                pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
                greedy: !0
            },
            prolog: {
                pattern: /<\?[\s\S]+?\?>/,
                greedy: !0
            },
            doctype: {
                pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
                greedy: !0,
                inside: {
                    "internal-subset": {
                        pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
                        lookbehind: !0,
                        greedy: !0,
                        inside: null
                    },
                    string: {
                        pattern: /"[^"]*"|'[^']*'/,
                        greedy: !0
                    },
                    punctuation: /^<!|>$|[[\]]/,
                    "doctype-tag": /^DOCTYPE/i,
                    name: /[^\s<>'"]+/
                }
            },
            cdata: {
                pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                greedy: !0
            },
            tag: {
                pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
                greedy: !0,
                inside: {
                    tag: {
                        pattern: /^<\/?[^\s>\/]+/,
                        inside: {
                            punctuation: /^<\/?/,
                            namespace: /^[^\s>\/:]+:/
                        }
                    },
                    "special-attr": [],
                    "attr-value": {
                        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                        inside: {
                            punctuation: [{
                                pattern: /^=/,
                                alias: "attr-equals"
                            }, /"|'/]
                        }
                    },
                    punctuation: /\/?>/,
                    "attr-name": {
                        pattern: /[^\s>\/]+/,
                        inside: {
                            namespace: /^[^\s>\/:]+:/
                        }
                    }
                }
            },
            entity: [{
                pattern: /&[\da-z]{1,8};/i,
                alias: "named-entity"
            }, /&#x?[\da-f]{1,8};/i]
        }, e.languages.markup.tag.inside["attr-value"].inside.entity = e.languages.markup.entity, e.languages.markup.doctype.inside["internal-subset"].inside = e.languages.markup, e.hooks.add("wrap", function(e) {
            "entity" === e.type && (e.attributes.title = e.content.value.replace(/&amp;/, "&"))
        }), Object.defineProperty(e.languages.markup.tag, "addInlined", {
            value: function(n, t) {
                var a = {};
                a["language-" + t] = {
                    pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
                    lookbehind: !0,
                    inside: e.languages[t]
                }, a.cdata = /^<!\[CDATA\[|\]\]>$/i;
                var r = {
                    "included-cdata": {
                        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                        inside: a
                    }
                };
                r["language-" + t] = {
                    pattern: /[\s\S]+/,
                    inside: e.languages[t]
                };
                var o = {};
                o[n] = {
                    pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
                        return n
                    }), "i"),
                    lookbehind: !0,
                    greedy: !0,
                    inside: r
                }, e.languages.insertBefore("markup", "cdata", o)
            }
        }), Object.defineProperty(e.languages.markup.tag, "addAttribute", {
            value: function(n, t) {
                e.languages.markup.tag.inside["special-attr"].push({
                    pattern: RegExp(/(^|["'\s])/.source + "(?:" + n + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, "i"),
                    lookbehind: !0,
                    inside: {
                        "attr-name": /^[^\s=]+/,
                        "attr-value": {
                            pattern: /=[\s\S]+/,
                            inside: {
                                value: {
                                    pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                                    lookbehind: !0,
                                    alias: [t, "language-" + t],
                                    inside: e.languages[t]
                                },
                                punctuation: [{
                                    pattern: /^=/,
                                    alias: "attr-equals"
                                }, /"|'/]
                            }
                        }
                    }
                })
            }
        }), e.languages.html = e.languages.markup, e.languages.mathml = e.languages.markup, e.languages.svg = e.languages.markup, e.languages.xml = e.languages.extend("markup", {}), e.languages.ssml = e.languages.xml, e.languages.atom = e.languages.xml, e.languages.rss = e.languages.xml
    }
    n.exports = a, a.displayName = "markup", a.aliases = ["html", "mathml", "svg", "xml", "ssml", "atom", "rss"]
}, 695372, (e, n, t) => {
    "use strict";

    function a(e) {
        var n, t;
        n = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/, e.languages.css = {
            comment: /\/\*[\s\S]*?\*\//,
            atrule: {
                pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
                inside: {
                    rule: /^@[\w-]+/,
                    "selector-function-argument": {
                        pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                        lookbehind: !0,
                        alias: "selector"
                    },
                    keyword: {
                        pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                        lookbehind: !0
                    }
                }
            },
            url: {
                pattern: RegExp("\\burl\\((?:" + n.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
                greedy: !0,
                inside: {
                    function: /^url/i,
                    punctuation: /^\(|\)$/,
                    string: {
                        pattern: RegExp("^" + n.source + "$"),
                        alias: "url"
                    }
                }
            },
            selector: {
                pattern: RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + n.source + ")*(?=\\s*\\{)"),
                lookbehind: !0
            },
            string: {
                pattern: n,
                greedy: !0
            },
            property: {
                pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
                lookbehind: !0
            },
            important: /!important\b/i,
            function: {
                pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
                lookbehind: !0
            },
            punctuation: /[(){};:,]/
        }, e.languages.css.atrule.inside.rest = e.languages.css, (t = e.languages.markup) && (t.tag.addInlined("style", "css"), t.tag.addAttribute("style", "css"))
    }
    n.exports = a, a.displayName = "css", a.aliases = []
}, 508618, (e, n, t) => {
    "use strict";

    function a(e) {
        e.languages.clike = {
            comment: [{
                pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
                lookbehind: !0,
                greedy: !0
            }, {
                pattern: /(^|[^\\:])\/\/.*/,
                lookbehind: !0,
                greedy: !0
            }],
            string: {
                pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                greedy: !0
            },
            "class-name": {
                pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
                lookbehind: !0,
                inside: {
                    punctuation: /[.\\]/
                }
            },
            keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
            boolean: /\b(?:false|true)\b/,
            function: /\b\w+(?=\()/,
            number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
            operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
            punctuation: /[{}[\];(),.:]/
        }
    }
    n.exports = a, a.displayName = "clike", a.aliases = []
}, 470257, (e, n, t) => {
    "use strict";

    function a(e) {
        e.languages.javascript = e.languages.extend("clike", {
            "class-name": [e.languages.clike["class-name"], {
                pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
                lookbehind: !0
            }],
            keyword: [{
                pattern: /((?:^|\})\s*)catch\b/,
                lookbehind: !0
            }, {
                pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
                lookbehind: !0
            }],
            function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
            number: {
                pattern: RegExp(/(^|[^\w$])/.source + "(?:" + (/NaN|Infinity/.source + "|" + /0[bB][01]+(?:_[01]+)*n?/.source + "|" + /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + /\d+(?:_\d+)*n/.source) + "|" + /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source + ")" + /(?![\w$])/.source),
                lookbehind: !0
            },
            operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
        }), e.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, e.languages.insertBefore("javascript", "keyword", {
            regex: {
                pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
                lookbehind: !0,
                greedy: !0,
                inside: {
                    "regex-source": {
                        pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                        lookbehind: !0,
                        alias: "language-regex",
                        inside: e.languages.regex
                    },
                    "regex-delimiter": /^\/|\/$/,
                    "regex-flags": /^[a-z]+$/
                }
            },
            "function-variable": {
                pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
                alias: "function"
            },
            parameter: [{
                pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
                lookbehind: !0,
                inside: e.languages.javascript
            }, {
                pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
                lookbehind: !0,
                inside: e.languages.javascript
            }, {
                pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
                lookbehind: !0,
                inside: e.languages.javascript
            }, {
                pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
                lookbehind: !0,
                inside: e.languages.javascript
            }],
            constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
        }), e.languages.insertBefore("javascript", "string", {
            hashbang: {
                pattern: /^#!.*/,
                greedy: !0,
                alias: "comment"
            },
            "template-string": {
                pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
                greedy: !0,
                inside: {
                    "template-punctuation": {
                        pattern: /^`|`$/,
                        alias: "string"
                    },
                    interpolation: {
                        pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
                        lookbehind: !0,
                        inside: {
                            "interpolation-punctuation": {
                                pattern: /^\$\{|\}$/,
                                alias: "punctuation"
                            },
                            rest: e.languages.javascript
                        }
                    },
                    string: /[\s\S]+/
                }
            },
            "string-property": {
                pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
                lookbehind: !0,
                greedy: !0,
                alias: "property"
            }
        }), e.languages.insertBefore("javascript", "operator", {
            "literal-property": {
                pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
                lookbehind: !0,
                alias: "property"
            }
        }), e.languages.markup && (e.languages.markup.tag.addInlined("script", "javascript"), e.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, "javascript")), e.languages.js = e.languages.javascript
    }
    n.exports = a, a.displayName = "javascript", a.aliases = ["js"]
}, 526025, (e, n, t) => {
    "use strict";
    var a, r, o = "object" == typeof globalThis ? globalThis : "object" == typeof self ? self : "object" == typeof window ? window : e.g,
        l = (r = (a = "Prism" in o) ? o.Prism : void 0, function() {
            a ? o.Prism = r : delete o.Prism, a = void 0, r = void 0
        });
    o.Prism = {
        manual: !0,
        disableWorkerMessageHandler: !0
    };
    var i = e.r(850885),
        c = e.r(495802),
        s = e.r(308894),
        u = e.r(534504),
        p = e.r(695372),
        g = e.r(508618),
        d = e.r(470257);
    l();
    var f = {}.hasOwnProperty;

    function m() {}
    m.prototype = s;
    var h = new m;

    function y(e) {
        if ("function" != typeof e || !e.displayName) throw Error("Expected `function` for `grammar`, got `" + e + "`");
        void 0 === h.languages[e.displayName] && e(h)
    }
    n.exports = h, h.highlight = function(e, n) {
        var t, a = s.highlight;
        if ("string" != typeof e) throw Error("Expected `string` for `value`, got `" + e + "`");
        if ("Object" === h.util.type(n)) t = n, n = null;
        else {
            if ("string" != typeof n) throw Error("Expected `string` for `name`, got `" + n + "`");
            if (f.call(h.languages, n)) t = h.languages[n];
            else throw Error("Unknown language: `" + n + "` is not registered")
        }
        return a.call(this, e, t, n)
    }, h.register = y, h.alias = function(e, n) {
        var t, a, r, o, l = h.languages,
            i = e;
        for (t in n && ((i = {})[e] = n), i)
            for (r = (a = "string" == typeof(a = i[t]) ? [a] : a).length, o = -1; ++o < r;) l[a[o]] = l[t]
    }, h.registered = function(e) {
        if ("string" != typeof e) throw Error("Expected `string` for `language`, got `" + e + "`");
        return f.call(h.languages, e)
    }, h.listLanguages = function() {
        var e, n = h.languages,
            t = [];
        for (e in n) f.call(n, e) && "object" == typeof n[e] && t.push(e);
        return t
    }, y(u), y(p), y(g), y(d), h.util.encode = function(e) {
        return e
    }, h.Token.stringify = function(e, n, t) {
        var a;
        return "string" == typeof e ? {
            type: "text",
            value: e
        } : "Array" === h.util.type(e) ? function(e, n) {
            for (var t, a = [], r = e.length, o = -1; ++o < r;) "" !== (t = e[o]) && null != t && a.push(t);
            for (o = -1, r = a.length; ++o < r;) t = a[o], a[o] = h.Token.stringify(t, n, a);
            return a
        }(e, n) : (a = {
            type: e.type,
            content: h.Token.stringify(e.content, n, t),
            tag: "span",
            classes: ["token", e.type],
            attributes: {},
            language: n,
            parent: t
        }, e.alias && (a.classes = a.classes.concat(e.alias)), h.hooks.run("wrap", a), i(a.tag + "." + a.classes.join("."), function(e) {
            var n;
            for (n in e) e[n] = c(e[n]);
            return e
        }(a.attributes), a.content))
    }
}, 91033, 374700, e => {
    "use strict";
    var n, t, a = e.i(253719);

    function r(e, n) {
        (null == n || n > e.length) && (n = e.length);
        for (var t = 0, a = Array(n); t < n; t++) a[t] = e[t];
        return a
    }

    function o(e) {
        return function(e) {
            if (Array.isArray(e)) return r(e)
        }(e) || function(e) {
            if ("u" > typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
        }(e) || function(e, n) {
            if (e) {
                if ("string" == typeof e) return r(e, void 0);
                var t = ({}).toString.call(e).slice(8, -1);
                return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? r(e, void 0) : void 0
            }
        }(e) || function() {
            throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function l(e) {
        return (l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function i(e, n, t) {
        var a;
        return (a = function(e, n) {
            if ("object" != l(e) || !e) return e;
            var t = e[Symbol.toPrimitive];
            if (void 0 !== t) {
                var a = t.call(e, n || "default");
                if ("object" != l(a)) return a;
                throw TypeError("@@toPrimitive must return a primitive value.")
            }
            return ("string" === n ? String : Number)(e)
        }(n, "string"), (n = "symbol" == l(a) ? a : a + "") in e) ? Object.defineProperty(e, n, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[n] = t, e
    }
    var c = e.i(730592);

    function s() {
        return (s = Object.assign.bind()).apply(null, arguments)
    }

    function u(e, n) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var a = Object.getOwnPropertySymbols(e);
            n && (a = a.filter(function(n) {
                return Object.getOwnPropertyDescriptor(e, n).enumerable
            })), t.push.apply(t, a)
        }
        return t
    }

    function p(e) {
        for (var n = 1; n < arguments.length; n++) {
            var t = null != arguments[n] ? arguments[n] : {};
            n % 2 ? u(Object(t), !0).forEach(function(n) {
                i(e, n, t[n])
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : u(Object(t)).forEach(function(n) {
                Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n))
            })
        }
        return e
    }
    var g = {},
        d = ["language", "children", "style", "customStyle", "codeTagProps", "useInlineStyles", "showLineNumbers", "showInlineLineNumbers", "startingLineNumber", "lineNumberContainerStyle", "lineNumberStyle", "wrapLines", "wrapLongLines", "lineProps", "renderer", "PreTag", "CodeTag", "code", "astGenerator"];

    function f(e, n) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var a = Object.getOwnPropertySymbols(e);
            n && (a = a.filter(function(n) {
                return Object.getOwnPropertyDescriptor(e, n).enumerable
            })), t.push.apply(t, a)
        }
        return t
    }

    function m(e) {
        for (var n = 1; n < arguments.length; n++) {
            var t = null != arguments[n] ? arguments[n] : {};
            n % 2 ? f(Object(t), !0).forEach(function(n) {
                i(e, n, t[n])
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : f(Object(t)).forEach(function(n) {
                Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n))
            })
        }
        return e
    }
    var h = /\n/g;

    function y(e) {
        var n, t, a, r, o = e.codeString,
            l = e.codeStyle,
            i = e.containerStyle,
            s = e.numberStyle,
            u = e.startingLineNumber;
        return c.default.createElement("code", {
            style: Object.assign({}, l, void 0 === i ? {
                float: "left",
                paddingRight: "10px"
            } : i)
        }, (t = (n = {
            lines: o.replace(/\n$/, "").split("\n"),
            style: void 0 === s ? {} : s,
            startingLineNumber: u
        }).lines, a = n.startingLineNumber, r = n.style, t.map(function(e, n) {
            var t = n + a;
            return c.default.createElement("span", {
                key: "line-".concat(n),
                className: "react-syntax-highlighter-line-number",
                style: "function" == typeof r ? r(t) : r
            }, "".concat(t, "\n"))
        })))
    }

    function v(e, n) {
        return {
            type: "element",
            tagName: "span",
            properties: {
                key: "line-number--".concat(e),
                className: ["comment", "linenumber", "react-syntax-highlighter-line-number"],
                style: n
            },
            children: [{
                type: "text",
                value: e
            }]
        }
    }

    function b(e, n, t) {
        var a = {
                display: "inline-block",
                minWidth: "".concat(t.toString().length, ".25em"),
                paddingRight: "1em",
                textAlign: "right",
                userSelect: "none"
            },
            r = "function" == typeof e ? e(n) : e;
        return m(m({}, a), r)
    }

    function x(e) {
        var n = e.children,
            t = e.lineNumber,
            a = e.lineNumberStyle,
            r = e.largestLineNumber,
            l = e.showInlineLineNumbers,
            i = e.lineProps,
            c = void 0 === i ? {} : i,
            s = e.className,
            u = void 0 === s ? [] : s,
            p = e.showLineNumbers,
            g = e.wrapLongLines,
            d = e.wrapLines,
            f = void 0 !== d && d ? m({}, "function" == typeof c ? c(t) : c) : {};
        if (f.className = f.className ? [].concat(o(f.className.trim().split(/\s+/)), o(u)) : u, t && l) {
            var h = b(a, t, r);
            n.unshift(v(t, h))
        }
        return g & p && (f.style = m({
            display: "flex"
        }, f.style)), {
            type: "element",
            tagName: "span",
            properties: f,
            children: n
        }
    }

    function w(e) {
        var n = e.rows,
            t = e.stylesheet,
            a = e.useInlineStyles;
        return n.map(function(e, n) {
            return function e(n) {
                var t = n.node,
                    a = n.stylesheet,
                    r = n.style,
                    o = n.useInlineStyles,
                    l = n.key,
                    i = t.properties,
                    u = t.type,
                    d = t.tagName,
                    f = t.value;
                if ("text" === u) return f;
                if (d) {
                    var m, h, y = (m = 0, function(n) {
                        return m += 1, n.map(function(n, t) {
                            return e({
                                node: n,
                                stylesheet: a,
                                useInlineStyles: o,
                                key: "code-segment-".concat(m, "-").concat(t)
                            })
                        })
                    });
                    if (o) {
                        var v = Object.keys(a).reduce(function(e, n) {
                                return n.split(".").forEach(function(n) {
                                    e.includes(n) || e.push(n)
                                }), e
                            }, []),
                            b = i.className && i.className.includes("token") ? ["token"] : [],
                            x = i.className && b.concat(i.className.filter(function(e) {
                                return !v.includes(e)
                            }));
                        h = p(p({}, i), {}, {
                            className: x.join(" ") || void 0,
                            style: function(e) {
                                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                    t = arguments.length > 2 ? arguments[2] : void 0;
                                return (function(e) {
                                    if (0 === e.length || 1 === e.length) return e;
                                    var n, t = e.join(".");
                                    return g[t] || (g[t] = 0 === (n = e.length) || 1 === n ? e : 2 === n ? [e[0], e[1], "".concat(e[0], ".").concat(e[1]), "".concat(e[1], ".").concat(e[0])] : 3 === n ? [e[0], e[1], e[2], "".concat(e[0], ".").concat(e[1]), "".concat(e[0], ".").concat(e[2]), "".concat(e[1], ".").concat(e[0]), "".concat(e[1], ".").concat(e[2]), "".concat(e[2], ".").concat(e[0]), "".concat(e[2], ".").concat(e[1]), "".concat(e[0], ".").concat(e[1], ".").concat(e[2]), "".concat(e[0], ".").concat(e[2], ".").concat(e[1]), "".concat(e[1], ".").concat(e[0], ".").concat(e[2]), "".concat(e[1], ".").concat(e[2], ".").concat(e[0]), "".concat(e[2], ".").concat(e[0], ".").concat(e[1]), "".concat(e[2], ".").concat(e[1], ".").concat(e[0])] : n >= 4 ? [e[0], e[1], e[2], e[3], "".concat(e[0], ".").concat(e[1]), "".concat(e[0], ".").concat(e[2]), "".concat(e[0], ".").concat(e[3]), "".concat(e[1], ".").concat(e[0]), "".concat(e[1], ".").concat(e[2]), "".concat(e[1], ".").concat(e[3]), "".concat(e[2], ".").concat(e[0]), "".concat(e[2], ".").concat(e[1]), "".concat(e[2], ".").concat(e[3]), "".concat(e[3], ".").concat(e[0]), "".concat(e[3], ".").concat(e[1]), "".concat(e[3], ".").concat(e[2]), "".concat(e[0], ".").concat(e[1], ".").concat(e[2]), "".concat(e[0], ".").concat(e[1], ".").concat(e[3]), "".concat(e[0], ".").concat(e[2], ".").concat(e[1]), "".concat(e[0], ".").concat(e[2], ".").concat(e[3]), "".concat(e[0], ".").concat(e[3], ".").concat(e[1]), "".concat(e[0], ".").concat(e[3], ".").concat(e[2]), "".concat(e[1], ".").concat(e[0], ".").concat(e[2]), "".concat(e[1], ".").concat(e[0], ".").concat(e[3]), "".concat(e[1], ".").concat(e[2], ".").concat(e[0]), "".concat(e[1], ".").concat(e[2], ".").concat(e[3]), "".concat(e[1], ".").concat(e[3], ".").concat(e[0]), "".concat(e[1], ".").concat(e[3], ".").concat(e[2]), "".concat(e[2], ".").concat(e[0], ".").concat(e[1]), "".concat(e[2], ".").concat(e[0], ".").concat(e[3]), "".concat(e[2], ".").concat(e[1], ".").concat(e[0]), "".concat(e[2], ".").concat(e[1], ".").concat(e[3]), "".concat(e[2], ".").concat(e[3], ".").concat(e[0]), "".concat(e[2], ".").concat(e[3], ".").concat(e[1]), "".concat(e[3], ".").concat(e[0], ".").concat(e[1]), "".concat(e[3], ".").concat(e[0], ".").concat(e[2]), "".concat(e[3], ".").concat(e[1], ".").concat(e[0]), "".concat(e[3], ".").concat(e[1], ".").concat(e[2]), "".concat(e[3], ".").concat(e[2], ".").concat(e[0]), "".concat(e[3], ".").concat(e[2], ".").concat(e[1]), "".concat(e[0], ".").concat(e[1], ".").concat(e[2], ".").concat(e[3]), "".concat(e[0], ".").concat(e[1], ".").concat(e[3], ".").concat(e[2]), "".concat(e[0], ".").concat(e[2], ".").concat(e[1], ".").concat(e[3]), "".concat(e[0], ".").concat(e[2], ".").concat(e[3], ".").concat(e[1]), "".concat(e[0], ".").concat(e[3], ".").concat(e[1], ".").concat(e[2]), "".concat(e[0], ".").concat(e[3], ".").concat(e[2], ".").concat(e[1]), "".concat(e[1], ".").concat(e[0], ".").concat(e[2], ".").concat(e[3]), "".concat(e[1], ".").concat(e[0], ".").concat(e[3], ".").concat(e[2]), "".concat(e[1], ".").concat(e[2], ".").concat(e[0], ".").concat(e[3]), "".concat(e[1], ".").concat(e[2], ".").concat(e[3], ".").concat(e[0]), "".concat(e[1], ".").concat(e[3], ".").concat(e[0], ".").concat(e[2]), "".concat(e[1], ".").concat(e[3], ".").concat(e[2], ".").concat(e[0]), "".concat(e[2], ".").concat(e[0], ".").concat(e[1], ".").concat(e[3]), "".concat(e[2], ".").concat(e[0], ".").concat(e[3], ".").concat(e[1]), "".concat(e[2], ".").concat(e[1], ".").concat(e[0], ".").concat(e[3]), "".concat(e[2], ".").concat(e[1], ".").concat(e[3], ".").concat(e[0]), "".concat(e[2], ".").concat(e[3], ".").concat(e[0], ".").concat(e[1]), "".concat(e[2], ".").concat(e[3], ".").concat(e[1], ".").concat(e[0]), "".concat(e[3], ".").concat(e[0], ".").concat(e[1], ".").concat(e[2]), "".concat(e[3], ".").concat(e[0], ".").concat(e[2], ".").concat(e[1]), "".concat(e[3], ".").concat(e[1], ".").concat(e[0], ".").concat(e[2]), "".concat(e[3], ".").concat(e[1], ".").concat(e[2], ".").concat(e[0]), "".concat(e[3], ".").concat(e[2], ".").concat(e[0], ".").concat(e[1]), "".concat(e[3], ".").concat(e[2], ".").concat(e[1], ".").concat(e[0])] : void 0), g[t]
                                })(e.filter(function(e) {
                                    return "token" !== e
                                })).reduce(function(e, n) {
                                    return p(p({}, e), t[n])
                                }, n)
                            }(i.className, Object.assign({}, i.style, void 0 === r ? {} : r), a)
                        })
                    } else h = p(p({}, i), {}, {
                        className: i.className.join(" ")
                    });
                    var w = y(t.children);
                    return c.default.createElement(d, s({
                        key: l
                    }, h), w)
                }
            }({
                node: e,
                stylesheet: t,
                useInlineStyles: a,
                key: "code-segement".concat(n)
            })
        })
    }

    function k(e) {
        return e && void 0 !== e.highlightAuto
    }
    var S = e.i(526025),
        A = (n = S.default, t = {}, function(e) {
            var a = e.language,
                r = e.children,
                l = e.style,
                i = void 0 === l ? t : l,
                s = e.customStyle,
                u = void 0 === s ? {} : s,
                p = e.codeTagProps,
                g = void 0 === p ? {
                    className: a ? "language-".concat(a) : void 0,
                    style: m(m({}, i['code[class*="language-"]']), i['code[class*="language-'.concat(a, '"]')])
                } : p,
                f = e.useInlineStyles,
                S = void 0 === f || f,
                A = e.showLineNumbers,
                F = void 0 !== A && A,
                N = e.showInlineLineNumbers,
                j = void 0 === N || N,
                O = e.startingLineNumber,
                C = void 0 === O ? 1 : O,
                L = e.lineNumberContainerStyle,
                P = e.lineNumberStyle,
                E = void 0 === P ? {} : P,
                $ = e.wrapLines,
                T = e.wrapLongLines,
                D = void 0 !== T && T,
                M = e.lineProps,
                I = e.renderer,
                _ = e.PreTag,
                R = void 0 === _ ? "pre" : _,
                z = e.CodeTag,
                B = void 0 === z ? "code" : z,
                U = e.code,
                H = void 0 === U ? (Array.isArray(r) ? r[0] : r) || "" : U,
                W = e.astGenerator,
                q = function(e, n) {
                    if (null == e) return {};
                    var t, a, r = function(e, n) {
                        if (null == e) return {};
                        var t = {};
                        for (var a in e)
                            if (({}).hasOwnProperty.call(e, a)) {
                                if (-1 !== n.indexOf(a)) continue;
                                t[a] = e[a]
                            }
                        return t
                    }(e, n);
                    if (Object.getOwnPropertySymbols) {
                        var o = Object.getOwnPropertySymbols(e);
                        for (a = 0; a < o.length; a++) t = o[a], -1 === n.indexOf(t) && ({}).propertyIsEnumerable.call(e, t) && (r[t] = e[t])
                    }
                    return r
                }(e, d);
            W = W || n;
            var Z = F ? c.default.createElement(y, {
                    containerStyle: L,
                    codeStyle: g.style || {},
                    numberStyle: E,
                    startingLineNumber: C,
                    codeString: H
                }) : null,
                V = i.hljs || i['pre[class*="language-"]'] || {
                    backgroundColor: "#fff"
                },
                G = k(W) ? "hljs" : "prismjs",
                K = S ? Object.assign({}, q, {
                    style: Object.assign({}, V, u)
                }) : Object.assign({}, q, {
                    className: q.className ? "".concat(G, " ").concat(q.className) : G,
                    style: Object.assign({}, u)
                });
            if (D ? g.style = m({
                    whiteSpace: "pre-wrap"
                }, g.style) : g.style = m({
                    whiteSpace: "pre"
                }, g.style), !W) return c.default.createElement(R, K, Z, c.default.createElement(B, g, H));
            (void 0 === $ && I || D) && ($ = !0), I = I || w;
            var J = [{
                    type: "text",
                    value: H
                }],
                X = function(e) {
                    var n = e.astGenerator,
                        t = e.language,
                        a = e.code,
                        r = e.defaultCodeValue;
                    if (k(n)) {
                        var o = -1 !== n.listLanguages().indexOf(t);
                        return "text" === t ? {
                            value: r,
                            language: "text"
                        } : o ? n.highlight(t, a) : n.highlightAuto(a)
                    }
                    try {
                        return t && "text" !== t ? {
                            value: n.highlight(a, t)
                        } : {
                            value: r
                        }
                    } catch (e) {
                        return {
                            value: r
                        }
                    }
                }({
                    astGenerator: W,
                    language: a,
                    code: H,
                    defaultCodeValue: J
                });
            null === X.language && (X.value = J);
            var Y = X.value.length;
            1 === Y && "text" === X.value[0].type && (Y = X.value[0].value.split("\n").length);
            var Q = Y + C,
                ee = function(e, n, t, a, r, l, i, c, s) {
                    var u, p = function e(n) {
                            for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], r = 0; r < n.length; r++) {
                                var l = n[r];
                                if ("text" === l.type) a.push(x({
                                    children: [l],
                                    className: o(new Set(t))
                                }));
                                else if (l.children) {
                                    var i = t.concat(l.properties.className);
                                    e(l.children, i).forEach(function(e) {
                                        return a.push(e)
                                    })
                                }
                            }
                            return a
                        }(e.value),
                        g = [],
                        d = -1,
                        f = 0;

                    function m(e, o) {
                        var l = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
                        return n || l.length > 0 ? function(e, o) {
                            var l = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
                            return x({
                                children: e,
                                lineNumber: o,
                                lineNumberStyle: c,
                                largestLineNumber: i,
                                showInlineLineNumbers: r,
                                lineProps: t,
                                className: l,
                                showLineNumbers: a,
                                wrapLongLines: s,
                                wrapLines: n
                            })
                        }(e, o, l) : function(e, n) {
                            if (a && n && r) {
                                var t = b(c, n, i);
                                e.unshift(v(n, t))
                            }
                            return e
                        }(e, o)
                    }
                    for (; f < p.length;) ! function() {
                        var e = p[f],
                            n = e.children[0].value;
                        if (n.match(h)) {
                            var t = n.split("\n");
                            t.forEach(function(n, r) {
                                var o = a && g.length + l,
                                    i = {
                                        type: "text",
                                        value: "".concat(n, "\n")
                                    };
                                if (0 === r) {
                                    var c = m(p.slice(d + 1, f).concat(x({
                                        children: [i],
                                        className: e.properties.className
                                    })), o);
                                    g.push(c)
                                } else if (r === t.length - 1) {
                                    var s = p[f + 1] && p[f + 1].children && p[f + 1].children[0],
                                        u = {
                                            type: "text",
                                            value: "".concat(n)
                                        };
                                    if (s) {
                                        var h = x({
                                            children: [u],
                                            className: e.properties.className
                                        });
                                        p.splice(f + 1, 0, h)
                                    } else {
                                        var y = m([u], o, e.properties.className);
                                        g.push(y)
                                    }
                                } else {
                                    var v = m([i], o, e.properties.className);
                                    g.push(v)
                                }
                            }), d = f
                        }
                        f++
                    }();
                    if (d !== p.length - 1) {
                        var y = p.slice(d + 1, p.length);
                        if (y && y.length) {
                            var w = m(y, a && g.length + l);
                            g.push(w)
                        }
                    }
                    return n ? g : (u = []).concat.apply(u, g)
                }(X, $, void 0 === M ? {} : M, F, j, C, Q, E, D);
            return c.default.createElement(R, K, c.default.createElement(B, g, !j && Z, I({
                rows: ee,
                stylesheet: i,
                useInlineStyles: S
            })))
        });
    A.registerLanguage = function(e, n) {
        return S.default.register(n)
    }, A.alias = function(e, n) {
        return S.default.alias(e, n)
    }, e.s(["PrismLight", 0, A], 374700);
    let F = e.i(470257).default;

    function N({
        code: e,
        language: n,
        showLineNumbers: t = !0
    }) {
        return (0, a.jsx)(A, {
            customStyle: {},
            language: "skill" === n ? "cli" : n,
            showLineNumbers: t,
            useInlineStyles: !1,
            children: e
        })
    }

    function j(e) {
        e.languages.json = {
            property: {
                pattern: /(?<=")(?:\\.|[^"\\\r\n])*(?="\s*:)/,
                greedy: !0
            },
            punctuation: {
                pattern: /[{}[\],":]/,
                greedy: !0
            },
            string: {
                pattern: /(?<=")(?:\\.|[^"\\\r\n])*(?=")/,
                greedy: !0
            },
            comment: {
                pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
                greedy: !0
            },
            number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
            operator: /:/,
            boolean: /\b(?:false|true)\b/,
            null: {
                pattern: /\bnull\b/,
                alias: "keyword"
            }
        }, e.languages.webmanifest = e.languages.json
    }

    function O(e) {
        e.languages.python = {
            comment: {
                pattern: /(^|[^\\])#.*/,
                lookbehind: !0,
                greedy: !0
            },
            string: {
                pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
                greedy: !0
            },
            punctuation: /[{}[\];(),.:"'`]/,
            function: {
                pattern: /((?:^|\s)(?:Firecrawl|scrape_url)\b)/gm,
                greedy: !0
            },
            keyword: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
            boolean: /\b(?:True|False|None)\b/,
            number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0b[01]+|0o[0-7]+|0x[a-fA-F0-9]+)\b/i,
            operator: /[+%=]=?|!=|<=|>=|<<|>>|\*\*?|\/\/?|\/|&|\||\^|~|\b(?:is|is not|in|not in)\b/
        }
    }

    function C(e) {
        e.languages.curl = {
            comment: {
                pattern: /#.*/,
                greedy: !0
            },
            string: {
                pattern: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
                greedy: !0
            },
            punctuation: /[{}[\];(),.:"'`$]/,
            function: {
                pattern: /\b(?:curl|POST|GET|PUT|DELETE|PATCH)\b/i
            },
            keyword: /\b(?:Authorization|Bearer|Content-Type|application\/json)\b/i,
            operator: /[=<>!&|]/,
            number: /\b\d+\b/
        }
    }

    function L(e) {
        e.languages.cli = {
            comment: {
                pattern: /#.*/,
                greedy: !0
            },
            string: [{
                pattern: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
                greedy: !0
            }, {
                pattern: /\bfc-[A-Za-z0-9_]+\b/,
                greedy: !0
            }, {
                pattern: /\b[\w-]+\.[\w.-]+\b/,
                greedy: !0
            }, {
                pattern: /\bfirecrawl[-/]cli\b/,
                greedy: !0
            }],
            punctuation: /[{}[\];(),.:"'`$]/,
            keyword: /\b(?:auth|scrape|crawl|search|map|extract|npx|skills|add|firecrawl|browser|interact|setup|init|execute|close|snapshot|click|open|stop)\b/i,
            operator: /[=<>!&|]/,
            number: /\b\d+\b/,
            flag: /--\w+(?:-\w+)*/
        }
    }
    j.displayName = "json", j.aliases = ["webmanifest"], O.displayName = "python", O.aliases = ["py", "gyp", "ipython"], C.displayName = "curl", C.aliases = ["bash", "shell"], L.displayName = "cli", L.aliases = [], A.registerLanguage("json", j), A.registerLanguage("python", O), A.registerLanguage("javascript", F), A.registerLanguage("curl", C), A.registerLanguage("cli", L), e.s(["default", () => N], 91033)
}]);

//# debugId=6033802f-efbd-f638-556f-fd9eb7e467ef
//# sourceMappingURL=b30970a63d5ac1ae.js.map