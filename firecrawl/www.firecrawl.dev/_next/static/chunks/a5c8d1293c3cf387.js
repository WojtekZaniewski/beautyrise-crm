;
! function() {
    try {
        var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {},
            n = (new e.Error).stack;
        n && ((e._debugIds || (e._debugIds = {}))[n] = "67a33e90-5b7e-1c97-ed84-d9ceb084c9a2")
    } catch (e) {}
}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 665014, e => {
    "use strict";
    let t = (0, e.i(486856).default)("check", [
        ["path", {
            d: "M20 6 9 17l-5-5",
            key: "1gmf2c"
        }]
    ]);
    e.s(["Check", () => t], 665014)
}, 704745, e => {
    "use strict";
    var t = e.i(152520),
        a = e.i(675847);

    function r({
        children: e
    }) {
        return (0, a.createPortal)(e, document.body)
    }
    let s = (0, t.default)(() => Promise.resolve(r), {
        ssr: !1
    });
    e.s(["default", 0, s])
}, 580852, e => {
    "use strict";
    var t = e.i(253719),
        a = e.i(704745),
        r = e.i(420851),
        s = e.i(796620),
        i = e.i(534026),
        n = e.i(730592);

    function l({
        delay: e = .5,
        offset: l = 8,
        wrapperClassName: o,
        className: c,
        ...u
    }) {
        let [d, p] = (0, n.useState)(!1), f = (0, n.useRef)(null), [h, m] = (0, n.useState)(null);
        return ((0, n.useEffect)(() => {
            if (f.current) {
                let e = f.current.parentElement,
                    t = () => {
                        m(e.getBoundingClientRect()), p(!0)
                    },
                    a = () => p(!1);
                if (e) return e.addEventListener("mouseenter", t), e.addEventListener("mouseleave", a), () => {
                    e.removeEventListener("mouseenter", t), e.removeEventListener("mouseleave", a)
                }
            }
        }, []), u.description) ? (0, t.jsx)("span", {
            className: "contents",
            ref: f,
            children: (0, t.jsx)(a.default, {
                children: (0, t.jsx)(s.AnimatePresence, {
                    initial: !1,
                    mode: "popLayout",
                    children: d && (0, t.jsx)("div", {
                        className: (0, r.cn)("fixed pointer-events-none flex-center z-[500]", o),
                        style: {
                            left: h ? .x,
                            top: h ? .y,
                            width: h ? .width,
                            height: h ? .height
                        },
                        children: (0, t.jsx)(i.motion.div, {
                            animate: {
                                y: 0,
                                opacity: 1,
                                filter: "blur(0px)",
                                transition: {
                                    type: "spring",
                                    stiffness: 240,
                                    damping: 16,
                                    filter: {
                                        duration: .4
                                    },
                                    delay: e
                                }
                            },
                            className: (0, r.cn)("py-10 px-16 rounded-12 max-w-248 absolute w-max text-body-medium text-accent-black bg-surface border border-border-muted shadow-lg z-[500]", c),
                            dangerouslySetInnerHTML: {
                                __html: u.description
                            },
                            exit: {
                                y: -8,
                                opacity: 0,
                                filter: "blur(4px)",
                                transition: {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 16
                                }
                            },
                            initial: {
                                y: 8,
                                opacity: 0,
                                filter: "blur(4px)"
                            },
                            style: {
                                bottom: `calc(100% - ${l}px)`
                            },
                            transition: {
                                type: "spring",
                                stiffness: 160,
                                damping: 13,
                                filter: {
                                    duration: .4
                                }
                            }
                        })
                    })
                })
            })
        }) : u.children
    }
    e.s(["default", () => l])
}, 508646, e => {
    "use strict";
    let t = (0, e.i(486856).default)("copy", [
        ["rect", {
            width: "14",
            height: "14",
            x: "8",
            y: "8",
            rx: "2",
            ry: "2",
            key: "17jyea"
        }],
        ["path", {
            d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
            key: "zix9uf"
        }]
    ]);
    e.s(["Copy", () => t], 508646)
}, 475442, e => {
    "use strict";
    var t = e.i(253719),
        a = e.i(730592),
        r = e.i(323576);

    function s({ ...e
    }) {
        return (0, t.jsxs)("svg", {
            fill: "none",
            height: "47",
            viewBox: "0 0 47 47",
            width: "47",
            xmlns: "http://www.w3.org/2000/svg",
            ...e,
            children: [(0, t.jsx)("path", {
                d: "M24 18C24 21.3137 26.6863 24 30 24H34V25H30C26.6863 25 24 27.6863 24 31V35H23V31C23 27.6863 20.3137 25 17 25H13V24H17C20.3137 24 23 21.3137 23 18V14H24V18Z",
                fill: "var(--heat-100)",
                fillOpacity: "1"
            }), (0, t.jsx)("circle", {
                cx: "23.5",
                cy: "23.5",
                r: "23",
                stroke: "#EDEDED",
                strokeOpacity: "1"
            })]
        })
    }

    function i() {
        return (0, t.jsxs)("div", {
            className: "overlay contain-layout pointer-events-none lg-max:hidden",
            children: [(0, t.jsx)("div", {
                className: "top-100 h-[calc(100%-99px)] border-border-faint border-y w-full left-0 absolute"
            }), (0, t.jsxs)("div", {
                className: "cw-[1314px] z-[105] absolute top-0 border-x border-border-faint h-full",
                children: [(0, t.jsxs)("div", {
                    className: "text-mono-x-small font-mono text-black-alpha-12 select-none",
                    children: [(0, t.jsx)("div", {
                        className: "absolute top-111 -left-1 w-102 text-center",
                        children: " [ 200 OK ] "
                    }), (0, t.jsx)("div", {
                        className: "absolute bottom-10 -left-1 w-102 text-center",
                        children: " [ .JSON ] "
                    }), (0, t.jsx)("div", {
                        className: "absolute top-111 -right-1 w-102 text-center",
                        children: " [ SCRAPE ] "
                    }), (0, t.jsx)("div", {
                        className: "absolute bottom-10 -right-1 w-102 text-center",
                        children: " [ .MD ] "
                    })]
                }), (0, t.jsx)("div", {
                    className: "top-302 h-1 left-0 bg-border-faint w-303 absolute"
                }), (0, t.jsx)("div", {
                    className: "top-403 h-1 left-0 bg-border-faint w-303 absolute"
                }), (0, t.jsx)("div", {
                    className: "top-504 h-1 left-100 bg-border-faint w-203 absolute"
                }), (0, t.jsx)("div", {
                    className: "top-302 h-1 right-0 bg-border-faint w-303 absolute"
                }), (0, t.jsx)("div", {
                    className: "top-403 h-1 right-0 bg-border-faint w-303 absolute"
                }), (0, t.jsx)("div", {
                    className: "top-504 h-1 right-100 bg-border-faint w-203 absolute"
                }), Array.from({
                    length: 2
                }, (e, s) => (0, t.jsxs)(a.Fragment, {
                    children: [(0, t.jsx)(r.default, {
                        bottomLeft: 1 === s,
                        bottomRight: 0 === s,
                        className: "w-101  h-[calc(100%-99px)] top-100 absolute",
                        style: {
                            [0 === s ? "left" : "right"]: -101
                        }
                    }), (0, t.jsx)(r.default, {
                        className: "w-102 h-203 top-100 absolute",
                        style: {
                            [0 === s ? "left" : "right"]: -1
                        },
                        allSides: !0
                    }), (0, t.jsx)(r.default, {
                        className: "size-102 top-302 absolute",
                        style: {
                            [0 === s ? "left" : "right"]: -1
                        },
                        allSides: !0
                    }), (0, t.jsx)(r.default, {
                        className: "w-102 h-203 top-403 absolute",
                        style: {
                            [0 === s ? "left" : "right"]: -1
                        },
                        allSides: !0
                    })]
                }, s))]
            }), (0, t.jsx)("div", {
                className: "cw-[910px] absolute top-100 border-x border-border-faint h-[calc(100%-99px)]"
            }), (0, t.jsxs)("div", {
                className: "cw-[708px] absolute top-100 border-x border-border-faint h-[calc(100%-99px)]",
                children: [(0, t.jsx)(s, {
                    className: "absolute top-77 -right-24 z-[1]"
                }), (0, t.jsx)(s, {
                    className: "absolute top-77 -left-24 z-[1]"
                })]
            }), (0, t.jsx)(r.default, {
                className: "cw-[708px] absolute top-100 h-[calc(100%-99px)]",
                bottom: !0
            }), (0, t.jsx)("div", {
                className: "cw-[506px] absolute top-100 border-x border-border-faint h-102"
            }), (0, t.jsx)("div", {
                className: "cw-[304px] absolute top-100 border-x border-border-faint h-102"
            }), (0, t.jsx)("div", {
                className: "cw-[102px] absolute top-100 border-x border-border-faint h-102"
            }), (0, t.jsx)("div", {
                className: "top-201 h-1 bg-border-faint cw-[1112px] absolute"
            }), (0, t.jsxs)("div", {
                className: "cw-[1112px] absolute top-0 h-full",
                children: [(0, t.jsx)(r.default, {
                    className: "w-full absolute top-full h-100 left-0",
                    top: !0
                }), (0, t.jsx)(r.default, {
                    className: "w-100 absolute top-full h-100 -left-99",
                    topRight: !0
                }), (0, t.jsx)(r.default, {
                    className: "w-100 absolute top-full h-100 -right-99",
                    topLeft: !0
                }), Array.from({
                    length: 5
                }, (e, s) => (0, t.jsxs)(a.Fragment, {
                    children: [(0, t.jsx)(r.default, {
                        className: "size-102 absolute left-0",
                        style: {
                            top: 100 + 101 * s
                        },
                        allSides: !0
                    }), (0, t.jsx)(r.default, {
                        className: "size-102 absolute right-0",
                        style: {
                            top: 100 + 101 * s
                        },
                        allSides: !0
                    })]
                }, s)), (0, t.jsx)(r.default, {
                    className: "size-102 absolute left-101 top-100",
                    bottomLeft: !0,
                    top: !0
                }), (0, t.jsx)(r.default, {
                    className: "size-102 absolute left-101 top-201",
                    bottom: !0,
                    topLeft: !0
                }), (0, t.jsx)(r.default, {
                    className: "size-102 absolute right-101 top-100",
                    bottomRight: !0,
                    top: !0
                }), (0, t.jsx)(r.default, {
                    className: "size-102 absolute right-101 top-201",
                    bottom: !0,
                    topRight: !0
                }), Array.from({
                    length: 3
                }, (e, s) => (0, t.jsxs)(a.Fragment, {
                    children: [(0, t.jsx)(r.default, {
                        className: "size-102 absolute left-101",
                        style: {
                            top: 302 + 101 * s
                        },
                        allSides: !0
                    }), (0, t.jsx)(r.default, {
                        className: "size-102 absolute right-101",
                        style: {
                            top: 302 + 101 * s
                        },
                        allSides: !0
                    })]
                }, s)), (0, t.jsx)(r.default, {
                    className: "size-102 absolute top-100 left-202",
                    bottomRight: !0,
                    top: !0
                }), Array.from({
                    length: 5
                }, (e, a) => (0, t.jsx)(r.default, {
                    className: "size-102 absolute top-100",
                    style: {
                        left: 303 + 101 * a
                    },
                    allSides: !0
                }, a)), (0, t.jsx)(r.default, {
                    className: "size-102 absolute top-100 right-202",
                    bottomLeft: !0,
                    top: !0
                })]
            })]
        })
    }
    e.s(["default", () => i], 475442)
}, 802335, e => {
    "use strict";
    var t = e.i(253719);
    let a = (0, e.i(152520).default)(() => e.A(468005), {
        loadableGenerated: {
            modules: [159887]
        },
        ssr: !1
    });

    function r() {
        return (0, t.jsx)(a, {})
    }
    e.s(["default", () => r])
}, 699374, e => {
    "use strict";
    var t = e.i(253719),
        a = e.i(730592),
        r = e.i(323576),
        s = e.i(924192),
        i = e.i(420851);
    e.s(["BackgroundOuterPiece", 0, () => {
        let [e, n] = (0, a.useState)(!1), {
            dropdownContent: l
        } = (0, s.useHeaderContext)(), {
            headerHeight: o
        } = (0, s.useHeaderHeight)();
        return (0, a.useEffect)(() => {
            let e = document.getElementById("hero-content");
            if (!e) return;
            let t = e.clientHeight,
                a = () => {
                    n(window.scrollY > t - 120)
                };
            return a(), window.addEventListener("scroll", a), () => {
                window.removeEventListener("scroll", a)
            }
        }, []), (0, t.jsxs)("div", {
            className: (0, i.cn)("cw-[1335px] transition-all z-[105] absolute top-0 flex justify-between h-[calc(100%+21px)] duration-[200ms] pointer-events-none", {
                "opacity-0": e || l || !o
            }),
            style: {
                paddingTop: o - 10
            },
            children: [(0, t.jsx)("div", {
                className: "h-[3000px] w-[calc(100%-21px)] left-[10.5px] absolute bottom-21 border-x border-border-faint"
            }), (0, t.jsx)(r.Connector, {
                className: "sticky",
                style: {
                    top: o - 10
                }
            }), (0, t.jsx)(r.Connector, {
                className: "sticky",
                style: {
                    top: o - 10
                }
            })]
        })
    }])
}, 779577, e => {
    "use strict";
    var t = e.i(253719),
        a = e.i(730592),
        r = e.i(420851),
        s = e.i(825489),
        i = e.i(296809);
    let n = (0, a.memo)(function(n) {
        let l = (0, a.useRef)(null),
            o = (0, a.useRef)(null);
        return (0, a.useEffect)(() => {
            let t;
            return e.A(101624).then(({
                default: e
            }) => {
                if (!l.current) return;
                let {
                    ctx: a,
                    textWidth: r,
                    textHeight: n
                } = (0, s.setupAsciiCanvas)(l.current, e[0], 10, 12.5, "Geist Mono, monospace");
                (0, s.renderAsciiFrame)(a, e[0], r, n, 10, 12.5, "Geist Mono, monospace", "#FA5D19");
                let c = 0,
                    u = !0;
                t = (0, i.setIntervalOnVisible)({
                    element: o.current,
                    callback: () => {
                        if ((c += u ? 2 : 1) >= e.length) {
                            if (u) {
                                u = !1, c = -40;
                                return
                            }
                            c = -40;
                            return
                        }
                        c < 0 || (0, s.renderAsciiFrame)(a, e[c], r, n, 10, 12.5, "Geist Mono, monospace", "#FA5D19")
                    },
                    interval: 40
                })
            }), () => t ? .()
        }, []), (0, t.jsx)("div", {
            ref: o,
            ...n,
            className: (0, r.cn)("w-[720px] h-[400px] absolute gap-16 pointer-events-none select-none hidden lg:flex", n.className),
            children: (0, t.jsx)("canvas", {
                ref: l,
                className: "fc-decoration"
            })
        })
    });
    e.s(["AsciiExplosion", 0, n, "default", 0, n])
}, 927839, e => {
    "use strict";
    var t, a, r, s, i, n = ((t = {}).Scrape = "scrape", t.Crawl = "crawl", t.Search = "search", t.Map = "map", t.Extract = "extract", t.Interact = "interact", t),
        l = ((a = {}).FIRE_1 = "FIRE-1", a),
        o = ((r = {}).Markdown = "markdown", r.Summary = "summary", r.Json = "json", r.RawHtml = "rawHtml", r.Html = "html", r.Screenshot = "screenshot", r.ScreenshotFullPage = "screenshot@fullPage", r.Links = "links", r.Branding = "branding", r.Images = "images", r),
        c = ((s = {}).Web = "web", s.Images = "images", s.News = "news", s),
        u = ((i = {}).Github = "Github", i.Research = "Research", i.PDF = "PDF", i);
    e.s(["AgentModel", () => l, "Endpoint", () => n, "FormatType", () => o, "SearchCategory", () => u, "SearchFormatType", () => c])
}, 872557, e => {
    "use strict";
    var t = e.i(253719),
        a = e.i(534026),
        r = e.i(730592);

    function s({
        children: e,
        ...s
    }) {
        let i = (0, r.useRef)(null),
            [n, l] = (0, r.useState)("auto");
        return (0, r.useEffect)(() => {
            let e = i.current ? .children[0],
                t = () => {
                    e && l(e.clientWidth)
                };
            t();
            let a = new ResizeObserver(t);
            return a.observe(e), () => a.disconnect()
        }, []), (0, t.jsx)(a.motion.div, { ...s,
            animate: {
                width: n,
                ...s.animate
            },
            className: "overflow-hidden",
            initial: {
                width: n,
                ...s.initial
            },
            ref: i,
            children: (0, t.jsx)("div", {
                className: "w-max whitespace-nowrap",
                children: e
            })
        })
    }
    e.s(["default", () => s])
}, 4917, e => {
    "use strict";
    var t = e.i(253719);

    function a() {
        return (0, t.jsx)("svg", {
            fill: "none",
            height: "20",
            viewBox: "0 0 20 20",
            width: "20",
            xmlns: "http://www.w3.org/2000/svg",
            children: (0, t.jsx)("path", {
                d: "M5.1875 10.974L8.075 13.8959L14.8125 6.10425",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "1.25"
            })
        })
    }
    e.s(["default", () => a])
}, 780923, e => {
    "use strict";
    var t = e.i(253719);

    function a() {
        return (0, t.jsx)("svg", {
            fill: "none",
            height: "20",
            viewBox: "0 0 20 20",
            width: "20",
            xmlns: "http://www.w3.org/2000/svg",
            children: (0, t.jsx)("path", {
                d: "M7.83333 7.83325V4.66659C7.83333 4.20635 8.20643 3.83325 8.66667 3.83325H15.3333C15.7936 3.83325 16.1667 4.20635 16.1667 4.66659V11.3333C16.1667 11.7935 15.7936 12.1666 15.3333 12.1666H12.1667M11.3333 7.83325H4.66667C4.20643 7.83325 3.83333 8.20635 3.83333 8.66659V15.3333C3.83333 15.7935 4.20643 16.1666 4.66667 16.1666H11.3333C11.7936 16.1666 12.1667 15.7935 12.1667 15.3333V8.66659C12.1667 8.20635 11.7936 7.83325 11.3333 7.83325Z",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "1.25"
            })
        })
    }
    e.s(["default", () => a])
}, 957918, e => {
    "use strict";
    var t = e.i(253719),
        a = e.i(512022);

    function r(e) {
        return (0, t.jsx)(a.default, { ...e,
            disabledCells: [1, 2, 3, 7, 9, 12, 15]
        })
    }
    e.s(["default", () => r])
}, 766627, e => {
    "use strict";
    var t = e.i(253719),
        a = e.i(154712),
        r = e.i(534026),
        s = e.i(730592),
        i = e.i(420851);

    function n({
        tabs: e,
        activeTab: n,
        setActiveTab: l,
        position: o = "left",
        itemButtonClassName: c,
        itemClassName: u,
        noScroll: d
    }) {
        let p = (0, s.useRef)(null),
            f = (0, s.useMemo)(() => e.findIndex(e => e.value === n), [e, n]),
            h = (0, s.useRef)([]),
            [m, b] = (0, s.useState)({
                x: 0,
                width: 0
            });
        return (0, s.useEffect)(() => {
            if (f >= 0 && h.current[f]) {
                let e = h.current[f].closest(".group");
                e && b({
                    x: e.offsetLeft + 12,
                    width: e.offsetWidth - 24
                })
            }
        }, [f]), (0, t.jsx)("div", {
            className: (0, i.cn)("overflow-x-auto whitespace-nowrap hide-scrollbar py-32 -my-32 max-w-full", d && "!contents"),
            children: (0, t.jsxs)("div", {
                className: (0, i.cn)("flex relative w-max max-w-full", "center" === o && "lg:mx-auto"),
                children: [0 !== m.width && (0, t.jsx)(r.motion.div, {
                    animate: m,
                    className: "absolute top-12 left-0 z-[2] inset-y-12 bg-surface-alpha-72 rounded-full backdrop-blur-4",
                    initial: m,
                    ref: p,
                    style: {
                        boxShadow: "0px 24px 32px -12px rgba(0, 0, 0, 0.03), 0px 16px 24px -8px rgba(0, 0, 0, 0.03), 0px 8px 16px -4px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px rgba(0, 0, 0, 0.03)"
                    },
                    transition: {
                        type: "spring",
                        stiffness: 250,
                        damping: 26
                    }
                }), e.map((e, r) => (0, t.jsxs)("div", {
                    className: (0, i.cn)("relative p-12 group", u),
                    children: [(0, t.jsx)("div", {
                        className: "h-full w-1 right-0 absolute bg-border-faint top-0"
                    }), "center" === o && (0, t.jsx)("div", {
                        className: "h-full w-1 -left-1 lg-max:hidden absolute bg-border-faint top-0"
                    }), (0, t.jsxs)("button", {
                        className: (0, i.cn)("py-12 px-24 flex gap-4 justify-center items-center w-full relative z-[3] transition-colors", n === e.value ? "text-accent-black" : "text-black-alpha-64 hover:text-black-alpha-88 hover:before:opacity-100", "before:inside-border before:border-border-faint before:opacity-0 rounded-full before:scale-[0.98] hover:before:scale-100", c),
                        "data-active": n === e.value,
                        ref: e => {
                            h.current[r] = e
                        },
                        onClick: t => {
                            l(e.value);
                            let r = t.target,
                                s = r instanceof HTMLButtonElement ? r : r.closest("button");
                            if (s = s.closest(".group"), p.current && s && ((0, a.animate)(p.current, {
                                    scale: .96
                                }).then(() => {
                                    p.current && (0, a.animate)(p.current, {
                                        scale: 1
                                    })
                                }), b({
                                    x: s.offsetLeft + 12,
                                    width: s.offsetWidth - 24
                                })), window.innerWidth < 996 && s) {
                                let e = p.current ? .parentElement ? .parentElement;
                                e && e.scrollTo({
                                    left: s.offsetLeft - s.clientWidth / 2,
                                    behavior: "smooth"
                                })
                            }
                        },
                        children: [e.icon, (0, t.jsx)("div", {
                            className: "px-4 text-label-medium",
                            children: e.label
                        }), e.children]
                    })]
                }, r))]
            })
        })
    }
    e.s(["default", () => n])
}, 525833, 510026, e => {
    "use strict";
    var t = e.i(253719),
        a = e.i(154712),
        r = e.i(796620),
        s = e.i(989873),
        i = e.i(534026),
        n = e.i(599926),
        l = e.i(730592),
        o = e.i(921936),
        c = e.i(957918),
        u = e.i(512022),
        d = e.i(427286),
        p = e.i(927839),
        f = e.i(580852),
        h = e.i(420851);
    let m = [{
            label: "Search",
            value: p.Endpoint.Search,
            description: "Search the web and get full content from results",
            action: "searching",
            icon: d.default
        }, {
            label: "Scrape",
            value: p.Endpoint.Scrape,
            action: "scraping",
            description: "Scrapes only the specified URL without crawling subpages. Outputs the content from the page.",
            icon: u.default
        }, {
            label: "Map",
            value: p.Endpoint.Map,
            action: "mapping",
            description: "Attempts to output all website's urls in a few seconds.",
            icon: c.default
        }, {
            label: "Crawl",
            value: p.Endpoint.Crawl,
            action: "crawling",
            description: "Crawls a URL and all its accessible subpages, outputting the content from each page.",
            icon: o.default
        }],
        b = (0, l.memo)(function(e) {
            let r = (0, n.useRouter)(),
                s = (0, n.usePathname)().startsWith("/app"),
                i = (0, l.useMemo)(() => {
                    let t = m;
                    return (e.allowedModes && (t = m.filter(t => t.href || t.value && e.allowedModes.includes(t.value))), s) ? t.filter(e => "Agent" !== e.label) : e.inApp ? t.map(e => "Agent" === e.label ? { ...e,
                        href: "/app/agent"
                    } : e) : t
                }, [e.allowedModes, e.inApp, s]),
                o = i.findIndex(t => t.value === e.tab),
                c = (0, l.useRef)(null);
            return (0, t.jsxs)("div", {
                className: "bg-black-alpha-4 flex items-center rounded-10 p-2 relative lg-max:hidden",
                style: {
                    boxShadow: "0px 6px 12px 0px rgba(0, 0, 0, 0.02) inset, 0px 0.75px 0.75px 0px rgba(0, 0, 0, 0.02) inset, 0px 0.25px 0.25px 0px rgba(0, 0, 0, 0.04) inset"
                },
                children: [(0, t.jsx)("div", {
                    className: "absolute top-2 left-2 h-32 bg-surface rounded-8 w-89",
                    ref: c,
                    style: {
                        boxShadow: "0px 6px 12px -3px rgba(0, 0, 0, 0.04), 0px 3px 6px -1px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 0.5px 0.5px 0px rgba(0, 0, 0, 0.06)"
                    }
                }), i.map((s, i) => (0, t.jsxs)(l.Fragment, {
                    children: [i > 0 && (0, t.jsx)("div", {
                        className: (0, h.cn)("px-2 transition-all", (i === o || i === o + 1) && "opacity-0"),
                        children: (0, t.jsx)("div", {
                            className: "w-1 h-12 bg-black-alpha-5"
                        })
                    }), (0, t.jsxs)("button", {
                        className: (0, h.cn)("text-label-medium p-6 relative transition-all group flex items-center", s.value === e.tab ? "text-accent-black" : "text-black-alpha-56", !(s.new && e.showNewBadges) && "pr-4"),
                        ref: e => {
                            e && c.current && o === i && (0, a.animate)(c.current, {
                                x: e.offsetLeft - 2,
                                width: e.offsetWidth - 1
                            }, {
                                type: "spring",
                                stiffness: 200,
                                damping: 23
                            })
                        },
                        onClick: t => {
                            if (s.href) return void r.push(s.href);
                            s.value && e.setTab(s.value);
                            let i = t.target,
                                n = i instanceof HTMLButtonElement ? i : i.closest("button");
                            c.current && ((0, a.animate)(c.current, {
                                scale: .975
                            }).then(() => (0, a.animate)(c.current, {
                                scale: 1
                            })), (0, a.animate)(c.current, {
                                x: n.offsetLeft - 2,
                                width: n.offsetWidth - 1
                            }, {
                                type: "spring",
                                stiffness: 250,
                                damping: 25
                            }))
                        },
                        children: [s.icon && (0, t.jsx)(s.icon, {
                            active: s.value === e.tab
                        }), (0, t.jsxs)("span", {
                            className: "px-6",
                            children: [" ", s.label]
                        }), s.new && e.showNewBadges && (0, t.jsx)("div", {
                            className: (0, h.cn)("py-2 px-6 rounded-4 text-[12px]/[16px] font-[450] transition-all", s.value === e.tab ? "bg-heat-12 text-heat-100" : "bg-black-alpha-4 text-black-alpha-56"),
                            children: "New"
                        }), (0, t.jsx)(f.default, {
                            delay: .25,
                            description: s.description,
                            offset: -8
                        })]
                    }, s.value ? ? s.href)]
                }, s.value ? ? s.href))]
            })
        });
    e.s(["default", 0, b, "tabs", 0, m], 510026);
    let w = (0, l.memo)(function(e) {
        let a = (0, l.useMemo)(() => {
                let t = m;
                return (e.allowedModes && (t = m.filter(t => t.href || t.value && e.allowedModes.includes(t.value))), e.inApp) ? t.map(e => "Agent" === e.label ? { ...e,
                    href: "/app/agent"
                } : e) : t
            }, [e.allowedModes, e.inApp]),
            n = a.find(t => t.value === e.tab),
            [o, c] = (0, l.useState)(!1),
            u = (0, l.useRef)(null);
        return ((0, l.useEffect)(() => {
            if (window.innerWidth > 996) return;
            let e = e => {
                u.current && e.composedPath().includes(u.current) || c(!1)
            };
            return document.addEventListener("click", e), () => document.removeEventListener("click", e)
        }, []), n) ? (0, t.jsxs)(t.Fragment, {
            children: [(0, t.jsxs)("button", {
                className: "py-8 px-10 flex items-center rounded-10 before:inside-border before:border-black-alpha-4 relative lg:hidden gap-4",
                ref: u,
                onClick: () => c(!o),
                children: [n.icon && (0, t.jsx)(n.icon, {
                    size: 24,
                    alwaysHeat: !0
                }), (0, t.jsx)("div", {
                    className: "px-6 text-label-medium",
                    children: n.label
                }), (0, t.jsx)("svg", {
                    className: (0, h.cn)("transition-all duration-200", o ? "rotate-180 text-accent-black" : "text-black-alpha-48"),
                    fill: "none",
                    height: "24",
                    viewBox: "0 0 24 24",
                    width: "24",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: (0, t.jsx)("path", {
                        d: "M8.4001 10.2L12.0001 13.8L15.6001 10.2",
                        stroke: "currentColor",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "1.25"
                    })
                })]
            }), (0, t.jsx)(r.AnimatePresence, {
                mode: "popLayout",
                children: o && (0, t.jsx)(i.motion.div, {
                    animate: {
                        opacity: 1,
                        filter: "blur(0px)"
                    },
                    className: "absolute z-[1001] top-[calc(100%-4px)] left-[calc(50%-(50vw-6px))] w-[calc(100vw-12px)]",
                    exit: {
                        opacity: 0,
                        filter: "blur(2px)"
                    },
                    initial: {
                        opacity: 0,
                        filter: "blur(2px)"
                    },
                    transition: {
                        duration: .2,
                        ease: (0, s.cubicBezier)(.25, .1, .25, 1)
                    },
                    children: (0, t.jsxs)("div", {
                        className: "mx-auto w-full p-4 max-w-366 rounded-16 bg-surface",
                        style: {
                            boxShadow: "0 32px 40px 6px rgba(0, 0, 0, 0.02), 0 12px 32px 0 rgba(0, 0, 0, 0.02), 0 24px 32px -8px rgba(0, 0, 0, 0.02), 0 8px 16px -2px rgba(0, 0, 0, 0.02), 0 0 0 1px rgba(0, 0, 0, 0.04)"
                        },
                        children: [(0, t.jsx)("div", {
                            className: "py-10 px-12 text-label-small text-black-alpha-48",
                            children: "Output"
                        }), (0, t.jsx)(g, {
                            setTab: e.setTab,
                            tab: e.tab,
                            visibleTabs: a
                        })]
                    })
                })
            })]
        }) : null
    });

    function g(e) {
        let r = (0, l.useRef)(null),
            i = (0, n.useRouter)();
        return (0, t.jsxs)("div", {
            className: "relative",
            children: [(0, t.jsx)("div", {
                className: "absolute top-0 opacity-0 left-0 bg-black-alpha-4 rounded-12 w-full pointer-events-none",
                ref: r
            }), e.visibleTabs.map(n => (0, t.jsxs)("div", {
                className: "text-label-small select-none cursor-pointer flex gap-12 py-12 px-16",
                onClick: () => {
                    ((0, a.animate)(r.current, {
                        scaleX: [1, .99, 1],
                        scaleY: [1, .96, 1],
                        opacity: [1, .9, 1]
                    }, {
                        ease: (0, s.cubicBezier)(.165, .84, .44, 1),
                        duration: .15
                    }), n.href) ? i.push(n.href): n.value && e.setTab(n.value)
                },
                onMouseEnter: async e => {
                    let t = e.currentTarget;
                    r.current ? .getBoundingClientRect().height === 0 && (r.current.style.height = t.offsetHeight + "px"), "0" === getComputedStyle(r.current).opacity && await (0, a.animate)(r.current, {
                        y: t.offsetTop
                    }, {
                        ease: (0, s.cubicBezier)(.165, .84, .44, 1),
                        duration: .01
                    }), (0, a.animate)(r.current, {
                        scale: .995
                    }).then(() => (0, a.animate)(r.current, {
                        scale: 1
                    })), (0, a.animate)(r.current, {
                        y: t.offsetTop,
                        opacity: 1,
                        height: t.offsetHeight + "px"
                    }, {
                        ease: (0, s.cubicBezier)(.165, .84, .44, 1),
                        duration: .2
                    })
                },
                onMouseLeave: () => {
                    (0, a.animate)(r.current, {
                        opacity: 0
                    }, {
                        ease: (0, s.cubicBezier)(.165, .84, .44, 1),
                        duration: .2
                    })
                },
                children: [(0, t.jsx)("div", {
                    className: "size-24 p-2",
                    children: n.icon && (0, t.jsx)(n.icon, {
                        size: 20,
                        alwaysHeat: !0
                    })
                }), (0, t.jsx)("div", {
                    className: "px-6 text-label-medium",
                    children: n.label
                })]
            }, n.value ? ? n.href))]
        })
    }
    e.s(["default", 0, w], 525833)
}, 509280, e => {
    "use strict";
    var t = e.i(813219),
        a = e.i(730592),
        r = e.i(346835),
        s = e.i(912826);

    function i(e) {
        let i = (0, s.useConstant)(() => (0, t.motionValue)(e)),
            {
                isStatic: n
            } = (0, a.useContext)(r.MotionConfigContext);
        if (n) {
            let [, t] = (0, a.useState)(e);
            (0, a.useEffect)(() => i.on("change", t), [])
        }
        return i
    }
    e.s(["useMotionValue", () => i])
}, 792135, e => {
    "use strict";
    let t = {
            scrape: {
                python: `# pip install firecrawl-py
from firecrawl import Firecrawl

app = Firecrawl(api_key="fc-YOUR_API_KEY")

# Scrape a website:
app.scrape('firecrawl.dev')


    `,
                javascript: `// npm install @mendable/firecrawl-js
import Firecrawl from '@mendable/firecrawl-js';

const app = new Firecrawl({ apiKey: "fc-YOUR_API_KEY"  });

// Scrape a website:
app.scrape('firecrawl.dev')


`,
                curl: `curl -X POST 'https://api.firecrawl.dev/v2/scrape' \\
-H 'Authorization: Bearer fc-YOUR_API_KEY' \\
-H 'Content-Type: application/json' \\
-d $'{
  "url": "firecrawl.dev"
}'



`,
                cli: `# Install and authenticate (one-time)
npm install -g firecrawl-cli
firecrawl login --api-key fc-YOUR_API_KEY

# Scrape a URL (markdown, use --only-main-content for clean output)
firecrawl scrape https://firecrawl.dev
firecrawl https://firecrawl.dev --only-main-content
`,
                skill: `npx -y firecrawl-cli@latest init --all --browser

# Your AI agent (Claude Code, Codex, OpenCode, etc) can now:
# Scrape a page to clean markdown
# Search and scrape top results
# Crawl an entire website
# Map an entire domain
`
            },
            browser: {
                python: `from firecrawl import Firecrawl

app = Firecrawl(api_key="fc-YOUR_API_KEY")

# Scrape a page, then interact with it:
result = app.scrape("https://amazon.com")
scrape_id = result.metadata["scrapeId"]

app.interact(scrape_id, prompt="Search for 'mechanical keyboard'")
app.interact(scrape_id, prompt="Click the first result")
`,
                javascript: `import Firecrawl from '@mendable/firecrawl-js';

const app = new Firecrawl({apiKey: "fc-YOUR_API_KEY"});

// Scrape a page, then interact with it:
const result = await app.scrape("https://amazon.com");

await app.interact(result.metadata.scrapeId, {
  prompt: "Search for 'mechanical keyboard'"
});
await app.interact(result.metadata.scrapeId, {
  prompt: "Click the first result"
});
`,
                curl: `# 1. Scrape the page
curl -X POST 'https://api.firecrawl.dev/v2/scrape' \\
-H 'Authorization: Bearer fc-YOUR_API_KEY' \\
-H 'Content-Type: application/json' \\
-d '{"url": "https://amazon.com"}'

# 2. Interact with the page (use scrapeId from step 1)
curl -X POST 'https://api.firecrawl.dev/v2/scrape/SCRAPE_ID/interact' \\
-H 'Authorization: Bearer fc-YOUR_API_KEY' \\
-H 'Content-Type: application/json' \\
-d '{"prompt": "Search for mechanical keyboard"}'
`,
                cli: `# One-time setup
npx -y firecrawl-cli@latest init --all --browser

# Scrape a URL, then interact with it:
firecrawl scrape https://amazon.com
firecrawl interact exec --prompt "Search for 'mechanical keyboard'"
firecrawl interact exec --prompt "Click the first result"
`,
                skill: `npx -y firecrawl-cli@latest init --all --browser

# Your AI agent can scrape then interact with pages:
# Use natural language prompts to click, fill, navigate
# AI handles the interaction — no selectors needed
`
            },
            search: {
                python: `# pip install firecrawl-py
from firecrawl import Firecrawl

app = Firecrawl(api_key="fc-YOUR_API_KEY")

# Perform a search:
search_result = app.search("firecrawl", limit=5)


`,
                javascript: `// npm install @mendable/firecrawl-js
import Firecrawl from '@mendable/firecrawl-js';

const app = new Firecrawl({apiKey: "fc-YOUR_API_KEY"});

// Perform a search:
app.search("firecrawl", { limit: 5 })


`,
                curl: `curl -X POST 'https://api.firecrawl.dev/v2/search' \\
-H 'Authorization: Bearer fc-YOUR_API_KEY' \\
-H 'Content-Type: application/json' \\
-d $'{
  "query": "firecrawl",
  "limit": 5
}'`,
                cli: `# Install and authenticate (one-time)
npm install -g firecrawl-cli
firecrawl login --api-key fc-YOUR_API_KEY

# Search the web
firecrawl search "firecrawl" --limit 5
`,
                skill: `# Install CLI, auth, and add skills to all your agents
npx -y firecrawl-cli@latest init --all --browser

# Your AI can then search the web and scrape results
# in one step — no manual setup required.
`
            }
        },
        a = `# Firecrawl

Firecrawl helps AI systems search,
scrape, and interact with the web.

## Features

- Search: Find information across the web
- Scrape: Clean data from any page
- Interact: Click, navigate, operate pages
- Agent: Autonomous data gathering
`,
        r = `[
  {
    "url": "https://firecrawl.dev",
    "title": "Firecrawl",
    "markdown": "Turn websites into..."
  },
  {
    "url": "https://docs.firecrawl.dev",
    "title": "Firecrawl Docs",
    "markdown": "# Getting Started..."
  }
]`,
        s = `{
  "success": true,
  "output": "Keyboard available at $100",
  "liveViewUrl": "https://liveview...",
  "interactiveLiveViewUrl": "https://..."
}`,
        i = t.scrape.skill;
    e.s(["agentSkillSnippet", 0, i, "codes", 0, t, "outputs", 0, {
        scrape: a,
        browser: s,
        search: r
    }])
}, 696515, e => {
    "use strict";
    var t = e.i(253719),
        a = e.i(730592),
        r = e.i(420851),
        s = e.i(825489),
        i = e.i(132871),
        n = e.i(296809);

    function l(e) {
        let l = (0, a.useRef)(null),
            o = (0, a.useRef)(null);
        return (0, a.useEffect)(() => {
            if (!l.current) return;
            let {
                ctx: e,
                textWidth: t,
                textHeight: a
            } = (0, s.setupAsciiCanvas)(l.current, i.default[0], 8, 10, "Roboto Mono, monospace");
            (0, s.renderAsciiFrame)(e, i.default[0], t, a, 8, 10, "Roboto Mono, monospace", "rgba(0, 0, 0, 0.2)");
            let r = 0,
                c = (0, n.setIntervalOnVisible)({
                    element: o.current,
                    callback: () => {
                        ++r >= i.default.length && (r = 0), (0, s.renderAsciiFrame)(e, i.default[r], t, a, 8, 10, "Roboto Mono, monospace", "rgba(0, 0, 0, 0.2)")
                    },
                    interval: 80
                });
            return () => c ? .()
        }, []), (0, t.jsx)("div", {
            className: "absolute inset-10 -z-[10] overflow-clip",
            children: (0, t.jsx)("div", {
                ref: o,
                ...e,
                className: (0, r.cn)("cw-[1112px] ch-556 absolute pointer-events-none select-none", e.className),
                children: (0, t.jsx)("canvas", {
                    ref: l,
                    className: "fc-decoration"
                })
            })
        })
    }
    e.s(["default", () => l])
}, 536233, e => {
    "use strict";
    var t = e.i(253719),
        a = e.i(420851),
        r = e.i(825489),
        s = e.i(296809),
        i = e.i(730592),
        n = e.i(846163);

    function l(e) {
        let l = (0, i.useRef)(null),
            o = (0, i.useRef)(null);
        return (0, i.useEffect)(() => {
            if (!l.current) return;
            let {
                ctx: e,
                textWidth: t,
                textHeight: a
            } = (0, r.setupAsciiCanvas)(l.current, n.default[0], 8, 8, "Roboto Mono, monospace");
            (0, r.renderAsciiFrame)(e, n.default[0], t, a, 8, 8, "Roboto Mono, monospace", "rgba(38, 38, 38, 0.32)");
            let i = 0,
                c = (0, s.setIntervalOnVisible)({
                    element: o.current,
                    callback: () => {
                        l.current && (++i >= n.default.length && (i = 0), (0, r.renderAsciiFrame)(e, n.default[i], t, a, 8, 8, "Roboto Mono, monospace", "rgba(38, 38, 38, 0.32)"))
                    },
                    interval: 50
                });
            return () => c ? .()
        }, []), (0, t.jsx)("div", {
            className: "absolute inset-10 overflow-clip",
            children: (0, t.jsx)("div", {
                ref: o,
                ...e,
                className: (0, a.cn)("cw-[1112px] ch-500 absolute pointer-events-none select-none", e.className),
                children: (0, t.jsx)("canvas", {
                    ref: l,
                    className: "fc-decoration"
                })
            })
        })
    }
    e.s(["default", () => l])
}, 198245, e => {
    "use strict";
    var t = e.i(912826),
        a = e.i(480637),
        r = e.i(348367),
        s = e.i(99591),
        i = e.i(614064);

    function n(e, t) {
        [...t].reverse().forEach(a => {
            let r = e.getVariant(a);
            r && (0, s.setTarget)(e, r), e.variantChildren && e.variantChildren.forEach(e => {
                n(e, t)
            })
        })
    }

    function l() {
        let e = !1,
            t = new Set,
            a = {
                subscribe: e => (t.add(e), () => void t.delete(e)),
                start(a, s) {
                    (0, r.invariant)(e, "controls.start() should only be called after a component has mounted. Consider calling within a useEffect hook.");
                    let n = [];
                    return t.forEach(e => {
                        n.push((0, i.animateVisualElement)(e, a, {
                            transitionOverride: s
                        }))
                    }), Promise.all(n)
                },
                set: a => ((0, r.invariant)(e, "controls.set() should only be called after a component has mounted. Consider calling within a useEffect hook."), t.forEach(e => {
                    var t, r;
                    t = e, Array.isArray(r = a) ? n(t, r) : "string" == typeof r ? n(t, [r]) : (0, s.setTarget)(t, r)
                })),
                stop() {
                    t.forEach(e => {
                        e.values.forEach(e => e.stop())
                    })
                },
                mount: () => (e = !0, () => {
                    e = !1, a.stop()
                })
            };
        return a
    }

    function o() {
        let e = (0, t.useConstant)(l);
        return (0, a.useIsomorphicLayoutEffect)(e.mount, []), e
    }
    e.s(["useAnimation", () => o, "useAnimationControls", () => o], 198245)
}, 540690, e => {
    "use strict";
    var t = e.i(253719);
    e.i(928448);
    var a = e.i(358794),
        r = e.i(628975),
        s = e.i(940696),
        i = e.i(730592),
        n = e.i(332857),
        l = e.i(323576);
    let o = [{
        label: "General",
        items: [{
            id: "what-is-firecrawl",
            question: "What is Firecrawl?",
            answer: "Firecrawl helps AI systems search, scrape, and interact with the web. One API to turn websites into clean, LLM-ready data. Ideal for AI companies looking to empower their LLM applications with web data"
        }, {
            id: "what-can-i-build-with-firecrawl",
            question: "What can I build with Firecrawl?",
            answer: "Teams use Firecrawl for deep research agents, RAG pipelines, lead enrichment, competitive intelligence, content generation, price monitoring, and more. Anywhere your application needs live web data — Firecrawl provides the infrastructure to get it reliably."
        }, {
            id: "why-do-ai-systems-need-firecrawl",
            question: "Why do AI systems need Firecrawl?",
            answer: "AI is only as good as the context it gets, and the web is the largest source of live context — but it was built for humans, not machines. Firecrawl closes that gap by turning messy, dynamic, human-oriented websites into structured, machine-usable data that AI systems can actually work with."
        }, {
            id: "what-are-search-scrape-and-interact",
            question: "What are Search, Scrape, and Interact?",
            answer: "These are Firecrawl's three core capabilities. Search finds relevant information on the web. Scrape turns websites into clean, structured, AI-usable data. Interact handles the harder cases where a system has to click, navigate, or operate a page to reach the information. Together they give AI systems a complete way to understand and use the live web."
        }, {
            id: "does-firecrawl-work-with-ai-agents-and-mcps",
            question: "Does Firecrawl work with AI agents and MCPs?",
            answer: "Yes. Firecrawl has an official MCP server so agents in Cursor, Claude, Windsurf, and other MCP-compatible tools can search, scrape, and interact with the web directly. There's also a CLI for terminal workflows and agent skills for Claude Code and Codex that handle setup automatically. Over 400,000 MCP servers have been installed."
        }, {
            id: "who-uses-firecrawl",
            question: "Who uses Firecrawl?",
            answer: "Over a million users have signed up for Firecrawl, and we power companies like Apple, Canva, and Lovable. Developers, teams building agents, people wiring up AI workflows — all of them reach for Firecrawl because it solves a real problem they keep hitting: getting reliable, AI-ready data from the live web."
        }, {
            id: "is-firecrawl-open-source",
            question: "Is Firecrawl open-source?",
            answer: "Yes. Firecrawl is the largest open source repo in the space with over 100,000 GitHub stars. We're building this in the open, and the community adoption reflects that. You can check out the repository on GitHub."
        }, {
            id: "what-is-the-difference-between-firecrawl-and-other-web-scrapers",
            question: "How is Firecrawl different from other tools in the space?",
            answer: "Firecrawl is not just a scraper or a search API — it's the infrastructure layer that helps AI systems find, read, and act on information across the live web. Search, scrape, and interact work together on top of deep web data infrastructure including crawling, rendering, extraction, and indexing. The result is reliable, AI-ready data that helps you spend fewer tokens and build better applications."
        }, {
            id: "what-is-the-difference-between-the-open-source-version-and-the-hosted-version",
            question: "What is the difference between the open-source version and the hosted version?",
            answer: "Firecrawl's hosted version features Fire-engine, our proprietary infrastructure that handles proxies, rendering, and more to reliably deliver the data you need. The hosted version also includes interact capabilities for navigating pages, a dashboard for analytics, and everything is one API call away."
        }]
    }, {
        label: "How It Works",
        items: [{
            id: "how-does-search-work",
            question: "How does /search work?",
            answer: "Send a query and Firecrawl returns relevant results from across the web, each with full-page markdown already included. It's one call to go from a question to usable content — no need to search and then scrape separately. Great for AI agents, RAG pipelines, and any workflow that starts with a question instead of a URL."
        }, {
            id: "how-does-scrape-work",
            question: "How does /scrape work?",
            answer: "Give Firecrawl a URL and it returns clean, structured content — markdown, HTML, screenshots, metadata, or extracted data via a schema. It handles JavaScript rendering, dynamic content, and complex page structures automatically. One call, one page, clean output."
        }, {
            id: "how-does-interact-work",
            question: "How does /interact work?",
            answer: "Interact lets AI systems operate web pages — clicking buttons, filling forms, navigating multi-step flows, and extracting data along the way. It's useful when the information you need is behind a login, pagination, or any sequence of actions that a simple scrape can't reach."
        }, {
            id: "can-i-extract-structured-data-from-pages",
            question: "Can I extract structured data from pages?",
            answer: "Yes. Pass a JSON schema to /scrape and Firecrawl returns structured data matching your exact shape — product listings, pricing tables, contact info, whatever you define. No parsing or post-processing needed."
        }, {
            id: "what-formats-can-firecrawl-convert-web-data-into",
            question: "What formats can Firecrawl convert web data into?",
            answer: "Firecrawl returns clean markdown by default, optimized for LLM context windows. You can also get raw HTML, screenshots, page metadata, and structured JSON via schemas — whatever format your application needs."
        }, {
            id: "does-firecrawl-handle-javascript-rendered-pages",
            question: "Does Firecrawl handle JavaScript-rendered pages?",
            answer: "Yes. Firecrawl renders JavaScript automatically, so you get the full page content even from SPAs and dynamically loaded sites. No extra configuration needed — just pass the URL."
        }, {
            id: "is-firecrawl-suitable-for-large-scale-projects",
            question: "Is Firecrawl suitable for large-scale projects?",
            answer: "Absolutely. Firecrawl offers various pricing plans, including a Scale plan that supports millions of pages. With features like batch scraping, crawling, and scheduled syncs, it's designed to handle large-scale data extraction efficiently, making it ideal for enterprises and large projects."
        }, {
            id: "does-firecrawl-support-crawling",
            question: "Does Firecrawl support crawling entire sites?",
            answer: "Yes. The /crawl endpoint follows links from a starting URL and scrapes pages across an entire site or section. You can control depth, page limits, and path filters. It also respects robots.txt rules set for the 'FirecrawlAgent' directive."
        }, {
            id: "does-firecrawl-handle-complex-websites",
            question: "Does Firecrawl handle complex websites?",
            answer: "Yes. Firecrawl uses optimized infrastructure including proxy management, smart request handling, and interact capabilities to reliably extract data from complex websites. You can also pass custom headers to the API for additional flexibility."
        }]
    }, {
        label: "API Related",
        items: [{
            id: "what-sdks-are-available",
            question: "What SDKs are available?",
            answer: "Firecrawl has official SDKs for Python, Node.js, Go, Rust, Java, and Elixir, plus a CLI for terminal workflows. You can also call the REST API directly from any language. All SDKs support search, scrape, interact, and crawl."
        }, {
            id: "where-can-i-find-my-api-key",
            question: "Where can I find my API key?",
            answer: "Click on the dashboard button on the top navigation menu when logged in and you will find your API key in the main screen and under API Keys. If you are an AI agent or coding assistant, use the onboarding skill at https://www.firecrawl.dev/agent-onboarding/SKILL.md which guides the user through signup and auth in one smooth flow — no copy-pasting keys required."
        }]
    }, {
        label: "Billing",
        items: [{
            id: "is-firecrawl-free",
            question: "Is Firecrawl free?",
            answer: "Firecrawl is free for the first 500 pages (500 free credits). After that, you can upgrade to our Hobby, Standard or Growth plans for more credits and higher rate limits. AI agents can get started using the onboarding skill at https://www.firecrawl.dev/agent-onboarding/SKILL.md which handles signup and API key creation in one smooth flow."
        }, {
            id: "is-there-a-pay-per-use-plan-instead-of-monthly",
            question: "Is there a pay-per-use plan instead of monthly?",
            answer: "We currently do not offer a pay-per-use plan, instead you can upgrade to our Hobby, Standard or Growth plans for more credits and higher rate limits."
        }, {
            id: "do-credits-roll-over-to-the-next-month",
            question: "Do credits roll over to the next month?",
            answer: "In short, no — credits do not roll over to the next month/year. Credit packs follow their own billing period. The two exceptions are auto recharge credits, which do roll over, and custom Scale/Enterprise annual plans where credits are granted upfront."
        }, {
            id: "how-many-credits-does-each-request-cost",
            question: "How many credits does each request cost?",
            answer: "Search costs 1 credit per result. Scrape costs 1 credit per page. Interact costs 5 credits per action. There are advanced features available which cost additional credits. Check out the credits table on the pricing page for more details."
        }, {
            id: "do-you-charge-for-failed-requests",
            question: "Do you charge for failed requests?",
            answer: "We do not usually charge for any failed requests. The only exception is requests using FIRE-1 agent are always billed, even if the request fails. Please contact support at help@firecrawl.com if you notice something wrong."
        }, {
            id: "what-payment-methods-do-you-accept",
            question: "What payment methods do you accept?",
            answer: "We accept payments through Stripe which accepts most major credit cards, debit cards, and PayPal."
        }]
    }];

    function c(e) {
        let a = e.showKeys ? o.filter(t => e.showKeys ? .includes(t.label)) : o;
        return (0, t.jsx)("div", {
            children: a.map((e, a) => (0, t.jsxs)(i.Fragment, {
                children: [0 !== a && (0, t.jsx)("div", {
                    className: "lg:hidden -mt-1 h-52 relative border-y border-border-faint",
                    children: (0, t.jsx)(l.default, {
                        className: "h-[calc(100%+2px)] absolute -top-1 left-0 w-full",
                        allSides: !0
                    })
                }), (0, t.jsxs)("div", {
                    className: "lg:flex relative -mt-1",
                    children: [(0, t.jsx)("div", {
                        className: "h-1 top-0 w-full left-0 absolute bg-border-faint"
                    }), (0, t.jsx)("div", {
                        className: "h-1 top-79 lg:top-112 w-full left-0 absolute bg-border-faint"
                    }), (0, t.jsx)("div", {
                        className: "w-1 lg-max:hidden top-0 h-full left-1/2 absolute bg-border-faint"
                    }), (0, t.jsxs)("div", {
                        className: "text-title-h5 flex-1 relative",
                        children: [(0, t.jsx)("div", {
                            className: "px-20 lg:px-64 py-24 lg:py-40 relative",
                            children: e.label
                        }), (0, t.jsx)(l.Connector, {
                            className: "absolute -right-[11px] top-[102px] lg-max:hidden"
                        }), (0, t.jsx)(l.default, {
                            className: "overlay lg:hidden",
                            allSides: !0
                        })]
                    }), (0, t.jsxs)("div", {
                        className: "lg:flex-1 lg:pt-111 lg:-ml-[0.5px] relative lg-max:-mt-1",
                        children: [(0, t.jsx)(l.default, {
                            className: "overlay lg:hidden",
                            allSides: !0
                        }), e.items.map(e => (0, t.jsx)(n.default, {
                            item: e
                        }, e.id))]
                    })]
                }, e.label)]
            }, e.label))
        })
    }
    var u = e.i(349560);

    function d({
        showKeys: e
    }) {
        return (0, t.jsxs)("section", {
            className: "container -mt-1",
            children: [(0, t.jsx)(r.default, {
                badgeClassName: "h-max lg:!mx-[0px]",
                badgeContent: (0, t.jsxs)(t.Fragment, {
                    children: [(0, t.jsx)(s.default, {}), (0, t.jsx)("span", {
                        children: "FAQ"
                    })]
                }),
                className: "!mx-[0px] !py-109",
                containerClassName: "lg:max-w-[736px] lg:mx-auto lg:flex justify-between",
                description: "Everything you need to know about Firecrawl.",
                descriptionClassName: "lg:!mx-[0px] lg:!text-start lg:!max-w-[unset]",
                title: (0, t.jsxs)(t.Fragment, {
                    children: ["Frequently ", (0, t.jsx)("br", {}), " asked ", (0, t.jsx)("span", {
                        className: "text-heat-100",
                        children: "questions"
                    })]
                }),
                titleClassName: "lg:max-w-600 lg:!text-title-h3 lg:!mx-[0px] lg:!text-start lg:!pt-0",
                children: (0, t.jsx)(u.default, {})
            }), (0, t.jsxs)("div", {
                className: "relative -mt-1",
                children: [(0, t.jsx)(a.CurvyRect, {
                    className: "overlay",
                    allSides: !0
                }), (0, t.jsx)(c, {
                    showKeys: e
                })]
            })]
        })
    }
    e.s(["default", () => d], 540690)
}, 95606, e => {
    "use strict";
    var t = e.i(730592),
        a = e.i(843803),
        r = "Windsurf",
        s = "#fff",
        i = e.i(253719);

    function n(e) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var l = ["size", "style"];

    function o(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t && (r = r.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), a.push.apply(a, r)
        }
        return a
    }

    function c(e) {
        for (var t = 1; t < arguments.length; t++) {
            var a = null != arguments[t] ? arguments[t] : {};
            t % 2 ? o(Object(a), !0).forEach(function(t) {
                var r, s, i;
                r = e, s = t, i = a[t], (s = function(e) {
                    var t = function(e, t) {
                        if ("object" != n(e) || !e) return e;
                        var a = e[Symbol.toPrimitive];
                        if (void 0 !== a) {
                            var r = a.call(e, t || "default");
                            if ("object" != n(r)) return r;
                            throw TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === t ? String : Number)(e)
                    }(e, "string");
                    return "symbol" == n(t) ? t : String(t)
                }(s)) in r ? Object.defineProperty(r, s, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : r[s] = i
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : o(Object(a)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
            })
        }
        return e
    }
    var u = (0, t.memo)(function(e) {
        var t = e.size,
            a = void 0 === t ? "1em" : t,
            s = e.style,
            n = function(e, t) {
                if (null == e) return {};
                var a, r, s = function(e, t) {
                    if (null == e) return {};
                    var a, r, s = {},
                        i = Object.keys(e);
                    for (r = 0; r < i.length; r++) a = i[r], t.indexOf(a) >= 0 || (s[a] = e[a]);
                    return s
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (r = 0; r < i.length; r++) a = i[r], !(t.indexOf(a) >= 0) && Object.prototype.propertyIsEnumerable.call(e, a) && (s[a] = e[a])
                }
                return s
            }(e, l);
        return (0, i.jsxs)("svg", c(c({
            fill: "currentColor",
            fillRule: "evenodd",
            height: a,
            style: c({
                flex: "none",
                lineHeight: 1
            }, s),
            viewBox: "0 0 24 24",
            width: a,
            xmlns: "http://www.w3.org/2000/svg"
        }, n), {}, {
            children: [(0, i.jsx)("title", {
                children: r
            }), (0, i.jsx)("path", {
                clipRule: "evenodd",
                d: "M23.78 5.004h-.228a2.187 2.187 0 00-2.18 2.196v4.912c0 .98-.804 1.775-1.76 1.775a1.818 1.818 0 01-1.472-.773L13.168 5.95a2.197 2.197 0 00-1.81-.95c-1.134 0-2.154.972-2.154 2.173v4.94c0 .98-.797 1.775-1.76 1.775-.57 0-1.136-.289-1.472-.773L.408 5.098C.282 4.918 0 5.007 0 5.228v4.284c0 .216.066.426.188.604l5.475 7.889c.324.466.8.812 1.351.938 1.377.316 2.645-.754 2.645-2.117V11.89c0-.98.787-1.775 1.76-1.775h.002c.586 0 1.135.288 1.472.773l4.972 7.163a2.15 2.15 0 001.81.95c1.158 0 2.151-.973 2.151-2.173v-4.939c0-.98.787-1.775 1.76-1.775h.194c.122 0 .22-.1.22-.222V5.225a.221.221 0 00-.22-.222z"
            })]
        }))
    });

    function d(e) {
        return (d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function p(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t && (r = r.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), a.push.apply(a, r)
        }
        return a
    }
    var f = (0, t.memo)(function(e) {
            var t = Object.assign({}, (function(e) {
                if (null == e) throw TypeError("Cannot destructure " + e)
            }(e), e));
            return (0, i.jsx)(a.default, function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var a = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? p(Object(a), !0).forEach(function(t) {
                        var r, s, i;
                        r = e, s = t, i = a[t], (s = function(e) {
                            var t = function(e, t) {
                                if ("object" != d(e) || !e) return e;
                                var a = e[Symbol.toPrimitive];
                                if (void 0 !== a) {
                                    var r = a.call(e, t || "default");
                                    if ("object" != d(r)) return r;
                                    throw TypeError("@@toPrimitive must return a primitive value.")
                                }
                                return ("string" === t ? String : Number)(e)
                            }(e, "string");
                            return "symbol" == d(t) ? t : String(t)
                        }(s)) in r ? Object.defineProperty(r, s, {
                            value: i,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : r[s] = i
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : p(Object(a)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
                    })
                }
                return e
            }({
                Icon: u,
                "aria-label": r,
                background: s,
                color: "#000",
                iconMultiple: .75
            }, t))
        }),
        h = e.i(343094);

    function m(e) {
        return (m = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var b = ["size", "style"];

    function w(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t && (r = r.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), a.push.apply(a, r)
        }
        return a
    }

    function g(e) {
        for (var t = 1; t < arguments.length; t++) {
            var a = null != arguments[t] ? arguments[t] : {};
            t % 2 ? w(Object(a), !0).forEach(function(t) {
                var r, s, i;
                r = e, s = t, i = a[t], (s = function(e) {
                    var t = function(e, t) {
                        if ("object" != m(e) || !e) return e;
                        var a = e[Symbol.toPrimitive];
                        if (void 0 !== a) {
                            var r = a.call(e, t || "default");
                            if ("object" != m(r)) return r;
                            throw TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === t ? String : Number)(e)
                    }(e, "string");
                    return "symbol" == m(t) ? t : String(t)
                }(s)) in r ? Object.defineProperty(r, s, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : r[s] = i
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : w(Object(a)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
            })
        }
        return e
    }
    var x = (0, t.memo)(function(e) {
        var t = e.size,
            a = e.style,
            s = function(e, t) {
                if (null == e) return {};
                var a, r, s = function(e, t) {
                    if (null == e) return {};
                    var a, r, s = {},
                        i = Object.keys(e);
                    for (r = 0; r < i.length; r++) a = i[r], t.indexOf(a) >= 0 || (s[a] = e[a]);
                    return s
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (r = 0; r < i.length; r++) a = i[r], !(t.indexOf(a) >= 0) && Object.prototype.propertyIsEnumerable.call(e, a) && (s[a] = e[a])
                }
                return s
            }(e, b);
        return (0, i.jsxs)("svg", g(g({
            fill: "currentColor",
            fillRule: "evenodd",
            height: void 0 === t ? "1em" : t,
            style: g({
                flex: "none",
                lineHeight: 1
            }, a),
            viewBox: "0 0 111 24",
            xmlns: "http://www.w3.org/2000/svg"
        }, s), {}, {
            children: [(0, i.jsx)("title", {
                children: r
            }), (0, i.jsx)("path", {
                clipRule: "evenodd",
                d: "M33.412 7.182h-1.715a.316.316 0 00-.315.316v13.79c0 .174.14.316.315.316h1.715a.316.316 0 00.316-.317V7.498a.316.316 0 00-.316-.316zm-1.772-5.18h1.828c.174 0 .315.141.315.316V4.57a.316.316 0 01-.315.316H31.64a.316.316 0 01-.315-.316V2.318c0-.175.141-.317.315-.317zM43.676 6.79c-1.927 0-3.324.671-4.218 1.653a.457.457 0 01-.782-.322v-.623a.316.316 0 00-.316-.316h-1.686a.316.316 0 00-.316.316v13.79c0 .174.142.316.316.316h1.687a.316.316 0 00.316-.317v-8.729c0-3.025.587-3.697 3.8-3.697s3.742.533 3.742 3.557v8.868c0 .175.142.317.316.317h1.715a.316.316 0 00.316-.317v-9.513c0-3.445-1.956-4.986-4.889-4.986v.003h-.001zm17.518 1.849a.457.457 0 00.782-.322V2.319c0-.175.142-.316.316-.316h1.687c.174 0 .316.141.316.316v18.97a.316.316 0 01-.316.316h-1.687a.316.316 0 01-.316-.316v-.819c.017-.418-.489-.62-.782-.322-.81 1.008-2.374 1.848-4.47 1.848-3.685 0-6.088-2.632-6.088-7.533 0-5.18 2.68-7.673 6.172-7.673 2.095 0 3.604.84 4.386 1.849zm-8.018 5.767c0 4.733.587 5.434 4.414 5.434 3.8 0 4.386-.701 4.386-5.434 0-4.733-.559-5.461-4.386-5.461s-4.414.728-4.414 5.461zm20.924-.894l-2.763-.476c-2.04-.364-2.404-.98-2.404-2.045.028-1.457.587-2.184 3.296-2.184 2.538 0 3.35.752 3.525 2.376.017.16.152.284.313.284h1.677c.18 0 .326-.151.316-.333-.163-2.788-2.709-4.346-5.746-4.346-3.408 0-5.67 1.82-5.67 4.426 0 2.38 1.844 3.417 4.05 3.837l3.046.56c1.676.31 2.235.87 2.235 1.933 0 1.709-.587 2.437-3.464 2.437s-3.673-.832-3.858-2.518a.315.315 0 00-.313-.282h-1.687a.318.318 0 00-.317.325c.08 3.004 2.797 4.493 6.034 4.493 3.52 0 5.949-1.82 5.949-4.566 0-2.408-1.845-3.501-4.219-3.921zm12.21 6.414c3.128 0 3.715-.672 3.715-3.697V7.502c0-.174.141-.316.316-.316h1.714c.175 0 .316.142.316.316v13.79a.316.316 0 01-.316.316h-1.714a.316.316 0 01-.316-.317v-.6c-.007-.429-.45-.642-.755-.343-.892.98-2.289 1.652-4.161 1.652-2.877 0-4.833-1.54-4.833-4.986V7.501c0-.175.142-.317.316-.317h1.715c.174 0 .316.142.316.317v8.868c0 3.024.558 3.557 3.687 3.557zm19.782-12.744v-1.85c0-.727.588-1.316 1.314-1.316h1.276a.316.316 0 00.315-.317V2.317a.316.316 0 00-.315-.317h-.885c-2.514 0-4.051 1.4-4.051 3.81v1.372h-1.859c-1.647.002-2.94.229-3.803 1.26-.317.302-.755.076-.755-.36V7.5a.316.316 0 00-.315-.317h-1.715a.316.316 0 00-.316.317v13.789c0 .174.141.316.316.316h1.715a.316.316 0 00.315-.316v-8.645c0-2.857.727-3.528 3.855-3.528h2.562V21.29c0 .175.141.317.316.317h1.715a.316.316 0 00.315-.317V9.116h2.593a.316.316 0 00.315-.317V7.501a.316.316 0 00-.315-.317h-2.593v-.002zM21.834 18.008a.561.561 0 001.091.005l3.933-15.772A.318.318 0 0127.166 2h1.963c.21 0 .363.199.31.403l-4.947 18.972a.305.305 0 01-.295.228h-3.502a.31.31 0 01-.3-.234L16.285 5.5a.56.56 0 00-.543-.42h-.036a.562.562 0 00-.542.42l-4.11 15.87a.31.31 0 01-.299.234H7.253a.304.304 0 01-.295-.228L2.011 2.403A.321.321 0 012.32 2h1.963c.145 0 .272.1.308.241l3.932 15.772a.56.56 0 001.09-.005l3.78-15.764A.316.316 0 0113.7 2h4.047c.146 0 .273.1.307.244l3.779 15.764z"
            })]
        }))
    });

    function v(e) {
        return (v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function y(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t && (r = r.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), a.push.apply(a, r)
        }
        return a
    }
    var j = (0, t.memo)(function(e) {
        var t = Object.assign({}, (function(e) {
            if (null == e) throw TypeError("Cannot destructure " + e)
        }(e), e));
        return (0, i.jsx)(h.default, function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = null != arguments[t] ? arguments[t] : {};
                t % 2 ? y(Object(a), !0).forEach(function(t) {
                    var r, s, i;
                    r = e, s = t, i = a[t], (s = function(e) {
                        var t = function(e, t) {
                            if ("object" != v(e) || !e) return e;
                            var a = e[Symbol.toPrimitive];
                            if (void 0 !== a) {
                                var r = a.call(e, t || "default");
                                if ("object" != v(r)) return r;
                                throw TypeError("@@toPrimitive must return a primitive value.")
                            }
                            return ("string" === t ? String : Number)(e)
                        }(e, "string");
                        return "symbol" == v(t) ? t : String(t)
                    }(s)) in r ? Object.defineProperty(r, s, {
                        value: i,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : r[s] = i
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : y(Object(a)).forEach(function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
                })
            }
            return e
        }({
            Icon: u,
            Text: x,
            "aria-label": r,
            iconProps: {
                shape: "square"
            },
            spaceMultiple: .2,
            textMultiple: .7
        }, t))
    });
    u.Text = x, u.Combine = j, u.Avatar = f, u.colorPrimary = s, u.title = r, e.s(["Windsurf", 0, u], 95606)
}, 101624, e => {
    e.v(e => Promise.resolve().then(() => e(764376)))
}, 516973, e => {
    e.v(t => Promise.all(["static/chunks/951fc9067bdeaf01.js"].map(t => e.l(t))).then(() => t(446766)))
}, 468005, e => {
    e.v(t => Promise.all(["static/chunks/5d15dce90ecd7f83.js"].map(t => e.l(t))).then(() => t(159887)))
}, 221210, e => {
    e.v(t => Promise.all(["static/chunks/7977763473a85879.js", "static/chunks/8ca492b2f4d56d43.js", "static/chunks/0a0227ab7a1b7695.js"].map(t => e.l(t))).then(() => t(395007)))
}, 777644, e => {
    e.v(t => Promise.all(["static/chunks/def12fafe7d14ec3.js", "static/chunks/8ca492b2f4d56d43.js"].map(t => e.l(t))).then(() => t(851966)))
}, 142398, e => {
    e.v(t => Promise.all(["static/chunks/1e69d8846c65ea98.js", "static/chunks/b84f026b2fd0904a.js", "static/chunks/94b439975bf4efeb.js"].map(t => e.l(t))).then(() => t(88905)))
}, 212489, e => {
    e.v(t => Promise.all(["static/chunks/1e69d8846c65ea98.js", "static/chunks/e619aeabe9d5df71.js", "static/chunks/9249ddd8ac452af1.js"].map(t => e.l(t))).then(() => t(91180)))
}]);

//# debugId=67a33e90-5b7e-1c97-ed84-d9ceb084c9a2
//# sourceMappingURL=f668c192cf3e5e66.js.map