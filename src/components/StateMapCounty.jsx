import React from 'react';

function StateMapCounty(props) {
    const heatMapConfig = props.heatMapConfig ? props.heatMapConfig : null;
    const countydata = props.countydata ? props.countydata : null;
    const toolTipInfo = props.heatMapConfig && props.countydata ? props.heatMapConfig.getTooltipInfo(props.countydata) : "";


    function handleclick() {
        console.log(props.countyname);
        console.log(props.countydata);
    }

    function determineFill(heatMapConfig, countydata){
        if (!heatMapConfig || !countydata) return "lightblue"
        
        let value = heatMapConfig.dataAccessFunction(countydata)
        let colorRange = heatMapConfig.colorRange
        for (const elem of colorRange) {
            if (value <= elem.range[1]) return elem.color 
        }
        return colorRange[colorRange.length - 1].color
    }

    return (
        <path
            data-tip={props.countyname + "<br />" + toolTipInfo}
            data-for="svgTooltipState"
            d={props.d}
            countyname={props.countyname}
            onClick={() => handleclick()}
            fill={determineFill(heatMapConfig, countydata)}
            stroke="black"
            strokeWidth=".1"
        />
    )
}

export default StateMapCounty;