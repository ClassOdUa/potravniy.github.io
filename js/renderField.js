define(["./main"], function(main){
    return function () {

        //  Border outline points
        //  1---------------5
        //  9 2-----------6 |
        //  | |...........| |
        //  | |...........| |
        //  | |...........| |
        //  | |...........| |
        //  4-3...........7-8
        var point1 = {x: 0,                                     y: 0};
        var point2 = {x: borderLineWidth,                       y: borderLineWidth};
        var point3 = {x: borderLineWidth,                       y: viewHeight};
        var point4 = {x: 0,                                     y: viewHeight};
        var point5 = {x: inboxViewWidth + 2 * borderLineWidth,  y: 0};
        var point6 = {x: inboxViewWidth + borderLineWidth,      y: borderLineWidth};
        var point7 = {x: inboxViewWidth + borderLineWidth,      y: viewHeight};
        var point8 = {x: inboxViewWidth + 2 * borderLineWidth,  y: viewHeight};
        var point9 = {x: 0,                                     y: borderLineWidth};

        window.ctxClearAll = function () {
            ctx.clearRect(0, 0, viewWidth, viewHeight);
        }
        window.ctxClearInGameBox = function () {
            ctx.clearRect(borderLineWidth, borderLineWidth, inboxViewWidth, inboxViewHeight);
        }

        ctxClearAll();

        drawBorder(point1, point2, point3, point4, point9, point2);
        drawBorder(point5, point6, point7, point8, point7, point8);
        drawBorder(point1, point2, point6, point5, point1, point9);
        drawSignsOfScoreSection();

        //  Functions
        function drawBorder(path1point, path2point, path3point, path4point, gradient1point, gradient2point) {
            var grd = ctx.createLinearGradient(gradient1point.x, gradient1point.y, gradient2point.x, gradient2point.y);
            grd.addColorStop(0, "black");
            grd.addColorStop(0.5, "#777");
            grd.addColorStop(1, "black");
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.moveTo(path1point.x, path1point.y);
            ctx.lineTo(path2point.x, path2point.y);
            ctx.lineTo(path3point.x, path3point.y);
            ctx.lineTo(path4point.x, path4point.y);
            ctx.closePath();
            ctx.fill();
        }
        function drawSignsOfScoreSection() {
            ctx.textAlign = "center";
            ctx.textBaseline = 'middle';
            ctx.fillStyle = "goldenrod";
            ctx.font = scoreSectionWidth * 0.18 + 'px Courgette';
            var middleOfScoreSectionX = viewWidth - scoreSectionWidth / 2;
            ctx.fillText("Level", middleOfScoreSectionX, viewHeight * 0.12);
            ctx.fillText("Lifes", middleOfScoreSectionX, viewHeight * 0.42);
            ctx.fillText("Score", middleOfScoreSectionX, viewHeight * 0.72);
        }
    }
})
