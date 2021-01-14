select * from cart;
select * from products where isAvailable = 1;
select * from products;
-- "Delete"
update products set isAvailable = 0 where id = 500;

select * from roles;
select * from transaction;
select * from transactionitem;
select * from users where username = 'Bayu';
select * from users where username = 'Bayu' OR 1 = 1; -- SQL Injection;
-- true && true => true     false || true => true
-- /products?hargamin
select * from products where harga > 12000;
-- /products?hargamax
select * from products where harga < 50000;
-- /products?hargamin&hargamax
select * from products where harga > 12000 and harga < 50000;

delete from products where id = 5;

select 
	c.id,
    u.username, 
    p.nama, 
    c.quantity, 
    (c.quantity * p.harga) as 'total harga'
from cart c 
join users u on c.userID = u.id 
join products p on p.id = c.productID
where c.userID = 15;

select * from mysql.user;
ALTER USER 'lianeddy'@'%' IDENTIFIED WITH mysql_native_password BY 'asd123';
-- ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client

SELECT 
	c.id,
	p.nama,
	c.quantity,
	(c.quantity * p.harga) as total
FROM cart c 
JOIN products p ON c.productID = p.id
WHERE c.userID = 15;
