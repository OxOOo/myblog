---
title: 使用科协VPN9实现免流量上网
p: vpn9
date: 2017-09-27 19:26:39
tags: 
    - vpn
    - vpn9
---

### 科协VPN9是什么？ 

邈叔：“VPN9只是给大家提供一个免流量上网的方式，不提供其他服务。你们这样乱说，将来报道上出了偏差，你们可是要负责的！”

众人：+1s

![无限流量](/vpn9/images/infinite.png)

### 先决条件 

要使用VPN9，你需要满足以下条件：

* 有一个[A9](https://accounts.net9.org/)账号
* 该A9账号需要是某科协或者算协组的成员（就是说需要加入科协或者算协）
* 一台可以运行OpenVPN的设备（电脑，手机，部分路由器均可）

### Windows下搭建VPN9 

1. 首先，你需要下载安装OpenVPN

    你可以选择从[官网](http://openvpn.ustc.edu.cn/)下载，或者直接从<a href="/vpn9/files/openvpn-install-2.3.10-I601-x86_64.exe" target="_blank">此处</a>下载。

    下载好之后，直接安装即可，需要特别注意安装的路径（在我的Windows10电脑上安装路径是C:\Program Files\OpenVPN）。

1. 然后，你需要下载VPN9的配置文件

    进入[https://vpn.net9.org/](https://vpn.net9.org/)下载，或者直接从<a href="/vpn9/files/vpn9.ovpn" target="_blank">此处</a>下载。

    然后，将配置文件拷贝到之前安装OpenVPN目录下的config子目录下：

    ![配置文件](/vpn9/images/config.png)

1. 最后，打开OpenVPN，输入用户名和密码

    从桌面上打开OpenVPN

    ![OpenVPN桌面图标](/vpn9/images/openvpn-icon.png)

    打开之后，你会在屏幕右下角的系统托盘处看到OpenVPN的图标

    ![OpenVPN系统托盘](/vpn9/images/openvpn-system.png)

    右击该图标，点击Connect

    ![OpenVPN链接](/vpn9/images/openvpn-connect.png)

    然后会弹出一个窗口，输入[A9](https://accounts.net9.org/)用户名和密码就可以了

    注意：此处输入的是[A9](https://accounts.net9.org/)的账号，并不是登录info的账号

    ![OpenVPN密码](/vpn9/images/openvpn-password.png)

    链接成功之后，左下角会弹出提示，OpenVPN的托盘图标颜色也会改变

    ![OpenVPN链接成功](/vpn9/images/openvpn-success.png)

    打开浏览器，进入[http://net.tsinghua.edu.cn](http://net.tsinghua.edu.cn)，可以看到确实不限流量了

    ![不限流量](/vpn9/images/success.png)

### Ubuntu下搭建VPN9 

1. 下载OpenVPN

    在终端里执行：

    ```bash
    > sudo apt-get install openvpn
    ```

    下载安装OpenVPN

1. 下载配置文件

    进入[https://vpn.net9.org/](https://vpn.net9.org/)下载，或者直接从<a href="files/vpn9.ovpn" target="_blank">此处</a>下载。

1. 运行OpenVPN

    在终端里执行（注意，需要把/path/to/vpn9.ovpn改成你的配置文件的路径，由于需要root权限，这里的sudo不能少）：

    ```bash
    > sudo openvpn --config /path/to/vpn9.ovpn
    ```

    运行，然后输入用户名和密码，就可以使用了。

    ```bash
    Sun Aug 21 13:00:43 2016 OpenVPN 2.3.10 x86_64-pc-linux-gnu [SSL (OpenSSL)] [LZO] [EPOLL] [PKCS11] [MH] [IPv6] built on Feb  2 2016
    Sun Aug 21 13:00:43 2016 library versions: OpenSSL 1.0.2g-fips  1 Mar 2016, LZO 2.08
    Enter Auth Username: ******
    Enter Auth Password: ***********
    ...
    ```

1. 进阶

    之前的方案已经可以正常的在Ubuntu下使用VPN9了。

    如果你觉得每次都要输入用户名和密码非常麻烦的话，那么可以继续看看以下的教程。

    为了方便和安全，我们把vpn9.ovpn拷贝到/etc/openvpn/目录下。

    为了不用每次都输入用户名和密码，你需要准备一个文本文件，比如/etc/openvpn/auth.txt，在文件的第一行写上A9账号的用户名，第二行写上A9账号的密码。

    然后，打开/etc/openvpn/vpn9.ovpn，将auth-user-pass一行修改为：

    ```
    auth-user-pass /etc/openvpn/auth.txt
    ```

    在终端里，直接执行openvpn的启动命令就可以了：

    ```bash
    > sudo openvpn --config /etc/openvpn/vpn9.ovpn
    ```

    需要注意的是，由于这种方法是直接将用户名和密码存入文件中，所以最好修改下文件的访问权限，防止泄露密码。

### Mac下搭建VPN9 

**以下内容由 马晓健 提供**

1. 下载OS X下的开源OpenVPN客户端TunnelBlick

    进入[https://tunnelblick.net/](https://tunnelblick.net/)下载，或者直接从<a href="https://tunnelblick.net/release/Tunnelblick_3.6.5_build_4566.dmg" target="_blank">此处</a>下载。
    
1. 下载配置文件

    进入[https://vpn.net9.org/](https://vpn.net9.org/)下载，或者直接从<a href="files/vpn9.ovpn" target="_blank">此处</a>下载。
    
1. 导入配置文件，需要输入当前OS X用户的用户名，密码

    ![导入配置文件](/vpn9/images/osx1.png)
    ![输入用户名密码](/vpn9/images/osx1_1.png)
    ![导入配置文件后](/vpn9/images/osx2.png)
    
1. 初次启动 OpenVPN，注意勾选保存用户名，密码

    ![启动连接](/vpn9/images/osx3.png)
    
1. 正常启动 OpenVPN 连接

    ![正常启动连接](/vpn9/images/osx4.png)
