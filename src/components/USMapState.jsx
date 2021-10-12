import React, { createRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style/usmap.css';

function USMapState(props) {
    const heatMapConfig = props.heatMapConfig ? props.heatMapConfig : null;
    const statedata = props.statedata ? props.statedata : null;
    const toolTipInfo = props.heatMapConfig && props.statedata ? props.heatMapConfig.getTooltipInfo(props.statedata) : ""

    function determineFill(heatMapConfig, statedata){
        if (!heatMapConfig || !statedata) return "lightblue"
        
        let value = heatMapConfig.dataAccessFunction(statedata)
        let colorRange = heatMapConfig.colorRange
        for (const elem of colorRange) {
            if (value <= elem.range[1]) return elem.color 
        }
        return colorRange[colorRange.length - 1].color
    }

    return (
        <Link to={`/state/${props.stateabbr}`}>
            <path
                data-tip={props.statename + "<br />" + toolTipInfo}
                data-for="svgTooltip"
                className="usstate"
                statename={props.statename}
                stateabbr={props.stateabbr}
                d={props.d}
                fill={determineFill(heatMapConfig, statedata)}
            />
        </Link>
    )
}

export default USMapState;