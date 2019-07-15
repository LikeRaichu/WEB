const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({
   extended: false // querystring 모듈 사용
}));

app.get('/', (req, res) => {
   res.send('<h1>Home page</h1>');
});

app.post('/REG', (req, res) => {
   console.log('/REG 요청');
   console.log(req.body);
   res.send('회원가입을 완료하였습니다.');
});
app.post('/LOGIN', (req, res) => {
    console.log('/LOGIN 요청');
    console.log(req.body);
    res.send('로그인 하셨습니다.');
});
app.listen(port, () => {
   console.log('server listening... ' + port);
});