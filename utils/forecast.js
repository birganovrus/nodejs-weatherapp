const request = require('request')

const forecast = (latitude,longitude,callback) =>{

    const url = 'https://api.darksky.net/forecast/777ddfc0794c04583b1766cd703e2b84/' + latitude + ',' + longitude

    request({url, json: true, qs:{"lang":"en","units":"si"}},(error,{body}) => {
        if(error)
            callback('Невозможно подключиться к серверу', undefined)
            else if(body.error)
                callback('Город не был найден!', undefined)
            else
                callback(undefined,{
                    summary: body.currently.summary,
                    wind: body.currently.windSpeed,
                    humidity: body.currently.humidity,
                    state: body.currently.icon,
                    temperature: body.currently.temperature,
                    rainProbability: body.currently.precipProbability
        })

    })
}

module.exports = forecast

