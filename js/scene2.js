// d3.csv("data/athlete_events.csv").then(function(data) {
//     // Filter out rows without medals
//     const medalData = data.filter(d => d.Medal);

//     // Aggregate medals by country and type
//     const medalsByCountryAndType = d3.rollup(medalData,
//         v => ({
//             gold: v.filter(d => d.Medal === 'Gold').length,
//             silver: v.filter(d => d.Medal === 'Silver').length,
//             bronze: v.filter(d => d.Medal === 'Bronze').length,
//             total: v.length
//         }),
//         d => d.NOC
//     );

//     // Convert to array and sort
//     const sortedMedalsByCountry = Array.from(medalsByCountryAndType, ([country, medals]) => ({ country, ...medals }))
//         .sort((a, b) => d3.descending(a.total, b.total))
//         .slice(0, 15);

//     // Basic dimensions
//     const margin = { top: 20, right: 30, bottom: 100, left: 60 };
//     const width = 800 - margin.left - margin.right;
//     const height = 600 - margin.top - margin.bottom;

//     // Append SVG to the plot-container
//     const svg = d3.select("#plot-container")
//         .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     // Scales
//     const xScale = d3.scaleBand()
//         .domain(sortedMedalsByCountry.map(d => d.country))
//         .range([0, width])
//         .padding(0.1);

//     const yScale = d3.scaleLinear()
//         .domain([0, d3.max(sortedMedalsByCountry, d => d.total)])
//         .nice()
//         .range([height, 0]);

//     const colorScale = d3.scaleOrdinal()
//         .domain(['gold', 'silver', 'bronze'])
//         .range(['#ffd700', '#c0c0c0', '#cd7f32']);

//     // Axes
//     svg.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(xScale))
//         .selectAll("text")
//         .attr("transform", "rotate(-45)")
//         .style("text-anchor", "end");

//     svg.append("g")
//         .call(d3.axisLeft(yScale));

//     // Stack layout
//     const stack = d3.stack()
//         .keys(['gold', 'silver', 'bronze'])
//         .order(d3.stackOrderNone)
//         .offset(d3.stackOffsetNone);

//     const stackedData = stack(sortedMedalsByCountry.map(d => ({ country: d.country, gold: d.gold, silver: d.silver, bronze: d.bronze })));

//     // Bars
//     const bars = svg.selectAll(".layer")
//         .data(stackedData)
//         .enter()
//         .append("g")
//         .attr("class", "layer")
//         .style("fill", d => colorScale(d.key));

//     bars.selectAll("rect")
//         .data(d => d)
//         .enter()
//         .append("rect")
//         .attr("x", d => xScale(d.data.country))
//         .attr("y", d => yScale(d[1]))
//         .attr("height", d => yScale(d[0]) - yScale(d[1]))
//         .attr("width", xScale.bandwidth())
//         .on("mouseover", function(event, d) {
//             const [mouseX, mouseY] = d3.pointer(event);
//             const key = d3.select(this.parentNode).datum().key;
//             tooltip.style("display", "block")
//                 .html(`Country: ${d.data.country}<br>${key.charAt(0).toUpperCase() + key.slice(1)} Medals: ${d.data[key]}`)
//                 .style("left", (mouseX + 10) + "px")
//                 .style("top", (mouseY + 10) + "px");
//         })
//         .on("mouseout", function() {
//             tooltip.style("display", "none");
//         });

//     // Tooltip
//     const tooltip = d3.select("body").append("div")
//         .attr("class", "tooltip")
//         .style("display", "none");

// }).catch(function(error) {
//     console.error("Error loading the CSV file:", error);
// });



d3.csv("data/athlete_events.csv").then(function(data) {
    const medalData = data.filter(d => d.Medal);

    const medalsByCountryAndType = d3.rollup(medalData,
        v => ({
            gold: v.filter(d => d.Medal === 'Gold').length,
            silver: v.filter(d => d.Medal === 'Silver').length,
            bronze: v.filter(d => d.Medal === 'Bronze').length,
            total: v.length
        }),
        d => d.NOC
    );

    const sortedMedalsByCountry = Array.from(medalsByCountryAndType, ([country, medals]) => ({ country, ...medals }))
        .sort((a, b) => d3.descending(a.total, b.total))
        .slice(0, 15);

    const margin = { top: 20, right: 30, bottom: 100, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = d3.select("#plot-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const xScale = d3.scaleBand()
        .domain(sortedMedalsByCountry.map(d => d.country))
        .range([0, width])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, 60])
        .nice()
        .range([height, 0]);

    const colorScale = d3.scaleOrdinal()
        .domain(['gold', 'silver', 'bronze'])
        .range(['#ffd700', '#c0c0c0', '#cd7f32']);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    svg.append("g")
        .call(d3.axisLeft(yScale));

    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width / 2)
        .attr("y", height + margin.top + 40)
        .text("Country");

    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 20)
        .attr("transform", "rotate(-90)")
        .text("Total Medals");

    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("display", "none");

    const bars = svg.selectAll(".bar")
        .data(sortedMedalsByCountry)
        .enter()
        .append("g")
        .attr("class", "bar")
        .attr("transform", d => `translate(${xScale(d.country)},0)`);

    bars.selectAll("rect")
        .data(d => [
            { type: 'gold', value: d.gold, y0: 0, y1: d.gold },
            { type: 'silver', value: d.silver, y0: d.gold, y1: d.gold + d.silver },
            { type: 'bronze', value: d.bronze, y0: d.gold + d.silver, y1: d.total }
        ])
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", d => yScale(d.y1))
        .attr("width", xScale.bandwidth())
        .attr("height", d => yScale(d.y0) - yScale(d.y1))
        .attr("fill", d => colorScale(d.type))
        .on("mouseover", function(event, d) {
            const [mouseX, mouseY] = d3.pointer(event);
            tooltip.style("display", "block")
                .html(`Country: ${d3.select(this.parentNode).datum().country}<br>${d.type.charAt(0).toUpperCase() + d.type.slice(1)} Medals: ${d.value}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY + 10) + "px");
        })
        .on("mouseout", function() {
            tooltip.style("display", "none");
        });
}).catch(function(error) {
    console.error("Error loading the CSV file:", error);
});
