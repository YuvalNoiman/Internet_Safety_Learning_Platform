const express = require("express");
const path = require('path')
const mysql = require("mysql2")
const bodyParser = require('body-parser');
/*const mysql = require("mysql")
const session = require("express-session")

const MySQLStore = require("express-mysql-session")(session);


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

const app = express();
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
        resp.sendFile(path.join(__dirname, '/public/gisse_overview.html'));
});

app.get('/malware', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/malware_overview.html'));
});

app.get('/certificate', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/certificate.html'));
});

app.get('/ads/content', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/ads_content.html'));
});

app.get('/ads/interact', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/ads_interact.html'));
});

app.get('/adware/content', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/adware_content.html'));
});

app.get('/adware/interact', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/adware_interact.html'));
});

app.get('/files/content', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/files_content.html'));
});

app.get('/files/interact', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/files_interact.html'));
});

app.get('/impersonation/content', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/impersonation_content.html'));
});

app.get('/impersonation/interact', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/impersonation_interact.html'));
});

app.get('/phishing/content', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/phishing_content.html'));
});

app.get('/phishing/interact', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/phishing_interact.html'));
});

app.get('/ransomware/content', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/ransomware_content.html'));
});

app.get('/ransomware/interact', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/ransomware_interact.html'));
});

app.get('/safety/content', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/safety_content.html'));
});

app.get('/safety/interact', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/safety_interact.html'));
});

app.get('/spyware/content', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/spyware_content.html'));
});

app.get('/spyware/interact', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/spyware_interact.html'));
});

app.get('/trojans/content', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/trojan_content.html'));
});

app.get('/trojans/interact', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/trojan_interact.html'));
});

app.get('/virus/content', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/virus_content.html'));
});

app.get('/virus/interact', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/virus_interact.html'));
});

app.get('/worm/content', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/worm_content.html'));
});

app.get('/worm/interact', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/worm_interact.html'));
});

app.get('/impersonation/google', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/impersonation_google.html'));
});

//app.get('/adware_sim', function(req, resp){
//        resp.sendFile(path.join(__dirname, '/public/adware_sim.html'));
//});


app.use((req, res) => {
        res.status(404);
        res.send(`<h1>Error 404: Page does not exist</h1>`);
})

app.listen(3000, () => {
        console.log("listening on port 3000")
})