---
layout: post
title:  "Git知识总结"
date:  2015-06-24 
categories: git
comments: true
excerpt:
---

* content
{:toc}

<br/>  

##创建版本库：

###1.版本库又名仓库repository  
其实就是一个可以被git管理的目录  

	$ mkdir foo 选择一个合适的地方建一个文件夹  
	$ cd foo 进入这个文件夹  
	$ git init 通过git init命令把当前目录建立成为git仓库  

建好之后这个目录下回多一个.git目录，这个目录就是git用来跟踪管理版本库的  
其实也可以使用非控文件夹做git仓库  

---

###2.把文件添加进仓库
在foo目录下新建一个readme.txt  

	$ git add readme.txt	把文件添加到仓库  
	$ git commit -m "..."	把文件提交到仓库，并添加说明  

可以多次add再统一commit  
	
-------------------------------------------------------------------------------

##时光穿梭：  

###1.版本回退：  
使用`git statue`命令能实时掌握当前git仓库的状态  

	$ git statue  

如果你想看看文件被改动了哪些内容，就需要使用`git diff`命令  

	$ git diff  

这里的`git diff`其实是比较的已经add的和未add的文件之间的差别  
git会给我们的工作保存快照，这个快照就是commit，所以我们可以随时回到过去  
使用`git log`命令来查看历史记录  

	$ git log  

使用`--pretty=oneline`参数可以减少log的输出，使他的每个记录只输出一行  

	$ git log --pretty=oneline  

使用`-23`参数可以可以只显示最近的23项COMMIT的记录而不是所有

	$ git log -23

每条记录都会有一个`commit id`，这条id就表示了这条记录  
git用`HEAD`表示当前版本，`HEAD^`表示上一个版本，以此类推`HEAD^^...HEAD~100`  
然后就可以使用如下命令回到过去了  

	$ git reset --hard HEAD^  
	$ git reset --hard <commit id> #这里commit id只打前几位能区分开来就好  

使用了`git reset`命令，`HEAD`就指向指定的版本，再使用`git log`命令将只能获得当前`HEAD`版本之前的版本      
所以我们要使用下面的命令，git记录了我们的每次操作  

	$ git reflog  

使用这个命令找到比当前版本新的版本的`commit id`就可以`reset`回去了  
总之：`log`命令可以查看提交历史，`reflog`可以查看命令历史  
      
---
    
###2.工作区和暂存区：          
工作区(work directory)就是我们在电脑里能看到的目录，比复foo文件夹  
版本库(repository)工作区有一个隐藏目录`.git`，它不属于工作区，而是git的版本库  
git的版本库里存在了很多东西，其中最重要的就是：  
称为stage(或者叫index)的暂存区  
git为我们创建的第一个分支master  
指向master的指针HEAD  
`git add`就是把文件添加到暂存区  
`git commit`就是把暂存区文件提交到当前分支  

因为只有默认创建的master分支，所以commit就是往master分支提交  
因为每次commit的都是暂存区的内容，所以没有被add的内容不会被commit  
使用如下命令可以比较工作区文件和暂存区文件的异同  

	$ git diff -- file  

---

###3.撤销修改：  
使用如下命令可以撤销工作区的修改  

	$ git checkout -- file  

这条命令实际上是把工作区的文件恢复到暂存区的状态  
即使工作区的状态恢复到上次add，或commit时候的状态  
  
使用下面的命令可以撤销add到暂存区的操作  

	$ git reset HEAD file  

这条命令是在提交到暂存区之后又后悔了，使用它使文件恢复到版本库的状态  
即使工作区的状态恢复到上次commit时候的状态  

如果你要rollback的commit还没有push到远程仓库的话：  

	$ git reset --hard <要rollback到的commit>  

如果已经push的话，可以先执行上面的命令，再强制推送你当前的版本到远程仓库：  

	$ git push <remote> HEAD --force  

执行此命令的时候要小心，确保你的本地仓库是最新的并且没有其他人也在此时做push，否则可能会丢失数据。

---

###4.删除文件：  
通常在工作区中删除文件，直接rm即可  
这时在查看git状态时会提示你工作区中哪些文件被删除了  
这时，使用如下命令删除版本库中的对应文件  

	$ git rm foo.txt  
	$ git commit  

同样可以使用如下命令，找回该文件  

	$ git checkout -- foo  
  
-------------------------------------------------------------------------------  
  
##远程仓库：  

git的远程仓库，除了可以自己搭建之外，还可以使用github，本机git和github通信  
是通过ssh协议加密的，所以需要如下设置(可选)：  

1.创建ssh key，如果用户主目录下有`.ssh`文件夹，且其内有`id_rsa`和`id_rsa.pub`  
两个文件可以跳过第一步了，如果没有打开shell，创建ssh key：  

	$ ssh-keygen -t rsa -C "your_email@example.com"  

2.一切顺利就能创建成功，私钥是id_rsa，公钥是`id_rsa.pub`，登录github，进入  
Account setting，ssh key页面，然后`add ssh key`，填上任意title，在key文本里  
粘贴`id_rsa.pub`内容，点击啊add key即可完成。  

---

###1.添加远程仓库：  
添加远程仓库先在github创建repository，然后可以克隆到本地或关联本地仓库  
在git中远程仓库默认叫做`origin`  

####关联本地仓库：  
回到本地的仓库，运行一下命令  

	$ git remote add origin git @github.com:somebody/foo.git  

把本地仓库内容推送到远程仓库  

	$ git push -u origin master  

这条命令实际上是吧当前分支`master`推送到远程  
因为远程库是空的，所以这次推送加上`-u`选项，git不但把`本地master分支`推送到`远程的master分支`，还把两者关联起来，以后的推送拉去就能简化命令以后的推送都可以使用下面的命令来实现  

	$ git push origin master  

---

####关于远程仓库本地设置:git remote

显示所有的远程仓库

	$ git remote -v
	origin git@search.ued.taobao.net:projects/search.git (fetch)
	origin git@search.ued.taobao.net:projects/search.git (push)
	github git@github.com:yyfrankyy/search.git (fetch)
	github git@github.com:yyfrankyy/search.git (push)


重命名远程仓库

	$ git remote rename github gh
	$ git remote
	origin
	gh

删除远程仓库

	$ git remote rm github
	$ git remote
	origin

从远程仓库抓取数据，更新本地仓库：

	$ git fetch origin
	remote: Counting objects: 58, done.
	remote: Compressing objects: 100% (41/41), done.
	remote: Total 44 (delta 24), reused 1 (delta 0)
	Unpacking objects: 100% (44/44), done.
	From git://search.ued.taobao.net:projects/search.git
	 * [new branch]      product     -> origin/product

查看远程仓库信息，可用于跟踪别人的push：

	$ git remote show origin
	* remote origin
	  Fetch URL: git@search.ued.taobao.net:projects/search.git
	  Push  URL: git@search.ued.taobao.net:projects/search.git
	  HEAD branch: master
	  Remote branches:
	    master  tracked
	    p4popt  tracked
	    prepub  tracked
	    product tracked
	  Local branches configured for 'git pull':
	    master  merges with remote master
	    p4popt  merges with remote p4popt
	    prepub  merges with remote prepub
	    product merges with remote product
	  Local refs configured for 'git push':
	    master  pushes to master  (up to date)
	    p4popt  pushes to p4popt  (up to date)
	    prepub  pushes to prepub  (up to date)
	    product pushes to product (up to date)

---

###2.从远程库中克隆：  

要是从头开发的话，可以先在github创建repository，然后在克隆到本地  
使用如下命令来克隆到本地  

	$ git clone git@github.com:somebody/foo.git  

其实git给出的地址不止一个，还可以使用https://github.com/somebody/foo.git  
其实git是支持多种协议的，默认的git://使用ssh，但也可以使用https等其他协议  
      
-------------------------------------------------------------------------------  

##分支管理：  

git无论是创建，切换和删除分支，都只需要不到1秒，无论一个文件还是一万个文件  
    
---

###1.创建与合并分支：  
一开始master分支是一条线，git用master指向最新的提交，再用HEAD指向master，就能确定当前分支，以及当前分支的提交点，每次提交master都会向前移动一小步，当我们创建新的分支dev时，git就创建一个新的指针，指向与master相同的指针，再把HEAD指向dev，从现在开始，对工作区的修改和提交就是针对dev分支了，在dev上的工作完成后，就可以把dev合并到master上，其实就是把master指针指向dev当前的提交，这时就可以把dev分支删除了，由此可见，git的分支操作很快  
          
使用如下命令创建并切换到dev分支，`-b`就表示创建并切换  

	$ git checkout -b dev  

这条命令相当于下面两条  

	$ git branch dev  
	$ git checkout dev  

然后使用`git branch`查看当前分支，这条命令会列出所有分支，当前分支标有*号  

	$ git branch  

在dev上的工作和master相同，这时如果想切换会master，使用如下命令  

	$ git checkout master  

现在把dev分支上的内容合并到master，使用如下命令  

	$ git merge dev  

注意这个命令用于将指定分支合并到当前分支  
合并时候就可以删除dev分支了，使用如下命令  

	$ git branch -d dev  

git鼓励我们用分支来完成任务，这样不会托慢速度而且更安全  

---

###2.解决冲突：  
分支合并也不总是一帆风顺的，有时候master分支和dev分支都在进行开发，两个分支都进行新的commit，而且提交了相同的文件，但是内容不同，这时就不能快速合并需要手动修改冲突文件，使用`git statue`可以查看冲突文件，修改后在提交就好了  
使用如下命令能查看分支合并图  

	$ git log --graph  
	$ git log --graph --pretty=oneline --abbrev-commit  

---

###3.分支管理策略：  
通常合并分支时，如果可能，git会使用`Fast forward`模式，但是这种模式下删除分支后，会丢失分支信息，如果强制使用`Fast forward`模式，git会在merge时生成一个commit来保存信息  
          
策略：
  
1. 实际开发中，master分支应该是非常稳定的，仅仅用来发布新版本，平时不能再上面干活  
2. 干活都在dev分支上，dev分支是不稳定的，仅当发布新版本时候把dev分支合并到master分支上，然后在master分支上发布1.0版本什么的  
3. 每个小伙伴都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就好了  

git分支十分强大，在团队开发中应该充分利用在合并分支时候，加上`--no-ff`参数就可以使用普通模式合并，合并后的历史有分支，能看出曾进做过的合并，而Fast forward合并就看不出曾进做过的合并  
  
--no-ff合并：  
普通模式合并，`no-ff`表示禁用Fast forward  
使用如下命令进行`no-ff`合并，因为合并生成一个commit，所以加-m参数加说明  

	$ git merge --no-ff -m "merge with no-ff"  
      
---

###4.bug分支：  
git分支管理非常强大，每个bug都可以使用临时分支来解决，合并后就可以删除了  
一个很常见的bug修复流程:  
首先使用`git stash`将当前工作区储藏起来，以备日后恢复工作  

	$ git stash  

这时又是干净的工作区了，若要在master上修复bug，就在master上建bug分支  

	$ git checkout master #切换到master分支  
	$ git checkout -b issue-101 #创建并切换到bug分支issue-101  

修复bug完成后，切换到master分支，并完成合并，然后删除bug分支  

	$ git checkout mater #切换到master分支  
	$ git merge --no-ff issue-101 -m "merge bug fix 101" #合并分支  
	$ git branch -d issue-101 #删粗bug修复分支  

切换会dev分支  

	$ git checkout dev  

要恢复stash起来的工作区，首先使用下面的命令查看stash list  

	$ git stash list  

1.要恢复工作区，方法一  

	$ git stash apply stash@{0} #恢复stash@{0}存储的工作区  
	$ git stash drop stash@{0} #删除stash{0}  

2.要恢复工作区，方法二  

	$ git stash pop #恢复工作区，并删除stash      
      
---

###5.feature分支：  
开发时，有时候希望添加一些新功能，但我们不希望实验性的代码把主分支弄坏  
可以创建feature分支，在上面开发，完成后再合并，删粗  
首先新建一个feature分支  

	$ git checkout -b feature-newfun #新建并切换到feature分支  

开发完成后回到dev分支，准备合并  

	$ git checkout dev  

1. 如果一切顺利就可以合并并删除feature分支了  

	$ git merge --no-ff feature-newfun -m "add new fun"  
	$ git branch -d feature-newfun  

2. 如果这时情况有变，要取消新功能，我们就需要销毁feature分支  

	$ git branch -d feature-newfun   

这时会销毁失败，需要强制销毁  

	$ git branch -D feature-newfun  

至此删除feature分支完成  

---

###6.多人协作：  
当我们从远程仓库中克隆的时候，git把本地master分支和远程的master分支关联了，并且远程仓库的默认名称是origin  
要查看远程仓库，使用如下命令  

	$ git remote  

或者使用`-v`选项显示更详细的信息  

	$ git remote -v  

上面会显示可以抓取和推送的git地址，如果没有推送权限将看不到push地址  

---

####1)推送分支：  
推送分支时候，要指定本地分支，这样把该分支推送到远程仓库对应的分支上  

	$ git push orgin master  

如果要退送其他分支，比如dev分支  

	$ git push orgin dev  

但是，并不一定要把本地分支都推送到远程分支上，master是主分支，因此要时时刻刻与远程分支同步  
dev是开发分支，团队成员都要在上面工作，因此也要时刻与远程分支同步  
bug分支只用在本地修复bug，没必要推送，除非老板要看你每周修复几个bug  
feature分支是否推送，取决于你是否和小伙伴合作在上面开发  
总之，分支是否往远程推送，取决于自己，完全可以在本地自己藏着玩  
通常要合作在上面开发的分支都要推送到远程仓库  

---

####2)抓取分支：  
使用下面的命令从远程库抓取，或者克隆本地库  

	$ git clone repository  

从远程库中克隆下来的只有master分支，现在要在dev分支上开发，就要在本地创建远程organ的dev分支  

	$ git branch -b dev orgin/dev  

这时你的小伙伴就可以在他本地push到远程了  
如果你的小伙伴push是碰巧你也push了相同文件呢，这时就会产生冲突  
这时推送就会失败，这时就要把远程库的代码抓下来解决冲突  

	$ git pull  

可能pull失败，因为没有本地dev分支没有和远程dev分支关联  
这时使用下面的代码来关联  

	$ git branch --set-upstream branch-name orgin/branch-name  

来下来之后，常常会有合并冲突，需要手动解决  
解决后再push就好了  
   
---
           
####3)多人合作的工作模式
常常是这样的：  
首先可以使用下面的命令推送自己的修改  

	$ git push orgin branch-name  

如果推送失败是因为远程分支比你本地的新，使用`pull`合并  

	$ git pull  

如果合并有冲突，需要解决冲突，在本地提交没有冲突或者解决掉冲突后就可以推送了  

	$ git push orgin branch-name  
  
如果git提示"no tracking information",则说明本地分支没有和远程库的分支关联，使用下面的命令来关联  

	$ git branch --set-upstream branch-name orgin/branch-name  
      
---

####4) 对远程仓库进行Rollback(回滚）
如果你要rollback的commit还没有push到远程仓库的话：  

	$ git reset --hard <要rollback到的commit>  

如果已经push的话，可以先执行上面的命令，再强制推送你当前的版本到远程仓库：  

	$ git push <remote> HEAD --force  

执行此命令的时候要小心，确保你的本地仓库是最新的并且没有其他人也在此时做push，否则可能会丢失数据。

-------------------------------------------------------------------------------  
  
##标签管理：  
发布一个版本时，我么常常现在版本库中打一个标签，这样就唯一确定了打标签时候的版本，将来无论什么时候，随时都可以取出打标签的版本，其实就是一个版本快照git的标签也是一个指针，和分支很像，不同的是，分支可以移动，而标签不能移动  
  
---

###1.创建标签：  
首先切换到要打标签的版本  

	$ git checkout master  

然后使用如下的命令打标签  

	$ git tag v1.0  

可以使用如下的命令查看所有标签  

	$ git tag  

打标签默认是打在最近的commit上的，如果要给历史版本打标签就要先找到历史的commit id再给它大上  

	$ git log --pretty=oneline --abbrev-commit  
	$ git tag v0.9 633834  

注意标签不是按照时间排序，而是按照字母排序的  
使用`git tag <tagname>`查看标签信息  
还可以创建带说明的标签，使用-a指定标签名，-m指定说明  

	$ git tag -a v0.1 -m "this is a tag" 632345  

还可可以使用`-s`用私钥签名一个标签  

	$ git tag -s v0.2 -m "signed version 0.2 released" f234b3  

签名使用GPG签名，所以必须先安装了GunPG，并且有gpg密钥对  

---

###2.操作标签：  
删除标签：  

	$ git tag -d v0.1  

推送标签到远程  

	$ git push origin <tagname>  

或者可以一次性推送所有本地标签  

	$ git push origin --tags  

删除远程标签，要先删本地的，再删远程的  

	$ git tag -d v0.1  
	$ git push origin :refs/tags/v0.1  
      
-------------------------------------------------------------------------------  

##使用GitHub：  

github不仅仅是一个提供git远程仓库的网站，也是一个开源协作社区通过github，我们既可以参与别人的开源项目，别人也可以参与我们的开源项目    
在github上可以fork别人的项目到自己的帐号下，再从自己的帐号下clone自己的开发要往自己的远程库推送，如果我们改一个bug什么的，可以在github上发起pull request，然后就看别人是否接受了  

-------------------------------------------------------------------------------  

##自定义git：  

git有很多配置选项,如之前见到的  

	$ git config --global user.name "xxx"  
	$ git config --global user.email "xxx@example.com"  
	$ git config --global color.ui true  
  
---

###1.忽略特殊文件：  
我们开发时常常需要把一些不想被git管理的文件添加到git管理的文件夹比如java编译厚的.class文件  
这时在git根目录新建`.gitignore`文件在里面写忽略规则即可  
https://github.com/github/gitignore这个网站已经为我们提供了各种情况的忽略规则，我们只要适当组合即可  

---

###2.配置别名：  
git也有`alias`就像linux的alias，很好用，特别是不能补全命令的windows上  

	$ git config --global alias.st statue  

一个有趣的配置：  

	$ git config --global alias.lg "log -23 --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"  

配置git的时候，`--global`是对当前用户起作用的，不加就是对当前库起作用  
每个仓库的git配置文件都放在`.git/config`中  
每个用户的git配置文件都放在用户主目录的`.gitconfig`中  

---

###3.搭建git服务器：  

1.在linux上搭建git服务器：  

	$ sudo apt-get install git #centOS:sudo yum install git  

建立独立的git用户

	$ sudo adduser git   

2.创建证书登录，收集所有需要登录用户的公钥，即id_rsa.pub放入/home/git/.ssh/authorized_keys文件里，一行一个  

3.初始化git仓库，切换到自己指定的git目录执行  

	$ sudo git init --bare sample.git #服务器专用的初始化方式  

4.把git目录owner改为git  

	$ sudo chown git:git sample.git  

>**注意：创建git用户时很可能是使用的root或其他账号，请注意目录和子目录文件的owner:group权限必须是git用户可用的**  

5.禁用git用户shell登录  
在/etc/passwd文件中把git的登录运行文件改为/usr/bin/git-shell（可以使用$ which git-shell查找git-shell的完整路径）  

>**注意：登陆shell更改之后，服务器将无法再使用git账号通过ssh密码方式登陆服务器，所以务必保证ssh可以通过key免密码方式登陆运行正常**

这样git服务器就设置好了，可以在自己的电脑上clone了  

	$ git clone git@server:/path/sample.git  
  
<br/>  
摘自廖雪峰的git教程(Thanks Liao) 
