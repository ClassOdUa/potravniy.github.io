define(function () {				//	Class for simplest brick
    var Brick = function () {
        //constructor
        //private props:
        this._brickColor = {
            green: {
                top: "#8e8",
                left: "#6c6",
                front: "#4a4",
                right: "#282",
                bottom: "#060"
            }
        };
        this._currentColor = this._brickColor.green;
        this._hitSound;
        this._destroyed = false;
        this._context;
        this._deltaW;
        this._deltaH;
        //public props:
        this.unbreakable;
        this.corner = {
            outer: {
                leftTop: {},
                rightTop: {},
                rightBottom: {},
                leftBottom: {}
            },
            inner: {
                leftTop: {},
                rightTop: {},
                rightBottom: {},
                leftBottom: {}
            }
        };
        this.border = {};
        this.center = {};
        this.halfDiag;
        return this;
    }
    Brick.prototype.init = function (leftX, topY, width, height, context) {
        this._deltaW = Math.round(width * 0.1);     //  distances between inner and outer lines
        this._deltaH = Math.round(height * 0.1);
        this._context = context;
        this.border = {
            left: Math.round(leftX),
            top: Math.round(topY),
            right: Math.round(leftX + width),
            bottom: Math.round(topY + height)
        }
        this.corner.outer.leftTop = {
            x: this.border.left,
            y: this.border.top
        }
        this.corner.outer.rightTop = {
            x: this.border.right,
            y: this.border.top
        }
        this.corner.outer.rightBottom = {
            x: this.border.right,
            y: this.border.bottom
        }
        this.corner.outer.leftBottom = {
            x: this.border.left,
            y: this.border.bottom
        }
        this.corner.inner.leftTop = {
            x: this.border.left + this._deltaW,
            y: this.border.top + this._deltaH
        }
        this.corner.inner.rightTop = {
            x: this.border.right - this._deltaW,
            y: this.border.top + this._deltaH
        }
        this.corner.inner.rightBottom = {
            x: this.border.right - this._deltaW,
            y: this.border.bottom - this._deltaH
        }
        this.corner.inner.leftBottom = {
            x: this.border.left + this._deltaW,
            y: this.border.bottom - this._deltaH
        }
        this.center = {
            x: (this.border.right + this.border.left) / 2,
            y: (this.border.bottom + this.border.top) / 2
        }
        this.halfDiag = Math.hypot(width, height) / 2;
    }
    Brick.prototype.render = function () {
        if (!this._destroyed) {
            this._context.lineWidth = 2;
            //  top
            this._context.beginPath();
            this._context.moveTo(this.corner.outer.leftTop.x, this.corner.outer.leftTop.y);
            this._context.lineTo(this.corner.outer.rightTop.x, this.corner.outer.rightTop.y);
            this._context.lineTo(this.corner.inner.rightTop.x, this.corner.inner.rightTop.y);
            this._context.lineTo(this.corner.inner.leftTop.x, this.corner.inner.leftTop.y);
            this._context.closePath();
            this._context.fillStyle = this._currentColor.top;
            this._context.fill();
            //  left
            this._context.beginPath();
            this._context.moveTo(this.corner.outer.leftTop.x, this.corner.outer.leftTop.y);
            this._context.lineTo(this.corner.outer.leftBottom.x, this.corner.outer.leftBottom.y);
            this._context.lineTo(this.corner.inner.leftBottom.x, this.corner.inner.leftBottom.y);
            this._context.lineTo(this.corner.inner.leftTop.x, this.corner.inner.leftTop.y);
            this._context.closePath();
            this._context.fillStyle = this._currentColor.left;
            this._context.fill();
            //  front
            this._context.beginPath();
            this._context.lineTo(this.corner.inner.leftTop.x, this.corner.inner.leftTop.y);
            this._context.lineTo(this.corner.inner.rightTop.x, this.corner.inner.rightTop.y);
            this._context.lineTo(this.corner.inner.rightBottom.x, this.corner.inner.rightBottom.y);
            this._context.lineTo(this.corner.inner.leftBottom.x, this.corner.inner.leftBottom.y);
            this._context.closePath();
            this._context.fillStyle = this._currentColor.front;
            this._context.fill();
            //  right
            this._context.beginPath();
            this._context.moveTo(this.corner.outer.rightTop.x, this.corner.outer.rightTop.y);
            this._context.lineTo(this.corner.outer.rightBottom.x, this.corner.outer.rightBottom.y);
            this._context.lineTo(this.corner.inner.rightBottom.x, this.corner.inner.rightBottom.y);
            this._context.lineTo(this.corner.inner.rightTop.x, this.corner.inner.rightTop.y);
            this._context.closePath();
            this._context.fillStyle = this._currentColor.right;
            this._context.fill();
            //  bottom
            this._context.beginPath();
            this._context.moveTo(this.corner.outer.rightBottom.x, this.corner.outer.rightBottom.y);
            this._context.lineTo(this.corner.outer.leftBottom.x, this.corner.outer.leftBottom.y);
            this._context.lineTo(this.corner.inner.leftBottom.x, this.corner.inner.leftBottom.y);
            this._context.lineTo(this.corner.inner.rightBottom.x, this.corner.inner.rightBottom.y);
            this._context.closePath();
            this._context.fillStyle = this._currentColor.bottom;
            this._context.fill();
        }
    }
    Brick.prototype.destroy = function () {
        this._context.clearRect(this.border.left, this.border.top, this.border.right - this.border.left, this.border.bottom - this.border.top);
        this._destroyed = true;
    }
    return Brick
})
