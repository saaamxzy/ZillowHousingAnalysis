var app = angular.module('angularjsNodejsTutorial', []);
app.controller('loginController', function($scope, $http) {
  $scope.verifyLogin = function() {
    // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);

    var request = $http({
      url: '/login',
      method: "POST",
      data: {
        'username': $scope.username,
        'password': $scope.password
      }
    });

    request.success(function(response) {
      // success
      // console.log(response);
      if (response.result === "success") {
        // After you've written the INSERT query in routes/index.js, uncomment the following line
        window.location.href = "http://localhost:8081/dashboard"
      }
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });

  };
});


// Template for adding a controller
app.controller('dashUserController', function($scope, $http) {
  // normal variables
  // var dummyVar1 = 'abc';

  // // Angular scope variables
  // $scope.dummyVar2 = 'abc';
  // $scope.userList = [ { username: 'abc'}];
  var req = $http.get('/dashboard/user');

  req.success(function(data) {
    $scope.userList = data.rs;
  });

  req.error(function(err) {
    console.log("error: ", err);
  });

  //$scope.getUserlist();

});

// Controller for homevalues page
app.controller('homeValuesController', function($scope, $http) {
  // normal variables
  // var dummyVar1 = 'abc';

  // // Angular scope variables
  // $scope.dummyVar2 = 'abc';
  // $scope.userList = [ { username: 'abc'}];

  var req = $http.get('/homevalues/metros');

  req.success(function(data) {
    console.log('success in finding all metros.');
    $scope.metroList = data.rows;
  });

  req.error(function(err) {
    console.log("error: ", err);
  });


});

app.controller('homeValuesSearchController1', function($scope, $http) {
  // normal variables
  // var dummyVar1 = 'abc';

  $scope.getPrices = function(metroID1, p_type1, metroID2, p_type2) {

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
      
      console.log($scope.y1);
      console.log($scope.y2);

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

app.controller('homeValuesSearchController2', function($scope, $http) {
  // normal variables
  // var dummyVar1 = 'abc';

  $scope.getPrices = function(metroID2, p_type2) {

    var request = $http({
      url: '/homevalues/metroprices', //+ movieId,
      method: "POST",
      data: {
        'metroID2' : metroID2,
        'p_type2' : p_type2
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
      $scope.x2 = response.rows.map(getFirst);
      $scope.y2 = response.rows.map(getSecond);
      var x = $scope.x2;
      var y = $scope.y2;

      // p = document.getElementById('plot');
      // var trace1 = {
      //   x, y, 
      //   name: 'metro1',
      //   type: 'scatter'
      // };
      // // var trace2 = {
      // //   x, y
      // // };
      // var data = [trace1];
      // var layout = { showlegend: true,
      //   legend: {x:1, y:1}
      // };
      // Plotly.newPlot(p, data, layout);
      
      // Plotly.plot( p, [{ x, y }], {
      //   margin: { t: 2 } 
      // });
      //$scope.time_stamps = response;
    });

    request.error(function(err) {
      console.log("error: ", err);
    });
  }

});

app.controller('homeValuesPlotController', function($scope, $http) {

  $scope.getPlot = function() {
    console.log($scope.x1);
  };

  // p = document.getElementById('plot');
  //     var trace1 = {
  //       x, y, 
  //       name: 'metro1',
  //       type: 'scatter'
  //     };
  //     // var trace2 = {
  //     //   x, y
  //     // };
  //     var data = [trace1];
  //     var layout = { showlegend: true,
  //       legend: {x:1, y:1}
  //     };
  //     Plotly.newPlot(p, data, layout);
      

});



// Controller for top movies on dashboard page
app.controller('dashMovieController', function($scope, $http) {

  var req = $http.get('/dashboard/genres');

  req.success(function(data) {
    $scope.genreList = data;
  });
  req.error(function(err) {
    console.log("error: ", err);
  });

  $scope.findTopMovies = function(genre) {
    //console.log(genre);

    var request = $http({
      url: '/dashboard/top_movies',
      method: "POST",
      data: {
        'genre': genre
      }
    });

    request.success(function(response) {
      // success
      for (var i = 0; i < response.length; i++) {
        $scope.topMovieList = response;
        //console.log(response[i]); 
      }      
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });

  };

});

// Controller for recommendation
app.controller('recommendationController', function($scope, $http) {

  $scope.getRecommendations = function(movieId) {
    //console.log(movieId);

    var request = $http({
      url: '/recommendation/recMovies/' + movieId,
      method: "GET",
      params: {
        'movieId' : movieId
      }
    });

    request.success(function(response) {
      $scope.recList = response;
    });

    request.error(function(err) {
      console.log("error: ", err);
    });
  }
});

app.controller('bestOfController', function($scope, $http) {
  // normal variables
  // var years = 'abc';

  // Angular scope variables
  years = [];
  for (var i = 2000; i < 2018; i++) {
    years.push(i);
  }
  $scope.years = years;

  $scope.getBestOf = function(year) {
    var request = $http({
      url: '/bestof/' + year,
      method: "GET",
      params: {
        'year' : year
      }
    });

    request.success(function(response) {
      $scope.bestList = response;
      console.log(response);
    });

    request.error(function(err) {
      console.log("error: ", err);
    });
  };
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
