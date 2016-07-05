define(["./main"], function(main){
    return function () {
        var myData = {
            isPointerInButton: false
        }
        drawSignCongratulation();
        drawStartButton();
        drawButtonText();
        drawLicense();
        function drawSignCongratulation() {
            ctx.fillStyle = "#c06";
            ctx.strokeStyle = "#000";
            ctx.font = viewWidth * 0.06 + 'px Courgette';
            ctx.shadowColor = "#009";
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
            ctx.shadowBlur = 15;
            ctx.textAlign = "center";
            ctx.textBaseline = 'middle';
            ctx.lineWidth = 0;
            ctx.fillText("Victory!", viewWidth / 2, viewHeight * 0.12);
            ctx.fillText("Your score:", viewWidth / 2, viewHeight * 0.22);
            ctx.font = viewWidth * 0.08 + 'px Courgette';
            ctx.fillStyle = "#cc0";
            ctx.shadowColor = "#a00";
            ctx.fillText(score, viewWidth / 2, viewHeight * 0.4);
        }
        function drawStartButton() {
            myData.ball1 = {
                coordX: viewWidth / 2,
                coordY: viewHeight * 0.73,
                radius: viewWidth > viewHeight ? viewWidth / 10 : viewHeight / 10,
                darkColor: "#330",
                lightColor: "#ff7"
            }
            ctx.beginPath();
            var gradient = ctx.createRadialGradient(myData.ball1.coordX, myData.ball1.coordY, myData.ball1.radius, myData.ball1.coordX - 0.3 * myData.ball1.radius, myData.ball1.coordY - 0.3 * myData.ball1.radius, 0);
            gradient.addColorStop(0, myData.ball1.darkColor);
            gradient.addColorStop(1, myData.ball1.lightColor);
            ctx.fillStyle = gradient;
            ctx.arc(myData.ball1.coordX, myData.ball1.coordY, myData.ball1.radius, 0, 2 * Math.PI, true);
            ctx.closePath();
            ctx.shadowOffsetX = -25;
            ctx.shadowBlur = 100;
            ctx.fill();
            ctx.restore();
        }
        function drawButtonText() {
            ctx.fillStyle = "#000";
            ctx.font = myData.ball1.radius * 0.4 + 'px Courgette';
            ctx.shadowColor = "#000";
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 0;
            ctx.textAlign = "center";
            ctx.textBaseline = 'bottom';
            ctx.fillText("Play", myData.ball1.coordX, myData.ball1.coordY);
            ctx.textBaseline = 'top';
            ctx.fillText("again", myData.ball1.coordX, myData.ball1.coordY);
        }
        function drawLicense() {
            ctx.shadowColor = "#009";
            ctx.shadowBlur = 5;
            ctx.font = viewWidth * 0.015 + 'px Arial';
            ctx.fillStyle = "#000";
            ctx.fillText("\u00A9" + " Viacheslav Potravnyi. Using is allowed under MIT License.", viewWidth / 2, viewHeight * 0.95);
            ctx.shadowBlur = 0;
        }

        $can.addEventListener("mousemove", findMouseCoords);
        $can.addEventListener("click", buttonClickProcessing);

        //  Functions
        function findMouseCoords(event) {
            var mouseX = event.clientX;
            var mouseY = event.clientY;
            myData.isPointerInButton = ((mouseX - myData.ball1.coordX) * (mouseX - myData.ball1.coordX)
                + (mouseY - myData.ball1.coordY) * (mouseY - myData.ball1.coordY)
                < myData.ball1.radius * myData.ball1.radius) ? true : false;
            if (myData.isPointerInButton) {
                $body.style.cursor = "pointer";
            } else {
                $body.style.cursor = "default";
            }
        }
        function buttonClickProcessing() {
            if (myData.isPointerInButton) {
                location.reload();
            }
        }
    }
})
