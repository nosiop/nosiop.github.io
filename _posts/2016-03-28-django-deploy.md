---
layout: post
title:  "Nginx + Gunicorn + Django 部署"
date:   2016-03-28 
categories: server django
comments: true
excerpt: 
---

* content
{:toc}


### 环境准备

安装相关软件服务建立部署环境

所涉及到的应用及服务

ubuntu14.04,nohup,python3.4.3,nginx1.9.3

Django1.9.4,gunicorn19.4.5,gevent1.1.1

---

#### system install  

ubuntn14.04,nohup 

nginx1.9.3 

	sudo apt-get install nginx

python3.4.3 
	
	sudo apt-get install python3

---

#### pip install

Django(1.9.4)

	pip install django

gunicorn(19.4.5)

	pip install gunicorn

gevent(1.1.1)[通过协程并发提高wsgi服务的效率]

	pip install gevent

---

### gunicorn 配置

gunicorn是一个朋友(CloverStd)推荐的，一个开源Python WSGI UNIX的HTTP服务器，Github仓库地址在这，传说速度快（配置快、运行快）、简单，默认是同步工作，支持Gevent、Eventlet异步，支持Tornado，官方有很详细的文档可以参阅。

---

#### Django 运行方式

当我们安装好 gunicorn 之后，需要用 启动Django自带的WSGI server
 
	gunicron-w 4 -b 0.0.0.0:8000 -k gevent sample.wsgi:application

此时，我们需要用 8000 的端口进行访问，原先的5000并没有启用。其中 gunicorn 的部署中，

-w 表示开启多少个 worker
-b 表示 gunicorn 开发的访问地址以及端口。
-k 使用同步阻塞的网络模型,默认(-k sync)，对于大并发的访问可能表现不够好,所以这里使用了gevent。

---

#### 其他运行方式

	gunicorn code:application

其中code就是指code.py，application就是那个wsgifunc的名字。

这样运行的话， gunicorn 默认作为一个监听 127.0.0.1:8000 的web server，可以在本机通过： http://127.0.0.1:8000 访问。

如果要通过网络访问，则需要绑定不同的地址（也可以同时设置监听端口）：

	gunicorn -b 10.2.20.66:8080 code:application

在多核服务器上，为了支持更多的并发访问并充分利用资源，可以使用更多的 gunicorn 进程：

	gunicorn -w 8 code:application

这样就可以启动8个进程同时处理HTTP请求，提高系统的使用效率及性能。

---

#### 同步阻塞的网络模型

gunicorn 默认使用同步阻塞的网络模型(-k sync)，对于大并发的访问可能表现不够好， 它还支持其它更好的模式，比如：gevent或meinheld。

**gevent**

gunicorn -k gevent code:application

**meinheld**

gunicorn -k egg:meinheld#gunicorn_worker code:application

当然，要使用这两个东西需要另外安装，具体请参考各自的文档。

---

#### gunicorn配置文件

设置还可以通过 -c 参数传入一个配置文件实现。

gunicorn 的配置文件

	[root@66 tmp]# cat gun.conf
	import os
	bind = '127.0.0.1:5000'
	workers = 4
	backlog = 2048
	worker_class = "sync"
	debug = True
	proc_name = 'gunicorn.proc'
	pidfile = '/tmp/gunicorn.pid'
	logfile = '/var/log/gunicorn/debug.log'
	loglevel = 'debug'

想要结束 gunicorn 只需执行 pkill gunicorn，有时候还的 ps 找到 pid 进程号才能 kill。可是这对于一个开发来说，太过于繁琐，因此出现了另外一个神器---supervisor，一个专门用来管理进程的工具，还可以管理系统的工具进程。

>注，由于目前supervisor版本暂时无法兼容python3,但是很快supervisor4将支持python3。

---

### nohup

nohup是一个Linux命令，用来不挂断地运行某条命令。这里我们用它来执行gunicorn，来保持gunicorn进程不会被挂断。

	nohup gunicorn -w 4 -b 127.0.0.1:8000 -k gevent sample.wsgi:application&

>注意：在尾部加上&(and)字符表示后台运行

执行这条命令后可以用ps命令查看进程，就能看到gunicorn了

---

### nginx

nginx 不用多说，一个高性能的web服务器。通常用来在前端做反向代理服务器。所谓正向与反向（reverse），只是英文说法翻译。代理服务，简而言之，一个请求经过代理服务器从局域网发出，然后到达互联网上服务器，这个过程的代理为正向代理。如果一个请求，从互联网过来，先进入代理服务器，再由代理服务器转发给局域网的目标服务器，这个时候，代理服务器为反向代理（相对正向而言）。

正向代理：{ 客户端 —》 代理服务器 } —》 服务器

反向代理：客户端 —》 { 代理服务器 —》 服务器 }

{} 表示局域网

nginx既可以做正向，也可以做反向。

---

#### nginx 反向代理配置

nginx的配置文件放在 `/etc/nginx` 下面

首先给默认的Nginx配置备个份（建议建立良好习惯）。目录位于`/etc/nginx/sites-available/default`

	cp /etc/nginx/sites-available/default default.bak

或者将default文件从/etc/nginx/sites-available中转移别处进行backup

使用vim编辑default

	vim /etc/nginx/sites-available/default

配置文件default内容

	server {
	        listen   80;
	
	        server_name www.example.com;

	        access_log  /var/log/nginx/access.log;
			error_log /var/log/nginx/error.log;
	
	        location / {
					# 反向代理地址
	                proxy_pass http://127.0.0.1:8000;
					# 设置主机头和客户端真实地址，以便服务器获得客户端真实IP
	                proxy_set_header Host $host;
	                proxy_set_header X-Real-IP $remote_addr;
	                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	        }
	
			# 解析静态文件
	        location /static {
	                root /path/to/static; #Django项目所在目录的static文件夹
	        }

			# 解析多媒体文件
			location /media {
	                root /path/to/media; #Django项目所在目录的media文件夹
	        }
	}

以上是最简单的Nginx配置，目的是为能跑起来就行，更多其他详细配置还请参照其他文章。

---

#### nginx 负载均衡配置

负载均衡是大流量网站要做的工作，通过根据服务器使用负载把请求分发到不同的服务器上功能，以降低服务器负载和提高服务器工作效率的一种解决方案。

所以个人blog之类的小流量网站，并非必须，可以忽略。

使用vim编辑default

	vim /etc/nginx/sites-available/default

配置文件default内容：

	server {
	        listen   80;
	
	        server_name backend; # 注意这一行的改变

	        access_log  /var/log/nginx/access.log;
			error_log /var/log/nginx/error.log;
	
	        location / {
					# 反向代理地址
	                proxy_pass http://127.0.0.1:8000;
					# 设置主机头和客户端真实地址，以便服务器获得客户端真实IP
	                proxy_set_header Host $host;
	                proxy_set_header X-Real-IP $remote_addr;
	                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	        }
	
			# 解析静态文件
	        location /static {
	                root /path/to/static; #Django项目所在目录的static文件夹
	        }

			# 解析多媒体文件
			location /media {
	                root /path/to/media; #Django项目所在目录的media文件夹
	        }
	}

使用vim编辑nginx.conf

	vim /etc/nginx/nginx.conf

nginx.con 添加

	http {
		...
		...
		upstream backend {
			server 192.168.1.1:8000 weight=1;
			server 192.168.1.2:8080 weight=1;
			server 192.168.1.3:8040;
		}
	}


**upstream 支持的负载均衡算法**

Nginx的负载均衡模块目前支持4种调度算法，下面进行分别介绍，其中后两项属于第三方调度算法。  

轮询（默认）:每个请求按时间顺序逐一分配到不同的后端服务器，如果后端某台服务器宕机，故障系统被自动剔除，使用户访问不受影响。Weight 指定轮询权值，Weight值越大，分配到的访问机率越高，主要用于后端每个服务器性能不均的情况下。

ip_hash:每个请求按访问IP的hash结果分配，这样来自同一个IP的访客固定访问一个后端服务器，有效解决了动态网页存在的session共享问题。

fair:这是比上面两个更加智能的负载均衡算法。此种算法可以依据页面大小和加载时间长短智能地进行负载均衡，也就是根据后端服务器的响应时间来分配请求，响应时间短的优先分配。Nginx本身是不支持fair的，如果需要使用这种调度算法，必须下载Nginx的upstream_fair模块。

url_hash:此方法按访问url的hash结果来分配请求，使每个url定向到同一个后端服务器，可以进一步提高后端缓存服务器的效率。Nginx本身是不支持url_hash的，如果需要使用这种调度算法，必须安装Nginx 的hash软件包。

**upstream 支持的状态参数**

在HTTP Upstream模块中，可以通过server指令指定后端服务器的IP地址和端口，同时还可以设定每个后端服务器在负载均衡调度中的状态。常用的状态有：      

down:表示当前的server暂时不参与负载均衡。

backup:预留的备份机器。当其他所有的非backup机器出现故障或者忙的时候，才会请求backup机器，因此这台机器的压力最轻。

max_fails:允许请求失败的次数，默认为1。当超过最大次数时，返回proxy_next_upstream 模块定义的错误。

fail_timeout:在经历了max_fails次失败后，暂停服务的时间。max_fails可以和fail_timeout一起使用。

>注，当负载调度算法为ip_hash时，后端服务器在负载均衡调度中的状态不能是weight和backup。

---

#### nginx 服务器控制

检查服务器配置文件语法

	sudo service nginx configtest

开启服务

	sudo service nginx start

重启服务

	sudo service nginx restart

关闭服务
	
	sudo service nginx stop