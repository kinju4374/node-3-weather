const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');


const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Kinjan Bhavsar'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About me',
        name: 'Kinjan Bhavsar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText:'This is some help text',
        title: 'Help',
        name :'Kinjan Bhavsar'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address){
        return res.send({
            error:'Address must be provided'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecast_data) => {
            if(error){
                return res.send({error});
            }

            res.send({
                forecast : forecast_data,
                location,
                address : req.query.address
            })
        })
    });
});
app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error:'You must provide a search item'
        })
    }

    console.log(req.query.search);
    res.send({
        products:[]
    })
})

//Show pages which are not available in app

app.get('/help/*', (req, res) => {
    res.render('404',{
        title : '404',
        name : 'Kinjan Bhavsar',
        errorMessage : 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Kinjan Bhavsar',
        errorMessage : 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});