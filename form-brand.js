// form-brand.js — autosize + dynamic watcher
(function(){
  'use strict';

  function autosizeEl(el){
    if (!el) return;
    // we only autosize textarea and text inputs
    if (el.tagName.toLowerCase() === 'textarea' || (el.tagName.toLowerCase() === 'input' && el.type === 'text')) {
      el.style.height = 'auto';
      // set height to scrollHeight (add small padding)
      el.style.height = (el.scrollHeight + 4) + 'px';
    }
  }

  function initAll(root){
    root = root || document;
    // all textareas + text inputs
    var nodes = root.querySelectorAll('textarea, input[type="text"]');
    nodes.forEach(function(n){
      // skip if explicitly disabled
      if (n.getAttribute('data-autosize') === 'false') return;
      // initial
      autosizeEl(n);
      // bind event (use input for immediate update)
      if (!n._autosizeBound) {
        n.addEventListener('input', function(){ autosizeEl(n); }, false);
        n._autosizeBound = true;
      }
    });
  }

  // run on load
  window.addEventListener('load', function(){ initAll(document); });

  // also run on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function(){ initAll(document); });

  // Watch for dynamically added nodes (Form.io often injects fields)
  var observer = new MutationObserver(function(mutations){
    mutations.forEach(function(m){
      if (m.addedNodes && m.addedNodes.length) {
        m.addedNodes.forEach(function(n){
          if (n.nodeType !== 1) return;
          // if a container or direct input/textarea added — init inside it
          if (n.matches && (n.matches('textarea') || n.matches('input[type="text"]'))) {
            initAll(n.parentNode || n);
          } else {
            initAll(n);
          }
        });
      }
    });
  });

  observer.observe(document.documentElement || document.body, { childList: true, subtree: true });

  // Extra: re-init on window resize
  window.addEventListener('resize', function(){ initAll(document); });

})();
