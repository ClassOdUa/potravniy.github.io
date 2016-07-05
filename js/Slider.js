define(["./main"], function (main) {
    return function Slider() {				//	Class for slider
        var that = this;
        this.store = {
            darkColor: "#000",
            lightColor: "#7ff",
            lastRenderedPosition: {},
            mouseX: Math.round(inboxViewWidth / 2 + borderLineWidth),
            loosingAnimationIntervalID: -1,
            stikyDuration: 30000,
            setStikyTimeoutID: 0
        }
        this.reset = function () {
            that.height = Math.round(viewHeight * 0.03);
            that.width = Math.round(viewWidth * 0.15);
            that.x = Math.round(inboxViewWidth / 2 + borderLineWidth);  // Absolute x position of slider's center
            that.leftX = Math.round(that.x - that.width / 2);           // Absolute x position of slider's left end
            that.rightX = Math.round(that.leftX + that.width);          // Absolute x position of slider's right end
            that.y = Math.round(viewHeight - that.height / 4);          // Absolute y position of slider's bottom line
            that.topCoord = that.y - that.height;                       // Absolute y position of slider's top line
            that.leftStraightX = that.leftX + that.height;              // Absolute x position of slider's flat part left end
            that.rightStraightX = that.rightX - that.height;            // Absolute x position of slider's flat part right end
            that.sticky = false;
            clearTimeout(that.store.setStikyTimeoutID);
            that.store.lastRenderedPosition = {
                xStart: that.leftX,
                xEnd: that.rightX,
                sticky: false
            }
        }
        this.reset();

        $body.addEventListener("mousemove", readMouseCoords);

        this.setSticky = function (){
            if (that.store.setStikyTimeoutID) clearTimeout(that.store.setStikyTimeoutID);
            that.sticky = true;
            that.store.setStikyTimeoutID = setTimeout(function () {
                that.sticky = false;
            }, that.store.stikyDuration);
        }
        this.render = function () {
            if (that.store.lastRenderedPosition.sticky) {
                ctx.clearRect(that.store.lastRenderedPosition.xStart + 4, that.y - that.height - 4, that.store.lastRenderedPosition.width + 4, that.height);
            } else {
                ctx.clearRect(that.store.lastRenderedPosition.xStart, that.y - that.height, that.store.lastRenderedPosition.width, that.height);
            }
            drawLeftRoundedPart();
            drawHorisontalPart();
            drawRightRoundedPart();
            if (that.sticky) drawGlue();
            function drawGlue() {
                ctx.beginPath();
                ctx.arc(that.leftStraightX, that.y, that.height, Math.PI, 1.5 * Math.PI);
                ctx.lineTo(that.rightStraightX, that.topCoord);
                ctx.arc(that.rightStraightX, that.y, that.height, 1.5 * Math.PI, 2 * Math.PI);
                ctx.lineWidth = 5;
                ctx.strokeStyle = "#cc0";
                ctx.stroke();
            }
            function drawLeftRoundedPart() {
                ctx.beginPath();
                ctx.arc(that.leftX + that.height, that.y, that.height, Math.PI, 1.5 * Math.PI);
                ctx.lineTo(that.leftX + that.height, that.y);
                ctx.closePath();
                var gradient = ctx.createRadialGradient(that.leftX + that.height, that.y, that.height, that.leftX + that.height, that.y, 0);
                gradient.addColorStop(0, that.store.darkColor);
                gradient.addColorStop(1, that.store.lightColor);
                ctx.fillStyle = gradient;
                ctx.fill();
            }
            function drawHorisontalPart() {
                ctx.beginPath();
                ctx.moveTo(that.leftX + that.height, that.y)
                ctx.lineTo(that.leftX + that.height, that.y - that.height);
                ctx.lineTo(that.rightX - that.height, that.y - that.height);
                ctx.lineTo(that.rightX - that.height, that.y);
                ctx.closePath();
                gradient = ctx.createLinearGradient(0, that.y - that.height, 0, that.y)
                gradient.addColorStop(0, that.store.darkColor);
                gradient.addColorStop(1, that.store.lightColor);
                ctx.fillStyle = gradient;
                ctx.fill();
            }
            function drawRightRoundedPart() {
                ctx.beginPath();
                ctx.arc(that.rightX - that.height, that.y, that.height, 1.5 * Math.PI, 2 * Math.PI);
                ctx.lineTo(that.rightX - that.height, that.y);
                ctx.closePath();
                gradient = ctx.createRadialGradient(that.rightX - that.height, that.y, that.height, that.rightX - that.height, that.y, 0);
                gradient.addColorStop(0, that.store.darkColor);
                gradient.addColorStop(1, that.store.lightColor);
                ctx.fillStyle = gradient;
                ctx.fill();
                that.store.lastRenderedPosition = {
                    xStart: that.leftX,
                    width: that.width,
                    sticky: that.sticky
                }
            }
        }
        this.loosingAnimation = function () {
            that.store.loosingAnimationIntervalID = setInterval(function () {
                that.y += 3;
                that.topCoord += 3;
                if (that.topCoord - 10 > viewHeight) {
                    clearInterval(that.store.loosingAnimationIntervalID);
                }
            }, 30)
        }
        this.updatePosition = function () {
            var leftX = Math.round(that.store.mouseX - that.width / 2);
            var rightX = Math.round(that.store.mouseX + that.width / 2);
            if (leftX >= borderLineWidth && rightX <= inboxViewWidth + borderLineWidth) {
                that.x = that.store.mouseX;
                that.leftX = leftX;
                that.rightX = rightX;
                that.leftStraightX = that.leftX + that.height;
                that.rightStraightX = that.rightX - that.height;
            } else if (leftX < borderLineWidth) {
                that.leftX = borderLineWidth;
                that.rightX = that.leftX + that.width;
                that.x = that.leftX + that.width / 2;
                that.leftStraightX = that.leftX + that.height;
                that.rightStraightX = that.rightX - that.height;
            } else if (rightX > inboxViewWidth + borderLineWidth) {
                that.rightX = inboxViewWidth + borderLineWidth;
                that.leftX = that.rightX - that.width;
                that.x = that.rightX - that.width / 2;
                that.leftStraightX = that.leftX + that.height;
                that.rightStraightX = that.rightX - that.height;
            }
        }
        this.stopSliderMove = function () {
            $body.removeEventListener("mousemove", readMouseCoords);
        }
        function readMouseCoords(event) {
            that.store.mouseX = event.clientX;
        }
        return this
    }

})
