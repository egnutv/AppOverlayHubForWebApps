import { readHTML } from "../storageManagement/reader/readHTML.js";
import { readJson } from "../storageManagement/reader/readJSON.js"

async function copyPasteTemplate(name, destination) {
    await copyTemplate(name, destination);
    
    await pasteTemplate(name, destination);
}
async function copyTemplate(name, destination) {
    let target;
    switch (destination[0]) {
        case '.':
            target = document.getElementsByClassName(destination.substring(1))[0]; 
        break;
        case '#':
            target = document.getElementById(destination.substring(1));
        break;
        default:
            target = document.querySelector(destination); 
        break;
    }
    var tempDivCount = target.getElementsByClassName('tempDiv').length;
    var nameCount = target.getElementsByClassName(name).length;
    if (tempDivCount === 0 && nameCount === 0) {

        await readJson('data/src/packs/templates/sites/index.json', 'index.' + name)
        .then(pathArray => {
            if (pathArray && pathArray.length > 0) {
                let path = pathArray[0];
                readHTML('data/src/packs/templates/sites/' + path + '.html')
                .then(data => {
                    let value = data;
                    pasteTemplate(name, value, destination, target);
                    console.log("Angegebener Name: " + name + " | Wert des Template: " + value + " | Einfügeziel: " + target); 
                })
                .catch(error => console.error('Error:', error));
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

async function pasteTemplate(name, value, destination, target) {
    var count = target.getElementsByClassName('tempDiv').length;
    if (count === 0) {
        let tempDiv = document.createElement('div');
        tempDiv.className = 'tempDiv'; // Setzen Sie den Klassennamen hier
        target.appendChild(tempDiv);

        let TheTempDiv = document.getElementsByClassName('tempDiv')[0];

        TheTempDiv.innerHTML = value;
        
        var tempCount = TheTempDiv.childElementCount;
        console.warn(tempCount + " ist die Zahl.")

        for (let i = 0; i < TheTempDiv.children.length; i++) {
            TheTempDiv.children[i].classList.add(name);
        }

        while (TheTempDiv.firstChild) {
            target.appendChild(TheTempDiv.firstChild);
        }
        target.removeChild(TheTempDiv);
    }
}


function removeTemplate() {
    let scripts = document.getElementsByClassName(name);
    while(scripts[0]) {
        scripts[0].parentNode.removeChild(scripts[0]);
    }
}

export { copyTemplate, pasteTemplate, removeTemplate};