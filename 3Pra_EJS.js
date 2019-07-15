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

var carlistdata = [{
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
},
{
   carNumber: '33주2222',
   owner: '손오공',
   model: 'MORNING',
   company: 'KIA',
   numOfAccident: 1,
   numOfOwnerChange: 3
},
{
   carNumber: '44주2222',
   owner: '손오공',
   model: 'MORNING',
   company: 'KIA',
   numOfAccident: 1,
   numOfOwnerChange: 3
},
{
   carNumber: '55주2222',
   owner: '손오공',
   model: 'MORNING',
   company: 'KIA',
   numOfAccident: 1,
   numOfOwnerChange: 3
},
{
   carNumber: '66주2222',
   owner: '손오공',
   model: 'MORNING',
   company: 'KIA',
   numOfAccident: 1,
   numOfOwnerChange: 3
},
 {
   carNumber: '77주2222',
   owner: '손오공',
   model: 'MORNING',
   company: 'KIA',
   numOfAccident: 1,
   numOfOwnerChange: 3
},
{
   carNumber: '88주2222',
   owner: '손오공',
   model: 'MORNING',
   company: 'KIA',
   numOfAccident: 1,
   numOfOwnerChange: 3
},
{
   carNumber: '99주2222',
   owner: '손오공',
   model: 'MORNING',
   company: 'KIA',
   numOfAccident: 1,
   numOfOwnerChange: 3
},
{
   carNumber: '10주2222',
   owner: '손오공',
   model: 'MORNING',
   company: 'KIA',
   numOfAccident: 1,
   numOfOwnerChange: 3
}];

//  var userList = [{
//     name: '엄복동',
//     nickname: 'UBD',
//     phone: '010-1588-8282',
//     address: '대한민국 경기도 평양시'
//     },
 
//  {
//     name: 'Peter Parker',
//     nickname: 'spider man',
//     phone: '010-6273-8227',
//     address: 'Earth'
//  }
//  ];

app.get('/carlist2', (req, res) => {
    console.log(req.body);
    res.render('carlist2.html', { data: carlistdata, loop: carlistdata.length });
});

app.get('/userlist2', (req, res) => {
    res.render('userList2.html', { data2: userList})
})

app.get('/main', (req, res) => {
    res.render('main.ejs')
})

app.post('/api/filter', (req, res) => {
   console.log(req.body);
   console.log(req.body.searchText);
   console.log(req.body.filter);

   if (req.body.filter === 'carn') {
      let carNum = req.body.searchText;
      let found1 = carlistdata.find(function (element) {
         console.log('element = ', element);
         if (element.carNumber === carNum) {
            return element;
         }
      });
      console.log('found1 = ', found1);
      res.json(found1);
   };
   
   if (req.body.filter === 'comp') {
      let company = req.body.searchText;
      let found2 = carlistdata.filter(function (element) {
         console.log('element = ', element);
         if (element.company === company) {
         return element;
         }
      });
      console.log('found2 = ', found2);
         res.json(found2);
   };
});

app.listen(port, () => {
    console.log('Server listening...' + port);
 });