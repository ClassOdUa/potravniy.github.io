define(["./main", "./renderField", "./Ball", "./Slider", "./Surprise", "./bricks/Factory", "./levels"]
    , function (main, renderField, Ball, Slider, Surprise, BrickFactory, levels) {
    return function () {
        renderField();
        level = 1;
        var slider = new Slider();
        var balls = [];
        balls.push(new Ball(-120, -500, slider, true));
        var leftWallX = borderLineWidth + balls[0].r;
        var topWallY = borderLineWidth + balls[0].r;
        var rightWallX = borderLineWidth + inboxViewWidth - balls[0].r;
        var bricks = levels[level];
        // Converting the bricks map into array of brick objects
        createBrickField(ctx);
        renderBricks();
        var surprise = [];
        var lastSurpriseValue = "";
        var levelCopletedID = setInterval(isLevelCompleted, 100);
        var startTime;
        var time;
        var intervalID = setInterval(function () {      //  This is working before mouseclick only. It is stopped in function go().
            slider.updatePosition();
        }, 10);
        var runRender = true;
        //var collisionWithWall = false;
        //var collisionWithBricks = false;
        render();

        //     Events 
        $body.addEventListener("click", go);

        //  Functions
        function createBrickField(canvasContext) {
            var bricksInColumn = bricks.length;
            var brickHeight = Math.round(inboxViewHeight * 0.6 / bricksInColumn);
            var bricksInRow = bricks[0].length;
            var brickWigth = Math.round(inboxViewWidth / bricksInRow);
            var oldUnit;
            for (var i = 0; i < bricks.length; i++) {
                for (var j = 0; j < bricks[i].length; j++) {
                    if (bricks[i][j]) {
                        bricks[i][j] = BrickFactory(bricks[i][j]);
                        bricks[i][j].init(borderLineWidth + j * brickWigth, borderLineWidth + i * brickHeight, brickWigth, brickHeight, canvasContext);
                    }
                }
            }
        }
        function render() {
            renderField();
            renderScoreSection();
            renderBricks();
            slider.render();
            ballsRender();
            renderSurprise();
            if (stopController) stopControl();
            if (runRender) requestAnimationFrame(render);
        }
        function go() {
            clearInterval(intervalID);
            intervalID = setInterval(function () {
                time = Date.now();
                if (!startTime) {
                    startTime = time;
                    $body.removeEventListener("click", go);
                }
                slider.updatePosition();
                ballsUpdatePosition(time, startTime);
                surpriseUpdatePosition(time, startTime);
                ballsCollisionWithWall();
                ballsCollisionWithSlider();
                ballsCollisionWithBricks();
                collisionSliderWithSurprise();
                startTime = time;
                if (stopController) stopControl();
            }, 4)
        }
        function ballsCollisionWithWall() {
            balls.forEach(function (item) {
                collisionWithWall(item);
            })
        }
        function collisionWithWall(ball) {
            if (ball.isGluedToSlider) {
                moveBallOnSlider(ball);
            } else {
                if (ball.x <= leftWallX) {
                    ball.vX = +Math.abs(ball.vX);
                    return
                } else if (ball.x >= rightWallX) {
                    ball.vX = -Math.abs(ball.vX);
                    return
                } else if (ball.y <= topWallY) {
                    ball.vY = +Math.abs(ball.vY);
                    return
                } else if (ball.y > viewHeight + ball.r) {          //      Ball has been lost
                    lostSliderSound.play();
                    if (balls.length === 1) {
                        lostBall();
                    } else  balls = balls.filter(function (unit) {
                        if (unit === ball) {
                            ball.vX = ball.vY = 0;
                            return false;
                        } else return true;
                    })
                }
            }
        }
        function ballsCollisionWithSlider() {
            balls.forEach(function (item) {
                collisionWithSlider(item);
            })
        }
        function collisionWithSlider(ball) {
            var isInTouch = isBallTouchingSlider();
            var collisionAcceleration = 1.02;
            if (isInTouch && !ball.isGluedToSlider) {
                changeBallSpeed(isInTouch);
                ball.acceleration *= collisionAcceleration;
            }
            if (isInTouch && slider.sticky && !ball.isGluedToSlider && isBallReflected(isInTouch)) {
                glueBallToSlider(isInTouch);
            }
            if (!slider.sticky && ball.isGluedToSlider) ball.unGlue();
            function isBallReflected(where) {
                if (where === "flat") {
                    if (ball.vY < 0) return true
                    else return false
                } else if (where === "left") {
                    if (ball.vY < 0 && ball.vX < 0) return true
                    else return false
                } else if (where === "right") {
                    if (ball.vY < 0 && ball.vX > 0) return true
                    else return false
                } else return false
            }
            function changeBallSpeed(where) {
                var speed = 0;
                var angle = 0;
                var collidingAngle = 0;
                if (where === "flat") {
                    speed = Math.hypot(ball.vX, ball.vY);
                    angle = Math.PI * (ball.x - slider.x) / ((slider.rightStraightX - slider.leftStraightX) * 2);
                    ball.vY = -speed * Math.cos(angle);
                    ball.vX = speed * Math.sin(angle);
                } else if (where === "left") {
                    var dY = slider.y - ball.y;
                    var dX = slider.leftStraightX - ball.x;
                    collidingAngle = Math.atan(dX / dY);
                    angle = -Math.PI / 4 - collidingAngle / 2;
                    speed = Math.hypot(ball.vX, ball.vY);
                    ball.vY = -speed * Math.cos(angle);
                    ball.vX = speed * Math.sin(angle);
                } else if (where === "right") {
                    var dY = slider.y - ball.y;
                    var dX = slider.rightStraightX - ball.x;
                    collidingAngle = Math.atan(dX / dY);
                    angle = Math.PI / 4 - collidingAngle / 2;
                    speed = Math.hypot(ball.vX, ball.vY);
                    ball.vY = -speed * Math.cos(angle);
                    ball.vX = speed * Math.sin(angle);
                }
            }
            function isBallTouchingSlider() {
                if (ball.y + ball.r >= slider.topCoord && ball.x + ball.r >= slider.leftX && ball.x - ball.r <= slider.rightX && ball.y <= slider.y) {
                    var initCond = ball.y + ball.r >= slider.topCoord && ball.x + ball.r >= slider.leftX && ball.x - ball.r <= slider.rightX;
                    var isInRangeOfY = (ball.y + ball.r >= slider.topCoord);
                    var isInRangeOfLeftX = (ball.x >= slider.leftStraightX);
                    var isInRangeOfRightX = (ball.x <= slider.rightStraightX);
                    if (isInRangeOfY && isInRangeOfLeftX && isInRangeOfRightX) {    //  Ball collides with flat part of Slider
                        return "flat"
                    } else if ((ball.x < slider.leftStraightX)
                    && ((ball.x - slider.leftStraightX) * (ball.x - slider.leftStraightX)
                    + (ball.y - slider.y) * (ball.y - slider.y)
                    <= (ball.r + slider.height) * (ball.r + slider.height))) {    //  Ball collides with left rounded part of Slider
                        return "left";
                    } else if ((ball.x > slider.rightStraightX)
                    && ((ball.x - slider.rightStraightX) * (ball.x - slider.rightStraightX)
                    + (ball.y - slider.y) * (ball.y - slider.y)
                    <= (ball.r + slider.height) * (ball.r + slider.height))) {    //  Ball collides with right rounded part of Slider
                        return "right";
                    } else return false
                }
            }
            function glueBallToSlider(isInTouch) {
                ball.isGluedToSlider = true;
                var distanseAfter = ball.r + slider.height;
                if(isInTouch === "flat"){
                    ball.dX = ball.x - slider.x
                    ball.dY = -distanseAfter;
                } else if (isInTouch === "left" || isInTouch === "right") {
                    var dX = (isInTouch == "left") ? ball.x - slider.leftStraightX : ball.x - slider.rightStraightX;
                    var dY = ball.y - slider.y;
                    var distanseBefore = Math.hypot(dX, dY);
                    ball.dX = dX * distanseAfter / distanseBefore + ((isInTouch == "left") ? (slider.leftStraightX - slider.x) : (slider.rightStraightX - slider.x));
                    ball.dY = dY * distanseAfter / distanseBefore;
                }
            }
        }
        function ballsCollisionWithBricks() {
            balls.forEach(function (item) {
                collisionWithBricks(item);
            })
        }
        function collisionWithBricks(ball) {
            for (var i = 0; i < bricks.length; i++) {
                for (var j = 0; j < bricks[i].length; j++) {
                    if (bricks[i][j]) {
                        var b = bricks[i][j];
                        var dist = Math.hypot((ball.x - b.center.x), (ball.y - b.center.y));
                        if (dist <= ball.r + b.halfDiag) {
                            if (ball.x < b.corner.outer.leftTop.x) {
                                if (ball.y < b.corner.outer.leftTop.y && !(bricks[i - 1] && bricks[i - 1][j]) && !(bricks[i] && bricks[i][j - 1])) {
                                    dist = Math.hypot((ball.x - b.corner.outer.leftTop.x), (ball.y - b.corner.outer.leftTop.y));
                                    if (dist <= ball.r) {                                                                                                    // Collision with upper left corner
                                        if (!ball.power) collisionWithCorner(b.corner.outer.leftTop.x, b.corner.outer.leftTop.y, ball, dist);
                                        hitBrick(b);
                                    }
                                } else if (ball.y >= b.corner.outer.leftTop.y && ball.y <= b.corner.outer.leftBottom.y) {
                                    if (b.corner.outer.leftTop.x - ball.x <= ball.r) {                                                                                      //  Collision with left side
                                        if (!ball.power) ball.vX = -Math.abs(ball.vX);
                                        hitBrick(b);
                                    }
                                } else if (ball.y > b.corner.outer.leftBottom.y && !(bricks[i + 1] && bricks[i + 1][j]) && !(bricks[i] && bricks[i][j - 1])) {
                                    dist = Math.hypot((ball.x - b.corner.outer.leftTop.x), (ball.y - b.corner.outer.leftBottom.y));
                                    if (dist <= ball.r) {                                                                                                    // Collision with lower left corner
                                        if (!ball.power) collisionWithCorner(b.corner.outer.leftTop.x, b.corner.outer.leftBottom.y, ball, dist);
                                        hitBrick(b);
                                    }
                                }
                            } else if (ball.x >= b.corner.outer.leftTop.x && ball.x <= b.corner.outer.rightTop.x) {
                                if (ball.y < b.corner.outer.leftTop.y) {
                                    if (b.corner.outer.leftTop.y - ball.y <= ball.r) {                                                                                       //  Collision with top side
                                        if (!ball.power) ball.vY = -Math.abs(ball.vY);
                                        hitBrick(b);
                                    }
                                } else if (ball.y > b.corner.outer.leftBottom.y) {
                                    if (ball.y - b.corner.outer.leftBottom.y <= ball.r) {                                                                                    //  Collision with bottom side
                                        if (!ball.power) ball.vY = Math.abs(ball.vY);
                                        hitBrick(b);
                                    }
                                }
                            } else if (ball.x > b.corner.outer.rightTop.x) {
                                if (ball.y < b.corner.outer.leftTop.y && (!bricks[i - 1]||!bricks[i - 1][j]) && (!bricks[i]||!bricks[i][j + 1])) {
                                    dist = Math.hypot((ball.x - b.corner.outer.rightTop.x), (ball.y - b.corner.outer.leftTop.y));
                                    if (dist <= ball.r) {                                                                                                    // Collision with upper right corner
                                        if (!ball.power) collisionWithCorner(b.corner.outer.rightTop.x, b.corner.outer.leftTop.y, ball, dist);
                                        hitBrick(b);
                                    }
                                } else if (ball.y >= b.corner.outer.leftTop.y && ball.y <= b.corner.outer.leftBottom.y) {
                                    if (ball.x - b.corner.outer.rightTop.x <= ball.r) {                                                                                     //  Collision with right side
                                        if (!ball.power) ball.vX = Math.abs(ball.vX);
                                        hitBrick(b);
                                    }
                                } else if (ball.y > b.corner.outer.leftBottom.y && (!bricks[i + 1]||!bricks[i + 1][j]) && (!bricks[i]||!bricks[i][j + 1])) {
                                    dist = Math.hypot((ball.x - b.corner.outer.rightTop.x), (ball.y - b.corner.outer.leftBottom.y));
                                    if (dist <= ball.r) {                                                                                                 // Collision with lower right corner
                                        if (!ball.power) collisionWithCorner(b.corner.outer.rightTop.x, b.corner.outer.leftBottom.y, ball, dist);
                                        hitBrick(b);
                                    }
                                }
                            }
                        }
                        function hitBrick(b) {
                            score += Math.round(3 * (ball.acceleration - 1));
                            if (ball.power && b.unbreakable) {
                                b.destroy();
                                bricks[i][j] = undefined;
                                score += 20;
                            }
                            var hited = b.hit();
                            switch (hited) {
                                case 'destroyed':
                                    bricks[i][j] = undefined;
                                    score += 1;
                                    break
                                case "surprise":
                                    newSurpriseAppear(b);
                                    break
                                case "bomb":
                                    for (var m = i - 1; m <= i + 1; m++) {
                                        if (bricks[m]) {
                                            for (var n = j - 1; n <= j + 1; n++) {
                                                if (bricks[m][n]) {
                                                    if (bricks[m][n].sign === "S") newSurpriseAppear(bricks[m][n]);
                                                    destroy(m, n);
                                                    score += 1;
                                                }
                                            }
                                        }
                                    }
                                    break
                            }
                            function newSurpriseAppear(brick) {
                                do {
                                    var newSurprise = new Surprise(brick.center.x, brick.center.y, brick.corner.outer.rightTop.x - brick.corner.outer.leftTop.x, brick.corner.outer.leftBottom.y - brick.corner.outer.leftTop.y);
                                } while (lastSurpriseValue && newSurprise.value === lastSurpriseValue)
                                surprise.push(newSurprise);
                                lastSurpriseValue = newSurprise.value;
                            }
                            function destroy(r, c) {
                                bricks[r][c].destroy();
                                bricks[r][c] = undefined;
                                score += 1 + Math.round(3 * (ball.acceleration - 1));
                            }
                        }
                    }
                }
            }
        }
        function collisionSliderWithSurprise() {
            surprise = surprise.filter(function (item) {
                var isMatchX = Math.abs(slider.x - item.x) < (slider.width + item.width) / 2;
                var isMatchY = Math.abs(slider.y - item.y) < (slider.height + item.height) / 2;
                if (isMatchX && isMatchY) {
                    switch (item.value){
                        case "slow":
                            balls.forEach(function (ball) {
                                ball.vX = ball.vX / 1.5;
                                ball.vY = ball.vY / 1.5;
                            })
                            break
                        case "fast":
                            balls.forEach(function (ball) {
                                ball.vX = ball.vX * 1.5;
                                ball.vY = ball.vY * 1.5;
                            })
                            break
                        case "big":
                            slider.width = Math.round(slider.width * 1.5);
                            slider.leftX = Math.round(slider.x - slider.width / 2);
                            slider.rightX = Math.round(slider.leftX + slider.width);
                            if (slider.leftX < borderLineWidth) {
                                slider.x += borderLineWidth - slider.leftX;
                                slider.leftX = Math.round(slider.x - slider.width / 2);
                                slider.rightX = Math.round(slider.leftX + slider.width);
                            }
                            if (slider.rightX > inboxViewWidth + borderLineWidth) {
                                slider.x -= slider.rightX - (inboxViewWidth + borderLineWidth);
                                slider.leftX = Math.round(slider.x - slider.width / 2);
                                slider.rightX = Math.round(slider.leftX + slider.width);
                            }
                            slider.leftStraightX = slider.leftX + slider.height;
                            slider.rightStraightX = slider.rightX - slider.height;
                            break
                        case "small":
                            slider.width = Math.round(slider.width / 1.5);
                            slider.leftX = Math.round(slider.x - slider.width / 2);
                            slider.rightX = Math.round(slider.leftX + slider.width);
                            slider.leftStraightX = slider.leftX + slider.height;
                            slider.rightStraightX = slider.rightX - slider.height;
                            break
                        case "power":
                            balls.forEach(function (ball) {
                                ball.setPowerOn();
                            })
                            break
                        case "life":
                            lifes++;
                            break
                        case "glue":
                            slider.setSticky();
                            break
                        case "x2":
                            ballsX2();
                            break
                    }
                    catchSound.play();
                    return false;
                } else return true;
            })
        }
        function collisionWithCorner(cornerX, cornerY, ball, dist) {
            var ortNx = (ball.x - cornerX) / dist;      //  Normal coord x
            var ortNy = (ball.y - cornerY) / dist;      //  Normal coord y
            var ortTx = ortNy;                          //  Tangential coord x
            var ortTy = -ortNx;                         //  Tangential coord x
            var ballVT = ball.vX * ortTx + ball.vY * ortTy;
            var ballVN = ball.vX * ortNx + ball.vY * ortNy;
            ball.vX = ballVT * ortTx - ballVN * ortNx;
            ball.vY = ballVT * ortTy - ballVN * ortNy;
        }
        function renderBricks() {
            ctxClearInGameBox();
            bricks.forEach(function (item) {
                item.forEach(function (unit) {
                    if (unit) unit.render();
                })
            })
        }
        function renderSurprise() {
            surprise.forEach(function (unit) {
                    unit.render();
            })
        }
        function renderScoreSection() {
            ctx.fillStyle = "goldenrod";
            ctx.textAlign = "center";
            ctx.textBaseline = 'middle';
            ctx.font = scoreSectionWidth * 0.25 + 'px Courgette';
            ctx.fillText(level, viewWidth - scoreSectionWidth / 2, viewHeight * 0.23);
            ctx.fillText(lifes, viewWidth - scoreSectionWidth / 2, viewHeight * 0.53);
            ctx.fillText(score, viewWidth - scoreSectionWidth / 2, viewHeight * 0.83);
        }
        function surpriseUpdatePosition(time, startTime) {
            surprise = surprise.filter(function (unit) {
                unit.updatePosition(time, startTime);
                if (unit.y <= viewHeight) return true;
                else return false;
            })
        }
        function lostBall() {
            surprise = [];
            slider.loosingAnimation();
            clearInterval(intervalID);
            lifes--;
            if (lifes < 0) {
                lifes = "X"
                runRender = false;
                slider.stopSliderMove();
                bricksDestroyUnbreakable();
                setTimeout(function () {
                    ctxClearAll();
                }, 190);
                window.postMessage("loadGameOver", "*");
            } else {
                $body.addEventListener("click", go);
                setTimeout(function () {
                    slider.reset();
                    balls[0].reset();
                    startTime = undefined;
                    intervalID = setInterval(function () {
                        slider.updatePosition();
                    }, 10);
                }, 2000);
            }
        }
        function levelCompleted() {
            surprise = [];
            clearInterval(intervalID);
            runRender = false;
            if (level + 1 < levels.length) {
                fanfarySound.play();
                bricksDestroyUnbreakable();
                $body.addEventListener("click", nextLevel);
                setTimeout(function () {
                    ctxClearInGameBox();
                    startTime = undefined;
                    ctx.fillStyle = "goldenrod";
                    ctx.font = inboxViewWidth * 0.07 + 'px Courgette';
                    ctx.fillText("Completed!", inboxViewWidth / 2 + borderLineWidth, viewHeight * 0.3);
                    ctx.font = inboxViewWidth * 0.05 + 'px Courgette';
                    ctx.fillText(" Click for next level.", inboxViewWidth / 2 + borderLineWidth, viewHeight * 0.6);
                }, 500)
            } else {
                slider.stopSliderMove();
                bricksDestroyUnbreakable();
                setTimeout(function () {
                    ctxClearAll();
                }, 190)
                window.postMessage("loadWinnerPage", "*");
            }
        }
        function nextLevel() {
            $body.removeEventListener("click", nextLevel);
            level++;
            bricks = levels[level];
            $body.addEventListener("click", go);
            createBrickField(ctx);
            slider.reset();
            balls.length = 1;
            balls[0].reset();
            runRender = true;
            render();
            fanfarySound.pause();
            fanfarySound.currentTime = 0;
            levelCopletedID = setInterval(isLevelCompleted, 100);
            intervalID = setInterval(function () {
                slider.updatePosition();
            }, 10);
        }
        function stopControl() {
            surprise = [];
            clearInterval(intervalID);
            balls.forEach(function (ball) {
                if (ball.store.powerTimeTimeoutID) clearTimeout(ball.store.powerTimeTimeoutID);
            })
            runRender = false;
            slider.stopSliderMove();
        }
        function bricksDestroyUnbreakable() {
            bricks.forEach(function (item) {
                item.forEach(function (unit) {
                    if (unit) {
                        unit.destroy();
                    }
                })
            })
        }
        function isLevelCompleted() {
            var isThereBreakableBricks = bricks.some(function (item) {
                var result = item.some(function (unit) {
                    if (unit && !unit.unbreakable) return true;
                    else return false;
                })
                return result;
            });
            if (!isThereBreakableBricks) {
                clearInterval(levelCopletedID);
                levelCompleted();
            }
        }
        function ballsRender() {
            balls.forEach(function (item, i) {
                item.render();
            })
        }
        function ballsUpdatePosition(time, startTime) {
            balls.forEach(function (item, i) {
                item.updatePosition(time, startTime);
            })
        }
        function ballsX2() {
            var newBalls = [];

            balls.forEach(function (item, i) {
                var speed = Math.hypot(item.vX, item.vY);
                var angle = Math.atan2(item.vY, item.vX);
                var newBall = new Ball(speed * Math.cos(angle + Math.PI / 12), speed * Math.sin(angle + Math.PI / 12), slider, false, item.x, item.y);
                newBall.acceleration = item.acceleration;
                newBalls.push(newBall);
                balls[i].vX = speed * Math.cos(angle - Math.PI / 12);
                balls[i].vY = speed * Math.sin(angle - Math.PI / 12);
            })
            balls = balls.concat(newBalls);
        }
        function moveBallOnSlider(ball) {
            if (ball.x <= leftWallX) {
                ball.x = leftWallX;
                var dX = ball.x - slider.leftStraightX;
                var dY = Math.sqrt((ball.r + slider.height) * (ball.r + slider.height) - dX * dX);
                ball.dX = ball.x - slider.x;
                ball.dY = -dY;
            } else if (ball.x >= rightWallX) {
                ball.x = rightWallX;
                var dX = ball.x - slider.rightStraightX;
                var dY = Math.sqrt((ball.r + slider.height) * (ball.r + slider.height) - dX * dX);
                ball.dX = ball.x - slider.x;
                ball.dY = -dY;
            }
        }
    }
})
