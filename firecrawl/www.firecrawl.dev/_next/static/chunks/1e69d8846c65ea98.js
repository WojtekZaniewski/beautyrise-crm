;
! function() {
    try {
        var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {},
            n = (new e.Error).stack;
        n && ((e._debugIds || (e._debugIds = {}))[n] = "b9e4b126-2dff-7912-a01d-91a01e23c75e")
    } catch (e) {}
}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 89800, t => {
    "use strict";
    let e = {
            name: "local-uniform-bit",
            vertex: {
                header: `

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
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
            }
        },
        o = { ...e,
            vertex: { ...e.vertex,
                header: e.vertex.header.replace("group(1)", "group(2)")
            }
        },
        s = {
            name: "local-uniform-bit",
            vertex: {
                header: `

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,
                main: `
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `,
                end: `
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `
            }
        };
    t.s(["localUniformBit", () => e, "localUniformBitGl", () => s, "localUniformBitGroup2", () => o])
}, 536164, t => {
    "use strict";
    let e = {
            normal: 0,
            add: 1,
            multiply: 2,
            screen: 3,
            overlay: 4,
            erase: 5,
            "normal-npm": 6,
            "add-npm": 7,
            "screen-npm": 8,
            min: 9,
            max: 10
        },
        o = class t {
            constructor() {
                this.data = 0, this.blendMode = "normal", this.polygonOffset = 0, this.blend = !0, this.depthMask = !0
            }
            get blend() {
                return !!(1 & this.data)
            }
            set blend(t) {
                !!(1 & this.data) !== t && (this.data ^= 1)
            }
            get offsets() {
                return !!(2 & this.data)
            }
            set offsets(t) {
                !!(2 & this.data) !== t && (this.data ^= 2)
            }
            set cullMode(t) {
                if ("none" === t) {
                    this.culling = !1;
                    return
                }
                this.culling = !0, this.clockwiseFrontFace = "front" === t
            }
            get cullMode() {
                return this.culling ? this.clockwiseFrontFace ? "front" : "back" : "none"
            }
            get culling() {
                return !!(4 & this.data)
            }
            set culling(t) {
                !!(4 & this.data) !== t && (this.data ^= 4)
            }
            get depthTest() {
                return !!(8 & this.data)
            }
            set depthTest(t) {
                !!(8 & this.data) !== t && (this.data ^= 8)
            }
            get depthMask() {
                return !!(32 & this.data)
            }
            set depthMask(t) {
                !!(32 & this.data) !== t && (this.data ^= 32)
            }
            get clockwiseFrontFace() {
                return !!(16 & this.data)
            }
            set clockwiseFrontFace(t) {
                !!(16 & this.data) !== t && (this.data ^= 16)
            }
            get blendMode() {
                return this._blendMode
            }
            set blendMode(t) {
                this.blend = "none" !== t, this._blendMode = t, this._blendModeId = e[t] || 0
            }
            get polygonOffset() {
                return this._polygonOffset
            }
            set polygonOffset(t) {
                this.offsets = !!t, this._polygonOffset = t
            }
            toString() {
                return `[pixi.js/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`
            }
            static for2d() {
                let e = new t;
                return e.depthTest = !1, e.blend = !0, e
            }
        };
    o.default2d = o.for2d(), t.s(["State", () => o])
}, 878995, t => {
    "use strict";
    class e {
        constructor() {
            this.batcherName = "default", this.topology = "triangle-list", this.attributeSize = 4, this.indexSize = 6, this.packAsQuad = !0, this.roundPixels = 0, this._attributeStart = 0, this._batcher = null, this._batch = null
        }
        get blendMode() {
            return this.renderable.groupBlendMode
        }
        get color() {
            return this.renderable.groupColorAlpha
        }
        reset() {
            this.renderable = null, this.texture = null, this._batcher = null, this._batch = null, this.bounds = null
        }
        destroy() {}
    }
    t.s(["BatchableSprite", () => e])
}, 854908, t => {
    "use strict";

    function e(t, e, o) {
        let s = (t >> 24 & 255) / 255;
        e[o++] = (255 & t) / 255 * s, e[o++] = (t >> 8 & 255) / 255 * s, e[o++] = (t >> 16 & 255) / 255 * s, e[o++] = s
    }
    t.s(["color32BitToUniform", () => e])
}]);

//# debugId=b9e4b126-2dff-7912-a01d-91a01e23c75e
//# sourceMappingURL=82e3f3bd578916f2.js.map