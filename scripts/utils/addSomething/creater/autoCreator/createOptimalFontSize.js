async function createOptimalFontSize() {
    let maxFontSize = 1.7;
    if (screen.height < screen.width) {
        maxFontSize = 1.4;
    }
    let fontSize = 1.4;
    let nextFontSize = 0.2;

    let standardScreenSize = [
        800 * 600,     // 15 Zoll
        1280 * 1024,   // 17 Zoll
        1600 * 900,    // 22 Zoll
        1920 * 1080,   // 24 Zoll
        2560 * 1440,   // 27 Zoll
        3840 * 2160,   // 32 Zoll
        3440 * 1440,    // 34 Zoll
    ];

    for (let i = 0; i < standardScreenSize.length; i++) {
        let standardScreenSizeValue = standardScreenSize[i] / 100 / 100 / 10;
        standardScreenSize[i] = standardScreenSizeValue;
    }
    standardScreenSize.sort(function (a, b) {return a - b;});
    let averageValue;
    if (standardScreenSize.length % 2 === 1) {
        averageValue = standardScreenSize[Math.floor(standardScreenSize.length / 2)];
    } else {
        let middlePart1 = standardScreenSize[standardScreenSize.length / 2 - 1];
        let middlePart2 = standardScreenSize[standardScreenSize.length / 2];
        averageValue = (middlePart1 + middlePart2) / 2;
    }


    let clientScreenSize = screen.width * screen.height;

    clientScreenSize = clientScreenSize / 100 / 100 / 10;
    

    let negativeValues = standardScreenSize.filter(value => value < averageValue);
    negativeValues = negativeValues.reverse();
    let positiveValues = standardScreenSize.filter(value => value > averageValue);


    let negativeIncreaseRate = negativeValues.map(value => {
        let rate = (averageValue - value) / averageValue * 100;
        return rate;
    });
    let positiveIncreaseRate = positiveValues.map(value => {
        let rate = (value - averageValue) / averageValue * 100;
        return rate;
    });

    let negativeFactors = negativeIncreaseRate.map(rate => rate / 100);
    let positiveFactors = positiveIncreaseRate.map(rate => rate / 100);


    let factors;
    let increaseRate;

    let clientIncreaseRate;
    let clientFactor;

    let negative = false;

    if (clientScreenSize === averageValue){
        clientIncreaseRate = 0;
        clientFactor = 0;
    
        increaseRate = [0];
        factors = [0];
    
    } else if (clientScreenSize > averageValue) {



        let clientSizeValue = clientScreenSize;
        let rate = (clientSizeValue - averageValue) / averageValue * 100;
        clientIncreaseRate = rate;

        clientFactor = [clientIncreaseRate].map(rate => rate / 100);

        increaseRate = positiveIncreaseRate;
        factors = positiveFactors;

    } else if (clientScreenSize < averageValue) {

        let clientSizeValue = clientScreenSize;
        let rate = (averageValue - clientSizeValue) / averageValue * 100;
        clientIncreaseRate = rate;

        clientFactor = [clientIncreaseRate].map(rate => rate / 100);

        increaseRate = negativeIncreaseRate
        factors = negativeFactors;

        negative = true;
        
    }

    
    if (factors.includes(0)) {
    } else {
        factors.unshift(0);
    }

    let fontSizes = [];
    
    for (let i = 0; i < factors.length; i++) {

        if (i !== 0) {
            fontSize = fontSize + nextFontSize;
        fontSize = parseFloat(fontSize.toFixed(2));  // Rundet auf 2 Dezimalstellen
        }
        fontSizes.push(fontSize)
        
    }
    
    
    
    if (clientFactor === factors[0]) {
    fontSize = fontSize;
} else if (clientFactor < factors[factors.length - 1]) {
    let exist = factors.includes(clientFactor);
    if (exist) {
        let index = factors.indexOf(clientFactor);
        fontSize = fontSizes[index];
    } else {
        let index;
        for (let i = 0; i < factors.length - 1; i++) {
            if (clientFactor >= factors[i] && clientFactor < factors[i + 1]) {
                index = i;
                break;
            }
        }

        //ratio = ((clientFactor - factors[index]) / (factors[index + 1] - factors[index]))
        fontSize = (fontSizes[index] / factors[index + 1]) * clientFactor;
    }
} else if (clientFactor >= factors[factors.length - 1]) {
    fontSize = ((fontSizes[fontSizes.length - 1] / factors[factors.length - 1]) * clientFactor);
    }

if (negative && fontSize > maxFontSize) {
    fontSize = maxFontSize;
} 

// Erstelle die CSS-Regel
const cssRule = `* { font-size: ${fontSize}rem; }`;

// Überprüfe, ob das <style>-Element bereits existiert
let styleTag = document.getElementById('dynamicFontSize');
if (styleTag) {
    // Wenn das <style>-Element existiert, aktualisiere einfach seinen Inhalt
    styleTag.textContent = cssRule;
} else {
    // Wenn das <style>-Element nicht existiert, erstelle es und füge es zum <head> hinzu
    styleTag = document.createElement('style');
    styleTag.id = 'dynamicFontSize';
    styleTag.textContent = cssRule;
    const head = document.head;
    head.insertBefore(styleTag, head.firstChild);
}


}
export { createOptimalFontSize }