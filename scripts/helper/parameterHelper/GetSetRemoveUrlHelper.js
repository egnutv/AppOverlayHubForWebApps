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