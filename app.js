//envairoments var
require("dotenv").config();

//var
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fileUpload = require("express-fileupload");
const compression = require("compression");
const hbs = require('hbs');

//import routes
const indexRouter = require("./routes/index");
const excursionesRouter = require("./routes/excursion");
const emailRouter = require("./routes/email");

//import db
const { dbConnection } = require("./database/config");


const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials( __dirname + '/views/partials')

//middlewares
//app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression()); // compress all responses
app.use(express.static(path.join(__dirname, "public"))); //angular production

// Fileupload - Carga de archivos
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
  })
);

//routes
app.use("/", indexRouter);
app.use("/api/excursion", excursionesRouter);
app.use("/api/email", emailRouter);

// Conectar a la DB
dbConnection();



/*// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({error:err});
});*/

module.exports = app;
