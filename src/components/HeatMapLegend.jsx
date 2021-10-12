import React from 'react';
import './style/heatmaplegend.css';


function HeatMapLegend(props) {
    const colorRange = props.heatMapConfig ? props.heatMapConfig.colorRange : [];
    const domain = props.heatMapConfig ? props.heatMapConfig.domain : [0, 1];
    const openEnded = props.heatMapConfig ? props.heatMapConfig.openEnded: false;
    const tickFormat = props.heatMapConfig ? props.heatMapConfig.tickFormat: (v) => v;

    const width = 300;
    const height = 10;
    const leftMargin = props.leftMargin;
    const rightMargin = 25;
    const textCorrectionX = 3
    const tickLength = 13
    const textHeight = height + 13

    const scaleValue = width / (domain[1] - domain[0])
    return (
        <div>
            <svg width={leftMargin + width + rightMargin} height={height + 30}>
                {colorRange.map((d,i) =>{
                    let start, end
                    [start, end] = d.range
                    let length = end - start

                    let x = leftMargin + (start - domain[0])*scaleValue
                    let tickValue = tickFormat(start)
                    if (openEnded && colorRange.length - 1 === i) {
                        tickValue += "+"
                    }
                    return ([
                        <rect key={"rect" + i} x={x} width={length*scaleValue} height="10" fill={d.color} />,
                        <line key={"line" + i} x1={x} x2={x} y1="0" y2={tickLength} stroke="black" />,
                        <text key={"text" + i} x={x - textCorrectionX} y={textHeight} className="legendtext">{tickValue}</text> 
                    ])
                })}
                {!openEnded && [
                    <line key="endtick" x1={width + leftMargin} x2={width + leftMargin} y1="0" y2={tickLength} stroke="black"/>,
                    <text key="endtickval" x={width - textCorrectionX + leftMargin} y={textHeight} className="legendtext">{tickFormat(colorRange[colorRange.length - 1].range[1])}</text>
                ]}
            </svg>
        </div>
    )
}

export default HeatMapLegend;