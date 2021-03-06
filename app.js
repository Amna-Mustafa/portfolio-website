var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/admin/user');
var testRouter = require('./routes/admin/testimonial');
var projectRouter = require('./routes/admin/project');
var authRouter = require('./routes/admin/auth');
const validationHandler = require('./middleware/validationHandler');
var app = express();
const ProjectCategory = require('./models/index').ProjectCategory;
const Project = require('./models/index').Project;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//using user route
app.use(userRouter);
app.use(testRouter);
app.use(projectRouter);
app.use(authRouter);



//setup server to listen on port 8080
app.listen(process.env.PORT || 8080, () => {
  console.log("Server is live on port 8080");
})

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

ProjectCategory.afterDestroy( async (ProjectCategory, options) => {
  await Project.destroy({ where: { category_id : ProjectCategory.id }, force: true })
})


app.use(validationHandler);


module.exports = app;
