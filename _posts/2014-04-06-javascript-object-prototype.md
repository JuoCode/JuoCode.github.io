---
layout: post
title:  "理解Javascript中的对象和原型"
date:   2014-04-06 17:00:00
categories: javascript prototype
desc: 理解Javascript中的"类"、对象和原型
cover: javascript.png
comments: true
---

Javascript中没有类的概念，但是可以通过其他的方式来模拟

## 对象

> 对象是JavaScript的“基本数据类型”，是一种复合值…也可看做是属性的无序集合…

以上是《JavaScript权威指南》中对象的描述，至于对象是基本类型还是复杂类型这个问题，可以参考其他的文档

[JavaScript中“基本类型”之争](http://www.cnblogs.com/snandy/archive/2013/01/02/2841899.html)

有两种方式创建一个对象，分别是构造函数的方式和对象字面量的方式


### 构造函数的方式

{% highlight javascript%}
//定义构造函数
function Person(name, age){
  this.name = name;
  this.age = age;
  }

//使用构造函数创建对象
var p = Person('张三', 20); // {name: '张三', age: 20}
{% endhighlight%}


当调用构造函数时，构造函数中的`this`相当于`p`

### 对象字面量的方式

{% highlight javascript%}
var p = {
  name: '张三',
  age: 20
};
{% endhighlight%}
这样也可以创建对象

## 原型

> 类的所有实例对象都从同一个原型对象上继承属性…原型对象是类的核心…

通俗理解，所有的实例对象，都会从它的原型对象继承属性，并且这个原型对象是所有同类型的实例对象共有的，如下:


{% highlight javascript%}
//创建一个构造函数
function Person(){}

//给构造函数的prototype属性赋值
Person.prototype.name = '无名贱客';

//通过构造函数创建两个实例
var p1 = new Person();
var p2 = new Person();

//以下等式成立
// p1.name = p2.name = '无名贱客'

//修改原型对象
Person.prototype.name = '东邪';

//以下等式成立
// p1.name = p2.name = '东邪'
{% endhighlight%}

通过`__proto__`属性可以获取到对象的原型的引用，


{% highlight javascript%}
var a = {};
var b = new Object();
var f = function () {}

console.log(a.__proto__);                             //{}
console.log(a.prototype);                             //undefined
console.log('-----------------');   
console.log(b.__proto__);                             //{}
console.log(b.prototype);                             //undefined
console.log('-----------------');  
console.log(Object.prototype);                        //{}
console.log('-----------------');
console.log(f.__proto__);                             //[Function: Empty]
console.log(f.prototype);                             //{}
console.log(Function.prototype);                      //[Function: Empty]
{% endhighlight%}

> 所有通过对象直接量创建的对象都具有同一个原型对象，并可以通过`Object.prototype`获得原型对象的引用；

解释如下:
{% highlight javascript %}
{}.__proto__ === Object.prototype
{% endhighlight%}

> 通过关键字`new`和构造函数调用创建的对象的原型就是构造函数的`prototype`的值

上面这句话的意思如下:

{% highlight javascript%}
//定义一个构造函数
function F(oid){ this.id = oid; }

//使用构造函数创建一个对象
var f = new F();


f.__proto__ === f.constructor.prototype;   //true
f.__proto__ === F.prototype                //true
{% endhighlight%}


## 原型链和原型继承

原型链在属性查找时起作用，举例如下

{% highlight javascript%}

function Super(){}
Super.prototype.version = '1.0';

function App(){}
App.prototype = new Super();

function SubApp(){}
SubApp.prototype = new App();

var app = new SubApp();
console.log(app.version);

{% endhighlight%}

从下往上看这段代码

- 创建SubApp的一个实例app，打印app的version属性，这时会去这个对象内查找，发现没有version属性
- 然后去这个对象的原型对象，也就是`SubApp.prototype`中去找，还没有，继续沿原型链往上
- 此时会找到`App.prototype`，发现App.prototype是`Super`的一个实例，此实例有`version`属性，返回

关键点:

通过`Fn.prototype = new OtherFn();`实现原型继承


