var stepCounter = 0;
var lastStep = false;

function changeTheme() {
    if (lastStep == false) {
        for (var i = 0; i < 3; i++) { // Ändern Sie die Anzahl der Durchläufe nach Bedarf
            changeThemeSteps();

            // Erhöhen des Schrittzählers
            stepCounter++;

            if (stepCounter == 3) {
                lastStep = true;
                stepCounter = 0; // Setzen Sie stepCounter zurück
            }
        }
    }
    // Setzen Sie lastStep zurück, damit die Funktion erneut ausgeführt werden kann
    lastStep = false;
}

function changeThemeSteps() {
    var body = document.body;
    body.style = "transition: 500ms"
    var mode;
    var AString = "theme";

    // Schritte mit Promise-Objekten
    switch (stepCounter) {
        case 0:
            sessionStorage.removeItem(AString);
            
            break;

        case 1:
            switch (body.id) {
                case "darkmode":
                    mode = "lightmode";
                    break;

                case "lightmode":
                    mode = "darkmode";
                    break;
            }
            body.id = mode;
            sessionStorage.setItem(AString, mode);
            console.warn('Variable mode gesetzt:', mode);
            break;

        case 2:
            // Schritt 3: Löschen der Variable
            sessionStorage.removeItem(AString);

            readSessionStorage(AString).then(function(storedData) {
            });
            break;
    }
}

// Funktion für den asynchronen Abruf des sessionStorage
function readSessionStorage(AString) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            var storedData = sessionStorage.getItem(AString);
            resolve(storedData);
        }, 0);
    });
}