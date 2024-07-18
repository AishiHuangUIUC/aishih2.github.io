// d3.csv("data/athlete_events.csv").then(function(data) {
//     // Filter out rows with NA heights and NA ages
//     const filteredData = data.filter(d => d.Height !== "NA" && d.Age !== "NA");

//     // Dimensions and margins
//     const margin = { top: 20, right: 20, bottom: 60, left: 80 };
//     const width = 600 - margin.left - margin.right;
//     const height = 400 - margin.top - margin.bottom;

//     // Scales
//     const xScale = d3.scaleLinear()
//         .domain(d3.extent(filteredData, d => +d.Age))
//         .range([0, width]);

//     const yScale = d3.scaleLinear()
//         .domain(d3.extent(filteredData, d => +d.Height))
//         .range([height, 0]);

//     const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

//     // Create SVG container
//     const svg = d3.select("#plot-container")
//         .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", `translate(${margin.left},${margin.top})`);

//     // Tooltip
//     const tooltip = d3.select("body").append("div")
//         .attr("class", "tooltip")
//         .style("display", "none");

//     // Add scatterplot points
//     svg.selectAll("circle")
//         .data(filteredData)
//         .enter()
//         .append("circle")
//         .attr("cx", d => xScale(+d.Age))
//         .attr("cy", d => yScale(+d.Height))
//         .attr("r", 3)
//         .attr("fill", d => colorScale(d.Sport))
//         .on("mouseover", function(event, d) {
//             tooltip.style("display", "block")
//                 .html(`Name: ${d.Name}<br>Age: ${d.Age}<br>Height: ${d.Height}<br>Team: ${d.Team}<br>Sport: ${d.Sport}`)
//                 .style("left", (event.pageX + 10) + "px")
//                 .style("top", (event.pageY + 10) + "px");
//         })
//         .on("mouseout", function() {
//             tooltip.style("display", "none");
//         });

//     // Add X axis
//     svg.append("g")
//         .attr("transform", `translate(0,${height})`)
//         .call(d3.axisBottom(xScale));

//     // Add Y axis
//     svg.append("g")
//         .call(d3.axisLeft(yScale));

//     // Add X axis label
//     svg.append("text")
//         .attr("text-anchor", "end")
//         .attr("x", width / 2)
//         .attr("y", height + margin.top + 40)
//         .text("Age");

//     // Add Y axis label
//     svg.append("text")
//         .attr("text-anchor", "end")
//         .attr("x", -height / 2)
//         .attr("y", -margin.left + 20)
//         .attr("transform", "rotate(-90)")
//         .text("Height (cm)");
// });




d3.csv("data/athlete_events.csv").then(function(data) {
    // Filter out rows with NA heights and NA ages
    const filteredData = data.filter(d => d.Height !== "NA" && d.Age !== "NA");

    // Dimensions and margins
    const margin = { top: 20, right: 20, bottom: 60, left: 80 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Scales
    const xScale = d3.scaleLinear()
        .domain(d3.extent(filteredData, d => +d.Age))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(filteredData, d => +d.Height))
        .range([height, 0]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Create SVG container
    const svg = d3.select("#plot-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("display", "none");

    // Add scatterplot points
    svg.selectAll("circle")
        .data(filteredData)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(+d.Age))
        .attr("cy", d => yScale(+d.Height))
        .attr("r", 3)
        .attr("fill", d => colorScale(d.Sport))
        .on("mouseover", function(event, d) {
            tooltip.style("display", "block")
                .html(`Name: ${d.Name}<br>Age: ${d.Age}<br>Height: ${d.Height}<br>Team: ${d.Team}<br>Sport: ${d.Sport}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY + 10) + "px");
        })
        .on("mouseout", function() {
            tooltip.style("display", "none");
        });

    // Add X axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

    // Add Y axis
    svg.append("g")
        .call(d3.axisLeft(yScale));

    // Add X axis label
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width / 2)
        .attr("y", height + margin.top + 30) // Adjusted the y position
        .text("Age");

    // Add Y axis label
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 20)
        .attr("transform", "rotate(-90)")
        .text("Height (cm)");
});
