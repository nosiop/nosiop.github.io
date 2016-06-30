---
layout: post
title:  "Git Issue .gitignore"
date:  2016-04-17
categories: git
comments: true
excerpt:
---

* content
{:toc}

### 问题描述

---

当我们用git时常常会习惯把我们不想上传到远程代码库中的一些本地文件（夹）放在一个叫做.gitignore的文件中，例如常见的本地build文件夹，一些IDE如Intellig,Eclipse的项目管理文件。

但有些时候我们会遇到这样的问题：放入gitignore文件夹中的文件却还是被git index, 当你通过`git status`

显示文件状态时，他们并没有被忽略。

### 问题场景

---

当你在git库中编写某些代码文件，并已经`stage`该文件之后，你发现某个文件你不想用了，想在以后的改变中忽略它。然后你再你的.gitignore文件中加入该文件名，结果它并没有被忽略。  

当你从远程代码库中`git clone`

一份代码中本地并做些修改，build，然后通过git add .**等stage了这些改变

当你通过`git status`

查看状态时发现不小心把build/文件夹给add进来了。

于是你在.gitignore文件中加入了build/，但发现并不起作用。

### 根本原因

---

**.gitignore文件只是ignore没有被staged(cached)文件，对于已经被staged文件，加入ignore文件时一定要先从staged移除。

.gitignore文件不工作

### 解决方案

---

因此，要想用gitignore忽略文件，必须先把它们从staged中移除：

commit你已有的改变，保存当前的工作。

	git rm --cached file/path/to/be/ignored。
	git add .
	git commit -m "fixed untracked files"
	