
/*
 * GET home page.
 */
var Root = {
  index: function(req, res){
    app.socket.on('connection', function(conn){
      app.socket.on('gimmie',function(data){
        conn.write(data);
      });
      conn.on('data',function(message){
        app.socket.emit('gimmie', JSON.parse(message));
      });
    });
    res.render('index', { title: 'it\'s like watching on the tv.' })
  }
, new: function(req, res){
    res.render('new', { title: 'Send me something' })
  }
, send: function(req, res){
    if(req.body.content){
      app.socket.on('connection', function(conn){
        conn.write(req.body.content)
      });
    }
  }
}
module.exports = Root;
