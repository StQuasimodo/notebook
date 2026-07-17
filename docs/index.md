---
hide:
  - toc
  - navigation
---

<style>
  /* ===== 粒子背景 ===== */
  #particleCanvas { position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:.45; }

  /* ===== 容器 ===== */
  .hw { position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;
    max-width:700px;margin:0 auto;padding:1.2rem 1rem 2rem;min-height:calc(100vh - 96px);justify-content:center;gap:1rem; }

  /* ===== Hero ===== */
  .hh { text-align:center;animation:fu .6s cubic-bezier(.16,1,.3,1); }
  .ha { display:inline-flex;align-items:center;justify-content:center;width:56px;height:56px;
    border-radius:50%;margin-bottom:.6rem;font-size:1.8rem;
    transition:transform .4s cubic-bezier(.34,1.56,.64,1); }
  .ha:hover { transform:scale(1.1) rotate(-6deg); }
  .ht { font-size:2rem;font-weight:800;letter-spacing:-.02em;margin:0 0 .2rem;line-height:1.15; }
  .ht span { display:block; }
  .ht .s { font-size:1.4rem;font-weight:600;opacity:.65; }
  .hx { display:flex;align-items:center;justify-content:center;gap:.1rem;
    font-family:"JetBrains Mono","Maple Mono",monospace;font-size:.82rem;height:1.3rem;margin-bottom:.4rem; }
  .hx .p { opacity:.3; }
  .hx .c { font-weight:300;animation:bl 1s step-end infinite; }
  @keyframes bl { 0%,100%{opacity:1} 50%{opacity:0} }
  .hd { font-size:.8rem;opacity:.45;margin:0 auto;max-width:360px;line-height:1.4;animation:fu .6s .12s both; }

  /* ===== 分割线 ===== */
  .hl { width:40px;height:1px;margin:0 auto;opacity:.12; }

  /* ===== 导航卡片（2列） ===== */
  .nc { display:grid;grid-template-columns:1fr 1fr;gap:.6rem;width:100%; }
  .ncd { display:flex;align-items:center;gap:.6rem;padding:.75rem 1rem;border-radius:12px;
    text-decoration:none!important;border:none!important;transition:all .3s cubic-bezier(.16,1,.3,1); }
  .ncd .ic { font-size:1.3rem;flex-shrink:0;width:36px;height:36px;display:flex;
    align-items:center;justify-content:center;border-radius:9px;
    transition:transform .25s cubic-bezier(.34,1.56,.64,1); }
  .ncd:hover .ic { transform:scale(1.12); }
  .ncd .tx { flex:1;min-width:0; }
  .ncd .tx h3 { font-size:.82rem;font-weight:700;margin:0 0 .08rem;letter-spacing:-.01em; }
  .ncd .tx p { font-size:.68rem;margin:0;opacity:.38;line-height:1.3; }
  .ncd .ar { font-size:.85rem;opacity:0;transform:translateX(-4px);transition:all .25s cubic-bezier(.16,1,.3,1); }
  .ncd:hover .ar { opacity:1;transform:translateX(0); }

  /* ===== 双栏：最近更新 + 站点统计 ===== */
  .hw-row { display:grid;grid-template-columns:1fr 1fr;gap:.6rem;width:100%; }
  .hw-panel { padding:.75rem 1rem;border-radius:12px; }
  .hw-panel .tt { font-size:.72rem;font-weight:700;opacity:.45;margin-bottom:.5rem;letter-spacing:.04em;text-transform:uppercase; }
  .hw-panel ul { list-style:none;padding:0;margin:0; }
  .hw-panel ul li { display:flex;align-items:center;gap:.5rem;padding:.2rem 0;font-size:.76rem; }
  .hw-panel ul li .dt { font-size:.65rem;opacity:.35;margin-left:auto;white-space:nowrap;font-family:"JetBrains Mono","Maple Mono",monospace; }
  .hw-panel ul li .ttl { flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
  .hw-panel ul li .ttl a { text-decoration:none!important;border:none!important; }
  .hw-panel ul li .dot { width:5px;height:5px;border-radius:50%;flex-shrink:0; }
  .hw-panel .st-row { display:flex;justify-content:space-between;align-items:center;padding:.2rem 0;font-size:.8rem; }
  .hw-panel .st-row .sv { font-weight:700;font-family:"JetBrains Mono","Maple Mono",monospace;
    font-size:.95rem;letter-spacing:-.03em; }
  .hw-panel .st-row .sl { font-size:.68rem;opacity:.4; }

  /* ===== 随机文章 ===== */
  .hw-rand { width:100%;padding:.7rem 1rem;border-radius:12px;display:flex;align-items:center;gap:.7rem;
    text-decoration:none!important;border:none!important;transition:all .3s cubic-bezier(.16,1,.3,1);cursor:pointer; }
  .hw-rand .ri { font-size:1.2rem;flex-shrink:0;width:34px;height:34px;display:flex;
    align-items:center;justify-content:center;border-radius:8px;transition:transform .25s cubic-bezier(.34,1.56,.64,1); }
  .hw-rand:hover .ri { transform:scale(1.15) rotate(-5deg); }
  .hw-rand .rt { flex:1;min-width:0; }
  .hw-rand .rt .rn { font-size:.78rem;font-weight:700;letter-spacing:-.01em; }
  .hw-rand .rt .rd { font-size:.66rem;opacity:.35;margin-top:.05rem; }
  .hw-rand .rf { font-size:.75rem;opacity:0;transform:translateX(-4px);transition:all .25s cubic-bezier(.16,1,.3,1); }
  .hw-rand:hover .rf { opacity:1;transform:translateX(0); }
  .hw-rand .rr { font-size:.75rem;opacity:0;cursor:pointer;padding:4px;border-radius:6px;
    transition:all .25s; }
  .hw-rand:hover .rr { opacity:.5; }
  .hw-rand .rr:hover { opacity:1!important;transform:rotate(180deg); }

  /* ===== 暗色 ===== */
  [data-md-color-scheme="slate"] .ha { background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08); }
  [data-md-color-scheme="slate"] .ht { color:#f0f0f0; }
  [data-md-color-scheme="slate"] .hx,.hx .typing-text { color:rgba(255,255,255,.65); }
  [data-md-color-scheme="slate"] .hd { color:rgba(255,255,255,.42); }
  [data-md-color-scheme="slate"] .hl { background:rgba(255,255,255,.25); }
  [data-md-color-scheme="slate"] .ncd { background:rgba(255,255,255,.022);border:1px solid rgba(255,255,255,.05)!important; }
  [data-md-color-scheme="slate"] .ncd:hover { background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.15)!important;
    transform:translateY(-2px);box-shadow:0 10px 24px rgba(0,0,0,.5); }
  [data-md-color-scheme="slate"] .ncd .ic { background:rgba(255,255,255,.03); }
  [data-md-color-scheme="slate"] .ncd .tx h3 { color:rgba(255,255,255,.85); }
  [data-md-color-scheme="slate"] .ncd .ar { color:rgba(255,255,255,.35); }
  [data-md-color-scheme="slate"] .hw-panel { background:rgba(255,255,255,.018);border:1px solid rgba(255,255,255,.04); }
  [data-md-color-scheme="slate"] .hw-panel .tt { color:rgba(255,255,255,.4); }
  [data-md-color-scheme="slate"] .hw-panel .ttl a { color:rgba(255,255,255,.7); }
  [data-md-color-scheme="slate"] .hw-panel .ttl a:hover { color:rgba(255,255,255,.95); }
  [data-md-color-scheme="slate"] .hw-panel .dot { background:rgba(255,255,255,.35); }
  [data-md-color-scheme="slate"] .hw-panel .sv { color:#fff; }
  [data-md-color-scheme="slate"] .hw-rand { background:rgba(255,255,255,.018);border:1px solid rgba(255,255,255,.04); }
  [data-md-color-scheme="slate"] .hw-rand:hover { background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.12);
    transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.4); }
  [data-md-color-scheme="slate"] .hw-rand .ri { background:rgba(255,255,255,.03); }
  [data-md-color-scheme="slate"] .hw-rand .rn { color:rgba(255,255,255,.85); }
  [data-md-color-scheme="slate"] .hw-rand .rf { color:rgba(255,255,255,.35); }

  /* ===== 亮色 ===== */
  [data-md-color-scheme="default"] .ha { background:rgba(9,136,198,.04);border:1px solid rgba(9,136,198,.1); }
  [data-md-color-scheme="default"] .ht { color:#0d2137; }
  [data-md-color-scheme="default"] .hx,.hx .typing-text { color:rgba(9,136,198,.7); }
  [data-md-color-scheme="default"] .hd { color:rgba(0,0,0,.4); }
  [data-md-color-scheme="default"] .hl { background:rgba(9,136,198,.2); }
  [data-md-color-scheme="default"] .ncd { background:rgba(255,255,255,.65);border:1px solid rgba(9,136,198,.07)!important;
    box-shadow:0 1px 3px rgba(9,136,198,.03); }
  [data-md-color-scheme="default"] .ncd:hover { background:#fff;border-color:rgba(9,136,198,.2)!important;
    transform:translateY(-2px);box-shadow:0 8px 22px rgba(9,136,198,.1); }
  [data-md-color-scheme="default"] .ncd .ic { background:rgba(9,136,198,.05); }
  [data-md-color-scheme="default"] .ncd .tx h3 { color:#0d2137; }
  [data-md-color-scheme="default"] .ncd .ar { color:#0988c6; }
  [data-md-color-scheme="default"] .hw-panel { background:rgba(255,255,255,.55);border:1px solid rgba(9,136,198,.06);
    box-shadow:0 1px 3px rgba(9,136,198,.02); }
  [data-md-color-scheme="default"] .hw-panel .tt { color:rgba(9,136,198,.55); }
  [data-md-color-scheme="default"] .hw-panel .ttl a { color:#0d2137; }
  [data-md-color-scheme="default"] .hw-panel .ttl a:hover { color:#0988c6; }
  [data-md-color-scheme="default"] .hw-panel .dot { background:rgba(9,136,198,.4); }
  [data-md-color-scheme="default"] .hw-panel .sv { color:#0988c6; }
  [data-md-color-scheme="default"] .hw-rand { background:rgba(255,255,255,.55);border:1px solid rgba(9,136,198,.06);
    box-shadow:0 1px 3px rgba(9,136,198,.02); }
  [data-md-color-scheme="default"] .hw-rand:hover { background:#fff;border-color:rgba(9,136,198,.2);
    transform:translateY(-2px);box-shadow:0 8px 20px rgba(9,136,198,.1); }
  [data-md-color-scheme="default"] .hw-rand .ri { background:rgba(9,136,198,.05); }
  [data-md-color-scheme="default"] .hw-rand .rn { color:#0d2137; }
  [data-md-color-scheme="default"] .hw-rand .rf { color:#0988c6; }

  /* ===== 动画 ===== */
  @keyframes fu { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

  /* ===== 响应式 ===== */
  @media screen and (max-width:560px) {
    .hw { padding:.8rem .8rem 1.5rem;gap:.7rem; }
    .ht { font-size:1.5rem; } .ht .s { font-size:1.1rem; }
    .nc { grid-template-columns:1fr;gap:.4rem; }
    .hw-row { grid-template-columns:1fr;gap:.4rem; }
    .ncd { padding:.6rem .85rem; }
    .ha { width:46px;height:46px;font-size:1.5rem; }
  }
</style>

<canvas id="particleCanvas"></canvas>

<div class="hw">

  <!-- Hero -->
  <div class="hh">
    <div class="ha">📓</div>
    <h1 class="ht"><span>StQuasimodo</span><span class="s">的学习笔记</span></h1>
    <div class="hx">
      <span class="p">#&nbsp;</span><span id="typingText" class="typing-text"></span><span class="c">|</span>
    </div>
    <p class="hd">记录计算机科学学习路上的思考、实践与成长</p>
  </div>

  <!-- 分割线 -->
  <div class="hl"></div>

  <!-- 核心笔记 -->
  <div class="nc">
    <a href="layout/mdgrammar/" class="ncd">
      <div class="ic">📐</div><div class="tx"><h3>Markdown 排版</h3><p>文档排版与写作指南</p></div><span class="ar">→</span>
    </a>
    <a href="layout/latex_math/" class="ncd">
      <div class="ic">📊</div><div class="tx"><h3>LaTeX 数学公式</h3><p>代码书写优美公式</p></div><span class="ar">→</span>
    </a>
  </div>

  <!-- 双栏：最近更新 + 站点统计 -->
  <div class="hw-row">
    <div class="hw-panel" id="recentPanel">
      <div class="tt">🕐 最近更新</div>
      <ul id="recentList"><li style="opacity:.4">加载中…</li></ul>
    </div>
    <div class="hw-panel" id="statsPanel">
      <div class="tt">📊 站点统计</div>
      <div id="statsContent" style="opacity:.4">加载中…</div>
    </div>
  </div>

  <!-- 随机文章 -->
  <a class="hw-rand" id="randomCard" href="layout/mdgrammar/">
    <div class="ri">🎲</div>
    <div class="rt">
      <div class="rn" id="randTitle">随机阅读</div>
      <div class="rd" id="randDesc">探索一篇笔记</div>
    </div>
    <span class="rr" id="randRefresh" title="换一篇">🔄</span>
    <span class="rf">→</span>
  </a>

</div>

<script src="js/home.js"></script>
