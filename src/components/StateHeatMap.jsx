import React from 'react';

import {geoAlbersUsa, geoPath} from 'd3';


function StateHeatMap(props) {

    const countyGeoJsonData = require('./geojson/gz_2010_us_050_00_20m.json');

    const projection = geoAlbersUsa();
    const geoGEnerator = geoPath()
        .projection(projection);
    
    
    
    return (
        <div>
            {props.state}
        </div>
    )
}

export default StateHeatMap;