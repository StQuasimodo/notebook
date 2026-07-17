/**
 * Homepage — 粒子背景 + 打字机 + 数据加载 + 卡片 tilt
 */
(function () {
  "use strict";

  /* ============================================================
     1. 粒子背景
     ============================================================ */
  var canvas = document.getElementById("particleCanvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var w, h, pts = [], N = 50, mx = -1e3, my = -1e3;

  function resize() {
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w; canvas.height = h;
  }
  function create() {
    pts = [];
    for (var i = 0; i < N; i++) {
      pts.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.7,
        a: Math.random() * 0.35 + 0.08,
      });
    }
  }
  function dark() {
    return document.body.getAttribute("data-md-color-scheme") === "slate" ||
           window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    var c = dark() ? "255,255,255" : "9,136,198";
    var md = dark() ? 130 : 140;
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      var dxm = mx - p.x, dym = my - p.y;
      var dm = Math.sqrt(dxm * dxm + dym * dym);
      if (dm < 100) { var f = (100 - dm) / 100; p.x -= dxm * f * 0.012; p.y -= dym * f * 0.012; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + c + "," + p.a + ")"; ctx.fill();
    }
    for (var i2 = 0; i2 < pts.length; i2++) {
      for (var j = i2 + 1; j < pts.length; j++) {
        var dx = pts[i2].x - pts[j].x, dy = pts[i2].y - pts[j].y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < md) {
          var la = (1 - d / md) * 0.1;
          ctx.beginPath(); ctx.moveTo(pts[i2].x, pts[i2].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = "rgba(" + c + "," + la + ")"; ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  window.addEventListener("resize", function () { resize(); create(); });
  document.addEventListener("mousemove", function (e) { mx = e.clientX; my = e.clientY; });
  document.addEventListener("mouseleave", function () { mx = -1e3; my = -1e3; });
  document.addEventListener("touchmove", function (e) { mx = e.touches[0].clientX; my = e.touches[0].clientY; }, { passive: true });
  document.addEventListener("touchend", function () { mx = -1e3; my = -1e3; });
  resize(); create(); draw();

  /* ============================================================
     2. 打字机
     ============================================================ */
  var el = document.getElementById("typingText");
  if (el) {
    var phrases = [
      "记录 CS 学习的点点滴滴 ✨",
      "探索算法与数据结构的奥秘 🔍",
      "分享编程技巧与最佳实践 💡",
      "构建属于自己的知识体系 🧠",
    ];
    var pi = 0, ci = 0, del = false, sp = 100;
    function type() {
      var cur = phrases[pi];
      if (del) { el.textContent = cur.substring(0, ci - 1); ci--; sp = 35; }
      else { el.textContent = cur.substring(0, ci + 1); ci++; sp = 90 + Math.random() * 50; }
      if (!del && ci === cur.length) { sp = 2000; del = true; }
      else if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; sp = 400; }
      setTimeout(type, sp);
    }
    setTimeout(type, 500);
  }

  /* ============================================================
     3. 加载数据：feed_json_updated.json
     ============================================================ */
  function loadData() {
    fetch("feed_json_updated.json")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var items = data.items || [];
        // 过滤：排除首页和空博客
        var pages = items.filter(function (item) {
          return item.id.indexOf("/index.html") === -1 &&
                 item.id.indexOf("/blog/index.html") === -1;
        });
        renderRecent(pages);
        renderStats(pages);
        renderRandom(pages);
      })
      .catch(function () {
        // 降级：用硬编码数据
        var fb = [
          { url: "layout/mdgrammar/", title: "Markdown 排版", content_html: "<p>📝 字数：764</p><p>⌨️ 代码：39 行</p><p>⏱️ 阅读时长：4 分钟</p>", date_modified: "2026-07-09T10:09:54+00:00" },
          { url: "layout/latex_math/", title: "LaTeX 数学公式", content_html: "<p>📝 字数：773</p><p>⌨️ 代码：22 行</p><p>⏱️ 阅读时长：4 分钟</p>", date_modified: "2026-07-09T10:09:54+00:00" },
        ];
        renderRecent(fb);
        renderStats(fb);
        renderRandom(fb);
      });
  }

  /* --- 最近更新 --- */
  function renderRecent(pages) {
    var list = document.getElementById("recentList");
    if (!list) return;
    // 按 modified 时间降序
    var sorted = pages.slice().sort(function (a, b) {
      return new Date(b.date_modified) - new Date(a.date_modified);
    }).slice(0, 4);

    var html = "";
    for (var i = 0; i < sorted.length; i++) {
      var p = sorted[i];
      var d = new Date(p.date_modified);
      var ds = d.getFullYear() + "-" +
        ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        ("0" + d.getDate()).slice(-2);
      var path = p.url ? p.url.replace("layout/", "layout/").replace(".html", "/") : "";
      // Clean path for mkdocs use_directory_urls: false
      if (path.indexOf("layout/") === 0) { path = path; }
      html += '<li><span class="dot"></span><span class="ttl"><a href="' + path + '">' +
        p.title + '</a></span><span class="dt">' + ds + "</span></li>";
    }
    list.innerHTML = html;
  }

  /* --- 站点统计 --- */
  function renderStats(pages) {
    var container = document.getElementById("statsContent");
    if (!container) return;
    var totalWords = 0, totalCode = 0, totalMin = 0;

    for (var i = 0; i < pages.length; i++) {
      var html = pages[i].content_html || "";
      var wm = html.match(/字数[：:]\s*(\d+)/);
      var cm = html.match(/代码[：:]\s*(\d+)/);
      var rm = html.match(/阅读时长[：:]\s*(\d+)/);
      if (wm) totalWords += parseInt(wm[1], 10);
      if (cm) totalCode += parseInt(cm[1], 10);
      if (rm) totalMin += parseInt(rm[1], 10);
    }

    container.innerHTML =
      '<div class="st-row"><span class="sl">文章</span><span class="sv">' + pages.length + '</span></div>' +
      '<div class="st-row"><span class="sl">总字数</span><span class="sv">' + totalWords.toLocaleString() + '</span></div>' +
      '<div class="st-row"><span class="sl">代码行</span><span class="sv">' + totalCode.toLocaleString() + '</span></div>' +
      '<div class="st-row"><span class="sl">阅读时长</span><span class="sv">' + totalMin + ' 分钟</span></div>';
    container.style.opacity = "1";
  }

  /* --- 随机文章 --- */
  function renderRandom(pages) {
    if (pages.length === 0) return;
    // 先去重，随机挑一个
    var idx = Math.floor(Math.random() * pages.length);
    var p = pages[idx];

    // 提取描述
    var desc = "";
    var html = p.content_html || "";
    var pm = html.match(/<p>(.*?)<\/p>/);
    if (pm) {
      desc = pm[1].replace(/<[^>]+>/g, "").replace(/[📝⌨️⏱️].*/g, "").trim();
      if (desc.length > 40) desc = desc.substring(0, 40) + "…";
    }
    if (!desc) desc = "点击阅读这篇笔记";

    var path = p.url ? p.url.replace("layout/", "layout/").replace(".html", "/") : "";

    document.getElementById("randTitle").textContent = p.title;
    document.getElementById("randDesc").textContent = desc;
    var card = document.getElementById("randomCard");
    if (card) card.href = path;

    // 换一篇按钮
    var refreshBtn = document.getElementById("randRefresh");
    if (refreshBtn) {
      refreshBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (pages.length <= 1) return;
        var cur = pages.indexOf(p);
        var next = (cur + 1 + Math.floor(Math.random() * (pages.length - 1))) % pages.length;
        var np = pages[next];
        var nd = "";
        var nh = np.content_html || "";
        var nm = nh.match(/<p>(.*?)<\/p>/);
        if (nm) { nd = nm[1].replace(/<[^>]+>/g, "").replace(/[📝⌨️⏱️].*/g, "").trim(); if (nd.length > 40) nd = nd.substring(0, 40) + "..."; }
        if (!nd) nd = "点击阅读这篇笔记";
        var npPath = np.url ? np.url.replace("layout/", "layout/").replace(".html", "/") : "";
        document.getElementById("randTitle").textContent = np.title;
        document.getElementById("randDesc").textContent = nd;
        card.href = npPath;
        p = np;
      });
    }
  }

  loadData();

  /* ============================================================
     4. 卡片 tilt（桌面端）
     ============================================================ */
  if (window.matchMedia("(pointer: fine)").matches) {
    var cards = document.querySelectorAll(".ncd, .hw-rand");
    for (var k = 0; k < cards.length; k++) {
      (function (crd) {
        crd.addEventListener("mousemove", function (e) {
          var r = this.getBoundingClientRect();
          var x = e.clientX - r.left, y = e.clientY - r.top;
          var rx = ((y - r.height / 2) / (r.height / 2)) * -2.5;
          var ry = ((x - r.width / 2) / (r.width / 2)) * 2.5;
          this.style.transform = "perspective(500px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-2px)";
        });
        crd.addEventListener("mouseleave", function () {
          this.style.transform = "perspective(500px) rotateX(0deg) rotateY(0deg) translateY(0px)";
          this.style.transition = "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)";
        });
        crd.addEventListener("mouseenter", function () {
          this.style.transition = "transform 0.1s ease-out";
        });
      })(cards[k]);
    }
  }
})();
