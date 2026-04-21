"use strict";
(() => {
    var h = {
        apiUrl: "https://groas-backend.onrender.com",
        appUrl: "https://app.groas.ai",
        packageVersion: "dev"
    };

    function y() {
        if (!(typeof window > "u")) return window.__GROAS_RUNTIME_CONFIG__
    }

    function R() {
        return "https://groas-backend.onrender.com"
    }

    function U() {
        return "https://app.groas.ai"
    }

    function L() {
        return "2.0.2"
    }
    var m = {
        get apiUrl() {
            return y() ? .apiUrl ? ? R() ? ? h.apiUrl
        },
        get appUrl() {
            return y() ? .appUrl ? ? U() ? ? h.appUrl
        },
        get packageVersion() {
            return y() ? .packageVersion ? ? L() ? ? h.packageVersion
        }
    };

    function w(t) {
        return new URL(t, m.apiUrl).toString()
    }

    function b(t) {
        return new URL(t, m.appUrl).toString()
    }
    var g = {
            background: "hsl(240 10% 3.9%)",
            foreground: "hsl(0, 0%, 90%)",
            primary: "hsl(0, 0%, 98%)",
            primaryForeground: "hsl(240 10% 3.9%)",
            muted: "hsl(240 5% 9.6%)",
            mutedForeground: "hsl(240, 5%, 65%)",
            border: "hsl(240 3.7% 14.9%)"
        },
        v = t => `${Math.round(t*.65)}px`;

    function C() {
        if (!document.getElementById("groas-validation-animations")) {
            let c = document.createElement("style");
            c.id = "groas-validation-animations", c.textContent = `
      @keyframes groas-modal-in {
        from {
          opacity: 0;
          transform: scale(0.95) translateY(-10px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
      @keyframes groas-overlay-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes groas-success-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
    `, document.head.appendChild(c)
        }
        let t = document.createElement("div");
        t.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1000000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
    backdrop-filter: blur(12px);
    animation: groas-overlay-in 0.3s ease-out;
  `;
        let e = document.createElement("div");
        e.style.cssText = `
    background: ${g.background};
    border-radius: ${v(16)};
    padding: 0;
    width: 90%;
    max-width: 420px;
    overflow: hidden;
    border: 1px solid ${g.border};
    box-shadow: 
      0 32px 64px -12px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.05);
    animation: groas-modal-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
  `;
        let n = document.createElement("div");
        n.style.cssText = `
    padding: 48px 32px 32px 32px;
    text-align: center;
    position: relative;
  `;
        let i = document.createElement("div");
        i.style.cssText = `
    position: relative;
    display: inline-block;
    margin-bottom: 24px;
  `;
        let r = document.createElement("div");
        r.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background: radial-gradient(circle, hsla(142, 76%, 36%, 0.3) 0%, transparent 70%);
    border-radius: 50%;
  `;
        let s = document.createElement("div");
        s.style.cssText = `
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, hsl(142, 76%, 36%) 0%, hsl(142, 76%, 46%) 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 
      0 8px 24px hsla(142, 76%, 36%, 0.3),
      inset 0 1px 0 hsla(255, 255, 255, 0.2);
    animation: groas-success-pulse 2s ease-in-out infinite;
  `, s.innerHTML = `
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20,6 9,17 4,12"></polyline>
    </svg>
  `;
        let u = document.createElement("h2");
        u.textContent = "Script Installed Successfully!", u.style.cssText = `
    margin: 0 0 12px 0;
    font-size: 24px;
    color: ${g.foreground};
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 1.2;
  `;
        let a = document.createElement("p");
        a.textContent = "Your groas content script is now active and ready to optimize your campaigns.", a.style.cssText = `
    margin: 0 0 32px 0;
    font-size: 15px;
    color: ${g.mutedForeground};
    line-height: 1.5;
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
  `;
        let o = document.createElement("button");
        o.textContent = "Continue to groas", o.style.cssText = `
    padding: 14px 28px;
    background: linear-gradient(135deg, ${g.primary} 0%, hsl(0, 0%, 95%) 100%);
    color: ${g.primaryForeground};
    border: none;
    border-radius: ${v(10)};
    cursor: pointer;
    font-weight: 600;
    font-size: 15px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 
      0 4px 12px hsla(0, 0%, 0%, 0.15),
      inset 0 1px 0 hsla(255, 255, 255, 0.2);
    position: relative;
    overflow: hidden;
  `, o.onmouseenter = () => {
            o.style.transform = "translateY(-1px)", o.style.boxShadow = `
      0 6px 20px hsla(0, 0%, 0%, 0.2),
      inset 0 1px 0 hsla(255, 255, 255, 0.2)
    `
        }, o.onmouseleave = () => {
            o.style.transform = "translateY(0)", o.style.boxShadow = `
      0 4px 12px hsla(0, 0%, 0%, 0.15),
      inset 0 1px 0 hsla(255, 255, 255, 0.2)
    `
        }, o.onclick = () => {
            e.style.animation = "groas-modal-in 0.2s cubic-bezier(0.4, 0, 1, 1) reverse", t.style.animation = "groas-overlay-in 0.2s ease-out reverse", setTimeout(() => {
                document.body.removeChild(t)
            }, 200)
        }, i.appendChild(r), i.appendChild(s), n.appendChild(i), n.appendChild(u), n.appendChild(a), n.appendChild(o), e.appendChild(n), t.appendChild(e), document.body.appendChild(t), t.onclick = c => {
            c.target === t && (e.style.animation = "groas-modal-in 0.2s cubic-bezier(0.4, 0, 1, 1) reverse", t.style.animation = "groas-overlay-in 0.2s ease-out reverse", setTimeout(() => {
                document.body.removeChild(t)
            }, 200))
        };
        let p = c => {
            c.key === "Escape" && (e.style.animation = "groas-modal-in 0.2s cubic-bezier(0.4, 0, 1, 1) reverse", t.style.animation = "groas-overlay-in 0.2s ease-out reverse", setTimeout(() => {
                document.body.removeChild(t), document.removeEventListener("keydown", p)
            }, 200))
        };
        document.addEventListener("keydown", p)
    }

    function _() {
        return new URLSearchParams(window.location.search).has("groasScriptValidation")
    }

    function S() {
        _() && C()
    }
    var l = null,
        d = {},
        x = new Set;

    function A() {
        let t = new URLSearchParams(window.location.search);
        return {
            id: t.get("landingpage") || t.get("groas"),
            isPreview: t.get("groasPreview") === "true"
        }
    }

    function k() {
        return new URLSearchParams(window.location.search).get("dynamicContentSelector")
    }
    async function M(t) {
        try {
            console.debug("[groas] Loading simple content selector with token:", t);
            let e = document.createElement("script");
            e.src = b("/snippet/simpleSelector.js"), e.async = !0, e.onload = () => {
                console.debug("[groas] Simple content selector loaded"), typeof window.initGroasSimpleSelector == "function" && window.initGroasSimpleSelector(t)
            }, e.onerror = n => {
                console.error("[groas] Failed to load simple content selector:", n)
            }, document.head.appendChild(e)
        } catch (e) {
            console.error("[groas] Error loading simple content selector:", e)
        }
    }
    async function I(t) {
        try {
            console.debug("[groas] Loading dynamic content selector with token:", t);
            let e = document.createElement("script");
            e.src = b("/snippet/dynamicSelector.js"), e.async = !0, e.onload = () => {
                console.debug("[groas] Dynamic content selector loaded"), typeof window.initGroasDynamicSelector == "function" && window.initGroasDynamicSelector(t)
            }, e.onerror = n => {
                console.error("[groas] Failed to load dynamic content selector:", n)
            }, document.head.appendChild(e)
        } catch (e) {
            console.error("[groas] Error loading dynamic content selector:", e)
        }
    }

    function G() {
        x.clear(), console.debug("[groas] Reset processed selectors")
    }
    async function N(t, e) {
        try {
            let n = new URL(w(`/api/content/${t}`));
            e && n.searchParams.set("groasPreview", "true");
            let i = await fetch(n.toString(), {
                headers: {
                    Accept: "application/json"
                }
            });
            if (!i.ok) return console.debug("[groas] Failed to fetch content:", i.status), null;
            let r = await i.json();
            return console.debug("[groas] Raw content received:", r), G(), r
        } catch (n) {
            return console.debug("[groas] Error fetching content:", n), null
        }
    }

    function $(t) {
        d = {};
        for (let e of t)
            if (typeof e.cssSelector == "string" && e.cssSelector) try {
                let n = P(e.cssSelector);
                n ? d[e.cssSelector] = n : (console.debug(`[groas] No elements found for selector: ${e.cssSelector}`), d[e.cssSelector] = null)
            } catch (n) {
                console.warn(`[groas] Invalid selector: ${e.cssSelector}`, n), d[e.cssSelector] = null
            } else console.warn("[groas] Skipping mapping without a valid selector:", e)
    }

    function V(t) {
        let e = window.getComputedStyle(t);
        if (e.display === "none" || e.visibility === "hidden" || e.opacity === "0") return !1;
        let n = t.getBoundingClientRect();
        return n.width > 0 && n.height > 0
    }

    function P(t) {
        for (let e of document.querySelectorAll(t))
            if (V(e)) return e;
        return null
    }

    function F(t) {
        let e = document.createElement("textarea");
        return e.innerHTML = t, e.value
    }

    function E(t) {
        let e = t;
        for (; e.children.length === 1;) {
            let n = e.children[0];
            if (!n) break;
            e = n
        }
        return e
    }

    function f(t) {
        let e = 0,
            n = 0,
            i = !0;
        for (let {
                cssSelector: r,
                copy: s,
                isFormattedText: u
            } of t) {
            if (x.has(r)) {
                e++;
                continue
            }
            try {
                let a = P(r);
                if (a) {
                    if (d[r] = a, e++, console.debug(`[groas] Applying to ${r}:`, {
                            content: s,
                            isFormattedText: u,
                            elementType: a.tagName
                        }), a.tagName === "IMG") try {
                        a.setAttribute("src", s), a.hasAttribute("srcset") && a.removeAttribute("srcset")
                    } catch (o) {
                        console.error("[groas] Error applying image content:", o)
                    } else if (u) {
                        let o = E(a);
                        try {
                            if (o.innerHTML = s, o.innerHTML.includes("&lt;") || o.innerHTML.includes("&gt;")) {
                                let p = F(s);
                                if (o.innerHTML = p, o.innerHTML.includes("&lt;") || o.innerHTML.includes("&gt;")) {
                                    o.innerHTML = "";
                                    let c = document.createElement("template");
                                    c.innerHTML = p, o.appendChild(c.content.cloneNode(!0))
                                }
                            }
                        } catch (p) {
                            console.error("[groas] Error applying HTML content:", p), o.textContent = s
                        }
                    } else {
                        let o = E(a);
                        o.textContent = s
                    }
                    x.add(r)
                } else n++, d[r] = null, i = !1
            } catch (a) {
                console.error(`[groas] Error selecting or applying content to ${r}:`, a), d[r] = null, i = !1
            }
        }
        return e > 0 ? console.debug(`[groas] Applied content to ${e}/${t.length} elements (missing: ${n})`) : t.length > 0 && console.debug("[groas] No elements found for content mapping selectors. Will retry later."), i
    }

    function H(t, e) {
        let n;
        return (...r) => {
            if (!n) {
                let s = t(...r);
                return n = !0, setTimeout(() => {
                    n = !1
                }, e), s
            }
        }
    }

    function B() {
        if (!l) return;
        new MutationObserver(H(e => {
            if (!l) return;
            let n = !1;
            for (let i of e)
                if (i.type === "childList" && i.addedNodes.length > 0) {
                    n = !0;
                    break
                }
            if (n)
                if (console.debug("[groas] DOM mutation detected, reapplying content"), f(l)) console.debug("[groas] All elements found and content applied on first attempt");
                else {
                    let r = 0;
                    for (let s of [100, 500, 1e3]) setTimeout(() => {
                        l && (console.debug(`[groas] Retrying content application after ${s}ms delay (retry #${++r})`), f(l) && console.debug("[groas] All content successfully applied"))
                    }, s)
                }
        }, 300)).observe(document.body, {
            childList: !0,
            subtree: !0
        }), console.debug("[groas] Mutation observer set up to detect new elements")
    }
    async function O() {
        let {
            id: t,
            isPreview: e
        } = A();
        if (!t || (l = await N(t, e), console.log("contentMappings", l), !l)) return;
        $(l), console.log("selectorCache", d), console.log("Applying initial content");
        let n = f(l);
        console.log("Applied initial content. Setting up observer."), B(), n || setTimeout(() => {
            l && (console.debug("[groas] Retrying content application after initial delay"), f(l))
        }, 1e3)
    }
    async function T() {
        S();
        let t = k();
        if (t === "true") {
            await M(t);
            return
        }
        if (t) {
            I(t);
            return
        }
        await O()
    }
    console.log(`GROAS script loaded: v${m.packageVersion}`);
    document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", T) : T();
})();