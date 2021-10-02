import React from 'react';
import './style/heatmaplegend.css';

function HeatMapLegend() {
    const colors = ["#05ff04","#eaeb04","#ff6666","#eb1010","#8e0000"];
    const width = 50;
    const height = 10;
    const leftMargin = 350;
    const rightMargin = 5;
    const textCorrectionX = 7
    const textHeight = height + 13
    return (
        <div>
            <svg width={leftMargin + width * colors.length + rightMargin} height={height + 30}>
                {colors.map((d,i) =>{
                    return ([
                        <rect key={"rect" + i} x={leftMargin + width*i} width={width} height="10" fill={d} />,
                        <line key={"line" + i} x1={leftMargin + width*i} x2={leftMargin+width*i} y1="0" y2="13" stroke="black" />,
                        <text key={"text" + i} x={leftMargin - textCorrectionX + width*i} y={textHeight} className="legendtext">0</text> 
                    ])
                })}
                <line x1={leftMargin + width*colors.length} x2={leftMargin+width*colors.length} y1="0" y2="13" stroke="black" />                
            </svg>
        </div>
    )
}

export default HeatMapLegend;