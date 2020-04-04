const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

console.log(__dirname)

// Define Paths for Express configs
const publicFolder = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static Directory
app.use(express.static(publicFolder))

//const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address)+'.json?access_token=pk.eyJ1Ijoid2lja2Vka25vY2siLCJhIjoiY2s4MGVtMm10MGY4eTNmbnFmOG43YmtneSJ9.i8mFvnANo17M6Y2ybB0y2A'

app.get('',(req,res)=>{


    res.render('index',{
        title:'Weather App',
        name: 'saad'
    })

})

app.get('/about',(req,res)=>{



    res.render('about',{
        title: "About",
        name:"saad"
    })


})


app.get('/help',(req,res)=>{

    res.render('help',{
        title:"Help",
        name:"saad"
    })


})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: "Please provide address"
        })

    }
   
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{

        if(error){
            return res.send({
                error
            })
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            })


        })
    })

    

})


app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'Provide search term'
        })
    }

    console.log(req.query.search)

    res.send({
            products:[]
    })

})


app.get('/help/*',(req,res)=>{

    res.render('404',{
        error:"Article Not Found"
    })
})


app.get('*',(req,res)=>{

    res.render('404',{
        error:"404 PAGE NOT FOUND"
    })


})

app.listen(3000,()=>{



})