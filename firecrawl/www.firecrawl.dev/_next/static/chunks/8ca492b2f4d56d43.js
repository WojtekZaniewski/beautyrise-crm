;
! function() {
    try {
        var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {},
            n = (new e.Error).stack;
        n && ((e._debugIds || (e._debugIds = {}))[n] = "b262f754-27bf-998e-b8d9-627e6509c729")
    } catch (e) {}
}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 402519, 652030, 130751, 937660, 993857, 905752, 425999, 422230, 545037, 422706, e => {
    "use strict";
    let t, r, i, a, n;
    var s = e.i(883771);
    class o {
        static init(e) {
            Object.defineProperty(this, "resizeTo", {
                set(e) {
                    globalThis.removeEventListener("resize", this.queueResize), this._resizeTo = e, e && (globalThis.addEventListener("resize", this.queueResize), this.resize())
                },
                get() {
                    return this._resizeTo
                }
            }), this.queueResize = () => {
                this._resizeTo && (this._cancelResize(), this._resizeId = requestAnimationFrame(() => this.resize()))
            }, this._cancelResize = () => {
                this._resizeId && (cancelAnimationFrame(this._resizeId), this._resizeId = null)
            }, this.resize = () => {
                let e, t;
                if (this._resizeTo) {
                    if (this._cancelResize(), this._resizeTo === globalThis.window) e = globalThis.innerWidth, t = globalThis.innerHeight;
                    else {
                        let {
                            clientWidth: r,
                            clientHeight: i
                        } = this._resizeTo;
                        e = r, t = i
                    }
                    this.renderer.resize(e, t), this.render()
                }
            }, this._resizeId = null, this._resizeTo = null, this.resizeTo = e.resizeTo || null
        }
        static destroy() {
            globalThis.removeEventListener("resize", this.queueResize), this._cancelResize(), this._cancelResize = null, this.queueResize = null, this.resizeTo = null, this.resize = null
        }
    }
    o.extension = s.ExtensionType.Application;
    var l = e.i(885232),
        u = e.i(433864);
    class d {
        static init(e) {
            e = Object.assign({
                autoStart: !0,
                sharedTicker: !1
            }, e), Object.defineProperty(this, "ticker", {
                set(e) {
                    this._ticker && this._ticker.remove(this.render, this), this._ticker = e, e && e.add(this.render, this, l.UPDATE_PRIORITY.LOW)
                },
                get() {
                    return this._ticker
                }
            }), this.stop = () => {
                this._ticker.stop()
            }, this.start = () => {
                this._ticker.start()
            }, this._ticker = null, this.ticker = e.sharedTicker ? u.Ticker.shared : new u.Ticker, e.autoStart && this.start()
        }
        static destroy() {
            if (this._ticker) {
                let e = this._ticker;
                this.ticker = null, e.destroy()
            }
        }
    }
    d.extension = s.ExtensionType.Application, s.extensions.add(o), s.extensions.add(d), e.s([], 402519);
    var h = e.i(200883),
        c = e.i(536164),
        p = e.i(181222),
        f = e.i(854908),
        g = e.i(418231);
    class m {
        constructor() {
            this.batches = [], this.batched = !1
        }
        destroy() {
            this.batches.forEach(e => {
                p.BigPool.return(e)
            }), this.batches.length = 0
        }
    }
    class x {
        constructor(e, t) {
            this.state = c.State.for2d(), this.renderer = e, this._adaptor = t, this.renderer.runners.contextChange.add(this)
        }
        contextChange() {
            this._adaptor.contextChange(this.renderer)
        }
        validateRenderable(e) {
            let t = e.context,
                r = !!e._gpuData,
                i = this.renderer.graphicsContext.updateGpuContext(t);
            return !!i.isBatchable || r !== i.isBatchable
        }
        addRenderable(e, t) {
            let r = this.renderer.graphicsContext.updateGpuContext(e.context);
            e.didViewUpdate && this._rebuild(e), r.isBatchable ? this._addToBatcher(e, t) : (this.renderer.renderPipes.batch.break(t), t.add(e))
        }
        updateRenderable(e) {
            let t = this._getGpuDataForRenderable(e).batches;
            for (let e = 0; e < t.length; e++) {
                let r = t[e];
                r._batcher.updateElement(r)
            }
        }
        execute(e) {
            if (!e.isRenderable) return;
            let t = this.renderer,
                r = e.context;
            if (!t.graphicsContext.getGpuContext(r).batches.length) return;
            let i = r.customShader || this._adaptor.shader;
            this.state.blendMode = e.groupBlendMode;
            let a = i.resources.localUniforms.uniforms;
            a.uTransformMatrix = e.groupTransform, a.uRound = t._roundPixels | e._roundPixels, (0, f.color32BitToUniform)(e.groupColorAlpha, a.uColor, 0), this._adaptor.execute(this, e)
        }
        _rebuild(e) {
            let t = this._getGpuDataForRenderable(e),
                r = this.renderer.graphicsContext.updateGpuContext(e.context);
            t.destroy(), r.isBatchable && this._updateBatchesForRenderable(e, t)
        }
        _addToBatcher(e, t) {
            let r = this.renderer.renderPipes.batch,
                i = this._getGpuDataForRenderable(e).batches;
            for (let e = 0; e < i.length; e++) {
                let a = i[e];
                r.addToBatch(a, t)
            }
        }
        _getGpuDataForRenderable(e) {
            return e._gpuData[this.renderer.uid] || this._initGpuDataForRenderable(e)
        }
        _initGpuDataForRenderable(e) {
            let t = new m;
            return e._gpuData[this.renderer.uid] = t, t
        }
        _updateBatchesForRenderable(e, t) {
            let r = e.context,
                i = this.renderer.graphicsContext.getGpuContext(r),
                a = this.renderer._roundPixels | e._roundPixels;
            t.batches = i.batches.map(t => {
                let r = p.BigPool.get(g.BatchableGraphics);
                return t.copyTo(r), r.renderable = e, r.roundPixels = a, r
            })
        }
        destroy() {
            this.renderer = null, this._adaptor.destroy(), this._adaptor = null, this.state = null
        }
    }
    x.extension = {
        type: [s.ExtensionType.WebGLPipes, s.ExtensionType.WebGPUPipes, s.ExtensionType.CanvasPipes],
        name: "graphics"
    }, s.extensions.add(x), s.extensions.add(h.GraphicsContextSystem), e.s([], 652030);
    var _ = e.i(814566),
        y = e.i(307524),
        T = e.i(211893),
        b = e.i(526488);
    class v {
        constructor() {
            this.batcherName = "default", this.packAsQuad = !1, this.indexOffset = 0, this.attributeOffset = 0, this.roundPixels = 0, this._batcher = null, this._batch = null, this._textureMatrixUpdateId = -1, this._uvUpdateId = -1
        }
        get blendMode() {
            return this.renderable.groupBlendMode
        }
        get topology() {
            return this._topology || this.geometry.topology
        }
        set topology(e) {
            this._topology = e
        }
        reset() {
            this.renderable = null, this.texture = null, this._batcher = null, this._batch = null, this.geometry = null, this._uvUpdateId = -1, this._textureMatrixUpdateId = -1
        }
        setTexture(e) {
            this.texture !== e && (this.texture = e, this._textureMatrixUpdateId = -1)
        }
        get uvs() {
            let e = this.geometry.getBuffer("aUV"),
                t = e.data,
                r = t,
                i = this.texture.textureMatrix;
            return i.isSimple || (r = this._transformedUvs, (this._textureMatrixUpdateId !== i._updateID || this._uvUpdateId !== e._updateID) && ((!r || r.length < t.length) && (r = this._transformedUvs = new Float32Array(t.length)), this._textureMatrixUpdateId = i._updateID, this._uvUpdateId = e._updateID, i.multiplyUvs(t, r))), r
        }
        get positions() {
            return this.geometry.positions
        }
        get indices() {
            return this.geometry.indices
        }
        get color() {
            return this.renderable.groupColorAlpha
        }
        get groupTransform() {
            return this.renderable.groupTransform
        }
        get attributeSize() {
            return this.geometry.positions.length / 2
        }
        get indexSize() {
            return this.geometry.indices.length
        }
    }
    class w {
        destroy() {}
    }
    class S {
        constructor(e, t) {
            this.localUniforms = new T.UniformGroup({
                uTransformMatrix: {
                    value: new _.Matrix,
                    type: "mat3x3<f32>"
                },
                uColor: {
                    value: new Float32Array([1, 1, 1, 1]),
                    type: "vec4<f32>"
                },
                uRound: {
                    value: 0,
                    type: "f32"
                }
            }), this.localUniformsBindGroup = new y.BindGroup({
                0: this.localUniforms
            }), this.renderer = e, this._adaptor = t, this._adaptor.init()
        }
        validateRenderable(e) {
            let t = this._getMeshData(e),
                r = t.batched,
                i = e.batched;
            if (t.batched = i, r !== i) return !0;
            if (i) {
                let r = e._geometry;
                if (r.indices.length !== t.indexSize || r.positions.length !== t.vertexSize) return t.indexSize = r.indices.length, t.vertexSize = r.positions.length, !0;
                let i = this._getBatchableMesh(e);
                return i.texture.uid !== e._texture.uid && (i._textureMatrixUpdateId = -1), !i._batcher.checkAndUpdateTexture(i, e._texture)
            }
            return !1
        }
        addRenderable(e, t) {
            let r = this.renderer.renderPipes.batch,
                {
                    batched: i
                } = this._getMeshData(e);
            if (i) {
                let i = this._getBatchableMesh(e);
                i.setTexture(e._texture), i.geometry = e._geometry, r.addToBatch(i, t)
            } else r.break(t), t.add(e)
        }
        updateRenderable(e) {
            if (e.batched) {
                let t = this._getBatchableMesh(e);
                t.setTexture(e._texture), t.geometry = e._geometry, t._batcher.updateElement(t)
            }
        }
        execute(e) {
            if (!e.isRenderable) return;
            e.state.blendMode = (0, b.getAdjustedBlendModeBlend)(e.groupBlendMode, e.texture._source);
            let t = this.localUniforms;
            t.uniforms.uTransformMatrix = e.groupTransform, t.uniforms.uRound = this.renderer._roundPixels | e._roundPixels, t.update(), (0, f.color32BitToUniform)(e.groupColorAlpha, t.uniforms.uColor, 0), this._adaptor.execute(this, e)
        }
        _getMeshData(e) {
            var t, r;
            return (t = e._gpuData)[r = this.renderer.uid] || (t[r] = new w), e._gpuData[this.renderer.uid].meshData || this._initMeshData(e)
        }
        _initMeshData(e) {
            return e._gpuData[this.renderer.uid].meshData = {
                batched: e.batched,
                indexSize: e._geometry.indices ? .length,
                vertexSize: e._geometry.positions ? .length
            }, e._gpuData[this.renderer.uid].meshData
        }
        _getBatchableMesh(e) {
            var t, r;
            return (t = e._gpuData)[r = this.renderer.uid] || (t[r] = new w), e._gpuData[this.renderer.uid].batchableMesh || this._initBatchableMesh(e)
        }
        _initBatchableMesh(e) {
            let t = new v;
            return t.renderable = e, t.setTexture(e._texture), t.transform = e.groupTransform, t.roundPixels = this.renderer._roundPixels | e._roundPixels, e._gpuData[this.renderer.uid].batchableMesh = t, t
        }
        destroy() {
            this.localUniforms = null, this.localUniformsBindGroup = null, this._adaptor.destroy(), this._adaptor = null, this.renderer = null
        }
    }
    S.extension = {
        type: [s.ExtensionType.WebGLPipes, s.ExtensionType.WebGPUPipes, s.ExtensionType.CanvasPipes],
        name: "mesh"
    }, s.extensions.add(S), e.s([], 130751);
    class C {
        execute(e, t) {
            let r = e.state,
                i = e.renderer,
                a = t.shader || e.defaultShader;
            a.resources.uTexture = t.texture._source, a.resources.uniforms = e.localUniforms;
            let n = i.gl,
                s = e.getBuffers(t);
            i.shader.bind(a), i.state.set(r), i.geometry.bind(s.geometry, a.glProgram);
            let o = 2 === s.geometry.indexBuffer.data.BYTES_PER_ELEMENT ? n.UNSIGNED_SHORT : n.UNSIGNED_INT;
            n.drawElements(n.TRIANGLES, 6 * t.particleChildren.length, o, 0)
        }
    }
    var P = e.i(130395),
        U = e.i(185563),
        B = e.i(761362),
        M = e.i(659557),
        R = e.i(890249);

    function F(e, t = null) {
        let r = 6 * e;
        if (r > 65535 ? t || (t = new Uint32Array(r)) : t || (t = new Uint16Array(r)), t.length !== r) throw Error(`Out buffer length is incorrect, got ${t.length} and expected ${r}`);
        for (let e = 0, i = 0; e < r; e += 6, i += 4) t[e + 0] = i + 0, t[e + 1] = i + 1, t[e + 2] = i + 2, t[e + 3] = i + 0, t[e + 4] = i + 2, t[e + 5] = i + 3;
        return t
    }

    function G(e, t) {
        let r = [];
        r.push(`

        var index = 0;

        for (let i = 0; i < ps.length; ++i)
        {
            const p = ps[i];

            `);
        let i = 0;
        for (let a in e) {
            let n = e[a];
            t === n.dynamic && (r.push(`offset = index + ${i}`), r.push(n.code), i += (0, M.getAttributeInfoFromFormat)(n.format).stride / 4)
        }
        return r.push(`
            index += stride * 4;
        }
    `), r.unshift(`
        var stride = ${i};
    `), Function("ps", "f32v", "u32v", r.join("\n"))
    }
    class A {
        constructor(e) {
            this._size = 0, this._generateParticleUpdateCache = {};
            const t = this._size = e.size ? ? 1e3,
                r = e.properties;
            let i = 0,
                a = 0;
            for (const e in r) {
                const t = r[e],
                    n = (0, M.getAttributeInfoFromFormat)(t.format);
                t.dynamic ? a += n.stride : i += n.stride
            }
            this._dynamicStride = a / 4, this._staticStride = i / 4, this.staticAttributeBuffer = new R.ViewableBuffer(4 * t * i), this.dynamicAttributeBuffer = new R.ViewableBuffer(4 * t * a), this.indexBuffer = F(t);
            const n = new B.Geometry;
            let s = 0,
                o = 0;
            for (const e in this._staticBuffer = new P.Buffer({
                    data: new Float32Array(1),
                    label: "static-particle-buffer",
                    shrinkToFit: !1,
                    usage: U.BufferUsage.VERTEX | U.BufferUsage.COPY_DST
                }), this._dynamicBuffer = new P.Buffer({
                    data: new Float32Array(1),
                    label: "dynamic-particle-buffer",
                    shrinkToFit: !1,
                    usage: U.BufferUsage.VERTEX | U.BufferUsage.COPY_DST
                }), r) {
                const t = r[e],
                    i = (0, M.getAttributeInfoFromFormat)(t.format);
                t.dynamic ? (n.addAttribute(t.attributeName, {
                    buffer: this._dynamicBuffer,
                    stride: 4 * this._dynamicStride,
                    offset: 4 * s,
                    format: t.format
                }), s += i.size) : (n.addAttribute(t.attributeName, {
                    buffer: this._staticBuffer,
                    stride: 4 * this._staticStride,
                    offset: 4 * o,
                    format: t.format
                }), o += i.size)
            }
            n.addIndex(this.indexBuffer);
            const l = this.getParticleUpdate(r);
            this._dynamicUpload = l.dynamicUpdate, this._staticUpload = l.staticUpdate, this.geometry = n
        }
        getParticleUpdate(e) {
            let t = function(e) {
                let t = [];
                for (let r in e) {
                    let i = e[r];
                    t.push(r, i.code, i.dynamic ? "d" : "s")
                }
                return t.join("_")
            }(e);
            return this._generateParticleUpdateCache[t] || (this._generateParticleUpdateCache[t] = this.generateParticleUpdate(e)), this._generateParticleUpdateCache[t]
        }
        generateParticleUpdate(e) {
            return {
                dynamicUpdate: G(e, !0),
                staticUpdate: G(e, !1)
            }
        }
        update(e, t) {
            e.length > this._size && (t = !0, this._size = Math.max(e.length, 1.5 * this._size | 0), this.staticAttributeBuffer = new R.ViewableBuffer(this._size * this._staticStride * 16), this.dynamicAttributeBuffer = new R.ViewableBuffer(this._size * this._dynamicStride * 16), this.indexBuffer = F(this._size), this.geometry.indexBuffer.setDataWithSize(this.indexBuffer, this.indexBuffer.byteLength, !0));
            let r = this.dynamicAttributeBuffer;
            if (this._dynamicUpload(e, r.float32View, r.uint32View), this._dynamicBuffer.setDataWithSize(this.dynamicAttributeBuffer.float32View, e.length * this._dynamicStride * 4, !0), t) {
                let t = this.staticAttributeBuffer;
                this._staticUpload(e, t.float32View, t.uint32View), this._staticBuffer.setDataWithSize(t.float32View, e.length * this._staticStride * 4, !0)
            }
        }
        destroy() {
            this._staticBuffer.destroy(), this._dynamicBuffer.destroy(), this.geometry.destroy()
        }
    }
    var k = e.i(307301),
        D = e.i(137385),
        E = e.i(635532),
        z = e.i(872872),
        O = e.i(297294),
        V = e.i(373068),
        W = "\nstruct ParticleUniforms {\n  uProjectionMatrix:mat3x3<f32>,\n  uColor:vec4<f32>,\n  uResolution:vec2<f32>,\n  uRoundPixels:f32,\n};\n\n@group(0) @binding(0) var<uniform> uniforms: ParticleUniforms;\n\n@group(1) @binding(0) var uTexture: texture_2d<f32>;\n@group(1) @binding(1) var uSampler : sampler;\n\nstruct VSOutput {\n    @builtin(position) position: vec4<f32>,\n    @location(0) uv : vec2<f32>,\n    @location(1) color : vec4<f32>,\n  };\n@vertex\nfn mainVertex(\n  @location(0) aVertex: vec2<f32>,\n  @location(1) aPosition: vec2<f32>,\n  @location(2) aUV: vec2<f32>,\n  @location(3) aColor: vec4<f32>,\n  @location(4) aRotation: f32,\n) -> VSOutput {\n  \n   let v = vec2(\n       aVertex.x * cos(aRotation) - aVertex.y * sin(aRotation),\n       aVertex.x * sin(aRotation) + aVertex.y * cos(aRotation)\n   ) + aPosition;\n\n   let position = vec4((uniforms.uProjectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);\n\n    let vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uniforms.uColor;\n\n  return VSOutput(\n   position,\n   aUV,\n   vColor,\n  );\n}\n\n@fragment\nfn mainFragment(\n  @location(0) uv: vec2<f32>,\n  @location(1) color: vec4<f32>,\n  @builtin(position) position: vec4<f32>,\n) -> @location(0) vec4<f32> {\n\n    var sample = textureSample(uTexture, uSampler, uv) * color;\n   \n    return sample;\n}";
    class L extends z.Shader {
        constructor() {
            super({
                glProgram: D.GlProgram.from({
                    vertex: "attribute vec2 aVertex;\nattribute vec2 aUV;\nattribute vec4 aColor;\n\nattribute vec2 aPosition;\nattribute float aRotation;\n\nuniform mat3 uTranslationMatrix;\nuniform float uRound;\nuniform vec2 uResolution;\nuniform vec4 uColor;\n\nvarying vec2 vUV;\nvarying vec4 vColor;\n\nvec2 roundPixels(vec2 position, vec2 targetSize)\n{       \n    return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;\n}\n\nvoid main(void){\n    float cosRotation = cos(aRotation);\n    float sinRotation = sin(aRotation);\n    float x = aVertex.x * cosRotation - aVertex.y * sinRotation;\n    float y = aVertex.x * sinRotation + aVertex.y * cosRotation;\n\n    vec2 v = vec2(x, y);\n    v = v + aPosition;\n\n    gl_Position = vec4((uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);\n\n    if(uRound == 1.0)\n    {\n        gl_Position.xy = roundPixels(gl_Position.xy, uResolution);\n    }\n\n    vUV = aUV;\n    vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uColor;\n}\n",
                    fragment: "varying vec2 vUV;\nvarying vec4 vColor;\n\nuniform sampler2D uTexture;\n\nvoid main(void){\n    vec4 color = texture2D(uTexture, vUV) * vColor;\n    gl_FragColor = color;\n}"
                }),
                gpuProgram: E.GpuProgram.from({
                    fragment: {
                        source: W,
                        entryPoint: "mainFragment"
                    },
                    vertex: {
                        source: W,
                        entryPoint: "mainVertex"
                    }
                }),
                resources: {
                    uTexture: O.Texture.WHITE.source,
                    uSampler: new V.TextureStyle({}),
                    uniforms: {
                        uTranslationMatrix: {
                            value: new _.Matrix,
                            type: "mat3x3<f32>"
                        },
                        uColor: {
                            value: new k.Color(0xffffff),
                            type: "vec4<f32>"
                        },
                        uRound: {
                            value: 1,
                            type: "f32"
                        },
                        uResolution: {
                            value: [0, 0],
                            type: "vec2<f32>"
                        }
                    }
                }
            })
        }
    }
    class I {
        constructor(e, t) {
            this.state = c.State.for2d(), this.localUniforms = new T.UniformGroup({
                uTranslationMatrix: {
                    value: new _.Matrix,
                    type: "mat3x3<f32>"
                },
                uColor: {
                    value: new Float32Array(4),
                    type: "vec4<f32>"
                },
                uRound: {
                    value: 1,
                    type: "f32"
                },
                uResolution: {
                    value: [0, 0],
                    type: "vec2<f32>"
                }
            }), this.renderer = e, this.adaptor = t, this.defaultShader = new L, this.state = c.State.for2d()
        }
        validateRenderable(e) {
            return !1
        }
        addRenderable(e, t) {
            this.renderer.renderPipes.batch.break(t), t.add(e)
        }
        getBuffers(e) {
            return e._gpuData[this.renderer.uid] || this._initBuffer(e)
        }
        _initBuffer(e) {
            return e._gpuData[this.renderer.uid] = new A({
                size: e.particleChildren.length,
                properties: e._properties
            }), e._gpuData[this.renderer.uid]
        }
        updateRenderable(e) {}
        execute(e) {
            let t = e.particleChildren;
            if (0 === t.length) return;
            let r = this.renderer,
                i = this.getBuffers(e);
            e.texture || (e.texture = t[0].texture);
            let a = this.state;
            i.update(t, e._childrenDirty), e._childrenDirty = !1, a.blendMode = (0, b.getAdjustedBlendModeBlend)(e.blendMode, e.texture._source);
            let n = this.localUniforms.uniforms,
                s = n.uTranslationMatrix;
            e.worldTransform.copyTo(s), s.prepend(r.globalUniforms.globalUniformData.projectionMatrix), n.uResolution = r.globalUniforms.globalUniformData.resolution, n.uRound = r._roundPixels | e._roundPixels, (0, f.color32BitToUniform)(e.groupColorAlpha, n.uColor, 0), this.adaptor.execute(this, e)
        }
        destroy() {
            this.defaultShader && (this.defaultShader.destroy(), this.defaultShader = null)
        }
    }
    class $ extends I {
        constructor(e) {
            super(e, new C)
        }
    }
    $.extension = {
        type: [s.ExtensionType.WebGLPipes],
        name: "particle"
    };
    class H {
        execute(e, t) {
            let r = e.renderer,
                i = t.shader || e.defaultShader;
            i.groups[0] = r.renderPipes.uniformBatch.getUniformBindGroup(e.localUniforms, !0), i.groups[1] = r.texture.getTextureBindGroup(t.texture);
            let a = e.state,
                n = e.getBuffers(t);
            r.encoder.draw({
                geometry: n.geometry,
                shader: t.shader || e.defaultShader,
                state: a,
                size: 6 * t.particleChildren.length
            })
        }
    }
    class Y extends I {
        constructor(e) {
            super(e, new H)
        }
    }
    Y.extension = {
        type: [s.ExtensionType.WebGPUPipes],
        name: "particle"
    }, s.extensions.add($), s.extensions.add(Y), e.s([], 937660);
    var X = e.i(988369);

    function j(e, t) {
        let {
            texture: r,
            bounds: i
        } = e, a = t._style._getFinalPadding();
        (0, X.updateQuadBounds)(i, t._anchor, r);
        let n = t._anchor._x * a * 2,
            s = t._anchor._y * a * 2;
        i.minX -= a - n, i.minY -= a - s, i.maxX -= a - n, i.maxY -= a - s
    }
    var q = e.i(878995);
    class N extends q.BatchableSprite {
        constructor(e) {
            super(), this._renderer = e, e.runners.resolutionChange.add(this)
        }
        resolutionChange() {
            let e = this.renderable;
            e._autoResolution && e.onViewUpdate()
        }
        destroy() {
            this._renderer.canvasText.returnTexture(this.texture), this._renderer = null
        }
    }
    class K {
        constructor(e) {
            this._renderer = e
        }
        validateRenderable(e) {
            return e._didTextUpdate
        }
        addRenderable(e, t) {
            let r = this._getGpuText(e);
            e._didTextUpdate && (this._updateGpuText(e), e._didTextUpdate = !1), this._renderer.renderPipes.batch.addToBatch(r, t)
        }
        updateRenderable(e) {
            let t = this._getGpuText(e);
            t._batcher.updateElement(t)
        }
        _updateGpuText(e) {
            let t = this._getGpuText(e);
            t.texture && this._renderer.canvasText.returnTexture(t.texture), e._resolution = e._autoResolution ? this._renderer.resolution : e.resolution, t.texture = t.texture = this._renderer.canvasText.getTexture(e), j(t, e)
        }
        _getGpuText(e) {
            return e._gpuData[this._renderer.uid] || this.initGpuText(e)
        }
        initGpuText(e) {
            let t = new N(this._renderer);
            return t.renderable = e, t.transform = e.groupTransform, t.bounds = {
                minX: 0,
                maxX: 1,
                minY: 0,
                maxY: 0
            }, t.roundPixels = this._renderer._roundPixels | e._roundPixels, e._gpuData[this._renderer.uid] = t, t
        }
        destroy() {
            this._renderer = null
        }
    }
    K.extension = {
        type: [s.ExtensionType.WebGLPipes, s.ExtensionType.WebGPUPipes, s.ExtensionType.CanvasPipes],
        name: "text"
    };
    var Q = e.i(189561),
        J = e.i(373839),
        Z = e.i(629272),
        ee = e.i(601730);
    let et = new ee.Bounds;

    function er(e, t, r, i) {
        et.minX = 0, et.minY = 0, et.maxX = e.width / i | 0, et.maxY = e.height / i | 0;
        let a = Q.TexturePool.getOptimalTexture(et.width, et.height, i, !1);
        return a.source.uploadMethodId = "image", a.source.resource = e, a.source.alphaMode = "premultiply-alpha-on-upload", a.frame.width = t / i, a.frame.height = r / i, a.source.emit("update", a.source), a.updateUvs(), a
    }
    var ei = e.i(368256),
        ea = e.i(945549),
        en = e.i(69203),
        es = e.i(561714);
    let eo = null,
        el = null;

    function eu(e, t, r) {
        for (let i = 0, a = 4 * r * t; i < t; ++i, a += 4)
            if (0 !== e[a + 3]) return !1;
        return !0
    }

    function ed(e, t, r, i, a) {
        let n = 4 * t;
        for (let t = i, s = i * n + 4 * r; t <= a; ++t, s += n)
            if (0 !== e[s + 3]) return !1;
        return !0
    }
    var eh = e.i(161015),
        ec = e.i(908695),
        ep = e.i(31232);
    let ef = new ei.Rectangle,
        eg = new class {
            getCanvasAndContext(e) {
                let {
                    text: t,
                    style: r,
                    resolution: i = 1
                } = e, a = r._getFinalPadding(), n = eh.CanvasTextMetrics.measureText(t || " ", r), s = Math.ceil(Math.ceil(Math.max(1, n.width) + 2 * a) * i), o = Math.ceil(Math.ceil(Math.max(1, n.height) + 2 * a) * i), l = ea.CanvasPool.getOptimalCanvasAndContext(s, o);
                this._renderTextToCanvas(t, r, a, i, l);
                let u = r.trim ? function(...e) {
                    let t = e[0];
                    t.canvas || (t = {
                        canvas: e[0],
                        resolution: e[1]
                    });
                    let {
                        canvas: r
                    } = t, i = Math.min(t.resolution ? ? 1, 1), a = t.width ? ? r.width, n = t.height ? ? r.height, s = t.output;
                    if (eo || ((el = (eo = en.DOMAdapter.get().createCanvas(256, 128)).getContext("2d", {
                            willReadFrequently: !0
                        })).globalCompositeOperation = "copy", el.globalAlpha = 1), (eo.width < a || eo.height < n) && (eo.width = (0, es.nextPow2)(a), eo.height = (0, es.nextPow2)(n)), !el) throw TypeError("Failed to get canvas 2D context");
                    el.drawImage(r, 0, 0, a, n, 0, 0, a * i, n * i);
                    let o = el.getImageData(0, 0, a, n).data,
                        l = 0,
                        u = 0,
                        d = a - 1,
                        h = n - 1;
                    for (; u < n && eu(o, a, u);) ++u;
                    if (u === n) return ei.Rectangle.EMPTY;
                    for (; eu(o, a, h);) --h;
                    for (; ed(o, a, l, u, h);) ++l;
                    for (; ed(o, a, d, u, h);) --d;
                    return ++d, ++h, el.globalCompositeOperation = "source-over", el.strokeRect(l, u, d - l, h - u), el.globalCompositeOperation = "copy", s ? ? (s = new ei.Rectangle), s.set(l / i, u / i, (d - l) / i, (h - u) / i), s
                }({
                    canvas: l.canvas,
                    width: s,
                    height: o,
                    resolution: 1,
                    output: ef
                }) : ef.set(0, 0, s, o);
                return {
                    canvasAndContext: l,
                    frame: u
                }
            }
            returnCanvasAndContext(e) {
                ea.CanvasPool.returnCanvasAndContext(e)
            }
            _renderTextToCanvas(e, t, r, i, a) {
                let n, s, {
                        canvas: o,
                        context: l
                    } = a,
                    u = (0, ec.fontStringFromTextStyle)(t),
                    d = eh.CanvasTextMetrics.measureText(e || " ", t),
                    h = d.lines,
                    c = d.lineHeight,
                    p = d.lineWidths,
                    f = d.maxLineWidth,
                    g = d.fontProperties,
                    m = o.height;
                if (l.resetTransform(), l.scale(i, i), l.textBaseline = t.textBaseline, t._stroke ? .width) {
                    let e = t._stroke;
                    l.lineWidth = e.width, l.miterLimit = e.miterLimit, l.lineJoin = e.join, l.lineCap = e.cap
                }
                l.font = u;
                let x = t.dropShadow ? 2 : 1;
                for (let e = 0; e < x; ++e) {
                    let o = t.dropShadow && 0 === e,
                        u = o ? Math.ceil(Math.max(1, m) + 2 * r) : 0,
                        x = u * i;
                    if (o) {
                        l.fillStyle = "black", l.strokeStyle = "black";
                        let e = t.dropShadow,
                            r = e.color,
                            a = e.alpha;
                        l.shadowColor = k.Color.shared.setValue(r).setAlpha(a).toRgbaString();
                        let n = e.blur * i,
                            s = e.distance * i;
                        l.shadowBlur = n, l.shadowOffsetX = Math.cos(e.angle) * s, l.shadowOffsetY = Math.sin(e.angle) * s + x
                    } else {
                        if (l.fillStyle = t._fill ? (0, ep.getCanvasFillStyle)(t._fill, l, d) : null, t._stroke ? .width) {
                            let e = t._stroke.width * t._stroke.alignment;
                            l.strokeStyle = (0, ep.getCanvasFillStyle)(t._stroke, l, d, e)
                        }
                        l.shadowColor = "black"
                    }
                    let _ = (c - g.fontSize) / 2;
                    c - g.fontSize < 0 && (_ = 0);
                    let y = t._stroke ? .width ? ? 0;
                    for (let e = 0; e < h.length; e++) n = y / 2, s = y / 2 + e * c + g.ascent + _, "right" === t.align ? n += f - p[e] : "center" === t.align && (n += (f - p[e]) / 2), t._stroke ? .width && this._drawLetterSpacing(h[e], t, a, n + r, s + r - u, !0), void 0 !== t._fill && this._drawLetterSpacing(h[e], t, a, n + r, s + r - u)
                }
            }
            _drawLetterSpacing(e, t, r, i, a, n = !1) {
                let {
                    context: s
                } = r, o = t.letterSpacing, l = !1;
                if (eh.CanvasTextMetrics.experimentalLetterSpacingSupported && (eh.CanvasTextMetrics.experimentalLetterSpacing ? (s.letterSpacing = `${o}px`, s.textLetterSpacing = `${o}px`, l = !0) : (s.letterSpacing = "0px", s.textLetterSpacing = "0px")), 0 === o || l) return void(n ? s.strokeText(e, i, a) : s.fillText(e, i, a));
                let u = i,
                    d = eh.CanvasTextMetrics.graphemeSegmenter(e),
                    h = s.measureText(e).width,
                    c = 0;
                for (let e = 0; e < d.length; ++e) {
                    let t = d[e];
                    n ? s.strokeText(t, u, a) : s.fillText(t, u, a);
                    let r = "";
                    for (let t = e + 1; t < d.length; ++t) r += d[t];
                    u += h - (c = s.measureText(r).width) + o, h = c
                }
            }
        };
    class em {
        constructor(e) {
            this._renderer = e
        }
        getTexture(e, t, r, i) {
            "string" == typeof e && ((0, J.deprecation)("8.0.0", "CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments"), e = {
                text: e,
                style: r,
                resolution: t
            }), e.style instanceof Z.TextStyle || (e.style = new Z.TextStyle(e.style)), e.textureStyle instanceof V.TextureStyle || (e.textureStyle = new V.TextureStyle(e.textureStyle)), "string" != typeof e.text && (e.text = e.text.toString());
            let {
                text: a,
                style: n,
                textureStyle: s
            } = e, o = e.resolution ? ? this._renderer.resolution, {
                frame: l,
                canvasAndContext: u
            } = eg.getCanvasAndContext({
                text: a,
                style: n,
                resolution: o
            }), d = er(u.canvas, l.width, l.height, o);
            if (s && (d.source.style = s), n.trim && (l.pad(n.padding), d.frame.copyFrom(l), d.updateUvs()), n.filters) {
                let e = this._applyFilters(d, n.filters);
                return this.returnTexture(d), eg.returnCanvasAndContext(u), e
            }
            return this._renderer.texture.initSource(d._source), eg.returnCanvasAndContext(u), d
        }
        returnTexture(e) {
            let t = e.source;
            t.resource = null, t.uploadMethodId = "unknown", t.alphaMode = "no-premultiply-alpha", Q.TexturePool.returnTexture(e, !0)
        }
        renderTextToCanvas() {
            (0, J.deprecation)("8.10.0", "CanvasTextSystem.renderTextToCanvas: no longer supported, use CanvasTextSystem.getTexture instead")
        }
        _applyFilters(e, t) {
            let r = this._renderer.renderTarget.renderTarget,
                i = this._renderer.filter.generateFilteredTexture({
                    texture: e,
                    filters: t
                });
            return this._renderer.renderTarget.bind(r, !1), i
        }
        destroy() {
            this._renderer = null
        }
    }
    em.extension = {
        type: [s.ExtensionType.WebGLSystem, s.ExtensionType.WebGPUSystem, s.ExtensionType.CanvasSystem],
        name: "canvasText"
    }, s.extensions.add(em), s.extensions.add(K), e.s([], 993857);
    var ex = e.i(224021),
        e_ = e.i(294232),
        ey = e.i(80931),
        eT = e.i(314191),
        eb = e.i(807517),
        ev = e.i(960536),
        ew = e.i(843105),
        eS = z;
    let eC = {
            name: "local-uniform-msdf-bit",
            vertex: {
                header: `
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,
                main: `
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,
                end: `
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `
            },
            fragment: {
                header: `
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `,
                main: `
            outColor = vec4<f32>(calculateMSDFAlpha(outColor, localUniforms.uColor, localUniforms.uDistance));
        `
            }
        },
        eP = {
            name: "local-uniform-msdf-bit",
            vertex: {
                header: `
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,
                main: `
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `,
                end: `
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `
            },
            fragment: {
                header: `
            uniform float uDistance;
         `,
                main: `
            outColor = vec4(calculateMSDFAlpha(outColor, vColor, uDistance));
        `
            }
        },
        eU = {
            name: "msdf-bit",
            fragment: {
                header: `
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, shapeColor:vec4<f32>, distance:f32) -> f32 {

                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                var luma: f32 = dot(shapeColor.rgb, vec3<f32>(0.299, 0.587, 0.114));
                var gamma: f32 = mix(1.0, 1.0 / 2.2, luma);
                var coverage: f32 = pow(shapeColor.a * alpha, gamma);

                return coverage;

            }
        `
            }
        },
        eB = {
            name: "msdf-bit",
            fragment: {
                header: `
            float calculateMSDFAlpha(vec4 msdfColor, vec4 shapeColor, float distance) {

                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);

                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                float luma = dot(shapeColor.rgb, vec3(0.299, 0.587, 0.114));
                float gamma = mix(1.0, 1.0 / 2.2, luma);
                float coverage = pow(shapeColor.a * alpha, gamma);

                return coverage;
            }
        `
            }
        };
    class eM extends eS.Shader {
        constructor(e) {
            const i = new T.UniformGroup({
                uColor: {
                    value: new Float32Array([1, 1, 1, 1]),
                    type: "vec4<f32>"
                },
                uTransformMatrix: {
                    value: new _.Matrix,
                    type: "mat3x3<f32>"
                },
                uDistance: {
                    value: 4,
                    type: "f32"
                },
                uRound: {
                    value: 0,
                    type: "f32"
                }
            });
            t ? ? (t = (0, ey.compileHighShaderGpuProgram)({
                name: "sdf-shader",
                bits: [eT.colorBit, (0, eb.generateTextureBatchBit)(e), eC, eU, ev.roundPixelsBit]
            })), r ? ? (r = (0, ey.compileHighShaderGlProgram)({
                name: "sdf-shader",
                bits: [eT.colorBitGl, (0, eb.generateTextureBatchBitGl)(e), eP, eB, ev.roundPixelsBitGl]
            })), super({
                glProgram: r,
                gpuProgram: t,
                resources: {
                    localUniforms: i,
                    batchSamplers: (0, ew.getBatchSamplersUniformGroup)(e)
                }
            })
        }
    }
    var eR = e.i(534070),
        eF = e.i(334219);
    class eG extends e_.Graphics {
        destroy() {
            this.context.customShader && this.context.customShader.destroy(), super.destroy()
        }
    }
    class eA {
        constructor(e) {
            this._renderer = e, this._renderer.renderableGC.addManagedHash(this, "_gpuBitmapText")
        }
        validateRenderable(e) {
            let t = this._getGpuBitmapText(e);
            return e._didTextUpdate && (e._didTextUpdate = !1, this._updateContext(e, t)), this._renderer.renderPipes.graphics.validateRenderable(t)
        }
        addRenderable(e, t) {
            let r = this._getGpuBitmapText(e);
            ek(e, r), e._didTextUpdate && (e._didTextUpdate = !1, this._updateContext(e, r)), this._renderer.renderPipes.graphics.addRenderable(r, t), r.context.customShader && this._updateDistanceField(e)
        }
        updateRenderable(e) {
            let t = this._getGpuBitmapText(e);
            ek(e, t), this._renderer.renderPipes.graphics.updateRenderable(t), t.context.customShader && this._updateDistanceField(e)
        }
        _updateContext(e, t) {
            let {
                context: r
            } = t, i = eR.BitmapFontManager.getFont(e.text, e._style);
            r.clear(), "none" === i.distanceField.type || r.customShader || (r.customShader = new eM(this._renderer.limits.maxBatchableTextures));
            let a = eh.CanvasTextMetrics.graphemeSegmenter(e.text),
                n = e._style,
                s = i.baseLineOffset,
                o = (0, eF.getBitmapTextLayout)(a, n, i, !0),
                l = n.padding,
                u = o.scale,
                d = o.width,
                h = o.height + o.offsetY;
            n._stroke && (d += n._stroke.width / u, h += n._stroke.width / u), r.translate(-e._anchor._x * d - l, -e._anchor._y * h - l).scale(u, u);
            let c = i.applyFillAsTint ? n._fill.color : 0xffffff;
            for (let e = 0; e < o.lines.length; e++) {
                let t = o.lines[e];
                for (let e = 0; e < t.charPositions.length; e++) {
                    let a = t.chars[e],
                        n = i.chars[a];
                    n ? .texture && r.texture(n.texture, c || "black", Math.round(t.charPositions[e] + n.xOffset), Math.round(s + n.yOffset))
                }
                s += i.lineHeight
            }
        }
        _getGpuBitmapText(e) {
            return e._gpuData[this._renderer.uid] || this.initGpuText(e)
        }
        initGpuText(e) {
            let t = new eG;
            return e._gpuData[this._renderer.uid] = t, this._updateContext(e, t), t
        }
        _updateDistanceField(e) {
            let t = this._getGpuBitmapText(e).context,
                r = e._style.fontFamily,
                i = ex.Cache.get(`${r}-bitmap`),
                {
                    a,
                    b: n,
                    c: s,
                    d: o
                } = e.groupTransform,
                l = (Math.abs(Math.sqrt(a * a + n * n)) + Math.abs(Math.sqrt(s * s + o * o))) / 2,
                u = i.baseRenderedFontSize / e._style.fontSize,
                d = l * i.distanceField.range * (1 / u);
            t.customShader.resources.localUniforms.uniforms.uDistance = d
        }
        destroy() {
            this._renderer = null
        }
    }

    function ek(e, t) {
        t.groupTransform = e.groupTransform, t.groupColorAlpha = e.groupColorAlpha, t.groupColor = e.groupColor, t.groupBlendMode = e.groupBlendMode, t.globalDisplayStatus = e.globalDisplayStatus, t.groupTransform = e.groupTransform, t.localDisplayStatus = e.localDisplayStatus, t.groupAlpha = e.groupAlpha, t._roundPixels = e._roundPixels
    }
    eA.extension = {
        type: [s.ExtensionType.WebGLPipes, s.ExtensionType.WebGPUPipes, s.ExtensionType.CanvasPipes],
        name: "bitmapText"
    }, s.extensions.add(eA), e.s([], 905752);
    var eD = q;
    class eE extends eD.BatchableSprite {
        constructor(e) {
            super(), this.generatingTexture = !1, this._renderer = e, e.runners.resolutionChange.add(this)
        }
        resolutionChange() {
            let e = this.renderable;
            e._autoResolution && e.onViewUpdate()
        }
        destroy() {
            this._renderer.htmlText.returnTexturePromise(this.texturePromise), this.texturePromise = null, this._renderer = null
        }
    }
    class ez {
        constructor(e) {
            this._renderer = e
        }
        validateRenderable(e) {
            return e._didTextUpdate
        }
        addRenderable(e, t) {
            let r = this._getGpuText(e);
            e._didTextUpdate && (this._updateGpuText(e).catch(e => {
                console.error(e)
            }), e._didTextUpdate = !1, j(r, e)), this._renderer.renderPipes.batch.addToBatch(r, t)
        }
        updateRenderable(e) {
            let t = this._getGpuText(e);
            t._batcher.updateElement(t)
        }
        async _updateGpuText(e) {
            e._didTextUpdate = !1;
            let t = this._getGpuText(e);
            if (t.generatingTexture) return;
            t.texturePromise && (this._renderer.htmlText.returnTexturePromise(t.texturePromise), t.texturePromise = null), t.generatingTexture = !0, e._resolution = e._autoResolution ? this._renderer.resolution : e.resolution;
            let r = this._renderer.htmlText.getTexturePromise(e);
            t.texturePromise = r, t.texture = await r;
            let i = e.renderGroup || e.parentRenderGroup;
            i && (i.structureDidChange = !0), t.generatingTexture = !1, j(t, e)
        }
        _getGpuText(e) {
            return e._gpuData[this._renderer.uid] || this.initGpuText(e)
        }
        initGpuText(e) {
            let t = new eE(this._renderer);
            return t.renderable = e, t.transform = e.groupTransform, t.texture = O.Texture.EMPTY, t.bounds = {
                minX: 0,
                maxX: 1,
                minY: 0,
                maxY: 0
            }, t.roundPixels = this._renderer._roundPixels | e._roundPixels, e._resolution = e._autoResolution ? this._renderer.resolution : e.resolution, e._gpuData[this._renderer.uid] = t, t
        }
        destroy() {
            this._renderer = null
        }
    }
    ez.extension = {
        type: [s.ExtensionType.WebGLPipes, s.ExtensionType.WebGPUPipes, s.ExtensionType.CanvasPipes],
        name: "htmlText"
    };
    var eO = e.i(418121),
        eV = e.i(909077);
    let eW = "http://www.w3.org/2000/svg",
        eL = "http://www.w3.org/1999/xhtml";
    class eI {
        constructor() {
            this.svgRoot = document.createElementNS(eW, "svg"), this.foreignObject = document.createElementNS(eW, "foreignObject"), this.domElement = document.createElementNS(eL, "div"), this.styleElement = document.createElementNS(eL, "style"), this.image = new Image;
            const {
                foreignObject: e,
                svgRoot: t,
                styleElement: r,
                domElement: i
            } = this;
            e.setAttribute("width", "10000"), e.setAttribute("height", "10000"), e.style.overflow = "hidden", t.appendChild(e), e.appendChild(r), e.appendChild(i)
        }
    }
    var e$ = Z;

    function eH(e) {
        let t = k.Color.shared.setValue(e.color).setAlpha(e.alpha).toHexa(),
            r = Math.round(Math.cos(e.angle) * e.distance),
            i = Math.round(Math.sin(e.angle) * e.distance),
            a = `${r}px ${i}px`;
        return e.blur > 0 ? `text-shadow: ${a} ${e.blur}px ${t}` : `text-shadow: ${a} ${t}`
    }

    function eY(e) {
        return `-webkit-text-stroke-width: ${e.width}px;-webkit-text-stroke-color: ${k.Color.shared.setValue(e.color).toHex()};text-stroke-width: ${e.width}px;text-stroke-color: ${k.Color.shared.setValue(e.color).toHex()};paint-order: stroke`
    }
    let eX = {
            fontSize: "font-size: {{VALUE}}px",
            fontFamily: "font-family: {{VALUE}}",
            fontWeight: "font-weight: {{VALUE}}",
            fontStyle: "font-style: {{VALUE}}",
            fontVariant: "font-variant: {{VALUE}}",
            letterSpacing: "letter-spacing: {{VALUE}}px",
            align: "text-align: {{VALUE}}",
            padding: "padding: {{VALUE}}px",
            whiteSpace: "white-space: {{VALUE}}",
            lineHeight: "line-height: {{VALUE}}px",
            wordWrapWidth: "max-width: {{VALUE}}px"
        },
        ej = {
            fill: e => `color: ${k.Color.shared.setValue(e).toHex()}`,
            breakWords: e => `word-wrap: ${e?"break-all":"break-word"}`,
            stroke: eY,
            dropShadow: eH
        };
    class eq extends e$.TextStyle {
        constructor(e = {}) {
            super(e), this._cssOverrides = [], this.cssOverrides = e.cssOverrides ? ? [], this.tagStyles = e.tagStyles ? ? {}
        }
        set cssOverrides(e) {
            this._cssOverrides = e instanceof Array ? e : [e], this.update()
        }
        get cssOverrides() {
            return this._cssOverrides
        }
        update() {
            this._cssStyle = null, super.update()
        }
        clone() {
            return new eq({
                align: this.align,
                breakWords: this.breakWords,
                dropShadow: this.dropShadow ? { ...this.dropShadow
                } : null,
                fill: this._fill,
                fontFamily: this.fontFamily,
                fontSize: this.fontSize,
                fontStyle: this.fontStyle,
                fontVariant: this.fontVariant,
                fontWeight: this.fontWeight,
                letterSpacing: this.letterSpacing,
                lineHeight: this.lineHeight,
                padding: this.padding,
                stroke: this._stroke,
                whiteSpace: this.whiteSpace,
                wordWrap: this.wordWrap,
                wordWrapWidth: this.wordWrapWidth,
                cssOverrides: this.cssOverrides,
                tagStyles: { ...this.tagStyles
                }
            })
        }
        get cssStyle() {
            let e, t, r, i;
            return this._cssStyle || (this._cssStyle = (e = this._stroke, t = this._fill, r = [`color: ${k.Color.shared.setValue(t.color).toHex()}`, `font-size: ${this.fontSize}px`, `font-family: ${this.fontFamily}`, `font-weight: ${this.fontWeight}`, `font-style: ${this.fontStyle}`, `font-variant: ${this.fontVariant}`, `letter-spacing: ${this.letterSpacing}px`, `text-align: ${this.align}`, `padding: ${this.padding}px`, `white-space: ${"pre"===this.whiteSpace&&this.wordWrap?"pre-wrap":this.whiteSpace}`, ...this.lineHeight ? [`line-height: ${this.lineHeight}px`] : [], ...this.wordWrap ? [`word-wrap: ${this.breakWords?"break-all":"break-word"}`, `max-width: ${this.wordWrapWidth}px`] : [], ...e ? [eY(e)] : [], ...this.dropShadow ? [eH(this.dropShadow)] : [], ...this.cssOverrides].join(";"), i = [`div { ${r} }`], function(e, t) {
                for (let r in e) {
                    let i = e[r],
                        a = [];
                    for (let e in i) ej[e] ? a.push(ej[e](i[e])) : eX[e] && a.push(eX[e].replace("{{VALUE}}", i[e]));
                    t.push(`${r} { ${a.join(";")} }`)
                }
            }(this.tagStyles, i), i.join(" "))), this._cssStyle
        }
        addOverride(...e) {
            let t = e.filter(e => !this.cssOverrides.includes(e));
            t.length > 0 && (this.cssOverrides.push(...t), this.update())
        }
        removeOverride(...e) {
            let t = e.filter(e => this.cssOverrides.includes(e));
            t.length > 0 && (this.cssOverrides = this.cssOverrides.filter(e => !t.includes(e)), this.update())
        }
        set fill(e) {
            "string" != typeof e && "number" != typeof e && (0, eV.warn)("[HTMLTextStyle] only color fill is not supported by HTMLText"), super.fill = e
        }
        set stroke(e) {
            e && "string" != typeof e && "number" != typeof e && (0, eV.warn)("[HTMLTextStyle] only color stroke is not supported by HTMLText"), super.stroke = e
        }
    }
    async function eN(e) {
        let t = await en.DOMAdapter.get().fetch(e),
            r = await t.blob(),
            i = new FileReader;
        return await new Promise((e, t) => {
            i.onloadend = () => e(i.result), i.onerror = t, i.readAsDataURL(r)
        })
    }
    async function eK(e, t) {
        let r = await eN(t);
        return `@font-face {
        font-family: "${e.fontFamily}";
        src: url('${r}');
        font-weight: ${e.fontWeight};
        font-style: ${e.fontStyle};
    }`
    }
    let eQ = new Map;
    async function eJ(e, t, r) {
        let i = e.filter(e => ex.Cache.has(`${e}-and-url`)).map((e, i) => {
            if (!eQ.has(e)) {
                let {
                    url: a
                } = ex.Cache.get(`${e}-and-url`);
                0 === i ? eQ.set(e, eK({
                    fontWeight: t.fontWeight,
                    fontStyle: t.fontStyle,
                    fontFamily: e
                }, a)) : eQ.set(e, eK({
                    fontWeight: r.fontWeight,
                    fontStyle: r.fontStyle,
                    fontFamily: e
                }, a))
            }
            return eQ.get(e)
        });
        return (await Promise.all(i)).join("\n")
    }
    class eZ {
        constructor(e) {
            this._renderer = e, this._createCanvas = e.type === eO.RendererType.WEBGPU
        }
        getTexture(e) {
            return this.getTexturePromise(e)
        }
        getTexturePromise(e) {
            return this._buildTexturePromise(e)
        }
        async _buildTexturePromise(e) {
            var t;
            let r, {
                    text: a,
                    style: n,
                    resolution: s,
                    textureStyle: o
                } = e,
                l = p.BigPool.get(eI),
                u = function(e, t) {
                    let r = t.fontFamily,
                        i = [],
                        a = {},
                        n = e.match(/font-family:([^;"\s]+)/g);

                    function s(e) {
                        a[e] || (i.push(e), a[e] = !0)
                    }
                    if (Array.isArray(r))
                        for (let e = 0; e < r.length; e++) s(r[e]);
                    else s(r);
                    for (let e in n && n.forEach(e => {
                            s(e.split(":")[1].trim())
                        }), t.tagStyles) s(t.tagStyles[e].fontFamily);
                    return i
                }(a, n),
                d = await eJ(u, n, eq.defaultTextStyle),
                h = function(e, t, r, a) {
                    a || (a = i || (i = new eI));
                    let {
                        domElement: n,
                        styleElement: s,
                        svgRoot: o
                    } = a;
                    n.innerHTML = `<style>${t.cssStyle};</style><div style='padding:0'>${e}</div>`, n.setAttribute("style", "transform-origin: top left; display: inline-block"), r && (s.textContent = r), document.body.appendChild(o);
                    let l = n.getBoundingClientRect();
                    o.remove();
                    let u = 2 * t.padding;
                    return {
                        width: l.width - u,
                        height: l.height - u
                    }
                }(a, n, d, l),
                c = Math.ceil(Math.ceil(Math.max(1, h.width) + 2 * n.padding) * s),
                f = Math.ceil(Math.ceil(Math.max(1, h.height) + 2 * n.padding) * s),
                g = l.image;
            g.width = (0 | c) + 2, g.height = (0 | f) + 2;
            let m = function(e, t, r, i, a) {
                let {
                    domElement: n,
                    styleElement: s,
                    svgRoot: o
                } = a;
                n.innerHTML = `<style>${t.cssStyle}</style><div style='padding:0;'>${e}</div>`, n.setAttribute("style", `transform: scale(${r});transform-origin: top left; display: inline-block`), s.textContent = i;
                let {
                    width: l,
                    height: u
                } = a.image;
                return o.setAttribute("width", l.toString()), o.setAttribute("height", u.toString()), new XMLSerializer().serializeToString(o)
            }(a, n, s, d, l);
            await (t = function() {
                let {
                    userAgent: e
                } = en.DOMAdapter.get().getNavigator();
                return /^((?!chrome|android).)*safari/i.test(e)
            }() && u.length > 0, new Promise(async e => {
                t && await new Promise(e => setTimeout(e, 100)), g.onload = () => {
                    e()
                }, g.src = `data:image/svg+xml;charset=utf8,${encodeURIComponent(m)}`, g.crossOrigin = "anonymous"
            })), this._createCanvas && (r = function(e, t) {
                let r = ea.CanvasPool.getOptimalCanvasAndContext(e.width, e.height, t),
                    {
                        context: i
                    } = r;
                return i.clearRect(0, 0, e.width, e.height), i.drawImage(e, 0, 0), r
            }(g, s));
            let x = er(r ? r.canvas : g, g.width - 2, g.height - 2, s);
            return o && (x.source.style = o), this._createCanvas && (this._renderer.texture.initSource(x.source), ea.CanvasPool.returnCanvasAndContext(r)), p.BigPool.return(l), x
        }
        returnTexturePromise(e) {
            e.then(e => {
                this._cleanUp(e)
            }).catch(() => {
                (0, eV.warn)("HTMLTextSystem: Failed to clean texture")
            })
        }
        _cleanUp(e) {
            Q.TexturePool.returnTexture(e, !0), e.source.resource = null, e.source.uploadMethodId = "unknown"
        }
        destroy() {
            this._renderer = null
        }
    }
    eZ.extension = {
        type: [s.ExtensionType.WebGLSystem, s.ExtensionType.WebGPUSystem, s.ExtensionType.CanvasSystem],
        name: "htmlText"
    }, s.extensions.add(eZ), s.extensions.add(ez), e.s([], 425999);
    var e0 = B;
    let e2 = class e extends e0.Geometry {
        constructor(...t) {
            let r = t[0] ? ? {};
            r instanceof Float32Array && ((0, J.deprecation)(J.v8_0_0, "use new MeshGeometry({ positions, uvs, indices }) instead"), r = {
                positions: r,
                uvs: t[1],
                indices: t[2]
            });
            const i = (r = { ...e.defaultOptions,
                ...r
            }).positions || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
            let a = r.uvs;
            a || (a = new Float32Array(r.positions ? i.length : [0, 0, 1, 0, 1, 1, 0, 1]));
            const n = r.indices || new Uint32Array([0, 1, 2, 0, 2, 3]),
                s = r.shrinkBuffersToFit,
                o = new P.Buffer({
                    data: i,
                    label: "attribute-mesh-positions",
                    shrinkToFit: s,
                    usage: U.BufferUsage.VERTEX | U.BufferUsage.COPY_DST
                });
            super({
                attributes: {
                    aPosition: {
                        buffer: o,
                        format: "float32x2",
                        stride: 8,
                        offset: 0
                    },
                    aUV: {
                        buffer: new P.Buffer({
                            data: a,
                            label: "attribute-mesh-uvs",
                            shrinkToFit: s,
                            usage: U.BufferUsage.VERTEX | U.BufferUsage.COPY_DST
                        }),
                        format: "float32x2",
                        stride: 8,
                        offset: 0
                    }
                },
                indexBuffer: new P.Buffer({
                    data: n,
                    label: "index-mesh-buffer",
                    shrinkToFit: s,
                    usage: U.BufferUsage.INDEX | U.BufferUsage.COPY_DST
                }),
                topology: r.topology
            }), this.batchMode = "auto"
        }
        get positions() {
            return this.attributes.aPosition.buffer.data
        }
        set positions(e) {
            this.attributes.aPosition.buffer.data = e
        }
        get uvs() {
            return this.attributes.aUV.buffer.data
        }
        set uvs(e) {
            this.attributes.aUV.buffer.data = e
        }
        get indices() {
            return this.indexBuffer.data
        }
        set indices(e) {
            this.indexBuffer.data = e
        }
    };
    e2.defaultOptions = {
        topology: "triangle-list",
        shrinkBuffersToFit: !1
    };
    let e1 = e2;
    var e3 = e.i(89800),
        e4 = z;
    let e5 = {
            name: "tiling-bit",
            vertex: {
                header: `
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,
                main: `
            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `
            },
            fragment: {
                header: `
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,
                main: `

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            }

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `
            }
        },
        e9 = {
            name: "tiling-bit",
            vertex: {
                header: `
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;

        `,
                main: `
            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `
            },
            fragment: {
                header: `
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `,
                main: `

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0

        `
            }
        };
    class e8 extends e4.Shader {
        constructor() {
            a ? ? (a = (0, ey.compileHighShaderGpuProgram)({
                name: "tiling-sprite-shader",
                bits: [e3.localUniformBit, e5, ev.roundPixelsBit]
            })), n ? ? (n = (0, ey.compileHighShaderGlProgram)({
                name: "tiling-sprite-shader",
                bits: [e3.localUniformBitGl, e9, ev.roundPixelsBitGl]
            })), super({
                glProgram: n,
                gpuProgram: a,
                resources: {
                    localUniforms: new T.UniformGroup({
                        uTransformMatrix: {
                            value: new _.Matrix,
                            type: "mat3x3<f32>"
                        },
                        uColor: {
                            value: new Float32Array([1, 1, 1, 1]),
                            type: "vec4<f32>"
                        },
                        uRound: {
                            value: 0,
                            type: "f32"
                        }
                    }),
                    tilingUniforms: new T.UniformGroup({
                        uMapCoord: {
                            value: new _.Matrix,
                            type: "mat3x3<f32>"
                        },
                        uClampFrame: {
                            value: new Float32Array([0, 0, 1, 1]),
                            type: "vec4<f32>"
                        },
                        uClampOffset: {
                            value: new Float32Array([0, 0]),
                            type: "vec2<f32>"
                        },
                        uTextureTransform: {
                            value: new _.Matrix,
                            type: "mat3x3<f32>"
                        },
                        uSizeAnchor: {
                            value: new Float32Array([100, 100, .5, .5]),
                            type: "vec4<f32>"
                        }
                    }),
                    uTexture: O.Texture.EMPTY.source,
                    uSampler: O.Texture.EMPTY.source.style
                }
            })
        }
        updateUniforms(e, t, r, i, a, n) {
            let s = this.resources.tilingUniforms,
                o = n.width,
                l = n.height,
                u = n.textureMatrix,
                d = s.uniforms.uTextureTransform;
            d.set(r.a * o / e, r.b * o / t, r.c * l / e, r.d * l / t, r.tx / e, r.ty / t), d.invert(), s.uniforms.uMapCoord = u.mapCoord, s.uniforms.uClampFrame = u.uClampFrame, s.uniforms.uClampOffset = u.uClampOffset, s.uniforms.uTextureTransform = d, s.uniforms.uSizeAnchor[0] = e, s.uniforms.uSizeAnchor[1] = t, s.uniforms.uSizeAnchor[2] = i, s.uniforms.uSizeAnchor[3] = a, n && (this.resources.uTexture = n.source, this.resources.uSampler = n.source.style)
        }
    }
    let e6 = new class extends e1 {
        constructor() {
            super({
                positions: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
                uvs: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
                indices: new Uint32Array([0, 1, 2, 0, 2, 3])
            })
        }
    };
    class e7 {
        constructor() {
            this.canBatch = !0, this.geometry = new e1({
                indices: e6.indices.slice(),
                positions: e6.positions.slice(),
                uvs: e6.uvs.slice()
            })
        }
        destroy() {
            this.geometry.destroy(), this.shader ? .destroy()
        }
    }
    class te {
        constructor(e) {
            this._state = c.State.default2d, this._renderer = e
        }
        validateRenderable(e) {
            let t = this._getTilingSpriteData(e),
                r = t.canBatch;
            this._updateCanBatch(e);
            let i = t.canBatch;
            if (i && i === r) {
                let {
                    batchableMesh: r
                } = t;
                return !r._batcher.checkAndUpdateTexture(r, e.texture)
            }
            return r !== i
        }
        addRenderable(e, t) {
            let r = this._renderer.renderPipes.batch;
            this._updateCanBatch(e);
            let i = this._getTilingSpriteData(e),
                {
                    geometry: a,
                    canBatch: n
                } = i;
            if (n) {
                i.batchableMesh || (i.batchableMesh = new v);
                let n = i.batchableMesh;
                e.didViewUpdate && (this._updateBatchableMesh(e), n.geometry = a, n.renderable = e, n.transform = e.groupTransform, n.setTexture(e._texture)), n.roundPixels = this._renderer._roundPixels | e._roundPixels, r.addToBatch(n, t)
            } else r.break(t), i.shader || (i.shader = new e8), this.updateRenderable(e), t.add(e)
        }
        execute(e) {
            let {
                shader: t
            } = this._getTilingSpriteData(e);
            t.groups[0] = this._renderer.globalUniforms.bindGroup;
            let r = t.resources.localUniforms.uniforms;
            r.uTransformMatrix = e.groupTransform, r.uRound = this._renderer._roundPixels | e._roundPixels, (0, f.color32BitToUniform)(e.groupColorAlpha, r.uColor, 0), this._state.blendMode = (0, b.getAdjustedBlendModeBlend)(e.groupBlendMode, e.texture._source), this._renderer.encoder.draw({
                geometry: e6,
                shader: t,
                state: this._state
            })
        }
        updateRenderable(e) {
            let t = this._getTilingSpriteData(e),
                {
                    canBatch: r
                } = t;
            if (r) {
                let {
                    batchableMesh: r
                } = t;
                e.didViewUpdate && this._updateBatchableMesh(e), r._batcher.updateElement(r)
            } else if (e.didViewUpdate) {
                let {
                    shader: r
                } = t;
                r.updateUniforms(e.width, e.height, e._tileTransform.matrix, e.anchor.x, e.anchor.y, e.texture)
            }
        }
        _getTilingSpriteData(e) {
            return e._gpuData[this._renderer.uid] || this._initTilingSpriteData(e)
        }
        _initTilingSpriteData(e) {
            let t = new e7;
            return t.renderable = e, e._gpuData[this._renderer.uid] = t, t
        }
        _updateBatchableMesh(e) {
            var t, r;
            let i, a, n, s, o, l, u, d, {
                    geometry: h
                } = this._getTilingSpriteData(e),
                c = e.texture.source.style;
            "repeat" !== c.addressMode && (c.addressMode = "repeat", c.update()), t = h.uvs, a = (i = e.texture).frame.width, n = i.frame.height, s = 0, o = 0, e.applyAnchorToTexture && (s = e.anchor.x, o = e.anchor.y), t[0] = t[6] = -s, t[2] = t[4] = 1 - s, t[1] = t[3] = -o, t[5] = t[7] = 1 - o, (l = _.Matrix.shared).copyFrom(e._tileTransform.matrix), l.tx /= e.width, l.ty /= e.height, l.invert(), l.scale(e.width / a, e.height / n),
                function(e, t, r, i) {
                    let a = 0,
                        n = e.length / 2,
                        s = i.a,
                        o = i.b,
                        l = i.c,
                        u = i.d,
                        d = i.tx,
                        h = i.ty;
                    for (r *= 2; a < n;) {
                        let t = e[r],
                            i = e[r + 1];
                        e[r] = s * t + l * i + d, e[r + 1] = o * t + u * i + h, r += 2, a++
                    }
                }(t, 0, 0, l), r = h.positions, u = e.anchor.x, d = e.anchor.y, r[0] = -u * e.width, r[1] = -d * e.height, r[2] = (1 - u) * e.width, r[3] = -d * e.height, r[4] = (1 - u) * e.width, r[5] = (1 - d) * e.height, r[6] = -u * e.width, r[7] = (1 - d) * e.height
        }
        destroy() {
            this._renderer = null
        }
        _updateCanBatch(e) {
            let t = this._getTilingSpriteData(e),
                r = e.texture,
                i = !0;
            return this._renderer.type === eO.RendererType.WEBGL && (i = this._renderer.context.supports.nonPowOf2wrapping), t.canBatch = r.textureMatrix.isSimple && (i || r.source.isPowerOfTwo), t.canBatch
        }
    }
    te.extension = {
        type: [s.ExtensionType.WebGLPipes, s.ExtensionType.WebGPUPipes, s.ExtensionType.CanvasPipes],
        name: "tilingSprite"
    }, s.extensions.add(te), e.s([], 422230);
    let tt = class e extends e1 {
        constructor(...e) {
            super({});
            let t = e[0] ? ? {};
            "number" == typeof t && ((0, J.deprecation)(J.v8_0_0, "PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead"), t = {
                width: t,
                height: e[1],
                verticesX: e[2],
                verticesY: e[3]
            }), this.build(t)
        }
        build(t) {
            t = { ...e.defaultOptions,
                ...t
            }, this.verticesX = this.verticesX ? ? t.verticesX, this.verticesY = this.verticesY ? ? t.verticesY, this.width = this.width ? ? t.width, this.height = this.height ? ? t.height;
            let r = this.verticesX * this.verticesY,
                i = [],
                a = [],
                n = [],
                s = this.verticesX - 1,
                o = this.verticesY - 1,
                l = this.width / s,
                u = this.height / o;
            for (let e = 0; e < r; e++) {
                let t = e % this.verticesX,
                    r = e / this.verticesX | 0;
                i.push(t * l, r * u), a.push(t / s, r / o)
            }
            let d = s * o;
            for (let e = 0; e < d; e++) {
                let t = e % s,
                    r = e / s | 0,
                    i = r * this.verticesX + t,
                    a = r * this.verticesX + t + 1,
                    o = (r + 1) * this.verticesX + t,
                    l = (r + 1) * this.verticesX + t + 1;
                n.push(i, a, o, a, l, o)
            }
            this.buffers[0].data = new Float32Array(i), this.buffers[1].data = new Float32Array(a), this.indexBuffer.data = new Uint32Array(n), this.buffers[0].update(), this.buffers[1].update(), this.indexBuffer.update()
        }
    };
    tt.defaultOptions = {
        width: 100,
        height: 100,
        verticesX: 10,
        verticesY: 10
    };
    let tr = tt,
        ti = class e extends tr {
            constructor(t = {}) {
                t = { ...e.defaultOptions,
                    ...t
                }, super({
                    width: t.width,
                    height: t.height,
                    verticesX: 4,
                    verticesY: 4
                }), this.update(t)
            }
            update(e) {
                this.width = e.width ? ? this.width, this.height = e.height ? ? this.height, this._originalWidth = e.originalWidth ? ? this._originalWidth, this._originalHeight = e.originalHeight ? ? this._originalHeight, this._leftWidth = e.leftWidth ? ? this._leftWidth, this._rightWidth = e.rightWidth ? ? this._rightWidth, this._topHeight = e.topHeight ? ? this._topHeight, this._bottomHeight = e.bottomHeight ? ? this._bottomHeight, this._anchorX = e.anchor ? .x, this._anchorY = e.anchor ? .y, this.updateUvs(), this.updatePositions()
            }
            updatePositions() {
                let e = this.positions,
                    {
                        width: t,
                        height: r,
                        _leftWidth: i,
                        _rightWidth: a,
                        _topHeight: n,
                        _bottomHeight: s,
                        _anchorX: o,
                        _anchorY: l
                    } = this,
                    u = i + a,
                    d = n + s,
                    h = Math.min(t > u ? 1 : t / u, r > d ? 1 : r / d),
                    c = o * t,
                    p = l * r;
                e[0] = e[8] = e[16] = e[24] = -c, e[2] = e[10] = e[18] = e[26] = i * h - c, e[4] = e[12] = e[20] = e[28] = t - a * h - c, e[6] = e[14] = e[22] = e[30] = t - c, e[1] = e[3] = e[5] = e[7] = -p, e[9] = e[11] = e[13] = e[15] = n * h - p, e[17] = e[19] = e[21] = e[23] = r - s * h - p, e[25] = e[27] = e[29] = e[31] = r - p, this.getBuffer("aPosition").update()
            }
            updateUvs() {
                let e = this.uvs;
                e[0] = e[8] = e[16] = e[24] = 0, e[1] = e[3] = e[5] = e[7] = 0, e[6] = e[14] = e[22] = e[30] = 1, e[25] = e[27] = e[29] = e[31] = 1;
                let t = 1 / this._originalWidth,
                    r = 1 / this._originalHeight;
                e[2] = e[10] = e[18] = e[26] = t * this._leftWidth, e[9] = e[11] = e[13] = e[15] = r * this._topHeight, e[4] = e[12] = e[20] = e[28] = 1 - t * this._rightWidth, e[17] = e[19] = e[21] = e[23] = 1 - r * this._bottomHeight, this.getBuffer("aUV").update()
            }
        };
    ti.defaultOptions = {
        width: 100,
        height: 100,
        leftWidth: 10,
        topHeight: 10,
        rightWidth: 10,
        bottomHeight: 10,
        originalWidth: 100,
        originalHeight: 100
    };
    class ta extends v {
        constructor() {
            super(), this.geometry = new ti
        }
        destroy() {
            this.geometry.destroy()
        }
    }
    class tn {
        constructor(e) {
            this._renderer = e
        }
        addRenderable(e, t) {
            let r = this._getGpuSprite(e);
            e.didViewUpdate && this._updateBatchableSprite(e, r), this._renderer.renderPipes.batch.addToBatch(r, t)
        }
        updateRenderable(e) {
            let t = this._getGpuSprite(e);
            e.didViewUpdate && this._updateBatchableSprite(e, t), t._batcher.updateElement(t)
        }
        validateRenderable(e) {
            let t = this._getGpuSprite(e);
            return !t._batcher.checkAndUpdateTexture(t, e._texture)
        }
        _updateBatchableSprite(e, t) {
            t.geometry.update(e), t.setTexture(e._texture)
        }
        _getGpuSprite(e) {
            return e._gpuData[this._renderer.uid] || this._initGPUSprite(e)
        }
        _initGPUSprite(e) {
            let t = e._gpuData[this._renderer.uid] = new ta;
            return t.renderable = e, t.transform = e.groupTransform, t.texture = e._texture, t.roundPixels = this._renderer._roundPixels | e._roundPixels, e.didViewUpdate || this._updateBatchableSprite(e, t), t
        }
        destroy() {
            this._renderer = null
        }
    }
    tn.extension = {
        type: [s.ExtensionType.WebGLPipes, s.ExtensionType.WebGPUPipes, s.ExtensionType.CanvasPipes],
        name: "nineSliceSprite"
    }, s.extensions.add(tn), e.s([], 545037);
    class ts {
        constructor(e) {
            this._renderer = e
        }
        push(e, t, r) {
            this._renderer.renderPipes.batch.break(r), r.add({
                renderPipeId: "filter",
                canBundle: !1,
                action: "pushFilter",
                container: t,
                filterEffect: e
            })
        }
        pop(e, t, r) {
            this._renderer.renderPipes.batch.break(r), r.add({
                renderPipeId: "filter",
                action: "popFilter",
                canBundle: !1
            })
        }
        execute(e) {
            "pushFilter" === e.action ? this._renderer.filter.push(e) : "popFilter" === e.action && this._renderer.filter.pop()
        }
        destroy() {
            this._renderer = null
        }
    }
    ts.extension = {
        type: [s.ExtensionType.WebGLPipes, s.ExtensionType.WebGPUPipes, s.ExtensionType.CanvasPipes],
        name: "filter"
    };
    let to = new B.Geometry({
        attributes: {
            aPosition: {
                buffer: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
                format: "float32x2",
                stride: 8,
                offset: 0
            }
        },
        indexBuffer: new Uint32Array([0, 1, 2, 0, 2, 3])
    });
    class tl {
        constructor() {
            this.skip = !1, this.inputTexture = null, this.backTexture = null, this.filters = null, this.bounds = new ee.Bounds, this.container = null, this.blendRequired = !1, this.outputRenderSurface = null, this.globalFrame = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            }
        }
    }
    class tu {
        constructor(e) {
            this._filterStackIndex = 0, this._filterStack = [], this._filterGlobalUniforms = new T.UniformGroup({
                uInputSize: {
                    value: new Float32Array(4),
                    type: "vec4<f32>"
                },
                uInputPixel: {
                    value: new Float32Array(4),
                    type: "vec4<f32>"
                },
                uInputClamp: {
                    value: new Float32Array(4),
                    type: "vec4<f32>"
                },
                uOutputFrame: {
                    value: new Float32Array(4),
                    type: "vec4<f32>"
                },
                uGlobalFrame: {
                    value: new Float32Array(4),
                    type: "vec4<f32>"
                },
                uOutputTexture: {
                    value: new Float32Array(4),
                    type: "vec4<f32>"
                }
            }), this._globalFilterBindGroup = new y.BindGroup({}), this.renderer = e
        }
        get activeBackTexture() {
            return this._activeFilterData ? .backTexture
        }
        push(e) {
            let t = this.renderer,
                r = e.filterEffect.filters,
                i = this._pushFilterData();
            i.skip = !1, i.filters = r, i.container = e.container, i.outputRenderSurface = t.renderTarget.renderSurface;
            let a = t.renderTarget.renderTarget.colorTexture.source,
                n = a.resolution,
                s = a.antialias;
            if (0 === r.length) {
                i.skip = !0;
                return
            }
            let o = i.bounds;
            if (this._calculateFilterArea(e, o), this._calculateFilterBounds(i, t.renderTarget.rootViewPort, s, n, 1), i.skip) return;
            let l = this._getPreviousFilterData(),
                u = this._findFilterResolution(n),
                d = 0,
                h = 0;
            l && (d = l.bounds.minX, h = l.bounds.minY), this._calculateGlobalFrame(i, d, h, u, a.width, a.height), this._setupFilterTextures(i, o, t, l)
        }
        generateFilteredTexture({
            texture: e,
            filters: t
        }) {
            let r = this._pushFilterData();
            this._activeFilterData = r, r.skip = !1, r.filters = t;
            let i = e.source,
                a = i.resolution,
                n = i.antialias;
            if (0 === t.length) return r.skip = !0, e;
            let s = r.bounds;
            if (s.addRect(e.frame), this._calculateFilterBounds(r, s.rectangle, n, a, 0), r.skip) return e;
            this._calculateGlobalFrame(r, 0, 0, a, i.width, i.height), r.outputRenderSurface = Q.TexturePool.getOptimalTexture(s.width, s.height, r.resolution, r.antialias), r.backTexture = O.Texture.EMPTY, r.inputTexture = e, this.renderer.renderTarget.finishRenderPass(), this._applyFiltersToTexture(r, !0);
            let o = r.outputRenderSurface;
            return o.source.alphaMode = "premultiplied-alpha", o
        }
        pop() {
            let e = this.renderer,
                t = this._popFilterData();
            t.skip || (e.globalUniforms.pop(), e.renderTarget.finishRenderPass(), this._activeFilterData = t, this._applyFiltersToTexture(t, !1), t.blendRequired && Q.TexturePool.returnTexture(t.backTexture), Q.TexturePool.returnTexture(t.inputTexture))
        }
        getBackTexture(e, t, r) {
            let i = e.colorTexture.source._resolution,
                a = Q.TexturePool.getOptimalTexture(t.width, t.height, i, !1),
                n = t.minX,
                s = t.minY;
            r && (n -= r.minX, s -= r.minY), n = Math.floor(n * i), s = Math.floor(s * i);
            let o = Math.ceil(t.width * i),
                l = Math.ceil(t.height * i);
            return this.renderer.renderTarget.copyToTexture(e, a, {
                x: n,
                y: s
            }, {
                width: o,
                height: l
            }, {
                x: 0,
                y: 0
            }), a
        }
        applyFilter(e, t, r, i) {
            let a = this.renderer,
                n = this._activeFilterData,
                s = n.outputRenderSurface === r,
                o = a.renderTarget.rootRenderTarget.colorTexture.source._resolution,
                l = this._findFilterResolution(o),
                u = 0,
                d = 0;
            if (s) {
                let e = this._findPreviousFilterOffset();
                u = e.x, d = e.y
            }
            this._updateFilterUniforms(t, r, n, u, d, l, s, i), this._setupBindGroupsAndRender(e, t, a)
        }
        calculateSpriteMatrix(e, t) {
            let r = this._activeFilterData,
                i = e.set(r.inputTexture._source.width, 0, 0, r.inputTexture._source.height, r.bounds.minX, r.bounds.minY),
                a = t.worldTransform.copyTo(_.Matrix.shared),
                n = t.renderGroup || t.parentRenderGroup;
            return n && n.cacheToLocalTransform && a.prepend(n.cacheToLocalTransform), a.invert(), i.prepend(a), i.scale(1 / t.texture.frame.width, 1 / t.texture.frame.height), i.translate(t.anchor.x, t.anchor.y), i
        }
        destroy() {}
        _setupBindGroupsAndRender(e, t, r) {
            if (r.renderPipes.uniformBatch) {
                let e = r.renderPipes.uniformBatch.getUboResource(this._filterGlobalUniforms);
                this._globalFilterBindGroup.setResource(e, 0)
            } else this._globalFilterBindGroup.setResource(this._filterGlobalUniforms, 0);
            this._globalFilterBindGroup.setResource(t.source, 1), this._globalFilterBindGroup.setResource(t.source.style, 2), e.groups[0] = this._globalFilterBindGroup, r.encoder.draw({
                geometry: to,
                shader: e,
                state: e._state,
                topology: "triangle-list"
            }), r.type === eO.RendererType.WEBGL && r.renderTarget.finishRenderPass()
        }
        _setupFilterTextures(e, t, r, i) {
            if (e.backTexture = O.Texture.EMPTY, e.blendRequired) {
                r.renderTarget.finishRenderPass();
                let a = r.renderTarget.getRenderTarget(e.outputRenderSurface);
                e.backTexture = this.getBackTexture(a, t, i ? .bounds)
            }
            e.inputTexture = Q.TexturePool.getOptimalTexture(t.width, t.height, e.resolution, e.antialias), r.renderTarget.bind(e.inputTexture, !0), r.globalUniforms.push({
                offset: t
            })
        }
        _calculateGlobalFrame(e, t, r, i, a, n) {
            let s = e.globalFrame;
            s.x = t * i, s.y = r * i, s.width = a * i, s.height = n * i
        }
        _updateFilterUniforms(e, t, r, i, a, n, s, o) {
            let l = this._filterGlobalUniforms.uniforms,
                u = l.uOutputFrame,
                d = l.uInputSize,
                h = l.uInputPixel,
                c = l.uInputClamp,
                p = l.uGlobalFrame,
                f = l.uOutputTexture;
            s ? (u[0] = r.bounds.minX - i, u[1] = r.bounds.minY - a) : (u[0] = 0, u[1] = 0), u[2] = e.frame.width, u[3] = e.frame.height, d[0] = e.source.width, d[1] = e.source.height, d[2] = 1 / d[0], d[3] = 1 / d[1], h[0] = e.source.pixelWidth, h[1] = e.source.pixelHeight, h[2] = 1 / h[0], h[3] = 1 / h[1], c[0] = .5 * h[2], c[1] = .5 * h[3], c[2] = e.frame.width * d[2] - .5 * h[2], c[3] = e.frame.height * d[3] - .5 * h[3];
            let g = this.renderer.renderTarget.rootRenderTarget.colorTexture;
            p[0] = i * n, p[1] = a * n, p[2] = g.source.width * n, p[3] = g.source.height * n, t instanceof O.Texture && (t.source.resource = null);
            let m = this.renderer.renderTarget.getRenderTarget(t);
            this.renderer.renderTarget.bind(t, !!o), t instanceof O.Texture ? (f[0] = t.frame.width, f[1] = t.frame.height) : (f[0] = m.width, f[1] = m.height), f[2] = m.isRoot ? -1 : 1, this._filterGlobalUniforms.update()
        }
        _findFilterResolution(e) {
            let t = this._filterStackIndex - 1;
            for (; t > 0 && this._filterStack[t].skip;) --t;
            return t > 0 && this._filterStack[t].inputTexture ? this._filterStack[t].inputTexture.source._resolution : e
        }
        _findPreviousFilterOffset() {
            let e = 0,
                t = 0,
                r = this._filterStackIndex;
            for (; r > 0;) {
                r--;
                let i = this._filterStack[r];
                if (!i.skip) {
                    e = i.bounds.minX, t = i.bounds.minY;
                    break
                }
            }
            return {
                x: e,
                y: t
            }
        }
        _calculateFilterArea(e, t) {
            if (e.renderables ? ! function(e, t) {
                    t.clear();
                    let r = t.matrix;
                    for (let r = 0; r < e.length; r++) {
                        let i = e[r];
                        i.globalDisplayStatus < 7 || (t.matrix = i.worldTransform, t.addBounds(i.bounds))
                    }
                    t.matrix = r
                }(e.renderables, t) : e.filterEffect.filterArea ? (t.clear(), t.addRect(e.filterEffect.filterArea), t.applyMatrix(e.container.worldTransform)) : e.container.getFastGlobalBounds(!0, t), e.container) {
                let r = (e.container.renderGroup || e.container.parentRenderGroup).cacheToLocalTransform;
                r && t.applyMatrix(r)
            }
        }
        _applyFiltersToTexture(e, t) {
            let r = e.inputTexture,
                i = e.bounds,
                a = e.filters;
            if (this._globalFilterBindGroup.setResource(r.source.style, 2), this._globalFilterBindGroup.setResource(e.backTexture.source, 3), 1 === a.length) a[0].apply(this, r, e.outputRenderSurface, t);
            else {
                let r = e.inputTexture,
                    n = Q.TexturePool.getOptimalTexture(i.width, i.height, r.source._resolution, !1),
                    s = n,
                    o = 0;
                for (o = 0; o < a.length - 1; ++o) {
                    a[o].apply(this, r, s, !0);
                    let e = r;
                    r = s, s = e
                }
                a[o].apply(this, r, e.outputRenderSurface, t), Q.TexturePool.returnTexture(n)
            }
        }
        _calculateFilterBounds(e, t, r, i, a) {
            let n = this.renderer,
                s = e.bounds,
                o = e.filters,
                l = 1 / 0,
                u = 0,
                d = !0,
                h = !1,
                c = !1,
                p = !0;
            for (let e = 0; e < o.length; e++) {
                let t = o[e];
                if (l = Math.min(l, "inherit" === t.resolution ? i : t.resolution), u += t.padding, "off" === t.antialias ? d = !1 : "inherit" === t.antialias && d && (d = r), t.clipToViewport || (p = !1), !(t.compatibleRenderers & n.type)) {
                    c = !1;
                    break
                }
                if (t.blendRequired && !(n.backBuffer ? .useBackBuffer ? ? !0)) {
                    (0, eV.warn)("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."), c = !1;
                    break
                }
                c = t.enabled || c, h || (h = t.blendRequired)
            }
            if (!c || (p && s.fitBounds(0, t.width / i, 0, t.height / i), s.scale(l).ceil().scale(1 / l).pad((0 | u) * a), !s.isPositive)) {
                e.skip = !0;
                return
            }
            e.antialias = d, e.resolution = l, e.blendRequired = h
        }
        _popFilterData() {
            return this._filterStackIndex--, this._filterStack[this._filterStackIndex]
        }
        _getPreviousFilterData() {
            let e, t = this._filterStackIndex - 1;
            for (; t > 1 && (t--, (e = this._filterStack[t]).skip););
            return e
        }
        _pushFilterData() {
            let e = this._filterStack[this._filterStackIndex];
            return e || (e = this._filterStack[this._filterStackIndex] = new tl), this._filterStackIndex++, e
        }
    }
    tu.extension = {
        type: [s.ExtensionType.WebGLSystem, s.ExtensionType.WebGPUSystem],
        name: "filter"
    }, s.extensions.add(tu), s.extensions.add(ts), e.s([], 422706)
}]);

//# debugId=b262f754-27bf-998e-b8d9-627e6509c729
//# sourceMappingURL=efdec4799f27acd8.js.map