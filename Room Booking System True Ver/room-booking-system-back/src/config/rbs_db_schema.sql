CREATE DATABASE IF NOT EXISTS room_booking_system;
USE room_booking_system;
DROP TABLE IF EXISTS booking;
DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS room;


CREATE TABLE account
(
	id INTEGER AUTO_INCREMENT,
	account_id VARCHAR(3),
	name VARCHAR(18) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
	balance INTEGER DEFAULT 0,
    role ENUM('admin','staff','student'),
    CONSTRAINT account_pk PRIMARY KEY (id),
	CONSTRAINT account_ck1 UNIQUE (account_id),
    CONSTRAINT account_ck2 UNIQUE (email),
    CONSTRAINT account_ck3 UNIQUE (phone),
    CHECK (balance >= 0)
);
INSERT INTO account VALUES(NULL,'901', 'Keith', 'student1@email.com', '1234', NULL, 0, 'student');
INSERT INTO account VALUES(NULL,'902', 'Louis', 'student2@email.com', '1234', NULL, 0, 'student');
INSERT INTO account VALUES(NULL,'001', 'Ric', 'admin@email.com', '1234', NULL, NULL, 'admin');
INSERT INTO account VALUES(NULL,'101', 'Xingjie', 'staff1@email.com', '1234', NULL, NULL, 'staff');
INSERT INTO account VALUES(NULL,'102', 'Zhen Yi', 'staff2@email.com', '1234', NULL, NULL, 'staff');

CREATE TABLE room
(
	room_no INTEGER AUTO_INCREMENT,
    name VARCHAR(255),
    capacity INTEGER NOT NULL,
    price FLOAT(10,2) NOT NULL,
    operational BOOLEAN NOT NULL,
    CONSTRAINT room_pk PRIMARY KEY (room_no),
    CONSTRAINT room_ck UNIQUE (name),
    CHECK(price >= 0),
    CHECK (capacity > 0)
);
CREATE TABLE booking
(
	ref_no INTEGER AUTO_INCREMENT,
    total_cost INTEGER NOT NULL,
    booking_date DATETIME NOT NULL,
    room_no INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    CONSTRAINT booking_pk PRIMARY KEY (ref_no),
    CONSTRAINT booking_ck UNIQUE (booking_date, room_no),
    CONSTRAINT booking_fk1 FOREIGN KEY (room_no) REFERENCES room(room_no) ON DELETE CASCADE,
    CONSTRAINT booking_fk2 FOREIGN KEY (user_id) REFERENCES account(id)
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
