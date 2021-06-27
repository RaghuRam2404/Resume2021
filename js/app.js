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

	
	$('img').each(function(){
		var img1 = $(this).attr('src')
		var img2 = $(this).attr('data-hover')
		var elt = document.createElement('img')
		elt['src'] = img1
		if(img2 != undefined){
			elt['src'] = img2
		}
	}).promise().done(function(){
		setTimeout(function(){
			$(".loading_holder").css("display", "none")
			$('body').css('background-color', 'white') 
			$('.body').css('display', 'block') 
		},1000);
	})

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