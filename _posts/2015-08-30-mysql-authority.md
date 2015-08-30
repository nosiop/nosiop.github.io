---
layout: post
title:  "mysql权限管理"
date:  2015-08-30 
categories: mysql
comments: true
excerpt:
---

* content
{:toc}

##常用命令

**注意：以下所有的userName都和userName@[host]有所区别,具体[host]()有哪些请看下表**

用户管理  
`use mysql;`

查看  
`select host,user,password from user;`

创建  
`create user userName IDENTIFIED by 'xxxxx';`   
`identified by`会将纯文本密码加密作为散列值存储  
如果不加上host创建的新用户通常是userName@'%'--即所有IP地址或域名可以访问，无访问限制  

修改  
`rename user kevin to newUser;`   
mysql 5之后可以使用，之前需要使用update更新user表

删除  
`drop user newUser;`     
mysql5之前删除用户时必须先使用`revoke`删除用户权限，然后删除用户，mysql5之后`drop`命令可以删除用户的同时删除用户的相关权限

更改密码  
`set password for userName =password('xxxx');`  
`update mysql.user set password=password('xxxx') where user='userName' and host='host'`

查看登陆用户权限  
`show grants;`

查看别的用户权限  
`show grants for userName;`

赋予权限  
`grant select on dmc_db.* to userName;`

回收权限  
`revoke select on dmc_db.* from userName;`  
如果权限不存在会报错
 
上面的命令也可使用多个权限同时赋予和回收，权限之间使用逗号分隔  
`grant select,update,delete,insert on dmc_db.* to userName;`

如果想立即看到结果使用  
`flush  privileges;`  
命令更新

---

##关于回收权限和删除用户

开始这个问题比较困扰，所以在此单列出来强调一下

`revoke`跟`grant`的语法差不多，只需要把关键字 `to`换成`from`即可：

	mysql>grant all on *.* to userName@host;
	mysql>revoke all on *.* from userName@host;

查看用户权限：
	
	mysql>show grants on userName@host;
	mysql>show grants; //查看当前登陆用户权限

删除用户语法：
	
	mysql>drop user userName@localhost;

或者使用直接操作数据库表：

	mysql>use mysql;
	mysql>DELETE FROM user WHERE User="userName" and Host="host";
	mysql>flush privileges;
	//删除用户数据库
	mysql>drop database userDB;

更新用户密码：

	mysql>


**注意：**    
**当收回权限后用户权限会变为`USAGE`,用户可以登陆但是无任何权限**  
**[困惑点]只有当用户删除后，该用户才彻底无法访问mysql服务器。用户一旦被创建即便收回所有权限，也会有USAGE权限可以登陆服务器，因为没有任何权限所以并不能做任何操作**  
**用户的信息通常是由userName和host两部分组成，所以drop user时尽量使用host确定要删除的用户，并控制外部的访问权限**

MySQL grant、revoke用户权限注意事项  
1. grant, revoke用户权限后，该用户只有重新连接MySQL数据库，权限才能生效    
2. 如果想让授权的用户，也可以将这些权限 grant 给其他用户，需要选项`with grant option`  

	mysql>grant select on testdb.* to dba@localhost with grant option;

这个特性一般用不到。实际中，数据库权限最好由 DBA 来统一管理。

---

##权限相关信息

###设置权限时必须给出一下信息
1，要授予的权限  
2，被授予访问权限的数据库或表  
3，用户名  

###grant和revoke可以在几个层次上控制访问权限
1，整个服务器:使用`grant all`和`revoke all`  
2，整个数据库:使用`on database.*`  
3，特定表:使用`on database.table`  
4，特定的列  
5，特定的存储过程  
 
###user表中host列的值的意义
<pre>
%             匹配所有主机  
localhost     localhost不会被解析成IP地址，直接通过UNIXsocket连接  
127.0.0.1     会通过TCP/IP协议连接，并且只能在本机访问；  
::1           ::1就是兼容支持ipv6的，表示同ipv4的127.0.0.1
</pre>  

---

##用例
###grant 普通数据用户：查询、插入、更新、删除数据库中所有表数据的权利。

	mysql>grant select on testdb.* to common_user@'%'
	mysql>grant insert on testdb.* to common_user@'%'
	mysql>grant update on testdb.* to common_user@'%'
	mysql>grant delete on testdb.* to common_user@'%'
	或者，用一条MySQL命令来替代：
	mysql>grant select,insert,update,delete on testdb.* to common_user@'%'

###grant 数据库开发人员：创建表、索引、视图、存储过程、函数等权限。

####grant 创建、修改、删除 MySQL 数据表结构 权限

	mysql>grant create on testdb.* to developer@'192.168.0.%'；
	mysql>grant alter on testdb.* to developer@'192.168.0.%'；
	mysql>grant drop on testdb.* to developer@'192.168.0.%'；

####grant 操作 MySQL 外键 权限

	mysql>grant references on testdb.* to developer@'192.168.0.%';

####grant 操作 MySQL 临时表 权限

	mysql>grant create temporary tables on testdb.* to developer@'192.168.0.%';

####grant 操作 MySQL 索引 权限

	mysql>grant index on testdb.* to developer@'192.168.0.%';

####grant 操作 MySQL 视图、查看视图源代码 权限

	mysql>grant create view on testdb.* to developer@'192.168.0.%';
	mysql>grant show view on testdb.* to developer@'192.168.0.%';

####grant 操作 MySQL 存储过程、函数 权限

	mysql>grant create routine on testdb.* to developer@'192.168.0.%';  
	#now, can show procedure status
	mysql>grant alter routine on testdb.* to developer@'192.168.0.%'; 
	#now, you can drop a procedure
	mysql>grant execute on testdb.* to developer@'192.168.0.%';

###grant 普通 DBA 管理某个 MySQL 数据库的权限

	mysql>grant all privileges on testdb to dba@'localhost'
	其中，关键字 “privileges” 可以省略。

###grant 高级 DBA 管理 MySQL 中所有数据库的权限。
	mysql>grant all on *.* to dba@'localhost'

###MySQL grant 权限，分别可以作用在多个层次上。
1.grant 作用在整个 MySQL 服务器上：  
	
	mysql>grant select on *.* to dba@localhost;  
	#dba 可以查询 MySQL 中所有数据库中的表  
	mysql>grant all on *.* to dba@localhost;  
	#dba 可以管理 MySQL 中的所有数据库  

2.grant 作用在单个数据库上：   
	
	mysql>grant select on testdb.* to dba@localhost; 
	#dba 可以查询 testdb 中的表

3.grant 作用在单个数据表上：  

	mysql>grant select,insert,update,delete on testdb.orders to dba@localhost;  

4.grant 作用在表中的列上：  

	mysql>grant select(id,se,rank) on testdb.apache_log to dba@localhost;  

5.grant 作用在存储过程、函数上：
  
	mysql>grant execute on procedure testdb.pr_add to 'dba'@'localhost'  
	mysql>grant execute on function testdb.fn_add to 'dba'@'localhost'
  
**注意：修改完权限以后 一定要刷新服务，或者重启服务，刷新服务用：FLUSH PRIVILEGES**  

---

##权限说明
<pre>
all  
alter  	
alter routine	         使用alter procedure和drop procedure  
create  
create routine	         使用create procedure  
create temporary tables	 使用create temporary table
create user	
create view	
delete	
drop	
execute                  使用call和存储过程
file                     使用select into outfile  和load data infile
grant option	         可以使用grant和revoke
index	                 可以使用create index 和drop index
insert	
lock tables              锁表
process	                 使用show full processlist
reload	                 使用flush
replication client       服务器位置访问
replocation slave        由复制从属使用
select	
show databases	
show view	
shutdown                 使用mysqladmin shutdown来关闭mysql
super	
update	
usage	                 无访问权限
</pre>

---

##权限涉及数据表
mysql授权表共有5个表：user、db、host、tables\_priv和columns\_priv。  
授权表的内容有如下用途：    

user表  
user表列出可以连接服务器的用户及其口令，并且它指定他们有哪种全局（超级用户）权限。在user表启用的任何权限均是全局权限，并适用于所有数据库。例如，如果你启用了DELETE权限，在这里列出的用户可以从任何表中删除记录，所以在你这样做之前要认真考虑。  

db表  
db表列出数据库，而用户有权限访问它们。在这里指定的权限适用于一个数据库中的所有表。  

host表  
host表与db表结合使用在一个较好层次上控制特定主机对数据库的访问权限，这可能比单独使用db好些。这个表不受GRANT和REVOKE语句的影响，所以，你可能发觉你根本不是用它。  

tables_priv表  
tables_priv表指定表级权限，在这里指定的一个权限适用于一个表的所有列。  

columns_priv表  
columns_priv表指定列级权限。这里指定的权限适用于一个表的特定列。  

---

##补充
遇到 SELECT command denied to user '用户名'@'主机名' for table '表名' 这种错误，解决方法是需要把吧后面的表名授权，即是要你授权核心数据库也要。  

遇到的是 SELECT command denied to user 'my'@'%' for table 'proc'，是调用存储过程的时候出现，原以为只要把指定的数据库授权就行了，什么存储过程、函数等都不用再管了，谁知道也要把数据库mysql的proc表授权  
