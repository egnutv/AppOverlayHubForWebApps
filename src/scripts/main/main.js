window.onload = function() {
    console.log("testoutput")
}














/*
//SetCookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" (value || "") + expires + "; path=/";
}
//GetCookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

//ButtonClickEvent
  function ElementSwitch(triggerSelector, affectedSelector, triggerEvent, actions) {
    const triggerElement = document.querySelector(triggerSelector);
    const affectedElement = document.querySelector(affectedSelector);

    if (!triggerElement || !affectedElement) {
        console.error(`Elements not found for trigger selector '${triggerSelector}' or affected selector '${affectedSelector}'.`);
        return;
    }

    triggerElement.addEventListener(triggerEvent, function () {
        actions.forEach(action => {
            applyAction(affectedElement, action);
        });
    });
}

function applyAction(element, action) {
    if (action.property && action.value) {
        element.style[action.property] = action.value;
    }
}

function testMemory() {
    // Schritte mit Promise-Objekten
    switch (stepCounter) {
        case 0:
            // Schritt 1: Setzen der JavaScript-Variable
            var test = 'Hallo, dies ist ein Test!';
            console.log('Variable test gesetzt:', test);
            sessionStorage.setItem('test', test); // Speichern der Variable im sessionStorage
            break;

        case 1:
            // Schritt 2: Auslesen der Variable
            readSessionStorage().then(function(storedData) {
                console.log('Daten aus dem sessionStorage abgerufen:', storedData);
            });
            break;

        case 2:
            // Schritt 3: Löschen der Variable
            sessionStorage.removeItem('test');
            console.log('Variable test gelöscht.');
            break;
    }

    // Erhöhen des Schrittzählers
    stepCounter++;

    // Wenn der Zähler 3 erreicht hat, zurücksetzen
    if (stepCounter === 3) {
        stepCounter = 0;
    }
}

// Funktion für den asynchronen Abruf des sessionStorage
function readSessionStorage() {
    return new Promise(function(resolve) {
        setTimeout(function() {
            var storedData = sessionStorage.getItem('test');
            resolve(storedData);
        }, 0);
    });
}
*/
document.addEventListener('DOMContentLoaded', function() {
    userVisitation;
});

function userVisitation() {

}
var initNum = 0;
class Main {

    checkLink() {
        
    }
    initialization(){
        
    }
}