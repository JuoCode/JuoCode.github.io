---
layout: post
title:  使用Ember.js自定义View实现Radio button
date:   2013-12-03
categories: ember.js
cover: emberjs.png
desc: 在Rails项目中使用Grape构建REST风格的API
cover: grape_logo.png
comments: true
---


## View

{% highlight javascript %}
Ember.RadioButton = Ember.View.extend({
    tagName : "input",
    type : "radio",
    attributeBindings : [ "name", "type", "value", "checked:checked:" ],
    click : function() {
        this.set("selection", this.$().val());
    },
    checked : function() {
        return this.get("value") == this.get("selection");   
    }.property()
});
{% endhighlight %}

## Template

{% highlight html %}
{% raw %}
{{view Ember.RadioButton name="selectionTest" selectionBinding="isSelected" value="1"}}
    
{{view Ember.RadioButton name="selectionTest" selectionBinding="isSelected" value="0"}}
{% endraw %}
{% endhighlight %}

在线演示：[JSBin](http://emberjs.jsbin.com/ajOlaMuW/1/edit)


