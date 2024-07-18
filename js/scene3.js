// // scene3.js
// d3.csv("data/athlete_events.csv").then(function(data) {
//     const yearData = Array.from(d3.group(data, d => d.Year), ([key, values]) => ({
//         key: +key,
//         value: {
//             totalAthletes: values.length,
//             totalCountries: new Set(values.map(d => d.NOC)).size,
//             totalSports: new Set(values.map(d => d.Sport)).size
//         }
//     })).sort((a, b) => a.key - b.key);

//     const margin = { top: 50, right: 30, bottom: 100, left: 60 };
//     const width = 800 - margin.left - margin.right;
//     const height = 600 - margin.top - margin.bottom;

//     const svg = d3.select("#plot-container")
//         .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     const x = d3.scaleLinear()
//         .domain(d3.extent(yearData, d => d.key))
//         .range([0, width]);

//     const y = d3.scaleLinear()
//         .domain([0, d3.max(yearData, d => d.value.totalAthletes)])
//         .range([height, 0]);

//     svg.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x).tickFormat(d3.format("d")));

//     svg.append("g")
//         .call(d3.axisLeft(y));

//     svg.selectAll(".line")
//         .data([yearData])
//         .enter()
//         .append("path")
//         .attr("class", "line")
//         .attr("d", d3.line()
//             .x(d => x(d.key))
//             .y(d => y(d.value.totalAthletes)))
//         .attr("fill", "none")
//         .attr("stroke", "steelblue")
//         .attr("stroke-width", 2);
// });




d3.csv("data/athlete_events.csv").then(function(data) {
    const yearData = Array.from(d3.group(data, d => d.Year), ([key, values]) => ({
        key: +key,
        totalCountries: new Set(values.map(d => d.NOC)).size,
        totalAthletes: values.length
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
        .domain([0, d3.max(yearData, d => d.totalCountries)])
        .range([height, 0]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width / 2)
        .attr("y", height + margin.top + 40)
        .text("Year");

    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 20)
        .attr("transform", "rotate(-90)")
        .text("Number of Countries");

    const line = d3.line()
        .x(d => x(d.key))
        .y(d => y(d.totalCountries));

    svg.append("path")
        .datum(yearData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("display", "none");

    svg.selectAll("circle")
        .data(yearData)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.key))
        .attr("cy", d => y(d.totalCountries))
        .attr("r", 3)
        .attr("fill", "steelblue")
        .on("mouseover", function(event, d) {
            const [mouseX, mouseY] = d3.pointer(event);
            tooltip.style("display", "block")
                .html(`Year: ${d.key}<br>Countries: ${d.totalCountries}<br>Athletes: ${d.totalAthletes}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY + 10) + "px");
        })
        .on("mouseout", function() {
            tooltip.style("display", "none");
        });
}).catch(function(error) {
    console.error("Error loading the CSV file:", error);
});
