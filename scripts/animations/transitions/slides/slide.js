async function slide(toPosition, area, targets) {
    
    let body = document.querySelector(area);
    let children = body.children;
    var toBottom = 0;
    var toLeft = 0;
    
    
    switch (toPosition) {
        case "down":
            toBottom += 100;
            break;
        case "up":
            toBottom -= 100;
            break;
        case "right":
            toLeft -= 100;
            break;
        case "left":
            toLeft += 100;
            break;
            case "random":
                var random = Math.random();
                if (random <= 0.25) {
                    toPosition = "down";
                } else if (random > 0.25 && random <= 0.5) {
                    toPosition = "up";
                } else if (random > 0.5 && random <= 0.75) {
                    toPosition = "right";
                } else {
                    toPosition = "left";
                }
                slide(toPosition, area, targets)
                break;
    }

    for (let i = 0; i < children.length; i++) {
        console.warn("Und die Zahl der Kinder ist: " + children.length);
        let child = children[i];
        
        let currentBottomValue = child.style.bottom;
        let currentLeftValue = child.style.left;
    
        // Wenn die Werte leer sind, setzen Sie sie auf '0'
        currentBottomValue = currentBottomValue ? currentBottomValue : '0';
        currentLeftValue = currentLeftValue ? currentLeftValue : '0';
    
        const cleanBottomValue = currentBottomValue.replace(/[^0-9.-]/g, '');
        const cleanLeftValue  = currentLeftValue.replace(/[^0-9.-]/g, '');
        const CurrentBottomValue = parseInt(cleanBottomValue);
        const CurrentLeftValue = parseInt(cleanLeftValue);

        const newBottomValue = CurrentBottomValue + toBottom;
        const newLeftValue = CurrentLeftValue + toLeft;
        
        child.style.bottom = newBottomValue + "%";
        child.style.left = newLeftValue + "%";
        child.style.transition = "750ms";
        
        
        console.warn(child + " " + "Nummer " + i + " Bottom: " + CurrentBottomValue + " Left: " + CurrentLeftValue);
    }
    
    
}

/*
    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        let currentStyle = window.getComputedStyle(child);
        let currentBottom = parseInt(currentStyle.getPropertyValue('bottom'));
        let currentLeft = parseInt(currentStyle.getPropertyValue('left'));

        // Überprüfen Sie, ob currentBottom und currentLeft NaN sind
        currentBottom = isNaN(currentBottom) ? 0 : currentBottom;
        currentLeft = isNaN(currentLeft) ? 0 : currentLeft;

        // Konvertieren Sie die aktuellen Werte in Prozent
        // Konvertieren Sie die aktuellen Werte in Prozent
        let parentHeight = 0;
        let parentWidth = 0;

        if (child.offsetParent) {
            parentHeight = child.offsetParent.offsetHeight;
            parentWidth = child.offsetParent.offsetWidth;
        }

        currentBottom = (currentBottom / parentHeight) * 100 + '%';
        currentLeft = (currentLeft / parentWidth) * 100 + '%';

        child.style.transition = "750ms";
    }*/
    

