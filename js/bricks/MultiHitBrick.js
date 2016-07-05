define(["./BaseBrick", "../extend"], function (Brick, extend) {
    var MultiHit = function () {
        Brick.apply(this);
        this._hitSound = metalHitSound;
        this.unbreakable = false;
        this.hitsForDestroy = 3;
        this._brickColor.orange = {
            top: "#e80",
            left: "#c60",
            front: "#a40",
            right: "#820",
            bottom: "#610"
        }
        this._brickColor.yellow = {
            top: "#ee0",
            left: "#cc0",
            front: "#aa0",
            right: "#880",
            bottom: "#660"
        };
        this._currentColor = this._brickColor.orange;
        return this;
    }
    extend(MultiHit, Brick);
    MultiHit.prototype.hit = function () {
        this.hitsForDestroy--;
        if (this.hitsForDestroy === 2) {
            this._currentColor = this._brickColor.yellow;
            this._hitSound.play();
            this.render();
        } else if (this.hitsForDestroy === 1) {
            this._currentColor = this._brickColor.green;
            this._hitSound.play();
            this._hitSound = brickHitSound;
            this.render();
        } else if (this.hitsForDestroy === 0) {
            this._hitSound.play();
            this.destroy();
            return "destroyed";
        }
    }
    return MultiHit
})