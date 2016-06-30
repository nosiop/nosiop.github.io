---
layout: post
title:  "ubuntu使用pptpd搭建VPN服务器"
date:  2016-06-06
categories: ubuntu server network
comments: true
excerpt:
---

* content
{:toc}

### 安装pptpd

	sudo apt-get install pptpd

---

### 配置内网ip策略

	sudo vim /etc/pptpd.conf

在#TAG: localip后增加2行

	localip 192.168.1.3
	remoteip 192.168.1.200-211,192.168.1.236

---

### pptpd相关配置

#### 配置dns

	sudo vim /etc/ppp/pptpd-options

在#ms-dns后增加2行，也可以配置其他dns

	ms-dns 8.8.8.8
	ms-dns 8.8.4.4

---

#### 配置VPN帐号

	sudo vim /etc/ppp/chap-secrets

添加账号、服务器名、密码和IP限制，一个帐号一行，每个参数中间用空格间隔。如：
	
	user    pptpd    password    *

---

#### TCP/IP策略配置

	sudo vim /etc/sysctl.conf

如果已经存在请取消注释，如果没有插入一行：

	net.ipv4.ip_forward=1

保存并退出vim
执行
	sudo sysctl –p

提示`net.ipv4.ip_forward = 1`说明配置生效

---

### iptables相关配置

#### 开放网络端口

安装iptables(已安装请忽略)

	sudo apt-get install iptables

开放1723端口

	sudo iptables -I INPUT -p tcp –dport 1723 -j ACCEPT

---

#### 配置NAT网络地址转换

	sudo iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -o eth0 -j MASQUERADE

保存并配置重启后的iptables。

	iptables-save > /etc/iptables-rules

修改`/etc/network/interfaces`，在eth0下添加：

	pre-up iptables-restore < /etc/iptables-rules

新建 /etc/network/if-pre-up.d/iptables，添加内容

	iptables-restore < /etc/iptables-rules 

给予文件执行权限 

	chmod 0755 /etc/network/if-pre-up.d/iptables

---

### 解决部分网站打不开的问题

根据实际情况设置mss

	iptables -I FORWARD -p tcp --syn -i ppp+ -j TCPMSS --set-mss 1456
	iptables-save > /etc/iptables-rules

---

### 重启pptpd

	sudo service pptpd restart 

---

### 客户端无法连接问题处理 

#### ufw防火墙配置阻止

>注：如果你是关闭ufw的这一步就不需要设置了,或者可以直接关闭ufw

	vim /etc/default/ufw

设置为ACCEPT打开状态

	DEFAULT_FORWARD_POLICY="ACCEPT"  

并且开放1723 47

	$ufw allow 1723/tcp
	$ufw allow 47/tcp

重启ufw

	$ufw disable
	$ufw enable

---

#### logwtmp冲突导致619错误

vim /etc/pptpd.conf

找到`logwtmp`用#注释掉
	