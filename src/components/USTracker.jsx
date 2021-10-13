import React, { useState, useEffect } from 'react';
import QuickInfo from './QuickInfo';
import LineBarGraph from './LineBarGraph';
import USHeatMap from './USHeatMap';
import { fetchUSCovidData, fetchUSStateData, fetchUSTimeSeriesData } from '../api/CovidAPI';
import { addRollingAverageToTimeSeriesData, parseDate, numberWithCommas } from './common/lib';
import { abbrToState } from './maps/stateabbreviations';
import SortableTable from './SortableTable';
import './style/tracker.css';

function USTracker() {
  const [newCases, setNewCases] = useState(0);
  const [vaccinations, setVaccinations] = useState(0);
  const [icuCapacity, setIcuCapacity] = useState(0);
  const [lastUpdatedDate, setLastUpdatedDate] = useState();

  const [stateInfo, setStateInfo] = useState([])
  const [usTimeSeriesData, setUsTimeSeriesData] = useState([])

  useEffect(() => {
    fetchUSCovidData()
      .then(data => {
        setNewCases(data.actuals.newCases);
        setVaccinations(data.actuals.vaccinationsInitiated);
        setIcuCapacity(data.metrics.icuCapacityRatio);
        setLastUpdatedDate(parseDate(data.lastUpdatedDate));
      })
    fetchUSTimeSeriesData()
      .then(data => {
        addRollingAverageToTimeSeriesData(data.actualsTimeseries)
        setUsTimeSeriesData(data.actualsTimeseries)
      })
    fetchUSStateData()
      .then(data => setStateInfo(data))
  }, []);
  
  return (
    <div className="container">
      <h1 className="title">United States COVID-19 Tracker</h1>
      <QuickInfo 
        vaccinations={vaccinations} 
        newcases={newCases}
        icucapacity={icuCapacity} 
        lastUpdatedDate={lastUpdatedDate}
      />
      <USHeatMap usstateinfo={stateInfo}/>
      <LineBarGraph 
        width={600} 
        height={400} 
        data={usTimeSeriesData}
        name={"United States"} 
        id={"svgGraph01"}
      />
      <SortableTable
        data={stateInfo}
        config={tableConfig}
      />
    </div>
  )  
}

const tableConfig = [
  {
    colName:"Name",
    dataAccess:(d) => abbrToState[d.state],
    sortFunction:(a, b) => {
        let aStateName = abbrToState[a.state]
        let bStateName = abbrToState[b.state]
        if(aStateName < bStateName) return -1;
        if(aStateName > bStateName) return 1;
        return 0;
    }
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
];

export default USTracker