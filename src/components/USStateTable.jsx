import React, { useState } from 'react';
import UsStateInfoTableRow from './UsStateInfoTableRow'
import { abbrToState } from './maps/stateabbreviations';


function USStateTable(props){
    const [sortBy, setSortBy] = useState("newcases")
    const [highToLow, setHighToLow] = useState(true)

    const usStateInfo = props.usstateinfo;
    sortUSStateData(usStateInfo, sortBy, highToLow)
    
    function sortDataBy(field){
        if (field === sortBy) {
            setHighToLow(!highToLow)
        } else {
            setSortBy(field, highToLow)
            // If a user clicks another field to sort by initially show them it from High to low, ignoring
            // essentially resetting the state for "highToLow"
            setHighToLow(true)
        }
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => sortDataBy("state")}>State</th>
                        <th onClick={() => sortDataBy("newcases")}>New Cases</th>
                        <th onClick={() => sortDataBy("vaccinations")}>Vaccinations</th>
                        <th onClick={() => sortDataBy("deaths")}>Deaths</th>
                    </tr>
                </thead>
                <tbody>
                    {usStateInfo.map((state) => <UsStateInfoTableRow stateinfo={state} key={state.fips} />)}
                </tbody>
            </table>
        </div>
    )
}

function sortUSStateData(usStateData, dataField, highToLow) {
    let sortFunction
    switch(dataField) {
        case "state":
            sortFunction = (a, b) => {
                let aStateName = abbrToState[a.state]
                let bStateName = abbrToState[b.state]
                if(aStateName < bStateName) return -1;
                if(aStateName > bStateName) return 1;
                return 0;
            }
            break;
        case "newcases":
            sortFunction = (a, b) => b.actuals.newCases - a.actuals.newCases;
            break;
        case "vaccinations":
            sortFunction = (a, b) => b.actuals.vaccinationsInitiated - a.actuals.vaccinationsInitiated;
            break;
        case "deaths":
            sortFunction = (a, b) => b.actuals.deaths - a.actuals.deaths;
            break
        default:
            // if for some reason there is an uncaught case sort by newcases
            sortFunction = (a, b) => b.actuals.newCases - a.actuals.newCases;
    }
    usStateData.sort(sortFunction);
    if (!highToLow){
        usStateData.reverse();
    }
}

export default USStateTable;