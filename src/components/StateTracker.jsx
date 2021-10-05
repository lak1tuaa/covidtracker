import React from 'react';
import StateHeatMap from './StateHeatMap'
import { useParams } from 'react-router-dom';
import { abbrToState } from './maps/stateabbreviations';

function StateTracker() {
    // This is called a destructuring assignment. The function call to useParams() returns
    // an object with { abbr: "the_abbr_from_the_url"}, and this shortens the syntax to
    // assign abbr from:
    // let abbr = useParams().abbr
    const { abbr } = useParams();
    const stateName = abbrToState[abbr.toUpperCase()];

    return (
        <div>
            <h1>State Tracker page</h1>
            <p>{ stateName }</p>
            <StateHeatMap 
                state={abbr.toUpperCase()}
            />
        </div>
    )
}

export default StateTracker;