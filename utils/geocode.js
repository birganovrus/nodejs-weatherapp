const request = require('request')

const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +address+'.json?access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g&cachebuster=1572902639054&autocomplete=false&limit=1'
    request({url, json: true}, (error, {body}) => {
        if(error)
            callback('Невозможно подключиться к серверу', undefined)
            else if(body.features.length === 0)
                callback('Город не был найден',undefined)
                else 
                callback(undefined,{
                    longitude: body.features[0].center[0],
                    latitude:  body.features[0].center[1],
                    location:  body.features[0].place_name,
                    cityname: body.features[0].text
                })

                
    })
}

module.exports = geocode