var Funbrella = require('../funbrella.js');
/*
 * GET home page.
 */
var Root = {
  index: function(req, res){
    app.socket.on('connection', function(conn){
      app.socket.on('gimmie',function(data){
        conn.write(data);
      });
    });
    res.render('index', { title: 'it\'s like watching on the tv.' })
  }
, new: function(req, res){
    app.socket.on('connection', function(conn){
      conn.on('data',function(message){
        app.socket.emit('gimmie', JSON.parse(message));
      });
    });
    res.render('new', { title: 'Send me something' })
  }
, send: function(req, res){
  console.log(req.body);
    if(req.body.content){
      app.socket.emit('gimmie', JSON.stringify(req.body.content));
    }
    res.send(JSON.stringify(req.body.content)+'\n');
  }
, get: function(req, res){
    Funbrella.count( {}, function(e,c){
      c = c-1;
      Funbrella.find({},function(e,fun){
        var n = Math.floor(Math.random() * (c - 0 + 1) + 0)
        res.send(n+': '+fun[(n)]+'\n');
      });
    });
  }
, create: function(req, res){}
}
module.exports = Root;
