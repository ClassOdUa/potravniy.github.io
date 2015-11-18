window.onload = function () {
    var Timer = function () {
        this.value = 0;
        return this
    }
    Timer.prototype.set = function (value) {
        if(!isNaN(value)) this.value = value;
    }
    Timer.prototype.increment = function () {
        this.value++;
    }
    Timer.prototype.decrement = function () {
        if (this.value > 0) this.value--;
    }
    Timer.prototype.reset = function () {
        this.value = 0;
    }
    Timer.prototype.toString = function () {
        return convertTimeFromSecondsToString(this.value);
    }
    var $body = document.querySelector("body");
    var myEvent;

    //  Count-UP timer section
    var $divCountUp = document.querySelector("div.count_up");
    var $inputAndDisplayTimeCountUp = $divCountUp.querySelector("input#count_up");
    var $buttonStartStopCountUp = $divCountUp.querySelector("button.start_stop");
    var $buttonResetCountUp = $divCountUp.querySelector("button.reset");
    var $buttonShowCountUp = $divCountUp.querySelector("button.show");
    var countUpTimer = new Timer();
    $inputAndDisplayTimeCountUp.addEventListener('change', function () {
        inputValidation($inputAndDisplayTimeCountUp, countUpTimer);
    })
    $buttonStartStopCountUp.addEventListener("click", startStopCountUp);
    $buttonResetCountUp.addEventListener('click', resetCountUp);
    $buttonShowCountUp.addEventListener('click', switchTimerOutput);

    function startStopCountUp(event) {
        if ($buttonStartStopCountUp.textContent === "Пуск") {
            $buttonStartStopCountUp.textContent = "Пауза";
            $body.addEventListener('newSecond', updateCountUpTimer);
        } else if ($buttonStartStopCountUp.textContent === "Пауза") {
            $buttonStartStopCountUp.textContent = "Пуск";
            $body.removeEventListener('newSecond', updateCountUpTimer);
        }
    }
    function updateCountUpTimer() {
        countUpTimer.increment();
        $inputAndDisplayTimeCountUp.value = countUpTimer.toString();
    }
    function resetCountUp() {
        if ($buttonStartStopCountUp.textContent === "Пауза") {
            $buttonStartStopCountUp.textContent = "Пуск";
            $body.removeEventListener('newSecond', updateCountUpTimer);
        }
        countUpTimer.reset();
        $inputAndDisplayTimeCountUp.value = "";
    }

    //  Count-DOWN timer section
    var $divCountDown = document.querySelector("div.count_down");
    var $inputAndDisplayTimeCountDown = $divCountDown.querySelector("input#count_down");
    var $buttonStartStopCountDown = $divCountDown.querySelector("button.start_stop");
    var $buttonResetCountDown = $divCountDown.querySelector("button.reset");
    var $buttonShowCountDown = $divCountDown.querySelector("button.show");
    var countDownTimer = new Timer();
    $inputAndDisplayTimeCountDown.addEventListener('change', function () {
        inputValidation($inputAndDisplayTimeCountDown, countDownTimer);
    })
    $buttonStartStopCountDown.addEventListener("click", startStopCountDown);
    $buttonResetCountDown.addEventListener('click', resetCountDown);
    $buttonShowCountDown.addEventListener('click', switchTimerOutput);

    function startStopCountDown() {
        if ($buttonStartStopCountDown.textContent === "Пуск") {
            $buttonStartStopCountDown.textContent = "Пауза";
            $body.addEventListener('newSecond', updateCountDownTimer);
        } else if ($buttonStartStopCountDown.textContent === "Пауза") {
            $buttonStartStopCountDown.textContent = "Пуск";
            $body.removeEventListener('newSecond', updateCountDownTimer);
        }
    }
    function updateCountDownTimer() {
        countDownTimer.decrement();
        $inputAndDisplayTimeCountDown.value = countDownTimer.toString();
        if (countDownTimer.value === 0) {
            $buttonStartStopCountDown.textContent = "Пуск";
            $body.removeEventListener('newSecond', updateCountDownTimer);
            $inputAndDisplayTimeCountDown.style["background-color"] = "red";
        }
    }
    function resetCountDown() {
        if ($buttonStartStopCountDown.textContent === "Пауза") {
            $buttonStartStopCountDown.textContent = "Пуск";
            $body.removeEventListener('newSecond', updateCountDownTimer);
        }
        countDownTimer.reset();
        $inputAndDisplayTimeCountDown.value = "";
        $inputAndDisplayTimeCountDown.style["background-color"] = "lightblue";
    }

    //  DEADLINE timer section
    var $divDeadline = document.querySelector("div.deadline");
    var $inputAndDisplayTimeDeadline = $divDeadline.querySelector("input#deadline");
    var $displayTimeLeft = $divDeadline.querySelector("input#deadline_show");
    var $buttonResetDeadline = $divDeadline.querySelector("button.reset");
    var $buttonShowDeadline = $divDeadline.querySelector("button.show");
    var DeadlineTimer = new Timer();
    DeadlineTimer.timeLeft = function () {
        var timer = Math.floor((this.value - new Date()) / 1000);
        if (timer < 0) return;
        var h = Math.floor(timer / 3600);
        var m = Math.floor((timer - h * 3600) / 60);
        var s = Math.floor(timer - h * 3600 - m * 60);
        var timerString = "";
        if (h > 0) {
            timerString = h + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
        } else {
            timerString = m + ":" + (s < 10 ? "0" + s : s);
        }
        return timerString;
    }
    $inputAndDisplayTimeDeadline.addEventListener('change', function () {
        var deadlineTimeInSeconds = validateInput($inputAndDisplayTimeDeadline);
        if (deadlineTimeInSeconds.isValid) {
            var enteredTime = convertTimeFromSecondsToString(deadlineTimeInSeconds.value);
            if (enteredTime.length === 4) {
                enteredTime = "00:0" + enteredTime;
            } else if (enteredTime.length === 5) {
                enteredTime = "00:" + enteredTime;
            } else if (enteredTime.length === 7) {
                enteredTime = "0" + enteredTime;
            }
            $inputAndDisplayTimeDeadline.value = enteredTime;
            var endTime = new Date();
            endTime.setHours(+enteredTime.substring(0, 2));
            endTime.setMinutes(+enteredTime.substring(3, 5));
            endTime.setSeconds(+enteredTime.substring(6));
            if (endTime < new Date()) {
                endTime.setDate(endTime.getDate() + 1);
            }
            DeadlineTimer.value = endTime;
            $body.addEventListener('newSecond', updateDeadlineTimer);
        } else {
            resetDeadline();
        }

    })
    $buttonResetDeadline.addEventListener('click', resetDeadline);
    $buttonShowDeadline.addEventListener('click', switchTimerOutput);

    function updateDeadlineTimer() {
        $displayTimeLeft.value = DeadlineTimer.timeLeft();
        if ($displayTimeLeft.value === "0:00") {
            $body.removeEventListener('newSecond', updateDeadlineTimer);
            $inputAndDisplayTimeDeadline.style["background-color"] = "red";
            $displayTimeLeft.style.color = "red";
        }
    }
    function resetDeadline() {
        $body.removeEventListener('newSecond', updateDeadlineTimer);
        DeadlineTimer.reset();
        $inputAndDisplayTimeDeadline.value = "";
        $inputAndDisplayTimeDeadline.style["background-color"] = "lightblue";
        $displayTimeLeft.value = "";
        $displayTimeLeft.style.color = "black";
    }

    //  Second window section
    var screen2 = null;
    var $screen2Timer = null;
    var $screen2Message = null;
    $screen2OpenCloseButton = $body.querySelector("button#screen2");
    $screen2OpenCloseButton.addEventListener('click', openCloseScreen2);
    function openCloseScreen2() {
        console.log("openCloseScreen2", screen2 == null);
        if (screen2) screen2WindowClose();
        else screen2WindowCreate();
    }
    function screen2WindowCreate() {
        var strWindowFeatures = "menubar=no, location=no, locationbar=no, toolbar=no, personalbar=no, status=no, resizable=yes, scrollbars=no,status=no";
        var strWindowPositionAndSize = "height=500,width=400";
        screen2 = window.open("screen2.html", "screen2nd", strWindowPositionAndSize + "," + strWindowFeatures);
//        console.log(screen2);
        screen2.onload = function () {
            $screen2Timer = screen2.document.querySelector("div#time_left");
            $screen2Message = screen2.document.querySelector("div#message_show");
            console.log($screen2Timer, $screen2Message);
            $screen2OpenCloseButton.textContent = "Закрыть окно суфлера";
        };
    }
    function screen2WindowClose() {
        $screen2Timer = null;
        $screen2Message = null;
        screen2.close();
        screen2 = null;
        $screen2OpenCloseButton.textContent = "Создать окно суфлера";
    }

    //  Messaging section
    var $inputMessageString = document.querySelector("textarea#message");
    $inputMessageString.addEventListener("change", processMessage);
    $inputMessageString.addEventListener("keydown", processKeyDow);
    function processMessage() {
        if (screen2) {
            $displayMessageString.textContent = $inputMessageString.value;
            $screen2Message.textContent = $inputMessageString.value;
        } else $displayMessageString.textContent = "Нет окна суфлера";
    }
    function processKeyDow(event) {
        if (event.keyCode === 13) {
            processMessage();
            event.preventDefault();
        } else if (event.keyCode === 27) {
            $displayMessageString.textContent = $inputMessageString.value = "";
            processMessage();
        }
    }
    var $displayMessageString = document.querySelector("div#message_show");

    //  Timer output section
    var $displayOutputTimer = document.querySelector("div#time_left");
    var currentSourceForOutput = null;
    var showTimerIntervalID;
    function switchTimerOutput(event) {
        clearInterval(showTimerIntervalID);
        $buttonShowCountUp.style['background-color'] = $buttonShowCountDown.style['background-color'] = $buttonShowDeadline.style['background-color'] = 'buttonface';
        if(!screen2) return
        switch (event.srcElement) {
            case $buttonShowCountUp:
                if (currentSourceForOutput === $inputAndDisplayTimeCountUp) {
                    currentSourceForOutput = null;
                    $displayOutputTimer.textContent = "";
                    if (screen2) $screen2Timer.textContent = "";
                } else {
                    currentSourceForOutput = $inputAndDisplayTimeCountUp;
                    showTimer();
                    $buttonShowCountUp.style['background-color'] = 'green';
                }
                break
            case $buttonShowCountDown:
                if (currentSourceForOutput === $inputAndDisplayTimeCountDown) {
                    currentSourceForOutput = null;
                    $displayOutputTimer.textContent = "";
                    if (screen2) $screen2Timer.textContent = "";
                } else {
                    currentSourceForOutput = $inputAndDisplayTimeCountDown;
                    showTimer();
                    $buttonShowCountDown.style['background-color'] = 'green';
                }
                break
            case $buttonShowDeadline:
                if (currentSourceForOutput === $displayTimeLeft) {
                    currentSourceForOutput = null;
                    $displayOutputTimer.textContent = "";
                    if (screen2) $screen2Timer.textContent = "";
                } else {
                    currentSourceForOutput = $displayTimeLeft;
                    showTimer();
                    $buttonShowDeadline.style['background-color'] = 'green';
                }
                break
        }
        function showTimer() {
            showTimerIntervalID = setInterval(show, 100);
            function show() {
                if (!$screen2Timer) {
                    $displayOutputTimer.textContent = "";
                    return
                }
                $displayOutputTimer.textContent = $screen2Timer.textContent = currentSourceForOutput.value;
            }
        }
    }

    // Event emitter "newSecond"
    var currentTimeInSeconds = Math.floor(Date.now() / 1000);
    var newSecondIntervalID = setInterval(changeCurrentTimeEverySecond, 100);
    function changeCurrentTimeEverySecond() {
        var newTimeInSeconds = Math.floor(Date.now() / 1000);
        if (currentTimeInSeconds !== newTimeInSeconds) {
            currentTimeInSeconds = newTimeInSeconds;
            myEvent = new Event('newSecond');
            $body.dispatchEvent(myEvent);
        }
    }

    //  Functions
    function inputValidation($input, timer) {
        var input = validateInput($input);
        if (input.isValid) {
            timer.set(input.value);
        }
    }
    function validateInput($input) {
        var timeString = ($input.value ? $input.value : 0);
        var result = {
            value: NaN,
            isValid: false
        }
        if (isNaN(timeString)) {
            var validChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ":"];
            var timeNumber = 0;
            for (var i = 0; i < timeString.length; i++) {
                var areValid = validChars.some(function (item) {
                    return timeString[i] == item;
                })
                if (!areValid) {
                    alert("Допустимо вводить только цифры и двоеточия.");
                    return result
                }
                if (timeString[i] !== ":") timeNumber = timeNumber * 10 + (+timeString[i]);
            }
        } else timeNumber = timeString;

        var hours = Math.floor(timeNumber / 10000);
        if (hours > 23) {
            alert("Значение 'часов' больше 23.");
            return result
        }
        var minutes = Math.floor((timeNumber - hours * 10000) / 100);
        if (minutes > 59) {
            alert("Значение 'минут' больше 59.");
            return result
        }
        var seconds = Math.floor(timeNumber - hours * 10000 - minutes * 100);
        if (seconds > 59) {
            alert("Значение 'секунд' больше 59.");
            return result
        }
        var timeInSeconds = hours * 3600 + minutes * 60 + seconds;
        $input.value = convertTimeFromSecondsToString(timeInSeconds);
        return result = {
            value: timeInSeconds,
            isValid: true
        }
    }
    function convertTimeFromSecondsToString(timeInSeconds) {
        var h = Math.floor(timeInSeconds / (3600));
        var m = Math.floor((timeInSeconds - h * 3600) / 60);
        var s = Math.floor(timeInSeconds - h * 3600 - m * 60);
        var timeString = "";
        if (h > 0) {
            timeString = h + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
        } else {
            timeString = m + ":" + (s < 10 ? "0" + s : s);
        }
        return timeString;
    }



    //function convertTimeFromStringToSeconds(timeString) {
    //    timeString
    //    return timeInSeconds
    //}


    //$body.addEventListener("keyup", function (event) {
    //    if (event.keyCode === 13 && $inputTime === document.activeElement) start();
    //});
    //$btnShowMessage.addEventListener("click", showMessage);
    //$btnRemoveMessage.addEventListener("click", removeMessage);
    //$textAreaMessage.addEventListener("keyup", function (event) {
    //    if (event.keyCode === 13 && $textAreaMessage === document.activeElement) showMessage();
    //})
    //$textAreaMessage.addEventListener("keyup", function (event) {
    //    if (event.keyCode === 27 && $textAreaMessage === document.activeElement) {
    //        removeMessage();
    //    }
    //})

    //function start() {
    //    $textAreaMessage.focus();
    //    var endTime = new Date();
    //    var inputTime = $inputTime.value;
    //    if (!inputTime) return;
    //    createEndTime();
    //    if (endTime < new Date()) {
    //        endTime.setDate(endTime.getDate() + 1);
    //    }
    //    clearInterval(intervalID);
    //    goCountDown();
    //    intervalID = setInterval(goCountDown, 100);

    //    function goCountDown() {
    //        var timer = Math.floor((endTime - new Date()) / 1000);
    //        if (timer < 0) return;
    //        var h = Math.floor(timer / (3600));
    //        var m = Math.floor((timer - h * 3600) / 60);
    //        var s = Math.floor(timer - h * 3600 - m * 60);
    //        var timerString = "";
    //        if (h > 0) {
    //            timerString = h + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
    //            $divShowTimerBig.style["font-size"] = 25 + "vw";
    //        } else if (m > 0) {
    //            timerString = m + ":" + (s < 10 ? "0" + s : s);
    //            $divShowTimerBig.style["font-size"] = 33 + "vw";
    //        } else {
    //            timerString = ":" + (s < 10 ? "0" + s : s);
    //            $divShowTimerBig.style["font-size"] = 42 + "vw";
    //        }
    //        $divShowTimerSmall.innerHTML = timerString;
    //        $divShowTimerBig.innerHTML = timerString;
    //    }
    //    function createEndTime() {
    //        endTime.setHours(+inputTime.substring(0, 2));
    //        endTime.setMinutes(+inputTime.substring(3, 5));
    //        endTime.setSeconds(+inputTime.substring(6));
    //    }
    //}
    //function showMessage() {
    //    $divMessageShow.innerHTML = $textAreaMessage.value;
    //}
    //function removeMessage() {
    //    $divMessageShow.innerHTML = "";
    //    $textAreaMessage.value = "";
    //}
}