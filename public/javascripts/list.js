var sock = new SockJS(window.location.origin + '/gimmie/');
$('#previous li').each(function(index, item){
  var text = $(item).data('value');
  if(text != 'undefined'){
  var data = {"funbrella": text};
  $(item).find('.send').each(function(i, send){
    $(send).click(function(ev){
      ev.stopPropagation();
      sock.send(JSON.stringify(data));
    });
  });
  }
});
sock.onclose = function(c){
  console.log(c);
  sock = new SockJS(window.location.origin + '/gimmie/');
};
