// Load the CSV data
d3.csv("data/athlete_events.csv").then(function(data) {
  // Group data by NOC (country) and Medal
  const medalData = d3.nest()
    .key(d => d.NOC)
    .key(d => d.Medal)
    .rollup(v => v.length)
    .entries(data);

  const margin = { top: 50, right: 30, bottom: 100, left: 60 };
  const width = 800 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  const svg = d3.select("#plot-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // X axis
  const x = d3.scaleBand()
    .domain(medalData.map(d => d.key))
    .range([0, width])
    .padding(0.1);

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  // Y axis
  const y = d3.scaleLinear()
    .domain([0, d3.max(medalData, d => d3.sum(d.values, v => v.value))])
    .nice()
    .range([height, 0]);

  svg.append("g")
    .call(d3.axisLeft(y));

  // Define color scale
  const color = d3.scaleOrdinal()
    .domain(["Gold", "Silver", "Bronze"])
    .range(["#ffd700", "#c0c0c0", "#cd7f32"]);

  // Tooltip
  const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // Stack the data
  const stack = d3.stack()
    .keys(["Gold", "Silver", "Bronze"])
    .value((d, key) => {
      const medal = d.values.find(v => v.key === key);
      return medal ? medal.value : 0;
    });

  const series = stack(medalData);

  // Bars
  svg.selectAll(".bar")
    .data(series)
    .enter()
    .append("g")
    .attr("class", "bar")
    .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(d => d)
    .enter()
    .append("rect")
    .attr("x", d => x(d.data.key))
    .attr("y", d => y(d[1]))
    .attr("height", d => y(d[0]) - y(d[1]))
    .attr("width", x.bandwidth())
    .on("mouseover", function(event, d) {
      const medalType = d3.select(this.parentNode).datum().key;
      const maleMedals = data.filter(a => a.NOC === d.data.key && a.Medal === medalType && a.Sex === "M").length;
      const femaleMedals = data.filter(a => a.NOC === d.data.key && a.Medal === medalType && a.Sex === "F").length;

      tooltip.transition()
        .duration(200)
        .style("opacity", .9);
      tooltip.html("Country: " + d.data.key + "<br/>" +
                   "Medal: " + medalType + "<br/>" +
                   "Male: " + maleMedals + "<br/>" +
                   "Female: " + femaleMedals)
        .style("left", (event.pageX + 5) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });

  // Add axis labels
  svg.append("text")
    .attr("class", "axis-title")
    .attr("x", width / 2)
    .attr("y", height + 60)
    .attr("fill", "#000")
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .text("Country")
    .style("font-family", "Arial")
    .style("font-size", "12px");

  svg.append("text")
    .attr("class", "axis-title")
    .attr("x", -height / 2)
    .attr("y", -50)
    .attr("fill", "#000")
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Medal Count")
    .style("font-family", "Arial")
    .style("font-size", "12px");
});
