async function executeAction(input) {
    switch(input) {
        case "moreOptions":
            const response = await fetch('./transition.js');
            const script = await response.text();
            console.log(script);  // Fügen Sie diese Zeile hinzu, um den zurückgegebenen Text zu überprüfen
            eval(script);
            this.transition = new TransitionContent();
            this.transition.constInput("slide", "up", "body");
            console.log("Mehr Optionen werden eingeblendet");
            break;
        // Ihr restlicher Code hier
        case "changeTheme":
            // Hier können Sie Code hinzufügen, um ein anderes Skript zu laden und Funktionen zu definieren
            break;
        case "license":
            // Hier können Sie Code hinzufügen, um ein anderes Skript zu laden und Funktionen zu definieren
            break;
        case "impress":
            // Hier können Sie Code hinzufügen, um ein anderes Skript zu laden und Funktionen zu definieren
            break;
        default:
            console.log('Unbekannter Code-String: ' + input);
    }
}