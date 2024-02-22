import { getScript, setScript, rmScript} from './scriptManager.js';
import { getTemplate, setTemplate, rmTemplate } from './spawnSiteManager/siteManager.js';


window.getScript = getScript;
window.setScript = setScript;
window.delScript = rmScript;

window.getTemplate = getTemplate;
window.setTemplate = setTemplate;
window.rmTemplate = rmTemplate;