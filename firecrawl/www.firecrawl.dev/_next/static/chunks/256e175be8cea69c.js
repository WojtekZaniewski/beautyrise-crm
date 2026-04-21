;
! function() {
    try {
        var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {},
            n = (new e.Error).stack;
        n && ((e._debugIds || (e._debugIds = {}))[n] = "5701cb07-ab51-d626-365f-0637b2899114")
    } catch (e) {}
}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 112287, 784920, 542648, 749382, 184089, 341834, t => {
    "use strict";
    let e;
    var i = t.i(883771),
        s = t.i(341156),
        r = t.i(601730),
        a = t.i(29891);
    let n = new r.Bounds;

    function l(t, e, i) {
        t.measurable = !0, (0, a.getGlobalBounds)(t, i, n), e.addBoundsMask(n), t.measurable = !1
    }
    var o = t.i(808944),
        h = t.i(691840),
        u = t.i(909077);

    function c(t, e, i) {
        let s = h.boundsPool.get();
        t.measurable = !0;
        let r = h.matrixPool.get().identity(),
            a = function t(e, i, s) {
                return e ? e !== i && (t(e.parent, i, s), e.updateLocalTransform(), s.append(e.localTransform)) : (0, u.warn)("Mask bounds, renderable is not inside the root container"), s
            }(t, i, r);
        (0, o.getLocalBounds)(t, s, a), t.measurable = !1, e.addBoundsMask(s), h.matrixPool.return(r), h.boundsPool.return(s)
    }
    class d {
        constructor(t) {
            this.priority = 0, this.inverse = !1, this.pipe = "alphaMask", t ? .mask && this.init(t.mask)
        }
        init(t) {
            this.mask = t, this.renderMaskToTexture = !(t instanceof s.Sprite), this.mask.renderable = this.renderMaskToTexture, this.mask.includeInBuild = !this.renderMaskToTexture, this.mask.measurable = !1
        }
        reset() {
            this.mask.measurable = !0, this.mask = null
        }
        addBounds(t, e) {
            this.inverse || l(this.mask, t, e)
        }
        addLocalBounds(t, e) {
            c(this.mask, t, e)
        }
        containsPoint(t, e) {
            return e(this.mask, t)
        }
        destroy() {
            this.reset()
        }
        static test(t) {
            return t instanceof s.Sprite
        }
    }
    d.extension = i.ExtensionType.MaskEffect, t.s(["AlphaMask", () => d], 112287);
    class p {
        constructor(t) {
            this.priority = 0, this.pipe = "colorMask", t ? .mask && this.init(t.mask)
        }
        init(t) {
            this.mask = t
        }
        destroy() {}
        static test(t) {
            return "number" == typeof t
        }
    }
    p.extension = i.ExtensionType.MaskEffect, t.s(["ColorMask", () => p], 784920);
    var f = t.i(402991);
    class x {
        constructor(t) {
            this.priority = 0, this.pipe = "stencilMask", t ? .mask && this.init(t.mask)
        }
        init(t) {
            this.mask = t, this.mask.includeInBuild = !1, this.mask.measurable = !1
        }
        reset() {
            this.mask.measurable = !0, this.mask.includeInBuild = !0, this.mask = null
        }
        addBounds(t, e) {
            l(this.mask, t, e)
        }
        addLocalBounds(t, e) {
            c(this.mask, t, e)
        }
        containsPoint(t, e) {
            return e(this.mask, t)
        }
        destroy() {
            this.reset()
        }
        static test(t) {
            return t instanceof f.Container
        }
    }
    x.extension = i.ExtensionType.MaskEffect, t.s(["StencilMask", () => x], 542648);
    var y = t.i(603891);
    class g extends y.TextureSource {
        constructor(t) {
            super(t), this.uploadMethodId = "image", this.autoGarbageCollect = !0
        }
        static test(t) {
            return globalThis.HTMLImageElement && t instanceof HTMLImageElement || "u" > typeof ImageBitmap && t instanceof ImageBitmap || globalThis.VideoFrame && t instanceof VideoFrame
        }
    }
    g.extension = i.ExtensionType.TextureSource, t.s(["ImageSource", () => g], 749382);
    var _ = t.i(433864);
    async function m() {
        return e ? ? (e = (async () => {
            let t = document.createElement("canvas").getContext("webgl");
            if (!t) return "premultiply-alpha-on-upload";
            let e = await new Promise(t => {
                let e = document.createElement("video");
                e.onloadeddata = () => t(e), e.onerror = () => t(null), e.autoplay = !1, e.crossOrigin = "anonymous", e.preload = "auto", e.src = "data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM=", e.load()
            });
            if (!e) return "premultiply-alpha-on-upload";
            let i = t.createTexture();
            t.bindTexture(t.TEXTURE_2D, i);
            let s = t.createFramebuffer();
            t.bindFramebuffer(t.FRAMEBUFFER, s), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, i, 0), t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL, t.NONE), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e);
            let r = new Uint8Array(4);
            return t.readPixels(0, 0, 1, 1, t.RGBA, t.UNSIGNED_BYTE, r), t.deleteFramebuffer(s), t.deleteTexture(i), t.getExtension("WEBGL_lose_context") ? .loseContext(), r[0] <= r[3] ? "premultiplied-alpha" : "premultiply-alpha-on-upload"
        })()), e
    }
    t.s(["detectVideoAlphaMode", () => m], 184089);
    var S = y;
    let b = class t extends S.TextureSource {
        constructor(e) {
            super(e), this.isReady = !1, this.uploadMethodId = "video", e = { ...t.defaultOptions,
                ...e
            }, this._autoUpdate = !0, this._isConnectedToTicker = !1, this._updateFPS = e.updateFPS || 0, this._msToNextUpdate = 0, this.autoPlay = !1 !== e.autoPlay, this.alphaMode = e.alphaMode ? ? "premultiply-alpha-on-upload", this._videoFrameRequestCallback = this._videoFrameRequestCallback.bind(this), this._videoFrameRequestCallbackHandle = null, this._load = null, this._resolve = null, this._reject = null, this._onCanPlay = this._onCanPlay.bind(this), this._onCanPlayThrough = this._onCanPlayThrough.bind(this), this._onError = this._onError.bind(this), this._onPlayStart = this._onPlayStart.bind(this), this._onPlayStop = this._onPlayStop.bind(this), this._onSeeked = this._onSeeked.bind(this), !1 !== e.autoLoad && this.load()
        }
        updateFrame() {
            if (!this.destroyed) {
                if (this._updateFPS) {
                    let t = _.Ticker.shared.elapsedMS * this.resource.playbackRate;
                    this._msToNextUpdate = Math.floor(this._msToNextUpdate - t)
                }(!this._updateFPS || this._msToNextUpdate <= 0) && (this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0), this.isValid && this.update()
            }
        }
        _videoFrameRequestCallback() {
            this.updateFrame(), this.destroyed ? this._videoFrameRequestCallbackHandle = null : this._videoFrameRequestCallbackHandle = this.resource.requestVideoFrameCallback(this._videoFrameRequestCallback)
        }
        get isValid() {
            return !!this.resource.videoWidth && !!this.resource.videoHeight
        }
        async load() {
            if (this._load) return this._load;
            let t = this.resource,
                e = this.options;
            return (t.readyState === t.HAVE_ENOUGH_DATA || t.readyState === t.HAVE_FUTURE_DATA) && t.width && t.height && (t.complete = !0), t.addEventListener("play", this._onPlayStart), t.addEventListener("pause", this._onPlayStop), t.addEventListener("seeked", this._onSeeked), this._isSourceReady() ? this._mediaReady() : (e.preload || t.addEventListener("canplay", this._onCanPlay), t.addEventListener("canplaythrough", this._onCanPlayThrough), t.addEventListener("error", this._onError, !0)), this.alphaMode = await m(), this._load = new Promise((i, s) => {
                this.isValid ? i(this) : (this._resolve = i, this._reject = s, void 0 !== e.preloadTimeoutMs && (this._preloadTimeout = setTimeout(() => {
                    this._onError(new ErrorEvent(`Preload exceeded timeout of ${e.preloadTimeoutMs}ms`))
                })), t.load())
            }), this._load
        }
        _onError(t) {
            this.resource.removeEventListener("error", this._onError, !0), this.emit("error", t), this._reject && (this._reject(t), this._reject = null, this._resolve = null)
        }
        _isSourcePlaying() {
            let t = this.resource;
            return !t.paused && !t.ended
        }
        _isSourceReady() {
            return this.resource.readyState > 2
        }
        _onPlayStart() {
            this.isValid || this._mediaReady(), this._configureAutoUpdate()
        }
        _onPlayStop() {
            this._configureAutoUpdate()
        }
        _onSeeked() {
            this._autoUpdate && !this._isSourcePlaying() && (this._msToNextUpdate = 0, this.updateFrame(), this._msToNextUpdate = 0)
        }
        _onCanPlay() {
            this.resource.removeEventListener("canplay", this._onCanPlay), this._mediaReady()
        }
        _onCanPlayThrough() {
            this.resource.removeEventListener("canplaythrough", this._onCanPlay), this._preloadTimeout && (clearTimeout(this._preloadTimeout), this._preloadTimeout = void 0), this._mediaReady()
        }
        _mediaReady() {
            let t = this.resource;
            this.isValid && (this.isReady = !0, this.resize(t.videoWidth, t.videoHeight)), this._msToNextUpdate = 0, this.updateFrame(), this._msToNextUpdate = 0, this._resolve && (this._resolve(this), this._resolve = null, this._reject = null), this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && this.resource.play()
        }
        destroy() {
            this._configureAutoUpdate();
            let t = this.resource;
            t && (t.removeEventListener("play", this._onPlayStart), t.removeEventListener("pause", this._onPlayStop), t.removeEventListener("seeked", this._onSeeked), t.removeEventListener("canplay", this._onCanPlay), t.removeEventListener("canplaythrough", this._onCanPlayThrough), t.removeEventListener("error", this._onError, !0), t.pause(), t.src = "", t.load()), super.destroy()
        }
        get autoUpdate() {
            return this._autoUpdate
        }
        set autoUpdate(t) {
            t !== this._autoUpdate && (this._autoUpdate = t, this._configureAutoUpdate())
        }
        get updateFPS() {
            return this._updateFPS
        }
        set updateFPS(t) {
            t !== this._updateFPS && (this._updateFPS = t, this._configureAutoUpdate())
        }
        _configureAutoUpdate() {
            this._autoUpdate && this._isSourcePlaying() ? !this._updateFPS && this.resource.requestVideoFrameCallback ? (this._isConnectedToTicker && (_.Ticker.shared.remove(this.updateFrame, this), this._isConnectedToTicker = !1, this._msToNextUpdate = 0), null === this._videoFrameRequestCallbackHandle && (this._videoFrameRequestCallbackHandle = this.resource.requestVideoFrameCallback(this._videoFrameRequestCallback))) : (null !== this._videoFrameRequestCallbackHandle && (this.resource.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle), this._videoFrameRequestCallbackHandle = null), this._isConnectedToTicker || (_.Ticker.shared.add(this.updateFrame, this), this._isConnectedToTicker = !0, this._msToNextUpdate = 0)) : (null !== this._videoFrameRequestCallbackHandle && (this.resource.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle), this._videoFrameRequestCallbackHandle = null), this._isConnectedToTicker && (_.Ticker.shared.remove(this.updateFrame, this), this._isConnectedToTicker = !1, this._msToNextUpdate = 0))
        }
        static test(t) {
            return globalThis.HTMLVideoElement && t instanceof HTMLVideoElement
        }
    };
    b.extension = i.ExtensionType.TextureSource, b.defaultOptions = { ...S.TextureSource.defaultOptions,
        autoLoad: !0,
        autoPlay: !0,
        updateFPS: 0,
        crossorigin: !0,
        loop: !1,
        muted: !0,
        playsinline: !0,
        preload: !1
    }, b.MIME_TYPES = {
        ogv: "video/ogg",
        mov: "video/quicktime",
        m4v: "video/mp4"
    }, t.s(["VideoSource", () => b], 341834)
}, 795861, t => {
    "use strict";
    let e = (t, e, i = !1) => (Array.isArray(t) || (t = [t]), e) ? t.map(t => "string" == typeof t || i ? e(t) : t) : t;
    t.s(["convertToList", () => e])
}, 310338, 224021, 36189, t => {
    "use strict";
    var e = t.i(883771),
        i = t.i(112287),
        s = t.i(784920),
        r = t.i(542648),
        a = t.i(780771),
        n = t.i(190498),
        l = t.i(749382),
        o = t.i(341834),
        h = t.i(909077),
        u = t.i(795861);
    let c = new class {
        constructor() {
            this._parsers = [], this._cache = new Map, this._cacheMap = new Map
        }
        reset() {
            this._cacheMap.clear(), this._cache.clear()
        }
        has(t) {
            return this._cache.has(t)
        }
        get(t) {
            let e = this._cache.get(t);
            return e || (0, h.warn)(`[Assets] Asset id ${t} was not found in the Cache`), e
        }
        set(t, e) {
            let i, s = (0, u.convertToList)(t);
            for (let t = 0; t < this.parsers.length; t++) {
                let r = this.parsers[t];
                if (r.test(e)) {
                    i = r.getCacheableAssets(s, e);
                    break
                }
            }
            let r = new Map(Object.entries(i || {}));
            i || s.forEach(t => {
                r.set(t, e)
            });
            let a = [...r.keys()],
                n = {
                    cacheKeys: a,
                    keys: s
                };
            s.forEach(t => {
                this._cacheMap.set(t, n)
            }), a.forEach(t => {
                let s = i ? i[t] : e;
                this._cache.has(t) && this._cache.get(t) !== s && (0, h.warn)("[Cache] already has key:", t), this._cache.set(t, r.get(t))
            })
        }
        remove(t) {
            if (!this._cacheMap.has(t)) return void(0, h.warn)(`[Assets] Asset id ${t} was not found in the Cache`);
            let e = this._cacheMap.get(t);
            e.cacheKeys.forEach(t => {
                this._cache.delete(t)
            }), e.keys.forEach(t => {
                this._cacheMap.delete(t)
            })
        }
        get parsers() {
            return this._parsers
        }
    };
    t.s(["Cache", () => c], 224021);
    var d = t.i(603891),
        p = t.i(297294);
    let f = [];

    function x(t = {}) {
        let e = t && t.resource,
            i = e ? t.resource : t,
            s = e ? t : {
                resource: t
            };
        for (let t = 0; t < f.length; t++) {
            let e = f[t];
            if (e.test(i)) return new e(s)
        }
        throw Error(`Could not find a source type for resource: ${s.resource}`)
    }
    e.extensions.handleByList(e.ExtensionType.TextureSource, f), p.Texture.from = function(t, e = !1) {
        return "string" == typeof t ? c.get(t) : t instanceof d.TextureSource ? new p.Texture({
            source: t
        }) : function(t = {}, e = !1) {
            let i = t && t.resource,
                s = i ? t.resource : t,
                r = i ? t : {
                    resource: t
                };
            if (!e && c.has(s)) return c.get(s);
            let a = new p.Texture({
                source: x(r)
            });
            return a.on("destroy", () => {
                c.has(s) && c.remove(s)
            }), e || c.set(s, a), a
        }(t, e)
    }, d.TextureSource.from = x, t.s([], 36189), e.extensions.add(i.AlphaMask, s.ColorMask, r.StencilMask, o.VideoSource, l.ImageSource, n.CanvasSource, a.BufferImageSource), t.s([], 310338)
}, 762939, 74067, t => {
    "use strict";
    var e, i = ((e = i || {})[e.Low = 0] = "Low", e[e.Normal = 1] = "Normal", e[e.High = 2] = "High", e);
    t.s(["LoaderParserPriority", () => i], 762939);
    var s = t.i(69203);

    function r(t) {
        if ("string" != typeof t) throw TypeError(`Path must be a string. Received ${JSON.stringify(t)}`)
    }

    function a(t) {
        return t.split("?")[0].split("#")[0]
    }
    let n = {
        toPosix: t => {
            var e, i;
            return e = 0, i = 0, t.replace(RegExp("\\".replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), "/")
        },
        isUrl(t) {
            return /^https?:/.test(this.toPosix(t))
        },
        isDataUrl: t => /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(t),
        isBlobUrl: t => t.startsWith("blob:"),
        hasProtocol(t) {
            return /^[^/:]+:/.test(this.toPosix(t))
        },
        getProtocol(t) {
            r(t), t = this.toPosix(t);
            let e = /^file:\/\/\//.exec(t);
            if (e) return e[0];
            let i = /^[^/:]+:\/{0,2}/.exec(t);
            return i ? i[0] : ""
        },
        toAbsolute(t, e, i) {
            if (r(t), this.isDataUrl(t) || this.isBlobUrl(t)) return t;
            let l = a(this.toPosix(e ? ? s.DOMAdapter.get().getBaseUrl())),
                o = a(this.toPosix(i ? ? this.rootname(l)));
            return (t = this.toPosix(t)).startsWith("/") ? n.join(o, t.slice(1)) : this.isAbsolute(t) ? t : this.join(l, t)
        },
        normalize(t) {
            if (r(t), 0 === t.length) return ".";
            if (this.isDataUrl(t) || this.isBlobUrl(t)) return t;
            t = this.toPosix(t);
            let e = "",
                i = t.startsWith("/");
            this.hasProtocol(t) && (e = this.rootname(t), t = t.slice(e.length));
            let s = t.endsWith("/");
            return ((t = function(t, e) {
                let i = "",
                    s = 0,
                    r = -1,
                    a = 0,
                    n = -1;
                for (let l = 0; l <= t.length; ++l) {
                    if (l < t.length) n = t.charCodeAt(l);
                    else if (47 === n) break;
                    else n = 47;
                    if (47 === n) {
                        if (r === l - 1 || 1 === a);
                        else if (r !== l - 1 && 2 === a) {
                            if (i.length < 2 || 2 !== s || 46 !== i.charCodeAt(i.length - 1) || 46 !== i.charCodeAt(i.length - 2)) {
                                if (i.length > 2) {
                                    let t = i.lastIndexOf("/");
                                    if (t !== i.length - 1) {
                                        -1 === t ? (i = "", s = 0) : s = (i = i.slice(0, t)).length - 1 - i.lastIndexOf("/"), r = l, a = 0;
                                        continue
                                    }
                                } else if (2 === i.length || 1 === i.length) {
                                    i = "", s = 0, r = l, a = 0;
                                    continue
                                }
                            }
                            e && (i.length > 0 ? i += "/.." : i = "..", s = 2)
                        } else i.length > 0 ? i += `/${t.slice(r+1,l)}` : i = t.slice(r + 1, l), s = l - r - 1;
                        r = l, a = 0
                    } else 46 === n && -1 !== a ? ++a : a = -1
                }
                return i
            }(t, !1)).length > 0 && s && (t += "/"), i) ? `/${t}` : e + t
        },
        isAbsolute(t) {
            return r(t), t = this.toPosix(t), !!this.hasProtocol(t) || t.startsWith("/")
        },
        join(...t) {
            let e;
            if (0 === t.length) return ".";
            for (let i = 0; i < t.length; ++i) {
                let s = t[i];
                if (r(s), s.length > 0)
                    if (void 0 === e) e = s;
                    else {
                        let r = t[i - 1] ? ? "";
                        this.joinExtensions.includes(this.extname(r).toLowerCase()) ? e += `/../${s}` : e += `/${s}`
                    }
            }
            return void 0 === e ? "." : this.normalize(e)
        },
        dirname(t) {
            if (r(t), 0 === t.length) return ".";
            let e = (t = this.toPosix(t)).charCodeAt(0),
                i = 47 === e,
                s = -1,
                a = !0,
                n = this.getProtocol(t),
                l = t;
            t = t.slice(n.length);
            for (let i = t.length - 1; i >= 1; --i)
                if (47 === (e = t.charCodeAt(i))) {
                    if (!a) {
                        s = i;
                        break
                    }
                } else a = !1;
            return -1 === s ? i ? "/" : this.isUrl(l) ? n + t : n : i && 1 === s ? "//" : n + t.slice(0, s)
        },
        rootname(t) {
            r(t);
            let e = "";
            if (e = (t = this.toPosix(t)).startsWith("/") ? "/" : this.getProtocol(t), this.isUrl(t)) {
                let i = t.indexOf("/", e.length);
                (e = -1 !== i ? t.slice(0, i) : t).endsWith("/") || (e += "/")
            }
            return e
        },
        basename(t, e) {
            let i;
            r(t), e && r(e), t = a(this.toPosix(t));
            let s = 0,
                n = -1,
                l = !0;
            if (void 0 !== e && e.length > 0 && e.length <= t.length) {
                if (e.length === t.length && e === t) return "";
                let r = e.length - 1,
                    a = -1;
                for (i = t.length - 1; i >= 0; --i) {
                    let o = t.charCodeAt(i);
                    if (47 === o) {
                        if (!l) {
                            s = i + 1;
                            break
                        }
                    } else -1 === a && (l = !1, a = i + 1), r >= 0 && (o === e.charCodeAt(r) ? -1 == --r && (n = i) : (r = -1, n = a))
                }
                return s === n ? n = a : -1 === n && (n = t.length), t.slice(s, n)
            }
            for (i = t.length - 1; i >= 0; --i)
                if (47 === t.charCodeAt(i)) {
                    if (!l) {
                        s = i + 1;
                        break
                    }
                } else -1 === n && (l = !1, n = i + 1);
            return -1 === n ? "" : t.slice(s, n)
        },
        extname(t) {
            r(t), t = a(this.toPosix(t));
            let e = -1,
                i = 0,
                s = -1,
                n = !0,
                l = 0;
            for (let r = t.length - 1; r >= 0; --r) {
                let a = t.charCodeAt(r);
                if (47 === a) {
                    if (!n) {
                        i = r + 1;
                        break
                    }
                    continue
                } - 1 === s && (n = !1, s = r + 1), 46 === a ? -1 === e ? e = r : 1 !== l && (l = 1) : -1 !== e && (l = -1)
            }
            return -1 === e || -1 === s || 0 === l || 1 === l && e === s - 1 && e === i + 1 ? "" : t.slice(e, s)
        },
        parse(t) {
            let e;
            r(t);
            let i = {
                root: "",
                dir: "",
                base: "",
                ext: "",
                name: ""
            };
            if (0 === t.length) return i;
            let s = (t = a(this.toPosix(t))).charCodeAt(0),
                n = this.isAbsolute(t);
            i.root = this.rootname(t), e = n || this.hasProtocol(t) ? 1 : 0;
            let l = -1,
                o = 0,
                h = -1,
                u = !0,
                c = t.length - 1,
                d = 0;
            for (; c >= e; --c) {
                if (47 === (s = t.charCodeAt(c))) {
                    if (!u) {
                        o = c + 1;
                        break
                    }
                    continue
                } - 1 === h && (u = !1, h = c + 1), 46 === s ? -1 === l ? l = c : 1 !== d && (d = 1) : -1 !== l && (d = -1)
            }
            return -1 === l || -1 === h || 0 === d || 1 === d && l === h - 1 && l === o + 1 ? -1 !== h && (0 === o && n ? i.base = i.name = t.slice(1, h) : i.base = i.name = t.slice(o, h)) : (0 === o && n ? (i.name = t.slice(1, l), i.base = t.slice(1, h)) : (i.name = t.slice(o, l), i.base = t.slice(o, h)), i.ext = t.slice(l, h)), i.dir = this.dirname(t), i
        },
        sep: "/",
        delimiter: ":",
        joinExtensions: [".html"]
    };
    t.s(["path", () => n], 74067)
}, 463412, 29470, 262761, 207724, t => {
    "use strict";
    var e = t.i(883771),
        i = t.i(762939),
        s = t.i(909077),
        r = t.i(74067),
        a = t.i(795861);
    let n = t => !Array.isArray(t);
    t.s(["isSingleItem", () => n], 29470);
    class l {
        constructor() {
            this._defaultBundleIdentifierOptions = {
                connector: "-",
                createBundleAssetId: (t, e) => `${t}${this._bundleIdConnector}${e}`,
                extractAssetIdFromBundle: (t, e) => e.replace(`${t}${this._bundleIdConnector}`, "")
            }, this._bundleIdConnector = this._defaultBundleIdentifierOptions.connector, this._createBundleAssetId = this._defaultBundleIdentifierOptions.createBundleAssetId, this._extractAssetIdFromBundle = this._defaultBundleIdentifierOptions.extractAssetIdFromBundle, this._assetMap = {}, this._preferredOrder = [], this._parsers = [], this._resolverHash = {}, this._bundles = {}
        }
        setBundleIdentifier(t) {
            if (this._bundleIdConnector = t.connector ? ? this._bundleIdConnector, this._createBundleAssetId = t.createBundleAssetId ? ? this._createBundleAssetId, this._extractAssetIdFromBundle = t.extractAssetIdFromBundle ? ? this._extractAssetIdFromBundle, "bar" !== this._extractAssetIdFromBundle("foo", this._createBundleAssetId("foo", "bar"))) throw Error("[Resolver] GenerateBundleAssetId are not working correctly")
        }
        prefer(...t) {
            t.forEach(t => {
                this._preferredOrder.push(t), t.priority || (t.priority = Object.keys(t.params))
            }), this._resolverHash = {}
        }
        set basePath(t) {
            this._basePath = t
        }
        get basePath() {
            return this._basePath
        }
        set rootPath(t) {
            this._rootPath = t
        }
        get rootPath() {
            return this._rootPath
        }
        get parsers() {
            return this._parsers
        }
        reset() {
            this.setBundleIdentifier(this._defaultBundleIdentifierOptions), this._assetMap = {}, this._preferredOrder = [], this._resolverHash = {}, this._rootPath = null, this._basePath = null, this._manifest = null, this._bundles = {}, this._defaultSearchParams = null
        }
        setDefaultSearchParams(t) {
            "string" == typeof t ? this._defaultSearchParams = t : this._defaultSearchParams = Object.keys(t).map(e => `${encodeURIComponent(e)}=${encodeURIComponent(t[e])}`).join("&")
        }
        getAlias(t) {
            let {
                alias: e,
                src: i
            } = t;
            return (0, a.convertToList)(e || i, t => "string" == typeof t ? t : Array.isArray(t) ? t.map(t => t ? .src ? ? t) : t ? .src ? t.src : t, !0)
        }
        addManifest(t) {
            this._manifest && (0, s.warn)("[Resolver] Manifest already exists, this will be overwritten"), this._manifest = t, t.bundles.forEach(t => {
                this.addBundle(t.name, t.assets)
            })
        }
        addBundle(t, e) {
            let i = [],
                s = e;
            Array.isArray(e) || (s = Object.entries(e).map(([t, e]) => "string" == typeof e || Array.isArray(e) ? {
                alias: t,
                src: e
            } : {
                alias: t,
                ...e
            })), s.forEach(e => {
                let s, r = e.src,
                    a = e.alias;
                if ("string" == typeof a) {
                    let e = this._createBundleAssetId(t, a);
                    i.push(e), s = [a, e]
                } else {
                    let e = a.map(e => this._createBundleAssetId(t, e));
                    i.push(...e), s = [...a, ...e]
                }
                this.add({ ...e,
                    alias: s,
                    src: r
                })
            }), this._bundles[t] = i
        }
        add(t) {
            let e, i = [];
            Array.isArray(t) ? i.push(...t) : i.push(t), e = t => {
                this.hasKey(t) && (0, s.warn)(`[Resolver] already has key: ${t} overwriting`)
            }, (0, a.convertToList)(i).forEach(t => {
                let {
                    src: i
                } = t, {
                    data: s,
                    format: r,
                    loadParser: n
                } = t, l = (0, a.convertToList)(i).map(t => {
                    if ("string" == typeof t) {
                        let e = t.match(/\{(.*?)\}/g),
                            i = [];
                        if (e) {
                            let s = [];
                            e.forEach(t => {
                                    let e = t.substring(1, t.length - 1).split(",");
                                    s.push(e)
                                }),
                                function t(e, i, s, r, a) {
                                    let n = i[s];
                                    for (let l = 0; l < n.length; l++) {
                                        let o = n[l];
                                        s < i.length - 1 ? t(e.replace(r[s], o), i, s + 1, r, a) : a.push(e.replace(r[s], o))
                                    }
                                }(t, s, 0, e, i)
                        } else i.push(t);
                        return i
                    }
                    return Array.isArray(t) ? t : [t]
                }), o = this.getAlias(t);
                Array.isArray(o) ? o.forEach(e) : e(o);
                let h = [];
                l.forEach(t => {
                    t.forEach(t => {
                        let e = {};
                        if ("object" != typeof t) {
                            e.src = t;
                            for (let i = 0; i < this._parsers.length; i++) {
                                let s = this._parsers[i];
                                if (s.test(t)) {
                                    e = s.parse(t);
                                    break
                                }
                            }
                        } else s = t.data ? ? s, r = t.format ? ? r, n = t.loadParser ? ? n, e = { ...e,
                            ...t
                        };
                        if (!o) throw Error(`[Resolver] alias is undefined for this asset: ${e.src}`);
                        e = this._buildResolvedAsset(e, {
                            aliases: o,
                            data: s,
                            format: r,
                            loadParser: n
                        }), h.push(e)
                    })
                }), o.forEach(t => {
                    this._assetMap[t] = h
                })
            })
        }
        resolveBundle(t) {
            let e = n(t);
            t = (0, a.convertToList)(t);
            let i = {};
            return t.forEach(t => {
                let e = this._bundles[t];
                if (e) {
                    let s = this.resolve(e),
                        r = {};
                    for (let e in s) {
                        let i = s[e];
                        r[this._extractAssetIdFromBundle(t, e)] = i
                    }
                    i[t] = r
                }
            }), e ? i[t[0]] : i
        }
        resolveUrl(t) {
            let e = this.resolve(t);
            if ("string" != typeof t) {
                let t = {};
                for (let i in e) t[i] = e[i].src;
                return t
            }
            return e.src
        }
        resolve(t) {
            let e = n(t);
            t = (0, a.convertToList)(t);
            let i = {};
            return t.forEach(t => {
                if (!this._resolverHash[t])
                    if (this._assetMap[t]) {
                        let e = this._assetMap[t],
                            i = this._getPreferredOrder(e);
                        i ? .priority.forEach(t => {
                            i.params[t].forEach(i => {
                                let s = e.filter(e => !!e[t] && e[t] === i);
                                s.length && (e = s)
                            })
                        }), this._resolverHash[t] = e[0]
                    } else this._resolverHash[t] = this._buildResolvedAsset({
                        alias: [t],
                        src: t
                    }, {});
                i[t] = this._resolverHash[t]
            }), e ? i[t[0]] : i
        }
        hasKey(t) {
            return !!this._assetMap[t]
        }
        hasBundle(t) {
            return !!this._bundles[t]
        }
        _getPreferredOrder(t) {
            for (let e = 0; e < t.length; e++) {
                let i = t[e],
                    s = this._preferredOrder.find(t => t.params.format.includes(i.format));
                if (s) return s
            }
            return this._preferredOrder[0]
        }
        _appendDefaultSearchParams(t) {
            if (!this._defaultSearchParams) return t;
            let e = /\?/.test(t) ? "&" : "?";
            return `${t}${e}${this._defaultSearchParams}`
        }
        _buildResolvedAsset(t, e) {
            let {
                aliases: i,
                data: s,
                loadParser: a,
                format: n
            } = e;
            return (this._basePath || this._rootPath) && (t.src = r.path.toAbsolute(t.src, this._basePath, this._rootPath)), t.alias = i ? ? t.alias ? ? [t.src], t.src = this._appendDefaultSearchParams(t.src), t.data = { ...s || {},
                ...t.data
            }, t.loadParser = a ? ? t.loadParser, t.format = n ? ? t.format ? ? t.src.split(".").pop().split("?").shift().split("#").shift(), t
        }
    }
    l.RETINA_PREFIX = /@([0-9\.]+)x/, t.s(["Resolver", () => l], 262761);
    let o = (t, e) => {
        let i = e.split("?")[1];
        return i && (t += `?${i}`), t
    };
    t.s(["copySearchParams", () => o], 207724);
    var h = t.i(297294),
        u = t.i(368256),
        c = t.i(603891);
    let d = class t {
        constructor(t, e) {
            this.linkedSheets = [];
            let i = t;
            t ? .source instanceof c.TextureSource && (i = {
                texture: t,
                data: e
            });
            const {
                texture: s,
                data: r,
                cachePrefix: a = ""
            } = i;
            this.cachePrefix = a, this._texture = s instanceof h.Texture ? s : null, this.textureSource = s.source, this.textures = {}, this.animations = {}, this.data = r;
            const n = parseFloat(r.meta.scale);
            n ? (this.resolution = n, s.source.resolution = this.resolution) : this.resolution = s.source._resolution, this._frames = this.data.frames, this._frameKeys = Object.keys(this._frames), this._batchIndex = 0, this._callback = null
        }
        parse() {
            return new Promise(e => {
                this._callback = e, this._batchIndex = 0, this._frameKeys.length <= t.BATCH_SIZE ? (this._processFrames(0), this._processAnimations(), this._parseComplete()) : this._nextBatch()
            })
        }
        _processFrames(e) {
            let i = e,
                s = t.BATCH_SIZE;
            for (; i - e < s && i < this._frameKeys.length;) {
                let t = this._frameKeys[i],
                    e = this._frames[t],
                    s = e.frame;
                if (s) {
                    let i = null,
                        r = null,
                        a = !1 !== e.trimmed && e.sourceSize ? e.sourceSize : e.frame,
                        n = new u.Rectangle(0, 0, Math.floor(a.w) / this.resolution, Math.floor(a.h) / this.resolution);
                    i = e.rotated ? new u.Rectangle(Math.floor(s.x) / this.resolution, Math.floor(s.y) / this.resolution, Math.floor(s.h) / this.resolution, Math.floor(s.w) / this.resolution) : new u.Rectangle(Math.floor(s.x) / this.resolution, Math.floor(s.y) / this.resolution, Math.floor(s.w) / this.resolution, Math.floor(s.h) / this.resolution), !1 !== e.trimmed && e.spriteSourceSize && (r = new u.Rectangle(Math.floor(e.spriteSourceSize.x) / this.resolution, Math.floor(e.spriteSourceSize.y) / this.resolution, Math.floor(s.w) / this.resolution, Math.floor(s.h) / this.resolution)), this.textures[t] = new h.Texture({
                        source: this.textureSource,
                        frame: i,
                        orig: n,
                        trim: r,
                        rotate: 2 * !!e.rotated,
                        defaultAnchor: e.anchor,
                        defaultBorders: e.borders,
                        label: t.toString()
                    })
                }
                i++
            }
        }
        _processAnimations() {
            let t = this.data.animations || {};
            for (let e in t) {
                this.animations[e] = [];
                for (let i = 0; i < t[e].length; i++) {
                    let s = t[e][i];
                    this.animations[e].push(this.textures[s])
                }
            }
        }
        _parseComplete() {
            let t = this._callback;
            this._callback = null, this._batchIndex = 0, t.call(this, this.textures)
        }
        _nextBatch() {
            this._processFrames(this._batchIndex * t.BATCH_SIZE), this._batchIndex++, setTimeout(() => {
                this._batchIndex * t.BATCH_SIZE < this._frameKeys.length ? this._nextBatch() : (this._processAnimations(), this._parseComplete())
            }, 0)
        }
        destroy(t = !1) {
            for (let t in this.textures) this.textures[t].destroy();
            this._frames = null, this._frameKeys = null, this.data = null, this.textures = null, t && (this._texture ? .destroy(), this.textureSource.destroy()), this._texture = null, this.textureSource = null, this.linkedSheets = []
        }
    };
    d.BATCH_SIZE = 1e3;
    let p = ["jpg", "png", "jpeg", "avif", "webp", "basis", "etc2", "bc7", "bc6h", "bc5", "bc4", "bc3", "bc2", "bc1", "eac", "astc"],
        f = {
            extension: e.ExtensionType.Asset,
            cache: {
                test: t => t instanceof d,
                getCacheableAssets: (t, e) => (function t(e, i, s) {
                    let a = {};
                    if (e.forEach(t => {
                            a[t] = i
                        }), Object.keys(i.textures).forEach(t => {
                            a[`${i.cachePrefix}${t}`] = i.textures[t]
                        }), !s) {
                        let s = r.path.dirname(e[0]);
                        i.linkedSheets.forEach((e, r) => {
                            Object.assign(a, t([`${s}/${i.data.meta.related_multi_packs[r]}`], e, !0))
                        })
                    }
                    return a
                })(t, e, !1)
            },
            resolver: {
                extension: {
                    type: e.ExtensionType.ResolveParser,
                    name: "resolveSpritesheet"
                },
                test: t => {
                    let e = t.split("?")[0].split("."),
                        i = e.pop(),
                        s = e.pop();
                    return "json" === i && p.includes(s)
                },
                parse: t => {
                    let e = t.split(".");
                    return {
                        resolution: parseFloat(l.RETINA_PREFIX.exec(t) ? .[1] ? ? "1"),
                        format: e[e.length - 2],
                        src: t
                    }
                }
            },
            loader: {
                name: "spritesheetLoader",
                extension: {
                    type: e.ExtensionType.LoadParser,
                    priority: i.LoaderParserPriority.Normal,
                    name: "spritesheetLoader"
                },
                testParse: async (t, e) => ".json" === r.path.extname(e.src).toLowerCase() && !!t.frames,
                async parse(t, e, i) {
                    let s, {
                            texture: a,
                            imageFilename: n,
                            textureOptions: l,
                            cachePrefix: u
                        } = e ? .data ? ? {},
                        c = r.path.dirname(e.src);
                    if (c && c.lastIndexOf("/") !== c.length - 1 && (c += "/"), a instanceof h.Texture) s = a;
                    else {
                        let r = o(c + (n ? ? t.meta.image), e.src);
                        s = (await i.load([{
                            src: r,
                            data: l
                        }]))[r]
                    }
                    let p = new d({
                        texture: s.source,
                        data: t,
                        cachePrefix: u
                    });
                    await p.parse();
                    let f = t ? .meta ? .related_multi_packs;
                    if (Array.isArray(f)) {
                        let t = [];
                        for (let s of f) {
                            if ("string" != typeof s) continue;
                            let r = c + s;
                            e.data ? .ignoreMultiPack || (r = o(r, e.src), t.push(i.load({
                                src: r,
                                data: {
                                    textureOptions: l,
                                    ignoreMultiPack: !0
                                }
                            })))
                        }
                        let s = await Promise.all(t);
                        p.linkedSheets = s, s.forEach(t => {
                            t.linkedSheets = [p].concat(p.linkedSheets.filter(e => e !== t))
                        })
                    }
                    return p
                },
                async unload(t, e, i) {
                    await i.unload(t.textureSource._sourceOrigin), t.destroy(!1)
                }
            }
        };
    e.extensions.add(f), t.s([], 463412)
}, 639711, t => {
    "use strict";
    var e = t.i(785373),
        i = t.i(373839);
    class s extends e.default {
        constructor() {
            super(...arguments), this.chars = Object.create(null), this.lineHeight = 0, this.fontFamily = "", this.fontMetrics = {
                fontSize: 0,
                ascent: 0,
                descent: 0
            }, this.baseLineOffset = 0, this.distanceField = {
                type: "none",
                range: 0
            }, this.pages = [], this.applyFillAsTint = !0, this.baseMeasurementFontSize = 100, this.baseRenderedFontSize = 100
        }
        get font() {
            return (0, i.deprecation)(i.v8_0_0, "BitmapFont.font is deprecated, please use BitmapFont.fontFamily instead."), this.fontFamily
        }
        get pageTextures() {
            return (0, i.deprecation)(i.v8_0_0, "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."), this.pages
        }
        get size() {
            return (0, i.deprecation)(i.v8_0_0, "BitmapFont.size is deprecated, please use BitmapFont.fontMetrics.fontSize instead."), this.fontMetrics.fontSize
        }
        get distanceFieldRange() {
            return (0, i.deprecation)(i.v8_0_0, "BitmapFont.distanceFieldRange is deprecated, please use BitmapFont.distanceField.range instead."), this.distanceField.range
        }
        get distanceFieldType() {
            return (0, i.deprecation)(i.v8_0_0, "BitmapFont.distanceFieldType is deprecated, please use BitmapFont.distanceField.type instead."), this.distanceField.type
        }
        destroy(t = !1) {
            for (let t in this.emit("destroy", this), this.removeAllListeners(), this.chars) this.chars[t].texture ? .destroy();
            this.chars = null, t && (this.pages.forEach(t => t.texture.destroy(!0)), this.pages = null)
        }
    }
    t.s(["AbstractBitmapFont", () => s])
}, 161015, 908695, t => {
    "use strict";
    var e = t.i(69203);
    let i = ["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui"];

    function s(t) {
        let e = "number" == typeof t.fontSize ? `${t.fontSize}px` : t.fontSize,
            s = t.fontFamily;
        Array.isArray(t.fontFamily) || (s = t.fontFamily.split(","));
        for (let t = s.length - 1; t >= 0; t--) {
            let e = s[t].trim();
            /([\"\'])[^\'\"]+\1/.test(e) || i.includes(e) || (e = `"${e}"`), s[t] = e
        }
        return `${t.fontStyle} ${t.fontVariant} ${t.fontWeight} ${e} ${s.join(",")}`
    }
    t.s(["fontStringFromTextStyle", () => s], 908695);
    let r = {
            willReadFrequently: !0
        },
        a = class t {
            static get experimentalLetterSpacingSupported() {
                let i = t._experimentalLetterSpacingSupported;
                if (void 0 === i) {
                    let s = e.DOMAdapter.get().getCanvasRenderingContext2D().prototype;
                    i = t._experimentalLetterSpacingSupported = "letterSpacing" in s || "textLetterSpacing" in s
                }
                return i
            }
            constructor(t, e, i, s, r, a, n, l, o) {
                this.text = t, this.style = e, this.width = i, this.height = s, this.lines = r, this.lineWidths = a, this.lineHeight = n, this.maxLineWidth = l, this.fontProperties = o
            }
            static measureText(e = " ", i, r = t._canvas, a = i.wordWrap) {
                let n = s(i),
                    l = t.measureFont(n);
                0 === l.fontSize && (l.fontSize = i.fontSize, l.ascent = i.fontSize);
                let o = t.__context;
                o.font = n;
                let h = (a ? t._wordWrap(e, i, r) : e).split(/(?:\r\n|\r|\n)/),
                    u = Array(h.length),
                    c = 0;
                for (let e = 0; e < h.length; e++) {
                    let s = t._measureText(h[e], i.letterSpacing, o);
                    u[e] = s, c = Math.max(c, s)
                }
                let d = i._stroke ? .width || 0,
                    p = c + d;
                i.dropShadow && (p += i.dropShadow.distance);
                let f = i.lineHeight || l.fontSize,
                    x = Math.max(f, l.fontSize + d) + (h.length - 1) * (f + i.leading);
                return i.dropShadow && (x += i.dropShadow.distance), new t(e, i, p, x, h, u, f + i.leading, c, l)
            }
            static _measureText(e, i, s) {
                let r = !1;
                t.experimentalLetterSpacingSupported && (t.experimentalLetterSpacing ? (s.letterSpacing = `${i}px`, s.textLetterSpacing = `${i}px`, r = !0) : (s.letterSpacing = "0px", s.textLetterSpacing = "0px"));
                let a = s.measureText(e),
                    n = a.width,
                    l = -a.actualBoundingBoxLeft,
                    o = a.actualBoundingBoxRight - l;
                if (n > 0)
                    if (r) n -= i, o -= i;
                    else {
                        let s = (t.graphemeSegmenter(e).length - 1) * i;
                        n += s, o += s
                    }
                return Math.max(n, o)
            }
            static _wordWrap(e, i, s = t._canvas) {
                let a = s.getContext("2d", r),
                    n = 0,
                    l = "",
                    o = "",
                    h = Object.create(null),
                    {
                        letterSpacing: u,
                        whiteSpace: c
                    } = i,
                    d = t._collapseSpaces(c),
                    p = t._collapseNewlines(c),
                    f = !d,
                    x = i.wordWrapWidth + u,
                    y = t._tokenize(e);
                for (let e = 0; e < y.length; e++) {
                    let s = y[e];
                    if (t._isNewline(s)) {
                        if (!p) {
                            o += t._addLine(l), f = !d, l = "", n = 0;
                            continue
                        }
                        s = " "
                    }
                    if (d) {
                        let e = t.isBreakingSpace(s),
                            i = t.isBreakingSpace(l[l.length - 1]);
                        if (e && i) continue
                    }
                    let r = t._getFromCache(s, u, h, a);
                    if (r > x)
                        if ("" !== l && (o += t._addLine(l), l = "", n = 0), t.canBreakWords(s, i.breakWords)) {
                            let e = t.wordWrapSplit(s);
                            for (let r = 0; r < e.length; r++) {
                                let c = e[r],
                                    d = c,
                                    p = 1;
                                for (; e[r + p];) {
                                    let a = e[r + p];
                                    if (t.canBreakChars(d, a, s, r, i.breakWords)) break;
                                    c += a, d = a, p++
                                }
                                r += p - 1;
                                let y = t._getFromCache(c, u, h, a);
                                y + n > x && (o += t._addLine(l), f = !1, l = "", n = 0), l += c, n += y
                            }
                        } else {
                            l.length > 0 && (o += t._addLine(l), l = "", n = 0);
                            let i = e === y.length - 1;
                            o += t._addLine(s, !i), f = !1, l = "", n = 0
                        }
                    else r + n > x && (f = !1, o += t._addLine(l), l = "", n = 0), (l.length > 0 || !t.isBreakingSpace(s) || f) && (l += s, n += r)
                }
                return o + t._addLine(l, !1)
            }
            static _addLine(e, i = !0) {
                return e = t._trimRight(e), e = i ? `${e}
` : e
            }
            static _getFromCache(e, i, s, r) {
                let a = s[e];
                return "number" != typeof a && (a = t._measureText(e, i, r) + i, s[e] = a), a
            }
            static _collapseSpaces(t) {
                return "normal" === t || "pre-line" === t
            }
            static _collapseNewlines(t) {
                return "normal" === t
            }
            static _trimRight(e) {
                if ("string" != typeof e) return "";
                for (let i = e.length - 1; i >= 0; i--) {
                    let s = e[i];
                    if (!t.isBreakingSpace(s)) break;
                    e = e.slice(0, -1)
                }
                return e
            }
            static _isNewline(e) {
                return "string" == typeof e && t._newlines.includes(e.charCodeAt(0))
            }
            static isBreakingSpace(e, i) {
                return "string" == typeof e && t._breakingSpaces.includes(e.charCodeAt(0))
            }
            static _tokenize(e) {
                let i = [],
                    s = "";
                if ("string" != typeof e) return i;
                for (let r = 0; r < e.length; r++) {
                    let a = e[r],
                        n = e[r + 1];
                    if (t.isBreakingSpace(a, n) || t._isNewline(a)) {
                        "" !== s && (i.push(s), s = ""), "\r" === a && "\n" === n ? (i.push("\r\n"), r++) : i.push(a);
                        continue
                    }
                    s += a
                }
                return "" !== s && i.push(s), i
            }
            static canBreakWords(t, e) {
                return e
            }
            static canBreakChars(t, e, i, s, r) {
                return !0
            }
            static wordWrapSplit(e) {
                return t.graphemeSegmenter(e)
            }
            static measureFont(e) {
                if (t._fonts[e]) return t._fonts[e];
                let i = t._context;
                i.font = e;
                let s = i.measureText(t.METRICS_STRING + t.BASELINE_SYMBOL),
                    r = {
                        ascent: s.actualBoundingBoxAscent,
                        descent: s.actualBoundingBoxDescent,
                        fontSize: s.actualBoundingBoxAscent + s.actualBoundingBoxDescent
                    };
                return t._fonts[e] = r, r
            }
            static clearMetrics(e = "") {
                e ? delete t._fonts[e] : t._fonts = {}
            }
            static get _canvas() {
                if (!t.__canvas) {
                    let i;
                    try {
                        let s = new OffscreenCanvas(0, 0),
                            a = s.getContext("2d", r);
                        if (a ? .measureText) return t.__canvas = s, s;
                        i = e.DOMAdapter.get().createCanvas()
                    } catch (t) {
                        i = e.DOMAdapter.get().createCanvas()
                    }
                    i.width = i.height = 10, t.__canvas = i
                }
                return t.__canvas
            }
            static get _context() {
                return t.__context || (t.__context = t._canvas.getContext("2d", r)), t.__context
            }
        };
    a.METRICS_STRING = "|ÉqÅ", a.BASELINE_SYMBOL = "M", a.BASELINE_MULTIPLIER = 1.4, a.HEIGHT_MULTIPLIER = 2, a.graphemeSegmenter = (() => {
        if ("function" == typeof Intl ? .Segmenter) {
            let t = new Intl.Segmenter;
            return e => {
                let i = t.segment(e),
                    s = [],
                    r = 0;
                for (let t of i) s[r++] = t.segment;
                return s
            }
        }
        return t => [...t]
    })(), a.experimentalLetterSpacing = !1, a._fonts = {}, a._newlines = [10, 13], a._breakingSpaces = [9, 32, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8200, 8201, 8202, 8287, 12288], t.s(["CanvasTextMetrics", () => a], 161015)
}, 676862, t => {
    "use strict";
    var e = t.i(307301),
        i = t.i(69203),
        s = t.i(814566),
        r = t.i(749382),
        a = t.i(297294),
        n = t.i(526078),
        l = t.i(373839),
        o = t.i(236555);
    let h = [{
            offset: 0,
            color: "white"
        }, {
            offset: 1,
            color: "black"
        }],
        u = class t {
            constructor(...e) {
                this.uid = (0, n.uid)("fillGradient"), this.type = "linear", this.colorStops = [];
                let i = function(t) {
                    let e = t[0] ? ? {};
                    return ("number" == typeof e || t[1]) && ((0, l.deprecation)("8.5.2", "use options object instead"), e = {
                        type: "linear",
                        start: {
                            x: t[0],
                            y: t[1]
                        },
                        end: {
                            x: t[2],
                            y: t[3]
                        },
                        textureSpace: t[4],
                        textureSize: t[5] ? ? u.defaultLinearOptions.textureSize
                    }), e
                }(e);
                i = { ..."radial" === i.type ? t.defaultRadialOptions : t.defaultLinearOptions,
                    ...(0, o.definedProps)(i)
                }, this._textureSize = i.textureSize, this._wrapMode = i.wrapMode, "radial" === i.type ? (this.center = i.center, this.outerCenter = i.outerCenter ? ? this.center, this.innerRadius = i.innerRadius, this.outerRadius = i.outerRadius, this.scale = i.scale, this.rotation = i.rotation) : (this.start = i.start, this.end = i.end), this.textureSpace = i.textureSpace, this.type = i.type, i.colorStops.forEach(t => {
                    this.addColorStop(t.offset, t.color)
                })
            }
            addColorStop(t, i) {
                return this.colorStops.push({
                    offset: t,
                    color: e.Color.shared.setValue(i).toHexa()
                }), this
            }
            buildLinearGradient() {
                if (this.texture) return;
                let {
                    x: t,
                    y: e
                } = this.start, {
                    x: i,
                    y: n
                } = this.end, l = i - t, o = n - e, u = l < 0 || o < 0;
                if ("clamp-to-edge" === this._wrapMode) {
                    if (l < 0) {
                        let e = t;
                        t = i, i = e, l *= -1
                    }
                    if (o < 0) {
                        let t = e;
                        e = n, n = t, o *= -1
                    }
                }
                let p = this.colorStops.length ? this.colorStops : h,
                    f = this._textureSize,
                    {
                        canvas: x,
                        context: y
                    } = d(f, 1),
                    g = u ? y.createLinearGradient(this._textureSize, 0, 0, 0) : y.createLinearGradient(0, 0, this._textureSize, 0);
                c(g, p), y.fillStyle = g, y.fillRect(0, 0, f, 1), this.texture = new a.Texture({
                    source: new r.ImageSource({
                        resource: x,
                        addressMode: this._wrapMode
                    })
                });
                let _ = Math.sqrt(l * l + o * o),
                    m = Math.atan2(o, l),
                    S = new s.Matrix;
                S.scale(_ / f, 1), S.rotate(m), S.translate(t, e), "local" === this.textureSpace && S.scale(f, f), this.transform = S
            }
            buildGradient() {
                "linear" === this.type ? this.buildLinearGradient() : this.buildRadialGradient()
            }
            buildRadialGradient() {
                if (this.texture) return;
                let t = this.colorStops.length ? this.colorStops : h,
                    e = this._textureSize,
                    {
                        canvas: i,
                        context: n
                    } = d(e, e),
                    {
                        x: l,
                        y: o
                    } = this.center,
                    {
                        x: u,
                        y: p
                    } = this.outerCenter,
                    f = this.innerRadius,
                    x = this.outerRadius,
                    y = u - x,
                    g = p - x,
                    _ = e / (2 * x),
                    m = (l - y) * _,
                    S = (o - g) * _,
                    b = n.createRadialGradient(m, S, f * _, (u - y) * _, (p - g) * _, x * _);
                c(b, t), n.fillStyle = t[t.length - 1].color, n.fillRect(0, 0, e, e), n.fillStyle = b, n.translate(m, S), n.rotate(this.rotation), n.scale(1, this.scale), n.translate(-m, -S), n.fillRect(0, 0, e, e), this.texture = new a.Texture({
                    source: new r.ImageSource({
                        resource: i,
                        addressMode: this._wrapMode
                    })
                });
                let v = new s.Matrix;
                v.scale(1 / _, 1 / _), v.translate(y, g), "local" === this.textureSpace && v.scale(e, e), this.transform = v
            }
            get styleKey() {
                return this.uid
            }
            destroy() {
                this.texture ? .destroy(!0), this.texture = null
            }
        };

    function c(t, e) {
        for (let i = 0; i < e.length; i++) {
            let s = e[i];
            t.addColorStop(s.offset, s.color)
        }
    }

    function d(t, e) {
        let s = i.DOMAdapter.get().createCanvas(t, e),
            r = s.getContext("2d");
        return {
            canvas: s,
            context: r
        }
    }
    u.defaultLinearOptions = {
        start: {
            x: 0,
            y: 0
        },
        end: {
            x: 0,
            y: 1
        },
        colorStops: [],
        textureSpace: "local",
        type: "linear",
        textureSize: 256,
        wrapMode: "clamp-to-edge"
    }, u.defaultRadialOptions = {
        center: {
            x: .5,
            y: .5
        },
        innerRadius: 0,
        outerRadius: .5,
        colorStops: [],
        scale: 1,
        textureSpace: "local",
        type: "radial",
        textureSize: 256,
        wrapMode: "clamp-to-edge"
    }, t.s(["FillGradient", () => u])
}, 750176, (t, e, i) => {
    e.exports = function(t) {
        var e = [];
        return t.replace(r, function(t, i, r) {
            var n, l = i.toLowerCase();
            for (r = (n = r.match(a)) ? n.map(Number) : [], "m" == l && r.length > 2 && (e.push([i].concat(r.splice(0, 2))), l = "l", i = "m" == i ? "l" : "L");;) {
                if (r.length == s[l]) return r.unshift(i), e.push(r);
                if (r.length < s[l]) throw Error("malformed path data");
                e.push([i].concat(r.splice(0, s[l])))
            }
        }), e
    };
    var s = {
            a: 7,
            c: 6,
            h: 1,
            l: 2,
            m: 2,
            q: 4,
            s: 4,
            t: 2,
            v: 1,
            z: 0
        },
        r = /([astvzqmhlc])([^astvzqmhlc]*)/ig,
        a = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig
}, 206008, 354539, 451910, 957397, 848180, 329692, t => {
    "use strict";
    let e, i;
    var s = t.i(814566),
        r = t.i(526078);
    let a = {
        repeat: {
            addressModeU: "repeat",
            addressModeV: "repeat"
        },
        "repeat-x": {
            addressModeU: "repeat",
            addressModeV: "clamp-to-edge"
        },
        "repeat-y": {
            addressModeU: "clamp-to-edge",
            addressModeV: "repeat"
        },
        "no-repeat": {
            addressModeU: "clamp-to-edge",
            addressModeV: "clamp-to-edge"
        }
    };
    class n {
        constructor(t, e) {
            this.uid = (0, r.uid)("fillPattern"), this.transform = new s.Matrix, this._styleKey = null, this.texture = t, this.transform.scale(1 / t.frame.width, 1 / t.frame.height), e && (t.source.style.addressModeU = a[e].addressModeU, t.source.style.addressModeV = a[e].addressModeV)
        }
        setTransform(t) {
            let e = this.texture;
            this.transform.copyFrom(t), this.transform.invert(), this.transform.scale(1 / e.frame.width, 1 / e.frame.height), this._styleKey = null
        }
        get styleKey() {
            return this._styleKey || (this._styleKey = `fill-pattern-${this.uid}-${this.texture.uid}-${this.transform.toArray().join("-")}`), this._styleKey
        }
    }
    t.s(["FillPattern", () => n], 206008);
    var l = t.i(750176),
        o = t.i(909077);

    function h(t, e) {
        let i = (0, l.default)(t),
            s = [],
            r = null,
            a = 0,
            n = 0;
        for (let t = 0; t < i.length; t++) {
            let l = i[t],
                h = l[0];
            switch (h) {
                case "M":
                    a = l[1], n = l[2], e.moveTo(a, n);
                    break;
                case "m":
                    a += l[1], n += l[2], e.moveTo(a, n);
                    break;
                case "H":
                    a = l[1], e.lineTo(a, n);
                    break;
                case "h":
                    a += l[1], e.lineTo(a, n);
                    break;
                case "V":
                    n = l[1], e.lineTo(a, n);
                    break;
                case "v":
                    n += l[1], e.lineTo(a, n);
                    break;
                case "L":
                    a = l[1], n = l[2], e.lineTo(a, n);
                    break;
                case "l":
                    a += l[1], n += l[2], e.lineTo(a, n);
                    break;
                case "C":
                    a = l[5], n = l[6], e.bezierCurveTo(l[1], l[2], l[3], l[4], a, n);
                    break;
                case "c":
                    e.bezierCurveTo(a + l[1], n + l[2], a + l[3], n + l[4], a + l[5], n + l[6]), a += l[5], n += l[6];
                    break;
                case "S":
                    a = l[3], n = l[4], e.bezierCurveToShort(l[1], l[2], a, n);
                    break;
                case "s":
                    e.bezierCurveToShort(a + l[1], n + l[2], a + l[3], n + l[4]), a += l[3], n += l[4];
                    break;
                case "Q":
                    a = l[3], n = l[4], e.quadraticCurveTo(l[1], l[2], a, n);
                    break;
                case "q":
                    e.quadraticCurveTo(a + l[1], n + l[2], a + l[3], n + l[4]), a += l[3], n += l[4];
                    break;
                case "T":
                    a = l[1], n = l[2], e.quadraticCurveToShort(a, n);
                    break;
                case "t":
                    a += l[1], n += l[2], e.quadraticCurveToShort(a, n);
                    break;
                case "A":
                    a = l[6], n = l[7], e.arcToSvg(l[1], l[2], l[3], l[4], l[5], a, n);
                    break;
                case "a":
                    a += l[6], n += l[7], e.arcToSvg(l[1], l[2], l[3], l[4], l[5], a, n);
                    break;
                case "Z":
                case "z":
                    e.closePath(), s.length > 0 && ((r = s.pop()) ? (a = r.startX, n = r.startY) : (a = 0, n = 0)), r = null;
                    break;
                default:
                    (0, o.warn)(`Unknown SVG path command: ${h}`)
            }
            "Z" !== h && "z" !== h && null === r && (r = {
                startX: a,
                startY: n
            }, s.push(r))
        }
        return e
    }
    t.s(["parseSVGPath", () => h], 354539);
    var u = t.i(368256);
    class c {
        constructor(t = 0, e = 0, i = 0) {
            this.type = "circle", this.x = t, this.y = e, this.radius = i
        }
        clone() {
            return new c(this.x, this.y, this.radius)
        }
        contains(t, e) {
            if (this.radius <= 0) return !1;
            let i = this.radius * this.radius,
                s = this.x - t,
                r = this.y - e;
            return s *= s, r *= r, s + r <= i
        }
        strokeContains(t, e, i, s = .5) {
            if (0 === this.radius) return !1;
            let r = this.x - t,
                a = this.y - e,
                n = this.radius,
                l = (1 - s) * i,
                o = Math.sqrt(r * r + a * a);
            return o <= n + l && o > n - (i - l)
        }
        getBounds(t) {
            return t || (t = new u.Rectangle), t.x = this.x - this.radius, t.y = this.y - this.radius, t.width = 2 * this.radius, t.height = 2 * this.radius, t
        }
        copyFrom(t) {
            return this.x = t.x, this.y = t.y, this.radius = t.radius, this
        }
        copyTo(t) {
            return t.copyFrom(this), t
        }
        toString() {
            return `[pixi.js/math:Circle x=${this.x} y=${this.y} radius=${this.radius}]`
        }
    }
    t.s(["Circle", () => c], 451910);
    class d {
        constructor(t = 0, e = 0, i = 0, s = 0) {
            this.type = "ellipse", this.x = t, this.y = e, this.halfWidth = i, this.halfHeight = s
        }
        clone() {
            return new d(this.x, this.y, this.halfWidth, this.halfHeight)
        }
        contains(t, e) {
            if (this.halfWidth <= 0 || this.halfHeight <= 0) return !1;
            let i = (t - this.x) / this.halfWidth,
                s = (e - this.y) / this.halfHeight;
            return i *= i, s *= s, i + s <= 1
        }
        strokeContains(t, e, i, s = .5) {
            let {
                halfWidth: r,
                halfHeight: a
            } = this;
            if (r <= 0 || a <= 0) return !1;
            let n = i * (1 - s),
                l = i - n,
                o = r - l,
                h = a - l,
                u = r + n,
                c = a + n,
                d = t - this.x,
                p = e - this.y;
            return d * d / (o * o) + p * p / (h * h) > 1 && d * d / (u * u) + p * p / (c * c) <= 1
        }
        getBounds(t) {
            return t || (t = new u.Rectangle), t.x = this.x - this.halfWidth, t.y = this.y - this.halfHeight, t.width = 2 * this.halfWidth, t.height = 2 * this.halfHeight, t
        }
        copyFrom(t) {
            return this.x = t.x, this.y = t.y, this.halfWidth = t.halfWidth, this.halfHeight = t.halfHeight, this
        }
        copyTo(t) {
            return t.copyFrom(this), t
        }
        toString() {
            return `[pixi.js/math:Ellipse x=${this.x} y=${this.y} halfWidth=${this.halfWidth} halfHeight=${this.halfHeight}]`
        }
    }
    t.s(["Ellipse", () => d], 957397);
    var p = t.i(373839);
    class f {
        constructor(...t) {
            this.type = "polygon";
            let e = Array.isArray(t[0]) ? t[0] : t;
            if ("number" != typeof e[0]) {
                const t = [];
                for (let i = 0, s = e.length; i < s; i++) t.push(e[i].x, e[i].y);
                e = t
            }
            this.points = e, this.closePath = !0
        }
        isClockwise() {
            let t = 0,
                e = this.points,
                i = e.length;
            for (let s = 0; s < i; s += 2) {
                let r = e[s],
                    a = e[s + 1];
                t += (e[(s + 2) % i] - r) * (e[(s + 3) % i] + a)
            }
            return t < 0
        }
        containsPolygon(t) {
            let s = this.getBounds(e),
                r = t.getBounds(i);
            if (!s.containsRect(r)) return !1;
            let a = t.points;
            for (let t = 0; t < a.length; t += 2) {
                let e = a[t],
                    i = a[t + 1];
                if (!this.contains(e, i)) return !1
            }
            return !0
        }
        clone() {
            let t = new f(this.points.slice());
            return t.closePath = this.closePath, t
        }
        contains(t, e) {
            let i = !1,
                s = this.points.length / 2;
            for (let r = 0, a = s - 1; r < s; a = r++) {
                let s = this.points[2 * r],
                    n = this.points[2 * r + 1],
                    l = this.points[2 * a],
                    o = this.points[2 * a + 1];
                n > e != o > e && t < (e - n) / (o - n) * (l - s) + s && (i = !i)
            }
            return i
        }
        strokeContains(t, e, i, s = .5) {
            let r = i * i,
                a = r * (1 - s),
                n = r - a,
                {
                    points: l
                } = this,
                o = l.length - 2 * !this.closePath;
            for (let i = 0; i < o; i += 2) {
                let s = l[i],
                    r = l[i + 1],
                    o = l[(i + 2) % l.length],
                    h = l[(i + 3) % l.length];
                if (function(t, e, i, s, r, a) {
                        let n, l, o = r - i,
                            h = a - s,
                            u = o * o + h * h,
                            c = -1;
                        0 !== u && (c = ((t - i) * o + (e - s) * h) / u), c < 0 ? (n = i, l = s) : c > 1 ? (n = r, l = a) : (n = i + c * o, l = s + c * h);
                        let d = t - n,
                            p = e - l;
                        return d * d + p * p
                    }(t, e, s, r, o, h) <= (0 > Math.sign((o - s) * (e - r) - (h - r) * (t - s)) ? n : a)) return !0
            }
            return !1
        }
        getBounds(t) {
            t || (t = new u.Rectangle);
            let e = this.points,
                i = 1 / 0,
                s = -1 / 0,
                r = 1 / 0,
                a = -1 / 0;
            for (let t = 0, n = e.length; t < n; t += 2) {
                let n = e[t],
                    l = e[t + 1];
                i = n < i ? n : i, s = n > s ? n : s, r = l < r ? l : r, a = l > a ? l : a
            }
            return t.x = i, t.width = s - i, t.y = r, t.height = a - r, t
        }
        copyFrom(t) {
            return this.points = t.points.slice(), this.closePath = t.closePath, this
        }
        copyTo(t) {
            return t.copyFrom(this), t
        }
        toString() {
            return `[pixi.js/math:PolygoncloseStroke=${this.closePath}points=${this.points.reduce((t,e)=>`${t}, ${e}`,"")}]`
        }
        get lastX() {
            return this.points[this.points.length - 2]
        }
        get lastY() {
            return this.points[this.points.length - 1]
        }
        get x() {
            return (0, p.deprecation)("8.11.0", "Polygon.lastX is deprecated, please use Polygon.lastX instead."), this.points[this.points.length - 2]
        }
        get y() {
            return (0, p.deprecation)("8.11.0", "Polygon.y is deprecated, please use Polygon.lastY instead."), this.points[this.points.length - 1]
        }
        get startX() {
            return this.points[0]
        }
        get startY() {
            return this.points[1]
        }
    }
    t.s(["Polygon", () => f], 848180);
    let x = (t, e, i, s, r, a, n) => {
        let l = t - i,
            o = e - s,
            h = Math.sqrt(l * l + o * o);
        return h >= r - a && h <= r + n
    };
    class y {
        constructor(t = 0, e = 0, i = 0, s = 0, r = 20) {
            this.type = "roundedRectangle", this.x = t, this.y = e, this.width = i, this.height = s, this.radius = r
        }
        getBounds(t) {
            return t || (t = new u.Rectangle), t.x = this.x, t.y = this.y, t.width = this.width, t.height = this.height, t
        }
        clone() {
            return new y(this.x, this.y, this.width, this.height, this.radius)
        }
        copyFrom(t) {
            return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, this
        }
        copyTo(t) {
            return t.copyFrom(this), t
        }
        contains(t, e) {
            if (this.width <= 0 || this.height <= 0) return !1;
            if (t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height) {
                let i = Math.max(0, Math.min(this.radius, Math.min(this.width, this.height) / 2));
                if (e >= this.y + i && e <= this.y + this.height - i || t >= this.x + i && t <= this.x + this.width - i) return !0;
                let s = t - (this.x + i),
                    r = e - (this.y + i),
                    a = i * i;
                if (s * s + r * r <= a || (s = t - (this.x + this.width - i)) * s + r * r <= a || s * s + (r = e - (this.y + this.height - i)) * r <= a || (s = t - (this.x + i)) * s + r * r <= a) return !0
            }
            return !1
        }
        strokeContains(t, e, i, s = .5) {
            let {
                x: r,
                y: a,
                width: n,
                height: l,
                radius: o
            } = this, h = i * (1 - s), u = i - h, c = r + o, d = a + o, p = n - 2 * o, f = l - 2 * o, y = r + n, g = a + l;
            return (t >= r - h && t <= r + u || t >= y - u && t <= y + h) && e >= d && e <= d + f || (e >= a - h && e <= a + u || e >= g - u && e <= g + h) && t >= c && t <= c + p || t < c && e < d && x(t, e, c, d, o, u, h) || t > y - o && e < d && x(t, e, y - o, d, o, u, h) || t > y - o && e > g - o && x(t, e, y - o, g - o, o, u, h) || t < c && e > g - o && x(t, e, c, g - o, o, u, h)
        }
        toString() {
            return `[pixi.js/math:RoundedRectangle x=${this.x} y=${this.y}width=${this.width} height=${this.height} radius=${this.radius}]`
        }
    }
    t.s(["RoundedRectangle", () => y], 329692)
}, 357814, 820451, 418231, 359310, 966710, 290172, 157043, 229020, 299780, 871306, t => {
    "use strict";

    function e(t, i, s, r, a, n, l, o = null) {
        let h = 0;
        s *= i, a *= n;
        let u = o.a,
            c = o.b,
            d = o.c,
            p = o.d,
            f = o.tx,
            x = o.ty;
        for (; h < l;) {
            let e = t[s],
                l = t[s + 1];
            r[a] = u * e + d * l + f, r[a + 1] = c * e + p * l + x, a += n, s += i, h++
        }
    }

    function i(t, e, i, s) {
        let r = 0;
        for (e *= i; r < s;) t[e] = 0, t[e + 1] = 0, e += i, r++
    }

    function s(t, e, i, s, r) {
        let a = e.a,
            n = e.b,
            l = e.c,
            o = e.d,
            h = e.tx,
            u = e.ty;
        i || (i = 0), s || (s = 2), r || (r = t.length / s - i);
        let c = i * s;
        for (let e = 0; e < r; e++) {
            let e = t[c],
                i = t[c + 1];
            t[c] = a * e + l * i + h, t[c + 1] = n * e + o * i + u, c += s
        }
    }
    t.s(["buildSimpleUvs", () => i, "buildUvs", () => e], 357814), t.s(["transformVertices", () => s], 820451);
    var r = t.i(814566),
        a = t.i(922901);
    let n = new r.Matrix;
    class l {
        constructor() {
            this.packAsQuad = !1, this.batcherName = "default", this.topology = "triangle-list", this.applyTransform = !0, this.roundPixels = 0, this._batcher = null, this._batch = null
        }
        get uvs() {
            return this.geometryData.uvs
        }
        get positions() {
            return this.geometryData.vertices
        }
        get indices() {
            return this.geometryData.indices
        }
        get blendMode() {
            return this.renderable && this.applyTransform ? this.renderable.groupBlendMode : "normal"
        }
        get color() {
            let t = this.baseColor,
                e = t >> 16 | 65280 & t | (255 & t) << 16,
                i = this.renderable;
            return i ? (0, a.multiplyHexColors)(e, i.groupColor) + (this.alpha * i.groupAlpha * 255 << 24) : e + (255 * this.alpha << 24)
        }
        get transform() {
            return this.renderable ? .groupTransform || n
        }
        copyTo(t) {
            t.indexOffset = this.indexOffset, t.indexSize = this.indexSize, t.attributeOffset = this.attributeOffset, t.attributeSize = this.attributeSize, t.baseColor = this.baseColor, t.alpha = this.alpha, t.texture = this.texture, t.geometryData = this.geometryData, t.topology = this.topology
        }
        reset() {
            this.applyTransform = !0, this.renderable = null, this.topology = "triangle-list"
        }
    }
    t.s(["BatchableGraphics", () => l], 418231);
    var o = t.i(883771);
    let h = {
            extension: {
                type: o.ExtensionType.ShapeBuilder,
                name: "circle"
            },
            build(t, e) {
                let i, s, r, a, n, l;
                if ("circle" === t.type) {
                    if ((n = l = t.radius) <= 0) return !1;
                    i = t.x, s = t.y, r = a = 0
                } else if ("ellipse" === t.type) {
                    if (n = t.halfWidth, l = t.halfHeight, n <= 0 || l <= 0) return !1;
                    i = t.x, s = t.y, r = a = 0
                } else {
                    let e = t.width / 2,
                        o = t.height / 2;
                    i = t.x + e, s = t.y + o, n = l = Math.max(0, Math.min(t.radius, Math.min(e, o))), r = e - n, a = o - l
                }
                if (r < 0 || a < 0) return !1;
                let o = Math.ceil(2.3 * Math.sqrt(n + l)),
                    h = 8 * o + 4 * !!r + 4 * !!a;
                if (0 === h) return !1;
                if (0 === o) return e[0] = e[6] = i + r, e[1] = e[3] = s + a, e[2] = e[4] = i - r, e[5] = e[7] = s - a, !0;
                let u = 0,
                    c = 4 * o + 2 * !!r + 2,
                    d = c,
                    p = h,
                    f = r + n,
                    x = a,
                    y = i + f,
                    g = i - f,
                    _ = s + x;
                if (e[u++] = y, e[u++] = _, e[--c] = _, e[--c] = g, a) {
                    let t = s - x;
                    e[d++] = g, e[d++] = t, e[--p] = t, e[--p] = y
                }
                for (let t = 1; t < o; t++) {
                    let h = Math.PI / 2 * (t / o),
                        f = r + Math.cos(h) * n,
                        x = a + Math.sin(h) * l,
                        y = i + f,
                        g = i - f,
                        _ = s + x,
                        m = s - x;
                    e[u++] = y, e[u++] = _, e[--c] = _, e[--c] = g, e[d++] = g, e[d++] = m, e[--p] = m, e[--p] = y
                }
                f = r, x = a + l, y = i + f, g = i - f, _ = s + x;
                let m = s - x;
                return e[u++] = y, e[u++] = _, e[--p] = m, e[--p] = y, r && (e[u++] = g, e[u++] = _, e[--p] = m, e[--p] = g), !0
            },
            triangulate(t, e, i, s, r, a) {
                if (0 === t.length) return;
                let n = 0,
                    l = 0;
                for (let e = 0; e < t.length; e += 2) n += t[e], l += t[e + 1];
                n /= t.length / 2, l /= t.length / 2;
                let o = s;
                e[o * i] = n, e[o * i + 1] = l;
                let h = o++;
                for (let s = 0; s < t.length; s += 2) e[o * i] = t[s], e[o * i + 1] = t[s + 1], s > 0 && (r[a++] = o, r[a++] = h, r[a++] = o - 1), o++;
                r[a++] = h + 1, r[a++] = h, r[a++] = o - 1
            }
        },
        u = { ...h,
            extension: { ...h.extension,
                name: "ellipse"
            }
        },
        c = { ...h,
            extension: { ...h.extension,
                name: "roundedRectangle"
            }
        };
    t.s(["buildCircle", () => h, "buildEllipse", () => u, "buildRoundedRectangle", () => c], 359310);
    var d = t.i(806811);

    function p(t, e, i, s, r, a, n, l) {
        let o, h;
        n ? (o = s, h = -i) : (o = -s, h = i);
        let u = t - i * r + o,
            c = e - s * r + h,
            d = t + i * a + o,
            p = e + s * a + h;
        return l.push(u, c), l.push(d, p), 2
    }

    function f(t, e, i, s, r, a, n, l) {
        let o = i - t,
            h = s - e,
            u = Math.atan2(o, h),
            c = Math.atan2(r - t, a - e);
        l && u < c ? u += 2 * Math.PI : !l && u > c && (c += 2 * Math.PI);
        let d = u,
            p = c - u,
            f = Math.sqrt(o * o + h * h),
            x = (15 * Math.abs(p) * Math.sqrt(f) / Math.PI | 0) + 1,
            y = p / x;
        if (d += y, l) {
            n.push(t, e), n.push(i, s);
            for (let i = 1, s = d; i < x; i++, s += y) n.push(t, e), n.push(t + Math.sin(s) * f, e + Math.cos(s) * f);
            n.push(t, e), n.push(r, a)
        } else {
            n.push(i, s), n.push(t, e);
            for (let i = 1, s = d; i < x; i++, s += y) n.push(t + Math.sin(s) * f, e + Math.cos(s) * f), n.push(t, e);
            n.push(r, a), n.push(t, e)
        }
        return 2 * x
    }

    function x(t, e, i, s, r, a) {
        if (0 === t.length) return;
        let n = e.alignment;
        if (.5 !== e.alignment) {
            let e = function(t) {
                let e = t.length;
                if (e < 6) return 1;
                let i = 0;
                for (let s = 0, r = t[e - 2], a = t[e - 1]; s < e; s += 2) {
                    let e = t[s],
                        n = t[s + 1];
                    i += (e - r) * (n + a), r = e, a = n
                }
                return i < 0 ? -1 : 1
            }(t);
            i && (e *= -1), n = (n - .5) * e + .5
        }
        let l = new d.Point(t[0], t[1]),
            o = new d.Point(t[t.length - 2], t[t.length - 1]),
            h = 1e-4 > Math.abs(l.x - o.x) && 1e-4 > Math.abs(l.y - o.y);
        if (s) {
            t = t.slice(), h && (t.pop(), t.pop(), o.set(t[t.length - 2], t[t.length - 1]));
            let e = (l.x + o.x) * .5,
                i = (o.y + l.y) * .5;
            t.unshift(e, i), t.push(e, i)
        }
        let u = t.length / 2,
            c = t.length,
            x = r.length / 2,
            y = e.width / 2,
            g = y * y,
            _ = e.miterLimit * e.miterLimit,
            m = t[0],
            S = t[1],
            b = t[2],
            v = t[3],
            w = 0,
            P = 0,
            A = -(S - v),
            k = m - b,
            M = 0,
            C = 0,
            T = Math.sqrt(A * A + k * k);
        A /= T, k /= T, A *= y, k *= y;
        let F = n,
            B = (1 - F) * 2,
            E = 2 * F;
        s || ("round" === e.cap ? c += f(m - A * (B - E) * .5, S - k * (B - E) * .5, m - A * B, S - k * B, m + A * E, S + k * E, r, !0) + 2 : "square" === e.cap && (c += p(m, S, A, k, B, E, !0, r))), r.push(m - A * B, S - k * B), r.push(m + A * E, S + k * E);
        for (let i = 1; i < u - 1; ++i) {
            m = t[(i - 1) * 2], S = t[(i - 1) * 2 + 1], b = t[2 * i], v = t[2 * i + 1], w = t[(i + 1) * 2], P = t[(i + 1) * 2 + 1], T = Math.sqrt((A = -(S - v)) * A + (k = m - b) * k), A /= T, k /= T, A *= y, k *= y, T = Math.sqrt((M = -(v - P)) * M + (C = b - w) * C), M /= T, C /= T, M *= y, C *= y;
            let s = b - m,
                a = S - v,
                n = b - w,
                l = P - v,
                o = s * n + a * l,
                h = a * n - l * s,
                u = h < 0;
            if (Math.abs(h) < .001 * Math.abs(o)) {
                r.push(b - A * B, v - k * B), r.push(b + A * E, v + k * E), o >= 0 && ("round" === e.join ? c += f(b, v, b - A * B, v - k * B, b - M * B, v - C * B, r, !1) + 4 : c += 2, r.push(b - M * E, v - C * E), r.push(b + M * B, v + C * B));
                continue
            }
            let d = (-A + m) * (-k + v) - (-A + b) * (-k + S),
                p = (-M + w) * (-C + v) - (-M + b) * (-C + P),
                x = (s * p - n * d) / h,
                F = (l * d - a * p) / h,
                R = (x - b) * (x - b) + (F - v) * (F - v),
                I = b + (x - b) * B,
                z = v + (F - v) * B,
                L = b - (x - b) * E,
                H = v - (F - v) * E,
                G = u ? B : E;
            R <= Math.min(s * s + a * a, n * n + l * l) + G * G * g ? "bevel" === e.join || R / g > _ ? (u ? (r.push(I, z), r.push(b + A * E, v + k * E), r.push(I, z), r.push(b + M * E, v + C * E)) : (r.push(b - A * B, v - k * B), r.push(L, H), r.push(b - M * B, v - C * B), r.push(L, H)), c += 2) : "round" === e.join ? u ? (r.push(I, z), r.push(b + A * E, v + k * E), c += f(b, v, b + A * E, v + k * E, b + M * E, v + C * E, r, !0) + 4, r.push(I, z), r.push(b + M * E, v + C * E)) : (r.push(b - A * B, v - k * B), r.push(L, H), c += f(b, v, b - A * B, v - k * B, b - M * B, v - C * B, r, !1) + 4, r.push(b - M * B, v - C * B), r.push(L, H)) : (r.push(I, z), r.push(L, H)) : (r.push(b - A * B, v - k * B), r.push(b + A * E, v + k * E), "round" === e.join ? u ? c += f(b, v, b + A * E, v + k * E, b + M * E, v + C * E, r, !0) + 2 : c += f(b, v, b - A * B, v - k * B, b - M * B, v - C * B, r, !1) + 2 : "miter" === e.join && R / g <= _ && (u ? (r.push(L, H), r.push(L, H)) : (r.push(I, z), r.push(I, z)), c += 2), r.push(b - M * B, v - C * B), r.push(b + M * E, v + C * E), c += 2)
        }
        m = t[(u - 2) * 2], S = t[(u - 2) * 2 + 1], b = t[(u - 1) * 2], T = Math.sqrt((A = -(S - (v = t[(u - 1) * 2 + 1]))) * A + (k = m - b) * k), A /= T, k /= T, A *= y, k *= y, r.push(b - A * B, v - k * B), r.push(b + A * E, v + k * E), s || ("round" === e.cap ? c += f(b - A * (B - E) * .5, v - k * (B - E) * .5, b - A * B, v - k * B, b + A * E, v + k * E, r, !1) + 2 : "square" === e.cap && (c += p(b, v, A, k, B, E, !1, r)));
        let R = 1e-4 * 1e-4;
        for (let t = x; t < c + x - 2; ++t) m = r[2 * t], S = r[2 * t + 1], b = r[(t + 1) * 2], v = r[(t + 1) * 2 + 1], w = r[(t + 2) * 2], Math.abs(m * (v - (P = r[(t + 2) * 2 + 1])) + b * (P - S) + w * (S - v)) < R || a.push(t, t + 1, t + 2)
    }

    function y(t, e, i, s) {
        if (0 === t.length) return;
        let r = t[0],
            a = t[1],
            n = t[t.length - 2],
            l = t[t.length - 1],
            o = e || 1e-4 > Math.abs(r - n) && 1e-4 > Math.abs(a - l),
            h = t.length / 2,
            u = i.length / 2;
        for (let e = 0; e < h; e++) i.push(t[2 * e]), i.push(t[2 * e + 1]);
        for (let t = 0; t < h - 1; t++) s.push(u + t, u + t + 1);
        o && s.push(u + h - 1, u)
    }

    function g(t, e, i = 2) {
        let s, r, a, n = e && e.length,
            l = n ? e[0] * i : t.length,
            o = _(t, 0, l, i, !0),
            h = [];
        if (!o || o.next === o.prev) return h;
        if (n && (o = function(t, e, i, s) {
                let r = [];
                for (let i = 0, a = e.length; i < a; i++) {
                    let n = e[i] * s,
                        l = i < a - 1 ? e[i + 1] * s : t.length,
                        o = _(t, n, l, s, !1);
                    o === o.next && (o.steiner = !0), r.push(function(t) {
                        let e = t,
                            i = t;
                        do(e.x < i.x || e.x === i.x && e.y < i.y) && (i = e), e = e.next; while (e !== t) return i
                    }(o))
                }
                r.sort(S);
                for (let t = 0; t < r.length; t++) i = function(t, e) {
                    let i = function(t, e) {
                        let i, s = e,
                            r = t.x,
                            a = t.y,
                            n = -1 / 0;
                        if (A(t, s)) return s;
                        do {
                            if (A(t, s.next)) return s.next;
                            if (a <= s.y && a >= s.next.y && s.next.y !== s.y) {
                                let t = s.x + (a - s.y) * (s.next.x - s.x) / (s.next.y - s.y);
                                if (t <= r && t > n && (n = t, i = s.x < s.next.x ? s : s.next, t === r)) return i
                            }
                            s = s.next
                        } while (s !== e) if (!i) return null;
                        let l = i,
                            o = i.x,
                            h = i.y,
                            u = 1 / 0;
                        s = i;
                        do {
                            if (r >= s.x && s.x >= o && r !== s.x && v(a < h ? r : n, a, o, h, a < h ? n : r, a, s.x, s.y)) {
                                var c, d;
                                let e = Math.abs(a - s.y) / (r - s.x);
                                T(s, t) && (e < u || e === u && (s.x > i.x || s.x === i.x && (c = i, d = s, 0 > P(c.prev, c, d.prev) && 0 > P(d.next, c, c.next)))) && (i = s, u = e)
                            }
                            s = s.next
                        } while (s !== l) return i
                    }(t, e);
                    if (!i) return e;
                    let s = F(i, t);
                    return m(s, s.next), m(i, i.next)
                }(r[t], i);
                return i
            }(t, e, o, i)), t.length > 80 * i) {
            s = t[0], r = t[1];
            let e = s,
                n = r;
            for (let a = i; a < l; a += i) {
                let i = t[a],
                    l = t[a + 1];
                i < s && (s = i), l < r && (r = l), i > e && (e = i), l > n && (n = l)
            }
            a = 0 !== (a = Math.max(e - s, n - r)) ? 32767 / a : 0
        }
        return function t(e, i, s, r, a, n, l) {
            if (!e) return;
            !l && n && function(t, e, i, s) {
                let r = t;
                do 0 === r.z && (r.z = b(r.x, r.y, e, i, s)), r.prevZ = r.prev, r.nextZ = r.next, r = r.next; while (r !== t) r.prevZ.nextZ = null, r.prevZ = null,
                    function(t) {
                        let e, i = 1;
                        do {
                            let s, r = t;
                            t = null;
                            let a = null;
                            for (e = 0; r;) {
                                e++;
                                let n = r,
                                    l = 0;
                                for (let t = 0; t < i && (l++, n = n.nextZ); t++);
                                let o = i;
                                for (; l > 0 || o > 0 && n;) 0 !== l && (0 === o || !n || r.z <= n.z) ? (s = r, r = r.nextZ, l--) : (s = n, n = n.nextZ, o--), a ? a.nextZ = s : t = s, s.prevZ = a, a = s;
                                r = n
                            }
                            a.nextZ = null, i *= 2
                        } while (e > 1)
                    }(r)
            }(e, r, a, n);
            let o = e;
            for (; e.prev !== e.next;) {
                let h = e.prev,
                    u = e.next;
                if (n ? function(t, e, i, s) {
                        let r = t.prev,
                            a = t.next;
                        if (P(r, t, a) >= 0) return !1;
                        let n = r.x,
                            l = t.x,
                            o = a.x,
                            h = r.y,
                            u = t.y,
                            c = a.y,
                            d = Math.min(n, l, o),
                            p = Math.min(h, u, c),
                            f = Math.max(n, l, o),
                            x = Math.max(h, u, c),
                            y = b(d, p, e, i, s),
                            g = b(f, x, e, i, s),
                            _ = t.prevZ,
                            m = t.nextZ;
                        for (; _ && _.z >= y && m && m.z <= g;) {
                            if (_.x >= d && _.x <= f && _.y >= p && _.y <= x && _ !== r && _ !== a && w(n, h, l, u, o, c, _.x, _.y) && P(_.prev, _, _.next) >= 0 || (_ = _.prevZ, m.x >= d && m.x <= f && m.y >= p && m.y <= x && m !== r && m !== a && w(n, h, l, u, o, c, m.x, m.y) && P(m.prev, m, m.next) >= 0)) return !1;
                            m = m.nextZ
                        }
                        for (; _ && _.z >= y;) {
                            if (_.x >= d && _.x <= f && _.y >= p && _.y <= x && _ !== r && _ !== a && w(n, h, l, u, o, c, _.x, _.y) && P(_.prev, _, _.next) >= 0) return !1;
                            _ = _.prevZ
                        }
                        for (; m && m.z <= g;) {
                            if (m.x >= d && m.x <= f && m.y >= p && m.y <= x && m !== r && m !== a && w(n, h, l, u, o, c, m.x, m.y) && P(m.prev, m, m.next) >= 0) return !1;
                            m = m.nextZ
                        }
                        return !0
                    }(e, r, a, n) : function(t) {
                        let e = t.prev,
                            i = t.next;
                        if (P(e, t, i) >= 0) return !1;
                        let s = e.x,
                            r = t.x,
                            a = i.x,
                            n = e.y,
                            l = t.y,
                            o = i.y,
                            h = Math.min(s, r, a),
                            u = Math.min(n, l, o),
                            c = Math.max(s, r, a),
                            d = Math.max(n, l, o),
                            p = i.next;
                        for (; p !== e;) {
                            if (p.x >= h && p.x <= c && p.y >= u && p.y <= d && w(s, n, r, l, a, o, p.x, p.y) && P(p.prev, p, p.next) >= 0) return !1;
                            p = p.next
                        }
                        return !0
                    }(e)) {
                    i.push(h.i, e.i, u.i), E(e), e = u.next, o = u.next;
                    continue
                }
                if ((e = u) === o) {
                    l ? 1 === l ? t(e = function(t, e) {
                        let i = t;
                        do {
                            let s = i.prev,
                                r = i.next.next;
                            !A(s, r) && k(s, i, i.next, r) && T(s, r) && T(r, s) && (e.push(s.i, i.i, r.i), E(i), E(i.next), i = t = r), i = i.next
                        } while (i !== t) return m(i)
                    }(m(e), i), i, s, r, a, n, 2) : 2 === l && function(e, i, s, r, a, n) {
                        let l = e;
                        do {
                            let e = l.next.next;
                            for (; e !== l.prev;) {
                                var o, h;
                                if (l.i !== e.i && (o = l, h = e, o.next.i !== h.i && o.prev.i !== h.i && ! function(t, e) {
                                        let i = t;
                                        do {
                                            if (i.i !== t.i && i.next.i !== t.i && i.i !== e.i && i.next.i !== e.i && k(i, i.next, t, e)) return !0;
                                            i = i.next
                                        } while (i !== t) return !1
                                    }(o, h) && (T(o, h) && T(h, o) && function(t, e) {
                                        let i = t,
                                            s = !1,
                                            r = (t.x + e.x) / 2,
                                            a = (t.y + e.y) / 2;
                                        do i.y > a != i.next.y > a && i.next.y !== i.y && r < (i.next.x - i.x) * (a - i.y) / (i.next.y - i.y) + i.x && (s = !s), i = i.next; while (i !== t) return s
                                    }(o, h) && (P(o.prev, o, h.prev) || P(o, h.prev, h)) || A(o, h) && P(o.prev, o, o.next) > 0 && P(h.prev, h, h.next) > 0))) {
                                    let o = F(l, e);
                                    l = m(l, l.next), o = m(o, o.next), t(l, i, s, r, a, n, 0), t(o, i, s, r, a, n, 0);
                                    return
                                }
                                e = e.next
                            }
                            l = l.next
                        } while (l !== e)
                    }(e, i, s, r, a, n) : t(m(e), i, s, r, a, n, 1);
                    break
                }
            }
        }(o, h, i, s, r, a, 0), h
    }

    function _(t, e, i, s, r) {
        let a;
        if (r === function(t, e, i, s) {
                let r = 0;
                for (let a = e, n = i - s; a < i; a += s) r += (t[n] - t[a]) * (t[a + 1] + t[n + 1]), n = a;
                return r
            }(t, e, i, s) > 0)
            for (let r = e; r < i; r += s) a = B(r / s | 0, t[r], t[r + 1], a);
        else
            for (let r = i - s; r >= e; r -= s) a = B(r / s | 0, t[r], t[r + 1], a);
        return a && A(a, a.next) && (E(a), a = a.next), a
    }

    function m(t, e) {
        if (!t) return t;
        e || (e = t);
        let i = t,
            s;
        do
            if (s = !1, !i.steiner && (A(i, i.next) || 0 === P(i.prev, i, i.next))) {
                if (E(i), (i = e = i.prev) === i.next) break;
                s = !0
            } else i = i.next; while (s || i !== e) return e
    }
    t.s(["buildLine", () => x], 966710), t.s(["buildPixelLine", () => y], 290172);

    function S(t, e) {
        let i = t.x - e.x;
        return 0 === i && 0 == (i = t.y - e.y) && (i = (t.next.y - t.y) / (t.next.x - t.x) - (e.next.y - e.y) / (e.next.x - e.x)), i
    }

    function b(t, e, i, s, r) {
        return (t = ((t = ((t = ((t = ((t = (t - i) * r | 0) | t << 8) & 0xff00ff) | t << 4) & 0xf0f0f0f) | t << 2) & 0x33333333) | t << 1) & 0x55555555) | (e = ((e = ((e = ((e = ((e = (e - s) * r | 0) | e << 8) & 0xff00ff) | e << 4) & 0xf0f0f0f) | e << 2) & 0x33333333) | e << 1) & 0x55555555) << 1
    }

    function v(t, e, i, s, r, a, n, l) {
        return (r - n) * (e - l) >= (t - n) * (a - l) && (t - n) * (s - l) >= (i - n) * (e - l) && (i - n) * (a - l) >= (r - n) * (s - l)
    }

    function w(t, e, i, s, r, a, n, l) {
        return (t !== n || e !== l) && v(t, e, i, s, r, a, n, l)
    }

    function P(t, e, i) {
        return (e.y - t.y) * (i.x - e.x) - (e.x - t.x) * (i.y - e.y)
    }

    function A(t, e) {
        return t.x === e.x && t.y === e.y
    }

    function k(t, e, i, s) {
        let r = C(P(t, e, i)),
            a = C(P(t, e, s)),
            n = C(P(i, s, t)),
            l = C(P(i, s, e));
        return !!(r !== a && n !== l || 0 === r && M(t, i, e) || 0 === a && M(t, s, e) || 0 === n && M(i, t, s) || 0 === l && M(i, e, s))
    }

    function M(t, e, i) {
        return e.x <= Math.max(t.x, i.x) && e.x >= Math.min(t.x, i.x) && e.y <= Math.max(t.y, i.y) && e.y >= Math.min(t.y, i.y)
    }

    function C(t) {
        return t > 0 ? 1 : t < 0 ? -1 : 0
    }

    function T(t, e) {
        return 0 > P(t.prev, t, t.next) ? P(t, e, t.next) >= 0 && P(t, t.prev, e) >= 0 : 0 > P(t, e, t.prev) || 0 > P(t, t.next, e)
    }

    function F(t, e) {
        let i = R(t.i, t.x, t.y),
            s = R(e.i, e.x, e.y),
            r = t.next,
            a = e.prev;
        return t.next = e, e.prev = t, i.next = r, r.prev = i, s.next = i, i.prev = s, a.next = s, s.prev = a, s
    }

    function B(t, e, i, s) {
        let r = R(t, e, i);
        return s ? (r.next = s.next, r.prev = s, s.next.prev = r, s.next = r) : (r.prev = r, r.next = r), r
    }

    function E(t) {
        t.next.prev = t.prev, t.prev.next = t.next, t.prevZ && (t.prevZ.nextZ = t.nextZ), t.nextZ && (t.nextZ.prevZ = t.prevZ)
    }

    function R(t, e, i) {
        return {
            i: t,
            x: e,
            y: i,
            prev: null,
            next: null,
            z: 0,
            prevZ: null,
            nextZ: null,
            steiner: !1
        }
    }
    t.i(785373);
    let I = g.default || g;

    function z(t, e, i, s, r, a, n) {
        let l = I(t, e, 2);
        if (!l) return;
        for (let t = 0; t < l.length; t += 3) a[n++] = l[t] + r, a[n++] = l[t + 1] + r, a[n++] = l[t + 2] + r;
        let o = r * s;
        for (let e = 0; e < t.length; e += 2) i[o] = t[e], i[o + 1] = t[e + 1], o += s
    }
    t.s(["triangulateWithHoles", () => z], 157043);
    let L = [],
        H = {
            extension: {
                type: o.ExtensionType.ShapeBuilder,
                name: "polygon"
            },
            build(t, e) {
                for (let i = 0; i < t.points.length; i++) e[i] = t.points[i];
                return !0
            },
            triangulate(t, e, i, s, r, a) {
                z(t, L, e, i, s, r, a)
            }
        };
    t.s(["buildPolygon", () => H], 229020);
    let G = {
        extension: {
            type: o.ExtensionType.ShapeBuilder,
            name: "rectangle"
        },
        build(t, e) {
            let i = t.x,
                s = t.y,
                r = t.width,
                a = t.height;
            return !!(r > 0 && a > 0) && (e[0] = i, e[1] = s, e[2] = i + r, e[3] = s, e[4] = i + r, e[5] = s + a, e[6] = i, e[7] = s + a, !0)
        },
        triangulate(t, e, i, s, r, a) {
            let n = 0;
            e[(s *= i) + n] = t[0], e[s + n + 1] = t[1], n += i, e[s + n] = t[2], e[s + n + 1] = t[3], n += i, e[s + n] = t[6], e[s + n + 1] = t[7], n += i, e[s + n] = t[4], e[s + n + 1] = t[5], n += i;
            let l = s / i;
            r[a++] = l, r[a++] = l + 1, r[a++] = l + 2, r[a++] = l + 1, r[a++] = l + 3, r[a++] = l + 2
        }
    };
    t.s(["buildRectangle", () => G], 299780);
    let W = {
        extension: {
            type: o.ExtensionType.ShapeBuilder,
            name: "triangle"
        },
        build: (t, e) => (e[0] = t.x, e[1] = t.y, e[2] = t.x2, e[3] = t.y2, e[4] = t.x3, e[5] = t.y3, !0),
        triangulate(t, e, i, s, r, a) {
            let n = 0;
            e[(s *= i) + n] = t[0], e[s + n + 1] = t[1], n += i, e[s + n] = t[2], e[s + n + 1] = t[3], n += i, e[s + n] = t[4], e[s + n + 1] = t[5];
            let l = s / i;
            r[a++] = l, r[a++] = l + 1, r[a++] = l + 2
        }
    };
    t.s(["buildTriangle", () => W], 871306)
}, 200883, t => {
    "use strict";
    var e = t.i(883771),
        i = t.i(631053),
        s = t.i(56550),
        r = t.i(818030),
        a = t.i(373839),
        n = t.i(181222),
        l = t.i(814566),
        o = t.i(368256),
        h = t.i(357814),
        u = t.i(820451),
        c = t.i(297294),
        d = t.i(418231),
        p = t.i(359310),
        f = t.i(966710),
        x = t.i(290172),
        y = t.i(229020),
        g = t.i(299780),
        _ = t.i(871306),
        m = t.i(676862);
    let S = new l.Matrix,
        b = new o.Rectangle;
    var v = t.i(157043);
    let w = {};
    e.extensions.handleByMap(e.ExtensionType.ShapeBuilder, w), e.extensions.add(g.buildRectangle, y.buildPolygon, _.buildTriangle, p.buildCircle, p.buildEllipse, p.buildRoundedRectangle);
    let P = new o.Rectangle,
        A = new l.Matrix;

    function k(t, e, i, s, r) {
        let {
            vertices: a,
            uvs: l,
            indices: o
        } = r;
        t.shapePrimitives.forEach(({
            shape: t,
            transform: p,
            holes: y
        }) => {
            let g = [],
                _ = w[t.type];
            if (!_.build(t, g)) return;
            let P = o.length,
                k = a.length / 2,
                M = "triangle-list";
            if (p && (0, u.transformVertices)(g, p), i) {
                let i = t.closePath ? ? !0;
                e.pixelLine ? ((0, x.buildPixelLine)(g, i, a, o), M = "line-list") : (0, f.buildLine)(g, e, !1, i, a, o)
            } else if (y) {
                let t = [],
                    e = g.slice();
                (function(t) {
                    let e = [];
                    for (let i = 0; i < t.length; i++) {
                        let s = t[i].shape,
                            r = [];
                        w[s.type].build(s, r) && e.push(r)
                    }
                    return e
                })(y).forEach(i => {
                    t.push(e.length / 2), e.push(...i)
                }), (0, v.triangulateWithHoles)(e, t, a, 2, k, o, P)
            } else _.triangulate(g, a, 2, k, o, P);
            let C = l.length / 2,
                T = e.texture;
            if (T !== c.Texture.WHITE) {
                let i = function(t, e, i, s) {
                    let r = e.matrix ? t.copyFrom(e.matrix).invert() : t.identity();
                    if ("local" === e.textureSpace) {
                        let t = i.getBounds(b);
                        e.width && t.pad(e.width);
                        let {
                            x: s,
                            y: a
                        } = t, n = 1 / t.width, l = 1 / t.height, o = -s * n, h = -a * l, u = r.a, c = r.b, d = r.c, p = r.d;
                        r.a *= n, r.b *= n, r.c *= l, r.d *= l, r.tx = o * u + h * d + r.tx, r.ty = o * c + h * p + r.ty
                    } else r.translate(e.texture.frame.x, e.texture.frame.y), r.scale(1 / e.texture.source.width, 1 / e.texture.source.height);
                    let a = e.texture.source.style;
                    return e.fill instanceof m.FillGradient || "clamp-to-edge" !== a.addressMode || (a.addressMode = "repeat", a.update()), s && r.append(S.copyFrom(s).invert()), r
                }(A, e, t, p);
                (0, h.buildUvs)(a, 2, k, l, C, 2, a.length / 2 - k, i)
            } else(0, h.buildSimpleUvs)(l, C, 2, a.length / 2 - k);
            let F = n.BigPool.get(d.BatchableGraphics);
            F.indexOffset = P, F.indexSize = o.length - P, F.attributeOffset = k, F.attributeSize = a.length / 2 - k, F.baseColor = e.color, F.alpha = e.alpha, F.texture = T, F.geometryData = r, F.topology = M, s.push(F)
        })
    }
    class M {
        constructor() {
            this.batches = [], this.geometryData = {
                vertices: [],
                uvs: [],
                indices: []
            }
        }
    }
    class C {
        constructor() {
            this.instructions = new r.InstructionSet
        }
        init(t) {
            this.batcher = new s.DefaultBatcher({
                maxTextures: t
            }), this.instructions.reset()
        }
        get geometry() {
            return (0, a.deprecation)(a.v8_3_4, "GraphicsContextRenderData#geometry is deprecated, please use batcher.geometry instead."), this.batcher.geometry
        }
    }
    let T = class t {
        constructor(t) {
            this._gpuContextHash = {}, this._graphicsDataContextHash = Object.create(null), this._renderer = t, t.renderableGC.addManagedHash(this, "_gpuContextHash"), t.renderableGC.addManagedHash(this, "_graphicsDataContextHash")
        }
        init(e) {
            t.defaultOptions.bezierSmoothness = e ? .bezierSmoothness ? ? t.defaultOptions.bezierSmoothness
        }
        getContextRenderData(t) {
            return this._graphicsDataContextHash[t.uid] || this._initContextRenderData(t)
        }
        updateGpuContext(t) {
            let e = this._gpuContextHash[t.uid] || this._initContext(t);
            if (t.dirty) {
                e ? this._cleanGraphicsContextData(t) : e = this._initContext(t),
                    function(t, e) {
                        let {
                            geometryData: i,
                            batches: s
                        } = e;
                        s.length = 0, i.indices.length = 0, i.vertices.length = 0, i.uvs.length = 0;
                        for (let e = 0; e < t.instructions.length; e++) {
                            let r = t.instructions[e];
                            if ("texture" === r.action) ! function(t, e, i) {
                                let s = [],
                                    r = w.rectangle;
                                P.x = t.dx, P.y = t.dy, P.width = t.dw, P.height = t.dh;
                                let a = t.transform;
                                if (!r.build(P, s)) return;
                                let {
                                    vertices: l,
                                    uvs: o,
                                    indices: h
                                } = i, c = h.length, p = l.length / 2;
                                a && (0, u.transformVertices)(s, a), r.triangulate(s, l, 2, p, h, c);
                                let f = t.image,
                                    x = f.uvs;
                                o.push(x.x0, x.y0, x.x1, x.y1, x.x3, x.y3, x.x2, x.y2);
                                let y = n.BigPool.get(d.BatchableGraphics);
                                y.indexOffset = c, y.indexSize = h.length - c, y.attributeOffset = p, y.attributeSize = l.length / 2 - p, y.baseColor = t.style, y.alpha = t.alpha, y.texture = f, y.geometryData = i, e.push(y)
                            }(r.data, s, i);
                            else if ("fill" === r.action || "stroke" === r.action) {
                                let t = "stroke" === r.action,
                                    e = r.data.path.shapePath,
                                    a = r.data.style,
                                    n = r.data.hole;
                                t && n && k(n.shapePath, a, !0, s, i), n && (e.shapePrimitives[e.shapePrimitives.length - 1].holes = n.shapePath.shapePrimitives), k(e, a, t, s, i)
                            }
                        }
                    }(t, e);
                let i = t.batchMode;
                t.customShader || "no-batch" === i ? e.isBatchable = !1 : "auto" === i ? e.isBatchable = e.geometryData.vertices.length < 400 : e.isBatchable = !0, t.dirty = !1
            }
            return e
        }
        getGpuContext(t) {
            return this._gpuContextHash[t.uid] || this._initContext(t)
        }
        _initContextRenderData(t) {
            let e = n.BigPool.get(C, {
                    maxTextures: this._renderer.limits.maxBatchableTextures
                }),
                {
                    batches: s,
                    geometryData: r
                } = this._gpuContextHash[t.uid],
                a = r.vertices.length,
                l = r.indices.length;
            for (let t = 0; t < s.length; t++) s[t].applyTransform = !1;
            let o = e.batcher;
            o.ensureAttributeBuffer(a), o.ensureIndexBuffer(l), o.begin();
            for (let t = 0; t < s.length; t++) {
                let e = s[t];
                o.add(e)
            }
            o.finish(e.instructions);
            let h = o.geometry;
            h.indexBuffer.setDataWithSize(o.indexBuffer, o.indexSize, !0), h.buffers[0].setDataWithSize(o.attributeBuffer.float32View, o.attributeSize, !0);
            let u = o.batches;
            for (let t = 0; t < u.length; t++) {
                let e = u[t];
                e.bindGroup = (0, i.getTextureBatchBindGroup)(e.textures.textures, e.textures.count, this._renderer.limits.maxBatchableTextures)
            }
            return this._graphicsDataContextHash[t.uid] = e, e
        }
        _initContext(t) {
            let e = new M;
            return e.context = t, this._gpuContextHash[t.uid] = e, t.on("destroy", this.onGraphicsContextDestroy, this), this._gpuContextHash[t.uid]
        }
        onGraphicsContextDestroy(t) {
            this._cleanGraphicsContextData(t), t.off("destroy", this.onGraphicsContextDestroy, this), this._gpuContextHash[t.uid] = null
        }
        _cleanGraphicsContextData(t) {
            let e = this._gpuContextHash[t.uid];
            !e.isBatchable && this._graphicsDataContextHash[t.uid] && (n.BigPool.return(this.getContextRenderData(t)), this._graphicsDataContextHash[t.uid] = null), e.batches && e.batches.forEach(t => {
                n.BigPool.return(t)
            })
        }
        destroy() {
            for (let t in this._gpuContextHash) this._gpuContextHash[t] && this.onGraphicsContextDestroy(this._gpuContextHash[t].context)
        }
    };
    T.extension = {
        type: [e.ExtensionType.WebGLSystem, e.ExtensionType.WebGPUSystem, e.ExtensionType.CanvasSystem],
        name: "graphicsContext"
    }, T.defaultOptions = {
        bezierSmoothness: .5
    }, t.s(["GraphicsContextSystem", () => T], 200883)
}, 629272, 638872, t => {
    "use strict";
    var e = t.i(785373),
        i = t.i(307301),
        s = t.i(373839),
        r = t.i(676862),
        a = t.i(206008),
        n = e,
        l = t.i(814566),
        o = t.i(806811),
        h = t.i(297294),
        u = t.i(526078),
        c = t.i(601730),
        d = t.i(909077),
        p = t.i(354539),
        f = t.i(451910),
        x = t.i(957397),
        y = t.i(848180),
        g = t.i(368256),
        _ = t.i(329692),
        m = t.i(200883);

    function S(t, e, i, s, r, a, n, l, o, h) {
        var u, c, d;
        let p = (1 - Math.min(.99, Math.max(0, h ? ? m.GraphicsContextSystem.defaultOptions.bezierSmoothness))) / 1;
        return p *= p,
            function t(e, i, s, r, a, n, l, o, h, u, c) {
                if (c > 8) return;
                let d = (e + s) / 2,
                    p = (i + r) / 2,
                    f = (s + a) / 2,
                    x = (r + n) / 2,
                    y = (a + l) / 2,
                    g = (n + o) / 2,
                    _ = (d + f) / 2,
                    m = (p + x) / 2,
                    S = (f + y) / 2,
                    b = (x + g) / 2,
                    v = (_ + S) / 2,
                    w = (m + b) / 2;
                if (c > 0) {
                    let t = l - e,
                        c = o - i,
                        d = Math.abs((s - l) * c - (r - o) * t),
                        p = Math.abs((a - l) * c - (n - o) * t);
                    if (d > 11920929e-14 && p > 11920929e-14) {
                        if ((d + p) * (d + p) <= u * (t * t + c * c)) return void h.push(v, w)
                    } else if (d > 11920929e-14) {
                        if (d * d <= u * (t * t + c * c)) return void h.push(v, w)
                    } else if (p > 11920929e-14) {
                        if (p * p <= u * (t * t + c * c)) return void h.push(v, w)
                    } else if ((t = v - (e + l) / 2) * t + (c = w - (i + o) / 2) * c <= u) return void h.push(v, w)
                }
                t(e, i, d, p, _, m, v, w, h, u, c + 1), t(v, w, S, b, y, g, l, o, h, u, c + 1)
            }(e, i, s, r, a, n, u = l, c = o, d = t, p, 0), d.push(u, c), t
    }

    function b(t, e, i, s, r, a, n, l) {
        let o = Math.abs(r - a);
        !n && r > a ? o = 2 * Math.PI - o : n && a > r && (o = 2 * Math.PI - o), l || (l = Math.max(6, Math.floor(6 * Math.pow(s, 1 / 3) * (o / Math.PI))));
        let h = o / (l = Math.max(l, 3)),
            u = r;
        h *= n ? -1 : 1;
        for (let r = 0; r < l + 1; r++) {
            let r = e + Math.cos(u) * s,
                a = i + Math.sin(u) * s;
            t.push(r, a), u += h
        }
    }
    let v = 2 * Math.PI,
        w = {
            centerX: 0,
            centerY: 0,
            ang1: 0,
            ang2: 0
        },
        P = ({
            x: t,
            y: e
        }, i, s, r, a, n, l, o) => {
            let h = r * (t *= i) - a * (e *= s),
                u = a * t + r * e;
            return o.x = h + n, o.y = u + l, o
        },
        A = (t, e, i, s) => {
            let r = t * i + e * s;
            return r > 1 && (r = 1), r < -1 && (r = -1), (t * s - e * i < 0 ? -1 : 1) * Math.acos(r)
        },
        k = new g.Rectangle;
    class M {
        constructor(t) {
            this.shapePrimitives = [], this._currentPoly = null, this._bounds = new c.Bounds, this._graphicsPath2D = t, this.signed = t.checkForHoles
        }
        moveTo(t, e) {
            return this.startPoly(t, e), this
        }
        lineTo(t, e) {
            this._ensurePoly();
            let i = this._currentPoly.points,
                s = i[i.length - 2],
                r = i[i.length - 1];
            return (s !== t || r !== e) && i.push(t, e), this
        }
        arc(t, e, i, s, r, a) {
            return this._ensurePoly(!1), b(this._currentPoly.points, t, e, i, s, r, a), this
        }
        arcTo(t, e, i, s, r) {
            return this._ensurePoly(), ! function(t, e, i, s, r, a) {
                let n = t[t.length - 2],
                    l = t[t.length - 1] - i,
                    o = n - e,
                    h = r - i,
                    u = s - e,
                    c = Math.abs(l * u - o * h);
                if (c < 1e-8 || 0 === a) {
                    (t[t.length - 2] !== e || t[t.length - 1] !== i) && t.push(e, i);
                    return
                }
                let d = l * l + o * o,
                    p = h * h + u * u,
                    f = l * h + o * u,
                    x = a * Math.sqrt(d) / c,
                    y = a * Math.sqrt(p) / c,
                    g = x * f / d,
                    _ = y * f / p,
                    m = x * u + y * o,
                    S = x * h + y * l,
                    v = Math.atan2(l * (y + g) - S, o * (y + g) - m),
                    w = Math.atan2(h * (x + _) - S, u * (x + _) - m);
                b(t, m + e, S + i, a, v, w, o * h > u * l)
            }(this._currentPoly.points, t, e, i, s, r), this
        }
        arcToSvg(t, e, i, s, r, a, n) {
            return ! function(t, e, i, s, r, a, n, l = 0, o = 0, h = 0) {
                var u, c;
                let d, p, f, x, y, g, _, m, b, k, M;
                if (0 === a || 0 === n) return;
                let C = Math.sin(l * v / 360),
                    T = Math.cos(l * v / 360),
                    F = T * (e - s) / 2 + C * (i - r) / 2,
                    B = -C * (e - s) / 2 + T * (i - r) / 2;
                if (0 === F && 0 === B) return;
                let E = Math.pow(F, 2) / Math.pow(a = Math.abs(a), 2) + Math.pow(B, 2) / Math.pow(n = Math.abs(n), 2);
                E > 1 && (a *= Math.sqrt(E), n *= Math.sqrt(E)), u = a, c = n, d = Math.pow(u, 2), p = Math.pow(c, 2), f = Math.pow(F, 2), (y = d * p - d * (x = Math.pow(B, 2)) - p * f) < 0 && (y = 0), y /= d * x + p * f, g = (y = Math.sqrt(y) * (o === h ? -1 : 1)) * u / c * B, _ = -(y * c) / u * F, k = A(1, 0, m = (F - g) / u, b = (B - _) / c), M = A(m, b, (-F - g) / u, (-B - _) / c), 0 === h && M > 0 && (M -= v), 1 === h && M < 0 && (M += v), w.centerX = T * g - C * _ + (e + s) / 2, w.centerY = C * g + T * _ + (i + r) / 2, w.ang1 = k, w.ang2 = M;
                let {
                    ang1: R,
                    ang2: I
                } = w, {
                    centerX: z,
                    centerY: L
                } = w, H = Math.abs(I) / (v / 4);
                1e-7 > Math.abs(1 - H) && (H = 1);
                let G = Math.max(Math.ceil(H), 1);
                I /= G;
                let W = t[t.length - 2],
                    O = t[t.length - 1],
                    U = {
                        x: 0,
                        y: 0
                    };
                for (let e = 0; e < G; e++) {
                    let e = function(t, e) {
                            let i = -1.5707963267948966 === e ? -.551915024494 : 4 / 3 * Math.tan(e / 4),
                                s = 1.5707963267948966 === e ? .551915024494 : i,
                                r = Math.cos(t),
                                a = Math.sin(t),
                                n = Math.cos(t + e),
                                l = Math.sin(t + e);
                            return [{
                                x: r - a * s,
                                y: a + r * s
                            }, {
                                x: n + l * s,
                                y: l - n * s
                            }, {
                                x: n,
                                y: l
                            }]
                        }(R, I),
                        {
                            x: i,
                            y: s
                        } = P(e[0], a, n, T, C, z, L, U),
                        {
                            x: r,
                            y: l
                        } = P(e[1], a, n, T, C, z, L, U),
                        {
                            x: o,
                            y: h
                        } = P(e[2], a, n, T, C, z, L, U);
                    S(t, W, O, i, s, r, l, o, h), W = o, O = h, R += I
                }
            }(this._currentPoly.points, this._currentPoly.lastX, this._currentPoly.lastY, a, n, t, e, i, s, r), this
        }
        bezierCurveTo(t, e, i, s, r, a, n) {
            this._ensurePoly();
            let l = this._currentPoly;
            return S(this._currentPoly.points, l.lastX, l.lastY, t, e, i, s, r, a, n), this
        }
        quadraticCurveTo(t, e, i, s, r) {
            var a, n, l, o, h, u, c, d, p, f, x;
            let y;
            this._ensurePoly();
            let g = this._currentPoly;
            return a = this._currentPoly.points, n = g.lastX, l = g.lastY, y = (1 - Math.min(.99, Math.max(0, r ? ? m.GraphicsContextSystem.defaultOptions.bezierSmoothness))) / 1, o = n, h = l, u = t, c = e, d = i, p = s, f = a, x = y *= y,
                function t(e, i, s, r, a, n, l, o, h) {
                    if (h > 8) return;
                    let u = (i + r) / 2,
                        c = (s + a) / 2,
                        d = (r + n) / 2,
                        p = (a + l) / 2,
                        f = (u + d) / 2,
                        x = (c + p) / 2,
                        y = n - i,
                        g = l - s,
                        _ = Math.abs((r - n) * g - (a - l) * y);
                    if (_ > 11920929e-14) {
                        if (_ * _ <= o * (y * y + g * g)) return void e.push(f, x)
                    } else if ((y = f - (i + n) / 2) * y + (g = x - (s + l) / 2) * g <= o) return void e.push(f, x);
                    t(e, i, s, u, c, f, x, o, h + 1), t(e, f, x, d, p, n, l, o, h + 1)
                }(f, o, h, u, c, d, p, x, 0), f.push(d, p), this
        }
        closePath() {
            return this.endPoly(!0), this
        }
        addPath(t, e) {
            this.endPoly(), e && !e.isIdentity() && (t = t.clone(!0)).transform(e);
            let i = this.shapePrimitives,
                s = i.length;
            for (let e = 0; e < t.instructions.length; e++) {
                let i = t.instructions[e];
                this[i.action](...i.data)
            }
            if (t.checkForHoles && i.length - s > 1) {
                let t = null;
                for (let e = s; e < i.length; e++) {
                    let s = i[e];
                    if ("polygon" === s.shape.type) {
                        let r = s.shape,
                            a = t ? .shape;
                        a && a.containsPolygon(r) ? (t.holes || (t.holes = []), t.holes.push(s), i.copyWithin(e, e + 1), i.length--, e--) : t = s
                    }
                }
            }
            return this
        }
        finish(t = !1) {
            this.endPoly(t)
        }
        rect(t, e, i, s, r) {
            return this.drawShape(new g.Rectangle(t, e, i, s), r), this
        }
        circle(t, e, i, s) {
            return this.drawShape(new f.Circle(t, e, i), s), this
        }
        poly(t, e, i) {
            let s = new y.Polygon(t);
            return s.closePath = e, this.drawShape(s, i), this
        }
        regularPoly(t, e, i, s, r = 0, a) {
            let n = -1 * Math.PI / 2 + r,
                l = 2 * Math.PI / (s = Math.max(0 | s, 3)),
                o = [];
            for (let r = 0; r < s; r++) {
                let s = n - r * l;
                o.push(t + i * Math.cos(s), e + i * Math.sin(s))
            }
            return this.poly(o, !0, a), this
        }
        roundPoly(t, e, i, s, r, a = 0, n) {
            if (s = Math.max(0 | s, 3), r <= 0) return this.regularPoly(t, e, i, s, a);
            r = Math.min(r, i * Math.sin(Math.PI / s) - .001);
            let l = -1 * Math.PI / 2 + a,
                o = 2 * Math.PI / s,
                h = (s - 2) * Math.PI / s / 2;
            for (let a = 0; a < s; a++) {
                let s = a * o + l,
                    u = t + i * Math.cos(s),
                    c = e + i * Math.sin(s),
                    d = s + Math.PI + h,
                    p = s - Math.PI - h,
                    f = u + r * Math.cos(d),
                    x = c + r * Math.sin(d),
                    y = u + r * Math.cos(p),
                    g = c + r * Math.sin(p);
                0 === a ? this.moveTo(f, x) : this.lineTo(f, x), this.quadraticCurveTo(u, c, y, g, n)
            }
            return this.closePath()
        }
        roundShape(t, e, i = !1, s) {
            return t.length < 3 ? this : (i ? ! function(t, e, i, s) {
                let r = (t, e) => Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2),
                    a = (t, e, i) => ({
                        x: t.x + (e.x - t.x) * i,
                        y: t.y + (e.y - t.y) * i
                    }),
                    n = e.length;
                for (let l = 0; l < n; l++) {
                    let o, h, u = e[(l + 1) % n],
                        c = u.radius ? ? i;
                    if (c <= 0) {
                        0 === l ? t.moveTo(u.x, u.y) : t.lineTo(u.x, u.y);
                        continue
                    }
                    let d = e[l],
                        p = e[(l + 2) % n],
                        f = r(d, u);
                    o = f < 1e-4 ? u : a(u, d, Math.min(f / 2, c) / f);
                    let x = r(p, u);
                    h = x < 1e-4 ? u : a(u, p, Math.min(x / 2, c) / x), 0 === l ? t.moveTo(o.x, o.y) : t.lineTo(o.x, o.y), t.quadraticCurveTo(u.x, u.y, h.x, h.y, s)
                }
            }(this, t, e, s) : ! function(t, e, i) {
                let s = (t, e) => {
                        let i = e.x - t.x,
                            s = e.y - t.y,
                            r = Math.sqrt(i * i + s * s);
                        return {
                            len: r,
                            nx: i / r,
                            ny: s / r
                        }
                    },
                    r = (e, i) => {
                        0 === e ? t.moveTo(i.x, i.y) : t.lineTo(i.x, i.y)
                    },
                    a = e[e.length - 1];
                for (let n = 0; n < e.length; n++) {
                    let l, o = e[n % e.length],
                        h = o.radius ? ? i;
                    if (h <= 0) {
                        r(n, o), a = o;
                        continue
                    }
                    let u = e[(n + 1) % e.length],
                        c = s(o, a),
                        d = s(o, u);
                    if (c.len < 1e-4 || d.len < 1e-4) {
                        r(n, o), a = o;
                        continue
                    }
                    let p = Math.asin(c.nx * d.ny - c.ny * d.nx),
                        f = 1,
                        x = !1;
                    c.nx * d.nx - -(c.ny * d.ny) < 0 ? p < 0 ? p = Math.PI + p : (p = Math.PI - p, f = -1, x = !0) : p > 0 && (f = -1, x = !0);
                    let y = p / 2,
                        g = Math.abs(Math.cos(y) * h / Math.sin(y));
                    l = g > Math.min(c.len / 2, d.len / 2) ? Math.abs((g = Math.min(c.len / 2, d.len / 2)) * Math.sin(y) / Math.cos(y)) : h;
                    let _ = o.x + d.nx * g + -d.ny * l * f,
                        m = o.y + d.ny * g + d.nx * l * f,
                        S = Math.atan2(c.ny, c.nx) + Math.PI / 2 * f,
                        b = Math.atan2(d.ny, d.nx) - Math.PI / 2 * f;
                    0 === n && t.moveTo(_ + Math.cos(S) * l, m + Math.sin(S) * l), t.arc(_, m, l, S, b, x), a = o
                }
            }(this, t, e), this.closePath())
        }
        filletRect(t, e, i, s, r) {
            if (0 === r) return this.rect(t, e, i, s);
            let a = Math.min(i, s) / 2,
                n = Math.min(a, Math.max(-a, r)),
                l = t + i,
                o = e + s,
                h = n < 0 ? -n : 0,
                u = Math.abs(n);
            return this.moveTo(t, e + u).arcTo(t + h, e + h, t + u, e, u).lineTo(l - u, e).arcTo(l - h, e + h, l, e + u, u).lineTo(l, o - u).arcTo(l - h, o - h, t + i - u, o, u).lineTo(t + u, o).arcTo(t + h, o - h, t, o - u, u).closePath()
        }
        chamferRect(t, e, i, s, r, a) {
            if (r <= 0) return this.rect(t, e, i, s);
            let n = Math.min(r, Math.min(i, s) / 2),
                l = t + i,
                o = e + s,
                h = [t + n, e, l - n, e, l, e + n, l, o - n, l - n, o, t + n, o, t, o - n, t, e + n];
            for (let t = h.length - 1; t >= 2; t -= 2) h[t] === h[t - 2] && h[t - 1] === h[t - 3] && h.splice(t - 1, 2);
            return this.poly(h, !0, a)
        }
        ellipse(t, e, i, s, r) {
            return this.drawShape(new x.Ellipse(t, e, i, s), r), this
        }
        roundRect(t, e, i, s, r, a) {
            return this.drawShape(new _.RoundedRectangle(t, e, i, s, r), a), this
        }
        drawShape(t, e) {
            return this.endPoly(), this.shapePrimitives.push({
                shape: t,
                transform: e
            }), this
        }
        startPoly(t, e) {
            let i = this._currentPoly;
            return i && this.endPoly(), (i = new y.Polygon).points.push(t, e), this._currentPoly = i, this
        }
        endPoly(t = !1) {
            let e = this._currentPoly;
            return e && e.points.length > 2 && (e.closePath = t, this.shapePrimitives.push({
                shape: e
            })), this._currentPoly = null, this
        }
        _ensurePoly(t = !0) {
            if (!this._currentPoly && (this._currentPoly = new y.Polygon, t)) {
                let t = this.shapePrimitives[this.shapePrimitives.length - 1];
                if (t) {
                    let e = t.shape.x,
                        i = t.shape.y;
                    if (t.transform && !t.transform.isIdentity()) {
                        let s = t.transform,
                            r = e;
                        e = s.a * e + s.c * i + s.tx, i = s.b * r + s.d * i + s.ty
                    }
                    this._currentPoly.points.push(e, i)
                } else this._currentPoly.points.push(0, 0)
            }
        }
        buildPath() {
            let t = this._graphicsPath2D;
            this.shapePrimitives.length = 0, this._currentPoly = null;
            for (let e = 0; e < t.instructions.length; e++) {
                let i = t.instructions[e];
                this[i.action](...i.data)
            }
            this.finish()
        }
        get bounds() {
            let t = this._bounds;
            t.clear();
            let e = this.shapePrimitives;
            for (let i = 0; i < e.length; i++) {
                let s = e[i],
                    r = s.shape.getBounds(k);
                s.transform ? t.addRect(r, s.transform) : t.addRect(r)
            }
            return t
        }
    }
    class C {
        constructor(t, e = !1) {
            this.instructions = [], this.uid = (0, u.uid)("graphicsPath"), this._dirty = !0, this.checkForHoles = e, "string" == typeof t ? (0, p.parseSVGPath)(t, this) : this.instructions = t ? .slice() ? ? []
        }
        get shapePath() {
            return this._shapePath || (this._shapePath = new M(this)), this._dirty && (this._dirty = !1, this._shapePath.buildPath()), this._shapePath
        }
        addPath(t, e) {
            return t = t.clone(), this.instructions.push({
                action: "addPath",
                data: [t, e]
            }), this._dirty = !0, this
        }
        arc(...t) {
            return this.instructions.push({
                action: "arc",
                data: t
            }), this._dirty = !0, this
        }
        arcTo(...t) {
            return this.instructions.push({
                action: "arcTo",
                data: t
            }), this._dirty = !0, this
        }
        arcToSvg(...t) {
            return this.instructions.push({
                action: "arcToSvg",
                data: t
            }), this._dirty = !0, this
        }
        bezierCurveTo(...t) {
            return this.instructions.push({
                action: "bezierCurveTo",
                data: t
            }), this._dirty = !0, this
        }
        bezierCurveToShort(t, e, i, s, r) {
            let a = this.instructions[this.instructions.length - 1],
                n = this.getLastPoint(o.Point.shared),
                l = 0,
                h = 0;
            if (a && "bezierCurveTo" === a.action) {
                l = a.data[2], h = a.data[3];
                let t = n.x,
                    e = n.y;
                l = t + (t - l), h = e + (e - h)
            } else l = n.x, h = n.y;
            return this.instructions.push({
                action: "bezierCurveTo",
                data: [l, h, t, e, i, s, r]
            }), this._dirty = !0, this
        }
        closePath() {
            return this.instructions.push({
                action: "closePath",
                data: []
            }), this._dirty = !0, this
        }
        ellipse(...t) {
            return this.instructions.push({
                action: "ellipse",
                data: t
            }), this._dirty = !0, this
        }
        lineTo(...t) {
            return this.instructions.push({
                action: "lineTo",
                data: t
            }), this._dirty = !0, this
        }
        moveTo(...t) {
            return this.instructions.push({
                action: "moveTo",
                data: t
            }), this
        }
        quadraticCurveTo(...t) {
            return this.instructions.push({
                action: "quadraticCurveTo",
                data: t
            }), this._dirty = !0, this
        }
        quadraticCurveToShort(t, e, i) {
            let s = this.instructions[this.instructions.length - 1],
                r = this.getLastPoint(o.Point.shared),
                a = 0,
                n = 0;
            if (s && "quadraticCurveTo" === s.action) {
                a = s.data[0], n = s.data[1];
                let t = r.x,
                    e = r.y;
                a = t + (t - a), n = e + (e - n)
            } else a = r.x, n = r.y;
            return this.instructions.push({
                action: "quadraticCurveTo",
                data: [a, n, t, e, i]
            }), this._dirty = !0, this
        }
        rect(t, e, i, s, r) {
            return this.instructions.push({
                action: "rect",
                data: [t, e, i, s, r]
            }), this._dirty = !0, this
        }
        circle(t, e, i, s) {
            return this.instructions.push({
                action: "circle",
                data: [t, e, i, s]
            }), this._dirty = !0, this
        }
        roundRect(...t) {
            return this.instructions.push({
                action: "roundRect",
                data: t
            }), this._dirty = !0, this
        }
        poly(...t) {
            return this.instructions.push({
                action: "poly",
                data: t
            }), this._dirty = !0, this
        }
        regularPoly(...t) {
            return this.instructions.push({
                action: "regularPoly",
                data: t
            }), this._dirty = !0, this
        }
        roundPoly(...t) {
            return this.instructions.push({
                action: "roundPoly",
                data: t
            }), this._dirty = !0, this
        }
        roundShape(...t) {
            return this.instructions.push({
                action: "roundShape",
                data: t
            }), this._dirty = !0, this
        }
        filletRect(...t) {
            return this.instructions.push({
                action: "filletRect",
                data: t
            }), this._dirty = !0, this
        }
        chamferRect(...t) {
            return this.instructions.push({
                action: "chamferRect",
                data: t
            }), this._dirty = !0, this
        }
        star(t, e, i, s, r, a, n) {
            r || (r = s / 2);
            let l = -1 * Math.PI / 2 + a,
                o = 2 * i,
                h = 2 * Math.PI / o,
                u = [];
            for (let i = 0; i < o; i++) {
                let a = i % 2 ? r : s,
                    n = i * h + l;
                u.push(t + a * Math.cos(n), e + a * Math.sin(n))
            }
            return this.poly(u, !0, n), this
        }
        clone(t = !1) {
            let e = new C;
            if (e.checkForHoles = this.checkForHoles, t)
                for (let t = 0; t < this.instructions.length; t++) {
                    let i = this.instructions[t];
                    e.instructions.push({
                        action: i.action,
                        data: i.data.slice()
                    })
                } else e.instructions = this.instructions.slice();
            return e
        }
        clear() {
            return this.instructions.length = 0, this._dirty = !0, this
        }
        transform(t) {
            if (t.isIdentity()) return this;
            let e = t.a,
                i = t.b,
                s = t.c,
                r = t.d,
                a = t.tx,
                n = t.ty,
                l = 0,
                o = 0,
                h = 0,
                u = 0,
                c = 0,
                p = 0,
                f = 0,
                x = 0;
            for (let y = 0; y < this.instructions.length; y++) {
                let g = this.instructions[y],
                    _ = g.data;
                switch (g.action) {
                    case "moveTo":
                    case "lineTo":
                        l = _[0], o = _[1], _[0] = e * l + s * o + a, _[1] = i * l + r * o + n;
                        break;
                    case "bezierCurveTo":
                        h = _[0], u = _[1], c = _[2], p = _[3], l = _[4], o = _[5], _[0] = e * h + s * u + a, _[1] = i * h + r * u + n, _[2] = e * c + s * p + a, _[3] = i * c + r * p + n, _[4] = e * l + s * o + a, _[5] = i * l + r * o + n;
                        break;
                    case "quadraticCurveTo":
                        h = _[0], u = _[1], l = _[2], o = _[3], _[0] = e * h + s * u + a, _[1] = i * h + r * u + n, _[2] = e * l + s * o + a, _[3] = i * l + r * o + n;
                        break;
                    case "arcToSvg":
                        l = _[5], o = _[6], f = _[0], x = _[1], _[0] = e * f + s * x, _[1] = i * f + r * x, _[5] = e * l + s * o + a, _[6] = i * l + r * o + n;
                        break;
                    case "circle":
                        _[4] = T(_[3], t);
                        break;
                    case "rect":
                        _[4] = T(_[4], t);
                        break;
                    case "ellipse":
                        _[8] = T(_[8], t);
                        break;
                    case "roundRect":
                        _[5] = T(_[5], t);
                        break;
                    case "addPath":
                        _[0].transform(t);
                        break;
                    case "poly":
                        _[2] = T(_[2], t);
                        break;
                    default:
                        (0, d.warn)("unknown transform action", g.action)
                }
            }
            return this._dirty = !0, this
        }
        get bounds() {
            return this.shapePath.bounds
        }
        getLastPoint(t) {
            let e = this.instructions.length - 1,
                i = this.instructions[e];
            if (!i) return t.x = 0, t.y = 0, t;
            for (;
                "closePath" === i.action;) {
                if (--e < 0) return t.x = 0, t.y = 0, t;
                i = this.instructions[e]
            }
            switch (i.action) {
                case "moveTo":
                case "lineTo":
                    t.x = i.data[0], t.y = i.data[1];
                    break;
                case "quadraticCurveTo":
                    t.x = i.data[2], t.y = i.data[3];
                    break;
                case "bezierCurveTo":
                    t.x = i.data[4], t.y = i.data[5];
                    break;
                case "arc":
                case "arcToSvg":
                    t.x = i.data[5], t.y = i.data[6];
                    break;
                case "addPath":
                    i.data[0].getLastPoint(t)
            }
            return t
        }
    }

    function T(t, e) {
        return t ? t.prepend(e) : e.clone()
    }

    function F(t, e, i) {
        let s = t.getAttribute(e);
        return s ? Number(s) : i
    }

    function B(t) {
        let e = t.match(/url\s*\(\s*['"]?\s*#([^'"\s)]+)\s*['"]?\s*\)/i);
        return e ? e[1] : ""
    }
    let E = {
        fill: {
            type: "paint",
            default: 0
        },
        "fill-opacity": {
            type: "number",
            default: 1
        },
        stroke: {
            type: "paint",
            default: 0
        },
        "stroke-width": {
            type: "number",
            default: 1
        },
        "stroke-opacity": {
            type: "number",
            default: 1
        },
        "stroke-linecap": {
            type: "string",
            default: "butt"
        },
        "stroke-linejoin": {
            type: "string",
            default: "miter"
        },
        "stroke-miterlimit": {
            type: "number",
            default: 10
        },
        "stroke-dasharray": {
            type: "string",
            default: "none"
        },
        "stroke-dashoffset": {
            type: "number",
            default: 0
        },
        opacity: {
            type: "number",
            default: 1
        }
    };

    function R(t, e) {
        let i = t.getAttribute("style"),
            s = {},
            r = {},
            a = {
                strokeStyle: s,
                fillStyle: r,
                useFill: !1,
                useStroke: !1
            };
        for (let i in E) {
            let s = t.getAttribute(i);
            s && I(e, a, i, s.trim())
        }
        if (i) {
            let t = i.split(";");
            for (let i = 0; i < t.length; i++) {
                let [s, r] = t[i].trim().split(":");
                E[s] && I(e, a, s, r.trim())
            }
        }
        return {
            strokeStyle: a.useStroke ? s : null,
            fillStyle: a.useFill ? r : null,
            useFill: a.useFill,
            useStroke: a.useStroke
        }
    }

    function I(t, e, s, r) {
        switch (s) {
            case "stroke":
                if ("none" !== r) {
                    if (r.startsWith("url(")) {
                        let i = B(r);
                        e.strokeStyle.fill = t.defs[i]
                    } else e.strokeStyle.color = i.Color.shared.setValue(r).toNumber();
                    e.useStroke = !0
                }
                break;
            case "stroke-width":
                e.strokeStyle.width = Number(r);
                break;
            case "fill":
                if ("none" !== r) {
                    if (r.startsWith("url(")) {
                        let i = B(r);
                        e.fillStyle.fill = t.defs[i]
                    } else e.fillStyle.color = i.Color.shared.setValue(r).toNumber();
                    e.useFill = !0
                }
                break;
            case "fill-opacity":
                e.fillStyle.alpha = Number(r);
                break;
            case "stroke-opacity":
                e.strokeStyle.alpha = Number(r);
                break;
            case "opacity":
                e.fillStyle.alpha = Number(r), e.strokeStyle.alpha = Number(r)
        }
    }

    function z(t) {
        return t instanceof a.FillPattern
    }

    function L(t) {
        return t instanceof r.FillGradient
    }

    function H(t, e, i) {
        return t.fill = e, t.color = 0xffffff, t.texture = e.texture, t.matrix = e.transform, { ...i,
            ...t
        }
    }

    function G(t, e, i) {
        return e.buildGradient(), t.fill = e, t.color = 0xffffff, t.texture = e.texture, t.matrix = e.transform, t.textureSpace = e.textureSpace, { ...i,
            ...t
        }
    }

    function W(t, e) {
        let s, r;
        if (null == t) return null;
        let a = {};
        if (i.Color.isColorLike(t)) {
            let s;
            return a.color = (s = i.Color.shared.setValue(t ? ? 0)).toNumber(), a.alpha = 1 === s.alpha ? e.alpha : s.alpha, a.texture = h.Texture.WHITE, { ...e,
                ...a
            }
        }
        if (t instanceof h.Texture) return a.texture = t, { ...e,
            ...a
        };
        if (z(t)) return H(a, t, e);
        if (L(t)) return G(a, t, e);
        else if (t.fill && z(t.fill)) return H(t, t.fill, e);
        else if (t.fill && L(t.fill)) return G(t, t.fill, e);
        return s = { ...e,
            ...t
        }, r = i.Color.shared.setValue(s.color), s.alpha *= r.alpha, s.color = r.toNumber(), s
    }

    function O(t, e) {
        let {
            width: i,
            alignment: s,
            miterLimit: r,
            cap: a,
            join: n,
            pixelLine: l,
            ...o
        } = e, h = W(t, o);
        return h ? {
            width: i,
            alignment: s,
            miterLimit: r,
            cap: a,
            join: n,
            pixelLine: l,
            ...h
        } : null
    }
    let U = new o.Point,
        V = new l.Matrix,
        $ = class t extends n.default {
            constructor() {
                super(...arguments), this.uid = (0, u.uid)("graphicsContext"), this.dirty = !0, this.batchMode = "auto", this.instructions = [], this._activePath = new C, this._transform = new l.Matrix, this._fillStyle = { ...t.defaultFillStyle
                }, this._strokeStyle = { ...t.defaultStrokeStyle
                }, this._stateStack = [], this._tick = 0, this._bounds = new c.Bounds, this._boundsDirty = !0
            }
            clone() {
                let e = new t;
                return e.batchMode = this.batchMode, e.instructions = this.instructions.slice(), e._activePath = this._activePath.clone(), e._transform = this._transform.clone(), e._fillStyle = { ...this._fillStyle
                }, e._strokeStyle = { ...this._strokeStyle
                }, e._stateStack = this._stateStack.slice(), e._bounds = this._bounds.clone(), e._boundsDirty = !0, e
            }
            get fillStyle() {
                return this._fillStyle
            }
            set fillStyle(e) {
                this._fillStyle = W(e, t.defaultFillStyle)
            }
            get strokeStyle() {
                return this._strokeStyle
            }
            set strokeStyle(e) {
                this._strokeStyle = O(e, t.defaultStrokeStyle)
            }
            setFillStyle(e) {
                return this._fillStyle = W(e, t.defaultFillStyle), this
            }
            setStrokeStyle(e) {
                return this._strokeStyle = W(e, t.defaultStrokeStyle), this
            }
            texture(t, e, s, r, a, n) {
                return this.instructions.push({
                    action: "texture",
                    data: {
                        image: t,
                        dx: s || 0,
                        dy: r || 0,
                        dw: a || t.frame.width,
                        dh: n || t.frame.height,
                        transform: this._transform.clone(),
                        alpha: this._fillStyle.alpha,
                        style: e ? i.Color.shared.setValue(e).toNumber() : 0xffffff
                    }
                }), this.onUpdate(), this
            }
            beginPath() {
                return this._activePath = new C, this
            }
            fill(e, i) {
                let r, a = this.instructions[this.instructions.length - 1];
                return (r = 0 === this._tick && a && "stroke" === a.action ? a.data.path : this._activePath.clone()) && (null != e && (void 0 !== i && "number" == typeof e && ((0, s.deprecation)(s.v8_0_0, "GraphicsContext.fill(color, alpha) is deprecated, use GraphicsContext.fill({ color, alpha }) instead"), e = {
                    color: e,
                    alpha: i
                }), this._fillStyle = W(e, t.defaultFillStyle)), this.instructions.push({
                    action: "fill",
                    data: {
                        style: this.fillStyle,
                        path: r
                    }
                }), this.onUpdate(), this._initNextPathLocation(), this._tick = 0), this
            }
            _initNextPathLocation() {
                let {
                    x: t,
                    y: e
                } = this._activePath.getLastPoint(o.Point.shared);
                this._activePath.clear(), this._activePath.moveTo(t, e)
            }
            stroke(e) {
                let i, s = this.instructions[this.instructions.length - 1];
                return (i = 0 === this._tick && s && "fill" === s.action ? s.data.path : this._activePath.clone()) && (null != e && (this._strokeStyle = O(e, t.defaultStrokeStyle)), this.instructions.push({
                    action: "stroke",
                    data: {
                        style: this.strokeStyle,
                        path: i
                    }
                }), this.onUpdate(), this._initNextPathLocation(), this._tick = 0), this
            }
            cut() {
                for (let t = 0; t < 2; t++) {
                    let e = this.instructions[this.instructions.length - 1 - t],
                        i = this._activePath.clone();
                    if (e && ("stroke" === e.action || "fill" === e.action))
                        if (e.data.hole) e.data.hole.addPath(i);
                        else {
                            e.data.hole = i;
                            break
                        }
                }
                return this._initNextPathLocation(), this
            }
            arc(t, e, i, s, r, a) {
                this._tick++;
                let n = this._transform;
                return this._activePath.arc(n.a * t + n.c * e + n.tx, n.b * t + n.d * e + n.ty, i, s, r, a), this
            }
            arcTo(t, e, i, s, r) {
                this._tick++;
                let a = this._transform;
                return this._activePath.arcTo(a.a * t + a.c * e + a.tx, a.b * t + a.d * e + a.ty, a.a * i + a.c * s + a.tx, a.b * i + a.d * s + a.ty, r), this
            }
            arcToSvg(t, e, i, s, r, a, n) {
                this._tick++;
                let l = this._transform;
                return this._activePath.arcToSvg(t, e, i, s, r, l.a * a + l.c * n + l.tx, l.b * a + l.d * n + l.ty), this
            }
            bezierCurveTo(t, e, i, s, r, a, n) {
                this._tick++;
                let l = this._transform;
                return this._activePath.bezierCurveTo(l.a * t + l.c * e + l.tx, l.b * t + l.d * e + l.ty, l.a * i + l.c * s + l.tx, l.b * i + l.d * s + l.ty, l.a * r + l.c * a + l.tx, l.b * r + l.d * a + l.ty, n), this
            }
            closePath() {
                return this._tick++, this._activePath ? .closePath(), this
            }
            ellipse(t, e, i, s) {
                return this._tick++, this._activePath.ellipse(t, e, i, s, this._transform.clone()), this
            }
            circle(t, e, i) {
                return this._tick++, this._activePath.circle(t, e, i, this._transform.clone()), this
            }
            path(t) {
                return this._tick++, this._activePath.addPath(t, this._transform.clone()), this
            }
            lineTo(t, e) {
                this._tick++;
                let i = this._transform;
                return this._activePath.lineTo(i.a * t + i.c * e + i.tx, i.b * t + i.d * e + i.ty), this
            }
            moveTo(t, e) {
                this._tick++;
                let i = this._transform,
                    s = this._activePath.instructions,
                    r = i.a * t + i.c * e + i.tx,
                    a = i.b * t + i.d * e + i.ty;
                return 1 === s.length && "moveTo" === s[0].action ? (s[0].data[0] = r, s[0].data[1] = a) : this._activePath.moveTo(r, a), this
            }
            quadraticCurveTo(t, e, i, s, r) {
                this._tick++;
                let a = this._transform;
                return this._activePath.quadraticCurveTo(a.a * t + a.c * e + a.tx, a.b * t + a.d * e + a.ty, a.a * i + a.c * s + a.tx, a.b * i + a.d * s + a.ty, r), this
            }
            rect(t, e, i, s) {
                return this._tick++, this._activePath.rect(t, e, i, s, this._transform.clone()), this
            }
            roundRect(t, e, i, s, r) {
                return this._tick++, this._activePath.roundRect(t, e, i, s, r, this._transform.clone()), this
            }
            poly(t, e) {
                return this._tick++, this._activePath.poly(t, e, this._transform.clone()), this
            }
            regularPoly(t, e, i, s, r = 0, a) {
                return this._tick++, this._activePath.regularPoly(t, e, i, s, r, a), this
            }
            roundPoly(t, e, i, s, r, a) {
                return this._tick++, this._activePath.roundPoly(t, e, i, s, r, a), this
            }
            roundShape(t, e, i, s) {
                return this._tick++, this._activePath.roundShape(t, e, i, s), this
            }
            filletRect(t, e, i, s, r) {
                return this._tick++, this._activePath.filletRect(t, e, i, s, r), this
            }
            chamferRect(t, e, i, s, r, a) {
                return this._tick++, this._activePath.chamferRect(t, e, i, s, r, a), this
            }
            star(t, e, i, s, r = 0, a = 0) {
                return this._tick++, this._activePath.star(t, e, i, s, r, a, this._transform.clone()), this
            }
            svg(t) {
                return this._tick++, ! function(t, e) {
                    if ("string" == typeof t) {
                        let e = document.createElement("div");
                        e.innerHTML = t.trim(), t = e.querySelector("svg")
                    }
                    let s = {
                        context: e,
                        defs: {},
                        path: new C
                    };
                    ! function(t, e) {
                        let s = t.querySelectorAll("defs");
                        for (let t = 0; t < s.length; t++) {
                            let n = s[t];
                            for (let t = 0; t < n.children.length; t++) {
                                let s = n.children[t];
                                switch (s.nodeName.toLowerCase()) {
                                    case "lineargradient":
                                        e.defs[s.id] = function(t) {
                                            let e = F(t, "x1", 0),
                                                s = F(t, "y1", 0),
                                                a = F(t, "x2", 1),
                                                n = F(t, "y2", 0),
                                                l = t.getAttribute("gradientUnits") || "objectBoundingBox",
                                                o = new r.FillGradient(e, s, a, n, "objectBoundingBox" === l ? "local" : "global");
                                            for (let e = 0; e < t.children.length; e++) {
                                                let s = t.children[e],
                                                    r = F(s, "offset", 0),
                                                    a = i.Color.shared.setValue(s.getAttribute("stop-color")).toNumber();
                                                o.addColorStop(r, a)
                                            }
                                            return o
                                        }(s);
                                        break;
                                    case "radialgradient":
                                        var a;
                                        e.defs[s.id] = (a = 0, (0, d.warn)("[SVG Parser] Radial gradients are not yet supported"), new r.FillGradient(0, 0, 1, 0))
                                }
                            }
                        }
                    }(t, s);
                    let a = t.children,
                        {
                            fillStyle: n,
                            strokeStyle: l
                        } = R(t, s);
                    for (let t = 0; t < a.length; t++) {
                        let e = a[t];
                        "defs" !== e.nodeName.toLowerCase() && function t(e, i, s, r) {
                            let a, n, l, o, h, u, c, p, f, x, y, g, _, m, S, b, v = e.children,
                                {
                                    fillStyle: w,
                                    strokeStyle: P
                                } = R(e, i);
                            w && s ? s = { ...s,
                                ...w
                            } : w && (s = w), P && r ? r = { ...r,
                                ...P
                            } : P && (r = P);
                            let A = !s && !r;
                            switch (A && (s = {
                                color: 0
                            }), e.nodeName.toLowerCase()) {
                                case "path":
                                    _ = e.getAttribute("d"), "evenodd" === e.getAttribute("fill-rule") && (0, d.warn)("SVG Evenodd fill rule not supported, your svg may render incorrectly"), m = new C(_, !0), i.context.path(m), s && i.context.fill(s), r && i.context.stroke(r);
                                    break;
                                case "circle":
                                    c = F(e, "cx", 0), p = F(e, "cy", 0), f = F(e, "r", 0), i.context.ellipse(c, p, f, f), s && i.context.fill(s), r && i.context.stroke(r);
                                    break;
                                case "rect":
                                    a = F(e, "x", 0), n = F(e, "y", 0), S = F(e, "width", 0), b = F(e, "height", 0), x = F(e, "rx", 0), y = F(e, "ry", 0), x || y ? i.context.roundRect(a, n, S, b, x || y) : i.context.rect(a, n, S, b), s && i.context.fill(s), r && i.context.stroke(r);
                                    break;
                                case "ellipse":
                                    c = F(e, "cx", 0), p = F(e, "cy", 0), x = F(e, "rx", 0), y = F(e, "ry", 0), i.context.beginPath(), i.context.ellipse(c, p, x, y), s && i.context.fill(s), r && i.context.stroke(r);
                                    break;
                                case "line":
                                    l = F(e, "x1", 0), o = F(e, "y1", 0), h = F(e, "x2", 0), u = F(e, "y2", 0), i.context.beginPath(), i.context.moveTo(l, o), i.context.lineTo(h, u), r && i.context.stroke(r);
                                    break;
                                case "polygon":
                                    g = e.getAttribute("points").match(/\d+/g).map(t => parseInt(t, 10)), i.context.poly(g, !0), s && i.context.fill(s), r && i.context.stroke(r);
                                    break;
                                case "polyline":
                                    g = e.getAttribute("points").match(/\d+/g).map(t => parseInt(t, 10)), i.context.poly(g, !1), r && i.context.stroke(r);
                                    break;
                                case "g":
                                case "svg":
                                    break;
                                default:
                                    (0, d.warn)(`[SVG parser] <${e.nodeName}> elements unsupported`)
                            }
                            A && (s = null);
                            for (let e = 0; e < v.length; e++) t(v[e], i, s, r)
                        }(e, s, n, l)
                    }
                }(t, this), this
            }
            restore() {
                let t = this._stateStack.pop();
                return t && (this._transform = t.transform, this._fillStyle = t.fillStyle, this._strokeStyle = t.strokeStyle), this
            }
            save() {
                return this._stateStack.push({
                    transform: this._transform.clone(),
                    fillStyle: { ...this._fillStyle
                    },
                    strokeStyle: { ...this._strokeStyle
                    }
                }), this
            }
            getTransform() {
                return this._transform
            }
            resetTransform() {
                return this._transform.identity(), this
            }
            rotate(t) {
                return this._transform.rotate(t), this
            }
            scale(t, e = t) {
                return this._transform.scale(t, e), this
            }
            setTransform(t, e, i, s, r, a) {
                return t instanceof l.Matrix ? this._transform.set(t.a, t.b, t.c, t.d, t.tx, t.ty) : this._transform.set(t, e, i, s, r, a), this
            }
            transform(t, e, i, s, r, a) {
                return t instanceof l.Matrix ? this._transform.append(t) : (V.set(t, e, i, s, r, a), this._transform.append(V)), this
            }
            translate(t, e = t) {
                return this._transform.translate(t, e), this
            }
            clear() {
                return this._activePath.clear(), this.instructions.length = 0, this.resetTransform(), this.onUpdate(), this
            }
            onUpdate() {
                this.dirty || (this.emit("update", this, 16), this.dirty = !0, this._boundsDirty = !0)
            }
            get bounds() {
                if (!this._boundsDirty) return this._bounds;
                let t = this._bounds;
                t.clear();
                for (let e = 0; e < this.instructions.length; e++) {
                    let i = this.instructions[e],
                        s = i.action;
                    if ("fill" === s) {
                        let e = i.data;
                        t.addBounds(e.path.bounds)
                    } else if ("texture" === s) {
                        let e = i.data;
                        t.addFrame(e.dx, e.dy, e.dx + e.dw, e.dy + e.dh, e.transform)
                    }
                    if ("stroke" === s) {
                        let e = i.data,
                            s = e.style.alignment,
                            r = e.style.width * (1 - s),
                            a = e.path.bounds;
                        t.addFrame(a.minX - r, a.minY - r, a.maxX + r, a.maxY + r)
                    }
                }
                return t
            }
            containsPoint(t) {
                if (!this.bounds.containsPoint(t.x, t.y)) return !1;
                let e = this.instructions,
                    i = !1;
                for (let s = 0; s < e.length; s++) {
                    let r = e[s],
                        a = r.data,
                        n = a.path;
                    if (!r.action || !n) continue;
                    let l = a.style,
                        o = n.shapePath.shapePrimitives;
                    for (let e = 0; e < o.length; e++) {
                        let s = o[e].shape;
                        if (!l || !s) continue;
                        let n = o[e].transform,
                            h = n ? n.applyInverse(t, U) : t;
                        i = "fill" === r.action ? s.contains(h.x, h.y) : s.strokeContains(h.x, h.y, l.width, l.alignment);
                        let u = a.hole;
                        if (u) {
                            let t = u.shapePath ? .shapePrimitives;
                            if (t)
                                for (let e = 0; e < t.length; e++) t[e].shape.contains(h.x, h.y) && (i = !1)
                        }
                        if (i) return !0
                    }
                }
                return i
            }
            destroy(t = !1) {
                if (this._stateStack.length = 0, this._transform = null, this.emit("destroy", this), this.removeAllListeners(), "boolean" == typeof t ? t : t ? .texture) {
                    let e = "boolean" == typeof t ? t : t ? .textureSource;
                    this._fillStyle.texture && this._fillStyle.texture.destroy(e), this._strokeStyle.texture && this._strokeStyle.texture.destroy(e)
                }
                this._fillStyle = null, this._strokeStyle = null, this.instructions = null, this._activePath = null, this._bounds = null, this._stateStack = null, this.customShader = null, this._transform = null
            }
        };
    $.defaultFillStyle = {
        color: 0xffffff,
        alpha: 1,
        texture: h.Texture.WHITE,
        matrix: null,
        fill: null,
        textureSpace: "local"
    }, $.defaultStrokeStyle = {
        width: 1,
        color: 0xffffff,
        alpha: 1,
        alignment: .5,
        miterLimit: 10,
        cap: "butt",
        join: "miter",
        texture: h.Texture.WHITE,
        matrix: null,
        fill: null,
        textureSpace: "local",
        pixelLine: !1
    }, t.s(["GraphicsContext", () => $], 638872);
    let D = ["align", "breakWords", "cssOverrides", "fontVariant", "fontWeight", "leading", "letterSpacing", "lineHeight", "padding", "textBaseline", "trim", "whiteSpace", "wordWrap", "wordWrapWidth", "fontFamily", "fontStyle", "fontSize"];

    function q(t, e, i) {
        return t && (e[i++] = t.color, e[i++] = t.alpha, e[i++] = t.fill ? .styleKey), i
    }
    let N = class t extends e.default {
        constructor(e = {}) {
            super(),
                function(t) {
                    if ("boolean" == typeof t.dropShadow && t.dropShadow) {
                        let e = N.defaultDropShadow;
                        t.dropShadow = {
                            alpha: t.dropShadowAlpha ? ? e.alpha,
                            angle: t.dropShadowAngle ? ? e.angle,
                            blur: t.dropShadowBlur ? ? e.blur,
                            color: t.dropShadowColor ? ? e.color,
                            distance: t.dropShadowDistance ? ? e.distance
                        }
                    }
                    if (void 0 !== t.strokeThickness) {
                        (0, s.deprecation)(s.v8_0_0, "strokeThickness is now a part of stroke");
                        let e = t.stroke,
                            n = {};
                        if (i.Color.isColorLike(e)) n.color = e;
                        else if (e instanceof r.FillGradient || e instanceof a.FillPattern) n.fill = e;
                        else if (Object.hasOwnProperty.call(e, "color") || Object.hasOwnProperty.call(e, "fill")) n = e;
                        else throw Error("Invalid stroke value.");
                        t.stroke = { ...n,
                            width: t.strokeThickness
                        }
                    }
                    if (Array.isArray(t.fillGradientStops)) {
                        let e;
                        (0, s.deprecation)(s.v8_0_0, "gradient fill is now a fill pattern: `new FillGradient(...)`"), null == t.fontSize ? t.fontSize = N.defaultTextStyle.fontSize : e = "string" == typeof t.fontSize ? parseInt(t.fontSize, 10) : t.fontSize;
                        let a = new r.FillGradient({
                                start: {
                                    x: 0,
                                    y: 0
                                },
                                end: {
                                    x: 0,
                                    y: 1.7 * (e || 0)
                                }
                            }),
                            n = t.fillGradientStops.map(t => i.Color.shared.setValue(t).toNumber());
                        n.forEach((t, e) => {
                            let i = e / (n.length - 1);
                            a.addColorStop(i, t)
                        }), t.fill = {
                            fill: a
                        }
                    }
                }(e);
            const n = { ...t.defaultTextStyle,
                ...e
            };
            for (const t in n) this[t] = n[t];
            this.update()
        }
        get align() {
            return this._align
        }
        set align(t) {
            this._align = t, this.update()
        }
        get breakWords() {
            return this._breakWords
        }
        set breakWords(t) {
            this._breakWords = t, this.update()
        }
        get dropShadow() {
            return this._dropShadow
        }
        set dropShadow(e) {
            null !== e && "object" == typeof e ? this._dropShadow = this._createProxy({ ...t.defaultDropShadow,
                ...e
            }) : this._dropShadow = e ? this._createProxy({ ...t.defaultDropShadow
            }) : null, this.update()
        }
        get fontFamily() {
            return this._fontFamily
        }
        set fontFamily(t) {
            this._fontFamily = t, this.update()
        }
        get fontSize() {
            return this._fontSize
        }
        set fontSize(t) {
            "string" == typeof t ? this._fontSize = parseInt(t, 10) : this._fontSize = t, this.update()
        }
        get fontStyle() {
            return this._fontStyle
        }
        set fontStyle(t) {
            this._fontStyle = t.toLowerCase(), this.update()
        }
        get fontVariant() {
            return this._fontVariant
        }
        set fontVariant(t) {
            this._fontVariant = t, this.update()
        }
        get fontWeight() {
            return this._fontWeight
        }
        set fontWeight(t) {
            this._fontWeight = t, this.update()
        }
        get leading() {
            return this._leading
        }
        set leading(t) {
            this._leading = t, this.update()
        }
        get letterSpacing() {
            return this._letterSpacing
        }
        set letterSpacing(t) {
            this._letterSpacing = t, this.update()
        }
        get lineHeight() {
            return this._lineHeight
        }
        set lineHeight(t) {
            this._lineHeight = t, this.update()
        }
        get padding() {
            return this._padding
        }
        set padding(t) {
            this._padding = t, this.update()
        }
        get filters() {
            return this._filters
        }
        set filters(t) {
            this._filters = t, this.update()
        }
        get trim() {
            return this._trim
        }
        set trim(t) {
            this._trim = t, this.update()
        }
        get textBaseline() {
            return this._textBaseline
        }
        set textBaseline(t) {
            this._textBaseline = t, this.update()
        }
        get whiteSpace() {
            return this._whiteSpace
        }
        set whiteSpace(t) {
            this._whiteSpace = t, this.update()
        }
        get wordWrap() {
            return this._wordWrap
        }
        set wordWrap(t) {
            this._wordWrap = t, this.update()
        }
        get wordWrapWidth() {
            return this._wordWrapWidth
        }
        set wordWrapWidth(t) {
            this._wordWrapWidth = t, this.update()
        }
        get fill() {
            return this._originalFill
        }
        set fill(t) {
            t !== this._originalFill && (this._originalFill = t, this._isFillStyle(t) && (this._originalFill = this._createProxy({ ...$.defaultFillStyle,
                ...t
            }, () => {
                this._fill = W({ ...this._originalFill
                }, $.defaultFillStyle)
            })), this._fill = W(0 === t ? "black" : t, $.defaultFillStyle), this.update())
        }
        get stroke() {
            return this._originalStroke
        }
        set stroke(t) {
            t !== this._originalStroke && (this._originalStroke = t, this._isFillStyle(t) && (this._originalStroke = this._createProxy({ ...$.defaultStrokeStyle,
                ...t
            }, () => {
                this._stroke = O({ ...this._originalStroke
                }, $.defaultStrokeStyle)
            })), this._stroke = O(t, $.defaultStrokeStyle), this.update())
        }
        _generateKey() {
            return this._styleKey = function(t) {
                var e, s, r, a, n, l;
                let o = [],
                    h = 0;
                for (let e = 0; e < D.length; e++) {
                    let i = `_${D[e]}`;
                    o[h++] = t[i]
                }
                return h = q(t._fill, o, h), e = t._stroke, s = o, r = h, e && (r = q(e, s, r), s[r++] = e.width, s[r++] = e.alignment, s[r++] = e.cap, s[r++] = e.join, s[r++] = e.miterLimit), h = r, a = t.dropShadow, n = o, l = h, a && (n[l++] = a.alpha, n[l++] = a.angle, n[l++] = a.blur, n[l++] = a.distance, n[l++] = i.Color.shared.setValue(a.color).toNumber()), h = l, h = function(t, e, i) {
                    if (!t) return i;
                    for (let s of t) e[i++] = s.uid;
                    return i
                }(t.filters, o, h), o.join("-")
            }(this), this._styleKey
        }
        update() {
            this._styleKey = null, this.emit("update", this)
        }
        reset() {
            let e = t.defaultTextStyle;
            for (let t in e) this[t] = e[t]
        }
        get styleKey() {
            return this._styleKey || this._generateKey()
        }
        clone() {
            return new t({
                align: this.align,
                breakWords: this.breakWords,
                dropShadow: this._dropShadow ? { ...this._dropShadow
                } : null,
                fill: this._fill,
                fontFamily: this.fontFamily,
                fontSize: this.fontSize,
                fontStyle: this.fontStyle,
                fontVariant: this.fontVariant,
                fontWeight: this.fontWeight,
                leading: this.leading,
                letterSpacing: this.letterSpacing,
                lineHeight: this.lineHeight,
                padding: this.padding,
                stroke: this._stroke,
                textBaseline: this.textBaseline,
                whiteSpace: this.whiteSpace,
                wordWrap: this.wordWrap,
                wordWrapWidth: this.wordWrapWidth,
                filters: this._filters ? [...this._filters] : void 0
            })
        }
        _getFinalPadding() {
            let t = 0;
            if (this._filters)
                for (let e = 0; e < this._filters.length; e++) t += this._filters[e].padding;
            return Math.max(this._padding, t)
        }
        destroy(t = !1) {
            if (this.removeAllListeners(), "boolean" == typeof t ? t : t ? .texture) {
                let e = "boolean" == typeof t ? t : t ? .textureSource;
                this._fill ? .texture && this._fill.texture.destroy(e), this._originalFill ? .texture && this._originalFill.texture.destroy(e), this._stroke ? .texture && this._stroke.texture.destroy(e), this._originalStroke ? .texture && this._originalStroke.texture.destroy(e)
            }
            this._fill = null, this._stroke = null, this.dropShadow = null, this._originalStroke = null, this._originalFill = null
        }
        _createProxy(t, e) {
            return new Proxy(t, {
                set: (t, i, s) => (t[i] = s, e ? .(i, s), this.update(), !0)
            })
        }
        _isFillStyle(t) {
            return (t ? ? null) !== null && !(i.Color.isColorLike(t) || t instanceof r.FillGradient || t instanceof a.FillPattern)
        }
    };
    N.defaultDropShadow = {
        alpha: 1,
        angle: Math.PI / 6,
        blur: 0,
        color: "black",
        distance: 5
    }, N.defaultTextStyle = {
        align: "left",
        breakWords: !1,
        dropShadow: null,
        fill: "black",
        fontFamily: "Arial",
        fontSize: 26,
        fontStyle: "normal",
        fontVariant: "normal",
        fontWeight: "normal",
        leading: 0,
        letterSpacing: 0,
        lineHeight: 0,
        padding: 0,
        stroke: null,
        textBaseline: "alphabetic",
        trim: !1,
        whiteSpace: "pre",
        wordWrap: !1,
        wordWrapWidth: 100
    }, t.s(["TextStyle", () => N], 629272)
}, 31232, t => {
    "use strict";
    var e = t.i(307301),
        i = t.i(814566),
        s = t.i(297294),
        r = t.i(909077),
        a = t.i(676862),
        n = t.i(206008);

    function l(t, o, h, u = 0) {
        if (t.texture === s.Texture.WHITE && !t.fill) return e.Color.shared.setValue(t.color).setAlpha(t.alpha ? ? 1).toHexa();
        if (t.fill) {
            if (t.fill instanceof n.FillPattern) {
                let e = t.fill,
                    s = o.createPattern(e.texture.source.resource, "repeat"),
                    r = e.transform.copyTo(i.Matrix.shared);
                return r.scale(e.texture.frame.width, e.texture.frame.height), s.setTransform(r), s
            } else if (t.fill instanceof a.FillGradient) {
                let i, s = t.fill,
                    r = "linear" === s.type,
                    a = "local" === s.textureSpace,
                    n = 1,
                    l = 1;
                a && h && (n = h.width + u, l = h.height + u);
                let c = !1;
                if (r) {
                    let {
                        start: t,
                        end: e
                    } = s;
                    i = o.createLinearGradient(t.x * n, t.y * l, e.x * n, e.y * l), c = Math.abs(e.x - t.x) < Math.abs((e.y - t.y) * .1)
                } else {
                    let {
                        center: t,
                        innerRadius: e,
                        outerCenter: r,
                        outerRadius: a
                    } = s;
                    i = o.createRadialGradient(t.x * n, t.y * l, e * n, r.x * n, r.y * l, a * n)
                }
                if (c && a && h) {
                    let t = h.lineHeight / l;
                    for (let r = 0; r < h.lines.length; r++) {
                        let a = (r * h.lineHeight + u / 2) / l;
                        s.colorStops.forEach(s => {
                            let r = a + s.offset * t;
                            i.addColorStop(Math.floor(1e5 * r) / 1e5, e.Color.shared.setValue(s.color).toHex())
                        })
                    }
                } else s.colorStops.forEach(t => {
                    i.addColorStop(t.offset, e.Color.shared.setValue(t.color).toHex())
                });
                return i
            }
        } else {
            let e = o.createPattern(t.texture.source.resource, "repeat"),
                s = t.matrix.copyTo(i.Matrix.shared);
            return s.scale(t.texture.frame.width, t.texture.frame.height), e.setTransform(s), e
        }
        return (0, r.warn)("FillStyle not recognised", t), "red"
    }
    t.s(["getCanvasFillStyle", () => l])
}, 534070, 334219, t => {
    "use strict";
    var e = t.i(224021),
        i = t.i(373839),
        s = t.i(909077),
        r = t.i(161015),
        a = t.i(629272),
        n = t.i(307301),
        l = t.i(368256),
        o = t.i(945549),
        h = t.i(749382),
        u = t.i(297294),
        c = t.i(373068),
        d = t.i(908695),
        p = t.i(31232),
        f = t.i(639711);
    let x = class t extends f.AbstractBitmapFont {
        constructor(e) {
            super(), this.resolution = 1, this.pages = [], this._padding = 0, this._measureCache = Object.create(null), this._currentChars = [], this._currentX = 0, this._currentY = 0, this._currentMaxCharHeight = 0, this._currentPageIndex = -1, this._skipKerning = !1;
            const i = { ...t.defaultOptions,
                ...e
            };
            this._textureSize = i.textureSize, this._mipmap = i.mipmap;
            const s = i.style.clone();
            i.overrideFill && (s._fill.color = 0xffffff, s._fill.alpha = 1, s._fill.texture = u.Texture.WHITE, s._fill.fill = null), this.applyFillAsTint = i.overrideFill;
            const a = s.fontSize;
            s.fontSize = this.baseMeasurementFontSize;
            const n = (0, d.fontStringFromTextStyle)(s);
            i.overrideSize ? s._stroke && (s._stroke.width *= this.baseRenderedFontSize / a) : s.fontSize = this.baseRenderedFontSize = a, this._style = s, this._skipKerning = i.skipKerning ? ? !1, this.resolution = i.resolution ? ? 1, this._padding = i.padding ? ? 4, i.textureStyle && (this._textureStyle = i.textureStyle instanceof c.TextureStyle ? i.textureStyle : new c.TextureStyle(i.textureStyle)), this.fontMetrics = r.CanvasTextMetrics.measureFont(n), this.lineHeight = s.lineHeight || this.fontMetrics.fontSize || s.fontSize
        }
        ensureCharacters(t) {
            let e, i = r.CanvasTextMetrics.graphemeSegmenter(t).filter(t => !this._currentChars.includes(t)).filter((t, e, i) => i.indexOf(t) === e);
            if (!i.length) return;
            this._currentChars = [...this._currentChars, ...i];
            let {
                canvas: s,
                context: a
            } = (e = -1 === this._currentPageIndex ? this._nextPage() : this.pages[this._currentPageIndex]).canvasAndContext, n = e.texture.source, o = this._style, h = this._currentX, c = this._currentY, d = this._currentMaxCharHeight, p = this.baseRenderedFontSize / this.baseMeasurementFontSize, f = this._padding * p, x = !1, y = s.width / this.resolution, g = s.height / this.resolution;
            for (let t = 0; t < i.length; t++) {
                let e = i[t],
                    _ = r.CanvasTextMetrics.measureText(e, o, s, !1);
                _.lineHeight = _.height;
                let m = _.width * p,
                    S = Math.ceil(("italic" === o.fontStyle ? 2 : 1) * m),
                    b = _.height * p,
                    v = S + 2 * f,
                    w = b + 2 * f;
                if (x = !1, "\n" !== e && "\r" !== e && "	" !== e && " " !== e && (x = !0, d = Math.ceil(Math.max(w, d))), h + v > y && (h = 0, (c += d) + (d = w) > g)) {
                    n.update();
                    let t = this._nextPage();
                    s = t.canvasAndContext.canvas, a = t.canvasAndContext.context, n = t.texture.source, h = 0, c = 0, d = 0
                }
                let P = m / p - (o.dropShadow ? .distance ? ? 0) - (o._stroke ? .width ? ? 0);
                if (this.chars[e] = {
                        id: e.codePointAt(0),
                        xOffset: -this._padding,
                        yOffset: -this._padding,
                        xAdvance: P,
                        kerning: {}
                    }, x) {
                    this._drawGlyph(a, _, h + f, c + f, p, o);
                    let t = n.width * p,
                        i = n.height * p,
                        s = new l.Rectangle(h / t * n.width, c / i * n.height, v / t * n.width, w / i * n.height);
                    this.chars[e].texture = new u.Texture({
                        source: n,
                        frame: s
                    }), h += Math.ceil(v)
                }
            }
            n.update(), this._currentX = h, this._currentY = c, this._currentMaxCharHeight = d, this._skipKerning && this._applyKerning(i, a)
        }
        get pageTextures() {
            return (0, i.deprecation)(i.v8_0_0, "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."), this.pages
        }
        _applyKerning(t, e) {
            let i = this._measureCache;
            for (let s = 0; s < t.length; s++) {
                let r = t[s];
                for (let t = 0; t < this._currentChars.length; t++) {
                    let s = this._currentChars[t],
                        a = i[r];
                    a || (a = i[r] = e.measureText(r).width);
                    let n = i[s];
                    n || (n = i[s] = e.measureText(s).width);
                    let l = e.measureText(r + s).width,
                        o = l - (a + n);
                    o && (this.chars[r].kerning[s] = o), (o = (l = e.measureText(r + s).width) - (a + n)) && (this.chars[s].kerning[r] = o)
                }
            }
        }
        _nextPage() {
            this._currentPageIndex++;
            let t = this.resolution,
                e = o.CanvasPool.getOptimalCanvasAndContext(this._textureSize, this._textureSize, t);
            this._setupContext(e.context, this._style, t);
            let i = t * (this.baseRenderedFontSize / this.baseMeasurementFontSize),
                s = new u.Texture({
                    source: new h.ImageSource({
                        resource: e.canvas,
                        resolution: i,
                        alphaMode: "premultiply-alpha-on-upload",
                        autoGenerateMipmaps: this._mipmap
                    })
                });
            this._textureStyle && (s.source.style = this._textureStyle);
            let r = {
                canvasAndContext: e,
                texture: s
            };
            return this.pages[this._currentPageIndex] = r, r
        }
        _setupContext(t, e, i) {
            e.fontSize = this.baseRenderedFontSize, t.scale(i, i), t.font = (0, d.fontStringFromTextStyle)(e), e.fontSize = this.baseMeasurementFontSize, t.textBaseline = e.textBaseline;
            let s = e._stroke,
                r = s ? .width ? ? 0;
            if (s && (t.lineWidth = r, t.lineJoin = s.join, t.miterLimit = s.miterLimit, t.strokeStyle = (0, p.getCanvasFillStyle)(s, t)), e._fill && (t.fillStyle = (0, p.getCanvasFillStyle)(e._fill, t)), e.dropShadow) {
                let s = e.dropShadow,
                    r = n.Color.shared.setValue(s.color).toArray(),
                    a = s.blur * i,
                    l = s.distance * i;
                t.shadowColor = `rgba(${255*r[0]},${255*r[1]},${255*r[2]},${s.alpha})`, t.shadowBlur = a, t.shadowOffsetX = Math.cos(s.angle) * l, t.shadowOffsetY = Math.sin(s.angle) * l
            } else t.shadowColor = "black", t.shadowBlur = 0, t.shadowOffsetX = 0, t.shadowOffsetY = 0
        }
        _drawGlyph(t, e, i, s, r, a) {
            let n = e.text,
                l = e.fontProperties,
                o = a._stroke,
                h = (o ? .width ? ? 0) * r,
                u = i + h / 2,
                c = s - h / 2,
                d = l.descent * r,
                p = e.lineHeight * r,
                f = !1;
            a.stroke && h && (f = !0, t.strokeText(n, u, c + p - d));
            let {
                shadowBlur: x,
                shadowOffsetX: y,
                shadowOffsetY: g
            } = t;
            a._fill && (f && (t.shadowBlur = 0, t.shadowOffsetX = 0, t.shadowOffsetY = 0), t.fillText(n, u, c + p - d)), f && (t.shadowBlur = x, t.shadowOffsetX = y, t.shadowOffsetY = g)
        }
        destroy() {
            super.destroy();
            for (let t = 0; t < this.pages.length; t++) {
                let {
                    canvasAndContext: e,
                    texture: i
                } = this.pages[t];
                o.CanvasPool.returnCanvasAndContext(e), i.destroy(!0)
            }
            this.pages = null
        }
    };

    function y(t, e, i, s) {
        let r = {
            width: 0,
            height: 0,
            offsetY: 0,
            scale: e.fontSize / i.baseMeasurementFontSize,
            lines: [{
                width: 0,
                charPositions: [],
                spaceWidth: 0,
                spacesIndex: [],
                chars: []
            }]
        };
        r.offsetY = i.baseLineOffset;
        let a = r.lines[0],
            n = null,
            l = !0,
            o = {
                spaceWord: !1,
                width: 0,
                start: 0,
                index: 0,
                positions: [],
                chars: []
            },
            h = t => {
                let e = a.width;
                for (let i = 0; i < o.index; i++) {
                    let s = t.positions[i];
                    a.chars.push(t.chars[i]), a.charPositions.push(s + e)
                }
                a.width += t.width, l = !1, o.width = 0, o.index = 0, o.chars.length = 0
            },
            u = () => {
                let t = a.chars.length - 1;
                if (s) {
                    let e = a.chars[t];
                    for (;
                        " " === e;) a.width -= i.chars[e].xAdvance, e = a.chars[--t]
                }
                r.width = Math.max(r.width, a.width), a = {
                    width: 0,
                    charPositions: [],
                    chars: [],
                    spaceWidth: 0,
                    spacesIndex: []
                }, l = !0, r.lines.push(a), r.height += i.lineHeight
            },
            c = i.baseMeasurementFontSize / e.fontSize,
            d = e.letterSpacing * c,
            p = e.wordWrapWidth * c,
            f = e.wordWrap && e.breakWords,
            x = t => t - d > p;
        for (let s = 0; s < t.length + 1; s++) {
            let r, c = s === t.length;
            c || (r = t[s]);
            let p = i.chars[r] || i.chars[" "];
            if (/(?:\s)/.test(r) || "\r" === r || "\n" === r || c) {
                if (!l && e.wordWrap && x(a.width + o.width) ? u() : o.start = a.width, h(o), c || a.charPositions.push(0), "\r" === r || "\n" === r) 0 !== a.width && u();
                else if (!c) {
                    let t = p.xAdvance + (p.kerning[n] || 0) + d;
                    a.width += t, a.spaceWidth = t, a.spacesIndex.push(a.charPositions.length), a.chars.push(r)
                }
            } else {
                let t = p.kerning[n] || 0,
                    e = p.xAdvance + t + d;
                f && x(a.width + o.width + e) && (h(o), u()), o.positions[o.index++] = o.width + t, o.chars.push(r), o.width += e
            }
            n = r
        }
        return u(), "center" === e.align ? function(t) {
            for (let e = 0; e < t.lines.length; e++) {
                let i = t.lines[e],
                    s = t.width / 2 - i.width / 2;
                for (let t = 0; t < i.charPositions.length; t++) i.charPositions[t] += s
            }
        }(r) : "right" === e.align ? function(t) {
            for (let e = 0; e < t.lines.length; e++) {
                let i = t.lines[e],
                    s = t.width - i.width;
                for (let t = 0; t < i.charPositions.length; t++) i.charPositions[t] += s
            }
        }(r) : "justify" === e.align && function(t) {
            let e = t.width;
            for (let i = 0; i < t.lines.length; i++) {
                let s = t.lines[i],
                    r = 0,
                    a = s.spacesIndex[r++],
                    n = 0,
                    l = s.spacesIndex.length,
                    o = (e - s.width) / l;
                for (let t = 0; t < s.charPositions.length; t++) t === a && (a = s.spacesIndex[r++], n += o), s.charPositions[t] += n
            }
        }(r), r
    }
    x.defaultOptions = {
        textureSize: 512,
        style: new a.TextStyle,
        mipmap: !0
    }, t.s(["getBitmapTextLayout", () => y], 334219);
    let g = 0,
        _ = new class {
            constructor() {
                this.ALPHA = [
                    ["a", "z"],
                    ["A", "Z"], " "
                ], this.NUMERIC = [
                    ["0", "9"]
                ], this.ALPHANUMERIC = [
                    ["a", "z"],
                    ["A", "Z"],
                    ["0", "9"], " "
                ], this.ASCII = [
                    [" ", "~"]
                ], this.defaultOptions = {
                    chars: this.ALPHANUMERIC,
                    resolution: 1,
                    padding: 4,
                    skipKerning: !1,
                    textureStyle: null
                }
            }
            getFont(t, i) {
                let r = `${i.fontFamily}-bitmap`,
                    a = !0;
                if (i._fill.fill && !i._stroke) r += i._fill.fill.styleKey, a = !1;
                else if (i._stroke || i.dropShadow) {
                    let t = i.styleKey;
                    t = t.substring(0, t.lastIndexOf("-")), r = `${t}-bitmap`, a = !1
                }
                if (!e.Cache.has(r)) {
                    let t = new x({
                        style: i,
                        overrideFill: a,
                        overrideSize: !0,
                        ...this.defaultOptions
                    });
                    ++g > 50 && (0, s.warn)("BitmapText", `You have dynamically created ${g} bitmap fonts, this can be inefficient. Try pre installing your font styles using \`BitmapFont.install({name:"style1", style})\``), t.once("destroy", () => {
                        g--, e.Cache.remove(r)
                    }), e.Cache.set(r, t)
                }
                let n = e.Cache.get(r);
                return n.ensureCharacters ? .(t), n
            }
            getLayout(t, e, i = !0) {
                let s = this.getFont(t, e);
                return y(r.CanvasTextMetrics.graphemeSegmenter(t), e, s, i)
            }
            measureText(t, e, i = !0) {
                return this.getLayout(t, e, i)
            }
            install(...t) {
                let s = t[0];
                "string" == typeof s && (s = {
                    name: s,
                    style: t[1],
                    chars: t[2] ? .chars,
                    resolution: t[2] ? .resolution,
                    padding: t[2] ? .padding,
                    skipKerning: t[2] ? .skipKerning
                }, (0, i.deprecation)(i.v8_0_0, "BitmapFontManager.install(name, style, options) is deprecated, use BitmapFontManager.install({name, style, ...options})"));
                let r = s ? .name;
                if (!r) throw Error("[BitmapFontManager] Property `name` is required.");
                let n = (s = { ...this.defaultOptions,
                        ...s
                    }).style,
                    l = n instanceof a.TextStyle ? n : new a.TextStyle(n),
                    o = null !== l._fill.fill && void 0 !== l._fill.fill,
                    h = new x({
                        style: l,
                        overrideFill: o,
                        skipKerning: s.skipKerning,
                        padding: s.padding,
                        resolution: s.resolution,
                        overrideSize: !1,
                        textureStyle: s.textureStyle
                    }),
                    u = function(t) {
                        if ("" === t) return [];
                        "string" == typeof t && (t = [t]);
                        let e = [];
                        for (let i = 0, s = t.length; i < s; i++) {
                            let s = t[i];
                            if (Array.isArray(s)) {
                                if (2 !== s.length) throw Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${s.length}.`);
                                if (0 === s[0].length || 0 === s[1].length) throw Error("[BitmapFont]: Invalid character delimiter.");
                                let t = s[0].charCodeAt(0),
                                    i = s[1].charCodeAt(0);
                                if (i < t) throw Error("[BitmapFont]: Invalid character range.");
                                for (let s = t; s <= i; s++) e.push(String.fromCharCode(s))
                            } else e.push(...Array.from(s))
                        }
                        if (0 === e.length) throw Error("[BitmapFont]: Empty set when resolving characters.");
                        return e
                    }(s.chars);
                return h.ensureCharacters(u.join("")), e.Cache.set(`${r}-bitmap`, h), h.once("destroy", () => e.Cache.remove(`${r}-bitmap`)), h
            }
            uninstall(t) {
                let i = `${t}-bitmap`,
                    s = e.Cache.get(i);
                s && s.destroy()
            }
        };
    t.s(["BitmapFontManager", () => _], 534070)
}, 294232, t => {
    "use strict";
    var e = t.i(373839),
        i = t.i(680667),
        s = t.i(638872);
    class r extends i.ViewContainer {
        constructor(t) {
            t instanceof s.GraphicsContext && (t = {
                context: t
            });
            const {
                context: e,
                roundPixels: i,
                ...r
            } = t || {};
            super({
                label: "Graphics",
                ...r
            }), this.renderPipeId = "graphics", e ? this._context = e : this._context = this._ownedContext = new s.GraphicsContext, this._context.on("update", this.onViewUpdate, this), this.didViewUpdate = !0, this.allowChildren = !1, this.roundPixels = i ? ? !1
        }
        set context(t) {
            t !== this._context && (this._context.off("update", this.onViewUpdate, this), this._context = t, this._context.on("update", this.onViewUpdate, this), this.onViewUpdate())
        }
        get context() {
            return this._context
        }
        get bounds() {
            return this._context.bounds
        }
        updateBounds() {}
        containsPoint(t) {
            return this._context.containsPoint(t)
        }
        destroy(t) {
            this._ownedContext && !t ? this._ownedContext.destroy(t) : (!0 === t || t ? .context === !0) && this._context.destroy(t), this._ownedContext = null, this._context = null, super.destroy(t)
        }
        _callContextMethod(t, e) {
            return this.context[t](...e), this
        }
        setFillStyle(...t) {
            return this._callContextMethod("setFillStyle", t)
        }
        setStrokeStyle(...t) {
            return this._callContextMethod("setStrokeStyle", t)
        }
        fill(...t) {
            return this._callContextMethod("fill", t)
        }
        stroke(...t) {
            return this._callContextMethod("stroke", t)
        }
        texture(...t) {
            return this._callContextMethod("texture", t)
        }
        beginPath() {
            return this._callContextMethod("beginPath", [])
        }
        cut() {
            return this._callContextMethod("cut", [])
        }
        arc(...t) {
            return this._callContextMethod("arc", t)
        }
        arcTo(...t) {
            return this._callContextMethod("arcTo", t)
        }
        arcToSvg(...t) {
            return this._callContextMethod("arcToSvg", t)
        }
        bezierCurveTo(...t) {
            return this._callContextMethod("bezierCurveTo", t)
        }
        closePath() {
            return this._callContextMethod("closePath", [])
        }
        ellipse(...t) {
            return this._callContextMethod("ellipse", t)
        }
        circle(...t) {
            return this._callContextMethod("circle", t)
        }
        path(...t) {
            return this._callContextMethod("path", t)
        }
        lineTo(...t) {
            return this._callContextMethod("lineTo", t)
        }
        moveTo(...t) {
            return this._callContextMethod("moveTo", t)
        }
        quadraticCurveTo(...t) {
            return this._callContextMethod("quadraticCurveTo", t)
        }
        rect(...t) {
            return this._callContextMethod("rect", t)
        }
        roundRect(...t) {
            return this._callContextMethod("roundRect", t)
        }
        poly(...t) {
            return this._callContextMethod("poly", t)
        }
        regularPoly(...t) {
            return this._callContextMethod("regularPoly", t)
        }
        roundPoly(...t) {
            return this._callContextMethod("roundPoly", t)
        }
        roundShape(...t) {
            return this._callContextMethod("roundShape", t)
        }
        filletRect(...t) {
            return this._callContextMethod("filletRect", t)
        }
        chamferRect(...t) {
            return this._callContextMethod("chamferRect", t)
        }
        star(...t) {
            return this._callContextMethod("star", t)
        }
        svg(...t) {
            return this._callContextMethod("svg", t)
        }
        restore(...t) {
            return this._callContextMethod("restore", t)
        }
        save() {
            return this._callContextMethod("save", [])
        }
        getTransform() {
            return this.context.getTransform()
        }
        resetTransform() {
            return this._callContextMethod("resetTransform", [])
        }
        rotateTransform(...t) {
            return this._callContextMethod("rotate", t)
        }
        scaleTransform(...t) {
            return this._callContextMethod("scale", t)
        }
        setTransform(...t) {
            return this._callContextMethod("setTransform", t)
        }
        transform(...t) {
            return this._callContextMethod("transform", t)
        }
        translateTransform(...t) {
            return this._callContextMethod("translate", t)
        }
        clear() {
            return this._callContextMethod("clear", [])
        }
        get fillStyle() {
            return this._context.fillStyle
        }
        set fillStyle(t) {
            this._context.fillStyle = t
        }
        get strokeStyle() {
            return this._context.strokeStyle
        }
        set strokeStyle(t) {
            this._context.strokeStyle = t
        }
        clone(t = !1) {
            return t ? new r(this._context.clone()) : (this._ownedContext = null, new r(this._context))
        }
        lineStyle(t, i, s) {
            (0, e.deprecation)(e.v8_0_0, "Graphics#lineStyle is no longer needed. Use Graphics#setStrokeStyle to set the stroke style.");
            let r = {};
            return t && (r.width = t), i && (r.color = i), s && (r.alpha = s), this.context.strokeStyle = r, this
        }
        beginFill(t, i) {
            (0, e.deprecation)(e.v8_0_0, "Graphics#beginFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.");
            let s = {};
            return void 0 !== t && (s.color = t), void 0 !== i && (s.alpha = i), this.context.fillStyle = s, this
        }
        endFill() {
            (0, e.deprecation)(e.v8_0_0, "Graphics#endFill is no longer needed. Use Graphics#fill to fill the shape with the desired style."), this.context.fill();
            let t = this.context.strokeStyle;
            return (t.width !== s.GraphicsContext.defaultStrokeStyle.width || t.color !== s.GraphicsContext.defaultStrokeStyle.color || t.alpha !== s.GraphicsContext.defaultStrokeStyle.alpha) && this.context.stroke(), this
        }
        drawCircle(...t) {
            return (0, e.deprecation)(e.v8_0_0, "Graphics#drawCircle has been renamed to Graphics#circle"), this._callContextMethod("circle", t)
        }
        drawEllipse(...t) {
            return (0, e.deprecation)(e.v8_0_0, "Graphics#drawEllipse has been renamed to Graphics#ellipse"), this._callContextMethod("ellipse", t)
        }
        drawPolygon(...t) {
            return (0, e.deprecation)(e.v8_0_0, "Graphics#drawPolygon has been renamed to Graphics#poly"), this._callContextMethod("poly", t)
        }
        drawRect(...t) {
            return (0, e.deprecation)(e.v8_0_0, "Graphics#drawRect has been renamed to Graphics#rect"), this._callContextMethod("rect", t)
        }
        drawRoundedRect(...t) {
            return (0, e.deprecation)(e.v8_0_0, "Graphics#drawRoundedRect has been renamed to Graphics#roundRect"), this._callContextMethod("roundRect", t)
        }
        drawStar(...t) {
            return (0, e.deprecation)(e.v8_0_0, "Graphics#drawStar has been renamed to Graphics#star"), this._callContextMethod("star", t)
        }
    }
    t.s(["Graphics", () => r])
}]);

//# debugId=5701cb07-ab51-d626-365f-0637b2899114
//# sourceMappingURL=3ade0c0ab3ee30e3.js.map