---
layout: post
title:  "ubuntu安装mysql"
date:  2015-08-29 
categories: mysql
comments: true
excerpt:
---

* content
{:toc}

###MYSQL安装
安装了ubuntu server 15.04
查看是否已经安装mysql-server：`apt-cache policy mysql-server`  
通过源查询mysql-server：`apt-cache search mysql-server`  
通过源安装mysql-server：`sudo apt-get install mysql-server`

---

###MYSQL对外部访问授权


####1.连接进入
	
	$mysql -u root -proot (这里密码在mysql安装过程中提示有设置)

---

####2.这里直接给root的外部访问权限了

**注意：(这样做很可能不安全)**；  
	
	#赋予root用户针对数据库的全部权限。（password为root用户密码）	
	mysql>grant all privileges on *.* to 'root'@'%' identified by 'password' with grant option;
	#或是针对特定的数据库，特定的表，特定的用户和特定的域名或IP进行授权
	mysql>grant all privileges on DatabaseName.* to 'UserName'@'Domain|IP' identified by 'password' with grant option;
	
	#最后让授权生效
	mysql>flush privileges;
	$exit

例如：
  
	mysql>grant select,insert,update,delete on *.* to admin@'%' identified by '123456';  
	#新加的用户admin,其host为%,表示任何IP都可以连接进来.  

>**注意概念:**  
with grant option 的作用是权限传递，只有拥有这个选项的用户具有授予权限的权利。  
host = localhost 的时候,表示登陆者是本机  
直接修改mysql数据库的user表也可以达到修改权限的效果，最后要`flush privileges;`一下  

---

####3.退出数据库

这时在Windows下面远程连接该数据库，则会报  
Can’t connect to MySQL server on ‘xxx.xxx.xxx.xxx’的错误。  

此错误原因在于：  
ubuntu中MySQL监听的3306端口IP问题，查看ubuntu中3306端口监听  
`$netstat -anpt|grep 3306`  
可以发现，当前默认监听的是127.0.0.1:3306

这里修改127.0.0.1的ip地址为你当前的ip地址。
使用root权限，修改`/etc/mysql/mysql.conf.d/mysqld.cnf`文件中bind-address，将bind-address=127.0.0.1修改为本机IP，重启MySQL服务，再使用上面命令查看端口监听，就会发现已经变成了本机IP:3306。这时，就可以使用远程连接了。
