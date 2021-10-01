import React from 'react';
import { abbrToState } from './maps/stateabbreviations';

function UsStateInfoTableRow(props) {
    const stateInfo = props.stateinfo
    return (
        <tr>
            <td>{abbrToState[stateInfo.state]}</td>
            <td>{stateInfo.actuals.newCases}</td>
            <td>{stateInfo.actuals.vaccinationsInitiated}</td>
            <td>{stateInfo.actuals.deaths}</td>
        </tr>
    )
}

export default UsStateInfoTableRow;