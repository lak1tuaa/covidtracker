import React from 'react';

function HeatMapButtons(props) {
    return (
        <div className="heatmap-btn-group">
            <button onClick={() => props.setHeatMapView("newcases")}>New Cases</button>
            <button onClick={() => props.setHeatMapView("icucapacity")}>ICU Capacity</button>
            <button onClick={() => props.setHeatMapView("vaccinations")}>Vaccinations</button>
        </div>
    )
}

export default HeatMapButtons