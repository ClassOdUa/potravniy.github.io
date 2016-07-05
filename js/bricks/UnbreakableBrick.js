define(["./BaseBrick", "../extend"], function (Brick, extend) {
    var Unbreakable = function () {
        Brick.apply(this);
        this._hitSound = metalHitSound;
        this.unbreakable = true;
        this._brickColor.black = {
            top: "#888",
            left: "#666",
            front: "#444",
            right: "#222",
            bottom: "#000"
        };
        this._currentColor = this._brickColor.black;
        this._animationStartTime;
        
        this._duration = 1000;    //  ms
        this._isAnimationActive = false;
        this._renderHit = function () {
            var time = Date.now();
            var pr = (time - this._animationStartTime) / this._duration;
            var move = pr * 1.6 - 0.8;
            this._context.beginPath();
            this._context.moveTo(this.corner.inner.leftTop.x, this.corner.inner.leftTop.y);
            this._context.lineTo(this.corner.inner.rightTop.x, this.corner.inner.rightTop.y);
            this._context.lineTo(this.corner.inner.rightBottom.x, this.corner.inner.rightBottom.y);
            this._context.lineTo(this.corner.inner.leftBottom.x, this.corner.inner.leftBottom.y);
            this._context.closePath();
            var gradient = this._context.createLinearGradient(this.corner.inner.leftTop.x, this.corner.inner.leftTop.y, this.corner.inner.rightBottom.x, this.corner.inner.rightBottom.y);
            gradient.addColorStop((move + 0.1 < 0) ? 0 : (move + 0.1) > 1 ? 1 : (move + 0.1), this._currentColor.front);
            gradient.addColorStop((move + 0.35 < 0) ? 0 : (move + 0.35) > 1 ? 1 : (move + 0.35), '#222');
            gradient.addColorStop((move + 0.5 < 0) ? 0 : (move + 0.5) > 1 ? 1 : (move + 0.5), '#fff');
            gradient.addColorStop((move + 0.65 < 0) ? 0 : (move + 0.65) > 1 ? 1 : (move + 0.65), '#222');
            gradient.addColorStop((move + 0.9 < 0) ? 0 : (move + 0.9) > 1 ? 1 : (move + 0.9), this._currentColor.front);
            this._context.fillStyle = gradient;
            this._context.fill();
            if (pr >= 1) {
                this._isAnimationActive = false;
                this._context.beginPath();
                this._context.lineTo(this.corner.inner.leftTop.x, this.corner.inner.leftTop.y);
                this._context.lineTo(this.corner.inner.rightTop.x, this.corner.inner.rightTop.y);
                this._context.lineTo(this.corner.inner.rightBottom.x, this.corner.inner.rightBottom.y);
                this._context.lineTo(this.corner.inner.leftBottom.x, this.corner.inner.leftBottom.y);
                this._context.closePath();
                this._context.fillStyle = this._currentColor.front;
                this._context.fill();
            }
        }

        return this;
    }
    extend(Unbreakable, Brick);
    Unbreakable.prototype.destroy = function () {
        Unbreakable.superclass.destroy.apply(this);
        this._isAnimationActive = false;
    };
    Unbreakable.prototype.hit = function () {
        this._hitSound.play();
        this._animationStartTime = Date.now();
        this._isAnimationActive = true;
    }
    Unbreakable.prototype.render = function () {
        Unbreakable.superclass.render.apply(this);
        if (this._isAnimationActive) this._renderHit();
    }

    return Unbreakable;
})