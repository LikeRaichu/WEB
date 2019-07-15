const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
    // 서버에 저장할 폴더
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // 서버에 저장할 파일명
    filename: function (req, file, cb) {
        cb(null, new Date().valueOf() + '_' + file.originalname);
    }
});

var upload = multer({
    storage: storage,
    limits: {
        files: 10,
        fileSize: 3*1024*1024
    }
});

// const testrouter = require('./router/testrouter2.js');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'public')));

// app.use('/test', testrouter);

app.get('/', (req, res) => {
    res.render('fileupload.html')
})

app.get('/image', (req, res) => {
    res.render('showimage.ejs')
})


app.post('/test/imgupload', upload.single('avatar'),(req, res) => {
    console.log('이미지 업로드');
    res.send('이미지 수신')
});

// app.post('/test/fileupload', upload.single('avatar'),(req, res) => {
//     console.log('파일 업로드');
//     res.send('파일 수신')
// });



app.listen(port, () => {
    console.log('Server listening...' + port);
});