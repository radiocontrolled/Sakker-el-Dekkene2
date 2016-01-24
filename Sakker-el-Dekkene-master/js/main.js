(function() {

  "use strict";

  var height, width, svg, pie, arc, arcs, processedData, outerRadius,
  public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1hCtPpFTjsIXvS3Di1324szbL0QyU-SQ44MrzumIO1Aw/pubhtml'; 
 

  function getViewportDimensions () { 
    width = document.getElementsByTagName("main")[0].offsetWidth;
    height = window.innerHeight;
  };

  getViewportDimensions();

  Tabletop.init({ 
    key: public_spreadsheet_url,
    callback: populateSelectOptions,
    simpleSheet: true 
  });

  function populateSelectOptions (data, tabletop) {

    var select = document.getElementById("chooseProcedure");
    for(var key in data) {
      var option = document.createElement("option");
      option.innerHTML = data[key]["Procedure"];
      option.id = data[key]["id"];
      select.appendChild(option);
    }

    processedData = data;
    drawSvg();

  }

  function setSvgSize() {
    svg
      .attr({
        width: width,
        height: height
      });
  }

  function drawSvg() {
    svg = d3.select("main")
      .append("svg");
      setSvgSize();
  }

  function drawPieChart(procedure) {

    
    var dataArray = []; // first value is official amount, second value is bribe

    for(var key in processedData) {
      if(processedData.hasOwnProperty(key)) {
       if(procedure === processedData[key]["Procedure"]) {
        dataArray.push(parseInt(processedData[key]["Official cost"]));
        dataArray.push(parseInt(processedData[key]["Bribe"]));
       }
      }  
    }

    console.log(dataArray);

    outerRadius = width / 10;
    arc = d3.svg.arc()
      .innerRadius(width/12) 
      .outerRadius(outerRadius);

    pie = d3.layout.pie();
    arcs = svg.selectAll("g.arc") 
      .data(pie(dataArray)) 
      .enter()
      .append("g")
      .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");    

    //Draw arc paths  
    arcs.append("path")
      .attr({
        "d": arc,
        "class": function(d,i){
          return "color-"+i;
        }
      });
      
  }

  function updatePieChart(procedure) {

  }

  // first check if option is selected .. 
  var button = document.getElementById("calculateCost");
  button.addEventListener("click", function(e){
    var options = document.getElementById("chooseProcedure");
    var selected = options.options[options.selectedIndex].value;
    drawPieChart(selected);

  });

  function callToAction() {
    console.log("that's outrageous, time to take an action to report corruption");
  }

 


  d3.select(window).on('resize', resize);

  function resize() {

    getViewportDimensions();
    setSvgSize();

  }

})();
