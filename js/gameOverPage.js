define(["./main"], function(main){
    return function () {
        myData = {isPointerInButton: false};
        drawSignGameOver();
        drawButton();
        writeButtonText();
        writeLicense();
        function drawSignGameOver() {
            ctx.fillStyle = "#c06";
            ctx.strokeStyle = "#000";
            ctx.font = viewWidth * 0.06 + 'px Courgette';
            ctx.shadowColor = "#009";
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
            ctx.shadowBlur = 15;
            ctx.lineWidth = 0;
            ctx.textAlign = "center";
            ctx.textBaseline = 'middle';
            ctx.fillText("Game over", viewWidth / 2, viewHeight * 0.15);
            ctx.fillText("Your score:", viewWidth / 2, viewHeight * 0.25);
            ctx.font = viewWidth * 0.08 + 'px Courgette';
            ctx.shadowColor = "#a00";
            ctx.fillStyle = "#cc0";
            ctx.fillText(score, viewWidth / 2, viewHeight * 0.4);
        }
        function drawButton() {
            myData.ball = {
                coordX: viewWidth / 2,
                coordY: viewHeight * 0.73,
                radius: viewWidth > viewHeight ? viewWidth / 10 : viewHeight / 10,
                darkColor: "#330",
                lightColor: "#ff7"
            }
            ctx.beginPath();
            var gradient = ctx.createRadialGradient(myData.ball.coordX, myData.ball.coordY, myData.ball.radius, myData.ball.coordX
                - 0.3 * myData.ball.radius, myData.ball.coordY - 0.3 * myData.ball.radius, 0);
            gradient.addColorStop(0, myData.ball.darkColor);
            gradient.addColorStop(1, myData.ball.lightColor);
            ctx.fillStyle = gradient;
            ctx.arc(myData.ball.coordX, myData.ball.coordY, myData.ball.radius, 0, 2 * Math.PI, true);
            ctx.closePath();
            ctx.shadowOffsetX = -25;
            ctx.shadowBlur = 100;
            ctx.fill();
        }
        function writeButtonText() {
            ctx.fillStyle = "#000";
            ctx.font = myData.ball.radius * 0.45 + 'px Courgette';
            ctx.shadowColor = "#000";
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 0;
            ctx.textAlign = "center";
            ctx.textBaseline = 'bottom';
            ctx.fillText("Try", myData.ball.coordX, myData.ball.coordY);
            ctx.textBaseline = 'top';
            ctx.fillText("again", myData.ball.coordX, myData.ball.coordY);
        }
        function writeLicense() {
            ctx.shadowColor = "#009";
            ctx.shadowBlur = 5;
            ctx.font = viewWidth * 0.015 + 'px Arial';
            ctx.fillStyle = "#000";
            ctx.fillText("\u00A9" + " Viacheslav Potravnyi. Using is allowed under MIT License.", viewWidth / 2, viewHeight * 0.95);
            ctx.shadowBlur = 0;
        }

    	//  Events listeners
        $can.addEventListener("mousemove", findMouseCoords);
        $can.addEventListener("click", buttonClickProcessing);

        //  Functions
        function findMouseCoords(event) {
            var mouseX = event.clientX;
            var mouseY = event.clientY;
            myData.isPointerInButton = ((mouseX - myData.ball.coordX) * (mouseX - myData.ball.coordX)
                + (mouseY - myData.ball.coordY) * (mouseY - myData.ball.coordY)
                < myData.ball.radius * myData.ball.radius) ? true : false;
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
