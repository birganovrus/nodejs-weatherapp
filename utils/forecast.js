const request = require('request')

const forecast = (latitude,longitude,callback) =>{

    const url = 'https://api.darksky.net/forecast/777ddfc0794c04583b1766cd703e2b84/' + latitude + ',' + longitude

    request({url, json: true, qs:{"lang":"ru","units":"si"}},(error,{body}) => {
        if(error)
            callback('Невозможно подключиться к серверу', undefined)
            else if(body.error)
                callback('Город не был найден!', undefined)
            else
                callback(undefined,{
                    summary: body.daily.data[0].summary,
                    temperature: body.currently.temperature,
                    rainProbability: body.currently.precipProbability
        })

    })
}

module.exports = forecast