d3.csv("data/athlete_events.csv").then(function(data) {
    // Dimensions
    const margin = { top: 20, right: 20, bottom: 60, left: 80 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Scales
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => +d.Age))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => +d.Height))
        .range([height, 0]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
        .domain([...new Set(data.map(d => d.Sport))]);

    const svg = d3.select("#plot-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Axes
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    svg.append("g")
        .call(d3.axisLeft(yScale));

    // Tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Scatter plot
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(+d.Age))
        .attr("cy", d => yScale(+d.Height))
        .attr("r", 5)
        .attr("fill", d => colorScale(d.Sport))
        .on("mouseover", function(event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(`Name: ${d.Name}<br>Age: ${d.Age}<br>Height: ${d.Height} cm<br>Team: ${d.Team}<br>Sport: ${d.Sport}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    // Legend
    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width + 20}, 0)`);

    const legendData = [...new Set(data.map(d => d.Sport))].sort();
    const legendSize = 20;
    const legendSpacing = 5;

    legendData.forEach((sport, i) => {
        const legendGroup = legend.append("g")
            .attr("transform", `translate(0, ${i * (legendSize + legendSpacing)})`);

        legendGroup.append("rect")
            .attr("width", legendSize)
            .attr("height", legendSize)
            .attr("fill", colorScale(sport));

        legendGroup.append("text")
            .attr("x", legendSize + legendSpacing)
            .attr("y", legendSize / 2)
            .attr("dy", "0.35em")
            .text(sport)
            .style("font-family", "Arial")
            .style("font-size", "12px");
    });
}).catch(function(error) {
    console.error("Error loading the CSV file:", error);
});
