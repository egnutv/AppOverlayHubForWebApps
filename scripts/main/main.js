import('./content.js');
import('./../utils/selectDomElement.js');

const content = selectDomElement(".content");

var observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

    })
})