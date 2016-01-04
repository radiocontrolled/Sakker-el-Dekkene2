(function(){
  
  "use strict";

  var bribeData; 
  var profileData = [];
  var counter = 0; 

  var height, width;

  // DATA 
  d3.csv("data/dataset.csv", function(data){
  
    populateDropdown(data);
    bribeData = data;
  });

  // BUILD SELECT OPTIONS
  var populateDropdown = function (data) {
    
    var procedure = document.getElementById("procedure");
    var select = document.createElement("select");


    procedure.appendChild(select);

    for(var i = 0; i < data.length; i++) {
      var option = document.createElement("option");

      option.value = data[i]["Procedure"];
      option.innerHTML = data[i]["Procedure"];

      select.appendChild(option);
    }
   
   select.selectedIndex = 0; 

  };


  var calculate = function () {

    var data = {};

    // part 1: populate a data object with Sakker El Dekkene bribe data for that procedure
    var select = document.getElementsByTagName("select")[0];
    var selected = select.options[select.selectedIndex].value;
    for(var i = 0; i < bribeData.length; i++) {
      if(bribeData[i]["Procedure"] === selected) {
        data.avgBribe = parseInt(bribeData[i]["Avg Bribes"]);
        data.name = bribeData[i]["Procedure"];
        data.realCost = parseInt(bribeData[i]["Real Cost"]);
        data.total = parseInt(bribeData[i]["Total (avg + real)"]);
        data.min = parseInt(bribeData[i]["Min Bribes"]);
        data.max = parseInt(bribeData[i]["Max Bribes"]);
        data.median = parseInt(bribeData[i]["Median Bribes"]);
        data.id = counter; 
        counter += 1; 
      }
    }

    // part 2: update the data object with the actual bribe paid by the end user
    var input = document.getElementById("userBribeAmount").value;
    if(input > 0 ) {

      data.bribePaidByUser = parseInt(input);

      // update the profileData array 
      profileData.push(data);
    }
    else alert("Please enter the bribe you paid for " + selected);
    
    // console.log(profileData);

  };

  var clearForm = function() {
    var select = document.getElementsByTagName("select")[0];
    select.selectedIndex = 0; 

    var input = document.getElementById("userBribeAmount"); 
    input.value = "";

    alert("clearForm");
  };

  // add event listeners
  var viewProfile = document.getElementById("viewProfile");
  viewProfile.addEventListener("click", function(event){
    if(validate() === true) {
      calculate();
      chartUpdate();
    }
    else alert("Please fill in the form");
  });
  viewProfile.addEventListener("keydown", function(event) {
    var key = event.which || event.keyCode;
    if ((key == 13) || (key ==32)) {
    if(validate() === true) {
      calculate();
      chartUpdate();
    }
    else alert("Please fill in the form");
    }
  });

  // console.log(profileData);


  var validate = function () {
      var input = document.getElementById("userBribeAmount").value;
      if(input > 0 ) return true; 
      else return false; 
  };

  // C3JS VISUALISATION

  var getViewportDimensions = function () { 
    width = document.getElementById("visContain").offsetWidth * 0.90;
    height = width / 1.5;
  };

  getViewportDimensions();

  var chart = c3.generate({
    bindto: d3.select('#vis'),
    size: {
        height: height,
        width: width
    },
      data: {
        columns: [],
        type : 'donut',
        expand: true
    },
    donut: {
      label: {
        format: function (value, ratio, id) {
          return value + "ل.ل";
        }
      },
      width: 80
    },
    onresize: function () {
      getViewportDimensions();
      chart.resize({
        height: height, 
        width: width
      });
    }
  });

  var chartUpdate = function () {

    var realCost = ["Actual cost", 0];
    var userPaid = ["Your bribe", 0]; 

    var formatData = function () {

      for(var i = 0; i < profileData.length; i++) {
      
        realCost[1] += profileData[i].realCost; 
        console.log(realCost);

        userPaid[1] += profileData[i].bribePaidByUser;
        console.log(userPaid);

      }

    }

    formatData();

     chart.load({
        columns: [
          realCost, userPaid
      ]
    });
  };  




  // var addAnotherBribe = document.getElementById("addAnotherBribe");
  // viewProfile.addEventListener("click", clearForm);
  // viewProfile.addEventListener("keydown", function(event) {
  //   var key = event.which || event.keyCode;
  //   if ((key == 13) || (key ==32)) {
  //     clearForm();
  //   }
  // });




})();
