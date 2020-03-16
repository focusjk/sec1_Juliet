module.exports = `
CREATE TABLE admin
(
username varchar(20) not null,
password varchar(20) not null,
primary key(username)
);
CREATE TABLE members
(
id INT NOT NULL AUTO_INCREMENT,
username varchar(20) not null UNIQUE,
password varchar(20) not null,
firstName varchar(50) not null,
lastName varchar(50) not null,
phone_number varchar(10) not null,
email varchar(200) not null,
photo varchar(15000),
created_at datetime not null,
amount float not null,
driving_license varchar(25),
approved_at datetime,
approved_by varchar(20),
rejected_at datetime,
rejected_by varchar(20),
banned_at datetime,
banned_by varchar(20),
edited_at datetime,
driver_status enum('approved','pending','rejected'),
primary key(id),
foreign key(approved_by) references admin(username),
foreign key(rejected_by) references admin(username),
foreign key(banned_by) references admin(username)
);
CREATE TABLE trip
(
id int not null AUTO_INCREMENT,
departure_latitude decimal(9,6) not null,
departure_longtitude decimal(9,6) not null,
departure_detail varchar(30) not null,
departure_province varchar(30) not null,
destination_latitude decimal(9,6) not null,
destination_longtitude decimal(9,6) not null,
destination_detail varchar(30) not null,
destination_province varchar(30) not null,
start_datetime datetime not null,
created_at datetime not null,
owner int not null,
car_brand varchar(50),
plate_license varchar(7),
capacity int not null,
status enum('scheduled','on going', 'canceled', 'done') not null,
price float not null,
primary key(id),
foreign key(owner) references members(id)
);
CREATE TABLE request
(
id int not null AUTO_INCREMENT,
member_id int not null,
trip_id int not null,
departure_latitude decimal(9,6) not null,
departure_longtitude decimal(9,6) not null,
departure_detail varchar(100),
destination_latitude decimal(9,6) not null,
destination_longtitude decimal(9,6) not null,
destination_detail varchar(100),
request_status enum('approved', 'pending', 'rejected', 'paid', 'on going', 'done','canceled') not null,
review_id int,
departed_at datetime,
driver_departed_at datetime,
driver_arrived_at datetime,
paid_at datetime,
created_at datetime not null,
primary key(id),
foreign key(member_id) references members(id),
foreign key(trip_id) references trip(id)
);
CREATE TABLE review
(
id int not null AUTO_INCREMENT,
reviewee int not null,
rating int not null,
comment varchar(1000),
created_at datetime not null,
primary key(id),
foreign key(reviewee) references members(id)
);
CREATE TABLE withdrawal
(
id int not null AUTO_INCREMENT,
member_id int not null,
amount float not null,
created_at datetime not null,
approved_at datetime,
approved_by varchar(20),
rejected_at datetime,
rejected_by varchar(20),
status enum('approved', 'pending', 'rejected'),
account_name varchar(100) not null,
account_number varchar(10) not null,
bank_name varchar(20) not null,
primary key(id),
foreign key(approved_by) references admin(username),
foreign key(rejected_by) references admin(username)
);
CREATE TABLE transaction
(
id int not null AUTO_INCREMENT,
amount float not null,
withdrawal_id int,
member_id int not null,
created_at datetime not null,
type enum('withdraw', 'income', 'refund') not null,
note varchar(100),
primary key(id),
foreign key(withdrawal_id) references withdrawal(id),
foreign key(member_id) references members(id)
);
CREATE TABLE report
(
id int not null AUTO_INCREMENT,
topic varchar(100) not null,
comment varchar(1000) not null,
member_id int not null,
created_at datetime not null,
is_read boolean not null,
primary key(id),
foreign key(member_id) references members(id)
);`;
