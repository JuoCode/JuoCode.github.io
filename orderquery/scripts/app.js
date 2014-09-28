(function() {
  $(function() {
    var $body, $counters, $loginform, $main, $slideIndicatorActive, $slideIndicators, $slideItemActive, $slideItems, appeared, emailRegex, img, orderCounter, willHide;
    orderCounter = 361840;
    $body = $('body');
    $loginform = $('#loginform');
    $main = $('.main');
    $slideItems = $('.slide-container > .item');
    $slideItemActive = $('.slide-container > .item.active');
    $slideIndicators = $('.slide-indicators > .item');
    $slideIndicatorActive = $('.slide-indicators > .item.active');
    emailRegex = /^[a-z0-9]([a-z0-9]*[-_\.\+]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2,4})?$/;
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
    }, 1500);
    $('.leftside-toggle').click(function() {
      $body.toggleClass('show-left');
      return $body.removeClass('show-right');
    });
    willHide = true;
    appeared = false;
    $('.driver-client-hover').mouseover(function() {
      if (appeared) {
        return;
      }
      $('.dropdown-wrapper').fadeIn(300);
      return appeared = true;
    });
    $('.driver-client-hover').mouseout(function() {
      console.log('out hover');
      return setTimeout(function() {
        if (!willHide) {
          return;
        }
        $('.dropdown-wrapper').fadeOut('fast');
        return appeared = false;
      }, 2000);
    });
    $('.dropdown-wrapper').mouseover(function() {
      return willHide = false;
    });
    $('.dropdown-wrapper').mouseout(function() {
      return willHide = true;
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
    $('.btn-signup').click(function() {
      $body.removeClass('show-left');
      $body.addClass('show-right');
      return $loginform.attr('data-form-target', 'signup');
    });
    $('.btn-signin').click(function() {
      $body.removeClass('show-left');
      $body.addClass('show-right');
      return $loginform.attr('data-form-target', 'signin');
    });
    $('.rightside .close').click(function() {
      return $body.removeClass('show-right');
    });
    $('#order-count, #order-status, #order-seal, #order-sign').click(function() {
      var $t, _i;
      $t = $(this);
      if ($t.hasClass('active')) {
        return;
      }
      _i = $t.index();
      $slideItemActive.fadeOut(250);
      $slideItemActive = $($slideItems[_i]);
      $slideItemActive.fadeIn(250);
      $slideIndicatorActive.removeClass('active');
      $slideIndicatorActive = $t;
      return $slideIndicatorActive.addClass('active');
    });
    setInterval(function() {
      var max, _n;
      _n = $slideIndicatorActive.index();
      max = $slideIndicators.length;
      if (_n === max - 1) {
        _n = 0;
      } else {
        _n += 1;
      }
      return $($slideIndicators[_n]).click();
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
        $error.text('请输入您的邮箱');
        return;
      }
      if (!emailRegex.test(email)) {
        $error.text('邮箱格式不正确');
        return;
      }
      if (password.length < 6) {
        $error.text('密码最少6位');
        return;
      }
      if (target === 'signup') {
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
    if (Image) {
      img = new Image();
      img.onload = function() {
        return $body.append($('#left-side-template').html());
      };
      img.onerror = function() {
        return $body.append($('#left-side-template').html());
      };
      return img.src = 'images/bg.jpg';
    }
  });

}).call(this);
