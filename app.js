const createError = require('http-errors');
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');

/// ////////////////////////////
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();
// Подключаем mongoose.
const mongoose = require('mongoose');

const userRouter = require('./routes/user');
const commentRouter = require('./routes/comment');
const indexRouter = require('./routes/index');
const entryRouter = require('./routes/entry');
const cardRouter = require('./routes/card');
const getentryRouter = require('./routes/getentry');

mongoose.connect('mongodb://localhost:27017/chaiok', { useNewUrlParser: true, useUnifiedTopology: true });
// view engine setup   getentryRouter
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cookieParser());
app.use(fileUpload());

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.createConnection('mongodb://localhost:27017/chaiok', { useNewUrlParser: true, useUnifiedTopology: true }),
  }),
  secret: 'kfdlsjflkdsjfklsbvnjknv',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 4599678 },
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.admin = req.session.admin;
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use('/', indexRouter);
app.use('/comment', commentRouter);
app.use('/user', userRouter);
app.use('/entry', entryRouter);
app.use('/card', cardRouter);
app.use('/getentry', getentryRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000);

module.exports = app;
