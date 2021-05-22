const request = require('postman-request');    

const geoCode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoia2luanU0Mzc0IiwiYSI6ImNrb3Y5dTZ6bjAwcGwyd2xrdGZkbHNmeWYifQ.7narQvheQEjr53fUArghmA&limit=1';

    request({url, json : true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!');
        } else if(body.features.length === 0){
            callback('Unable to find location. Please try with different address')
        } else{
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const location = body.features[0].place_name;

            callback(undefined, {
                latitude:latitude,
                longitude:longitude,
                location:location
            });

        }
    })

}


module.exports = geoCode;