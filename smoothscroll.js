/**
* SmoothScroll
* ------------
*
* Hijack mousewheel event and use jQuery 
* to animate smoothly to target position.
*
* Dependencies
* - jQuery 1.7+
* - jQuery.mousewheel
*
* Default parameters
* - speed : 125
* - easing : 'swing' (jQuery.easing plugin can be used)
*/

function SmoothScroll(args) {

	// if no args set as empty object
	args = args ? args : {};

	// set up vars with defaults
	this.scrollSpeed = args.speed ? args.speed : 125;
	this.easing = args.easing ? args.easing : 'swing';
	this.positions = { 'currentPos' : 0, 'targetPos' : 0 };
	this.viewport = 0;
	this.$body = $('body, html');
	this.scrolling = false;

	var scope = this;

	// set viewport size and initial scroll position on load
	$(window).load(function() {
		scope.positions.currentPos = $(window).scrollTop() * -1;
		scope.viewport = $('body').height() - $(window).height();
	});

	// hijack mouse wheel
	this.$body.mousewheel(function(e, delta) {
		e.preventDefault();
		scope.mouseWheel(e, delta);
	});
}

SmoothScroll.prototype.mouseWheel = function(e, delta) {

	delta = delta < 0 ? -1 * this.scrollSpeed : this.scrollSpeed;
	var tempTarget = this.positions.currentPos + delta < 0 ? this.positions.currentPos + delta : 0;

	// end of page
	if((tempTarget * -1) > this.viewport) {
		return false;
	}

	// we haven't reached target so 
	if (tempTarget !== this.positions.targetPos) {
		this.positions.targetPos = tempTarget;
		this.scrollPage();
	}
};

SmoothScroll.prototype.scrollPage = function() {
	var from = {pos: this.positions.currentPos},
		to = {pos: this.positions.targetPos},
		scope = this;

	this.scrolling = true;

	// start animation 
	$(from).stop().animate(to, {
		duration: 1000,
		// scroll body at each step 
		step: function (now, fx) {
			scope.positions.currentPos = now;
			scope.$body.scrollTop(Number(now) * -1);
		},
		easing: scope.easing,
		complete: function () {
			scope.scrolling = false;
		}
	});
};

SmoothScroll.prototype.scrollTo = function(to) {
	if(!to || to == this.positions.currentPos) {
		return false;
	}

	// scroll to specified point
	this.positions.targetPos = to * -1;
	this.scrollPage();
};










