create table web_visitor(
	visitor_id varchar(20) not null primary key,
	visitor_pass varchar(500) not null,
    visitor_name varchar(30) not null,
	visitor_birthday datetime default '1991-01-01',
    visitor_phone varchar(11),
    visitor_photo varchar(500),
    visitor_email varchar(50),
    visitor_address1 varchar(100),
    visitor_address2 varchar(100)
);
desc web_visitor;
select * from web_visitor;
alter table web_visitor add column visitor_state int default 1;

insert into web_visitor(visitor_id, visitor_pass,visitor_name) values('blue1234','pass1234@','블루');
select * from web_visitor;
drop table web_visitor;

create table erp_items(
	items_id varchar(50) primary key,
    items_name varchar(100) not null,
    items_photo varchar(100),
    items_type int default 0
);

desc erp_items;
select * from erp_items;
insert into erp_items(items_id, items_name) values("coke_1.5L","콜라 1.5L");
insert into erp_items(items_name) values("콜라 1.25L");
insert into erp_items(items_name) values("콜라 250ml");
delete from erp_items where items_id =4;
drop table erp_items;

/*erp 인사관리*/
/*erp 부서 테이블*/
create table erp_dept(
	dept_key varchar(50) primary key,
    dept_name varchar(100) not null
);
insert into erp_dept (dept_key, dept_name) values("2", "경영지원");

select date_format(now(), '%Y%m');
/*erp 사원 테이블*/
create table erp_member_info(
	member_info_key varchar(50) primary key,
    member_info_id varchar(20) not null unique,
    member_info_pass varchar(500) not null,
    member_info_name varchar(30) not null,
    member_info_resident varchar(100) not null,
    member_info_phone varchar(100),
    member_info_address1 varchar(100),
    member_info_address2 varchar(100),
    member_info_email varchar(100),
    member_info_photo varchar(100),
    member_info_hiredate datetime default now(),
    member_info_account varchar(200),
    member_info_job varchar(100) default "인턴",
    dept_key varchar(50) not null,
    foreign key(dept_key) references erp_dept(dept_key)
);

alter table erp_member_info add column member_info_salary int default 0;
update erp_member_info set member_info_salary=40000000 where member_info_key > "";

desc erp_member_info;
select * from erp_member_info;
call getERPMemberKey();

insert into erp_member_info(member_info_key, member_info_id, member_info_pass, member_info_name, member_info_resident, dept_key)
values("1","kiin","pass","김기인","1","1");

insert into erp_member_info(member_info_key, member_info_id, member_info_pass, member_info_name, member_info_resident, dept_key)
values("2","red","pass","김레드","1","2");

insert into erp_member_info(member_info_key, member_info_id, member_info_pass, member_info_name, member_info_resident, dept_key)
values("3","test","tset","거래처테스트","1","2");

select * from erp_member_info;


/*erp 사원 급여 테이블*/
create table erp_member_salary(
	member_salary_key int auto_increment primary key,
    member_info_key varchar(50) not null,
    member_salary_money double default 0,
    member_salary_date datetime default now(),
    foreign key(member_info_key) references erp_member_info(member_info_key)
);

select * from erp_member_salary;


/*erp 사원 근태 테이블*/
create table erp_member_attendance(
	member_attendance_key int auto_increment primary key,
    member_info_key varchar(50) not null,
    member_attendance_date date,
    member_attendance_start datetime,
    member_attendance_end datetime,
    foreign key(member_info_key) references erp_member_info(member_info_key)
);

select * from erp_member_attendance;
drop table erp_member_attendance;

/*erp 계좌 테이블*/
create table erp_account(
	account_number varchar(200) primary key,
    account_name varchar(100), 
    account_total int default 0,
    account_regdate datetime default now(),
    account_detail varchar(100)
);

insert into erp_account(account_number, account_name, account_detail) values("031602-04-079572", "ScarabERP", "sales");
insert into erp_account(account_number, account_name, account_detail) values("239-85456-912374", "ScarabERP", "salary");
select * from erp_account;
select * from erp_transaction where account_number="239-85456-912374" and member_info_key like "%%" ORDER BY transaction_date limit 0,5;
update erp_account set account_total=500000000 where account_number = "239-85456-912374";

/*erp 거래 테이블*/
create table erp_transaction(
	transaction_id int auto_increment primary key,
    account_number varchar(200) not null,
    transaction_deposit int,
    transaction_withdraw int,
    transaction_date datetime default now(),
    member_info_key varchar(50),
    client_id int,
    vendor_id int,
    sales_id varchar(20),
    purchase_id varchar(20),
    foreign key(account_number) references erp_account(account_number),
    foreign key(member_info_key) references erp_member_info(member_info_key),
    foreign key(client_id) references erp_client(client_id),
    foreign key(vendor_id) references erp_vendor(vendor_id),
    foreign key(sales_id) references erp_sales(sales_id),
    foreign key(purchase_id) references erp_purchase(purchase_id)
);
select * from erp_client;
select * from erp_transaction;
select * from erp_member_info;

insert into erp_transaction(account_number, transaction_withdraw, transaction_date, vendor_id, purchase_id) 
values("031602-04-079572", 2300000, "2024-06-12", 8, "2023-01-02-001");
insert into erp_transaction(account_number, transaction_withdraw, transaction_date, vendor_id, purchase_id) 
values("031602-04-079572", 3150000, "2024-07-12", 9, "2023-01-02-002");
insert into erp_transaction(account_number, transaction_deposit, transaction_date, client_id, sales_id) 
values("031602-04-079572", 5270000, "2024-06-25", 13, "2023-01-02-002");
insert into erp_transaction(account_number, transaction_deposit, transaction_date, client_id, sales_id) 
values("031602-04-079572", 9410000, "2024-07-30", 19, "2023-01-02-002");
select * from erp_transaction;

delete from erp_transaction where transaction_id > 0;


/* 창고테이블 */
create table erp_warehouse(
warehouse_id int auto_increment primary key,
warehouse_name varchar(50) not null,
warehouse_address varchar(100)
);

desc erp_warehouse;
select * from erp_warehouse;
insert into erp_warehouse(warehouse_name, warehouse_address) values("안성1공장","안성시 소현로");
delete from erp_warehouse where warehouse_id > 0;
drop table erp_warehouse;



/* 판매테이블 */
create table erp_sales(
sales_id varchar(20) primary key,
sales_items_id varchar(50) not null,
sales_qnt int default 1 not null,
sales_employee varchar(20) not null,
sales_location int,
sales_date datetime default now(),
sales_warehouse int,
sales_price int default 0,
foreign key(sales_items_id) references erp_items(items_id),
foreign key(sales_employee) references erp_member_info(member_info_id),
foreign key(sales_location) references erp_client(client_id),
foreign key(sales_warehouse) references erp_warehouse(warehouse_id)
);



/* 수정된판매테이블 */
create table erp_sales(
sales_id varchar(20) primary key,
sales_employee varchar(20) not null,
sales_location int,
sales_date datetime default now(),
foreign key(sales_employee) references erp_member_info(member_info_id),
foreign key(sales_location) references erp_client(client_id)
);

/*판매정보테이블 */
create table erp_sales_info(
sales_info_id int auto_increment primary key,
sales_id varchar(20) not null,
sales_items_id varchar(50) not null,
sales_qnt int default 1 not null,
sales_warehouse int,
sales_price int default 0,
foreign key(sales_id) references erp_sales(sales_id),
foreign key(sales_items_id) references erp_items(items_id),
foreign key(sales_warehouse) references erp_warehouse(warehouse_id)
);


call getSaleId();
select * from erp_sales;
desc erp_sales;
drop table erp_sales;


/* 판매거래처 테이블  */
create table erp_client(
client_id int auto_increment primary key,
client_name varchar(50) not null,
client_person varchar(20),
client_employee varchar(20),
client_phone varchar(20),
client_address varchar(100),
client_credit_limit int default 0 /* 0=0 1=~1000 2= ~5000 3= ~10000 4=*/,
client_fax varchar(20),
client_email varchar(20),
foreign key(client_employee) references erp_member_info(member_info_id)
 );
 
 desc erp_client;
 select * from erp_client;
 
 
 /*구매테이블 */
 create table erp_purchase(
purchase_id varchar(20) primary key,
purchase_items_id varchar(50) not null,
purchase_qnt int default 1 not null,
purchase_employee varchar(20) not null,
purchase_location int,
purchase_date datetime default now(),
purchase_warehouse int,
purchase_price int default 0,
foreign key(purchase_items_id) references erp_items(items_id),
foreign key(purchase_employee) references erp_member_info(member_info_id),
foreign key(purchase_location) references erp_vendor(vendor_id),
foreign key(purchase_warehouse) references erp_warehouse(warehouse_id)
);

desc erp_purchase;
select * from erp_purchase;
call getPurchaseId();

/*구매테이블 */
create table erp_purchase(
purchase_id varchar(20) primary key,
purchase_employee varchar(20) not null,
purchase_location int,
purchase_date datetime default now(),
foreign key(purchase_employee) references erp_member_info(member_info_id),
foreign key(purchase_location) references erp_vendor(vendor_id)
);

create view view_purchase as select p.*, m.member_info_name from erp_purchase p left join erp_member_info m on p.purchase_employee = m.member_info_id;
select * from view_purchase;

create view view_pi as 
select p.*, pi.purchase_items_id, pi.purchase_qnt, pi.purchase_price 
from erp_purchase p 
inner join erp_purchase_info pi 
on p.purchase_id = pi.purchase_id
GROUP BY pi.purchase_items_id;

select * from view_pi;
drop view view_pi;

select * from erp_purchase_info;
select * from erp_purchase;

/*구매상세테이블 */
create table erp_purchase_info(
purchase_info_id int auto_increment primary key,
purchase_id varchar(20),
purchase_items_id varchar(50) not null,
purchase_qnt int default 1 not null,
purchase_warehouse int,
purchase_price int default 0,
foreign key(purchase_id) references erp_purchase(purchase_id),
foreign key(purchase_items_id) references erp_items(items_id),
foreign key(purchase_warehouse) references erp_warehouse(warehouse_id)
);

desc erp_purchase_info;



 /*구매처관리테이블*/
 create table erp_vendor(
vendor_id int auto_increment primary key,
vendor_name varchar(50) not null,
vendor_person varchar(20),
vendor_employee varchar(20),
vendor_phone varchar(20),
vendor_address varchar(100),
vendor_credit_limit int default 0 /* 0=0 1=~1000 2= ~5000 3= ~10000 4=*/,
vendor_fax varchar(20),
vendor_email varchar(20),
foreign key(vendor_employee) references erp_member_info(member_info_id)
);

desc erp_vendor;
select * from erp_vendor;

create view view_vendor as select v.*, member_info_name from erp_vendor v left join erp_member_info m on v.vendor_employee = m.member_info_id;
select * from view_vendor;


/*erp공지사항테이블*/
create table erp_notice(
notice_id int auto_increment primary key,
notice_title varchar(100) not null,
notice_contents text,
notice_writer varchar(20) not null,
notice_regdate datetime default now(),
notice_type int default 0,
notice_viewcnt int default 0,
foreign key(notice_writer) references erp_member_info(member_info_id)
);

desc erp_notice;
select * from erp_notice;
drop table erp_notice;


/*보낸메시지함   */
create table  erp_send_message(
	message_id int auto_increment primary key,
	message_sender varchar(20) not null,
	message_receiver varchar(20) not null,
	message_content text,
    message_title varchar(200) not null,
	message_senddate datetime default now(),
	message_state int default 0, /* 0.보류 , 1.휴지통이동 */
	foreign key(message_sender) references erp_member_info(member_info_id),
	foreign key(message_receiver) references erp_member_info(member_info_id)
);
desc erp_receive_message;

select * from erp_receive_message;
select * from erp_send_message;
select count(*) from erp_receive_message;
select count(*) from erp_send_message;
/*받은메시함*/
create table erp_receive_message(
	message_id  int auto_increment primary key,
	message_sender varchar(20) not null,
	message_receiver varchar(20) not null,
	message_content text,
	message_title varchar(200) not null,
	message_senddate datetime default now(),
	message_readdate datetime,
	message_state int default 0, /* 0.보류 , 1.휴지통이동 */
	foreign key(message_sender) references erp_member_info(member_info_id),
	foreign key(message_receiver) references erp_member_info(member_info_id)
);




desc erp_receive_message;



/*jay*/

-- 고객센터 게시판
CREATE TABLE web_bbs (
    web_employ_bbsbbs_id INT AUTO_INCREMENT PRIMARY KEY,
    bbs_title VARCHAR(200) NOT NULL,
    bbs_writer VARCHAR(20),
    bbs_content TEXT,
    bbs_category VARCHAR(255),
    bbs_regdate datetime  default now(),
    
    FOREIGN KEY (bbs_writer) REFERENCES web_visitor(visitor_id)
);
alter table web_bbs
add column bbs_viewcnt int default 0;

select * from web_bbs;

select * from web_bbs
order by bbs_id desc
limit 1, 5;

select count(*) from web_bbs;

select * from web_bbs;

update web_bbs
set bbs_title='이렇게 제목을 0',bbs_content='이렇게 내용을 '
where bbs_id=5;

delete from web_bbs
where bbs_id=5;


select * from web_visitor; 
select * from web_bbs;




alter table web_bbs
add column bbs_regdate datetime default now();



insert into web_bbs(bbs_title, bbs_writer, bbs_content, bbs_category)
values('게시판 첫글은 이것 ','blue1234','게시물을 올리기 참 어렵단말이야','고객센터');


insert into web_bbs(bbs_title, bbs_writer, bbs_content, bbs_category)
values('아무거나 제목','blue1234','아무거나 내용1','고객센터');


insert into web_bbs(bbs_title, bbs_writer, bbs_content, bbs_category)
values('기업은 이익을 위함','blue1234','물건을 이따구로 만들고 말이야','고객센터');

insert into web_bbs(bbs_title, bbs_writer, bbs_content, bbs_category)
values('기업은 이익을 위함','pink1234','물건을 이따구로 만들고 말이야','고객센터');
insert into web_bbs(bbs_title, bbs_writer, bbs_content, bbs_category)
values('기 위함','pink1234','물건을 이따구로 만들고 말이야','고객센터');
insert into web_bbs(bbs_title, bbs_writer, bbs_content, bbs_category)
values(' 이익을 위함','pink1234','물건을 이따구로 만들고 말이야','고객센터');

select * from web_bbs;
desc web_bbs;





-- 고객센터 게시판 사진
CREATE TABLE web_photo (
    photo_id INT AUTO_INCREMENT PRIMARY KEY,
    photo_name VARCHAR(255) NOT NULL,
    photo_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    visitor_id VARCHAR(20),
    FOREIGN KEY (visitor_id) REFERENCES web_visitor(visitor_id)
);
select * from web_photo;

-- 고객센터 FAQ
CREATE TABLE web_faq (
    faq_id INT AUTO_INCREMENT PRIMARY KEY,
    faq_contents TEXT NOT NULL,
    faq_title VARCHAR(200) NOT NULL,
    faq_regDate DATETIME DEFAULT NOW (),
    faq_type INT DEFAULT 0,
    faq_viewcnt INT DEFAULT 0,
    faq_admin VARCHAR(20) NOT NULL,
    member_info_id VARCHAR(50),
    FOREIGN KEY (member_info_id)
        REFERENCES erp_member_info (member_info_id)
);

select * from web_faq
<where>
<if test="key == 'faq_title'"> faq_title like CONCAT('%', #{word},'%') </if>
<if test="key == 'faq_contents'"> faq_contents like CONCAT('%', #{word},'%') </if>
</where>
order by faq_id desc
limit 1, 5;

SELECT * 
FROM web_faq
WHERE faq_title LIKE CONCAT('%', '검색어', '%') 
   OR faq_contents LIKE CONCAT('%', '검색어', '%')
ORDER BY faq_id DESC
LIMIT 1, 5;

select * from web_faq;
			
select * from web_faq;
drop table web_faq;
insert into web_faq(faq_title, faq_contents, faq_admin)
values('타이틀', '컨텐츠와 내용', 'jay');
/* 채용공고  참고용 병준이 꺼*/
create table web_employ_bbs(
employ_bbs_id int auto_increment primary key,
employ_bbs_title varchar(500) not null,
employ_bbs_contents text,
employ_bbs_admin varchar(20) not null,
employ_bbs_regdate datetime default now(),
employ_bbs_type int default 0,
employ_bbs_viewcnt int default 0,
foreign key(employ_bbs_admin) references erp_member_info(member_info_id)
); 

-- 고객센터 게시판 답변
CREATE TABLE web_reply (
    reply_id INT AUTO_INCREMENT PRIMARY KEY,
    reply_writer VARCHAR(20),
    reply_contents TEXT,
    reply_regDate DATE,
    bbs_id INT,
    member_info_id VARCHAR(50),
    FOREIGN KEY (reply_writer) REFERENCES erp_member_info(member_info_id),
    FOREIGN KEY (bbs_id) REFERENCES web_bbs(bbs_id)
);

select * from erp_sales_info;
select * from erp_purchase_info;
select * from erp_items;
-- 재고 테이블(이지만 사실은 뷰)
create view inventory_view as
select 
   i.items_id,
   i.items_name,
   i.items_photo,
   i.items_type,
   ifnull(sum(p.purchase_qnt),0) - ifnull(sum(s.sales_qnt), 0) as rest_qnt,
   w.warehouse_id,
   w.warehouse_name,
   w.warehouse_address
from erp_items i
left join erp_purchase_info p on i.items_id = p.purchase_items_id
left join erp_sales_info s on i.items_id = s.sales_items_id
left join erp_warehouse w on
   p.purchase_warehouse = w.warehouse_id
   or s.sales_warehouse = w.warehouse_id
group by i.items_id, w.warehouse_id
order by i.items_id;
select * from inventory_view;
desc inventory_view;


-- 거래 뷰 (구매+판매)
CREATE VIEW trade_view AS
SELECT
    '1' AS type,
    purchase_info_id AS trade_id,
    purchase_items_id AS item,
    erp_items.items_name AS item_name,
    purchase_qnt AS qnt,
    purchase_price AS price,
    purchase_id AS date,
    purchase_warehouse AS warehouse,
    erp_warehouse.warehouse_name AS warehouse_name
FROM erp_purchase_info
JOIN erp_items ON purchase_items_id = erp_items.items_id
JOIN erp_warehouse ON purchase_warehouse = erp_warehouse.warehouse_id
UNION ALL
SELECT
    '2' AS type,
    sales_info_id AS trade_id,
    sales_items_id AS item,
    erp_items.items_name AS item_name,
    sales_qnt AS qnt,
    sales_price AS price,
    sales_id AS date,
    sales_warehouse AS warehouse,
    erp_warehouse.warehouse_name AS warehouse_name
FROM erp_sales_info
JOIN erp_items ON sales_items_id = erp_items.items_id
JOIN erp_warehouse ON sales_warehouse = erp_warehouse.warehouse_id;
select * from trade_view;
desc trade_view;


/* 채용공고 */
create table web_employ_bbs(
employ_bbs_id int auto_increment primary key,
employ_bbs_title varchar(500) not null,
employ_bbs_contents text,
employ_bbs_admin varchar(20) not null,
employ_bbs_regdate datetime default now(),
employ_bbs_type int default 0,
employ_bbs_viewcnt int default 0,
foreign key(employ_bbs_admin) references erp_member_info(member_info_id)
);
drop view employ_bbs_view;
create view employ_bbs_view as
select b.*, u.member_info_id, u.member_info_name
from web_employ_bbs b, erp_member_info u
where b.employ_bbs_admin=u.member_info_id;

desc web_employ_bbs;
select * from web_employ_bbs;
select * from employ_bbs_view;

select * from inventory_view where items_id="sinrameblack_1";
select * from erp_sales;
select * from erp_sales_info;
desc erp_sales;

select * from erp_transaction;
delete from erp_transaction
where transaction_id <1000;

select * from erp_member_salary;
delete from erp_member_salary
where member_salary_key <1000;

select * from erp_member_info;

delete from erp_member_info where member_info_id="a";

select * from erp_sales;

update erp_sales
set sales_type=0
where sales_id>"";
update erp_purchase
set purchase_type=0
where purchase_id>"";


