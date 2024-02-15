var count = 0;

class Countdown {

    countdownBackwards() {
        for (i = count; i > 0; count = 0) {
            document.getElementById("count").innerHTML = count;
        }
    }

}