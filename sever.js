const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const validator = require('express-validator');

mongoose.connect('mongodb://test:123abcd@ds163014.mlab.com:63014/mydb', { useNewUrlParser: true });
mongoose.connection.on('error', function(err) {
    console.log('Lỗi kết nối đến CSDL: ' + err);
});

require('./configs/passport');

var auth = require('./middleware/auth.middleware');


var adminRouter = require('./routers/admin.router');

var bookingRouter = require('./routers/booking.router');

var userRouter = require('./routers/user.router');


const app = express();
var post = process.env.PORT || 3002;

app.set('views', './views');
app.set('view engine', 'ejs');
/* Cấu hình passport */
app.use(session({
    secret : 'secured_key',
    resave : false,
    saveUninitialized : false
}))
app.use(validator());
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

app.use('/admin', adminRouter);
app.use('/user', userRouter); // cấu hình mấy trang liên quan user

app.get('/', auth.checkAuthentication, function (req, res) {
    console.log(req.user)
    res.render('client/home');
})

// Trả lỗi 404 k tồn tại trang!!!!!
app.use(function (req, res, next) {
    var err = new Error('Lỗi 404 ! Éo tìm đc trang!');
    err.status = 404;
    next(err);
});

// Trả lỗi 500
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});


app.listen(post, () => console.log(`Chạy thành Công ở cổng ${post}`));



