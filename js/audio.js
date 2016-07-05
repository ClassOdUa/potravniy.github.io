define(["./main"], function (main) {
    return function() {
        window.startMusic = new Audio("./sound/start.mp3");
        window.brickHitSound = new Audio("./sound/brickHitSound.wav");
        window.metalHitSound = new Audio("./sound/metalHitSound.wav");
        window.lostSliderSound = new Audio("./sound/lostSlider.wav");
        window.catchSound = new Audio("./sound/catch.wav");
        window.surpriseSound = new Audio("./sound/surprise.wav");
        window.bombSound = new Audio("./sound/bomb.wav");
        window.fanfarySound = new Audio("./sound/fanfary.mp3");
        window.gameOverMusic = new Audio("./sound/game_lost.mp3");
        window.applauseSound = new Audio("./sound/applause.mp3");
        window.winnerMusic = new Audio("./sound/fun.mp3");
        startMusic.volume = 0.3;
        brickHitSound.volume = 0.1;
        metalHitSound.volume = 0.1;
        lostSliderSound.volume = 0.2;
        catchSound.volume = 0.2;
        surpriseSound.volume = 0.1;
        bombSound.volume = 0.1;
        fanfarySound.volume = 0.1;
        gameOverMusic.volume = 0.5;
        applauseSound.volume = 0.5;
        winnerMusic.volume = 0.5;
    }
})
