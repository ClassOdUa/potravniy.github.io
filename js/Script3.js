function extend(Child, Parent) {
	var F = function () { }
	F.prototype = Parent.prototype
	Child.prototype = new F()
	Child.prototype.constructor = Child
	Child.superclass = Parent.prototype
}

var Extendable = function () {
	this.init.call(this, arguments)
}

Extendable.prototype.extend = function (Child) {
	return extendedChild
}
Extendable.prototype.init = function () {
	throw new Error("Extendable is abstract class, you can't init it")
}




var BaseBrick = (function () {

	var BaseBrick = function (leftX, topY, width, height, context) {
		//constructor
		this.context = context;
		var deltaW = Math.round(width * 0.1);
		this.initCorners()

		return this;
	}

	BaseBrick.prototype.initCorners = function () {
		this.corner.outer.leftTop = {
			x: Math.round(leftX),
			y: Math.round(topY)
		};
	}

	BaseBrick.prototype.color = {
		face: "#8e8",
		top: "#6c6",
		left: "#4a4",
		bottom: "#282",
		right: "#060"
	}

	BaseBrick.prototype.hit = function () {
		brickHitSound.play();
		this.destroy();
		return "destroyed";
	}

	return BaseBrick
})()




var MultiBrick = (function () {

	var MultiBrick = BaseBrick.extend({
		init: function () { },
		color: {},
		hit: function () { }
	})

	return MultiBrick
})()
