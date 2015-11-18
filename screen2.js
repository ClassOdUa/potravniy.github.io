window.onload = function () {
    var screen1width = window.screen.width;
    //  event
    window.addEventListener("move", resizeWindow);
    //  Autofit
    function resizeWindow() {
        if (window.screenLeft > screen1width) {
            win.moveTo(window.screenLeft, window.screenTop);
            win.resizeTo(window.screen.width, window.screen.height);
        }
    }
}