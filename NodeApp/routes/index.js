var express = require('express');
var router = express.Router();
var path = require('path');

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
router.get('/rentalanalysis', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'rentalanalysis.html'))
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

router.post('/homevalues/choropleth', function(req, res) {
  var year = req.body.year;

  var query = "SELECT avg(price) as price, m.state_code from homevalue hv join metro m on m.id " +
  "= hv.metro_id where substr (hv.time_stamp, 1,4) = "+year+" group by m.state_code";

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
 * ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
 * 
 * /generalquery below
 * 
 * ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
 */

/**
 * @author: Zhiyuan Li
 * /generalquery : Get Price-to-Rent Ratio
 */
router.post('/generalquery/query0', function(req, res){
  var mid = req.body.metroId;
  var query = "SELECT Min(name), substr(time_stamp,1,4) AS year, round(AVG(ptr),2) AS Price_to_Rent_Ratio " + "\n" +
              "FROM ptr p JOIN metro ON p.metro_id=metro.id " + "\n" +
              "WHERE metro_id= "+ mid + "\n" +
              "GROUP BY substr(time_stamp,1,4) " + "\n" +
              "ORDER BY substr(time_stamp,1,4)";
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
          console.log(result);
          res.send(result);
        });
    });
});

/**
 * @author: Zhiyuan Li
 * /generalquery : Metros With Highest Price-to-Rent Ratio at A Time Stamp
 */
router.post('/generalquery/query1Max', function(req, res){
  var timestamp = req.body.timestamp;
  var query= "SELECT * FROM \
              ( \
              SELECT name, ptr AS Price_to_Rent_ratio \
              FROM ptr p JOIN metro ON p.metro_id=metro.id \
              WHERE ptr > (SELECT ptr \
              FROM ptr p JOIN metro ON p.metro_id=metro.id \
              WHERE name='United States' AND time_stamp= '" + timestamp + "') AND time_stamp= '" + timestamp + "' \
              ORDER BY Price_to_Rent_ratio DESC \
              ) \
              WHERE ROWNUM <= 10";
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
          console.log(result);
          res.send(result);
        });
    });
});

/**
 * @author: Zhiyuan Li
 * /generalquery : Metros With Lowest Price-to-Rent Ratio at A Time Stamp
 */
router.post('/generalquery/query1Min', function(req, res){
  var timestamp = req.body.timestamp;
  var query= "SELECT * FROM \
              ( \
              SELECT name, ptr AS Price_to_Rent_ratio \
              FROM ptr p JOIN metro ON p.metro_id=metro.id \
              WHERE ptr < (SELECT ptr \
              FROM ptr p JOIN metro ON p.metro_id=metro.id \
              WHERE name='United States' AND time_stamp= '" + timestamp + "') AND time_stamp= '" + timestamp + "' \
              ORDER BY Price_to_Rent_ratio ASC \
              ) \
              WHERE ROWNUM <= 10";
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
          console.log(result);
          res.send(result);
        });
    });
});

/**
 * @author: Zhiyuan Li
 * /generalquery: compare sales with large and small ptr
 */
router.post('/generalquery/query2', function(req, res){
  var ptrvar = req.body.ptrvar;
  var query = "SELECT ROWNUM, state_name, avg_sales_small_ptr, avg_sales_large_ptr, ratio FROM ( " + "\n" +
              "SELECT state_name, avg_sales_small_ptr, avg_sales_large_ptr, ratio " + "\n" +
              "FROM STATE INNER JOIN ( " + "\n" +
              "SELECT t.state_code, avg_sales_small_ptr, avg_sales_large_ptr, ROUND(avg_sales_small_ptr/avg_sales_large_ptr,2) AS ratio " + "\n" +
              "FROM( " + "\n" +
              "SELECT state_code, ROUND(AVG(num_sales)) AS avg_sales_small_ptr " + "\n" +
              "FROM metro m, ptr p, salescount s " + "\n" +
              "WHERE m.id = p.metro_id AND p.metro_id = s.metro_id AND ptr<= " + ptrvar + "\n" +
              "GROUP BY state_code " + "\n" +
              ") t INNER JOIN ( " + "\n" +
              "SELECT state_code, ROUND(AVG(num_sales)) AS avg_sales_large_ptr " + "\n" +
              "FROM metro m, ptr p, salescount s " + "\n" +
              "WHERE m.id = p.metro_id AND p.metro_id = s.metro_id AND ptr> " + ptrvar + "\n" +
              "GROUP BY state_code) t1 ON t.state_code=t1.state_code " + "\n" +
              ") result " + "\n" +
              "ON STATE.state_code = result.state_code " + "\n" +
              "ORDER BY ratio)";
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
          console.log(result);
          res.send(result);
        });
    });
});

/**
 * ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
 * 
 * /busyseason below
 * 
 * ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
 */

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

/**
 * ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
 * 
 * @auther Shuqi Zhang
 * /busyseason below
 * 
 * ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
 */

/**
 * get average radio of rent to income from each state within a year(given by user)
 * (state_code, percentage)
 * @auther: Shuqi Zhang
 */
router.post('/rentalanalysis/getratio', function(req, res) {
  console.log("enter query.........");
  var year = req.body.year;
  console.log(year);
  var query = "WITH tmp AS (SELECT rentalprice.metro_id AS metro_id, ROUND(AVG(rentalprice.price)) AS avg_price" + "\n" +
              "FROM rentalprice" + "\n" +
              "WHERE substr(rentalprice.time_stamp,0,4)="+year+" AND property_type='singlefamily' " + "\n" + 
              "GROUP BY rentalprice.metro_id)," + "\n" +
              "tmp2 AS (SELECT * FROM metro JOIN tmp ON tmp.metro_id=metro.id)," + "\n" +
              "tmp5 AS (SELECT state_code, ROUND(AVG(avg_price)*12) AS avg_price" + "\n" + 
              "FROM tmp2" + "\n" +
              "WHERE state_code<>'United States' AND avg_price<>0" + "\n" +
              "GROUP BY state_code)," + "\n" +
              "tmp3 AS (SELECT  metro_id,ROUND(AVG(mhi.income)) as income" + "\n" + 
              "FROM mhi" + "\n" +
              "WHERE substr(mhi.time_stamp,0,4)="+year+"" + "\n" +
              "GROUP BY metro_id)," + "\n" +
              "tmp4 AS (SELECT state_code, ROUND(AVG(tmp3.income)) AS avg_income" + "\n" +
              "FROM metro JOIN tmp3 ON tmp3.metro_id=metro.id" + "\n" +
              "WHERE state_code<>'United States'" + "\n" +
              "GROUP BY state_code)" + "\n" +
              "SELECT tmp4.state_code, ROUND((tmp5.avg_price/tmp4.avg_income)*100,1) AS percentage " + "\n" + 
              "FROM tmp4 JOIN tmp5 ON tmp4.state_code=tmp5.state_code";
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
 * get average radio of rent to income over years(no user input)
 * (time_year, percentage)
 * @auther: Shuqi Zhang
 */
router.post('/rentalanalysis/getratiograph', function(req, res) {
  console.log("enter /rentalanalysis/getratiograph query.........");
  var query = "WITH tmp1 AS (SELECT substr(rentalprice.time_stamp,0,4) AS time_year, ROUND(AVG(rentalprice.price)*12) as avg_price" + "\n" +
              "FROM rentalprice " + "\n" + 
              "GROUP BY substr(rentalprice.time_stamp,0,4)), " + "\n" +
              "tmp2 AS (SELECT substr(mhi.time_stamp,0,4) AS time_year, ROUND(AVG(income)) AS avg_income" + "\n" +
              "FROM mhi " + "\n" +
              "GROUP BY substr(mhi.time_stamp,0,4))" + "\n" +
              "SELECT tmp2.time_year, ROUND((tmp1.avg_price/tmp2.avg_income)*100,1) AS percentage" + "\n" +
              "FROM tmp1 JOIN tmp2 ON tmp1.time_year=tmp2.time_year";

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
