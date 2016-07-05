define(["./BaseBrick", "../extend"], function (Brick, extend) {

    var BasicBrick = function () {
        Brick.apply(this);
        this._hitSound = brickHitSound;
        this.unbreakable = false;
        return this;
    }
    extend(BasicBrick, Brick);

    BasicBrick.prototype.hit = function () {
        this._hitSound.play();
        this.destroy();
        return "destroyed";
    }

    return BasicBrick
})