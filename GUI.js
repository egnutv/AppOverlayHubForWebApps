class GUI {
    activeEvent() {
        let buttons = document.querySelectorAll("input, button");

        buttons.forEach(button => {
            let events = [];
            button.addEventListener('click', () => {
                events.push('click');
                button.classList.add('click');
                setTimeout(() => {
                    button.classList.remove('click');
                }, 500);
            });
            button.addEventListener('mouseover', () => {
                events.push('mouseover');
                button.classList.add('hover');
            });
            button.addEventListener('mouseout', () => {
                events = [];
                button.classList.remove('hover');
            });
        });
    }

    addAndRemoveClassName(className, diffName) {
        if (!className.startsWith(".")) {
            className = "." + className;
        }
        let buttons = document.querySelectorAll(className);
        buttons.forEach(button => {
            if (button.classList.contains(diffName)) {
                button.classList.remove(diffName);
            } else {
                button.classList.add(diffName);
            }
        });
    }

    swapClassNames(getName, name01, name02) {
        let element = document.getElementsByClassName(getName)[0];

        if (element.classList.contains(name01)) {
            element.classList.remove(name01);
            element.classList.add(name02);
        } else if (element.classList.contains(name02)) {
            element.classList.remove(name02);
            element.classList.add(name01);
        } else {
            element.classList.add(name02);
        }
    }

    async triggerOpenMenu(menu) {
        this.addAndRemoveClassName("hover", "active");
        this.swapClassNames(menu, "close", "open");
    }

    triggerSwitchDesignMode() {
        this.swapClassNames("hover", "darkmode", "lightmode");
    }
}

export { GUI };
