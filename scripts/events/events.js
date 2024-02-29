document.addEventListener("DOMContentLoaded", function() {
    //ActiveEvent();
    //AutoZIndex();
    triggerEvents();

});

function triggerEvents() {
    removeFocusEvent();
    addTransition();
}
var stepCounter = 0;
    

/*function AutoZIndex() {

    let body = document.querySelector("body");

    let children = body.children;

    for (let i = 0; i < children.length; i++) {

        children[i].style.zIndex = i + 1;
    }
}*/

function addTransition() {
    let buttons = document.querySelectorAll("input[type='button']");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.transition = "500ms";
    }
};

function removeFocusEvent() {
    let buttons = document.querySelectorAll("input[type='button']");

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(() => {
                this.blur();
            }, 500);
        });
    });
}


/*function ActiveEvent() {
    let buttons = document.querySelectorAll("input[type='button']");

    buttons.forEach(button => {
        let events = [];
        button.addEventListener('click', function() {
            events.push('click');
            this.id = 'active_clicked';
            setTimeout(() => {
                this.id = '';
            }, 500);
        })
        button.addEventListener('mouseover', function() {
            events.push('mouseover');
            this.id = 'activate_hovered';
        })
        button.addEventListener('mouseout', function() {
            events = [];
            this.id = '';
        })
    });
}*/