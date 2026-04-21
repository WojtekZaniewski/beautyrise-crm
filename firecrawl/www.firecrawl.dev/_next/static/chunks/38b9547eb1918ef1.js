;
! function() {
    try {
        var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {},
            n = (new e.Error).stack;
        n && ((e._debugIds || (e._debugIds = {}))[n] = "222c1870-34ea-4956-eaca-860c3c25c548")
    } catch (e) {}
}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 766627, e => {
    "use strict";
    var t = e.i(253719),
        a = e.i(154712),
        r = e.i(534026),
        s = e.i(730592),
        l = e.i(420851);

    function o({
        tabs: e,
        activeTab: o,
        setActiveTab: n,
        position: i = "left",
        itemButtonClassName: c,
        itemClassName: u,
        noScroll: d
    }) {
        let f = (0, s.useRef)(null),
            p = (0, s.useMemo)(() => e.findIndex(e => e.value === o), [e, o]),
            b = (0, s.useRef)([]),
            [x, m] = (0, s.useState)({
                x: 0,
                width: 0
            });
        return (0, s.useEffect)(() => {
            if (p >= 0 && b.current[p]) {
                let e = b.current[p].closest(".group");
                e && m({
                    x: e.offsetLeft + 12,
                    width: e.offsetWidth - 24
                })
            }
        }, [p]), (0, t.jsx)("div", {
            className: (0, l.cn)("overflow-x-auto whitespace-nowrap hide-scrollbar py-32 -my-32 max-w-full", d && "!contents"),
            children: (0, t.jsxs)("div", {
                className: (0, l.cn)("flex relative w-max max-w-full", "center" === i && "lg:mx-auto"),
                children: [0 !== x.width && (0, t.jsx)(r.motion.div, {
                    animate: x,
                    className: "absolute top-12 left-0 z-[2] inset-y-12 bg-surface-alpha-72 rounded-full backdrop-blur-4",
                    initial: x,
                    ref: f,
                    style: {
                        boxShadow: "0px 24px 32px -12px rgba(0, 0, 0, 0.03), 0px 16px 24px -8px rgba(0, 0, 0, 0.03), 0px 8px 16px -4px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px rgba(0, 0, 0, 0.03)"
                    },
                    transition: {
                        type: "spring",
                        stiffness: 250,
                        damping: 26
                    }
                }), e.map((e, r) => (0, t.jsxs)("div", {
                    className: (0, l.cn)("relative p-12 group", u),
                    children: [(0, t.jsx)("div", {
                        className: "h-full w-1 right-0 absolute bg-border-faint top-0"
                    }), "center" === i && (0, t.jsx)("div", {
                        className: "h-full w-1 -left-1 lg-max:hidden absolute bg-border-faint top-0"
                    }), (0, t.jsxs)("button", {
                        className: (0, l.cn)("py-12 px-24 flex gap-4 justify-center items-center w-full relative z-[3] transition-colors", o === e.value ? "text-accent-black" : "text-black-alpha-64 hover:text-black-alpha-88 hover:before:opacity-100", "before:inside-border before:border-border-faint before:opacity-0 rounded-full before:scale-[0.98] hover:before:scale-100", c),
                        "data-active": o === e.value,
                        ref: e => {
                            b.current[r] = e
                        },
                        onClick: t => {
                            n(e.value);
                            let r = t.target,
                                s = r instanceof HTMLButtonElement ? r : r.closest("button");
                            if (s = s.closest(".group"), f.current && s && ((0, a.animate)(f.current, {
                                    scale: .96
                                }).then(() => {
                                    f.current && (0, a.animate)(f.current, {
                                        scale: 1
                                    })
                                }), m({
                                    x: s.offsetLeft + 12,
                                    width: s.offsetWidth - 24
                                })), window.innerWidth < 996 && s) {
                                let e = f.current ? .parentElement ? .parentElement;
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
    e.s(["default", () => o])
}, 630637, e => {
    "use strict";
    var t = e.i(253719),
        a = e.i(599926),
        r = e.i(730592),
        s = e.i(323576),
        l = e.i(766627);
    let o = {
            "Use Cases & Examples": "use-cases-and-examples",
            "Product Updates": "product-updates",
            "Customer Stories": "customer-stories",
            "Web Extraction Mastery": "web-extraction-mastery",
            "AI Engineering": "ai-engineering",
            "Workflows & Automation": "workflows-and-automation"
        },
        n = Object.entries(o).reduce((e, [t, a]) => (e[a] = t, e), {}),
        i = {
            tutorials: "use-cases-and-examples",
            Tutorials: "use-cases-and-examples"
        };

    function c(e) {
        return o[e] || encodeURIComponent(e)
    }
    let u = [{
        label: "All Posts",
        value: "all-posts"
    }, {
        label: "Updates",
        value: "Product Updates"
    }, {
        label: "Customers",
        value: "Customer Stories"
    }, {
        label: "Example Apps",
        value: "Use Cases & Examples"
    }, {
        label: "Web Extraction",
        value: "Web Extraction Mastery"
    }, {
        label: "AI Engineering",
        value: "AI Engineering"
    }, {
        label: "Low Code",
        value: "Workflows & Automation"
    }];

    function d({
        children: e
    }) {
        let d = (0, a.useRouter)(),
            f = (0, a.useParams)();
        return (0, r.useEffect)(() => {
            u.forEach(e => {
                "all-posts" === e.value ? d.prefetch("/blog") : d.prefetch(`/blog/category/${c(e.value)}`)
            })
        }, [d]), (0, t.jsxs)(t.Fragment, {
            children: [(0, t.jsxs)("div", {
                className: "container",
                children: [(0, t.jsxs)("div", {
                    className: "text-title-h4 border-b relative border-border-faint text-accent-black py-40 px-44",
                    children: ["Blog", (0, t.jsx)(s.ConnectorToRight, {
                        className: "-bottom-11 left-0 absolute"
                    }), (0, t.jsx)(s.ConnectorToLeft, {
                        className: "-bottom-11 right-0 absolute"
                    })]
                }), (0, t.jsx)(l.default, {
                    activeTab: f.id ? function(e) {
                        if (i[e]) return n[i[e]] || "";
                        if (n[e]) return n[e];
                        try {
                            let t = decodeURIComponent(e);
                            return o[t], t
                        } catch {
                            return e
                        }
                    }(f.id) : "all-posts",
                    position: "center",
                    setActiveTab: e => {
                        "all-posts" === e ? d.push("/blog") : d.push(`/blog/category/${c(e)}`)
                    },
                    tabs: u
                })]
            }), (0, t.jsxs)("div", {
                className: "container relative z-[1] pb-1",
                children: [(0, t.jsxs)("div", {
                    className: "flex p-15 gap-12 border-t border-border-faint relative",
                    children: [(0, t.jsx)("div", {
                        className: "h-12 flex-1 border border-border-faint rounded-full"
                    }), (0, t.jsx)("div", {
                        className: "h-12 w-12 border border-border-faint rounded-full"
                    }), (0, t.jsx)("div", {
                        className: "h-12 flex-1 border border-border-faint rounded-full"
                    }), (0, t.jsx)(s.ConnectorToRight, {
                        className: "left-0 -top-[11px]"
                    }), (0, t.jsx)(s.ConnectorToRight, {
                        className: "left-0 -bottom-[11px]"
                    }), (0, t.jsx)(s.ConnectorToLeft, {
                        className: "right-0 -top-[11px]"
                    }), (0, t.jsx)(s.ConnectorToLeft, {
                        className: "right-0 -bottom-[11px]"
                    })]
                }), e]
            })]
        })
    }
    e.s(["default", () => d], 630637)
}]);

//# debugId=222c1870-34ea-4956-eaca-860c3c25c548
//# sourceMappingURL=919c8884aa55cc14.js.map