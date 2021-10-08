import React from 'react';
import {useEffect} from 'react';
import {Link} from 'react-router-dom';

import {geoPath, geoMercator} from 'd3';
import {stateCodeTofips, stateToAbbr} from './maps/stateabbreviations';


function StateHeatMap(props) {
    const allStatesGeoJsonData = require('./geojson/gz_2010_us_040_00_20m.json');
    const allCountiesGeoJsonData = require('./geojson/gz_2010_us_050_00_20m.json');

    const fipsCode = stateCodeTofips[props.state];
    const stateCountiesGeoJson = allCountiesGeoJsonData.features.filter((d) => d.properties.STATE === fipsCode);

    const projection = geoMercator();
    const geoGenerator = geoPath()
        .projection(projection);
    
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
        <div>
            <p>{props.state}</p>
            <p>{fipsCode}</p>
            <div style={{width:400}}>
                <svg id="stateSVG" viewBox="50 0 900 500">
                    <g>
                        {allStatesGeoJsonData.features.map((d) => {
                            return (
                            <Link key={d.properties.STATE} to={`/state/${stateToAbbr[d.properties.NAME]}`}>
                                <path 
                                    d={geoGenerator(d)}
                                    fill="lightgrey"
                                    stroke="black"
                                    strokeWidth=".1"
                                />
                            </Link>
                            )
                        })}
                    </g>
                    <g id="selectedState">
                        {countyPath.map((d) => {
                            return <path 
                                key={d.countyfips}
                                d={d.d} 
                                fill="lightblue"
                                stroke="black"
                                strokeWidth=".1"
                                onClick={(e) => console.log(e)}
                            />
                        })}
                    </g>
                </svg>
            </div>
        </div>
    )
}

export default StateHeatMap;