CREATE DATABASE IF NOT EXISTS room_booking_system;
USE room_booking_system;
DROP TABLE IF EXISTS booking;
DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS room;
DROP VIEW IF EXISTS user_info;


CREATE TABLE account
(
	id INTEGER AUTO_INCREMENT NOT NULL,
	account_id VARCHAR(3) NOT NULL,
	name VARCHAR(18) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL ,
    phone VARCHAR(15),
	balance INTEGER DEFAULT 0,
    role ENUM('admin','staff','student') NOT NULL,
    CONSTRAINT account_pk PRIMARY KEY (id),
	CONSTRAINT account_ck1 UNIQUE (account_id),
    CONSTRAINT account_ck2 UNIQUE (email),
    CONSTRAINT account_ck3 UNIQUE (phone),
    CHECK (balance >= 0)
);

CREATE VIEW user_info AS
SELECT account_id, name, email, phone, balance, role
FROM account;


CREATE TABLE room
(
	room_no INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    capacity INTEGER NOT NULL,
    price INTEGER NOT NULL,
    operational BOOLEAN NOT NULL,
    CONSTRAINT room_pk PRIMARY KEY (room_no),
    CONSTRAINT room_ck UNIQUE (name),
    CHECK(price >= 0),
    CHECK (capacity > 0)
);
CREATE TABLE booking
(
	id INTEGER AUTO_INCREMENT NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    total_cost INTEGER NOT NULL,
    room_no INTEGER NOT NULL,
    user_id VARCHAR(3) NOT NULL,
    CONSTRAINT booking_pk PRIMARY KEY (id),
    CONSTRAINT booking_ck UNIQUE (start_date, room_no),
    CONSTRAINT booking_fk1 FOREIGN KEY (room_no) REFERENCES room(room_no) ON DELETE CASCADE,
    CONSTRAINT booking_fk2 FOREIGN KEY (user_id) REFERENCES account(account_id),
    CHECK(start_date < end_date)
);


-- Book Room
-- INSERT INTO booking VALUES(refNo,cost,bookedDate,roomNo,userId);
-- UPDATE account SET balance = balance - cost WHERE user_id = userId ;
-- Edit Room
-- UPDATE room SET 


-- INSERT INTO account VALUES('student1', '1234', 50000, 0, '101');
-- INSERT INTO account VALUES('student2', '1234', 100000, 0, '102');
-- INSERT INTO account VALUES('student3', '1234', 25000, 0, '103');
-- INSERT INTO account VALUES('staff1', '1234', NULL, 1, '901');
-- INSERT INTO account VALUES('staff2', '1234', NULL, 1, '902');

-- Create Account (needs to interact with Express.js/Nodejs)
-- INSERT INTO account(username, password, authorized) VALUES(username, password, authorized);

-- Edit Account (needs to interact with Express.js/Nodejs)
-- UPDATE account SET username = username WHERE username = given_username;
-- UPDATE account SET password = password WHERE username = given_username;
-- UPDATE account SET authorized = authorized WHERE username = given_username;

-- Top Up Account (needs to interact with Express.js/Nodejs)
-- UPDATE account SET balance = balance + top_up WHERE username = given_username;

-- Delete Account (needs to interact with Express.js/Nodejs)
-- DELETE FROM account WHERE username = given_username;
