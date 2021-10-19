export const heatMapConfigs = {
    newcases: {
        domain: [0, 100],
        colorRange:[
            {range:[0,20], color:"#05ff04"},
            {range:[20,40], color:"#eaeb04"},
            {range:[40,60], color:"#ff6666"},
            {range:[60,80], color:"#eb1010"},
            {range:[80,100], color:"#8e0000"}
        ],
        openEnded:true,
        tickFormat: (v) => v,
        dataAccessFunction: (d) => d.actuals.newCases / (d.population / 100000),
        tooltipName:"New Cases (per 100k)",
        getTooltipInfo:(d) => {
            let cases = d.actuals.newCases / (d.population/100000);
            return "New Cases (per 100k): " + Math.round(cases);
        }
    },
    vaccinations: {
        domain: [0, 1],
        colorRange:[
            {range:[0,0.2], color:"#e3f0ff"},
            {range:[0.2,0.4], color:"#afd2fa"},
            {range:[0.4,0.6], color:"#79b4f7"},
            {range:[0.6,0.8], color:"#2f8df7"},
            {range:[0.8,1], color:"#0268db"},
        ],
        openEnded:false,
        tickFormat: (v) => v * 100 + "%",
        dataAccessFunction: (d) => d.metrics.vaccinationsCompletedRatio,
        tooltipName:"Total Vaccinations",
        getTooltipInfo:(d) => "Vaccination Progress: " + Math.round(d.metrics.vaccinationsCompletedRatio * 100) + "%",
    },
    icucapacity: {
        domain: [0.6, 1],
        colorRange:[
            {range:[0.6,0.7], color:"#fad4d4"},
            {range:[0.7,0.8], color:"#ffabab"},
            {range:[0.8,0.9], color:"#fc7777"},
            {range:[0.9,1], color:"#ff0000"},
        ],
        openEnded:false,
        tickFormat: (v) => v * 100 + "%",
        dataAccessFunction: (d) => d.metrics.icuCapacityRatio,
        tooltipName:"ICU Capacity",
        getTooltipInfo:(d) => "ICU Capacity: " + Math.round(d.metrics.icuCapacityRatio * 100) + "%",
    }
}