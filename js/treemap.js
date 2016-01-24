(function() {

  "use strict";

  var height, width, svg, treemap, cells;
  var color = d3.scale.category10();

  function getViewportDimensions() { 
    width = document.getElementById("treemap").offsetWidth;
    height = window.innerHeight;
  };

  function drawSvg() {
    
    svg = d3.select("article")
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

  function Treemap() {

    d3.json("data/treemap.json", function(data) {

    // create the treemap layout
    treemap = d3.layout.treemap()
      .size([(width * 0.90),(height * 0.80)])
      .nodes(data);

    cells = svg.selectAll(".cell")
      .data(treemap)
      .enter()
      .append("g")
      .attr("class","cell");   

    cells.append("rect")
      .attr({
        "x" : function (d) {
          return d.x;
        },
        "y" : function (d) {
          return d.y;
        },
        "width" : function (d) {
          return d.dx; 
        },  
        "height" : function (d) {
          return d.dy; 
        }, 
        "fill" : function (d) {
          return d.children ? null : color(d.parent.name);
        }
      })

    cells.append("text")
      .attr({
        "x" : function (d) {
          return d.x;
        },
        "y" : function (d) {
          return d.y + d.dy / 2; 
        }
      })
      .text(function(d){
        return d.name;
      })


    })
  }

  Treemap();
  

  getViewportDimensions();
  drawSvg();


  d3.select(window).on('resize', resize);

  function resize() {

    getViewportDimensions();
    setSvgSize();

    var article = document.getElementsByTagName("article")[0];

    var child = article.firstChild;
    child.parentNode.removeChild(child);

    drawSvg();
    Treemap();
    

  }

})();
