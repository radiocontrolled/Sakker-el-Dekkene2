(function() {

  "use strict";

  var height, width, svg, dataGlobal;

  var getViewportDimensions = function () { 
    width = document.getElementById("bubbleChart").offsetWidth;
    height = window.innerHeight * 0.95;
  };

  getViewportDimensions();

  var drawSvg = function () {
    svg = d3.select("#bubbleChart")
      .append("svg");

      setSvgSize();
  };

  var setSvgSize = function () {
    svg
      .attr({
        width: width,
        height: height
      });
  };

  var xScale = d3.scale.linear()
    .domain([5,0])
    .range([width/2,0]);


  var yScale = d3.scale.linear()
    .domain([25,0])
    .range([(height * 0.9),0]);

  var bubbleScale = d3.scale.linear()
    .domain([15000,10160000])
    .range([4,15]);

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("top")
    .ticks(5)
    .tickFormat(function(d,i){ 
      return xTickLabels[i];
    });

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("right")
    .ticks(25)
    .tickSize(-width * 0.5)
    .tickFormat(function(d,i){
      return yTickLabels[i];
    });

  var drawCircles = function () {
    svg.selectAll("circle")
      .data(dataGlobal.data)
      .enter()
      .append("g")
      .attr({
        "class" : function(d) {
          return d[4];
        }
      })
      .append("circle")
      .attr({
        "cx" : function(d) {
          return xScale(d[0]);
        },
        "cy" : function(d) {
          return yScale(d[1]);
        },
        "r" : function(d) {
          return bubbleScale(d[3]);
         
        },
        "class" : function(d) {
          return d[2];
        }
      });

    svg
      .append("g")
      .attr({
        "class" : "xAxis",
      })
      .call(xAxis);

    svg
      .append("g")
      .attr({
        "class" : "yAxis"
      })
      .style({
        "transform" : function () {
          return "translate(" + ((width/2) + 62) + "px,2em)";
        }
      })
      .call(yAxis);


  };



  d3.json("data/bubbleChartData.json", function(error, json){

    if (error) console.warn(error);

    else {
      dataGlobal = json; 
      drawSvg();
      drawCircles();
    }
 
  });


  d3.select(window).on('resize', resize);

  function resize() {

    getViewportDimensions();
    setSvgSize();


    // update scales 
    xScale
      .range([width/2,0]);

    yScale
      .range([(height * 0.9),0]);

    bubbleScale
      .range([4,15]);

    // update the circle positions and radius  
    svg.selectAll("circle")
      .attr({
        "cx" : function(d) {
          return xScale(d[0]);
        },
        "cy" : function(d) {
          return yScale(d[1]);
        },
        "r" : function(d) {
          return bubbleScale(d[3]);
         
        },
        "class" : function(d) {
          return d[2];
        }
      });

    // update the axes 
    xAxis
      .scale(xScale);

    yAxis
      .scale(yScale);

    svg.selectAll(".xAxis")
      .call(xAxis);
 
    svg.selectAll(".yAxis")
     .style({
        "transform" : function () {
          return "translate(" + ((width/2) + 62) + "px,2em)";
        }
      })
      .call(yAxis);
 

  }

  var xTickLabels = ["Birth", "School", "University", "Working Life", "Family Life", "Retirement"];
  var yTickLabels = ["Cadastre - 205",
    "Car Registration - 87",
    "Certification of Personal Documents (Marriage, Divorce...) - 298",
    "Civil Register Authentication - 64","Cleaning of Judicial Record - 419",
    "Diploma Certification - 36",
    "Driving Licence - 83",
    "Driving Licence Replacement - 174",
    "Electricity Request - 4",
    "Fines: Parking Ticket - 85",
    "Hospital Admission - 71",
    "Housing Loan - 124",
    "Housing Permit - 147",
    "Identity card - 95",
    "Judicial Record - 96",
    "License for Commercial Enterprise - 163",
    "Mecanique - 84",
    "Passport - 97",
    "Permit to issue an approval for foreigners' competency licence holders - 472",
    "Redemption request a financial guarantee (certificate of deposit) - 312",
    "Passport Renewal  - 275",
    "Results of Official Examinations - 203",
    "Social Security Family Procedures - 116",
    "Social Security Paperwok - 115",
    "Subscription to Lebanese University - 39",
    "Water Request - 44"
  ];




})();
