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
                heatMapConfig={heatMapConfigs[heatMapView]}
            />
            <HeatMapLegend
                heatMapConfig={heatMapConfigs[heatMapView]}    
            />
        </div>
    )
}

const heatMapConfigs = {
    newcases: {
        domain: [0, 100],
        colorRange:[
            {range:[0,20], color:"#05ff04"},
            {range:[20,40], color:"#eaeb04"},
            {range:[40,60], color:"#ff6666"},
            {range:[60,80], color:"#eb1010"},
            {range:[80,100], color:"#8e0000"}
        ],
        openEnded:true,
        tickFormat: (v) => v,
        dataAccessFunction: (d) => d.actuals.newCases / (d.population / 100000),
    },
    vaccinations: {
        domain: [0, 1],
        colorRange:[
            {range:[0,0.2], color:"#e3f0ff"},
            {range:[0.2,0.4], color:"#afd2fa"},
            {range:[0.4,0.6], color:"#79b4f7"},
            {range:[0.6,0.8], color:"#2f8df7"},
            {range:[0.8,1], color:"#0268db"},
        ],
        openEnded:false,
        tickFormat: (v) => v * 100 + "%",
        dataAccessFunction: (d) => d.metrics.vaccinationsCompletedRatio,
    },
    icucapacity: {
        domain: [0.6, 1],
        colorRange:[
            {range:[0.6,0.7], color:"#fad4d4"},
            {range:[0.7,0.8], color:"#ffabab"},
            {range:[0.8,0.9], color:"#fc7777"},
            {range:[0.9,1], color:"#ff0000"},
        ],
        openEnded:false,
        tickFormat: (v) => v * 100 + "%",
        dataAccessFunction: (d) => d.metrics.icuCapacityRatio,
    }
}


export default USHeatMap;