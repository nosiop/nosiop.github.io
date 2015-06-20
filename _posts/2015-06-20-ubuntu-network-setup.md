---
layout: post
title:  "Ubuntu Network Setup"
date:   2015-06-20 
categories: ubuntu
excerpt: 
---

* content
{:toc}

### 一、配置大概分三类：
* 通过配置文件配置
* 通过命令配置
* 通过图形化的网络连接菜单配置
  
####主要文件： 
`/etc/network/interfaces` -- 这里是ip，网关，掩码等配置  
`/etc/resolv.conf` -- 这个文件保存DNS的有关信息  

####主要命令：
`sudo /etc/init.d/networking restart` -- 重启网络，使配置文件的配置失效  
`sudo route add default gw <IP地址>` -- 设置网关  

---

### 二、配置方法

####通过命令配置
如果你只是想暂时性的修改IP地址，可以选择这种方法。重启网络后会丢失。 

1. `sudo ifconfig eth0 <IP地址> netmask <子网掩码> up` (eth0是网卡。最后的up表示开启网卡，可以不加)。
2. `sudo route add default gw <网关IP>` (设置网关)
3. `sudo /bin/hostname <主机名>` (但是系统启动时,会从/etc/hostname来读取主机的名称)。
4. 设置DNS，这个必须去配置文件修改。

---

####通过配置文件配置

1）配置IP网关：sudo vim /etc/network/interfaces 里面添加

dhcp的：
<pre>
auto lo
iface lo inet loopback

auto eth0
iface eth0 inet dhcp
</pre>

静态IP的：
<pre>
auto lo
iface lo inet loopback
#上面的是回环
#网卡eth0的配置
auto eth0
#staic 静态IP
iface eth0 inet static
address 192.168.1.5
netmask 255.255.255.0
gateway 192.168.1.1
#network 192.168.3.0  
#broadcast 192.168.3.255 
#后面两条是网络号和广播号，这个可以由其它信息计算，因此无需设置
</pre>
这里还可以配置第二IP（虚拟IP）
<pre>
auto eth0:1
iface eth0:1 inet static
address 192.168.1.60
netmask 255.255.255.0
#network x.x.x.x
#broadcast x.x.x.x
gateway x.x.x.x 
</pre>
2）配置DNS： sudo vim /etc/resolv.conf
<pre>
nameserver 202.107.117.11
</pre>
3）主机名：sudo vim /etc/hostname 里面输入主机名。默认有个主机名，因此这个不是必须的。

4）重启网络：sudo /etc/init.d/networking restart
也可以重启网卡：
<pre>
sudo ifconfig eth0 down 
sudo ifconfig eth0 up
</pre>
重启网卡对别的网卡无影响，更推荐一些。

---

####通过图形化的网络连接菜单配置

这个在系统-首选项里，也叫做network manager，通过右上角面板里的网络管理小程序可以启用它的配置。   
这个有点问题：它和第二种方法共用配置文件，所以会导致种种冲突，使用时要注意。   
不如，这两种方法都做了配置，sudo /etc/init.d/networking restart启用的是第二种方法的配置，而点击桌面面板上的网络管理小程序中的auto eth0启用的是第三种的配置。
