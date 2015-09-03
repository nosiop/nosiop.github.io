---
layout: post
title:  "MacOS安装Tomcat"
date:  2015-09-03 
categories: web 
comments: true
excerpt:
---

* content
{:toc}


###1.兼容性检查。
在终端里运行：

	java -version  
	#得到的结果是：
	java version "1.8.0_60"
	Java(TM) SE Runtime Environment (build 1.8.0_60-b27)
	Java HotSpot(TM) 64-Bit Server VM (build 25.60-b23, mixed mode) 

那么这是 Java 8，看看 Tomcat 官网对 Java 版本的要求（http://tomcat.apache.org/whichversion.html），应该使用 Tomcat 8.0.x。

---

###2.下载并安装 Tomcat。

访问 Tomcat 官网地址：(http://tomcat.apache.org/download-70.cgi)，下载 tar.gz 文件  
解压到 `/Library/Tomcat/Home` 目录下（自己创建），在终端里输入：

	export CATALINA_HOME=/Library/Tomcat/Home  
	#回车之后不会有反馈，接着在终端继续输入：
	env  

能看到环境变量已经生效。

---

###3.启动 Tomcat。

在终端输入：

	/Library/Tomcat/Home/bin/startup.sh  

	#结果：
	Using CATALINA_BASE:   /Library/Tomcat/Home  
	Using CATALINA_HOME:   /Library/Tomcat/Home  
	Using CATALINA_TMPDIR: /Library/Tomcat/Home/temp  
	Using JRE_HOME:        /Library/Java/Home  
	Using CLASSPATH:       /Library/Tomcat/Home/bin/bootstrap.jar:/Library/Tomcat/Home/bin/tomcat-juli.jar  
	Tomcat started.  

看上去服务器应该起来了，打开网页看看：http://localhost:8080/

另外：
Tomcat 的默认端口是 8080，在 `/Library/Tomcat/Home/conf/server.xml` 中可以配置。  
Tomcat 的站点目录在 `/Library/Tomcat/Home/webapps/`  

这个命令可以关闭 Tomcat 服务器：

	/Library/Tomcat/Home/bin/shutdown.sh  
