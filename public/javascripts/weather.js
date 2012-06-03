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
, getIcon: function(icon){
    var iconMap = {'mostlysunny': ['cloudy1.png'],'partlycloudy':['cloudy2.png'], partlysunny: ['cloudy3.png'], mostlycloudy: ['cloudy4.png'], cloudy: ['cloudy5.png'],sunny: ['sunny.png'], tstorms: ['tstorm2.png'] }
    var path = '/images/weather/tick/';
    return $('<img/>',{'class': 'icon', src: path+iconMap[icon][Math.floor(Math.random()*iconMap[icon].length)]});

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
