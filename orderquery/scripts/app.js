(function() {
  $(function() {
    var $body, $counters, $loginform, $main, $slideIndicatorActive, $slideIndicators, $slideItemActive, $slideItems, captured, emailRegex, errorField, img, incrementCount, initLeftBtnEvent, isHover, orderCounter, phoneRegex, showLeft, switchItem;
    orderCounter = 361840;
    $body = $('body');
    $loginform = $('#loginform');
    $main = $('.main');
    $slideItems = $('.slide-container > .item');
    $slideItemActive = $('.slide-container > .item.active');
    $slideIndicators = $('.slide-indicators > .item');
    $slideIndicatorActive = $('.slide-indicators > .item.active');
    errorField = void 0;
    emailRegex = /^[a-z0-9]([a-z0-9]*[-_\.\+]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2,4})?$/;
    phoneRegex = /^1[3|4|5|8][0-9]\d{4,8}$/;
    $('input, textarea').placeholder();
    $counters = $('.counters');
    incrementCount = function(count) {
      var i, innerHtml, units, _i, _len;
      units = count.toString().split('');
      innerHtml = '';
      for (_i = 0, _len = units.length; _i < _len; _i++) {
        i = units[_i];
        innerHtml += "<span>" + i + "</span>";
      }
      return $counters.html(innerHtml);
    };
    $.get('public/rest/snapshot', function(data) {
      return incrementCount(data.total);
    });
    showLeft = false;
    $('.leftside-toggle').click(function() {
      $body.toggleClass('show-left');
      return $body.removeClass('show-right');
    });
    $('.content').click(function() {
      return $body.removeClass('show-left');
    });
    $('.toggle-signin, .toggle-signup').click(function() {
      var $t, target;
      $t = $(this);
      target = $t.data('form-target');
      $body.addClass('show-right');
      return $loginform.attr('data-form-target', target);
    });
    $('.form-switcher span').click(function() {
      var $t, target;
      $t = $(this);
      target = $t.data('form-target');
      $loginform.attr('data-form-target', target);
      return $('.error').empty();
    });
    $('.rightside .close').click(function() {
      return $body.removeClass('show-right');
    });
    switchItem = function($t) {
      var _i;
      _i = $t.index();
      $slideItemActive.fadeOut(250);
      $slideItemActive = $($slideItems[_i]);
      $slideItemActive.fadeIn(250);
      $slideIndicatorActive.removeClass('active');
      $slideIndicatorActive = $t;
      return $slideIndicatorActive.addClass('active');
    };
    isHover = false;
    $('#order-count, #order-status, #order-seal, #order-sign').mouseover(function() {
      var $t;
      isHover = true;
      $t = $(this);
      if ($t.hasClass('active')) {
        return;
      }
      return switchItem($t);
    });
    $('#order-count, #order-status, #order-seal, #order-sign').mouseout(function() {
      return isHover = false;
    });
    $('#order-count, #order-status, #order-seal, #order-sign').click(function() {
      return switchItem($(this));
    });
    setInterval(function() {
      var max, _n;
      if (isHover) {
        return;
      }
      _n = $slideIndicatorActive.index();
      max = $slideIndicators.length;
      if (_n === max - 1) {
        _n = 0;
      } else {
        _n += 1;
      }
      return switchItem($($slideIndicators[_n]));
    }, 5000);
    $('#loginform .action button').click(function() {
      var $error, $form, $t, params, password, password2, remoteError, target, targetUrl, username, verifyCode;
      $t = $(this);
      $form = $('#loginform');
      target = $form.attr('data-form-target');
      username = $($form[0].username).val().trim();
      password = $($form[0].password).val().trim();
      password2 = $($form[0].password2).val().trim();
      verifyCode = $($form[0].verifyCode).val().trim();
      $error = $('.error');
      if (username.length === 0) {
        errorField = 'username';
        $error.text('请输入正确的用户名 ( 邮箱或手机号码 )');
        return;
      }
      if (!((emailRegex.test(username)) || (phoneRegex.test(username)))) {
        errorField = 'username';
        $error.text('请输入正确的用户名 ( 邮箱或手机号码 )');
        return;
      }
      if (password.length < 6) {
        errorField = 'password';
        $error.text('密码最少6位');
        return;
      }
      if (target === 'signup') {
        if (password2.length === 0) {
          errorField = 'password2';
          $error.text('请再次输入密码');
          return;
        } else if (password2 !== password) {
          errorField = 'password2';
          $error.text('两次输入的密码不一致，请重新输入');
          return;
        }
        if (verifyCode.length === 0) {
          errorField = 'verifyCode';
          $error.text('请输入验证码');
          return;
        }
      }
      params = {
        username: username,
        password: password
      };
      targetUrl = 'public/rest/login';
      if (target === 'signup') {
        targetUrl = 'public/rest/register';
        params.password2 = password2;
        params.verifyCode = verifyCode;
      }
      $form.addClass('submiting');
      remoteError = {
        signin: {
          '1': '用户名或密码错误'
        },
        signup: {
          '1': '用户名被占用',
          '2': '验证码错误'
        }
      };
      return $.ajax({
        url: targetUrl,
        data: params,
        success: function(data) {
          if (data.errcode) {
            return $error.text = remoteError[target][data.errcode];
          } else {
            return window.location.href = data.url;
          }
        },
        error: function(resp) {
          return $error.text('服务器异常，请联系管理员');
        }
      });
    });
    initLeftBtnEvent = function() {
      $('.btn-signup').click(function() {
        $body.removeClass('show-left');
        $body.addClass('show-right');
        return $loginform.attr('data-form-target', 'signup');
      });
      return $('.btn-signin').click(function() {
        $body.removeClass('show-left');
        $body.addClass('show-right');
        return $loginform.attr('data-form-target', 'signin');
      });
    };
    if (Image) {
      img = new Image();
      img.onload = function() {
        $body.append($('#left-side-template').html());
        return initLeftBtnEvent();
      };
      img.onerror = function() {
        $body.append($('#left-side-template').html());
        return initLeftBtnEvent();
      };
      img.src = 'images/bg.jpg';
    }
    $('input').focus(function() {
      var $t;
      $t = $(this);
      if (($t.attr('name')) === errorField) {
        return $('.error').empty();
      }
    });
    captured = false;
    return $('body').on('mousewheel', function(event) {
      if (captured) {
        return;
      }
      console.log(event.deltaY);
      if (event.deltaY < -40) {
        captured = true;
        $body.addClass('show-left');
        $body.removeClass('show-right');
        return setTimeout(function() {
          return captured = false;
        }, 500);
      } else if (event.deltaY > 60) {
        captured = true;
        $body.removeClass('show-left');
        $body.removeClass('show-right');
        return setTimeout(function() {
          return captured = false;
        }, 500);
      }
    });
  });

}).call(this);
