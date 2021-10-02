import React, {useState} from 'react';
import USMap from './USMap';
import USHeatMapButtons from './USHeatMapButtons';
import HeatMapLegend from './HeatMapLegend';
import {geoAlbersUsa, geoPath} from 'd3';
import {stateToAbbr} from './maps/stateabbreviations';

function USHeatMap(props) {
    const [heatMapView, setHeatMapView] = useState('newcases')
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
        <div>
            <USHeatMapButtons setHeatMapView={setHeatMapView}/>
            <USMap 
                usstateinfo={props.usstateinfo} 
                heatMapView={heatMapView}
                data={statePath}
            />
            <HeatMapLegend  />
        </div>
    )
}

export default USHeatMap;