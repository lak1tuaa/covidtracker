import React from 'react';
import {numberWithCommas} from '../common/lib';
import './style/quickinfo.css';

function QuickInfo(props) {
    const lastUpdatedDate = props.lastUpdatedDate ? props.lastUpdatedDate: new Date();
    const formattedDate = `${lastUpdatedDate.getMonth() + 1}/${lastUpdatedDate.getDate()}/${lastUpdatedDate.getFullYear()}`;
    return (
        <div className="center">
            <p className="last-updated center"><i>Last Updated: {formattedDate}</i></p>
            <div className="quick-info-div">
                <p className="info-text"><span className="info-name">New Cases:</span> {numberWithCommas(props.newcases)}</p>
                <p className="info-text"><span className="info-name">Total Vaccinations:</span> {numberWithCommas(props.vaccinations)}</p>
                <p className="info-text"><span className="info-name">ICU Capacity:</span> {props.icucapacity * 100 + "%"}</p>
            </div>
        </div>
    )
}

export default QuickInfo