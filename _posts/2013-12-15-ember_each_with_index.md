---
layout: post
title:  在Ember.js的each中输出当前index
date:   2013-11-21
categories: ember.js
cover: emberjs.png
desc: 获得当前的位置索引使用 {{each}} helper
cover: emberjs.png
comments: true
---


## 使用以下代码可以在each循环中输出下标

{% highlight html %}
{% raw %}
{{_view.contentIndex}} 
{% endraw %}
{% endhighlight %}


## 因为索引从0开始，所以可以写一个自增的helper

{% highlight coffeescript %}
Ember.Handlebars.helper "incr", (value, options) ->
  value + 1 

{% endhighlight %}

## 使用方法

{% highlight html %}
{% raw %}
<table>
  {{#each post in posts}} 
  <tr>
    <td>{{incr _view.contentIndex}}</td>
    <td>{{post.title}}</td>
  </tr>
  {{/each}}
</table>
{% endraw %}
{% endhighlight %}