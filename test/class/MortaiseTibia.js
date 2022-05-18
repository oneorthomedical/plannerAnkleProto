

class MortaiseTibia {

    constructor(object) {
        this._type = object.type;
        this._preplanification = object.preplanification;
        this._height = 0;
        this._width = 0;
        this._dap = 0;
        this._varus = object.varus;
        this._tilt= object.tilt;
        this._sagittalAngle = object.sagittalAngle;
        this._transferMatrix = object.transferMatrix;
        this._mesh = null;
         let scope = this;
        this._objectPromise = new Promise(function (resolve, reject) {
            const loader = new THREE.OBJLoader();
            loader.load(`${scope.preplanification.path}/MortaiseTibia-${object.type}.obj`, function (obj) {
                obj.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        let mesh = new THREE.Mesh(new THREE.Geometry().fromBufferGeometry(child.geometry), new THREE.MeshNormalMaterial({visible : false})  );
                        mesh.name = `MortaiseTibia`;
                        resolve(mesh);
                    }
                })
            });
        });
    }

    get mesh() {
        return this._mesh;
    }

    set mesh(value) {
        this._mesh = value;
        this._mesh.position.set(0,0,0);
     // TODO SI VARUS
     /*   this._mesh.position.set(this._transferMatrix.positionX,this._transferMatrix.positionY,0);*/
        this._mesh.rotation.set(THREE.Math.degToRad(this._sagittalAngle),THREE.Math.degToRad(this._tilt),THREE.Math.degToRad(this._varus));
    }
    get transferMatrix() {
        return this._transferMatrix;
    }

    set transferMatrix(value) {
        this._transferMatrix = value;
    }
    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get objectPromise() {
        return this._objectPromise;
    }

    set objectPromise(value) {
        this._objectPromise = value;
    }

    get preplanification() {
        return this._preplanification;
    }

    set preplanification(value) {
        this._preplanification = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        let heightTibia = 9;
        this._height = value - heightTibia;
        this._mesh.position.y = value - heightTibia;
    }
    updateTalus(meshTalus,mortaiseTalaire){
        meshTalus.change = false;
        let value = 6 - this.height + meshTalus.mesh.position.y;
        if(value > 9){
            console.log('Entre dans la boucle',value);
            $(".hauteurTa")
                .slider({
                    min: 1,
                    max: value,
                    value : 6,
                    step: 1
                })
                .slider("pips", {
                    rest: "label"
                });
        } else if( value <1) {
            $(".hauteurTa")
                .slider({
                    min: value,
                    max: 9,
                    value : 6,
                    step: 1
                })
                .slider("pips", {
                    rest: "label"
                });
        } else if (value>=1 || value<=9){
            $(".hauteurTa")
                .slider({
                    min: 1,
                    max: 9,
                    value : 6,
                    step: 1
                })
                .slider("pips", {
                    rest: "label"
                });
        }
        $(".hauteurTa")
            .slider({
                value : 6 - this.height + meshTalus.mesh.position.y,
            });
        mortaiseTalaire.height = - (6 - this.height);
        meshTalus.change = true;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this.setNotificationWidth(value);
        this._width = value - widthTibia;
        console.log('this.width',this.width);
        if( this.preplanification.side === 'Gauche') {
            this._mesh.position.x = (this.width) ;
        } else if(this.preplanification.side === 'Droite') {
            this._mesh.position.x = -(this.width) ;
        }
    }
    get varus() {
        return this._varus;
    }

    set varus(value) {
        this._varus = -value;
        this._mesh.rotation.z = THREE.Math.degToRad( -value );
    }
    get dap() {
        return this._dap;
    }

    set dap(value) {
        this._dap = value;
        this._mesh.position.z = value;
    }

    get tilt() {
        return this._tilt;
    }

    set tilt(value) {
        this._tilt = -value;
        this._mesh.rotation.y = THREE.Math.degToRad( -value );
    }

    get sagittalAngle() {
        return this._sagittalAngle;
    }

    set sagittalAngle(value) {
        this._sagittalAngle = -value;
        this._mesh.rotation.x = THREE.Math.degToRad( -value );
    }
    setVisible (boolean) {
        this._mesh.visible = boolean;
    }
    setTransparent(boolean) {
        if(boolean){
            this._mesh.material.opacity = 0.6;
        }else {
            this._mesh.material.opacity = 1;
        }
    }
    setWireframe(boolean) {
        this._mesh.material.wireframe  = boolean;
    }
    setNotificationWidth(value){
    }
}
module.exports = MortaiseTibia;
