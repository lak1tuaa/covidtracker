import React, { createRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style/usmap.css';
import { Tooltip } from 'react-svg-tooltip';

function USMapState(props) {
    const heatMapConfig = props.heatMapConfig ? props.heatMapConfig : null;
    const statedata = props.statedata ? props.statedata : null;
    const toolTipInfo = props.heatMapConfig && props.statedata ? props.heatMapConfig.getTooltipInfo(props.statedata) : ""
    // The ref is needed for the Tooltip from react-svg-tooltip
    const ref = createRef();

    //tooltipConfigs
    const width = 190
    const height = 100
    const x = 30
    const y = (height / 2) * -1
    const topMargin = 20
    const midMargin = 5
    const leftMargin = 10

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
                ref={ref}
                className="usstate"
                statename={props.statename}
                stateabbr={props.stateabbr}
                d={props.d}
                fill={determineFill(heatMapConfig, statedata)}
            />
            <Tooltip triggerRef={ref}>
                <rect x={x} y={y} width={width} height={height} rx={15} stroke="black" fill='lightblue'/>
                <text x={x + leftMargin} y={y + 20 + topMargin} fontSize={20} fill='black'>{props.statename}</text>
                <text x={x + leftMargin} y={y + 20 + 15 + topMargin + midMargin} fontSize={15} fill='black'>{toolTipInfo}</text>
            </Tooltip>

        </Link>
    )
}

export default USMapState;