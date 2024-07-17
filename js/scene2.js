// Load the CSV data
d3.csv("data/athlete_events.csv").then(function(data) {
  // Group data by country and count medals
  const medalCounts = d3.rollup(data, v => v.length, d => d.NOC, d => d.Medal);
  const countryMedals = Array.from(medalCounts, ([country, medals]) => ({
    country,
    gold: medals.get('Gold') || 0,
    silver: medals.get('Silver') || 0,
    bronze: medals.get('Bronze') || 0
  }));

  // Sort countries by total medals
  countryMedals.sort((a, b) => (b.gold + b.silver + b.bronze) - (a.gold + a.silver + a.bronze));

  const topCountries = countryMedals.slice(0, 10); // Take top 10 countries

  const margin = { top: 50, right: 30, bottom: 100, left: 60 };
  const width = 800 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  const svg = d3.select("#plot-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const x = d3.scaleBand()
    .domain(topCountries.map(d => d.country))
    .range([0, width])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, d3.max(topCountries, d => d.gold + d.silver + d.bronze)])
    .nice()
    .range([height, 0]);

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg.append("g")
    .call(d3.axisLeft(y));

  const colors = { gold: "#ffd700", silver: "#c0c0c0", bronze: "#cd7f32" };

  svg.selectAll(".bar.gold")
    .data(topCountries)
    .enter()
    .append("rect")
    .attr("class", "bar gold")
    .attr("x", d => x(d.country))
    .attr("y", d => y(d.gold))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.gold))
    .attr("fill", colors.gold);

  svg.selectAll(".bar.silver")
    .data(topCountries)
    .enter()
    .append("rect")
    .attr("class", "bar silver")
    .attr("x", d => x(d.country))
    .attr("y", d => y(d.gold + d.silver))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.silver))
    .attr("fill", colors.silver);

  svg.selectAll(".bar.bronze")
    .data(topCountries)
    .enter()
    .append("rect")
    .attr("class", "bar bronze")
    .attr("x", d => x(d.country))
    .attr("y", d => y(d.gold + d.silver + d.bronze))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.bronze))
    .attr("fill", colors.bronze);
});
