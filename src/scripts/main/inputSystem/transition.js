var aElement;
var Origin;
class TransitionContent {
    constTransition(transition, to, effectOn) {
        switch(transition) {
            case (transition = "slide"):
                this.slideTo(to, effectOn);
                break;
        }
    }
    slideTo(to, effectOn){
        var selection;
        if (effectOn = "body") {
            selection = document.body
        } else {
            selection = document.getElementById(effectOn)
        }

        switch(to) {
            case(to = "down"):
                selection.style.transform = 'translateY(100%)';
                break;
            case(to = "right"):
                selection.style.transform = 'translateX(100%)';
                break;
            case(to = "up"):
                selection.style.transform = 'translateY(-100%)';
                break;
            case(to = "left"):
                selection.style.transform = 'translateX(-100%)';
                break;
            case(to = "origin"):
                selection.style.transform = 'translate(0, 0)';
                break;
        }
    }
}