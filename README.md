SmoothScroll
------------

Hijack mousewheel event and use jQuery to animate smoothly to target position.

**Dependencies**

- jQuery 1.7+
- jQuery.mousewheel

**Default parameters**

- speed : 125
- easing : 'swing' (jQuery.easing plugin can be used)

**Example Usage**
	
	  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	  <script>window.jQuery || document.write('<script src="jquery-1.7.2.min.js"><\/script>')</script>
	  <script src="jquery.easing.js"></script>
	  <script src="jquery.mousewheel.js"></script>
	  <script src="smoothscroll.js"></script>
	  <script>
	  $(function() {
	    var smoothscroll = new SmoothScroll({
	      'speed' : 125,
	      'easing' : 'easeOutExpo'
	    });
	
	    $('body').click(function() {
	      smoothscroll.scrollTo(500);
	    })
	  });
	  </script>