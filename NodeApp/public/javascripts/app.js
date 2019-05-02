var app = angular.module('angularjsNodejsTutorial', []);

// // Template for adding a controller
// app.controller('dashUserController', function($scope, $http) {
//   // normal variables
//   // var dummyVar1 = 'abc';

//   // // Angular scope variables
//   // $scope.dummyVar2 = 'abc';
//   // $scope.userList = [ { username: 'abc'}];
//   var req = $http.get('/dashboard/user');

//   req.success(function(data) {
//     $scope.userList = data.rs;
//   });

//   req.error(function(err) {
//     console.log("error: ", err);
//   });

//   //$scope.getUserlist();

// });

/**
 * Controller for metro
 */
var current_cursor = 0;
// Controller for homevalues page
app.controller('homeValuesController', function($scope, $http) {
  // normal variables

  $scope.cursor = 0;
  $scope.next = function() {
    if ($scope.cursor <= 920) {$scope.cursor += 10; }
  };

  $scope.prev = function() {
    if ($scope.cursor >= 10) { $scope.cursor -= 10; }
    
  };
  
  
  $scope.dynamic = function(cursor) {
    //return $scope.metroList.slice(cursor, cursor+10);
    if ($scope.metroList) {
      var rs = [];

      for (var i = cursor; i < cursor+10; i++) {
        if ($scope.metroList[i]) {
          rs.push($scope.metroList[i]);
        }
      }
      return rs;
    }
  }



  var req = $http({
      url: '/homevalues/metros', //+ movieId,
      method: "POST",
      data: {
        'current_cursor' : current_cursor
      }
    });

  req.success(function(data) {
    console.log('success in finding all metros.');
    $scope.metroList = data.rows;
  });

  req.error(function(err) {
    console.log("error: ", err);
  });


});

/**
 * Search for homevalue time series
 */
app.controller('homeValuesSearchController', function($scope, $http) {
  // normal variables
  // var dummyVar1 = 'abc';

  $scope.getPrices = function(metroID1, p_type1, metroID2, p_type2) {

    if (!metroID2){
      var request = $http({
        url: '/homevalues/metroprices', //+ movieId,
        method: "POST",
        data: {
          'metroID' : metroID1,
          'p_type' : p_type1
        }
      }); 
      request.success(function(response) {
        //console.log(response.rows);
        function getFirst(e) {
          return e[0];
        };
        function getSecond(e) {
          return e[1];
        };
        $scope.x1 = response.rows.map(getFirst);
        $scope.y1 = response.rows.map(getSecond);
        console.log('metro 1 finished.');
      });
        
      request.error(function(err) {
        console.log("error: ", err);
      });

      var x1 = $scope.x1;
      var y1 = $scope.y1;
      p = document.getElementById('plot');
      var trace = {
        x:x1, y:y1, 
        name: 'metro1',
        type: 'scatter'
      };
      // var trace2 = {
      //   x, y
      // };
      var data = [trace];
      var layout = { showlegend: true,
        legend: {x:1, y:1}
      };
      Plotly.newPlot(p, data);
    }
    var request = $http({
      url: '/homevalues/metroprices', //+ movieId,
      method: "POST",
      data: {
        'metroID' : metroID1,
        'p_type' : p_type1
      }
    });

    request.success(function(response) {
      //console.log(response.rows);
      function getFirst(e) {
        return e[0];
      };
      function getSecond(e) {
        return e[1];
      };
      $scope.x1 = response.rows.map(getFirst);
      $scope.y1 = response.rows.map(getSecond);
      console.log('metro 1 finished.');
      //var x = $scope.x1;

      
    });

    request.error(function(err) {
      console.log("error: ", err);
    });

    var request2 = $http({
      url: '/homevalues/metroprices', //+ movieId,
      method: "POST",
      data: {
        'metroID' : metroID2,
        'p_type' : p_type2
      }
    });

    request2.success(function(response) {
      //console.log(response.rows);
      function getFirst(e) {
        return e[0];
      };
      function getSecond(e) {
        return e[1];
      };
      $scope.x2 = response.rows.map(getFirst);
      $scope.y2 = response.rows.map(getSecond);
      
      // console.log($scope.y1);
      // console.log($scope.y2);
      console.log('metro 2 finished.');

      var x1 = $scope.x1;
      var x2 = $scope.x2;
      var y1 = $scope.y1;
      var y2 = $scope.y2;

      p = document.getElementById('plot');
      var trace1 = {
        x:x1, y:y1, 
        name: 'metro1',
        type: 'scatter'
      };
      var trace2 = {
        x:x2, y:y2, 
        name: 'metro2',
        type: 'scatter'
      };
      // var trace2 = {
      //   x, y
      // };
      var data = [trace1, trace2];
      var layout = { showlegend: true,
        legend: {x:1, y:1}
      };
      Plotly.newPlot(p, data);

      
    });

    request2.error(function(err) {
      console.log("error: ", err);
    });


  };

});

function getFirst(e) {
  return e[0];
};
function getSecond(e) {
  return e[1];
}; 

app.controller('homeValuesIdSearchController', function($scope, $http) {
  $scope.getMetroId = function(name) {
    var request = $http({
      url: '/homevalues/metroId', 
      method: "POST",
      data: {
        'name' : name
      }
    });

    request.success(function(response) {
      $scope.metroIds = response.rows;
    });

    request.error(function(err) {
      console.log("error: ", err);
    });
  };
});

function getMax(e) {
  var max = e[0];
  for (var i = e.length - 1; i >= 0; i--) {
    if (e[i] > max) {
      max = e[i];
    }
  }
  return max;
};

function getMin(e) {
  var min = e[0];
  for (var i = e.length - 1; i >= 0; i--) {
    if (e[i] < min) {
      min = e[i];
    }
  }
  return min;
};

app.controller('homeValuesChoroplethController', function($scope, $http) {
  $scope.getChoro = function(year) {
    var request = $http({
      url: '/homevalues/choropleth', 
      method: "POST",
      data: {
        'year' : year
      }
    });

    request.success(function(response) {
      c = document.getElementById('choropleth');

      Plotly.purge(c);
      var rows = response.rows;
      console.log(rows);
      console.log(getMax(rows.map(getFirst)));

      states = rows.map(getSecond);
      vals = rows.map(getFirst);
      var max = getMax(vals);
      var min = getMin(vals);

      var data = [{
          type: 'choropleth',
          locationmode: 'USA-states',
          locations: states,
          z: vals,
          text: states,
          zmin: min,
          zmax: max,
          colorscale: [
              [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
              [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
              [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
          ],
          colorbar: {
              title: 'House Prices',
              thickness: 0.2
          },
          marker: {
              line:{
                  color: 'rgb(255,255,255)',
                  width: 2
              }
          }
      }];


      var layout = {
          title: year + 'US Housing price by State',
          geo:{
              scope: 'usa',
              showlakes: true,
              lakecolor: 'rgb(255,255,255)'
          }
      };

      Plotly.plot(c, data, layout, {showLink: false});

    });

    request.error(function(err) {
      console.log("error: ", err);
    });
  };
});


/**
 * Rental Price Search Controller
 * @auther: Zhiyuan Li
 */
app.controller('rentalPricesSearchController', function($scope, $http) {
  // normal variables
  // var dummyVar1 = 'abc';

  $scope.getPrices = function(metroID1, p_type1, metroID2, p_type2) {

    if (!metroID2){
      var request = $http({
        url: '/rentalprices/metroprices', //+ movieId,
        method: "POST",
        data: {
          'metroID' : metroID1,
          'p_type' : p_type1
        }
      });
      request.success(function(response) {
        //console.log(response.rows);
        function getFirst(e) {
          return e[0];
        };
        function getSecond(e) {
          return e[1];
        };
        $scope.x1 = response.rows.map(getFirst);
        $scope.y1 = response.rows.map(getSecond);
        console.log('metro 1 finished.');
        //var x = $scope.x1;
      });

      request.error(function(err) {
        console.log("error: ", err);
      });

      var x1 = $scope.x1;
      var y1 = $scope.y1;
      p = document.getElementById('plot');

      var trace1 = {
        x:x1, y:y1, 
        name: 'metro1',
        type: 'scatter'
      };
      
      var data = [trace1];
      var layout = { showlegend: true,
        legend: {x:1, y:1}
      };
      Plotly.newPlot(p, data);
    }
    var request = $http({
      url: '/rentalprices/metroprices', //+ movieId,
      method: "POST",
      data: {
        'metroID' : metroID1,
        'p_type' : p_type1
      }
    });

    request.success(function(response) {
      //console.log(response.rows);
      function getFirst(e) {
        return e[0];
      };
      function getSecond(e) {
        return e[1];
      };
      $scope.x1 = response.rows.map(getFirst);
      $scope.y1 = response.rows.map(getSecond);
      console.log('metro 1 finished.');
      //var x = $scope.x1;

      
    });

    request.error(function(err) {
      console.log("error: ", err);
    });

    var request2 = $http({
      url: '/rentalprices/metroprices', //+ movieId,
      method: "POST",
      data: {
        'metroID' : metroID2,
        'p_type' : p_type2
      }
    });

    request2.success(function(response) {
      //console.log(response.rows);
      function getFirst(e) {
        return e[0];
      };
      function getSecond(e) {
        return e[1];
      };
      $scope.x2 = response.rows.map(getFirst);
      $scope.y2 = response.rows.map(getSecond);
      
      // console.log($scope.y1);
      // console.log($scope.y2);
      console.log('metro 2 finished.');

      var x1 = $scope.x1;
      var x2 = $scope.x2;
      var y1 = $scope.y1;
      var y2 = $scope.y2;

      p = document.getElementById('plot');
      var trace1 = {
        x:x1, y:y1, 
        name: 'metro1',
        type: 'scatter'
      };
      var trace2 = {
        x:x2, y:y2, 
        name: 'metro2',
        type: 'scatter'
      };
      // var trace2 = {
      //   x, y
      // };
      var data = [trace1, trace2];
      var layout = { showlegend: true,
        legend: {x:1, y:1}
      };
      Plotly.newPlot(p, data);

      
    });

    request2.error(function(err) {
      console.log("error: ", err);
    });


  };

});

/**
 * ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
 * 
 * @author: Zhiyuan Li
 * Controller for /generalquery below
 * 
 * ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
 */
app.controller('generalqueryController', function($scope, $http) {
  /**
   * Get Price-to-Rent Ratio
   */
  $scope.query0 = function(metroId){
    console.log("metroId = " + metroId);
    var req = $http({
      url: '/generalquery/query0',
      method: "POST",
      data:{'metroId': metroId}
    });
    req.success(function(response) {
      console.log(response);
      $scope.result0 = response.rows;
    });
    req.error(function(err) {
      console.log("error: ", err);
    });
  }
  /**
   * Metros With Highest Price-to-Rent Ratio at A Time Stamp
   */
  $scope.query1Max = function(timestampMax){
    console.log("timestampMax = " + timestampMax);
    var req = $http({
      url: '/generalquery/query1Max',
      method: "POST",
      data:{'timestamp': timestampMax}
    });
    req.success(function(response) {
      console.log(response);
      $scope.result1Max = response.rows;
    });
    req.error(function(err) {
      console.log("error: ", err);
    });
  }
  /**
   * Metros With Lowest Price-to-Rent Ratio at A Time Stamp
   */
  $scope.query1Min = function(timestampMin){
    console.log("timestampMin = " + timestampMin);
    var req = $http({
      url: '/generalquery/query1Min',
      method: "POST",
      data:{'timestamp': timestampMin}
    });
    req.success(function(response) {
      console.log(response);
      $scope.result1Min = response.rows;
    });
    req.error(function(err) {
      console.log("error: ", err);
    });
  }
  /**
   * Compare sales with large and small ptr
   */
  $scope.query2 = function(ptrvar){
    console.log("ptrvar = " + ptrvar);
    var req = $http({
      url: '/generalquery/query2',
      method: "POST",
      data:{'ptrvar': ptrvar}
    });
    req.success(function(response) {
      console.log(response);
      $scope.result2 = response.rows;
    });
    req.error(function(err) {
      console.log("error: ", err);
    });
  }
});

/**
 * ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
 * 
 * @author: Zhiyuan Li
 * Controller for /busyseason below
 * 
 * ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
 */
app.controller('busySeasonController', function($scope, $http) {
  /**
   * get busy season
   */
  $scope.getBusySeason = function(){
    var req = $http({
      url: '/busyseason/getbusyseason',
      method: "GET"
    });
    req.success(function(response) {
      console.log(response);
      // $scope.busySeasonTable = response.rows;
      function getFirst(e) {
        return e[0];
      };
      function getSecond(e) {
        return e[1];
      };
      function getThird(e){
        return e[2];
      };
      $scope.state = response.rows.map(getFirst);
      $scope.busyMonth = response.rows.map(getSecond);
      $scope.weight = response.rows.map(getThird);
      var x0 = $scope.state;
      var y1 = $scope.busyMonth;
      var y2 = $scope.weight;
      p = document.getElementById('plot');
      var trace1 = {
        x:x0, y:y1, 
        name: 'busiest month',
        type: 'scatter'
      };
      var trace2 = {
        x:x0, y:y2, 
        name: 'adjusted sales over population',
        type: 'scatter'
      };
      var data = [trace1, trace2];
      var layout = {legend: {
        x: 0,
        y: 1,
        traceorder: 'normal',
        font: {
          family: 'sans-serif',
          size: 12,
          color: '#000'
        },
        bgcolor: '#E2E2E2',
        bordercolor: '#FFFFFF',
        borderwidth: 2
      }};
      Plotly.newPlot(p, data, layout);
    });
    req.error(function(err) {
      console.log("error: ", err);
    });
  }
  /** 
   * get busy season reason: MHI
   */ 
  $scope.getBusySeasonReasonMHI = function(){
    var req = $http({
      url: '/busyseason/getBusySeasonReasonMHI',
      method: "GET"
    });
    req.success(function(response) {
      console.log(response);
      $scope.busySeasonReasonMHITable = response.rows;
    });
    req.error(function(err) {
      console.log("error: ", err);
    });
  }
  /** 
   * get busy season reason: Rental
   */ 
  $scope.getBusySeasonReasonRental = function(){
    var req = $http({
      url: '/busyseason/getBusySeasonReasonRental',
      method: "GET"
    });
    req.success(function(response) {
      console.log(response);
      $scope.busySeasonReasonRentalTable = response.rows;
    });
    req.error(function(err) {
      console.log("error: ", err);
    });
  }
  /** 
   * get busy season reason: Homevalue
   */ 
  $scope.getBusySeasonReasonHomevalue = function(){
    var req = $http({
      url: '/busyseason/getBusySeasonReasonHomevalue',
      method: "GET"
    });
    req.success(function(response) {
      console.log(response);
      $scope.busySeasonReasonHomevalueTable = response.rows;
    });
    req.error(function(err) {
      console.log("error: ", err);
    });
  }
});

/**
 * ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
 * 
 * @author: Shuqi ZhANG
 * rental analysis page controller 
 * 
 * ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
 */
app.controller('rentalanalysisController', function($scope, $http) {
  $scope.getRatio = function(year){
    console.log(year);
    var req = $http({
      url: '/rentalanalysis/getratio',
      method: "POST", 
      data: {
        'year': year
        }
    });
    req.success(function(response) {
      console.log(response);
      function getFirst(e) {
        return e[0];
      };
      function getSecond(e) {
        return e[1];
      };
      $scope.statecode = response.rows.map(getFirst);
      $scope.percentage = response.rows.map(getSecond);
      var x0 = $scope.statecode;
      var y1 = $scope.percentage;
      console.log($scope.statecode);
      console.log('checkpoint1');
      console.log(x0);
      p = document.getElementById('plot');
      var trace = {
        x:x0, y:y1, 
        name: 'rent to income ratio',
        type: 'bar'
      };
      var data = [trace];
      var layout = { 
        showlegend: true,
        legend: {x:1, y:1}
      };
      Plotly.newPlot(p, data);

    });

    req.error(function(err) {
      console.log("error: ", err);
    });
    
      
  }
  /** 
   * get ratio over year
   */ 
  $scope.getRatioGraph = function(){
    console.log("enter controller: get ratio graph");
    var req = $http({
      url: '/rentalanalysis/getratiograph',
      method: "POST"
    });
    req.success(function(response) {
      console.log(response);
      function getFirst(e) {
        return e[0];
      };
      function getSecond(e) {
        return e[1];
      };
      $scope.timeyear = response.rows.map(getFirst);
      $scope.percentage = response.rows.map(getSecond);
      var x0 = $scope.timeyear;
      var y1 = $scope.percentage;
      console.log($scope.timeyear);
      console.log('checkpoint1');
      console.log(x0);
      console.log(y1);
      p = document.getElementById('plot2');
      var trace = {
        x:x0, y:y1, 
        name: 'rent to income ratio over year',
        type: 'bar'
      };
      var data = [trace];
      var layout = { 
        showlegend: true,
        legend: {x:1, y:1}
      };
      Plotly.newPlot(p, data);

    });

    req.error(function(err) {
      console.log("error: ", err);
    });
  
  }


});
// Template for adding a controller
/*
app.controller('dummyController', function($scope, $http) {
  // normal variables
  var dummyVar1 = 'abc';

  // Angular scope variables
  $scope.dummyVar2 = 'abc';

  // Angular function
  $scope.dummyFunction = function() {

  };
});
*/
