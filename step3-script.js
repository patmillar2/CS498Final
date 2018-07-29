!(function (d3) {

$("ccontent").empty();

var margin = {top: 20, right: 20, bottom: 30, left: 20},
    width = 960 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// get the data
d3.csv("./CSV/Both.csv", function(error, data) {
if (error) throw error;

data.forEach(function(d) {
    d.Rate = +d.Rate;
    d.dataset = +d.dataset
});
	
   var x = d3.scale.linear()
              .domain([0, d3.max(data, function(d) { return d.dataset; })])
              .range([ 0, width ]);
    
    var y = d3.scale.linear()
    	      .domain([0, d3.max(data, function(d) { return d.Rate; })])
    	      .range([ height, 0 ]);
 
    var chart = d3.select('ccontent')
	.append('svg:svg')
	.attr('width', width + margin.right + margin.left)
	.attr('height', height + margin.top + margin.bottom)
	.attr('class', 'chart')

    var main = chart.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	.attr('width', width)
	.attr('height', height)
	.attr('class', 'main')   
        
    // draw the x axis
    var xAxis = d3.svg.axis()
	.scale(x)
	.orient('bottom');

    main.append('g')
	.attr('transform', 'translate(0,' + height + ')')
	.attr('class', 'main axis date')
	.call(xAxis);

    // draw the y axis
    var yAxis = d3.svg.axis()
	.scale(y)
	.orient('left');

    main.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'main axis date')
	.call(yAxis);

    var g = main.append("svg:g"); 
    
    g.selectAll("scatter-dots")
      .data(data)
      .enter().append("svg:circle")
          .attr("cx", function (d,i) { return x(d.dataset); } )
          .attr("cy", function (d) { return y(d.Rate); } )
          .attr("r", 4);
	  .append("svg:title")
      	  .text(function(d) { return d.Country; });
  });

})(d3);
