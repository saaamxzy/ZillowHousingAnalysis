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

router.get('/homevalues', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'homevalues.html'))
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
  

  var query = "SELECT hv.time_stamp, hv.price FROM homevalue hv WHERE hv.metro_id = "+ metroID +" and hv.property_type = '"+p_type+"' ORDER BY hv.time_stamp";

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

  var query = "SELECT ROWNUM, a.* from (SELECT name, id FROM METRO WHERE name like '%"+name+"%') a";

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

// router.get('/recommendation/recMovies/:movieId', function(req, res) {

//   var movieId = req.params.movieId;    // if you have a parameter
//   var query = 'SELECT DISTINCT g.genre ' +
//               'FROM zhengyx.Genres g, zhengyx.Movies m ' +
//               'WHERE g.movie_id = ' + movieId + ';';

//   //console.log(query);



// Login uses POST request
// router.post('/login', function(req, res) {
//   // use console.log() as print() in case you want to debug, example below:
//   // console.log(req.body); will show the print result in your terminal

//   // req.body contains the json data sent from the loginController
//   // e.g. to get username, use req.body.username

//   var query = "INSERT INTO zhengyx.User VALUE ('" + req.body.username + "', '" + req.body.password +
//   "') ON duplicate key update password = '" + req.body.password + "';"; 
//   /* Write your query here and uncomment line 21 in javascripts/app.js*/
//   connection.query(query, function(err, rows, fields) {
//     // console.log("rows", rows);
//     // console.log("fields", fields);
//     if (err) console.log('insert error: ', err);
//     else {
//       res.json({
//         result: 'success'
//       });
//     }
//   });
// });

// // Dashboard uses GET request
// router.get('/dashboard/user', function(req, res) {
//   // use console.log() as print() in case you want to debug, example below:
//   // console.log(req.body); will show the print result in your terminal

//   // req.body contains the json data sent from the loginController
//   // e.g. to get username, use req.body.username
//   var query = "SELECT * FROM zhengyx.User;";
//   /* Write your query here and uncomment line 21 in javascripts/app.js*/
//   connection.query(query, function(err, rows, fields) {
//     if (err) console.log('select user error: ', err);
//     else {
//       //console.log(rows);
//       res.json({rs : rows});
//     }
//   });
// });

// // Dashboard movies GET request
// router.get('/dashboard/genres', function(req, res) {
//   var query = "SELECT DISTINCT(genre) from zhengyx.Genres;";
//   connection.query(query, function(err, rows, fields) {
//     if (err) console.log('select genre error: ', err);
//     else {
//       res.send(rows);
//     }
//   });
  
// });

// router.post('/dashboard/top_movies', function(req, res) {
//   var query = "SELECT m.title, m.rating, m.vote_count FROM " +
//               "zhengyx.Movies m, zhengyx.Genres g " +
//               "WHERE g.genre = '" + req.body.genre + "' AND m.id = g.movie_id " +
//               "order by m.rating desc, m.vote_count desc limit 10;"
//   connection.query(query, function(err, rows, fields) {
//     if (err) console.log('select top movies error: ', err);
//     else {
//       //console.log(rows.title);
//       res.send(rows);
//     }
//   });
// });

// router.get('/recommendation/recMovies/:movieId', function(req, res) {

//   var movieId = req.params.movieId;    // if you have a parameter
//   var query = 'SELECT DISTINCT g.genre ' +
//               'FROM zhengyx.Genres g, zhengyx.Movies m ' +
//               'WHERE g.movie_id = ' + movieId + ';';

//   //console.log(query);

//   connection.query(query, function(err, rows, fields) {
//     if (err) console.log(err);
//     else {
//       // console.log(rows);
//       if (rows.length == 0) {
//         console.log('No such movie id.');
//         res.json({'invalid_id':1});
//       } else {
//         var genres = [];
//         for (var i = 0; i < rows.length; i++) {
//           genres.push("'" + rows[i].genre + "'");
//         }
//         var genres_str = '(' + genres.join(', ') + ')';
//         console.log(genres_str);
//         var query2 =      'SELECT title, genre, id FROM ' +
//                           '(SELECT * FROM ' +
//                           '(SELECT m.title, g.genre, m.id ' +
//                           'FROM zhengyx.Movies m, zhengyx.Genres g ' +
//                           'WHERE m.id = g.movie_id AND m.id != '+ movieId +' AND ' + 
//                           'g.genre IN ' + genres_str + ' ) a ' + 
//                           'group by id) b ' +
//                           'group by genre;';
//         //console.log(query2);
//         connection.query(query2, function(err, first_res) {
//           if (err) console.log(err);
//           else {
//             var result = [];
//             if (first_res.length >= 10) {
//               for (var i = 0; i < 10; i++) {
//                 result.push(first_res[i]);
//               }
//               res.send(result);
//             } else {
//               var limit_length = 10 - first_res.length;

//               var ids = [];

//               for (var i = 0; i < first_res.length; i++) {
//                 ids.push(first_res[i].id);
//                 result.push(first_res[i]);
//               }
//               ids_str = '(' + ids.join(', ') + ')';
//               console.log(ids_str);
//               var query3 =  'SELECT m.title, g.genre ' +
//                             'FROM zhengyx.Movies m, zhengyx.Genres g ' +
//                             'WHERE m.id = g.movie_id AND m.id != '+ movieId +' AND ' + 
//                             'g.genre IN ' + genres_str + ' AND m.id NOT IN ' +
//                             ids_str + ' GROUP BY id limit ' + limit_length + ';';

//               connection.query(query3, function(err, second_res) {
//                 if (err) console.log(err);
//                 else {
//                   for (i = 0; i < second_res.length; i++) {
//                     result.push(second_res[i]);
//                   }
//                   res.send(result);
                  
//                 }
//               });
//             }
//           }
//         });
//       }
//     }
//   });
// });

// router.get('/bestof/:year', function(req, res) {

//   var year = req.params.year; // if you have a custom parameter
//   console.log(year);

//   var query1 =
//   'SELECT final.genre, final.title, final.vote_count from ' +
//   '(SELECT DISTINCT b.title, b.vote_count, b.genre ' + 
//   'FROM (SELECT m.title, m.id, m.vote_count, g.genre ' +
//   'FROM zhengyx.Movies m, zhengyx.Genres g ' +
//   'WHERE m.release_year = '+ year +' AND m.id = g.movie_id ' +
//   'order by genre, vote_count desc) b JOIN ' +
//   '(SELECT MAX(vote_count) as vote_count FROM ' +
//   '(SELECT m.title, m.id, m.vote_count, g.genre ' +
//   'FROM zhengyx.Movies m, zhengyx.Genres g ' +
//   'WHERE m.release_year = '+ year +' AND m.id = g.movie_id ' +
//   'order by genre, vote_count desc) a ' +
//   'group by genre) maxi on b.vote_count = maxi.vote_count ' +
//   'order by maxi.vote_count desc) final ' +
//   'group by genre; ';

//   //console.log(query1);

//   connection.query(query1, function(err, rows) {
//     if (err) console.log(err);
//     else {
//       res.send(rows);
//     }
//   });

//   // var query1 = 'SELECT DISTINCT g.genre ' + 
//   //             'FROM zhengyx.Genres g, zhengyx.Movies m ' + 
//   //             'WHERE g.movie_id = m.id AND m.release_year = ' +year + ';';

//   // res.send(query1);

//   // // console.log(query);

//   // connection.query(query1, function(err, genres, fields) {
//   //   if (err) console.log(err);
//   //   else {
//   //     var g;
//   //     var bests = [];
//   //     for (var i = genres.length - 1; i >= 0; i--) {
//   //       g = genres[i].genre;
//   //       var query2 = 'SELECT g.genre, m.title, m.vote_count ' +
//   //                     'FROM zhengyx.Movies m, zhengyx.Genres g ' +
//   //                     'WHERE m.id = g.movie_id AND g.genre = \''+ g + '\' AND m.release_year = ' + year + ' ' +
//   //                     'order by vote_count desc limit 1;';
//   //       //console.log(query2);
//   //       connection.query(query2, function(err, best) {
//   //         if (err) console.log(err);
//   //         else {
//   //           bests.push(best);
//   //         }
//   //       });
//   //     }
//   //     res.send(bests);
//   //   }
//   // });
// });

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
