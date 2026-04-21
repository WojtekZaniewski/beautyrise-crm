;
! function() {
    try {
        var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {},
            n = (new e.Error).stack;
        n && ((e._debugIds || (e._debugIds = {}))[n] = "c51eab1c-fd45-9105-02a5-5d8fd90b4dd5")
    } catch (e) {}
}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 924206, e => {
    "use strict";
    e.s(["sleep", 0, e => new Promise(t => setTimeout(t, e))])
}, 517387, 710842, 978939, e => {
    "use strict";
    let t, a, i;
    var r = e.i(730592),
        n = e.i(154712),
        s = e.i(842744),
        o = e.i(883771);
    let l = {
            extension: {
                type: o.ExtensionType.Environment,
                name: "browser",
                priority: -1
            },
            test: () => !0,
            load: async () => {
                await e.A(221210)
            }
        },
        d = {
            extension: {
                type: o.ExtensionType.Environment,
                name: "webworker",
                priority: 0
            },
            test: () => "u" > typeof self && void 0 !== self.WorkerGlobalScope,
            load: async () => {
                await e.A(777644)
            }
        };
    e.i(310338), e.i(463412), e.i(36189), e.i(785373), o.extensions.add(l, d);
    var c = e.i(69203),
        h = e.i(887301);
    async function p(e = {}) {
        return void 0 !== a ? a : a = await (async () => {
            let t = c.DOMAdapter.get().getNavigator().gpu;
            if (!t) return !1;
            try {
                let a = await t.requestAdapter(e);
                return await a.requestDevice(), !0
            } catch (e) {
                return !1
            }
        })()
    }
    let m = ["webgl", "webgpu", "canvas"];
    async function y(a) {
        let i, r = [];
        a.preference ? (r.push(a.preference), m.forEach(e => {
            e !== a.preference && r.push(e)
        })) : r = m.slice();
        let n = {};
        for (let s = 0; s < r.length; s++) {
            let o = r[s];
            if ("webgpu" === o && await p()) {
                let {
                    WebGPURenderer: t
                } = await e.A(212489);
                i = t, n = { ...a,
                    ...a.webgpu
                };
                break
            }
            if ("webgl" === o && function(e) {
                    return void 0 !== t ? t : t = (() => {
                        let t = {
                            stencil: !0,
                            failIfMajorPerformanceCaveat: e ? ? h.AbstractRenderer.defaultOptions.failIfMajorPerformanceCaveat
                        };
                        try {
                            if (!c.DOMAdapter.get().getWebGLRenderingContext()) return !1;
                            let e = c.DOMAdapter.get().createCanvas().getContext("webgl", t),
                                a = !!e ? .getContextAttributes() ? .stencil;
                            if (e) {
                                let t = e.getExtension("WEBGL_lose_context");
                                t && t.loseContext()
                            }
                            return e = null, a
                        } catch (e) {
                            return !1
                        }
                    })()
                }(a.failIfMajorPerformanceCaveat ? ? h.AbstractRenderer.defaultOptions.failIfMajorPerformanceCaveat)) {
                let {
                    WebGLRenderer: t
                } = await e.A(142398);
                i = t, n = { ...a,
                    ...a.webgl
                };
                break
            }
            if ("canvas" === o) throw n = { ...a
            }, Error("CanvasRenderer is not yet implemented")
        }
        if (delete n.webgpu, delete n.webgl, !i) throw Error("No available renderer for the current environment");
        let s = new i;
        return await s.init(n), s
    }
    var u = e.i(402991),
        g = e.i(936686),
        f = e.i(373839);
    let A = class e {
        constructor(...e) {
            this.stage = new u.Container, void 0 !== e[0] && (0, f.deprecation)(f.v8_0_0, "Application constructor options are deprecated, please use Application.init() instead.")
        }
        async init(t) {
            t = { ...t
            }, this.renderer = await y(t), e._plugins.forEach(e => {
                e.init.call(this, t)
            })
        }
        render() {
            this.renderer.render({
                container: this.stage
            })
        }
        get canvas() {
            return this.renderer.canvas
        }
        get view() {
            return (0, f.deprecation)(f.v8_0_0, "Application.view is deprecated, please use Application.canvas instead."), this.renderer.canvas
        }
        get screen() {
            return this.renderer.screen
        }
        destroy(t = !1, a = !1) {
            let i = e._plugins.slice(0);
            i.reverse(), i.forEach(e => {
                e.destroy.call(this)
            }), this.stage.destroy(a), this.stage = null, this.renderer.destroy(t), this.renderer = null
        }
    };
    A._plugins = [], o.extensions.handleByList(o.ExtensionType.Application, A._plugins), o.extensions.add(g.ApplicationInitHook);
    let w = {
            timeout: 0,
            ignoreInitialCall: !0
        },
        x = function(e, t, a = []) {
            let {
                timeout: i,
                ignoreInitialCall: n
            } = "object" == typeof t ? { ...w,
                ...t
            } : { ...w,
                timeout: t
            }, s = (0, r.useRef)({
                firstTime: !0
            });
            (0, r.useEffect)(() => {
                let t, {
                    firstTime: a
                } = s.current;
                if (a && n) {
                    s.current.firstTime = !1;
                    return
                }
                let r = setTimeout(() => {
                    t = e() ? ? void 0
                }, i);
                return () => {
                    clearTimeout(r), t && "function" == typeof t && t()
                }
            }, [e, n, i, ...a])
        };
    var b = e.i(420851),
        v = e.i(762939),
        k = e.i(207724),
        P = e.i(74067),
        E = e.i(368256),
        C = e.i(297294),
        _ = e.i(639711),
        I = e.i(534070);
    class B extends _.AbstractBitmapFont {
        constructor(e, t) {
            super();
            const {
                textures: a,
                data: i
            } = e;
            Object.keys(i.pages).forEach(e => {
                let t = a[i.pages[parseInt(e, 10)].id];
                this.pages.push({
                    texture: t
                })
            }), Object.keys(i.chars).forEach(e => {
                let t = i.chars[e],
                    {
                        frame: r,
                        source: n
                    } = a[t.page],
                    s = new E.Rectangle(t.x + r.x, t.y + r.y, t.width, t.height),
                    o = new C.Texture({
                        source: n,
                        frame: s
                    });
                this.chars[e] = {
                    id: e.codePointAt(0),
                    xOffset: t.xOffset,
                    yOffset: t.yOffset,
                    xAdvance: t.xAdvance,
                    kerning: t.kerning ? ? {},
                    texture: o
                }
            }), this.baseRenderedFontSize = i.fontSize, this.baseMeasurementFontSize = i.fontSize, this.fontMetrics = {
                ascent: 0,
                descent: 0,
                fontSize: i.fontSize
            }, this.baseLineOffset = i.baseLineOffset, this.lineHeight = i.lineHeight, this.fontFamily = i.fontFamily, this.distanceField = i.distanceField ? ? {
                type: "none",
                range: 0
            }, this.url = t
        }
        destroy() {
            super.destroy();
            for (let e = 0; e < this.pages.length; e++) {
                let {
                    texture: t
                } = this.pages[e];
                t.destroy(!0)
            }
            this.pages = null
        }
        static install(e) {
            I.BitmapFontManager.install(e)
        }
        static uninstall(e) {
            I.BitmapFontManager.uninstall(e)
        }
    }
    let L = {
            test: e => "string" == typeof e && e.startsWith("info face="),
            parse(e) {
                let t = e.match(/^[a-z]+\s+.+$/gm),
                    a = {
                        info: [],
                        common: [],
                        page: [],
                        char: [],
                        chars: [],
                        kerning: [],
                        kernings: [],
                        distanceField: []
                    };
                for (let e in t) {
                    let i = t[e].match(/^[a-z]+/gm)[0],
                        r = t[e].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm),
                        n = {};
                    for (let e in r) {
                        let t = r[e].split("="),
                            a = t[0],
                            i = t[1].replace(/"/gm, ""),
                            s = parseFloat(i),
                            o = isNaN(s) ? i : s;
                        n[a] = o
                    }
                    a[i].push(n)
                }
                let i = {
                        chars: {},
                        pages: [],
                        lineHeight: 0,
                        fontSize: 0,
                        fontFamily: "",
                        distanceField: null,
                        baseLineOffset: 0
                    },
                    [r] = a.info,
                    [n] = a.common,
                    [s] = a.distanceField ? ? [];
                s && (i.distanceField = {
                    range: parseInt(s.distanceRange, 10),
                    type: s.fieldType
                }), i.fontSize = parseInt(r.size, 10), i.fontFamily = r.face, i.lineHeight = parseInt(n.lineHeight, 10);
                let o = a.page;
                for (let e = 0; e < o.length; e++) i.pages.push({
                    id: parseInt(o[e].id, 10) || 0,
                    file: o[e].file
                });
                let l = {};
                i.baseLineOffset = i.lineHeight - parseInt(n.base, 10);
                let d = a.char;
                for (let e = 0; e < d.length; e++) {
                    let t = d[e],
                        a = parseInt(t.id, 10),
                        r = t.letter ? ? t.char ? ? String.fromCharCode(a);
                    "space" === r && (r = " "), l[a] = r, i.chars[r] = {
                        id: a,
                        page: parseInt(t.page, 10) || 0,
                        x: parseInt(t.x, 10),
                        y: parseInt(t.y, 10),
                        width: parseInt(t.width, 10),
                        height: parseInt(t.height, 10),
                        xOffset: parseInt(t.xoffset, 10),
                        yOffset: parseInt(t.yoffset, 10),
                        xAdvance: parseInt(t.xadvance, 10),
                        kerning: {}
                    }
                }
                let c = a.kerning || [];
                for (let e = 0; e < c.length; e++) {
                    let t = parseInt(c[e].first, 10),
                        a = parseInt(c[e].second, 10),
                        r = parseInt(c[e].amount, 10);
                    i.chars[l[a]].kerning[l[t]] = r
                }
                return i
            }
        },
        T = {
            test: e => "string" != typeof e && "getElementsByTagName" in e && e.getElementsByTagName("page").length && null !== e.getElementsByTagName("info")[0].getAttribute("face"),
            parse(e) {
                let t = {
                        chars: {},
                        pages: [],
                        lineHeight: 0,
                        fontSize: 0,
                        fontFamily: "",
                        distanceField: null,
                        baseLineOffset: 0
                    },
                    a = e.getElementsByTagName("info")[0],
                    i = e.getElementsByTagName("common")[0],
                    r = e.getElementsByTagName("distanceField")[0];
                r && (t.distanceField = {
                    type: r.getAttribute("fieldType"),
                    range: parseInt(r.getAttribute("distanceRange"), 10)
                });
                let n = e.getElementsByTagName("page"),
                    s = e.getElementsByTagName("char"),
                    o = e.getElementsByTagName("kerning");
                t.fontSize = parseInt(a.getAttribute("size"), 10), t.fontFamily = a.getAttribute("face"), t.lineHeight = parseInt(i.getAttribute("lineHeight"), 10);
                for (let e = 0; e < n.length; e++) t.pages.push({
                    id: parseInt(n[e].getAttribute("id"), 10) || 0,
                    file: n[e].getAttribute("file")
                });
                let l = {};
                t.baseLineOffset = t.lineHeight - parseInt(i.getAttribute("base"), 10);
                for (let e = 0; e < s.length; e++) {
                    let a = s[e],
                        i = parseInt(a.getAttribute("id"), 10),
                        r = a.getAttribute("letter") ? ? a.getAttribute("char") ? ? String.fromCharCode(i);
                    "space" === r && (r = " "), l[i] = r, t.chars[r] = {
                        id: i,
                        page: parseInt(a.getAttribute("page"), 10) || 0,
                        x: parseInt(a.getAttribute("x"), 10),
                        y: parseInt(a.getAttribute("y"), 10),
                        width: parseInt(a.getAttribute("width"), 10),
                        height: parseInt(a.getAttribute("height"), 10),
                        xOffset: parseInt(a.getAttribute("xoffset"), 10),
                        yOffset: parseInt(a.getAttribute("yoffset"), 10),
                        xAdvance: parseInt(a.getAttribute("xadvance"), 10),
                        kerning: {}
                    }
                }
                for (let e = 0; e < o.length; e++) {
                    let a = parseInt(o[e].getAttribute("first"), 10),
                        i = parseInt(o[e].getAttribute("second"), 10),
                        r = parseInt(o[e].getAttribute("amount"), 10);
                    t.chars[l[i]].kerning[l[a]] = r
                }
                return t
            }
        },
        O = e => !!("string" == typeof e && e.includes("<font>")) && T.test(c.DOMAdapter.get().parseXML(e)),
        M = e => T.parse(c.DOMAdapter.get().parseXML(e)),
        R = [".xml", ".fnt"],
        F = {
            extension: {
                type: o.ExtensionType.CacheParser,
                name: "cacheBitmapFont"
            },
            test: e => e instanceof B,
            getCacheableAssets(e, t) {
                let a = {};
                return e.forEach(e => {
                    a[e] = t, a[`${e}-bitmap`] = t
                }), a[`${t.fontFamily}-bitmap`] = t, a
            }
        },
        S = {
            extension: {
                type: o.ExtensionType.LoadParser,
                priority: v.LoaderParserPriority.Normal
            },
            name: "loadBitmapFont",
            test: e => R.includes(P.path.extname(e).toLowerCase()),
            testParse: async e => L.test(e) || O(e),
            async parse(e, t, a) {
                let i = L.test(e) ? L.parse(e) : M(e),
                    {
                        src: r
                    } = t,
                    {
                        pages: n
                    } = i,
                    s = [],
                    o = i.distanceField ? {
                        scaleMode: "linear",
                        alphaMode: "premultiply-alpha-on-upload",
                        autoGenerateMipmaps: !1,
                        resolution: 1
                    } : {};
                for (let e = 0; e < n.length; ++e) {
                    let t = n[e].file,
                        a = P.path.join(P.path.dirname(r), t);
                    a = (0, k.copySearchParams)(a, r), s.push({
                        src: a,
                        data: o
                    })
                }
                let l = await a.load(s);
                return new B({
                    data: i,
                    textures: s.map(e => l[e.src])
                }, r)
            },
            async load(e, t) {
                let a = await c.DOMAdapter.get().fetch(e);
                return await a.text()
            },
            async unload(e, t, a) {
                await Promise.all(e.pages.map(e => a.unload(e.texture.source._sourceOrigin))), e.destroy()
            }
        };
    var j = e.i(909077);
    class G {
        constructor(e, t = !1) {
            this._loader = e, this._assetList = [], this._isLoading = !1, this._maxConcurrent = 1, this.verbose = t
        }
        add(e) {
            e.forEach(e => {
                this._assetList.push(e)
            }), this.verbose && console.log("[BackgroundLoader] assets: ", this._assetList), this._isActive && !this._isLoading && this._next()
        }
        async _next() {
            if (this._assetList.length && this._isActive) {
                this._isLoading = !0;
                let e = [],
                    t = Math.min(this._assetList.length, this._maxConcurrent);
                for (let a = 0; a < t; a++) e.push(this._assetList.pop());
                await this._loader.load(e), this._isLoading = !1, this._next()
            }
        }
        get active() {
            return this._isActive
        }
        set active(e) {
            this._isActive !== e && (this._isActive = e, e && !this._isLoading && this._next())
        }
    }
    var W = e.i(224021);
    let z = {
        extension: {
            type: o.ExtensionType.CacheParser,
            name: "cacheTextureArray"
        },
        test: e => Array.isArray(e) && e.every(e => e instanceof C.Texture),
        getCacheableAssets: (e, t) => {
            let a = {};
            return e.forEach(e => {
                t.forEach((t, i) => {
                    a[e + (0 === i ? "" : i + 1)] = t
                })
            }), a
        }
    };
    async function U(e) {
        if ("Image" in globalThis) return new Promise(t => {
            let a = new Image;
            a.onload = () => {
                t(!0)
            }, a.onerror = () => {
                t(!1)
            }, a.src = e
        });
        if ("createImageBitmap" in globalThis && "fetch" in globalThis) {
            try {
                let t = await (await fetch(e)).blob();
                await createImageBitmap(t)
            } catch (e) {
                return !1
            }
            return !0
        }
        return !1
    }
    let D = {
            extension: {
                type: o.ExtensionType.DetectionParser,
                priority: 1
            },
            test: async () => U("data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A="),
            add: async e => [...e, "avif"],
            remove: async e => e.filter(e => "avif" !== e)
        },
        $ = ["png", "jpg", "jpeg"],
        N = {
            extension: {
                type: o.ExtensionType.DetectionParser,
                priority: -1
            },
            test: () => Promise.resolve(!0),
            add: async e => [...e, ...$],
            remove: async e => e.filter(e => !$.includes(e))
        },
        H = "WorkerGlobalScope" in globalThis && globalThis instanceof globalThis.WorkerGlobalScope;

    function V(e) {
        return !H && "" !== document.createElement("video").canPlayType(e)
    }
    let Q = {
            extension: {
                type: o.ExtensionType.DetectionParser,
                priority: 0
            },
            test: async () => V("video/mp4"),
            add: async e => [...e, "mp4", "m4v"],
            remove: async e => e.filter(e => "mp4" !== e && "m4v" !== e)
        },
        Z = {
            extension: {
                type: o.ExtensionType.DetectionParser,
                priority: 0
            },
            test: async () => V("video/ogg"),
            add: async e => [...e, "ogv"],
            remove: async e => e.filter(e => "ogv" !== e)
        },
        X = {
            extension: {
                type: o.ExtensionType.DetectionParser,
                priority: 0
            },
            test: async () => V("video/webm"),
            add: async e => [...e, "webm"],
            remove: async e => e.filter(e => "webm" !== e)
        },
        K = {
            extension: {
                type: o.ExtensionType.DetectionParser,
                priority: 0
            },
            test: async () => U("data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="),
            add: async e => [...e, "webp"],
            remove: async e => e.filter(e => "webp" !== e)
        };
    var Y = e.i(795861),
        q = e.i(29470);
    class J {
        constructor() {
            this._parsers = [], this._parsersValidated = !1, this.parsers = new Proxy(this._parsers, {
                set: (e, t, a) => (this._parsersValidated = !1, e[t] = a, !0)
            }), this.promiseCache = {}
        }
        reset() {
            this._parsersValidated = !1, this.promiseCache = {}
        }
        _getLoadPromiseAndParser(e, t) {
            let a = {
                promise: null,
                parser: null
            };
            return a.promise = (async () => {
                let i = null,
                    r = null;
                if (t.loadParser && ((r = this._parserHash[t.loadParser]) || (0, j.warn)(`[Assets] specified load parser "${t.loadParser}" not found while loading ${e}`)), !r) {
                    for (let a = 0; a < this.parsers.length; a++) {
                        let i = this.parsers[a];
                        if (i.load && i.test ? .(e, t, this)) {
                            r = i;
                            break
                        }
                    }
                    if (!r) return (0, j.warn)(`[Assets] ${e} could not be loaded as we don't know how to parse it, ensure the correct parser has been added`), null
                }
                i = await r.load(e, t, this), a.parser = r;
                for (let e = 0; e < this.parsers.length; e++) {
                    let r = this.parsers[e];
                    r.parse && r.parse && await r.testParse ? .(i, t, this) && (i = await r.parse(i, t, this) || i, a.parser = r)
                }
                return i
            })(), a
        }
        async load(e, t) {
            this._parsersValidated || this._validateParsers();
            let a = 0,
                i = {},
                r = (0, q.isSingleItem)(e),
                n = (0, Y.convertToList)(e, e => ({
                    alias: [e],
                    src: e,
                    data: {}
                })),
                s = n.length,
                o = n.map(async e => {
                    let r = P.path.toAbsolute(e.src);
                    if (!i[e.src]) try {
                        this.promiseCache[r] || (this.promiseCache[r] = this._getLoadPromiseAndParser(r, e)), i[e.src] = await this.promiseCache[r].promise, t && t(++a / s)
                    } catch (t) {
                        throw delete this.promiseCache[r], delete i[e.src], Error(`[Loader.load] Failed to load ${r}.
${t}`)
                    }
                });
            return await Promise.all(o), r ? i[n[0].src] : i
        }
        async unload(e) {
            let t = (0, Y.convertToList)(e, e => ({
                alias: [e],
                src: e
            })).map(async e => {
                let t = P.path.toAbsolute(e.src),
                    a = this.promiseCache[t];
                if (a) {
                    let i = await a.promise;
                    delete this.promiseCache[t], await a.parser ? .unload ? .(i, e, this)
                }
            });
            await Promise.all(t)
        }
        _validateParsers() {
            this._parsersValidated = !0, this._parserHash = this._parsers.filter(e => e.name).reduce((e, t) => (t.name ? e[t.name] && (0, j.warn)(`[Assets] loadParser name conflict "${t.name}"`) : (0, j.warn)("[Assets] loadParser should have a name"), { ...e,
                [t.name]: t
            }), {})
        }
    }

    function ee(e, t) {
        if (Array.isArray(t)) {
            for (let a of t)
                if (e.startsWith(`data:${a}`)) return !0;
            return !1
        }
        return e.startsWith(`data:${t}`)
    }

    function et(e, t) {
        let a = e.split("?")[0],
            i = P.path.extname(a).toLowerCase();
        return Array.isArray(t) ? t.includes(i) : i === t
    }
    let ea = {
            extension: {
                type: o.ExtensionType.LoadParser,
                priority: v.LoaderParserPriority.Low
            },
            name: "loadJson",
            test: e => ee(e, "application/json") || et(e, ".json"),
            async load(e) {
                let t = await c.DOMAdapter.get().fetch(e);
                return await t.json()
            }
        },
        ei = {
            name: "loadTxt",
            extension: {
                type: o.ExtensionType.LoadParser,
                priority: v.LoaderParserPriority.Low,
                name: "loadTxt"
            },
            test: e => ee(e, "text/plain") || et(e, ".txt"),
            async load(e) {
                let t = await c.DOMAdapter.get().fetch(e);
                return await t.text()
            }
        },
        er = ["normal", "bold", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
        en = [".ttf", ".otf", ".woff", ".woff2"],
        es = ["font/ttf", "font/otf", "font/woff", "font/woff2"],
        eo = /^(--|-?[A-Z_])[0-9A-Z_-]*$/i,
        el = /^[0-9A-Za-z%:/?#\[\]@!\$&'()\*\+,;=\-._~]*$/,
        ed = {
            extension: {
                type: o.ExtensionType.LoadParser,
                priority: v.LoaderParserPriority.Low
            },
            name: "loadWebFont",
            test: e => ee(e, es) || et(e, en),
            async load(e, t) {
                let a = c.DOMAdapter.get().getFontFaceSet();
                if (a) {
                    let i = [],
                        r = t.data ? .family ? ? function(e) {
                            let t = P.path.extname(e),
                                a = P.path.basename(e, t).replace(/(-|_)/g, " ").toLowerCase().split(" ").map(e => e.charAt(0).toUpperCase() + e.slice(1)),
                                i = a.length > 0;
                            for (let e of a)
                                if (!e.match(eo)) {
                                    i = !1;
                                    break
                                }
                            let r = a.join(" ");
                            return i || (r = `"${r.replace(/[\\"]/g,"\\$&")}"`), r
                        }(e),
                        n = t.data ? .weights ? .filter(e => er.includes(e)) ? ? ["normal"],
                        s = t.data ? ? {};
                    for (let t = 0; t < n.length; t++) {
                        let o = n[t],
                            l = new FontFace(r, `url(${el.test(e)?e:encodeURI(e)})`, { ...s,
                                weight: o
                            });
                        await l.load(), a.add(l), i.push(l)
                    }
                    return W.Cache.set(`${r}-and-url`, {
                        url: e,
                        fontFaces: i
                    }), 1 === i.length ? i[0] : i
                }
                return (0, j.warn)("[loadWebFont] FontFace API is not supported. Skipping loading font"), null
            },
            unload(e) {
                (Array.isArray(e) ? e : [e]).forEach(e => {
                    W.Cache.remove(`${e.family}-and-url`), c.DOMAdapter.get().getFontFaceSet().delete(e)
                })
            }
        };
    var ec = e.i(749382),
        eh = e.i(638872),
        ep = e.i(262761);

    function em(e, t = 1) {
        let a = ep.Resolver.RETINA_PREFIX ? .exec(e);
        return a ? parseFloat(a[1]) : t
    }

    function ey(e, t, a) {
        e.label = a, e._sourceOrigin = a;
        let i = new C.Texture({
                source: e,
                label: a
            }),
            r = () => {
                delete t.promiseCache[a], W.Cache.has(a) && W.Cache.remove(a)
            };
        return i.source.once("destroy", () => {
            t.promiseCache[a] && ((0, j.warn)("[Assets] A TextureSource managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the TextureSource."), r())
        }), i.once("destroy", () => {
            e.destroyed || ((0, j.warn)("[Assets] A Texture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the Texture."), r())
        }), i
    }
    let eu = {
        extension: {
            type: o.ExtensionType.LoadParser,
            priority: v.LoaderParserPriority.Low,
            name: "loadSVG"
        },
        name: "loadSVG",
        config: {
            crossOrigin: "anonymous",
            parseAsGraphicsContext: !1
        },
        test: e => ee(e, "image/svg+xml") || et(e, ".svg"),
        async load(e, t, a) {
            return t.data ? .parseAsGraphicsContext ? ? this.config.parseAsGraphicsContext ? ef(e) : eg(e, t, a, this.config.crossOrigin)
        },
        unload(e) {
            e.destroy(!0)
        }
    };
    async function eg(e, t, a, i) {
        let r = await c.DOMAdapter.get().fetch(e),
            n = await r.blob(),
            s = URL.createObjectURL(n),
            o = new Image;
        o.src = s, o.crossOrigin = i, await o.decode(), URL.revokeObjectURL(s);
        let l = document.createElement("canvas"),
            d = l.getContext("2d"),
            h = t.data ? .resolution || em(e),
            p = t.data ? .width ? ? o.width,
            m = t.data ? .height ? ? o.height;
        l.width = p * h, l.height = m * h, d.drawImage(o, 0, 0, p * h, m * h);
        let {
            parseAsGraphicsContext: y,
            ...u
        } = t.data ? ? {};
        return ey(new ec.ImageSource({
            resource: l,
            alphaMode: "premultiply-alpha-on-upload",
            resolution: h,
            ...u
        }), a, e)
    }
    async function ef(e) {
        let t = await c.DOMAdapter.get().fetch(e),
            a = await t.text(),
            i = new eh.GraphicsContext;
        return i.svg(a), i
    }
    let eA = null;
    class ew {
        constructor() {
            eA || (eA = URL.createObjectURL(new Blob(['(function () {\n    \'use strict\';\n\n    const WHITE_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";\n    async function checkImageBitmap() {\n      try {\n        if (typeof createImageBitmap !== "function")\n          return false;\n        const response = await fetch(WHITE_PNG);\n        const imageBlob = await response.blob();\n        const imageBitmap = await createImageBitmap(imageBlob);\n        return imageBitmap.width === 1 && imageBitmap.height === 1;\n      } catch (_e) {\n        return false;\n      }\n    }\n    void checkImageBitmap().then((result) => {\n      self.postMessage(result);\n    });\n\n})();\n'], {
                type: "application/javascript"
            }))), this.worker = new Worker(eA)
        }
    }
    ew.revokeObjectURL = function() {
        eA && (URL.revokeObjectURL(eA), eA = null)
    };
    let ex = null;
    class eb {
        constructor() {
            ex || (ex = URL.createObjectURL(new Blob(['(function () {\n    \'use strict\';\n\n    async function loadImageBitmap(url, alphaMode) {\n      const response = await fetch(url);\n      if (!response.ok) {\n        throw new Error(`[WorkerManager.loadImageBitmap] Failed to fetch ${url}: ${response.status} ${response.statusText}`);\n      }\n      const imageBlob = await response.blob();\n      return alphaMode === "premultiplied-alpha" ? createImageBitmap(imageBlob, { premultiplyAlpha: "none" }) : createImageBitmap(imageBlob);\n    }\n    self.onmessage = async (event) => {\n      try {\n        const imageBitmap = await loadImageBitmap(event.data.data[0], event.data.data[1]);\n        self.postMessage({\n          data: imageBitmap,\n          uuid: event.data.uuid,\n          id: event.data.id\n        }, [imageBitmap]);\n      } catch (e) {\n        self.postMessage({\n          error: e,\n          uuid: event.data.uuid,\n          id: event.data.id\n        });\n      }\n    };\n\n})();\n'], {
                type: "application/javascript"
            }))), this.worker = new Worker(ex)
        }
    }
    eb.revokeObjectURL = function() {
        ex && (URL.revokeObjectURL(ex), ex = null)
    };
    let ev = 0,
        ek = new class {
            constructor() {
                this._initialized = !1, this._createdWorkers = 0, this._workerPool = [], this._queue = [], this._resolveHash = {}
            }
            isImageBitmapSupported() {
                return void 0 !== this._isImageBitmapSupported || (this._isImageBitmapSupported = new Promise(e => {
                    let {
                        worker: t
                    } = new ew;
                    t.addEventListener("message", a => {
                        t.terminate(), ew.revokeObjectURL(), e(a.data)
                    })
                })), this._isImageBitmapSupported
            }
            loadImageBitmap(e, t) {
                return this._run("loadImageBitmap", [e, t ? .data ? .alphaMode])
            }
            async _initWorkers() {
                this._initialized || (this._initialized = !0)
            }
            _getWorker() {
                void 0 === i && (i = navigator.hardwareConcurrency || 4);
                let e = this._workerPool.pop();
                return !e && this._createdWorkers < i && (this._createdWorkers++, (e = new eb().worker).addEventListener("message", e => {
                    this._complete(e.data), this._returnWorker(e.target), this._next()
                })), e
            }
            _returnWorker(e) {
                this._workerPool.push(e)
            }
            _complete(e) {
                void 0 !== e.error ? this._resolveHash[e.uuid].reject(e.error) : this._resolveHash[e.uuid].resolve(e.data), this._resolveHash[e.uuid] = null
            }
            async _run(e, t) {
                await this._initWorkers();
                let a = new Promise((a, i) => {
                    this._queue.push({
                        id: e,
                        arguments: t,
                        resolve: a,
                        reject: i
                    })
                });
                return this._next(), a
            }
            _next() {
                if (!this._queue.length) return;
                let e = this._getWorker();
                if (!e) return;
                let t = this._queue.pop(),
                    a = t.id;
                this._resolveHash[ev] = {
                    resolve: t.resolve,
                    reject: t.reject
                }, e.postMessage({
                    data: t.arguments,
                    uuid: ev++,
                    id: a
                })
            }
        },
        eP = [".jpeg", ".jpg", ".png", ".webp", ".avif"],
        eE = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    async function eC(e, t) {
        let a = await c.DOMAdapter.get().fetch(e);
        if (!a.ok) throw Error(`[loadImageBitmap] Failed to fetch ${e}: ${a.status} ${a.statusText}`);
        let i = await a.blob();
        return t ? .data ? .alphaMode === "premultiplied-alpha" ? createImageBitmap(i, {
            premultiplyAlpha: "none"
        }) : createImageBitmap(i)
    }
    let e_ = {
        name: "loadTextures",
        extension: {
            type: o.ExtensionType.LoadParser,
            priority: v.LoaderParserPriority.High,
            name: "loadTextures"
        },
        config: {
            preferWorkers: !0,
            preferCreateImageBitmap: !0,
            crossOrigin: "anonymous"
        },
        test: e => ee(e, eE) || et(e, eP),
        async load(e, t, a) {
            let i = null;
            return i = globalThis.createImageBitmap && this.config.preferCreateImageBitmap ? this.config.preferWorkers && await ek.isImageBitmapSupported() ? await ek.loadImageBitmap(e, t) : await eC(e, t) : await new Promise((t, a) => {
                (i = new Image).crossOrigin = this.config.crossOrigin, i.src = e, i.complete ? t(i) : (i.onload = () => {
                    t(i)
                }, i.onerror = a)
            }), ey(new ec.ImageSource({
                resource: i,
                alphaMode: "premultiply-alpha-on-upload",
                resolution: t.data ? .resolution || em(e),
                ...t.data
            }), a, e)
        },
        unload(e) {
            e.destroy(!0)
        }
    };
    var eI = e.i(341834),
        eB = e.i(184089);
    let eL = [".mp4", ".m4v", ".webm", ".ogg", ".ogv", ".h264", ".avi", ".mov"],
        eT = eL.map(e => `video/${e.substring(1)}`),
        eO = {
            name: "loadVideo",
            extension: {
                type: o.ExtensionType.LoadParser,
                name: "loadVideo"
            },
            test(e) {
                let t = ee(e, eT),
                    a = et(e, eL);
                return t || a
            },
            async load(e, t, a) {
                var i;
                let r, n = { ...eI.VideoSource.defaultOptions,
                        resolution: t.data ? .resolution || em(e),
                        alphaMode: t.data ? .alphaMode || await (0, eB.detectVideoAlphaMode)(),
                        ...t.data
                    },
                    s = document.createElement("video"),
                    o = {
                        preload: !1 !== n.autoLoad ? "auto" : void 0,
                        "webkit-playsinline": !1 !== n.playsinline ? "" : void 0,
                        playsinline: !1 !== n.playsinline ? "" : void 0,
                        muted: !0 === n.muted ? "" : void 0,
                        loop: !0 === n.loop ? "" : void 0,
                        autoplay: !1 !== n.autoPlay ? "" : void 0
                    };
                Object.keys(o).forEach(e => {
                    let t = o[e];
                    void 0 !== t && s.setAttribute(e, t)
                }), !0 === n.muted && (s.muted = !0), void 0 !== (i = n.crossorigin) || e.startsWith("data:") ? !1 !== i && (s.crossOrigin = "string" == typeof i ? i : "anonymous") : s.crossOrigin = function(e, t = globalThis.location) {
                    if (e.startsWith("data:")) return "";
                    t || (t = globalThis.location);
                    let a = new URL(e, document.baseURI);
                    return a.hostname !== t.hostname || a.port !== t.port || a.protocol !== t.protocol ? "anonymous" : ""
                }(e);
                let l = document.createElement("source");
                if (e.startsWith("data:")) r = e.slice(5, e.indexOf(";"));
                else if (!e.startsWith("blob:")) {
                    let t = e.split("?")[0].slice(e.lastIndexOf(".") + 1).toLowerCase();
                    r = eI.VideoSource.MIME_TYPES[t] || `video/${t}`
                }
                return l.src = e, r && (l.type = r), new Promise(i => {
                    let r = async () => {
                        let o = new eI.VideoSource({ ...n,
                            resource: s
                        });
                        s.removeEventListener("canplay", r), t.data.preload && await new Promise((e, t) => {
                            function a() {
                                r(), e()
                            }

                            function i(e) {
                                r(), t(e)
                            }

                            function r() {
                                s.removeEventListener("canplaythrough", a), s.removeEventListener("error", i)
                            }
                            s.addEventListener("canplaythrough", a), s.addEventListener("error", i), s.load()
                        }), i(ey(o, a, e))
                    };
                    n.preload && !n.autoPlay && s.load(), s.addEventListener("canplay", r), s.appendChild(l)
                })
            },
            unload(e) {
                e.destroy(!0)
            }
        },
        eM = {
            extension: {
                type: o.ExtensionType.ResolveParser,
                name: "resolveTexture"
            },
            test: e_.test,
            parse: e => ({
                resolution: parseFloat(ep.Resolver.RETINA_PREFIX.exec(e) ? .[1] ? ? "1"),
                format: e.split(".").pop(),
                src: e
            })
        },
        eR = {
            extension: {
                type: o.ExtensionType.ResolveParser,
                priority: -2,
                name: "resolveJson"
            },
            test: e => ep.Resolver.RETINA_PREFIX.test(e) && e.endsWith(".json"),
            parse: eM.parse
        },
        eF = new class {
            constructor() {
                this._detections = [], this._initialized = !1, this.resolver = new ep.Resolver, this.loader = new J, this.cache = W.Cache, this._backgroundLoader = new G(this.loader), this._backgroundLoader.active = !0, this.reset()
            }
            async init(e = {}) {
                if (this._initialized) return void(0, j.warn)("[Assets]AssetManager already initialized, did you load before calling this Assets.init()?");
                if (this._initialized = !0, e.defaultSearchParams && this.resolver.setDefaultSearchParams(e.defaultSearchParams), e.basePath && (this.resolver.basePath = e.basePath), e.bundleIdentifier && this.resolver.setBundleIdentifier(e.bundleIdentifier), e.manifest) {
                    let t = e.manifest;
                    "string" == typeof t && (t = await this.load(t)), this.resolver.addManifest(t)
                }
                let t = e.texturePreference ? .resolution ? ? 1,
                    a = await this._detectFormats({
                        preferredFormats: e.texturePreference ? .format,
                        skipDetections: e.skipDetections,
                        detections: this._detections
                    });
                this.resolver.prefer({
                    params: {
                        format: a,
                        resolution: "number" == typeof t ? [t] : t
                    }
                }), e.preferences && this.setPreferences(e.preferences)
            }
            add(e) {
                this.resolver.add(e)
            }
            async load(e, t) {
                this._initialized || await this.init();
                let a = (0, q.isSingleItem)(e),
                    i = (0, Y.convertToList)(e).map(e => {
                        if ("string" != typeof e) {
                            let t = this.resolver.getAlias(e);
                            return t.some(e => !this.resolver.hasKey(e)) && this.add(e), Array.isArray(t) ? t[0] : t
                        }
                        return this.resolver.hasKey(e) || this.add({
                            alias: e,
                            src: e
                        }), e
                    }),
                    r = this.resolver.resolve(i),
                    n = await this._mapLoadToResolve(r, t);
                return a ? n[i[0]] : n
            }
            addBundle(e, t) {
                this.resolver.addBundle(e, t)
            }
            async loadBundle(e, t) {
                this._initialized || await this.init();
                let a = !1;
                "string" == typeof e && (a = !0, e = [e]);
                let i = this.resolver.resolveBundle(e),
                    r = {},
                    n = Object.keys(i),
                    s = 0,
                    o = 0,
                    l = () => {
                        t ? .(++s / o)
                    },
                    d = n.map(e => {
                        let t = i[e];
                        return o += Object.keys(t).length, this._mapLoadToResolve(t, l).then(t => {
                            r[e] = t
                        })
                    });
                return await Promise.all(d), a ? r[e[0]] : r
            }
            async backgroundLoad(e) {
                this._initialized || await this.init(), "string" == typeof e && (e = [e]);
                let t = this.resolver.resolve(e);
                this._backgroundLoader.add(Object.values(t))
            }
            async backgroundLoadBundle(e) {
                this._initialized || await this.init(), "string" == typeof e && (e = [e]), Object.values(this.resolver.resolveBundle(e)).forEach(e => {
                    this._backgroundLoader.add(Object.values(e))
                })
            }
            reset() {
                this.resolver.reset(), this.loader.reset(), this.cache.reset(), this._initialized = !1
            }
            get(e) {
                if ("string" == typeof e) return W.Cache.get(e);
                let t = {};
                for (let a = 0; a < e.length; a++) t[a] = W.Cache.get(e[a]);
                return t
            }
            async _mapLoadToResolve(e, t) {
                let a = [...new Set(Object.values(e))];
                this._backgroundLoader.active = !1;
                let i = await this.loader.load(a, t);
                this._backgroundLoader.active = !0;
                let r = {};
                return a.forEach(e => {
                    let t = i[e.src],
                        a = [e.src];
                    e.alias && a.push(...e.alias), a.forEach(e => {
                        r[e] = t
                    }), W.Cache.set(a, t)
                }), r
            }
            async unload(e) {
                this._initialized || await this.init();
                let t = (0, Y.convertToList)(e).map(e => "string" != typeof e ? e.src : e),
                    a = this.resolver.resolve(t);
                await this._unloadFromResolved(a)
            }
            async unloadBundle(e) {
                this._initialized || await this.init(), e = (0, Y.convertToList)(e);
                let t = this.resolver.resolveBundle(e),
                    a = Object.keys(t).map(e => this._unloadFromResolved(t[e]));
                await Promise.all(a)
            }
            async _unloadFromResolved(e) {
                let t = Object.values(e);
                t.forEach(e => {
                    W.Cache.remove(e.src)
                }), await this.loader.unload(t)
            }
            async _detectFormats(e) {
                let t = [];
                for (let a of (e.preferredFormats && (t = Array.isArray(e.preferredFormats) ? e.preferredFormats : [e.preferredFormats]), e.detections)) e.skipDetections || await a.test() ? t = await a.add(t) : e.skipDetections || (t = await a.remove(t));
                return t = t.filter((e, a) => t.indexOf(e) === a)
            }
            get detections() {
                return this._detections
            }
            setPreferences(e) {
                this.loader.parsers.forEach(t => {
                    t.config && Object.keys(t.config).filter(t => t in e).forEach(a => {
                        t.config[a] = e[a]
                    })
                })
            }
        };
    o.extensions.handleByList(o.ExtensionType.LoadParser, eF.loader.parsers).handleByList(o.ExtensionType.ResolveParser, eF.resolver.parsers).handleByList(o.ExtensionType.CacheParser, eF.cache.parsers).handleByList(o.ExtensionType.DetectionParser, eF.detections), o.extensions.add(z, N, D, K, Q, Z, X, ea, ei, ed, eu, e_, eO, S, F, eM, eR);
    let eS = {
        loader: o.ExtensionType.LoadParser,
        resolver: o.ExtensionType.ResolveParser,
        cache: o.ExtensionType.CacheParser,
        detection: o.ExtensionType.DetectionParser
    };
    o.extensions.handle(o.ExtensionType.Asset, e => {
        let t = e.ref;
        Object.entries(eS).filter(([e]) => !!t[e]).forEach(([e, a]) => o.extensions.add(Object.assign(t[e], {
            extension: t[e].extension ? ? a
        })))
    }, e => {
        let t = e.ref;
        Object.keys(eS).filter(e => !!t[e]).forEach(e => o.extensions.remove(t[e]))
    });
    var ej = e.i(341156);
    let eG = e => !e.ticker || !e.renderer || !e.stage || !e.renderer.gl || e.renderer.gl.isContextLost();

    function eW({
        tickers: e,
        onInitialized: t,
        onBeforeInitialized: a,
        canvasAttrs: i,
        initOptions: o,
        fps: l = 60,
        resolution: d = 1,
        smartStop: c = !0
    }) {
        let h = (0, r.useRef)(null);
        x(() => {
            let i = h.current;
            if (!i) return;
            let r = [];
            i.style.opacity = "0", a ? .({
                canvas: i
            });
            let s = window.devicePixelRatio || 1,
                p = new A;
            return r.push(() => {
                eG(p) || (p.destroy({}, {
                    children: !0,
                    context: !0,
                    style: !0
                }), i.style.opacity = "0")
            }), (async () => {
                await p.init({
                    canvas: i,
                    resolution: s * d,
                    width: i.clientWidth,
                    height: i.clientHeight,
                    antialias: !1,
                    hello: !1,
                    autoStart: !0,
                    sharedTicker: !1,
                    clearBeforeRender: !0,
                    eventMode: "passive",
                    ...o
                });
                let a = 0,
                    h = p.ticker.add;
                l !== 1 / 0 && (p.ticker.maxFPS = l), p.ticker.safeAdd = function(...e) {
                    if (p.ticker) return 1 === (a += 1) && c && u(), h.apply(p.ticker, e)
                };
                let m = p.ticker.remove;
                p.ticker.safeRemove = function(...e) {
                    if (p.ticker) return 0 == (a -= 1) && c && g(), m.apply(p.ticker, e)
                };
                let y = [],
                    u = () => {
                        p.ticker.start(), y.forEach(e => {
                            e.play()
                        })
                    },
                    g = () => {
                        p.ticker.stop(), y.forEach(e => {
                            e.pause()
                        })
                    };
                for (let t of (p.animate = (...e) => {
                        let t = n.animate(...e);
                        return y.push(t), t.finished.then(() => {
                            y.splice(y.indexOf(t), 1)
                        }), t
                    }, e)) t({
                    app: p,
                    canvas: i
                });
                p.stage.interactive = !1, p.stage.cullable = !0, p.stage.sortableChildren = !1, p.stage.interactiveChildren = !1, p.render(), setTimeout(() => {
                    t ? .({
                        canvas: i
                    }), i.style.opacity = "1"
                }, 100);
                let f = new IntersectionObserver(([e]) => {
                        e.isIntersecting ? 0 === a && c || u() : g()
                    }),
                    A = new ResizeObserver(() => {
                        p.renderer.resize(i.clientWidth, i.clientHeight), p.renderer.render(p.stage)
                    });
                f.observe(i), A.observe(i), r.push(() => {
                    A.disconnect(), f.disconnect()
                })
            })(), () => {
                r.forEach(e => e())
            }
        }, {
            timeout: 1,
            ignoreInitialCall: !1
        }, []);
        let p = (0, r.useMemo)(() => (0, s.nanoid)(), [e]);
        return (0, r.createElement)("canvas", { ...i,
            className: (0, b.cn)(i ? .className),
            key: p,
            ref: h,
            style: { ...i ? .style,
                opacity : 0
            }
        })
    }
    e.s(["default", () => eW], 517387), e.s(["CELL_SIZE", () => eV, "MAIN_COLOR", () => eQ, "default", () => eK], 978939);
    var ez = e.i(989873),
        eU = e.i(294232);

    function eD(e) {
        let t = "container" === e.type ? new u.Container : e.type instanceof ej.Sprite ? e.type : new eU.Graphics;
        e.alpha ? ? = 1, e.scale ? ? = 1, e.centering ? ? = !0, e.rotation ? ? = 0;
        let a = { ...e
            },
            i = () => {
                if (!eG(e.app) && !t.destroyed) {
                    if (t.scale.set(a.scale), t.alpha = a.alpha, t.rotation = a.rotation, !(t instanceof eU.Graphics)) {
                        t instanceof ej.Sprite && (t.x = a.x, t.y = a.y);
                        return
                    }
                    t.clear(), "arc" !== a.type ? t.roundRect(a.centering ? a.x - a.width / 2 : a.x, a.centering ? a.y - a.height / 2 : a.y, a.width, a.height, a.radius) : t.arc(a.x, a.y, a.width / 2, 0, 2 * Math.PI), t.fill({
                        color: a.color
                    })
                }
            };
        return i(), a.animationConfig ? ? = {
            duration: .4,
            ease: (0, ez.cubicBezier)(.83, 0, .17, 1)
        }, {
            defaultProps: e,
            currentProps: a,
            graphic: t,
            setStyle: e => {
                Object.assign(a, e), i()
            },
            render: i,
            animate: (t, r) => e.app.animate(a, t, { ...a.animationConfig,
                ...r,
                onUpdate: i
            }),
            reset: () => e.app.animate(a, e, {
                onUpdate: i
            })
        }
    }
    e.s(["default", () => eD], 710842);
    let e$ = class {
        static load(...e) {
            if (0 === e.length) return Promise.reject(Error("No sources provided"));
            if (1 === e.length) {
                let t = e[0];
                return eF.load(t)
            }
            return Promise.all(e.map(e => this.load(e)))
        }
    };
    var eN = e.i(924206);

    function eH(e) {
        return eD({ ...e,
            width: 2,
            height: 2,
            radius: 10,
            color: eQ,
            type: "arc"
        })
    }
    let eV = 80,
        eQ = 0xe6e6e6,
        eZ = [async function e(e) {
            let t = Array.from({
                    length: 15
                }, () => eD({
                    app: e.app,
                    x: eV / 2,
                    y: eV / 2,
                    width: 10,
                    height: 10,
                    radius: 0,
                    color: eQ
                })),
                a = Array.from({
                    length: 25
                }, () => eH({
                    x: eV / 2,
                    y: eV / 2,
                    app: e.app
                }));
            a.forEach(t => e.blinkingContainer.container.addChild(t.graphic)), await (0, eN.sleep)(500), await Promise.all([
                [0, 12, 13, 14].map(e => a[e].animate({
                    x: 30,
                    y: 30
                }, {
                    delay: .2
                })), [1, 15, 16, 17].map(e => a[e].animate({
                    x: eV - 30,
                    y: 30
                }, {
                    delay: .2
                })), [2, 18, 19, 20].map(e => a[e].animate({
                    x: 30,
                    y: eV - 30
                }, {
                    delay: .2
                })), [3, 21, 22, 23].map(e => a[e].animate({
                    x: eV - 30,
                    y: eV - 30
                }, {
                    delay: .2
                })), e.anchorGraphic.animate({
                    radius: 0,
                    width: 12,
                    height: 12
                })
            ].flat()), t.forEach(t => e.blinkingContainer.container.addChild(t.graphic)), t.unshift(e.anchorGraphic), await (0, eN.sleep)(500), e.blinkingContainer.blink({
                delay: .1
            }), await e.blinkingContainer.shrink(), await Promise.all([
                [0, 12, 13, 14].map(e => a[e].animate({
                    x: 22,
                    y: 22
                })), [1, 15, 16, 17].map(e => a[e].animate({
                    x: eV - 22,
                    y: 22
                })), [2, 18, 19, 20].map(e => a[e].animate({
                    x: 22,
                    y: eV - 22
                })), [3, 21, 22, 23].map(e => a[e].animate({
                    x: eV - 22,
                    y: eV - 22
                })), a[4].animate({
                    x: 40,
                    y: 22
                }), a[5].animate({
                    x: 22,
                    y: 40
                }), a[6].animate({
                    x: eV - 22,
                    y: 40
                }), a[7].animate({
                    x: 40,
                    y: 58
                }), a[8].animate({
                    x: 40,
                    y: 22
                }), a[9].animate({
                    x: 22,
                    y: 40
                }), a[10].animate({
                    x: eV - 22,
                    y: 40
                }), a[11].animate({
                    x: 40,
                    y: 58
                }), t[0].animate({
                    width: 10,
                    height: 10
                }), t.slice(0, 4).map(e => e.animate({
                    x: 31,
                    y: 31
                })), t.slice(4, 8).map(e => e.animate({
                    x: eV - 31,
                    y: 31
                })), t.slice(8, 12).map(e => e.animate({
                    x: 31,
                    y: eV - 31
                })), t.slice(12, 16).map(e => e.animate({
                    x: eV - 31,
                    y: eV - 31
                }))
            ].flat()), await (0, eN.sleep)(1e3), e.blinkingContainer.blink({
                delay: .1
            }), await e.blinkingContainer.shrink(), await Promise.all([a[0].animate({
                x: 4,
                y: 4
            }), a[1].animate({
                x: eV - 4,
                y: 4
            }), a[2].animate({
                x: 4,
                y: eV - 4
            }), a[3].animate({
                x: eV - 4,
                y: eV - 4
            }), a[4].animate({
                x: 40,
                y: 4
            }), a[5].animate({
                x: 4,
                y: 40
            }), a[6].animate({
                x: 76,
                y: 40
            }), a[7].animate({
                x: 40,
                y: 76
            }), a[13].animate({
                x: 22,
                y: 4
            }), a[14].animate({
                x: 4,
                y: 22
            }), a[16].animate({
                x: 58,
                y: 4
            }), a[17].animate({
                x: 76,
                y: 22
            }), a[19].animate({
                x: 4,
                y: 58
            }), a[20].animate({
                x: 22,
                y: 76
            }), a[22].animate({
                x: 58,
                y: 76
            }), a[23].animate({
                x: 76,
                y: 58
            }), t.map((e, t) => {
                let a = Math.floor(t / 4),
                    i = t % 4,
                    r = Math.floor(i / 2) + (a < 2 ? 1 : 3);
                return e.animate({
                    x: 13 + ((i % 2 == 0 ? 1 : 2) + 2 * (a % 2 != 0) - 1) * 18,
                    y: 13 + (r - 1) * 18
                })
            })].flat()), await (0, eN.sleep)(1200), Promise.all(a.map(e => e.animate({
                alpha: 0
            }, {
                delay: .3 * Math.random()
            }))), await (0, eN.sleep)(100), e.blinkingContainer.blink({
                delay: .2
            });
            let i = [];
            for (let e = 0; e < t.length; e++)
                if (e % 2 == 0) i.push(20 + 28 * Math.random());
                else {
                    let t = 62 - i[e - 1];
                    i.push(10 + Math.random() * t)
                }
            await Promise.all([t.map((e, t) => {
                let a = 8 + 6 * Math.floor(t / 2) + 8 * Math.floor(t / 4);
                return e.animate({
                    y: a,
                    x: (t % 2 == 0 ? 8 : i[t - 1] + 10) + i[t] / 2,
                    height: 4,
                    width: i[t]
                }, {
                    delay: .1 * Math.random()
                })
            })]), e.blinkingContainer.blink({
                delay: .1
            }), await (0, eN.sleep)(2e3), await Promise.all([t.map(t => t.animate(e.anchorGraphic.defaultProps, {
                delay: .3 * Math.random(),
                duration: .3
            }))].flat()), t.shift(), t.forEach(e => e.graphic.destroy()), a.forEach(e => e.graphic.destroy())
        }, async function e(e) {
            let t = Array.from({
                    length: 8
                }, () => eD({
                    app: e.app,
                    x: eV / 2,
                    y: eV / 2,
                    width: 10,
                    height: 10,
                    radius: 0,
                    color: eQ
                })),
                a = Array.from({
                    length: 20
                }, () => eH({
                    x: eV / 2,
                    y: eV / 2,
                    app: e.app
                }));
            a.forEach(t => e.blinkingContainer.container.addChild(t.graphic)), await (0, eN.sleep)(500), await e.anchorGraphic.animate({
                radius: 0,
                width: 12,
                height: 12
            }), t.forEach(t => e.blinkingContainer.container.addChild(t.graphic)), t.unshift(e.anchorGraphic), await (0, eN.sleep)(500), e.blinkingContainer.blink({
                delay: .1
            }), await e.blinkingContainer.shrink(), await Promise.all([a.slice(0, 16).map((e, t) => {
                let a = 13 + 18 * Math.floor(t / 4);
                return e.animate({
                    x: 13 + t % 4 * 18,
                    y: a
                })
            }), t[0].animate({
                width: 10,
                height: 10
            }), t.map((e, t) => {
                let a = 22 + 18 * Math.floor(t / 3);
                return e.animate({
                    x: 22 + t % 3 * 18,
                    y: a
                })
            })].flat()), await (0, eN.sleep)(300), e.blinkingContainer.blink({
                delay: .1
            }), await e.blinkingContainer.shrink();
            let i = [];
            for (let [e, t] of [
                    [13, 13],
                    [31, 31],
                    [49, 31],
                    [13, 31],
                    [49, 49],
                    [67, 49],
                    [13, 49],
                    [31, 67],
                    [67, 67]
                ])
                for (let a of [{
                        x: e - 9,
                        y: t - 9
                    }, {
                        x: e + 9,
                        y: t - 9
                    }, {
                        x: e - 9,
                        y: t + 9
                    }, {
                        x: e + 9,
                        y: t + 9
                    }]) i.includes(`${a.x},${a.y}`) || i.push(`${a.x},${a.y}`);
            await Promise.all([t[0].animate({
                x: 13,
                y: 13
            }), t[1].animate({
                x: 31,
                y: 31
            }), t[2].animate({
                x: 49,
                y: 31
            }), t[3].animate({
                x: 13,
                y: 31
            }), t[4].animate({
                x: 49,
                y: 49
            }), t[5].animate({
                x: 67,
                y: 49
            }), t[6].animate({
                x: 13,
                y: 49
            }), t[7].animate({
                x: 31,
                y: 67
            }), t[8].animate({
                x: 67,
                y: 67
            }), a.map((e, t) => {
                let a = i[t].split(",").map(Number);
                return e.animate({
                    x: a[0],
                    y: a[1]
                })
            })].flat()), await (0, eN.sleep)(500);
            let r = Array.from({
                length: 8
            }, () => eD({
                app: e.app,
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                radius: 0,
                color: eQ,
                centering: !1,
                animationConfig: {
                    duration: .25,
                    ease: "linear"
                }
            }));
            r.forEach(t => e.blinkingContainer.container.addChild(t.graphic)), (async () => {
                r[0].setStyle({
                    width: 1,
                    height: 0,
                    y: 18,
                    x: 12.5
                }), await r[0].animate({
                    height: 9
                }), r[1].setStyle({
                    width: 0,
                    height: 1,
                    y: 30.5,
                    x: 18
                }), await r[1].animate({
                    width: 9
                }), r[2].setStyle({
                    width: 0,
                    height: 1,
                    y: 30.5,
                    x: 36
                }), await r[2].animate({
                    width: 9
                }), r[3].setStyle({
                    width: 1,
                    height: 3,
                    y: 36,
                    x: 48.5
                }), await r[3].animate({
                    height: 9
                }), r[4].setStyle({
                    width: 0,
                    height: 1,
                    y: 48.5,
                    x: 54
                }), await r[4].animate({
                    width: 9
                })
            })(), r[5].setStyle({
                width: 0,
                height: 1,
                y: 66.5,
                x: 62
            }), await r[5].animate({
                width: 28,
                x: 34
            }, {
                duration: .4
            }), r[6].setStyle({
                width: 0,
                height: 1,
                y: 66.5,
                x: 26
            }), await r[6].animate({
                width: 13.5,
                x: 12.5
            }), r[7].setStyle({
                width: 1,
                height: 0,
                y: 66.5,
                x: 12.5
            }), await r[7].animate({
                height: 14.5,
                y: 53
            }), await (0, eN.sleep)(2e3), e.blinkingContainer.blink({
                delay: .1
            }), await Promise.all([r.map(e => e.animate({
                alpha: 0
            })), t.map(t => t.animate(e.anchorGraphic.defaultProps, {
                delay: .3 * Math.random(),
                duration: .3
            })), a.map(e => e.animate(e.defaultProps, {
                delay: .3 * Math.random()
            }))].flat()), t.shift(), r.forEach(e => e.graphic.destroy()), t.forEach(e => e.graphic.destroy()), a.forEach(e => e.graphic.destroy())
        }, async function(e) {
            let t = Array.from({
                    length: 8
                }, () => eD({
                    app: e.app,
                    x: eV / 2,
                    y: eV / 2,
                    width: 10,
                    height: 10,
                    radius: 0,
                    color: eQ
                })),
                a = Array.from({
                    length: 16
                }, () => eH({
                    x: eV / 2,
                    y: eV / 2,
                    app: e.app
                }));
            for await (let i of (a.forEach(t => e.blinkingContainer.container.addChild(t.graphic)), await (0, eN.sleep)(500), await e.anchorGraphic.animate({
                radius: 0,
                width: 12,
                height: 12
            }), t.forEach(t => e.blinkingContainer.container.addChild(t.graphic)), t.unshift(e.anchorGraphic), await (0, eN.sleep)(500), e.blinkingContainer.blink({
                delay: .1
            }), await e.blinkingContainer.shrink(), await Promise.all([a.map((e, t) => {
                let a = 13 + 18 * Math.floor(t / 4);
                return e.animate({
                    x: 13 + t % 4 * 18,
                    y: a
                })
            }), t[0].animate({
                width: 10,
                height: 10
            }), t.map((e, t) => {
                let a = 22 + 18 * Math.floor(t / 3);
                return e.animate({
                    x: 22 + t % 3 * 18,
                    y: a
                })
            })].flat()), await (0, eN.sleep)(300), Promise.all([t.map(e => e.animate({
                alpha: .68
            })), a.map(e => e.animate({
                alpha: .68
            }))].flat()), e.blinkingContainer.blink(), await (0, eN.sleep)(400), t)) {
                let e = i.currentProps.x,
                    t = i.currentProps.y,
                    r = a.filter(a => {
                        let i = Math.abs(a.currentProps.x - e),
                            r = Math.abs(a.currentProps.y - t);
                        return 0 === i && 9 === r || 9 === i && 0 === r || 9 === i && 9 === r
                    });
                await Promise.all([r.map(e => e.animate({
                    alpha: 1
                }, {
                    duration: .75
                })), i.animate({
                    alpha: 1,
                    width: 14,
                    height: 14
                }, {
                    duration: .75
                })].flat()), i.animate({
                    alpha: .68,
                    width: 10,
                    height: 10
                }, {
                    duration: .75
                }), Promise.all(r.map(e => e.animate({
                    alpha: .68
                }, {
                    duration: .75
                })))
            }
            await Promise.all([t.map(t => t.animate(e.anchorGraphic.defaultProps, {
                delay: .3 * Math.random(),
                duration: .3
            })), a.map(e => e.animate(e.defaultProps, {
                delay: .3 * Math.random()
            }))].flat()), t.shift(), t.forEach(e => e.graphic.destroy()), a.forEach(e => e.graphic.destroy())
        }, async function e(e) {
            let t = Array.from({
                    length: 6
                }, () => eD({
                    app: e.app,
                    x: eV / 2,
                    y: eV / 2,
                    width: 8,
                    height: 8,
                    radius: 0,
                    color: eQ
                })),
                a = Array.from({
                    length: 16
                }, () => eH({
                    x: eV / 2,
                    y: eV / 2,
                    app: e.app
                }));
            a.forEach(t => e.blinkingContainer.container.addChild(t.graphic)), await (0, eN.sleep)(500), await Promise.all([a[0].animate({
                x: 30,
                y: 30
            }, {
                delay: .2
            }), a[1].animate({
                x: eV - 30,
                y: 30
            }, {
                delay: .2
            }), a[2].animate({
                x: 30,
                y: eV - 30
            }, {
                delay: .2
            }), a[3].animate({
                x: eV - 30,
                y: eV - 30
            }, {
                delay: .2
            }), e.anchorGraphic.animate({
                radius: 0,
                width: 12,
                height: 12
            })].flat()), t.forEach(t => e.blinkingContainer.container.addChild(t.graphic)), t.unshift(e.anchorGraphic), await (0, eN.sleep)(500), e.blinkingContainer.blink({
                delay: .3
            }), await e.blinkingContainer.shrink();
            let i = await e$.load("/assets-original/hero-crawl-lines.png"),
                r = new ej.Sprite(i);
            r.x = 13, r.y = 39, r.width = 54, r.height = 34, r.zIndex = -2;
            let s = eD({
                x: r.x,
                y: r.y,
                color: 0xf9f9f9,
                width: r.width,
                height: r.height,
                app: e.app,
                radius: 0,
                centering: !1
            });
            s.graphic.zIndex = -1, e.blinkingContainer.container.addChild(r, s.graphic), await Promise.all([s.animate({
                height: 23,
                y: 50
            }), t[0].animate({
                width: 16,
                height: 16,
                y: 34
            }), t.slice(1, 4).map(e => e.animate({
                x: 24,
                y: 50
            })), t.slice(4, 8).map(e => e.animate({
                x: 56,
                y: 50
            })), a[0].animate({
                x: 28,
                y: 22
            }), a[1].animate({
                x: 52,
                y: 22
            }), a[2].animate({
                x: 16,
                y: 58
            }), a[3].animate({
                x: 64,
                y: 58
            }), a[4].animate({
                x: 16,
                y: 42
            }), a[5].animate({
                x: 64,
                y: 42
            }), a[6].animate({
                x: 32,
                y: 58
            }), a[7].animate({
                x: 48,
                y: 58
            }), a.slice(8, 12).map(e => e.animate({
                x: 24,
                y: 50
            })), a.slice(12, 16).map(e => e.animate({
                x: 56,
                y: 50
            }))].flat()), await (0, eN.sleep)(500), e.blinkingContainer.blink({
                delay: .3
            }), await e.blinkingContainer.shrink();
            try {
                await Promise.all([s.animate({
                    height: 8,
                    y: 58
                }), (0, n.animate)(r.y, 33, { ...t[1].currentProps.animationConfig,
                    delay: .01,
                    onUpdate: e => {
                        r.destroyed || (r.y = e)
                    }
                }), t[0].animate({
                    y: 28
                }), [1, 4].map(e => t[e].animate({
                    y: 44
                })), [2, 3].map(e => t[e].animate({
                    x: 12,
                    y: 56
                })), [5, 6].map(e => t[e].animate({
                    x: 68,
                    y: 56
                })), a[0].animate({
                    y: 16
                }), a[1].animate({
                    y: 16
                }), a[2].animate({
                    x: 4,
                    y: 64
                }), a[3].animate({
                    x: 76,
                    y: 64
                }), a[4].animate({
                    x: 4,
                    y: 48
                }), a[5].animate({
                    x: 76,
                    y: 48
                }), a[6].animate({
                    x: 20,
                    y: 64
                }), a[7].animate({
                    x: 60,
                    y: 64
                }), a[8].animate({
                    x: 16,
                    y: 36
                }), a[12].animate({
                    x: 64,
                    y: 36
                }), a[9].animate({
                    x: 32,
                    y: 52
                }), a[13].animate({
                    x: 48,
                    y: 52
                }), [10, 11].map(e => a[e].animate({
                    x: 12,
                    y: 56
                })), [14, 15].map(e => a[e].animate({
                    x: 68,
                    y: 56
                }))].flat())
            } catch (e) {
                console.error(e)
            }
            await (0, eN.sleep)(500), e.blinkingContainer.blink({
                delay: .3
            }), await e.blinkingContainer.shrink();
            try {
                await Promise.all([s.animate({
                    height: 0,
                    y: 66
                }), (0, n.animate)(r.y, 25, { ...t[1].currentProps.animationConfig,
                    delay: .01,
                    onUpdate: e => {
                        r.destroyed || (r.y = e)
                    }
                }), t[0].animate({
                    y: 20
                }), [1, 4].map(e => t[e].animate({
                    y: 36
                })), [2, 5].map(e => t[e].animate({
                    y: 48
                })), [3, 6].map(e => t[e].animate({
                    y: 60,
                    x: 3 === e ? 24 : 56
                })), [0, 1, 4, 5, 8, 9, 12, 13].map(e => a[e].animate({
                    y: a[e].currentProps.y - 8
                })), a[2].animate({
                    x: 4,
                    y: 56
                }), a[3].animate({
                    x: 76,
                    y: 56
                }), a[6].animate({
                    x: 32,
                    y: 68
                }), a[7].animate({
                    x: 48,
                    y: 68
                }), a[10].animate({
                    x: 32,
                    y: 52
                }), a[11].animate({
                    x: 16,
                    y: 68
                }), a[14].animate({
                    x: 48,
                    y: 52
                }), a[15].animate({
                    x: 64,
                    y: 68
                })].flat())
            } catch (e) {
                console.error(e)
            }
            await (0, eN.sleep)(2e3), await Promise.all([t.map(t => t.animate(e.anchorGraphic.defaultProps, {
                delay: .3 * Math.random(),
                duration: .3
            })), a.map(e => e.animate(e.defaultProps, {
                delay: .3 * Math.random()
            })), (0, n.animate)(r.alpha, 0, {
                duration: .3,
                onUpdate: e => {
                    r.alpha = e
                }
            })].flat()), t.shift(), t.forEach(e => e.graphic.destroy()), a.forEach(e => e.graphic.destroy()), s.graphic.destroy(), r.destroy()
        }],
        eX = -1;

    function eK(e) {
        let t = function({
                x: e,
                y: t,
                app: a
            }) {
                let i = eD({
                    app: a,
                    x: 0,
                    y: 0,
                    width: eV,
                    height: eV,
                    radius: 0,
                    color: 0xededed,
                    type: "container"
                });
                i.graphic.pivot.set(eV / 2, eV / 2), i.graphic.x = e + eV / 2, i.graphic.y = t + eV / 2, i.graphic.addChild(new eU.Graphics().rect(0, 0, eV, eV).fill({
                    color: "#EDEDED",
                    alpha: 0
                }));
                let r = new eU.Graphics().rect(0, 0, eV, eV).fill({
                    color: "#F9F9F9"
                });
                return r.zIndex = 1, r.alpha = 0, i.graphic.addChild(r), {
                    container: i.graphic,
                    animate: i.animate,
                    reset: i.reset,
                    shrink: async () => {
                        await i.animate({
                            scale: .92
                        }), i.animate({
                            scale: 1
                        })
                    },
                    blink: ({
                        delay: e = 0
                    } = {}) => {
                        a.animate(0, .32, {
                            repeatType: "reverse",
                            repeat: 2,
                            delay: e,
                            duration: .065,
                            ease: "linear",
                            onUpdate: e => {
                                r.alpha = e
                            }
                        }).then(() => {
                            a.animate(.32, 0, {
                                duration: .065,
                                ease: "linear",
                                onUpdate: e => {
                                    r.alpha = e
                                }
                            })
                        })
                    }
                }
            }({
                x: e.x + 10,
                y: e.y + 10,
                app: e.app
            }),
            a = eD({
                app: e.app,
                x: eV / 2,
                y: eV / 2,
                width: 4,
                height: 4,
                radius: 10,
                color: eQ
            });
        t.container.addChild(a.graphic), e.app.stage.addChild(t.container);
        let i = !1;
        return {
            trigger: async () => {
                if (i) return;
                i = !0, eX = (eX + 1) % eZ.length;
                let r = eZ[eX];
                await r({ ...e,
                    blinkingContainer: t,
                    anchorGraphic: a
                }), i = !1
            }
        }
    }
}]);

//# debugId=c51eab1c-fd45-9105-02a5-5d8fd90b4dd5
//# sourceMappingURL=b5b71abaddfb4651.js.map