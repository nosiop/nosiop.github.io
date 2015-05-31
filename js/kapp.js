


$(document).ready(function() {
	generateIndex();
//	backToTop();

});

function generateIndex() {
	if(typeof $('#markdown-toc').html() === 'undefined'){
		$('#side_index').hide();
	} else {
		$('#markdown-toc').hide();
		$('#side_index').html('<h1>文章索引</h1><br>'+'<ul>'+$('#markdown-toc').html()+'</ul>');
	}
}


