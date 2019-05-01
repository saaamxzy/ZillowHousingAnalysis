var express = require('express');
var router = express.Router();
var path = require('path');

// Connect string to MySQL
// var mysql = require('mysql');

// var connection = mysql.createConnection({
//   host: 'fling.seas.upenn.edu',
//   user: 'zhengyx',
//   password: 'moonlytheMAGE110**',
//   database: 'zhengyx'
// });

// connection.connect(function(err) {
//   if (err) {
//     console.log("Error Connection to DB" + err);
//     return;
//   }
//   console.log("Connection established...");
// });

var oracledb = require('oracledb');
// oracledb.getConnection(
//   {
//     user          : "cis550project",
//     password      : "cis550project!",
//     connectString : "cis550project.cleob96hq2jj.us-east-1.rds.amazonaws.com/CIS550DB"
//   },
//   function(err, connection)
//   {
//     if (err) {
//       console.log(err);
//     } 
//     console.log("Connection established...");
//       connection.execute(
//       "SELECT distinct m.name FROM METRO m join HOMEVALUE hv ON hv.METRO_ID = m.ID",
//       function(err, result)
//       {
//         if (err) { console.error(err); return; }
//         console.log(result.rows);
//       });
    
//   });

/* GET home page. */
// router.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, '../', 'views', 'login.html'));
// });

// router.get('/dashboard', function(req, res) {
//   res.sendFile(path.join(__dirname, '../', 'views', 'dashboard.html'));
// });

// router.get('/reference', function(req, res) {
//   res.sendFile(path.join(__dirname, '../', 'views', 'reference.html'));
// });

// router.get('/recommendation', function(req, res) {
//   res.sendFile(path.join(__dirname, '../', 'views', 'recommendation.html'))
// });

// router.get('/bestof', function(req, res) {
//   res.sendFile(path.join(__dirname, '../', 'views', 'bestof.html'))
// })

/* GET home page. */
router.get('/', function(req, res) {
   res.sendFile(path.join(__dirname, '../', 'views', 'homevalues.html'));
});
router.get('/homevalues', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'homevalues.html'))
})
router.get('/rentalprices', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'rentalprices.html'))
})
router.get('/generalquery', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'generalquery.html'))
})
// To add a new page, use the templete below
/*
router.get('/routeName', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'fileName.html'));
});
*/

router.post('/homevalues/metros', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.body); will show the print result in your terminal

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username
  var current_cursor = req.body.current_cursor;
  console.log(current_cursor);
  var query = "SELECT ROWNUM, a.* from (select distinct name, id from metro order by name) a";
  /* Write your query here and uncomment line 21 in javascripts/app.js*/

  oracledb.getConnection(
  {
    user          : "cis550project",
    password      : "cis550project!",
    connectString : "cis550project.cleob96hq2jj.us-east-1.rds.amazonaws.com/CIS550DB"
  },
    function(err, connection)
  {
    if (err) {
      console.log(err);
    } 
    console.log("Connection established...");
      connection.execute(
      query,
      function(err, result)
      {
        if (err) { console.error(err); return; }
        res.send(result);
      });
  });

});

router.post('/homevalues/metroprices', function(req, res) {

  var metroID = req.body.metroID;
  var p_type = req.body.p_type;
  // var metroID2 = req.body.metroID2;
  // var p_type2 = req.body.p_type2;
  

  var query = "SELECT hv.time_stamp, hv.price FROM homevalue hv WHERE hv.metro_id = "+ metroID 
              +" and hv.property_type = '"+p_type+"' ORDER BY hv.time_stamp";

  oracledb.getConnection(
  {
    user          : "cis550project",
    password      : "cis550project!",
    connectString : "cis550project.cleob96hq2jj.us-east-1.rds.amazonaws.com/CIS550DB"
  },
    function(err, connection)
  {
    if (err) {
      console.log(err);
    } 
    console.log("Connection established...");
      connection.execute(
      query,
      function(err, result)
      {
        if (err) { console.error(err); return; }
        //console.log(result);
        res.send(result);
      });
  });
});

router.post('/homevalues/metroId', function(req, res) {
  var name = req.body.name;
  var query;
  if (name.length > 2) {
    name = name.toLowerCase();
    query = "SELECT ROWNUM, a.* from (SELECT name, id FROM METRO WHERE LOWER(name) like '%"+name+"%') a";
  }
  else{
    query = "SELECT ROWNUM, a.* from (SELECT name, id FROM METRO WHERE name like '%"+name+"%') a";
  }

  console.log(query);

  oracledb.getConnection(
  {
    user          : "cis550project",
    password      : "cis550project!",
    connectString : "cis550project.cleob96hq2jj.us-east-1.rds.amazonaws.com/CIS550DB"
  },
    function(err, connection)
  {
    if (err) {
      console.log(err);
    } 
    console.log("Connection established...");
      connection.execute(
      query,
      function(err, result)
      {
        if (err) { console.error(err); return; }
        //console.log(result);
        res.send(result);
      });
  });

});

/**
 * Search for rental prices
 */
router.post('/rentalprices/metroprices', function(req, res) {

  var metroID = req.body.metroID;
  var p_type = req.body.p_type;
  // var metroID2 = req.body.metroID2;
  // var p_type2 = req.body.p_type2;
  

  var query = "SELECT time_stamp, price FROM rentalprice WHERE metro_id = "+ metroID 
              +" and property_type = '"+p_type+"' ORDER BY time_stamp";

  oracledb.getConnection(
  {
    user          : "cis550project",
    password      : "cis550project!",
    connectString : "cis550project.cleob96hq2jj.us-east-1.rds.amazonaws.com/CIS550DB"
  },
    function(err, connection)
  {
    if (err) {
      console.log(err);
    } 
    console.log("Connection established...");
      connection.execute(
      query,
      function(err, result)
      {
        if (err) { console.error(err); return; }
        //console.log(result);
        res.send(result);
      });
  });
});

/**
 * Trial: Search for rental prices
 */
// router.get('/rentalprices/metropricesTrial', function(request, response) {
//   var query1 = "...";
//   connection.query(query1, function(err, res) {
//     if (err)
//       response.send({err: err});
//     // do some fitting here for the res. e.g. convert it into string for IN clause (stored in tempRes variable)
//     var query2 = "SELECT * from Movies where title IN ("+ tempRes +");"
//     connection.query(query2, function(err, res) {
//       if (err)
//         response.send({err: err});
//       response.json(res);
//     });
//   });
// });

/**
 * for functionality in /generalquery
 */
router.post('/generalquery/queryOne', function(req, res){
  var arg1 = req.body.arg1;
  var arg2 = req.body.arg2;
  var query = 'select count(*) from state';
  console.log(query);
  oracledb.getConnection(
    {
      user          : "cis550project",
      password      : "cis550project!",
      connectString : "cis550project.cleob96hq2jj.us-east-1.rds.amazonaws.com/CIS550DB"
    },
      function(err, connection)
    {
      if (err) {
        console.log(err);
      } 
      console.log("Connection established...");
        connection.execute(
        query,
        function(err, result)
        {
          if (err) { console.error(err); return; }
          //console.log(result);
          //res.send(result);
          res.json({
            'status': 'success',
            'count' : result
          });
        });
    });
});

// template for GET requests
/*
router.get('/routeName/:customParameter', function(req, res) {

  var myData = req.params.customParameter;    // if you have a custom parameter
  var query = '';

  // console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});
*/

module.exports = router;
