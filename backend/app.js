const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const favicon = require('serve-favicon');
const logger = require('morgan');
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/myapp",{ useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

const app = express();

const userRoutes = require("./routes/user");

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, 'favicon.ico')))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../dist/')));
app.use('/', express.static(path.join(__dirname, '../dist/')));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/user", userRoutes);

// catch 404 and forward to error handler
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
    res.send(err.status);
  });

module.exports = app; 