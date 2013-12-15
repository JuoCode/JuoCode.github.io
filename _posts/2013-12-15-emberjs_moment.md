---
layout: post
title:  Ember.js + moment.js 实现格式化时间和日期
date:   2013-11-21
categories: ember.js
cover: emberjs.png
desc: 使用自定义Helper结合Moment.js格式化时间
cover: emberjs.png
comments: true
---


## Helper

{% highlight coffeescript %}
Ember.Handlebars.helper "datetime", (value, options) ->
  format = "D MMMM, YYYY [at] HH:mm"
  format = options.hash.format  if options.hash.format
  if value
    time = moment(value).format(format)
    new Handlebars.SafeString("<span class=\"timestamp\">" + time + "</span>”) 
{% endhighlight %}


## Template

{% highlight html %}
{% raw %}
{{datetime updated_at format="YYYY-MM-DD HH:mm"}} 
{% endraw %}
{% endhighlight %}