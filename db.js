const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.MYSQL_DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});
let db = {};
db.getUserByEmail = (email) =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM User WHERE email = ?', [email], (error, users)=>{
            if(error){
                return reject(error);
            }
            return resolve(users[0]);
        });
    });
};
db.insertUser = (email, password, age, otp) =>{
    return new Promise((resolve, reject)=>{
        pool.query('INSERT INTO User (email, password, age, otp, verified) VALUES (?, ?, ?, ?, ?)', [email, password, age, otp, false], (error, result)=>{
            if(error){
                return reject(error);
            }
            
              return resolve(result.insertId);
        });
        pool.query('INSERT INTO Progress (email, gsp1, gsp2, ph1, ph2, i1, i2, pa1, pa2, drf1, drf2, mm, v1, v2, w1, w2, aw1, aw2, t1, t2, s1, s2, r1, r2, c boolean) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [email, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], (error, result)=>{
            if(error){
                return reject(error);
            }
            
              return resolve(result.insertId);
        });
    });
};
module.exports = db;