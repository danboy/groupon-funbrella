/**
 * Module dependencies.
 */

var express   = require('express')
  , sockjs    = require('sockjs')
  , _         = require('underscore')
  , backbone  = require('backbone')
  , routes    = require('./routes');

var app = module.exports = express.createServer();

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

global.app = app;
// Routes

app.get('/', routes.index);
app.get('/new', routes.new);
app.get('/update', routes.new);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
