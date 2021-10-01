import React from 'react';
import {scaleLinear, scaleQuantize} from 'd3';


function USMapState(props) {
    const heatMapView = props.heatMapView
    
    function handleclick() {
        console.log(props.statedata.actuals.newCases / (props.statedata.population / 100000))
        console.log(props.statedata)
    }
    const vaccinationScale = scaleLinear()
        .range(['white','#002cff'])
        .domain([0,1])
    // const infectionsScale = scaleLinear()
    //     .range(["#0ff702", "#ff0000"])
    //     .domain([0,100])
    // const icucapacityScale = scaleLinear()
    //     .range(["#05ff04","#ff0000"])
    //     .domain([0,1])
    const infectionsScale = scaleQuantize()
        .range(["#05ff04","#eaeb04","#ff6666","#eb1010","#8e0000"])
        .domain([0,100])
    const icucapacityScale = scaleQuantize()
        .range(["#05ff04","#eaeb04","#ff6666","#eb1010","#8e0000"])
        .domain([0,1])

    function determineFill(){
        if(props.statedata === undefined){
            return "lightblue";
        }

        switch(heatMapView) {
            case "vaccinations":
                return vaccinationScale(props.statedata.metrics.vaccinationsCompletedRatio);
            case "newcases":
                const casesPer100k = props.statedata.actuals.newCases / (props.statedata.population / 100000)
                return infectionsScale(casesPer100k)
            case "icucapacity":
                return icucapacityScale(props.statedata.metrics.icuCapacityRatio)
            default:
                return "lightblue"
        }
    }
    
    return (
        <path
            className="usstate"
            statename={props.statename}
            stateabbr={props.stateabbr}
            d={props.d}
            onClick={() => handleclick()}
            fill={determineFill()}
        />
    )
}

export default USMapState;