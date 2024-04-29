function getKey() {
    return new Promise(resolve => {
        window.addEventListener('keydown', function(event) {
            resolve(event.key);
        }, { once: true });
    });
}