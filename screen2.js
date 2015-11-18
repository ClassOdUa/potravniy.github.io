window.onload = function () {
    var screen1width = window.screen.width;
    //  event
    window.addEventListener("move", resizeWindow);
    //  Autofit
    function resizeWindow() {
        console.log("screen2 resize")
        if (window.screenLeft > screen1width) {
            win.moveTo(window.screen.availLeft, 0);
            win.resizeTo(window.screen.availWidth, window.screen.availHeight);
        }
    }
}