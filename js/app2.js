
const session_live_time = 1*60*1000 //1 min

function isLoggedIn(){
    if (sessionStorage.getItem("expiry_time") == null)
        return false;

    current_time = Date.now()
    expiry_time = sessionStorage.getItem("expiry_time")

    return current_time < expiry_time
}

function bodyLoad(){
    console.log("Body Load 2")

    // to put these in cache
	$.ajax({
		url: "./header.html"
	});
	$.ajax({
		url: "./footer.html"
	});

    if(isLoggedIn()){
        formValidate();
        return;
    }

    $('.passcode').keypress(function(e) {
        if (e.which == '13') {
            e.preventDefault();
            formValidate()
            }
        });
        
    $(".loading_holder").hide()
    $(".body").show()
}

function formFocus(){
	$(".passcode").removeClass("invalid")
	$(".password-form input").addClass("focus")
	$(".password-form button").addClass("focus")
}

function formValidate(){
	$(".password-form input").removeClass("focus")
	$(".password-form button").removeClass("focus")
	$(".password-form input").attr("disabled", true)
	$(".password-form button").attr("disabled", true)
	var passcode = $(".passcode").val()
    if(passcode == null || passcode==="") passcode = sessionStorage.getItem("passcode", passcode)
	var htmlfile = location.href.split("/").slice(-1)[0]

	$.ajax({
		url: "https://resumedataprotect-60022959849.development.catalystserverless.in/server/PasswordProtect/?passcode="+passcode+"&filename="+htmlfile, // Replace with the URL of the API you want to access
		type: "POST",
		crossDomain: true,
		xhrFields: {
		  withCredentials: true,
		},

		success: function (data) {
			$(".password-holder").css("display", "none")
            $("body").remove();
			$("html").append(data)
			$(".header").addClass("header_shadow");
			$(".footer").load("./footer.html", function(){
				$(".footer").css("display", "block")
			});
			
			bodyLoad();

			$(".password-holder").css("display", "none")

            sessionStorage.setItem("logged_in", true)
            sessionStorage.setItem("passcode", passcode)
            sessionStorage.setItem("expiry_time", Date.now()+session_live_time)
		},
		error: function (xhr, textStatus, error) {
		  $(".passcode").addClass("invalid")
		  $(".password-form input").attr("disabled", false)
		  $(".password-form button").attr("disabled", false)
		},
	  });
	
}
