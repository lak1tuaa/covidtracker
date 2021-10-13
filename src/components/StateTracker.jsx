import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { abbrToState } from './maps/stateabbreviations';
import { fetchStateTimeSeriesData, fetchStateData, fetchStateCounties } from '../api/CovidAPI';
import StateHeatMap from './StateHeatMap'
import QuickInfo from './QuickInfo';
import LineBarGraph from './LineBarGraph';

import { addRollingAverageToTimeSeriesData, parseDate, numberWithCommas } from './common/lib';
import SortableTable from './SortableTable';
import './style/tracker.css';
import { propTypes } from 'react-bootstrap/esm/Image';

function StateTracker() {
    const [stateAbbr, setStateAbbr] = useState(useParams().abbr.toUpperCase());
    const [stateTimeSeriesData, setStateTimeSeriesData] = useState([]);
    const [stateCountiesData, setStateCountiesData] = useState([]);

    const [newCases, setNewCases] = useState(0);
    const [vaccinations, setVaccinations] = useState(0);
    const [icuCapacity, setIcuCapacity] = useState(0);
    const [lastUpdatedDate, setLastUpdatedDate] = useState();
    
    const stateName = abbrToState[stateAbbr];
    const { abbr } = useParams();

    useEffect(() => {
        const upperAbbr = abbr.toUpperCase();
        setStateAbbr(upperAbbr);
    }, [abbr])

    useEffect(() => {
        fetchStateData(stateAbbr)
            .then((d) => {
                setNewCases(d.actuals.newCases);
                setVaccinations(d.actuals.vaccinationsInitiated);
                setIcuCapacity(d.metrics.icuCapacityRatio);
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
        <div className="container tracker">
            <h1 className="title">{stateName} COVID-19 Tracker</h1>
            <QuickInfo 
                lastUpdatedDate={lastUpdatedDate}
                vaccinations={vaccinations}
                newcases={newCases}
                icucapacity={icuCapacity}
            />
            <StateHeatMap 
                state={stateAbbr}
                stateCountiesData={stateCountiesData}
            />
            <LineBarGraph 
                width={600} 
                height={400} 
                data={stateTimeSeriesData}
                name={stateName}
                id={"svgGraph02"}
            />
            <SortableTable
                data={stateCountiesData}
                config={tableConfig}
            />
        </div>
    )
}

const tableConfig = [
    {
        colName:"Name",
        dataAccess:(d) => d.county,
        sortFunction: (a, b) => {
            if(a.county < b.county) return -1;
            if(a.county > b.county) return 1;
            return 0;
        },
        // sortFunction: (a, b) => a.fips - b.fips,
    },
    {
        colName:"New Cases",
        dataAccess:(d) => numberWithCommas(d.actuals.newCases),
        sortFunction: (a, b) => b.actuals.newCases - a.actuals.newCases,
    },
    {
        colName:"Vaccinations",
        dataAccess:(d) => numberWithCommas(d.actuals.vaccinationsInitiated),
        sortFunction: (a, b) => b.actuals.vaccinationsInitiated - a.actuals.vaccinationsInitiated,
    },
    {
        colName:"Deaths",
        dataAccess:(d) => numberWithCommas(d.actuals.deaths),
        sortFunction:(a, b) => b.actuals.deaths - a.actuals.deaths,
    }
]

export default StateTracker;