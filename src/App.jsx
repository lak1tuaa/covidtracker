import React, { useState, useEffect } from 'react';
import QuickInfo from './components/QuickInfo';
import USStateTable from './components/USStateTable';
import LineBarGraph from './components/LineBarGraph';
import USHeatMap from './components/USHeatMap';
import { fetchUSCovidData, fetchUSStateData, fetchUSTimeSeriesData } from './api/CovidAPI';
import * as d3 from 'd3';

console.log(process.env.REACT_APP_API_KEY);

const parseDate = d3.timeParse("%Y-%m-%d");

function calculateRollingAverage(data, key, start, end){
  let sum = 0;
  for(var i = start; i <= end; i++) {
      if(data[i][key]){
          sum += data[i][key]
      }
  }
  return sum / (end - start + 1)
}

function App() {
  const [newCases, setNewCases] = useState(0);
  const [vaccinations, setVaccinations] = useState(0);

  const [stateInfo, setStateInfo] = useState([])
  const [usTimeSeriesData, setUsTimeSeriesData] = useState([])

  useEffect(() => {
    fetchUSCovidData()
      .then(data => {
        setNewCases(data.actuals.newCases)
        setVaccinations(data.actuals.vaccinationsInitiated)
      })
  }, []);

  useEffect(() => {
    fetchUSStateData()
      .then(data => setStateInfo(data))
  }, []);

  useEffect(() => {
    fetchUSTimeSeriesData()
      .then(data => {
        let timeSeriesData = data.actualsTimeseries;
        timeSeriesData.map((d,i) => {
          d.date = parseDate(d.date);
          let rollingAverage = null;
          if (i >= 6) {
            rollingAverage = calculateRollingAverage(timeSeriesData, "newCases", i - 6, i)
          }
          d.rollingAverage = rollingAverage;
          return d;
        })
        setUsTimeSeriesData(data.actualsTimeseries)
      })
  }, []);
  
  return (
    <div className="App">
      <h1>United States COVID-19 Tracker</h1>
      <QuickInfo vaccinations={vaccinations} newcases={newCases}/>
      <USHeatMap usstateinfo={stateInfo}/>
      <LineBarGraph width={600} height={400} data={usTimeSeriesData} id={"svgGraph01"}/>
      <USStateTable usstateinfo={stateInfo}/>
    </div>
  )  
}

export default App