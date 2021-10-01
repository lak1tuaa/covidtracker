import React from 'react';

function QuickInfo(props) {
    return (
        <div>
            <p>
                <span>Cases: {props.newcases} </span>
                <span>Vaccinations: {props.vaccinations}</span>
            </p>
        </div>
    )
}

export default QuickInfo