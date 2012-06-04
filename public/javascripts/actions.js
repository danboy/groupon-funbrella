var sock = new SockJS(window.location.origin + '/gimmie/');
$('ul#actions li').each(function(index,button){
  $(button).click(function(ev){
    ev.preventDefault();
    var data = JSON.stringify($($(button)[0]).data('action'));
    sock.send(data);
    console.log(data);
  });
});
sock.onclose = function(c){
  console.log(c);
  sock = new SockJS(window.location.origin + '/gimmie/');
};
