// scene3.js
d3.csv("data/athlete_events.csv").then(function(data) {
    const yearData = Array.from(d3.group(data, d => d.Year), ([key, values]) => ({
        key: +key,
        value: {
            totalAthletes: values.length,
            totalCountries: new Set(values.map(d => d.NOC)).size,
            totalSports: new Set(values.map(d => d.Sport)).size
        }
    })).sort((a, b) => a.key - b.key);

    const margin = { top: 50, right: 30, bottom: 100, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = d3.select("#plot-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleLinear()
        .domain(d3.extent(yearData, d => d.key))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(yearData, d => d.value.totalAthletes)])
        .range([height, 0]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll(".line")
        .data([yearData])
        .enter()
        .append("path")
        .attr("class", "line")
        .attr("d", d3.line()
            .x(d => x(d.key))
            .y(d => y(d.value.totalAthletes)))
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2);
});
