import React, { useEffect, useState } from 'react';
function ArrayFromFile() {
    const [arrayData, setArrayData] = useState([]);
    useEffect(() => {
        // Fetch the text file from the public directory
        fetch('./words.txt')
            .then(response => response.text())
            .then(text => {
                // Convert the text content to an array
                const array = text.split('\n').map(line => line.trim()).filter(line => line);
                setArrayData(array);
            })
            .catch(error => console.error('Error loading the file:', error));
    }, []);

    return arrayData;
}

export default ArrayFromFile;