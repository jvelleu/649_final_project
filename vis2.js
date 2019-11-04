// JavaScript Document

// Reference Code: 
// https://bl.ocks.org/danasilver/cc5f33a5ba9f90be77d96897768802ca
// https://bl.ocks.org/d3noob/204d08d309d2b2903e12554b0aef6a4d


// Geometry variables
var width = 400,
    height = 400,
    resolution = 40,
    r = 15;

var margin = {top: 0, right: 0, bottom: 0, left: 0};

// Label variables
var labels = ['W','X','Y','Z'],
	links  = ['WX','WY','WZ','XY','XZ','YZ'];

// Origin data
var myData = {
	points: [
		{"x" : 2*resolution, "y": 2*resolution},
		{"x" : 2*resolution, "y": 8*resolution},
		{"x" : 8*resolution, "y": 8*resolution},
		{"x" : 5*resolution, "y": 5*resolution}
  ],
	lines : [
		{"source":  {x : 2*resolution, y: 2*resolution}, "target":  {x : 2*resolution, y: 8*resolution}},
		{"source":  {x : 2*resolution, y: 2*resolution}, "target":  {x : 8*resolution, y: 8*resolution}},
    	{"source":  {x : 2*resolution, y: 2*resolution}, "target":  {x : 5*resolution, y: 5*resolution}},
		{"source":  {x : 2*resolution, y: 8*resolution}, "target":  {x : 8*resolution, y: 8*resolution}},
		{"source":  {x : 2*resolution, y: 8*resolution}, "target":  {x : 5*resolution, y: 5*resolution}},
		{"source":  {x : 8*resolution, y: 8*resolution}, "target":  {x : 5*resolution, y: 5*resolution}}
  ]
}


// Chart 1
var svg2 = d3.select('#vis2a').append('svg')
    .attr('width', width)
    .attr('height', height);


// Group
var labeledcircv2 = svg2.selectAll('g')
  .data(myData.lines)
  .enter().append("g")
  .attr("transform", 
        "translate(" + margin.left + "," + margin.top + ")")

// Line
labeledcircv2.append("line")
    .data(myData.lines)
    .attr("class", "link")
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; })
	.attr("id", function(d,i) {return links[i]; })
	.on("mouseover",hoverstarted)
	.on("mouseout",hoverended);

// Circle
labeledcircv2.append("circle")
	.data(myData.points)
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", r)
    .attr("id", function(d,i) {return labels[i]; });

// Label
labeledcircv2.append("text")
	.data(myData.points)
    .attr("x", function(d) { return d.x - 8; })
    .attr("y", function(d) { return d.y + 8; })
    .attr("text-anchor", "start")
    .style("fill", "white")
    .text(function(d,i) {return labels[i];})
    .attr("class", 'label')
    .attr("pointer-events", "none");

// Hover Functions
function hoverstarted(d) {
  	d3.select(this).raise().classed("hover", true);
	console.log(d3.select(this).attr('id'));
	if (d3.select(this).attr('id') == "WX") {
		document.getElementById("WX1").classList.add("match");
    	document.getElementById("WX2").classList.add("match");
	}
	if (d3.select(this).attr('id') == "WY") {
		document.getElementById("WY1").classList.add("match");
    	document.getElementById("WY2").classList.add("match");
	}
	if (d3.select(this).attr('id') == "WZ") {
		document.getElementById("WZ1").classList.add("match");
    	document.getElementById("WZ2").classList.add("match");
	}
	if (d3.select(this).attr('id') == "XY") {
		document.getElementById("XY1").classList.add("match");
    	document.getElementById("XY2").classList.add("match");
	}
	if (d3.select(this).attr('id') == "XZ") {
		document.getElementById("XZ1").classList.add("match");
    	document.getElementById("XZ2").classList.add("match");
	}
	if (d3.select(this).attr('id') == "YZ") {
		document.getElementById("YZ1").classList.add("match");
    	document.getElementById("YZ2").classList.add("match");
	}
}

function hoverended(d) {
  	d3.select(this).classed("hover", false);
	if (d3.select(this).attr('id') == "WX") {
		document.getElementById("WX1").classList.remove("match");
    	document.getElementById("WX2").classList.remove("match");
	}
	if (d3.select(this).attr('id') == "WY") {
		document.getElementById("WY1").classList.remove("match");
    	document.getElementById("WY2").classList.remove("match");
	}
	if (d3.select(this).attr('id') == "WZ") {
		document.getElementById("WZ1").classList.remove("match");
    	document.getElementById("WZ2").classList.remove("match");
	}
	if (d3.select(this).attr('id') == "XY") {
		document.getElementById("XY1").classList.remove("match");
    	document.getElementById("XY2").classList.remove("match");
	}
	if (d3.select(this).attr('id') == "XZ") {
		document.getElementById("XZ1").classList.remove("match");
    	document.getElementById("XZ2").classList.remove("match");
	}
	if (d3.select(this).attr('id') == "YZ") {
		document.getElementById("YZ1").classList.remove("match");
    	document.getElementById("YZ2").classList.remove("match");
	}
}

// Snap to Grid
function round(p, n) {
  return p % n < n / 2 ? p - (p % n) : p + n - (p % n);
}

function dist(x1,x2,y1,y2) {
  return (Math.hypot(Bx-Ax, By-Ay)/40)
}