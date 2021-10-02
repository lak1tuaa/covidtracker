import React from 'react';
import './style/usmap.css';
import USMapState from './USMapState';

function USMap(props) {
  
  // const statePath = props.geoJsonData.features.map(d => {
  //   const stateabbr = stateToAbbr[d.properties.NAME]
  //   const statedata = props.usstateinfo.find(state => state.state === stateabbr)
  //   return {
  //     "statename": d.properties.NAME,
  //     "stateabbr":stateabbr,
  //     "d": props.geoGenerator(d),
  //     "statedata": statedata,
  //   }
  // });
  
  return (
    <div className='usMapContainer' style={{width:800}}>
      <svg viewBox="50 0 900 500" >
        {props.data.map((d,i) => {
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