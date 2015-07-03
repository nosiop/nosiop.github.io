---
layout: post
title:  "Shell的test判断"
date:  2015-07-01 
categories: linux shell
comments: true
excerpt:
---

* content
{:toc}

<br />

`test 表达式`等同于`[ 表达式 ]`  
eg： `if test $var == "yes"` 等同于  `if [ $var == "yes" ]`

###1.判断表达式

---

`if test (表达式为真)`--表达式为真时返回真  
`if test !表达式为假`--表达式为假时返回真  
`test 表达式1 –a 表达式2`--与[AND]两个表达式都为真时返回真  
`test 表达式1 –o 表达式2`--或[OR]两个表达式有一个为真时返回真  
`test !表达式`--非[NOT]逻辑表达式为反时为真

---

###2.判断字符串

---

`test –n 字符串`--字符串的长度非零，字符串为非空  
`test –z 字符串`--字符串的长度为零，字符串为空  
`test 字符串1＝字符串2`--两个字符串相等  
`test 字符串1！＝字符串2`--两个字符串不等  

---

###3.判断整数  

---

`test 整数1 –eq 整数2`--整数相等  
`test 整数1 –ge 整数2`--整数1大于等于整数2  
`test 整数1 –gt 整数2`--整数1大于整数2  
`test 整数1 –le 整数2`--整数1小于等于整数2  
`test 整数1 –lt 整数2`--整数1小于整数2  
`test 整数1 –ne 整数2`--整数1不等于整数2  

---

###4.判断文件  

---

`test –d File`--文件存在并且是目录  
`test –e File`--文件存在  
`test –f File`--文件存在并且是普通文件  
`test –s File`--文件存在并且文件长度非0  

`test –r File`--文件存在并且可读  
`test –w File`--文件存在并且可写  
`test –x File`--文件存在并且可执行  

`test File1 –ef File2`--两个文件具有同样的设备号和i结点号  
`test File1 –nt File2`--文件1比文件2 新  
`test File1 –ot File2`--文件1比文件2 旧  

`test –b File`--文件存在并且是块设备文件  
`test –c File`--文件存在并且是字符设备文件  
`test –g File`--文件存在并且是设置了组ID  
`test –G File`--文件存在并且属于有效组ID  
`test –h File`--文件存在并且是一个符号链接（同-L）  
`test –k File`--文件存在并且设置了sticky位  
`test –b File`--文件存在并且是块设备文件  
`test –L File`--文件存在并且是一个符号链接（同-h）  
`test –o File`--文件存在并且属于有效用户ID  
`test –p File`--文件存在并且是一个命名管道  
`test –t FD`--文件描述符是在一个终端打开的  
`test –u File`--文件存在并且设置了它的set-user-id位  


---

###5.变量替换（赋值）

---

shell提供了变量替换功能，使用户能够检查变量的值并根据选项改变它的值。  
`$variable`　　　　　　保存在variable中的值  
`${variable}`　　　　　保存在variable中的值  
`${variable:-string}`　　如果variable的值非空，则值为variable，否则值为string  
`${variable:+string}`　　如果variable的值非空，则值为string，否则值为空  
`${variable:=string}`　　如果variable的值非空，则值为variable，否则值为string且variable的值设置为string  
`${variable:?string}`　　如果variable的值非空，则值为variable，否则显示string并退出  

---

###6.命令行参数/位置变量

---

$0　　　　　　　脚本的名字  
$1, $2, ..., $9　　脚本第1个到第9个命令行参数  
$#　　　　　　　命令行参数的个数  
$@或是$*　　　　所有命令行参数  
$?　　　　　　　最后一条命令的退出状态  
$$　　　　　　　正在执行进程的ID（PID）  

---

###7.其他

当在对变量进行判断时最好将变量用双引号括起来，这样可以避免参数包含空格或是TAB带来的问题。

如：”$HOME“、"$#"

在 shell 脚本中进行的每一种操作（除最简单的命令编组之外）都需要检查条件。所有的 shell 脚本“逻辑” — 广义意义下的“逻辑” — 通常都可以分为以下三大类：

<pre>
if {condition exists} then ...  
while {condition exists} do ...  
until {condition exists} do ...  
</pre>

无论随后的操作是什么，这些基于逻辑的命令都依靠判断一种条件是否真实存在来决定后续的操作。test 命令是使得在每一种情况下都能够确定要判断的条件是否存在的实用工具。因此，彻底了解这个命令对于撰写成功的 shell 脚本至关重要。  

test 命令最短的定义可能是评估一个表达式；如果条件为真，则返回一个 0 值。如果表达式不为真，则返回一个大于 0 的值 — 也可以将其称为假值。检查最后所执行命令的状态的最简便方法是使用 $? 值。  

test 命令期望在命令行中找到一个参数，当 shell 没有为变量赋值时，则将该变量视为空。这意味着在处理脚本时，一旦脚本寻找的参数不存在，则 test 将报告该错误。  

当试图保护脚本时，您可以通过将所有参数包含在双引号中来解决这个问题。然后 shell 将变量展开，如果变量没有值，那么将传递一个空值给 test。另一种方法是在脚本内增加一个额外检查过程来判断是否设置了命令行参数。如果没有设置命令行参数，那么脚本会告诉用户缺少参数，然后退出。  

