---
layout: post
title:  "Ubuntu network setup"
date:   2015-06-20 
categories: ubuntu
comments: true
excerpt: 
---

* content
{:toc}

### 一、配置大概分三类：
* 通过配置文件配置
* 通过命令配置
* 通过图形化的网络连接菜单配置


#### 主要文件： 
/etc/network/interfaces，这里是IP、网关、掩码等的一些配置； 
/etc/resolv.conf这个文件保存DNS的有关信息
/etc/network/interfaces，这里是ip，网关，掩码等的一些配置。
/etc/resolv.conf这个文件保存DNS的有关信息。

#### 主要命令：
sudo /etc/init.d/networking restart重启网络，使配置文件的配置失效；
sudo route add default gw <IP地址>,设置网关。

---

### 二、配置方法

#### 1.通过命令配置

如果你只是想暂时性的修改IP地址，可以选择这种方法。重启网络后会丢失。
* sudo ifconfig eth0 <IP地址> netmask <子网掩码> up
	eth0是网卡。最后的up表示开启网卡，可以不加。
* sudo route add default gw <网关IP>
	设置网关
* 设置DNS，这个必须去配置文件修改，同第二种
* 配置主机名称
	命令：sudo /bin/hostname <主机名>
	但是系统启动时,会从/etc/hostname来读取主机的名称。

#### 2.通过配置文件配置

1）配置IP网关：sudo gedit /etc/network/interfaces 里面添加

dhcp的：

	auto lo
	iface lo inet loopback

	auto eth0
	iface eth0 inet dhcp

静态IP的：

	auto lo
	iface lo inet loopback
	# 上面的是回环
	# 网卡eth0的配置
	auto eth0
	# staic 静态IP
	iface eth0 inet static
	address 192.168.1.5
	netmask 255.255.255.0
	gateway 192.168.1.1
	# network 192.168.3.0  
	# broadcast 192.168.3.255 
	# 后面两条是网络号和广播号，这个可以由其它信息计算，因此无需设置

这里还可以配置第二IP（虚拟IP）

	auto eth0:1
	iface eth0:1 inet static
	address 192.168.1.60
	netmask 255.255.255.0
	# network x.x.x.x
	# broadcast x.x.x.x
	gateway x.x.x.x 

2）配置DNS： sudo gedit /etc/resolv.conf

	nameserver 202.107.117.11

3）主机名：sudo gedit /etc/hostname 里面输入主机名。默认有个主机名，因此这个不是必须的。

4）重启网络：sudo /etc/init.d/networking restart
也可以重启网卡：

	sudo ifconfig eth0 down 
	sudo ifconfig eth0 up

重启网卡对别的网卡无影响，更推荐一些。


#### 3.通过图形化的网络连接菜单配置

这个在系统-首选项里，也叫做network manager，通过右上角面板里的网络管理小程序可以启用它的配置。

这个有点问题：它和第二种方法共用配置文件，所以会导致种种冲突，使用时要注意。

不如，这两种方法都做了配置，sudo /etc/init.d/networking restart启用的是第二种方法的配置，而点击桌面面板上的网络管理小程序中的auto eth0启用的是第三种的配置。

### 三、问题冲突与解决方法

#### 1.Desktop版本中配置文件与Network-Manager冲突问题
在Desktop版本中，除了可以修改/etc/network/interfaces来进行配置以外；还可以直接在network-manager中配置。  

首先，当系统内没有第三方网络管理工具（比如NM）时，系统默认使用interfaces文件内的参数进行网络配置。（就像Server版本一样）
接着，当系统内安装了 NM之后，NM默认接管了系统的网络配置，使用NM 自己的网络配置参数来进行配置。

但是，如果用户在安装NM之后（Desktop版本默认安装了NM），自己手动修改了interfaces 文件，那NM 就自动停止对系统网络的管理，系统改使用interfaces 文件内的参数进行网络配置。
此时，再去修改NM 内的参数，不影响系统实际的网络配置。若要让NM 内的配置生效，必须重新启用NM 接管系统的网络配置。
现在知道了两者之间的工作关系，再看上面的三个问题：  

1. 要看NM是否接管，如果没有接管，系统实际的IP设置以interfaces 中的为准。反之，以NM 中的为准。
2. 当NM 停止接管的时候，网络连接图标就丢失了。
3. 同样是接管的问题。

如果用户希望在Desktop版本中，直接使用interfaces 进行网络配置，那最好删除network-manager。  
如果在出现上述问题之后，希望能继续使用NM 来进行网络配置，则需要进行如下操作：  

	sudo service network-manager stop #停止 NM服务  
	sudo rm /var/lib/NetworkManager/NetworkManager.state #移除NM 的状态文件  
	sudo gedit /etc/NetworkManager/NetworkManager.conf #打开NM 的配置文件  
	# 里面有一行：managed=true  
	# 如果你手工改过/etc/network/interfaces，NM会自己把这行改成：managed=false  
	# 将false 修改成true  
	sudo servicenetwork-manager start  
