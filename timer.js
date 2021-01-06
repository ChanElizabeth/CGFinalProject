let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

function start() {
    stop();
    cron = setInterval(() => { timer(); }, 100);
}

function stop() {
    clearInterval(cron);
    clearTimeout(timer);
}

function timer() {

    if ((millisecond += 10) == 1000) {
        millisecond = 0;
        second++;
    }
    if (second == 60) {
        second = 0;
        minute++;
    }
    if (minute == 60) {
        minute = 0;
        hour++;
    }

    setTimeout(timer, 100);
}

function returnData(input) {
return input > 10 ? input : `0${input}`
}
