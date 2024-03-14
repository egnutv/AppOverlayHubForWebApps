class GetSetRemoveUrlHelper {
    async setUrl(varName, varValue) {
        let url = new URL(window.location.href);
        url.searchParams.set(varName, varValue);
        history.pushState({}, '', url.href);
    }

    async getUrl(varName) {
        let url = new URL(window.location.href);
        return url.searchParams.get(varName);
    }

    async removeUrl(varName) {
        let url = new URL(window.location.href);

        if (varName) {
            // Einzelnen Parameter entfernen
            url.searchParams.delete(varName);
        } else {
            // Gesamten Query-String entfernen
            url.search = '';
        }

        history.pushState({}, '', url.href);
    }
}
export { GetSetRemoveUrlHelper };


let callNUM = 1;
async function testCall() {
    console.warn("Zahl der Aufrufe: " +  callNUM)
    switch (callNUM) {
        case 0:
            await testSet(); // Warte auf das Ergebnis der asynchronen Methode
            break;
        case 1:
            await testRead(); // Warte auf das Ergebnis der asynchronen Methode
            break;
    }
    callNUM = callNUM + 1;
}

async function testSet() {
    const value = new GetSetRemoveUrlHelper();
    let valueOfName = "lang";
    let valueOfValue = "EN";
    console.log("Die Werte in der URL: Der VariablenName: " + valueOfName + " Der VariabelnWert: " + valueOfValue);
    let x = await value.setUrl(valueOfName, valueOfValue); // Warte auf das Ergebnis der asynchronen Methode
    x;
}
async function testSet2() {
    const value = new GetSetRemoveUrlHelper();
    let valueOfName = "x";
    let valueOfValue = "yyyy";
    console.log("Die Werte in der URL: Der VariablenName: " + valueOfName + " Der VariabelnWert: " + valueOfValue);
    let x = await value.setUrl(valueOfName, valueOfValue); // Warte auf das Ergebnis der asynchronen Methode
    x;
}

async function testRead() {
    let valueOfName = "lang";
    const value = new GetSetRemoveUrlHelper();
    let searchedValue = await value.getUrl(valueOfName); // Warte auf das Ergebnis der asynchronen Methode
    console.log("Der gesuchte Wert des URL-Parameters ist: " + searchedValue);
}

async function testRemove() {
    const value = new GetSetRemoveUrlHelper();

    // Entferne den Parameter "lang"
    await value.removeUrl();

    // Entferne den gesamten Query-String
    // value.removeUrl();

    // Aktualisiere die URL
    console.log('Aktuelle URL nach dem Entfernen:');
    console.log(window.location.href);
}

async function testRemoveONE() {
    const value = new GetSetRemoveUrlHelper();

    // Entferne den Parameter "lang"
    await value.removeUrl('lang');

    // Entferne den gesamten Query-String
    // value.removeUrl();

    // Aktualisiere die URL
    console.log('Aktuelle URL nach dem Entfernen:');
    console.log(window.location.href);
}