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
 * for /generalquery
 * @auther: Zhiyuan Li
 */
app.controller('sqlControllerOne', function($scope, $http) {
  console.log($scope.arg1, $scope.arg2)
  $scope.queryOne = function(){
    var req = $http({
      url: '/generalquery/queryOne',
      method: "POST",
      data: {
        'arg1' : $scope.arg1,
        'arg2' : $scope.arg2
      }
    });
  
    req.success(function(response) {
      console.log(response);
    });
  
    req.error(function(err) {
      console.log("error: ", err);
    });
  }
});

/**
 * for /busyseason
 * @auther: Zhiyuan Li
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
