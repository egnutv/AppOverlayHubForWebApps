class ChangeLink {
    constructor() {
        // Fügt einen Event-Listener für das popstate Ereignis hinzu
        window.addEventListener('popstate', this.handlePopState.bind(this));
    }

    getLink(){
        return window.location.pathname;
    }

    setLink(newPath){
        let newUrl = '/' + newPath;
        history.pushState({}, null, newUrl);
        this.handlePopState();
    }

    handlePopState(){
        let path = this.getLink();

        switch (path){
            case 0:
        }
        // Führen Sie hier Ihre Aktionen aus, basierend auf dem Pfad
        if (path === '/impress') {
            // Laden Sie das Impressum XML und binden Sie es in das Dokument ein
        } else if (path === '/options') {
            // Laden Sie die Optionen XML und binden Sie es in das Dokument ein
        } else {
            // Laden Sie die Hauptseite XML und binden Sie es in das Dokument ein
        }
    }
}
