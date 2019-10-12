// set the dimensions and margins of the graph
var margin = {top: 100, right: 150, bottom: 100, left: 80},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
//Read the data
d3.csv("national_totals_national_totals_with_party_breakdown.csv",
 
  function(data) {
    //title text 
  svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top - 120/ 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "24px") 
        .style("font-family", "optima") 
        .text("Total Women in State Legislatures (2009-2019)");

  // Add X axis
  var x = d3.scaleLinear()
    .domain([2009, 2019])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x)
      .tickFormat(d3.format("d"))); 


    
    // Add Y axis
    var y = d3.scaleLinear()
      .domain( [23, 29])

      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y)
        .tickFormat(d => d + "%"));
    
    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#66ccff")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.year) })
        .y(function(d) { return y(d.percent_women) })
          )
  
  svg.append("rect")
      .attr("fill", "#ff9900")
      .style("opacity", .4)
      .attr("width", 52)
      .attr("height", 400)
      .attr("x", 515)
      .attr("y", 1) 

  svg.append("text")
   .attr("x", 515)             
        .attr("y", 0 - (margin.top - 140))
        .attr("text-anchor", "middle")  
        .style("font-size", "12px") 
        .style("font-family", "optima") 
        .text("Midterm Election");
      
 
  svg.append("rect")
      .attr("fill", "#ff9900")
      .style("opacity", .4)
      .attr("width", 54)
      .attr("height", 400)
      .attr("x", 400)
      .attr("y", 1) 

  svg.append("text")
   .attr("x", 400)             
        .attr("y", 0 - (margin.top - 140))
        .attr("text-anchor", "middle")  
        .style("font-size", "12px") 
        .style("font-family", "optima") 
        .text("General Election");
      


   // create a tooltip
    var tooltip = d3.select("#my_dataviz")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "10px")

      // Three function that change the tooltip when user hover / move / leave a cell
      var mouseover = function(d) {
        tooltip
          .style("opacity", 1)
      }
      var mousemove = function(d) {
        tooltip
          .html("Year: " + d.year + "<br/>"
            + "Women in State Legislatures: " + d.percent_women + '%' + "<br/>" 
            + "Party Breakdown of Female State Legislators:" + "<br/>" 
            + " Democrats: " + d.per_dem + '%' + "<br/>" 
            + " Republicans: " + d.per_repub + '%' + "<br/>"
            + " Third Party: " + d.per_third + '%' + "<br/>"  
            + " Nonpartisan: " + d.per_nonpartisan + '%'   
            )
          .style("left", (d3.mouse(this)[0]+100) + "px")
          .style("top", (d3.mouse(this)[1]) + "px")
      }
      var mouseleave = function(d) {
        tooltip
          .style("opacity", 0)
      }











    // Add the points
    svg
      .append("g")     
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.year) } )
        .attr("cy", function(d) { return y(d.percent_women) } )
        .attr("r", 5)
        .attr("fill", "#66ccff")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)






})