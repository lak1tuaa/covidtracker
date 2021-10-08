import React from 'react';
import { useState } from 'react';
import StateHeatMap from './StateHeatMap'
import { useParams } from 'react-router-dom';
import { abbrToState } from './maps/stateabbreviations';
import { useEffect } from 'react/cjs/react.development';
import { fetchStateTimeSeriesData, fetchStateData, fetchStateCounties } from '../api/CovidAPI';

function StateTracker() {
    const [stateAbbr, setStateAbbr] = useState(useParams().abbr.toUpperCase());
    const [stateData, setStateData] = useState([]);
    const [stateTimeSeriesData, setStateTimeSeriesData] = useState([]);
    const [stateCountiesData, setStateCountiesData] = useState([])
    
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
                setStateData(d);
            });
    }, [stateAbbr]);

    useEffect(() => {
        fetchStateTimeSeriesData(stateAbbr)
            .then((d) => {
                setStateTimeSeriesData(d);
            });
    }, [stateAbbr]);

    useEffect(() => {
        fetchStateCounties(stateAbbr)
            .then((d) => {
                setStateCountiesData(d);
            });
    }, []);

    return (
        <div>
            <h1>State Tracker page</h1>
            <p>{ stateName }</p>
            <StateHeatMap 
                state={stateAbbr}
                stateCountiesData={stateCountiesData}
            />
        </div>
    )
}

export default StateTracker;