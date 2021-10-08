import { timeParse } from 'd3';

export const parseDate = timeParse("%Y-%m-%d");

export function calculateRollingAverage(data, key, start, end){
    let sum = 0;
    for(var i = start; i <= end; i++) {
        if(data[i][key]){
            sum += data[i][key]
        }
    }
    return sum / (end - start + 1)
}

// Adds the rollingAverage to the timeseries object, it modifies the data in place
export function addRollingAverageToTimeSeriesData(timeSeriesData) {
    timeSeriesData.map((d,i) => {
        d.date = parseDate(d.date);
        let rollingAverage = null;
        if (i >= 6) {
            rollingAverage = calculateRollingAverage(timeSeriesData, "newCases", i - 6, i)
        }
        d.rollingAverage = rollingAverage;
        return d;
    })
}