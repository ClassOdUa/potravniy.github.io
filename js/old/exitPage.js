define(["./main"], function(main){
    return function () {
        setBackgroung();
        //  Sign "Arkanoid requires fullscreen mode"
        ctxA.fillStyle = "#c06";
        ctxA.strokeStyle = "#000";
        ctxA.font = viewWidth * 0.06 + 'px Courgette';
        ctxA.shadowColor = "#a00";
        ctxA.shadowOffsetX = 5;
        ctxA.shadowOffsetY = 5;
        ctxA.shadowBlur = 15;
        ctxA.textAlign = "center";
        ctxA.textBaseline = 'middle';
        ctxA.fillText("Arkanoid requires", viewWidth / 2, viewHeight * 0.2);
        ctxA.fillText("fullscreen mode only", viewWidth / 2, viewHeight * 0.3);
        ctxA.strokeText("Arkanoid requires", viewWidth / 2, viewHeight * 0.2);
        ctxA.strokeText("fullscreen mode only", viewWidth / 2, viewHeight * 0.3);
        //  Button-ball for start
        var circle1 = {
            coordX: viewWidth / 3,
            coordY: viewHeight * 0.65,
            radius: viewWidth > viewHeight ? viewWidth / 10 : viewHeight / 10,
            darkColor: "#330",
            lightColor: "#ff7"
        }
//        ctxA.save();
        ctxA.beginPath();
        var gradient = ctxA.createRadialGradient(circle1.coordX, circle1.coordY, circle1.radius, circle1.coordX - 0.3 * circle1.radius, circle1.coordY - 0.3 * circle1.radius, 0);
        gradient.addColorStop(0, circle1.darkColor);
        gradient.addColorStop(1, circle1.lightColor);
        ctxA.fillStyle = gradient;
        ctxA.arc(circle1.coordX, circle1.coordY, circle1.radius, 0, 2 * Math.PI, true);
        ctxA.closePath();
        ctxA.shadowOffsetX = -25;
        ctxA.shadowBlur = 100;
        ctxA.fill();
        ctxA.restore();
        //  Text on the button 
        ctxA.fillStyle = "#000";
        ctxA.font = circle1.radius * 0.25 + 'px Courgette';
        ctxA.shadowColor = "#000";
        ctxA.shadowOffsetX = 0;
        ctxA.shadowOffsetY = 0;
        ctxA.shadowBlur = 0;
        ctxA.textAlign = "center";
        ctxA.textBaseline = 'middle';
        ctxA.fillText("Restart", circle1.coordX, circle1.coordY);

        //  Button-ball for exit
        var circle2 = {
            coordX: 2 * viewWidth / 3,
            coordY: viewHeight * 0.65,
            radius: viewWidth > viewHeight ? viewWidth / 10 : viewHeight / 10,
            darkColor: "#000",
            lightColor: "#555"
        }
//        ctxA.save();
        ctxA.beginPath();
        var gradient = ctxA.createRadialGradient(circle2.coordX, circle2.coordY, circle2.radius, circle2.coordX - 0.3 * circle2.radius, circle2.coordY - 0.3 * circle2.radius, 0);
        gradient.addColorStop(0, circle2.darkColor);
        gradient.addColorStop(1, circle2.lightColor);
        ctxA.fillStyle = gradient;
        ctxA.arc(circle2.coordX, circle2.coordY, circle2.radius, 0, 2 * Math.PI, true);
        ctxA.closePath();
        ctxA.shadowColor = "#a00";
        ctxA.shadowOffsetY = 15;
        ctxA.shadowOffsetX = -25;
        ctxA.shadowBlur = 15;
        ctxA.shadowBlur = 100;
        ctxA.fill();
        ctxA.restore();
        //  Text on the button 
        ctxA.fillStyle = "#a00";
        ctxA.font = circle2.radius * 0.25 + 'px Courgette';
        ctxA.shadowColor = "#000";
        ctxA.shadowOffsetX = 0;
        ctxA.shadowOffsetY = 0;
        ctxA.shadowBlur = 0;
        ctxA.textAlign = "center";
        ctxA.textBaseline = 'middle';
        ctxA.fillText("Exit", circle2.coordX, circle2.coordY);

        //  License
        ctxA.font = viewWidth * 0.015 + 'px Arial';
        ctxA.fillStyle = "#000";
        ctxA.fillText("\u00A9" + " Viacheslav Potravnyi. Using is allowed under MIT License.", viewWidth / 2, viewHeight * 0.95);

        //  Mouse catch area position above buttonPlay
        $div.style.display = "block";
        $div.style.left = circle1.coordX - circle1.radius + "px";
        $div.style.top = circle1.coordY - circle1.radius + "px";
        $div.style.height = 2 * circle1.radius + "px";
        $div.style.width = 2 * circle1.radius + "px";
        $div.style["border-radius"] = circle1.radius + "px";
        //  Mouse catch area position above buttonExit
        var $div2 = $div.cloneNode(true);
        $div2.style.left = circle2.coordX - circle2.radius + "px";
        $div2.style.top = circle2.coordY - circle2.radius + "px";
        $div2.style.height = 2 * circle2.radius + "px";
        $div2.style.width = 2 * circle2.radius + "px";
        $div2.style["border-radius"] = circle2.radius + "px";
        $body.appendChild($div2);
        //  Button behavior processing (from this position to the end of synchronous part of programm)
        var isPointerInCircle1 = false;
        var isPointerInCircle2 = false;
        //  Events listeners
        $div.addEventListener("mousemove", findMouseCoords);
        $div.addEventListener("click", buttonClickProcessing);
        $div2.addEventListener("mousemove", findMouseCoords);
        $div2.addEventListener("click", buttonClickProcessing2);

        var timerID = setInterval(changeMousePointer, 100);
        //  End of synchronous part of programm


        //  Functions
        function findMouseCoords(event) {
            var mouseX = event.clientX;
            var mouseY = event.clientY;
            isPointerInCircle1 = ((mouseX - circle1.coordX) * (mouseX - circle1.coordX) + (mouseY - circle1.coordY) * (mouseY - circle1.coordY) < circle1.radius * circle1.radius) ? true : false;
            isPointerInCircle2 = ((mouseX - circle2.coordX) * (mouseX - circle2.coordX) + (mouseY - circle2.coordY) * (mouseY - circle2.coordY) < circle2.radius * circle2.radius) ? true : false;
        }
        function changeMousePointer() {
            if (isPointerInCircle1) {
                $div.style.cursor = "pointer";
            } else {
                $div.style.cursor = "default";
            }
            if (isPointerInCircle2) {
                $div2.style.cursor = "pointer";
            } else {
                $div2.style.cursor = "default";
            }
        }
        function buttonClickProcessing() {
            if (isPointerInCircle1) {
                location.reload();
            }
        }
        function buttonClickProcessing2() {
            if (isPointerInCircle2) {
                window.close();
            }
        }
    }
})
