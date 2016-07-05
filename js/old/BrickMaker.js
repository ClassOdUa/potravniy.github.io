define(["./BrickBasic"], function (BrickBasic) {

    return function BrickMaker(leftX, topY, widht, height, canvasContext, brickType) {

        if (brickType === 'basic') {
            return new BrickBasic(leftX, topY, widht, height, canvasContext, false);
        } else if (brickType === 'multiHit') {
            return new BrickMultiHit(leftX, topY, widht, height, canvasContext);
        } else if (brickType === 'surprise') {
            return new BrickSurprise(leftX, topY, widht, height, canvasContext);
        } else if (brickType === 'unbreakable') {
            return new BrickUnbreakable(leftX, topY, widht, height, canvasContext);
        } else if (brickType === 'tnt') {
            return new BrickTNT(leftX, topY, widht, height, canvasContext);
        }

        function BrickMultiHit(leftX, topY, widht, height, canvasContext) {
            BrickBasic.call(this, leftX, topY, widht, height, canvasContext, extention);
            function extention(that) {
                that.hitsForDestroy = 3;
                that.brickColor.orange = ["#e80", "#c60", "#a40", "#820", "#610"];
                that.brickColor.yellow = ["#ee0", "#cc0", "#aa0", "#880", "#660"];
                that.currentColor = that.brickColor.orange;
                that.hit = function () {
                    that.hitsForDestroy--;
                    if (that.hitsForDestroy === 2) {
                        that.currentColor = that.brickColor.yellow;
                        metalHitSound.play();
                        that.render();
                    } else if (that.hitsForDestroy === 1) {
                        that.currentColor = that.brickColor.green;
                        metalHitSound.play();
                        that.render();
                    } else if (that.hitsForDestroy === 0) {
                        brickHitSound.play();
                        that.destroy();
                        return "destroyed";
                    }
                };
            }
        }
        function BrickSurprise(leftX, topY, widht, height, canvasContext) {
            BrickBasic.call(this, leftX, topY, widht, height, canvasContext, extention);
            function extention(that) {
                that.hitsForDestroy = 2;
                that.sign = "S";
                that.brickColor.red = ["#f44", "#d33", "#b22", "#911", "#700"];
                that.currentColor = that.brickColor.red;
                var oldRender = that.render;
                that.render = function () {
                    oldRender.apply(that, arguments);
                    if (that.sign) {
                        that.context.fillStyle = "black";
                        that.context.font = viewHeight * 0.03 + 'px Arial';
                        that.context.textAlign = "center";
                        that.context.textBaseline = 'middle';
                        that.context.fillText(that.sign, that.center.x, that.center.y);
                    }
                };
                that.hit = function () {
                    that.hitsForDestroy--;
                    if (that.hitsForDestroy === 1) {
                        surprise.play();
                        that.sign = "";
                        that.currentColor = that.brickColor.green;
                        that.render();
                    } else if (that.hitsForDestroy === 0) {
                        brickHitSound.play();
                        that.destroy();
                        return "destroyed";
                    }
                };
            }
        }
        function BrickUnbreakable(leftX, topY, widht, height, canvasContext) {
            BrickBasic.call(this, leftX, topY, widht, height, canvasContext, extention);
            function extention(that) {
                that.unbreakable = true;
                that.brickColor.black = ["#888", "#666", "#444", "#222", "#000"];
                that.currentColor = that.brickColor.black;
                that.animationStartTime;
                that.duration = 1000;    //  ms
                that.isAnimationActive = false;
                var oldDestroy = that.destroy;
                that.destroy = function () {
                    oldDestroy.apply(that, arguments)
                    that.isAnimationActive = false;
                };
                that.hit = function () {
                    metalHitSound.play();
                    that.animationStartTime = Date.now();
                    that.isAnimationActive = true
                }
                var oldRender = that.render;
                that.render = function () {
                    oldRender.apply(that);
                    if (that.isAnimationActive) that.renderHit();
                }
                that.renderHit = function () {
                    var time = Date.now();
                    var pr = (time - that.animationStartTime) / that.duration;
                    var move = pr * 1.6 - 0.8;
                    that.context.beginPath();
                    that.context.moveTo(that.point1.x, that.point1.y);
                    that.context.lineTo(that.point2.x, that.point2.y);
                    that.context.lineTo(that.point3.x, that.point3.y);
                    that.context.lineTo(that.point4.x, that.point4.y);
                    that.context.closePath();
                    var gradient = that.context.createLinearGradient(that.point1.x, that.point1.y, that.point3.x, that.point3.y);
                    gradient.addColorStop((move + 0.1 < 0) ? 0 : (move + 0.1) > 1 ? 1 : (move + 0.1), that.currentColor[2]);
                    gradient.addColorStop((move + 0.35 < 0) ? 0 : (move + 0.35) > 1 ? 1 : (move + 0.35), '#222');
                    gradient.addColorStop((move + 0.5 < 0) ? 0 : (move + 0.5) > 1 ? 1 : (move + 0.5), '#fff');
                    gradient.addColorStop((move + 0.65 < 0) ? 0 : (move + 0.65) > 1 ? 1 : (move + 0.65), '#222');
                    gradient.addColorStop((move + 0.9 < 0) ? 0 : (move + 0.9) > 1 ? 1 : (move + 0.9), that.currentColor[2]);
                    that.context.fillStyle = gradient;
                    that.context.fill();
                    if (pr >= 1)  {
                        that.isAnimationActive = false;
                        that.context.beginPath();
                        that.context.lineTo(that.point1.x, that.point1.y);
                        that.context.lineTo(that.point2.x, that.point2.y);
                        that.context.lineTo(that.point3.x, that.point3.y);
                        that.context.lineTo(that.point4.x, that.point4.y);
                        that.context.closePath();
                        that.context.fillStyle = that.currentColor[2];
                        that.context.fill();
                    }
                }
            }
        }
        function BrickTNT(leftX, topY, widht, height, canvasContext) {
            BrickBasic.call(this, leftX, topY, widht, height, canvasContext, extention);
            function extention(that) {
                that.sign = "TNT";
                that.brickColor.black = ["#888", "#666", "#444", "#222", "#000"];
                that.currentColor = that.brickColor.black;
                var oldRender = that.render;
                that.render = function () {
                    oldRender.apply(that);
                    if (that.sign) {
                        that.context.fillStyle = "#900";
                        that.context.font = viewHeight * 0.03 + 'px Arial';
                        that.context.textAlign = "center";
                        that.context.textBaseline = 'middle';
                        that.context.fillText(that.sign, that.center.x, that.center.y);
                    }
                };
                that.hit = function () {
                    bomb.play();
                    that.destroy();
                    return "bomb";
                }
            }
        }
    }
})