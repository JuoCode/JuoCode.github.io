---
layout: post
title:  Ember.js + Bootstrap实现可重用的Modal组件
date:   2013-12-26
categories: ember.js
cover: emberjs.png
desc: 动态渲染模板、命名outlet的使用
cover: emberjs.png
comments: true
---


## 思路

添加Modal template,实现Modal结构(header, body, footer), `Modal body` 部分为一个`outlet`，将在用户操作时将对应的Template渲染到改outlet, 同时，需要渲染到该`outlet`的模板对应的View，需要继承一个自定义的`Ember.ModalBodyView`的View, 该View提供`didInsertElement` 函数, 在render template以后显示modal;

## 代码示例

- **Application Template**

{% highlight html %}
{% raw %}
{{render 'modal'}}
{% endraw %}
{% endhighlight %}

- **Modal Template**

{% highlight html %}
<div class="modal hide fade" id="ember-modal">
  <div class="modal-header">
    <a class="close" data-dismiss="modal">&times;</a>
    <h3>Modal header</h3>
  </div>
  
  <div class="modal-body">
    {{outlet modalBody}}
  </div>

  <div class="modal-footer">
    <a class="btn btn-primary" {{action doAction target="view"}}>确认并上传</a>
    <a class="btn" data-dismiss="modal" {{action hideModal}}>返回</a>
  </div>
</div>
{% endhighlight %}

- **Route extend**

{% highlight coffeescript %}
Ember.Route.reopenClass 
  showModal: (router, name) ->
    router.render name,
      into: "modal"
      outlet: "modalBody"
{% endhighlight %}

- **User Action handler**, 假设`action`函数定义在route中

{% highlight coffeescript %}
  # ...
  action:
    showLoginView:->
      Ember.Route.showModal(this, 'login') # this 表示当前Route的实例
{% endhighlight %}

- **Ember ModalBodyView**

{% highlight coffeescript %}
Ember.ModalBodyView = Ember.View.extend
  didInsertElement: ->
    $("#ember-modal").modal('show')
{% endhighlight %}

- **Login View**

{% highlight coffeescript %}
App.LoginView = Ember.ModalBodyView.extend
  templateName: 'login'
{% endhighlight %}
