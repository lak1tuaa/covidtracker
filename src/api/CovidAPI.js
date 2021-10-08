const apiKey = process.env.REACT_APP_COVIDACTNOW_API_KEY;

export function fetchData(url) {
    //console.log(`Making an Api call to ${url}`);
    return fetch(url)
        .then(response => {
            const status = response.status;
            if (status >= 200 || status < 300) {
                return response.json();
            } else {
                throw Error(status);
            }
        });
}

export function fetchUSCovidData() {
    return fetchData(`https://api.covidactnow.org/v2/country/US.json?apiKey=${apiKey}`);
}

export function fetchUSStateData() {
    return fetchData(`https://api.covidactnow.org/v2/states.json?apiKey=${apiKey}`);
}

export function fetchUSTimeSeriesData(){
    return fetchData(`https://api.covidactnow.org/v2/country/US.timeseries.json?apiKey=${apiKey}`);
}

// Make sure stateAbbr is capitalized
export function fetchStateData(stateAbbr){
    return fetchData(`https://api.covidactnow.org/v2/state/${stateAbbr}.json?apiKey=${apiKey}`);
}

export function fetchStateTimeSeriesData(stateAbbr){
    return fetchData(`https://api.covidactnow.org/v2/state/${stateAbbr}.json?apiKey=${apiKey}`);
}

export function fetchStateCounties(stateAbbr){
    return fetchData(`https://api.covidactnow.org/v2/county/${stateAbbr}.json?apiKey=${apiKey}`);
}