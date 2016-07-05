define(["./main"], function (main) {
    return function Brick4(leftX, topY, width, height, context) {				//	Class for brick4   black unbrakable with onhit animation
        var that = this;
        this.leftX = Math.round(leftX);
        this.topY = Math.round(topY);
        this.rightX = Math.round(leftX + width);
        this.bottomY = Math.round(topY + height);
        this.centrX = Math.round(this.leftX + width / 2);
        this.centrY = Math.round(this.topY + height / 2);
        this.halfDiag = Math.round(Math.sqrt(width * width + height * height) / 2);
        this.deltaW = Math.round(width * 0.1);     //  Brick border size
        this.deltaH = Math.round(height * 0.1);
        this.color1 = "#888";
        this.color2 = "#666";
        this.color3 = "#444";
        this.color4 = "#222";
        this.color5 = "#000";
        this.start;
        this.duration = 1000;    //  ms
        this.stopAnimation = false;

        this.render = function () {
            //  1
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(that.leftX, that.topY);
            context.lineTo(that.rightX, that.topY);
            context.lineTo(that.rightX - that.deltaW, that.topY + that.deltaH);
            context.lineTo(that.leftX + that.deltaW, that.topY + that.deltaH);
            context.closePath();
            context.fillStyle = that.color1;
            context.fill();
            //  2
            context.beginPath();
            context.moveTo(that.leftX, that.topY);
            context.lineTo(that.leftX, that.bottomY);
            context.lineTo(that.leftX + that.deltaW, that.bottomY - that.deltaH);
            context.lineTo(that.leftX + that.deltaW, that.topY + that.deltaH);
            context.closePath();
            context.fillStyle = that.color2;
            context.fill();
            //  3
            context.beginPath();
            context.moveTo(that.leftX + that.deltaW, that.topY + that.deltaH);
            context.lineTo(that.leftX + that.deltaW, that.bottomY - that.deltaH);
            context.lineTo(that.rightX - that.deltaW, that.bottomY - that.deltaH);
            context.lineTo(that.rightX - that.deltaW, that.topY + that.deltaH);
            context.closePath();
            context.fillStyle = that.color3;
            context.fill();
            //  4
            context.beginPath();
            context.moveTo(that.rightX, that.topY);
            context.lineTo(that.rightX, that.bottomY);
            context.lineTo(that.rightX - that.deltaW, that.bottomY - that.deltaH);
            context.lineTo(that.rightX - that.deltaW, that.topY + that.deltaH);
            context.closePath();
            context.fillStyle = that.color4;
            context.fill();
            //  5
            context.beginPath();
            context.moveTo(that.leftX, that.bottomY);
            context.lineTo(that.rightX, that.bottomY);
            context.lineTo(that.rightX - that.deltaW, that.bottomY - that.deltaH);
            context.lineTo(that.leftX + that.deltaW, that.bottomY - that.deltaH);
            context.closePath();
            context.fillStyle = that.color5;
            context.fill();
        }
        this.destroy = function () {
            context.clearRect(that.leftX, that.topY, that.rightX - that.leftX, that.bottomY - that.topY);
            that.stopAnimation = true;
        }
        this.hit = function () {
            sound2.play();
            that.start = Date.now();
            renderHit();
        }
        return this
        function renderHit() {
            var time = Date.now();
            var pr = (time - that.start) / that.duration;
            var move = pr * 1.6 - 0.8;
            context.beginPath();
            context.moveTo(that.leftX + that.deltaW, that.topY + that.deltaH);
            context.lineTo(that.leftX + that.deltaW, that.bottomY - that.deltaH);
            context.lineTo(that.rightX - that.deltaW, that.bottomY - that.deltaH);
            context.lineTo(that.rightX - that.deltaW, that.topY + that.deltaH);
            context.closePath();
            var gradient = context.createLinearGradient(that.leftX + that.deltaW, that.topY + that.deltaH, that.rightX - that.deltaW, that.bottomY - that.deltaH);
            gradient.addColorStop((move + 0.1 < 0) ? 0 : (move + 0.1) > 1 ? 1 : (move + 0.1), that.color3);
            gradient.addColorStop((move + 0.35 < 0) ? 0 : (move + 0.35) > 1 ? 1 : (move + 0.35), '#222');
            gradient.addColorStop((move + 0.5 < 0) ? 0 : (move + 0.5) > 1 ? 1 : (move + 0.5), '#fff');
            gradient.addColorStop((move + 0.65 < 0) ? 0 : (move + 0.65) > 1 ? 1 : (move + 0.65), '#222');
            gradient.addColorStop((move + 0.9 < 0) ? 0 : (move + 0.9) > 1 ? 1 : (move + 0.9), that.color3);
            context.fillStyle = gradient;
            context.fill();
            if (pr < 1 && !that.stopAnimation) {
                requestAnimationFrame(renderHit);
            } else if (that.stopAnimation) {
                context.clearRect(that.leftX, that.topY, that.rightX - that.leftX, that.bottomY - that.topY);
            } else {
                context.beginPath();
                context.moveTo(that.leftX + that.deltaW, that.topY + that.deltaH);
                context.lineTo(that.leftX + that.deltaW, that.bottomY - that.deltaH);
                context.lineTo(that.rightX - that.deltaW, that.bottomY - that.deltaH);
                context.lineTo(that.rightX - that.deltaW, that.topY + that.deltaH);
                context.closePath();
                context.fillStyle = that.color3;
                context.fill();
            }
        }
    }

})
