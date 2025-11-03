// form-brand.js - ensure center white title and logo left even if Form.io injects markup later
(function(){
  'use strict';

  function fixNavbar(){
    var navbar = document.querySelector('.formio nav.navbar') || document.querySelector('.formio .navbar') || document.querySelector('nav.navbar') || document.querySelector('.form-header') || document.querySelector('header');
    if(!navbar) return false;

    // logo left
    var lb = navbar.querySelector('.navbar-brand, .logo, img');
    if(lb){
      lb.style.position = 'absolute';
      lb.style.left = '14px';
      lb.style.top = '50%';
      lb.style.transform = 'translateY(-50%)';
      lb.style.zIndex = '1010';
    }

    // find title element
    var title = navbar.querySelector('.navbar-text, .navbar-title, .header-title, .form-header .title, h1, h2, h3');
    if(!title){
      // create if missing
      title = document.createElement('div');
      title.className = 'custom-centered-title';
      // if there's a configured title in Form.io, try to reuse it
      var cfg = document.title || 'ANKIETA WSTĘPNA WMS';
      title.textContent = cfg || 'ANKIETA WSTĘPNA WMS';
      navbar.appendChild(title);
    }

    // apply styles
    title.style.color = '#fff';
    title.style.position = 'absolute';
    title.style.left = '50%';
    title.style.top = '50%';
    title.style.transform = 'translate(-50%, -50%)';
    title.style.fontWeight = '600';
    title.style.fontSize = '1.15rem';
    title.style.zIndex = '1005';
    title.style.whiteSpace = 'nowrap';
    return true;
  }

  // try immediately
  if(!fixNavbar()){
    // observe DOM for changes (Form.io may inject elements later)
    var mo = new MutationObserver(function(mutations){
      if(fixNavbar()){
        mo.disconnect();
      }
    });
    mo.observe(document.documentElement || document.body, { childList: true, subtree: true });
  }

  // backup: reapply on window resize (responsive)
  window.addEventListener('resize', function(){ fixNavbar(); });
  // also try after a small delay (some SPAs render late)
  setTimeout(fixNavbar, 600);
  setTimeout(fixNavbar, 1600);

})();
