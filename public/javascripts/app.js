(function() {
  $(function() {
    $(".banner").height(window.innerHeight);
    $(".reserve").css("bottom", 111 / window.innerHeight * 100 + "%").fadeIn("fast");
    return $(".scroll-control").fadeIn("slow");
  });
	

}).call(this);

function scrollToLogos(){
	$('html,body').animate({ scrollTop: $('.logos')[0].offsetTop }, 'slow');
}

function showSignInPanel(){
	$('.dark_cover').fadeIn('fast');
	$('#signup_panel').addClass('modal_hide');
	$('#login_panel').removeClass('modal_hide');
}
function showSignUpPanel(){
	$('.dark_cover').fadeIn('fast');
	$('#login_panel').addClass('modal_hide');
	$('#signup_panel').removeClass('modal_hide');
}