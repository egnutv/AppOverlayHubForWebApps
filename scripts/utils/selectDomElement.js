function selectDomElement(aDestination) {
    var destination = aDestination;
    var letterOfDestination = destination.charAt(0);
    
    switch (letterOfDestination) {
        case '.':
            destination = destination.replace(letterOfDestination, "");
            destination = document.getElementsByClassName(destination)[0];
            break;
        case '#':
            destination = destination.replace(letterOfDestination, "");
            destination = document.getElementById(destination);
            break;
        default:
            destination = document.querySelector(destination);
            break;
    }
    
    console.warn("INPUT: " + aDestination);
    console.warn("DESTINATION IN DOM SELECTOR: " + destination);
    return destination;
}

export { selectDomElement };
