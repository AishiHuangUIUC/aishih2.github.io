// scene1.js
d3.csv("data/athlete_events.csv").then(function(data) {
    // Process data to get earnings by decade
    const earningsByDecade = d3.rollup(data, v => d3.sum(v, d => d.Gross), d => d.Decade);
    const dataArray = Array.from(earningsByDecade, ([decade, gross]) => ({ decade, gross }));

    // Dimensions
    const margin = { top: 20, right: 20, bottom: 60, left: 80 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Scales
    const xScale = d3.scaleBand()
        .domain(dataArray.map(d => d.decade))
        .range([0, width])
        .padding(0.2);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(dataArray, d => d.gross)])
        .range([height, 0]);

    const svg = d3.select("#bar-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Bars
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    svg.selectAll(".bar")
        .data(dataArray)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.decade))
        .attr("width", xScale.bandwidth())
        .attr("y", d => yScale(d.gross))
        .attr("height", d => height - yScale(d.gross))
        .attr("fill", d => colorScale(d.decade))
        .on("mouseover", function(event, d) {
            const [mouseX, mouseY] = d3.pointer(event);
            tooltip.style("display", "block")
                .html(`Total Gross Earnings: $${d.gross.toLocaleString()}`)
                .style("left", (mouseX + 10) + "px")
                .style("top", (mouseY + 10) + "px");
        })
        .on("mouseout", function() {
            tooltip.style("display", "none");
        });

    // Axes
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale).tickFormat(d => `${d}s`));

    svg.append("g")
        .call(d3.axisLeft(yScale).tickFormat(d => `$${d / 1e9}B`));

    // Legend
    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width + 20}, 0)`);

    const legendData = Array.from(earningsByDecade.keys()).sort();
    const columns = 5;
    const legendRows = Math.ceil(legendData.length / columns);
    const legendSize = 20;
    const legendSpacing = 5;

    legendData.forEach((decade, i) => {
        const row = Math.floor(i / columns);
        const col = i % columns;

        const legendGroup = legend.append("g")
            .attr("transform", `translate(${col * (legendSize + legendSpacing)}, ${row * (legendSize + legendSpacing)})`);

        legendGroup.append("rect")
            .attr("width", legendSize)
            .attr("height", legendSize)
            .attr("fill", colorScale(decade));

        legendGroup.append("text")
            .attr("x", legendSize + legendSpacing)
            .attr("y", legendSize / 2)
            .attr("dy", "0.35em")
            .text(decade)
            .style("font-family", "Arial")
            .style("font-size", "12px");
    });
});
