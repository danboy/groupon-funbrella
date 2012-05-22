var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/funbrella');

var Schema = mongoose.Schema;

var Funbrella = new Schema({
  html: { type: String, required: false }
, css:  { type: String, required: false }
, js:   { type: String, required: false }
, date: { type: Date, default: Date.now()}
});

module.exports = mongoose.model('Funbrella', Funbrella);
