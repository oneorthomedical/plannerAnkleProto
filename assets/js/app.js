import Utils from './class/Utils';
import Webgl from './class/Webgl';
import JsonCompute from './class/JsonCompute';
import WatchJS from 'melanke-watchjs';

export const currentPage = {page: 1};
export const utils = new Utils();
export const watch = WatchJS.watch;

utils.configModal();
utils.configInitialisationTibia();
utils.configInitialisationTalaire();
/* utils.configInitialisationInsert();*/
utils.configVisualisationPage();
utils.configStateVisualisation();
utils.configButtonVisualisation();
utils.setRange();
const app = new Webgl(document.getElementById('view3D'), document.getElementById('faceView'), document.getElementById('profilView'));
const resizeWindow = () => app.resizeDisplayGL();
const render = () => {
    requestAnimationFrame(render);
    app.render();
};
window.addEventListener('resize', resizeWindow, true);
app.initGL();
app.resizeDisplayGL();
app.initContent();
render();
$('#next').click(() => {
    utils.nextToInsert();
    currentPage.page = 2;
});
$('#previous').click(() => {
    utils.previousToTibia();
    currentPage.page = 1;
});
$('#exit').click(() => {
    utils.exit();
});
