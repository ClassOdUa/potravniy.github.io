define(function (require, exports, module) {

    var BasicBrick = require("./BasicBrick"),
        MultiHitBrick = require("./MultiHitBrick"),
        SurpriseBrick = require("./SurpriseBrick"),
        UnbreakableBrick = require("./UnbreakableBrick"),
        TNTBrick = require("./TNTBrick");

    module.exports = function BrickMaker(brickType) {
        switch (brickType) {
            case 'basic':
                return new BasicBrick();
            case 'multiHit':
                return new MultiHitBrick();
            case 'surprise':
                return new SurpriseBrick();
            case 'unbreakable':
                return new UnbreakableBrick();
            case 'tnt':
                return new TNTBrick();
        }
    }
})