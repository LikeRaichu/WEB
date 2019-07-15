const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// html 렌더링 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.urlencoded({
   extended: false // querystring 모듈 사용
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
   res.send('<h1>Home Page</h1>')
})

app.get('/html', (req, res) => {
   res.render('forTest.html');
})


app.listen(port, () => {
   console.log('Server listening...' + port);
});