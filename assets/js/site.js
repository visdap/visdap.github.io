// Visdap — мінімальний JS: перемикач теми і стрілка «зараз» на циферблаті.
// Без мережевих запитів; тема зберігається лише в localStorage цього браузера.
(function () {
  "use strict";
  var root = document.documentElement;
  var KEY = "visdap-theme";

  // Пристрій відвідувача — лише щоб поставити «свій» магазин першим. Нікуди не надсилається.
  var ua = navigator.userAgent || "";
  var os = /Android/i.test(ua) ? "android"
    : /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(ua) ? "apple"
    : /Windows/i.test(ua) ? "windows" : "";
  if (os) root.setAttribute("data-os", os);
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function isDark() {
    var t = root.getAttribute("data-theme");
    if (t === "dark") return true;
    if (t === "light") return false;
    return !!(media && media.matches);
  }

  function syncButton(btn) {
    btn.setAttribute("aria-pressed", isDark() ? "true" : "false");
  }

  var btn = document.querySelector(".theme");
  if (btn) {
    btn.hidden = false; // без JS кнопка прихована: вона нічого б не робила
    syncButton(btn);
    btn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(KEY, next); } catch (e) { /* приватний режим — тема діє до перезавантаження */ }
      syncButton(btn);
    });
    if (media && media.addEventListener) {
      media.addEventListener("change", function () { syncButton(btn); });
    }
  }

  // Циферблат «як читати» (.dial-static) лишається на 10:00, бо на стрілку вказує виноска 2.
  var hands = document.querySelectorAll(".dial:not(.dial-static) .hand");
  var times = document.querySelectorAll(".dial:not(.dial-static) .dial-time");
  var pasts = document.querySelectorAll(".dial:not(.dial-static) .ring-past");
  // Та сама дуга, що arc_path() у build.py: 24 угорі, за годинниковою стрілкою, радіус кільця з SVG.
  function arcPath(hours, r) {
    var span = Math.max(Math.min(hours, 23.999), 0.001);
    var a = span / 24 * 2 * Math.PI;
    var x = 200 + r * Math.sin(a), y = 200 - r * Math.cos(a);
    return "M 200.00 " + (200 - r).toFixed(2) + " A " + r + " " + r + " 0 " + (span > 12 ? 1 : 0) +
      " 1 " + x.toFixed(2) + " " + y.toFixed(2);
  }
  // Час у центрі — завжди 24-годинний, у форматі мови сторінки.
  var fmt = null;
  try {
    fmt = new Intl.DateTimeFormat(root.lang || undefined, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  } catch (e) { /* старий браузер — формат нижче */ }
  function tick() {
    var d = new Date();
    var h = d.getHours(), m = d.getMinutes();
    var rot = "rotate(" + ((h + m / 60) / 24 * 360) + "deg)";
    var txt = fmt ? fmt.format(d) : (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m;
    for (var i = 0; i < hands.length; i++) hands[i].style.transform = rot;
    for (var k = 0; k < times.length; k++) times[k].textContent = txt;
    for (var p = 0; p < pasts.length; p++) {
      pasts[p].setAttribute("d", arcPath(h + m / 60, parseFloat(pasts[p].getAttribute("data-r"))));
    }
  }
  if (hands.length || times.length || pasts.length) {
    tick();
    setTimeout(function () { tick(); setInterval(tick, 60000); }, (60 - new Date().getSeconds()) * 1000);
  }

  // Запам'ятати мову сторінки, щоб корінь сайту наступного разу відкрив саме її (лише в цьому браузері).
  try { if (root.lang) localStorage.setItem("visdap-lang", root.lang); } catch (e) { /* без сховища — корінь візьме мову браузера */ }

  // Випадні меню шапки (розділи, мови): Escape і клік поза меню закривають, відкрите одне — закриває інше,
  // вибір розділу закриває меню розділів.
  var drops = document.querySelectorAll(".top details");
  if (drops.length) {
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      for (var i = 0; i < drops.length; i++) {
        if (drops[i].open) { drops[i].open = false; drops[i].querySelector("summary").focus(); }
      }
    });
    document.addEventListener("click", function (e) {
      for (var i = 0; i < drops.length; i++) {
        var d = drops[i];
        if (!d.open) continue;
        if (!d.contains(e.target) || (e.target.closest && e.target.closest(".menu-list a"))) d.open = false;
      }
    });
    for (var k = 0; k < drops.length; k++) {
      drops[k].addEventListener("toggle", function (e) {
        if (!e.target.open) return;
        for (var m = 0; m < drops.length; m++) if (drops[m] !== e.target) drops[m].open = false;
      });
    }
  }
})();
