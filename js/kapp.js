


$(document).ready(function() {
	generateIndex();
	backToTop();
	resizeWindow();
});

function resizeWindow(){

	var win_width = $(window).width();
	var mleft = win_width/10; 
	$('.well_list').css('margin-left', mleft);
	if( win_width <= 1000){
		$('.well_sidebar').hide();
		$('.sidebar').hide();
		$('.col-md-9').css('width','100%');
	} else {
		$('.well_sidebar').show();
		$('.sidebar').show();
		$('.col-md-9').css('width','70%');
	}


    $(window).resize(function() { //when resize window, hide sidebar and adjust main column
		var win_width = $(window).width();
		var mleft = win_width/10; 
		$('.well_list').css('margin-left', mleft);
		if(win_width <= 1000){
			$('.well_sidebar').hide();
			$('.sidebar').hide();
			$('.col-md-9').css('width','100%');
		} else {
			$('.well_sidebar').show();
			$('.sidebar').show();
			$('.col-md-9').css('width','70%');
		}
    });
}

function generateIndex(){
	if(typeof $('#markdown-toc').html() === 'undefined'){
		$('#side_index').hide();
		if(typeof $('#side_index').html() !== 'undefined'){
			$('.col-md-9').css('width','100%');
		}
	} else {
		$('#markdown-toc').hide();
		$('#side_index').html('<h1>文章索引</h1>'+'<ul>'+$('#markdown-toc').html()+'</ul>');
	}
}

function backToTop() {
	// 滚动页面才显示回到顶部
	$(window).scroll(function(){
		if($(window).scrollTop() > 100) { 
			$('#backTop').fadeIn(500);
		} else {
			$('#backTop').fadeOut(500);		
		}
	});
	// 点击回到顶部
	$('#backTop').click(function(){
		$("body").animate({scrollTop:"0px"},500);
	});
	//初始化
	$(function() {
		$('[data-toggle="tooltip"]').tooltip();
		$('#backTop').hide();
	});
}



