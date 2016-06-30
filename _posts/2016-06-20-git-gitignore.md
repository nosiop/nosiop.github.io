---
layout: post
title:  "Git的.gitignore 配置"
date:  2016-06-20
categories: git
comments: true
excerpt:
---

* content
{:toc}

.gitignore 配置文件用于配置不需要加入版本管理的文件，配置好该文件可以为我们的版本管理带来很大的便利，以下是个人对于配置 .gitignore 的一些心得。

---

### 配置语法：

　　以斜杠“/”开头表示目录；

　　以星号“*”通配多个字符；

　　以问号“?”通配单个字符

　　以方括号“[]”包含单个字符的匹配列表；

　　以叹号“!”表示不忽略(跟踪)匹配到的文件或目录；

>此外，git 对于 .ignore 配置文件是按行从上到下进行规则匹配的，意味着如果前面的规则匹配的范围更大，则后面的规则将不会生效；

---

### 实际用例：

	# 此为注释 – 将被 Git 忽略
	*.a       # 忽略所有 .a 结尾的文件
	!lib.a    # 但 lib.a 除外
	/TODO     # 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
	build/    # 忽略 build/ 目录下的所有文件，不包括build 目录
	doc/*.txt # 会忽略 doc/a.txt 但不包括 doc/dir/b.txt


	fd1/*   # 忽略目录 fd1 下的全部内容；注意，不管是根目录下的 /fd1/ 目录，还是某个子目录 /child/fd1/ 目录，都会被忽略；
	/fd1/*  # 忽略根目录下的 /fd1/ 目录的全部内容；

	/*  
	!.gitignore  
	!/fw/bin/  
	!/fw/sf/  
	# 忽略全部内容，但是不忽略 .gitignore 文件、根目录下的 /fw/bin/ 和 /fw/sf/ 目录；

	# 忽略*.o和*.a文件
	*.[oa]
	# 忽略*.b和*.B文件，my.b除外
	*.[bB]
	!my.b
	# 忽略dbg文件和dbg目录
	dbg
	# 只忽略dbg目录，不忽略dbg文件
	dbg/
	# 只忽略dbg文件，不忽略dbg目录
	dbg
	!dbg/
	# 只忽略当前目录下的dbg文件和目录，子目录的dbg不在忽略范围内
	/dbg