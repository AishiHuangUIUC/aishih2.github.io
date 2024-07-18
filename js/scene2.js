// scene2.js
d3.csv("data/athlete_events.csv").then(function(data) {
    const medalsByCountry = d3.rollup(data, v => v.length, d => d.NOC);
    const top15Countries = Array.from(medalsByCountry, ([NOC, count]) => ({ NOC, count }))
        .filter(d => d.count > 1)
        .sort((a, b) => b.count - a.count)
        .slice(0, 15);

    const margin = { top: 20, right: 20, bottom: 60, left: 80 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const xScale = d3.scaleBand()
        .domain(top15Countries.map(d => d.NOC))
        .range([0, width])
        .padding(0.2);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(top15Countries, d => d.count)])
        .range([height, 0]);

    const svg = d3.select("#bar-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    svg.selectAll(".bar")
        .data(top15Countries)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.NOC))
        .attr("width", xScale.bandwidth())
        .attr("y", d => yScale(d.count))
        .attr("height", d => height - yScale(d.count))
        .attr("fill", "steelblue")
        .on("mouseover", function(event, d) {
            const [mouseX, mouseY] = d3.pointer(event);

            tooltip.transition()
                .duration(200)
                .style("opacity", .9);

            tooltip.html(`Country: ${d.NOC}<br>Medal Count: ${d.count}`)
                .style("left", (mouseX + 10) + "px")
                .style("top", (mouseY + 10) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    svg.append("g")
        .call(d3.axisLeft(yScale));
});
