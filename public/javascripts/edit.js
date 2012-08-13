var Edit = function(elementId, options){
  this.textarea = document.getElementById(elementId);
  this.textarea.style.display = 'none';
  this.create();
};

Edit.prototype = {
  create: function(){
    var attributes = {
        'contenteditable': true
      , 'class': 'editor'}
    , txt = this.textarea.value;
    this.editor = document.createElement('div');
    for (var key in attributes){
      this.editor.setAttribute(key, attributes[key]);
    }
    this.textarea.parentElement.appendChild(this.editor);
    this.editor.innerText = txt;
    this.editor.innerHTML = this.format(this.editor.innerHTML);
    console.log(this.format(this.editor.innerHTML));
  }
, format: function(txt){
    var exps = {
      '<b>$1</b>': new RegExp(/({|})/, g)
    }
    for (var key in exps){
      return txt.replace(exps[key], key);
    }
  }
}
