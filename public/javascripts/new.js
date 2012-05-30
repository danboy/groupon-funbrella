var sock = new SockJS(window.location.origin + '/gimmie/');
$('#send').click(function(ev){
  ev.preventDefault();
  var text = $('form textarea').val()
  var data = {"funbrella": text.replace(/(\r|\n|\r\n)/gm, '')};
  sock.send(JSON.stringify(data));
});
sock.onclose = function(c){
  console.log(c);
  sock = new SockJS(window.location.origin + '/gimmie/');
};
