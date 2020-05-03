let request = require('request');

let geoCode = function (address, callback) {
    let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmlzaHUyOTciLCJhIjoiY2s5Yjc3ZzhrMDFtaDNmdGhtejMwbTN5NSJ9.QARiao0fV2569bp1oGuRBQ&limit=1'
    //console.log('check');
    request({ url: url, json: true }, function (error, response) {
        if (error) {
            callback('Unable to Find the Location');

        } else if (response.body.features.length === 0) {
            callback('try out with Diffrent name');
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }

    });

}

module.exports = geoCode;