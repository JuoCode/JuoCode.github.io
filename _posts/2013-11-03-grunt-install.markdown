---
layout: post
title:  "Grunt学习笔记1-使用Grunt输出Hello world"
date:   2013-11-03 22:53:43
categories: grunt
desc: Grunt安装,插件安装,使用Grunt输出'Hello world'
cover: grunt.png
tags: grunt
comments: true
---

<!-- ![Grunt](http://gruntjs.com/img/grunt-logo.svg) -->

## Grunt介绍

Grunt是一个自动构建工具，类似Java中的Maven和ant，使前端开发中的各种工作自动化

## Grunt安装

通过`Node.js`安装和管理`Grunt`以及各种插件

使用homebrew安装Nodejs：
 
	brew install node
	
安装NPM：

	curl https://npmjs.org/install.sh | sh 

添加到~/.bashrc

	export NODE_PATH="/usr/local/lib/node"
	export PATH="/usr/local/bin:/usr/local/sbin:/usr/local/mysql/bin:/usr/local/share/npm/bin:$PATH"

然后source

	source ~/.bashrc

然后安装`grunt-cli`

	npm install -g grunt-cli
	
	
## 创建项目

典型的Grunt项目包含两个配置文件 `package.json` 和 `Gruntfile`

**package.json** : 这个文件保存项目的元数据，Grunt依赖的插件会保存在`devDependencies`中

使用 `npm init` 命令可以生成该文件


**Gruntfile** : 文件名可以是 `Gruntfile.js` 或 `Gruntfile.coffee`，这个文件是Gruntfile的主要配置文件，可以自定义任务并且加载Grunt插件

可以使用 [grunt-init](http://gruntjs.com/project-scaffolding) 配合各种模板来生成该文件和 `package.json`

## 安装Grunt和Grunt插件到当前项目

	npm install grunt --save-dev

执行这行命令将在项目根目录生成 `node_modules` 文件夹

## 编写Gruntfile文件

	module.exports = (grunt)->
	
	  grunt.registerTask 'default', 'Hello world', ->
	    grunt.log.write('>>Hello world')
	    
最后，再命令行执行 `grunt` 命令可以看到输出

[项目地址](https://github.com/JuoCode/grunt-hello-world)