const express = require('express')
var path = require("path");
const db = require('./config/connections')
const hbs = require('express-handlebars')
var session = require("express-session");
var Handlebars = require("handlebars");
const userRouter = require('./routes/user')
require('dotenv').config()

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
console.log('dirname',__dirname);
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layout",
  })
);
const oneday = 1000 * 60 * 60 * 24;
//session
app.use(
  session({
    secret: "user",
    saveUninitialized: true,
    cookie: { maxAge: oneday },
    resave: false,
  })
);

// database connection
db.connect((err) => {
    if (err) console.log("Connection error" + err);
    else console.log("Database connected to port 27017");
  });
  
app.use(express.json()) 
app.use(express.urlencoded({ extended: false }));

app.use('/',userRouter)

app.listen(process.env.PORT,console.log(`server running on port ${process.env.PORT}`));