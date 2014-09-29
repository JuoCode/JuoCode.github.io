(function() {
  $(function() {
    var $body, $counters, $loginform, $main, $slideIndicatorActive, $slideIndicators, $slideItemActive, $slideItems, captured, emailRegex, errorField, img, initLeftBtnEvent, isHover, orderCounter, showLeft, switchItem;
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
    $('input, textarea').placeholder();
    $counters = $('.counters');
    setInterval(function() {
      var i, innerHtml, units, _i, _len;
      orderCounter += Math.floor(Math.random() * 10);
      units = orderCounter.toString().split('');
      for (_i = 0, _len = units.length; _i < _len; _i++) {
        i = units[_i];
        innerHtml = innerHtml += "<span>" + i + "</span>";
      }
      return $counters.html(innerHtml);
    }, 5000);
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
      var $error, $form, $t, company, email, params, password, target;
      $t = $(this);
      $form = $('#loginform');
      target = $form.attr('data-form-target');
      email = $($form[0].email).val();
      password = $($form[0].password).val();
      company = $($form[0].company).val();
      $error = $('.error');
      if (email.length === 0) {
        errorField = 'email';
        $error.text('请输入您的邮箱');
        return;
      }
      if (!emailRegex.test(email)) {
        errorField = 'email';
        $error.text('邮箱格式不正确');
        return;
      }
      if (password.length < 6) {
        errorField = 'password';
        $error.text('密码最少6位');
        return;
      }
      if (target === 'signup') {
        errorField = 'company';
        if (company.length === 0) {
          $error.text('请输入您的公司名称');
          return;
        }
      }
      params = {
        email: email,
        password: password
      };
      if (target === 'signup') {
        params.company = company;
      }
      $form.addClass('submiting');
      return setTimeout(function() {
        $form.removeClass('submiting');
        return alert('登录成功');
      }, 1000);
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
    }
  });

}).call(this);
