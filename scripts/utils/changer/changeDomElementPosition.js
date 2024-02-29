import { selectDomElement } from "../selectDomElement.js";


function changeDomElementPosition(aDestination, toPosition) {

    var toBottom = 0; var toLeft = 0;
    var element = selectDomElement(aDestination);
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

        
        let currentBottomValue = element.style.bottom;
        let currentLeftValue = element.style.left;
    
        // Wenn die Werte leer sind, setzen Sie sie auf '0'
        currentBottomValue = currentBottomValue ? currentBottomValue : '0';
        currentLeftValue = currentLeftValue ? currentLeftValue : '0';
    
        const cleanBottomValue = currentBottomValue.replace(/[^0-9.-]/g, '');
        const cleanLeftValue  = currentLeftValue.replace(/[^0-9.-]/g, '');
        const CurrentBottomValue = parseInt(cleanBottomValue);
        const CurrentLeftValue = parseInt(cleanLeftValue);

        const newBottomValue = CurrentBottomValue + toBottom;
        const newLeftValue = CurrentLeftValue + toLeft;
        
        element.style.bottom = newBottomValue + "%";
        element.style.left = newLeftValue + "%";
        element.style.transition = "750ms";
        
        
        
        console.warn(element + " Bottom: " + CurrentBottomValue + " Left: " + CurrentLeftValue);

}

export { changeDomElementPosition };