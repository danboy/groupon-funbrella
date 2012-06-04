/*
 * GET home page.
 */
var Root = {
  index: function(req, res){
    app.socket.on('connection', function(conn){
      app.socket.on('gimmie',function(data){
        console.log(data);
        conn.write(data);
        app.redis.sadd("funbrella", data);
      });
    });
    res.render('index', { title: 'it\'s like watching on the tv.' })
  }
, new: function(req, res){
    app.socket.on('connection', function(conn){
      conn.on('data',function(message){
        try{
         var msg = JSON.parse(message);
          if(msg.funbrella)
            app.socket.emit('gimmie', msg.funbrella);
        }catch(e){
          console.log(e);
        }
      });
    });

    res.render('new', { title: 'Send me something' })
  }
, list: function(req, res){
    app.redis.smembers( 'funbrella', function(err,results){
      if (err) throw err;
      console.log(results);
      res.render('list', {results: results, title: 'old stuffs'});
    });
  }
, send: function(req, res){
  console.log(req.body);
    if(req.body.content){
      app.socket.emit('gimmie', JSON.stringify(req.body.content));
    }
    res.send(JSON.stringify(req.body.content)+'\n');
  }
, get: function(req, res){
  }
}
module.exports = Root;
