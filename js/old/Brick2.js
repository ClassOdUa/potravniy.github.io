define(["./main"], function (main) {
    return function Brick2(leftX, topY, width, height, context) {				//	Class for brick2    breakable with few hits
        var that = this;
        this.hitsForDestroy = 3;
        this.leftX = Math.round(leftX);
        this.topY = Math.round(topY);
        this.rightX = Math.round(leftX + width);
        this.bottomY = Math.round(topY + height);
        this.centrX = Math.round(this.leftX + width / 2);
        this.centrY = Math.round(this.topY + height / 2);
        this.halfDiag = Math.round(Math.sqrt(width * width + height * height) / 2);
        this.deltaW = Math.round(width * 0.1);     //  Brick border size
        this.deltaH = Math.round(height * 0.1);
        this.color1 = "#e80";
        this.color2 = "#c60";
        this.color3 = "#a40";
        this.color4 = "#820";
        this.color5 = "#610";
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
        }
        this.hit = function () {
            that.hitsForDestroy--;
            if (that.hitsForDestroy === 2) {
                this.color1 = "#ee0";
                this.color2 = "#cc0";
                this.color3 = "#aa0";
                this.color4 = "#880";
                this.color5 = "#660";
                sound2.play();
                that.render();
            } else if (that.hitsForDestroy === 1) {
                this.color1 = "#8e8";
                this.color2 = "#6c6";
                this.color3 = "#4a4";
                this.color4 = "#282";
                this.color5 = "#060";
                sound2.play();
                that.render();
            } else if (that.hitsForDestroy === 0) {
                sound1.play();
                context.clearRect(that.leftX, that.topY, that.rightX - that.leftX, that.bottomY - that.topY);
                return "destroyed";
            }
        }
        return this
    }

})
