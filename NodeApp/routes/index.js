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
router.get('/busyseason', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'busyseason.html'))
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
 * @auther: Zhiyuan Li
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
 * @auther: Zhiyuan Li
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

/**
 * get busy season
 * (state, month, adjusted_sales_over_poplution)
 * @auther: Zhiyuan Li
 */
router.get('/busyseason/getbusyseason', function(req, res) {
  // var query = "WITH temp AS(select avg(income) as avg_income from mhi) select metro_id, time_stamp, income from mhi, temp where mhi.income > temp.avg_income"
  var query = "WITH result AS( " + "\n" +
              "SELECT state_code, month, SUM(weight) AS weight " + 
              "FROM METRO INNER JOIN " + 
              "(SELECT sales.metro_id, SUBSTR(time_stamp,6,2) AS month, AVG(num_sales/population) AS weight FROM " + "\n" +
              "(SELECT m.state_code, s.metro_id, s.time_stamp, s.num_sales " + "\n" +
              "FROM METRO m INNER JOIN SALESCOUNT s " + "\n" +
              "ON m.id=s.metro_id) sales  " + "\n" +
              "INNER JOIN POPULATION pop " + "\n" +
              "ON sales.state_code= pop.state_code AND SUBSTR(time_stamp,1,4)=pop.year " + "\n" +
              "GROUP BY sales.metro_id, SUBSTR(time_stamp,6,2) ) METROSALES " + "\n" +
              "ON METRO.id=METROSALES.metro_id " + "\n" +
              "GROUP BY state_code, month " + "\n" +
              ") " + "\n" +
              "SELECT state_name, month, per_sales " + "\n" +
              "FROM STATE t1 INNER JOIN " + "\n" +
              "(SELECT DISTINCT state_code, month, ROUND(1000*weight,2) AS per_sales " + "\n" +
              "FROM result WHERE (state_code, weight) " + "\n" +
              "IN (SELECT state_code, MAX(weight) FROM result GROUP BY state_code)) t2 " + "\n" +
              "ON t1.state_code=t2.state_code " + "\n" +
              "ORDER BY month";
  console.log(query);
  oracledb.getConnection(
    {
      user          : "cis550project",
      password      : "cis550project!",
      connectString : "cis550project.cleob96hq2jj.us-east-1.rds.amazonaws.com/CIS550DB"
    },
      function(err, connection)
    {
      if (err) { console.log(err); } 
      console.log("Connection established...");
        connection.execute(query, function(err, result){
          if (err) { console.error(err); return; }
          console.log(result);
          res.json(result);
        });
    });
});

/**
 * get busy season reason: MHI, i.e. Median Household Income
 * (month, avg_income)
 * @auther: Zhiyuan Li
 */
router.get('/busyseason/getBusySeasonReasonMHI', function(req, res) {
  var query = "SELECT substr(time_stamp,6,2) AS month, round(avg(income)) AS avg_income " + "\n" +
              "FROM MHI " + "\n" +
              "WHERE CAST(substr(time_stamp,1,4) AS INT)>=2000 " + "\n" +
              "GROUP BY substr(time_stamp,6,2) " + "\n" +
              "ORDER BY substr(time_stamp,6,2) ";
  console.log(query);
  oracledb.getConnection(
    {
      user          : "cis550project",
      password      : "cis550project!",
      connectString : "cis550project.cleob96hq2jj.us-east-1.rds.amazonaws.com/CIS550DB"
    },
      function(err, connection)
    {
      if (err) { console.log(err); } 
      console.log("Connection established...");
        connection.execute(query, function(err, result){
          if (err) { console.error(err); return; }
          console.log(result);
          res.json(result);
        });
    });
});

/**
 * get busy season reason: Rental
 * (month, rental_price_rank, ptr_rank)
 * @auther: Zhiyuan Li
 */
router.get('/busyseason/getBusySeasonReasonRental', function(req, res) {
  var query = "SELECT t1.month, t1.rental_price_rank, t2.ptr_rank FROM " + "\n" +
              "( " + "\n" +
              "SELECT month, rownum AS rental_price_rank " + "\n" +
              "FROM " + "\n" +
              "(SELECT substr(time_stamp,6,2) AS month, avg(price) " + "\n" +
              "FROM RENTALPRICE " + "\n" +
              "WHERE CAST(substr(time_stamp,1,4) AS INT)>=2000 " + "\n" +
              "GROUP BY substr(time_stamp,6,2) " + "\n" +
              "ORDER BY avg(price) DESC) rentalPriceRank " + "\n" +
              ") t1 " + "\n" +
              "INNER JOIN " + "\n" +
              "( " + "\n" +
              "SELECT month, rownum AS ptr_rank " + "\n" +
              "FROM " + "\n" +
              "(SELECT substr(time_stamp,6,2) AS month, avg(ptr) AS avg_ptr " + "\n" +
              "FROM PTR " + "\n" +
              "WHERE CAST(substr(time_stamp,1,4) AS INT)>=2000 " + "\n" +
              "GROUP BY substr(time_stamp,6,2) " + "\n" +
              "ORDER BY avg(ptr)) ptrRank " + "\n" +
              ") t2 " + "\n" +
              "ON t1.month = t2.month " + "\n" +
              "ORDER BY t1.month";
  console.log(query);
  oracledb.getConnection(
    {
      user          : "cis550project",
      password      : "cis550project!",
      connectString : "cis550project.cleob96hq2jj.us-east-1.rds.amazonaws.com/CIS550DB"
    },
      function(err, connection)
    {
      if (err) { console.log(err); } 
      console.log("Connection established...");
        connection.execute(query, function(err, result){
          if (err) { console.error(err); return; }
          console.log(result);
          res.json(result);
        });
    });
});

/**
 * get busy season reason: Homevalue
 * (month, avg_home_price, avg_stl, avg_home_sale_price)
 * @auther: Zhiyuan Li
 */
router.get('/busyseason/getBusySeasonReasonHomevalue', function(req, res) {
  var query = "SELECT t1.month, avg_home_price, ROUND(avg_stl,4) AS avg_stl, round(avg_home_price * avg_stl, 2) AS avg_home_sale_price FROM " + "\n" +
              "( " + "\n" +
              "SELECT substr(time_stamp,6,2) AS month, round(avg(price),2) AS avg_home_price " + "\n" +
              "FROM HOMEVALUE " + "\n" +
              "WHERE CAST(substr(time_stamp,1,4) AS INT)>=2000 " + "\n" +
              "GROUP BY substr(time_stamp,6,2) " + "\n" +
              ") t1 " + "\n" +
              "INNER JOIN " + "\n" +
              "( " + "\n" +
              "SELECT substr(time_stamp,6,2) AS month, avg(stl) AS avg_stl " + "\n" +
              "FROM STL " + "\n" +
              "WHERE CAST(substr(time_stamp,1,4) AS INT)>=2000 " + "\n" +
              "GROUP BY substr(time_stamp,6,2) " + "\n" +
              ") t2 " + "\n" +
              "ON t1.month = t2.month " + "\n" +
              "ORDER BY ROUND(avg_home_price * avg_stl, 2)";
  console.log(query);
  oracledb.getConnection(
    {
      user          : "cis550project",
      password      : "cis550project!",
      connectString : "cis550project.cleob96hq2jj.us-east-1.rds.amazonaws.com/CIS550DB"
    },
      function(err, connection)
    {
      if (err) { console.log(err); } 
      console.log("Connection established...");
        connection.execute(query, function(err, result){
          if (err) { console.error(err); return; }
          console.log(result);
          res.json(result);
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
