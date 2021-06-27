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