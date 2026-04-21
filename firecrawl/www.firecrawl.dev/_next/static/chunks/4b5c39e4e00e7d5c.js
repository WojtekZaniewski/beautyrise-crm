;
! function() {
    try {
        var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {},
            n = (new e.Error).stack;
        n && ((e._debugIds || (e._debugIds = {}))[n] = "df5d32b8-a4c6-1e7f-8529-99702efc0d7d")
    } catch (e) {}
}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 730692, e => {
    "use strict";
    let t, a;
    var n = e.i(253719),
        r = e.i(278925);
    (0, r.atom)("signup");
    let l = (0, r.atom)("password"),
        i = (0, r.atom)(!1),
        s = (0, r.atom)(""),
        o = (0, r.atom)(null, (e, t) => {
            t(l, "password"), t(i, !1), t(s, "")
        });

    function c() {
        return (0, n.jsx)("div", {
            children: (0, n.jsxs)("svg", {
                fill: "none",
                height: "40",
                viewBox: "0 0 172 40",
                width: "172",
                className: "text-accent-black",
                xmlns: "http://www.w3.org/2000/svg",
                children: [(0, n.jsx)("path", {
                    d: "M23.3606 12.8281C21.8137 13.2873 20.6476 14.3261 19.7936 15.4544C19.6102 15.6966 19.228 15.5146 19.3008 15.2178C20.936 8.49401 18.7759 2.90556 12.0422 0.154735C11.7006 0.0147436 11.345 0.321324 11.4346 0.679702C14.4977 12.9779 1.61412 11.9406 3.24224 25.8823C3.27024 26.1217 3.00145 26.2855 2.80546 26.1455C2.19509 25.7073 1.51332 24.7932 1.04575 24.1506C0.908555 23.9616 0.611769 24.0148 0.548773 24.2402C0.176391 25.5869 0 26.8553 0 28.1152C0 33.0149 2.51847 37.328 6.33048 39.8283C6.54887 39.9711 6.82886 39.7667 6.75466 39.5161C6.55867 38.8581 6.44808 38.1638 6.43968 37.4456C6.43968 37.0046 6.46768 36.5539 6.53627 36.1339C6.69587 35.0784 7.06265 34.0732 7.67862 33.1577C9.79111 29.9869 14.0259 26.9239 13.3497 22.7647C13.3063 22.5015 13.6171 22.328 13.8131 22.5085C16.7964 25.2342 17.3871 28.9005 16.8972 32.1889C16.8552 32.4745 17.2135 32.6271 17.3941 32.4031C17.8505 31.832 18.4077 31.3308 19.0138 30.9542C19.165 30.8604 19.3666 30.9318 19.424 31.0998C19.7614 32.0811 20.2626 33.0023 20.7358 33.9234C21.3013 35.0308 21.6023 36.2949 21.5547 37.6332C21.5309 38.2842 21.4231 38.9141 21.2425 39.5133C21.1655 39.7667 21.4427 39.9781 21.6653 39.8325C25.4801 37.3322 28 33.0191 28 28.1166C28 26.4129 27.7018 24.7428 27.1376 23.1777C25.9547 19.8949 22.9533 17.4297 23.712 13.1515C23.7484 12.9471 23.5594 12.7693 23.3606 12.8281Z",
                    fill: "var(--heat-100)"
                }), (0, n.jsx)("path", {
                    d: "M41 34.0521V10.9618H55.7586V14.3264H44.7969V21.0226H53.8436V24.2882H44.7969V34.0521H41Z",
                    fill: "currentColor"
                }), (0, n.jsx)("path", {
                    d: "M59.9569 14.7882C58.7352 14.7882 57.7777 13.8976 57.7777 12.6441C57.7777 11.3906 58.7352 10.5 59.9569 10.5C61.1785 10.5 62.136 11.3906 62.136 12.6441C62.136 13.8976 61.1785 14.7882 59.9569 14.7882ZM58.1409 34.0521V17.1632H61.7068V34.0521H58.1409Z",
                    fill: "currentColor"
                }), (0, n.jsx)("path", {
                    d: "M73.5885 17.1632H74.3809V20.4948H72.796C69.6264 20.4948 68.6029 22.9687 68.6029 25.5747V34.0521H65.0371V17.1632H68.2067L68.6029 19.7031C69.4613 18.2847 70.815 17.1632 73.5885 17.1632Z",
                    fill: "currentColor"
                }), (0, n.jsx)("path", {
                    d: "M83.632 34.25C78.3163 34.25 74.9816 30.8194 74.9816 25.6406C74.9816 20.4288 78.3163 16.9653 83.3019 16.9653C88.1884 16.9653 91.457 20.066 91.5561 25.0139C91.5561 25.4427 91.5231 25.9045 91.457 26.3663H78.7125V26.5972C78.8116 29.467 80.6275 31.3472 83.4339 31.3472C85.613 31.3472 87.1979 30.2587 87.6931 28.3785H91.2589C90.6646 31.7101 87.8252 34.25 83.632 34.25ZM78.8446 23.7604H87.8582C87.561 21.2535 85.8112 19.8351 83.3349 19.8351C81.0567 19.8351 79.1087 21.3524 78.8446 23.7604Z",
                    fill: "currentColor"
                }), (0, n.jsx)("path", {
                    d: "M102.033 34.25C96.9151 34.25 93.6465 30.9184 93.6465 25.6406C93.6465 20.4288 97.0142 16.9653 102.132 16.9653C106.49 16.9653 109.197 19.3733 109.891 23.1997H106.16C105.698 21.2205 104.278 20 102.066 20C99.1933 20 97.3113 22.309 97.3113 25.6406C97.3113 28.9392 99.1933 31.2153 102.066 31.2153C104.245 31.2153 105.698 29.9618 106.127 28.0156H109.891C109.23 31.842 106.358 34.25 102.033 34.25Z",
                    fill: "currentColor"
                }), (0, n.jsx)("path", {
                    d: "M121.006 17.1632H121.799V20.4948H120.214C117.044 20.4948 116.021 22.9687 116.021 25.5747V34.0521H112.455V17.1632H115.625L116.021 19.7031C116.879 18.2847 118.233 17.1632 121.006 17.1632Z",
                    fill: "currentColor"
                }), (0, n.jsx)("path", {
                    d: "M130.614 16.9653C135.104 16.9653 137.679 19.1094 137.679 23.1007V34.0521H134.576L134.279 31.6441C133.123 33.1615 131.505 34.25 128.831 34.25C125.133 34.25 122.657 32.4358 122.657 29.3021C122.657 25.8385 125.166 23.8924 129.92 23.8924H134.147V22.8698C134.147 20.9896 132.793 19.8351 130.449 19.8351C128.336 19.8351 126.916 20.8247 126.652 22.309H123.152C123.515 19.0104 126.355 16.9653 130.614 16.9653ZM129.425 31.4792C132.397 31.4792 134.114 29.7309 134.147 27.125V26.5312H129.722C127.51 26.5312 126.289 27.3559 126.289 29.0712C126.289 30.4896 127.477 31.4792 129.425 31.4792Z",
                    fill: "currentColor"
                }), (0, n.jsx)("path", {
                    d: "M144.653 34.0521L139.139 17.1632H142.903L146.766 30.0937L150.629 17.1632H153.897L157.595 30.0937L161.59 17.1632H165.222L159.609 34.0521H155.779L152.214 22.5729L148.516 34.0521H144.653Z",
                    fill: "currentColor"
                }), (0, n.jsx)("path", {
                    d: "M166.934 34.0521V10.9618H170.5V34.0521H166.934Z",
                    fill: "#262626"
                })]
            })
        })
    }
    var u = e.i(747861),
        d = e.i(134841),
        m = e.i(420851);

    function p({
        href: e,
        label: t,
        className: a,
        variant: r = "link",
        onClick: l
    }) {
        let i = "button" === r ? (0, m.cn)("inline-block py-4 px-8 rounded-6", "text-label-small text-heat-100 bg-heat-4", "hover:bg-heat-8 transition-all", "active:scale-[0.98]", a) : (0, m.cn)("text-label-small text-secondary hover:text-heat-100 transition-all", "hover:underline underline-offset-4", "active:scale-[0.98]", a);
        return l ? (0, n.jsx)("button", {
            onClick: l,
            className: i,
            children: t
        }) : (0, n.jsx)(d.default, {
            href: e || "#",
            className: i,
            children: t
        })
    }
    var f = e.i(872969);
    let h = (0, f.createServerReference)("402d7d852817728c04d3997e33887dbdb1460b6f9c", f.callServer, void 0, f.findSourceMapURL, "requestPasswordUpdate");
    var x = e.i(152064),
        g = e.i(377104),
        b = e.i(602206),
        v = e.i(260813),
        y = e.i(730592),
        C = e.i(468060);

    function w({
        className: e,
        label: t,
        error: a,
        icon: r,
        id: l,
        ...i
    }) {
        let s = l || t ? .toLowerCase().replace(/\s+/g, "-");
        return (0, n.jsxs)("div", {
            className: "w-full",
            children: [t && (0, n.jsx)("label", {
                htmlFor: s,
                className: "block text-label-small text-secondary mb-6 ",
                children: t
            }), (0, n.jsx)("div", {
                className: "relative",
                children: (0, n.jsx)(C.default, {
                    id: s,
                    className: (0, m.cn)(a && "border-crimson-100", e),
                    ...i
                })
            }), a && (0, n.jsx)("p", {
                className: "text-label-small text-accent-crimson mt-4",
                children: a
            })]
        })
    }

    function j({
        allowEmail: e,
        redirectMethod: t,
        disableButton: a,
        onBackToSignIn: r
    }) {
        let [l, o] = (0, y.useState)(!1), [c, d] = (0, y.useState)(""), [m, f] = (0, y.useState)(""), C = (0, b.useSetAtom)(i), j = (0, b.useSetAtom)(s), N = async e => {
            if (e.preventDefault(), !(c ? /\S+@\S+\.\S+/.test(c) ? (f(""), !0) : (f("Please enter a valid email"), !1) : (f("Email is required"), !1))) return;
            o(!0);
            let {
                data: t,
                error: a,
                message: n,
                toastType: r
            } = await h(c);
            o(!1), a ? (0, g.showToast)(a, n, r) : t && ((0, g.showToast)(t, n, r), C(!0), j(c))
        };
        return a ? (0, n.jsxs)("div", {
            className: "text-center space-y-16",
            children: [(0, n.jsx)("p", {
                className: "text-body-medium text-secondary",
                children: "Check your email for a password reset link."
            }), (0, n.jsx)(p, {
                onClick: r,
                href: r ? void 0 : x.createWebRoute.signin.page(),
                label: "Back to sign in",
                variant: "button"
            })]
        }) : (0, n.jsxs)("div", {
            className: "w-full",
            children: [(0, n.jsxs)("form", {
                noValidate: !0,
                className: "space-y-16",
                onSubmit: e => N(e),
                children: [(0, n.jsx)(w, {
                    id: "email",
                    label: "Email",
                    placeholder: "name@example.com",
                    type: "email",
                    name: "email",
                    autoCapitalize: "none",
                    autoComplete: "email",
                    autoCorrect: "off",
                    value: c,
                    onChange: e => d(e.target.value),
                    error: m,
                    icon: (0, n.jsx)(v.Mail, {
                        className: "w-16 h-16"
                    })
                }), (0, n.jsx)(u.CapsuleButton, {
                    type: "submit",
                    size: "lg",
                    fullWidth: !0,
                    loading: l,
                    variant: "primary",
                    children: "Send Reset Link"
                })]
            }), r && (0, n.jsx)("div", {
                className: "mt-16 text-center",
                children: (0, n.jsx)(p, {
                    onClick: r,
                    label: "Back to sign in",
                    variant: "button"
                })
            })]
        })
    }
    let N = (0, f.createServerReference)("7829d08befa491f819a1599319f47fbb5f37e587e1", f.callServer, void 0, f.findSourceMapURL, "signInWithEmail");
    var S = e.i(599926);

    function k({
        allowPassword: e,
        redirectMethod: t,
        initialEmail: a,
        disableButton: r,
        onSwitchToPassword: l
    }) {
        let i = (0, S.useRouter)(),
            s = "client" === t,
            [o, c] = (0, y.useState)(!1),
            [d, m] = (0, y.useState)(a || ""),
            [f, h] = (0, y.useState)(""),
            b = !!a;
        (0, y.useEffect)(() => {
            a || m("")
        }, [a]);
        let v = async e => {
            if (e.preventDefault(), !(d ? /\S+@\S+\.\S+/.test(d) ? (h(""), !0) : (h("Please enter a valid email"), !1) : (h("Email is required"), !1))) return;
            window.dataLayer = window.dataLayer || [], window.dataLayer.push({
                event: "login_attempt",
                method: "magic_link"
            }), c(!0);
            let t = new URLSearchParams(window.location.search),
                a = t.get(x.QueryParams.teamInvitationCode),
                n = t.get(x.QueryParams.teamInvitationName),
                r = t.get(x.QueryParams.teamInvitationEmail),
                l = t.get(x.QueryParams.redirect),
                {
                    data: o,
                    error: u,
                    message: m,
                    toastType: p
                } = await N(d, a, n, l);
            if (c(!1), u)(0, g.showToast)(u, m, p);
            else if (o) {
                (0, g.showToast)(o, m, p);
                let e = x.createWebRoute.signin.magicLink({
                    email: d,
                    teamInvitationCode: a,
                    teamInvitationName: n,
                    teamInvitationEmail: r
                });
                s ? i.push(e) : window.location.href = e
            }
        };
        return (0, n.jsxs)("div", {
            className: "w-full",
            children: [(0, n.jsxs)("form", {
                noValidate: !0,
                className: "space-y-16",
                onSubmit: e => v(e),
                children: [(0, n.jsx)(w, {
                    id: "email",
                    label: "Email",
                    placeholder: "name@example.com",
                    type: "email",
                    name: "email",
                    autoCapitalize: "none",
                    autoComplete: "email",
                    autoCorrect: "off",
                    value: d,
                    onChange: e => m(e.target.value),
                    error: f,
                    disabled: b,
                    readOnly: b
                }), (0, n.jsx)(u.CapsuleButton, {
                    type: "submit",
                    size: "lg",
                    fullWidth: !0,
                    loading: o,
                    disabled: r || o,
                    variant: "primary",
                    children: "Send Magic Link"
                })]
            }), e && l && (0, n.jsx)("div", {
                className: "mt-16 flex justify-center",
                children: (0, n.jsx)(p, {
                    onClick: l,
                    label: "Sign in with password instead",
                    variant: "button"
                })
            })]
        })
    }
    var P = e.i(399269),
        E = e.i(823263),
        E = E,
        M = e.i(152823);

    function D(e) {
        return (0, M.GenIcon)({
            tag: "svg",
            attr: {
                viewBox: "0 0 1024 1024"
            },
            child: [{
                tag: "path",
                attr: {
                    d: "M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8-34.4 23-78.3 36.6-129.9 36.6-99.9 0-184.4-67.5-214.6-158.2-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1 56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100-149.9 0-279.6 86-342.7 211.4-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93 72.5-66.8 114.4-165.2 114.4-282.1 0-27.2-2.4-53.3-6.9-78.5z"
                },
                child: []
            }]
        })(e)
    }

    function L() {
        let [e, t] = (0, y.useState)(null), [a, r] = (0, y.useState)(null);
        (0, y.useEffect)(() => {
            let e = localStorage.getItem("lastUsedOAuthProvider");
            e && r(e)
        }, []);
        let l = [{
                name: "github",
                displayName: "GitHub",
                icon: (0, n.jsx)(E.default, {
                    className: "w-16 h-16"
                })
            }, {
                name: "google",
                displayName: "Google",
                icon: (0, n.jsx)(D, {
                    className: "w-16 h-16"
                })
            }],
            i = async (e, a) => {
                e.preventDefault(), window.dataLayer = window.dataLayer || [], window.dataLayer.push({
                    event: "login_attempt",
                    method: `oauth_${a}`,
                    provider: a
                });
                let n = new URLSearchParams(window.location.search),
                    r = n.get(x.QueryParams.teamInvitationCode),
                    l = n.get(x.QueryParams.teamInvitationName),
                    i = n.get(x.QueryParams.redirect);
                t(a), await (0, P.signInWithOAuth)({
                    formEvent: e,
                    teamInvitationCode: r,
                    teamInvitationName: l,
                    redirect: i
                }), setTimeout(() => {
                    t(null)
                }, 1e4)
            },
            s = [...l].sort((e, t) => e.name === a ? -1 : +(t.name === a));
        return (0, n.jsx)("div", {
            className: "w-full space-y-8",
            children: s.map(t => (0, n.jsxs)("form", {
                onSubmit: e => i(e, t.name),
                className: "w-full",
                children: [(0, n.jsx)("input", {
                    type: "hidden",
                    name: "provider",
                    value: t.name
                }), (0, n.jsxs)("div", {
                    className: "relative",
                    children: [(0, n.jsxs)(u.CapsuleButton, {
                        type: "submit",
                        fullWidth: !0,
                        size: "lg",
                        variant: "secondary",
                        loading: e === t.name,
                        disabled: null !== e,
                        icon: () => t.icon,
                        iconPosition: "left",
                        children: ["Continue with ", t.displayName]
                    }), t.name === a && (0, n.jsx)("div", {
                        className: "absolute right-20 center-y text-label-x-small text-accent-white",
                        children: "Last used"
                    })]
                })]
            }, t.name))
        })
    }
    var _ = e.i(638440);
    let A = (0, f.createServerReference)("7cb26d532853c308764da66f52dc903b15e7f5236b", f.callServer, void 0, f.findSourceMapURL, "signInWithPassword");
    var I = e.i(912313);
    e.i(750444);
    var R = e.i(480886);

    function B({
        variant: e = "link",
        className: t,
        onClick: a
    }) {
        let r = (0, S.useRouter)(),
            [l, i] = (0, y.useState)("password_signin"),
            s = () => {
                if (a) a();
                else {
                    let e = "password_signin" === l ? "email_signin" : "password_signin";
                    i(e), r.push(`/signin/${e}`)
                }
            };
        return "button" === e ? (0, n.jsx)("button", {
            type: "button",
            onClick: s,
            className: (0, m.cn)("inline-block py-4 px-8 rounded-6", "text-label-small text-heat-100 bg-heat-4", "hover:bg-heat-8 transition-all", "active:scale-[0.98]", t),
            children: "Sign in via magic link"
        }) : (0, n.jsx)("button", {
            type: "button",
            onClick: s,
            className: (0, m.cn)("text-label-small text-secondary hover:text-heat-100 transition-all hover:underline underline-offset-4", "active:scale-[0.98]", t),
            children: "Sign in via magic link"
        })
    }

    function T({
        allowEmail: e,
        redirectMethod: t,
        initialEmail: a,
        redirectUrl: r,
        onSwitchToEmail: l,
        onForgotPassword: i
    }) {
        let [s, o] = (0, y.useState)(!1), [c, d] = (0, y.useState)(a || ""), [m, f] = (0, y.useState)(""), [h, b] = (0, y.useState)({}), v = !!a;
        (0, y.useEffect)(() => {
            a || d("")
        }, [a]);
        let {
            executeRecaptcha: C
        } = (0, R.useReCaptcha)(), j = (0, y.useCallback)(async () => {
            if (!C) return !0;
            let e = await C("signin");
            if (e) {
                let t = await fetch(`/api/recaptcha?token=${e}`),
                    {
                        success: a,
                        score: n
                    } = await t.json();
                if (!a) return console.error("Failed to verify token"), !1;
                if (a) return console.log(`Token verified with score ${n}`), !0;
                console.log(`Token verification failed with score ${n}`)
            }
            return !1
        }, [C]), N = async e => {
            let t;
            if (e.preventDefault(), t = {}, c ? /\S+@\S+\.\S+/.test(c) || (t.email = "Please enter a valid email") : t.email = "Email is required", m || (t.password = "Password is required"), b(t), 0 !== Object.keys(t).length) return;
            o(!0), b({});
            try {
                localStorage.removeItem("lastUsedOAuthProvider")
            } catch (e) {
                console.warn("Failed to clear last used OAuth provider:", e)
            } {
                let e = await j(),
                    t = window.location.hostname.startsWith("firecrawl-git");
                if (!e && !t) {
                    (0, g.showToast)("Failed to verify token", "", g.ToastType.ERROR), o(!1);
                    return
                }
            }
            let a = new URLSearchParams(window.location.search),
                n = a.get(x.QueryParams.teamInvitationCode),
                l = a.get(x.QueryParams.teamInvitationName),
                {
                    data: i,
                    error: s,
                    message: u,
                    toastType: d,
                    redirect: p
                } = await A(c, m, n, l, r);
            if (o(!1), s)(0, g.showToast)(s, u, d);
            else if (i) {
                (0, g.showToast)(i, u, d), window.dataLayer = window.dataLayer || [], window.dataLayer.push({
                    event: "login",
                    method: "password"
                });
                let e = p || "/app";
                try {
                    let t = (0, I.createClient)(),
                        {
                            data: a
                        } = await t.auth.mfa.getAuthenticatorAssuranceLevel();
                    if (a ? .currentLevel === "aal1" && a ? .nextLevel === "aal2") {
                        window.location.href = x.createWebRoute.signin.mfa({
                            redirect: e
                        });
                        return
                    }
                } catch {}
                window.location.href = e
            }
        };
        return (0, n.jsxs)("div", {
            className: "w-full",
            children: [(0, n.jsxs)("form", {
                noValidate: !0,
                className: "space-y-16",
                onSubmit: e => N(e),
                children: [(0, n.jsxs)("div", {
                    className: "space-y-12",
                    children: [(0, n.jsx)(w, {
                        id: "email",
                        label: "Email",
                        placeholder: "name@example.com",
                        type: "email",
                        name: "email",
                        autoCapitalize: "none",
                        autoComplete: "email",
                        autoCorrect: "off",
                        value: c,
                        onChange: e => d(e.target.value),
                        error: h.email,
                        disabled: v,
                        readOnly: v
                    }), (0, n.jsx)(w, {
                        id: "password",
                        label: "Password",
                        placeholder: "••••••••",
                        type: "password",
                        name: "password",
                        autoComplete: "current-password",
                        value: m,
                        onChange: e => f(e.target.value),
                        error: h.password
                    })]
                }), (0, n.jsx)(u.CapsuleButton, {
                    type: "submit",
                    size: "md",
                    fullWidth: !0,
                    loading: s,
                    variant: "primary",
                    children: "Sign in"
                })]
            }), (0, n.jsxs)("div", {
                className: "mt-16 flex gap-8 justify-center",
                children: [(0, n.jsx)(p, {
                    onClick: i,
                    label: "Forgot your password?",
                    variant: "button"
                }), e && l && (0, n.jsx)(B, {
                    variant: "button",
                    onClick: l
                })]
            })]
        })
    }
    let $ = (0, f.createServerReference)("007667533776e30e765fed0f4963b1cf079dcc1a6d", f.callServer, void 0, f.findSourceMapURL, "getRequestCountry"),
        V = (0, f.createServerReference)("70786f0242533af6e5581efc90a6f3ce3fea3e6ee4", f.callServer, void 0, f.findSourceMapURL, "sendSmsVerification"),
        O = (0, f.createServerReference)("70bedfab0b8b9684cd1e2eb20533d0a03a42daa219", f.callServer, void 0, f.findSourceMapURL, "signUp");
    var z = Object.defineProperty,
        F = Object.defineProperties,
        H = Object.getOwnPropertyDescriptors,
        W = Object.getOwnPropertySymbols,
        U = Object.prototype.hasOwnProperty,
        G = Object.prototype.propertyIsEnumerable,
        Q = (e, t, a) => t in e ? z(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: a
        }) : e[t] = a,
        q = y.createContext({}),
        Z = y.forwardRef((e, t) => {
            let a;
            var n, r, l, i, s, {
                    value: o,
                    onChange: c,
                    maxLength: u,
                    textAlign: d = "left",
                    pattern: m,
                    placeholder: p,
                    inputMode: f = "numeric",
                    onComplete: h,
                    pushPasswordManagerStrategy: x = "increase-width",
                    pasteTransformer: g,
                    containerClassName: b,
                    noScriptCSSFallback: v = X,
                    render: C,
                    children: w
                } = e,
                j = ((e, t) => {
                    var a = {};
                    for (var n in e) U.call(e, n) && 0 > t.indexOf(n) && (a[n] = e[n]);
                    if (null != e && W)
                        for (var n of W(e)) 0 > t.indexOf(n) && G.call(e, n) && (a[n] = e[n]);
                    return a
                })(e, ["value", "onChange", "maxLength", "textAlign", "pattern", "placeholder", "inputMode", "onComplete", "pushPasswordManagerStrategy", "pasteTransformer", "containerClassName", "noScriptCSSFallback", "render", "children"]);
            let [N, S] = y.useState("string" == typeof j.defaultValue ? j.defaultValue : ""), k = null != o ? o : N, P = (a = y.useRef(), y.useEffect(() => {
                a.current = k
            }), a.current), E = y.useCallback(e => {
                null == c || c(e), S(e)
            }, [c]), M = y.useMemo(() => m ? "string" == typeof m ? new RegExp(m) : m : null, [m]), D = y.useRef(null), L = y.useRef(null), _ = y.useRef({
                value: k,
                onChange: E,
                isIOS: "u" > typeof window && (null == (r = null == (n = null == window ? void 0 : window.CSS) ? void 0 : n.supports) ? void 0 : r.call(n, "-webkit-touch-callout", "none"))
            }), A = y.useRef({
                prev: [null == (l = D.current) ? void 0 : l.selectionStart, null == (i = D.current) ? void 0 : i.selectionEnd, null == (s = D.current) ? void 0 : s.selectionDirection]
            });
            y.useImperativeHandle(t, () => D.current, []), y.useEffect(() => {
                let e = D.current,
                    t = L.current;
                if (!e || !t) return;

                function a() {
                    if (document.activeElement !== e) {
                        V(null), z(null);
                        return
                    }
                    let t = e.selectionStart,
                        a = e.selectionEnd,
                        n = e.selectionDirection,
                        r = e.maxLength,
                        l = e.value,
                        i = A.current.prev,
                        s = -1,
                        o = -1,
                        c;
                    if (0 !== l.length && null !== t && null !== a) {
                        let e = t === a,
                            n = t === l.length && l.length < r;
                        if (e && !n) {
                            if (0 === t) s = 0, o = 1, c = "forward";
                            else if (t === r) s = t - 1, o = t, c = "backward";
                            else if (r > 1 && l.length > 1) {
                                let e = 0;
                                if (null !== i[0] && null !== i[1]) {
                                    c = t < i[1] ? "backward" : "forward";
                                    let a = i[0] === i[1] && i[0] < r;
                                    "backward" !== c || a || (e = -1)
                                }
                                s = e + t, o = e + t + 1
                            }
                        } - 1 !== s && -1 !== o && s !== o && D.current.setSelectionRange(s, o, c)
                    }
                    let u = -1 !== s ? s : t,
                        d = -1 !== o ? o : a,
                        m = null != c ? c : n;
                    V(u), z(d), A.current.prev = [u, d, m]
                }
                if (_.current.value !== e.value && _.current.onChange(e.value), A.current.prev = [e.selectionStart, e.selectionEnd, e.selectionDirection], document.addEventListener("selectionchange", a, {
                        capture: !0
                    }), a(), document.activeElement === e && T(!0), !document.getElementById("input-otp-style")) {
                    let e = document.createElement("style");
                    if (e.id = "input-otp-style", document.head.appendChild(e), e.sheet) {
                        let t = "background: transparent !important; color: transparent !important; border-color: transparent !important; opacity: 0 !important; box-shadow: none !important; -webkit-box-shadow: none !important; -webkit-text-fill-color: transparent !important;";
                        K(e.sheet, "[data-input-otp]::selection { background: transparent !important; color: transparent !important; }"), K(e.sheet, `[data-input-otp]:autofill { ${t} }`), K(e.sheet, `[data-input-otp]:-webkit-autofill { ${t} }`), K(e.sheet, "@supports (-webkit-touch-callout: none) { [data-input-otp] { letter-spacing: -.6em !important; font-weight: 100 !important; font-stretch: ultra-condensed; font-optical-sizing: none !important; left: -1px !important; right: 1px !important; } }"), K(e.sheet, "[data-input-otp] + * { pointer-events: all !important; }")
                    }
                }
                let n = () => {
                    t && t.style.setProperty("--root-height", `${e.clientHeight}px`)
                };
                n();
                let r = new ResizeObserver(n);
                return r.observe(e), () => {
                    document.removeEventListener("selectionchange", a, {
                        capture: !0
                    }), r.disconnect()
                }
            }, []);
            let [I, R] = y.useState(!1), [B, T] = y.useState(!1), [$, V] = y.useState(null), [O, z] = y.useState(null);
            y.useEffect(() => {
                var e;
                setTimeout(e = () => {
                    var e, t, a, n;
                    null == (e = D.current) || e.dispatchEvent(new Event("input"));
                    let r = null == (t = D.current) ? void 0 : t.selectionStart,
                        l = null == (a = D.current) ? void 0 : a.selectionEnd,
                        i = null == (n = D.current) ? void 0 : n.selectionDirection;
                    null !== r && null !== l && (V(r), z(l), A.current.prev = [r, l, i])
                }, 0), setTimeout(e, 10), setTimeout(e, 50)
            }, [k, B]), y.useEffect(() => {
                void 0 !== P && k !== P && P.length < u && k.length === u && (null == h || h(k))
            }, [u, h, P, k]);
            let Z = function({
                    containerRef: e,
                    inputRef: t,
                    pushPasswordManagerStrategy: a,
                    isFocused: n
                }) {
                    let [r, l] = y.useState(!1), [i, s] = y.useState(!1), [o, c] = y.useState(!1), u = y.useMemo(() => "none" !== a && ("increase-width" === a || "experimental-no-flickering" === a) && r && i, [r, i, a]), d = y.useCallback(() => {
                        let n = e.current,
                            r = t.current;
                        if (!n || !r || o || "none" === a) return;
                        let i = n.getBoundingClientRect().left + n.offsetWidth,
                            s = n.getBoundingClientRect().top + n.offsetHeight / 2;
                        0 === document.querySelectorAll('[data-lastpass-icon-root],com-1password-button,[data-dashlanecreated],[style$="2147483647 !important;"]').length && document.elementFromPoint(i - 18, s) === n || (l(!0), c(!0))
                    }, [e, t, o, a]);
                    return y.useEffect(() => {
                        let t = e.current;
                        if (!t || "none" === a) return;

                        function n() {
                            s(window.innerWidth - t.getBoundingClientRect().right >= 40)
                        }
                        n();
                        let r = setInterval(n, 1e3);
                        return () => {
                            clearInterval(r)
                        }
                    }, [e, a]), y.useEffect(() => {
                        let e = n || document.activeElement === t.current;
                        if ("none" === a || !e) return;
                        let r = setTimeout(d, 0),
                            l = setTimeout(d, 2e3),
                            i = setTimeout(d, 5e3),
                            s = setTimeout(() => {
                                c(!0)
                            }, 6e3);
                        return () => {
                            clearTimeout(r), clearTimeout(l), clearTimeout(i), clearTimeout(s)
                        }
                    }, [t, n, a, d]), {
                        hasPWMBadge: r,
                        willPushPWMBadge: u,
                        PWM_BADGE_SPACE_WIDTH: "40px"
                    }
                }({
                    containerRef: L,
                    inputRef: D,
                    pushPasswordManagerStrategy: x,
                    isFocused: B
                }),
                Y = y.useCallback(e => {
                    let t = e.currentTarget.value.slice(0, u);
                    t.length > 0 && M && !M.test(t) ? e.preventDefault() : ("string" == typeof P && t.length < P.length && document.dispatchEvent(new Event("selectionchange")), E(t))
                }, [u, E, P, M]),
                J = y.useCallback(() => {
                    var e;
                    if (D.current) {
                        let t = Math.min(D.current.value.length, u - 1),
                            a = D.current.value.length;
                        null == (e = D.current) || e.setSelectionRange(t, a), V(t), z(a)
                    }
                    T(!0)
                }, [u]),
                ee = y.useCallback(e => {
                    var t, a;
                    let n = D.current;
                    if (!g && (!_.current.isIOS || !e.clipboardData || !n)) return;
                    let r = e.clipboardData.getData("text/plain"),
                        l = g ? g(r) : r;
                    e.preventDefault();
                    let i = null == (t = D.current) ? void 0 : t.selectionStart,
                        s = null == (a = D.current) ? void 0 : a.selectionEnd,
                        o = (i !== s ? k.slice(0, i) + l + k.slice(s) : k.slice(0, i) + l + k.slice(i)).slice(0, u);
                    if (o.length > 0 && M && !M.test(o)) return;
                    n.value = o, E(o);
                    let c = Math.min(o.length, u - 1),
                        d = o.length;
                    n.setSelectionRange(c, d), V(c), z(d)
                }, [u, E, M, k]),
                et = y.useMemo(() => ({
                    position: "relative",
                    cursor: j.disabled ? "default" : "text",
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    pointerEvents: "none"
                }), [j.disabled]),
                ea = y.useMemo(() => ({
                    position: "absolute",
                    inset: 0,
                    width: Z.willPushPWMBadge ? `calc(100% + ${Z.PWM_BADGE_SPACE_WIDTH})` : "100%",
                    clipPath: Z.willPushPWMBadge ? `inset(0 ${Z.PWM_BADGE_SPACE_WIDTH} 0 0)` : void 0,
                    height: "100%",
                    display: "flex",
                    textAlign: d,
                    opacity: "1",
                    color: "transparent",
                    pointerEvents: "all",
                    background: "transparent",
                    caretColor: "transparent",
                    border: "0 solid transparent",
                    outline: "0 solid transparent",
                    boxShadow: "none",
                    lineHeight: "1",
                    letterSpacing: "-.5em",
                    fontSize: "var(--root-height)",
                    fontFamily: "monospace",
                    fontVariantNumeric: "tabular-nums"
                }), [Z.PWM_BADGE_SPACE_WIDTH, Z.willPushPWMBadge, d]),
                en = y.useMemo(() => y.createElement("input", F(((e, t) => {
                    for (var a in t || (t = {})) U.call(t, a) && Q(e, a, t[a]);
                    if (W)
                        for (var a of W(t)) G.call(t, a) && Q(e, a, t[a]);
                    return e
                })({
                    autoComplete: j.autoComplete || "one-time-code"
                }, j), H({
                    "data-input-otp": !0,
                    "data-input-otp-placeholder-shown": 0 === k.length || void 0,
                    "data-input-otp-mss": $,
                    "data-input-otp-mse": O,
                    inputMode: f,
                    pattern: null == M ? void 0 : M.source,
                    "aria-placeholder": p,
                    style: ea,
                    maxLength: u,
                    value: k,
                    ref: D,
                    onPaste: e => {
                        var t;
                        ee(e), null == (t = j.onPaste) || t.call(j, e)
                    },
                    onChange: Y,
                    onMouseOver: e => {
                        var t;
                        R(!0), null == (t = j.onMouseOver) || t.call(j, e)
                    },
                    onMouseLeave: e => {
                        var t;
                        R(!1), null == (t = j.onMouseLeave) || t.call(j, e)
                    },
                    onFocus: e => {
                        var t;
                        J(), null == (t = j.onFocus) || t.call(j, e)
                    },
                    onBlur: e => {
                        var t;
                        T(!1), null == (t = j.onBlur) || t.call(j, e)
                    }
                }))), [Y, J, ee, f, ea, u, O, $, j, null == M ? void 0 : M.source, k]),
                er = y.useMemo(() => ({
                    slots: Array.from({
                        length: u
                    }).map((e, t) => {
                        var a;
                        let n = B && null !== $ && null !== O && ($ === O && t === $ || t >= $ && t < O),
                            r = void 0 !== k[t] ? k[t] : null;
                        return {
                            char: r,
                            placeholderChar: void 0 !== k[0] ? null : null != (a = null == p ? void 0 : p[t]) ? a : null,
                            isActive: n,
                            hasFakeCaret: n && null === r
                        }
                    }),
                    isFocused: B,
                    isHovering: !j.disabled && I
                }), [B, I, u, O, $, j.disabled, k]),
                el = y.useMemo(() => C ? C(er) : y.createElement(q.Provider, {
                    value: er
                }, w), [w, er, C]);
            return y.createElement(y.Fragment, null, null !== v && y.createElement("noscript", null, y.createElement("style", null, v)), y.createElement("div", {
                ref: L,
                "data-input-otp-container": !0,
                style: et,
                className: b
            }, el, y.createElement("div", {
                style: {
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none"
                }
            }, en)))
        });

    function K(e, t) {
        try {
            e.insertRule(t)
        } catch (e) {
            console.error("input-otp could not insert CSS rule:", t)
        }
    }
    Z.displayName = "Input";
    var X = `
[data-input-otp] {
  --nojs-bg: white !important;
  --nojs-fg: black !important;

  background-color: var(--nojs-bg) !important;
  color: var(--nojs-fg) !important;
  caret-color: var(--nojs-fg) !important;
  letter-spacing: .25em !important;
  text-align: center !important;
  border: 1px solid var(--nojs-fg) !important;
  border-radius: 4px !important;
  width: 100% !important;
}
@media (prefers-color-scheme: dark) {
  [data-input-otp] {
    --nojs-bg: black !important;
    --nojs-fg: white !important;
  }
}`,
        Y = e.i(677254),
        J = e.i(325329),
        ee = [
            ["Afghanistan", "af", "93"],
            ["Albania", "al", "355"],
            ["Algeria", "dz", "213"],
            ["Andorra", "ad", "376"],
            ["Angola", "ao", "244"],
            ["Antigua and Barbuda", "ag", "1268"],
            ["Argentina", "ar", "54", {
                default: "(..) .... ....",
                "/^11/": "(..) .... ....",
                "/^15/": "(..) ... ....",
                "/^(2|3|4|5)/": "(.) .... ....",
                "/^9/": "(.) .... ....."
            }, 0],
            ["Armenia", "am", "374", ".. ......"],
            ["Aruba", "aw", "297"],
            ["Australia", "au", "61", {
                default: ". .... ....",
                "/^4/": "... ... ...",
                "/^5(?!50)/": "... ... ...",
                "/^1(3|8)00/": ".... ... ...",
                "/^13/": ".. .. ..",
                "/^180/": "... ...."
            }, 0, []],
            ["Austria", "at", "43"],
            ["Azerbaijan", "az", "994", "(..) ... .. .."],
            ["Bahamas", "bs", "1242"],
            ["Bahrain", "bh", "973", ".... ...."],
            ["Bangladesh", "bd", "880"],
            ["Barbados", "bb", "1246"],
            ["Belarus", "by", "375", "(..) ... .. .."],
            ["Belgium", "be", "32", "... .. .. .."],
            ["Belize", "bz", "501"],
            ["Benin", "bj", "229"],
            ["Bhutan", "bt", "975"],
            ["Bolivia", "bo", "591"],
            ["Bosnia and Herzegovina", "ba", "387"],
            ["Botswana", "bw", "267"],
            ["Brazil", "br", "55", "(..) .....-...."],
            ["British Indian Ocean Territory", "io", "246"],
            ["Brunei", "bn", "673"],
            ["Bulgaria", "bg", "359"],
            ["Burkina Faso", "bf", "226"],
            ["Burundi", "bi", "257"],
            ["Cambodia", "kh", "855"],
            ["Cameroon", "cm", "237"],
            ["Canada", "ca", "1", "(...) ...-....", 1, ["204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"]],
            ["Cape Verde", "cv", "238"],
            ["Caribbean Netherlands", "bq", "599", "", 1],
            ["Cayman Islands", "ky", "1", "... ... ....", 4, ["345"]],
            ["Central African Republic", "cf", "236"],
            ["Chad", "td", "235"],
            ["Chile", "cl", "56"],
            ["China", "cn", "86", "... .... ...."],
            ["Colombia", "co", "57", "... ... ...."],
            ["Comoros", "km", "269"],
            ["Congo", "cd", "243"],
            ["Congo", "cg", "242"],
            ["Costa Rica", "cr", "506", "....-...."],
            ["Côte d'Ivoire", "ci", "225", ".. .. .. .. .."],
            ["Croatia", "hr", "385"],
            ["Cuba", "cu", "53"],
            ["Curaçao", "cw", "599", "", 0],
            ["Cyprus", "cy", "357", ".. ......"],
            ["Czech Republic", "cz", "420", "... ... ..."],
            ["Denmark", "dk", "45", ".. .. .. .."],
            ["Djibouti", "dj", "253", ".. .. ...."],
            ["Dominica", "dm", "1767"],
            ["Dominican Republic", "do", "1", "(...) ...-....", 2, ["809", "829", "849"]],
            ["Ecuador", "ec", "593"],
            ["Egypt", "eg", "20"],
            ["El Salvador", "sv", "503", "....-...."],
            ["Equatorial Guinea", "gq", "240"],
            ["Eritrea", "er", "291"],
            ["Estonia", "ee", "372", ".... ......"],
            ["Ethiopia", "et", "251", ".. ... ...."],
            ["Faroe Islands", "fo", "298", ".. .. .."],
            ["Fiji", "fj", "679"],
            ["Finland", "fi", "358", ".. ... .. .."],
            ["France", "fr", "33", ". .. .. .. .."],
            ["French Guiana", "gf", "594", "... .. .. .."],
            ["French Polynesia", "pf", "689", {
                "/^44/": ".. .. ..",
                "/^80[0-5]/": "... .. .. ..",
                default: ".. .. .. .."
            }],
            ["Gabon", "ga", "241"],
            ["Gambia", "gm", "220"],
            ["Georgia", "ge", "995"],
            ["Germany", "de", "49", "... ........."],
            ["Ghana", "gh", "233"],
            ["Gibraltar", "gi", "350"],
            ["Greece", "gr", "30"],
            ["Greenland", "gl", "299", ".. .. .."],
            ["Grenada", "gd", "1473"],
            ["Guadeloupe", "gp", "590", "... .. .. ..", 0],
            ["Guam", "gu", "1671"],
            ["Guatemala", "gt", "502", "....-...."],
            ["Guinea", "gn", "224"],
            ["Guinea-Bissau", "gw", "245"],
            ["Guyana", "gy", "592"],
            ["Haiti", "ht", "509", "....-...."],
            ["Honduras", "hn", "504"],
            ["Hong Kong", "hk", "852", ".... ...."],
            ["Hungary", "hu", "36"],
            ["Iceland", "is", "354", "... ...."],
            ["India", "in", "91", ".....-....."],
            ["Indonesia", "id", "62"],
            ["Iran", "ir", "98", "... ... ...."],
            ["Iraq", "iq", "964"],
            ["Ireland", "ie", "353", ".. ......."],
            ["Israel", "il", "972", "... ... ...."],
            ["Italy", "it", "39", "... .......", 0],
            ["Jamaica", "jm", "1876"],
            ["Japan", "jp", "81", ".. .... ...."],
            ["Jordan", "jo", "962"],
            ["Kazakhstan", "kz", "7", "... ...-..-..", 0],
            ["Kenya", "ke", "254"],
            ["Kiribati", "ki", "686"],
            ["Kosovo", "xk", "383"],
            ["Kuwait", "kw", "965", ".... ...."],
            ["Kyrgyzstan", "kg", "996", "... ... ..."],
            ["Laos", "la", "856"],
            ["Latvia", "lv", "371", ".. ... ..."],
            ["Lebanon", "lb", "961"],
            ["Lesotho", "ls", "266"],
            ["Liberia", "lr", "231"],
            ["Libya", "ly", "218"],
            ["Liechtenstein", "li", "423"],
            ["Lithuania", "lt", "370"],
            ["Luxembourg", "lu", "352"],
            ["Macau", "mo", "853"],
            ["Macedonia", "mk", "389"],
            ["Madagascar", "mg", "261"],
            ["Malawi", "mw", "265"],
            ["Malaysia", "my", "60", "..-....-...."],
            ["Maldives", "mv", "960"],
            ["Mali", "ml", "223"],
            ["Malta", "mt", "356"],
            ["Marshall Islands", "mh", "692"],
            ["Martinique", "mq", "596", "... .. .. .."],
            ["Mauritania", "mr", "222"],
            ["Mauritius", "mu", "230"],
            ["Mayotte", "yt", "262", "... .. .. ..", 1, ["269", "639"]],
            ["Mexico", "mx", "52", "... ... ....", 0],
            ["Micronesia", "fm", "691"],
            ["Moldova", "md", "373", "(..) ..-..-.."],
            ["Monaco", "mc", "377"],
            ["Mongolia", "mn", "976"],
            ["Montenegro", "me", "382"],
            ["Morocco", "ma", "212"],
            ["Mozambique", "mz", "258"],
            ["Myanmar", "mm", "95"],
            ["Namibia", "na", "264"],
            ["Nauru", "nr", "674"],
            ["Nepal", "np", "977"],
            ["Netherlands", "nl", "31", {
                "/^06/": "(.). .........",
                "/^6/": ". .........",
                "/^0(10|13|14|15|20|23|24|26|30|33|35|36|38|40|43|44|45|46|50|53|55|58|70|71|72|73|74|75|76|77|78|79|82|84|85|87|88|91)/": "(.).. ........",
                "/^(10|13|14|15|20|23|24|26|30|33|35|36|38|40|43|44|45|46|50|53|55|58|70|71|72|73|74|75|76|77|78|79|82|84|85|87|88|91)/": ".. ........",
                "/^0/": "(.)... .......",
                default: "... ......."
            }],
            ["New Caledonia", "nc", "687"],
            ["New Zealand", "nz", "64", "...-...-...."],
            ["Nicaragua", "ni", "505"],
            ["Niger", "ne", "227"],
            ["Nigeria", "ng", "234"],
            ["North Korea", "kp", "850"],
            ["Norway", "no", "47", "... .. ..."],
            ["Oman", "om", "968", ".... ...."],
            ["Pakistan", "pk", "92", "...-......."],
            ["Palau", "pw", "680"],
            ["Palestine", "ps", "970"],
            ["Panama", "pa", "507"],
            ["Papua New Guinea", "pg", "675"],
            ["Paraguay", "py", "595"],
            ["Peru", "pe", "51"],
            ["Philippines", "ph", "63", "... ... ...."],
            ["Poland", "pl", "48", "...-...-..."],
            ["Portugal", "pt", "351"],
            ["Puerto Rico", "pr", "1", "(...) ...-....", 3, ["787", "939"]],
            ["Qatar", "qa", "974", ".... ...."],
            ["Réunion", "re", "262", "... .. .. ..", 0],
            ["Romania", "ro", "40"],
            ["Russia", "ru", "7", "(...) ...-..-..", 1],
            ["Rwanda", "rw", "250"],
            ["Saint Kitts and Nevis", "kn", "1869"],
            ["Saint Lucia", "lc", "1758"],
            ["Saint Pierre & Miquelon", "pm", "508", {
                "/^708/": "... ... ...",
                "/^8/": "... .. .. ..",
                default: ".. .. .."
            }],
            ["Saint Vincent and the Grenadines", "vc", "1784"],
            ["Samoa", "ws", "685"],
            ["San Marino", "sm", "378"],
            ["São Tomé and Príncipe", "st", "239"],
            ["Saudi Arabia", "sa", "966", ".. ... ...."],
            ["Senegal", "sn", "221"],
            ["Serbia", "rs", "381"],
            ["Seychelles", "sc", "248"],
            ["Sierra Leone", "sl", "232"],
            ["Singapore", "sg", "65", "....-...."],
            ["Slovakia", "sk", "421"],
            ["Slovenia", "si", "386"],
            ["Solomon Islands", "sb", "677"],
            ["Somalia", "so", "252"],
            ["South Africa", "za", "27"],
            ["South Korea", "kr", "82", "... .... ...."],
            ["South Sudan", "ss", "211"],
            ["Spain", "es", "34", "... ... ..."],
            ["Sri Lanka", "lk", "94"],
            ["Sudan", "sd", "249"],
            ["Suriname", "sr", "597"],
            ["Swaziland", "sz", "268"],
            ["Sweden", "se", "46", "... ... ..."],
            ["Switzerland", "ch", "41", ".. ... .. .."],
            ["Syria", "sy", "963"],
            ["Taiwan", "tw", "886"],
            ["Tajikistan", "tj", "992"],
            ["Tanzania", "tz", "255"],
            ["Thailand", "th", "66"],
            ["Timor-Leste", "tl", "670"],
            ["Togo", "tg", "228"],
            ["Tonga", "to", "676"],
            ["Trinidad and Tobago", "tt", "1868"],
            ["Tunisia", "tn", "216"],
            ["Turkey", "tr", "90", "... ... .. .."],
            ["Turkmenistan", "tm", "993"],
            ["Tuvalu", "tv", "688"],
            ["Uganda", "ug", "256"],
            ["Ukraine", "ua", "380", "(..) ... .. .."],
            ["United Arab Emirates", "ae", "971", {
                default: ".. ... ....",
                "/^5[024568]/": ".. ... ....",
                "/^[234679]/": ". ... ...."
            }],
            ["United Kingdom", "gb", "44", ".... ......"],
            ["United States", "us", "1", "(...) ...-....", 0],
            ["Uruguay", "uy", "598"],
            ["Uzbekistan", "uz", "998", ".. ... .. .."],
            ["Vanuatu", "vu", "678"],
            ["Vatican City", "va", "39", ".. .... ....", 1],
            ["Venezuela", "ve", "58"],
            ["Vietnam", "vn", "84"],
            ["Wallis & Futuna", "wf", "681", ".. .. .."],
            ["Yemen", "ye", "967"],
            ["Zambia", "zm", "260"],
            ["Zimbabwe", "zw", "263"]
        ],
        et = (...e) => e.filter(e => !!e).join(" ").trim(),
        ea = ({
            addPrefix: e,
            rawClassNames: t
        }) => et(((...e) => et(...e).split(" ").map(e => `react-international-phone-${e}`).join(" "))(...e), ...t),
        en = e => !!e && /^\d+$/.test(e),
        er = ({
            phone: e,
            prefix: t
        }) => e ? `${t}${e.replace(/\D/g,"")}` : "";

    function el({
        value: e,
        country: t,
        insertDialCodeOnEmpty: a,
        trimNonDigitsEnd: n,
        countries: r,
        prefix: l,
        charAfterDialCode: i,
        forceDialCode: s,
        disableDialCodeAndPrefix: o,
        defaultMask: c,
        countryGuessingEnabled: u,
        disableFormatting: d,
        allowMaskOverflow: m
    }) {
        let p = e;
        o && (p = p.startsWith(`${l}`) ? p : `${l}${t.dialCode}${p}`);
        let f = u ? eN({
                phone: p,
                countries: r,
                currentCountryIso2: t ? .iso2
            }) : void 0,
            h = f ? .country ? ? t,
            x = ((e, t) => {
                let a, n = !t.disableDialCodeAndPrefix && t.forceDialCode,
                    r = !t.disableDialCodeAndPrefix && t.insertDialCodeOnEmpty,
                    l = e,
                    i = e => t.trimNonDigitsEnd ? e.trim() : e;
                if (!l) return i(r && !l.length || n ? `${t.prefix}${t.dialCode}${t.charAfterDialCode}` : l);
                if ((l = l.replace(/\D/g, "")) === t.dialCode && !t.disableDialCodeAndPrefix) return i(`${t.prefix}${t.dialCode}${t.charAfterDialCode}`);
                if (t.dialCode.startsWith(l) && !t.disableDialCodeAndPrefix) return i(n ? `${t.prefix}${t.dialCode}${t.charAfterDialCode}` : `${t.prefix}${l}`);
                if (!l.startsWith(t.dialCode) && !t.disableDialCodeAndPrefix) {
                    if (n) return i(`${t.prefix}${t.dialCode}${t.charAfterDialCode}`);
                    if (l.length < t.dialCode.length) return i(`${t.prefix}${l}`)
                }
                let {
                    phoneLeftSide: s,
                    phoneRightSide: o
                } = (a = t.dialCode.length, {
                    phoneLeftSide: l.slice(0, a),
                    phoneRightSide: l.slice(a)
                });
                return s = `${t.prefix}${s}${t.charAfterDialCode}`, o = (({
                    value: e,
                    mask: t,
                    maskSymbol: a,
                    offset: n = 0,
                    trimNonMaskCharsLeftover: r = !1,
                    allowMaskOverflow: l = !1
                }) => {
                    if (e.length < n) return e;
                    let i = e.slice(0, n),
                        s = e.slice(n),
                        o = t.split("").filter(e => e === a).length,
                        c = s.slice(0, o),
                        u = l ? s.slice(o) : "",
                        d = i,
                        m = 0;
                    for (let e of t.split("")) {
                        if (m >= c.length) {
                            if (!r && e !== a) {
                                d += e;
                                continue
                            }
                            break
                        }
                        e === a ? (d += c[m], m += 1) : d += e
                    }
                    return d + u
                })({
                    value: o,
                    mask: t.mask,
                    maskSymbol: t.maskChar,
                    trimNonMaskCharsLeftover: t.trimNonDigitsEnd || t.disableDialCodeAndPrefix && 0 === o.length,
                    allowMaskOverflow: t.allowMaskOverflow
                }), t.disableDialCodeAndPrefix && (s = ""), i(`${s}${o}`)
            })(p, {
                prefix: l,
                mask: eC({
                    phone: p,
                    country: h,
                    defaultMask: c,
                    disableFormatting: d
                }),
                maskChar: es,
                dialCode: h.dialCode,
                trimNonDigitsEnd: n,
                charAfterDialCode: i,
                forceDialCode: s,
                insertDialCodeOnEmpty: a,
                disableDialCodeAndPrefix: o,
                allowMaskOverflow: m
            }),
            g = u && !f ? .fullDialCodeMatch ? t : h;
        return {
            phone: er({
                phone: o ? `${g.dialCode}${x}` : x,
                prefix: l
            }),
            inputValue: x,
            country: g
        }
    }
    var ei = {
            size: 20,
            overrideLastItemDebounceMS: -1
        },
        es = ".",
        eo = "us",
        ec = "",
        eu = "+",
        ed = "............",
        em = " ",
        ep = 200,
        ef = !1,
        eh = !1,
        ex = !1,
        eg = !1,
        eb = !1,
        ev = !1,
        ey = ee,
        eC = ({
            phone: e,
            country: t,
            defaultMask: a = "............",
            disableFormatting: n = !1
        }) => {
            let r = t.format,
                l = e => n ? e.replace(RegExp(`[^${es}]`, "g"), "") : e;
            if (!r) return l(a);
            if ("string" == typeof r) return l(r);
            if (!r.default) return console.error(`[react-international-phone]: default mask for ${t.iso2} is not provided`), l(a);
            let i = Object.keys(r).find(a => {
                if ("default" === a) return !1;
                if ("/" !== a.charAt(0) || "/" !== a.charAt(a.length - 1)) return console.error(`[react-international-phone]: format regex "${a}" for ${t.iso2} is not valid`), !1;
                let n = new RegExp(a.substring(1, a.length - 1)),
                    r = e.replace(t.dialCode, "");
                return n.test(r.replace(/\D/g, ""))
            });
            return l(i ? r[i] : r.default)
        },
        ew = e => {
            let [t, a, n, r, l, i] = e;
            return {
                name: t,
                iso2: a,
                dialCode: n,
                format: r,
                priority: l,
                areaCodes: i
            }
        },
        ej = ({
            field: e,
            value: t,
            countries: a = ee
        }) => {
            if (["priority"].includes(e)) throw Error(`Field "${e}" is not supported`);
            let n = a.find(a => t === ew(a)[e]);
            if (n) return ew(n)
        },
        eN = ({
            phone: e,
            countries: t = ee,
            currentCountryIso2: a
        }) => {
            let n = {
                country: void 0,
                fullDialCodeMatch: !1
            };
            if (!e) return n;
            let r = e.replace(/\D/g, "");
            if (!r) return n;
            let l = n,
                i = ({
                    country: e,
                    fullDialCodeMatch: t
                }) => {
                    let a = e.dialCode === l.country ? .dialCode,
                        n = (e.priority ? ? 0) < (l.country ? .priority ? ? 0);
                    (!a || n) && (l = {
                        country: e,
                        fullDialCodeMatch: t
                    })
                };
            for (let e of t) {
                let t = ew(e),
                    {
                        dialCode: a,
                        areaCodes: n
                    } = t;
                if (r.startsWith(a)) {
                    let e = !l.country || Number(a) >= Number(l.country.dialCode);
                    if (n) {
                        let e = r.substring(a.length);
                        for (let a of n)
                            if (e.startsWith(a)) return {
                                country: t,
                                fullDialCodeMatch: !0
                            }
                    }(e || a === r || !l.fullDialCodeMatch) && i({
                        country: t,
                        fullDialCodeMatch: !0
                    })
                }
                l.fullDialCodeMatch || r.length < a.length && a.startsWith(r) && (!l.country || Number(a) <= Number(l.country.dialCode)) && i({
                    country: t,
                    fullDialCodeMatch: !1
                })
            }
            if (a) {
                let e = ej({
                    value: a,
                    field: "iso2",
                    countries: t
                });
                if (!e) return l;
                let n = !!e && (e => {
                    if (!e ? .areaCodes) return !1;
                    let t = r.substring(e.dialCode.length);
                    return e.areaCodes.some(e => e.startsWith(t))
                })(e);
                l && l.country ? .dialCode === e.dialCode && l.country !== e && l.fullDialCodeMatch && (!e.areaCodes || n) && (l = {
                    country: e,
                    fullDialCodeMatch: !0
                })
            }
            return l
        },
        eS = "abcdefghijklmnopqrstuvwxyz".split("").reduce((e, t, a) => ({ ...e,
            [t]: Number(parseInt("1f1e6", 16) + a).toString(16)
        }), {}),
        ek = ({
            iso2: e,
            size: t,
            src: a,
            protocol: n = "https",
            disableLazyLoading: r,
            className: l,
            style: i,
            ...s
        }) => e ? y.default.createElement("img", {
            className: ea({
                addPrefix: ["flag-emoji"],
                rawClassNames: [l]
            }),
            src: (() => {
                if (a) return a;
                let t = [eS[e[0]], eS[e[1]]].join("-");
                return `${n}://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${t}.svg`
            })(),
            width: t,
            height: t,
            draggable: !1,
            "data-country": e,
            loading: r ? void 0 : "lazy",
            style: {
                width: t,
                height: t,
                ...i
            },
            alt: "",
            ...s
        }) : y.default.createElement("img", {
            className: ea({
                addPrefix: ["flag-emoji"],
                rawClassNames: [l]
            }),
            width: t,
            height: t,
            ...s
        }),
        eP = ({
            show: e,
            dialCodePrefix: t = "+",
            selectedCountry: a,
            countries: n = ee,
            preferredCountries: r = [],
            flags: l,
            onSelect: i,
            onClose: s,
            ...o
        }) => {
            let c = (0, y.useRef)(null),
                u = (0, y.useRef)(),
                d = (0, y.useMemo)(() => {
                    if (!r || !r.length) return n;
                    let e = [],
                        t = [...n];
                    for (let a of r) {
                        let n = t.findIndex(e => ew(e).iso2 === a);
                        if (-1 !== n) {
                            let a = t.splice(n, 1)[0];
                            e.push(a)
                        }
                    }
                    return e.concat(t)
                }, [n, r]),
                m = (0, y.useRef)({
                    updatedAt: void 0,
                    value: ""
                }),
                p = (0, y.useCallback)(e => d.findIndex(t => ew(t).iso2 === e), [d]),
                [f, h] = (0, y.useState)(p(a)),
                x = () => {
                    u.current !== a && h(p(a))
                },
                g = (0, y.useCallback)(e => {
                    h(p(e.iso2)), i ? .(e)
                }, [i, p]),
                b = e => {
                    let t = d.length - 1;
                    h(a => {
                        let n = "prev" === e ? a - 1 : "next" === e ? a + 1 : "last" === e ? t : 0;
                        return n < 0 ? 0 : n > t ? t : n
                    })
                },
                v = (0, y.useCallback)(() => {
                    var e;
                    let t, a, n, r, l;
                    if (!c.current || void 0 === f) return;
                    let i = ew(d[f]).iso2;
                    if (i === u.current) return;
                    let s = c.current.querySelector(`[data-country="${i}"]`);
                    s && (e = c.current, "block" !== (t = e.style.display) && (e.style.display = "block"), a = e.getBoundingClientRect(), r = (n = s.getBoundingClientRect()).top - a.top, l = a.bottom - n.bottom, r >= 0 && l >= 0 || (Math.abs(r) < Math.abs(l) ? e.scrollTop += r : e.scrollTop -= l), e.style.display = t, u.current = i)
                }, [f, d]);
            return (0, y.useEffect)(() => {
                v()
            }, [f, v]), (0, y.useEffect)(() => {
                c.current && (e ? c.current.focus() : x())
            }, [e]), (0, y.useEffect)(() => {
                x()
            }, [a]), y.default.createElement("ul", {
                ref: c,
                role: "listbox",
                className: ea({
                    addPrefix: ["country-selector-dropdown"],
                    rawClassNames: [o.className]
                }),
                style: {
                    display: e ? "block" : "none",
                    ...o.style
                },
                onKeyDown: e => {
                    var t;
                    let a, n;
                    if (e.stopPropagation(), "Enter" === e.key) {
                        e.preventDefault(), g(ew(d[f]));
                        return
                    }
                    if ("Escape" === e.key) return void s ? .();
                    if ("ArrowUp" === e.key) {
                        e.preventDefault(), b("prev");
                        return
                    }
                    if ("ArrowDown" === e.key) {
                        e.preventDefault(), b("next");
                        return
                    }
                    if ("PageUp" === e.key) {
                        e.preventDefault(), b("first");
                        return
                    }
                    if ("PageDown" === e.key) {
                        e.preventDefault(), b("last");
                        return
                    }
                    " " === e.key && e.preventDefault(), 1 !== e.key.length || e.altKey || e.ctrlKey || e.metaKey || (t = e.key.toLocaleLowerCase(), a = m.current.updatedAt && new Date().getTime() - m.current.updatedAt.getTime() > 1e3, m.current = {
                        value: a ? t : `${m.current.value}${t}`,
                        updatedAt: new Date
                    }, -1 !== (n = d.findIndex(e => ew(e).name.toLowerCase().startsWith(m.current.value))) && h(n))
                },
                onBlur: s,
                tabIndex: -1,
                "aria-activedescendant": `react-international-phone__${ew(d[f]).iso2}-option`
            }, d.map((e, n) => {
                let i = ew(e),
                    s = i.iso2 === a,
                    c = n === f,
                    u = r.includes(i.iso2),
                    d = n === r.length - 1,
                    m = l ? .find(e => e.iso2 === i.iso2);
                return y.default.createElement(y.default.Fragment, {
                    key: i.iso2
                }, y.default.createElement("li", {
                    "data-country": i.iso2,
                    role: "option",
                    "aria-selected": s,
                    "aria-label": `${i.name} ${t}${i.dialCode}`,
                    id: `react-international-phone__${i.iso2}-option`,
                    className: ea({
                        addPrefix: ["country-selector-dropdown__list-item", u && "country-selector-dropdown__list-item--preferred", s && "country-selector-dropdown__list-item--selected", c && "country-selector-dropdown__list-item--focused"],
                        rawClassNames: [o.listItemClassName, u && o.listItemPreferredClassName, s && o.listItemSelectedClassName, c && o.listItemFocusedClassName]
                    }),
                    onClick: () => g(i),
                    style: o.listItemStyle,
                    title: i.name
                }, y.default.createElement(ek, {
                    iso2: i.iso2,
                    src: m ? .src,
                    className: ea({
                        addPrefix: ["country-selector-dropdown__list-item-flag-emoji"],
                        rawClassNames: [o.listItemFlagClassName]
                    }),
                    style: o.listItemFlagStyle
                }), y.default.createElement("span", {
                    className: ea({
                        addPrefix: ["country-selector-dropdown__list-item-country-name"],
                        rawClassNames: [o.listItemCountryNameClassName]
                    }),
                    style: o.listItemCountryNameStyle
                }, i.name), y.default.createElement("span", {
                    className: ea({
                        addPrefix: ["country-selector-dropdown__list-item-dial-code"],
                        rawClassNames: [o.listItemDialCodeClassName]
                    }),
                    style: o.listItemDialCodeStyle
                }, t, i.dialCode)), d ? y.default.createElement("hr", {
                    className: ea({
                        addPrefix: ["country-selector-dropdown__preferred-list-divider"],
                        rawClassNames: [o.preferredListDividerClassName]
                    }),
                    style: o.preferredListDividerStyle
                }) : null)
            }))
        },
        eE = y.default.memo(({
            selectedCountry: e,
            onSelect: t,
            disabled: a,
            hideDropdown: n,
            countries: r = ee,
            preferredCountries: l = [],
            flags: i,
            renderButtonWrapper: s,
            ...o
        }) => {
            let c, u, [d, m] = (0, y.useState)(!1),
                p = (0, y.useMemo)(() => {
                    if (e) return ej({
                        value: e,
                        field: "iso2",
                        countries: r
                    })
                }, [r, e]),
                f = (0, y.useRef)(null);
            return y.default.createElement("div", {
                className: ea({
                    addPrefix: ["country-selector"],
                    rawClassNames: [o.className]
                }),
                style: o.style,
                ref: f
            }, (c = {
                title: p ? .name,
                onClick: () => m(e => !e),
                onMouseDown: e => e.preventDefault(),
                onKeyDown: e => {
                    e.key && ["ArrowUp", "ArrowDown"].includes(e.key) && (e.preventDefault(), m(!0))
                },
                disabled: n || a,
                role: "combobox",
                "aria-label": "Country selector",
                "aria-haspopup": "listbox",
                "aria-expanded": d
            }, u = y.default.createElement("div", {
                className: ea({
                    addPrefix: ["country-selector-button__button-content"],
                    rawClassNames: [o.buttonContentWrapperClassName]
                }),
                style: o.buttonContentWrapperStyle
            }, y.default.createElement(ek, {
                iso2: e,
                src: i ? .find(t => t.iso2 === e) ? .src,
                className: ea({
                    addPrefix: ["country-selector-button__flag-emoji", a && "country-selector-button__flag-emoji--disabled"],
                    rawClassNames: [o.flagClassName]
                }),
                style: {
                    visibility: e ? "visible" : "hidden",
                    ...o.flagStyle
                }
            }), !n && y.default.createElement("div", {
                className: ea({
                    addPrefix: ["country-selector-button__dropdown-arrow", a && "country-selector-button__dropdown-arrow--disabled", d && "country-selector-button__dropdown-arrow--active"],
                    rawClassNames: [o.dropdownArrowClassName]
                }),
                style: o.dropdownArrowStyle
            })), s ? s({
                children: u,
                rootProps: c
            }) : y.default.createElement("button", { ...c,
                type: "button",
                className: ea({
                    addPrefix: ["country-selector-button", d && "country-selector-button--active", a && "country-selector-button--disabled", n && "country-selector-button--hide-dropdown"],
                    rawClassNames: [o.buttonClassName]
                }),
                "data-country": e,
                style: o.buttonStyle
            }, u)), y.default.createElement(eP, {
                show: d,
                countries: r,
                preferredCountries: l,
                flags: i,
                onSelect: e => {
                    m(!1), t ? .(e)
                },
                selectedCountry: e,
                onClose: () => {
                    m(!1)
                },
                ...o.dropdownStyleProps
            }))
        }),
        eM = ({
            dialCode: e,
            prefix: t,
            disabled: a,
            style: n,
            className: r
        }) => y.default.createElement("div", {
            className: ea({
                addPrefix: ["dial-code-preview", a && "dial-code-preview--disabled"],
                rawClassNames: [r]
            }),
            style: n
        }, `${t}${e}`),
        eD = (0, y.forwardRef)(({
            value: e,
            onChange: t,
            countries: a = ee,
            preferredCountries: n,
            hideDropdown: r,
            showDisabledDialCodeAndPrefix: l,
            disableFocusAfterCountrySelect: i,
            flags: s,
            style: o,
            className: c,
            inputStyle: u,
            inputClassName: d,
            countrySelectorStyleProps: m,
            dialCodePreviewStyleProps: p,
            inputProps: f,
            placeholder: h,
            disabled: x,
            name: g,
            onFocus: b,
            onBlur: v,
            required: C,
            autoFocus: w,
            ...j
        }, N) => {
            let S = (0, y.useCallback)(e => {
                    t ? .(e.phone, {
                        country: e.country,
                        inputValue: e.inputValue
                    })
                }, [t]),
                {
                    phone: k,
                    inputValue: P,
                    inputRef: E,
                    country: M,
                    setCountry: D,
                    handlePhoneValueChange: L
                } = (({
                    defaultCountry: e = eo,
                    value: t = ec,
                    countries: a = ey,
                    prefix: n = eu,
                    defaultMask: r = ed,
                    charAfterDialCode: l = em,
                    historySaveDebounceMS: i = ep,
                    disableCountryGuess: s = ef,
                    disableDialCodePrefill: o = eh,
                    forceDialCode: c = ex,
                    disableDialCodeAndPrefix: u = eg,
                    disableFormatting: d = eb,
                    allowMaskOverflow: m = ev,
                    onChange: p,
                    inputRef: f
                }) => {
                    let h = {
                            countries: a,
                            prefix: n,
                            charAfterDialCode: l,
                            forceDialCode: !u && c,
                            disableDialCodeAndPrefix: u,
                            defaultMask: r,
                            countryGuessingEnabled: !s,
                            disableFormatting: d,
                            allowMaskOverflow: m
                        },
                        x = (0, y.useRef)(null),
                        g = f || x,
                        b = e => {
                            Promise.resolve().then(() => {
                                typeof window > "u" || g.current !== document ? .activeElement || g.current ? .setSelectionRange(e, e)
                            })
                        },
                        v = (0, y.useCallback)(e => ej({
                            value: e,
                            field: "iso2",
                            countries: a
                        }), [a]),
                        [{
                            phone: C,
                            inputValue: w,
                            country: j
                        }, N, S, k] = function(e, t) {
                            let a, n, r, {
                                    size: l,
                                    overrideLastItemDebounceMS: i,
                                    onChange: s
                                } = { ...ei,
                                    ...t
                                },
                                [o, c] = (0, y.useState)(e),
                                u = (0, y.useRef)([o]),
                                d = (0, y.useRef)(0),
                                m = (a = (0, y.useRef)(), n = (0, y.useRef)(Date.now()), r = (0, y.useCallback)(() => {
                                    let e = Date.now(),
                                        t = a.current ? e - n.current : void 0;
                                    return a.current = n.current, n.current = e, t
                                }, []), (0, y.useMemo)(() => ({
                                    check: r
                                }), [r]));
                            return [o, (0, y.useCallback)((e, t) => {
                                let a = u.current[d.current];
                                if (e === a || "object" == typeof e && "object" == typeof a && ((e, t) => {
                                        let a = Object.keys(e),
                                            n = Object.keys(t);
                                        if (a.length !== n.length) return !1;
                                        for (let n of a)
                                            if (e[n] !== t[n]) return !1;
                                        return !0
                                    })(e, a)) return;
                                let n = i > 0,
                                    r = m.check(),
                                    o = !n || void 0 === r || r > i;
                                if (t ? .overrideLastItem !== void 0 ? t.overrideLastItem : !o) u.current = [...u.current.slice(0, d.current), e];
                                else {
                                    let t = u.current.length >= l;
                                    u.current = [...u.current.slice(+!!t, d.current + 1), e], t || (d.current += 1)
                                }
                                c(e), s ? .(e)
                            }, [s, i, l, m]), (0, y.useCallback)(() => {
                                if (d.current <= 0) return {
                                    success: !1
                                };
                                let e = u.current[d.current - 1];
                                return c(e), d.current -= 1, s ? .(e), {
                                    success: !0,
                                    value: e
                                }
                            }, [s]), (0, y.useCallback)(() => {
                                if (d.current + 1 >= u.current.length) return {
                                    success: !1
                                };
                                let e = u.current[d.current + 1];
                                return c(e), d.current += 1, s ? .(e), {
                                    success: !0,
                                    value: e
                                }
                            }, [s])]
                        }(() => {
                            let n = ej({
                                value: e,
                                field: "iso2",
                                countries: a
                            });
                            n || console.error(`[react-international-phone]: can not find a country with "${e}" iso2 code`);
                            let {
                                phone: r,
                                inputValue: l,
                                country: i
                            } = el({
                                value: t,
                                country: n || ej({
                                    value: "us",
                                    field: "iso2",
                                    countries: a
                                }),
                                insertDialCodeOnEmpty: !o,
                                ...h
                            });
                            return b(l.length), {
                                phone: r,
                                inputValue: l,
                                country: i.iso2
                            }
                        }, {
                            overrideLastItemDebounceMS: i,
                            onChange: (0, y.useCallback)(({
                                inputValue: e,
                                phone: t,
                                country: a
                            }) => {
                                p && p({
                                    phone: t,
                                    inputValue: e,
                                    country: v(a)
                                })
                            }, [v, p])
                        }),
                        P = (0, y.useMemo)(() => v(j), [j, v]);
                    (0, y.useEffect)(() => {
                        let e = g.current;
                        if (!e) return;
                        let t = e => {
                            if (!e.key) return;
                            let t = e.ctrlKey,
                                a = e.metaKey,
                                n = e.shiftKey;
                            if ("z" === e.key.toLowerCase()) {
                                if (!(typeof window > "u") && window.navigator.userAgent.toLowerCase().includes("macintosh")) {
                                    if (!a) return
                                } else if (!t) return;
                                n ? k() : S()
                            }
                        };
                        return e.addEventListener("keydown", t), () => {
                            e.removeEventListener("keydown", t)
                        }
                    }, [g, S, k]);
                    let E = (0, y.useCallback)((e, t = {
                            focusOnInput: !1
                        }) => {
                            let r = ej({
                                value: e,
                                field: "iso2",
                                countries: a
                            });
                            r ? (N({
                                inputValue: u ? "" : `${n}${r.dialCode}${l}`,
                                phone: `${n}${r.dialCode}`,
                                country: r.iso2
                            }), t.focusOnInput && Promise.resolve().then(() => {
                                g.current ? .focus()
                            })) : console.error(`[react-international-phone]: can not find a country with "${e}" iso2 code`)
                        }, [a, u, n, l, N, g]),
                        [M, D] = (0, y.useState)(!1);
                    return (0, y.useEffect)(() => {
                        if (!M) {
                            D(!0), t !== C && p ? .({
                                inputValue: w,
                                phone: C,
                                country: P
                            });
                            return
                        }
                        if (t === C) return;
                        let {
                            phone: e,
                            inputValue: a,
                            country: n
                        } = el({
                            value: t,
                            country: P,
                            insertDialCodeOnEmpty: !o,
                            ...h
                        });
                        N({
                            phone: e,
                            inputValue: a,
                            country: n.iso2
                        })
                    }, [t]), {
                        phone: C,
                        inputValue: w,
                        country: P,
                        setCountry: E,
                        handlePhoneValueChange: e => {
                            e.preventDefault();
                            let {
                                phone: a,
                                inputValue: n,
                                country: r,
                                cursorPosition: l
                            } = ((e, {
                                country: t,
                                insertDialCodeOnEmpty: a,
                                phoneBeforeInput: n,
                                prefix: r,
                                charAfterDialCode: l,
                                forceDialCode: i,
                                disableDialCodeAndPrefix: s,
                                countryGuessingEnabled: o,
                                defaultMask: c,
                                disableFormatting: u,
                                countries: d,
                                allowMaskOverflow: m
                            }) => {
                                let p = e.nativeEvent,
                                    f = p.inputType,
                                    h = (e => {
                                        if (e ? .toLocaleLowerCase().includes("delete")) return e ? .toLocaleLowerCase().includes("forward") ? "forward" : "backward"
                                    })(f),
                                    x = !!f ? .startsWith("insertFrom"),
                                    g = "insertText" === f,
                                    b = p ? .data || void 0,
                                    v = e.target.value,
                                    y = e.target.selectionStart ? ? 0;
                                if (f ? .includes("history")) return {
                                    inputValue: n,
                                    phone: er({
                                        phone: n,
                                        prefix: r
                                    }),
                                    cursorPosition: n.length,
                                    country: t
                                };
                                if (g && !en(b) && v !== r) return {
                                    inputValue: n,
                                    phone: er({
                                        phone: s ? `${t.dialCode}${n}` : n,
                                        prefix: r
                                    }),
                                    cursorPosition: y - (b ? .length ? ? 0),
                                    country: t
                                };
                                if (i && !v.startsWith(`${r}${t.dialCode}`) && !x) {
                                    let e = v ? n : `${r}${t.dialCode}${l}`;
                                    return {
                                        inputValue: e,
                                        phone: er({
                                            phone: e,
                                            prefix: r
                                        }),
                                        cursorPosition: r.length + t.dialCode.length + l.length,
                                        country: t
                                    }
                                }
                                let {
                                    phone: C,
                                    inputValue: w,
                                    country: j
                                } = el({
                                    value: v,
                                    country: t,
                                    trimNonDigitsEnd: "backward" === h,
                                    insertDialCodeOnEmpty: a,
                                    countryGuessingEnabled: o,
                                    countries: d,
                                    prefix: r,
                                    charAfterDialCode: l,
                                    forceDialCode: i,
                                    disableDialCodeAndPrefix: s,
                                    disableFormatting: u,
                                    defaultMask: c,
                                    allowMaskOverflow: m
                                }), N = (({
                                    phoneBeforeInput: e,
                                    phoneAfterInput: t,
                                    phoneAfterFormatted: a,
                                    cursorPositionAfterInput: n,
                                    leftOffset: r = 0,
                                    deletion: l
                                }) => {
                                    if (n < r) return r;
                                    if (!e) return a.length;
                                    let i = null;
                                    for (let e = n - 1; e >= 0; e -= 1)
                                        if (en(t[e])) {
                                            i = e;
                                            break
                                        }
                                    if (null === i) {
                                        for (let e = 0; e < t.length; e += 1)
                                            if (en(a[e])) return e;
                                        return t.length
                                    }
                                    let s = 0;
                                    for (let e = 0; e < i; e += 1) en(t[e]) && (s += 1);
                                    let o = 0,
                                        c = 0;
                                    for (let e = 0; e < a.length && (o += 1, en(a[e]) && (c += 1), !(c >= s + 1)); e += 1);
                                    if ("backward" !== l)
                                        for (; !en(a[o]) && o < a.length;) o += 1;
                                    return o
                                })({
                                    cursorPositionAfterInput: y,
                                    phoneBeforeInput: n,
                                    phoneAfterInput: v,
                                    phoneAfterFormatted: w,
                                    leftOffset: i ? r.length + t.dialCode.length + l.length : 0,
                                    deletion: h
                                });
                                return {
                                    phone: C,
                                    inputValue: w,
                                    cursorPosition: N,
                                    country: j
                                }
                            })(e, {
                                country: P,
                                phoneBeforeInput: w,
                                insertDialCodeOnEmpty: !1,
                                ...h
                            });
                            return N({
                                inputValue: n,
                                phone: a,
                                country: r.iso2
                            }), b(l), t
                        },
                        inputRef: g
                    }
                })({
                    value: e,
                    countries: a,
                    ...j,
                    onChange: S
                }),
                _ = j.disableDialCodeAndPrefix && l && M ? .dialCode,
                A = (0, y.useCallback)(e => {
                    D(e.iso2, {
                        focusOnInput: !i
                    })
                }, [D, i]);
            return (0, y.useImperativeHandle)(N, () => E.current ? Object.assign(E.current, {
                setCountry: D,
                state: {
                    phone: k,
                    inputValue: P,
                    country: M
                }
            }) : null, [E, D, k, P, M]), y.default.createElement("div", {
                ref: N,
                className: ea({
                    addPrefix: ["input-container"],
                    rawClassNames: [c]
                }),
                style: o
            }, y.default.createElement(eE, {
                onSelect: A,
                flags: s,
                selectedCountry: M ? .iso2,
                countries: a,
                preferredCountries: n,
                disabled: x,
                hideDropdown: r,
                ...m
            }), _ && y.default.createElement(eM, {
                dialCode: M.dialCode,
                prefix: j.prefix ? ? "+",
                disabled: x,
                ...p
            }), y.default.createElement("input", {
                onChange: L,
                value: P,
                type: "tel",
                ref: E,
                className: ea({
                    addPrefix: ["input", x && "input--disabled"],
                    rawClassNames: [d]
                }),
                placeholder: h,
                disabled: x,
                style: u,
                name: g,
                onFocus: b,
                onBlur: v,
                autoFocus: w,
                required: C,
                ...f
            }))
        });
    async function eL(e) {
        return !!window.MCL || (await new Promise((t, a) => {
            let n = document.getElementById("_mcl");
            if (n) {
                n.addEventListener("load", () => t(), {
                    once: !0
                }), n.addEventListener("error", () => a(Error("Monocle script failed")), {
                    once: !0
                });
                return
            }
            let r = document.createElement("script");
            r.id = "_mcl", r.async = !0, r.src = `https://mcl.spur.us/d/mcl.js?tk=${e}`, r.onload = () => t(), r.onerror = () => a(Error("Monocle script failed")), document.head.appendChild(r)
        }), !!window.MCL)
    }

    function e_(e) {
        return t = {
            assessment: e,
            at: Date.now()
        }, e
    }
    async function eA() {
        let e = "SMEGdTvQUE9moLnclaZZ76IgFMbJahmglg8xygdJsugIgtjv4Y152CEq6dTY3SPpRPpHiPFDZjLb0nR5qpYGxhzpjcJVpif5W8PP4FVSv1ePuBe5eU6fQsru0qNz0bU6NaCgZsmUCQlenaB7d497kVvjNxcMmc4k1pW9zXR3KwS3omYaMGlHzwOQZmVIND0c7mjXNzy9oatHBfYHNuf5CPXf7XU3ZSYcUwqXFkE54HqZdmk1zXWSeJQAQe3kMrsoNLQ5bOLQNmNT6UyfBqXktVxl9x5Y2gHjt0n2D3MMy47LgZ5x0SYnE85HnvvLRvNA4ZNvD35BIDc4Z5J6JCgsUfSP8ILNH8YK7X6j7T9xtATukEYLpr4lFufXyPcIfKjSLRsMEMXVHydiHIXINUuYHvsIA9xQYIrbf1rpuf";
        if (!e || "true" === _.default.env.NEXT_PUBLIC_E2E || !await eL(e)) return;
        if (t) {
            await window.MCL.refresh();
            let e = window.MCL.getAssessment();
            return e ? e_(e) : void 0
        }
        let a = window.MCL.getAssessment();
        return a ? e_(a) : new Promise(e => {
            window.MCL.configure({
                onAssessment: t => e(e_(t))
            })
        })
    }

    function eI() {
        return t && Date.now() - t.at < 48e4 ? Promise.resolve(t.assessment) : a || (a = eA().finally(() => {
            a = void 0
        }))
    }

    function eR({
        char: e,
        isActive: t
    }) {
        return (0, n.jsx)("div", {
            className: ["w-48 h-56 flex items-center justify-center rounded-8 transition-all text-title-h4 bg-surface", t ? "shadow-[inset_0_0_0_1.5px_var(--heat-100)]" : e ? "shadow-[inset_0_0_0_1px_var(--black-alpha-12)]" : "shadow-[inset_0_0_0_1px_var(--black-alpha-8)]"].join(" "),
            children: e
        })
    }

    function eB({
        allowEmail: e,
        redirectMethod: t,
        initialEmail: a,
        redirectUrl: r
    }) {
        let [l, i] = (0, y.useState)(!1), [s, o] = (0, y.useState)(a || ""), [c, d] = (0, y.useState)(""), [m, p] = (0, y.useState)({}), [f, h] = (0, y.useState)(null), b = !!a, [C, j] = (0, y.useState)("hidden"), [N, S] = (0, y.useState)(""), [k, P] = (0, y.useState)(""), [E, M] = (0, y.useState)(4), [D, L] = (0, y.useState)(null), [_, A] = (0, y.useState)(null), [I, B] = (0, y.useState)(!1), {
            executeRecaptcha: T
        } = (0, R.useReCaptcha)(), [z, F] = (0, y.useState)("us");
        (0, y.useEffect)(() => {
            $().then(F)
        }, []), (0, y.useEffect)(() => {
            a || o("")
        }, [a]);
        let H = (0, y.useCallback)(() => {
                let e = new URLSearchParams(window.location.search);
                return {
                    teamInvitationCode: e.get(x.QueryParams.teamInvitationCode),
                    teamInvitationName: e.get(x.QueryParams.teamInvitationName)
                }
            }, []),
            W = (0, y.useCallback)(e => {
                (0, g.showToast)(e.data, e.message, e.toastType), window.dataLayer = window.dataLayer || [], window.dataLayer.push({
                    event: "sign_up",
                    method: "email",
                    user_email: s
                }), window.location.href = e.redirect || "/app"
            }, [s]),
            U = (0, y.useCallback)(async () => {
                i(!0), h(null);
                let {
                    teamInvitationCode: e,
                    teamInvitationName: t
                } = H(), a = await eI(), n = await O(s, c, {
                    teamInvitationCode: e,
                    teamInvitationName: t,
                    redirect: r,
                    monocleAssessment: a
                });
                if (i(!1), n.requiresSmsVerification) return void j("phone");
                let {
                    data: l,
                    error: o,
                    message: u,
                    toastType: d,
                    redirect: m
                } = n;
                o ? h(u || o) : l && W({
                    data: l,
                    message: u,
                    toastType: d,
                    redirect: m
                })
            }, [s, c, r, H, W]),
            G = async e => {
                let t;
                e.preventDefault(), t = {}, s ? /\S+@\S+\.\S+/.test(s) || (t.email = "Please enter a valid email") : t.email = "Email is required", c ? c.length < 6 && (t.password = "Password must be at least 6 characters") : t.password = "Password is required", p(t), 0 === Object.keys(t).length && U()
            },
            Q = async () => {
                let e;
                if (!N || N.replace(/\D/g, "").length < 7) return void L("Please enter a valid phone number");
                L(null), B(!0);
                try {
                    e = await T("sms_verification")
                } catch {}
                let t = await V(N, s, e);
                B(!1), t.blocked ? L("Verification codes can't be delivered to this number. Please try a different one.") : t.success ? (t.codeLength && M(t.codeLength), j("code"), P(""), A(null)) : L(t.error || "Failed to send code")
            },
            q = async e => {
                let t;
                if (e.length < E) return;
                A(null);
                let {
                    teamInvitationCode: a,
                    teamInvitationName: n
                } = H();
                i(!0);
                try {
                    t = await eI()
                } catch {}
                let l = await O(s, c, {
                    teamInvitationCode: a,
                    teamInvitationName: n,
                    redirect: r,
                    monocleAssessment: t,
                    smsVerification: {
                        phone: N,
                        code: e
                    }
                });
                if (i(!1), l.requiresSmsVerification && l.error) {
                    A(l.message || "Invalid code"), P("");
                    return
                }
                let {
                    data: o,
                    error: u,
                    message: d,
                    toastType: m,
                    redirect: p
                } = l;
                u ? (A(d || u), P("")) : o && W({
                    data: o,
                    message: d,
                    toastType: m,
                    redirect: p
                })
            };
        return "phone" === C ? (0, n.jsxs)("div", {
            className: "w-full space-y-24",
            children: [(0, n.jsxs)("div", {
                className: "space-y-4",
                children: [(0, n.jsx)("h2", {
                    className: "text-title-h5 text-accent-black",
                    children: "Verify your phone number"
                }), (0, n.jsx)("p", {
                    className: "text-body-small text-black-alpha-56",
                    children: "We noticed something unusual about your connection, like a VPN or proxy. A quick phone verification lets us keep Firecrawl secure."
                })]
            }), (0, n.jsxs)("form", {
                onSubmit: e => {
                    e.preventDefault(), Q()
                },
                className: "space-y-24",
                children: [(0, n.jsxs)("div", {
                    className: "w-full",
                    children: [(0, n.jsx)("label", {
                        htmlFor: "phone",
                        className: "block text-label-small text-secondary mb-6",
                        children: "Phone Number"
                    }), (0, n.jsx)("div", {
                        className: "fire-phone-input",
                        children: (0, n.jsx)(eD, {
                            defaultCountry: z,
                            value: N,
                            onChange: e => {
                                S(e), L(null)
                            },
                            inputProps: {
                                id: "phone",
                                autoComplete: "tel"
                            }
                        })
                    }), D && (0, n.jsx)("p", {
                        className: "text-label-small text-accent-crimson mt-4",
                        children: D
                    })]
                }), (0, n.jsxs)("div", {
                    className: "space-y-12",
                    children: [(0, n.jsx)(u.CapsuleButton, {
                        type: "submit",
                        size: "lg",
                        fullWidth: !0,
                        variant: "primary",
                        loading: I,
                        children: "Send Verification Code"
                    }), (0, n.jsxs)("button", {
                        type: "button",
                        className: "flex items-center justify-center gap-6 w-full text-label-small text-black-alpha-48 hover:text-black-alpha-72 transition-colors",
                        onClick: () => {
                            j("hidden"), B(!1)
                        },
                        children: [(0, n.jsx)(Y.ArrowLeft, {
                            className: "w-14 h-14"
                        }), "Back to sign up"]
                    })]
                })]
            })]
        }) : "code" === C ? (0, n.jsxs)("div", {
            className: "w-full space-y-24",
            children: [(0, n.jsxs)("div", {
                className: "space-y-4",
                children: [(0, n.jsx)("h2", {
                    className: "text-title-h5 text-accent-black",
                    children: "Enter verification code"
                }), (0, n.jsxs)("p", {
                    className: "text-body-small text-black-alpha-56",
                    children: ["We sent a ", E, "-digit code to", " ", (0, n.jsx)("span", {
                        className: "text-accent-black font-medium",
                        children: N
                    })]
                })]
            }), (0, n.jsxs)("div", {
                className: "flex flex-col items-center gap-12",
                children: [(0, n.jsx)(Z, {
                    maxLength: E,
                    value: k,
                    onChange: P,
                    onComplete: q,
                    containerClassName: "flex gap-8 justify-center",
                    render: ({
                        slots: e
                    }) => (0, n.jsx)("div", {
                        className: "flex gap-8",
                        children: e.map((e, t) => (0, n.jsx)(eR, { ...e
                        }, t))
                    })
                }), _ && (0, n.jsx)("p", {
                    className: "text-label-small text-accent-crimson text-center",
                    children: _
                })]
            }), (0, n.jsxs)("div", {
                className: "space-y-12",
                children: [(0, n.jsx)(u.CapsuleButton, {
                    type: "button",
                    size: "lg",
                    fullWidth: !0,
                    variant: "primary",
                    loading: l,
                    onClick: () => q(k),
                    disabled: k.length < E,
                    children: "Verify & Create Account"
                }), (0, n.jsxs)("button", {
                    type: "button",
                    className: "flex items-center justify-center gap-6 w-full text-label-small text-black-alpha-48 hover:text-black-alpha-72 transition-colors",
                    onClick: () => {
                        j("phone"), P(""), A(null), i(!1)
                    },
                    children: [(0, n.jsx)(Y.ArrowLeft, {
                        className: "w-14 h-14"
                    }), "Change number or resend"]
                })]
            })]
        }) : (0, n.jsx)("div", {
            className: "w-full",
            children: (0, n.jsxs)("form", {
                noValidate: !0,
                className: "space-y-16",
                onSubmit: G,
                children: [(0, n.jsxs)("div", {
                    className: "space-y-12",
                    children: [(0, n.jsx)(w, {
                        id: "email",
                        label: "Email",
                        placeholder: "name@example.com",
                        type: "email",
                        name: "email",
                        autoCapitalize: "none",
                        autoComplete: "email",
                        autoCorrect: "off",
                        value: s,
                        onChange: e => o(e.target.value),
                        error: m.email,
                        icon: (0, n.jsx)(v.Mail, {
                            className: "w-16 h-16"
                        }),
                        disabled: b,
                        readOnly: b
                    }), (0, n.jsx)(w, {
                        id: "password",
                        label: "Password",
                        placeholder: "••••••••",
                        type: "password",
                        name: "password",
                        autoComplete: "new-password",
                        value: c,
                        onChange: e => d(e.target.value),
                        error: m.password,
                        icon: (0, n.jsx)(J.Lock, {
                            className: "w-16 h-16"
                        })
                    })]
                }), f && (0, n.jsx)("p", {
                    className: "text-label-small text-accent-crimson",
                    children: f
                }), (0, n.jsx)(u.CapsuleButton, {
                    type: "submit",
                    size: "lg",
                    fullWidth: !0,
                    loading: l,
                    variant: "primary",
                    children: "Create Account"
                })]
            })
        })
    }
    var eT = e.i(796620),
        e$ = e.i(534026),
        eV = e.i(791411),
        eO = e.i(883938);

    function ez({
        isOpen: e,
        onClose: t
    }) {
        let [a, r] = (0, y.useState)(!1), [l, i] = (0, y.useState)(""), [s, o] = (0, y.useState)(""), c = (0, y.useRef)(null);
        (0, y.useEffect)(() => (e ? (document.body.style.overflow = "hidden", setTimeout(() => {
            c.current ? .focus()
        }, 100)) : document.body.style.overflow = "unset", () => {
            document.body.style.overflow = "unset"
        }), [e]), (0, y.useEffect)(() => {
            let a = a => {
                "Escape" === a.key && e && t()
            };
            return document.addEventListener("keydown", a), () => document.removeEventListener("keydown", a)
        }, [e, t]);
        let d = async e => {
            if (e.preventDefault(), !(l ? (o(""), !0) : (o("SSO code is required"), !1))) return;
            let t = new URLSearchParams(window.location.search),
                a = t.get(x.QueryParams.teamInvitationCode),
                n = t.get(x.QueryParams.redirect);
            r(!0), await (0, P.signInWithSSO)(l, null, a, void 0, n), setTimeout(() => {
                r(!1)
            }, 1e4)
        };
        return (0, n.jsx)(eT.AnimatePresence, {
            children: e && (0, n.jsxs)(n.Fragment, {
                children: [(0, n.jsx)(e$.motion.div, {
                    className: "fixed inset-0 z-[100] bg-background-base/80 backdrop-blur-md",
                    onClick: t,
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        duration: .2
                    }
                }), (0, n.jsx)(e$.motion.div, {
                    className: "fixed z-[101] w-full max-w-md",
                    style: {
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)"
                    },
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        mass: .8
                    },
                    children: (0, n.jsxs)(e$.motion.div, {
                        className: "relative bg-surface border border-border-faint shadow-xl overflow-hidden rounded-16",
                        initial: {
                            scale: .95
                        },
                        animate: {
                            scale: 1
                        },
                        exit: {
                            scale: .95
                        },
                        transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            mass: .8
                        },
                        onClick: e => e.stopPropagation(),
                        children: [(0, n.jsx)("div", {
                            className: "relative p-24 border-b border-border-faint",
                            children: (0, n.jsxs)("div", {
                                className: "flex items-center justify-between",
                                children: [(0, n.jsxs)("div", {
                                    className: "flex items-center gap-12",
                                    children: [(0, n.jsx)("div", {
                                        className: "w-40 h-40 bg-heat-4 rounded-12 flex items-center justify-center",
                                        children: (0, n.jsx)(eV.Building2, {
                                            className: "w-20 h-20 text-heat-100"
                                        })
                                    }), (0, n.jsxs)("div", {
                                        children: [(0, n.jsx)("h2", {
                                            className: "text-label-large text-accent-black",
                                            children: "Sign in with SSO"
                                        }), (0, n.jsx)("p", {
                                            className: "text-body-small text-secondary",
                                            children: "Enter your organization's SSO code to continue"
                                        })]
                                    })]
                                }), (0, n.jsx)("button", {
                                    onClick: t,
                                    className: "p-6 rounded-6 hover:bg-black-alpha-4 transition-colors active:scale-[0.98]",
                                    children: (0, n.jsx)(eO.X, {
                                        className: "w-16 h-16 text-foreground-dimmer"
                                    })
                                })]
                            })
                        }), (0, n.jsx)("form", {
                            onSubmit: d,
                            className: "p-24",
                            children: (0, n.jsxs)("div", {
                                className: "space-y-16",
                                children: [(0, n.jsxs)("div", {
                                    children: [(0, n.jsx)("label", {
                                        htmlFor: "sso-code",
                                        className: "block text-label-small text-accent-black mb-8",
                                        children: "SSO Code"
                                    }), (0, n.jsx)("input", {
                                        ref: c,
                                        id: "sso-code",
                                        type: "text",
                                        value: l,
                                        onChange: e => {
                                            i(e.target.value), o("")
                                        },
                                        placeholder: "your-company",
                                        className: (0, m.cn)("w-full py-12 px-16 rounded-12 transition-all", "bg-black-alpha-2 border border-black-alpha-8", "focus:bg-surface focus:border-heat-100 focus:outline-none", "focus:shadow-[0_0_0_3px_rgba(250,93,25,0.08)]", "text-body-medium placeholder:text-foreground-dimmer", s && "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.08)]")
                                    }), s && (0, n.jsx)("p", {
                                        className: "mt-8 text-label-small text-red-500",
                                        children: s
                                    })]
                                }), (0, n.jsx)(u.CapsuleButton, {
                                    type: "submit",
                                    size: "lg",
                                    fullWidth: !0,
                                    loading: a,
                                    variant: "primary",
                                    children: "Continue with SSO"
                                })]
                            })
                        }), (0, n.jsx)("div", {
                            className: "px-24 pb-24 pt-0",
                            children: (0, n.jsx)("p", {
                                className: "text-label-small text-foreground-dimmer text-center",
                                children: "Don't know your SSO code? Contact your IT administrator."
                            })
                        })]
                    })
                })]
            })
        })
    }
    let eF = e.i(832356).z.enum(["signup", "signin", "signin_magic_link", "signin_email_password", "signin_sso", "signin_reset_password"]);

    function eH(e) {
        let t = eF.safeParse(e);
        return t.success ? t.data : "signup"
    }
    var eW = e.i(362333);

    function eU() {
        let [, e] = (0, eW.useQueryState)(x.QueryParams.view, {
            parse: eH
        });
        return (0, n.jsx)(u.CapsuleButton, {
            fullWidth: !0,
            size: "lg",
            variant: "tertiary",
            onClick: () => e("signin_sso"),
            icon: eV.Building2,
            iconPosition: "left",
            children: "Continue with SSO"
        })
    }
    let eG = [{
        label: "Log In",
        value: "signin"
    }, {
        label: "Sign Up",
        value: "signup"
    }];

    function eQ({
        activeTab: e,
        onTabChange: t
    }) {
        let a = (0, y.useRef)(null),
            r = (0, y.useRef)([]),
            l = (0, y.useRef)(null),
            [i, s] = (0, y.useState)(!1),
            o = eG.findIndex(t => t.value === e),
            [c, u] = (0, y.useState)({
                x: 0,
                width: 0
            });
        return (0, y.useEffect)(() => {
            s(!0)
        }, []), (0, y.useEffect)(() => {
            if (i && o >= 0 && r.current[o] && l.current) {
                let e = r.current[o],
                    t = l.current;
                if (e && t) {
                    let a = e.getBoundingClientRect(),
                        n = t.getBoundingClientRect();
                    u({
                        x: a.left - n.left,
                        width: a.width
                    })
                }
            }
        }, [o, i]), (0, n.jsxs)("div", {
            className: "flex relative justify-center",
            ref: l,
            children: [i && 0 !== c.width && (0, n.jsx)(e$.motion.div, {
                animate: c,
                className: "absolute top-12 left-0 z-[2] inset-y-12 bg-surface-alpha-72 rounded-full backdrop-blur-4",
                initial: c,
                ref: a,
                style: {
                    boxShadow: "0px 24px 32px -12px var(--black-alpha-3), 0px 16px 24px -8px var(--black-alpha-3), 0px 8px 16px -4px var(--black-alpha-3), 0px 0px 0px 1px var(--black-alpha-3)"
                },
                transition: {
                    type: "spring",
                    stiffness: 250,
                    damping: 26
                }
            }), eG.map((a, l) => (0, n.jsx)("div", {
                className: (0, m.cn)("relative p-12 group flex-1 flex justify-center items-center"),
                children: (0, n.jsx)("button", {
                    className: (0, m.cn)("py-12 px-24 flex justify-center items-center relative z-[3] transition-colors", e === a.value ? "text-accent-black" : "text-black-alpha-64 hover:text-black-alpha-88 hover:before:opacity-100", "before:inside-border before:border-border-faint before:opacity-0 rounded-full before:scale-[0.98] hover:before:scale-100"),
                    "data-active": e === a.value,
                    ref: e => {
                        r.current[l] = e
                    },
                    onClick: () => {
                        t(a.value)
                    },
                    children: (0, n.jsx)("div", {
                        className: "text-label-medium",
                        children: a.label
                    })
                })
            }, l)), (0, n.jsx)("div", {
                className: "absolute left-1/2 -translate-x-1/2 w-1 bg-border-faint -top-[4px] -bottom-[4px]",
                style: {
                    height: "calc(100% + 8px)"
                }
            })]
        })
    }
    var eq = e.i(323576),
        eZ = e.i(227425),
        eK = e.i(821423),
        eX = e.i(152520),
        eY = e.i(474010);

    function eJ() {
        return (0, n.jsx)(y.Suspense, {
            fallback: (0, n.jsx)(eY.FullPageLoading, {}),
            children: (0, n.jsx)(e0, {})
        })
    }

    function e0() {
        let {
            optionalUser: e,
            loading: t
        } = (0, eK.useOptionalUser)(), [a, r] = (0, b.useAtom)(i), l = (0, b.useSetAtom)(o), {
            allowOauth: s,
            allowEmail: u,
            allowPassword: d,
            allowSSO: m
        } = {
            allowOauth: !0,
            allowEmail: !0,
            allowPassword: !0,
            allowSSO: !0
        }, p = "client", f = (0, S.useRouter)(), [h, g] = (0, eW.useQueryState)(x.QueryParams.view, {
            parse: eH,
            defaultValue: "signup"
        }), [v] = (0, eW.useQueryState)(x.QueryParams.redirect, eW.parseAsString), C = (0, y.useRef)(h);
        (0, y.useEffect)(() => {
            "signin_sso" !== h && (C.current = h)
        }, [h]);
        let w = (0, y.useMemo)(() => "signup" === h ? "signup" : "signin", [h]),
            [N, P] = (0, eW.useQueryState)(x.QueryParams.teamInvitationCode, eW.parseAsString),
            [E, M] = (0, eW.useQueryState)(x.QueryParams.teamInvitationName, eW.parseAsString),
            [D, _] = (0, eW.useQueryState)(x.QueryParams.teamInvitationEmail, eW.parseAsString),
            A = y.default.useCallback(async () => {
                await Promise.all([P(null), M(null), _(null)])
            }, [P, M, _]);
        (0, y.useEffect)(() => {
            if (t || !e) return;
            l();
            let a = (0, eZ.getValidRedirect)(v);
            a ? f.push(a) : N ? f.push(x.createWebRoute.invite.page({
                teamInvitationCode: N,
                teamInvitationName: E,
                teamInvitationEmail: D
            })) : f.push(x.createWebRoute.app.page())
        }, [t, e, f, v, l, N, E, D]);
        let I = (0, y.useMemo)(() => (0, n.jsxs)("div", {
            className: "relative",
            children: [(0, n.jsx)("div", {
                className: "absolute top-0 w-screen left-[calc(50%-50vw)] h-1 bg-border-faint"
            }), (0, n.jsx)(eq.Connector, {
                className: "absolute -top-[10px] -left-[10.5px]"
            }), (0, n.jsx)(eq.Connector, {
                className: "absolute -top-[10px] -right-[10.5px]"
            }), (0, n.jsxs)("div", {
                className: "pt-48 pb-32 relative overflow-hidden",
                children: [(0, n.jsx)("div", {
                    className: "absolute inset-0 flex items-center justify-center",
                    children: (0, n.jsx)("div", {
                        className: "relative w-[600px] h-[300px]",
                        children: (0, n.jsx)(e1, {
                            className: "!relative !w-full !h-full opacity-80 !text-black-alpha-20"
                        })
                    })
                }), (0, n.jsx)("div", {
                    className: "flex items-center justify-center relative z-10 pb-16",
                    children: (0, n.jsx)(c, {})
                })]
            }), (0, n.jsx)("div", {
                className: "absolute bottom-0 w-screen left-[calc(50%-50vw)] h-1 bg-border-faint"
            }), (0, n.jsx)(eq.Connector, {
                className: "absolute -bottom-[10px] -left-[10.5px]"
            }), (0, n.jsx)(eq.Connector, {
                className: "absolute -bottom-[10px] -right-[10.5px]"
            })]
        }), []);
        return (0, n.jsxs)("div", {
            className: "min-h-screen bg-background-base relative flex flex-col overflow-y-auto",
            children: [(0, n.jsxs)("div", {
                className: "w-full pt-80 max-w-[400px] mx-auto relative flex flex-col min-h-full",
                children: [I, N && (0, n.jsxs)("div", {
                    className: "relative",
                    children: [(0, n.jsx)("div", {
                        className: "px-16 py-12",
                        children: (0, n.jsx)("div", {
                            className: "p-12 bg-heat-8 rounded-8 border border-heat-100/30",
                            children: (0, n.jsxs)("div", {
                                className: "space-y-8",
                                children: [(0, n.jsx)("p", {
                                    className: "text-body-small text-black-alpha-72 break-words",
                                    children: E ? (0, n.jsxs)(n.Fragment, {
                                        children: ["Join ", (0, n.jsx)("span", {
                                            className: "font-medium text-heat-100",
                                            children: E
                                        }), D && (0, n.jsxs)(n.Fragment, {
                                            children: [" ", "with", " ", (0, n.jsx)("span", {
                                                className: "font-medium break-all",
                                                children: D
                                            })]
                                        }), "."]
                                    }) : (0, n.jsxs)(n.Fragment, {
                                        children: ["Team invitation", D && (0, n.jsxs)(n.Fragment, {
                                            children: [" ", "— sign in with", " ", (0, n.jsx)("span", {
                                                className: "font-medium break-all",
                                                children: D
                                            })]
                                        }), "."]
                                    })
                                }), (0, n.jsx)("div", {
                                    className: "flex justify-end",
                                    children: (0, n.jsx)("button", {
                                        onClick: () => void A(),
                                        className: "text-label-small text-black-alpha-56 hover:text-black-alpha-88 underline underline-offset-2 transition-colors",
                                        type: "button",
                                        children: "Accept later"
                                    })
                                })]
                            })
                        })
                    }), (0, n.jsx)("div", {
                        className: "absolute bottom-0 w-screen left-[calc(50%-50vw)] h-1 bg-border-faint"
                    }), (0, n.jsx)(eq.Connector, {
                        className: "absolute -bottom-[10px] -left-[10.5px]"
                    }), (0, n.jsx)(eq.Connector, {
                        className: "absolute -bottom-[10px] -right-[10.5px]"
                    })]
                }), "signin_reset_password" !== h && (0, n.jsxs)("div", {
                    className: "relative",
                    children: [(0, n.jsx)("div", {
                        className: "px-16 py-4",
                        children: (0, n.jsx)(eQ, {
                            activeTab: w,
                            onTabChange: e => {
                                "signup" === e ? g("signup") : g("signin"), r(!1)
                            }
                        })
                    }), (0, n.jsx)("div", {
                        className: "absolute bottom-0 w-screen left-[calc(50%-50vw)] h-1 bg-border-faint"
                    }), (0, n.jsx)(eq.Connector, {
                        className: "absolute -bottom-[10px] -left-[10.5px]"
                    }), (0, n.jsx)(eq.Connector, {
                        className: "absolute -bottom-[10px] -right-[10.5px]"
                    })]
                }), "signin_reset_password" === h && (0, n.jsxs)("div", {
                    className: "relative",
                    children: [(0, n.jsx)("div", {
                        className: "px-16 py-32 text-left",
                        children: (0, n.jsx)("p", {
                            className: "text-body-medium text-secondary",
                            children: "Enter your email address and we'll send you a link to reset your password."
                        })
                    }), (0, n.jsx)("div", {
                        className: "absolute bottom-0 w-screen left-[calc(50%-50vw)] h-1 bg-border-faint"
                    }), (0, n.jsx)(eq.Connector, {
                        className: "absolute -bottom-[10px] -left-[10.5px]"
                    }), (0, n.jsx)(eq.Connector, {
                        className: "absolute -bottom-[10px] -right-[10.5px]"
                    })]
                }), (0, n.jsx)("div", {
                    className: "relative flex-1 flex flex-col min-h-0",
                    children: (0, n.jsxs)("div", {
                        className: "flex-1",
                        children: [(0, n.jsx)("div", {
                            className: "px-16 pt-24",
                            children: "signin_reset_password" === h ? (0, n.jsx)(n.Fragment, {
                                children: (0, n.jsx)(j, {
                                    allowEmail: u,
                                    redirectMethod: p,
                                    disableButton: a,
                                    onBackToSignIn: () => {
                                        g("signin_email_password"), r(!1)
                                    }
                                })
                            }) : "signin" === w ? "signin_magic_link" === h ? (0, n.jsx)(k, {
                                allowPassword: d,
                                redirectMethod: p,
                                initialEmail: D,
                                onSwitchToPassword: () => {
                                    g("signin_email_password")
                                }
                            }) : (0, n.jsx)(T, {
                                allowEmail: u,
                                redirectMethod: p,
                                initialEmail: D,
                                redirectUrl: v,
                                onSwitchToEmail: () => {
                                    g("signin_magic_link")
                                },
                                onForgotPassword: () => {
                                    g("signin_reset_password")
                                }
                            }) : (0, n.jsx)(eB, {
                                allowEmail: u,
                                redirectMethod: p,
                                initialEmail: D,
                                redirectUrl: v
                            })
                        }), "signin_reset_password" === h && (0, n.jsxs)("div", {
                            className: "relative mt-24",
                            children: [(0, n.jsx)("div", {
                                className: "absolute top-0 w-screen left-[calc(50%-50vw)] h-1 bg-border-faint"
                            }), (0, n.jsx)(eq.Connector, {
                                className: "absolute -top-[10px] -left-[10.5px]"
                            }), (0, n.jsx)(eq.Connector, {
                                className: "absolute -top-[10px] -right-[10.5px]"
                            })]
                        }), (s || m) && "signin_reset_password" !== h && (0, n.jsxs)(n.Fragment, {
                            children: [(0, n.jsxs)("div", {
                                className: "relative mt-24",
                                children: [(0, n.jsx)("div", {
                                    className: "absolute top-0 w-screen left-[calc(50%-50vw)] h-1 bg-border-faint"
                                }), (0, n.jsx)(eq.Connector, {
                                    className: "absolute -top-[10px] -left-[10.5px]"
                                }), (0, n.jsx)(eq.Connector, {
                                    className: "absolute -top-[10px] -right-[10.5px]"
                                })]
                            }), (0, n.jsxs)("div", {
                                className: "px-16 py-24",
                                children: [s && (0, n.jsx)(L, {}), m && "signup" !== w && (0, n.jsx)("div", {
                                    className: "mt-12",
                                    children: (0, n.jsx)(eU, {})
                                })]
                            }), (0, n.jsxs)("div", {
                                className: "relative",
                                children: [(0, n.jsx)("div", {
                                    className: "absolute top-0 w-screen left-[calc(50%-50vw)] h-1 bg-border-faint"
                                }), (0, n.jsx)(eq.Connector, {
                                    className: "absolute -top-[10px] -left-[10.5px]"
                                }), (0, n.jsx)(eq.Connector, {
                                    className: "absolute -top-[10px] -right-[10.5px]"
                                })]
                            })]
                        }), "signup" === w && (0, n.jsxs)("div", {
                            className: "px-16 py-24 text-center space-y-12",
                            children: [(0, n.jsxs)("p", {
                                className: "text-label-x-small text-black-alpha-40",
                                children: ["By signing up, you agree to our", " ", (0, n.jsx)("a", {
                                    href: "/terms-of-service",
                                    className: "text-black-alpha-64 hover:text-black-alpha-88 underline",
                                    children: "Terms of Service"
                                }), " ", "and", " ", (0, n.jsx)("a", {
                                    href: "/privacy-policy",
                                    className: "text-black-alpha-64 hover:text-black-alpha-88 underline",
                                    children: "Privacy Policy"
                                })]
                            }), (0, n.jsx)("p", {
                                className: "text-label-x-small text-black-alpha-32",
                                children: (0, n.jsx)("a", {
                                    href: "/agent-onboarding/SKILL.md",
                                    className: "text-black-alpha-40 hover:text-heat-100 underline underline-offset-2 transition-colors",
                                    children: "Are you an AI agent? Get an API key here"
                                })
                            })]
                        }), "signin" === w && (0, n.jsx)("div", {
                            className: "px-16 py-24 text-center",
                            children: (0, n.jsxs)("p", {
                                className: "text-label-x-small text-black-alpha-48",
                                children: [(0, n.jsx)("a", {
                                    href: "/privacy-policy",
                                    className: "text-black-alpha-64 hover:text-black-alpha-88 hover:underline underline-offset-2",
                                    children: "Privacy Policy"
                                }), (0, n.jsx)("span", {
                                    className: "mx-8 text-black-alpha-24",
                                    children: "•"
                                }), (0, n.jsx)("a", {
                                    href: "/terms-of-service",
                                    className: "text-black-alpha-64 hover:text-black-alpha-88 hover:underline underline-offset-2",
                                    children: "Terms of Service"
                                })]
                            })
                        })]
                    })
                })]
            }), m && (0, n.jsx)(ez, {
                isOpen: "signin_sso" === h,
                onClose: () => {
                    g("signin_sso" !== C.current ? C.current : "signin")
                }
            })]
        })
    }
    let e1 = (0, eX.default)(() => e.A(816109), {
        loadableGenerated: {
            modules: [80828]
        },
        ssr: !1
    });
    e.s(["default", () => eJ], 730692)
}]);

//# debugId=df5d32b8-a4c6-1e7f-8529-99702efc0d7d
//# sourceMappingURL=d7eae790abaa15b8.js.map