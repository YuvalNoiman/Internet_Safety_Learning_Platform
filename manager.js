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


const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Pass1234",
        database: "learning_platform_database"
})


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
        req.session.destroy(err => {
                if(err) console.log(err);
        });
        resp.clearCookie("session")
        resp.status(200);
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
        const {email, f_name, l_name, age, password, conpassword} = req.body;
        console.log(email, f_name, l_name, age, password, conpassword);
        connection.connect(function(err){
                if (err) throw err;
                console.log("Connected!");
                if (email.includes("@") && (password.length >= 8) && (password==conpassword)){
                        connection.query('SELECT email FROM users where email = ?', [email], (error, result)=>{
                                if (error) throw err;
                                if (result[0] != undefined){
                                        console.log("Result 0:", result[0])
                                        resp.redirect('/login/signup');   
                                }
                                else{
                                        const otp = Math.floor(1000 + Math.random() * 9000);
                                        otp_hash = bcrypt.hashSync(String(otp), 0);
                                        password_hash = bcrypt.hashSync(String(password), 0);
                                        console.log(password_hash);
                                        console.log(otp_hash);
                                        connection.query('INSERT INTO Users (email, password, f_name, l_name, age, otp, verified) VALUES (?, ?, ?, ?, ?, ?, ?)', [email, password_hash, f_name, l_name, age, otp_hash, false], (error, result)=>{
                                                if (err)  console.log(err);
                                                console.log("user saved")
                                        });  
                                        connection.query('INSERT INTO Progress (email, gsp1, gsp2, ph1, ph2, i1, i2, pa1, pa2, drf1, drf2, mm, v1, v2, w1, w2, aw1, aw2, t1, t2, s1, s2, r1, r2, c, sec) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [email, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], (error, result)=>{
                                                if (err)  console.log(err);
                                                console.log("progress saved")
                                        });

                                        const transporter = nodemailer.createTransport({
                                                service: 'Yahoo',
                                                auth: {
                                                user: 'internetsectest@yahoo.com',
                                                pass: 'xqpxrqdanedjxxwo',
                                                },
                                        });
            
                                        const mailOptions = {
                                                from: 'internetsectest@yahoo.com',
                                                to: email,
                                                subject: 'Verify Account otp',
                                                text: `Your OTP: ${otp}`,
                                        };
            
                                        transporter.sendMail(mailOptions, (error, info) => {
                                                if (error) console.log(error);
                                                else {
                                                    res.json({
                                                        data: "Your OTP send to the email"
                                                    })
                                                }
                                        });
                                        resp.redirect('/verify'); 
                                }
                        });
                }
                else{
                        resp.redirect('/login/signup'); 
                }
        });
})

app.get('/verify', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/verify.html'));
});

app.post('/do_verify', (req, resp) => {
        const {email, otp} = req.body;
        console.log(email, otp);
        connection.connect(function(err){
                if (err) throw err;
                console.log("Connected!");
                connection.query('SELECT email, otp FROM users where email = ?', [email], (error, result)=>{
                        if (error) throw error;
                        if (result[0] != undefined){
                                console.log(result)
                                if (bcrypt.compareSync(otp, result[0].otp) == true){
                                        console.log("hash matches")
                                        connection.query('UPDATE users set verified = true where email = ?', [email], (error, result)=>{
                                                if (error) throw error;
                                                console.log(result)
                                                });
                                        otp_hash = bcrypt.hashSync(String(Math.floor(1000 + Math.random() * 9000)), 0);
                                        console.log(otp_hash);
                                        connection.query('UPDATE users set otp = ? where email = ?', [otp_hash, email], (error, result)=>{
                                                if (error) throw error;
                                                        console.log(result)
                                                });
                                }
                                console.log(result)
                                console.log("login")
                                resp.redirect('/login'); 
                        }else{
                                console.log("not good")
                                resp.redirect('/verify'); 
                        }
                });
                
        });
})

app.post('/forgot', (req, resp) => {
        const {email} = req.body;
        console.log(email);
        connection.connect(function(err){
                if (err) throw err;
                console.log("Connected!");
                otp =  Math.floor(1000 + Math.random() * 9000);
                otp_hash = bcrypt.hashSync(String(otp), 0);
                console.log(otp_hash);
                connection.query('UPDATE users set otp = ? where email = ?', [otp_hash, email], (error, result)=>{
                        if (error) throw error;
                        console.log(result)
                });
        });
        const transporter = nodemailer.createTransport({
                service: 'Yahoo',
                auth: {
                    user: 'internetsectest@yahoo.com',
                    pass: 'xqpxrqdanedjxxwo',
                },
        });

        const mailOptions = {
                from: 'internetsectest@yahoo.com',
                to: email,
                subject: 'Reset Password otp',
                text: `Your OTP: ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
                if (error) console.log(error);
                else {
                    res.json({
                        data: "Your OTP send to the email"
                    })
                }
        });
        resp.redirect('/reset_pass'); 
})

app.get('/reset_pass', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/reset_pass.html'));
});

app.post('/change_pass', (req, resp) => {
        const {email, otp, pass} = req.body;
        console.log(email, otp, pass);
        connection.connect(function(err){
                if (err) throw err;
                console.log("Connected!");
                connection.query('SELECT email, otp FROM users where email = ?', [email], (error, result)=>{
                        if (error) throw error;
                        console.log(result);
                        if (result[0] != undefined){
                        if (bcrypt.compareSync(otp, result[0].otp) == true){
                                console.log("hash matches")
                                connection.query('UPDATE users set verified = true where email = ?', [email], (error, result)=>{
                                        if (error) throw error;
                                        console.log(result)
                                        });
                                otp_hash = bcrypt.hashSync(String(Math.floor(1000 + Math.random() * 9000)), 0);
                                console.log(otp_hash);
                                connection.query('UPDATE users set otp = ? where email = ?', [otp_hash, email], (error, result)=>{
                                        if (error) throw error;
                                        console.log(result)
                                        });
                                connection.query('UPDATE users set password = ? where email = ?', [bcrypt.hashSync(String(pass), 0), email], (error, result)=>{
                                        if (error) throw error;
                                        console.log(result)
                                        });
                        }
                        console.log(result)
                        resp.redirect('/login'); 
                        }
                        else{
                        console.log("not good")
                        resp.redirect('/reset_pass'); 
                        }
                });
        });
});

app.post('/loggingin', (req, resp) => {
        const {email, password} = req.body;
        console.log(email, password);
        connection.connect(function(err){
                if (err) throw err;
                console.log("Connected!");
                connection.query('SELECT gsp1, gsp2, ph1, ph2, i1, i2, pa1, pa2, drf1, drf2, mm, v1, v2, w1, w2, aw1, aw2, t1, t2, s1, s2, r1, r2, c, sec FROM progress where email = ?', [email], (error, result)=>{
                        if (error) throw error;
                        if (result[0]!= undefined){
                        req.session.gsp1 = result[0].gsp1;
                        req.session.gsp2 = result[0].gsp2;
                        req.session.ph1 = result[0].ph1;
                        req.session.ph2 = result[0].ph2;
                        req.session.i1 = result[0].i1;
                        req.session.i2 = result[0].i2;
                        req.session.pa1 = result[0].pa1;
                        req.session.pa2 = result[0].pa2;
                        req.session.drf1 = result[0].drf1;
                        req.session.drf2 = result[0].drf2;
                        req.session.mm = result[0].mm;
                        req.session.v1 = result[0].v1;
                        req.session.v2 = result[0].v2;
                        req.session.w1 = result[0].w1;
                        req.session.w2 = result[0].w2;
                        req.session.aw1 = result[0].aw1;
                        req.session.aw2 = result[0].aw2;
                        req.session.t1 = result[0].t1;
                        req.session.t2 = result[0].t2;
                        req.session.s1 = result[0].s1;
                        req.session.s2 = result[0].s2;
                        req.session.r1 = result[0].r1;
                        req.session.r2 = result[0].r2;
                        req.session.c = result[0].c;
                        req.session.sec = result[0].sec;
                        }
                });
                connection.query('SELECT f_name, l_name, age FROM users where email = ?', [email], (error, result)=>{
                        if (error) throw error;
                        if (result[0]!= undefined){
                        req.session.age = result[0].age;
                        req.session.f_name = result[0].f_name;
                        req.session.l_name = result[0].l_name;
                        console.log(req.session.f_name)
                        console.log(req.session.l_name)
                        console.log(req.session.age)
                        }
                });
                connection.query('SELECT email, password, verified FROM users where email = ?', [email], (error, result)=>{
                        if (error) throw error;
                        console.log(result)
                        try{
                                console.log(result[0].email);
                                console.log(result[0].password);
                                console.log(result[0].verified);
                                if ((result[0]!= undefined) && (result[0].verified != false) && (bcrypt.compareSync(password, result[0].password) == true)){
                                        console.log("user logged in");
                                        req.session.email = email;
                                        //progress
                                        connection.query('SELECT gsp1, gsp2, ph1, ph2, i1, i2, pa1, pa2, drf1, drf2, mm, v1, v2, w1, w2, aw1, aw2, t1, t2, s1, s2, r1, r2, c, sec FROM progress where email = ?', [email], (error, result)=>{
                                                if (error) throw error;
                                                req.session.gsp1 = result[0].gsp1;
                                                req.session.gsp2 = result[0].gsp2;
                                                req.session.ph1 = result[0].ph1;
                                                req.session.ph2 = result[0].ph2;
                                                req.session.i1 = result[0].i1;
                                                req.session.i2 = result[0].i2;
                                                req.session.pa1 = result[0].pa1;
                                                req.session.pa2 = result[0].pa2;
                                                req.session.drf1 = result[0].drf1;
                                                req.session.drf2 = result[0].drf2;
                                                req.session.mm = result[0].mm;
                                                req.session.v1 = result[0].v1;
                                                req.session.v2 = result[0].v2;
                                                req.session.w1 = result[0].w1;
                                                req.session.w2 = result[0].w2;
                                                req.session.aw1 = result[0].aw1;
                                                req.session.aw2 = result[0].aw2;
                                                req.session.t1 = result[0].t1;
                                                req.session.t2 = result[0].t2;
                                                req.session.s1 = result[0].s1;
                                                req.session.s2 = result[0].s2;
                                                req.session.r1 = result[0].r1;
                                                req.session.r2 = result[0].r2;
                                                req.session.c = result[0].c;
                                                req.session.sec = result[0].sec;
                                        });
                                        connection.query('SELECT f_name, l_name, age FROM users where email = ?', [email], (error, result)=>{
                                                if (error) throw error;
                                                req.session.age = result[0].age;
                                                req.session.f_name = result[0].f_name;
                                                req.session.l_name = result[0].l_name;
                                                console.log(req.session.f_name)
                                                console.log(req.session.l_name)
                                                console.log(req.session.age)
                                        });
                                        req.session.save();
                                        resp.redirect('/gisse')
                                        console.log("sent to overview");
                                }else{
                                        console.log("not logging in");
                                        resp.redirect('/login'); 
                                }         
                        }catch {
                                console.log("not logging in");
                                resp.redirect('/login'); 
                        }
                });
        });
})

app.get('/login/forgot', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/forgotpass.html'));
});

app.get('/gisse', function(req, resp){
        console.log(req.session);
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
        if (req.session.c == false){
                resp.redirect(req.get('referer'));
        }
        console.log(req.session.email);
        console.log(req.session);
        console.log(req.session.f_name);
        console.log(req.session.l_name);
        full_name = req.session.f_name + " " + req.session.l_name
        let data = {name: full_name};
        app.engine('html', require('ejs').renderFile);
        app.set('view engine', 'html'); 
        resp.render('certificate.ejs', data);
});

app.get('/sec', function(req, resp){
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
        const transporter = nodemailer.createTransport({
                service: 'Yahoo',
                auth: {
                    user: 'internetsectest@yahoo.com',
                    pass: 'xqpxrqdanedjxxwo',
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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

app.get('/impersonation/google', function(req, resp){
        if (req.session.email == undefined){
                resp.redirect('home')
        }
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

var compression = require('compression');
app.use(compression());
app.use('/impersonation_sim', express.static(path.join(__dirname, 'public/games/IMPERSONATION_WEBGL')));

app.use('/ransomware_sim', express.static(path.join(__dirname, 'public/games/RANSOMWARE_WEBGL')));
app.use('/stranger_danger_sim', express.static(path.join(__dirname, 'public/games/SD_WEBGL')));
app.use('/spyware_sim', express.static(path.join(__dirname, 'public/games/SPYWARE_WEBGL')));
app.use('/trojan_sim', express.static(path.join(__dirname, 'public/games/TROJAN_WEBGL')));
app.use('/virus_sim', express.static(path.join(__dirname, 'public/games/VIRUS_WEBGL')));
app.use('/worm_sim', express.static(path.join(__dirname, 'public/games/WORM_WEBGL')));
app.use('/adware_sim', express.static(path.join(__dirname, 'public/games/ADWARE_WEBGL')));
app.use('/ads_sim', express.static(path.join(__dirname, 'public/games/ADS_WEBGL')));

app.use((req, resp) => {
        resp.status(404);
        resp.send(`<h1>Error 404: Page does not exist</h1>`);
})

app.listen(3000, () => {
        console.log("listening on port 3000")
})

module.exports = app