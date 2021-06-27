function toggle_menu(){
	var state = $(".floatmenu").css('display')
	if(state == 'block'){
		$(".floatmenu").css('display', 'none')
		$(".menuimg img").attr('src','./svg/burgermenu.svg')
		$(".menuimg").css('margin-top','9.5px')
		$(".menuimg img").css('margin-right','0px')
	}
	else{
		$(".floatmenu").css('display', 'block')
		$(".menuimg img").attr('src','./svg/cross.svg')
		$(".menuimg").css('margin-top','3.5px')
		$(".menuimg img").css('margin-right','-4px')
	}
}

function bodyLoad(){
	$(".svg-change").hover(function(){
		var ele=this
		var swap1 = $(ele).attr('src')
		var swap2 = $(ele).attr('data-hover')
		$(ele).attr('src',swap2)
		$(ele).attr('data-hover',swap1)
	}, function(){
		var ele = this
		var swap1 = $(ele).attr('src')
		var swap2 = $(ele).attr('data-hover')
		$(ele).attr('src',swap2)
		$(ele).attr('data-hover',swap1)
	});
}