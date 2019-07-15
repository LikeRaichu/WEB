const express = require('express');
var multer = require('multer');
var upload = multer({
    //   dest: 'uploads/'
   });
var router = express.Router();

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

var imgFileFilter = function (req, file, callback) {
    var ext = path.extname(file.originalname);
    console.log('확장자 : ', ext);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'))
    }
    callback(null, true);
};

var imgUpload = multer({
    storage: storage,
    fileFilter: imgFileFilter,
    limits: {
        fileSize: 10*1024*1024
    }
});

// 
router.post('/imgupload', imgUpload.single('avatar'), (req, res, next) => {
    console.log(req.file);
    var imgsrc = path.join('/files', req.file.filename);
           
    console.log('imgsrc = ', imgsrc);
    res.render('test/showimage.html', {
        imagesrc: imgsrc
    })
    //res.send('uploaded...' + req.file.filename);
});


module.exports = imguploder;