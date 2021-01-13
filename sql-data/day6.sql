select * from cart;
select * from products;
select * from roles;
select * from transaction;
select * from transactionitem;
select * from users;
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
ALTER USER 'lianeddy'@'%' IDENTIFIED WITH mysql_native_password BY 'asd123'
-- ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client

