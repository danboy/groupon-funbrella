/**
 * Module dependencies.
 */

var express   = require('express')
  , sockjs    = require('sockjs')
  , _         = require('underscore')
  , redis     = require('redis')
  , backbone  = require('backbone')
  , routes    = require('./routes');

var app = module.exports = express.createServer();

app.redis = redis.createClient();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

var socket_opts = {sockjs_url: "http://majek.github.com/sockjs-client/sockjs-latest.min.js"}
app.socket = sockjs.createServer(socket_opts);
app.socket.installHandlers(app, {prefix: '/gimmie'} );

app.socket.on('connection', function(conn){
  app.socket.on('gimmie', function(data){
    if(typeof(data) == 'object'){
      conn.write(JSON.stringify(data));
    }else{
      conn.write(data);
    }
    app.redis.sadd("funbrella", data);
  });
});

global.app = app;
// Routes

app.get('/', routes.index);
app.get('/new', routes.new);
app.get('/update', routes.new);
app.post('/send', routes.send);
app.post('/get', routes.get);
app.get('/list', routes.list);
app.get('/actions', routes.actions);

app.get('/test', function(req,res){res.render('test',{title: 'test'})})
app.listen(3456, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
