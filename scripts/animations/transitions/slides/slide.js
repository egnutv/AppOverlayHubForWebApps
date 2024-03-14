import { selectDomElement } from "../../../utils/selectDomElement.js";

function slide(from, to, direction) {
    let FromElement = selectDomElement(from);
    let ToElement = selectDomElement(to);

    if (FromElement.className !== "currentElement") {
        FromElement.classList.add("currentElement");
    }
    if (ToElement.className !== "newElement") {
        ToElement.classList.add("newElement");
    }

    let fromElement = selectDomElement(".currentElement");
    let toElement = selectDomElement(".newElement");
    //toElement.style.display = "none";
    
    let element = toElement; // Ersetzen Sie '#meinElement' durch die ID Ihres Elements


    let slideDiv;

    let destinationName = fromElement.parentElement.className;
    destinationName = "." + destinationName;

    destinationName.toString();
    
    let destination = selectDomElement(destinationName);

    slideDiv = document.createElement('div');
    slideDiv.className = 'slideDiv';
    slideDiv.style.display = "grid";
    slideDiv.style.gridTemplateRows = "1f 1fr";
    slideDiv.style.gridAutoColumns = "1fr 1fr";
    
    slideDiv.style.position = "absolute";

    let leftPosition = 0;
    let bottomPosition = 0;
    let newLeftPosition = 0;
    let newBottomPosition = 0;

    switch (direction) {
        case 'up':
            slideDiv.style.height = "200%";
            slideDiv.style.width = "100%";
            slideDiv.style.gridTemplateAreas = '"to to" "from from"';
            newBottomPosition = newBottomPosition - 100;

        break;
        case 'down':
            slideDiv.style.height = "200%";
            slideDiv.style.width = "100%";
            slideDiv.style.gridTemplateAreas = '"from from" "to to"';
            bottomPosition = bottomPosition - 100;
            
        break;
        case 'left':
            slideDiv.style.height = "100%";
            slideDiv.style.width = "200%";
            slideDiv.style.gridTemplateAreas = '"to from" "to from"';
            leftPosition = leftPosition - 100;
            newLeftPosition = newLeftPosition + 100;
            

        break;
        case 'right':
            slideDiv.style.height = "100%";
            slideDiv.style.width = "200%";
            slideDiv.style.gridTemplateAreas = '"from to" "from to"';
            newLeftPosition = newLeftPosition - 100;
        break;
    }

    leftPosition = leftPosition.toString();
    bottomPosition = bottomPosition.toString();

    newLeftPosition = newLeftPosition.toString();
    newBottomPosition = newBottomPosition.toString(); 
    
    slideDiv.style.left = leftPosition + "%";
    slideDiv.style.bottom = bottomPosition + "%";

    //Hinzufügen von den Objekten in das Grid
    
    destination.appendChild(slideDiv);
    slideDiv.appendChild(toElement);
    slideDiv.appendChild(fromElement);


    toElement.style.gridArea = "to";
    fromElement.style.gridArea = "from";
    
    fromElement.classList.add("oldElement");
    fromElement.classList.remove("currentElement");
    fromElement = selectDomElement(".oldElement");

    toElement.style.display = 'block';
    setTimeout(function() {
        toElement.classList.add("currentElement");
        toElement.classList.remove("newElement");
        slideDiv.style.transition = "750ms ease-in-out";

        slideDiv.style.left = newLeftPosition + "%";
        slideDiv.style.bottom = newBottomPosition + "%";
        
    }, 1);

    setTimeout(function() {
        fromElement.style.display = 'none';

        let slideChilds = Array.from(slideDiv.children);
        for (let i = 0; i < slideChilds.length; i++) {
            destination.appendChild(slideChilds[i]);
        }
        destination.removeChild(slideDiv);
        triggerEvents();
    }, 751)

    

    
    
}

export { slide };