define(["./BaseBrick", "../extend"], function (Brick, extend) {
    var TNT = function () {
        Brick.apply(this);
        this._hitSound = bombSound;
        this.sign = "TNT";
        this.unbreakable = false;
        this._brickColor.black = {
            top: "#888",
            left: "#666",
            front: "#444",
            right: "#222",
            bottom: "#000"
        };
        this._currentColor = this._brickColor.black;

        return this;
    }
    extend(TNT, Brick);
    TNT.prototype.hit = function () {
        this._hitSound.play();
        this.destroy();
        return "bomb";
    }
    TNT.prototype.render = function () {
        if (!this._destroyed){
            TNT.superclass.render.apply(this);
            this._context.fillStyle = "#900";
            this._context.font = viewHeight * 0.03 + 'px Arial';
            this._context.textAlign = "center";
            this._context.textBaseline = 'middle';
            this._context.fillText(this.sign, this.center.x, this.center.y);
        }
    };
    return TNT;
})