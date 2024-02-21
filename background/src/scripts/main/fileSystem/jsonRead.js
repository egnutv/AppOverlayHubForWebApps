function jsonRead(pathToFile, keyPath) {
    return fetch(pathToFile)
        .then(response => response.json())
        .then(data => {
            let keys = keyPath.split('.');
            let value = data;
            for (let key of keys) {
                if (value[key] !== undefined) {
                    value = value[key];
                } else {
                    console.error('Key not found in JSON file:', key);
                    return null;
                }
            }
            return value;
        })
        .catch(error => console.error('Error:', error));
}
