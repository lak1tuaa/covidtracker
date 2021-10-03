import React from 'react';


function USMapState(props) {
    const heatMapView = props.heatMapView
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
    
    return (
        <path
            className="usstate"
            statename={props.statename}
            stateabbr={props.stateabbr}
            d={props.d}
            onClick={() => handleclick()}
            fill={determineFill(heatMapConfig, statedata)}
        />
    )
}

export default USMapState;