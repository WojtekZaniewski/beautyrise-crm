;
! function() {
    try {
        var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {},
            n = (new e.Error).stack;
        n && ((e._debugIds || (e._debugIds = {}))[n] = "33ec2aea-831c-252f-692e-11650d31c215")
    } catch (e) {}
}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 232181, t => {
    "use strict";
    let e = (0, t.i(730592).createContext)({});
    t.s(["LayoutGroupContext", () => e])
}, 346835, t => {
    "use strict";
    let e = (0, t.i(730592).createContext)({
        transformPagePoint: t => t,
        isStatic: !1,
        reducedMotion: "never"
    });
    t.s(["MotionConfigContext", () => e])
}, 570606, t => {
    "use strict";
    var e = t.i(35166),
        i = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
        n = (0, e.default)(function(t) {
            return i.test(t) || 111 === t.charCodeAt(0) && 110 === t.charCodeAt(1) && 91 > t.charCodeAt(2)
        });
    t.s(["default", () => n])
}, 156485, t => {
    "use strict";
    let e = (0, t.i(730592).createContext)(null);
    t.s(["PresenceContext", () => e])
}, 912826, 480637, t => {
    "use strict";
    var e = t.i(730592);

    function i(t) {
        let i = (0, e.useRef)(null);
        return null === i.current && (i.current = t()), i.current
    }
    t.s(["useConstant", () => i], 912826);
    let n = t.i(851130).isBrowser ? e.useLayoutEffect : e.useEffect;
    t.s(["useIsomorphicLayoutEffect", () => n], 480637)
}, 177426, t => {
    "use strict";
    var e = t.i(730592),
        i = t.i(156485);

    function n(t = !0) {
        let s = (0, e.useContext)(i.PresenceContext);
        if (null === s) return [!0, null];
        let {
            isPresent: r,
            onExitComplete: o,
            register: a
        } = s, l = (0, e.useId)();
        (0, e.useEffect)(() => {
            if (t) return a(l)
        }, [t]);
        let h = (0, e.useCallback)(() => t && o && o(l), [l, o, t]);
        return !r && o ? [!1, h] : [!0]
    }
    t.s(["usePresence", () => n])
}, 443390, t => {
    "use strict";
    var e = t.i(264250);

    function i(t) {
        return (0, e.isObject)(t) && "offsetHeight" in t
    }
    t.s(["isHTMLElement", () => i])
}, 534026, 194361, 614064, t => {
    "use strict";
    var e = t.i(730592),
        i = t.i(28451),
        n = t.i(987105);
    let s = ["animate", "circle", "defs", "desc", "ellipse", "g", "image", "line", "filter", "marker", "mask", "metadata", "path", "pattern", "polygon", "polyline", "rect", "stop", "switch", "symbol", "svg", "text", "tspan", "use", "view"];

    function r(t) {
        if ("string" != typeof t || t.includes("-"));
        else if (s.indexOf(t) > -1 || /[A-Z]/u.test(t)) return !0;
        return !1
    }
    t.i(638440);
    var o = t.i(253719),
        a = t.i(232181);
    let l = (0, e.createContext)({
        strict: !1
    });
    var h = t.i(346835);
    let u = (0, e.createContext)({});
    var c = t.i(905672),
        d = t.i(16124);

    function m(t) {
        return Array.isArray(t) ? t.join(" ") : t
    }
    var p = t.i(76650),
        f = t.i(17230),
        g = t.i(110251);
    let y = () => ({
        style: {},
        transform: {},
        transformOrigin: {},
        vars: {}
    });

    function v(t, e, i) {
        for (let n in e)(0, p.isMotionValue)(e[n]) || (0, f.isForcedMotionValue)(n, i) || (t[n] = e[n])
    }
    var x = t.i(968590);
    let P = () => ({ ...y(),
        attrs: {}
    });
    var T = t.i(359364);
    let A = new Set(["animate", "exit", "variants", "initial", "style", "values", "variants", "transition", "transformTemplate", "custom", "inherit", "onBeforeLayoutMeasure", "onAnimationStart", "onAnimationComplete", "onUpdate", "onDragStart", "onDrag", "onDragEnd", "onMeasureDragConstraints", "onDirectionLock", "onDragTransitionEnd", "_dragX", "_dragY", "onHoverStart", "onHoverEnd", "onViewportEnter", "onViewportLeave", "globalTapTarget", "ignoreStrict", "viewport"]);

    function S(t) {
        return t.startsWith("while") || t.startsWith("drag") && "draggable" !== t || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || A.has(t)
    }
    let E = t => !S(t);

    function D(t) {
        "function" == typeof t && (E = e => e.startsWith("on") ? !S(e) : t(e))
    }
    try {
        D(t.r(570606).default)
    } catch {}

    function w(t, e, i) {
        let n = {};
        for (let s in t)("values" !== s || "object" != typeof t.values) && (E(s) || !0 === i && S(s) || !e && !S(s) || t.draggable && s.startsWith("onDrag")) && (n[s] = t[s]);
        return n
    }
    t.s(["filterProps", () => w, "loadExternalIsValidProp", () => D], 194361);
    var b = t.i(539777),
        C = t.i(156485),
        L = t.i(775391),
        R = t.i(912826);

    function k(t) {
        return (0, p.isMotionValue)(t) ? t.get() : t
    }
    let V = t => (i, n) => {
            let s = (0, e.useContext)(u),
                r = (0, e.useContext)(C.PresenceContext),
                o = () => (function({
                    scrapeMotionValuesFromProps: t,
                    createRenderState: e
                }, i, n, s) {
                    return {
                        latestValues: function(t, e, i, n) {
                            let s = {},
                                r = n(t, {});
                            for (let t in r) s[t] = k(r[t]);
                            let {
                                initial: o,
                                animate: a
                            } = t, l = (0, c.isControllingVariants)(t), h = (0, c.isVariantNode)(t);
                            e && h && !l && !1 !== t.inherit && (void 0 === o && (o = e.initial), void 0 === a && (a = e.animate));
                            let u = !!i && !1 === i.initial,
                                d = (u = u || !1 === o) ? a : o;
                            if (d && "boolean" != typeof d && !(0, b.isAnimationControls)(d)) {
                                let e = Array.isArray(d) ? d : [d];
                                for (let i = 0; i < e.length; i++) {
                                    let n = (0, L.resolveVariantFromProps)(t, e[i]);
                                    if (n) {
                                        let {
                                            transitionEnd: t,
                                            transition: e,
                                            ...i
                                        } = n;
                                        for (let t in i) {
                                            let e = i[t];
                                            if (Array.isArray(e)) {
                                                let t = u ? e.length - 1 : 0;
                                                e = e[t]
                                            }
                                            null !== e && (s[t] = e)
                                        }
                                        for (let e in t) s[e] = t[e]
                                    }
                                }
                            }
                            return s
                        }(i, n, s, t),
                        renderState: e()
                    }
                })(t, i, s, r);
            return n ? o() : (0, R.useConstant)(o)
        },
        M = V({
            scrapeMotionValuesFromProps: t.i(761356).scrapeMotionValuesFromProps,
            createRenderState: y
        }),
        B = V({
            scrapeMotionValuesFromProps: t.i(148915).scrapeMotionValuesFromProps,
            createRenderState: P
        });
    var j = t.i(851130),
        O = t.i(796132);
    let U = Symbol.for("motionComponentSymbol");

    function F(t) {
        return t && "object" == typeof t && Object.prototype.hasOwnProperty.call(t, "current")
    }
    var I = t.i(937376);
    let N = (0, e.createContext)({});
    var H = t.i(480637);

    function W(t, {
        forwardMotionProps: i = !1
    } = {}, n, s) {
        n && function(t) {
            for (let e in t) O.featureDefinitions[e] = { ...O.featureDefinitions[e],
                ...t[e]
            }
        }(n);
        let f = r(t) ? B : M;

        function A(n, A) {
            var S;
            let E, D = { ...(0, e.useContext)(h.MotionConfigContext),
                    ...n,
                    layoutId: function({
                        layoutId: t
                    }) {
                        let i = (0, e.useContext)(a.LayoutGroupContext).id;
                        return i && void 0 !== t ? i + "-" + t : t
                    }(n)
                },
                {
                    isStatic: b
                } = D,
                L = function(t) {
                    let {
                        initial: i,
                        animate: n
                    } = function(t, e) {
                        if ((0, c.isControllingVariants)(t)) {
                            let {
                                initial: e,
                                animate: i
                            } = t;
                            return {
                                initial: !1 === e || (0, d.isVariantLabel)(e) ? e : void 0,
                                animate: (0, d.isVariantLabel)(i) ? i : void 0
                            }
                        }
                        return !1 !== t.inherit ? e : {}
                    }(t, (0, e.useContext)(u));
                    return (0, e.useMemo)(() => ({
                        initial: i,
                        animate: n
                    }), [m(i), m(n)])
                }(n),
                R = f(n, b);
            if (!b && j.isBrowser) {
                (0, e.useContext)(l).strict;
                let i = function(t) {
                    let {
                        drag: e,
                        layout: i
                    } = O.featureDefinitions;
                    if (!e && !i) return {};
                    let n = { ...e,
                        ...i
                    };
                    return {
                        MeasureLayout: e ? .isEnabled(t) || i ? .isEnabled(t) ? n.MeasureLayout : void 0,
                        ProjectionNode: n.ProjectionNode
                    }
                }(D);
                E = i.MeasureLayout, L.visualElement = function(t, i, n, s, r) {
                    let {
                        visualElement: o
                    } = (0, e.useContext)(u), a = (0, e.useContext)(l), c = (0, e.useContext)(C.PresenceContext), d = (0, e.useContext)(h.MotionConfigContext).reducedMotion, m = (0, e.useRef)(null);
                    s = s || a.renderer, !m.current && s && (m.current = s(t, {
                        visualState: i,
                        parent: o,
                        props: n,
                        presenceContext: c,
                        blockInitialAnimation: !!c && !1 === c.initial,
                        reducedMotionConfig: d
                    }));
                    let p = m.current,
                        f = (0, e.useContext)(N);
                    p && !p.projection && r && ("html" === p.type || "svg" === p.type) && function(t, e, i, n) {
                        let {
                            layoutId: s,
                            layout: r,
                            drag: o,
                            dragConstraints: a,
                            layoutScroll: l,
                            layoutRoot: h,
                            layoutCrossfade: u
                        } = e;
                        t.projection = new i(t.latestValues, e["data-framer-portal-id"] ? void 0 : function t(e) {
                            if (e) return !1 !== e.options.allowProjection ? e.projection : t(e.parent)
                        }(t.parent)), t.projection.setOptions({
                            layoutId: s,
                            layout: r,
                            alwaysMeasureLayout: !!o || a && F(a),
                            visualElement: t,
                            animationType: "string" == typeof r ? r : "both",
                            initialPromotionConfig: n,
                            crossfade: u,
                            layoutScroll: l,
                            layoutRoot: h
                        })
                    }(m.current, n, r, f);
                    let g = (0, e.useRef)(!1);
                    (0, e.useInsertionEffect)(() => {
                        p && g.current && p.update(n, c)
                    });
                    let y = n[I.optimizedAppearDataAttribute],
                        v = (0, e.useRef)(!!y && !window.MotionHandoffIsComplete ? .(y) && window.MotionHasOptimisedAnimation ? .(y));
                    return (0, H.useIsomorphicLayoutEffect)(() => {
                        p && (g.current = !0, window.MotionIsMounted = !0, p.updateFeatures(), p.scheduleRenderMicrotask(), v.current && p.animationState && p.animationState.animateChanges())
                    }), (0, e.useEffect)(() => {
                        p && (!v.current && p.animationState && p.animationState.animateChanges(), v.current && (queueMicrotask(() => {
                            window.MotionHandoffMarkAsComplete ? .(y)
                        }), v.current = !1), p.enteringChildren = void 0)
                    }), p
                }(t, R, D, s, i.ProjectionNode)
            }
            return (0, o.jsxs)(u.Provider, {
                value: L,
                children: [E && L.visualElement ? (0, o.jsx)(E, {
                    visualElement: L.visualElement,
                    ...D
                }) : null, function(t, i, n, {
                    latestValues: s
                }, o, a = !1) {
                    let l = (r(t) ? function(t, i, n, s) {
                            let r = (0, e.useMemo)(() => {
                                let e = P();
                                return (0, x.buildSVGAttrs)(e, i, (0, T.isSVGTag)(s), t.transformTemplate, t.style), { ...e.attrs,
                                    style: { ...e.style
                                    }
                                }
                            }, [i]);
                            if (t.style) {
                                let e = {};
                                v(e, t.style, t), r.style = { ...e,
                                    ...r.style
                                }
                            }
                            return r
                        } : function(t, i) {
                            let n, s, r = {},
                                o = (n = t.style || {}, v(s = {}, n, t), Object.assign(s, function({
                                    transformTemplate: t
                                }, i) {
                                    return (0, e.useMemo)(() => {
                                        let e = y();
                                        return (0, g.buildHTMLStyles)(e, i, t), Object.assign({}, e.vars, e.style)
                                    }, [i])
                                }(t, i)), s);
                            return t.drag && !1 !== t.dragListener && (r.draggable = !1, o.userSelect = o.WebkitUserSelect = o.WebkitTouchCallout = "none", o.touchAction = !0 === t.drag ? "none" : `pan-${"x"===t.drag?"y":"x"}`), void 0 === t.tabIndex && (t.onTap || t.onTapStart || t.whileTap) && (r.tabIndex = 0), r.style = o, r
                        })(i, s, o, t),
                        h = w(i, "string" == typeof t, a),
                        u = t !== e.Fragment ? { ...h,
                            ...l,
                            ref: n
                        } : {},
                        {
                            children: c
                        } = i,
                        d = (0, e.useMemo)(() => (0, p.isMotionValue)(c) ? c.get() : c, [c]);
                    return (0, e.createElement)(t, { ...u,
                        children: d
                    })
                }(t, n, (S = L.visualElement, (0, e.useCallback)(t => {
                    t && R.onMount && R.onMount(t), S && (t ? S.mount(t) : S.unmount()), A && ("function" == typeof A ? A(t) : F(A) && (A.current = t))
                }, [S])), R, b, i)]
            })
        }
        A.displayName = `motion.${"string"==typeof t?t:`create(${t.displayName??t.name??""})`}`;
        let S = (0, e.forwardRef)(A);
        return S[U] = t, S
    }
    var z = t.i(108558),
        $ = t.i(43266);

    function G(t, e, i, n = 0, s = 1) {
        let r = Array.from(t).sort((t, e) => t.sortNodePosition(e)).indexOf(e),
            o = t.size,
            a = (o - 1) * n;
        return "function" == typeof i ? i(r, o) : 1 === s ? r * n : a - r * n
    }

    function X(t, e, i = {}) {
        let n = (0, z.resolveVariant)(t, e, "exit" === i.type ? t.presenceContext ? .custom : void 0),
            {
                transition: s = t.getDefaultTransition() || {}
            } = n || {};
        i.transitionOverride && (s = i.transitionOverride);
        let r = n ? () => Promise.all((0, $.animateTarget)(t, n, i)) : () => Promise.resolve(),
            o = t.variantChildren && t.variantChildren.size ? (n = 0) => {
                let {
                    delayChildren: r = 0,
                    staggerChildren: o,
                    staggerDirection: a
                } = s;
                return function(t, e, i = 0, n = 0, s = 0, r = 1, o) {
                    let a = [];
                    for (let l of t.variantChildren) l.notify("AnimationStart", e), a.push(X(l, e, { ...o,
                        delay: i + ("function" == typeof n ? 0 : n) + G(t.variantChildren, l, n, s, r)
                    }).then(() => l.notify("AnimationComplete", e)));
                    return Promise.all(a)
                }(t, e, n, r, o, a, i)
            } : () => Promise.resolve(),
            {
                when: a
            } = s;
        if (!a) return Promise.all([r(), o(i.delay)]); {
            let [t, e] = "beforeChildren" === a ? [r, o] : [o, r];
            return t().then(() => e())
        }
    }

    function Y(t, e, i = {}) {
        let n;
        if (t.notify("AnimationStart", e), Array.isArray(e)) n = Promise.all(e.map(e => X(t, e, i)));
        else if ("string" == typeof e) n = X(t, e, i);
        else {
            let s = "function" == typeof e ? (0, z.resolveVariant)(t, e, i.custom) : e;
            n = Promise.all((0, $.animateTarget)(t, s, i))
        }
        return n.then(() => {
            t.notify("AnimationComplete", e)
        })
    }
    t.s(["animateVisualElement", () => Y], 614064);
    var q = t.i(448124);

    function K(t, e) {
        if (!Array.isArray(e)) return !1;
        let i = e.length;
        if (i !== t.length) return !1;
        for (let n = 0; n < i; n++)
            if (e[n] !== t[n]) return !1;
        return !0
    }
    var Z = t.i(252318);
    let _ = Z.variantProps.length,
        J = [...Z.variantPriorityOrder].reverse(),
        Q = Z.variantPriorityOrder.length;

    function tt(t = !1) {
        return {
            isActive: t,
            protectedKeys: {},
            needsAnimating: {},
            prevResolvedValues: {}
        }
    }

    function te() {
        return {
            animate: tt(!0),
            whileInView: tt(),
            whileHover: tt(),
            whileTap: tt(),
            whileDrag: tt(),
            whileFocus: tt(),
            exit: tt()
        }
    }
    class ti {
        constructor(t) {
            this.isMounted = !1, this.node = t
        }
        update() {}
    }
    let tn = 0;
    var ts = t.i(175602),
        tr = t.i(176014),
        to = t.i(903083);
    let ta = {
        x: !1,
        y: !1
    };
    var tl = t.i(73907),
        th = t.i(348367),
        tu = t.i(489219);

    function tc(t, e, i, n = {
        passive: !0
    }) {
        return t.addEventListener(e, i, n), () => t.removeEventListener(e, i)
    }
    let td = t => "mouse" === t.pointerType ? "number" != typeof t.button || t.button <= 0 : !1 !== t.isPrimary;

    function tm(t) {
        return {
            point: {
                x: t.pageX,
                y: t.pageY
            }
        }
    }

    function tp(t, e, i, n) {
        return tc(t, e, t => td(t) && i(t, tm(t)), n)
    }
    var tf = t.i(987340);

    function tg(t) {
        return t.max - t.min
    }

    function ty(t, e, i, n = .5) {
        t.origin = n, t.originPoint = (0, to.mixNumber)(e.min, e.max, t.origin), t.scale = tg(i) / tg(e), t.translate = (0, to.mixNumber)(i.min, i.max, t.origin) - t.originPoint, (t.scale >= .9999 && t.scale <= 1.0001 || isNaN(t.scale)) && (t.scale = 1), (t.translate >= -.01 && t.translate <= .01 || isNaN(t.translate)) && (t.translate = 0)
    }

    function tv(t, e, i, n) {
        ty(t.x, e.x, i.x, n ? n.originX : void 0), ty(t.y, e.y, i.y, n ? n.originY : void 0)
    }

    function tx(t, e, i) {
        t.min = i.min + e.min, t.max = t.min + tg(e)
    }

    function tP(t, e, i) {
        t.min = e.min - i.min, t.max = t.min + tg(e)
    }

    function tT(t, e, i) {
        tP(t.x, e.x, i.x), tP(t.y, e.y, i.y)
    }
    var tA = t.i(644298);

    function tS(t) {
        return [t("x"), t("y")]
    }
    var tE = t.i(901753);
    let tD = ({
        current: t
    }) => t ? t.ownerDocument.defaultView : null;
    var tw = t.i(365128),
        tb = t.i(640746),
        tC = t.i(667327);
    let tL = (t, e) => Math.abs(t - e);
    class tR {
        constructor(t, e, {
            transformPagePoint: i,
            contextWindow: n = window,
            dragSnapToOrigin: s = !1,
            distanceThreshold: r = 3
        } = {}) {
            if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.updatePoint = () => {
                    var t, e;
                    if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
                    let i = tM(this.lastMoveEventInfo, this.history),
                        n = null !== this.startEvent,
                        s = (t = i.offset, e = {
                            x: 0,
                            y: 0
                        }, Math.sqrt(tL(t.x, e.x) ** 2 + tL(t.y, e.y) ** 2) >= this.distanceThreshold);
                    if (!n && !s) return;
                    let {
                        point: r
                    } = i, {
                        timestamp: o
                    } = tr.frameData;
                    this.history.push({ ...r,
                        timestamp: o
                    });
                    let {
                        onStart: a,
                        onMove: l
                    } = this.handlers;
                    n || (a && a(this.lastMoveEvent, i), this.startEvent = this.lastMoveEvent), l && l(this.lastMoveEvent, i)
                }, this.handlePointerMove = (t, e) => {
                    this.lastMoveEvent = t, this.lastMoveEventInfo = tk(e, this.transformPagePoint), tr.frame.update(this.updatePoint, !0)
                }, this.handlePointerUp = (t, e) => {
                    this.end();
                    let {
                        onEnd: i,
                        onSessionEnd: n,
                        resumeAnimation: s
                    } = this.handlers;
                    if (this.dragSnapToOrigin && s && s(), !(this.lastMoveEvent && this.lastMoveEventInfo)) return;
                    let r = tM("pointercancel" === t.type ? this.lastMoveEventInfo : tk(e, this.transformPagePoint), this.history);
                    this.startEvent && i && i(t, r), n && n(t, r)
                }, !td(t)) return;
            this.dragSnapToOrigin = s, this.handlers = e, this.transformPagePoint = i, this.distanceThreshold = r, this.contextWindow = n || window;
            const o = tk(tm(t), this.transformPagePoint),
                {
                    point: a
                } = o,
                {
                    timestamp: l
                } = tr.frameData;
            this.history = [{ ...a,
                timestamp: l
            }];
            const {
                onSessionStart: h
            } = e;
            h && h(t, tM(o, this.history)), this.removeListeners = (0, tb.pipe)(tp(this.contextWindow, "pointermove", this.handlePointerMove), tp(this.contextWindow, "pointerup", this.handlePointerUp), tp(this.contextWindow, "pointercancel", this.handlePointerUp))
        }
        updateHandlers(t) {
            this.handlers = t
        }
        end() {
            this.removeListeners && this.removeListeners(), (0, tr.cancelFrame)(this.updatePoint)
        }
    }

    function tk(t, e) {
        return e ? {
            point: e(t.point)
        } : t
    }

    function tV(t, e) {
        return {
            x: t.x - e.x,
            y: t.y - e.y
        }
    }

    function tM({
        point: t
    }, e) {
        return {
            point: t,
            delta: tV(t, tB(e)),
            offset: tV(t, e[0]),
            velocity: function(t, e) {
                if (t.length < 2) return {
                    x: 0,
                    y: 0
                };
                let i = t.length - 1,
                    n = null,
                    s = tB(t);
                for (; i >= 0 && (n = t[i], !(s.timestamp - n.timestamp > (0, tC.secondsToMilliseconds)(.1)));) i--;
                if (!n) return {
                    x: 0,
                    y: 0
                };
                let r = (0, tC.millisecondsToSeconds)(s.timestamp - n.timestamp);
                if (0 === r) return {
                    x: 0,
                    y: 0
                };
                let o = {
                    x: (s.x - n.x) / r,
                    y: (s.y - n.y) / r
                };
                return o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o
            }(e, .1)
        }
    }

    function tB(t) {
        return t[t.length - 1]
    }
    var tj = t.i(747113),
        tO = t.i(483032);

    function tU(t, e, i) {
        return {
            min: void 0 !== e ? t.min + e : void 0,
            max: void 0 !== i ? t.max + i - (t.max - t.min) : void 0
        }
    }

    function tF(t, e) {
        let i = e.min - t.min,
            n = e.max - t.max;
        return e.max - e.min < t.max - t.min && ([i, n] = [n, i]), {
            min: i,
            max: n
        }
    }

    function tI(t, e, i) {
        return {
            min: tN(t, e),
            max: tN(t, i)
        }
    }

    function tN(t, e) {
        return "number" == typeof t ? t : t[e] || 0
    }
    let tH = new WeakMap;
    class tW {
        constructor(t) {
            this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = {
                x: 0,
                y: 0
            }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = (0, tA.createBox)(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = t
        }
        start(t, {
            snapToCursor: e = !1,
            distanceThreshold: i
        } = {}) {
            let {
                presenceContext: n
            } = this.visualElement;
            if (n && !1 === n.isPresent) return;
            let s = t => {
                    let {
                        dragSnapToOrigin: i
                    } = this.getProps();
                    i ? this.pauseAnimation() : this.stopAnimation(), e && this.snapToCursor(tm(t).point)
                },
                r = (t, e) => {
                    let {
                        drag: i,
                        dragPropagation: n,
                        onDragStart: s
                    } = this.getProps();
                    if (i && !n && (this.openDragLock && this.openDragLock(), this.openDragLock = function(t) {
                            if ("x" === t || "y" === t)
                                if (ta[t]) return null;
                                else return ta[t] = !0, () => {
                                    ta[t] = !1
                                };
                            return ta.x || ta.y ? null : (ta.x = ta.y = !0, () => {
                                ta.x = ta.y = !1
                            })
                        }(i), !this.openDragLock)) return;
                    this.latestPointerEvent = t, this.latestPanInfo = e, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), tS(t => {
                        let e = this.getAxisMotionValue(t).get() || 0;
                        if (tl.percent.test(e)) {
                            let {
                                projection: i
                            } = this.visualElement;
                            if (i && i.layout) {
                                let n = i.layout.layoutBox[t];
                                n && (e = tg(n) * (parseFloat(e) / 100))
                            }
                        }
                        this.originPoint[t] = e
                    }), s && tr.frame.postRender(() => s(t, e)), (0, tw.addValueToWillChange)(this.visualElement, "transform");
                    let {
                        animationState: r
                    } = this.visualElement;
                    r && r.setActive("whileDrag", !0)
                },
                o = (t, e) => {
                    this.latestPointerEvent = t, this.latestPanInfo = e;
                    let {
                        dragPropagation: i,
                        dragDirectionLock: n,
                        onDirectionLock: s,
                        onDrag: r
                    } = this.getProps();
                    if (!i && !this.openDragLock) return;
                    let {
                        offset: o
                    } = e;
                    if (n && null === this.currentDirection) {
                        this.currentDirection = function(t, e = 10) {
                            let i = null;
                            return Math.abs(t.y) > e ? i = "y" : Math.abs(t.x) > e && (i = "x"), i
                        }(o), null !== this.currentDirection && s && s(this.currentDirection);
                        return
                    }
                    this.updateAxis("x", e.point, o), this.updateAxis("y", e.point, o), this.visualElement.render(), r && r(t, e)
                },
                a = (t, e) => {
                    this.latestPointerEvent = t, this.latestPanInfo = e, this.stop(t, e), this.latestPointerEvent = null, this.latestPanInfo = null
                },
                l = () => tS(t => "paused" === this.getAnimationState(t) && this.getAxisMotionValue(t).animation ? .play()),
                {
                    dragSnapToOrigin: h
                } = this.getProps();
            this.panSession = new tR(t, {
                onSessionStart: s,
                onStart: r,
                onMove: o,
                onSessionEnd: a,
                resumeAnimation: l
            }, {
                transformPagePoint: this.visualElement.getTransformPagePoint(),
                dragSnapToOrigin: h,
                distanceThreshold: i,
                contextWindow: tD(this.visualElement)
            })
        }
        stop(t, e) {
            let i = t || this.latestPointerEvent,
                n = e || this.latestPanInfo,
                s = this.isDragging;
            if (this.cancel(), !s || !n || !i) return;
            let {
                velocity: r
            } = n;
            this.startAnimation(r);
            let {
                onDragEnd: o
            } = this.getProps();
            o && tr.frame.postRender(() => o(i, n))
        }
        cancel() {
            this.isDragging = !1;
            let {
                projection: t,
                animationState: e
            } = this.visualElement;
            t && (t.isAnimationBlocked = !1), this.panSession && this.panSession.end(), this.panSession = void 0;
            let {
                dragPropagation: i
            } = this.getProps();
            !i && this.openDragLock && (this.openDragLock(), this.openDragLock = null), e && e.setActive("whileDrag", !1)
        }
        updateAxis(t, e, i) {
            let {
                drag: n
            } = this.getProps();
            if (!i || !tz(t, n, this.currentDirection)) return;
            let s = this.getAxisMotionValue(t),
                r = this.originPoint[t] + i[t];
            this.constraints && this.constraints[t] && (r = function(t, {
                min: e,
                max: i
            }, n) {
                return void 0 !== e && t < e ? t = n ? (0, to.mixNumber)(e, t, n.min) : Math.max(t, e) : void 0 !== i && t > i && (t = n ? (0, to.mixNumber)(i, t, n.max) : Math.min(t, i)), t
            }(r, this.constraints[t], this.elastic[t])), s.set(r)
        }
        resolveConstraints() {
            let {
                dragConstraints: t,
                dragElastic: e
            } = this.getProps(), i = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection ? .layout, n = this.constraints;
            t && F(t) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : t && i ? this.constraints = function(t, {
                top: e,
                left: i,
                bottom: n,
                right: s
            }) {
                return {
                    x: tU(t.x, i, s),
                    y: tU(t.y, e, n)
                }
            }(i.layoutBox, t) : this.constraints = !1, this.elastic = function(t = .35) {
                return !1 === t ? t = 0 : !0 === t && (t = .35), {
                    x: tI(t, "left", "right"),
                    y: tI(t, "top", "bottom")
                }
            }(e), n !== this.constraints && i && this.constraints && !this.hasMutatedConstraints && tS(t => {
                var e, n;
                let s;
                !1 !== this.constraints && this.getAxisMotionValue(t) && (this.constraints[t] = (e = i.layoutBox[t], n = this.constraints[t], s = {}, void 0 !== n.min && (s.min = n.min - e.min), void 0 !== n.max && (s.max = n.max - e.min), s))
            })
        }
        resolveRefConstraints() {
            var t;
            let {
                dragConstraints: e,
                onMeasureDragConstraints: i
            } = this.getProps();
            if (!e || !F(e)) return !1;
            let n = e.current;
            (0, th.invariant)(null !== n, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
            let {
                projection: s
            } = this.visualElement;
            if (!s || !s.layout) return !1;
            let r = (0, tE.measurePageBox)(n, s.root, this.visualElement.getTransformPagePoint()),
                o = (t = s.layout.layoutBox, {
                    x: tF(t.x, r.x),
                    y: tF(t.y, r.y)
                });
            if (i) {
                let t = i((0, tf.convertBoxToBoundingBox)(o));
                this.hasMutatedConstraints = !!t, t && (o = (0, tf.convertBoundingBoxToBox)(t))
            }
            return o
        }
        startAnimation(t) {
            let {
                drag: e,
                dragMomentum: i,
                dragElastic: n,
                dragTransition: s,
                dragSnapToOrigin: r,
                onDragTransitionEnd: o
            } = this.getProps(), a = this.constraints || {};
            return Promise.all(tS(o => {
                if (!tz(o, e, this.currentDirection)) return;
                let l = a && a[o] || {};
                r && (l = {
                    min: 0,
                    max: 0
                });
                let h = {
                    type: "inertia",
                    velocity: i ? t[o] : 0,
                    bounceStiffness: n ? 200 : 1e6,
                    bounceDamping: n ? 40 : 1e7,
                    timeConstant: 750,
                    restDelta: 1,
                    restSpeed: 10,
                    ...s,
                    ...l
                };
                return this.startAxisValueAnimation(o, h)
            })).then(o)
        }
        startAxisValueAnimation(t, e) {
            let i = this.getAxisMotionValue(t);
            return (0, tw.addValueToWillChange)(this.visualElement, t), i.start((0, tu.animateMotionValue)(t, i, 0, e, this.visualElement, !1))
        }
        stopAnimation() {
            tS(t => this.getAxisMotionValue(t).stop())
        }
        pauseAnimation() {
            tS(t => this.getAxisMotionValue(t).animation ? .pause())
        }
        getAnimationState(t) {
            return this.getAxisMotionValue(t).animation ? .state
        }
        getAxisMotionValue(t) {
            let e = `_drag${t.toUpperCase()}`,
                i = this.visualElement.getProps();
            return i[e] || this.visualElement.getValue(t, (i.initial ? i.initial[t] : void 0) || 0)
        }
        snapToCursor(t) {
            tS(e => {
                let {
                    drag: i
                } = this.getProps();
                if (!tz(e, i, this.currentDirection)) return;
                let {
                    projection: n
                } = this.visualElement, s = this.getAxisMotionValue(e);
                if (n && n.layout) {
                    let {
                        min: i,
                        max: r
                    } = n.layout.layoutBox[e];
                    s.set(t[e] - (0, to.mixNumber)(i, r, .5))
                }
            })
        }
        scalePositionWithinConstraints() {
            if (!this.visualElement.current) return;
            let {
                drag: t,
                dragConstraints: e
            } = this.getProps(), {
                projection: i
            } = this.visualElement;
            if (!F(e) || !i || !this.constraints) return;
            this.stopAnimation();
            let n = {
                x: 0,
                y: 0
            };
            tS(t => {
                let e = this.getAxisMotionValue(t);
                if (e && !1 !== this.constraints) {
                    var i, s;
                    let r, o, a, l = e.get();
                    n[t] = (i = {
                        min: l,
                        max: l
                    }, s = this.constraints[t], r = .5, o = tg(i), (a = tg(s)) > o ? r = (0, tj.progress)(s.min, s.max - o, i.min) : o > a && (r = (0, tj.progress)(i.min, i.max - a, s.min)), (0, tO.clamp)(0, 1, r))
                }
            });
            let {
                transformTemplate: s
            } = this.visualElement.getProps();
            this.visualElement.current.style.transform = s ? s({}, "") : "none", i.root && i.root.updateScroll(), i.updateLayout(), this.resolveConstraints(), tS(e => {
                if (!tz(e, t, null)) return;
                let i = this.getAxisMotionValue(e),
                    {
                        min: s,
                        max: r
                    } = this.constraints[e];
                i.set((0, to.mixNumber)(s, r, n[e]))
            })
        }
        addListeners() {
            if (!this.visualElement.current) return;
            tH.set(this.visualElement, this);
            let t = tp(this.visualElement.current, "pointerdown", t => {
                    let {
                        drag: e,
                        dragListener: i = !0
                    } = this.getProps();
                    e && i && this.start(t)
                }),
                e = () => {
                    let {
                        dragConstraints: t
                    } = this.getProps();
                    F(t) && t.current && (this.constraints = this.resolveRefConstraints())
                },
                {
                    projection: i
                } = this.visualElement,
                n = i.addEventListener("measure", e);
            i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()), tr.frame.read(e);
            let s = tc(window, "resize", () => this.scalePositionWithinConstraints()),
                r = i.addEventListener("didUpdate", ({
                    delta: t,
                    hasLayoutChanged: e
                }) => {
                    this.isDragging && e && (tS(e => {
                        let i = this.getAxisMotionValue(e);
                        i && (this.originPoint[e] += t[e].translate, i.set(i.get() + t[e].translate))
                    }), this.visualElement.render())
                });
            return () => {
                s(), t(), n(), r && r()
            }
        }
        getProps() {
            let t = this.visualElement.getProps(),
                {
                    drag: e = !1,
                    dragDirectionLock: i = !1,
                    dragPropagation: n = !1,
                    dragConstraints: s = !1,
                    dragElastic: r = .35,
                    dragMomentum: o = !0
                } = t;
            return { ...t,
                drag: e,
                dragDirectionLock: i,
                dragPropagation: n,
                dragConstraints: s,
                dragElastic: r,
                dragMomentum: o
            }
        }
    }

    function tz(t, e, i) {
        return (!0 === e || e === t) && (null === i || i === t)
    }
    let t$ = t => (e, i) => {
        t && tr.frame.postRender(() => t(e, i))
    };
    var tG = t.i(468934),
        tX = e,
        tY = t.i(177426);
    let tq = {
        hasAnimatedSinceResize: !0,
        hasEverUpdated: !1
    };

    function tK(t, e) {
        return e.max === e.min ? 0 : t / (e.max - e.min) * 100
    }
    let tZ = {
        correct: (t, e) => {
            if (!e.target) return t;
            if ("string" == typeof t)
                if (!tl.px.test(t)) return t;
                else t = parseFloat(t);
            let i = tK(t, e.target.x),
                n = tK(t, e.target.y);
            return `${i}% ${n}%`
        }
    };
    var t_ = t.i(952072),
        tJ = t.i(101910);
    let tQ = !1;
    class t0 extends tX.Component {
        componentDidMount() {
            let {
                visualElement: t,
                layoutGroup: e,
                switchLayoutGroup: i,
                layoutId: n
            } = this.props, {
                projection: s
            } = t;
            (0, tJ.addScaleCorrector)(t3), s && (e.group && e.group.add(s), i && i.register && n && i.register(s), tQ && s.root.didUpdate(), s.addEventListener("animationComplete", () => {
                this.safeToRemove()
            }), s.setOptions({ ...s.options,
                onExitComplete: () => this.safeToRemove()
            })), tq.hasEverUpdated = !0
        }
        getSnapshotBeforeUpdate(t) {
            let {
                layoutDependency: e,
                visualElement: i,
                drag: n,
                isPresent: s
            } = this.props, {
                projection: r
            } = i;
            return r && (r.isPresent = s, tQ = !0, n || t.layoutDependency !== e || void 0 === e || t.isPresent !== s ? r.willUpdate() : this.safeToRemove(), t.isPresent !== s && (s ? r.promote() : r.relegate() || tr.frame.postRender(() => {
                let t = r.getStack();
                t && t.members.length || this.safeToRemove()
            }))), null
        }
        componentDidUpdate() {
            let {
                projection: t
            } = this.props.visualElement;
            t && (t.root.didUpdate(), tG.microtask.postRender(() => {
                !t.currentAnimation && t.isLead() && this.safeToRemove()
            }))
        }
        componentWillUnmount() {
            let {
                visualElement: t,
                layoutGroup: e,
                switchLayoutGroup: i
            } = this.props, {
                projection: n
            } = t;
            tQ = !0, n && (n.scheduleCheckAfterUnmount(), e && e.group && e.group.remove(n), i && i.deregister && i.deregister(n))
        }
        safeToRemove() {
            let {
                safeToRemove: t
            } = this.props;
            t && t()
        }
        render() {
            return null
        }
    }

    function t1(t) {
        let [e, i] = (0, tY.usePresence)(), n = (0, tX.useContext)(a.LayoutGroupContext);
        return (0, o.jsx)(t0, { ...t,
            layoutGroup: n,
            switchLayoutGroup: (0, tX.useContext)(N),
            isPresent: e,
            safeToRemove: i
        })
    }
    let t3 = {
        borderRadius: { ...tZ,
            applyTo: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"]
        },
        borderTopLeftRadius: tZ,
        borderTopRightRadius: tZ,
        borderBottomLeftRadius: tZ,
        borderBottomRightRadius: tZ,
        boxShadow: {
            correct: (t, {
                treeScale: e,
                projectionDelta: i
            }) => {
                let n = t_.complex.parse(t);
                if (n.length > 5) return t;
                let s = t_.complex.createTransformer(t),
                    r = +("number" != typeof n[0]),
                    o = i.x.scale * e.x,
                    a = i.y.scale * e.y;
                n[0 + r] /= o, n[1 + r] /= a;
                let l = (0, to.mixNumber)(o, a, .5);
                return "number" == typeof n[2 + r] && (n[2 + r] /= l), "number" == typeof n[3 + r] && (n[3 + r] /= l), s(n)
            }
        }
    };
    var t2 = t.i(383545),
        t5 = t.i(5421),
        t6 = t.i(17161),
        t4 = t.i(239622),
        t7 = t.i(995595),
        t9 = t.i(988221),
        t8 = t.i(813219),
        et = t.i(470180),
        ee = t.i(392661),
        ei = t.i(175807),
        en = t.i(133639);
    let es = (t, e) => t.depth - e.depth;
    class er {
        constructor() {
            this.children = [], this.isDirty = !1
        }
        add(t) {
            (0, en.addUniqueItem)(this.children, t), this.isDirty = !0
        }
        remove(t) {
            (0, en.removeItem)(this.children, t), this.isDirty = !0
        }
        forEach(t) {
            this.isDirty && this.children.sort(es), this.isDirty = !1, this.children.forEach(t)
        }
    }
    var eo = t.i(118744);
    let ea = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
        el = ea.length,
        eh = t => "string" == typeof t ? parseFloat(t) : t,
        eu = t => "number" == typeof t || tl.px.test(t);

    function ec(t, e) {
        return void 0 !== t[e] ? t[e] : t.borderRadius
    }
    let ed = ep(0, .5, eo.circOut),
        em = ep(.5, .95, ts.noop);

    function ep(t, e, i) {
        return n => n < t ? 0 : n > e ? 1 : i((0, tj.progress)(t, e, n))
    }

    function ef(t, e) {
        t.min = e.min, t.max = e.max
    }

    function eg(t, e) {
        ef(t.x, e.x), ef(t.y, e.y)
    }

    function ey(t, e) {
        t.translate = e.translate, t.scale = e.scale, t.originPoint = e.originPoint, t.origin = e.origin
    }
    var ev = t.i(22339);

    function ex(t, e, i, n, s) {
        return t -= e, t = (0, ev.scalePoint)(t, 1 / i, n), void 0 !== s && (t = (0, ev.scalePoint)(t, 1 / s, n)), t
    }

    function eP(t, e, [i, n, s], r, o) {
        ! function(t, e = 0, i = 1, n = .5, s, r = t, o = t) {
            if (tl.percent.test(e) && (e = parseFloat(e), e = (0, to.mixNumber)(o.min, o.max, e / 100) - o.min), "number" != typeof e) return;
            let a = (0, to.mixNumber)(r.min, r.max, n);
            t === r && (a -= e), t.min = ex(t.min, e, i, a, s), t.max = ex(t.max, e, i, a, s)
        }(t, e[i], e[n], e[s], e.scale, r, o)
    }
    let eT = ["x", "scaleX", "originX"],
        eA = ["y", "scaleY", "originY"];

    function eS(t, e, i, n) {
        eP(t.x, e, eT, i ? i.x : void 0, n ? n.x : void 0), eP(t.y, e, eA, i ? i.y : void 0, n ? n.y : void 0)
    }

    function eE(t) {
        return 0 === t.translate && 1 === t.scale
    }

    function eD(t) {
        return eE(t.x) && eE(t.y)
    }

    function ew(t, e) {
        return t.min === e.min && t.max === e.max
    }

    function eb(t, e) {
        return Math.round(t.min) === Math.round(e.min) && Math.round(t.max) === Math.round(e.max)
    }

    function eC(t, e) {
        return eb(t.x, e.x) && eb(t.y, e.y)
    }

    function eL(t) {
        return tg(t.x) / tg(t.y)
    }

    function eR(t, e) {
        return t.translate === e.translate && t.scale === e.scale && t.originPoint === e.originPoint
    }
    class ek {
        constructor() {
            this.members = []
        }
        add(t) {
            (0, en.addUniqueItem)(this.members, t), t.scheduleRender()
        }
        remove(t) {
            if ((0, en.removeItem)(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead) {
                let t = this.members[this.members.length - 1];
                t && this.promote(t)
            }
        }
        relegate(t) {
            let e, i = this.members.findIndex(e => t === e);
            if (0 === i) return !1;
            for (let t = i; t >= 0; t--) {
                let i = this.members[t];
                if (!1 !== i.isPresent) {
                    e = i;
                    break
                }
            }
            return !!e && (this.promote(e), !0)
        }
        promote(t, e) {
            let i = this.lead;
            if (t !== i && (this.prevLead = i, this.lead = t, t.show(), i)) {
                i.instance && i.scheduleRender(), t.scheduleRender(), t.resumeFrom = i, e && (t.resumeFrom.preserveOpacity = !0), i.snapshot && (t.snapshot = i.snapshot, t.snapshot.latestValues = i.animationValues || i.latestValues), t.root && t.root.isUpdating && (t.isLayoutDirty = !0);
                let {
                    crossfade: n
                } = t.options;
                !1 === n && i.hide()
            }
        }
        exitAnimationComplete() {
            this.members.forEach(t => {
                let {
                    options: e,
                    resumingFrom: i
                } = t;
                e.onExitComplete && e.onExitComplete(), i && i.options.onExitComplete && i.options.onExitComplete()
            })
        }
        scheduleRender() {
            this.members.forEach(t => {
                t.instance && t.scheduleRender(!1)
            })
        }
        removeLeadSnapshot() {
            this.lead && this.lead.snapshot && (this.lead.snapshot = void 0)
        }
    }
    var eV = t.i(208536);
    let eM = {
            nodes: 0,
            calculatedTargetDeltas: 0,
            calculatedProjections: 0
        },
        eB = ["", "X", "Y", "Z"],
        ej = 0;

    function eO(t, e, i, n) {
        let {
            latestValues: s
        } = e;
        s[t] && (i[t] = s[t], e.setStaticValue(t, 0), n && (n[t] = 0))
    }

    function eU({
        attachResizeListener: t,
        defaultParent: e,
        measureScroll: i,
        checkIsScrollRoot: n,
        resetTransform: s
    }) {
        return class {
            constructor(t = {}, i = e ? .()) {
                this.id = ej++, this.animationId = 0, this.animationCommitId = 0, this.children = new Set, this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = {
                    x: 1,
                    y: 1
                }, this.eventHandlers = new Map, this.hasTreeAnimated = !1, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
                    this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots())
                }, this.updateProjection = () => {
                    this.projectionUpdateScheduled = !1, t2.statsBuffer.value && (eM.nodes = eM.calculatedTargetDeltas = eM.calculatedProjections = 0), this.nodes.forEach(eN), this.nodes.forEach(eY), this.nodes.forEach(eq), this.nodes.forEach(eH), t2.statsBuffer.addProjectionMetrics && t2.statsBuffer.addProjectionMetrics(eM)
                }, this.resolvedRelativeTargetAt = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = new Map, this.latestValues = t, this.root = i ? i.root || i : this, this.path = i ? [...i.path, i] : [], this.parent = i, this.depth = i ? i.depth + 1 : 0;
                for (let t = 0; t < this.path.length; t++) this.path[t].shouldResetTransform = !0;
                this.root === this && (this.nodes = new er)
            }
            addEventListener(t, e) {
                return this.eventHandlers.has(t) || this.eventHandlers.set(t, new et.SubscriptionManager), this.eventHandlers.get(t).add(e)
            }
            notifyListeners(t, ...e) {
                let i = this.eventHandlers.get(t);
                i && i.notify(...e)
            }
            hasListeners(t) {
                return this.eventHandlers.has(t)
            }
            mount(e) {
                if (this.instance) return;
                this.isSVG = (0, t5.isSVGElement)(e) && !(0, t6.isSVGSVGElement)(e), this.instance = e;
                let {
                    layoutId: i,
                    layout: n,
                    visualElement: s
                } = this.options;
                if (s && !s.current && s.mount(e), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (n || i) && (this.isLayoutDirty = !0), t) {
                    let i, n = 0,
                        s = () => this.root.updateBlockedByResize = !1;
                    tr.frame.read(() => {
                        n = window.innerWidth
                    }), t(e, () => {
                        let t = window.innerWidth;
                        if (t !== n) {
                            let e, r;
                            n = t, this.root.updateBlockedByResize = !0, i && i(), e = t7.time.now(), r = ({
                                timestamp: t
                            }) => {
                                let i = t - e;
                                i >= 250 && ((0, tr.cancelFrame)(r), s(i - 250))
                            }, tr.frame.setup(r, !0), i = () => (0, tr.cancelFrame)(r), tq.hasAnimatedSinceResize && (tq.hasAnimatedSinceResize = !1, this.nodes.forEach(eX))
                        }
                    })
                }
                i && this.root.registerSharedNode(i, this), !1 !== this.options.animate && s && (i || n) && this.addEventListener("didUpdate", ({
                    delta: t,
                    hasLayoutChanged: e,
                    hasRelativeLayoutChanged: i,
                    layout: n
                }) => {
                    if (this.isTreeAnimationBlocked()) {
                        this.target = void 0, this.relativeTarget = void 0;
                        return
                    }
                    let r = this.options.transition || s.getDefaultTransition() || e0,
                        {
                            onLayoutAnimationStart: o,
                            onLayoutAnimationComplete: a
                        } = s.getProps(),
                        l = !this.targetLayout || !eC(this.targetLayout, n),
                        h = !e && i;
                    if (this.options.layoutRoot || this.resumeFrom || h || e && (l || !this.currentAnimation)) {
                        this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
                        let e = { ...(0, t4.getValueTransition)(r, "layout"),
                            onPlay: o,
                            onComplete: a
                        };
                        (s.shouldReduceMotion || this.options.layoutRoot) && (e.delay = 0, e.type = !1), this.startAnimation(e), this.setAnimationOrigin(t, h)
                    } else e || eX(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
                    this.targetLayout = n
                })
            }
            unmount() {
                this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
                let t = this.getStack();
                t && t.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), (0, tr.cancelFrame)(this.updateProjection)
            }
            blockUpdate() {
                this.updateManuallyBlocked = !0
            }
            unblockUpdate() {
                this.updateManuallyBlocked = !1
            }
            isUpdateBlocked() {
                return this.updateManuallyBlocked || this.updateBlockedByResize
            }
            isTreeAnimationBlocked() {
                return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1
            }
            startUpdate() {
                !this.isUpdateBlocked() && (this.isUpdating = !0, this.nodes && this.nodes.forEach(eK), this.animationId++)
            }
            getTransformTemplate() {
                let {
                    visualElement: t
                } = this.options;
                return t && t.getProps().transformTemplate
            }
            willUpdate(t = !0) {
                if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
                    this.options.onExitComplete && this.options.onExitComplete();
                    return
                }
                if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && function t(e) {
                        if (e.hasCheckedOptimisedAppear = !0, e.root === e) return;
                        let {
                            visualElement: i
                        } = e.options;
                        if (!i) return;
                        let n = (0, ei.getOptimisedAppearId)(i);
                        if (window.MotionHasOptimisedAnimation(n, "transform")) {
                            let {
                                layout: t,
                                layoutId: i
                            } = e.options;
                            window.MotionCancelOptimisedAnimation(n, "transform", tr.frame, !(t || i))
                        }
                        let {
                            parent: s
                        } = e;
                        s && !s.hasCheckedOptimisedAppear && t(s)
                    }(this), this.root.isUpdating || this.root.startUpdate(), this.isLayoutDirty) return;
                this.isLayoutDirty = !0;
                for (let t = 0; t < this.path.length; t++) {
                    let e = this.path[t];
                    e.shouldResetTransform = !0, e.updateScroll("snapshot"), e.options.layoutRoot && e.willUpdate(!1)
                }
                let {
                    layoutId: e,
                    layout: i
                } = this.options;
                if (void 0 === e && !i) return;
                let n = this.getTransformTemplate();
                this.prevTransformTemplateValue = n ? n(this.latestValues, "") : void 0, this.updateSnapshot(), t && this.notifyListeners("willUpdate")
            }
            update() {
                if (this.updateScheduled = !1, this.isUpdateBlocked()) {
                    this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(ez);
                    return
                }
                if (this.animationId <= this.animationCommitId) return void this.nodes.forEach(e$);
                this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(eG), this.nodes.forEach(eF), this.nodes.forEach(eI)) : this.nodes.forEach(e$), this.clearAllSnapshots();
                let t = t7.time.now();
                tr.frameData.delta = (0, tO.clamp)(0, 1e3 / 60, t - tr.frameData.timestamp), tr.frameData.timestamp = t, tr.frameData.isProcessing = !0, tr.frameSteps.update.process(tr.frameData), tr.frameSteps.preRender.process(tr.frameData), tr.frameSteps.render.process(tr.frameData), tr.frameData.isProcessing = !1
            }
            didUpdate() {
                this.updateScheduled || (this.updateScheduled = !0, tG.microtask.read(this.scheduleUpdate))
            }
            clearAllSnapshots() {
                this.nodes.forEach(eW), this.sharedNodes.forEach(eZ)
            }
            scheduleUpdateProjection() {
                this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, tr.frame.preRender(this.updateProjection, !1, !0))
            }
            scheduleCheckAfterUnmount() {
                tr.frame.postRender(() => {
                    this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed()
                })
            }
            updateSnapshot() {
                !this.snapshot && this.instance && (this.snapshot = this.measure(), !this.snapshot || tg(this.snapshot.measuredBox.x) || tg(this.snapshot.measuredBox.y) || (this.snapshot = void 0))
            }
            updateLayout() {
                if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)) return;
                if (this.resumeFrom && !this.resumeFrom.instance)
                    for (let t = 0; t < this.path.length; t++) this.path[t].updateScroll();
                let t = this.layout;
                this.layout = this.measure(!1), this.layoutCorrected = (0, tA.createBox)(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
                let {
                    visualElement: e
                } = this.options;
                e && e.notify("LayoutMeasure", this.layout.layoutBox, t ? t.layoutBox : void 0)
            }
            updateScroll(t = "measure") {
                let e = !!(this.options.layoutScroll && this.instance);
                if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === t && (e = !1), e && this.instance) {
                    let e = n(this.instance);
                    this.scroll = {
                        animationId: this.root.animationId,
                        phase: t,
                        isRoot: e,
                        offset: i(this.instance),
                        wasRoot: this.scroll ? this.scroll.isRoot : e
                    }
                }
            }
            resetTransform() {
                if (!s) return;
                let t = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout,
                    e = this.projectionDelta && !eD(this.projectionDelta),
                    i = this.getTransformTemplate(),
                    n = i ? i(this.latestValues, "") : void 0,
                    r = n !== this.prevTransformTemplateValue;
                t && this.instance && (e || (0, eV.hasTransform)(this.latestValues) || r) && (s(this.instance, n), this.shouldResetTransform = !1, this.scheduleRender())
            }
            measure(t = !0) {
                var e;
                let i = this.measurePageBox(),
                    n = this.removeElementScroll(i);
                return t && (n = this.removeTransform(n)), e2((e = n).x), e2(e.y), {
                    animationId: this.root.animationId,
                    measuredBox: i,
                    layoutBox: n,
                    latestValues: {},
                    source: this.id
                }
            }
            measurePageBox() {
                let {
                    visualElement: t
                } = this.options;
                if (!t) return (0, tA.createBox)();
                let e = t.measureViewportBox();
                if (!(this.scroll ? .wasRoot || this.path.some(e6))) {
                    let {
                        scroll: t
                    } = this.root;
                    t && ((0, ev.translateAxis)(e.x, t.offset.x), (0, ev.translateAxis)(e.y, t.offset.y))
                }
                return e
            }
            removeElementScroll(t) {
                let e = (0, tA.createBox)();
                if (eg(e, t), this.scroll ? .wasRoot) return e;
                for (let i = 0; i < this.path.length; i++) {
                    let n = this.path[i],
                        {
                            scroll: s,
                            options: r
                        } = n;
                    n !== this.root && s && r.layoutScroll && (s.wasRoot && eg(e, t), (0, ev.translateAxis)(e.x, s.offset.x), (0, ev.translateAxis)(e.y, s.offset.y))
                }
                return e
            }
            applyTransform(t, e = !1) {
                let i = (0, tA.createBox)();
                eg(i, t);
                for (let t = 0; t < this.path.length; t++) {
                    let n = this.path[t];
                    !e && n.options.layoutScroll && n.scroll && n !== n.root && (0, ev.transformBox)(i, {
                        x: -n.scroll.offset.x,
                        y: -n.scroll.offset.y
                    }), (0, eV.hasTransform)(n.latestValues) && (0, ev.transformBox)(i, n.latestValues)
                }
                return (0, eV.hasTransform)(this.latestValues) && (0, ev.transformBox)(i, this.latestValues), i
            }
            removeTransform(t) {
                let e = (0, tA.createBox)();
                eg(e, t);
                for (let t = 0; t < this.path.length; t++) {
                    let i = this.path[t];
                    if (!i.instance || !(0, eV.hasTransform)(i.latestValues)) continue;
                    (0, eV.hasScale)(i.latestValues) && i.updateSnapshot();
                    let n = (0, tA.createBox)();
                    eg(n, i.measurePageBox()), eS(e, i.latestValues, i.snapshot ? i.snapshot.layoutBox : void 0, n)
                }
                return (0, eV.hasTransform)(this.latestValues) && eS(e, this.latestValues), e
            }
            setTargetDelta(t) {
                this.targetDelta = t, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0
            }
            setOptions(t) {
                this.options = { ...this.options,
                    ...t,
                    crossfade: void 0 === t.crossfade || t.crossfade
                }
            }
            clearMeasurements() {
                this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1
            }
            forceRelativeParentToResolveTarget() {
                this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== tr.frameData.timestamp && this.relativeParent.resolveTargetDelta(!0)
            }
            resolveTargetDelta(t = !1) {
                let e = this.getLead();
                this.isProjectionDirty || (this.isProjectionDirty = e.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = e.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = e.isSharedProjectionDirty);
                let i = !!this.resumingFrom || this !== e;
                if (!(t || i && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent ? .isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize)) return;
                let {
                    layout: n,
                    layoutId: s
                } = this.options;
                if (this.layout && (n || s)) {
                    if (this.resolvedRelativeTargetAt = tr.frameData.timestamp, !this.targetDelta && !this.relativeTarget) {
                        let t = this.getClosestProjectingParent();
                        t && t.layout && 1 !== this.animationProgress ? (this.relativeParent = t, this.forceRelativeParentToResolveTarget(), this.relativeTarget = (0, tA.createBox)(), this.relativeTargetOrigin = (0, tA.createBox)(), tT(this.relativeTargetOrigin, this.layout.layoutBox, t.layout.layoutBox), eg(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0
                    }
                    if (this.relativeTarget || this.targetDelta) {
                        if (this.target || (this.target = (0, tA.createBox)(), this.targetWithTransforms = (0, tA.createBox)()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target) {
                            var r, o, a;
                            this.forceRelativeParentToResolveTarget(), r = this.target, o = this.relativeTarget, a = this.relativeParent.target, tx(r.x, o.x, a.x), tx(r.y, o.y, a.y)
                        } else this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : eg(this.target, this.layout.layoutBox), (0, ev.applyBoxDelta)(this.target, this.targetDelta)) : eg(this.target, this.layout.layoutBox);
                        if (this.attemptToResolveRelativeTarget) {
                            this.attemptToResolveRelativeTarget = !1;
                            let t = this.getClosestProjectingParent();
                            t && !!t.resumingFrom == !!this.resumingFrom && !t.options.layoutScroll && t.target && 1 !== this.animationProgress ? (this.relativeParent = t, this.forceRelativeParentToResolveTarget(), this.relativeTarget = (0, tA.createBox)(), this.relativeTargetOrigin = (0, tA.createBox)(), tT(this.relativeTargetOrigin, this.target, t.target), eg(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0
                        }
                        t2.statsBuffer.value && eM.calculatedTargetDeltas++
                    }
                }
            }
            getClosestProjectingParent() {
                if (!(!this.parent || (0, eV.hasScale)(this.parent.latestValues) || (0, eV.has2DTranslate)(this.parent.latestValues)))
                    if (this.parent.isProjecting()) return this.parent;
                    else return this.parent.getClosestProjectingParent()
            }
            isProjecting() {
                return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout)
            }
            calcProjection() {
                let t = this.getLead(),
                    e = !!this.resumingFrom || this !== t,
                    i = !0;
                if ((this.isProjectionDirty || this.parent ? .isProjectionDirty) && (i = !1), e && (this.isSharedProjectionDirty || this.isTransformDirty) && (i = !1), this.resolvedRelativeTargetAt === tr.frameData.timestamp && (i = !1), i) return;
                let {
                    layout: n,
                    layoutId: s
                } = this.options;
                if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(n || s)) return;
                eg(this.layoutCorrected, this.layout.layoutBox);
                let r = this.treeScale.x,
                    o = this.treeScale.y;
                (0, ev.applyTreeDeltas)(this.layoutCorrected, this.treeScale, this.path, e), t.layout && !t.target && (1 !== this.treeScale.x || 1 !== this.treeScale.y) && (t.target = t.layout.layoutBox, t.targetWithTransforms = (0, tA.createBox)());
                let {
                    target: a
                } = t;
                if (!a) {
                    this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
                    return
                }
                this.projectionDelta && this.prevProjectionDelta ? (ey(this.prevProjectionDelta.x, this.projectionDelta.x), ey(this.prevProjectionDelta.y, this.projectionDelta.y)) : this.createProjectionDeltas(), tv(this.projectionDelta, this.layoutCorrected, a, this.latestValues), this.treeScale.x === r && this.treeScale.y === o && eR(this.projectionDelta.x, this.prevProjectionDelta.x) && eR(this.projectionDelta.y, this.prevProjectionDelta.y) || (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", a)), t2.statsBuffer.value && eM.calculatedProjections++
            }
            hide() {
                this.isVisible = !1
            }
            show() {
                this.isVisible = !0
            }
            scheduleRender(t = !0) {
                if (this.options.visualElement ? .scheduleRender(), t) {
                    let t = this.getStack();
                    t && t.scheduleRender()
                }
                this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0)
            }
            createProjectionDeltas() {
                this.prevProjectionDelta = (0, tA.createDelta)(), this.projectionDelta = (0, tA.createDelta)(), this.projectionDeltaWithTransform = (0, tA.createDelta)()
            }
            setAnimationOrigin(t, e = !1) {
                let i, n = this.snapshot,
                    s = n ? n.latestValues : {},
                    r = { ...this.latestValues
                    },
                    o = (0, tA.createDelta)();
                this.relativeParent && this.relativeParent.options.layoutRoot || (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !e;
                let a = (0, tA.createBox)(),
                    l = (n ? n.source : void 0) !== (this.layout ? this.layout.source : void 0),
                    h = this.getStack(),
                    u = !h || h.members.length <= 1,
                    c = !!(l && !u && !0 === this.options.crossfade && !this.path.some(eQ));
                this.animationProgress = 0, this.mixTargetDelta = e => {
                    let n = e / 1e3;
                    if (e_(o.x, t.x, n), e_(o.y, t.y, n), this.setTargetDelta(o), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout) {
                        var h, d, m, p, f, g;
                        tT(a, this.layout.layoutBox, this.relativeParent.layout.layoutBox), m = this.relativeTarget, p = this.relativeTargetOrigin, f = a, g = n, eJ(m.x, p.x, f.x, g), eJ(m.y, p.y, f.y, g), i && (h = this.relativeTarget, d = i, ew(h.x, d.x) && ew(h.y, d.y)) && (this.isProjectionDirty = !1), i || (i = (0, tA.createBox)()), eg(i, this.relativeTarget)
                    }
                    l && (this.animationValues = r, function(t, e, i, n, s, r) {
                        s ? (t.opacity = (0, to.mixNumber)(0, i.opacity ? ? 1, ed(n)), t.opacityExit = (0, to.mixNumber)(e.opacity ? ? 1, 0, em(n))) : r && (t.opacity = (0, to.mixNumber)(e.opacity ? ? 1, i.opacity ? ? 1, n));
                        for (let s = 0; s < el; s++) {
                            let r = `border${ea[s]}Radius`,
                                o = ec(e, r),
                                a = ec(i, r);
                            (void 0 !== o || void 0 !== a) && (o || (o = 0), a || (a = 0), 0 === o || 0 === a || eu(o) === eu(a) ? (t[r] = Math.max((0, to.mixNumber)(eh(o), eh(a), n), 0), (tl.percent.test(a) || tl.percent.test(o)) && (t[r] += "%")) : t[r] = a)
                        }(e.rotate || i.rotate) && (t.rotate = (0, to.mixNumber)(e.rotate || 0, i.rotate || 0, n))
                    }(r, s, this.latestValues, n, c, u)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = n
                }, this.mixTargetDelta(1e3 * !!this.options.layoutRoot)
            }
            startAnimation(t) {
                this.notifyListeners("animationStart"), this.currentAnimation ? .stop(), this.resumingFrom ? .currentAnimation ? .stop(), this.pendingAnimation && ((0, tr.cancelFrame)(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = tr.frame.update(() => {
                    tq.hasAnimatedSinceResize = !0, t9.activeAnimations.layout++, this.motionValue || (this.motionValue = (0, t8.motionValue)(0)), this.currentAnimation = (0, ee.animateSingleValue)(this.motionValue, [0, 1e3], { ...t,
                        velocity: 0,
                        isSync: !0,
                        onUpdate: e => {
                            this.mixTargetDelta(e), t.onUpdate && t.onUpdate(e)
                        },
                        onStop: () => {
                            t9.activeAnimations.layout--
                        },
                        onComplete: () => {
                            t9.activeAnimations.layout--, t.onComplete && t.onComplete(), this.completeAnimation()
                        }
                    }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0
                })
            }
            completeAnimation() {
                this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
                let t = this.getStack();
                t && t.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete")
            }
            finishAnimation() {
                this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(1e3), this.currentAnimation.stop()), this.completeAnimation()
            }
            applyTransformsToTarget() {
                let t = this.getLead(),
                    {
                        targetWithTransforms: e,
                        target: i,
                        layout: n,
                        latestValues: s
                    } = t;
                if (e && i && n) {
                    if (this !== t && this.layout && n && e5(this.options.animationType, this.layout.layoutBox, n.layoutBox)) {
                        i = this.target || (0, tA.createBox)();
                        let e = tg(this.layout.layoutBox.x);
                        i.x.min = t.target.x.min, i.x.max = i.x.min + e;
                        let n = tg(this.layout.layoutBox.y);
                        i.y.min = t.target.y.min, i.y.max = i.y.min + n
                    }
                    eg(e, i), (0, ev.transformBox)(e, s), tv(this.projectionDeltaWithTransform, this.layoutCorrected, e, s)
                }
            }
            registerSharedNode(t, e) {
                this.sharedNodes.has(t) || this.sharedNodes.set(t, new ek), this.sharedNodes.get(t).add(e);
                let i = e.options.initialPromotionConfig;
                e.promote({
                    transition: i ? i.transition : void 0,
                    preserveFollowOpacity: i && i.shouldPreserveFollowOpacity ? i.shouldPreserveFollowOpacity(e) : void 0
                })
            }
            isLead() {
                let t = this.getStack();
                return !t || t.lead === this
            }
            getLead() {
                let {
                    layoutId: t
                } = this.options;
                return t && this.getStack() ? .lead || this
            }
            getPrevLead() {
                let {
                    layoutId: t
                } = this.options;
                return t ? this.getStack() ? .prevLead : void 0
            }
            getStack() {
                let {
                    layoutId: t
                } = this.options;
                if (t) return this.root.sharedNodes.get(t)
            }
            promote({
                needsReset: t,
                transition: e,
                preserveFollowOpacity: i
            } = {}) {
                let n = this.getStack();
                n && n.promote(this, i), t && (this.projectionDelta = void 0, this.needsReset = !0), e && this.setOptions({
                    transition: e
                })
            }
            relegate() {
                let t = this.getStack();
                return !!t && t.relegate(this)
            }
            resetSkewAndRotation() {
                let {
                    visualElement: t
                } = this.options;
                if (!t) return;
                let e = !1,
                    {
                        latestValues: i
                    } = t;
                if ((i.z || i.rotate || i.rotateX || i.rotateY || i.rotateZ || i.skewX || i.skewY) && (e = !0), !e) return;
                let n = {};
                i.z && eO("z", t, n, this.animationValues);
                for (let e = 0; e < eB.length; e++) eO(`rotate${eB[e]}`, t, n, this.animationValues), eO(`skew${eB[e]}`, t, n, this.animationValues);
                for (let e in t.render(), n) t.setStaticValue(e, n[e]), this.animationValues && (this.animationValues[e] = n[e]);
                t.scheduleRender()
            }
            applyProjectionStyles(t, e) {
                if (!this.instance || this.isSVG) return;
                if (!this.isVisible) {
                    t.visibility = "hidden";
                    return
                }
                let i = this.getTransformTemplate();
                if (this.needsReset) {
                    this.needsReset = !1, t.visibility = "", t.opacity = "", t.pointerEvents = k(e ? .pointerEvents) || "", t.transform = i ? i(this.latestValues, "") : "none";
                    return
                }
                let n = this.getLead();
                if (!this.projectionDelta || !this.layout || !n.target) {
                    this.options.layoutId && (t.opacity = void 0 !== this.latestValues.opacity ? this.latestValues.opacity : 1, t.pointerEvents = k(e ? .pointerEvents) || ""), this.hasProjected && !(0, eV.hasTransform)(this.latestValues) && (t.transform = i ? i({}, "") : "none", this.hasProjected = !1);
                    return
                }
                t.visibility = "";
                let s = n.animationValues || n.latestValues;
                this.applyTransformsToTarget();
                let r = function(t, e, i) {
                    let n = "",
                        s = t.x.translate / e.x,
                        r = t.y.translate / e.y,
                        o = i ? .z || 0;
                    if ((s || r || o) && (n = `translate3d(${s}px, ${r}px, ${o}px) `), (1 !== e.x || 1 !== e.y) && (n += `scale(${1/e.x}, ${1/e.y}) `), i) {
                        let {
                            transformPerspective: t,
                            rotate: e,
                            rotateX: s,
                            rotateY: r,
                            skewX: o,
                            skewY: a
                        } = i;
                        t && (n = `perspective(${t}px) ${n}`), e && (n += `rotate(${e}deg) `), s && (n += `rotateX(${s}deg) `), r && (n += `rotateY(${r}deg) `), o && (n += `skewX(${o}deg) `), a && (n += `skewY(${a}deg) `)
                    }
                    let a = t.x.scale * e.x,
                        l = t.y.scale * e.y;
                    return (1 !== a || 1 !== l) && (n += `scale(${a}, ${l})`), n || "none"
                }(this.projectionDeltaWithTransform, this.treeScale, s);
                i && (r = i(s, r)), t.transform = r;
                let {
                    x: o,
                    y: a
                } = this.projectionDelta;
                for (let e in t.transformOrigin = `${100*o.origin}% ${100*a.origin}% 0`, n.animationValues ? t.opacity = n === this ? s.opacity ? ? this.latestValues.opacity ? ? 1 : this.preserveOpacity ? this.latestValues.opacity : s.opacityExit : t.opacity = n === this ? void 0 !== s.opacity ? s.opacity : "" : void 0 !== s.opacityExit ? s.opacityExit : 0, tJ.scaleCorrectors) {
                    if (void 0 === s[e]) continue;
                    let {
                        correct: i,
                        applyTo: o,
                        isCSSVariable: a
                    } = tJ.scaleCorrectors[e], l = "none" === r ? s[e] : i(s[e], n);
                    if (o) {
                        let e = o.length;
                        for (let i = 0; i < e; i++) t[o[i]] = l
                    } else a ? this.options.visualElement.renderState.vars[e] = l : t[e] = l
                }
                this.options.layoutId && (t.pointerEvents = n === this ? k(e ? .pointerEvents) || "" : "none")
            }
            clearSnapshot() {
                this.resumeFrom = this.snapshot = void 0
            }
            resetTree() {
                this.root.nodes.forEach(t => t.currentAnimation ? .stop()), this.root.nodes.forEach(ez), this.root.sharedNodes.clear()
            }
        }
    }

    function eF(t) {
        t.updateLayout()
    }

    function eI(t) {
        let e = t.resumeFrom ? .snapshot || t.snapshot;
        if (t.isLead() && t.layout && e && t.hasListeners("didUpdate")) {
            let {
                layoutBox: i,
                measuredBox: n
            } = t.layout, {
                animationType: s
            } = t.options, r = e.source !== t.layout.source;
            "size" === s ? tS(t => {
                let n = r ? e.measuredBox[t] : e.layoutBox[t],
                    s = tg(n);
                n.min = i[t].min, n.max = n.min + s
            }) : e5(s, e.layoutBox, i) && tS(n => {
                let s = r ? e.measuredBox[n] : e.layoutBox[n],
                    o = tg(i[n]);
                s.max = s.min + o, t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = !0, t.relativeTarget[n].max = t.relativeTarget[n].min + o)
            });
            let o = (0, tA.createDelta)();
            tv(o, i, e.layoutBox);
            let a = (0, tA.createDelta)();
            r ? tv(a, t.applyTransform(n, !0), e.measuredBox) : tv(a, i, e.layoutBox);
            let l = !eD(o),
                h = !1;
            if (!t.resumeFrom) {
                let n = t.getClosestProjectingParent();
                if (n && !n.resumeFrom) {
                    let {
                        snapshot: s,
                        layout: r
                    } = n;
                    if (s && r) {
                        let o = (0, tA.createBox)();
                        tT(o, e.layoutBox, s.layoutBox);
                        let a = (0, tA.createBox)();
                        tT(a, i, r.layoutBox), eC(o, a) || (h = !0), n.options.layoutRoot && (t.relativeTarget = a, t.relativeTargetOrigin = o, t.relativeParent = n)
                    }
                }
            }
            t.notifyListeners("didUpdate", {
                layout: i,
                snapshot: e,
                delta: a,
                layoutDelta: o,
                hasLayoutChanged: l,
                hasRelativeLayoutChanged: h
            })
        } else if (t.isLead()) {
            let {
                onExitComplete: e
            } = t.options;
            e && e()
        }
        t.options.transition = void 0
    }

    function eN(t) {
        t2.statsBuffer.value && eM.nodes++, t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty), t.isSharedProjectionDirty || (t.isSharedProjectionDirty = !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty)), t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty))
    }

    function eH(t) {
        t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1
    }

    function eW(t) {
        t.clearSnapshot()
    }

    function ez(t) {
        t.clearMeasurements()
    }

    function e$(t) {
        t.isLayoutDirty = !1
    }

    function eG(t) {
        let {
            visualElement: e
        } = t.options;
        e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), t.resetTransform()
    }

    function eX(t) {
        t.finishAnimation(), t.targetDelta = t.relativeTarget = t.target = void 0, t.isProjectionDirty = !0
    }

    function eY(t) {
        t.resolveTargetDelta()
    }

    function eq(t) {
        t.calcProjection()
    }

    function eK(t) {
        t.resetSkewAndRotation()
    }

    function eZ(t) {
        t.removeLeadSnapshot()
    }

    function e_(t, e, i) {
        t.translate = (0, to.mixNumber)(e.translate, 0, i), t.scale = (0, to.mixNumber)(e.scale, 1, i), t.origin = e.origin, t.originPoint = e.originPoint
    }

    function eJ(t, e, i, n) {
        t.min = (0, to.mixNumber)(e.min, i.min, n), t.max = (0, to.mixNumber)(e.max, i.max, n)
    }

    function eQ(t) {
        return t.animationValues && void 0 !== t.animationValues.opacityExit
    }
    let e0 = {
            duration: .45,
            ease: [.4, 0, .1, 1]
        },
        e1 = t => "u" > typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t),
        e3 = e1("applewebkit/") && !e1("chrome/") ? Math.round : ts.noop;

    function e2(t) {
        t.min = e3(t.min), t.max = e3(t.max)
    }

    function e5(t, e, i) {
        return "position" === t || "preserve-aspect" === t && !(.2 >= Math.abs(eL(e) - eL(i)))
    }

    function e6(t) {
        return t !== t.root && t.scroll ? .wasRoot
    }
    let e4 = eU({
            attachResizeListener: (t, e) => tc(t, "resize", e),
            measureScroll: () => ({
                x: document.documentElement.scrollLeft || document.body.scrollLeft,
                y: document.documentElement.scrollTop || document.body.scrollTop
            }),
            checkIsScrollRoot: () => !0
        }),
        e7 = {
            current: void 0
        },
        e9 = eU({
            measureScroll: t => ({
                x: t.scrollLeft,
                y: t.scrollTop
            }),
            defaultParent: () => {
                if (!e7.current) {
                    let t = new e4({});
                    t.mount(window), t.setOptions({
                        layoutScroll: !0
                    }), e7.current = t
                }
                return e7.current
            },
            resetTransform: (t, e) => {
                t.style.transform = void 0 !== e ? e : "none"
            },
            checkIsScrollRoot: t => "fixed" === window.getComputedStyle(t).position
        });
    var e8 = t.i(225578);

    function it(t, e) {
        let i = (0, e8.resolveElements)(t),
            n = new AbortController;
        return [i, {
            passive: !0,
            ...e,
            signal: n.signal
        }, () => n.abort()]
    }

    function ie(t) {
        return !("touch" === t.pointerType || ta.x || ta.y)
    }

    function ii(t, e, i) {
        let {
            props: n
        } = t;
        t.animationState && n.whileHover && t.animationState.setActive("whileHover", "Start" === i);
        let s = n["onHover" + i];
        s && tr.frame.postRender(() => s(e, tm(e)))
    }
    var is = t.i(443390);
    let ir = (t, e) => !!e && (t === e || ir(t, e.parentElement)),
        io = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]),
        ia = new WeakSet;

    function il(t) {
        return e => {
            "Enter" === e.key && t(e)
        }
    }

    function ih(t, e) {
        t.dispatchEvent(new PointerEvent("pointer" + e, {
            isPrimary: !0,
            bubbles: !0
        }))
    }

    function iu(t) {
        return td(t) && !(ta.x || ta.y)
    }

    function ic(t, e, i) {
        let {
            props: n
        } = t;
        if (t.current instanceof HTMLButtonElement && t.current.disabled) return;
        t.animationState && n.whileTap && t.animationState.setActive("whileTap", "Start" === i);
        let s = n["onTap" + ("End" === i ? "" : i)];
        s && tr.frame.postRender(() => s(e, tm(e)))
    }
    let id = new WeakMap,
        im = new WeakMap,
        ip = t => {
            let e = id.get(t.target);
            e && e(t)
        },
        ig = t => {
            t.forEach(ip)
        },
        iy = {
            some: 0,
            all: 1
        },
        iv = function(t, e) {
            if ("u" < typeof Proxy) return W;
            let i = new Map,
                n = (i, n) => W(i, n, t, e);
            return new Proxy((t, e) => n(t, e), {
                get: (s, r) => "create" === r ? n : (i.has(r) || i.set(r, W(r, void 0, t, e)), i.get(r))
            })
        }({
            animation: {
                Feature: class extends ti {
                    constructor(t) {
                        super(t), t.animationState || (t.animationState = function(t) {
                            let e = e => Promise.all(e.map(({
                                    animation: e,
                                    options: i
                                }) => Y(t, e, i))),
                                i = te(),
                                n = !0,
                                s = e => (i, n) => {
                                    let s = (0, z.resolveVariant)(t, n, "exit" === e ? t.presenceContext ? .custom : void 0);
                                    if (s) {
                                        let {
                                            transition: t,
                                            transitionEnd: e,
                                            ...n
                                        } = s;
                                        i = { ...i,
                                            ...n,
                                            ...e
                                        }
                                    }
                                    return i
                                };

                            function r(r) {
                                let {
                                    props: o
                                } = t, a = function t(e) {
                                    if (!e) return;
                                    if (!e.isControllingVariants) {
                                        let i = e.parent && t(e.parent) || {};
                                        return void 0 !== e.props.initial && (i.initial = e.props.initial), i
                                    }
                                    let i = {};
                                    for (let t = 0; t < _; t++) {
                                        let n = Z.variantProps[t],
                                            s = e.props[n];
                                        ((0, d.isVariantLabel)(s) || !1 === s) && (i[n] = s)
                                    }
                                    return i
                                }(t.parent) || {}, l = [], h = new Set, u = {}, c = 1 / 0;
                                for (let e = 0; e < Q; e++) {
                                    var m, p;
                                    let f = J[e],
                                        g = i[f],
                                        y = void 0 !== o[f] ? o[f] : a[f],
                                        v = (0, d.isVariantLabel)(y),
                                        x = f === r ? g.isActive : null;
                                    !1 === x && (c = e);
                                    let P = y === a[f] && y !== o[f] && v;
                                    if (P && n && t.manuallyAnimateOnMount && (P = !1), g.protectedKeys = { ...u
                                        }, !g.isActive && null === x || !y && !g.prevProp || (0, b.isAnimationControls)(y) || "boolean" == typeof y) continue;
                                    let T = (m = g.prevProp, "string" == typeof(p = y) ? p !== m : !!Array.isArray(p) && !K(p, m)),
                                        A = T || f === r && g.isActive && !P && v || e > c && v,
                                        S = !1,
                                        E = Array.isArray(y) ? y : [y],
                                        D = E.reduce(s(f), {});
                                    !1 === x && (D = {});
                                    let {
                                        prevResolvedValues: w = {}
                                    } = g, C = { ...w,
                                        ...D
                                    }, L = e => {
                                        A = !0, h.has(e) && (S = !0, h.delete(e)), g.needsAnimating[e] = !0;
                                        let i = t.getValue(e);
                                        i && (i.liveStyle = !1)
                                    };
                                    for (let t in C) {
                                        let e = D[t],
                                            i = w[t];
                                        if (!u.hasOwnProperty(t))((0, q.isKeyframesTarget)(e) && (0, q.isKeyframesTarget)(i) ? K(e, i) : e === i) ? void 0 !== e && h.has(t) ? L(t) : g.protectedKeys[t] = !0 : null != e ? L(t) : h.add(t)
                                    }
                                    g.prevProp = y, g.prevResolvedValues = D, g.isActive && (u = { ...u,
                                        ...D
                                    }), n && t.blockInitialAnimation && (A = !1);
                                    let R = P && T,
                                        k = !R || S;
                                    A && k && l.push(...E.map(e => {
                                        let i = {
                                            type: f
                                        };
                                        if ("string" == typeof e && n && !R && t.manuallyAnimateOnMount && t.parent) {
                                            let {
                                                parent: n
                                            } = t, s = (0, z.resolveVariant)(n, e);
                                            if (n.enteringChildren && s) {
                                                let {
                                                    delayChildren: e
                                                } = s.transition || {};
                                                i.delay = G(n.enteringChildren, t, e)
                                            }
                                        }
                                        return {
                                            animation: e,
                                            options: i
                                        }
                                    }))
                                }
                                if (h.size) {
                                    let e = {};
                                    if ("boolean" != typeof o.initial) {
                                        let i = (0, z.resolveVariant)(t, Array.isArray(o.initial) ? o.initial[0] : o.initial);
                                        i && i.transition && (e.transition = i.transition)
                                    }
                                    h.forEach(i => {
                                        let n = t.getBaseTarget(i),
                                            s = t.getValue(i);
                                        s && (s.liveStyle = !0), e[i] = n ? ? null
                                    }), l.push({
                                        animation: e
                                    })
                                }
                                let f = !!l.length;
                                return n && (!1 === o.initial || o.initial === o.animate) && !t.manuallyAnimateOnMount && (f = !1), n = !1, f ? e(l) : Promise.resolve()
                            }
                            return {
                                animateChanges: r,
                                setActive: function(e, n) {
                                    if (i[e].isActive === n) return Promise.resolve();
                                    t.variantChildren ? .forEach(t => t.animationState ? .setActive(e, n)), i[e].isActive = n;
                                    let s = r(e);
                                    for (let t in i) i[t].protectedKeys = {};
                                    return s
                                },
                                setAnimateFunction: function(i) {
                                    e = i(t)
                                },
                                getState: () => i,
                                reset: () => {
                                    i = te(), n = !0
                                }
                            }
                        }(t))
                    }
                    updateAnimationControlsSubscription() {
                        let {
                            animate: t
                        } = this.node.getProps();
                        (0, b.isAnimationControls)(t) && (this.unmountControls = t.subscribe(this.node))
                    }
                    mount() {
                        this.updateAnimationControlsSubscription()
                    }
                    update() {
                        let {
                            animate: t
                        } = this.node.getProps(), {
                            animate: e
                        } = this.node.prevProps || {};
                        t !== e && this.updateAnimationControlsSubscription()
                    }
                    unmount() {
                        this.node.animationState.reset(), this.unmountControls ? .()
                    }
                }
            },
            exit: {
                Feature: class extends ti {
                    constructor() {
                        super(...arguments), this.id = tn++
                    }
                    update() {
                        if (!this.node.presenceContext) return;
                        let {
                            isPresent: t,
                            onExitComplete: e
                        } = this.node.presenceContext, {
                            isPresent: i
                        } = this.node.prevPresenceContext || {};
                        if (!this.node.animationState || t === i) return;
                        let n = this.node.animationState.setActive("exit", !t);
                        e && !t && n.then(() => {
                            e(this.id)
                        })
                    }
                    mount() {
                        let {
                            register: t,
                            onExitComplete: e
                        } = this.node.presenceContext || {};
                        e && e(this.id), t && (this.unmount = t(this.id))
                    }
                    unmount() {}
                }
            },
            inView: {
                Feature: class extends ti {
                    constructor() {
                        super(...arguments), this.hasEnteredView = !1, this.isInView = !1
                    }
                    startObserver() {
                        var t;
                        let e;
                        this.unmount();
                        let {
                            viewport: i = {}
                        } = this.node.getProps(), {
                            root: n,
                            margin: s,
                            amount: r = "some",
                            once: o
                        } = i, a = {
                            root: n ? n.current : void 0,
                            rootMargin: s,
                            threshold: "number" == typeof r ? r : iy[r]
                        }, l = t => {
                            let {
                                isIntersecting: e
                            } = t;
                            if (this.isInView === e || (this.isInView = e, o && !e && this.hasEnteredView)) return;
                            e && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", e);
                            let {
                                onViewportEnter: i,
                                onViewportLeave: n
                            } = this.node.getProps(), s = e ? i : n;
                            s && s(t)
                        };
                        return t = this.node.current, e = function({
                            root: t,
                            ...e
                        }) {
                            let i = t || document;
                            im.has(i) || im.set(i, {});
                            let n = im.get(i),
                                s = JSON.stringify(e);
                            return n[s] || (n[s] = new IntersectionObserver(ig, {
                                root: t,
                                ...e
                            })), n[s]
                        }(a), id.set(t, l), e.observe(t), () => {
                            id.delete(t), e.unobserve(t)
                        }
                    }
                    mount() {
                        this.startObserver()
                    }
                    update() {
                        if ("u" < typeof IntersectionObserver) return;
                        let {
                            props: t,
                            prevProps: e
                        } = this.node;
                        ["amount", "margin", "root"].some(function({
                            viewport: t = {}
                        }, {
                            viewport: e = {}
                        } = {}) {
                            return i => t[i] !== e[i]
                        }(t, e)) && this.startObserver()
                    }
                    unmount() {}
                }
            },
            tap: {
                Feature: class extends ti {
                    mount() {
                        let {
                            current: t
                        } = this.node;
                        t && (this.unmount = function(t, e, i = {}) {
                            let [n, s, r] = it(t, i), o = t => {
                                let n = t.currentTarget;
                                if (!iu(t)) return;
                                ia.add(n);
                                let r = e(n, t),
                                    o = (t, e) => {
                                        window.removeEventListener("pointerup", a), window.removeEventListener("pointercancel", l), ia.has(n) && ia.delete(n), iu(t) && "function" == typeof r && r(t, {
                                            success: e
                                        })
                                    },
                                    a = t => {
                                        o(t, n === window || n === document || i.useGlobalTarget || ir(n, t.target))
                                    },
                                    l = t => {
                                        o(t, !1)
                                    };
                                window.addEventListener("pointerup", a, s), window.addEventListener("pointercancel", l, s)
                            };
                            return n.forEach(t => {
                                ((i.useGlobalTarget ? window : t).addEventListener("pointerdown", o, s), (0, is.isHTMLElement)(t)) && (t.addEventListener("focus", t => ((t, e) => {
                                    let i = t.currentTarget;
                                    if (!i) return;
                                    let n = il(() => {
                                        if (ia.has(i)) return;
                                        ih(i, "down");
                                        let t = il(() => {
                                            ih(i, "up")
                                        });
                                        i.addEventListener("keyup", t, e), i.addEventListener("blur", () => ih(i, "cancel"), e)
                                    });
                                    i.addEventListener("keydown", n, e), i.addEventListener("blur", () => i.removeEventListener("keydown", n), e)
                                })(t, s)), io.has(t.tagName) || -1 !== t.tabIndex || t.hasAttribute("tabindex") || (t.tabIndex = 0))
                            }), r
                        }(t, (t, e) => (ic(this.node, e, "Start"), (t, {
                            success: e
                        }) => ic(this.node, t, e ? "End" : "Cancel")), {
                            useGlobalTarget: this.node.props.globalTapTarget
                        }))
                    }
                    unmount() {}
                }
            },
            focus: {
                Feature: class extends ti {
                    constructor() {
                        super(...arguments), this.isActive = !1
                    }
                    onFocus() {
                        let t = !1;
                        try {
                            t = this.node.current.matches(":focus-visible")
                        } catch (e) {
                            t = !0
                        }
                        t && this.node.animationState && (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0)
                    }
                    onBlur() {
                        this.isActive && this.node.animationState && (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1)
                    }
                    mount() {
                        this.unmount = (0, tb.pipe)(tc(this.node.current, "focus", () => this.onFocus()), tc(this.node.current, "blur", () => this.onBlur()))
                    }
                    unmount() {}
                }
            },
            hover: {
                Feature: class extends ti {
                    mount() {
                        let {
                            current: t
                        } = this.node;
                        t && (this.unmount = function(t, e, i = {}) {
                            let [n, s, r] = it(t, i), o = t => {
                                if (!ie(t)) return;
                                let {
                                    target: i
                                } = t, n = e(i, t);
                                if ("function" != typeof n || !i) return;
                                let r = t => {
                                    ie(t) && (n(t), i.removeEventListener("pointerleave", r))
                                };
                                i.addEventListener("pointerleave", r, s)
                            };
                            return n.forEach(t => {
                                t.addEventListener("pointerenter", o, s)
                            }), r
                        }(t, (t, e) => (ii(this.node, e, "Start"), t => ii(this.node, t, "End"))))
                    }
                    unmount() {}
                }
            },
            pan: {
                Feature: class extends ti {
                    constructor() {
                        super(...arguments), this.removePointerDownListener = ts.noop
                    }
                    onPointerDown(t) {
                        this.session = new tR(t, this.createPanHandlers(), {
                            transformPagePoint: this.node.getTransformPagePoint(),
                            contextWindow: tD(this.node)
                        })
                    }
                    createPanHandlers() {
                        let {
                            onPanSessionStart: t,
                            onPanStart: e,
                            onPan: i,
                            onPanEnd: n
                        } = this.node.getProps();
                        return {
                            onSessionStart: t$(t),
                            onStart: t$(e),
                            onMove: i,
                            onEnd: (t, e) => {
                                delete this.session, n && tr.frame.postRender(() => n(t, e))
                            }
                        }
                    }
                    mount() {
                        this.removePointerDownListener = tp(this.node.current, "pointerdown", t => this.onPointerDown(t))
                    }
                    update() {
                        this.session && this.session.updateHandlers(this.createPanHandlers())
                    }
                    unmount() {
                        this.removePointerDownListener(), this.session && this.session.end()
                    }
                }
            },
            drag: {
                Feature: class extends ti {
                    constructor(t) {
                        super(t), this.removeGroupControls = ts.noop, this.removeListeners = ts.noop, this.controls = new tW(t)
                    }
                    mount() {
                        let {
                            dragControls: t
                        } = this.node.getProps();
                        t && (this.removeGroupControls = t.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || ts.noop
                    }
                    unmount() {
                        this.removeGroupControls(), this.removeListeners()
                    }
                },
                ProjectionNode: e9,
                MeasureLayout: t1
            },
            layout: {
                ProjectionNode: e9,
                MeasureLayout: t1
            }
        }, (t, s) => r(t) ? new n.SVGVisualElement(s) : new i.HTMLVisualElement(s, {
            allowProjection: t !== e.Fragment
        }));
    t.s(["motion", () => iv], 534026)
}]);

//# debugId=33ec2aea-831c-252f-692e-11650d31c215
//# sourceMappingURL=ae6e1ba1db7bd1f2.js.map