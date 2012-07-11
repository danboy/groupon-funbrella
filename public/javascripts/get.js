var Get = {};

Get.Weather = function(container){
  var url = "http://api.wunderground.com/api/5b43b6f707668880/";
  var self = this;
  $.ajax({  url: url+'conditions/forecast/q/60647.json'
          , dataType: "jsonp"
          , success: function(data){
            console.log(data,self);
            self.buildFragment(data.current_observation, data.forecast.simpleforecast, function(fragment){$(container).html(fragment)});
          }
  });
}
Get.Weather.prototype = {
  buildFragment: function( current, fc , cb ){
    console.log(current.temp_f);
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
    console.log(fc);
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

Get.News = function(container, category){
  this.container = $(container);
  this.fetch(category);
  var self = this;
  setInterval(function(){self.fetch(category);},60000);
};

Get.News.prototype ={
  fetch: function(category){
  var self = this;
  $.ajax({  url: 'http://api.feedzilla.com/v1/categories/'+category+'/articles.json?count=10'
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
}
