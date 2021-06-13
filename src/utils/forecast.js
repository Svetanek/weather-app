const request = require('postman-request');


const forecast = (lat, long, callback) => {
  // const url2 = `http://api.weatherstack.com/current?access_key=0eb1efbeffde474d5d354eebd6207c70&query=40.3500,-73.5700&units=f`;
  const url2 = `http://api.weatherstack.com/current?access_key=0eb1efbeffde474d5d354eebd6207c70&query=${lat},${long}&units=f`
  request({url:url2,  json:true}, (error, response) => {
    // const data = JSON.parse(response.body)
    if(error) {
    callback('Unable to connect to the weather service ', undefined)
    }
    else if (response.body.error) {
      callback('Unable to locate location', undefined)
    }
    else {
      const data = response.body.current
      callback(undefined, `Currently it is ${data.temperature} degrees and ${data.precip * 100}% chance of rain. ${data.wind_dir} wind.`)
      // console.log(`Currently it is ${data.temperature} degrees and ${data.precip * 100}% chance of rain. ${data.wind_dir} wind, speed = ${data.wind_speed}mph`
    }
})
}
module.exports = forecast
