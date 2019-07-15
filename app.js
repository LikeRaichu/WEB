const express = require('express');
const path = require('path');
const cookieparser = require('cookie-parser');
const app = express();
const port = 3000;
const session = require('express-session');
const FileStore = require('session-file-store')(session);
var flash = require('connect-flash');
const fs = require('fs');

global.sampleUserList = {};

var testrouter = require('./router/testrouter');
var indexrouter = require('./router/indexrouter');
global.myval = 1000;
var testmodule = require('./router/module') (100,200);





// fs.writeFileSync('data/userlist.json', JSON.stringify(sampleUserList, null, 8));

if (fs.existsSync('data/userlist.json')) {
    let rawdata = fs.readFileSync('data/userlist.json');
    sampleUserList = JSON.parse(rawdata);
    console.log(sampleUserList);
}

// let rawdata = fs.readFileSync('data/userlist.json');
// sampleUserList = JSON.parse(rawdata);
// console.log(sampleUserList);


// html 렌더링 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
// app.use(morgan('dev'));


app.use(express.urlencoded({
    extended: false // querystring 모듈 사용
}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));



app.use(session({
    secret: '1A@W#E$E',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));


app.use(cookieparser());

app.use(flash());

app.use('/test', testrouter);

// app.use('/test', testmodule);

app.get('/', function (req, res) {
    req.flash('name', 'alert1111');
    res.send('hello flash');
});

app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();
});

console.log(testmodule);

app.listen(port, () => {
    console.log('Server listening...' + port);
});