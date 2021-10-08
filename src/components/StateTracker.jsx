import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { abbrToState } from './maps/stateabbreviations';
import { useEffect } from 'react/cjs/react.development';
import { fetchStateTimeSeriesData, fetchStateData, fetchStateCounties } from '../api/CovidAPI';
import StateHeatMap from './StateHeatMap'
import QuickInfo from './QuickInfo';

import{ timeParse } from 'd3';

const parseDate = timeParse('%Y-%m-%d');

function StateTracker() {
    const [stateAbbr, setStateAbbr] = useState(useParams().abbr.toUpperCase());
    const [stateData, setStateData] = useState([]);
    const [stateTimeSeriesData, setStateTimeSeriesData] = useState([]);
    const [stateCountiesData, setStateCountiesData] = useState([]);

    const [newCases, setNewCases] = useState(0);
    const [vaccinations, setVaccinations] = useState(0);
    const [lastUpdatedDate, setLastUpdatedDate] = useState();
    
    const stateName = abbrToState[stateAbbr];

    // This is called a destructuring assignment. The function call to useParams() returns
    // an object with { abbr: "the_abbr_from_the_url"}, and this shortens the syntax to
    // assign abbr from:
    // let abbr = useParams().abbr
    const { abbr } = useParams();

    useEffect(() => {
        const upperAbbr = abbr.toUpperCase();
        setStateAbbr(upperAbbr);
    })

    useEffect(() => {
        fetchStateData(stateAbbr)
            .then((d) => {
                console.log(d)
                setStateData(d);
                setNewCases(d.actuals.newCases);
                setVaccinations(d.actuals.vaccinationsInitiated);
                setLastUpdatedDate(parseDate(d.lastUpdatedDate));
            });
        fetchStateTimeSeriesData(stateAbbr)
            .then((d) => {
                setStateTimeSeriesData(d);
            });
        fetchStateCounties(stateAbbr)
            .then((d) => {
                setStateCountiesData(d);
            });
    }, [stateAbbr]);

    return (
        <div>
            <h1>State Tracker page</h1>
            <p>{ stateName }</p>
            <QuickInfo 
                lastUpdatedDate={lastUpdatedDate}
                vaccinations={vaccinations}
                newcases={newCases}
            />
            <StateHeatMap 
                state={stateAbbr}
                stateCountiesData={stateCountiesData}
            />
        </div>
    )
}

export default StateTracker;