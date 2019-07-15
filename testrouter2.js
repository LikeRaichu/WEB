const express = require('express');
var multer = require('multer');
var upload = multer({
    //   dest: 'uploads/'
   });
var router = express.Router();







router.post('/fileupload', upload.single('avatar'), (req, res, next) => {
    console.log(req.file);

    res.send('uploaded...' + req.file.filename);
});

// router.post('/fileupload', upload.single('avatar'), (req, res, next) => {
//     console.log(req.file);

//     res.send('uploaded...' + req.file.filename);
// };
