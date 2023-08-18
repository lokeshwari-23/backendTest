const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const url = "mongodb://0.0.0.0:27017/task"
const client = new MongoClient(url);

const path = require('path');
const fs = require('fs');



//1)Create an express app in node which should count the
//number of times a user visits a web page and display it
//to the user.
//o Note: Use cookies for this question



// app.use(cookieParser());

// app.get('/', (req, res) => {
//     let flag = req.cookies.occurence || 0; 

//     res.cookie('occurence', ++flag);

//     res.send(`visited this page ${flag} times.`);
// });




//========================================================================================

// 2) Create a route in express which should have a
// middleware to authenticate a user by checking whether
// a cookie exists for that particular user or not. If the
// cookie does not exists then use error handler
// middleware to throw error message.


// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname + '/src/public', 'views'));

// const authenticateMiddleware = (req, res, next) => {
//     if (req.cookies.username) {
//         next(); 
//     } else {
//         next(new Error('Authentication required')); 
//     }
// };

// const errorHandler = (err, req, res, next) => {
//     res.send('Unauthorized: ' + err); 
// };

// app.get('/login', (req, res) => {
//     let bad_auth = req.query.msg ? true : false;
//     if (bad_auth) {
//         return res.render('login', {
//             error: 'invalid username and password'
//         });
//     } else {
//         return res.render('login');
//     }
// });

// app.post('/process_login', (req, res) => {
//     let { username,password} = req.body;
//     let userdetails = {
//         username: 'lok',
//         password:'12345'
//     };
//     if ((username === userdetails['username'])&&(password === userdetails['password'])){
//         res.cookie('username', username);
//         return res.redirect('/protected');
//     } else {
//         return res.redirect('/unauthorized');
//     }
// });

// app.get('/protected', authenticateMiddleware, (req, res) => {
//     res.send('authorized');
// });

// app.get('/unauthorized', (req, res) => {
//     res.send(' not authorized ');
// });

// app.use(errorHandler); 



//========================================================================3
// 3) Using the ‘fs’ module in nodejs, read an html file and
// display its content on the web page.

// const dataStream=fs.createReadStream('data.html','utf-8');

// dataStream.on('readable',()=>{ 

//     console.log(dataStream.read());

// })

//========================================================1
// 4) Create a user defined event in node which when fired
// should write some content to a file.

// const events=require("events");
// const eventsEmit=new events.EventEmitter();

// eventsEmit.on('write', (content) => {
//     fs.writeFile('event.txt', content, (err) => {
//         if (err) {
//             console.log("Error", err);
//         } else {
//             console.log("written successfully");
//         }
//     });
// });


// eventsEmit.emit('write', 'this file is to write and console');



//============================================================================
// 5)Create a route in express which should accept an object
// id from the url and if that object id exists in the database
// then fetch the document of that particular object id and
// pass it on to the ejs template engine to view the data.


app.set('view engine', 'ejs');
app.set('views', __dirname)

app.get('/mongodb/:id', function (req, res) {
    try {
       
        client.connect(url).then(() => {
            console.log("Connected to the databse server");
            const DB = client.db("task");

            
            console.log("Collection created")

            const coll = DB.collection('task1');
            var id=req.params.id;
            coll.find({_id: new ObjectId(id)}).toArray().then((element)=>{
          
                res.render('view',{element:element})
            })
        })
    }
    catch {
        res.send("No data base found in the databse server")
    }
})

//=========================================


app.listen(8000, function (req, res) {
    console.log('listening on port 8000')

})














