var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var fs = require('fs');

//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

function initNoteApp(req,res,next){
  /////判断目录是否存在
    fs.exists('./notes', function (d) {
        if (d) {
            console.log('目录已存在');
            next();
        }
        else {
            /////创建一个在项目根目录中创建一个notes目录
            fs.mkdirSync('./notes');
            console.log('初始化目录完成');
            next();
        }
    })
}


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',initNoteApp,(req,res)=>{
  res.redirect('/dir.html');
});

app.use('/notes/dir',require('./routes/dir'));

//app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


// module.exports = app;

/////在3000端口启动服务器
app.listen(3000,function(request,response){
  console.log('服务器运行中......');
})
