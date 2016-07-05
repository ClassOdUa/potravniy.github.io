define(["./main", "./bricks/Factory"], function (main, BrickFactory) {
    return function() {
        var myData = {
            isPointerInFullscreenButton: false,
            isPointerInCurrentWindowButton: false
        };
        drawSignArkanoid();
        drawBallButtonFullscreen();
        writeButtonFullscreenText();
        drawBallButtonCurrentWindow();
        writeButtonCurrentWindowText();
        writeLicenseText();
        setBricks();
        createBrickField();
        renderBricks();
        writeNotesOnBricks();
        function drawSignArkanoid() {
            ctx.fillStyle = "#c06";
            ctx.strokeStyle = "#000";
            ctx.font = viewWidth * 0.2 + 'px Courgette';
            ctx.shadowColor = "#009";
            ctx.shadowOffsetX = 15;
            ctx.shadowOffsetY = 15;
            ctx.shadowBlur = 15;
            ctx.lineWidth = 1;
            ctx.textAlign = "center";
            ctx.textBaseline = 'middle';
            ctx.fillText("Arkanoid", viewWidth / 2, viewHeight * 0.2);
            ctx.strokeText("Arkanoid", viewWidth / 2, viewHeight * 0.2);
        }
        function drawBallButtonFullscreen() {
            myData.buttonFullscreen = {
                coordX: viewWidth * 0.2,
                coordY: viewHeight * 0.5,
                radius: viewWidth > viewHeight ? viewWidth / 15 : viewHeight / 15,
                darkColor: "#330",
                lightColor: "#ff7"
            }
            ctx.beginPath();
            var gradient = ctx.createRadialGradient(myData.buttonFullscreen.coordX, myData.buttonFullscreen.coordY, myData.buttonFullscreen.radius, myData.buttonFullscreen.coordX - 0.3 * myData.buttonFullscreen.radius, myData.buttonFullscreen.coordY - 0.3 * myData.buttonFullscreen.radius, 0);
            gradient.addColorStop(0, myData.buttonFullscreen.darkColor);
            gradient.addColorStop(1, myData.buttonFullscreen.lightColor);
            ctx.fillStyle = gradient;
            ctx.arc(myData.buttonFullscreen.coordX, myData.buttonFullscreen.coordY, myData.buttonFullscreen.radius, 0, 2 * Math.PI, true);
            ctx.closePath();
            ctx.shadowColor = "#a00";
            ctx.shadowOffsetY = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowBlur = 200;
            ctx.fill();
        }
        function writeButtonFullscreenText() {
            ctx.fillStyle = "#000";
            ctx.font = myData.buttonFullscreen.radius * 0.45 + 'px Courgette';
            ctx.shadowColor = "#000";
            ctx.shadowBlur = 0;
            ctx.textAlign = "center";
            ctx.textBaseline = 'bottom';
            ctx.fillText("Play", myData.buttonFullscreen.coordX, myData.buttonFullscreen.coordY);
            ctx.textBaseline = 'top';
            ctx.font = myData.buttonFullscreen.radius * 0.2 + 'px Courgette';
            ctx.fillText("fullscreen", myData.buttonFullscreen.coordX, myData.buttonFullscreen.coordY);
        }
        function drawBallButtonCurrentWindow() {
            myData.buttonCurrentWindow = {
                coordX: viewWidth * 0.2,
                coordY: viewHeight * 0.8,
                radius: myData.buttonFullscreen.radius,
                darkColor: "#330",
                lightColor: "#ff7"
            }
            ctx.beginPath();
            var gradient = ctx.createRadialGradient(myData.buttonCurrentWindow.coordX, myData.buttonCurrentWindow.coordY, myData.buttonCurrentWindow.radius, myData.buttonCurrentWindow.coordX - 0.3 * myData.buttonCurrentWindow.radius, myData.buttonCurrentWindow.coordY - 0.3 * myData.buttonCurrentWindow.radius, 0);
            gradient.addColorStop(0, myData.buttonCurrentWindow.darkColor);
            gradient.addColorStop(1, myData.buttonCurrentWindow.lightColor);
            ctx.fillStyle = gradient;
            ctx.arc(myData.buttonCurrentWindow.coordX, myData.buttonCurrentWindow.coordY, myData.buttonCurrentWindow.radius, 0, 2 * Math.PI, true);
            ctx.closePath();
            ctx.shadowColor = "#a00";
            ctx.shadowBlur = 200;
            ctx.fill();
        }
        function writeButtonCurrentWindowText() {
            ctx.fillStyle = "#000";
            ctx.font = myData.buttonCurrentWindow.radius * 0.45 + 'px Courgette';
            ctx.shadowColor = "#000";
            ctx.shadowBlur = 0;
            ctx.textAlign = "center";
            ctx.textBaseline = 'bottom';
            ctx.fillText("Play", myData.buttonCurrentWindow.coordX, myData.buttonCurrentWindow.coordY);
            ctx.textBaseline = 'top';
            ctx.font = myData.buttonCurrentWindow.radius * 0.2 + 'px Courgette';
            ctx.fillText("in current window", myData.buttonCurrentWindow.coordX, myData.buttonCurrentWindow.coordY);
        }
        function writeLicenseText() {
            ctx.font = viewWidth * 0.015 + 'px Arial';
            ctx.shadowColor = "#009";
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 5;
            ctx.fillText("\u00A9" + " Viacheslav Potravnyi. Using is allowed under MIT License.", viewWidth / 2, viewHeight * 0.95);
            ctx.shadowBlur = 0;
        }
        function setBricks() {
            var b = "basic";
            var m = "multiHit";
            var s = "surprise";
            var u = "unbreakable";
            var t = "tnt";
            myData.bricks = [
                [u, t, u, b, u, t, u],
                [b, b, b, b, b, b, b],
                [b, b, s, b, s, b, b],
                [b, b, b, b, b, b, b],
                [m, b, b, b, b, b, m],
                [b, m, m, m, m, m, b],
            ];
            myData.brickHeight = Math.round(viewHeight * 0.5 / myData.bricks.length);
            myData.brickWigth = Math.round(viewWidth * 0.5 / myData.bricks[0].length);
            myData.bricksFieldX = Math.round(viewWidth * 0.4);
            myData.bricksFieldY = Math.round(viewHeight * 0.4);
        }
        function writeNotesOnBricks() {
            ctx.shadowBlur = 5;
            ctx.font = viewWidth * 0.05 + 'px Courgette';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = "#000";
            ctx.fillText("Important:", myData.bricksFieldX + myData.brickWigth * myData.bricks[0].length / 2, myData.bricksFieldY + myData.brickHeight * 1.5);
            ctx.font = viewWidth * 0.036 + 'px Courgette';
            ctx.fillText("- higher speed - bigger score", myData.bricksFieldX + myData.brickWigth * myData.bricks[0].length / 2, myData.bricksFieldY + myData.brickHeight * 3.5);
            ctx.fillText("- mouse control only", myData.bricksFieldX + myData.brickWigth * myData.bricks[0].length / 2, myData.bricksFieldY + myData.brickHeight * 4.5);
            ctx.shadowBlur = 0;
        }
        function createBrickField() {
            myData.bricks.forEach(function (item, i) {
                item.forEach(function (unit, j, bricksAr) {
                    if (unit) {
                        bricksAr[j] = new BrickFactory(bricksAr[j]);
                        bricksAr[j].init(myData.bricksFieldX + j * myData.brickWigth, myData.bricksFieldY + i * myData.brickHeight, myData.brickWigth, myData.brickHeight, ctx);
                    }
                })
            })
        }
        function renderBricks() {
            myData.bricks.forEach(function (item) {
                item.forEach(function (unit) {
                    if (unit) unit.render();
                })
            })
        }

        //  Events listeners
        $can.addEventListener("mousemove", findMouseCoords);
        $can.addEventListener("click", buttonClickProcessing);

        //  Functions
        function findMouseCoords(event) {
            var mouseX = event.clientX;
            var mouseY = event.clientY;
            isPointerInFullscreenButton = ((mouseX - myData.buttonFullscreen.coordX) * (mouseX - myData.buttonFullscreen.coordX)
                + (mouseY - myData.buttonFullscreen.coordY) * (mouseY - myData.buttonFullscreen.coordY)
                < myData.buttonFullscreen.radius * myData.buttonFullscreen.radius) ? true : false;
            isPointerInCurrentWindowButton = ((mouseX - myData.buttonCurrentWindow.coordX) * (mouseX - myData.buttonCurrentWindow.coordX)
                + (mouseY - myData.buttonCurrentWindow.coordY) * (mouseY - myData.buttonCurrentWindow.coordY)
                < myData.buttonCurrentWindow.radius * myData.buttonCurrentWindow.radius) ? true : false;
            if (isPointerInFullscreenButton || isPointerInCurrentWindowButton) {
                $body.style.cursor = "pointer";
            } else {
                $body.style.cursor = "default";
            }
        }
        function buttonClickProcessing() {
            if (isPointerInFullscreenButton) {
                //  Let fullscreen mode
                if ($body.requestFullscreen) {
                    $body.requestFullscreen();
                } else if ($body.mozRequestFullScreen) {
                    $body.mozRequestFullScreen();
                } else if ($body.webkitRequestFullscreen) {
                    $body.webkitRequestFullscreen();
                }
                $body.style.cursor = "none";
                viewWidth = window.screen.width;
                viewHeight = window.screen.height;
                resizeCanvas();
            } else if (isPointerInCurrentWindowButton) {
                //  Play in current window size
                $body.style.cursor = "default";
                viewWidth = $body.clientWidth;
                viewHeight = $body.clientHeight;
            }
            if (isPointerInFullscreenButton || isPointerInCurrentWindowButton) {
                scoreSectionWidth = Math.round(viewWidth / 5);                          //  without borders
                borderLineWidth = Math.round(viewWidth / 50);
                inboxViewWidth = viewWidth - scoreSectionWidth - 2 * borderLineWidth;   //  between left and right borders without them
                inboxViewHeight = viewHeight - borderLineWidth;                         //  between upper border without it
                $can.removeEventListener("mousemove", findMouseCoords);
                $can.removeEventListener("click", buttonClickProcessing);
                window.postMessage("loadController", "*");
            }
        }
    }
})
