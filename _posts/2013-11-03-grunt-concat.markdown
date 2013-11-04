---
layout: post
title:  "Grunt学习笔记2-使用Grunt concat插件合并文件"
date:   2013-11-03 22:53:43
categories: grunt
---

[github地址](https://github.com/gruntjs/grunt-contrib-concat)

**Grunt-concat可以将多个文件合并为一个文件**

## 新建Grunt项目
	
	mkdir grunt_concat_demo
	npm init
	npm install grunt --save-dev

## 安装concat插件

执行以下命令安装concat插件到当前项目

	npm install grunt-contrib-concat --save-dev

## Gruntfile
	
	module.exports = (grunt)->
      'use strict'

      grunt.initConfig
      concat:
        dist:
          src: ['src/intro.js', 'src/project.js', 'src/outro.js']
          dest: 'dist/built.js'

      grunt.loadNpmTasks 'grunt-contrib-concat'

      grunt.registerTask 'default', ['concat']
  		
在项目根目录创建 `src` 目录，并新建如上的三个文件，然后在命令行执行 `grunt` ，会在根目录生成 `dist/built.js` 文件，查看其内容，为三个文件合并的结果


## options

**separator** : 使用指定的字符连接所有指定的文件，如果合并多个JavaScript文件，最好使用 `;` 分隔

**banner** : 自动追加在文件头部

**footer** : 自动追加在文件末尾

## 其他用法

**多个Target**: 

	grunt.initConfig
      pkg: grunt.file.readJSON('package.json')
      concat:      
        # Basic target
        basic:
          src: ['src/intro.js', 'src/project.js', 'src/outro.js']
          dest: 'dist/built.js'
        # Extras target
        extras:
          src: ['src/main.js', 'src/extras.js'],
          dest: 'dist/with_extras.js',

**多个文件**:

	grunt.initConfig
	  pkg: grunt.file.readJSON('package.json')
	  concat:
	    basic_and_extras:
	      files:
	        'dist/basic.js': ['src/main.js'],
	        'dist/with_extras.js': ['src/main.js', 'src/extras.js'],

**动态文件名称**:

	grunt.initConfig
      pkg: grunt.file.readJSON('package.json')
      concat:
        dist:
          src: ['src/main.js']
          dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
          
**高级的动态文件名称**

	grunt.initConfig
	  pkg: grunt.file.readJSON('package.json')
	  dirs:
	    src: 'src/files'
	    dest: 'dist/<%= pkg.name %>/<%= pkg.version %>'
	  concat:
	  	dist:
          src: ['<%= dirs.src %>/main.js']
          dest: '<%= dirs.dest %>/basic.js'
          
**自定义函数**

使用自定义函数可以在合并文件前对文件进行处理

	grunt.initConfig
	  concat:
	    dist:
	      options:
	        process: (src, filepath)->
	          return '// Source: ' + filepath + '\n' + src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1')
	      files:
	        'dist/built.js': ['src/project.js']
	
      
		
	 



