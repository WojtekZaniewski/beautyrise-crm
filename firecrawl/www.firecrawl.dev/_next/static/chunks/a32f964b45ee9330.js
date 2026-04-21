;
! function() {
    try {
        var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {},
            n = (new e.Error).stack;
        n && ((e._debugIds || (e._debugIds = {}))[n] = "01e4fbfc-9c06-14c1-3a36-cb5f88e88cab")
    } catch (e) {}
}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 131547, e => {
    "use strict";
    var t = e.i(253719),
        a = e.i(420851);
    e.s(["default", 0, function({ ...e
    }) {
        return (0, t.jsxs)("div", { ...e,
            className: (0, a.cn)(e.className, "flex gap-10 bg-background-base relative w-max pb-16 items-center text-label-x-small"),
            children: [(0, t.jsx)("div", {
                className: "h-1 bottom-0 absolute w-full left-0 bg-border-faint"
            }), (0, t.jsx)("div", {
                className: "text-black-alpha-16 pointer-events-none select-none",
                children: "//"
            }), (0, t.jsx)("div", {
                className: "relative flex gap-10 items-center",
                children: e.children
            }), (0, t.jsx)("div", {
                className: "text-black-alpha-16 pointer-events-none select-none -scale-x-100",
                children: "//"
            })]
        })
    }])
}, 430369, e => {
    "use strict";
    var t = e.i(253719),
        a = e.i(134841),
        s = e.i(420851);

    function i({
        className: e
    }) {
        return (0, t.jsxs)(a.default, {
            href: "/agent-onboarding/SKILL.md",
            className: (0, s.cn)("mt-16 inline-flex items-center justify-center gap-4 text-body-small text-black-alpha-40 hover:text-heat-100 transition-colors", e),
            children: ["Are you an AI agent? Get an API key here", (0, t.jsx)("svg", {
                width: "14",
                height: "14",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2.5",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: (0, t.jsx)("path", {
                    d: "M9 18l6-6-6-6"
                })
            })]
        })
    }
    e.s(["default", () => i])
}, 171350, e => {
    "use strict";
    var t = e.i(253719),
        a = e.i(730592),
        s = e.i(219721),
        i = e.i(323576),
        r = e.i(825489),
        l = e.i(420851),
        n = e.i(296809),
        o = e.i(451743);
    let d = "Geist Mono, monospace",
        c = "#FA5D19";

    function u({
        variant: e = 0
    }) {
        let u = (0, a.useRef)(null),
            h = (0, a.useRef)(null),
            m = 1 === e ? o.default : s.default;
        return (0, a.useEffect)(() => {
            if (!u.current) return;
            let {
                ctx: e,
                textWidth: t,
                textHeight: a
            } = (0, r.setupAsciiCanvas)(u.current, m[0], 8, 10, d);
            (0, r.renderAsciiFrame)(e, m[0], t, a, 8, 10, d, c);
            let s = 0,
                i = (0, n.setIntervalOnVisible)({
                    element: h.current,
                    callback: () => {
                        ++s >= m.length && (s = 0), (0, r.renderAsciiFrame)(e, m[s], t, a, 8, 10, d, c)
                    },
                    interval: 85
                });
            return () => i ? .()
        }, [m]), (0, t.jsxs)("div", {
            className: (0, l.cn)("pointer-events-none select-none p-10 lg-max:absolute lg-max:bottom-0 lg-max:left-0 lg-max:w-full lg-max:h-214", 0 === e && "lg:relative"),
            ref: h,
            children: [(0, t.jsx)(i.default, {
                className: "h-214 lg-max:hidden w-full absolute bottom-0 left-0",
                allSides: !0
            }), (0, t.jsx)("div", {
                className: (0, l.cn)("overflow-hidden", 0 === e ? "relative h-193" : "absolute inset-10"),
                children: (0, t.jsx)("canvas", {
                    className: (0, l.cn)("fc-decoration", 0 === e ? "-bottom-10 center-x" : "absolute cw-462 -bottom-81"),
                    ref: u
                })
            })]
        })
    }
    e.s(["default", () => u])
}, 842744, e => {
    "use strict";
    let t = (e = 21) => {
        let t = "",
            a = crypto.getRandomValues(new Uint8Array(e |= 0));
        for (; e--;) t += "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict" [63 & a[e]];
        return t
    };
    e.s(["nanoid", () => t], 842744)
}, 631053, 945549, e => {
    "use strict";
    var t = e.i(307524),
        a = e.i(297294);
    let s = {};

    function i(e, i, r) {
        let l = 0x811c9dc5;
        for (let t = 0; t < i; t++) l ^= e[t].uid, l = Math.imul(l, 0x1000193) >>> 0;
        return s[l] || function(e, i, r, l) {
            let n = {},
                o = 0;
            for (let t = 0; t < l; t++) {
                let s = t < i ? e[t] : a.Texture.EMPTY.source;
                n[o++] = s.source, n[o++] = s.style
            }
            let d = new t.BindGroup(n);
            return s[r] = d, d
        }(e, i, l, r)
    }
    e.s(["getTextureBatchBindGroup", () => i], 631053);
    var r = e.i(69203),
        l = e.i(561714);
    let n = new class {
        constructor(e) {
            this._canvasPool = Object.create(null), this.canvasOptions = e || {}, this.enableFullScreen = !1
        }
        _createCanvasAndContext(e, t) {
            let a = r.DOMAdapter.get().createCanvas();
            a.width = e, a.height = t;
            let s = a.getContext("2d");
            return {
                canvas: a,
                context: s
            }
        }
        getOptimalCanvasAndContext(e, t, a = 1) {
            e = Math.ceil(e * a - 1e-6), t = Math.ceil(t * a - 1e-6), e = (0, l.nextPow2)(e), t = (0, l.nextPow2)(t);
            let s = (e << 17) + (t << 1);
            this._canvasPool[s] || (this._canvasPool[s] = []);
            let i = this._canvasPool[s].pop();
            return i || (i = this._createCanvasAndContext(e, t)), i
        }
        returnCanvasAndContext(e) {
            let {
                width: t,
                height: a
            } = e.canvas, s = (t << 17) + (a << 1);
            e.context.resetTransform(), e.context.clearRect(0, 0, t, a), this._canvasPool[s].push(e)
        }
        clear() {
            this._canvasPool = {}
        }
    };
    e.s(["CanvasPool", () => n], 945549)
}, 887301, 684054, 902902, 639751, 794709, 936686, e => {
    "use strict";
    let t;
    var a, s = e.i(307301),
        i = e.i(883771);
    let r = [];
    async function l(e) {
        if (!e)
            for (let e = 0; e < r.length; e++) {
                let t = r[e];
                if (t.value.test()) return void await t.value.load()
            }
    }
    i.extensions.handleByNamedList(i.ExtensionType.Environment, r);
    var n = e.i(402991);

    function o() {
        if ("boolean" == typeof t) return t;
        try {
            let e = Function("param1", "param2", "param3", "return param1[param2] === param3;");
            t = !0 === e({
                a: "b"
            }, "a", "b")
        } catch (e) {
            t = !1
        }
        return t
    }
    e.s(["unsafeEvalSupported", () => o], 684054);
    var d = e.i(526078),
        c = e.i(373839),
        u = ((a = u || {})[a.NONE = 0] = "NONE", a[a.COLOR = 16384] = "COLOR", a[a.STENCIL = 1024] = "STENCIL", a[a.DEPTH = 256] = "DEPTH", a[a.COLOR_DEPTH = 16640] = "COLOR_DEPTH", a[a.COLOR_STENCIL = 17408] = "COLOR_STENCIL", a[a.DEPTH_STENCIL = 1280] = "DEPTH_STENCIL", a[a.ALL = 17664] = "ALL", a);
    e.s(["CLEAR", () => u], 902902);
    class h {
        constructor(e) {
            this.items = [], this._name = e
        }
        emit(e, t, a, s, i, r, l, n) {
            let {
                name: o,
                items: d
            } = this;
            for (let c = 0, u = d.length; c < u; c++) d[c][o](e, t, a, s, i, r, l, n);
            return this
        }
        add(e) {
            return e[this._name] && (this.remove(e), this.items.push(e)), this
        }
        remove(e) {
            let t = this.items.indexOf(e);
            return -1 !== t && this.items.splice(t, 1), this
        }
        contains(e) {
            return -1 !== this.items.indexOf(e)
        }
        removeAll() {
            return this.items.length = 0, this
        }
        destroy() {
            this.removeAll(), this.items = null, this._name = null
        }
        get empty() {
            return 0 === this.items.length
        }
        get name() {
            return this._name
        }
    }
    e.s(["SystemRunner", () => h], 639751);
    var m = e.i(785373);
    let x = ["init", "destroy", "contextChange", "resolutionChange", "resetState", "renderEnd", "renderStart", "render", "update", "postrender", "prerender"],
        p = class e extends m.default {
            constructor(e) {
                super(), this.uid = (0, d.uid)("renderer"), this.runners = Object.create(null), this.renderPipes = Object.create(null), this._initOptions = {}, this._systemsHash = Object.create(null), this.type = e.type, this.name = e.name, this.config = e;
                const t = [...x, ...this.config.runners ? ? []];
                this._addRunners(...t), this._unsafeEvalCheck()
            }
            async init(t = {}) {
                let a = !0 === t.skipExtensionImports || !1 === t.manageImports;
                for (let e in await l(a), this._addSystems(this.config.systems), this._addPipes(this.config.renderPipes, this.config.renderPipeAdaptors), this._systemsHash) t = { ...this._systemsHash[e].constructor.defaultOptions,
                    ...t
                };
                t = { ...e.defaultOptions,
                    ...t
                }, this._roundPixels = +!!t.roundPixels;
                for (let e = 0; e < this.runners.init.items.length; e++) await this.runners.init.items[e].init(t);
                this._initOptions = t
            }
            render(e, t) {
                let a = e;
                if (a instanceof n.Container && (a = {
                        container: a
                    }, t && ((0, c.deprecation)(c.v8_0_0, "passing a second argument is deprecated, please use render options instead"), a.target = t.renderTexture)), a.target || (a.target = this.view.renderTarget), a.target === this.view.renderTarget && (this._lastObjectRendered = a.container, a.clearColor ? ? (a.clearColor = this.background.colorRgba), a.clear ? ? (a.clear = this.background.clearBeforeRender)), a.clearColor) {
                    let e = Array.isArray(a.clearColor) && 4 === a.clearColor.length;
                    a.clearColor = e ? a.clearColor : s.Color.shared.setValue(a.clearColor).toArray()
                }
                a.transform || (a.container.updateLocalTransform(), a.transform = a.container.localTransform), a.container.enableRenderGroup(), this.runners.prerender.emit(a), this.runners.renderStart.emit(a), this.runners.render.emit(a), this.runners.renderEnd.emit(a), this.runners.postrender.emit(a)
            }
            resize(e, t, a) {
                let s = this.view.resolution;
                this.view.resize(e, t, a), this.emit("resize", this.view.screen.width, this.view.screen.height, this.view.resolution), void 0 !== a && a !== s && this.runners.resolutionChange.emit(a)
            }
            clear(e = {}) {
                e.target || (e.target = this.renderTarget.renderTarget), e.clearColor || (e.clearColor = this.background.colorRgba), e.clear ? ? (e.clear = u.ALL);
                let {
                    clear: t,
                    clearColor: a,
                    target: i
                } = e;
                s.Color.shared.setValue(a ? ? this.background.colorRgba), this.renderTarget.clear(i, t, s.Color.shared.toArray())
            }
            get resolution() {
                return this.view.resolution
            }
            set resolution(e) {
                this.view.resolution = e, this.runners.resolutionChange.emit(e)
            }
            get width() {
                return this.view.texture.frame.width
            }
            get height() {
                return this.view.texture.frame.height
            }
            get canvas() {
                return this.view.canvas
            }
            get lastObjectRendered() {
                return this._lastObjectRendered
            }
            get renderingToScreen() {
                return this.renderTarget.renderingToScreen
            }
            get screen() {
                return this.view.screen
            }
            _addRunners(...e) {
                e.forEach(e => {
                    this.runners[e] = new h(e)
                })
            }
            _addSystems(e) {
                let t;
                for (t in e) {
                    let a = e[t];
                    this._addSystem(a.value, a.name)
                }
            }
            _addSystem(e, t) {
                let a = new e(this);
                if (this[t]) throw Error(`Whoops! The name "${t}" is already in use`);
                for (let e in this[t] = a, this._systemsHash[t] = a, this.runners) this.runners[e].add(a);
                return this
            }
            _addPipes(e, t) {
                let a = t.reduce((e, t) => (e[t.name] = t.value, e), {});
                e.forEach(e => {
                    let t = e.value,
                        s = e.name,
                        i = a[s];
                    this.renderPipes[s] = new t(this, i ? new i : null)
                })
            }
            destroy(e = !1) {
                this.runners.destroy.items.reverse(), this.runners.destroy.emit(e), Object.values(this.runners).forEach(e => {
                    e.destroy()
                }), this._systemsHash = null, this.renderPipes = null
            }
            generateTexture(e) {
                return this.textureGenerator.generateTexture(e)
            }
            get roundPixels() {
                return !!this._roundPixels
            }
            _unsafeEvalCheck() {
                if (!o()) throw Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")
            }
            resetState() {
                this.runners.resetState.emit()
            }
        };
    p.defaultOptions = {
        resolution: 1,
        failIfMajorPerformanceCaveat: !1,
        roundPixels: !1
    }, e.s(["AbstractRenderer", () => p], 887301);
    let f = "8.11.0";
    e.s(["VERSION", () => f], 794709);
    class g {
        static init() {
            globalThis.__PIXI_APP_INIT__ ? .(this, f)
        }
        static destroy() {}
    }
    g.extension = i.ExtensionType.Application;
    class b {
        constructor(e) {
            this._renderer = e
        }
        init() {
            globalThis.__PIXI_RENDERER_INIT__ ? .(this._renderer, f)
        }
        destroy() {
            this._renderer = null
        }
    }
    b.extension = {
        type: [i.ExtensionType.WebGLSystem, i.ExtensionType.WebGPUSystem],
        name: "initHook",
        priority: -10
    }, e.s(["ApplicationInitHook", () => g, "RendererInitHook", () => b], 936686)
}, 967127, e => {
    "use strict";
    var t = e.i(253719),
        a = e.i(517387),
        s = e.i(296809),
        i = e.i(978939);
    let r = e => {
        if (window.innerWidth < 996) return;
        let t = [];
        for (let a = 0; a < 6; a++) t.push((0, i.default)({ ...e,
            x: a % 3 * 101,
            y: 101 * Math.floor(a / 3)
        }), (0, i.default)({ ...e,
            x: e.canvas.clientWidth - 101 - a % 3 * 101,
            y: 101 * Math.floor(a / 3)
        }));
        let a = () => (0, s.default)({
            element: e.canvas,
            callback: () => {
                let e = t[Math.floor(Math.random() * t.length)];
                e && e.trigger().then(() => a())
            },
            timeout: 3e3 * Math.random()
        });
        for (let e = 0; e < 2; e++) a()
    };

    function l() {
        return (0, t.jsx)(a.default, {
            canvasAttrs: {
                className: "w-full lg-max:hidden h-204 absolute top-0 left-0 pointer-events-none"
            },
            initOptions: {
                backgroundAlpha: 0
            },
            smartStop: !1,
            tickers: [r]
        })
    }
    e.s(["default", () => l], 967127)
}, 281787, e => {
    "use strict";
    var t = e.i(253719),
        a = e.i(152520),
        s = e.i(536925),
        i = e.i(131547),
        r = e.i(397038),
        l = e.i(323576),
        n = e.i(420851),
        o = e.i(430369),
        d = e.i(171350),
        c = e.i(998690),
        u = e.i(134841);

    function h({
        className: e,
        title: a,
        description: s
    }) {
        return (0, t.jsxs)("div", {
            className: (0, n.cn)("container h-416 flex flex-col justify-center relative -mt-1", e),
            children: [(0, t.jsx)("div", {
                className: "h-full top-0 absolute w-full pointer-events-none left-0 border-x border-border-faint"
            }), (0, t.jsx)(l.default, {
                className: "h-full w-full absolute top-0 left-0",
                allSides: !0
            }), (0, t.jsxs)(i.default, {
                className: "mb-20 mx-auto",
                children: [(0, t.jsx)(c.default, {
                    className: "size-20"
                }), "Get started"]
            }), (0, t.jsx)("div", {
                className: "text-title-h3 mb-16 text-center",
                children: a || "Ready to build?"
            }), (0, t.jsx)("div", {
                className: (0, n.cn)("text-body-large text-center", s ? "mb-24" : "mb-32"),
                children: s || (0, t.jsxs)(t.Fragment, {
                    children: ["Start getting Web Data for free and scale seamlessly as your project expands.", " ", (0, t.jsx)("div", {
                        className: "text-label-large",
                        children: "No credit card needed."
                    })]
                })
            }), (0, t.jsxs)("div", {
                className: "flex gap-12 justify-center relative z-[2] lg-max:bg-background-base",
                children: [(0, t.jsx)(u.default, {
                    href: "/signin",
                    children: (0, t.jsx)(r.default, {
                        size: "large",
                        variant: "primary",
                        children: "Start for free"
                    })
                }), (0, t.jsx)(u.default, {
                    href: "/pricing",
                    children: (0, t.jsx)(r.default, {
                        size: "large",
                        variant: "secondary",
                        children: "See our plans"
                    })
                })]
            }), (0, t.jsx)(o.default, {
                className: "relative z-[2]"
            }), (0, t.jsx)(d.default, {
                variant: 0
            })]
        })
    }
    var m = e.i(967127),
        x = e.i(424e3);
    let p = (0, a.default)(() => Promise.resolve(e => (0, s.useMediaQuery)("(max-width: 996px)") ? (0, t.jsx)(h, { ...e
    }) : (0, t.jsx)(f, { ...e
    })), {
        ssr: !1,
        loading: () => (0, t.jsx)("div", {
            className: "h-416 w-full bg-background-base"
        })
    });

    function f({
        className: e,
        flameVariant: a = 0,
        title: s,
        description: h
    }) {
        return (0, t.jsxs)("div", {
            className: (0, n.cn)("container h-416 flex relative -mt-1", e),
            children: [(0, t.jsx)("div", {
                className: "h-1 top-0 absolute w-screen bg-border-faint left-[calc(50%-50vw)]"
            }), (0, t.jsx)("div", {
                className: "h-1 bottom-0 absolute w-screen bg-border-faint left-[calc(50%-50vw)]"
            }), (0, t.jsxs)("div", {
                className: "w-101 -left-101 absolute top-0 h-full !text-mono-x-small pointer-events-none select-none font-mono text-black-alpha-12 text-center",
                children: [(0, t.jsx)(l.default, {
                    className: "w-102 absolute top-0 left-0 h-full",
                    allSides: !0
                }), (0, t.jsx)(l.default, {
                    className: "w-102 absolute top-0 -left-101 h-full",
                    right: !0
                }), (0, t.jsx)(l.default, {
                    className: "size-102 absolute -top-101 left-0",
                    bottomRight: !0
                }), (0, t.jsx)(l.default, {
                    className: "size-102 absolute -bottom-101 left-0",
                    topRight: !0
                }), (0, t.jsx)("div", {
                    className: "h-full left-0 w-1 absolute bg-border-faint"
                }), (0, t.jsx)("div", {
                    className: "absolute top-10 w-full left-0",
                    children: "[ SEARCH ]"
                }), (0, t.jsx)("div", {
                    className: "absolute bottom-10 w-full left-0",
                    children: "[ SCRAPE ]"
                })]
            }), (0, t.jsxs)("div", {
                className: "w-101 -right-100 absolute top-0 h-full !text-mono-x-small pointer-events-none select-none font-mono text-black-alpha-12 text-center",
                children: [(0, t.jsx)(l.default, {
                    className: "w-102 absolute top-0 left-0 h-full",
                    allSides: !0
                }), (0, t.jsx)(l.default, {
                    className: "w-102 absolute top-0 -right-102 h-full",
                    left: !0
                }), (0, t.jsx)(l.default, {
                    className: "size-102 absolute -top-101 left-0",
                    bottomLeft: !0
                }), (0, t.jsx)(l.default, {
                    className: "size-102 absolute -bottom-101 left-0",
                    topLeft: !0
                }), (0, t.jsx)("div", {
                    className: "h-full -right-1 w-1 absolute bg-border-faint"
                }), (0, t.jsx)("div", {
                    className: "absolute top-10 w-full left-0",
                    children: "[ INTERACT ]"
                }), (0, t.jsx)("div", {
                    className: "absolute bottom-10 w-full left-0",
                    children: "[ CRAWL ]"
                })]
            }), (0, t.jsx)(m.default, {}), (0, t.jsxs)("div", {
                className: "w-304 relative",
                children: [(0, t.jsx)("div", {
                    className: "h-203",
                    children: Array.from({
                        length: 6
                    }, (e, a) => (0, t.jsx)(l.default, {
                        className: "absolute before:inside-border before:border-border-faint before:!border-t-0 before:!border-l-0",
                        style: {
                            width: 102,
                            height: 102,
                            left: a % 3 * 101,
                            top: 101 * Math.floor(a / 3)
                        },
                        allSides: !0
                    }, a))
                }), (0, t.jsx)(d.default, {
                    variant: a
                })]
            }), (0, t.jsxs)("div", {
                className: "flex-1 px-24 py-92 text-center relative -ml-1",
                children: [(0, t.jsx)("div", {
                    className: "h-full top-0 absolute w-full pointer-events-none left-0 border-x border-border-faint"
                }), (0, t.jsx)(l.default, {
                    className: "h-full w-full absolute top-0 left-0",
                    allSides: !0
                }), (0, t.jsxs)(i.default, {
                    className: "mb-20 mx-auto",
                    children: [(0, t.jsx)(c.default, {
                        className: "size-20"
                    }), "Get started"]
                }), (0, t.jsx)("div", {
                    className: "text-title-h3 mb-16",
                    children: s || "Ready to build?"
                }), (0, t.jsx)("div", {
                    className: (0, n.cn)("text-body-large", h ? "mb-24" : "mb-32"),
                    children: h || (0, t.jsxs)(t.Fragment, {
                        children: ["Start getting Web Data for free and scale seamlessly as your project expands.", " ", (0, t.jsx)("span", {
                            className: "text-label-large",
                            children: "No credit card needed."
                        })]
                    })
                }), (0, t.jsxs)("div", {
                    className: "flex gap-12 justify-center",
                    children: [(0, t.jsx)(u.default, {
                        href: "/signin",
                        onClick: () => {
                            x.default.capture("blog_divider_cta_clicked", {
                                cta_type: "start_for_free",
                                location: "divider_section",
                                page_url: window.location.pathname
                            }), window.dataLayer = window.dataLayer || [], window.dataLayer.push({
                                event: "signup_cta_click",
                                cta_location: "divider_section",
                                cta_text: "Start for free",
                                page_url: window.location.pathname
                            })
                        },
                        children: (0, t.jsx)(r.default, {
                            size: "large",
                            variant: "primary",
                            children: "Start for free"
                        })
                    }), (0, t.jsx)(u.default, {
                        href: "/pricing",
                        onClick: () => {
                            x.default.capture("blog_divider_cta_clicked", {
                                cta_type: "see_our_plans",
                                location: "divider_section",
                                page_url: window.location.pathname
                            }), window.dataLayer = window.dataLayer || [], window.dataLayer.push({
                                event: "cta_click",
                                cta_type: "see_our_plans",
                                cta_location: "divider_section",
                                destination: "/pricing",
                                page_url: window.location.pathname
                            })
                        },
                        children: (0, t.jsx)(r.default, {
                            size: "large",
                            variant: "secondary",
                            children: "See our plans"
                        })
                    })]
                }), (0, t.jsx)(o.default, {})]
            }), (0, t.jsxs)("div", {
                className: "w-304 relative -ml-1",
                children: [(0, t.jsx)(l.default, {
                    allSides: !0
                }), (0, t.jsx)("div", {
                    className: "h-203",
                    children: Array.from({
                        length: 6
                    }, (e, a) => (0, t.jsx)(l.default, {
                        className: "absolute before:inside-border before:border-border-faint before:!border-t-0 before:!border-l-0",
                        style: {
                            width: 102,
                            height: 102,
                            left: a % 3 * 101,
                            top: 101 * Math.floor(a / 3)
                        },
                        allSides: !0
                    }, a))
                }), (0, t.jsx)(d.default, {
                    variant: a
                })]
            })]
        })
    }
    e.s(["default", 0, p], 281787)
}, 950216, e => {
    "use strict";
    var t = e.i(253719),
        a = e.i(730592),
        s = e.i(154712),
        i = e.i(796620),
        r = e.i(534026);

    function l() {
        return (0, t.jsx)("svg", {
            fill: "none",
            height: "20",
            viewBox: "0 0 20 20",
            width: "20",
            xmlns: "http://www.w3.org/2000/svg",
            children: (0, t.jsx)("path", {
                clipRule: "evenodd",
                d: "M10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5ZM12.8305 8.59995C13.0928 8.27937 13.0455 7.80685 12.7249 7.54455C12.4043 7.28226 11.9318 7.32951 11.6695 7.65009L8.81932 11.1337L7.90533 10.2197C7.61244 9.9268 7.13756 9.9268 6.84467 10.2197C6.55178 10.5126 6.55178 10.9875 6.84467 11.2804L8.34467 12.7804C8.4945 12.9302 8.70073 13.0096 8.91236 12.9991C9.12399 12.9885 9.32129 12.8889 9.45547 12.725L12.8305 8.59995Z",
                fill: "#FA5D19",
                fillRule: "evenodd"
            })
        })
    }
    var n = e.i(420851);
    let o = (0, a.memo)(function({
            finished: e,
            ...a
        }) {
            return (0, t.jsxs)("div", { ...a,
                className: (0, n.cn)("size-20 min-w-[20px] relative", a.className),
                children: [(0, t.jsx)(i.AnimatePresence, {
                    initial: !1,
                    children: !e && (0, t.jsx)(d, {})
                }), e && (0, t.jsx)(r.motion.div, {
                    animate: {
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)"
                    },
                    className: "overlay",
                    initial: {
                        opacity: 0,
                        scale: .9,
                        filter: "blur(4px)"
                    },
                    transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        delay: .2
                    },
                    children: (0, t.jsx)(l, {})
                })]
            })
        }),
        d = (0, a.memo)(function() {
            let e = (0, a.useRef)(null);
            return (0, a.useEffect)(() => {
                let t = e.current;
                if (!t) return;
                let a = window.devicePixelRatio || 1;
                t.width = 20 * a, t.height = 20 * a;
                let i = t.getContext("2d");
                if (!i) return;
                i.scale(a, a);
                let r = -1,
                    l = Array.from({
                        length: 16
                    }, (e, t) => ({
                        x: 3 + t % 4 * 4,
                        y: 3 + 4 * Math.floor(t / 4),
                        width: 2,
                        height: 2,
                        alpha: 0,
                        borderRadius: 0
                    })),
                    n = !1,
                    o = [
                        [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0],
                        [0, 1, 1, 0, 1, .2, .2, 1, 1, .2, .2, 1, 0, 1, 1, 0],
                        [1, .4, .4, 1, .4, .12, .12, .4, .4, .12, .12, .4, 1, .4, .4, 1],
                        [.4, .12, .12, .4, .12, .04, .04, .12, .12, .04, .04, .12, .4, .12, .12, .4],
                        [.12, .04, .04, .12, .04, 0, 0, .04, .04, 0, 0, .04, .12, .04, .04, .12],
                        [.04, 0, 0, .04, 0, 0, 0, 0, 0, 0, 0, 0, .04, 0, 0, .04], Array.from({
                            length: 16
                        }, () => 0)
                    ],
                    d = () => {
                        if (!n) {
                            i.fillStyle = "#FA5D19", i.clearRect(0, 0, t.width, t.height);
                            for (let e = 0; e < 16; e++) i.globalAlpha = l[e].alpha, i.beginPath(), i.roundRect(l[e].x, l[e].y, l[e].width, l[e].height, l[e].borderRadius), i.fill();
                            requestAnimationFrame(d)
                        }
                    },
                    c = () => {
                        2 === r && n || (o[r = (r + 1) % 6].forEach((e, t) => {
                            (0, s.animate)(l[t].alpha, e, {
                                duration: .05,
                                onUpdate: e => {
                                    l[t].alpha = e
                                }
                            })
                        }), setTimeout(() => {
                            n || c()
                        }, 5 === r ? 200 : 100))
                    };
                return c(), d(), t.addEventListener("resize", d), () => {
                    n = !0
                }
            }, []), (0, t.jsx)(r.motion.canvas, {
                animate: {
                    opacity: 1,
                    scale: 1
                },
                className: "absolute top-0 left-0 size-20",
                exit: {
                    opacity: 0,
                    scale: .9
                },
                ref: e
            })
        });
    e.s(["default", 0, o], 950216)
}, 787584, e => {
    "use strict";
    var t = e.i(253719),
        a = e.i(730592),
        s = e.i(296809),
        i = e.i(534026),
        r = e.i(830829),
        l = e.i(420851),
        n = e.i(377250);

    function o({
        step: e
    }) {
        return (0, t.jsx)("div", {
            className: "lg:absolute lg-max:h-244 overflow-hidden lg:inset-y-24 lg-max:mt-16 lg:right-24 bg-surface-alpha-72 backdrop-blur-4 rounded-20 w-[calc(100%-32px)] lg-max:mx-auto relative lg:w-272",
            style: {
                boxShadow: "0px 40px 48px -20px rgba(0, 0, 0, 0.02), 0px 32px 32px -20px rgba(0, 0, 0, 0.03), 0px 16px 24px -12px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px rgba(0, 0, 0, 0.03)"
            },
            children: (0, t.jsx)(i.motion.div, {
                animate: {
                    y: -158 * Math.min(Math.max(e, 0), 2)
                },
                className: "h-max",
                transition: {
                    type: "spring",
                    stiffness: 50,
                    damping: 20
                },
                children: c.map((a, s) => {
                    let i = e >= s;
                    return (0, t.jsxs)("div", {
                        className: "p-20 border-b border-black-alpha-5",
                        children: [(0, t.jsx)("div", {
                            className: (0, l.cn)("size-32 rounded-full overflow-hidden bg-black-alpha-3 mb-12 transition delay-[200ms]", !i && "opacity-75"),
                            children: (0, t.jsx)(n.default, {
                                alt: a.name,
                                className: (0, l.cn)("transition-all duration-[400ms]", {
                                    "opacity-0 grayscale blur-[1px] translate-y-2": !i
                                }),
                                height: 32,
                                src: a.avatar,
                                width: 32
                            })
                        }), (0, t.jsxs)("div", {
                            className: "flex gap-6 mb-4 h-20",
                            children: [(0, t.jsx)("div", {
                                className: (0, l.cn)("text-label-small transition delay-[400ms]", !i && "opacity-50"),
                                children: (0, t.jsx)(d, {
                                    done: i,
                                    index: 0,
                                    value: a.name
                                })
                            }), (0, t.jsx)("div", {
                                className: (0, l.cn)("text-body-small text-black-alpha-64 transition delay-[600ms]", !i && "opacity-50"),
                                children: (0, t.jsx)(d, {
                                    done: i,
                                    index: 1,
                                    value: a.title
                                })
                            })]
                        }), (0, t.jsx)("div", {
                            className: (0, l.cn)("text-body-small h-20 text-black-alpha-64 mb-4 transition delay-[800ms]", !i && "opacity-50"),
                            children: (0, t.jsx)(d, {
                                done: i,
                                index: 2,
                                value: a.phone
                            })
                        }), (0, t.jsx)("div", {
                            className: (0, l.cn)("text-body-small h-20 text-black-alpha-64 mb-4 transition delay-[1100ms]", !i && "opacity-50"),
                            children: (0, t.jsx)(d, {
                                done: i,
                                index: 3,
                                value: a.email
                            })
                        })]
                    }, a.name)
                })
            })
        })
    }
    let d = ({
            index: e,
            done: t,
            value: i
        }) => {
            let [l, n] = (0, a.useState)("");
            return (0, a.useEffect)(() => {
                let a = -.5 * e,
                    l = (0, s.setIntervalOnVisible)({
                        element: document.getElementById("ai-leads"),
                        callback: () => {
                            t && (a += .2), n((0, r.encryptText)(i, Math.max(a, 0), {
                                randomizeChance: .4
                            })), a >= 1 && l ? .()
                        },
                        interval: 100
                    });
                return () => {
                    l ? .()
                }
            }, [i, t, e]), l
        },
        c = [{
            avatar: "ai/leads-1",
            name: "Emily Tran",
            title: "Product Manager",
            phone: "+1 (415) 802-4461",
            email: "emily.tran@neuralflow.ai"
        }, {
            avatar: "ai/leads-2",
            name: "James Carter",
            title: "Head of Partnerships",
            phone: "+1 (646) 201-9345",
            email: "jcarter@zenlytics.io"
        }, {
            avatar: "ai/leads-3",
            name: "Sophia Kim",
            title: "Senior Data Analyst",
            phone: "+1 (312) 778-2299",
            email: "s.kim@aurastat.com"
        }, {
            avatar: "ai/leads-4",
            name: "Michael Rivera",
            title: "CTO",
            phone: "+1 (917) 463-8120",
            email: "m.rivera@bytepath.dev"
        }];
    var u = e.i(43486),
        h = e.i(998690),
        m = e.i(606309),
        x = e.i(247612);

    function p() {
        let [e, i] = (0, a.useState)(-1);
        return (0, a.useEffect)(() => {
            if (4 === e) return;
            let t = document.getElementById("ai-leads");
            if (-1 === e) return void(0, u.default)(t, () => {
                setTimeout(() => {
                    i(0)
                }, 1e3)
            }, .5);
            let a = (0, s.default)({
                element: t,
                callback: () => {
                    i(e + 1)
                },
                timeout: 3 === e ? 500 : 2500
            });
            return () => a ? .()
        }, [e]), (0, t.jsxs)(t.Fragment, {
            children: [(0, t.jsx)("div", {
                className: "top-0 h-full inset-x-48 lg-max:hidden border-border-faint border-x absolute"
            }), (0, t.jsxs)("div", {
                className: "px-28 lg:px-76 py-20 flex gap-16 text-body-medium items-center relative",
                children: [(0, t.jsx)("div", {
                    className: "h-1 bottom-0 w-full bg-border-faint left-0 absolute"
                }), (0, t.jsx)(h.default, {
                    className: "size-24"
                }), (0, t.jsx)(g, {
                    done: 4 === e
                })]
            }), (0, t.jsx)("div", {
                className: "lg:px-48 text-body-medium",
                children: b.map((a, s) => (0, t.jsxs)("div", {
                    className: "flex border-b border-border-faint",
                    children: [(0, t.jsx)("div", {
                        className: "py-20 px-28 text-black-alpha-64 w-1/2 lg:w-172 border-r border-border-faint",
                        children: a.label
                    }), (0, t.jsx)(f, {
                        done: 4 === s ? e >= 3 : e >= s,
                        index: s,
                        value: a.value
                    })]
                }, a.label))
            }), (0, t.jsx)(o, {
                step: e
            }), (0, t.jsx)("div", {
                className: "h-16 lg:hidden"
            })]
        })
    }

    function f({
        done: e,
        index: i,
        value: l
    }) {
        let [n, o] = (0, a.useState)(""), d = (0, a.useRef)(null);
        return (0, a.useEffect)(() => {
            let t = -.5 * i,
                a = (0, s.setIntervalOnVisible)({
                    element: d.current,
                    callback: () => {
                        e && (t += .1), o((0, r.encryptText)(l, Math.max(t, 0), {
                            randomizeChance: .4
                        })), t >= 1 && a ? .()
                    },
                    interval: 75
                });
            return () => {
                a ? .()
            }
        }, [l, e, i]), (0, t.jsx)("div", {
            className: "py-20 px-28 w-172",
            ref: d,
            children: n
        })
    }

    function g({
        done: e
    }) {
        let s = (0, a.useRef)(null),
            i = (0, m.default)({
                enabled: !e,
                text: "Extracting leads from directory",
                ref: s
            }),
            r = (0, x.default)(e ? "Found 2,847 companies" : "Extracting leads from directory...", 50);
        return (0, t.jsx)("div", {
            ref: s,
            children: e ? r : i
        })
    }
    let b = [{
        label: "Tech startups",
        value: "1,243"
    }, {
        label: "With contact info",
        value: "892"
    }, {
        label: "Decision makers",
        value: "3,421"
    }, {
        label: "Funding stage",
        value: "Series A+"
    }, {
        label: "Ready to engage",
        value: "647"
    }];
    e.s(["default", () => p], 787584)
}, 291628, e => {
    "use strict";
    var t = e.i(253719),
        a = e.i(730592),
        s = e.i(247612),
        i = e.i(998690),
        r = e.i(606309),
        l = e.i(534026),
        n = e.i(830829),
        o = e.i(296809);

    function d() {
        return (0, t.jsx)("svg", {
            className: "text-accent-black",
            fill: "none",
            height: "20",
            viewBox: "0 0 20 20",
            width: "20",
            xmlns: "http://www.w3.org/2000/svg",
            children: (0, t.jsx)("path", {
                d: "M9.99942 6.51729C9.07601 6.51729 8.19042 6.88411 7.53747 7.53706C6.88452 8.19001 6.5177 9.07559 6.5177 9.999V14.6413C6.5177 15.5647 6.88452 16.4503 7.53747 17.1032C8.19042 17.7562 9.07601 18.123 9.99942 18.123C10.9228 18.123 11.8084 17.7562 12.4614 17.1032C13.1143 16.4503 13.4811 15.5647 13.4811 14.6413V9.999C13.4811 9.07559 13.1143 8.19001 12.4614 7.53706C11.8084 6.88411 10.9228 6.51729 9.99942 6.51729ZM7.5332 11.0841H12.4656V13.5504H7.5332V11.0841ZM9.99942 17.1075C9.3463 17.1044 8.72084 16.8435 8.25902 16.3817C7.79719 15.9199 7.53635 15.2944 7.5332 14.6413V14.5659H12.4656V14.6413C12.4625 15.2944 12.2016 15.9199 11.7398 16.3817C11.278 16.8435 10.6525 17.1044 9.99942 17.1075ZM12.4656 10.0686H7.5332V9.999C7.5332 9.34492 7.79303 8.71763 8.25554 8.25512C8.71804 7.79262 9.34533 7.53279 9.99942 7.53279C10.6535 7.53279 11.2808 7.79262 11.7433 8.25512C12.2058 8.71763 12.4656 9.34492 12.4656 9.999V10.0686ZM18.5064 11.8617L14.6417 8.25814V13.5387C14.6417 14.1543 14.8862 14.7447 15.3215 15.18C15.7568 15.6153 16.3472 15.8599 16.9628 15.8599C17.5784 15.8599 18.1688 15.6153 18.6041 15.18C19.0394 14.7447 19.284 14.1543 19.284 13.5387C19.2823 13.2198 19.212 12.9049 19.0779 12.6155C18.9437 12.3262 18.7488 12.0691 18.5064 11.8617ZM16.9628 14.8444C16.6166 14.8444 16.2845 14.7068 16.0396 14.462C15.7948 14.2171 15.6572 13.885 15.6572 13.5387V10.5793L17.8159 12.5929C17.9457 12.7021 18.0506 12.8378 18.1237 12.991C18.1968 13.1441 18.2362 13.3111 18.2395 13.4807C18.2471 13.652 18.221 13.8231 18.1625 13.9843C18.104 14.1455 18.0143 14.2936 17.8986 14.4201C17.7829 14.5466 17.6434 14.6491 17.488 14.7217C17.3327 14.7944 17.1646 14.8357 16.9933 14.8433L16.9628 14.8444ZM0.714844 13.5387C0.714844 14.1543 0.959392 14.7447 1.39469 15.18C1.82999 15.6153 2.42038 15.8599 3.03599 15.8599C3.65159 15.8599 4.24198 15.6153 4.67728 15.18C5.11258 14.7447 5.35713 14.1543 5.35713 13.5387V8.25814L1.49243 11.8617C1.2515 12.0703 1.05761 12.3276 0.92356 12.6167C0.789514 12.9058 0.718374 13.2201 0.714844 13.5387ZM2.15395 12.632L4.34163 10.5793V13.5387C4.34163 13.885 4.20407 14.2171 3.95922 14.462C3.71436 14.7068 3.38226 14.8444 3.03599 14.8444C2.68971 14.8444 2.35761 14.7068 2.11276 14.462C1.8679 14.2171 1.73034 13.885 1.73034 13.5387C1.73106 13.3662 1.76932 13.1958 1.84247 13.0395C1.91562 12.8832 2.0219 12.7446 2.15395 12.6335V12.632ZM9.41913 3.906C9.41913 3.50431 9.30001 3.11163 9.07684 2.77764C8.85368 2.44364 8.53648 2.18332 8.16536 2.0296C7.79424 1.87588 7.38588 1.83566 6.9919 1.91403C6.59793 1.99239 6.23604 2.18583 5.952 2.46987C5.66796 2.75391 5.47452 3.1158 5.39615 3.50977C5.31779 3.90375 5.35801 4.31211 5.51173 4.68323C5.66545 5.05435 5.92577 5.37155 6.25977 5.59472C6.59376 5.81788 6.98644 5.937 7.38813 5.937C7.92678 5.937 8.44338 5.72302 8.82426 5.34213C9.20515 4.96125 9.41913 4.44466 9.41913 3.906ZM6.37263 3.906C6.37263 3.70515 6.43219 3.50882 6.54377 3.34182C6.65536 3.17482 6.81396 3.04466 6.99951 2.9678C7.18507 2.89094 7.38926 2.87083 7.58624 2.91001C7.78323 2.9492 7.96418 3.04591 8.1062 3.18793C8.24822 3.32995 8.34493 3.5109 8.38412 3.70789C8.4233 3.90487 8.40319 4.10906 8.32633 4.29462C8.24947 4.48017 8.11931 4.63877 7.95231 4.75036C7.78531 4.86194 7.58898 4.9215 7.38813 4.9215C7.11974 4.91848 6.86319 4.81053 6.6734 4.62073C6.4836 4.43094 6.37565 4.17439 6.37263 3.906ZM12.6107 1.875C12.209 1.875 11.8163 1.99412 11.4823 2.21729C11.1483 2.44046 10.888 2.75765 10.7343 3.12877C10.5806 3.49989 10.5404 3.90825 10.6187 4.30223C10.6971 4.6962 10.8905 5.05809 11.1746 5.34213C11.4586 5.62618 11.8205 5.81961 12.2145 5.89798C12.6084 5.97634 13.0168 5.93612 13.3879 5.7824C13.759 5.62868 14.0762 5.36836 14.2994 5.03436C14.5226 4.70037 14.6417 4.30769 14.6417 3.906C14.6417 3.36735 14.4277 2.85075 14.0468 2.46987C13.6659 2.08898 13.1494 1.875 12.6107 1.875ZM12.6107 4.9215C12.4099 4.9215 12.2135 4.86194 12.0465 4.75036C11.8795 4.63877 11.7494 4.48017 11.6725 4.29462C11.5956 4.10906 11.5755 3.90487 11.6147 3.70789C11.6539 3.5109 11.7506 3.32995 11.8926 3.18793C12.0347 3.04591 12.2156 2.9492 12.4126 2.91001C12.6096 2.87083 12.8138 2.89094 12.9993 2.9678C13.1849 3.04466 13.3435 3.17482 13.4551 3.34182C13.5666 3.50882 13.6262 3.70515 13.6262 3.906C13.6232 4.17439 13.5152 4.43094 13.3254 4.62073C13.1356 4.81053 12.8791 4.91848 12.6107 4.9215Z",
                fill: "currentColor",
                fillOpacity: "0.4"
            })
        })
    }

    function c() {
        return (0, t.jsx)("svg", {
            fill: "none",
            height: "20",
            viewBox: "0 0 20 20",
            width: "20",
            className: "text-accent-black",
            xmlns: "http://www.w3.org/2000/svg",
            children: (0, t.jsx)("path", {
                d: "M16.875 16.875L13.4388 13.4388M13.4388 13.4388C14.5321 12.3454 15.2083 10.835 15.2083 9.16667C15.2083 5.82995 12.5034 3.125 9.16667 3.125C5.82995 3.125 3.125 5.82995 3.125 9.16667C3.125 12.5034 5.82995 15.2083 9.16667 15.2083C10.835 15.2083 12.3454 14.5321 13.4388 13.4388Z",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeOpacity: "0.4",
                strokeWidth: "1.25"
            })
        })
    }

    function u() {
        return (0, t.jsx)("svg", {
            className: "text-accent-black",
            fill: "none",
            height: "20",
            viewBox: "0 0 20 20",
            width: "20",
            xmlns: "http://www.w3.org/2000/svg",
            children: (0, t.jsx)("path", {
                clipRule: "evenodd",
                d: "M18.8828 4.56406C18.8828 4.62812 18.8625 4.68594 18.8234 4.73906C18.7828 4.79062 18.7406 4.81719 18.6922 4.81719C18.3031 4.85469 17.9828 4.97969 17.7359 5.19375C17.4875 5.40625 17.2328 5.81406 16.9688 6.41406L12.9375 15.4984C12.9109 15.5828 12.8375 15.625 12.7156 15.625C12.6203 15.625 12.5469 15.5828 12.4937 15.4984L10.2328 10.7703L7.63281 15.4984C7.57969 15.5828 7.50625 15.625 7.41094 15.625C7.29531 15.625 7.21875 15.5828 7.18125 15.4984L3.22031 6.41406C2.97344 5.85 2.7125 5.45625 2.4375 5.23281C2.16406 5.00938 1.78125 4.87031 1.29219 4.81719C1.25 4.81719 1.20938 4.79531 1.17344 4.75C1.13594 4.70625 1.11719 4.65469 1.11719 4.59688C1.11719 4.44844 1.15937 4.375 1.24375 4.375C1.59687 4.375 1.96562 4.39062 2.35156 4.42187C2.70938 4.45469 3.04688 4.47031 3.3625 4.47031C3.68438 4.47031 4.06406 4.45469 4.50156 4.42187C4.95937 4.39062 5.36562 4.375 5.71875 4.375C5.80312 4.375 5.84531 4.44844 5.84531 4.59688C5.84531 4.74375 5.81875 4.81719 5.76719 4.81719C5.41406 4.84375 5.13594 4.93437 4.93281 5.08594C4.72969 5.23906 4.62813 5.43906 4.62813 5.6875C4.62813 5.81406 4.67031 5.97188 4.75469 6.16094L8.02812 13.5531L9.88594 10.0437L8.15469 6.41406C7.84375 5.76719 7.5875 5.34844 7.3875 5.16094C7.1875 4.975 6.88437 4.85938 6.47812 4.81719C6.44062 4.81719 6.40625 4.79531 6.37187 4.75C6.3375 4.70625 6.32031 4.65469 6.32031 4.59688C6.32031 4.44844 6.35625 4.375 6.43125 4.375C6.78437 4.375 7.10781 4.39062 7.40312 4.42187C7.6875 4.45469 7.99062 4.47031 8.3125 4.47031C8.62812 4.47031 8.9625 4.45469 9.31562 4.42187C9.67969 4.39062 10.0375 4.375 10.3906 4.375C10.475 4.375 10.5172 4.44844 10.5172 4.59688C10.5172 4.74375 10.4922 4.81719 10.4391 4.81719C9.73281 4.86562 9.37969 5.06563 9.37969 5.41875C9.37969 5.57656 9.46094 5.82188 9.625 6.15313L10.7703 8.47812L11.9094 6.35156C12.0672 6.05156 12.1469 5.79844 12.1469 5.59219C12.1469 5.10781 11.7937 4.85 11.0875 4.81719C11.0234 4.81719 10.9922 4.74375 10.9922 4.59688C10.9922 4.54375 11.0078 4.49375 11.0391 4.44687C11.0719 4.39844 11.1031 4.375 11.1344 4.375C11.3875 4.375 11.6984 4.39062 12.0672 4.42187C12.4203 4.45469 12.7109 4.47031 12.9375 4.47031C13.1 4.47031 13.3406 4.45625 13.6562 4.42969C14.0562 4.39375 14.3922 4.375 14.6609 4.375C14.7234 4.375 14.7547 4.4375 14.7547 4.56406C14.7547 4.73281 14.6969 4.81719 14.5812 4.81719C14.1703 4.85938 13.8391 4.97344 13.5891 5.15781C13.3391 5.34219 13.0266 5.76094 12.6531 6.41406L11.1344 9.22188L13.1906 13.4109L16.2266 6.35156C16.3312 6.09375 16.3844 5.85625 16.3844 5.64062C16.3844 5.12344 16.0312 4.85 15.325 4.81719C15.2609 4.81719 15.2297 4.74375 15.2297 4.59688C15.2297 4.44844 15.2766 4.375 15.3719 4.375C15.6297 4.375 15.9359 4.39062 16.2891 4.42187C16.6156 4.45469 16.8906 4.47031 17.1109 4.47031C17.3438 4.47031 17.6125 4.45469 17.9172 4.42187C18.2344 4.39062 18.5187 4.375 18.7719 4.375C18.8453 4.375 18.8828 4.4375 18.8828 4.56406Z",
                fill: "currentColor",
                fillOpacity: "0.4",
                fillRule: "evenodd"
            })
        })
    }

    function h({
        step: e,
        setStep: s
    }) {
        let i = Math.max(e, 0);
        return (0, t.jsxs)("div", {
            className: "lg:absolute lg-max:h-244 overflow-hidden lg:inset-y-24 lg-max:mt-16 lg:right-24 bg-surface-alpha-72 backdrop-blur-4 rounded-20 w-[calc(100%-32px)] lg-max:mx-auto relative lg:w-272",
            style: {
                boxShadow: "0px 40px 48px -20px rgba(0, 0, 0, 0.02), 0px 32px 32px -20px rgba(0, 0, 0, 0.03), 0px 16px 24px -12px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px rgba(0, 0, 0, 0.03)"
            },
            children: [(0, t.jsx)(x, {
                setStep: s,
                step: e
            }), (0, t.jsx)("div", {
                className: "h-300 overflow-hidden",
                children: (0, t.jsx)(l.motion.div, {
                    animate: {
                        y: e >= 1 ? -129 * f.length : 0
                    },
                    className: "h-max -mt-1",
                    transition: {
                        duration: 50,
                        ease: "linear",
                        repeat: 1 / 0
                    },
                    children: Array.from({
                        length: 2
                    }, (e, s) => {
                        let r = 0 === s ? i : 3 * (i === f.length);
                        return (0, t.jsx)(a.Fragment, {
                            children: f.slice(0, r).map(e => (0, t.jsxs)(l.motion.div, {
                                animate: {
                                    opacity: 1
                                },
                                className: "px-20 py-16 border-t border-black-alpha-5",
                                initial: {
                                    opacity: 0
                                },
                                transition: {
                                    type: "spring",
                                    stiffness: 50,
                                    damping: 20
                                },
                                children: [(0, t.jsx)("div", {
                                    className: "text-label-small h-20 mb-4 truncate",
                                    children: (0, t.jsx)(p, {
                                        index: 0,
                                        value: e.title
                                    })
                                }), (0, t.jsx)("div", {
                                    className: "text-body-small h-40 text-black-alpha-64 mb-12 line-clamp-2",
                                    children: (0, t.jsx)(p, {
                                        index: 1,
                                        value: e.description
                                    })
                                }), (0, t.jsxs)("div", {
                                    className: "flex gap-8 items-center",
                                    children: [e.icon, (0, t.jsx)("div", {
                                        className: "text-body-small text-black-alpha-40",
                                        children: e.url
                                    })]
                                })]
                            }, e.title))
                        }, s)
                    })
                })
            })]
        })
    }
    let m = "Quantum computing",
        x = ({
            step: e,
            setStep: s
        }) => {
            let [i, r] = (0, a.useState)(""), l = (0, a.useRef)(0);
            return (0, a.useEffect)(() => {
                if (-1 === e || e >= f.length) return;
                if (e >= 4) {
                    let t = setTimeout(() => {
                        s(e + 1)
                    }, 500);
                    return () => clearTimeout(t)
                }
                let t = 0,
                    a = () => {
                        t = window.setTimeout(() => {
                            r(m.slice(0, l.current + 1)), l.current++, s(Math.floor(4 * Math.min(l.current / m.length, 1))), l.current >= m.length || a()
                        }, 100 + 100 * Math.random())
                    };
                return 0 === e ? t = window.setTimeout(a, 500) : a(), () => clearTimeout(t)
            }, [e, s]), (0, t.jsxs)("div", {
                className: "p-16 flex relative gap-12 items-center text-body-medium",
                children: [(0, t.jsx)(c, {}), -1 === e ? (0, t.jsx)("div", {
                    className: "text-black-alpha-48",
                    children: "Ask anything..."
                }) : (0, t.jsxs)("div", {
                    children: [i, e < 1 && (0, t.jsx)("span", {
                        className: "cursor",
                        children: "|"
                    })]
                }), (0, t.jsx)("div", {
                    className: "h-1 w-full bg-border-faint absolute bottom-0 left-0"
                })]
            })
        },
        p = ({
            index: e,
            value: t
        }) => {
            let [s, i] = (0, a.useState)("");
            return (0, a.useEffect)(() => {
                let a = -.5 * e,
                    s = (0, o.setIntervalOnVisible)({
                        element: document.getElementById("ai-research"),
                        callback: () => {
                            a += .2, i((0, n.encryptText)(t, Math.max(a, 0), {
                                randomizeChance: .4
                            })), a >= 1 && s ? .()
                        },
                        interval: 100
                    });
                return () => {
                    s ? .()
                }
            }, [t, e]), s
        },
        f = [{
            icon: (0, t.jsx)(u, {}),
            title: "Quantum computing - Wikipedia",
            description: "A computer that exploits quantum mechanical phenomena to perform calculations.",
            url: "en.wikipedia.org"
        }, {
            icon: (0, t.jsx)(d, {}),
            title: "What Is Quantum Computing? - IBM",
            description: "Emerging technology using quantum mechanics to solve complex computational problems.",
            url: "www.ibm.com"
        }, {
            icon: (0, t.jsx)(u, {}),
            title: "Qubit - Wikipedia",
            description: "A qubit is the basic unit of quantum information, analogous to a bit in classical computing.",
            url: "en.wikipedia.org"
        }, {
            icon: (0, t.jsx)(d, {}),
            title: "IBM Qiskit: Open-Source Quantum SDK",
            description: "Qiskit is an open-source SDK for working with quantum computers at the level of circuits, pulses, and algorithms.",
            url: "www.ibm.com"
        }, {
            icon: (0, t.jsx)(u, {}),
            title: "Shor’s Algorithm - Wikipedia",
            description: "A quantum algorithm for integer factorization, with implications for cryptography.",
            url: "en.wikipedia.org"
        }, {
            icon: (0, t.jsx)(d, {}),
            title: "Quantum Computing vs Classical Computing",
            description: "A comparison of quantum and classical computing paradigms and their respective strengths.",
            url: "www.ibm.com"
        }, {
            icon: (0, t.jsx)(u, {}),
            title: "Superconducting Quantum Computing - Wikipedia",
            description: "An overview of superconducting circuits as a leading technology for building quantum computers.",
            url: "en.wikipedia.org"
        }, {
            icon: (0, t.jsx)(d, {}),
            title: "Careers in Quantum Computing - IBM",
            description: "Explore job opportunities and career paths in the field of quantum computing.",
            url: "www.ibm.com"
        }, {
            icon: (0, t.jsx)(u, {}),
            title: "Quantum Key Distribution - Wikipedia",
            description: "A secure communication method using quantum mechanics to encrypt and transmit data.",
            url: "en.wikipedia.org"
        }, {
            icon: (0, t.jsx)(d, {}),
            title: "Quantum Computing Newsroom - IBM",
            description: "Latest news, press releases, and updates on IBM’s quantum computing initiatives.",
            url: "www.ibm.com"
        }];
    var g = e.i(43486);

    function b() {
        let [e, s] = (0, a.useState)(-1);
        return (0, a.useEffect)(() => {
            let t = document.getElementById("ai-research");
            if (-1 === e) return void(0, g.default)(t, () => {
                setTimeout(() => {
                    s(0)
                }, 1e3)
            }, .5)
        }, [e]), (0, t.jsxs)(t.Fragment, {
            children: [(0, t.jsx)("div", {
                className: "top-0 h-full lg-max:hidden inset-x-48 border-border-faint border-x absolute"
            }), (0, t.jsxs)("div", {
                className: "px-28 lg:px-76 py-20 flex gap-16 text-body-medium items-center relative",
                children: [(0, t.jsx)("div", {
                    className: "h-1 bottom-0 w-full bg-border-faint left-0 absolute"
                }), (0, t.jsx)(i.default, {
                    className: "size-24"
                }), (0, t.jsx)(C, {
                    done: 10 === e
                })]
            }), (0, t.jsx)("div", {
                className: "lg:px-48 text-body-medium",
                children: w.map((a, s) => (0, t.jsxs)("div", {
                    className: "flex border-b border-border-faint",
                    children: [(0, t.jsx)("div", {
                        className: "py-20 pl-28 text-black-alpha-64 w-1/2 lg:w-172 border-r border-border-faint",
                        children: a.label
                    }), (0, t.jsx)(v, {
                        done: Math.floor(e / 10 * w.length) >= s,
                        step: e,
                        value: a.value
                    })]
                }, a.label))
            }), (0, t.jsx)(h, {
                setStep: s,
                step: e
            }), (0, t.jsx)("div", {
                className: "h-16 lg:hidden"
            })]
        })
    }

    function v({
        done: e,
        value: s,
        step: i
    }) {
        let [r, l] = (0, a.useState)(0), n = (0, a.useRef)(null);
        return (0, a.useEffect)(() => {
            if (i < 1) return;
            let e = setInterval(() => {
                l(t => {
                    let a = t + Math.floor(s / (20 + 40 * Math.random()));
                    return a >= s ? (clearInterval(e), s) : a
                })
            }, 75);
            return () => clearInterval(e)
        }, [e, s, i]), (0, t.jsxs)("div", {
            className: "py-20 px-28 w-172",
            ref: n,
            children: [j.format(r), " found"]
        })
    }

    function C({
        done: e
    }) {
        let i = (0, a.useRef)(null),
            l = (0, r.default)({
                enabled: !e,
                text: "",
                ref: i
            }),
            n = (0, s.default)(e ? `Found ${j.format(w.reduce((e,t)=>e+t.value,0))} results` : "Deep research in progress", 50);
        return (0, t.jsxs)("div", {
            ref: i,
            children: [n, e ? "" : l]
        })
    }
    let j = new Intl.NumberFormat("en-US", {
            useGrouping: !0,
            maximumFractionDigits: 0
        }),
        w = [{
            label: "Academic papers",
            value: 247
        }, {
            label: "News articles",
            value: 1832
        }, {
            label: "Expert opinions",
            value: 89
        }, {
            label: "Research reports",
            value: 156
        }, {
            label: "Industry data",
            value: 423
        }];
    e.s(["default", () => b], 291628)
}, 639251, e => {
    "use strict";
    var t = e.i(253719),
        a = e.i(377250);

    function s() {
        return (0, t.jsx)("svg", {
            fill: "none",
            height: "16",
            viewBox: "0 0 16 16",
            width: "16",
            xmlns: "http://www.w3.org/2000/svg",
            children: (0, t.jsx)("path", {
                d: "M11.2031 5.72641C10.7128 5.87192 10.3433 6.2011 10.0727 6.55867C10.0146 6.63542 9.89344 6.57774 9.91651 6.48369C10.4347 4.35292 9.75015 2.58193 7.61624 1.71019C7.50799 1.66583 7.39531 1.76298 7.4237 1.87655C8.39438 5.77388 4.31157 5.44515 4.82752 9.8633C4.83639 9.93916 4.75121 9.99107 4.6891 9.9467C4.49568 9.80785 4.27962 9.51815 4.13145 9.31453C4.08797 9.25463 3.99392 9.27149 3.97396 9.34292C3.85595 9.76969 3.80005 10.1716 3.80005 10.5709C3.80005 12.1236 4.59816 13.4905 5.80619 14.2828C5.8754 14.328 5.96412 14.2633 5.94061 14.1839C5.8785 13.9753 5.84345 13.7553 5.84079 13.5277C5.84079 13.388 5.84966 13.2451 5.8714 13.112C5.92198 12.7775 6.03821 12.459 6.23341 12.1689C6.90287 11.164 8.24488 10.1934 8.0306 8.87533C8.01684 8.79192 8.11533 8.73691 8.17744 8.79414C9.12284 9.6579 9.31006 10.8198 9.15478 11.8619C9.14147 11.9524 9.25504 12.0007 9.31227 11.9298C9.4569 11.7487 9.63347 11.5899 9.82556 11.4706C9.87348 11.4409 9.93736 11.4635 9.95555 11.5167C10.0625 11.8277 10.2213 12.1196 10.3712 12.4115C10.5505 12.7625 10.6459 13.1631 10.6308 13.5872C10.6232 13.7935 10.5891 13.9931 10.5318 14.183C10.5074 14.2633 10.5953 14.3303 10.6658 14.2841C11.8747 13.4918 12.6733 12.1249 12.6733 10.5713C12.6733 10.0314 12.5788 9.50218 12.4 9.0062C12.0251 7.96588 11.074 7.18464 11.3144 5.82889C11.326 5.76412 11.2661 5.70778 11.2031 5.72641Z",
                fill: "currentColor"
            })
        })
    }
    var i = e.i(796620),
        r = e.i(534026),
        l = e.i(730592),
        n = e.i(420851);

    function o() {
        return (0, t.jsx)("svg", {
            fill: "none",
            height: "16",
            viewBox: "0 0 16 16",
            width: "16",
            xmlns: "http://www.w3.org/2000/svg",
            children: (0, t.jsx)("path", {
                d: "M3.83337 6.66667L8.00003 2.5L12.1667 6.66667M8.00003 13.5V3",
                stroke: "white",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "1.5"
            })
        })
    }

    function d() {
        return (0, t.jsx)("svg", {
            fill: "none",
            height: "32",
            viewBox: "0 0 32 32",
            width: "32",
            className: "text-accent-black",
            xmlns: "http://www.w3.org/2000/svg",
            children: (0, t.jsx)("path", {
                d: "M16 21.8327C18.5629 21.8327 20.7655 20.2901 21.7299 18.0827M16 21.8327C13.4371 21.8327 11.2345 20.2901 10.27 18.0827M16 21.8327V23.7077M16 19.1243C14.044 19.1243 12.4583 17.5387 12.4583 15.5827V11.8327C12.4583 9.87667 14.044 8.29102 16 8.29102C17.956 8.29102 19.5416 9.87667 19.5416 11.8327V15.5827C19.5416 17.5387 17.956 19.1243 16 19.1243Z",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeOpacity: "0.4",
                strokeWidth: "1.25"
            })
        })
    }
    var c = e.i(43486);

    function u() {
        let [e, s] = (0, l.useState)(-1);
        return (0, t.jsxs)("div", {
            children: [(0, t.jsx)(x, {
                setStep: s,
                step: e
            }), e >= 2 && (0, t.jsxs)(r.motion.div, {
                animate: {
                    y: 0,
                    opacity: 1,
                    rotate: 0
                },
                className: "absolute top-76 right-40",
                initial: {
                    y: 52,
                    opacity: 0,
                    rotate: -10
                },
                style: {
                    originX: 1
                },
                transition: {
                    type: "spring",
                    stiffness: 337,
                    damping: 24.5,
                    mass: 1
                },
                children: [(0, t.jsx)(r.motion.div, {
                    animate: {
                        x: 0
                    },
                    className: "absolute top-33 z-[2] -right-9 size-6 rounded-full bg-[#EFEFEF]",
                    initial: {
                        x: -23
                    },
                    transition: {
                        type: "spring",
                        stiffness: 337,
                        damping: 24.5,
                        mass: 1
                    }
                }), (0, t.jsx)("div", {
                    className: "absolute top-19 z-[1] -right-3 size-16 rounded-full bg-[#EFEFEF]"
                }), (0, t.jsx)("div", {
                    className: "bg-black-alpha-5 text-body-medium py-8 px-16 rounded-full",
                    children: "What's new in the React docs?"
                })]
            }), e >= 3 && (0, t.jsxs)(r.motion.div, {
                animate: {
                    x: 0,
                    opacity: 1
                },
                className: "left-40 top-128 absolute flex gap-16",
                initial: {
                    x: -8,
                    opacity: 0
                },
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                },
                children: [(0, t.jsx)("div", {
                    className: "size-36 bg-surface-alpha-72 rounded-full flex-center",
                    style: {
                        boxShadow: "0px 16px 24px -6px rgba(0, 0, 0, 0.04), 0px 8px 12px -4px rgba(0, 0, 0, 0.04), 0px 4px 8px -2px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px rgba(0, 0, 0, 0.03)"
                    },
                    children: (0, t.jsx)(a.default, {
                        alt: "AI Assistant",
                        className: "ai-chats-chat-bot",
                        height: 24,
                        ref: e => {
                            e ? .animate([{
                                rotate: "0deg"
                            }, {
                                rotate: "-1turn"
                            }], {
                                duration: 5e3,
                                iterations: 1 / 0
                            })
                        },
                        src: "ai/bot",
                        style: {
                            backfaceVisibility: "hidden",
                            transform: "translateZ(0px)"
                        },
                        width: 24
                    })
                }), (0, t.jsx)(i.AnimatePresence, {
                    initial: !1,
                    mode: "popLayout",
                    children: (0, t.jsx)(r.motion.div, {
                        animate: {
                            x: 0,
                            opacity: 1
                        },
                        className: "pt-8 text-body-medium flex-1 min-w-0 pr-40",
                        exit: {
                            x: 8,
                            opacity: 0
                        },
                        initial: {
                            x: -8,
                            opacity: 0
                        },
                        transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                        },
                        children: e < 4 ? (0, t.jsx)("div", {
                            className: "ai-chats-chat-thinking whitespace-nowrap",
                            children: "is thinking..."
                        }) : (0, t.jsx)(h, {
                            setStep: s,
                            step: e
                        })
                    }, e < 4 ? "thinking" : "response")
                })]
            })]
        })
    }
    let h = ({
            step: e,
            setStep: a
        }) => {
            let [s, i] = (0, l.useState)("");
            return (0, l.useEffect)(() => {
                let e = 0,
                    t = ["Based on live data from react.dev, the latest updates to the React", "documentation include:", "A new", "“Thinking in React”", "section, rewritten with updated mental models for functional components and hooks."],
                    s = a => {
                        let s = t[a],
                            i = t.slice(0, a).reduce((e, t) => e + t.length, 0),
                            r = e - i;
                        return r < 0 ? "" : r >= s.length ? s : s.slice(0, r)
                    },
                    r = setInterval(() => {
                        i(`
        <div class='mb-16'>
          ${s(0)} <br /> ${s(1)}
        </div>
      ` + (e > t[0].length + t[1].length ? `
        <ul class='list-disc pl-8'>
          <li class='pl-10'>${s(2)} <span class="text-label-medium">${s(3)}</span> ${s(4)}</li>
        </ul>` : "")), ++e > t.reduce((e, t) => e + t.length, 0) && (clearInterval(r), a(5), document.querySelector(".ai-chats-chat-bot").getAnimations().forEach(e => {
                            let t = setInterval(() => {
                                e.playbackRate -= .1, e.playbackRate <= 0 && (clearInterval(t), e.pause())
                            }, 100)
                        }))
                    }, 20)
            }, [a]), (0, t.jsxs)("div", {
                className: "text-body-medium",
                children: [(0, t.jsx)("div", {
                    dangerouslySetInnerHTML: {
                        __html: s
                    }
                }), (0, t.jsx)("div", {
                    className: "flex gap-8 mt-16",
                    children: 5 === e && p.map((e, a) => (0, t.jsx)(r.motion.svg, {
                        animate: {
                            opacity: 1,
                            filter: "blur(0px)",
                            y: 0,
                            scale: 1
                        },
                        fill: "none",
                        height: "16",
                        initial: {
                            opacity: 0,
                            filter: "blur(1px)",
                            y: 4,
                            scale: .9
                        },
                        transition: {
                            delay: .4 + .15 * a
                        },
                        viewBox: "0 0 16 16",
                        width: "16",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: e
                    }, a))
                })]
            })
        },
        m = "What's new in the React docs?",
        x = ({
            step: e,
            setStep: a
        }) => {
            let [s, u] = (0, l.useState)(""), h = (0, l.useRef)(null), x = (0, l.useRef)(null);
            return ((0, l.useEffect)(() => {
                (0, c.default)(document.getElementById("ai-chats"), () => {
                    a(0), setTimeout(() => {
                        a(1);
                        let e = 0,
                            t = () => {
                                setTimeout(() => {
                                    (window.innerWidth < 996 ? u(m.slice(Math.max(0, e + 1 - (m.length - 2)), e + 1)) : u(m.slice(0, e + 1)), ++e >= m.length) ? h.current.animate([{
                                        scale: 1
                                    }, {
                                        scale: .95
                                    }, {
                                        scale: .95
                                    }, {
                                        scale: 1
                                    }], {
                                        duration: 200,
                                        delay: 300
                                    }).finished.then(() => {
                                        a(2), setTimeout(() => {
                                            a(3), setTimeout(() => {
                                                a(4)
                                            }, 2e3)
                                        }, 200)
                                    }): t()
                                }, 40 + 30 * Math.random())
                            };
                        t()
                    }, 500)
                }, 1)
            }, [a]), -1 === e) ? null : (0, t.jsxs)(r.motion.div, {
                animate: {
                    y: 0,
                    opacity: 1,
                    scale: 1
                },
                className: "absolute inset-x-24 bottom-24 bg-surface-alpha-72 rounded-full p-12 pl-20 flex gap-8 items-center",
                initial: {
                    y: 32,
                    opacity: 0,
                    scale: .95
                },
                ref: x,
                style: {
                    boxShadow: "0px 40px 48px -20px rgba(0, 0, 0, 0.02), 0px 32px 32px -20px rgba(0, 0, 0, 0.03), 0px 16px 24px -12px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px rgba(0, 0, 0, 0.03)"
                },
                children: [(0, t.jsx)("div", {
                    className: "text-body-input flex-1 flex items-center whitespace-nowrap min-w-0",
                    children: -1 === e || 0 === e ? (0, t.jsx)("div", {
                        className: "text-black-alpha-48",
                        children: "Ask anything..."
                    }) : e >= 2 ? (0, t.jsx)("div", {
                        className: "text-black-alpha-48",
                        children: "Ask a follow-up..."
                    }) : (0, t.jsxs)(t.Fragment, {
                        children: [s, (0, t.jsx)("span", {
                            className: "cursor",
                            children: "|"
                        })]
                    })
                }), (0, t.jsx)(d, {}), (0, t.jsx)("div", {
                    className: (0, n.cn)("size-32 relative rounded-full", e >= 0 ? "bg-accent-black" : "bg-black-alpha-16"),
                    ref: h,
                    children: (0, t.jsx)(i.AnimatePresence, {
                        initial: !1,
                        mode: "popLayout",
                        children: (0, t.jsx)(r.motion.div, {
                            className: "flex-center overlay",
                            children: e >= 2 && 5 !== e ? (0, t.jsx)("div", {
                                className: "size-10 rounded-2 bg-surface"
                            }) : (0, t.jsx)(o, {})
                        }, e >= 2 && 5 !== e ? "stop" : "arrow")
                    })
                })]
            })
        },
        p = [(0, t.jsx)(l.Fragment, {
            children: (0, t.jsx)("path", {
                d: "M10.1666 10.1663V12.6663C10.1666 13.4948 9.49501 14.1663 8.66659 14.1663H3.33325C2.50482 14.1663 1.83325 13.4948 1.83325 12.6663V7.33301C1.83325 6.50458 2.50482 5.83301 3.33325 5.83301H5.83325M7.33325 10.1663H12.6666C13.495 10.1663 14.1666 9.49477 14.1666 8.66634V3.33301C14.1666 2.50458 13.495 1.83301 12.6666 1.83301H7.33325C6.50483 1.83301 5.83325 2.50458 5.83325 3.33301V8.66634C5.83325 9.49477 6.50483 10.1663 7.33325 10.1663Z",
                stroke: "#A5A5A5",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "1.25"
            })
        }, 0), (0, t.jsx)(l.Fragment, {
            children: (0, t.jsx)("path", {
                d: "M12.8412 13.5V10.8333L10.1746 10.8333M3.16667 2.5L3.16667 5.16667H5.83333M2.54255 7.3125C2.51447 7.53772 2.5 7.76717 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5C9.78439 13.5 11.4074 12.6502 12.4214 11.3333M13.4574 8.6875C13.4855 8.46228 13.5 8.23283 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C6.21561 2.5 4.59258 3.34975 3.57856 4.66667",
                stroke: "#A5A5A5",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "1.25"
            })
        }, 1), (0, t.jsxs)(l.Fragment, {
            children: [(0, t.jsx)("path", {
                d: "M1.83325 6.49967H5.16658V13.4997H1.83325V6.49967Z",
                stroke: "#A5A5A5",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "1.25"
            }), (0, t.jsx)("path", {
                d: "M8.27522 1.87203L7.96112 1.83301C6.99992 4.99967 5.16658 5.64195 5.16658 7.52212V11.963C5.16658 12.4979 5.47607 12.9923 5.98188 13.1754C7.69835 13.7965 9.49386 13.9294 11.309 13.7731C12.4174 13.6776 13.2861 12.8269 13.5303 11.7482L14.1151 9.16539C14.4072 7.87509 13.4198 6.64855 12.089 6.64855H9.01227L9.66919 4.52684C10.0488 3.30073 9.55612 2.03114 8.27522 1.87203Z",
                stroke: "#A5A5A5",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "1.25"
            })]
        }, 2), (0, t.jsxs)(l.Fragment, {
            children: [(0, t.jsx)("path", {
                d: "M1.83337 9.16634H5.16671V2.16634H1.83337V9.16634Z",
                stroke: "#A5A5A5",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "1.25"
            }), (0, t.jsx)("path", {
                d: "M8.27535 13.794L7.96125 13.833C7.00004 10.6663 5.16671 10.0241 5.16671 8.1439V3.70304C5.16671 3.16808 5.47619 2.67367 5.982 2.49062C7.69848 1.86947 9.49398 1.73659 11.3091 1.89292C12.4176 1.98838 13.2862 2.83907 13.5304 3.9178L14.1152 6.50063C14.4073 7.79093 13.42 9.01747 12.0891 9.01747H9.0124L9.66932 11.1392C10.0489 12.3653 9.55624 13.6349 8.27535 13.794Z",
                stroke: "#A5A5A5",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "1.25"
            })]
        }, 3)];

    function f() {
        return (0, t.jsxs)("div", {
            className: "h-438 lg-max:relative lg-max:h-520",
            children: [(0, t.jsxs)("div", {
                className: "flex border-b border-border-faint",
                children: [(0, t.jsx)("div", {
                    className: "py-18 px-15 flex gap-10 border-r border-border-faint",
                    children: Array.from({
                        length: 3
                    }).map((e, a) => (0, t.jsx)("div", {
                        className: "size-12 relative before:inside-border before:border-border-muted rounded-full"
                    }, a))
                }), (0, t.jsxs)("div", {
                    className: "py-12 px-16 flex-1 flex items-center border-r border-border-faint",
                    children: [(0, t.jsx)(a.default, {
                        alt: "AI Assistant",
                        className: "opacity-56 mr-8",
                        height: 20,
                        src: "ai/bot",
                        width: 20
                    }), (0, t.jsx)("div", {
                        className: "text-body-small mr-6 text-black-alpha-56",
                        children: "AI Assistant"
                    }), (0, t.jsxs)("div", {
                        className: "py-4 px-10 rounded-full bg-black-alpha-5 flex gap-2 items-center text-[12px]/[16px] font-[450] text-black-alpha-56",
                        children: [(0, t.jsx)("span", {
                            children: "with"
                        }), (0, t.jsx)(s, {}), (0, t.jsx)("span", {
                            children: "Firecrawl"
                        })]
                    })]
                }), (0, t.jsxs)("div", {
                    className: "flex py-14 px-16 gap-8 text-body-small text-black-alpha-56 lg-max:hidden",
                    children: [(0, t.jsx)("div", {
                        className: "size-20 flex-center",
                        children: (0, t.jsxs)("div", {
                            className: "size-12 bg-heat-12 flex-center rounded-full relative",
                            children: [(0, t.jsx)("div", {
                                className: "size-4 bg-heat-100 rounded-full"
                            }), (0, t.jsx)("div", {
                                className: "cw-8 ch-8 absolute border border-heat-100 rounded-full ai-chats-realtime-indicator"
                            })]
                        })
                    }), (0, t.jsx)("span", {
                        children: "Real-time"
                    }), (0, t.jsx)("span", {
                        children: "·"
                    }), (0, t.jsx)("span", {
                        children: "Updated 2 min ago"
                    })]
                })]
            }), (0, t.jsx)(u, {})]
        })
    }
    e.s(["default", () => f], 639251)
}]);

//# debugId=01e4fbfc-9c06-14c1-3a36-cb5f88e88cab
//# sourceMappingURL=c1a5f3d04268cddf.js.map