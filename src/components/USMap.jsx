import React from 'react';
import {geoAlbersUsa, geoPath} from 'd3';
import './style/usmap.css';
import {stateToAbbr} from './maps/stateabbreviations';
import USMapState from './USMapState';

function USMap(props) {
  // Note: getting the data using require, will cause the browser to cache the file
  // further calls will use the cached copy
  const usGeoJsonData = require('./geojson/gz_2010_us_040_00_20m.json');
  // We use the geoAlbersUsa() projection provided from d3 so that it will automatically
  // shift Alaska and Hawaii to an appropriate location 
  const projection = geoAlbersUsa();
  const geoGenerator = geoPath()
    .projection(projection);

  const statePath = usGeoJsonData.features.map(d => {
    const stateabbr = stateToAbbr[d.properties.NAME]
    const statedata = props.usstateinfo.find(state => state.state === stateabbr)
    return {
      "statename": d.properties.NAME,
      "stateabbr":stateabbr,
      "d": geoGenerator(d),
      "statedata": statedata,
    }
  });
  
  return (
    <div className='usMapContainer' style={{width:800}}>
      <svg viewBox="50 0 900 500" >
        {statePath.map((d,i) => {
          return <USMapState 
            key={i} 
            statename={d.state}
            stateabbr={d.stateabbr}
            d={d.d}
            statedata={d.statedata}
            heatMapView={props.heatMapView}
            />
        })}
      </svg>
    </div>
  )
}

export default USMap