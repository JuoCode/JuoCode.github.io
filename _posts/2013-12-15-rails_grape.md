---
layout: post
title:  使用Grape创建REST风格的API
date:   2013-12-08 15:32
categories: ember.js
cover: emberjs.png
desc: 在Rails项目中使用Grape构建REST风格的API
cover: grape_logo.png
comments: true
---


使用Grape创建REST风格的API
======

**涉及到的Gem**

- Rails
- Grape
- Grape-rabl

**涉及到的文件**

- Gemfile
{% highlight ruby%}
gem 'grape'
gem 'grape-rabl'
{% endhighlight %}

- app/grape/api.rb

{% highlight ruby%}
require 'grape'

class API < Grape::API
  default_format :json
  prefix "api"
  version     'v1'
  formatter :json, Grape::Formatter::Rabl #指定使用rabl模板

  resource :topics do 
    get '/', rabl: "topics" do
      @topics = Topic.page(params[:page]).per(params[:per_page]||30)
      present @topics
    end
  end
end
{% endhighlight %}
    
- **config/application.rb**
    开发环境自动加载修改过的文件
{% highlight ruby%}
config.paths.add "app/grape", glob: "**/*.rb"
config.autoload_paths += Dir["#{Rails.root}/app/grape/*"]

# add view path
config.middleware.use(Rack::Config) do |env|
  env['api.tilt.root'] = Rails.root.join "app", "views", "api"
end
{% endhighlight %}
    
- config/routes.rb
    
{% highlight ruby%}
mount AppName::API => "/"
{% endhighlight %}


- app/views/api/XXX.rabl

{% highlight ruby%}
# 编写模板
collection @topics, root: 'topics', object_root: false
attributes :id, :title, :detail, :created_at
{% endhighlight %}

### 参考链接

[rabl](https://github.com/nesquena/rabl)
[grape](https://github.com/intridea/grape)
[grape-rabl](https://github.com/LTe/grape-rabl)