import React from 'react';
import { Link } from 'react-router-dom';
import './style/usmap.css';


function USMapState(props) {
    const heatMapConfig = props.heatMapConfig ? props.heatMapConfig : null;
    const statedata = props.statedata ? props.statedata : null;

    function handleclick() {
        console.log(props.statedata.actuals.newCases / (props.statedata.population / 100000))
        console.log(props.statedata)
    }

    function determineFill(heatMapConfig, statedata){
        if (!heatMapConfig || !statedata) return "lightblue"
        
        let value = heatMapConfig.dataAccessFunction(statedata)
        let colorRange = heatMapConfig.colorRange
        for (const elem of colorRange) {
            if (value <= elem.range[1]) return elem.color 
        }
        return colorRange[colorRange.length - 1].color
    }
    
    function toolTip(e) {
        const elem = e.target
        console.log(elem.getBoundingClientRect())
    }

    return (
        <Link to={`/state/${props.stateabbr}`}>
            <path
                className="usstate"
                statename={props.statename}
                stateabbr={props.stateabbr}
                d={props.d}
                onClick={() => handleclick()}
                fill={determineFill(heatMapConfig, statedata)}
                onMouseEnter={(e) => toolTip(e)}
            />
        </Link>
    )
}

export default USMapState;