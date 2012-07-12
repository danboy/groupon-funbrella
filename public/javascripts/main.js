var Funbrella = Funbrella || {};

Funbrella.list = function(list,speed){
  this.frame = 0;
  this.max = list.length-1;
  this.list = list;
  list.each(function(index, item){
    $(item).hide();
    console.log(item);
  });
  this.animate();
  setInterval(function(){this.animate()}.bind(this),speed);
}

Funbrella.list.prototype = {
  animate: function(item){
    $(this.list).hide();
    $(this.list[this.frame]).show();
    (this.frame === this.max) ? this.frame = 0 : this.frame++;
    return this.frame;
  }
};
