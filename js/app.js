var index_page = "index.html"
var about_page = "about.html"

function toggle_menu(){
	
	var burger_svg = $(".burger-svg").css('display')
	var cross_svg = $(".cross-svg").css('display')
	var bcss = burger_svg == 'block' ? "none" : "block"
	var ccss = cross_svg == 'block' ? "none" : "block"
	$(".burger-svg").css('display', bcss)
	$(".cross-svg").css('display', ccss)

	if(ccss == 'block')
		$(".floatmenu").css('display', 'block')
	else
		$(".floatmenu").css('display', 'none')
}

function preloadStuffs(){
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

			var parts = window.location.href.split("/")
			var html_name = parts[parts.length-1]
			if(html_name == index_page){
				$(".menuitem:nth-child(1)").addClass("selected")
				$(".floatmenuitem:nth-child(1) a").addClass("selected")
			}else if(html_name == about_page){
				$(".menuitem:nth-child(2)").addClass("selected")
				$(".floatmenuitem:nth-child(2) a").addClass("selected")
			}


			$(".loading_holder").css("display", "none")
			$('body').css('background-color', 'white') 
			$('.body').css('display', 'block') 
		},100);
	})
}

function bodyLoad(){

	var count = 0

	$.ajax({
		url: "./header.html",
	    success: function (resp) {
	    	$('.body').prepend(resp)
			count += 1
			if (count == 2){
				preloadStuffs()
			}
	    }
	});

	$(".footer").load("./footer.html", function(){
		count += 1
		if (count == 2){
			preloadStuffs()
		}
	})
}