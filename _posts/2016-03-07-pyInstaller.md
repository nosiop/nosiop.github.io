---
layout: post
title:  "pyInstaller"
date:   2016-03-07 
categories: python
comments: true
excerpt: 
---

* content
{:toc}

## Python用PyInstaller打包笔记

---

为了把python发行到没有安装python的Windows环境使用，需要打包成exe可执行文件。现在常见的python打包工具有`cx_Freeze,PyInstaller,py2exe`  
本文介绍PyInstaller打包的使用。

## 准备工作

---


### 安装PyWin32

到<http://sourceforge.net/projects/pywin32/>下载 `PyWin32` 并且安装

或者

使用pip进行安装：

	pip install pywin32 

### 安装PyInstaller

到<http://www.pyinstaller.org/>下载PyInstaller并解压缩。

或者

使用pip进行安装：

	pip install pyinstaller 

### 下载upx（可选）

到<http://upx.sourceforge.net/>下载upx，解压后把upx放在PyInstaller目录下，upx的作用是给生成的exe加壳，减小体积。

## 使用方法

---

cmd切换到PyInstaller文件夹，执行命令，如：

	pyinstaller myscript.py

当然也可以添加输出选项，获得更好的exe可执行文件，如：

	python pyinstaller.py --upx-dir -F xxx.py

-F用于制作独立的可执行程序，--upx-dir用于压缩文件。

**注意：**

>网上教程常见的-X选项启用upx已经失效  
如果upx.exe已经复制到PyInstaller文件夹下，会默认使用upx，如果不在文件夹下，可以使用--upx-dir选项，如--upx-dir=upx_dir，如--upx-dir=/usr/local/share/  
如果upx.exe复制到了PyInstaller文件夹下，如果不想使用upx，需要添加参数 --noupx  

## 常用参数介绍

---


`-F` 用于制作独立的可执行程序  
`-w` 表示去掉控制台窗口，这在GUI界面时非常有用。不过如果是命令行程序的话那就把这个选项删除吧！  
`-p` 表示你自己自定义需要加载的类路径，一般情况下用不到  
`-i` 表示可执行文件的图标  
`-D`　制作出的档案存放在同一个文件夹下（默认值）  
`-K`　包含TCL/TK（对于使用了TK的，最好加上这个选项，否则在未安装TK的电脑上无法运行）  
`-c`　制作命令行程序（默认）  
`-v [指定文件]` 指定程序版本信息  
`-n [指定程序名]` 指定程序名称  
`-o DIR` 指定输出SPEC文件路径（这也决定了最后输出的exe文件路径）   
`--noconsole` 适用于Windows和Mac OS X，用于创建不显示控制台窗口的程序   
`--icon=[ICO文件路径]` 指定程序图标   
`--upx-dir` 使用upx加壳从而压缩exe文件  

**注意：-X选项启用upx已经失效**   
`-X`　制作使用UPX压缩过的可执行程序（推荐使用这个选项，需要下载UPX包，解压后upx.exe放在Python(非PyInstaller)安装目录下，下载upx308w.zip）
## 其他

PyInstaller可以用于多个平台的打包，包括 Windows (32-bit and 64-bit),Linux (32-bit and 64-bit),Mac OS X (32-bit and 64-bit),experimentally Solaris and AIX。

PyInstaller也可以自定义ico文件等，完整使用手册参见:<http://pythonhosted.org/PyInstaller/>

如果发现报错：pywintypes.error: (193, ‘LoadLibraryEx’… ) 原因是添加图标后缀必须是xxx.ico才行，重新去网上下载一个ico格式的图片，再次运行就好了。
