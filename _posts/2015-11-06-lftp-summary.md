---
layout: post
title:  "lftp命令总结"
date:  2015-11-06 
categories: linux
comments: true
excerpt:
---

* content
{:toc}

### lftp命令
lftp是一个功能强大的下载工具，它支持访问文件的协议：ftp，sftp, ftps, http, hftp, fish.（其中ftps和https需要在编译的时候包含openss库）。lftp的界面和shell很像：有命令补全功能，历史记录，允许多个后台 任务执行等功能，使用起来比较疯便。而且它还具有书签，排队，镜像，断点续传，多进程下载等功能。



### 登录ftp代码:

用法`lftp 用户名:密码@ftp地址:端口（默认21）`

	lftp username:password@127.0.0.1:21         # 直接登陆-21为默认端口可以不写
	lftp username@127.0.0.1                     # 默认21端口回车后输入密码
	lftp 127.0.0.1                              # 回车后login登录
	
	lftp						                # 输入lftp之后直接回车 
	lftp:~> open 127.0.0.1                      # 输入ftp的ip地址
	lftp 127.0.0.1:~>login username password    # 登录

---

### 常用命令

#### 查找FTP端文件
	ls *.txt                     # 查找当前目录下的所有txt文件
	ls ./123/                    # 列出123目录下所有文件
	find . -name"*.txt"          # 递归查找站点上所有的txt文件
	find ./xx-name"*.txt"        # 查找xx目录下所有的txt文件

>注意：  
1: ls第二次读取的是本地缓存,可以用 rels 代替 ls 或者catch off / catch on 来开关catch,catch flush清空本地catch  
2: 浏览本地目录的命令可用!ls, 如 !ls /usr/local/bin/  

#### 下载文件

	lcd /home/user/test       # 设置本地存放目录默认为/home/user/test/
	get sample.txt            # 下载sample.txt文件到/home/user/test/中
	get -c sample.txt         # 断点续传下载
	mget *.txt                # 批量下载所有txt文件
	mget -c *.txt             # 断点续传
	mget -c ./dir/*.txt       # 断点续传、批量下载ftp端dir目录下的所有txt文件

	pget -c -n 10 file.dat
	# 以最多10个线程以允许断点续传的方式下载file.dat
	# 可以通过设置 set pget:default-n 5 的值而使用默认值。
	
	mirror dir/ /local/dir
	# 将dir目录整个的下载下来，子目录也会自动复制，本地自动建立目录

>注意：  
下载文件之前要先设置好本地的目录，用来存放下载的文件

#### 上传文件
cd /ftp/path/      # 设置上传文件的位置
put sample.txt       # 上传sample.txt到FTP端的/ftp/path/目录下
mput *.txt           # 批量上传所有txt文件
mirror -R dir/       # 将dir目录整个的上传到FTP端，子目录也会自动复制，远端自动建立目录

#### 设置被动/非被动模式
	set ftp:passive-mode 1 # 1 被动 0非主动

####　多任务处理
	ctrl+z 　　　　　　　　　#　将当前进行的任务移交后台处理
	wait   　　　　　　　　　#　将后台处理任务调至前台查看
	jobs   　　　　　　　　　#　查看后台进行的任务列表
	kill all 或者 job_no   #　删除所有任务 或 指定的任务
	
	# 将任务加入任务列表
	queue get 1.txt
	queue put 2.txt
	queue mirror dir/ 
	
	queue  # 查看任务列表
	jobs   # 查看后台任务列表
	
	queue start # 开始任务列表
	queue stop  # 停止任务列表

>注意：  
上传文件之前要先设置好FTP端上传的目录，保证文件上传到对的位置

#### 目录操作

`mirror [OPTS] [remote [local]]`  
下载整个目录(楼上的 get 只能用来抓档案)  
-c 续传  
-e 这个要小心一些, 比较远端和本地端的档案, 假如远端没有的, 就将本地端的档案删除, 也就是将本地端和远端资料同步  
-R 上传整个目录  
-n 只下载较新的档案  
-r 不用递迴到目录中  
--parallel=n 同时下载 n 个档案(预设一次只下载一个)  

`!`  
可执行本地端 shell 中的命令, 如 !ls /usr/local/bin/  
由於 lftp 並没有 lls(显示本地端档案列表的指令), 故可用 !ls 来替代。

`lcd`  
切换本地端的目录

`mv`  
将远端的 file1 改名为 file2

`mrm`  
用 wildcard expansion 方式来删除远端档案

`rm -r -f`  
移除远端档案

`mkdir -p`  
建立远端目录

`rmdir -f`  
移除远端目录

---

### lftp中文乱码问题

解决办法有两种：

1、临时解决  
用lftp登录到ftp服务器上，设置远程服务器编码为gbk，而设置本地编码为utf-8，输入下面两个命令：
	
	set ftp:charset gbk
	set file:charset utf8

2、永久解决  
在目录`$HOME/.lftprc`编辑文件（如果没有则建立）,输入下面两行，设置远程编码为gbk，本地编码为utf-8：

	set ftp:charset gbk
	set file:charset utf8

这种方法会导致访问utf8编码的服务器时出现中文乱码，不过就目前国内环境来说机会比较少。如果出现乱码时则临时输入下面两行就可以了：

	set ftp:charset utf8
	set file:charset utf8
