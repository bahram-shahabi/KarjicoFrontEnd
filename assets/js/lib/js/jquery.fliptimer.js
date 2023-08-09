/**************************************************************************
 * Project:        FlipTimer - jQuery Countdown Timer
 * Info:        https://codecanyon.net/item/fliptimer-jquery-countdown-timer/21154062
 * Version:        1.0
 * Author:        AthenaStudio
 * Profile:    https://themeforest.net/user/athenastudio
 **************************************************************************/

(function (a) {
    "use strict";
    a.fn.flipTimer = function (b) {
        function c(b, c) {
            var e, f, g, h, j, k, l, m, o = 0, p = !1, q = null, r = [], s = [], t = [], u = [], v = [], w = [], x = [],
                y = [], z = c.dayTextNumber, A = 2, C = 2, D = 2, E = 0, F = 0, H = 0, I = 60,
                J = parseInt(c.bgColor.slice(1, 3), 16), K = parseInt(c.bgColor.slice(3, 5), 16),
                L = parseInt(c.bgColor.slice(5, 7), 16), M = J, d = K, i = L, n = 0, N = 0, O = 0, P = null, Q = 0;
            this.init = function () {
                var i = this;
                if (e = b, e.addClass("fliptimer"), g = a("<img src=\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\" />"), e.append(g), f = a("<div class=\"flip-container\" />"), e.append(f), c.date = this.convertToTime(c.date), c.resetInterval *= 1e3, j = new Date, h = j.getTime(), c.currentDate && (c.currentDate = this.convertToTime(c.currentDate), o = c.currentDate - h, h = c.currentTime), h += 1e3 * (60 * j.getTimezoneOffset()), k = c.past ? h - c.date : c.date - h, isNaN(z) && "auto" === z) {
                    var j = Math.floor(k / 1e3), l = Math.floor(j / 86400);
                    Q = l.toString().length, z = Q
                }
                z = parseInt(z, 10), this.addItem("day", c.showDay, z, c.dayText), this.addItem("hour", c.showHour, A, c.hourText), this.addItem("minute", c.showMinute, C, c.minuteText), this.addItem("second", c.showSecond, D, c.secondText), this.itemSize(), a(window).resize(function () {
                    i.findSize(), i.flipStyle()
                }), this.findSize(), this.flipStyle(), c.multiColor && (P = setInterval(function () {
                    i.changeColor()
                }, 16)), q = setInterval(function () {
                    i.checkTime()
                }, 1e3), this.checkTime()
            }, this.addItem = function (b, c, d, e) {
                if (c) {
                    for (var g = "<div class=\"flip-wrapper " + b + "\">\t<div class=\"flips\">", h = 0; h < d; h++) g += "<ul class=\"flip flip-" + h + "\">" + this.tickItem(0, "before") + this.tickItem(0, "active") + "</ul>";
                    g += "\t</div>\t<span class=\"text\">" + e + "</span></div>", f.append(a(g))
                }
            }, this.tickItem = function (a, b) {
                return "<li class=\"" + b + "\">\t<div class=\"flip-updown\">\t\t<div class=\"flip-up\">\t\t\t<div class=\"flip-shadow\"></div>\t\t\t<div class=\"flip-val\">" + a + "</div>\t\t</div>\t\t<div class=\"flip-divider\"></div>\t\t<div class=\"flip-down\">\t\t\t<div class=\"flip-shadow\"></div>\t\t\t<div class=\"flip-val\">" + a + "</div>\t\t</div>\t</div></li>"
            }, this.itemSize = function () {
                c.showDay && (E += z), c.showHour && (E += A), c.showMinute && (E += C), c.showSecond && (E += D), 1 < E && (F += 2, 2 < E && (F += 1, 3 < E && (F += 2, 4 < E && (F += 1, 5 < E && (F += 2, 6 < E && (F += 1, 7 < E && (F += 2, 8 < E && (F += 1))))))))
            }, this.findSize = function () {
                var a = g.width();
                H = a / (F * I)
            }, this.style = function (a, b, d) {
                c.bgColor = a, c.dividerColor = b, c.digitColor = d, this.flipStyle()
            }, this.flipStyle = function () {
                l = f.find("ul");
                var a = parseInt(H * I, 10), b = parseInt(1.3 * (H * I), 10);
                isNaN(c.borderRadius) || (c.borderRadius += "px"), l.width(a).height(b), l.css({
                    "font-size": a + "px",
                    "line-height": b + "px",
                    margin: parseInt(a / 20, 10) + "px",
                    "border-radius": c.borderRadius
                }), c.boxShadow && l.addClass("flip-box-shadow"), l.find(".flip-divider").css({background: c.dividerColor}), m = l.find(".flip-val"), m.css({
                    background: c.bgColor,
                    color: c.digitColor,
                    "border-radius": c.borderRadius
                }), l.find(".flip-down").css({
                    "border-bottom-left-radius": c.borderRadius,
                    "border-bottom-right-radius": c.borderRadius
                }), l.find("li.active .flip-up .flip-shadow").css({
                    "border-top-left-radius": c.borderRadius,
                    "border-top-right-radius": c.borderRadius
                }), f.find(".text").css({color: c.textColor}), f.show()
            }, this.flip = function (a, b, c) {
                var d = e.find("." + a), f = d.find(".flip-" + b), g = f.find(".before"), h = f.find(".active");
                g.find(".flip-val").text(c), g.removeClass("before").addClass("active"), h.removeClass("active").addClass("before")
            }, this.changeColor = function () {
                if (M += n, d += N, i += O, M * n >= J * n && d * N >= K * N && i * O >= L * O) {
                    var a;
                    M = J, d = K, i = L, a = J, J = K, K = L, L = a, n = (J - M) / 1e3, N = (K - d) / 1e3, O = (L - i) / 1e3
                }
                var b = "rgba(" + Math.floor(M) + ", " + Math.floor(d) + ", " + Math.floor(i) + ", 1)";
                m.css({background: b})
            }, this.checkTime = function () {
                if (j = new Date, h = j.getTime() + o + 1e3 * (60 * j.getTimezoneOffset()), k = c.past ? h - c.date : c.date - h, 0 <= k) c.autoReset && (k %= c.resetInterval); else if (c.autoReset) k = c.resetInterval + k % c.resetInterval; else switch (clearInterval(q), k = 0, c.expireType) {
                    case"message":
                        f.addClass("onfinish");
                        var b = a("<div class=\"flip-message\" />");
                        b.html(c.message), e.append(b);
                        break;
                    case"hide":
                        e.fadeOut();
                        break;
                    case"redirect":
                        document.location.href = c.redirect;
                }
                var d = this.timeFormat(k), g = d.split(""), l = 0;
                for (l = 0; l < z; l++) r[l] = parseInt(g.shift(), 10);
                var m = r.length - 1;
                if (c.showDay && r[m] !== s[m] && (this.flip("day", m, r[m]), s[m] = r[m], 0 < m)) for (l = 0; l < m; l++) (c.past || 9 !== s[m]) && (!c.past || 0 !== s[1]) && p || this.flip("day", l, r[l]);
                for (l = 0; l < A; l++) t[l] = parseInt(g.shift(), 10);
                for (c.showHour && t[1] !== u[1] && (this.flip("hour", 1, t[1]), u[1] = t[1], (!c.past && 9 === u[1] || c.past && 0 === u[1] || !p) && this.flip("hour", 0, t[0]), 1 > u[0] && 2 > u[1] && this.flip("hour", 0, t[0]), u[0] = t[0]), l = 0; l < C; l++) v[l] = parseInt(g.shift(), 10);
                for (c.showMinute && v[1] !== w[1] && (this.flip("minute", 1, v[1]), w[1] = v[1], (!c.past && 9 === w[1] || c.past && 0 === w[1] || !p) && this.flip("minute", 0, v[0]), w[0] = v[0]), l = 0; l < D; l++) x[l] = parseInt(g.shift(), 10);
                c.showSecond && x[1] !== parseInt(y[1], 10) && (this.flip("second", 1, x[1]), y[1] = x[1], (!c.past && 9 === y[1] || c.past && 0 === y[1] || !p) && this.flip("second", 0, x[0]), y[0] = x[0]), p = !0
            }, this.textFormat = function (a, b, c) {
                for (a = a.toString(); a.length < b;) a = c + a;
                return a.length > b && (a = a.substr(a.length - b, b)), a
            }, this.timeFormat = function (a) {
                var b = Math.floor(a / 1e3), c = Math.floor(b % 3600 / 60), e = Math.floor(b % 86400 / 3600),
                    f = Math.floor(b / 86400);
                return this.textFormat(f, z, "0") + this.textFormat(e, A, "0") + this.textFormat(c, C, "0") + this.textFormat(b % 60, D, "0")
            }, this.convertToTime = function (a) {
                var b = a.split("/").join(" ").split(":").join(" ").split(" "), e = parseInt(b[0], 10),
                    f = parseInt(b[1], 10) - 1, g = parseInt(b[2], 10), d = parseInt(b[3], 10),
                    h = parseInt(b[4], 10) - 60 * c.timeZone, i = parseInt(b[5], 10);
                return new Date(e, f, g, d, h, i, 0).getTime()
            }
        }

        var d;
        a.fn.flipTimer.style = function (a, b, c) {
            d.style(a, b, c)
        };
        return b = a.extend({}, {
            date: "",
            timeZone: 0,
            past: !1,
            currentDate: !1,
            dayTextNumber: 2,
            showDay: !0,
            showHour: !0,
            showMinute: !0,
            showSecond: !0,
            dayText: "روز",
            hourText: "ساعت",
            minuteText: "دقیقه",
            secondText: "ثانیه",
            bgColor: "#333333",
            dividerColor: "#000000",
            digitColor: "#ffffff",
            textColor: "#666666",
            borderRadius: 6,
            boxShadow: !0,
            multiColor: !1,
            autoReset: !1,
            resetInterval: 86400,
            expireType: "message",
            message: "مهلت شرکت در مزایده به اتمام رسیده",
            redirect: ""
        }, b), this.each(function () {
            var e = a(this);
            e.addClass("fliptimer"), d = new c(a(this), b), d.init()
        })
    }
})(jQuery);
