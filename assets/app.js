(function(){
  // ---- sidebar toggle ----
  var sidebar = document.getElementById('sidebar');
  var overlay = document.getElementById('overlay');
  var menuBtn = document.getElementById('menuBtn');
  function openSidebar(){ sidebar.classList.add('open'); overlay.classList.add('show'); }
  function closeSidebar(){ sidebar.classList.remove('open'); overlay.classList.remove('show'); }
  if(menuBtn){
    menuBtn.addEventListener('click', function(){
      sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
  }
  if(overlay) overlay.addEventListener('click', closeSidebar);
  var tocList = document.getElementById('tocList');
  if(tocList){
    tocList.addEventListener('click', function(e){
      if(e.target.tagName === 'A' && window.innerWidth <= 900) closeSidebar();
    });
    var tocSearch = document.getElementById('tocSearch');
    if(tocSearch){
      tocSearch.addEventListener('input', function(){
        var q = this.value.trim().toLowerCase();
        tocList.querySelectorAll('a').forEach(function(a){
          a.parentElement.style.display = a.dataset.title.indexOf(q) !== -1 ? '' : 'none';
        });
      });
    }
  }

  // ---- settings popover ----
  var settingsBtn = document.getElementById('settingsBtn');
  var controlsPop = document.getElementById('controlsPop');
  if(settingsBtn){
    settingsBtn.addEventListener('click', function(e){
      e.stopPropagation();
      controlsPop.classList.toggle('open');
    });
    document.addEventListener('click', function(e){
      if(controlsPop.classList.contains('open') && !controlsPop.contains(e.target) && e.target !== settingsBtn){
        controlsPop.classList.remove('open');
      }
    });
  }

  // ---- theme ----
  var root = document.documentElement;
  var themeSeg = document.getElementById('themeSeg');
  function setTheme(t){
    root.setAttribute('data-theme', t);
    localStorage.setItem('pcs-theme', t);
    if(themeSeg) themeSeg.querySelectorAll('button').forEach(function(b){
      b.classList.toggle('active', b.dataset.theme === t);
    });
  }
  if(themeSeg){
    themeSeg.addEventListener('click', function(e){
      if(e.target.tagName === 'BUTTON') setTheme(e.target.dataset.theme);
    });
  }
  setTheme(localStorage.getItem('pcs-theme') || 'light');

  // ---- font size ----
  var fsPct = parseInt(localStorage.getItem('pcs-fs') || '100', 10);
  var fsVal = document.getElementById('fsVal');
  function applyFs(){
    document.documentElement.style.setProperty('--base-fs', (17 * fsPct/100) + 'px');
    if(fsVal) fsVal.textContent = fsPct + '%';
    localStorage.setItem('pcs-fs', fsPct);
  }
  var fsPlus = document.getElementById('fsPlus');
  var fsMinus = document.getElementById('fsMinus');
  if(fsPlus) fsPlus.addEventListener('click', function(){ fsPct = Math.min(160, fsPct+10); applyFs(); });
  if(fsMinus) fsMinus.addEventListener('click', function(){ fsPct = Math.max(70, fsPct-10); applyFs(); });
  applyFs();

  // ---- reading mode ----
  var readingBtn = document.getElementById('readingBtn');
  var readSeg = document.getElementById('readSeg');
  function setReading(on){
    document.body.classList.toggle('reading-mode', on);
    if(readingBtn) readingBtn.classList.toggle('active', on);
    if(readSeg) readSeg.querySelectorAll('button').forEach(function(b){
      b.classList.toggle('active', (b.dataset.on==='1') === on);
    });
    localStorage.setItem('pcs-reading', on ? '1':'0');
  }
  if(readingBtn) readingBtn.addEventListener('click', function(){
    setReading(!document.body.classList.contains('reading-mode'));
  });
  if(readSeg){
    readSeg.addEventListener('click', function(e){
      if(e.target.tagName === 'BUTTON') setReading(e.target.dataset.on === '1');
    });
  }
  setReading(localStorage.getItem('pcs-reading') === '1');

  // ---- progress bar (per-chapter reading progress) + top button ----
  var progressBar = document.getElementById('progressBar');
  var topBtn = document.getElementById('topBtn');
  function onScroll(){
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if(progressBar) progressBar.style.width = (docHeight > 0 ? (scrollTop/docHeight*100) : 0) + '%';
    if(topBtn) topBtn.classList.toggle('show', scrollTop > 500);
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
  if(topBtn) topBtn.addEventListener('click', function(){
    window.scrollTo({top:0, behavior:'smooth'});
  });
})();
