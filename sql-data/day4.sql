use jc1504; -- Choose Database

-- Execute query
-- Left === Block or All
-- Right === Per line (Cursor position)

-- Read Data 
-- SELECT
-- * / name of column
select * from users;
select username, email from users;

-- WHERE
-- >, <, >=, <=, =
select * from users where usia > 30;
select * from users where usia >= 30;
select * from users where usia < 30;
select * from users where usia <= 30;

-- EQUAL
select * from users where alamat = 'Bandung';
-- NOT EQUAL
select * from users where alamat != 'Bandung';
select * from users where alamat <> 'Bandung';

-- More than one condition
-- AND === both true (&&)
select * from users where usia between 30 and 40;
select * from users where usia > 29 and alamat = 'Jakarta';
-- OR === one true (||)
select * from users where alamat = 'Bandung' or usia > 27;

-- Order By
-- Sorting
select * from users order by usia asc;
select * from users order by usia desc;

select * from users where alamat = 'Bandung' and usia < 40 order by usia asc;
select * from users where alamat = 'Bandung' order by usia asc;

-- usia > 30 && usia <40 && alamat === 'Bandung' && beratbadan < 80 
-- Ambil data user yang alamat nya di bandung dan usia nya diantara 30 & 40 and berat badan dibawah 80;
select * from users where alamat = 'Bandung' and usia between 30 and 40 and beratbadan < 80;

select * from users;

-- Group By
-- Count, Avg, Sum
select alamat, count(*) as 'dataCount' from users group by alamat order by dataCount desc;
select alamat, avg(beratbadan) as 'averageWeight' from users group by alamat;
select count(*) as 'dataCount' from users;
select sum(usia) as 'ageTotal' from users;
select avg(usia) as 'avgAge' from users;

-- Create Data
-- INSERT
insert into users (username, email, password, alamat, beratbadan) values ('andi', 'andi@mail.com', '123', 'Jakarta', 60);
insert into users (username, email, password) values ('Susilo', 'susilo@mail.com', 'asd');

-- Update Data
update users set password = 'passwordrahasia' where id = 8;
update users set username = 'joko123', beratbadan = 50 where id = 6;

-- Delete Data
delete from users where id = 7;

-- 

select * from products;
select * from users;
select * from transaction;

insert into products (nama, harga, caption, stock) values
('Apel', 10000, 'wah enak apel', 10),
('Duren', 20000, 'wah enak duren', 10),
('Rambutan', 30000, 'wah enak rambutan', 10),
('Pisang', 40000, 'wah pisang', 10),
('Mangga', 50000, 'wah enak mangga', 10);

insert into transaction (userID, productID, quantity, harga) values
(1, 2, 5, 20000),
(1, 1, 1, 10000),
(3, 5, 3, 50000),
(3, 4, 2, 40000),
(6, 3, 5, 30000),
(6, 1, 10, 10000),
(9, 5, 11, 50000);

-- Setiap User pernah transaksi berapa kali
select userID, count(*) from transaction group by userID;

-- Tampilkan kolom total
select *, (quantity * harga) as 'total' from transaction order by total desc;

-- Tampilkan product yang dibeli paling banyak
-- Jumlah qty dari productID di dalam tabel transaction
select productID, sum(quantity) as 'totalSold' from transaction group by productID order by totalSold desc;









select productID, sum(quantity) 'totalQuantity' from transaction group by productID order by totalQuantity desc;