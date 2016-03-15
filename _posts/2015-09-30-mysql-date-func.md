---
layout: post
title:  "Mysql日期处理"
date:  2015-09-30 
categories: mysql
comments: true
excerpt:
---

* content
{:toc}


假如有个表product有个字段add_time,它的数据类型为datetime,有人可能会这样写sql：

	select * from product where add_time = '2013-01-12'

对于这种语句，如果你存储的格式是YY-mm-dd是这样的，那么OK，如果你存储的格式是：2013-01-12 23:23:56这种格式你就悲剧了，这是你就可以使用DATE()函数用来返回日期的部分，所以这条sql应该如下处理：

	select * from product where Date(add_time) = '2013-01-12'

再来一个，如果你要查询2013年1月份加入的产品呢？

	select * from product where date(add_time) between '2013-01-01' and '2013-01-31'
	你还可以这样写：
	select * from product where Year(add_time) = 2013 and Month(add_time) = 1

这些你该知道mysql日期函数在对你处理日期比较问题的作用了吧？
其date_col的值是在最后30天以内：

	mysql> SELECT something FROM table 
	WHERE TO_DAYS(NOW()) - TO_DAYS(date_col) <= 30;
	DAYOFWEEK(date) 

返回日期date的星期索引(1=星期天，2=星期一, ……7=星期六)。这些索引值对应于ODBC标准。

	mysql> select DAYOFWEEK('1998-02-03'); 
	-> 3
	WEEKDAY(date) 

返回date的星期索引(0=星期一，1=星期二, ……6= 星期天)。

	mysql> select WEEKDAY('1997-10-04 22:23:00'); 
	-> 5 
	mysql> select WEEKDAY('1997-11-05'); 
	-> 2
	DAYOFMONTH(date) 

返回date的月份中日期，在1到31范围内。

	mysql> select DAYOFMONTH('1998-02-03'); 
	-> 3
	DAYOFYEAR(date) 

返回date在一年中的日数, 在1到366范围内。

	mysql> select DAYOFYEAR('1998-02-03'); 
	-> 34
	MONTH(date) 

返回date的月份，范围1到12。

	mysql> select MONTH('1998-02-03'); 
	-> 2
	DAYNAME(date) 

返回date的星期名字。

	mysql> select DAYNAME("1998-02-05"); 
	-> 'Thursday'
	MONTHNAME(date) 

返回date的月份名字。

	mysql> select MONTHNAME("1998-02-05"); 
	-> 'February'
	QUARTER(date) 

返回date一年中的季度，范围1到4。

	mysql> select QUARTER('98-04-01'); 
	-> 2