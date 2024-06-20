import { selectDomElement } from "../../utils/selectDomElement.js";

class Observer {
    callback(entries) {
        const entry = entries[0];
        return entry.isIntersecting;
    }

    observeElement(element) {
        const options = {
            root: null, 
            rootMargin: '-10%', 
            threshold: 0 
        };

        const observer = new IntersectionObserver((entries) => {
            const isVisible = this.callback(entries);
            console.log(`Element ist ${isVisible ? 'sichtbar' : 'nicht sichtbar'}`);
        }, options);

        observer.observe(element);
    }
}