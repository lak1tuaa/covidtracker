import React, { useState, useEffect } from 'react';
import QuickInfo from './QuickInfo';
import USStateTable from './USStateTable';
import LineBarGraph from './LineBarGraph';
import USHeatMap from './USHeatMap';
import { fetchUSCovidData, fetchUSStateData, fetchUSTimeSeriesData } from '../api/CovidAPI';
import { addRollingAverageToTimeSeriesData, parseDate } from './common/lib';

function USTracker() {
  const [newCases, setNewCases] = useState(0);
  const [vaccinations, setVaccinations] = useState(0);
  const [lastUpdatedDate, setLastUpdatedDate] = useState();

  const [stateInfo, setStateInfo] = useState([])
  const [usTimeSeriesData, setUsTimeSeriesData] = useState([])

  useEffect(() => {
    fetchUSCovidData()
      .then(data => {
        setNewCases(data.actuals.newCases);
        setVaccinations(data.actuals.vaccinationsInitiated);
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
    <div className="App">
      <h1>United States COVID-19 Tracker</h1>
      <QuickInfo vaccinations={vaccinations} newcases={newCases} lastUpdatedDate={lastUpdatedDate}/>
      <USHeatMap usstateinfo={stateInfo}/>
      <LineBarGraph width={600} height={400} data={usTimeSeriesData} id={"svgGraph01"}/>
      <USStateTable usstateinfo={stateInfo}/>
    </div>
  )  
}

export default USTracker