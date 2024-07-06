function selectDomElement(aDestination) {
    var destination = aDestination;
    console.warn("Das Ziel: " + aDestination);
    var letterOfDestination = destination.charAt(0);

    try {
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
                try {
                    destination = document.querySelector(destination);
                } catch (e) {
                    console.error(e);
                }

                if (!destination) {
                    try {
                        destination = document.getElementsByClassName(aDestination)[0];
                    } catch (e) {
                        console.error(e);
                    }
                }

                if (!destination) {
                    try {
                        destination = document.getElementById(aDestination);
                    } catch (e) {
                        console.error(e);
                    }
                }

                if (!destination) {
                    throw new Error("Das Ziel konnte nicht gefunden werden.");
                }
                break;
        }
    } catch (e) {
        console.error(e);
    }

    console.warn("INPUT: " + aDestination);
    console.warn("DESTINATION IN DOM SELECTOR: " + destination);
    return destination;
}

export { selectDomElement };
