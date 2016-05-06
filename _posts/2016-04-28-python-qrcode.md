---
layout: post
title:  "Python使用QRCode模块生成二维码"
date:  2016-04-28 
categories: python django
comments: true
excerpt:
---

* content
{:toc}

### 简介

python-qrcode是个用来生成二维码图片的第三方模块，依赖于 Image 或 pillow（PIL) 模块和 qrcode 库。

---

### 安装依赖

用Python来生成二维码很简单，可以看 qrcode 这个模块：

	pip install qrcode

qrcode 依赖 Image 这个模块：

	pip install Image

或者安装依赖 pillow(PIL)模块：

	pip install pillow

安装后就可以使用了，这个程序带了一个 qr 命令：

	qr 'http://www.test.com' > test.png

---

### 使用方法

简单用法

	import qrcode
	img = qrcode.make('hello, qrcode')
	img.save('test.png')

高级用法

	import qrcode
	qr = qrcode.QRCode(
	    version=1,
	    error_correction=qrcode.constants.ERROR_CORRECT_L,
	    box_size=10,
	    border=4,
	)
	qr.add_data('hello, qrcode')
	qr.make(fit=True)
	img = qr.make_image()
	img.save('test.png')

---

### 参数含义

version：值为1~40的整数，控制二维码的大小（最小值是1，是个21×21的矩阵）。 如果想让程序自动确定，将值设置为 None 并使用 fit 参数即可。

error_correction：控制二维码的错误纠正功能。可取值下列4个常量。  

	ERROR_CORRECT_L：大约7%或更少的错误能被纠正。  
	ERROR_CORRECT_M（默认）：大约15%或更少的错误能被纠正。  
	EROR_CORRECT_Q：大约25%或更少的错误能被纠正。  
	EROR_CORRECT_H：大约30%或更少的错误能被纠正。  

box_size：控制二维码中每个小格子包含的像素数。

border：控制边框（二维码与图片边界的距离）包含的格子数（默认为4，是相关标准规定的最小值）

---

### Django 中使用

我们可以用 Django 直接把生成的内容返回到网页，以下是操作过程：

1.新建一个 testqrcode 项目，tools 应用：

    django-admin.py startproject testqrcode
    python manage.py startapp tools

2.将 tools 应用 添加到 项目 settings.py 中

	INSTALLED_APPS = (
	    ...
	    'tools',
)


3.我们修改 tools/views.py

	from django.http import HttpResponse
	import qrcode
	from cStringIO import StringIO
    
	def generate_qrcode(request, data):
	    img = qrcode.make(data)
     
	    buf = StringIO()
	    img.save(buf)
	    image_stream = buf.getvalue()
	 
	    response = HttpResponse(image_stream, content_type="image/png")
	    response['Last-Modified'] = 'Mon, 27 Apr 2015 02:05:03 GMT'
	    response['Cache-Control'] = 'max-age=31536000'
	    return response

上面对返回结果进行了处理，浏览器会缓存图片，提高再次加载的速度。Cache-Control 和 Last-Modified 不懂的可以看一下 HTTP协议 相关知识。

4.添加视图函数到 testqrcode/urls.py

    url(r'^qrcode/(.+)$', 'tools.views.generate_qrcode', name='qrcode'),

5.同步数据库，打开开发服务器：

	python manage.py makemigrations
	python manage.py migrate
	python manage.py runserver
