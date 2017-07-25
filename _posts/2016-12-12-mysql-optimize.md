---
layout: post
title:  "mysql并发优化"
date:  2016-12-12
categories: mysql database
comments: true
excerpt:
---

* content
{:toc}

### Linux系统参数调整

位置`/etc/security/limits.conf`

sudo vim /etc/security/limits.conf

添加如下
打开文件最大数量限制：

	* soft nofile 65535
	* hard nofile 65535

优化内核时
用户最大进程数：

	* soft nproc 65535
	* hard nproc 65535

重启系统

---

### mysql配置文件位置

`/etc/mysql/mysql.conf.d/mysqld.cnf`

---

### mysql参数查询

>首先需要进入mysql console

mysql 系统参数查询

	show variables;  # 显示全部设置参数
	或者
	show variables like "%connection%"

mysql 系统状态查询

	mysql -uroot -p
	
	show status; # 显示全部状态参数
	或者
	show status like "%thread%"

---

### 调整 max_connections 问题

**问题：**

mysql的max_connections默认值为151	  
在`/etc/mysql/mysql.conf.d/mysqld.cnf`中修改

	max_connections = 1000

重启mysql，进入系统查询

	show variables like "%max_connection%"

参数值只能提升到214
	

**原因：**

因为mysql每打开一个connection需要打开若干个file，所以max_connections参数和open_files_limit相关。  
查看open_files_limit参数为1000


**解决方案：**

首先如上述所写，需要先对Linux系统的`open files`和`max user processes`参数做相应的调整。

在Ubuntu下

	sudo vim /lib/systemd/system/mysql.service

在末尾添加如下:

	LimitNOFILE=infinity	
	LimitMEMLOCK=infinity

daemon重载

	sudo systemctl daemon-reload

在`/etc/mysql/mysql.conf.d/mysqld.cnf`修改：

	max_connections = 1500
	

重启mysql
	
	sudo service mysql restart

---

### 错误：lock wait timeout exceeded mysql

将innodb_lock_wait_timeout 锁定等待时间改大

修改`/etc/mysql/mysql.conf.d/mysqld.cnf`文件：

	#innodb_lock_wait_timeout = 50

修改为

	innodb_lock_wait_timeout = 500





