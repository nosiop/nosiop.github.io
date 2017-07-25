---
layout: post
title:  "Django结合Python3.x版本中使用MySql"
date:  2016-10-11
categories: django python mysql
comments: true
excerpt:
---

* content
{:toc}

### 问题描述

在Python2.7时代连接MySql的MySQLdb还不支持Python3.x。 所有在Python3.x下无法正常安装MySQLdb，但是Django目前连接mysql数据库只支持通过MySQLdb连接mysql server。因此形成了一对矛盾，此为问题根源所在。

---

### 解决mysqldb问题

解决该问题有不同的方式，如下是测试过的两种。

---

#### pymysql

通过pip命令安装：

	pip install pymysql

最关键的一点，在站点的__init__.py文件中，我们添加如下代码：

	import pymysql
	pymysql.install_as_MySQLdb()

做完上述动作后，即可在django中访问mysql了。

---

#### mysqlclient(Django Doc)

通过pip命令安装：

	pip install mysqlclient

其中可能会出现`OSError: mysql_config not found`错误。

解决方案如下  

---

#### mysql_config not found错误

> 在ubuntu下

安装libmysqlclient-dev包即可，如果还有问题，可以安装Python-dev。

	apt-get install libmysqlclient-dev python3-dev

安装完成后便可以直接使用MySQLdb进行连接了。

> 在mac os下

首先Mac os下需要安装mysql server

然后在`~/.bashrc`中添加：

	export PATH=$PATH:/usr/local/mysql/bin

---

#### 验证安装

在shell命令行中输入：

	-> python

进入python交互控制台输入：
	
	-> import MySQLdb

如果能正常导入表示包文件安装成功。

---

### Django中mysql设置

修改Django中的设置文件 setting.py ：

默认设置为sqlite3数据库：

	DATABASES = {
		'default': {
	    	'ENGINE': 'django.db.backends.sqlite3',                    #数据库引擎
	        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
	}

修改为mysql数据库：

	DATABASES = {
		'default': {
	    	'ENGINE': 'django.db.backends.mysql',                    #数据库引擎
	        'NAME': 'test',                                          #数据库名
	        'USER': 'root',                                          #用户名
	        'PASSWORD': 'root',                                      #密码
	        'HOST': '192.168.1.11',                                  #数据库主机，不填写默认为localhost
	        'PORT': '3306',                                          #数据库端口，不填写MySQL默认为3306
	        'OPTIONS': {
				'init_command': 'SET GLOBAL max_connections = 2000,  #！设置mysql最大连接数，默认为151
	        },
	    }
	}

 
