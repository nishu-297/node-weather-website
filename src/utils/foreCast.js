let request = require('request');

let foreCast = function (latitude, longitude, callback) {
    //console.log('helloo');
    let url = 'http://api.weatherstack.com/current?access_key=66232458959b6b6b9a92bf22441dde0b&query=' + latitude + ',' + longitude
    //console.log(url);
    request({ url: url, json: true },function(error,response){
      if(error){
       callback('unable to connect to server');
      }else if(response.body.error){
        callback('Unable to Find the location');
      }else{
          callback(undefined,{
              location: response.body.location.name,
              temperature: response.body.current.temperature,
              climate: response.body.current.weather_descriptions[0],
              observationTime : response.body.current.observation_time
          });
      }
    });
}
module.exports =foreCast;