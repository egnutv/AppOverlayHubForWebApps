function slide(toPosition) {
    
    let body = document.querySelector("body");
    let children = body.children;
    var toBottom = 0;
    var toLeft = 0;

    switch (toPosition) {
        case "up":
            toBottom += 100;
            break;
        case "down":
            toBottom -= 100;
            break;
        case "left":
            toLeft -= 100;
            break;
        case "right":
            toLeft += 100;
            break;
    }

    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        let currentStyle = window.getComputedStyle(child);
        let currentBottom = parseInt(currentStyle.getPropertyValue('bottom'));
        let currentLeft = parseInt(currentStyle.getPropertyValue('left'));

        // Überprüfen Sie, ob currentBottom und currentLeft NaN sind
        currentBottom = isNaN(currentBottom) ? 0 : currentBottom;
        currentLeft = isNaN(currentLeft) ? 0 : currentLeft;

        // Konvertieren Sie die aktuellen Werte in Prozent
        let parentHeight = child.offsetParent.offsetHeight;
        let parentWidth = child.offsetParent.offsetWidth;
        currentBottom = (currentBottom / parentHeight) * 100;
        currentLeft = (currentLeft / parentWidth) * 100;

        child.style.bottom = (currentBottom + toBottom) + "%";
        child.style.left = (currentLeft + toLeft) + "%";
    }
    
}
