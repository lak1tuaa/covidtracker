import React from 'react';
import './style/usmap.css';
import USMapState from './USMapState';

function USMap(props) {
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
            heatMapConfig={props.heatMapConfig}
            />
        })}
      </svg>
    </div>
  )
}

export default USMap