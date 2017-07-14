$(function() {	
	
	// ------------------------------------------------------------
	// UTIL
	
	var html = $('html');
  var body = $('body');
	
	// ------------------------------------------------------------
	// NAV SCROLLING
	
	$('a[href*=#]').on("click touchstart" ,function(event){
		var scrollTime = 300;
		var scrollPadding = 100; // leave space above scrolled element;
		var top = $( $.attr(this, 'href') ).offset().top;
		top -= scrollPadding;
	    $('html, body').animate({
	        scrollTop: top,
	    }, scrollTime);
	    event.preventDefault();
	});
	
	// ------------------------------------------------------------
	// STORY SLIDESHOW
	
	$(".story-chooser img").on('mouseover touchstart',function() {
		var storyToShow = $(this).data("show-story");
		$(".story-active").removeClass("story-active");
		$("#js-story-" + storyToShow).addClass("story-active")
	});
	
	// ------------------------------------------------------------
	// MODAL
	
	var modal = $(".modal");
	
	function showModal() {
		body.addClass("js-modal-active");
		disableScroll();
		setTimeout(function() {
			modal.addClass("js-active");
		}, 0);
		return false;
	}
	
	function hideModal() {
		modal.removeClass("js-active");
		setTimeout(function() {
			body.removeClass("js-modal-active");
			enableScroll();
		}, 300);
		return false;
	}

	function disableScroll() {
		// Store current state
    var pageWidth = body.outerWidth();
    var scroll = document.documentElement.scrollTop  || document.body.scrollTop
    html.data('scroll-y', scroll);
		// Lock scrolling
    html.css('overflow-y', 'hidden');
    window.scrollTo(0, scroll);   
		// Fix widths
    $('body, #nav').css({'width':pageWidth});
	}
	
	function enableScroll() {
		// Restore scrolling
    html.css('overflow-y', 'scroll');
    var scroll = html.data('scroll-y');
    window.scrollTo(0, scroll);    
		// Clear widths
    $('body, #nav').css({'width':'100%'});
 	}
	
	// Events
	$("#nav .js-share-button").on("click touchstart", showModal);
	$(".modal-wash, .js-modal-close").on("click touchstart", hideModal);
	
	// ------------------------------------------------------------
	// COPY TO SHARE
	
	$(".copy-to-share").on("click touchstart", function() {
		var text = this;
    if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNodeContents(text);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
	});


	// ------------------------------------------------------------
	// SHARE BUTTONS
	
	$('.share-button').click(function(e) {
  	e.preventDefault();
  	window.open(this.href, null, "toolbar=no,navbar=no,width=540,height=380");
	});

});
