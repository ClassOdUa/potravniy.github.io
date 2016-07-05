define([""], function(){
    //	Class for flying ball
    return function Ball(vX, vY, slider, glued, x, y) {
        var that = this;
        this.store = {
            intervalID: -1,
            darkColor: "#440",
            lightColor: "#ff7",
            powerColor: "#f00",
            powerTimeTimeoutID: 0,
            powerTime: 20000
        }
        this.power = false;
        this.r = Math.round((inboxViewWidth + inboxViewHeight) / 100);
        if (x && y) {
            this.x = Math.round(x);
            this.y = Math.round(y);
            this.dX = x - slider.x;
            this.dY = y - slider.y;
        } else {
            this.dX = -slider.width / 10;
            this.dY = -slider.height - this.r;
            this.x = slider.x + this.dX;
            this.y = slider.x + this.dY;
        }
        this.vX = vX;			//	px/sec
        this.vY = vY;			//	px/sec
        this.acceleration = 1;
        this.isGluedToSlider = glued;
        this.render = function () {
            ctx.beginPath();
            ctx.arc(that.x, that.y, that.r, 0, 2 * Math.PI, true);
            ctx.closePath();
            var gradient = ctx.createRadialGradient(that.x, that.y, that.r, that.x - 0.3 * that.r, that.y - 0.3 * that.r, 0);
            gradient.addColorStop(1, that.store.lightColor);
            ctx.fillStyle = gradient;
            ctx.shadowColor = that.store.powerColor;
            if (that.power) {
                gradient.addColorStop(0, that.store.powerColor);
                ctx.shadowOffsetX = -that.vX * 3 / Math.hypot(that.vX, that.vY);
                ctx.shadowOffsetY = -that.vY * 3 / Math.hypot(that.vX, that.vY);
                ctx.shadowBlur = that.r / 2;
            } else {
                gradient.addColorStop(0, that.store.darkColor);
            }
            ctx.fill();
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 0;
        }
        this.updatePosition = function (time, startTime) {
            if (that.y <= viewHeight + that.r && !that.isGluedToSlider) {
                that.x += that.vX * that.acceleration * (time - startTime) / 1000;
                that.y += that.vY * that.acceleration * (time - startTime) / 1000;
                that.timeOfCurrentPosition = time;
            } else if (that.isGluedToSlider) {
                that.x = slider.x + that.dX;
                that.y = slider.y + that.dY;
            }
        }
        this.reset = function () {
            that.r = Math.round((inboxViewWidth + inboxViewHeight) / 100);
            that.dX = -slider.width / 10;
            that.dY = -slider.height - that.r;
            that.x = slider.x + that.dX;
            that.y = slider.y + that.dY;
            that.vX = vX;			//	px/sec
            that.vY = vY;			//	px/sec
            that.power = false;
            if (that.store.powerTimeTimeoutID) clearTimeout(that.store.powerTimeTimeoutID);
            that.acceleration = 1;
            that.isGluedToSlider = true;
            intervalID = setInterval(that.updatePosition, 10);
        }
        if (that.isGluedToSlider) intervalID = setInterval(that.updatePosition, 10);
        this.setPowerOn = function () {
            if (that.store.powerTimeTimeoutID) clearTimeout(that.store.powerTimeTimeoutID);
            that.power = true;
            that.store.powerTimeTimeoutID = setTimeout(function () {
                that.power = false;
                powerTimeTimeoutID = undefined;
            }, that.store.powerTime)
        }

        //  Events
        $body.addEventListener("click", function () {
            that.unGlue();
        });

        //  Functions
        this.unGlue = function () {
            if (that.isGluedToSlider) {
                that.isGluedToSlider = false;
                clearInterval(intervalID);
            }
        }

        return this
    }
})