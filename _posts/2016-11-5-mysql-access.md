---
layout: post
title:  "ubuntu开启mysql外部访问权限"
date:  2016-11-05
categories: ubuntu database mysql
comments: true
excerpt:
---

* content
{:toc}

### 远程访问mysql

安装完成mysql server后，因为尚未开通外部访问权限所以无法通过远程连接该数据库

安装了ubuntu，通过sudo apt-get install mysql-server安装了了mysql，这里不做安全考虑，我直接给权限了。

1.连接进入；

	->mysql -u root -proot(这里密码在mysql安装过程中提示有设置)

2.我这里直接给root的外部访问权限了；
	
	->grant all privileges on *.* to ‘root’@'%’ identified by ‘password’ with grant option;

赋予root用户针对数据库的全部权限。（password为root用户密码）

3.退出数据库。

---

### mysql监听IP设置

这时在Windows下面远程连接该数据库，则会报
Can’t connect to MySQL server on ‘xxx.xxx.xxx.xxx’的错误。

此错误原因在于：
ubuntu中MySQL监听的3306端口IP问题，查看ubuntu中3306端口监听

	->netstat -anpt|grep 3306

可以发现，当前默认监听的是127.0.0.1:3306

这里修改127.0.0.1的ip地址为你当前的ip地址。

使用root权限，修改`/etc/mysql/mysql.conf.d/mysqld.cnf`文件中bind-address，将`bind-address=127.0.0.1`修改为`本机IP(192.168.1.xx)`，重启MySQL服务，再使用上面命令查看端口监听，就会发现已经变成了本机IP:3306。这时，就可以使用远程连接了。