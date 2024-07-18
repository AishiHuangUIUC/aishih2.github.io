// d3.csv("data/athlete_events.csv").then(function(data) {
//   const filteredData = data.filter(d => d.Medal);

//   const medalData = Array.from(d3.group(filteredData, d => d.NOC), ([key, values]) => ({
//     key,
//     values: Array.from(d3.group(values, d => d.Medal), ([medal, medalValues]) => ({
//       key: medal,
//       value: medalValues.length,
//       male: medalValues.filter(d => d.Sex === 'M').length,
//       female: medalValues.filter(d => d.Sex === 'F').length
//     }))
//   })).filter(d => d.values.reduce((acc, curr) => acc + curr.value, 0) > 1);

//   const margin = { top: 50, right: 30, bottom: 100, left: 60 };
//   const width = 800 - margin.left - margin.right;
//   const height = 600 - margin.top - margin.bottom;

//   const svg = d3.select("#plot-container")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//   const x = d3.scaleBand()
//     .domain(medalData.map(d => d.key))
//     .range([0, width])
//     .padding(0.1);

//   svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x))
//     .selectAll("text")
//     .attr("transform", "rotate(-45)")
//     .style("text-anchor", "end");

//   const y = d3.scaleLinear()
//     .domain([0, d3.max(medalData, d => d3.sum(d.values, v => v.value))])
//     .nice()
//     .range([height, 0]);

//   svg.append("g")
//     .call(d3.axisLeft(y));

//   const color = d3.scaleOrdinal()
//     .domain(["Gold", "Silver", "Bronze"])
//     .range(["#ffd700", "#c0c0c0", "#cd7f32"]);

//   const tooltip = d3.select("body").append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0);

//   const stack = d3.stack()
//     .keys(["Gold", "Silver", "Bronze"])
//     .value((d, key) => {
//       const medal = d.values.find(v => v.key === key);
//       return medal ? medal.value : 0;
//     });

//   const series = stack(medalData);

//   svg.selectAll(".bar")
//     .data(series)
//     .enter()
//     .append("g")
//     .attr("class", "bar")
//     .attr("fill", d => color(d.key))
//     .selectAll("rect")
//     .data(d => d)
//     .enter()
//     .append("rect")
//     .attr("x", d => x(d.data.key))
//     .attr("y", d => y(d[1]))
//     .attr("height", d => y(d[0]) - y(d[1]))
//     .attr("width", x.bandwidth())
//     .on("mouseover", function(event, d) {
//       const [medalType] = d3.select(this.parentNode).datum().key;
//       const maleCount = d.data.values.find(v => v.key === medalType)?.male || 0;
//       const femaleCount = d.data.values.find(v => v.key === medalType)?.female || 0;

//       tooltip.transition()
//         .duration(200)
//         .style("opacity", .9);
//       tooltip.html("Country: " + d.data.key + "<br/>" +
//                    "Medal: " + medalType + "<br/>" +
//                    "Count: " + (d[1] - d[0]) + "<br/>" +
//                    "Male: " + maleCount + "<br/>" +
//                    "Female: " + femaleCount)
//         .style("left", (event.pageX + 5) + "px")
//         .style("top", (event.pageY - 28) + "px");
//     })
//     .on("mouseout", function() {
//       tooltip.transition()
//         .duration(500)
//         .style("opacity", 0);
//     });

//   svg.append("text")
//     .attr("class", "axis-title")
//     .attr("x", width / 2)
//     .attr("y", height + 60)
//     .attr("fill", "#000")
//     .attr("font-weight", "bold")
//     .attr("text-anchor", "middle")
//     .text("Country")
//     .style("font-family", "Arial")
//     .style("font-size", "12px");

//   svg.append("text")
//     .attr("class", "axis-title")
//     .attr("x", -height / 2)
//     .attr("y", -50)
//     .attr("fill", "#000")
//     .attr("font-weight", "bold")
//     .attr("text-anchor", "middle")
//     .attr("transform", "rotate(-90)")
//     .text("Medal Count")
//     .style("font-family", "Arial")
//     .style("font-size", "12px");
// });





// d3.csv("data/athlete_events.csv").then(function(data) {
//     // Aggregate medals by country
//     const medalsByCountry = d3.rollup(data, v => v.length, d => d.NOC);
//     const sortedMedalsByCountry = Array.from(medalsByCountry, ([country, medals]) => ({ country, medals }))
//         .sort((a, b) => d3.descending(a.medals, b.medals))
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
//         .domain([0, d3.max(sortedMedalsByCountry, d => d.medals)])
//         .nice()
//         .range([height, 0]);

//     // Axes
//     svg.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(xScale))
//         .selectAll("text")
//         .attr("transform", "rotate(-45)")
//         .style("text-anchor", "end");

//     svg.append("g")
//         .call(d3.axisLeft(yScale));

//     // Bars
//     svg.selectAll(".bar")
//         .data(sortedMedalsByCountry)
//         .enter()
//         .append("rect")
//         .attr("class", "bar")
//         .attr("x", d => xScale(d.country))
//         .attr("width", xScale.bandwidth())
//         .attr("y", d => yScale(d.medals))
//         .attr("height", d => height - yScale(d.medals))
//         .attr("fill", "steelblue");

//     // Tooltip
//     const tooltip = d3.select("body").append("div")
//         .attr("class", "tooltip")
//         .style("display", "none");

//     svg.selectAll(".bar")
//         .on("mouseover", function(event, d) {
//             const [mouseX, mouseY] = d3.pointer(event);
//             tooltip.style("display", "block")
//                 .html(`Country: ${d.country}<br>Medals: ${d.medals}`)
//                 .style("left", (mouseX + 10) + "px")
//                 .style("top", (mouseY + 10) + "px");
//         })
//         .on("mouseout", function() {
//             tooltip.style("display", "none");
//         });
// }).catch(function(error) {
//     console.error("Error loading the CSV file:", error);
// });



d3.csv("data/athlete_events.csv").then(function(data) {
    // Filter out rows without medals
    const medalData = data.filter(d => d.Medal);

    // Aggregate medals by country and type
    const medalsByCountryAndType = d3.rollup(medalData,
        v => ({
            gold: v.filter(d => d.Medal === 'Gold').length,
            silver: v.filter(d => d.Medal === 'Silver').length,
            bronze: v.filter(d => d.Medal === 'Bronze').length,
            total: v.length
        }),
        d => d.NOC
    );

    // Convert to array and sort
    const sortedMedalsByCountry = Array.from(medalsByCountryAndType, ([country, medals]) => ({ country, ...medals }))
        .sort((a, b) => d3.descending(a.total, b.total))
        .slice(0, 15);

    // Basic dimensions
    const margin = { top: 20, right: 30, bottom: 100, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Append SVG to the plot-container
    const svg = d3.select("#plot-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Scales
    const xScale = d3.scaleBand()
        .domain(sortedMedalsByCountry.map(d => d.country))
        .range([0, width])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(sortedMedalsByCountry, d => d.total)])
        .nice()
        .range([height, 0]);

    const colorScale = d3.scaleOrdinal()
        .domain(['gold', 'silver', 'bronze'])
        .range(['#ffd700', '#c0c0c0', '#cd7f32']);

    // Axes
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    svg.append("g")
        .call(d3.axisLeft(yScale));

    // Bars
    const bars = svg.selectAll(".bar")
        .data(sortedMedalsByCountry)
        .enter()
        .append("g")
        .attr("class", "bar")
        .attr("transform", d => `translate(${xScale(d.country)},0)`);

    bars.selectAll("rect")
        .data(d => [
            { type: 'gold', value: d.gold, total: d.total },
            { type: 'silver', value: d.silver, total: d.total },
            { type: 'bronze', value: d.bronze, total: d.total }
        ])
        .enter()
        .append("rect")
        .attr("x", d => 0)
        .attr("y", d => yScale(d.total))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - yScale(d.total))
        .attr("fill", d => colorScale(d.type))
        .attr("data-type", d => d.type);

    // Tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("display", "none");

    bars.selectAll("rect")
        .on("mouseover", function(event, d) {
            const [mouseX, mouseY] = d3.pointer(event);
            tooltip.style("display", "block")
                .html(`Country: ${d3.select(this.parentNode).datum().country}<br>${d.type.charAt(0).toUpperCase() + d.type.slice(1)} Medals: ${d.value}`)
                .style("left", (mouseX + 10) + "px")
                .style("top", (mouseY + 10) + "px");
        })
        .on("mouseout", function() {
            tooltip.style("display", "none");
        });
}).catch(function(error) {
    console.error("Error loading the CSV file:", error);
});
