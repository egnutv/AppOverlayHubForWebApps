import('./content.js');
import('./../utils/selectDomElement.js');

const content_holder = selectDomElement(".content_holder");

var observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        
    })
})