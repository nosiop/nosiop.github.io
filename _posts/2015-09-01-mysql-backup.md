---
layout: post
title:  "Mysql的备份与恢复"
date:  2015-09-01 
categories: mysql
comments: true
excerpt:
---

* content
{:toc}

MySQL备份和还原,都是利用`mysqldump`、`mysql`和`source`命令来完成的。   
###1.Win32下MySQL的备份与还原 
####1.1 备份 
开始菜单 | 运行 | cmd |利用`cd /Program Files/MySQL/MySQL Server 5.0/bin`命令进入bin文件夹 

利用`mysqldump  -u UserName -p DatabaseName>ExportFile`导出数据库到文件，

例如：`mysqldump -u root -p kdb>kdb.sql`，然后输入密码即可开始导出。 
  
####1.2 还原 
进入MySQL Command Line Client，输入密码，进入到`mysql>`   
输入`show databases；`，看看有些什么数据库；建立你要还原的数据库  
输入`create database kdb；`，切换到刚建立的数据库  
输入`use kdb；`  
导入数据输入`source kdb.sql；`,Enter开始导入  
再次出现`mysql>`并且没有提示错误即还原成功。 
  
###2.Linux下MySQL的备份与还原 
####2.1 备份 

	[root@localhost ~]# cd /var/lib/mysql #进入到MySQL库目录，根据自己的MySQL的安装情况调整目录
	[root@localhost mysql]# mysqldump -u root -p voice>voice.sql，输入密码即可。

####2.2 还原
法一：

	[root@localhost ~]# mysql -u root -p #回车，输入密码，进入MySQL的控制台"mysql>"，同1.2还原。

法二：

	[root@localhost ~]# cd /var/lib/mysql #进入到MySQL库目录，根据自己的MySQL的安装情况调整目录)]
	[root@localhost mysql]# mysql -u root -p voice<voice.sql #输入密码即可。
