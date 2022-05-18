
class MortaiseTalaire {
    constructor(object) {
        this._preplanification = object.preplanification;
        this._type = object.type;
        this._mesh = null;
        this._height = 0;
        this._pap = object.pap;
        this._pml= object.pml;
        this._varus = object.varus;
        this._aph = object.aph;
        this._aps = object.aps;
        this._taille = object.taille;
        let scope = this;
        this._objectPromise = new Promise(function (resolve, reject) {
            const loader = new THREE.OBJLoader();

            let link = scope.type === 'standard' ? `${scope.preplanification.path}/MortaiseTalaire-${object.type}-${scope.taille}.obj`
                :  `${scope.preplanification.path}/MortaiseTalaire-${object.type}.obj`;
            loader.load(link, function (obj) {
                obj.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        let mesh = new THREE.Mesh(new THREE.Geometry().fromBufferGeometry(child.geometry), new THREE.MeshNormalMaterial({visible : false }) );
                        mesh.name = `MortaiseTalaire`;
                        resolve(mesh);
                    }
                })
            });
        });
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = -(value - heightTalaire);
        this._mesh.position.y = -(value - heightTalaire);
        console.log('height moratise talaire ', this.height);
    }

    get pap() {
        return this._pap;
    }

    set pap(value) {
        this._pap = value;
    }

    get pml() {
        return this._pml;
    }

    set pml(value) {
        this._pml = value;
    }

    get varus() {
        return this._varus;
    }

    set varus(value) {
        this._varus = value;
    }

    get aph() {
        return this._aph;
    }

    set aph(value) {
        this._aph = value;
    }

    get aps() {
        return this._aps;
    }

    set aps(value) {
        this._aps = value;
    }

    get mesh() {
        return this._mesh;
    }

    set mesh(value) {
        this._mesh = value;
        //TODO OLD CONFIG
     /*   this._mesh.position.set(this.pml,this.height + 6 ,this.pap - 8);
        this._mesh.rotation.set(THREE.Math.degToRad(this.aps),THREE.Math.degToRad(this.aph),THREE.Math.degToRad(this.varus));*/
        this._mesh.position.set(0,0,0);
        //this._mesh.rotation.set(THREE.Math.degToRad(this.aps),THREE.Math.degToRad(this.aph),THREE.Math.degToRad(this.varus));
    }

    get type() {
        return this._type;
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
    set type(value){
        this._type = value;
        if(this.type === 'flatcutàplot'){
            this._type = 'flatcutwithpeg'
        } else if(this.type ==='flatcutàquille') {
            this._type ='flatcutwithkeel';
        }
        let scope = this;
        this.objectPromise = new Promise(function (resolve,reject) {
            const loader = new THREE.OBJLoader();
            let link = scope.type === 'standard' ? `${scope.preplanification.path}/MortaiseTalaire-${scope.type}-${scope.taille}.obj`
                :  `${scope.preplanification.path}/MortaiseTalaire-${scope.type}.obj`;
            loader.load(link, function (obj) {
                obj.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        let geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                        resolve(geometry);
                    }
                })
            });
        }).then((geometry)=>{
            this.mesh.geometry.dispose();
            this.mesh.geometry = geometry;
        }).catch((error)=>{
            console.log(error);
        })
    }
    get taille() {
        return this._taille;
    }
    set taille(value) {
        this._taille = value;
        let scope = this;
        console.log(`${scope.preplanification.path}/MortaiseTalaire-${scope.type}-${scope.taille}.obj`);
        this.objectPromise =  new Promise(function (resolve,reject) {
            const loader = new THREE.OBJLoader();
            loader.load(`${scope.preplanification.path}/MortaiseTalaire-${scope.type}-${scope.taille}.obj`, function (obj) {
                obj.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        let geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                        resolve(geometry);
                    }
                })
            });
        }).then((geometry)=>{
            this.mesh.geometry.dispose();
            this.mesh.geometry = geometry;
        }).catch((error)=>{
            console.log(error);
        })
    }
    visualizeTypeTaille(type,taille) {
        this._type = type;
        this._taille = taille;
        let scope = this;
        this.objectPromise =  new Promise(function (resolve,reject) {
            const loader = new THREE.OBJLoader();
            loader.load(`${scope.preplanification.path}/MortaiseTalaire-${type}-${taille}.obj`, function (obj) {
                obj.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        let geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                        resolve(geometry);
                    }
                })
            });
        }).then((geometry)=>{
            this.mesh.geometry.dispose();
            this.mesh.geometry = geometry;
        }).catch((error)=>{
            console.log(error);
        })
    }
}

module.exports = MortaiseTalaire;
