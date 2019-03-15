create table hv_member(
	hm_id varchar2(15 char) primary key,
	hm_pw varchar2(20 char) not null,
	hm_name varchar2(10 char) not null,
	hm_address varchar2(100 char) not null
);
       
create table hv_sns(
	hs_no number(5) primary key,
	hs_id varchar2(15 char) not null,
	hs_title varchar2(150 char) not null,
	hs_text varchar2(2500 char) not null,
	hs_date date not null,
	hs_img varchar2(150 char) not null,
	constraint c_sns 
		foreign key(hs_id) 
		references hv_member(hm_id) 
		on delete cascade
); ->삭제 : 아래 코드실행
drop table hv_sns cascade constraint purge;

create table hv_sns(
	hs_no number(5) primary key,
	hs_id varchar2(15 char) not null,
	hs_title varchar2(150 char) not null,
	hs_text varchar2(2500 char) not null,
	hs_date date not null,
	constraint c_sns 
		foreign key(hs_id) 
		references hv_member(hm_id) 
		on delete cascade
);->생성


create table hv_image(
	hi_no number(5) primary key,
	hi_sno number(5) not null,
	hi_fname varchar2(150 char) not null,
	constraint c_image 
		foreign key(hi_sno) 
		references hv_sns(hs_no) 
		on delete cascade
); ->생성
create sequence hi_seq; ->생성


create sequence hs_seq;

create table hv_reply(
	hr_no number(5) primary key,
	hr_sno number(5) not null,
	hr_id varchar2(15 char) not null,
	hr_text varchar2(350 char) not null,
	hr_date date not null,
	constraint c_reply1 
		foreign key(hr_sno) 
		references hv_sns(hs_no) 
		on delete cascade,
	constraint c_reply2  
		foreign key(hr_id) 
		references hv_member(hm_id) 
		on delete cascade
);
create sequence hr_seq;


create table hv_plan(
	hp_no number(5) primary key,
	hp_uid varchar2(15 char) not null,
	hp_date date not null,
	hp_city varchar2(20 char) not null,
	hp_placeid varchar2(27 char) not null,
	hp_pname varchar2(100 char) not null,
	hp_rating number(2, 1) not null,
	hp_paddress varchar2(200 char) not null,
	hp_url varchar2(200 char) not null,
	hp_website varchar2(200 char) not null,
	hp_phone varchar2(20 char) not null,
	constraint c_plan 
		foreign key(hp_uid) 
		references hv_member(hm_id) 
		on delete cascade
);
create sequence hp_no;


-----------------------------------------

select * from hv_member;
select * from hv_sns;
select * from hv_reply;
select * from hv_plan;

-----------------------------------------

select * from hv_cart;


drop table hv_cart cascade constraint purge;
drop table hv_plan cascade constraint purge;



create table hv_cart(
	hc_no number(5) primary key,
	hc_uid varchar2(15 char) not null,
	hc_category varchar2(10 char) null,
	hc_placeid varchar2(27 char) not null,
	hc_store varchar2(100 char) not null,
	hc_location varchar2(200 char) not null,
	hc_url varchar2(200 char) not null,
	hc_website varchar2(200 char) not null,
	hc_phone varchar2(20 char) not null,
	constraint c_cart 
		foreign key(hc_uid) 
		references hv_member(hm_id) 
		on delete cascade
);
create sequence hc_no;