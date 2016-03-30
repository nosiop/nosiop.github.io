---
layout: post
title:  "grep,egrep和fgrep区别"
date:  2015-07-05 
categories: linux shell
comments: true
excerpt:
---

* content
{:toc}


### 基本用法

1.grep （global search regular expression(RE) and print out the line，全面搜索正则表达式并把行打印出来）是一种强大的文本搜索工具，它能使用正则表达式搜索文本，并把匹配的行打印出

2.grep的工作方式：它在一个或多个文件中搜索字符串模板。如果模板包括空格，则必须被引用（双引号或者单引号），模板后的所有字符串被看作文件名。搜索的结果被送到屏幕，不影响原文件内容

3.linux是使用GNU版本的grep，它的功能更强，可以通过-G（默认参数）、-E、-F命令行选项来使用egrep和fgrep的功能  

> grep  -E  <=>  egrep  
grep  -F  <=>  fgrep  

#### grep:
传统的 grep 程序, 在没有参数的情况下, 只输出符合 RE 字符串之句子. 常见参数如下:  
-v: 逆反模示, 只输出"不含" RE 字符串之句子.  
-r: 递归模式, 可同时处理所有层级子目录里的文件.  
-q: 静默模式, 不输出任何结果(stderr 除外. 常用以获取 return value, 符合为 true, 否则为 false .)  
-i: 忽略大小写.  
-w: 整词比对, 类似 <word> .  
-n: 同时输出行号.  
-c: 只输出符合比对的行数.  
-l: 只输出符合比对的文件名称.  
-o: 只输出符合 RE 的字符串. (gnu 新版独有, 不见得所有版本都支持.)  
-E: 切换为 egrep .  

关于grep的更多信息可以参考：<http://nosiop.github.io/2015/06/find-and-grep/>

---

#### egrep:
egrep 为 grep 的扩充版本, 改良了许多传统 grep 不能或不便的操作. 比方说:  
grep 之下不支持 ? 与 + 这两种 modifier, 但 egrep 则可.  
grep 不支持 a|b 或 (abc|xyz) 这类"或一"比对, 但 egrep 则可.  
grep 在处理 {n,m} 时, 需用 { 与 } 处理, 但 egrep 则不需.  
诸如此类的... 我个人会建议能用 egrep 就不用 grep 啦... ^_^  

---

#### fgrep:
fgrep是fixed grep或fast grep，不作RE（正则表达式）处理, 表达式仅作一般字符串处理, 所有 meta（元字符）均失去功能。正则表达式中的元字符表示回其自身的字面意义，不再特殊  

---

### 元字符集

#### grep正则表达式元字符集（基本集）

	^
	匹配行首，例如：’^grep’匹配所有以grep开头的行
	$
	匹配行尾，例如：’grep$’匹配所有以grep结尾的行
	.
	匹配一个非换行符的字符，例如：’gr.p’匹配gr后接一个任意字符，然后是p
	*
	匹配零个或多个先前字符，例如：’*grep’匹配所有一个或多个空格后紧跟grep的行；.*一起用代表任意字符
	[ ]
	匹配一个指定范围内的字符，例如：’[Gg]rep’匹配Grep和grep
	[^ ]
	匹配一个不在指定范围内的字符，例如：’[^A-FH-Z]rep’匹配不包含A-F和H-Z的一个字母开头，紧跟rep的行
	\(..\)
	标记匹配字符，例如：’\(love\)’，love被标记为1
	\<
	匹配单词的开始，例如：’\
	\>
	匹配单词的结束，例如：’grep\>‘匹配包含以grep结尾的单词的行
	x\{m\}
	重复字符x，m次，例如：’o\{5\}’匹配包含5个o的行
	x\{m,\}
	重复字符x,至少m次，例如：’o\{5,\}’匹配至少有5个o的行
	x\{m,n\}
	重复字符x，至少m次，不多于n次，例如：’o\{5,10\}’匹配5–10个o的行
	\w
	匹配文字和数字字符，也就是[A-Za-z0-9]，例如：’G\w*p’匹配以G后跟零个或多个文字或数字字符，然后是p
	\W
	匹配一个或多个非单词字符，例如：点号句号等
	\b
	单词边界符，例如：’\bgrepb\’，只匹配grep
	\B
	单词非边界符，例如：’\Bok’，不能匹配grep单词，而能匹配book

---

#### 用于egrep和 grep -E的元字符扩展集

	+    
	匹配一个或多个先前的字符，例如：’[a-z]+able’，则匹配一个或多个小写字母后跟able的串：loveable，enable，disable等
	?
	匹配零个或多个先前的字符，例如：’gr?p’，则匹配gr后跟一个或没有字符，然后是p的行
	a|b|c
	匹配a或b或c，例如：（grep）|（sed），则匹配grep或sed
	()
	分组符号，如：love(able|rs)ov+，则匹配loveableov或loversov
	x{m},x{m,},x{m,n} ó  x\{m\},x\{m,\},x\{m,n\}
