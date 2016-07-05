define(["./main"], function(main){
    //	Class for flying ball
    return function Circle(vX, vY, slider, glued, x, y) {
        var that = this;
        var intervalID;
        this.power = false;
        this.darkColor = "#440";
        this.lightColor = "#ff7";
        this.r = Math.round((inboxViewWidth + inboxViewHeight) / 100);
        if (x && y) {
            this.dX = x - slider.x;
            this.dY = y - slider.y;
            this.x = x;
            this.y = y;
        } else {
            this.dX = -slider.width / 10;
            this.dY = -slider.height - this.r - 1;
            this.x = slider.x + this.dX;
            this.y = slider.x + this.dY;
        }
        this.vX = vX;			//	px/sec
        this.vY = vY;			//	px/sec
        this.power = false;
        this.acceleration = 1;
        this.isGluedToSlider = glued;
        this.render = function () {
            ctxC.beginPath();
            ctxC.arc(that.x, that.y, that.r, 0, 2 * Math.PI, true);
            ctxC.closePath();
            var gradient = ctxC.createRadialGradient(this.x, this.y, this.r, this.x - 0.3 * this.r, this.y - 0.3 * this.r, 0);
            gradient.addColorStop(1, that.lightColor);
            ctxC.fillStyle = gradient;
            ctxC.shadowColor = "#f00";
            if (that.power) {
                gradient.addColorStop(0, "#f00");
                ctxC.shadowOffsetX = -that.vX * 3 / Math.sqrt(that.vX * that.vX + that.vY * that.vY);
                ctxC.shadowOffsetY = -that.vY * 3 / Math.sqrt(that.vX * that.vX + that.vY * that.vY);
                ctxC.shadowBlur = that.r / 2;
            } else {
                gradient.addColorStop(0, that.darkColor);
                ctxC.shadowOffsetX = 0;
                ctxC.shadowOffsetY = 0;
                ctxC.shadowBlur = 0;
            }
            ctxC.fill();
            ctxC.shadowOffsetX = 0;
            ctxC.shadowOffsetY = 0;
            ctxC.shadowBlur = 0;
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
            that.dY = -slider.height - that.r - 1;
            that.x = slider.x + that.dX;
            that.y = slider.x + that.dY;
            that.vX = vX;			//	px/sec
            that.vY = vY;			//	px/sec
            that.power = false;
            that.acceleration = 1;
            that.isGluedToSlider = true;
            intervalID = setInterval(that.updatePosition, 10);
        }
        intervalID = setInterval(that.updatePosition, 10);


        //  Events
        $body.addEventListener("click", unGlue)

        //  Functions
        function unGlue() {
            if (that.isGluedToSlider) {
                that.isGluedToSlider = false;
                clearInterval(intervalID);
            }
        }

        return this
    }
})