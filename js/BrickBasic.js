define([], function () {				//	Class for simplest brick
    return function BrickBasic(leftX, topY, width, height, context) {
        var that = this;
        this.context = context;
        var deltaW = Math.round(width * 0.1);     //  distances between inner and outer lines
        var deltaH = Math.round(height * 0.1);

        //---------------------------------//
        //              Geometry           //
        //---------------------------------//

        //  Brick outline points
        //  1-------2   corners (external)
        //  | 1---2 |   points  (inner)
        //  | |   | |
        //  | 4---3 |
        //  4-------3
        this.corner1 = {
            x: Math.round(leftX),
            y: Math.round(topY)
        };
        this.corner2 = {
            x: Math.round(leftX + width),
            y: this.corner1.y
        };
        this.corner3 = {
            x: this.corner2.x,
            y: Math.round(topY + height)
        };
        this.corner4 = {
            x: this.corner1.x,
            y: this.corner3.y
        };
        this.point1 = {
            x: this.corner1.x + deltaW,
            y: this.corner1.y + deltaH
        };
        this.point2 = {
            x: this.corner2.x - deltaW,
            y: this.corner2.y + deltaH
        };
        this.point3 = {
            x: this.corner3.x - deltaW,
            y: this.corner3.y - deltaH
        };
        this.point4 = {
            x: this.corner4.x + deltaW,
            y: this.corner4.y - deltaH
        };
        this.center = {
            x: Math.round((that.corner1.x + that.corner2.x) / 2),
            y: Math.round((that.corner1.y + that.corner4.y) / 2),
        }
        this.halfDiag = Math.sqrt(width * width + height * height) / 2;

        //---------------------------------//
        //         Color settings          //
        //---------------------------------//
        this.brickColor = {
            green: ["#8e8", "#6c6", "#4a4", "#282", "#060"]
        }
        this.currentColor = this.brickColor.green;

        this.render = function () {
            if (!that.destroyed) {
                //  upper side
                context.lineWidth = 2;
                context.beginPath();
                context.moveTo(that.corner1.x, that.corner1.y);
                context.lineTo(that.corner2.x, that.corner2.y);
                context.lineTo(that.point2.x, that.point2.y);
                context.lineTo(that.point1.x, that.point1.y);
                context.closePath();
                context.fillStyle = that.currentColor[0];
                context.fill();
                //  left
                context.beginPath();
                context.moveTo(that.corner1.x, that.corner1.y);
                context.lineTo(that.corner4.x, that.corner4.y);
                context.lineTo(that.point4.x, that.point4.y);
                context.lineTo(that.point1.x, that.point1.y);
                context.closePath();
                context.fillStyle = that.currentColor[1];
                context.fill();
                //  center
                context.beginPath();
                context.lineTo(that.point1.x, that.point1.y);
                context.lineTo(that.point2.x, that.point2.y);
                context.lineTo(that.point3.x, that.point3.y);
                context.lineTo(that.point4.x, that.point4.y);
                context.closePath();
                context.fillStyle = that.currentColor[2];
                context.fill();
                //  right
                context.beginPath();
                context.moveTo(that.corner2.x, that.corner2.y);
                context.lineTo(that.corner3.x, that.corner3.y);
                context.lineTo(that.point3.x, that.point3.y);
                context.lineTo(that.point2.x, that.point2.y);
                context.closePath();
                context.fillStyle = that.currentColor[3];
                context.fill();
                //  bottom
                context.beginPath();
                context.moveTo(that.corner3.x, that.corner3.y);
                context.lineTo(that.corner4.x, that.corner4.y);
                context.lineTo(that.point4.x, that.point4.y);
                context.lineTo(that.point3.x, that.point3.y);
                context.closePath();
                context.fillStyle = that.currentColor[4];
                context.fill();
            }
        }

        //---------------------------------//
        //           Stressability         //
        //---------------------------------//
        this.hitsForDestroy = 1;
        this.destroy = function () {
            context.clearRect(that.corner1.x, that.corner1.y, that.corner2.x - that.corner1.x, that.corner4.y - that.corner1.y);
            that.destroyed = true;
        }
        this.hit = function () {
            brickHitSound.play();
            that.destroy();
            return "destroyed";
        }
        //if (extention) extention(this);
        return this;
    }
})
