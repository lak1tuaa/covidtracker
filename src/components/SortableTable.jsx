import React, { useState } from 'react';
import './style/sortabletable.css';

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
        <div className="container sortableTable-div">
            <table className="table table-striped table-hover table-bordered table-sm">
                <thead>
                    <tr>
                        {props.config.map((colConfig,i) => {
                            let headerSort = "bi bi-caret-up";
                            if(i === sortBy){
                                if(highToLow){
                                    headerSort = "bi bi-caret-up-fill"
                                }else{
                                    headerSort = "bi bi-caret-down-fill"
                                }
                            }
                            return (
                                <th 
                                    key={i} 
                                    onClick={() => sortDataBy(i)}
                                >
                                    {colConfig.colName}
                                    <i className={headerSort}></i>
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