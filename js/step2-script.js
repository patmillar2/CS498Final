!(function (d3) {

$("acontent").empty();

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 980 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var svg = d3.select("acontent").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("./CSV/HDI.csv", function(error, data) {
if (error) throw error;

// format the data
data.forEach(function(d) {
    d.dataset = +d.dataset;
});

  x.domain(data.map(function(d) { return d.Country; }));
  y.domain([0, d3.max(data, function(d) { return d.dataset; })]);

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("HDI Index");

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Country); })
      .attr("y", function(d) { return y(d.dataset); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.dataset); })
      .append("svg:title")
      .text(function(d) { return d.Country; });
});

})(d3);
