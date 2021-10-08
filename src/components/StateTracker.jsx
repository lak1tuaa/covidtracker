import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { abbrToState } from './maps/stateabbreviations';
import { fetchStateTimeSeriesData, fetchStateData, fetchStateCounties } from '../api/CovidAPI';
import StateHeatMap from './StateHeatMap'
import QuickInfo from './QuickInfo';
import LineBarGraph from './LineBarGraph';

import { addRollingAverageToTimeSeriesData, parseDate } from './common/lib';

function StateTracker() {
    const [stateAbbr, setStateAbbr] = useState(useParams().abbr.toUpperCase());
    const [stateData, setStateData] = useState([]);
    const [stateTimeSeriesData, setStateTimeSeriesData] = useState([]);
    const [stateCountiesData, setStateCountiesData] = useState([]);

    const [newCases, setNewCases] = useState(0);
    const [vaccinations, setVaccinations] = useState(0);
    const [lastUpdatedDate, setLastUpdatedDate] = useState();
    
    const stateName = abbrToState[stateAbbr];
    const { abbr } = useParams();

    useEffect(() => {
        const upperAbbr = abbr.toUpperCase();
        setStateAbbr(upperAbbr);
    })

    useEffect(() => {
        fetchStateData(stateAbbr)
            .then((d) => {
                setStateData(d);
                setNewCases(d.actuals.newCases);
                setVaccinations(d.actuals.vaccinationsInitiated);
                setLastUpdatedDate(parseDate(d.lastUpdatedDate));
            });
        fetchStateTimeSeriesData(stateAbbr)
            .then((d) => {
                addRollingAverageToTimeSeriesData(d.actualsTimeseries)
                setStateTimeSeriesData(d.actualsTimeseries);
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
            <LineBarGraph width={600} height={400} data={stateTimeSeriesData} id={"svgGraph02"}/>
        </div>
    )
}

export default StateTracker;