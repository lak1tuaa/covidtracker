import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import StateMapCounty from './StateMapCounty';
import ReactTooltip from 'react-tooltip';

function StateMap(props) {
    useEffect(() => {
        ReactTooltip.rebuild();
    })
    return (
        <div style={{width:400}}>
            <svg id="stateSVG" viewBox="50 0 900 500">
                <g>
                    {props.statePaths.map((d) => {
                        return (
                            <Link key={d.statename} to={`/state/${d.stateabbr}`} >
                                <path
                                    d={d.d}
                                    fill="lightgrey"
                                    stroke="black"
                                    strokeWidth=".1"
                                    data-tip={d.statename}
                                    data-for="svgTooltipState"
                                />
                            </Link>
                        )
                    })}
                </g>
                <g id="selectedState">
                    {props.countyPath.map((d) => {
                        return (
                            <StateMapCounty 
                                key={d.countyfips}
                                countyfips={d.countyfips}
                                d={d.d}
                                countyname={d.countyname}
                                countydata={d.countydata}
                                heatMapConfig={props.heatMapConfig}
                            />
                        )
                    })}
                </g>
            </svg>
            <ReactTooltip
                id="svgTooltipState"
                multiline={true}
            />
        </div>
    )
}

export default StateMap