const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3ZldGFuZWsiLCJhIjoiY2p2Mmo0MGpmMjVzaDN5c2szYWZ3eXR3aCJ9.65wSbSrHvkbCI3EBVstrxQ&limit=1`

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
          const [long, lat] = body.features[0].center;
            callback(undefined, {
                latitude: lat,
                longitude: long,
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
