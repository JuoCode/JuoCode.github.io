---
layout: post
title:  "在Ember.js中显示格式化后的TextField"
date:   2013-12-08 15:32
categories: ember.js
cover: emberjs.png
desc: 使用自定义View解决格式化显示的需求，可以实现日期、货币等格式
comments: true
---


原文地址:[Greg Babiars](http://gregbabiars.com/blog/2013/11/29/formatted-text-fields-in-ember-dot-js/)

大多数应用中会有一个常见的需求，那就是在文本框中显示一个格式化后的文本；可能包括日期，格式化后的数字等等；通常我们可以利用现有的库来实现，但是仍然有一个问题，我们需要将没有格式化的值返回到应用程序(需要提交到服务器或者重新计算)

**一般做法就是直接绑定到value属性**

    {{view Em.TextField valueBinding="currency"}}
    
当值改变时，`currency`的值就会随着改变；但是，假设我们想用一个货币符号显示钱，但我们希望我们的值保存为原始数字，没有任何货币符号，这时需要扩展TextField

    {{view Em.CurrencyField valueBinding="currency"}}
    
现在的问题是，当在页面改变文本框的值时，`currency`的值也会被设为格式化后的值

**传递一个引用，而不是绑定**

虽然我们可以添加一些逻辑来处理这个问题，但是如果程序中多个地方需要用到这个功能，我们得在多个地方写相同的代码；一个更好的实现办法是将处理格式化和非格式化的值的工作交给View，要做到这一点，我们将`currency`属性当做引用传递给`view`，但是不将`currency`绑定到文本框`value`属性

    {{view Em.CurrencyField currencyBinding="currency"}}
    
自定义View的代码

{% highlight javascript %}
App.CurrencyField= Em.TextField.extend({
    init: function() {
    this._super();
    var value = accounting.formatMoney(this.get("currency"));
    this.set("value", value);
    },

    updateCurrency: function() {
    var currency = accounting.unformat(this.get("value"));
    this.set("currency", currency);
    }.observes("value")
});
{% endhighlight %}
