require('dotenv').config();
const apiKey = process.env.REACT_APP_COVIDACTNOW_API_KEY

const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'build')));


app.listen(port, () => {
    console.log(`CovidTracker listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'build','index.html'));
})

function fetchData(url){
    return fetch(url)
        .then(response => {
            const status = response.status;
            if (status >= 200 || status < 300) {
                return response.json();
            } else {
                console.log(response)
                throw Error(status);
            }
        })
        .catch(reason => {
            console.log(`fetchData has caught an exception, reason: ${reason}`)
        })
}

app.get('/api/country/us', (req, res) => {
    fetchData(`https://api.covidactnow.org/v2/country/US.json?apiKey=${apiKey}`)
        .then(json => res.json(json))
})

app.get('/api/state', (req,res) => {
    fetchData(`https://api.covidactnow.org/v2/states.json?apiKey=${apiKey}`)
        .then(json => res.json(json))
})

app.get('/api/country/us.timeseries', (req,res) => {
    fetchData(`https://api.covidactnow.org/v2/country/US.timeseries.json?apiKey=${apiKey}`)
        .then(json => res.json(json))
})

app.get('/api/state/:stateAbbr', (req, res) => {
    let stateAbbr = req.params.stateAbbr
    fetchData(`https://api.covidactnow.org/v2/state/${stateAbbr}.json?apiKey=${apiKey}`)
        .then(json => res.json(json))
})

app.get('/api/state/:stateAbbr.timeseries', (req, res) => {
    let stateAbbr = req.params.stateAbbr
    fetchData(`https://api.covidactnow.org/v2/state/${stateAbbr}.timeseries.json?apiKey=${apiKey}`)
        .then(json => res.json(json))
})

app.get('/api/state/:stateAbbr/county', (req, res) => {
    let stateAbbr = req.params.stateAbbr
    fetchData(`https://api.covidactnow.org/v2/county/${stateAbbr}.json?apiKey=${apiKey}`)
        .then(json => res.json(json))
})