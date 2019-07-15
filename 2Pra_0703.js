const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.use(express.urlencoded({
   extended: false
}));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
   res.render('index.html');
});

app.get('/signin_form', (req, res) => {
    console.log('/ 요청받음');
   res.render('signin_form.html');
});

app.get('/login_form', (req, res) => {
   res.render('login_form.html');
});

app.get('/loginreq', (req, res) => {
   res.render('loginreq.html');
});

app.get('/login_index', (req, res) => {
   res.render('login_index.html');
});

app.get('/carlist', (req, res) => {
   res.render('carlist.html');
});

app.get('/userList', (req, res) => {
   res.render('userList.html');
});

app.get('/regUser', (req, res) => {
   res.render('ajax_post_ex.html');
});




var sampleCarList = [{
   carNumber: '11주1111',
   owner: '홍길동',
   model: 'SONATA',
   company: 'HYUNDAI',
   numOfAccident: 2,
   numOfOwnerChange: 1
},

{
   carNumber: '22주2222',
   owner: '손오공',
   model: 'MORNING',
   company: 'KIA',
   numOfAccident: 1,
   numOfOwnerChange: 3
}
];

var userList = [{
   name: '엄복동',
   nickname: 'UBD',
   phone: '010-1588-8282',
   address: '대한민국 경기도 평양시'
   },

{
   name: 'Peter Parker',
   nickname: 'spider man',
   phone: '010-6273-8227',
   address: 'Earth'
}
];

app.get('/api/carlist', (req, res) => {
   res.json(sampleCarList);
});

app.get('/api/userList', (req, res) => {
   res.json(userList);
});

// app.post('/api/regUser', (req, res) => {
//    console.log(req.body);
//    req.json(newD);
// });

app.post('/api/regUser', (req, res) => {
   console.log('/api/regUser');
   console.log(req.body);
   res.json(req.body);
})

app.listen(port, () => {
   console.log('Server listening...' + port);
});