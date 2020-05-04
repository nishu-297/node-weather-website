const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const foreCast = require('./utils/foreCast');

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'))
let app = express();
const port = process.env.PORT || 3000;

//Define path for Express config
let publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handle bars engine and views path
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Nishant Kumar',
        fname: 'Created by Nishant Kumar'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        owner: 'Nishu',
        title: 'Weather App',
        fname: 'Created by Nishant Kumar'
    })
})

app.get('/help', (req, res) => {

    res.render('help', {
        title: 'Help Page',
        fname: 'Created by Nishant Kumar'
    });

})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must give address'
        })
    }

    geoCode(req.query.address, (error, data) => {
        if(error)
        {
            return res.send({error : error});
        }
        foreCast(data.latitude , data.longitude, (error,foreCast)=>{
            if(error)
            {
                return res.send({
                    error : error
                })

            }
            res.send({
                foreCast : foreCast.climate,
                location : data.location,
                address : req.query.address,
                temperature : foreCast.temperature,
                Observation_Time :foreCast.observationTime
                
            })

        })
    })
    //console.log(req.query.address);
    // res.send({
    //     weather: '41',
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        ename: 'No help page found',
        fname: 'Created by Nishant Kumar'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        ename: 'Page not Found',
        fname: 'created by Nishu'
    })
})

// app.listen(3000, () => {
//     console.log('Server started');
// })
app.listen(port, () => {
    console.log('Server started on port '+port);
})