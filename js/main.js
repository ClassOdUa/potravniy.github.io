init();

requirejs(["audio"], function (audio) {
    audio();
    startMusic.play();
});

//  Let's begin
requirejs(["welcomePage"], function (welcomePage) {
    scoreSectionBackground("hide");
    welcomePage();
});

//  Event Listeners
window.addEventListener("message", handleMessage, true);
window.addEventListener("resize", resizeWindow);
window.oncontextmenu = function () {
    return false;     // cancel default menu (mouseRightClick)
}

//  Functions
function handleMessage(event) {
    if (event.source == window && event.data == "loadController") {
        event.stopPropagation();
        stopController = false;
        scoreSectionBackground("show");
        startMusic.pause();
        startMusic.currentTime = 0;
        requirejs(["controller"], function (controller) {
            controller();
        });
    } else if (event.source == window && event.data == "loadGameOver") {
        event.stopPropagation();
        $body.style.cursor = "default";
        stopController = true;
        gameOverMusic.play();
        scoreSectionBackground("hide");
        requirejs(["gameOverPage"], function (gameOverPage) {
            setTimeout(gameOverPage, 200);
        });
    } else if (event.source == window && event.data == "loadWinnerPage") {
        event.stopPropagation();
        $body.style.cursor = "default";
        stopController = true;
        applauseSound.play();
        setTimeout(function () {
            winnerMusic.play();
        }, 5000);
        scoreSectionBackground("hide");
        requirejs(["winnerPage"], function (winnerPage) {
            setTimeout(winnerPage, 200);
        });
    }
}
function resizeWindow() {
	if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        stopController = false;
    } else {
	    stopController = true;
	    //location.reload(true);
	}
}
function resizeCanvas() {
    $can.style.width = viewWidth + "px";
    $can.style.height = viewHeight + "px";
    $can.setAttribute("width", viewWidth);
    $can.setAttribute("height", viewHeight);
    $section.style.left = viewWidth * 4 / 5 + "px";
}
function scoreSectionBackground(action) {
    if (action === 'show') {
        $section.style.display = 'block';
    } else if (action === 'hide') {
        $section.style.display = 'none';
    }
}
function init() {
    requirejs.config({
        baseUrl: 'js',
        paths: {
            main: ''
        }
    });
    Math.hypot = Math.hypot || function (x, y) { return Math.sqrt(x * x + y * y) };

    window.$body = document.querySelector("body");
    window.$div = document.querySelector("#play");
    $div.style.display = "none";
    window.$section = document.querySelector("section");

    window.$can = document.querySelector("#static");
    window.ctx = $can.getContext("2d");

    window.viewWidth = $body.clientWidth;
    window.viewHeight = $body.clientHeight;
    resizeCanvas();
    window.scoreSectionWidth;                          //  without borders
    window.borderLineWidth;
    window.inboxViewWidth;                             //  between left and right borders without them
    window.inboxViewHeight;                            //  between bottom and upper border without it thickness
    window.stopController = false;

    //  Values for indication
    window.level = 0;
    window.lifes = 3;
    window.score = 0;
}