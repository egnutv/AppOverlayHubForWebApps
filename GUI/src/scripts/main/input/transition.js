class TransitionContent {
    constTransition(transition, to, effectOn) {
        switch(transition) {
            case "slide":
                this.slideTo(to, effectOn);
                break;
        }
    }
    slideTo(to, effectOn){
        var selection;
        if (effectOn === "body") {
            selection = document.body;
        } else {
            selection = document.getElementById(effectOn);
        }

        switch(to) {
            case "down":
                selection.style.transform = 'translateY(100%)';
                break;
            case "right":
                selection.style.transform = 'translateX(100%)';
                break;
            case "up":
                selection.style.transform = 'translateY(-100%)';
                break;
            case "left":
                selection.style.transform = 'translateX(-100%)';
                break;
            case "origin":
                selection.style.transform = 'translate(0%, 0%)';
                break;
        }
    }
}