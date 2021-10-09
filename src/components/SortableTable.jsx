import React, { useState, useEffect } from 'react';

function SortableTable(props){
    const [sortBy, setSortBy] = useState(0);
    const [highToLow, setHighToLow] = useState(true);

    sortData(props.data, sortBy, props.config, highToLow);

    function sortDataBy(col) {
        if (col === sortBy) {
            setHighToLow(!highToLow)
        } else{
            setSortBy(col, highToLow)
            setHighToLow(true)
        }
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {props.config.map((colConfig,i) => {
                            return (
                                <th key={i} onClick={() => sortDataBy(i)}>
                                    {colConfig.colName}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((d, i) => {
                        return (
                            <tr key={i}>
                                {props.config.map((colConfig, j) => {
                                    return <td key={j}>{colConfig.dataAccess(d)}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

function sortData(data, sortBy, config, highToLow) {
    let sortFunction = config[sortBy].sortFunction
    data.sort(sortFunction);
    if(!highToLow){
        data.reverse()
    }
}

export default SortableTable;