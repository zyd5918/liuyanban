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


////引入arttemplate模板
var template = require('art-template');
template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

function initNoteApp(req, res, next) {
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

/****
 * 在express中使用res.redirect 方式做页面跳转的时候 
 * 如果在url中传递的有中文参数 需要把参数进行一个编码操作
 * 使用 encodeURIComponent方法实现url参数编码
 */
app.get('/', initNoteApp, (req, res) => {
    // var p = encodeURIComponent('有一个新的文件夹')
    // res.redirect('/notes/file/'+p);
    res.redirect('/dir.html');
});

app.use('/notes/dir', require('./routes/dir'));
app.use('/notes/file', require('./routes/file'))

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
app.listen(3000, function (request, response) {
    console.log('服务器运行中......');
})
/********
 * nodejs fs文件系统常用操作方法
 * 
 * fs.readdir//异步读取一个文件路径，返回目录下的所有文件名称数组
 * fs.readdirSync//同步读取一个文件路劲，返回目录下的所有文件名称数组
 * 
 * fs.reddir(path,function (err,data) {
     if (err) {
         console.log(err)//当报错的时候 err有值，否则err的值为undefined

     }
     else{
         data///值为所有文件名称的数组
     }
 })
 var arrFiles=fs。readdirSync(path);//arrFiles是一个数组
 fs.readFileSync //同步读取文件内容，需要toString（）转换为字符串
 同上目录方式返回结果不同

 fs.stat//异步读取文件的属性
 fs.statSync//同步读取文件的属性信息
 同上目录操作方式返回一个对象。最长使用的是通过返回值判断当前路径的类型（文件夹或者文件）



 req//request获取参数方式
 req.query //获取url参数
 req.body //form表单传递的参数
 req.params//获取express框架中：方式传递的参数

 res //response输出结果
 res.redirect//页面跳转
 res.json //输出json数据到页面
 ***/