---
layout: post
title:  在Rails4中使用Mongoid
date:   2013-12-13
categories: ember.js
cover: emberjs.png
desc: 在Ember.js应用中使用自定义View实现Radio button
cover: emberjs.png
comments: true
---

## 创建新项目
**Create rails project**

{% highlight bash %}
# -O, [--skip-active-record]     # Skip Active Record files
# -B, [--skip-bundle]            # Don't run bundle install
rails new test_mongoid -O -B
{% endhighlight %}

**Gemfile**

{% highlight bash %}
gem 'mongoid', :github => 'mongoid/mongoid'
gem 'bson_ext'
{% endhighlight %}
    
**generate config**

{% highlight bash %}
rails generate mongoid:config
{% endhighlight %}

## 在已有项目中使用Mongoid

编写`Gemfile`添加`mongoid`和`bson_ext`, `bundle`,执行`rails g mongoid:config`生成配置文件后,如果以下文件包含相关代码则注释并替换

- config/application.rb 

  {% highlight ruby %}
  # require 'rails/all'

  require "rails"

  %w(
    action_controller
    action_mailer
    active_resource
    rails/test_unit
  ).each do |framework|
    begin
      require "#{framework}/railtie"
    rescue LoadError
    end
  end
  {% endhighlight %}

- config/environments/development.rb
  {% highlight bash %}
  # config.active_record.migration_error = :page_load
  {% endhighlight %}
