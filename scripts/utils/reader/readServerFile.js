async function readServerFile(path) {
    value = await fetch(path)
                    .then(response => response.text())
                    .catch(error => console.error('Error:', error));

    return value;
}
export { readServerFile }
