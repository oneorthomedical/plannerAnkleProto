import {preplanification,talaire,tibia,implantTalaire,implantTibia,mortaiseTalaire,mortaiseTibia,cylindreGreen,cylindreOrange,cylindreRed,perone,talusCalcaneumRecalage,tibiaRecalage,radio} from './objectDeclaration.js';
import {pathToLink} from "./Version";
import Os from "./Os.js";
import {Axe} from "./Axe";
import Utils from "./Utils";
import {labelTaille} from "./Utils.js";
import {currentPage,watch} from "../app";
import JsonCompute from "./JsonCompute";
import {dataMortaiseTalaire, dataResponse} from "./objectDeclaration";
import {Response} from "./Response";


export default class Webgl {
    constructor(elementToBindTo,elementToBindToFace,elementToBindToProfil){
        this.renderer = null;
        this.rendererFace = null;
        this.rendererProfil = null;
        this.canvas = elementToBindTo;
        this.canvasFace = elementToBindToFace;
        this.canvasProfil = elementToBindToProfil;
        this.aspectRatio = 1;
        this.recalcAspectRatio();
        this.scene = null;
        this.cameraDefaults = {
            posCamera: new THREE.Vector3( 0, 0.0, 500.0 ),
            posCameraTarget: new THREE.Vector3( 0, 0, 0 ),
            near: 0.1,
            far: 10000,
            fov: 30
        };
        this.camera = null;
        this.cameraTarget = this.cameraDefaults.posCameraTarget;
        this.controls = null;
    }
    initGL () {
        this.renderer = new THREE.WebGLRenderer( {
            canvas: this.canvas,
            antialias: true,
            autoClear: true
        } );
        this.rendererFace = new THREE.WebGLRenderer( {
            canvas: this.canvasFace,
            antialias: true,
            autoClear: true
        } );
        this.rendererProfil = new THREE.WebGLRenderer( {
            canvas: this.canvasProfil,
            antialias: true,
            autoClear: true
        } );

        this.renderer.setClearColor( 0xFFFFFF );
        this.rendererFace.setClearColor( 0xFFFFFF );
        this.rendererProfil.setClearColor( 0xfffffF );
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( this.cameraDefaults.fov, this.aspectRatio, this.cameraDefaults.near, this.cameraDefaults.far );
        this.cameraFace = new THREE.CombinedCamera(this.canvasFace.offsetWidth,this.canvasFace.offsetHeight,8,1,1000,-500,1000);
        this.cameraFace.toOrthographic();
        this.cameraHolder = new THREE.Object3D();
        this.cameraHolder.name = 'CameraHolder';
        this.cameraHolder.add(this.camera);
        this.scene.add(this.cameraHolder);
        this.cameraProfil = new THREE.CombinedCamera(this.canvasProfil.offsetWidth,this.canvasProfil.offsetHeight,8,1,1000,-500,1000);
        this.cameraProfil.toOrthographic();
        this.resetCamera();
        this.controls = new THREE.TrackballControls( this.camera, this.renderer.domElement );
        this.controls.rotateSpeed = 5.0;
        this.controls.zoomSpeed = 3;
        this.controls.panSpeed = 0.9;
        this.controls.noZoom = false;
        this.controls.noPan = false;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;

        this.scene.position.set(0,56,0);
        /**
         * Lumiere 1
         */
        const ambientLight = new THREE.AmbientLight( 0x404040 );
        ambientLight.intensity = 0.75;
        const directionalLight1 = new THREE.DirectionalLight( 0xFFFFFF );
        directionalLight1.intensity = 0.75;
        const directionalLight2 = new THREE.DirectionalLight( 0xFFFFFF );
        directionalLight2.intensity = 0.75;
        const hemisphereLight = new THREE.HemisphereLight( 0x000000, 0x5c5c5c, 1 );
        const pointLight = new THREE.PointLight( 0xffffff, 0.8, 100 );
        directionalLight1.position.set( -100, -50, 100 );
        directionalLight2.position.set( 100, 50, -100 );
        pointLight.position.set( 0, -70, 0 );
        this.scene.add( pointLight );
        this.scene.add( directionalLight1 );
        this.scene.add( directionalLight2 );
        this.scene.add( ambientLight );
        this.scene.add( hemisphereLight );
        let axeCons = new Axe();
        this.helper = axeCons.makeAxes();
        this.helper2 = new THREE.AxesHelper( 100 );
        window.scene = this.scene;
    }
    resizeDisplayGL() {
        this.controls.handleResize();
        const checkboxFullScreen= document.querySelector("input[name=fullScreen]");
        if(!checkboxFullScreen.checked) {
            if (window.matchMedia("(min-width: 1350px)").matches) {
                $('scene').width('40%');
                $('views').width('28%');
                console.log('width 1350+');
            } else if (window.matchMedia("(min-width: 1220px)").matches) {
                $('scene').width('30%');
                $('views').width('25%');
                console.log('width 1250+')
            } else {
                console.log('width 1250-');
                $('scene').width('auto');
                $('views').width('auto');
            }
        }
        else {
            if (window.matchMedia("(min-width: 1350px)").matches) {
                $('scene').width('68%');
                $('views').width('0%');
                console.log('width 1350+');
            } else if (window.matchMedia("(min-width: 1220px)").matches) {
                $('scene').width('55%');
                $('views').width('0%');
                console.log('width 1250+');
            } else {
                console.log('width 1250-');
                $('scene').width('auto');
                $('views').width('0%');
            }
        }
        this.renderer.setSize( this.canvas.offsetWidth, this.canvas.offsetHeight, false );
        this.rendererFace.setSize( this.canvasFace.offsetWidth, this.canvasFace.offsetHeight, false);
        this.rendererProfil.setSize( this.canvasProfil.offsetWidth, this.canvasProfil.offsetHeight, false);
        this.recalcAspectRatio();
        this.updateCamera();
        const checkboxRadio = document.querySelector("input[name=radio]");
        this.resizeRadio(checkboxRadio.checked);
        if(window.matchMedia("(max-width: 1220px)").matches) {
            $('#fullScreen').hide();
        }else {
            $('#fullScreen').show();
        }

    }
    recalcAspectRatio(){
        this.aspectRatio = ( this.canvas.offsetHeight === 0 ) ? 1 : this.canvas.offsetWidth / this.canvas.offsetHeight;
    }
    resetCamera(){
        this.camera.position.copy( this.cameraDefaults.posCamera );
        this.cameraTarget.copy( this.cameraDefaults.posCameraTarget );
        this.updateCamera();
    }
    updateCamera(){
         this.camera.aspect = this.aspectRatio;
         this.cameraFace.setSize(this.canvasFace.offsetWidth,this.canvasFace.offsetHeight);
         this.cameraProfil.setSize(this.canvasProfil.offsetWidth,this.canvasProfil.offsetHeight);
         this.camera.lookAt( this.cameraTarget );
        this.camera.updateProjectionMatrix();
        if(talaire.preplanification.side === 'Gauche')  this.cameraFace.toRightView();
        else if(talaire.preplanification.side === 'Droite')  this.cameraFace.toLeftView();
        this.cameraFace.updateProjectionMatrix();
        this.cameraFace.position.y =50;
        this.cameraProfil.position.y = 50;
        this.cameraProfil.toFrontView();
        this.cameraProfil.updateProjectionMatrix();
    }
    resizeRadio(boolCheckBoxRadio) {

       let canvasRadioFace = document.getElementById('radioFaceView');
       canvasRadioFace.style.width  = "100%";
       canvasRadioFace.style.height = "630px";

        let canvasRadioProfil = document.getElementById('radioProfilView');
        canvasRadioProfil.style.width  = "100%";
        canvasRadioProfil.style.height = "630px";
    }
    render(){
        if ( ! this.renderer.autoClear ) this.renderer.clear();
        if ( ! this.rendererProfil.autoClear ) this.rendererProfil.clear();
        if ( ! this.rendererFace.autoClear ) this.rendererFace.clear();
        this.controls.update();
        this.renderer.render( this.scene, this.camera );
        this.rendererFace.render( this.scene, this.cameraFace );
        this.rendererProfil.render( this.scene, this.cameraProfil );
    }
    initThree(talaire,tibia,mortaiseTalaire,mortaiseTibia,implantTibia,implantTalaire,cylindreGreen,cylindreRed,cylindreOrange,perone,talusCalcaneumRecalage,tibiaRecalage,object){
        talaire.mesh = object[0];
        tibia.mesh = object[1];
        mortaiseTalaire.mesh = object[2];
        mortaiseTibia.mesh = object[3];
        implantTalaire.mesh = object[4];
        implantTibia.mesh = object[5];
        cylindreGreen.mesh = object[6];
        cylindreOrange.mesh = object[7];
        cylindreRed.mesh = object[8];
        perone.mesh = object[9];
        talusCalcaneumRecalage.mesh = object[10];
        tibiaRecalage.mesh = object[11];
    }
    initContent(){
        Promise.all([
            talaire.objectPromise,
            tibia.objectPromise,
            mortaiseTalaire.objectPromise,
            mortaiseTibia.objectPromise,
            implantTalaire.objectPromise,
            implantTibia.objectPromise,
            cylindreGreen.objectPromise,
            cylindreOrange.objectPromise,
            cylindreRed.objectPromise,
            perone.objectPromise,
            talusCalcaneumRecalage.objectPromise,
            tibiaRecalage.objectPromise
        ]).then((object)=>{
            let scope = this;
            const parentGroup = new THREE.Group();
            parentGroup.name = 'GroupeTibia';
            const parentGroupTalaire = new THREE.Group();
            const parentGroupTalaireRecalage = new THREE.Group();
            const parentCylindre = new THREE.Group();
            parentGroupTalaire.name = 'GroupeTalaire';
            this.initThree(talaire,tibia,mortaiseTalaire,mortaiseTibia,implantTibia,implantTalaire,cylindreGreen,cylindreOrange,cylindreRed,perone,talusCalcaneumRecalage,tibiaRecalage,object);
            parentGroup.add(tibia.mesh);
            parentGroup.add(cylindreGreen.mesh);
            cylindreGreen.mesh.add(cylindreRed.mesh);
            cylindreGreen.mesh.add(cylindreOrange.mesh);
            parentGroup.add(perone.mesh);
            parentGroupTalaire.add(talaire.mesh);
            parentGroupTalaire.add(mortaiseTalaire.mesh);
            tibia.mesh.add(mortaiseTibia.mesh);
            mortaiseTibia.mesh.add(implantTibia.mesh);
            mortaiseTalaire.mesh.add(implantTalaire.mesh);


            /**
             * Configuration talaire visibilité
             * @type {boolean}
             */
            parentGroupTalaire.visible = true;
            talusCalcaneumRecalage.mesh.visible = true;
            talusCalcaneumRecalage.mesh.name = 'Talus recalage';
            talaire.setVisible(false);
            implantTalaire.setVisible(false);
            /**
             * Configuration tibia visibilite
             * @type {boolean}
             */
            tibiaRecalage.mesh.visible = true;
            tibiaRecalage.mesh.name = "Tibia recalage";
            tibia.setVisible(false);
            implantTibia.setVisible(false);
            /**
             * Configuration other visibilite
             */
            perone.setVisible(true);
            cylindreGreen.setVisible(false);

            scope.scene.add(cylindreGreen.addPlane());
            parentGroupTalaireRecalage.add(talusCalcaneumRecalage.mesh);
            scope.scene.add(parentGroupTalaireRecalage);
            scope.scene.add(tibiaRecalage.mesh);
            implantTalaire.updateCoplanaire(implantTibia.taille,cylindreGreen.meshPlan,dataResponse.Preplanning.talaire.implant.coplanaireMatrix);
            const os = new Os(scope.scene,talaire,tibia,talusCalcaneumRecalage);
            os.update(mortaiseTalaire,mortaiseTibia,parentGroupTalaire);
            scope.scene.add(parentGroup);
            scope.scene.add(parentGroupTalaire);
            /**
             * Administrate admin mode
             */
            if(dataResponse.User.profil === "administrator" && dataResponse.Planning.state !== 0 ){
                const state = dataResponse.Planning.state;
                const dataPlanning = dataResponse.Planning;
                /**
                 * Reglage tibia
                 */
                mortaiseTibia.height = dataPlanning.tibia.hauteur;
                mortaiseTibia.width = dataPlanning.tibia.dmr;
                mortaiseTibia.dap = dataPlanning.tibia.dap;

                mortaiseTibia.varus = -dataPlanning.tibia.vv;
                mortaiseTibia.sagittalAngle = -dataPlanning.tibia.asag;
                mortaiseTibia.tilt = -dataPlanning.tibia.amm;

                implantTibia.taille = dataPlanning.tibia.implant.taille;

                os.update(mortaiseTalaire,mortaiseTibia,parentGroupTalaire);
                cylindreGreen.updateHeight(dataPlanning.tibia.hauteur);
                cylindreGreen.updateWidth(dataPlanning.tibia.dmr);
                /**
                 * Reglage talaire
                 */
                mortaiseTalaire.type = dataPlanning.talaire.implant.type;
                mortaiseTalaire.objectPromise.then(()=>{

                   /* mortaiseTibia.updateTalus(talaire,mortaiseTalaire);*/
                    mortaiseTalaire.height = -dataPlanning.talaire.hauteur;
                    talaire.pap = dataPlanning.talaire.pap;
                    talaire.pml = dataPlanning.talaire.pml;

                    talaire.aph = dataPlanning.talaire.aph;
                    talaire.aps = dataPlanning.talaire.aps;
                    talaire.varus = dataPlanning.talaire.vv;

                    talaire.epaisseurInsert = dataPlanning.epaisseur;

                    implantTalaire.updateCoplanaire(dataPlanning.tibia.implant.taille,cylindreGreen.meshPlan,dataResponse.Preplanning.talaire.implant.coplanaireMatrix);

                    implantTalaire.type = dataPlanning.talaire.implant.type;
                    implantTalaire.taille = dataPlanning.talaire.implant.taille;

                    os.updateTalaire(mortaiseTibia,mortaiseTalaire);
                    os.computeHauteurPatin(mortaiseTibia,mortaiseTalaire,talaire);
                    /*talaire.updateRegleHeight(mortaiseTibia);*/
                });
                talaire.setEpaisseur(parentGroupTalaire,parentGroupTalaireRecalage);
            }
            else if (dataResponse.User.profil === "surgeon" && dataResponse.Planning.state !== 0 ) {
                const state = dataResponse.Planning.state;
                const dataPlanning = dataResponse.Planning;
                /**
                 * Reglage tibia
                 */
                mortaiseTibia.height = dataPlanning.tibia.hauteur;
                mortaiseTibia.width = dataPlanning.tibia.dmr;
                mortaiseTibia.dap = dataPlanning.tibia.dap;

                mortaiseTibia.varus = -dataPlanning.tibia.vv;
                mortaiseTibia.sagittalAngle = -dataPlanning.tibia.asag;
                mortaiseTibia.tilt = -dataPlanning.tibia.amm;
                /**
                 * Implant
                 */
                implantTibia.taille = dataPlanning.tibia.implant.taille;
                /**
                 * Coupe and cylinder update
                 */
                os.update(mortaiseTalaire,mortaiseTibia,parentGroupTalaire);
                cylindreGreen.updateHeight(dataPlanning.tibia.hauteur);
                cylindreGreen.updateWidth(dataPlanning.tibia.dmr);
                /**
                 * Reglage talaire
                 */
                mortaiseTalaire.type = dataPlanning.talaire.implant.type;
                mortaiseTalaire.objectPromise.then(()=>{

                   /* mortaiseTibia.updateTalus(talaire,mortaiseTalaire);*/
                    // Translation
                    mortaiseTalaire.height = -dataPlanning.talaire.hauteur;
                    talaire.pap = dataPlanning.talaire.pap;
                    talaire.pml = dataPlanning.talaire.pml;

                    // Rotation
                    talaire.aph = dataPlanning.talaire.aph;
                    talaire.aps = dataPlanning.talaire.aps;
                    talaire.varus = dataPlanning.talaire.vv;
                    talaire.epaisseurInsert = dataPlanning.epaisseur;
                    // Coupe
                    implantTalaire.updateCoplanaire(dataPlanning.tibia.implant.taille,cylindreGreen.meshPlan,dataResponse.Preplanning.talaire.implant.coplanaireMatrix);
                    implantTalaire.type = dataPlanning.talaire.implant.type;
                    implantTalaire.taille = dataPlanning.talaire.implant.taille;
                    // TODO FAUT BALANCER DIRECTEMENT LA DATA TALAIRE HAUTEUR mesh
                    os.updateTalaire(mortaiseTibia,mortaiseTalaire);
                    os.computeHauteurPatin(mortaiseTibia,mortaiseTalaire,talaire);
                  /*  talaire.updateRegleHeight(mortaiseTibia);*/
                });
                talaire.setEpaisseur(parentGroupTalaire,parentGroupTalaireRecalage);
            }
            $('.hauteurTi').slider({
                change: (event, ui)=> {
                    if(preplanification.change){
                        mortaiseTibia.height = ui.value;
                       /* mortaiseTibia.updateTalus(talaire,mortaiseTalaire);*/
                        cylindreGreen.updateHeight(ui.value);
                        os.update(mortaiseTalaire,mortaiseTibia,parentGroupTalaire);
                        os.computeHauteurPatin(mortaiseTibia,mortaiseTalaire,talaire);
                    }
                }
            });
            $('.distanceMRTi').slider({
                change: (event, ui)=> {
                    if(preplanification.change){
                        mortaiseTibia.width = ui.value;
                        cylindreGreen.updateWidth(ui.value);
                        os.update(mortaiseTalaire,mortaiseTibia,parentGroupTalaire);
                    }
                }
            });
            $('.varusValgusTi').slider({
                change: (event, ui)=> {
                    if(preplanification.change) {
                        mortaiseTibia.varus = ui.value;
                        os.update(mortaiseTalaire,mortaiseTibia,parentGroupTalaire);
                    }
                }
            });
            $('.angleSagittalTi').slider({
                change: (event, ui)=> {
                    if(preplanification.change) {
                        mortaiseTibia.sagittalAngle = ui.value;
                        os.update(mortaiseTalaire,mortaiseTibia,parentGroupTalaire);
                    }
                }
            });
            $('.angleMMTi').slider({
                change: (event, ui)=> {
                    if(preplanification.change){
                        mortaiseTibia.tilt = ui.value;
                        os.update(mortaiseTalaire,mortaiseTibia,parentGroupTalaire);
                    }
                }
            });
            $('.tailleTibiaTi').slider({
                change: (event, ui)=> {
                    if(preplanification.change) {
                        implantTibia.taille = implantTibia.newLabelTaille[ui.value];
                        implantTalaire.updateCoplanaire(implantTibia.taille,cylindreGreen.meshPlan,dataResponse.Preplanning.talaire.implant.coplanaireMatrix);
                        os.update(mortaiseTalaire,mortaiseTibia,parentGroupTalaire);
                    }
                }
            });
            $('.deplacementAPTi').slider({
                change: (event, ui)=> {
                    if(preplanification.change) {
                        mortaiseTibia.dap = ui.value;
                        os.update(mortaiseTalaire,mortaiseTibia,parentGroupTalaire);
                    }

                }
            });
            $('.hauteurTa').slider({
                change: (event, ui)=> {
                    mortaiseTalaire.height = ui.value;
                    os.updateTalaire(mortaiseTibia,mortaiseTalaire);
                    os.computeHauteurPatin(mortaiseTibia,mortaiseTalaire,talaire);
                }
            });
            $('.positionAPTa').slider({
                change: (event, ui)=> {
                    if (preplanification.change) {
                        talaire.pap = ui.value;
                        os.updateTalaire(mortaiseTibia, mortaiseTalaire);
                    }
                }
            });
            $('.positionMLTa').slider({
                change: (event, ui)=> {
                    if (preplanification.change) {
                        talaire.pml = ui.value;
                        os.updateTalaire(mortaiseTibia, mortaiseTalaire);
                    }
                }
            });
            $('.varusValgusTa').slider({
                change: (event, ui)=> {
                    if (preplanification.change) {
                        talaire.varus = ui.value;
                        os.updateTalaire(mortaiseTibia, mortaiseTalaire);
                    }
                }
            });
            $('.anglePHTa').slider({
                change: (event, ui)=> {
                    if(preplanification.change) {
                        talaire.aph = ui.value;
                        os.updateTalaire(mortaiseTibia, mortaiseTalaire);
                    }
                }
            });
            $('.anglePSTa').slider({
                change: (event, ui)=> {
                    if(preplanification.change) {
                        talaire.aps = ui.value;
                        os.updateTalaire(mortaiseTibia, mortaiseTalaire);
                    }
                }
            });
            $('.tailleTa').slider({
                change: (event, ui)=> {
                    if (preplanification.change) {
                        implantTalaire.taille = ui.value;
                        if (implantTalaire.type === 'standard') {
                            mortaiseTalaire.taille = ui.value;
                        }
                        implantTibia.changePipe(implantTalaire.taille);
                        mortaiseTalaire.objectPromise.then(() => {
                            os.updateTalaire(mortaiseTibia, mortaiseTalaire);
                        });
                    }
                }
            });
            $('.epaisseur').slider({
                change: (event, ui)=> {
                    if (preplanification.change) {
                        talaire.epaisseurInsert = ui.value;
                        talaire.setEpaisseur(parentGroupTalaire,parentGroupTalaireRecalage);
                        os.computeHauteurPatin(mortaiseTibia,mortaiseTalaire,talaire);
                    }
                }
            });
            $('#typeImplantTa').change(function() {
                if(preplanification.change) {
                    let $option = $(this).find('option:selected');
                    let typeImplant = $option.text().split(' ').join('').toLowerCase();
                    console.log(typeImplant);
                    implantTalaire.type = typeImplant;
                    mortaiseTalaire.type = typeImplant;
                    mortaiseTalaire.objectPromise.then(() => {
                        os.updateTalaire(mortaiseTibia, mortaiseTalaire);
                    });
                }
            });

            let jsonCompute = new JsonCompute();
            $('#save').click(()=>{
                let objectResponse = JSON.parse(sessionStorage.getItem('JSonResponse'));
                console.log(objectResponse);
                const response = new Response(mortaiseTibia,implantTibia,mortaiseTalaire,talaire,implantTalaire,2);
                response.setResponse(objectResponse);
                jsonCompute.postDataWithAlertFinalValidation(objectResponse.Route, response.getJson());
            });
            $('#saveTemporary').click(()=>{
                let objectResponse = JSON.parse(sessionStorage.getItem('JSonResponse'));
                console.log(objectResponse);
                const response = new Response(mortaiseTibia,implantTibia,mortaiseTalaire,talaire,implantTalaire,1);
                response.setResponse(objectResponse);
                jsonCompute.postDataWithAlertTempoValidation(objectResponse.Route, response.getJson());
            });
            const checkboxTibia = document.querySelector("input[name=tibia]");
            const checkboxTalaire = document.querySelector("input[name=talaire]");
            const checkboxTalusCalcaneumRecalage = document.querySelector("input[name=talusCalcaneumRecalage]");
            const checkboxImplantTibia = document.querySelector("input[name=implantTibia]");
            const checkboxImplantTalaire = document.querySelector("input[name=implantTalaire]");
            const checkboxWireframe = document.querySelector("input[name=wireframe]");
            const checkboxTransparence = document.querySelector("input[name=transparence]");
            const checkboxPerone = document.querySelector("input[name=perone]");
            const checkboxAxe = document.querySelector("input[name=axe]");
            const checkboxCylindre = document.querySelector("input[name=cylindre]");
            const checkboxTibiaBrut = document.querySelector("input[name=tibiaBrut]");
            const checkboxTalusBrut = document.querySelector("input[name=talusBrut]");
            const checkboxRadio = document.querySelector("input[name=radio]");
            const checkboxFullScreen = document.querySelector("input[name=fullScreen]");
            const checkboxPlan = document.querySelector("input[name=plan]");
            const frontalView = document.getElementById('frontalView');
            const sagittalView = document.getElementById('sagittalView');
            const transversalView = document.getElementById('transversalView');
            const previousToWorkflow = document.getElementById('previousWorkflow');
            frontalView.addEventListener('click',()=> {
               this.controls.reset();
               this.cameraHolder.rotation.set(0,0,0);
            });
            sagittalView.addEventListener('click',()=> {
                this.controls.reset();
                if(talaire.preplanification.side === 'Gauche')    this.cameraHolder.rotation.set(0,Math.PI/2,0);
                else if(talaire.preplanification.side === 'Droite')    this.cameraHolder.rotation.set(0,-Math.PI/2,0);
            });
            transversalView.addEventListener('click',()=> {
                this.controls.reset();
                if(currentPage.page === 1 ) this.cameraHolder.rotation.set(Math.PI/2,0,0);
                else if(currentPage.page === 2) this.cameraHolder.rotation.set(-Math.PI/2,0,0)
            });

            checkboxTibia.addEventListener( 'change', function() {
                    tibia.setVisible(this.checked);
                    if(checkboxTibiaBrut.checked) {
                        tibiaRecalage.setMeshVisible(!this.checked);
                        checkboxTibiaBrut.checked = !this.checked;
                    }

            });
            checkboxTalaire.addEventListener( 'change', function() {
                    talaire.setVisible(this.checked);
                    if( checkboxTalusBrut.checked ){
                        talusCalcaneumRecalage.setMeshVisible(!this.checked);
                        checkboxTalusBrut.checked = !this.checked;
                    }
            });

            checkboxTibiaBrut.addEventListener( 'change', function() {
                    tibiaRecalage.setMeshVisible(this.checked);
                    if(checkboxTibia.checked) {
                        tibia.setVisible(!this.checked);
                        checkboxTibia.checked = !this.checked;
                    }
            });

            checkboxTalusBrut.addEventListener( 'change', function() {
                    talusCalcaneumRecalage.setMeshVisible(this.checked);
                    if( checkboxTalaire.checked ) {
                        talaire.setVisible(!this.checked);
                        checkboxTalaire.checked = !this.checked;
                    }
            });
            checkboxImplantTibia.addEventListener( 'change', function() {
                implantTibia.setVisible(this.checked);
            });
            checkboxImplantTalaire.addEventListener( 'change', function() {
                implantTalaire.setVisible(this.checked);
            });
            checkboxWireframe.addEventListener( 'change', function() {
                tibia.setWireframe(this.checked);
                talaire.setWireframe(this.checked);
                perone.setWireframe(this.checked);
            });
            checkboxTransparence.addEventListener( 'change', function() {
                tibia.setTransparent(this.checked);
                talaire.setTransparent(this.checked);
                perone.setTransparent(this.checked);
            });
            checkboxAxe.addEventListener( 'change', function() {
                if(this.checked) {
                    scope.scene.add(scope.helper);
                    scope.scene.add(scope.helper2);
                }
                else{
                    scope.scene.remove(scope.helper);
                    scope.scene.remove(scope.helper2);
                }
            });
            checkboxCylindre.addEventListener( 'change', function() {
                cylindreGreen.setVisible(this.checked);
            });
            checkboxPerone.addEventListener( 'change', function() {
                perone.setVisible(this.checked);
            });
            checkboxFullScreen.addEventListener( 'change', function() {
                let radioCheck = checkboxRadio.checked;
                if(this.checked){
                    if (window.matchMedia("(min-width: 1350px)").matches) {
                        $('scene').width('68%');
                        $('views').width('0%');
                        console.log('width 1350+');
                    } else if (window.matchMedia("(min-width: 1220px)").matches) {
                        $('scene').width('55%');
                        $('views').width('0%');
                        console.log('width 1250+');
                    } else {
                        console.log('width 1250-');
                        $('scene').width('auto');
                        $('views').width('0%');
                    }
                }
                else {
                    if (window.matchMedia("(min-width: 1350px)").matches) {
                        $('scene').width('40%');
                        $('views').width('28%');
                        console.log('width 1350+');
                    } else if (window.matchMedia("(min-width: 1220px)").matches) {
                        $('scene').width('30%');
                        $('views').width('25%');
                        console.log('width 1250+')
                    } else {
                        console.log('width 1250-');
                        $('scene').width('auto');
                        $('views').width('auto');
                    }
                    if(radioCheck){
                        checkboxRadio.checked = false;
                        $('#radioFaceView').hide();
                        $('#faceView').show();
                        $('#radioProfilView').hide();
                        $('#profilView').show();
                    }
                }
                scope.resizeDisplayGL();
            });
            checkboxRadio.addEventListener( 'change', function() {

                console.log('changed');
                if(this.checked){
                    let ctxFace = document.getElementById('radioFaceView').getContext('2d');
                    let imgFace = new Image();
                    imgFace.onload = function() {
                        document.getElementById('radioFaceView').width = document.getElementById('faceView').width ;
                        document.getElementById('radioFaceView').height = document.getElementById('faceView').height ;
                        ctxFace.drawImage(imgFace, 0, 0,document.getElementById('faceView').width,document.getElementById('faceView').height);
                    };
                    // TODO REMPLACEMENT RADIO FACE
                    imgFace.src =  radio.pathFace;
                    let ctxProfil = document.getElementById('radioProfilView').getContext('2d');
                    let imgProfil = new Image();
                    imgProfil.onload = function() {
                        document.getElementById('radioProfilView').width = document.getElementById('profilView').width ;
                        document.getElementById('radioProfilView').height = document.getElementById('profilView').height ;
                        ctxProfil.drawImage(imgProfil, 0, 0,document.getElementById('profilView').width,document.getElementById('profilView').height);
                    };
                    // TODO REMPLACEMENT RADIO PROFIL
                    imgProfil.src = radio.pathProfil;
                    $('#radioFaceView').show();
                    $('#faceView').hide();
                    $('#radioProfilView').show();
                    $('#profilView').hide();
                }
                else {
                    $('#radioFaceView').hide();
                    $('#faceView').show();
                    $('#radioProfilView').hide();
                    $('#profilView').show();
                    scope.resizeDisplayGL();
                }
            });
            checkboxPlan.addEventListener('change', function () {
                cylindreGreen.setVisiblePlane(this.checked);
            });
            previousToWorkflow.addEventListener('click',()=>{
                jsonCompute.previousToWorkflow();
            });
            $('#previousToPreplanif').click(()=>{
                /**
                 * Reset tibia
                 */
                console.log('previous to preplanif');
                preplanification.change = false;
                let dataPreplaning = dataResponse.Preplanning.tibia;
                mortaiseTibia.width = dataPreplaning.dmr;
                mortaiseTibia.height = dataPreplaning.hauteur;
                mortaiseTibia.dap = dataPreplaning.dap;
                mortaiseTibia.varus = dataPreplaning.vv;
                mortaiseTibia.tilt = dataPreplaning.amm;
                mortaiseTibia.sagittalAngle = dataPreplaning.asag;
                cylindreGreen.updateWidth(mortaiseTibia.width);
                cylindreGreen.updateHeight(dataPreplaning.hauteur);
                /**
                 * Reset Implant Tibia
                 */
                implantTibia.reset(dataResponse.Preplanning.talaire.implant.taille,dataPreplaning.implant.taille);
                implantTibia.taille = dataPreplaning.implant.taille;
                os.update(mortaiseTalaire,mortaiseTibia,parentGroupTalaire);
                let utils = new Utils();
                utils.configResetTibia();
                /**
                 * Reset Talus
                 */
                dataPreplaning = dataResponse.Preplanning.talaire;
                mortaiseTalaire.visualizeTypeTaille(dataPreplaning.implant.type,dataPreplaning.implant.taille);
                mortaiseTalaire.objectPromise.then(()=>{
                   /* mortaiseTibia.updateTalus(talaire,mortaiseTalaire);*/
                    mortaiseTalaire.height = -dataPreplaning.hauteur;
                    talaire.pap = dataPreplaning.pap;
                    talaire.pml = dataPreplaning.pml;
                    talaire.varus = dataPreplaning.vv;
                    talaire.aph = dataPreplaning.aph;
                    talaire.aps = dataPreplaning.aps;
                    /**
                     * Reset implant talus
                     */
                    implantTalaire.updateCoplanaire(implantTibia.taille,cylindreGreen.meshPlan,dataPreplaning.implant.coplanaireMatrix);
                    implantTalaire.visualizeTypeTaille(dataPreplaning.implant.type,dataPreplaning.implant.taille);
                    os.updateTalaire(mortaiseTibia,mortaiseTalaire);
                    talaire.resetEpaisseur(dataResponse.Preplanning.epaisseur,parentGroupTalaire,parentGroupTalaireRecalage);
                    os.computeHauteurPatin(mortaiseTibia,mortaiseTalaire,talaire);
                    jsonCompute.resetPlanificationMessage();
                });
                utils.configResetTalaire();
                preplanification.change = true;
            });
        });
    }
}
