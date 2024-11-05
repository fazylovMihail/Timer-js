const timerOutputSelector = '.timer__output';
const timerSelector = '.timer';
const outputButtonSelector = '.timer-output-btn';
const startButtonSelector = ".button__start";
const stopButtonSelector = ".button__stop";
const hoursInputSelector = "#hours";
const minutesInputSelector = "#minutes";
const secondsInputSelector = "#seconds";

const hoursInput = document.querySelector(hoursInputSelector);
const minutesInput = document.querySelector(minutesInputSelector);
const secondsInput = document.querySelector(secondsInputSelector);
const startButton = document.querySelector(startButtonSelector);
const stopButton = document.querySelector(stopButtonSelector);
const timer = document.querySelector(timerSelector);

let intervalId;
let remainingTime;


function startTimer(event) {
    event.preventDefault();
    const hours = parseInt(hoursInput.value ? hoursInput.value : 0);
    const minutes = parseInt(minutesInput.value ? minutesInput.value : 0);
    const seconds = parseInt(secondsInput.value ? secondsInput.value : 0);
    remainingTime = hours * 3600 + minutes * 60 + seconds;
    setTimeout(() => {
        intervalId = setInterval(updateTimer, 1000);
        hideElement(startButton);
        showElement(stopButton);
        setTimeout(() => {
            stopButton.style.opacity = 0.1;
        }, 1000)
        document.documentElement.requestFullscreen();
    }, 1000);
}

function stopTimer() {
    clearInterval(intervalId);
    setTimeout(() => {
        hideElement(stopButton);
        showElement(startButton);
        document.exitFullscreen();
    }, 2000);
}

function hideElement(element) {
    element.classList.add('hide');
}

function showElement(element) {
    element.classList.remove('hide');
}

function updateTimer() {
    if (remainingTime >= 0) {
        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = remainingTime % 60;

        hoursInput.value = hours.toString().padStart(2, '0');
        minutesInput.value = minutes.toString().padStart(2, '0');
        secondsInput.value = seconds.toString().padStart(2, '0');

        remainingTime--;
    } else {
        stopTimer();
    }
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);