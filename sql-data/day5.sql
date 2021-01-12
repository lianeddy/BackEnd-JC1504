-- Select database
use jc1504;

truncate transaction;

-- SELECT (GET)
select * from users;
select * from products;
select * from transaction;
select * from transactionitem;
select * from roles;
select 
	id, username, email, alamat, usia, beratbadan
 from users;
select * from products;
select *, (quantity * harga) as 'total'  from transaction;
select *, (quantity * harga) as 'total'  from transaction where (quantity * harga) > 100000 and quantity > 10;


-- JOIN
-- Join three tables based on foreign keys
select  
	t.id,
    u.username,
    p.nama,
    t.quantity,
	t.harga
from transaction t
join users u on t.userID = u.id
join products p on t.productID = p.id; 

-- Join two tables
select 
	t.id,
    t.userID,
    p.nama,
    t.quantity,
    t.harga
from transaction t inner join products p on t.productID = p.id;

select * from users u join roles r on u.roleID = r.id;

-- INSERT (POST)
-- Single Value
insert into users (username, email, password, alamat, usia, beratbadan, roleID) values ('Derick', 'derick@gmail.com', 'asd123', 'Bandung', 20, 60, 1);
-- Multiple Values
insert into roles (role) values ('admin'),('user');

-- UPDATE (PATCH / PUT)
update users set roleID = 2 where id = 8;

-- DELETE (DELETE)
delete from users where id = 6;
delete from products where id = 1;

-- Types of Join
-- Inner (Default)
select * from transaction t inner join users u on t.userID = u.id;

-- Left
select * from users;
select * from transaction;
select * from users u left join roles r on u.roleID = r.id;
select * from transaction t left join users u on t.userID = u.id;
select * from users u left join transaction t on u.id = t.userID;

-- Right
select * from transaction t right join users u on t.userID = u.id;
select * from users u right join transaction t on u.id = t.userID;

-- Outer
-- Simulate Full Outer Join
select * from transaction t 
left join users u on t.userID = u.id
union -- combine generated tables
select * from transaction t 
right join users u on t.userID = u.id;

-- Foreign Key Constraint
-- Prevent data mismanagement
-- Prevent Unsynchronized data



