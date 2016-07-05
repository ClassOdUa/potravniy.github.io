define(["./BrickBasic"], function (BrickBasic) {

    return function BrickMaker(leftX, topY, widht, height, canvasContext, brickType) {


        function extend(Child, Parent) {
            var F = function () { }
            F.prototype = Parent.prototype
            Child.prototype = new F()
            Child.prototype.constructor = Child
            Child.superclass = Parent.prototype
        }

        switch (brickType) {
            case 'basic':
                return new BrickBasic(leftX, topY, widht, height, canvasContext);
                break;
            case 'multiHit':
                return new BrickMultiHit(leftX, topY, widht, height, canvasContext);
                break;
            case 'surprise':
                return new BrickSurprise(leftX, topY, widht, height, canvasContext);
                break;
            case 'unbreakable':
                return new BrickUnbreakable(leftX, topY, widht, height, canvasContext);
                break;
            case 'tnt':
                return new BrickTNT(leftX, topY, widht, height, canvasContext);
                break;
        }


        function BrickMultiHit(leftX, topY, widht, height, canvasContext) {
            BrickBasic.call(this, leftX, topY, widht, height, canvasContext);
            extention.call(this);
            function extention() {
                this.hitsForDestroy = 3;
                this.brickColor.orange = ["#e80", "#c60", "#a40", "#820", "#610"];
                this.brickColor.yellow = ["#ee0", "#cc0", "#aa0", "#880", "#660"];
                this.currentColor = this.brickColor.orange;
                this.hit = function () {
                    this.hitsForDestroy--;
                    if (this.hitsForDestroy === 2) {
                        this.currentColor = this.brickColor.yellow;
                        metalHitSound.play();
                        this.render();
                    } else if (this.hitsForDestroy === 1) {
                        this.currentColor = this.brickColor.green;
                        metalHitSound.play();
                        this.render();
                    } else if (this.hitsForDestroy === 0) {
                        brickHitSound.play();
                        this.destroy();
                        return "destroyed";
                    }
                };
            }
        }
        function BrickSurprise(leftX, topY, widht, height, canvasContext) {
            BrickBasic.call(this, leftX, topY, widht, height, canvasContext);
            extention.call(this);
            function extention() {
                this.hitsForDestroy = 2;
                this.sign = "S";
                this.brickColor.red = ["#f44", "#d33", "#b22", "#911", "#700"];
                this.currentColor = this.brickColor.red;
                var oldRender = this.render;
                this.render = function () {
                    oldRender.apply(this, arguments);
                    if (this.sign) {
                        this.context.fillStyle = "black";
                        this.context.font = viewHeight * 0.03 + 'px Arial';
                        this.context.textAlign = "center";
                        this.context.textBaseline = 'middle';
                        this.context.fillText(this.sign, this.center.x, this.center.y);
                    }
                };
                this.hit = function () {
                    this.hitsForDestroy--;
                    if (this.hitsForDestroy === 1) {
                        surpriseSound.play();
                        this.sign = "";
                        this.currentColor = this.brickColor.green;
                        this.render();
                    } else if (this.hitsForDestroy === 0) {
                        brickHitSound.play();
                        this.destroy();
                        return "destroyed";
                    }
                };
            }
        }
        function BrickUnbreakable(leftX, topY, widht, height, canvasContext) {
            BrickBasic.call(this, leftX, topY, widht, height, canvasContext);
            extention.call(this);
            function extention() {
                this.unbreakable = true;
                this.brickColor.black = ["#888", "#666", "#444", "#222", "#000"];
                this.currentColor = this.brickColor.black;
                this.animationStartTime;
                this.duration = 1000;    //  ms
                this.isAnimationActive = false;
                var oldDestroy = this.destroy;
                this.destroy = function () {
                    oldDestroy.apply(this, arguments)
                    this.isAnimationActive = false;
                };
                this.hit = function () {
                    metalHitSound.play();
                    this.animationStartTime = Date.now();
                    this.isAnimationActive = true
                }
                var oldRender = this.render;
                this.render = function () {
                    oldRender.apply(this);
                    if (this.isAnimationActive) this.renderHit();
                }
                this.renderHit = function () {
                    var time = Date.now();
                    var pr = (time - this.animationStartTime) / this.duration;
                    var move = pr * 1.6 - 0.8;
                    this.context.beginPath();
                    this.context.moveTo(this.corner.inner.leftTop.x, this.corner.inner.leftTop.y);
                    this.context.lineTo(this.corner.inner.rightTop.x, this.corner.inner.rightTop.y);
                    this.context.lineTo(this.corner.inner.rightBottom.x, this.corner.inner.rightBottom.y);
                    this.context.lineTo(this.corner.inner.leftBottom.x, this.corner.inner.leftBottom.y);
                    this.context.closePath();
                    var gradient = this.context.createLinearGradient(this.corner.inner.leftTop.x, this.corner.inner.leftTop.y, this.corner.inner.rightBottom.x, this.corner.inner.rightBottom.y);
                    gradient.addColorStop((move + 0.1 < 0) ? 0 : (move + 0.1) > 1 ? 1 : (move + 0.1), this.currentColor[2]);
                    gradient.addColorStop((move + 0.35 < 0) ? 0 : (move + 0.35) > 1 ? 1 : (move + 0.35), '#222');
                    gradient.addColorStop((move + 0.5 < 0) ? 0 : (move + 0.5) > 1 ? 1 : (move + 0.5), '#fff');
                    gradient.addColorStop((move + 0.65 < 0) ? 0 : (move + 0.65) > 1 ? 1 : (move + 0.65), '#222');
                    gradient.addColorStop((move + 0.9 < 0) ? 0 : (move + 0.9) > 1 ? 1 : (move + 0.9), this.currentColor[2]);
                    this.context.fillStyle = gradient;
                    this.context.fill();
                    if (pr >= 1)  {
                        this.isAnimationActive = false;
                        this.context.beginPath();
                        this.context.lineTo(this.corner.inner.leftTop.x, this.corner.inner.leftTop.y);
                        this.context.lineTo(this.corner.inner.rightTop.x, this.corner.inner.rightTop.y);
                        this.context.lineTo(this.corner.inner.rightBottom.x, this.corner.inner.rightBottom.y);
                        this.context.lineTo(this.corner.inner.leftBottom.x, this.corner.inner.leftBottom.y);
                        this.context.closePath();
                        this.context.fillStyle = this.currentColor[2];
                        this.context.fill();
                    }
                }
            }
        }
        function BrickTNT(leftX, topY, widht, height, canvasContext) {
            BrickBasic.call(this, leftX, topY, widht, height, canvasContext);
            extention.call(this);
            function extention() {
                this.sign = "TNT";
                this.brickColor.black = ["#888", "#666", "#444", "#222", "#000"];
                this.currentColor = this.brickColor.black;
                var oldRender = this.render;
                this.render = function () {
                    oldRender.apply(this);
                    if (this.sign) {
                        this.context.fillStyle = "#900";
                        this.context.font = viewHeight * 0.03 + 'px Arial';
                        this.context.textAlign = "center";
                        this.context.textBaseline = 'middle';
                        this.context.fillText(this.sign, this.center.x, this.center.y);
                    }
                };
                this.hit = function () {
                    bombSound.play();
                    this.destroy();
                    return "bomb";
                }
            }
        }
    }
})