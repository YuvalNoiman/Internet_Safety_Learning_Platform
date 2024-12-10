const express = require("express");
const path = require('path')
const mysql = require("mysql2")
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

//session
const session = require('express-session');
const e = require("express");
const mysqlStore = require('express-mysql-session')(session);
const PORT= 3000;
const TWO_HOURS = 1000 * 60 * 60 * 2

const options ={
        connectionLimit: 10,
        password: "Pass1234",
        user: "root",
        database: "learning_platform_database",
        host: "localhost",
        port: 3306,
        createDatabaseTable: true
}

const  sessionStore = new mysqlStore(options);

/*const mysql = require("mysql")

var options ={
        host:'local',
        port: 3306,
        user: 'root',
        password: 12345,
        database: 'dbsession'
}

var sessionConnection = mysql.createConnection(options);
var sessionStore = new MySQLStore({
        expiration: 1000000,
        createDatabaseTable: true,
        schema:{
                tableName: 'sessiontbl',
                columnNames: {
                        session_id: 'session_id',
                        expires: 'expires',
                        data: 'data'
                }
        }
},sessionStore)

app.use( session ({
        key: 'keyin',
        secret: 'my secret',
        store: sessionStore,
        resave: false,
        saveUninitialized: true
}))*/

const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Pass1234",
        database: "learning_platform_database"
})

/*
// for session
const Mysql = require('mysql2/promise');

const sql = Mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Pass1234",
    database: "learning_platform_database",
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

// getting progress
async function getTxPendingList() {
    try {
        const query = "SELECT * FROM users";
        const rows = await sql.query(query);
        return rows[0];
    } catch (err) {
        console.log('ERROR => ' + err);
        return err;
    }
}
getTxPendingList().then(json => console.log(json));
*/


const app = express();

app.use(session({
        name: "session",
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        secret: 'secret',
        cookie: {
            maxAge: TWO_HOURS,
            sameSite: true,
            secure: false
        }
    }))

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/home', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/home.html'));
});

app.get('/login', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/login.html'));
});

app.get('/resources', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/resources.html'));
});

app.get('/login/signup', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/signup.html'));
});

app.post('/signup', (req, resp) => {
        const {email, password, conpassword, age} = req.body;
        console.log(email, password, conpassword, age);
        connection.connect(function(err){
                if (err) throw err;
                console.log("Connected!");
                connection.query('INSERT INTO users (email, password, age) VALUES (?, ?, ?)', [email, password, age], (error, result)=>{
                        if (err) throw err;
                        console.log("user saved")
                });
        });
        resp.sendFile(path.join(__dirname, '/public/login.html'));
})

app.post('/forgot', (req, resp) => {
        const {email} = req.body;
        console.log(email);
        resp.sendFile(path.join(__dirname, '/public/login.html'));
})

app.post('/loggingin', (req, resp) => {
        const {email, password} = req.body;
        console.log(email, password);
        connection.connect(function(err){
                if (err) throw err;
                console.log("Connected!");
                connection.query('SELECT email, password FROM users where email = ? AND password = ?', [email, password], (error, result)=>{
                        if (err) throw err;
                        console.log(result)
                        try{
                                console.log(result[0].email);
                                console.log(result[0].password);
                        if ((result[0].email != undefined) && (result[0].password != undefined)){
                                console.log("user logged in")
                                resp.sendFile(path.join(__dirname, '/public/gisse_overview.html'));
                        }
                        }catch {
                                console.log("not logging in")
                                resp.sendFile(path.join(__dirname, '/public/login.html'));
                        }
                });
        });
})

app.get('/login/forgot', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/forgotpass.html'));
});

app.get('/gisse', function(req, resp){
        console.log(req.session);
        if (req.session.gsp1 == false){
                req.session.gsp1 = true;
                connection.query('UPDATE progress set gsp1 = ? where email = ?', [req.session.gsp1, req.session.email], (error, result)=>{
                        if (error) throw error;
                        console.log(result);
                });
        }
        resp.sendFile(path.join(__dirname, '/public/gisse_overview.html'));
});

app.get('/malware', function(req, resp){
        if (req.session.mm == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.v1 == false){
                        req.session.v1 = true;
                        connection.query('UPDATE progress set v1 = ? where email = ?', [req.session.v1, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        resp.sendFile(path.join(__dirname, '/public/malware_overview.html'));
});

app.get('/certificate', function(req, resp){
        if (req.session.c == false){
                resp.redirect(req.get('referer'));
        }
        //resp.sendFile(path.join(__dirname, '/public/certificate.html'));
        console.log(req.session.email);
        console.log(req.session);
        console.log(req.session.f_name);
        console.log(req.session.l_name);
        full_name = req.session.f_name + " " + req.session.l_name
        let data = {name: full_name};
        app.engine('html', require('ejs').renderFile);
        app.set('view engine', 'html'); 
        resp.render('certificate.ejs', data);
        /*
        connection.connect(function(err){
                if (err) throw err;
                console.log("Connected!");
                connection.query('SELECT email, c FROM progress where email = ?', [email], (error, result)=>{
                        if (error) throw error;
                        c = result[0].c;
                        if (c == true){
                                resp.sendFile(path.join(__dirname, '/public/certificate.html'));
                        }
                        else{
                                //resp.redirect('back');
                                resp.redirect(req.get('referer'));
                                //resp.sendFile(req.current);
                        }
                        console.log(c);
                });
        });
        */
});

app.get('/sec', function(req, resp){
        if (req.session.c == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.sec == false){
                        req.session.sec = true;
                        connection.query('UPDATE progress set sec = ? where email = ?', [req.session.sec, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        full_name = req.session.f_name + " " + req.session.l_name
        let data = {name: full_name};
        app.engine('html', require('ejs').renderFile);
        app.set('view engine', 'html'); 
        resp.render('sec.ejs', data);
});

app.get('/ads/content', function(req, resp){
        if (req.session.pa2 == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.drf1 == false){
                        req.session.drf1 = true;
                        connection.query('UPDATE progress set drf1 = ? where email = ?', [req.session.drf1, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        resp.sendFile(path.join(__dirname, '/public/ads_content.html'));
});

app.get('/ads/interact', function(req, resp){
        if (req.session.pa1 == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.pa2 == false){
                        req.session.pa2 = true;
                        connection.query('UPDATE progress set pa2 = ? where email = ?', [req.session.pa2, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        resp.sendFile(path.join(__dirname, '/public/ads_interact.html'));
});

app.get('/adware/content', function(req, resp){
        if (req.session.aw2 == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.t1 == false){
                        req.session.t1 = true;
                        connection.query('UPDATE progress set t1 = ? where email = ?', [req.session.t1, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        resp.sendFile(path.join(__dirname, '/public/adware_content.html'));
});

app.get('/adware/interact', function(req, resp){
        if (req.session.aw1 == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.aw2 == false){
                        req.session.aw2 = true;
                        connection.query('UPDATE progress set aw2 = ? where email = ?', [req.session.aw2, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        resp.sendFile(path.join(__dirname, '/public/adware_interact.html'));
});

app.get('/files/content', function(req, resp){
        if (req.session.drf2 == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.mm == false){
                        req.session.mm = true;
                        connection.query('UPDATE progress set mm = ? where email = ?', [req.session.mm, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        resp.sendFile(path.join(__dirname, '/public/files_content.html'));
});

app.get('/files/interact', function(req, resp){
        if (req.session.drf1 == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.drf2 == false){
                        req.session.drf2 = true;
                        connection.query('UPDATE progress set drf2 = ? where email = ?', [req.session.drf2, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        resp.sendFile(path.join(__dirname, '/public/files_interact.html'));
});

app.get('/impersonation/content', function(req, resp){
        if (req.session.i2 == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.pa1 == false){
                        req.session.pa1 = true;
                        connection.query('UPDATE progress set pa1 = ? where email = ?', [req.session.pa1, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        resp.sendFile(path.join(__dirname, '/public/impersonation_content.html'));
});

app.get('/impersonation/interact', function(req, resp){
        if (req.session.i1 == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.i2 == false){
                        req.session.i2 = true;
                        connection.query('UPDATE progress set i2 = ? where email = ?', [req.session.i2, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        resp.sendFile(path.join(__dirname, '/public/impersonation_interact.html'));
});

app.get('/phishing/content', function(req, resp){
        if (req.session.ph2 == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.i1 == false){
                        req.session.i1 = true;
                        connection.query('UPDATE progress set i1 = ? where email = ?', [req.session.i1, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        resp.sendFile(path.join(__dirname, '/public/phishing_content.html'));
});

app.get('/phishing/interact', function(req, resp){
        const transporter = nodemailer.createTransport({
                service: 'Yahoo',
                auth: {
                    user: 'internetsectest@yahoo.com',
                    pass: 'xqpxrqdanedjxxwo',
                    //pass: 'Security$1234Plus',
                },
        });

        if (req.session.age <= 15){
                console.log("<=15")
                const mailOptions = {
                        from: 'internetsectest@yahoo.com',
                        to: req.session.email,
                        subject: 'Totally Legit Email',
                        text: `Hi! This is Joe! You have just won a giveaway for Robux! Click here to redeem!`,
                };
                transporter.sendMail(mailOptions, (error, info) => {
                        if (error) console.log(error);
                        else {
                            res.json({
                                data: "Phishing Email V1 Sent"
                            })
                        }
                });
        }else{
                console.log(">15")
                const mailOptions = {
                        from: 'internetsectest@yahoo.com',
                        to: req.session.email,
                        subject: 'Totally Legit Email',
                        text: `Hi! This is Joe! You have just won a giveaway for Bitcoin! Click here to redeem!`,
                }; 
                transporter.sendMail(mailOptions, (error, info) => {
                        if (error) console.log(error);
                        else {
                            res.json({
                                data: "Phishing Email V2 Sent"
                            })
                        }
                });
        }

        if (req.session.ph1 == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.ph2 == false){
                        req.session.ph2 = true;
                        connection.query('UPDATE progress set ph2 = ? where email = ?', [req.session.ph2, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        resp.sendFile(path.join(__dirname, '/public/phishing_interact.html'));
});

app.get('/ransomware/content', function(req, resp){
        if (req.session.r2 == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.c == false){
                        req.session.c = true;
                        connection.query('UPDATE progress set c = ? where email = ?', [req.session.c, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        resp.sendFile(path.join(__dirname, '/public/ransomware_content.html'));
});

app.get('/ransomware/interact', function(req, resp){
        if (req.session.r1 == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.r2 == false){
                        req.session.r2 = true;
                        connection.query('UPDATE progress set r2 = ? where email = ?', [req.session.r2, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        resp.sendFile(path.join(__dirname, '/public/ransomware_interact.html'));
});

app.get('/safety/content', function(req, resp){
        if (req.session.gsp2 == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.ph1 == false){
                        req.session.ph1 = true;
                        connection.query('UPDATE progress set ph1 = ? where email = ?', [req.session.ph1, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        resp.sendFile(path.join(__dirname, '/public/safety_content.html'));
});

app.get('/safety/interact', function(req, resp){
        if (req.session.gsp1 == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.gsp2 == false){
                        req.session.gsp2 = true;
                        connection.query('UPDATE progress set gsp2 = ? where email = ?', [req.session.gsp2, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        resp.sendFile(path.join(__dirname, '/public/safety_interact.html'));
});

app.get('/spyware/content', function(req, resp){
        if (req.session.s2 == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.r1 == false){
                        req.session.r1 = true;
                        connection.query('UPDATE progress set r1 = ? where email = ?', [req.session.r1, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        resp.sendFile(path.join(__dirname, '/public/spyware_content.html'));
});

app.get('/spyware/interact', function(req, resp){
        if (req.session.s1 == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.s2 == false){
                        req.session.s2 = true;
                        connection.query('UPDATE progress set s2 = ? where email = ?', [req.session.s2, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        resp.sendFile(path.join(__dirname, '/public/spyware_interact.html'));
});

app.get('/trojans/content', function(req, resp){
        if (req.session.t2 == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.s1 == false){
                        req.session.s1 = true;
                        connection.query('UPDATE progress set s1 = ? where email = ?', [req.session.s1, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        resp.sendFile(path.join(__dirname, '/public/trojan_content.html'));
});

app.get('/trojans/interact', function(req, resp){
        if (req.session.t1 == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.t2 == false){
                        req.session.t2 = true;
                        connection.query('UPDATE progress set t2 = ? where email = ?', [req.session.t2, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        resp.sendFile(path.join(__dirname, '/public/trojan_interact.html'));
});

app.get('/virus/content', function(req, resp){
        if (req.session.v2 == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.w1 == false){
                        req.session.w1 = true;
                        connection.query('UPDATE progress set w1 = ? where email = ?', [req.session.w1, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        resp.sendFile(path.join(__dirname, '/public/virus_content.html'));
});

app.get('/virus/interact', function(req, resp){
        if (req.session.v1 == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.v2 == false){
                        req.session.v2 = true;
                        connection.query('UPDATE progress set v2 = ? where email = ?', [req.session.v2, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        resp.sendFile(path.join(__dirname, '/public/virus_interact.html'));
});

app.get('/worm/content', function(req, resp){
        if (req.session.w2 == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.aw1 == false){
                        req.session.aw1 = true;
                        connection.query('UPDATE progress set aw1 = ? where email = ?', [req.session.aw1, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        resp.sendFile(path.join(__dirname, '/public/worm_content.html'));
});

app.get('/worm/interact', function(req, resp){
        if (req.session.w1 == false){
                resp.redirect(req.get('referer'));
        }
        else{
                if (req.session.w2 == false){
                        req.session.w2 = true;
                        connection.query('UPDATE progress set w2 = ? where email = ?', [req.session.w2, req.session.email], (error, result)=>{
                                if (error) throw error;
                                console.log(result);
                })};
        }
        resp.sendFile(path.join(__dirname, '/public/worm_interact.html'));
});

//get rid of replace with google webgl
app.get('/impersonation/google', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/impersonation_google.html'));
});

app.get('/dog', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/downloadable/dog.jpg'));
});

app.get('/safe', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/downloadable/safe.txt'));
});

app.get('/exe', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/downloadable/malware.exe'));
});

app.get('/g_stuff', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/downloadable/Good_Info.pdf'));
});

app.get('/blank_cert', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/images/REG_CERT.png'));
});

app.get('/blank_cert_arg', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/images/ARG_CERT.png'));
});

app.get('/fake_email_easy', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/images/fake_email_easy.jpg'));
});

app.get('/fake_email_hard', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/images/fake_email_hard.jpg'));
});

/*
app.get('/adware_sim', function(req, resp){
        resp.sendFile(path.join(__dirname, 'public/games/ADWARE_WEBGL/index.html'));
});
app.get('/ads_sim', function(req, resp){
        resp.sendFile(path.join(__dirname, 'public/games/ADS_WEBGL/index.html'));
});
*/

var compression = require('compression');
app.use(compression());
//app.use(express.static('public/games/IMPERSONATION_WEBGL'));
app.use('/impersonation_sim', express.static(path.join(__dirname, 'public/games/IMPERSONATION_WEBGL')));
//app.use('/impersonation_sim', express.static(path.join(__dirname, 'public/games/IMPERSONATION_WEBGL/index.html')));
//app.get('/impersonation_sim', function(req, resp){
//        resp.sendFile(path.join(__dirname, 'public/games/IMPERSONATION_WEBGL/index.html'));
//});


app.use((req, res) => {
        res.status(404);
        res.send(`<h1>Error 404: Page does not exist</h1>`);
})

app.listen(3000, () => {
        console.log("listening on port 3000")
})

module.exports = app