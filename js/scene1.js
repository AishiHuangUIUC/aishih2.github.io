// d3.csv("data/athlete_events.csv").then(function(data) {
//     // Dimensions
//     const margin = { top: 20, right: 20, bottom: 60, left: 80 };
//     const width = 800 - margin.left - margin.right;
//     const height = 600 - margin.top - margin.bottom;

//     // Scales
//     const xScale = d3.scaleLinear()
//         .domain(d3.extent(data, d => +d.Age))
//         .range([0, width]);

//     const yScale = d3.scaleLinear()
//         .domain(d3.extent(data, d => +d.Height))
//         .range([height, 0]);

//     const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
//         .domain([...new Set(data.map(d => d.Sport))]);

//     const svg = d3.select("#plot-container")
//         .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     // Axes
//     svg.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(xScale));

//     svg.append("g")
//         .call(d3.axisLeft(yScale));

//     // Tooltip
//     const tooltip = d3.select("body").append("div")
//         .attr("class", "tooltip")
//         .style("opacity", 0);

//     // Scatter plot
//     svg.selectAll("circle")
//         .data(data)
//         .enter()
//         .append("circle")
//         .attr("cx", d => xScale(+d.Age))
//         .attr("cy", d => yScale(+d.Height))
//         .attr("r", 5)
//         .attr("fill", d => colorScale(d.Sport))
//         .on("mouseover", function(event, d) {
//             tooltip.transition()
//                 .duration(200)
//                 .style("opacity", .9);
//             tooltip.html(`Name: ${d.Name}<br>Age: ${d.Age}<br>Height: ${d.Height} cm<br>Team: ${d.Team}<br>Sport: ${d.Sport}`)
//                 .style("left", (event.pageX + 10) + "px")
//                 .style("top", (event.pageY - 28) + "px");
//         })
//         .on("mouseout", function() {
//             tooltip.transition()
//                 .duration(500)
//                 .style("opacity", 0);
//         });

//     // Legend
//     const legend = svg.append("g")
//         .attr("class", "legend")
//         .attr("transform", `translate(${width + 20}, 0)`);

//     const legendData = [...new Set(data.map(d => d.Sport))].sort();
//     const legendSize = 20;
//     const legendSpacing = 5;

//     legendData.forEach((sport, i) => {
//         const legendGroup = legend.append("g")
//             .attr("transform", `translate(0, ${i * (legendSize + legendSpacing)})`);

//         legendGroup.append("rect")
//             .attr("width", legendSize)
//             .attr("height", legendSize)
//             .attr("fill", colorScale(sport));

//         legendGroup.append("text")
//             .attr("x", legendSize + legendSpacing)
//             .attr("y", legendSize / 2)
//             .attr("dy", "0.35em")
//             .text(sport)
//             .style("font-family", "Arial")
//             .style("font-size", "12px");
//     });
// }).catch(function(error) {
//     console.error("Error loading the CSV file:", error);
// });


d3.csv("data/athlete_events.csv").then(function(data) {
    const margin = { top: 20, right: 20, bottom: 60, left: 80 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => +d.Age))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => +d.Height))
        .range([height, 0]);

    const svg = d3.select("#plot-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    svg.append("g")
        .call(d3.axisLeft(yScale));

    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(+d.Age))
        .attr("cy", d => yScale(+d.Height))
        .attr("r", 5)
        .attr("fill", "steelblue");
}).catch(function(error) {
    console.error("Error loading the CSV file:", error);
});



// d3.csv("data/athlete_events.csv").then(function(data) {
//   data.forEach(d => {
//     d.Age = +d.Age;
//     d.Height = +d.Height;
//     d.Weight = +d.Weight;
//   });

//   const margin = { top: 50, right: 30, bottom: 100, left: 60 };
//   const width = 800 - margin.left - margin.right;
//   const height = 600 - margin.top - margin.bottom;

//   const svg = d3.select("#plot-container")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom + 150)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//   const x = d3.scaleLinear()
//     .domain(d3.extent(data, d => d.Age))
//     .nice()
//     .range([0, width]);

//   svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x))
//     .append("text")
//     .attr("class", "axis-title")
//     .attr("x", width / 2)
//     .attr("y", 40)
//     .attr("fill", "#000")
//     .attr("font-weight", "bold")
//     .attr("text-anchor", "middle")
//     .text("Age")
//     .style("font-family", "Arial")
//     .style("font-size", "12px");

//   const y = d3.scaleLinear()
//     .domain(d3.extent(data, d => d.Height))
//     .nice()
//     .range([height, 0]);

//   svg.append("g")
//     .call(d3.axisLeft(y))
//     .append("text")
//     .attr("class", "axis-title")
//     .attr("x", -height / 2)
//     .attr("y", -50)
//     .attr("fill", "#000")
//     .attr("font-weight", "bold")
//     .attr("text-anchor", "middle")
//     .attr("transform", "rotate(-90)")
//     .text("Height (cm)")
//     .style("font-family", "Arial")
//     .style("font-size", "12px");

//   const sportColors = Array.from(new Set(data.map(d => d.Sport)));
//   const color = d3.scaleOrdinal(d3.schemeCategory10.concat(d3.schemeSet3))
//     .domain(sportColors);

//   const tooltip = d3.select("body").append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0);

//   svg.selectAll("dot")
//     .data(data.filter(d => d.Age && d.Height))
//     .enter()
//     .append("circle")
//     .attr("cx", d => x(d.Age))
//     .attr("cy", d => y(d.Height))
//     .attr("r", 3)
//     .style("fill", d => color(d.Sport))
//     .on("mouseover", function(event, d) {
//       tooltip.transition()
//         .duration(200)
//         .style("opacity", .9);
//       tooltip.html("Name: " + d.Name + "<br/>" +
//                    "Age: " + d.Age + "<br/>" +
//                    "Height: " + d.Height + " cm<br/>" +
//                    "Team: " + d.Team + "<br/>" +
//                    "Sport: " + d.Sport)
//         .style("left", (event.pageX + 5) + "px")
//         .style("top", (event.pageY - 28) + "px");
//     })
//     .on("mouseout", function() {
//       tooltip.transition()
//         .duration(500)
//         .style("opacity", 0);
//     });

//   const legend = svg.selectAll(".legend")
//     .data(sportColors)
//     .enter().append("g")
//     .attr("class", "legend")
//     .attr("transform", (d, i) => "translate(" + ((i % 8) * 100) + "," + (height + 40 + Math.floor(i / 8) * 20) + ")");

//   legend.append("rect")
//     .attr("x", 0)
//     .attr("width", 18)
//     .attr("height", 18)
//     .style("fill", color);

//   legend.append("text")
//     .attr("x", 24)
//     .attr("y", 9)
//     .attr("dy", ".35em")
//     .style("text-anchor", "start")
//     .text(d => d);

//   d3.select("#plot-container svg")
//     .attr("height", height + margin.top + margin.bottom + 150);
// });
