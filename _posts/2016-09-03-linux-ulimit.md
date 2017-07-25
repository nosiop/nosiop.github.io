---
layout: post
title: "Linux文件最大连接数问题"
date: 2016-09-03
categories: ubuntu linux server
comments: true
excerpt:
---

* content
{:toc}

### 问题描述

登录系统报错，-bash: ulimit: open files: cannot modify limit: Operation not permitted
	
	Last login: Thu Aug 23 14:42:27 2012 from 10.6.90.41
	-bash: ulimit: open files: cannot modify limit: Operation not permitted	

实际上是执行ulimit命令时，出现问题

	-bash-3.2$ ulimit -a
	core file size          (blocks, -c) 0
	data seg size           (kbytes, -d) unlimited
	scheduling priority             (-e) 0
	file size               (blocks, -f) unlimited
	pending signals                 (-i) 1064960
	max locked memory       (kbytes, -l) 32
	max memory size         (kbytes, -m) unlimited
	open files                      (-n) 1024
	pipe size            (512 bytes, -p) 8
	POSIX message queues     (bytes, -q) 819200
	real-time priority              (-r) 0
	stack size              (kbytes, -s) 10240
	cpu time               (seconds, -t) unlimited
	max user processes              (-u) 16384
	virtual memory          (kbytes, -v) unlimited
	file locks                      (-x) unlimited
	-bash-3.2$ 
	-bash-3.2$ ulimit -u 16384 -n 65536
	-bash: ulimit: open files: cannot modify limit: Operation not permitted
	-bash-3.2$ 

普通用户ssh连接linux服务器是总是提示：

	ulimit: open files: cannot modify limit: Operation not permitted

---

### 解决办法

	sudo vim /etc/security/limits.conf

添加如下
打开文件最大数量限制：

	* soft nofile 65535
	* hard nofile 65535

优化内核时
用户最大进程数：

	* soft nproc 65535
	* hard nproc 65535
