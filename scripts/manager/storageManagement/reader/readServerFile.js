async function readServerFile(pathToFile) {
    return fetch(pathToFile)
        .then(response => response.text())
        .then(data => {
            let value = data;
            return value;
        })
        .catch(error => console.error('Error:', error));
}

export { readServerFile }
