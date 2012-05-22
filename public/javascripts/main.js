var Funbrella = Funbrella || {};

Funbrella.list = function(list){
  this.frame = 0;
  this.max = list.length;
  this.list = list;
  list.each(function(index, item){
    $(item).hide();
    console.log(item);
  });
}

Funbrella.list.prototype = {
  animate: function(item){
    this.frame++;
  }
};
