define(["./BaseBrick", "../extend"], function (Brick, extend) {

    var Surprise = function () {
        Brick.apply(this);
        this.unbreakable = false;
        this.hitsForDestroy = 2;
        this.sign = "S";
        this._brickColor.red = {
            top: "#e46",
            left: "#c35",
            front: "#a24",
            right: "#813",
            bottom: "#602"
        };
        this._currentColor = this._brickColor.red;
        this._hitSound = surpriseSound;
        return this;
    }
    extend(Surprise, Brick);
    Surprise.prototype.hit = function () {
        this.hitsForDestroy--;
        if (this.hitsForDestroy === 1) {
            this._hitSound.play();
            this.sign = "";
            this._currentColor = this._brickColor.green;
            this._hitSound = brickHitSound;
            this.render();
            return "surprise"
        } else if (this.hitsForDestroy === 0) {
            this._hitSound.play();
            this.destroy();
            return "destroyed";
        }
    }
    Surprise.prototype.render = function () {
        Surprise.superclass.render.apply(this);
        if (this.sign) {
            this._context.fillStyle = "black";
            this._context.font = viewHeight * 0.03 + 'px Arial';
            this._context.textAlign = "center";
            this._context.textBaseline = 'middle';
            this._context.fillText(this.sign, this.center.x, this.center.y);
        }
    }
    return Surprise;
})