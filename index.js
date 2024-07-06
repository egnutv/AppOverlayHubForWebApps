import { GUI } from "./GUI.js"; // Annahme: GUI.js liegt im gleichen Verzeichnis

const gui = new GUI();

window.gui = gui;

window.gui.triggerOpenMenu = gui.triggerOpenMenu.bind(gui); // Bind für den korrekten Kontext
window.gui.triggerSwitchDesignMode = gui.triggerSwitchDesignMode.bind(gui);

document.addEventListener("DOMContentLoaded", function() {
    gui.activeEvent();
});
