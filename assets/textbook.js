/* ============================================================
   八音鋼琴創客課程 · 教材導覽
   ============================================================ */
(function(){
  // ---- full table of contents ----
  var TOC = [
    {phase:'導論 · 前置', items:[
      {n:'00', t:'課程總覽與使用說明', href:'index.html'},
      {n:'附錄', t:'材料與工具總清單', href:'appendix/materials.html'},
      {n:'附錄', t:'安全守則總集', href:'appendix/safety.html'},
      {n:'附錄', t:'軟體快捷鍵速查卡', href:'appendix/shortcuts.html'},
      {n:'全冊', t:'全冊列印版（一次印）', href:'handbook-all.html'}
    ]},
    {phase:'階段一 · 觀察與逆向', items:[
      {n:'W1', t:'觀察、拆解、重組', href:'weeks/week-01.html'},
      {n:'W2', t:'逆向製作與向量繪圖', href:'weeks/week-02.html'}
    ]},
    {phase:'階段二 · 機構與 3D 建模', items:[
      {n:'W3', t:'機構基礎：孔位、間距、幾何', href:'weeks/week-03.html'},
      {n:'W4', t:'Tinkercad & Bambu Studio 建模', href:'weeks/week-04.html'},
      {n:'W5', t:'3D 列印機器與材料認識', href:'weeks/week-05.html'}
    ]},
    {phase:'階段三 · 電路與外殼', items:[
      {n:'W6', t:'鋼琴聲音 → 認識 Arduino', href:'weeks/week-06.html'},
      {n:'W7', t:'外盒設計與雷射切割', href:'weeks/week-07.html'},
      {n:'W8', t:'3D 列印印製外盒', href:'weeks/week-08.html'},
      {n:'W9', t:'緩衝週 + Maker Lab', href:'weeks/week-09.html'}
    ]},
    {phase:'階段四 · 測試與後處理', items:[
      {n:'W10–11', t:'電子鋼琴測試與迭代', href:'weeks/week-10.html'},
      {n:'W12', t:'後處理打磨與組裝', href:'weeks/week-12.html'},
      {n:'W13', t:'外盒上色', href:'weeks/week-13.html'}
    ]},
    {phase:'階段五 · 多色列印與 AI', items:[
      {n:'W14', t:'三色畫板 + AI 生圖', href:'weeks/week-14.html'},
      {n:'W15', t:'畫板配色與完成', href:'weeks/week-15.html'}
    ]},
    {phase:'階段六 · 整合與發表', items:[
      {n:'W16–17', t:'文書整合與作品整理', href:'weeks/week-16.html'},
      {n:'W18', t:'公開發表演說', href:'weeks/week-18.html'}
    ]}
  ];

  function buildDrawer(){
    var prefix = (document.body.getAttribute('data-depth')==='1') ? '../' : '';
    var cur = document.body.getAttribute('data-page')||'';
    var veil = document.createElement('div'); veil.className='drawer-veil';
    var d = document.createElement('aside'); d.className='drawer';
    var html = '<div class="drawer-head"><h3>課程目錄</h3><button class="drawer-x" aria-label="關閉">&times;</button></div><nav class="drawer-list">';
    TOC.forEach(function(g){
      html += '<div class="drawer-phase">'+g.phase+'</div>';
      g.items.forEach(function(it){
        var current = it.href===cur ? ' current':'';
        html += '<a class="drawer-item'+current+'" href="'+prefix+it.href+'"><span class="drawer-num">'+it.n+'</span><span class="drawer-t">'+it.t+'</span></a>';
      });
    });
    html += '</nav>';
    d.innerHTML = html;
    document.body.appendChild(veil);
    document.body.appendChild(d);
    function open(){d.classList.add('open');veil.classList.add('open')}
    function close(){d.classList.remove('open');veil.classList.remove('open')}
    veil.addEventListener('click',close);
    d.querySelector('.drawer-x').addEventListener('click',close);
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
    window.__openTOC = open;
  }

  function wireButtons(){
    document.querySelectorAll('[data-toc]').forEach(function(b){
      b.addEventListener('click',function(e){e.preventDefault();window.__openTOC&&window.__openTOC()});
    });
    document.querySelectorAll('[data-print]').forEach(function(b){
      b.addEventListener('click',function(e){e.preventDefault();window.print()});
    });
  }

  function wireCopy(){
    document.querySelectorAll('.code-copy').forEach(function(btn){
      btn.addEventListener('click',function(){
        var pre = btn.closest('.code').querySelector('pre');
        var txt = pre.innerText;
        function flash(){
          var old = btn.getAttribute('data-label')||btn.textContent;
          btn.setAttribute('data-label',old);
          btn.textContent='已複製 ✓'; btn.classList.add('done');
          setTimeout(function(){btn.textContent=old;btn.classList.remove('done')},1600);
        }
        function fallback(){
          try{var r=document.createRange();r.selectNodeContents(pre);var sel=window.getSelection();sel.removeAllRanges();sel.addRange(r);document.execCommand('copy');sel.removeAllRanges();flash();}catch(e){}
        }
        if(navigator.clipboard&&navigator.clipboard.writeText){
          navigator.clipboard.writeText(txt).then(flash).catch(fallback);
        }else{fallback();}
      });
    });
  }

  document.addEventListener('DOMContentLoaded',function(){
    buildDrawer();wireButtons();wireCopy();
  });
})();
