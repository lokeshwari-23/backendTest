//---------------------------------------------------------1-------------------------------------------------
// 1 Create a bus reservation system following the MVC Architecture which should have the following
// features
// ● User registration and login feature.
// ● Hashing the users passwords using bcrypt
// ● Users can see the list of buses available along with their prices.
// ● Users can book the available bus.
// ● Users can view their dashboard which shows their bookings.
// ● The booking of the users should automatically expire from the system once the booking date exceeds
// ● Once the users book the bus, the data should be stored in the database.
// ● Note: Use mongoose for working with database
// ● Use EJS template for front-end

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; 
const app = express();
const path = require('path');

mongoose.connect('mongodb://localhost:27017/task', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'public', 'views'));

const blogUserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const BlogUser = mongoose.model('BlogUser', blogUserSchema);

const busBookTicketSchema = new mongoose.Schema({
  Title: String,
  Subject: String,
});

const BusBookTicket = mongoose.model('BusBookTicket', busBookTicketSchema);

app.get('/home', (req, res) => {
  res.send("success");
});

app.get('/', (req, res) => {
  res.render('login');
});

app.get('/userlogin', (req, res) => {
  res.render('userlogin');
});

app.post('/edit', (req, res) => {
  var namee = req.body.names;
  res.render('edit', { name: namee });
});

app.post('/delete', (req, res) => {
  var del = req.body.del;
  res.render('delete', { del: del });
});

app.post('/render', (req, res) => {
  var C_title = req.body.title; // new title -- edit
  var C_subject = req.body.subject; // new subject -- edit
  var c_name = req.body.name; // old title to identify and edit purpose
  console.log(c_name);

  BusBookTicket.updateOne({ Title: c_name }, { Title: C_title, Subject: C_subject })
    .then(() => {
      BusBookTicket.find({})
        .then((rep) => {
          res.render('home', { rep: rep });
        })
        .catch((error) => {
          console.error("Error", error);
        });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});


app.post('/register', async (req, res) => {
  var name = req.body.username;
  var password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new BlogUser({
      username: name,
      password: hashedPassword,
    });

    await newUser.save();

    res.send("Registration successful");
  } catch (error) {
    console.error("Error:", error);
    res.send("Error during registration");
  }
});

app.post('/val', async (req, res) => {
  var name = req.body.username;
  var password = req.body.password;

  try {
    const user = await BlogUser.findOne({ username: name });

    if (user && await bcrypt.compare(password, user.password)) {
      // Passwords match, allow login
      BusBookTicket.find({})
        .then((rep) => {
          res.render('home', { rep: rep });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // Invalid user or password
      res.send("Invalid user");
    }
  } catch (error) {
    console.error("Error:", error);
    res.send("Error during login");
  }
});

app.post('/delete', (req, res) => {
  var c_name = req.body.names; // old title to identify
  console.log(c_name);
  BusBookTicket.deleteOne({ Title: c_name })
    .then(() => {
      BusBookTicket.find({})
        .then((rep) => {
          res.render('home', { rep: rep });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    })
    .catch((error) => {
      console.error("Error deleting data:", error);
    });
});



//======================================================================2
//2.Create REST API to authenticate users using passportjs. Use mongoose ODM. You need to follow
//MVC Architecture. Create routes for registering a user, login, and logout a user.

// const express = require('express');
// const mongoose = require('mongoose');
// const passport = require('passport');
// const session = require('express-session');
// const authRoutes = require('./routes/authRoutes');

// const app = express();


// mongoose.connect('mongodb://0.0.0.0:27017/task', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


// app.use(express.json());
// app.use(session({ secret:"randomSecretKey", resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());


// app.use('/auth', authRoutes);




//--------------------------------------------------------------------3
//3.Create REST API to accept multiple files from the user and upload all of them in the database using
//mongoose
// const express = require('express');
// const multer = require('multer');
// const bodyParser = require('body-parser');
// const path = require('path');
// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'src/public', 'views'));

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage: multerStorage });

// app.get('/', (req, res) => {
//   res.render('login');
// });

// app.post('/upload', upload.array('myfile', 5), (req, res) => {
//   console.log(req.files); 
//   res.send('Files uploaded');
// });



//-------------------------------------------------------------------4
//4.Create REST API to accept only images from the user. If the file is not an image then display an error
//message.
// const express = require('express');
// const app = express();
// const multer = require('multer');
// const path = require('path');


// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
   
//     if (['.png', '.jpg', '.jpeg'].includes(path.extname(file.originalname).toLowerCase())) {
//       cb(null, 'images');
//     } else {
//       cb(new Error('Invalid'), false);
//     }
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: multerStorage });


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// app.post('/upload', upload.single('myfile'), (req, res) => {
//   res.send('File upload successful');
// });


// app.use((err, req, res, next) => {
//   if (err) {
//     res.status(400).json({ error: err.message });
//   } else {
//     next();
//   }
// });
//--------------------------------------------------------

app.listen(8000,()=>{
  console.log("listening on")
})