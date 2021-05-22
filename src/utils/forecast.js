const request = require('postman-request');
const forecast = (lat, lng, callback) => {
    const url = 'http://api.weatherstack.com/forecast?access_key=c7b6fd3a47991d5ae37c581bfcbbda3d&query='+ encodeURIComponent(lat) +','+ encodeURIComponent(lng) +'&units=f';

    request({url, json : true}, (error, { body }) => {
      if(error){
          callback('Unable to connect to weather service.');
      } else if(body.error){
          callback('Unable to find location');
      } 
      else {
          callback(undefined, body.current.weather_descriptions[0] +'. It is currenlty ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The humidity is ' +body.current.humidity);
      }
  })
}

module.exports = forecast;