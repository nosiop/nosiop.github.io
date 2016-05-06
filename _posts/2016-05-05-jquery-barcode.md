---
layout: post
title:  "Jquery barcode"
date:  2016-05-05
categories: web jquery
comments: true
excerpt:
---

* content
{:toc}

### JQuery plugin : barcode

Version : 2.0.3

Licence : GPL / Cecill

Date : 2013-01-06

Author: DEMONTE Jean-Baptiste, HOUREZ Jonathan

[Download barcode jQuery plugin 2.0.3](http://barcode-coder.com/download/jquery-barcode-2.0.3.zip)

### Barcode JQuery plugin installation

Like any plugin, just inclure the source file after including that of JQuery.

	<script type="text/javascript" src="jquery-1.3.2.min.js"></script>
	<script type="text/javascript" src="jquery-barcode.js"></script>

	<script type="text/javascript" src="jquery-1.3.2.min.js"></script>
	<script type="text/javascript" src="jquery-barcode.min.js"></script>

### Using barcode JQuery plugin

To use this plugin, symply define a container th host the visuel barcode

	<div id="bcTarget"></div>
	<div id="test"></div>

Using example of the plugin

	$("#bcTarget").barcode("1234567890128", "ean13");
	$("#test").barcode("1234567890128", "code39");

### Prototype of the barcode function

	barcode: function(datas, type, settings)
	eg:
	$("#bcTarget").barcode("1234567890128", "ean13",{barWidth:2, barHeight:30})

datas

string

Value barcode (dependent on the type of barcode)
If barcode type include it, the presence of the checksum is not mandatory, it ise automatically recalculated

object

type : ean8, ean13, code11, code39, code128, codabar

	member      Type
	code	    string

type : std25, int25, code93

	member	    Type
	code	    string
	crc         boolean

type : msi

	member	    Type
	code	    string
                boolean
	crc             crc1 : string("mod10", "mod11")
                object
                    crc2 : string("mod10", "mod11")

type : datamatrix

	member	    Type
	code	    string
	rect	    boolean (default : false)

type (string)

	codabar
	code11 (code 11)
	code39 (code 39)
	code93 (code 93)
	code128 (code 128)
	ean8 (ean 8)
	ean13 (ean 13)
	std25 (standard 2 of 5 - industrial 2 of 5)
	int25 (interleaved 2 of 5)
	msi
	datamatrix (ASCII + extended)

settings (object)
visual configuration of the barcode

	Parameter   Type    Default value       Detail                  Limitation
	barWidth    int         1           width of a bar                  1D
	barHeight   int         50          container heighu                1D
	moduleSize  int         5           largeur / hauteur d`un module   2D
	showHRI     bool        true        display text
                                        (HRI : Human readable Interpretation)
	bgColor     text        #FFFFFF     background color
	color       text        #000000     barcode color
	fontSize    int         10          font size of the HRI
	output      texu        css         output type : css, svg, bmp, canvas
    
	renderer : canvas
    
	Parameter   Type    Default value   Detail
	posX        int         0           X origine
	posY        int         0           Y origine


### Example

	<input type="button" onclick='$("#bcTarget").barcode("1234567890128", "ean13",{barWidth:2, barHeight:30});' value="ean13">
	<input type="button" onclick='$("#bcTarget").barcode("1234567890128", "ean13",{barWidth:2, barHeight:30});' value="ean13">

content:1234567890128  
type:ean13



	<input type="button" onclick='$("#bcTarget2").barcode("1234567", "int25",{barWidth:2, barHeight:30});' value="int25">
	<input type="button" onclick='$("#bcTarget2").barcode("1234567", "int25",{barWidth:2, barHeight:30});' value="int25">

content:12345670  
type:int25



	<input type="button" onclick='$("#bcTarget3").barcode({code: "1234567", crc:false}, "int25",{barWidth:2, barHeight:30});' value="int25 without crc">
	<input type="button" onclick='$("#bcTarget3").barcode({code: "1234567", crc:false}, "int25",{barWidth:2, barHeight:30});' value="int25 without crc">  

content:1234567  
type:int25 without crc
