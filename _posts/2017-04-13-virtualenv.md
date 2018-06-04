---
layout: post
title:  "mac上安装virtualenvwrapper"
date:  2017-04-15
categories: python mac
comments: true
excerpt:
---

* content
{:toc}

virtualenv的好处凡是使用过的都说好，但是其中还是有一些不便，virtualenvwrapper对它提供了简易的命令行封装。

mac上安装virtualenvwrapper有一些小小的麻烦，经过查阅资料，现记录如下。

安装virtualenv和virtualenvwrapper：

	sudo pip install virtualenv
	sudo pip install virtualenvwrapper

查找virtualenvwrapper.sh

	which virtualenvwrapper.sh

我的机器上的位置是：`/Library/Frameworks/Python.framework/Versions/3.5/bin/virtualenvwrapper.sh`

修改.bash_profile

打开/Users/用户名/.bash_profile ，在最后加入：

	export WORKON_HOME=$HOME/.virtualenvs
	export VIRTUALENVWRAPPER_SCRIPT=/Library/Frameworks/Python.framework/Versions/3.5/bin/virtualenvwrapper.sh
	export VIRTUALENVWRAPPER_PYTHON=/Library/Frameworks/Python.framework/Versions/3.5/bin/python3
	export VIRTUALENVWRAPPER_VIRTUALENV=/Library/Frameworks/Python.framework/Versions/3.5/bin/virtualenv
	export VIRTUALENVWRAPPER_VIRTUALENV_ARGS='--no-site-packages'
	source /Library/Frameworks/Python.framework/Versions/3.5/bin/virtualenvwrapper.sh

或者

	export WORKON_HOME=$HOME/.virtualenvs
	export VIRTUALENVWRAPPER_PYTHON=/usr/local/bin/python3.5
	source /usr/local/bin/virtualenvwrapper.sh

中间的4行和你本机的python版本和路径要保持一致，此处注意如果不加上面中间4行，则会出现下面的错误：

	/usr/bin/python: No module named virtualenvwrapper

至此大功告成，可以方便的使用virtualenvwrapper了。
