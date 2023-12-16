var index_page = "index.html"
var about_page = "about.html"
var projects_page = "projects.html"

var password_form_content = `
<div class="password-holder">
	<div><img src="./svg/lock.svg" /></div>

	<div class="content-prohibit">
		This content is prohibited
	</div>
	<div class="content-prohibit-2">
		To view this case study, please enter the password
	</div>

	<div class="password-form">
		<input type="password" class="passcode" name="passcode" autofocus onfocus="formFocus()" placeholder="Enter password" />
		<button name="form-submit" onclick="formValidate()" ">
			<div class="submit-btn-text">Submit</div>
		</button>
	</div>
</div>`

function isIndexPage(){
	var parts = window.location.href.split("/")
	var html_name = parts[parts.length-1]
	return html_name == index_page || html_name=="";
}
function isAboutPage(){
	var parts = window.location.href.split("/")
	var html_name = parts[parts.length-1]
	return html_name == about_page;
}
function isProjectsPage(){
	var parts = window.location.href.split("/")
	var html_name = parts[parts.length-1]
	return html_name == projects_page;
}
function isOtherProjectsPage(){
	var parts = window.location.href.split("/")
	var html_name = parts[parts.length-1]
	html_name = html_name.split("?")[0]
	return new RegExp('op[a-zA-Z0-9]{0,9}.html').test(html_name)
}

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

	if(!(isIndexPage() || isAboutPage())){
		$(".header").addClass("header_shadow");
	}

	if(!(isIndexPage() || isAboutPage() || isProjectsPage() || isOtherProjectsPage())){
		//show back to home btn
		$('.b2home').css("display","block")
	}
	if(isOtherProjectsPage()){
		$(".b2oprojects").css("display","block")
	}
	$('img').each(function(){
		var img1 = $(this).attr('src')
		var img2 = $(this).attr('data-hover')
		var elt = document.createElement('img')
		if(img1 != undefined)
			elt['src'] = img1
		if(img2 != undefined)
			elt['src'] = img2
		
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

			if(isIndexPage()){
				$(".menuitem:nth-child(1)").addClass("selected")
				$(".floatmenuitem:nth-child(1) a").addClass("selected")
			}else if(isAboutPage()){
				$(".menuitem:nth-child(2)").addClass("selected")
				$(".floatmenuitem:nth-child(2) a").addClass("selected")
			}else if(isProjectsPage()){
				$(".menuitem:nth-child(3)").addClass("selected")
				$(".floatmenuitem:nth-child(3) a").addClass("selected")
			}


			$(".loading_holder").css("display", "none")
			$('body').css('background-color', 'white') 
			$('.body').css('display', 'block') 
			
			imageLoad()

		},250);
	})
}

function imageLoad(){
	var html = '<div class="imgloading-icon">'+
							    '<div class="rect rect1"></div>'+
							    '<div class="rect rect2"></div>'+
							    '<div class="rect rect3"></div>'+
							'</div>';
	$(".lzload").each(function(){
		$(this).prepend(html)
	})

	$(".lzload").each(function(){
		if($(this).hasClass('imgcontainer')){
			$(this).css('min-height','100px')
		}
		var src = $(this).attr('src-ll')
		this.getElementsByClassName("imgloading-icon")[0].style.display = 'none'
		var imggg = this.getElementsByTagName("img")[0]
		var im = imggg.getAttribute('src-ll')
		this.getElementsByTagName("img")[0].setAttribute('src', im)
	})
}

function bodyLoad(){
    console.log("Body Load 1")

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

	console.log('Footer loading 1')
	$(".footer").load("./footer.html", function(){
		count += 1
		console.log('footer loaded 1')
		if (count == 2){
			preloadStuffs()
		}
	})
}

function goToHome(){
	var parts = window.location.href.split("/")
	var html_name = parts[parts.length-1]
	var newUrl = ""
	for(var i=0; i<parts.length-1; i++){
		newUrl += parts[i]+"/"
	}newUrl += index_page
	window.location = newUrl
}


function goToHome(){
	var parts = window.location.href.split("/")
	var html_name = parts[parts.length-1]
	var newUrl = ""
	for(var i=0; i<parts.length-1; i++){
		newUrl += parts[i]+"/"
	}newUrl += index_page
	window.location = newUrl
}

function formValidate(){
	$(".password-form input").removeClass("focus")
	$(".password-form button").removeClass("focus")
	$(".password-form input").attr("disabled", true)
	$(".password-form button").attr("disabled", true)
	var passcode = $(".passcode").val()
	var htmlfile = location.href.split("/").slice(-1)[0]

	$.ajax({
		url: "https://resumedataprotect-60022959849.development.catalystserverless.in/server/PasswordProtect/?passcode="+passcode+"&filename="+htmlfile, // Replace with the URL of the API you want to access
		type: "POST",
		crossDomain: true, // Set to true to enable CORS
		xhrFields: {
		  withCredentials: true,
		},
		success: function (data) {
			$(".password-holder").css("display", "none")
			$(".header").addClass("header_shadow");
			$(".body").append(data)
			$(".footer").load("./footer.html", function(){
				$(".footer").css("display", "block")
			});
			
			imageLoad();
		},
		error: function (xhr, textStatus, error) {
		  $(".passcode").addClass("invalid")
		  $(".password-form input").attr("disabled", false)
		  $(".password-form button").attr("disabled", false)
		},
	  });
	
}

function formFocus(){
	$(".passcode").removeClass("invalid")
	$(".password-form input").addClass("focus")
	$(".password-form button").addClass("focus")
}

function validateKey(event){
	console.log(event)
}