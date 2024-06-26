/**
 Input Mask plugin for jquery
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) 2010 - 2013 Robin Herbots
 Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 Version: 2.4.6
 */
(function(b) {
    void 0 === b.fn.inputmask && (b.inputmask = {
        defaults: {
            placeholder: "_",
            optionalmarker: { start: "[", end: "]" },
            quantifiermarker: { start: "{", end: "}" },
            groupmarker: { start: "(", end: ")" },
            escapeChar: "\\",
            mask: null,
            oncomplete: b.noop,
            onincomplete: b.noop,
            oncleared: b.noop,
            repeat: 0,
            greedy: !0,
            autoUnmask: !1,
            clearMaskOnLostFocus: !0,
            insertMode: !0,
            clearIncomplete: !1,
            aliases: {},
            onKeyUp: b.noop,
            onKeyDown: b.noop,
            showMaskOnFocus: !0,
            showMaskOnHover: !0,
            onKeyValidation: b.noop,
            skipOptionalPartCharacter: " ",
            showTooltip: !1,
            numericInput: !1,
            isNumeric: !1,
            radixPoint: "",
            skipRadixDance: !1,
            rightAlignNumerics: !0,
            definitions: { 9: { validator: "[0-9]", cardinality: 1 }, a: { validator: "[A-Za-z\u0410-\u044f\u0401\u0451]", cardinality: 1 }, "*": { validator: "[A-Za-z\u0410-\u044f\u0401\u04510-9]", cardinality: 1 } },
            keyCode: { ALT: 18, BACKSPACE: 8, CAPS_LOCK: 20, COMMA: 188, COMMAND: 91, COMMAND_LEFT: 91, COMMAND_RIGHT: 93, CONTROL: 17, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT: 45, LEFT: 37, MENU: 93, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108, NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SHIFT: 16, SPACE: 32, TAB: 9, UP: 38, WINDOWS: 91 },
            ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],
            getMaskLength: function(b, I, F, z, y) {
                y = b.length;
                I || ("*" == F ? y = z.length + 1 : 1 < F && (y += b.length * (F - 1)));
                return y
            }
        },
        escapeRegex: function(b) { return b.replace(RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)", "gim"), "\\$1") }
    }, b.fn.inputmask = function(A, I) {
        function F(a) {
            var b = document.createElement("input");
            a = "on" + a;
            var c = a in b;
            c || (b.setAttribute(a, "return;"), c = "function" == typeof b[a]);
            return c
        }

        function z(e, d) { var c = a.aliases[e]; return c ? (c.alias && z(c.alias), b.extend(!0, a, c), b.extend(!0, a, d), !0) : !1 }

        function y(e) {
            a.numericInput && (e = e.split("").reverse().join(""));
            var d = !1,
                c = 0,
                q = a.greedy,
                m = a.repeat;
            "*" == m && (q = !1);
            1 == e.length && !1 == q && 0 != m && (a.placeholder = "");
            e = b.map(e.split(""), function(b, l) {
                var e = [];
                if (b == a.escapeChar) d = !0;
                else if (b != a.optionalmarker.start && b != a.optionalmarker.end || d) {
                    var g = a.definitions[b];
                    if (g && !d)
                        for (var h = 0; h < g.cardinality; h++) e.push(Q(c + h));
                    else e.push(b), d = !1;
                    c += e.length;
                    return e
                }
            });
            for (var l = e.slice(), h = 1; h < m && q; h++) l = l.concat(e.slice());
            return { mask: l, repeat: m, greedy: q }
        }

        function O(e) {
            a.numericInput && (e = e.split("").reverse().join(""));
            var d = !1,
                c = !1,
                q = !1;
            return b.map(e.split(""), function(b, l) {
                var e = [];
                if (b == a.escapeChar) c = !0;
                else {
                    if (b != a.optionalmarker.start || c) {
                        if (b != a.optionalmarker.end || c) {
                            var G = a.definitions[b];
                            if (G && !c) {
                                for (var r = G.prevalidator, f = r ? r.length : 0, g = 1; g < G.cardinality; g++) {
                                    var t = f >= g ? r[g - 1] : [],
                                        n = t.validator,
                                        t = t.cardinality;
                                    e.push({ fn: n ? "string" == typeof n ? RegExp(n) : new function() { this.test = n } : /./, cardinality: t ? t : 1, optionality: d, newBlockMarker: !0 == d ? q : !1, offset: 0, casing: G.casing, def: G.definitionSymbol || b });
                                    !0 == d && (q = !1)
                                }
                                e.push({ fn: G.validator ? "string" == typeof G.validator ? RegExp(G.validator) : new function() { this.test = G.validator } : /./, cardinality: G.cardinality, optionality: d, newBlockMarker: q, offset: 0, casing: G.casing, def: G.definitionSymbol || b })
                            } else e.push({ fn: null, cardinality: 0, optionality: d, newBlockMarker: q, offset: 0, casing: null, def: b }), c = !1;
                            q = !1;
                            return e
                        }
                        d = !1
                    } else d = !0;
                    q = !0
                }
            })
        }

        function S() {
            function e(b) {
                var c = b.length;
                for (i = 0; i < c && b.charAt(i) != a.optionalmarker.start; i++);
                var e = [b.substring(0, i)];
                i < c && e.push(b.substring(i + 1, c));
                return e
            }

            function d(l, h, m) {
                var r = 0,
                    f = 0,
                    g = h.length;
                for (i = 0; i < g && !(h.charAt(i) == a.optionalmarker.start && r++, h.charAt(i) == a.optionalmarker.end && f++, 0 < r && r == f); i++);
                r = [h.substring(0, i)];
                i < g && r.push(h.substring(i + 1, g));
                f = e(r[0]);
                1 < f.length ? (h = l + f[0] + (a.optionalmarker.start + f[1] + a.optionalmarker.end) + (1 < r.length ? r[1] : ""), -1 == b.inArray(h, q) && "" != h && (q.push(h), g = y(h), c.push({ mask: h, _buffer: g.mask, buffer: g.mask.slice(), tests: O(h), lastValidPosition: -1, greedy: g.greedy, repeat: g.repeat, metadata: m })), h = l + f[0] + (1 < r.length ? r[1] : ""), -1 == b.inArray(h, q) && "" != h && (q.push(h), g = y(h), c.push({ mask: h, _buffer: g.mask, buffer: g.mask.slice(), tests: O(h), lastValidPosition: -1, greedy: g.greedy, repeat: g.repeat, metadata: m })), 1 < e(f[1]).length && d(l + f[0], f[1] + r[1], m), 1 < r.length && 1 < e(r[1]).length && (d(l + f[0] + (a.optionalmarker.start + f[1] + a.optionalmarker.end), r[1], m), d(l + f[0], r[1], m))) : (h = l + r, -1 == b.inArray(h, q) && "" != h && (q.push(h), g = y(h), c.push({ mask: h, _buffer: g.mask, buffer: g.mask.slice(), tests: O(h), lastValidPosition: -1, greedy: g.greedy, repeat: g.repeat, metadata: m })))
            }
            var c = [],
                q = [],
                m = [];
            b.isFunction(a.mask) && (a.mask = a.mask.call(this, a));
            b.isArray(a.mask) ? b.each(a.mask, function(a, b) { void 0 != b.mask ? d("", b.mask.toString(), b) : d("", b.toString()) }) : d("", a.mask.toString());
            (function(b) {
                function c() {
                    this.matches = [];
                    this.isQuantifier = this.isOptional = this.isGroup = !1
                }
                var e = /(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[]()|\\]+|./g,
                    d = new c,
                    f, g = [];
                for (m = []; f = e.exec(b);) switch (f = f[0], f.charAt(0)) {
                    case a.optionalmarker.end:
                    case a.groupmarker.end:
                        f = g.pop();
                        0 < g.length ? g[g.length - 1].matches.push(f) : (m.push(f), d = f);
                        break;
                    case a.optionalmarker.start:
                        !d.isGroup && 0 < d.matches.length && m.push(d);
                        d = new c;
                        d.isOptional = !0;
                        g.push(d);
                        break;
                    case a.groupmarker.start:
                        !d.isGroup && 0 < d.matches.length && m.push(d);
                        d = new c;
                        d.isGroup = !0;
                        g.push(d);
                        break;
                    case a.quantifiermarker.start:
                        var t = new c;
                        t.isQuantifier = !0;
                        t.matches.push(f);
                        0 < g.length ? g[g.length - 1].matches.push(t) : d.matches.push(t);
                        break;
                    default:
                        if (0 < g.length) g[g.length - 1].matches.push(f);
                        else {
                            if (d.isGroup || d.isOptional) d = new c;
                            d.matches.push(f)
                        }
                }
                0 < d.matches.length && m.push(d);
                return m
            })(a.mask);
            return a.greedy ? c : c.sort(function(a, b) { return a.mask.length - b.mask.length })
        }

        function Q(b) { return a.placeholder.charAt(b % a.placeholder.length) }

        function E(e, d) {
            function c() { return e[d] }

            function q() { return c().tests }

            function m() { return c()._buffer }

            function l() { return c().buffer }

            function h(s, p, J) {
                function K(b, c, s, p) {
                    for (var d = f(b), ba = s ? 1 : 0, T = "", k = c.buffer, X = c.tests[d].cardinality; X > ba; X--) T += L(k, d - (X - 1));
                    s && (T += s);
                    return null != c.tests[d].fn ? c.tests[d].fn.test(T, k, b, p, a) : s == L(c._buffer, b, !0) || s == a.skipOptionalPartCharacter ? { refresh: !0, c: L(c._buffer, b, !0), pos: b } : !1
                }
                if (J = !0 === J) { var m = K(s, c(), p, J);!0 === m && (m = { pos: s }); return m }
                var h = [],
                    m = !1,
                    q = d,
                    n = l().slice(),
                    v = c().lastValidPosition;
                u(s);
                var w = [];
                b.each(e, function(a, b) {
                    if ("object" == typeof b) {
                        d = a;
                        var e = s,
                            f = c().lastValidPosition,
                            u;
                        if (f == v) {
                            if (1 < e - v)
                                for (f = -1 == f ? 0 : f; f < e && (u = K(f, c(), n[f], !0), !1 !== u); f++) M(l(), f, n[f], !0), !0 === u && (u = { pos: f }), u = u.pos || f, c().lastValidPosition < u && (c().lastValidPosition = u);
                            if (!r(e) && !K(e, c(), p, J)) {
                                f = t(e) - e;
                                for (u = 0; u < f && !1 === K(++e, c(), p, J); u++);
                                w.push(d)
                            }
                        }(c().lastValidPosition >= v || d == q) && 0 <= e && e < g() && (m = K(e, c(), p, J), !1 !== m && (!0 === m && (m = { pos: e }), u = m.pos || e, c().lastValidPosition < u && (c().lastValidPosition = u)), h.push({ activeMasksetIndex: a, result: m }))
                    }
                });
                d = q;
                return function(a, c) {
                    var d = !1;
                    b.each(c, function(ba, c) { if (d = -1 == b.inArray(c.activeMasksetIndex, a) && !1 !== c.result) return !1 });
                    if (d) c = b.map(c, function(c, s) {
                        if (-1 == b.inArray(c.activeMasksetIndex, a)) return c;
                        e[c.activeMasksetIndex].lastValidPosition = v
                    });
                    else {
                        var g = -1,
                            J = -1;
                        b.each(c, function(c, s) {-1 != b.inArray(s.activeMasksetIndex, a) && !1 !== s.result & (-1 == g || g > s.result.pos) && (g = s.result.pos, J = s.activeMasksetIndex) });
                        c = b.map(c, function(c, T) {
                            if (-1 != b.inArray(c.activeMasksetIndex, a)) {
                                if (c.result.pos == g) return c;
                                if (!1 !== c.result) {
                                    for (var k = s; k < g; k++)
                                        if (rsltValid = K(k, e[c.activeMasksetIndex], e[J].buffer[k], !0), !1 === rsltValid) { e[c.activeMasksetIndex].lastValidPosition = g - 1; break } else M(e[c.activeMasksetIndex].buffer, k, e[J].buffer[k], !0), e[c.activeMasksetIndex].lastValidPosition = k;
                                    rsltValid = K(g, e[c.activeMasksetIndex], p, !0);
                                    !1 !== rsltValid && (M(e[c.activeMasksetIndex].buffer, g, p, !0), e[c.activeMasksetIndex].lastValidPosition = g);
                                    return c
                                }
                            }
                        })
                    }
                    return c
                }(w, h)
            }

            function n() {
                var a = d,
                    p = { activeMasksetIndex: 0, lastValidPosition: -1, next: -1 };
                b.each(e, function(a, b) { "object" == typeof b && (d = a, c().lastValidPosition > p.lastValidPosition ? (p.activeMasksetIndex = a, p.lastValidPosition = c().lastValidPosition, p.next = t(c().lastValidPosition)) : c().lastValidPosition == p.lastValidPosition && (-1 == p.next || p.next > t(c().lastValidPosition)) && (p.activeMasksetIndex = a, p.lastValidPosition = c().lastValidPosition, p.next = t(c().lastValidPosition))) });
                d = -1 != p.lastValidPosition && e[a].lastValidPosition == p.lastValidPosition ? a : p.activeMasksetIndex;
                a != d && (A(l(), t(p.lastValidPosition), g()), c().writeOutBuffer = !0);
                v.data("_inputmask").activeMasksetIndex = d
            }

            function r(a) {
                a = f(a);
                a = q()[a];
                return void 0 != a ? a.fn : !1
            }

            function f(a) { return a % q().length }

            function g() { return a.getMaskLength(m(), c().greedy, c().repeat, l(), a) }

            function t(a) { var b = g(); if (a >= b) return b; for (; ++a < b && !r(a);); return a }

            function u(a) { if (0 >= a) return 0; for (; 0 < --a && !r(a);); return a }

            function M(a, b, c, d) {
                d && (b = y(a, b));
                d = q()[f(b)];
                var e = c;
                if (void 0 != e && void 0 != d) switch (d.casing) {
                    case "upper":
                        e = c.toUpperCase();
                        break;
                    case "lower":
                        e = c.toLowerCase()
                }
                a[b] = e
            }

            function L(a, b, c) { c && (b = y(a, b)); return a[b] }

            function y(a, b) {
                for (var c; void 0 == a[b] && a.length < g();)
                    for (c = 0; void 0 !== m()[c];) a.push(m()[c++]);
                return b
            }

            function N(a, b, c) {
                a._valueSet(b.join(""));
                void 0 != c && w(a, c)
            }

            function A(a, b, c, d) { for (var e = g(); b < c && b < e; b++) !0 === d ? r(b) || M(a, b, "") : M(a, b, L(m().slice(), b, !0)) }

            function B(a, b) {
                var c = f(b);
                M(a, b, L(m(), c))
            }

            function z(a, l, f, h, r) {
                h = void 0 != h ? h.slice() : F(a._valueGet()).split("");
                b.each(e, function(a, b) { "object" == typeof b && (b.buffer = b._buffer.slice(), b.lastValidPosition = -1, b.p = -1) });
                !0 !== f && (d = 0);
                l && a._valueSet("");
                g();
                b.each(h, function(d, e) {
                    if (!0 === r) {
                        var g = c().p,
                            g = -1 == g ? g : u(g),
                            h = -1 == g ? d : t(g); - 1 == b.inArray(e, m().slice(g + 1, h)) && b(a).trigger("_keypress", [!0, e.charCodeAt(0), l, f, d])
                    } else b(a).trigger("_keypress", [!0, e.charCodeAt(0), l, f, d])
                });
                !0 === f && -1 != c().p && (c().lastValidPosition = u(c().p))
            }

            function I(a) { return b.inputmask.escapeRegex.call(this, a) }

            function F(a) { return a.replace(RegExp("(" + I(m().join("")) + ")*$"), "") }

            function E(a) {
                var b = l(),
                    c = b.slice(),
                    d, e;
                for (e = c.length - 1; 0 <= e; e--)
                    if (d = f(e), q()[d].optionality)
                        if (r(e) && h(e, b[e], !0)) break;
                        else c.pop();
                else break;
                N(a, c)
            }

            function O(a, c) { if (!q() || !0 !== c && a.hasClass("hasDatepicker")) return a[0]._valueGet(); var e = b.map(l(), function(a, b) { return r(b) && h(b, a, !0) ? a : null }); return (C ? e.reverse() : e).join("") }

            function U(b) {!C || "number" != typeof b || a.greedy && "" == a.placeholder || (b = l().length - b); return b }

            function w(c, e, d) {
                var g = c.jquery && 0 < c.length ? c[0] : c;
                if ("number" == typeof e) e = U(e), d = U(d), b(c).is(":visible") && (d = "number" == typeof d ? d : e, g.scrollLeft = g.scrollWidth, !1 == a.insertMode && e == d && d++, g.setSelectionRange ? (g.selectionStart = e, g.selectionEnd = Y ? e : d) : g.createTextRange && (c = g.createTextRange(), c.collapse(!0), c.moveEnd("character", d), c.moveStart("character", e), c.select()));
                else {
                    if (!b(c).is(":visible")) return { begin: 0, end: 0 };
                    g.setSelectionRange ? (e = g.selectionStart, d = g.selectionEnd) : document.selection && document.selection.createRange && (c = document.selection.createRange(), e = 0 - c.duplicate().moveStart("character", -1E5), d = e + c.text.length);
                    e = U(e);
                    d = U(d);
                    return { begin: e, end: d }
                }
            }

            function V(c) {
                if ("*" != a.repeat) {
                    var l = !1,
                        h = 0,
                        t = d;
                    b.each(e, function(a, b) {
                        if ("object" == typeof b) {
                            d = a;
                            var e = u(g());
                            if (b.lastValidPosition >= h && b.lastValidPosition == e) {
                                for (var t = !0, q = 0; q <= e; q++) {
                                    var n = r(q),
                                        v = f(q);
                                    if (n && (void 0 == c[q] || c[q] == Q(q)) || !n && c[q] != m()[v]) { t = !1; break }
                                }
                                if (l = l || t) return !1
                            }
                            h = b.lastValidPosition
                        }
                    });
                    d = t;
                    return l
                }
            }
            var C = !1,
                P = l().join(""),
                v, S;
            this.unmaskedvalue = function(a, b) { C = a.data("_inputmask").isRTL; return O(a, b) };
            this.isComplete = function(a) { return V(a) };
            this.mask = function(s) {
                function p(a) {
                    a = b._data(a).events;
                    b.each(a, function(a, c) {
                        b.each(c, function(a, b) {
                            if ("inputmask" == b.namespace && "setvalue" != b.type && "_keypress" != b.type) {
                                var c = b.handler;
                                b.handler = function(a) {
                                    if (this.readOnly || this.disabled) a.preventDefault;
                                    else return c.apply(this, arguments)
                                }
                            }
                        })
                    })
                }

                function y(a) {
                    var c;
                    Object.getOwnPropertyDescriptor && (c = Object.getOwnPropertyDescriptor(a, "value"));
                    if (c && c.get) {
                        if (!a._valueGet) {
                            var e = c.get,
                                d = c.set;
                            a._valueGet = function() { return C ? e.call(this).split("").reverse().join("") : e.call(this) };
                            a._valueSet = function(a) { d.call(this, C ? a.split("").reverse().join("") : a) };
                            Object.defineProperty(a, "value", {
                                get: function() {
                                    var a = b(this),
                                        c = b(this).data("_inputmask"),
                                        d = c.masksets,
                                        g = c.activeMasksetIndex;
                                    return c && c.opts.autoUnmask ? a.inputmask("unmaskedvalue") : e.call(this) != d[g]._buffer.join("") ? e.call(this) : ""
                                },
                                set: function(a) {
                                    d.call(this, a);
                                    b(this).triggerHandler("setvalue.inputmask")
                                }
                            })
                        }
                    } else if (document.__lookupGetter__ && a.__lookupGetter__("value")) a._valueGet || (e = a.__lookupGetter__("value"), d = a.__lookupSetter__("value"), a._valueGet = function() { return C ? e.call(this).split("").reverse().join("") : e.call(this) }, a._valueSet = function(a) { d.call(this, C ? a.split("").reverse().join("") : a) }, a.__defineGetter__("value", function() {
                        var a = b(this),
                            c = b(this).data("_inputmask"),
                            d = c.masksets,
                            g = c.activeMasksetIndex;
                        return c && c.opts.autoUnmask ? a.inputmask("unmaskedvalue") : e.call(this) != d[g]._buffer.join("") ? e.call(this) : ""
                    }), a.__defineSetter__("value", function(a) {
                        d.call(this, a);
                        b(this).triggerHandler("setvalue.inputmask")
                    }));
                    else if (a._valueGet || (a._valueGet = function() { return C ? this.value.split("").reverse().join("") : this.value }, a._valueSet = function(a) { this.value = C ? a.split("").reverse().join("") : a }), void 0 == b.valHooks.text || !0 != b.valHooks.text.inputmaskpatch) e = b.valHooks.text && b.valHooks.text.get ? b.valHooks.text.get : function(a) { return a.value }, d = b.valHooks.text && b.valHooks.text.set ? b.valHooks.text.set : function(a, b) { a.value = b; return a }, jQuery.extend(b.valHooks, {
                        text: {
                            get: function(a) {
                                var c = b(a);
                                if (c.data("_inputmask")) {
                                    if (c.data("_inputmask").opts.autoUnmask) return c.inputmask("unmaskedvalue");
                                    a = e(a);
                                    c = c.data("_inputmask");
                                    return a != c.masksets[c.activeMasksetIndex]._buffer.join("") ? a : ""
                                }
                                return e(a)
                            },
                            set: function(a, c) {
                                var e = b(a),
                                    k = d(a, c);
                                e.data("_inputmask") && e.triggerHandler("setvalue.inputmask");
                                return k
                            },
                            inputmaskpatch: !0
                        }
                    })
                }

                function K(a, b, e, d) {
                    var x = l();
                    if (!1 !== d)
                        for (; !r(a) && 0 <= a - 1;) a--;
                    for (d = a; d < b && d < g(); d++)
                        if (r(d)) {
                            B(x, d);
                            var n = t(d),
                                s = L(x, n);
                            if (s != Q(n))
                                if (n < g() && !1 !== h(d, s, !0) && q()[f(d)].def == q()[f(n)].def) M(x, d, L(x, n), !0), n < b && B(x, n);
                                else if (r(d)) break
                        } else B(x, d);
                    void 0 != e && M(x, u(b), e);
                    if (!1 == c().greedy) {
                        b = F(x.join("")).split("");
                        x.length = b.length;
                        d = 0;
                        for (e = x.length; d < e; d++) x[d] = b[d];
                        0 == x.length && (c().buffer = m().slice())
                    }
                    return a
                }

                function I(a, b, d, e) {
                    for (var x = l(); a <= b && a < g(); a++)
                        if (r(a)) {
                            var n = L(x, a, !0);
                            M(x, a, d, !0);
                            if (n != Q(a))
                                if (d = t(a), d < g())
                                    if (!1 !== h(d, n, !0) && q()[f(a)].def == q()[f(d)].def) d = n;
                                    else if (r(d)) break;
                            else d = n;
                            else break;
                            else if (d = n, !0 !== e) break
                        } else B(x, a);
                    e = x.length;
                    if (!1 == c().greedy) {
                        d = F(x.join("")).split("");
                        x.length = d.length;
                        a = 0;
                        for (n = x.length; a < n; a++) x[a] = d[a];
                        0 == x.length && (c().buffer = m().slice())
                    }
                    return b - (e - x.length)
                }

                function O(b, d, k) {
                    if (a.numericInput || C) {
                        switch (d) {
                            case a.keyCode.BACKSPACE:
                                d = a.keyCode.DELETE;
                                break;
                            case a.keyCode.DELETE:
                                d = a.keyCode.BACKSPACE
                        }
                        if (C) {
                            var f = k.end;
                            k.end = k.begin;
                            k.begin = f
                        }
                    }
                    f = !0;
                    k.begin == k.end ? (f = d == a.keyCode.BACKSPACE ? k.begin - 1 : k.begin, a.isNumeric && "" != a.radixPoint && l()[f] == a.radixPoint && (k.begin = l().length - 1 == f ? k.begin : d == a.keyCode.BACKSPACE ? f : t(f), k.end = k.begin), f = !1, d == a.keyCode.BACKSPACE ? k.begin-- : d == a.keyCode.DELETE && k.end++) : 1 != k.end - k.begin || a.insertMode || (f = !1, d == a.keyCode.BACKSPACE && k.begin--);
                    A(l(), k.begin, k.end);
                    var h = g();
                    if (!1 == a.greedy) K(k.begin, h, void 0, !C && d == a.keyCode.BACKSPACE && !f);
                    else {
                        for (var m = k.begin, n = k.begin; n < k.end; n++)
                            if (r(n) || !f) m = K(k.begin, h, void 0, !C && d == a.keyCode.BACKSPACE && !f);
                        f || (k.begin = m)
                    }
                    d = t(-1);
                    A(l(), k.begin, k.end, !0);
                    z(b, !1, void 0 == e[1] || d >= k.end, l());
                    c().lastValidPosition < d ? (c().lastValidPosition = -1, c().p = d) : c().p = k.begin
                }

                function ca(d) {
                    W = !1;
                    var e = this,
                        k = b(e),
                        f = d.keyCode,
                        h = w(e);
                    f == a.keyCode.BACKSPACE || f == a.keyCode.DELETE || fa && 127 == f || d.ctrlKey && 88 == f ? (d.preventDefault(), 88 == f && (P = l().join("")), O(e, f, h), n(), N(e, l(), c().p), e._valueGet() == m().join("") && k.trigger("cleared"), a.showTooltip && k.prop("title", c().mask)) : f == a.keyCode.END || f == a.keyCode.PAGE_DOWN ? setTimeout(function() {
                        var b = t(c().lastValidPosition);
                        a.insertMode || b != g() || d.shiftKey || b--;
                        w(e, d.shiftKey ? h.begin : b, b)
                    }, 0) : f == a.keyCode.HOME && !d.shiftKey || f == a.keyCode.PAGE_UP ? w(e, 0, d.shiftKey ? h.begin : 0) : f == a.keyCode.ESCAPE || 90 == f && d.ctrlKey ? (z(e, !0, !1, P.split("")), k.click()) : f != a.keyCode.INSERT || d.shiftKey || d.ctrlKey ? !1 != a.insertMode || d.shiftKey || (f == a.keyCode.RIGHT ? setTimeout(function() {
                        var a = w(e);
                        w(e, a.begin)
                    }, 0) : f == a.keyCode.LEFT && setTimeout(function() {
                        var a = w(e);
                        w(e, a.begin - 1)
                    }, 0)) : (a.insertMode = !a.insertMode, w(e, a.insertMode || h.begin != g() ? h.begin : h.begin - 1));
                    k = w(e);
                    !0 === a.onKeyDown.call(this, d, l(), a) && w(e, k.begin, k.end);
                    Z = -1 != b.inArray(f, a.ignorables)
                }

                function da(f, m, k, q, r, s) {
                    if (void 0 == k && W) return !1;
                    W = !0;
                    var v = b(this);
                    f = f || window.event;
                    k = k || f.which || f.charCode || f.keyCode;
                    if ((!f.ctrlKey || !f.altKey) && (f.ctrlKey || f.metaKey || Z) && !0 !== m) return !0;
                    if (k) {
                        !0 !== m && 46 == k && !1 == f.shiftKey && "," == a.radixPoint && (k = 44);
                        var p, z, y = String.fromCharCode(k);
                        m ? (k = r ? s : c().lastValidPosition + 1, p = { begin: k, end: k }) : p = w(this);
                        s = C ? 1 < p.begin - p.end || 1 == p.begin - p.end && a.insertMode : 1 < p.end - p.begin || 1 == p.end - p.begin && a.insertMode;
                        var B = d;
                        s && (d = B, b.each(e, function(a, b) { "object" == typeof b && (d = a, c().undoBuffer = l().join("")) }), O(this, a.keyCode.DELETE, p), a.insertMode || b.each(e, function(a, b) { "object" == typeof b && (d = a, I(p.begin, g(), Q(p.begin), !0), c().lastValidPosition = t(c().lastValidPosition)) }), d = B);
                        var A = l().join("").indexOf(a.radixPoint);
                        a.isNumeric && !0 !== m && -1 != A && (a.greedy && p.begin <= A ? (p.begin = u(p.begin), p.end = p.begin) : y == a.radixPoint && (p.begin = A, p.end = p.begin));
                        var D = p.begin;
                        k = h(D, y, r);
                        !0 === r && (k = [{ activeMasksetIndex: d, result: k }]);
                        var H = -1;
                        b.each(k, function(b, e) {
                            d = e.activeMasksetIndex;
                            c().writeOutBuffer = !0;
                            var f = e.result;
                            if (!1 !== f) {
                                var k = !1,
                                    h = l();
                                !0 !== f && (k = f.refresh, D = void 0 != f.pos ? f.pos : D, y = void 0 != f.c ? f.c : y);
                                if (!0 !== k) {
                                    if (!0 == a.insertMode) {
                                        f = g();
                                        for (k = h.slice(); L(k, f, !0) != Q(f) && f >= D;) f = 0 == f ? -1 : u(f);
                                        f >= D ? (I(D, h.length, y), h = c().lastValidPosition, f = t(h), f != g() && h >= D && L(l(), f, !0) != Q(f) && (c().lastValidPosition = f)) : c().writeOutBuffer = !1
                                    } else M(h, D, y, !0);
                                    if (-1 == H || H > t(D)) H = t(D)
                                } else !r && (h = D < g() ? D + 1 : D, -1 == H || H > h) && (H = h);
                                H > c().p && (c().p = H)
                            }
                        });
                        !0 !== r && (d = B, n());
                        if (!1 !== q && (b.each(k, function(a, b) { if (b.activeMasksetIndex == d) return z = b, !1 }), void 0 != z)) {
                            var F = this;
                            setTimeout(function() { a.onKeyValidation.call(F, z.result, a) }, 0);
                            if (c().writeOutBuffer && !1 !== z.result) {
                                var E = l();
                                q = m ? void 0 : a.numericInput ? D > A ? u(H) : y == a.radixPoint ? H - 1 : u(H - 1) : H;
                                N(this, E, q);
                                !0 !== m && setTimeout(function() {!0 === V(E) && v.trigger("complete") }, 0)
                            } else s && (c().buffer = c().undoBuffer.split(""))
                        }
                        a.showTooltip && v.prop("title", c().mask);
                        f.preventDefault()
                    }
                }

                function Y(c) {
                    var d = b(this),
                        e = c.keyCode,
                        f = l();
                    ea && e == a.keyCode.BACKSPACE && S == this._valueGet() && ca.call(this, c);
                    a.onKeyUp.call(this, c, f, a);
                    e == a.keyCode.TAB && a.showMaskOnFocus && (d.hasClass("focus.inputmask") && 0 == this._valueGet().length ? (f = m().slice(), N(this, f), w(this, 0), P = l().join("")) : (N(this, f), w(this, 0, g())))
                }
                v = b(s);
                if (v.is(":input")) {
                    v.data("_inputmask", { masksets: e, activeMasksetIndex: d, opts: a, isRTL: !1 });
                    a.showTooltip && v.prop("title", c().mask);
                    c().greedy = c().greedy ? c().greedy : 0 == c().repeat;
                    if (null != v.attr("maxLength")) {
                        var R = v.prop("maxLength"); - 1 < R && b.each(e, function(a, b) { "object" == typeof b && "*" == b.repeat && (b.repeat = R) });
                        g() > R && -1 < R && (R < m().length && (m().length = R), !1 == c().greedy && (c().repeat = Math.round(R / m().length)), v.prop("maxLength", 2 * g()))
                    }
                    y(s);
                    var W = !1,
                        Z = !1;
                    a.numericInput && (a.isNumeric = a.numericInput);
                    ("rtl" == s.dir || a.numericInput && a.rightAlignNumerics || a.isNumeric && a.rightAlignNumerics) && v.css("text-align", "right");
                    if ("rtl" == s.dir || a.numericInput) {
                        s.dir = "ltr";
                        v.removeAttr("dir");
                        var $ = v.data("_inputmask");
                        $.isRTL = !0;
                        v.data("_inputmask", $);
                        C = !0
                    }
                    v.unbind(".inputmask");
                    v.removeClass("focus.inputmask");
                    v.closest("form").bind("submit", function() { P != l().join("") && v.change() }).bind("reset", function() { setTimeout(function() { v.trigger("setvalue") }, 0) });
                    v.bind("mouseenter.inputmask", function() {!b(this).hasClass("focus.inputmask") && a.showMaskOnHover && this._valueGet() != l().join("") && N(this, l()) }).bind("blur.inputmask", function() {
                        var c = b(this),
                            f = this._valueGet(),
                            g = l();
                        c.removeClass("focus.inputmask");
                        P != l().join("") && c.change();
                        a.clearMaskOnLostFocus && "" != f && (f == m().join("") ? this._valueSet("") : E(this));
                        !1 === V(g) && (c.trigger("incomplete"), a.clearIncomplete && (b.each(e, function(a, b) { "object" == typeof b && (b.buffer = b._buffer.slice(), b.lastValidPosition = -1) }), d = 0, a.clearMaskOnLostFocus ? this._valueSet("") : (g = m().slice(), N(this, g))))
                    }).bind("focus.inputmask", function() {
                        var d = b(this),
                            e = this._valueGet();
                        a.showMaskOnFocus && !d.hasClass("focus.inputmask") && (!a.showMaskOnHover || a.showMaskOnHover && "" == e) && this._valueGet() != l().join("") && N(this, l(), t(c().lastValidPosition));
                        d.addClass("focus.inputmask");
                        P = l().join("")
                    }).bind("mouseleave.inputmask", function() {
                        var c = b(this);
                        a.clearMaskOnLostFocus && (c.hasClass("focus.inputmask") || this._valueGet() == c.attr("placeholder") || (this._valueGet() == m().join("") || "" == this._valueGet() ? this._valueSet("") : E(this)))
                    }).bind("click.inputmask", function() {
                        var d = this;
                        setTimeout(function() {
                            var e = w(d),
                                f = l();
                            if (e.begin == e.end) {
                                var e = a.isRTL ? U(e.begin) : e.begin,
                                    g = c().lastValidPosition,
                                    f = a.isNumeric ? !1 === a.skipRadixDance && "" != a.radixPoint && -1 != b.inArray(a.radixPoint, f) ? a.numericInput ? t(b.inArray(a.radixPoint, f)) : b.inArray(a.radixPoint, f) : t(g) : t(g);
                                e < f ? r(e) ? w(d, e) : w(d, t(e)) : w(d, f)
                            }
                        }, 0)
                    }).bind("dblclick.inputmask", function() {
                        var a = this;
                        setTimeout(function() { w(a, 0, t(c().lastValidPosition)) }, 0)
                    }).bind(ga + ".inputmask dragdrop.inputmask drop.inputmask", function(a) {
                        var c = this,
                            d = b(c);
                        if ("propertychange" == a.type && c._valueGet().length <= g()) return !0;
                        setTimeout(function() {
                            z(c, !0, !1, void 0, !0);
                            !0 === V(l()) && d.trigger("complete");
                            d.click()
                        }, 0)
                    }).bind("setvalue.inputmask", function() {
                        z(this, !0);
                        P = l().join("");
                        this._valueGet() == m().join("") && this._valueSet("")
                    }).bind("_keypress.inputmask", da).bind("complete.inputmask", a.oncomplete).bind("incomplete.inputmask", a.onincomplete).bind("cleared.inputmask", a.oncleared).bind("keyup.inputmask", Y);
                    ea ? v.bind("input.inputmask", function(a) {
                        a = b(this);
                        S = l().join("");
                        z(this, !1, !1);
                        N(this, l());
                        !0 === V(l()) && a.trigger("complete");
                        a.click()
                    }) : v.bind("keydown.inputmask", ca).bind("keypress.inputmask", da);
                    z(s, !0, !1);
                    P = l().join("");
                    var aa;
                    try { aa = document.activeElement } catch (ha) {}
                    aa === s ? (v.addClass("focus.inputmask"), w(s, t(c().lastValidPosition))) : a.clearMaskOnLostFocus ? l().join("") == m().join("") ? s._valueSet("") : E(s) : N(s, l());
                    p(s)
                }
            };
            return this
        }
        var a = b.extend(!0, {}, b.inputmask.defaults, I),
            B = null !== navigator.userAgent.match(/msie 10/i),
            fa = null !== navigator.userAgent.match(/iphone/i),
            Y = null !== navigator.userAgent.match(/android.*safari.*/i),
            ea = null !== navigator.userAgent.match(/android.*chrome.*/i),
            ga = F("paste") && !B ? "paste" : F("input") ? "input" : "propertychange",
            n, u = 0;
        if ("string" === typeof A) switch (A) {
            case "mask":
                return z(a.alias, I), n = S(), 0 == n.length ? this : this.each(function() { E(b.extend(!0, {}, n), 0).mask(this) });
            case "unmaskedvalue":
                return B = b(this), B.data("_inputmask") ? (n = B.data("_inputmask").masksets, u = B.data("_inputmask").activeMasksetIndex, a = B.data("_inputmask").opts, E(n, u).unmaskedvalue(B)) : B.val();
            case "remove":
                return this.each(function() {
                    var e = b(this);
                    if (e.data("_inputmask")) {
                        n = e.data("_inputmask").masksets;
                        u = e.data("_inputmask").activeMasksetIndex;
                        a = e.data("_inputmask").opts;
                        this._valueSet(E(n, u).unmaskedvalue(e, !0));
                        e.removeData("_inputmask");
                        e.unbind(".inputmask");
                        e.removeClass("focus.inputmask");
                        var d;
                        Object.getOwnPropertyDescriptor && (d = Object.getOwnPropertyDescriptor(this, "value"));
                        d && d.get ? this._valueGet && Object.defineProperty(this, "value", { get: this._valueGet, set: this._valueSet }) : document.__lookupGetter__ && this.__lookupGetter__("value") && this._valueGet && (this.__defineGetter__("value", this._valueGet), this.__defineSetter__("value", this._valueSet));
                        try { delete this._valueGet, delete this._valueSet } catch (c) { this._valueSet = this._valueGet = void 0 }
                    }
                });
            case "getemptymask":
                return this.data("_inputmask") ? (n = this.data("_inputmask").masksets, u = this.data("_inputmask").activeMasksetIndex, n[u]._buffer.join("")) : "";
            case "hasMaskedValue":
                return this.data("_inputmask") ? !this.data("_inputmask").opts.autoUnmask : !1;
            case "isComplete":
                return n = this.data("_inputmask").masksets, u = this.data("_inputmask").activeMasksetIndex, a = this.data("_inputmask").opts, E(n, u).isComplete(this[0]._valueGet().split(""));
            case "getmetadata":
                if (this.data("_inputmask")) return n = this.data("_inputmask").masksets, u = this.data("_inputmask").activeMasksetIndex, n[u].metadata;
                return;
            default:
                return z(A, I) || (a.mask = A), n = S(), 0 == n.length ? this : this.each(function() { E(b.extend(!0, {}, n), u).mask(this) })
        } else {
            if ("object" == typeof A) return a = b.extend(!0, {}, b.inputmask.defaults, A), z(a.alias, A), n = S(), 0 == n.length ? this : this.each(function() { E(b.extend(!0, {}, n), u).mask(this) });
            if (void 0 == A) return this.each(function() {
                var e = b(this).attr("data-inputmask");
                if (e && "" != e) try {
                    var e = e.replace(RegExp("'", "g"), '"'),
                        d = b.parseJSON("{" + e + "}");
                    b.extend(!0, d, I);
                    a = b.extend(!0, {}, b.inputmask.defaults, d);
                    z(a.alias, d);
                    a.alias = void 0;
                    b(this).inputmask(a)
                } catch (c) {}
            })
        }
        return this
    })
})(jQuery);