---
layout: post
title:  "理解Javascript中的对象和原型"
date:   2014-04-06 17:00:00
categories: javascript prototype
desc: 理解Javascript中的"类"、对象和原型
comments: true
---

Javascript中没有类的概念，但是可以通过其他的方式来模拟

## 对象

### 构造函数的方式

```
//定义构造函数
function Person(name, age){
	this.name = name;
	this.age = age;
}

//使用构造函数创建对象
var p = Person('张三', 20); // {name: '张三', age: 20}
```
当调用构造函数时，构造函数中的`this`相当于`p`

### 对象字面量的方式

```
var p = {
	name: '张三',
	age: 20
};
```
这样也可以创建对象

## 原型

```
var a = {};
var b = new Object();
var f = function () {
	
}

console.log(a.__proto__);           //{}
console.log(a.prototype);           //undefined
console.log('-----------------');   
console.log(b.__proto__);           //{}
console.log(b.prototype);           //undefined
console.log('-----------------');  
console.log(Object.prototype);      //{}
console.log('-----------------');
console.log(f.__proto__);           //[Function: Empty]
console.log(f.prototype);           //{}
console.log(Function.prototype);    //[Function: Empty]
```

> 所有通过对象直接量创建的对象都具有同一个原型对象，并可以通过Javascript`Object.prototype`获得对原型对象的引用；

这个地方应该有问题，获得一个对象的原型对象的引用，应该使用`Object.__proto__`；

> 通过关键字`new`和构造函数调用创建的对象的原型就是构造函数的`prototype`的值

上面这句话的意思如下:

```
//定义一个构造函数
function F(oid){ this.id = oid; }

//使用构造函数创建一个对象
var f = new F();


f.__proto__ === f.constructor.prototype;   //true
f.__proto-- === F.prototype                //true
```