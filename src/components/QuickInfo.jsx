import React from 'react';

function QuickInfo(props) {
    console.log(props.lastUpdatedDate)
    const lastUpdatedDate = props.lastUpdatedDate ? props.lastUpdatedDate: new Date();
    const formattedDate = `${lastUpdatedDate.getMonth() + 1}/${lastUpdatedDate.getDate()}/${lastUpdatedDate.getFullYear()}`
    return (
        <div>
            <p>
                <span>Cases ({formattedDate}): {props.newcases} </span>
                <span> ---- </span>
                <span>Vaccinations: {props.vaccinations}</span>
            </p>
        </div>
    )
}

export default QuickInfo