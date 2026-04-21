;
! function() {
    try {
        var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {},
            n = (new e.Error).stack;
        n && ((e._debugIds || (e._debugIds = {}))[n] = "724b214e-e21b-6d49-1588-ba58039c5657")
    } catch (e) {}
}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 43486, e => {
    "use strict";
    e.s(["default", 0, (e, t, r = .1) => {
        if (!e) return () => {};
        let a = new IntersectionObserver(([e]) => {
            e.isIntersecting && (t(), a.disconnect())
        }, {
            threshold: r
        });
        return a.observe(e), () => {
            a.disconnect()
        }
    }])
}, 830829, e => {
    "use strict";
    var t = e.i(253719);

    function r() {
        return (0, t.jsxs)("h1", {
            className: "text-title-h1 mx-auto text-center [&_span]:text-heat-100 mb-12 lg:mb-16",
            children: ["Power AI agents with ", (0, t.jsx)("br", {
                className: "lg-max:hidden"
            }), (0, t.jsx)("span", {
                children: "clean web data"
            })]
        })
    }
    e.s(["default", () => r, "encryptText", 0, (e, t, r) => {
        let a = {
                randomizeChance: .7,
                ...r
            },
            n = "a-zA-Z0-9*=?!",
            i = ["<br class='lg-max:hidden'>", "<span>", "</span>"],
            s = Math.floor(e.length * (1 - t)),
            l = "",
            o = 1;
        for (let t = 0; t < e.length; t++) {
            let r = e[t],
                c = !1;
            for (let r of i)
                if (e.substring(t, t + r.length) === r) {
                    l += r, t += r.length - 1, c = !0;
                    break
                }
            if (!c) {
                if (" " === r) {
                    l += r, o++;
                    continue
                }
                if (a.reversed ? o < s : e.length - o < s)
                    if (Math.random() < a.randomizeChance) l += r;
                    else {
                        let e = Math.floor(Math.random() * n.length);
                        l += n[e]
                    }
                else l += r;
                o++
            }
        }
        return l
    }])
}, 247612, e => {
    "use strict";
    var t = e.i(730592),
        r = e.i(830829);

    function a(e, n = 20, i = 1, s = !0) {
        let [l, o] = (0, t.useState)(e), c = (0, t.useRef)(l);
        return (0, t.useEffect)(() => {
            let t;
            if (e === c.current) return;
            let a = 0;
            o(c.current);
            let l = () => {
                a += i;
                let d = c.current.split("\n"),
                    u = e.split("\n"),
                    f = s ? Math.max(10, d.length, u.length) : Math.max(d.length, u.length);
                for (; d.length < f;) d.push("");
                for (; u.length < f;) u.push("");
                let m = d.map((e, t) => {
                    if (e === u[t]) return e;
                    let n = Math.floor(e.length * (a / 30));
                    return (u[t] ? .slice(0, Math.floor(u[t].length * (a / 30))) ? ? "") + (0, r.encryptText)(e.slice(n), 0, {
                        randomizeChance: .5
                    })
                });
                o((s ? m : m.filter((e, t, r) => "" !== e || "" !== r[t - 1])).join("\n")), a < 30 ? t = window.setTimeout(l, n) : (o(e), c.current = e)
            };
            return l(), () => {
                window.clearTimeout(t), c.current = e
            }
        }, [e, n, i, s]), l
    }
    e.s(["default", () => a])
}, 606309, e => {
    "use strict";
    var t = e.i(730592),
        r = e.i(296809);

    function a({
        enabled: e,
        text: a,
        ref: n,
        interval: i = 200
    }) {
        let [s, l] = (0, t.useState)(a + "...");
        return (0, t.useEffect)(() => {
            if (!e) return;
            let t = 2,
                s = (0, r.setIntervalOnVisible)({
                    element: n.current,
                    callback: () => {
                        t += 1, l(a + ".".repeat(t % 4))
                    },
                    interval: i
                });
            return () => {
                s ? .()
            }
        }, [e, a, n]), s
    }
    e.s(["default", () => a])
}, 628975, e => {
    "use strict";
    var t = e.i(253719),
        r = e.i(131547),
        a = e.i(323576),
        n = e.i(420851);

    function i({
        children: e,
        title: i,
        titleClassName: s,
        titleShadow: l = !0,
        badgeContent: o,
        badgeClassName: c,
        description: d,
        descriptionClassName: u,
        containerClassName: f,
        action: m,
        smallerHeader: h = !1,
        ...p
    }) {
        return (0, t.jsxs)("div", { ...p,
            className: (0, n.cn)(h ? "relative py-64 lg:py-88 overflow-clip z-[1]" : "relative py-88 lg:py-143 overflow-clip z-[1]", p.className),
            children: [(0, t.jsx)(a.default, {
                allSides: !0
            }), (0, t.jsx)("div", {
                className: "h-1 bg-border-faint bottom-0 left-0 w-full absolute"
            }), (0, t.jsxs)("div", {
                className: (0, n.cn)("relative", f),
                children: [o && (0, t.jsx)(r.default, {
                    className: (0, n.cn)("mx-auto px-12 pt-16", c),
                    children: o
                }), (0, t.jsxs)("div", {
                    children: [(0, t.jsxs)("h2", {
                        className: (0, n.cn)("lg:w-max relative mx-auto text-accent-black text-title-h2 pb-8 pt-12 px-20 text-center section-head-title", s),
                        children: [l && (0, t.jsx)("div", {
                            className: "overlay -z-[1] p-[inherit] section-head-shadow",
                            "aria-hidden": !0,
                            children: i
                        }), i]
                    }), d && (0, t.jsxs)("div", {
                        className: (0, n.cn)("section-head-title max-w-369 px-20 py-8 relative w-full mx-auto !text-black-alpha-72 text-body-large text-center mb-32 last:mb-0", u),
                        children: [d, (0, t.jsx)("div", {
                            className: "overlay -z-[1] p-[inherit] section-head-shadow",
                            "aria-hidden": !0,
                            children: d
                        })]
                    }), m]
                })]
            }), e]
        })
    }
    e.s(["default", () => i])
}, 466827, e => {
    "use strict";
    var t = e.i(730592);

    function r() {
        let [e, r] = (0, t.useState)({
            isSmallMobile: !1,
            isMobile: !1,
            isTablet: !1,
            isLaptop: !1,
            isDesktop: !1
        });
        return (0, t.useEffect)(() => {
            let e = () => {
                let e = window.innerWidth;
                r({
                    isSmallMobile: e < 390,
                    isMobile: e >= 390 && e < 576,
                    isTablet: e >= 576 && e < 768,
                    isLaptop: e >= 768 && e < 996,
                    isDesktop: e >= 996
                })
            };
            return e(), window.addEventListener("resize", e), () => window.removeEventListener("resize", e)
        }, []), e
    }
    e.s(["default", () => r])
}, 143182, e => {
    "use strict";
    var t = e.i(253719),
        r = e.i(154712),
        a = e.i(730592),
        n = e.i(420851),
        i = e.i(466827);

    function s({
        children: e,
        reverse: s,
        className: l
    }) {
        let {
            isMobile: o
        } = (0, i.default)(), c = (0, a.useRef)(null);
        return (0, a.useEffect)(() => {
            let e = c.current ? .animate({
                transform: s ? ["translateX(-50%)", "translateX(0)"] : ["translateX(0)", "translateX(-50%)"]
            }, {
                duration: o ? 2e4 : 45e3,
                iterations: 1 / 0
            });
            c.current ? .addEventListener("mouseenter", () => {
                (0, r.animate)(e ? .playbackRate ? ? 1, 0, {
                    duration: .4,
                    onUpdate: t => {
                        e.playbackRate = t
                    }
                })
            }), c.current ? .addEventListener("mouseleave", () => {
                (0, r.animate)(e ? .playbackRate ? ? 0, 1, {
                    duration: .4,
                    onUpdate: t => {
                        e.playbackRate = t
                    }
                })
            });
            let t = new IntersectionObserver(r => {
                r.forEach(t => {
                    t.isIntersecting ? e ? .play() : e ? .pause()
                }), t.observe(c.current)
            });
            return () => {
                e ? .cancel(), t.disconnect()
            }
        }, [o]), (0, t.jsxs)("div", {
            className: (0, n.cn)("flex w-max", l),
            ref: c,
            children: [e, e]
        })
    }
    e.s(["default", () => s])
}, 591302, e => {
    "use strict";
    var t = e.i(253719),
        r = e.i(730592),
        a = e.i(420851),
        n = e.i(825489),
        i = e.i(296809),
        s = e.i(728675);

    function l(e) {
        let l = (0, r.useRef)(null),
            o = (0, r.useRef)(null);
        return (0, r.useEffect)(() => {
            if (!l.current) return;
            let {
                ctx: e,
                textWidth: t,
                textHeight: r
            } = (0, n.setupAsciiCanvas)(l.current, s.default[0], 8, 10, "Roboto Mono, monospace");
            (0, n.renderAsciiFrame)(e, s.default[0], t, r, 8, 10, "Roboto Mono, monospace", "rgba(0, 0, 0, 0.2)");
            let a = 0,
                c = (0, i.setIntervalOnVisible)({
                    element: o.current,
                    callback: () => {
                        ++a >= s.default.length && (a = 0), (0, n.renderAsciiFrame)(e, s.default[a], t, r, 8, 10, "Roboto Mono, monospace", "rgba(0, 0, 0, 0.2)")
                    },
                    interval: 80
                });
            return () => c ? .()
        }, []), (0, t.jsx)(t.Fragment, {
            children: (0, t.jsx)("div", {
                className: "absolute inset-10 -z-[10] overflow-clip",
                children: (0, t.jsx)("div", {
                    ref: o,
                    ...e,
                    className: (0, a.cn)("w-[1110px] left-0 ch-510 absolute pointer-events-none select-none", e.className),
                    children: (0, t.jsx)("canvas", {
                        ref: l,
                        className: "fc-decoration"
                    })
                })
            })
        })
    }
    e.s(["default", () => l])
}, 80140, e => {
    "use strict";
    var t = e.i(253719),
        r = e.i(534026),
        a = e.i(730592),
        n = e.i(420851);

    function i({
        children: e,
        reverse: i,
        className: s,
        duration: l = 8e4
    }) {
        let o = (0, a.useRef)(null),
            [c, d] = (0, a.useState)(0);
        return (0, a.useEffect)(() => {
            let e, t = o.current;
            if (!t) return;
            let r = 0,
                a = 0,
                n = () => {
                    let e = Math.floor(t.scrollWidth / 2);
                    e > 0 && d(e)
                };
            return r = requestAnimationFrame(() => {
                a = requestAnimationFrame(n)
            }), "u" > typeof ResizeObserver && (e = new ResizeObserver(n)).observe(t), () => {
                cancelAnimationFrame(r), cancelAnimationFrame(a), e ? .disconnect()
            }
        }, [e]), (0, t.jsxs)(r.motion.div, {
            className: (0, n.cn)("flex w-max transform-gpu will-change-transform", s),
            ref: o,
            animate: c ? {
                x: i ? [-c, 0] : [0, -c]
            } : void 0,
            transition: {
                duration: l / 1e3,
                ease: "linear",
                repeat: 1 / 0
            },
            children: [e, e]
        })
    }
    e.s(["default", () => i])
}, 162474, e => {
    "use strict";
    var t = e.i(253719),
        r = e.i(323576);

    function a({
        id: e,
        index: a,
        max: n,
        title: i
    }) {
        return (0, t.jsxs)("div", {
            id: e,
            className: "-mt-1 pointer-events-none select-none relative",
            children: [(0, t.jsx)(r.Connector, {
                className: "absolute right-[-10.5px] -top-10"
            }), (0, t.jsx)(r.Connector, {
                className: "absolute left-[-10.5px] -top-10"
            }), (0, t.jsx)(r.Connector, {
                className: "absolute right-[-10.5px] -bottom-10"
            }), (0, t.jsx)(r.Connector, {
                className: "absolute left-[-10.5px] -bottom-10"
            }), (0, t.jsxs)("div", {
                className: "h-92 lg:h-140 relative",
                children: [(0, t.jsx)("div", {
                    className: "h-1 bottom-0 absolute left-0 w-full bg-border-faint"
                }), (0, t.jsx)("div", {
                    className: "h-1 top-0 absolute w-screen left-[calc(50%-50vw)] bg-border-faint"
                })]
            }), (0, t.jsxs)("div", {
                className: "container relative grid lg:grid-cols-2 -mt-1",
                children: [(0, t.jsx)("div", {
                    className: "h-1 bottom-0 absolute w-screen left-[calc(50%-50vw)] bg-border-faint"
                }), (0, t.jsx)(r.ConnectorToRight, {
                    className: "absolute left-0 -top-10"
                }), (0, t.jsx)(r.ConnectorToLeft, {
                    className: "absolute right-0 -top-10"
                }), (0, t.jsxs)("div", {
                    className: "flex gap-40 py-24 lg:py-45 relative",
                    children: [(0, t.jsx)("div", {
                        className: "h-full w-1 right-0 top-0 bg-border-faint absolute lg-max:hidden"
                    }), (0, t.jsx)("div", {
                        className: "w-2 h-16 bg-heat-100"
                    }), (0, t.jsxs)("div", {
                        className: "flex gap-12 items-center !text-mono-x-small text-black-alpha-16 font-mono",
                        children: [(0, t.jsxs)("div", {
                            children: ["[ ", (0, t.jsx)("span", {
                                className: "text-heat-100",
                                children: a.toString().padStart(2, "0")
                            }), " /", " ", n.toString().padStart(2, "0"), " ]"]
                        }), (0, t.jsx)("div", {
                            className: "w-8 text-center",
                            children: "·"
                        }), (0, t.jsx)("div", {
                            className: "uppercase text-black-alpha-32",
                            children: i
                        })]
                    })]
                })]
            })]
        })
    }
    e.s(["default", () => a])
}, 377250, e => {
    "use strict";
    var t = e.i(253719),
        r = e.i(835272);
    let a = "/assets-original/";

    function n({
        src: e,
        raw: n,
        ...i
    }) {
        return n ? (0, t.jsx)("img", { ...i,
            alt: i.alt,
            decoding: "async",
            loading: "lazy",
            src: a + e + ".png"
        }) : (0, t.jsxs)("picture", {
            children: [r.default.configs.sort((e, t) => "avif" === e.extension && "avif" !== t.extension ? -1 : "avif" === t.extension && "avif" !== e.extension ? 1 : e.scale - t.scale).map(r => (0, t.jsx)("source", {
                srcSet: `/assets/${e}_q${r.quality}@${r.scale}x.${r.extension}`,
                type: `image/${r.extension}`
            }, `${r.extension}_q${r.quality}@${r.scale}x`)), (0, t.jsx)("img", { ...i,
                alt: i.alt,
                decoding: "async",
                loading: "lazy",
                src: `${a}${e}.png`
            })]
        })
    }
    e.s(["default", () => n])
}, 469187, e => {
    "use strict";
    var t = e.i(253719),
        r = e.i(377250);
    e.i(928448);
    var a = e.i(358794),
        n = e.i(80140),
        i = e.i(134841),
        s = e.i(730592);
    let l = {
        1: {
            name: "Shopify"
        },
        2: {
            name: "Alibaba"
        },
        3: {
            name: "Zapier",
            href: "/blog/how-zapier-uses-firecrawl-to-power-chatbots"
        },
        4: {
            name: "You.com"
        },
        22: {
            name: "Replit",
            href: "/blog/how-replit-uses-firecrawl-to-power-ai-agents"
        },
        5: {
            name: "PHMG"
        },
        6: {
            name: "Gamma",
            href: "/blog/how-gamma-supercharges-onboarding-with-firecrawl"
        },
        7: {
            name: "Canva"
        },
        8: {
            name: "Sprinklr"
        },
        9: {
            name: "Cognism"
        },
        10: {
            name: "Ada"
        },
        11: {
            name: "11x"
        },
        12: {
            name: "Lovable",
            href: "/blog/firecrawl-lovable-integration"
        },
        13: {
            name: "Botpress"
        },
        14: {
            name: "Aleph Alpha"
        },
        15: {
            name: "Sierra"
        },
        16: {
            name: "Apple"
        },
        17: {
            name: "DoorDash"
        },
        26: {
            name: "Aemon",
            href: "https://aemon.ai"
        }
    };

    function o({
        logoIndex: e
    }) {
        let a = l[e],
            n = !!a ? .href,
            s = (0, t.jsxs)("div", {
                className: `h-full aspect-[204/96] lg:aspect-[204/128] -ml-1 relative w-max${n?" group cursor-pointer":""}`,
                children: [(0, t.jsx)(r.default, {
                    alt: a ? .name ? ? `Logo ${e}`,
                    className: "absolute object-cover w-full h-full",
                    src: `logocloud/${e}`,
                    raw: !0,
                    loading: "eager",
                    decoding: "async"
                }), (0, t.jsx)("div", {
                    className: "overlay border-x border-border-faint"
                }), n && (0, t.jsxs)(t.Fragment, {
                    children: [(0, t.jsx)("div", {
                        className: "absolute inset-0 bg-heat-100/0 group-hover:bg-heat-100/[0.06] transition-colors duration-200"
                    }), (0, t.jsx)("div", {
                        className: "absolute bottom-0 left-0 right-0 h-2 bg-heat-100"
                    }), (0, t.jsxs)("div", {
                        className: "absolute bottom-6 right-6 flex items-center gap-3 whitespace-nowrap text-heat-100 text-[10px] leading-none font-medium pointer-events-none",
                        children: [(0, t.jsx)("span", {
                            className: "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200",
                            children: "Read story"
                        }), (0, t.jsx)("svg", {
                            width: "8",
                            height: "8",
                            viewBox: "0 0 8 8",
                            fill: "none",
                            className: "shrink-0",
                            children: (0, t.jsx)("path", {
                                d: "M1 7L7 1M7 1H2.5M7 1V5.5",
                                stroke: "currentColor",
                                strokeWidth: "1.25",
                                strokeLinecap: "round",
                                strokeLinejoin: "round"
                            })
                        })]
                    })]
                })]
            });
        return n ? (0, t.jsx)(i.default, {
            href: a.href,
            className: "contents",
            children: s
        }) : s
    }

    function c() {
        let [e, r] = (0, s.useState)(!1);
        return (0, s.useEffect)(() => {
            let e = () => {
                r(window.innerWidth < 996)
            };
            return e(), window.addEventListener("resize", e), () => window.removeEventListener("resize", e)
        }, []), (0, t.jsxs)("div", {
            className: "container relative -mt-1 lg:flex",
            "data-allow-motion": "true",
            children: [(0, t.jsx)("div", {
                className: "h-1 bottom-0 absolute left-0 w-full bg-border-faint"
            }), (0, t.jsxs)("div", {
                className: "p-16 lg-max:text-center lg:p-40 relative",
                children: [(0, t.jsx)(a.CurvyRect, {
                    className: "overlay",
                    allSides: !0
                }), (0, t.jsxs)("div", {
                    className: "text-body-large text-accent-black",
                    children: ["Trusted by", " ", (0, t.jsxs)("span", {
                        className: "contents text-label-large text-heat-100",
                        children: ["80,000+ ", (0, t.jsx)("br", {}), " companies"]
                    }), " ", "of all sizes"]
                })]
            }), (0, t.jsxs)("div", {
                className: "flex-1 lg-max:h-96 min-w-0 relative lg:-ml-1 lg-max:-mt-1",
                children: [(0, t.jsx)("div", {
                    className: "h-full left-0 top-0 w-1 bg-border-faint absolute lg-max:w-full lg-max:h-1"
                }), (0, t.jsx)(a.CurvyRect, {
                    className: "overlay",
                    allSides: !0
                }), (0, t.jsx)("div", {
                    className: "w-full h-full overflow-hidden",
                    children: (0, t.jsx)(n.default, {
                        className: "w-max h-full flex transform-gpu will-change-transform",
                        duration: e ? 8e4 : 1e5,
                        children: (0, t.jsx)("div", {
                            className: "flex h-full",
                            children: [1, 12, 7, 3, 16, 22, 2, 5, 17, 6, 4, 8, 9, 10, 11, 13, 14, 15].map((e, r) => (0, t.jsx)(o, {
                                logoIndex: e
                            }, r))
                        })
                    })
                })]
            })]
        })
    }
    e.s(["default", () => c])
}, 771417, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    });
    var a = {
        default: function() {
            return d
        },
        getImageProps: function() {
            return c
        }
    };
    for (var n in a) Object.defineProperty(r, n, {
        enumerable: !0,
        get: a[n]
    });
    let i = e.r(481258),
        s = e.r(633474),
        l = e.r(982501),
        o = i._(e.r(368291));

    function c(e) {
        let {
            props: t
        } = (0, s.getImgProps)(e, {
            defaultLoader: o.default,
            imgConf: {
                deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
                imageSizes: [32, 48, 64, 96, 128, 256, 384],
                qualities: [75],
                path: "/_next/image",
                loader: "default",
                dangerouslyAllowSVG: !1,
                unoptimized: !1
            }
        });
        for (let [e, r] of Object.entries(t)) void 0 === r && delete t[e];
        return {
            props: t
        }
    }
    let d = l.Image
}, 999870, (e, t, r) => {
    t.exports = e.r(771417)
}, 939113, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "default", {
        enumerable: !0,
        get: function() {
            return l
        }
    });
    let a = e.r(730592),
        n = "u" < typeof window,
        i = n ? () => {} : a.useLayoutEffect,
        s = n ? () => {} : a.useEffect;

    function l(e) {
        let {
            headManager: t,
            reduceComponentsToState: r
        } = e;

        function l() {
            if (t && t.mountedInstances) {
                let e = a.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));
                t.updateHead(r(e))
            }
        }
        return n && (t ? .mountedInstances ? .add(e.children), l()), i(() => (t ? .mountedInstances ? .add(e.children), () => {
            t ? .mountedInstances ? .delete(e.children)
        })), i(() => (t && (t._pendingUpdate = l), () => {
            t && (t._pendingUpdate = l)
        })), s(() => (t && t._pendingUpdate && (t._pendingUpdate(), t._pendingUpdate = null), () => {
            t && t._pendingUpdate && (t._pendingUpdate(), t._pendingUpdate = null)
        })), null
    }
}, 480332, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    });
    var a = {
        default: function() {
            return p
        },
        defaultHead: function() {
            return u
        }
    };
    for (var n in a) Object.defineProperty(r, n, {
        enumerable: !0,
        get: a[n]
    });
    let i = e.r(481258),
        s = e.r(744066),
        l = e.r(253719),
        o = s._(e.r(730592)),
        c = i._(e.r(939113)),
        d = e.r(937791);

    function u() {
        return [(0, l.jsx)("meta", {
            charSet: "utf-8"
        }, "charset"), (0, l.jsx)("meta", {
            name: "viewport",
            content: "width=device-width"
        }, "viewport")]
    }

    function f(e, t) {
        return "string" == typeof t || "number" == typeof t ? e : t.type === o.default.Fragment ? e.concat(o.default.Children.toArray(t.props.children).reduce((e, t) => "string" == typeof t || "number" == typeof t ? e : e.concat(t), [])) : e.concat(t)
    }
    e.r(577933);
    let m = ["name", "httpEquiv", "charSet", "itemProp"];

    function h(e) {
        let t, r, a, n;
        return e.reduce(f, []).reverse().concat(u().reverse()).filter((t = new Set, r = new Set, a = new Set, n = {}, e => {
            let i = !0,
                s = !1;
            if (e.key && "number" != typeof e.key && e.key.indexOf("$") > 0) {
                s = !0;
                let r = e.key.slice(e.key.indexOf("$") + 1);
                t.has(r) ? i = !1 : t.add(r)
            }
            switch (e.type) {
                case "title":
                case "base":
                    r.has(e.type) ? i = !1 : r.add(e.type);
                    break;
                case "meta":
                    for (let t = 0, r = m.length; t < r; t++) {
                        let r = m[t];
                        if (e.props.hasOwnProperty(r))
                            if ("charSet" === r) a.has(r) ? i = !1 : a.add(r);
                            else {
                                let t = e.props[r],
                                    a = n[r] || new Set;
                                ("name" !== r || !s) && a.has(t) ? i = !1 : (a.add(t), n[r] = a)
                            }
                    }
            }
            return i
        })).reverse().map((e, t) => {
            let r = e.key || t;
            return o.default.cloneElement(e, {
                key: r
            })
        })
    }
    let p = function({
        children: e
    }) {
        let t = (0, o.useContext)(d.HeadManagerContext);
        return (0, l.jsx)(c.default, {
            reduceComponentsToState: h,
            headManager: t,
            children: e
        })
    };
    ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", {
        value: !0
    }), Object.assign(r.default, r), t.exports = r.default)
}, 879420, (e, t, r) => {
    "use strict";

    function a({
        widthInt: e,
        heightInt: t,
        blurWidth: r,
        blurHeight: a,
        blurDataURL: n,
        objectFit: i
    }) {
        let s = r ? 40 * r : e,
            l = a ? 40 * a : t,
            o = s && l ? `viewBox='0 0 ${s} ${l}'` : "";
        return `%3Csvg xmlns='http://www.w3.org/2000/svg' ${o}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${o?"none":"contain"===i?"xMidYMid":"cover"===i?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${n}'/%3E%3C/svg%3E`
    }
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "getImageBlurSvg", {
        enumerable: !0,
        get: function() {
            return a
        }
    })
}, 484646, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    });
    var a = {
        VALID_LOADERS: function() {
            return i
        },
        imageConfigDefault: function() {
            return s
        }
    };
    for (var n in a) Object.defineProperty(r, n, {
        enumerable: !0,
        get: a[n]
    });
    let i = ["default", "imgix", "cloudinary", "akamai", "custom"],
        s = {
            deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
            imageSizes: [32, 48, 64, 96, 128, 256, 384],
            path: "/_next/image",
            loader: "default",
            loaderFile: "",
            domains: [],
            disableStaticImages: !1,
            minimumCacheTTL: 14400,
            formats: ["image/webp"],
            maximumRedirects: 3,
            dangerouslyAllowLocalIP: !1,
            dangerouslyAllowSVG: !1,
            contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;",
            contentDispositionType: "attachment",
            localPatterns: void 0,
            remotePatterns: [],
            qualities: [75],
            unoptimized: !1
        }
}, 633474, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "getImgProps", {
        enumerable: !0,
        get: function() {
            return c
        }
    }), e.r(577933);
    let a = e.r(991182),
        n = e.r(879420),
        i = e.r(484646),
        s = ["-moz-initial", "fill", "none", "scale-down", void 0];

    function l(e) {
        return void 0 !== e.default
    }

    function o(e) {
        return void 0 === e ? e : "number" == typeof e ? Number.isFinite(e) ? e : NaN : "string" == typeof e && /^[0-9]+$/.test(e) ? parseInt(e, 10) : NaN
    }

    function c({
        src: e,
        sizes: t,
        unoptimized: r = !1,
        priority: c = !1,
        preload: d = !1,
        loading: u,
        className: f,
        quality: m,
        width: h,
        height: p,
        fill: g = !1,
        style: x,
        overrideSrc: v,
        onLoad: b,
        onLoadingComplete: w,
        placeholder: j = "empty",
        blurDataURL: y,
        fetchPriority: _,
        decoding: N = "async",
        layout: C,
        objectFit: S,
        objectPosition: R,
        lazyBoundary: E,
        lazyRoot: O,
        ...P
    }, M) {
        var z;
        let k, A, I, {
                imgConf: $,
                showAltText: L,
                blurComplete: T,
                defaultLoader: D
            } = M,
            F = $ || i.imageConfigDefault;
        if ("allSizes" in F) k = F;
        else {
            let e = [...F.deviceSizes, ...F.imageSizes].sort((e, t) => e - t),
                t = F.deviceSizes.sort((e, t) => e - t),
                r = F.qualities ? .sort((e, t) => e - t);
            k = { ...F,
                allSizes: e,
                deviceSizes: t,
                qualities: r
            }
        }
        if (void 0 === D) throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"), "__NEXT_ERROR_CODE", {
            value: "E163",
            enumerable: !1,
            configurable: !0
        });
        let q = P.loader || D;
        delete P.loader, delete P.srcSet;
        let W = "__next_img_default" in q;
        if (W) {
            if ("custom" === k.loader) throw Object.defineProperty(Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`), "__NEXT_ERROR_CODE", {
                value: "E252",
                enumerable: !1,
                configurable: !0
            })
        } else {
            let e = q;
            q = t => {
                let {
                    config: r,
                    ...a
                } = t;
                return e(a)
            }
        }
        if (C) {
            "fill" === C && (g = !0);
            let e = {
                intrinsic: {
                    maxWidth: "100%",
                    height: "auto"
                },
                responsive: {
                    width: "100%",
                    height: "auto"
                }
            }[C];
            e && (x = { ...x,
                ...e
            });
            let r = {
                responsive: "100vw",
                fill: "100vw"
            }[C];
            r && !t && (t = r)
        }
        let B = "",
            U = o(h),
            G = o(p);
        if ((z = e) && "object" == typeof z && (l(z) || void 0 !== z.src)) {
            let t = l(e) ? e.default : e;
            if (!t.src) throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`), "__NEXT_ERROR_CODE", {
                value: "E460",
                enumerable: !1,
                configurable: !0
            });
            if (!t.height || !t.width) throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`), "__NEXT_ERROR_CODE", {
                value: "E48",
                enumerable: !1,
                configurable: !0
            });
            if (A = t.blurWidth, I = t.blurHeight, y = y || t.blurDataURL, B = t.src, !g)
                if (U || G) {
                    if (U && !G) {
                        let e = U / t.width;
                        G = Math.round(t.height * e)
                    } else if (!U && G) {
                        let e = G / t.height;
                        U = Math.round(t.width * e)
                    }
                } else U = t.width, G = t.height
        }
        let V = !c && !d && ("lazy" === u || void 0 === u);
        (!(e = "string" == typeof e ? e : B) || e.startsWith("data:") || e.startsWith("blob:")) && (r = !0, V = !1), k.unoptimized && (r = !0), W && !k.dangerouslyAllowSVG && e.split("?", 1)[0].endsWith(".svg") && (r = !0);
        let X = o(m),
            H = Object.assign(g ? {
                position: "absolute",
                height: "100%",
                width: "100%",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                objectFit: S,
                objectPosition: R
            } : {}, L ? {} : {
                color: "transparent"
            }, x),
            Y = T || "empty" === j ? null : "blur" === j ? `url("data:image/svg+xml;charset=utf-8,${(0,n.getImageBlurSvg)({widthInt:U,heightInt:G,blurWidth:A,blurHeight:I,blurDataURL:y||"",objectFit:H.objectFit})}")` : `url("${j}")`,
            Z = s.includes(H.objectFit) ? "fill" === H.objectFit ? "100% 100%" : "cover" : H.objectFit,
            J = Y ? {
                backgroundSize: Z,
                backgroundPosition: H.objectPosition || "50% 50%",
                backgroundRepeat: "no-repeat",
                backgroundImage: Y
            } : {},
            K = function({
                config: e,
                src: t,
                unoptimized: r,
                width: n,
                quality: i,
                sizes: s,
                loader: l
            }) {
                if (r) {
                    let e = (0, a.getDeploymentId)();
                    if (t.startsWith("/") && !t.startsWith("//") && e) {
                        let r = t.includes("?") ? "&" : "?";
                        t = `${t}${r}dpl=${e}`
                    }
                    return {
                        src: t,
                        srcSet: void 0,
                        sizes: void 0
                    }
                }
                let {
                    widths: o,
                    kind: c
                } = function({
                    deviceSizes: e,
                    allSizes: t
                }, r, a) {
                    if (a) {
                        let r = /(^|\s)(1?\d?\d)vw/g,
                            n = [];
                        for (let e; e = r.exec(a);) n.push(parseInt(e[2]));
                        if (n.length) {
                            let r = .01 * Math.min(...n);
                            return {
                                widths: t.filter(t => t >= e[0] * r),
                                kind: "w"
                            }
                        }
                        return {
                            widths: t,
                            kind: "w"
                        }
                    }
                    return "number" != typeof r ? {
                        widths: e,
                        kind: "w"
                    } : {
                        widths: [...new Set([r, 2 * r].map(e => t.find(t => t >= e) || t[t.length - 1]))],
                        kind: "x"
                    }
                }(e, n, s), d = o.length - 1;
                return {
                    sizes: s || "w" !== c ? s : "100vw",
                    srcSet: o.map((r, a) => `${l({config:e,src:t,quality:i,width:r})} ${"w"===c?r:a+1}${c}`).join(", "),
                    src: l({
                        config: e,
                        src: t,
                        quality: i,
                        width: o[d]
                    })
                }
            }({
                config: k,
                src: e,
                unoptimized: r,
                width: U,
                quality: X,
                sizes: t,
                loader: q
            }),
            Q = V ? "lazy" : u;
        return {
            props: { ...P,
                loading: Q,
                fetchPriority: _,
                width: U,
                height: G,
                decoding: N,
                className: f,
                style: { ...H,
                    ...J
                },
                sizes: K.sizes,
                srcSet: K.srcSet,
                src: v || K.src
            },
            meta: {
                unoptimized: r,
                preload: d || c,
                placeholder: j,
                fill: g
            }
        }
    }
}, 121488, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "ImageConfigContext", {
        enumerable: !0,
        get: function() {
            return i
        }
    });
    let a = e.r(481258)._(e.r(730592)),
        n = e.r(484646),
        i = a.default.createContext(n.imageConfigDefault)
}, 405619, (e, t, r) => {
    "use strict";

    function a(e, t) {
        let r = e || 75;
        return t ? .qualities ? .length ? t.qualities.reduce((e, t) => Math.abs(t - r) < Math.abs(e - r) ? t : e, 0) : r
    }
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "findClosestQuality", {
        enumerable: !0,
        get: function() {
            return a
        }
    })
}, 368291, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "default", {
        enumerable: !0,
        get: function() {
            return s
        }
    });
    let a = e.r(405619),
        n = e.r(991182);

    function i({
        config: e,
        src: t,
        width: r,
        quality: i
    }) {
        if (t.startsWith("/") && t.includes("?") && e.localPatterns ? .length === 1 && "**" === e.localPatterns[0].pathname && "" === e.localPatterns[0].search) throw Object.defineProperty(Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`), "__NEXT_ERROR_CODE", {
            value: "E871",
            enumerable: !1,
            configurable: !0
        });
        let s = (0, a.findClosestQuality)(i, e),
            l = (0, n.getDeploymentId)();
        return `${e.path}?url=${encodeURIComponent(t)}&w=${r}&q=${s}${t.startsWith("/")&&l?`&dpl=${l}`:""}`
    }
    i.__next_img_default = !0;
    let s = i
}, 982501, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "Image", {
        enumerable: !0,
        get: function() {
            return w
        }
    });
    let a = e.r(481258),
        n = e.r(744066),
        i = e.r(253719),
        s = n._(e.r(730592)),
        l = a._(e.r(675847)),
        o = a._(e.r(480332)),
        c = e.r(633474),
        d = e.r(484646),
        u = e.r(121488);
    e.r(577933);
    let f = e.r(130557),
        m = a._(e.r(368291)),
        h = e.r(50712),
        p = {
            deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
            imageSizes: [32, 48, 64, 96, 128, 256, 384],
            qualities: [75],
            path: "/_next/image",
            loader: "default",
            dangerouslyAllowSVG: !1,
            unoptimized: !1
        };

    function g(e, t, r, a, n, i, s) {
        let l = e ? .src;
        e && e["data-loaded-src"] !== l && (e["data-loaded-src"] = l, ("decode" in e ? e.decode() : Promise.resolve()).catch(() => {}).then(() => {
            if (e.parentElement && e.isConnected) {
                if ("empty" !== t && n(!0), r ? .current) {
                    let t = new Event("load");
                    Object.defineProperty(t, "target", {
                        writable: !1,
                        value: e
                    });
                    let a = !1,
                        n = !1;
                    r.current({ ...t,
                        nativeEvent: t,
                        currentTarget: e,
                        target: e,
                        isDefaultPrevented: () => a,
                        isPropagationStopped: () => n,
                        persist: () => {},
                        preventDefault: () => {
                            a = !0, t.preventDefault()
                        },
                        stopPropagation: () => {
                            n = !0, t.stopPropagation()
                        }
                    })
                }
                a ? .current && a.current(e)
            }
        }))
    }

    function x(e) {
        return s.use ? {
            fetchPriority: e
        } : {
            fetchpriority: e
        }
    }
    "u" < typeof window && (globalThis.__NEXT_IMAGE_IMPORTED = !0);
    let v = (0, s.forwardRef)(({
        src: e,
        srcSet: t,
        sizes: r,
        height: a,
        width: n,
        decoding: l,
        className: o,
        style: c,
        fetchPriority: d,
        placeholder: u,
        loading: f,
        unoptimized: m,
        fill: p,
        onLoadRef: v,
        onLoadingCompleteRef: b,
        setBlurComplete: w,
        setShowAltText: j,
        sizesInput: y,
        onLoad: _,
        onError: N,
        ...C
    }, S) => {
        let R = (0, s.useCallback)(e => {
                e && (N && (e.src = e.src), e.complete && g(e, u, v, b, w, m, y))
            }, [e, u, v, b, w, N, m, y]),
            E = (0, h.useMergedRef)(S, R);
        return (0, i.jsx)("img", { ...C,
            ...x(d),
            loading: f,
            width: n,
            height: a,
            decoding: l,
            "data-nimg": p ? "fill" : "1",
            className: o,
            style: c,
            sizes: r,
            srcSet: t,
            src: e,
            ref: E,
            onLoad: e => {
                g(e.currentTarget, u, v, b, w, m, y)
            },
            onError: e => {
                j(!0), "empty" !== u && w(!0), N && N(e)
            }
        })
    });

    function b({
        isAppRouter: e,
        imgAttributes: t
    }) {
        let r = {
            as: "image",
            imageSrcSet: t.srcSet,
            imageSizes: t.sizes,
            crossOrigin: t.crossOrigin,
            referrerPolicy: t.referrerPolicy,
            ...x(t.fetchPriority)
        };
        return e && l.default.preload ? (l.default.preload(t.src, r), null) : (0, i.jsx)(o.default, {
            children: (0, i.jsx)("link", {
                rel: "preload",
                href: t.srcSet ? void 0 : t.src,
                ...r
            }, "__nimg-" + t.src + t.srcSet + t.sizes)
        })
    }
    let w = (0, s.forwardRef)((e, t) => {
        let r = (0, s.useContext)(f.RouterContext),
            a = (0, s.useContext)(u.ImageConfigContext),
            n = (0, s.useMemo)(() => {
                let e = p || a || d.imageConfigDefault,
                    t = [...e.deviceSizes, ...e.imageSizes].sort((e, t) => e - t),
                    r = e.deviceSizes.sort((e, t) => e - t),
                    n = e.qualities ? .sort((e, t) => e - t);
                return { ...e,
                    allSizes: t,
                    deviceSizes: r,
                    qualities: n,
                    localPatterns: "u" < typeof window ? a ? .localPatterns : e.localPatterns
                }
            }, [a]),
            {
                onLoad: l,
                onLoadingComplete: o
            } = e,
            h = (0, s.useRef)(l);
        (0, s.useEffect)(() => {
            h.current = l
        }, [l]);
        let g = (0, s.useRef)(o);
        (0, s.useEffect)(() => {
            g.current = o
        }, [o]);
        let [x, w] = (0, s.useState)(!1), [j, y] = (0, s.useState)(!1), {
            props: _,
            meta: N
        } = (0, c.getImgProps)(e, {
            defaultLoader: m.default,
            imgConf: n,
            blurComplete: x,
            showAltText: j
        });
        return (0, i.jsxs)(i.Fragment, {
            children: [(0, i.jsx)(v, { ..._,
                unoptimized: N.unoptimized,
                placeholder: N.placeholder,
                fill: N.fill,
                onLoadRef: h,
                onLoadingCompleteRef: g,
                setBlurComplete: w,
                setShowAltText: y,
                sizesInput: e.sizes,
                ref: t
            }), N.preload ? (0, i.jsx)(b, {
                isAppRouter: !r,
                imgAttributes: _
            }) : null]
        })
    });
    ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", {
        value: !0
    }), Object.assign(r.default, r), t.exports = r.default)
}, 332857, e => {
    "use strict";
    var t = e.i(253719),
        r = e.i(989873),
        a = e.i(534026),
        n = e.i(730592);

    function i() {
        return (0, t.jsx)("svg", {
            fill: "none",
            height: "18",
            viewBox: "0 0 18 18",
            width: "18",
            className: "text-accent-black",
            xmlns: "http://www.w3.org/2000/svg",
            children: (0, t.jsx)("path", {
                d: "M6 7.5L9 10.5L12 7.5",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeOpacity: "0.56",
                strokeWidth: "1.25"
            })
        })
    }

    function s({
        item: e
    }) {
        let [s, l] = (0, n.useState)(!1);
        return (0, t.jsxs)("div", {
            id: e.id,
            className: "border-b border-border-faint relative",
            children: [(0, t.jsxs)("button", {
                className: "text-label-large w-full p-20 lg:px-64 py-20 flex relative gap-16 items-center cursor-pointer",
                onClick: () => l(e => !e),
                children: [(0, t.jsx)("div", {
                    className: "flex-1 min-w-0",
                    children: e.question
                }), (0, t.jsxs)(a.motion.div, {
                    animate: {
                        scaleY: s ? -1 : 1
                    },
                    children: [" ", (0, t.jsx)(i, {})]
                })]
            }), (0, t.jsxs)(a.motion.div, {
                animate: {
                    height: s ? "auto" : 0
                },
                className: "text-body-large text-black-alpha-64 overflow-hidden",
                initial: {
                    height: 0
                },
                transition: {
                    duration: .5,
                    ease: (0, r.cubicBezier)(.4, 0, .2, 1)
                },
                children: [(0, t.jsx)("div", {
                    className: "border-t border-border-faint mx-20 lg:mx-64"
                }), (0, t.jsx)("div", {
                    className: "px-20 lg:px-64 py-20 [&_code]:bg-gray-100 [&_code]:px-6 [&_code]:py-2 [&_code]:rounded-4 [&_code]:text-sm [&_code]:font-mono [&_a]:text-heat-100 [&_a]:underline hover:[&_a]:text-heat-80",
                    dangerouslySetInnerHTML: {
                        __html: e.answer
                    }
                }), (0, t.jsx)("div", {
                    className: "h-20 absolute bottom-0 inset-x-1 bg-gradient-to-t from-background-base to-transparent"
                })]
            })]
        })
    }
    e.s(["default", () => s], 332857)
}, 498219, 713492, e => {
    "use strict";
    var t = e.i(253719),
        r = e.i(730592),
        a = e.i(420851),
        n = e.i(296809),
        i = e.i(825489);
    let s = "Roboto Mono, monospace",
        l = "rgba(0, 0, 0, 0.2)";

    function o({
        className: o
    }) {
        let c = (0, r.useRef)(null),
            d = (0, r.useRef)(null),
            u = (0, r.useRef)(null);
        return (0, r.useEffect)(() => {
            let t;
            return e.A(516973).then(({
                default: e
            }) => {
                let r = c.current ? (0, i.setupAsciiCanvas)(c.current, e[0], 9, 11, s) : null,
                    a = d.current ? (0, i.setupAsciiCanvas)(d.current, e[0], 9, 11, s) : null,
                    o = e => {
                        r && (0, i.renderAsciiFrame)(r.ctx, e, r.textWidth, r.textHeight, 9, 11, s, l), a && (0, i.renderAsciiFrame)(a.ctx, e, a.textWidth, a.textHeight, 9, 11, s, l)
                    };
                o(e[0]);
                let f = 0;
                t = (0, n.setIntervalOnVisible)({
                    element: u.current,
                    callback: () => {
                        ++f >= e.length && (f = 0), o(e[f])
                    },
                    interval: 85
                })
            }), () => t ? .()
        }, []), (0, t.jsxs)("div", {
            className: (0, a.cn)("cw-686 h-190 absolute flex gap-16 pointer-events-none select-none lg-max:hidden", o),
            ref: u,
            children: [(0, t.jsx)("div", {
                className: "flex-1 overflow-clip relative",
                children: (0, t.jsx)("canvas", {
                    className: "absolute bottom-0 -left-380 fc-decoration",
                    ref: c
                })
            }), (0, t.jsx)("div", {
                className: "flex-1 overflow-clip relative",
                children: (0, t.jsx)("canvas", {
                    className: "absolute bottom-0 -right-380 -scale-x-100 fc-decoration",
                    ref: d
                })
            })]
        })
    }
    e.s(["default", () => o], 713492), e.s([], 498219)
}, 940696, 349560, e => {
    "use strict";
    var t = e.i(253719);

    function r() {
        return (0, t.jsx)("svg", {
            fill: "none",
            height: "20",
            viewBox: "0 0 20 20",
            width: "20",
            xmlns: "http://www.w3.org/2000/svg",
            children: (0, t.jsx)("path", {
                clipRule: "evenodd",
                d: "M16.3258 4.47206C14.7725 3.17089 12.5845 2.5 10 2.5C7.4155 2.5 5.22746 3.17089 3.67418 4.47206C2.10758 5.78439 1.25001 7.68606 1.25001 10C1.25001 10.6624 1.47019 11.4945 1.67814 12.1462C1.89244 12.8178 2.12155 13.3807 2.18489 13.5332L2.19482 13.5568L2.20162 13.5729C2.2052 13.5814 2.20636 13.5845 2.20636 13.5845C2.22134 13.6254 2.57828 14.5993 1.3761 16.1925C1.263 16.3424 1.22328 16.5352 1.26793 16.7176C1.31258 16.9 1.43686 17.0526 1.6064 17.1333C2.71715 17.662 3.83469 17.4782 4.61933 17.2047C5.01667 17.0662 5.34818 16.8984 5.58066 16.7654C5.60069 16.7539 5.62003 16.7427 5.63866 16.7317C7.02466 17.3646 8.58894 17.5 10 17.5C12.5845 17.5 14.7725 16.8291 16.3258 15.5279C17.8924 14.2156 18.75 12.3139 18.75 10C18.75 7.68606 17.8924 5.78439 16.3258 4.47206Z",
                fill: "var(--heat-100)",
                fillRule: "evenodd"
            })
        })
    }
    e.s(["default", () => r], 940696);
    var a = e.i(730592),
        n = e.i(420851),
        i = e.i(825489),
        s = e.i(296809),
        l = e.i(712223);

    function o(e) {
        let r = (0, a.useRef)(null),
            o = (0, a.useRef)(null);
        return (0, a.useEffect)(() => {
            if (!r.current) return;
            let {
                ctx: e,
                textWidth: t,
                textHeight: a
            } = (0, i.setupAsciiCanvas)(r.current, l.default[0], 8, 10, "Roboto Mono, monospace");
            (0, i.renderAsciiFrame)(e, l.default[0], t, a, 8, 10, "Roboto Mono, monospace", "rgba(0, 0, 0, 0.16)");
            let n = 0,
                c = (0, s.setIntervalOnVisible)({
                    element: o.current,
                    callback: () => {
                        ++n >= l.default.length && (n = 0), (0, i.renderAsciiFrame)(e, l.default[n], t, a, 8, 10, "Roboto Mono, monospace", "rgba(0, 0, 0, 0.16)")
                    },
                    interval: 90
                });
            return () => c ? .()
        }, []), (0, t.jsx)("div", {
            className: "absolute inset-10 -z-[10] overflow-clip",
            children: (0, t.jsx)("div", {
                ref: o,
                ...e,
                className: (0, n.cn)("cw-[1110px] bottom-0 h-400 absolute pointer-events-none select-none", e.className),
                children: (0, t.jsx)("canvas", {
                    ref: r,
                    className: "fc-decoration"
                })
            })
        })
    }
    e.s(["default", () => o], 349560)
}]);

//# debugId=724b214e-e21b-6d49-1588-ba58039c5657
//# sourceMappingURL=fb9087a0e5b8ec99.js.map