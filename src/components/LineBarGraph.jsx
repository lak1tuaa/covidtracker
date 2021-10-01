import React, { useEffect } from 'react';
import * as d3 from 'd3';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function LineBarGraph(props) {
    const mostRecent = 90; //TODO: eventually change this into either prop or state, most likely prop if we have a button
    // to set the days to show elsewhere
    const data = props.data;
    //const formatTime = d3.timeFormat("%Y-%m-%d");    

    useEffect(() => {
        const recentData = data.slice(Math.max(data.length - mostRecent, 0));

        const svg = d3.select(`#${props.id}`);
        const margin = 100;
        const width = svg.attr("width") - margin;
        const height = svg.attr("height") - margin;

        const xScale = d3.scaleBand()
            .range([0, width])
            .padding(0.25)
            .domain(recentData.map(d => d.date));

        const yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(recentData, d => d.newCases)]);

        const g = svg.append("g")
            .attr("transform", `translate(50,50)`)

        const xAxis = d3.axisBottom(xScale)
            .tickValues(xScale.domain().filter((d,i) => {
                return !(i%10) || i === xScale.domain().length - 1
            }))
            .tickFormat(d => months[d.getMonth()] + " " + d.getDate());
        
        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(xAxis);
        
        g.append("g")
            .call(d3.axisLeft(yScale));

        g.selectAll(".bar")
            .data(recentData)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.date))
            .attr("y", d => yScale(d.newCases))
            .attr("width", xScale.bandwidth())
            .attr("height", d =>  d.newCases ? height - yScale(d.newCases) : height - yScale(0))
        //TODO: add tooltip
        //TODO: add css file
        
        const line = d3.line()
            .x(d => xScale(d.date))
            .y(d => yScale(d.rollingAverage))
        
        g.append("path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line(recentData))
});
    
    return (
        <svg 
            width={props.width}
            height={props.height}
            id={props.id}
        ></svg>
    )
}

export default LineBarGraph;