window.onload = function () {
    var screen1width = window.screen.width;
    var count = 0;
    //  Autofit
    var intID = setInterval(resizeWindow, 200);
    function resizeWindow() {
        console.log("screen2 resize")
        if (window.screenLeft > screen1width) {
            window.moveTo(window.screen.availLeft, window.screen.availTop);
            window.resizeTo(window.screen.availWidth, window.screen.availHeight);
            if(count > 20) clearInterval(intID);
            count++;
        }
    }
}