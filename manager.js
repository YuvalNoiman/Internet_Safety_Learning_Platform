const express = require("express");
const path = require('path')

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/login/forgot', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/forgotpass.html'));
});

app.get('/gisse', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/gisse_overview.html'));
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

app.get('/spyware/content', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/spyware_content.html'));
});

app.get('/spyware/interact', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/spyware_interact.html'));
});

app.get('/trojan/content', function(req, resp){
        resp.sendFile(path.join(__dirname, '/public/trojan_content.html'));
});

app.get('/trojan/interact', function(req, resp){
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