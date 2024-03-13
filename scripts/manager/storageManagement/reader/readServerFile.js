async function readServerFile(pathToFile) {
    try {
        return fetch(pathToFile)
        .then(response => response.text())
        .then(data => {
            let value = data;
            return value;
        })
        .catch(error => console.error('Error:', error));

    } catch (error) { 
    }
}
export { readServerFile }
