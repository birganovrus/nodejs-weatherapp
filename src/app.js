const express = require('express')
const path = require('path')
const clk = require('chalk')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')
const imsearch = require('../utils/imagesearch')


const app = express()
const port = process.env.PORT || 3000
app.set('view engine','hbs')


//Custom path for files
const PublicFilesPath = path.join(__dirname,'../public')
const ViewsPath = path.join(__dirname,'../templates')
const PartialsPath = path.join(__dirname,'../templates/partials')

hbs.registerPartials(PartialsPath)
app.use(express.static(PublicFilesPath))
app.set('views', ViewsPath)

app.get('',(req,res) =>{
    res.render('index',{name: 'Ruslan', title:'Home page'})
})

app.get('/about',(req,res) =>{
    res.render('about',{title:'About page'})
})

app.get('/weather',(req,res) =>{
    //res.render('index',{title:'Weather page'})

    //The  "={}" ES6 poiner makes parameters exist even if they are not assigned
        geocode(req.query.address,(error,{latitude,longitude, location} ={}) =>{
            if(!error){
            forecast(latitude,longitude,(error,forecastData) =>{
                if(!error){
                    res.send({
                        forecast: forecastData.summary,
                        status: forecastData.status,
                        wind: forecastData.wind + " km/h",
                        temperature: forecastData.temperature + " °C.",
                        humidity: forecastData.humidity * 100 + '%',
                        address: location,
                        probability: forecastData.rainProbability * 100 + '%'
                    })
                }
                else
                res.send({error})
            })
        
            }
            else
            res.send({error})
        })
})

app.get('/usesearch',(req,res)=>{
    imsearch(req.query.address,(error,data) =>{
        if(!error){
            res.send({
                imurl: data.imageurl
            })
        }
        else res.send({error})
    }) 
})

app.get('*',(req,res) =>{
    res.render('404',{
        title: '404, bro'
    })
})

app.listen(port, () =>{
    console.log(clk.green.inverse.bold('Server has started on port: ' + port))
})