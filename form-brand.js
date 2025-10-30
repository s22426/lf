// form-brand.js — automatyczne dopasowanie pól
(function(){
  function autosize(el) {
    el.style.height = "auto";
    el.style.height = (el.scrollHeight) + "px";
  }
  document.addEventListener("input", function(e){
    if(e.target.matches("textarea, input[type='text']")){
      autosize(e.target);
    }
  });
  window.addEventListener("load", function(){
    document.querySelectorAll("textarea, input[type='text']").forEach(autosize);
  });
})();
