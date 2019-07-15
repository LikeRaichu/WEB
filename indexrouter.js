
const fs = require('fs');
var hasher = require('pbkdf2-password')();
var express = require('express');
var router = express.Router();


router.get('/signup_form', (req, res) => {
    res.render('./test/signup.html');
})

router.post('/signup', (req, res) => {

    console.log(req.body);
    // 회원가입
    let userid = req.body.userid;
    let password = req.body.password;
    let name = req.body.name;
    let email = req.body.email;
    console.log('userid = ', userid);
    console.log('password = ', password);
    console.log('name = ', name);
    console.log('email = ', email);

    hasher({
        password: req.body.password
    }, (err, pass, salt, hash) => {

        if (err) {
            console.log('ERR: ', err);
            res.redirect('/signup_form');
        }
        let user = {
            userid: userid,
            password: hash,
            salt: salt,
            name: name,
            email: email
        }
        // sampleUserList.push(user);
        sampleUserList[userid] = user;
        console.log('user added : ', user);
        fs.writeFileSync('data/userlist.json', JSON.stringify(sampleUserList, null, 8));
        res.redirect('/login_form');

    });
});

router.get('/login_form', (req, res) => {
    res.render('./test/login_form.ejs');
});

router.post('/login', (req, res) => {

    console.log(req.body);
    let userid = req.body.userid;
    let password = req.body.password;
    console.log('userid = ', userid);
    console.log('password = ', password);
    console.log('userlist = ', sampleUserList);

    let user = sampleUserList[userid];

    if (userid) {

        hasher({
            password: password,
            salt: user.salt
        }, function (err, pass, salt, hash) {
            if (err) {
                console.log('ERR : ', err);
                //req.flash('fmsg', '오류가 발생했습니다.');
                res.redirect('login_form')

            }
            if (hash === user.password) {
                console.log('INFO : ', userid, ' 로그인 성공')

                req.session.user = sampleUserList[userid];
                req.session.save(function () {
                    res.redirect('/carlist2');
                })
                return;
            } else {
                //req.flash('fmsg', '패스워드가 맞지 않습니다.');
                res.redirect('/signup_form');
                console.log('Password error');
            }
        });
    }
}

    //req.flash.msg('')

    //req.flash('fmsg', '사용자가 없습니다.');

);
    router.get('/logout', (req, res) => {
        req.session.destroy(() => {
            res.redirect('/');
        });

        // if(req.session.user) {
        //     delete req.session.user;
        // }
    });

module.exports = router;