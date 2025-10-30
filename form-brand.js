/* form-brand.js
   Autosize textareas and contenteditable fields.
   Lightweight, dependency-free.
*/

(function(){
  'use strict';

  // small debounce util
  function debounce(fn, wait){
    var t;
    return function(){
      var ctx = this, args = arguments;
      clearTimeout(t);
      t = setTimeout(function(){ fn.apply(ctx, args); }, wait || 50);
    };
  }

  function autosizeTextarea(el){
    if (!el) return;
    // reset height to measure properly
    el.style.height = 'auto';
    var sh = el.scrollHeight;
    // add a tiny offset to avoid one-line cutoffs
    el.style.height = (sh + 4) + 'px';
  }

  function initTextareas(){
    var areas = Array.prototype.slice.call(document.querySelectorAll('textarea'));
    areas.forEach(function(a){
      if (a.getAttribute('data-autosize') === 'false') return;
      autosizeTextarea(a);
      var handler = debounce(function(){ autosizeTextarea(a); }, 40);
      a.addEventListener('input', handler, false);
      // resize on window change
      window.addEventListener('resize', handler, false);
      // for dynamically inserted content
      a.addEventListener('change', handler, false);
    });
  }

  function autosizeContentEditable(el){
    if (!el) return;
    // We use scrollHeight of a clone to handle inline elements reliably
    el.style.height = 'auto';
    var sh = el.scrollHeight;
    el.style.height = (sh + 4) + 'px';
  }

  function initContentEditables(){
    var eds = Array.prototype.slice.call(document.querySelectorAll('[contenteditable]'));
    eds.forEach(function(e){
      // skip if explicitly disabled
      if (e.getAttribute('data-autosize') === 'false') return;
      // ensure block formatting
      if (window.getComputedStyle(e).display === 'inline') {
        e.style.display = 'inline-block';
      }
      autosizeContentEditable(e);
      var handler = debounce(function(){ autosizeContentEditable(e); }, 50);
      e.addEventListener('input', handler, false);
      window.addEventListener('resize', handler, false);
    });
  }

  // Run on DOMContentLoaded and also try after small delay for SPAs
  function initAll(){
    try {
      initTextareas();
      initContentEditables();
    } catch (err) {
      console.warn('form-brand.js init error', err);
    }
  }

  document.addEventListener('DOMContentLoaded', initAll);
  // additional attempt after 800ms (useful when Form.io loads dynamically)
  setTimeout(initAll, 800);
  // and once more after 2500ms
  setTimeout(initAll, 2500);

})();
