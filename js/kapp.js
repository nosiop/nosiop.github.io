


$(document).ready(function() {
	generateIndex();
	backToTop();
});

function generateIndex(){
	if(typeof $('#markdown-toc').html() === 'undefined'){
		$('#side_index').hide();
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



