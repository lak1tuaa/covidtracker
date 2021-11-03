const apiKey = process.env.REACT_APP_COVIDACTNOW_API_KEY;
const usingReactServer = process.env.USING_REACT_DEVELOPMENT_SERVER === 'true' ? true : false;

export function fetchData(url) {
    console.log(`Making an Api call to ${url}`);
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
    if(usingReactServer) {
        return fetchData(`https://api.covidactnow.org/v2/country/US.json?apiKey=${apiKey}`);
    } else {
        return fetchData('/api/country/us')
    }
}

export function fetchUSStateData() {
    if(usingReactServer) {
        return fetchData(`https://api.covidactnow.org/v2/states.json?apiKey=${apiKey}`);
    } else {
        return fetchData('/api/state')
    }
}

export function fetchUSTimeSeriesData(){
    if(usingReactServer) {
        return fetchData(`https://api.covidactnow.org/v2/country/US.timeseries.json?apiKey=${apiKey}`);
    } else {
        return fetchData('/api/country/us.timeseries')
    }
}

// Make sure stateAbbr is capitalized
export function fetchStateData(stateAbbr){
    if(usingReactServer) {
        return fetchData(`https://api.covidactnow.org/v2/state/${stateAbbr}.json?apiKey=${apiKey}`);
    } else {
        return fetchData(`/api/state/${stateAbbr}`)
    }
}

export function fetchStateTimeSeriesData(stateAbbr){
    if(usingReactServer) {
        return fetchData(`https://api.covidactnow.org/v2/state/${stateAbbr}.timeseries.json?apiKey=${apiKey}`);
    } else {
        return fetchData(`/api/state/${stateAbbr}.timeseries`)
    }
}

export function fetchStateCounties(stateAbbr){
    if(usingReactServer) {
        return fetchData(`https://api.covidactnow.org/v2/county/${stateAbbr}.json?apiKey=${apiKey}`);
    } else {
        return fetchData(`/api/state/${stateAbbr}/county`)
    }
}