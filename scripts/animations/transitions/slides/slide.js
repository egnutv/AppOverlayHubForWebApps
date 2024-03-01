import { selectDomElement } from "../../../utils/selectDomElement.js";

function slide(from, to, direction) {

    let fromElement = selectDomElement(from);
    let toElement = selectDomElement(to);
    let slideDiv;

    let destinationName = fromElement.parentElement.className;
    destinationName = "." + destinationName;

    destinationName.toString();
    
    let destination = selectDomElement(destinationName);

    slideDiv = document.createElement('div');
    slideDiv.className = 'slideDiv';
    slideDiv.style.grid;
    slideDiv.

    console.log("Das Ziel " + destination + " " + destinationName + " ist das Element das gesucht wird")
    switch (direction) {
        case 'up':
        break;
        case 'down':
        break;
        case 'left':
        break;
        case 'right':
        break;


    }

    destination.appendChild(slideDiv);

}

export { slide };