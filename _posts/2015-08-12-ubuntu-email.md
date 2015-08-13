---
layout: post
title:  "Ubuntu cmd配置发送Email"
date:  2015-08-12 
categories: ubuntu
comments: true
excerpt:
---

* content
{:toc}


##安装
	sudo apt-get install mutt msmtp 
	#一切默认设置就行。

---

##配置

###MUTT
系统全局设置`/etc/Muttrc`,如果使用某个系统用户，可以在`~/.muttrc`中设置。

	$vi .muttrc
	
	set sendmail="/usr/bin/msmtp"
	set use_from=yes
	set realname="testName"
	set from=test@163.com
	set envelope_from=yes

---

###MSMTP
创建`~/.msmtprc`和`~/.msmtp.log`,分别为配置和日志文件。

	$vim .msmtprc

	account default
	host smtp.163.com
	from test@163.com
	auth plain
	user test
	password 123456
	
	$logfile ~/.msmtp.log

由于password是明码，所以我们需要修改此文件的权限。  
`$chmod 600 .msmtprc`  
`$touch ~/.msmtp.log`  
查看SMTP服务器是否支持认证的TLS加密：  

敲入如下命令：`$msmtp --host=smtp.163.com --serverinfo`回车


>SMTP server at smtp.163.com (m5-86.163.com [202.108.5.86]), port 25:  
　　163.com Anti-spam GT for Coremail System (163com[20050206])  
Capabilities:  
　　PIPELINING:  
　　　　Support for command grouping for faster transmission  
　　AUTH:   
　　　　Supported authentication methods:  
　　　　PLAIN LOGIN

---

##测试

到这里，你可以使用mutt来发送邮件了，我们测试一下。

	$echo "test" | mutt -s "my_first_test" destination@163.com
	# -s "my_first_test" --title of email
	# destination@163.com --destination email address

检查邮箱看看是否成功收到邮件！

