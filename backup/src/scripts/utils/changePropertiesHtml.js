//change Position of an defined object
var originalValues = {};
var isOriginal = true;

function toggleChanges(changes, elementId){
    if (!Array.isArray(changes)) {
        console.error('Fehler: changes sollte ein Array sein');
        return;
    } 

    if (typeof elementId !== 'string') {
        console.error('Fehler: object sollte ein String sein');
        return;
    }   

    if (isOriginal) {
        // Wenn der Button im ursprünglichen Zustand ist, wenden Sie die Änderungen an
        applyChanges(changes, elementId);
    } else {
        // Wenn der Button nicht im ursprünglichen Zustand ist, setzen Sie die Änderungen zurück
        resetChanges(elementId);
    }

    // Wechseln Sie den Zustand des Buttons
    isOriginal = !isOriginal;
}

function applyChanges(changes, elementId){
    if (!Array.isArray(changes)) {
        console.error('Fehler: changes sollte ein Array sein');
        return;
    } 

    if (typeof elementId !== 'string') {
        console.error('Fehler: object sollte ein String sein');
        return;
    }   
    let element = document.getElementById(elementId);
    let currentAttribute = '';

    // Durchlaufen Sie jede Änderung im übergebenen Array
    for (let i = 0; i < changes.length; i++) {
        let change = changes[i];
        // Überprüfen Sie, ob die Änderung ein Attribut ist (endet mit '=')
        if (change.endsWith('=')) {
            currentAttribute = change.slice(0, -1); // Entfernen Sie das '=' vom Attribut
        } else if (currentAttribute) {
            // Wenn es ein aktuelles Attribut gibt, wenden Sie die Änderung an
            let subAttributes = currentAttribute.split('.');
            let target = element;
            for (let j = 0; j < subAttributes.length - 1; j++) {
                target = target[subAttributes[j]];
            }
            // Speichern Sie den ursprünglichen Wert, bevor Sie ihn ändern
            if (!originalValues.hasOwnProperty(elementId)) {
                originalValues[elementId] = {};
            }
            originalValues[elementId][currentAttribute] = target[subAttributes[subAttributes.length - 1]];
            // Wenden Sie die Änderung an
            if (currentAttribute === 'class') {
                target.className = change;
            } else {
                target[subAttributes[subAttributes.length - 1]] = change;
            }
            currentAttribute = ''; // Setzen Sie das aktuelle Attribut zurück
        }
    }
}

function resetChanges(elementId) {
    if (typeof elementId !== 'string') {
        console.error('Fehler: object sollte ein String sein');
        return;
    }   
    let element = document.getElementById(elementId);

    // Überprüfen Sie, ob es gespeicherte ursprüngliche Werte für dieses Element gibt
    if (originalValues.hasOwnProperty(elementId)) {
        // Durchlaufen Sie jedes gespeicherte Attribut und setzen Sie es zurück auf seinen ursprünglichen Wert
        for (let attr in originalValues[elementId]) {
            let subAttributes = attr.split('.');
            let target = element;
            for (let j = 0; j < subAttributes.length - 1; j++) {
                target = target[subAttributes[j]];
            }
            if (attr === 'class') {
                target.className = originalValues[elementId][attr];
            } else {
                target[subAttributes[subAttributes.length - 1]] = originalValues[elementId][attr];
            }
        }
    }
}