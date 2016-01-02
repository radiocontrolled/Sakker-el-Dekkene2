(function() {

  "use strict";

  var height, width, svg; 

  function getViewportDimensions() { 
    width = document.getElementById("treemap").offsetWidth;
    height = window.innerHeight;
  };

  function drawSvg() {
    svg = d3.select("#treemap")
      .append("svg");

      setSvgSize();
    
  }

  function setSvgSize() {
    svg
      .attr({
        width: width,
        height: height
      });
  }

  d3.json("data/treemap.json", function(data){

    var treemap = d3.layout.treemap()
      .size([width,height])
      .nodes(data);

    var cells = svg.selectAll(".cell")
      .data(treemap)
      .enter()
      .append("g")
      .attr("class","cell");

    cells

  })

  getViewportDimensions();
  drawSvg();


  d3.select(window).on('resize', resize);

  function resize() {

    getViewportDimensions();
    setSvgSize();

  }

})();
