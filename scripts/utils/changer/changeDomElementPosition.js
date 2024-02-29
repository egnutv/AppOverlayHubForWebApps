import { selectDomElement } from "../selectDomElement";

function changeDomElementPosition(destination, toPosition) {
    const element = selectDomElement(destination);
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
    }

        
        let currentBottomValue = destination.style.bottom;
        let currentLeftValue = destination.style.left;
    
        // Wenn die Werte leer sind, setzen Sie sie auf '0'
        currentBottomValue = currentBottomValue ? currentBottomValue : '0';
        currentLeftValue = currentLeftValue ? currentLeftValue : '0';
    
        const cleanBottomValue = currentBottomValue.replace(/[^0-9.-]/g, '');
        const cleanLeftValue  = currentLeftValue.replace(/[^0-9.-]/g, '');
        const CurrentBottomValue = parseInt(cleanBottomValue);
        const CurrentLeftValue = parseInt(cleanLeftValue);

        const newBottomValue = CurrentBottomValue + toBottom;
        const newLeftValue = CurrentLeftValue + toLeft;
        
        destination.style.bottom = newBottomValue + "%";
        destination.style.left = newLeftValue + "%";
        destination.style.transition = "750ms";
        
        
        console.warn(destination + " Bottom: " + CurrentBottomValue + " Left: " + CurrentLeftValue);

}
window.changeDomElementPosition = changeDomElementPosition;
export { changeDomElementPosition };