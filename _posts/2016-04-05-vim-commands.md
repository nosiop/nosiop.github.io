---
layout: post
title:  "Vim基本命令"
date:  2016-04-05 
categories: linux vim
comments: true
excerpt:
---

* content
{:toc}


从八十年代起，vi和vim在程序员中十分流行.5年前，我写了《程序员必须知道的100个vim命令》，这是重写更新版本，希望你喜欢!

### 基础
	:e filename     在编辑器中打开一个文件
	:w              保存文件
	:q              退出vim
	:q!             退出但不保存
	:x              写文件(如果有做修改)并退出
	:sav filename   保存为
	.               在正常模式中重复执行上一个变更
	5.              重复五次

### 移动
	k or Up Arrow   上移一行
	j or Down Arrow 下移一行
	e               移动到单词末尾
	b               移动到单词开头
	0               移动到行首
	G               移动到文件末尾
	gg              移动到文件开头
	L               移动到屏幕底
	:59             移动到59行
	20|             移动到第20列
	%               移动到匹配的括号
	[[              到函数头
	[{              到块开始位置

### 剪切，复制和粘贴
	y   拷贝选中部分到剪贴板
	p   粘贴剪贴板中内容
	dd  剪切当前行
	yy  拷贝当前行
	y$  拷贝到行尾
	D   剪切到行尾

### 搜索
	/word           从开头到结尾搜索单词word
	?word           从结尾到卡头
	*               搜索光标下单词
	/\cstring       搜索string或STRING, 大小写不敏感
	/jo[ha]n        搜索john 或 joan
	/\< the         搜索以the开头的，the, theatre 或 then
	/the\>          搜索以the结尾的，the 或 breathe
	/\< the\>       搜索the
	/\< ¦.\>        搜索所有含有四个字母的
	/\/             搜索fred 但不是alfred 或 frederick
	/fred\|joe      搜索fred 或 joe
	/\<\d\d\d\d\>   搜索仅有四个数字的
	/^\n\{3}        搜索连续3个空行的
	:bufdo /searchstr/  在所有打开buf中搜索
	bufdo %s/something/somethingelse/g  在所有打开buf中搜索并替换

### 替换
	:%s/old/new/g           将所有出现的old替换为new
	:%s/onward/forward/gi   将所有onward替换为forward，大小写不敏感
	:%s/old/new/gc          替换前确认
	:2,35s/old/new/g        将第2行到第35行之间的old替换为new
	:5,$s/old/new/g         将第5行到文件结尾的old替换为new
	:%s/^/hello/g           在每一行开头加入hello
	:%s/$/Harry/g           在每一行结尾加入Harry
	:%s/ *$//g              删除每行末尾无用空格
	:g/string/d             删除所有包含string的行
	:v/string/d             删除所有不包含string的行
	:s/Bill/Steve/          替换当前行第一个Bill为Steve
	:s/Bill/Steve/g         替换当前行中所有Bill
	:%s/Bill/Steve/g        替换文件中所有Bill
	:%s/^M//g               删掉DOS保存文件中(^M)
	:%s/\r/\r/g             Transform DOS carriage returns in returns
	:%s#<[^>]\+>##g         删除html标签但是保留文本
	:%s/^\(.*\)\n\1$/\1/    删除所有连续出现过两次的行，保留一行
	Ctrl+a                  递增光标下的数字
	Ctrl+x                  递减光标下的数字
	ggVGg?                  文本转换为 Rot13

### 大小写
	Vu                  整行小写
	VU                  整行大写
	g~~                 整行大小写反转
	vEU                 单词转为大写
	vE~                 单词大小写反转
	ggguG               所有文本小写
	gggUG               所有文本大写
	:set ignorecase     搜索中忽略大小写
	:set smartcase      搜索中忽略大小写，除非搜索词中存在大小写字母
	:%s/\<./\u&/g       将所有单词首字母大写
	:%s/\<./\l&/g       将所有单词首字母小写
	:%s/.*/\u&          将每行第一个字母大写
	:%s/.*/\l&          将每行第一个字母小写

### 读写文件
	:1,10 w outfile     1到10行内容写到outfile
	:1,10 w >> outfile  1到10行内容追加到outfile
	:r infile           插入文件内容
	:23r infile         插入文件23行的内容

### 文件浏览器
	:e .                打开完整文件浏览器
	:Sex                切分窗口，打开文件浏览器
	:Sex!               同上，垂直切分
	:browse e           图像化文件浏览器
	:ls                 列出buffers
	:cd ..              移到上一层目录
	:args               列出文件
	:args *.php         打开文件列表
	:grep expression *.php  返回包含expression的php文件列表
	gf                  打开光标下文件名对应的文件

### 和Unix交互
	:!pwd               执行pwd命令，返回结果
	!!pwd               执行命令并插入结果到文件中
	:sh                 临时返回unix
	$exit               从unix中返回vim
	对齐
	:%!fmt              所有行对齐
	!}fmt               当前位置所有行对齐
	5!!fmt              后五行对齐
	Tabs和Windows
	:tabnew             创建一个新的tab
	gt                  展示下一个tab
	:tabfirst           展示第一个tab
	:tablast            展示最后一个tag
	:tabm n(position)   重排tab
	:tabdo %s/foo/bar/g 在所有tab中执行一个命令
	:tab ball           将所有打开文件放入tab中
	:new abc.txt        在新window中编辑abc.txt

### 窗口分屏
	:e filename         在当前窗口中编辑文件
	:split filename     切分当前窗口并打开文件(缩写 :sp filename)
	ctrl-w up arrow     移到上一个文件
	ctrl-w ctrl-w       移到下一个窗口
	ctrl-w_             当前窗口垂直最大化
	ctrl-w|             当前窗口水平最大化
	ctrl-w=             所有窗口等大小
	10 ctrl-w+          当前窗口增加10行
	:vsplit file        竖直切分窗口
	:sview file         同:split, 只读模式
	:hide               关闭当前窗口
	:­nly               关闭出了当前窗口之外的所有窗口
	:b 2                打开2号窗口

### 自动补全
	Ctrl+n Ctrl+p (插入模式)  补全单词
	Ctrl+x Ctrl+l           补全行
	:set dictionary=dict    定义dict为dictionnary
	Ctrl+x Ctrl+k           用字典中内容补全

### 标签
	m {a-z}                 在当前位置做标签{a-z}
	' {a-z}                 移动到标签位置
	''                      移动到上一个位置

### 缩写
	:ab mail mail@provider.org      定义mail 作为 mail@provider.org的缩写
	文本缩进
	:set autoindent         打开自动缩进
	:set smartindent        打开自动智能缩进
	:set shiftwidth=4       缩进设为4个空格
	ctrl-t, ctrl-d          插入模式中缩进/去缩进
	>>                      缩进
	<<                      去缩进
	=%                      缩进括号中的代码
	1GVG=                   缩进整个文件

### 语法高亮
	:syntax on              打开语法高亮
	:syntax off             关闭语法高亮
	:set syntax=perl        强制语法高亮

---

同时感谢 WKLKEN  
版权声明：自由转载-非商用-非衍生-保持署名 | [Creative Commons BY-NC-ND 3.0](http://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh)
