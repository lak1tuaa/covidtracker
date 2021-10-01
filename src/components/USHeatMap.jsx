import React, {useState} from 'react';
import USMap from './USMap';
import USHeatMapButtons from './USHeatMapButtons';
import HeatMapLegend from './HeatMapLegend';

function USHeatMap(props) {
    const [heatMapView, setHeatMapView] = useState('newcases')

    return (
        <div>
            <USHeatMapButtons setHeatMapView={setHeatMapView}/>
            <USMap usstateinfo={props.usstateinfo} heatMapView={heatMapView}/>
            <HeatMapLegend  />
        </div>
    )
}

export default USHeatMap;