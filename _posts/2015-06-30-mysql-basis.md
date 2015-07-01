---
layout: post
title:  "Mysql基础"
date:  2015-06-30 
categories: database
comments: true
excerpt:
---

* content
{:toc}

主要是为了记录 MySQL 一些有用的SQL语句和命令。
  
###1.列出所有的表  
<pre>show tables;</pre>  

###2.查询表结构  
<pre>
describe table_name;  
show columns from table_name;  
show create table table_name;  
</pre>

###3.查询表中的第几行  
<pre>
select * from table_name limit n;   查询前n行  
select * from table_name limit n-1, m-n; 查询从第n行开始的m行的记录  
</pre>

###4.设置数据库编码  
<pre>
set names utf8;  
</pre>

###5.创建数据库表  
语法：http://dev.mysql.com/doc/refman/5.1/en/create-table.html  
例子：http://www.blogjava.net/coderdream/archive/2007/08/17/137642.html  
<pre>
# 创建InnoDB引擎存储的数据库表  
CREATE TABLE IF NOT EXISTS Writers(Id INT PRIMARY KEY AUTO_INCREMENT, Name VARCHAR(25)) ENGINE=INNODB;  
</pre>

###6.联合  
<pre>
Select A.Name from A INNER JOIN B ON A.id = B.id  
Select A.Name from A Left JOIN B ON A.id = B.id  
Select A.Name from A Right JOIN B ON A.id = B.id  
Select A.Name from A Left JOIN B USING (id)  
</pre>

###7.Group by语句  
<pre>
SELECT sex, COUNT(*) FROM table GROUP BY sex   #　查询男／女性别人数  
SELECT sex, MAX(ages) AS age FROM table GROUP BY sex; # 查询男／女最大年龄    
</pre>

###8.MySQL创建用户与授权  
<pre>
参考：http://hi.baidu.com/fwso/blog/item/658c00555bdd1cc5b645aee0.html  
CREATE USER 'username'@'host' IDENTIFIED BY 'password';  
GRANT privileges ON databasename.tablename TO 'username'@'host'  
查询已有的用户:  
select * from mysql.user;  
</pre>

###9.向表中插入数据  
<pre>
参考：http://database.51cto.com/art/200811/97974.htm  
INSERT INTO table_name [(col_name,...)] VALUES (epression,...),...  
INSERT INTO table_name SET col_name=expression, ...  
</pre>

###10.删除表  
<pre>
DROP TABLE table_name  
</pre>

###11.批量执行SQL语句  
<pre>
假设SQL语句保存在mysql.sql文件中。  
source mysql.sql  
</pre>

###12.更改Root账号密码  
<pre>
$ /usr/bin/mysqladmin -u root password 'new-password'  
或者  
UPDATE mysql.user SET Password=PASSWORD('MyNewPass') WHERE User='root';  
FLUSH PRIVILEGES;  
</pre>

###13.查询一周内的数据  
<pre>
select count(*) from tablename where gmt_create > date_sub(now(), interval 1 week) and gmt_create < now();  
</pre>


参考资料：  
[Mysql Doc](http://dev.mysql.com/doc/refman/5.7/en/date-and-time-functions.html) | [一些资源](http://www.ccvita.com/category/mysql/)
