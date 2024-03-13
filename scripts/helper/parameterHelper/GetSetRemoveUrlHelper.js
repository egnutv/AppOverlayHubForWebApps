class GetSetRemoveUrlHelper {
    setUrl(varName, varValue) {
        let url = new URL(window.location.href);
        url.searchParams.set(varName, varValue);
        window.location.href = url.href;
    }
    getUrl(varName) {
        let url = new URL(window.location.href);

    }

    removeUrl(){
        let url = new URL(window.location.href);
    }
}

function testCall() {
    const value = new GetSetRemoveUrlHelper;

    let valueOfName = "lang";
    let valueOfValue = "EN";
    console.log("Die Werte in der URL: Der VariablenName: " + valueOfName + " Der VariabelnWert: " + valueOfValue);
    value.setUrl(valueOfName, valueOfValue);

    searchedValue = value.getUrl();
}