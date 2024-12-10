CREATE DATABASE learning_platform_database;
USE learning_platform_database;
CREATE TABLE users (
	email varchar(255),
    password varchar(255),
    f_name varchar(255),
    l_name varchar(255),
    age varchar(255),
    otp varchar(255),
    verified boolean
);

CREATE TABLE progress (
    email varchar(255),
	gsp1 boolean,
    gsp2 boolean,
    ph1 boolean,
    ph2 boolean,
    i1 boolean,
    i2 boolean,
    pa1 boolean,
    pa2 boolean,
    drf1 boolean,
    drf2 boolean,
    mm boolean,
    v1 boolean,
    v2 boolean,
    w1 boolean,
    w2 boolean,
    aw1 boolean,
    aw2 boolean,
    t1 boolean,
    t2 boolean,
    s1 boolean,
    s2 boolean,
    r1 boolean,
    r2 boolean,
    c boolean,
    sec boolean
);

SELECT * FROM USERS;
SELECT * FROM progress;