import React from 'react';
import {useEffect, useState} from 'react';

import {geoPath, geoMercator} from 'd3';
import {stateCodeTofips, stateToAbbr} from '../maps/stateabbreviations';
import HeatMapButtons from './HeatMapButtons';
import StateMap from './StateMap';
import HeatMapLegend from './HeatMapLegend';
import { heatMapConfigs } from '../config/heatmapconfig';
import './style/heatmap.css';

function StateHeatMap(props) {
    const [heatMapView, setHeatMapView] = useState('newcases');

    const allStatesGeoJsonData = require('../geojson/gz_2010_us_040_00_20m.json');
    const allCountiesGeoJsonData = require('../geojson/gz_2010_us_050_00_20m.json');

    const fipsCode = stateCodeTofips[props.state];
    const stateCountiesGeoJson = allCountiesGeoJsonData.features.filter((d) => d.properties.STATE === fipsCode);

    // Using Mercator projection for viewing state maps, since that looks more similar to what
    // people are used to seeing when looking at state maps.
    const projection = geoMercator();
    const geoGenerator = geoPath()
        .projection(projection);
    
    const statePaths = allStatesGeoJsonData.features.map((d) => {
        return {
            "statename":d.properties.NAME,
            "stateabbr":stateToAbbr[d.properties.NAME],
            "d":geoGenerator(d),
        }
    })
    
    const countyPath = stateCountiesGeoJson.map((d) => {
        const countyfips = d.properties.STATE + d.properties.COUNTY;
        const countydata = props.stateCountiesData.find(countyData => countyData.fips === countyfips);
        return {
            "countyfips": countyfips,
            "countyname": d.properties.NAME,
            "countydata": countydata,
            "d": geoGenerator(d),
        }
    });
    
    useEffect(() => {
        const bbox = document.getElementById('selectedState').getBBox();
        const stateSVG = document.getElementById('stateSVG');
        stateSVG.setAttribute("viewBox", `${bbox.x - 2} ${bbox.y - 2} ${bbox.width + 4} ${bbox.height + 4}`)

    });
    
    
    return (
        <div className="container center">
            <HeatMapButtons
                setHeatMapView={setHeatMapView}
                heatMapView={heatMapView}
            />
            <div className="map-container" style={{width:400}}>
                <StateMap 
                    statePaths={statePaths}
                    countyPath={countyPath}
                    heatMapConfig={heatMapConfigs[heatMapView]}
                />
                <HeatMapLegend
                    leftMargin={50}
                    heatMapConfig={heatMapConfigs[heatMapView]}
                />
            </div>
        </div>
    )
}

export default StateHeatMap;