let isPaused = false;
let isStopped = false;
const pads = new GamePads();

function checkAvailableLikes() {

    if (pads.subscription.length > 0) {
        const countdownText = pads.counter.textContent;
        const countdownSplit = countdownText.split(':');
        //convert to seconds
        const seconds = (+countdownSplit[0]) * 60 * 60 + (+countdownSplit[1]) * 60 + (+countdownSplit[2]);
        //and then milliseconds
        return seconds * 1000;
    }
    return 0;
}

function GamePads() {
    let gamepad = document.getElementsByClassName('recsGamepad')[0];
    this.subscription = document.getElementsByClassName('productButton__subscriptionButton');
    this.passButton = gamepad.getElementsByTagName('button')[1];
    this.superLikeButton = gamepad.getElementsByTagName('button')[2];
    this.likeButton = gamepad.getElementsByTagName('button')[3];
    this.counter = document.getElementsByClassName('Fz($ml)')[0];
}

function getRandomPeriod() {
    return Math.floor(Math.random() * (5000 - 500 + 1)) + 500;
}

document.onkeydown = (ev) => {
    switch (ev.key) {
        case ' ':
            isPaused = !isPaused;
            console.log("Press Spacebar again to Pause/Continue");
            break;
        case 's':
            console.log("STOPPED");
            isStopped = true;
            break;
    }
};

function likeOrPass() {
    let randomLiker = Math.floor(Math.random() * (12 - 1 + 1) + 1);
    if (randomLiker > 10)
        pads.passButton.click();
    else
        pads.likeButton.click();
}

function swipeRight() {
    if (isStopped)
        return;
    // A random period between 500ms and 2secs
    let randomPeriod = getRandomPeriod();

    setTimeout(() => {
        let isOutOfLikes = false;

        const delay = checkAvailableLikes();
        if (delay > 0) {
            console.log('Out of likes, have to wait: ' + delay + ' ms');
            randomPeriod = delay;
            isOutOfLikes = true;
        }

        if (!isOutOfLikes) {
            if (isPaused) {
                setTimeout(swipeRight, randomPeriod);
            } else {
                likeOrPass();
                swipeRight();
            }
        } else {
            setTimeout(() => swipeRight(), randomPeriod);
        }
    }, randomPeriod);
}

console.log("PRESS SPACEBAR TO PAUSE/CONTINUE");
console.log("PRESS 's' KEY TO STOP");
console.log("RELOAD PAGE ONCE YOU ARE DONE");
swipeRight();
