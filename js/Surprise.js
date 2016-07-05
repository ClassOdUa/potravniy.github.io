define([], function () {
    return function Surprise(x, y, width, height) {
        var that = this;
        var values = (level < 5) ? ["slow", "fast", "big", "small", "power", "glue", "x2", "life"] : ["slow", "fast", "big", "small", "power", "glue", "x2"];
        //var values = ["glue", "x2"];
        var speed = viewHeight / 3;    //  px/sec
        this.value = values[Math.floor(values.length * Math.random())];
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.oldStrokeStyle = "#f00";
        

        this.updatePosition = function (time, startTime) {
            if (that.y <= viewHeight + 100) {
                that.y += speed * (time - startTime) / 1000;
            }
        }
        this.render = function () {
            ctx.font = viewWidth * 0.03 + 'px Courgette';
            ctx.textAlign = "center";
            ctx.textBaseline = 'middle';
            var newStyle = newStyles();
            ctx.fillStyle = newStyle[1];
            ctx.strokeStyle = newStyle[0];
            ctx.lineWidth = 1;
            ctx.fillText(that.value, that.x, that.y, that.width);
            ctx.strokeText(that.value, that.x, that.y, that.width);
        }
        function newStyles() {
            var newStyle = [];
            if (that.oldStrokeStyle === "#f00") {
                newStrokeStyle = "#f0f";
                newFillStyle = "#ca0";
            } else if (that.oldStrokeStyle === "#f0f") {
                newStrokeStyle = "#ff0";
                newFillStyle = "#c0a";
            } else if (that.oldStrokeStyle === "#ff0") {
                newStrokeStyle = "#f00";
                newFillStyle = "#caa";
            }
            that.oldStrokeStyle = newStrokeStyle;
            newStyle[0] = newStrokeStyle;
            newStyle[1] = newFillStyle;
            return newStyle;
        }
    }
})
