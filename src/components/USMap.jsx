import React from 'react';
import './style/usmap.css';
import USMapState from './USMapState';
import ReactTooltip from 'react-tooltip';

function USMap(props) {
  return (
    <div className='usMapContainer' style={{width:800}}>
      <svg viewBox="50 0 900 500" >
        {props.data.map((d,i) => {
          return <USMapState 
            key={i} 
            statename={d.statename}
            stateabbr={d.stateabbr}
            d={d.d}
            statedata={d.statedata}
            heatMapConfig={props.heatMapConfig}
            />
        })}
      </svg>
      <ReactTooltip 
        id="svgTooltip" 
        multiline={true}  
      />
    </div>
  )
}

export default USMap