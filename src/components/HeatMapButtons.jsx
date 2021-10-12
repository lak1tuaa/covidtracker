import React from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './style/heatmapbuttons.css'

function HeatMapButtons(props) {
    const radios = [
        {name:"New Cases", value:"newcases"},
        {name:"ICU Capacity", value:"icucapacity"},
        {name:"Vaccinations", value:"vaccinations"},
    ]
    return (
        <ButtonGroup className="btn-group">
            {radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant="secondary"
                    value={radio.value}
                    checked={props.heatMapView === radio.value}
                    onChange={(e) => props.setHeatMapView(e.currentTarget.value)}
                >
                    {radio.name}
                </ToggleButton>
            ))}
        </ButtonGroup>
    )
}

export default HeatMapButtons