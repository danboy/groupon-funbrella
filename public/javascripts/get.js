var Get = {};

Get.Weather = function(container){
  var url = "http://api.wunderground.com/api/5b43b6f707668880/";
  var self = this;
  $.ajax({  url: url+'conditions/forecast/q/60647.json'
          , dataType: "jsonp"
          , success: function(data){
            self.buildFragment(data.current_observation, data.forecast.simpleforecast, function(fragment){$(container).html(fragment)});
          }
  });
}
Get.Weather.prototype = {
  buildFragment: function( current, fc , cb ){
    fragment = $('<div/>');
    heading = $('<h1/>',{'class': 'temp', text: current.temp_f});
    heading.append($('<small/>',{'class': 'condition', text: current.weather}));
    fragment.append(this.getIcon(current.icon));
    fragment.append(heading);
    fragment.append(this.getForecast(fc));
    cb(fragment);
  }
, getIcon: function(icon, time){
    var time = time || 'day';
    var iconMap = { 'chancerain': ['shower1.png']
                  , 'chancetstorms': ['tstorm1.png']
                  , 'chancesnow': ['snow4.png']
                  , 'chanceflurries': ['snow1.png']
                  , 'chancesleet': ['sleet.png']
                  , 'clear': ['sunny.png']
                  , 'sunny': ['sunny.png']
                  , 'rain': ['shower3.png']
                  , 'mostlysunny': ['cloudy1.png']
                  , 'partlycloudy':['cloudy2.png']
                  , 'partlysunny': ['cloudy3.png']
                  , 'mostlycloudy': ['cloudy4.png']
                  , 'fog': ['fog.png']
                  , 'hazy': ['fog.png']
                  , 'unknown': ['dunno.png']
                  , 'cloudy': ['cloudy5.png']
                  , 'sunny': ['sunny.png']
                  , 'snow': ['snow4.png']
                  , 'flurries': ['snow1.png']
                  , 'sleet': ['sleet.png']
                  , 'tstorms': ['tstorm2.png'] }
    var path = '/images/weather/tick/';
    var version = (time == 'day') ? '0' : '1';
    return $('<img/>',{'class': 'icon', src: path+iconMap[icon][version]});

  }
, getForecast: function(fc){
    var self = this;
    var forecast = $('<ul/>',{'class': 'forecast'});
    $(fc.forecastday).each(function(index,day){
      var weather = $('<li/>',{'class': day.icon});
      weather.append($('<h2/>',{text: day.date.weekday_short}));
      var icon = $('<figure/>');
      icon.append(self.getIcon(day.icon));
      icon.append($('<figcaption/>',{text: day.high.fahrenheit+'/'+day.low.fahrenheit}));
      weather.append(icon);
      forecast.append(weather);
    });
    return forecast;
  }
}

Get.News = function(container, options){
  this.container = $(container);
  this.options = $.extend( {
    category: 22
  , type: 0
  , query: 'groupon'
  , count: 10
  }, options);

  this.buildUrl();
  var self = this;
  setInterval(function(){self.fetch();},60000);
};

Get.News.prototype ={
  fetch: function(){
  var self = this;
  $.ajax({  url: this.url 
          , dataType: "jsonp"
          , success: function(data){
            self.render(self.choose(data.articles));
          }
  });
  }
, choose: function(articles){
    return articles[Math.floor((Math.random()*articles.length))];
  }
, render: function(article){
  var snippet = $('<article />',{'class': 'news'});
  var headline = $('<h2/>',{text: article.title});
  var text = $('<p/>',{text: article.summary});
  snippet.append(headline).append(text);
  $(this.container).html(snippet);
  }
, buildUrl: function(){
    switch(this.options.type){
      case 'search':
        this.url = 'http://api.feedzilla.com/v1/categories/'+this.options.category+'/articles/search.json?count='+this.options.count+'&q='+this.options.query
        break;
      default:
        this.url = 'http://api.feedzilla.com/v1/categories/'+this.options.category+'/articles.json?count='+this.options.count
        break;
    }
    this.fetch();

  }
}
//http://imgur.com/gallery/top/all.xml
//

Get.Image = function(container){
  this.container = $(container);
  this.fetch();
  var self = this;
  setInterval(function(){self.fetch();},60000);
};

Get.Image.prototype ={
  fetch: function(){
  var self = this;
  $.ajax({  url: 'http://imgur.com/gallery/top/all.json'
          , type: "GET"
          , dataType: "json"
          , success: function(data){
            console.log(JSON.parse(data));
            console.log(self.choose(data.gallery));
          }
          , error: function(e,o,t){
            console.log(e,o,t);
          }
          , complete: function(d){
            console.log(d);
          }
  });
  }
, choose: function(gallery){
    return gallery[Math.floor((Math.random()*gallery.length))];
  }
, render: function(image){
    console.log(image)
    var snippet = $('<img />',{'class': 'imgur', 'src': image});
    $(this.container).html(snippet);
}
}
