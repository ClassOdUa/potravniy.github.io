window.onload = function () {
    var screen1width = window.screen.width;
    window.addEventListener("move", resizeWindow);
    function resizeWindow() {
        if (window.screenLeft > screen1width) {
            win.moveTo(window.screenLeft, window.screenTop);
            win.resizeTo(window.screen.width, window.screen.height);
        }
    }
}