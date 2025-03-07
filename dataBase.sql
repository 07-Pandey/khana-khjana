create database khanakhajan;
use khanakhajan;

create table user(
    user_id int primary key auto_increment,
    username varchar(255) not null,
    password varchar(255) not null,
    mobile_num varchar(10),
    role enum('Admin', 'User')
);

insert into user (username, password) values ('amit@123', 'amit456');

create table trace(
    trace_id int primary key auto_increment,
    user_id int not null,
    timestamp datetime default current_timestamp,
    action enum('login','logout'),
    foreign key (user_id) references user(user_id)
);

create table orders(
    order_id int primary key auto_increment,
    timestamp datetime default current_timestamp,
    order_type enum('dine-in', 'delivery', 'takeaway'),
    order_status enum('preparing', 'completed'),
    customer_name varchar(255),
    mobile_num varchar(10),
    table_num int,
    payment_type enum('cash', 'card'),
    note varchar(255)
);

create table inventory(
    item_id int primary key auto_increment,
    item_name varchar(255) not null,
    image_url varchar(255),
    description varchar(255),
    category enum('Refreshment','Shakes','Frankie','Pizza','Sandwitch','Burger','Fries','Pavbhaji','Breakfast'),
    price int
);

create table order_item(
    order_id int,
    item_id int,
    quantity int,
    foreign key (order_id) references orders(order_id),
    foreign key (item_id) references inventory(item_id)

);
