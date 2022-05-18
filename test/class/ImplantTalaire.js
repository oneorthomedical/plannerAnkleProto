class ImplantTalaire {
    constructor(object) {
        this._preplanification = object.preplanification;
        this._type = object.type;
        this._transferMatrix = object.transferMatrix;
        this._taille = object.taille;
        this._deplacement = object.deplacement;
        this._mesh = null;
        this._objectPromise = new Promise((resolve, reject)=> {
            const loader = new THREE.OBJLoader();
            loader.load(`${pathToLink}object/implantTalaire/${object.type}/${object.preplanification.side}/T${object.taille}.obj`,(obj)=>{
                obj.traverse((child)=>{
                    if (child instanceof THREE.Mesh) {
                        let mesh = new THREE.Mesh(new THREE.Geometry().fromBufferGeometry(child.geometry), mlib.Darckchrome2 );
                        mesh.name = `ImplantTalaire`;
                        mesh.position.set(object.transferMatrix.positionX,object.transferMatrix.positionY,object.transferMatrix.positionZ);
                        mesh.rotation.set(object.transferMatrix.rotationX,object.transferMatrix.rotationY,object.transferMatrix.rotationZ);
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

    get transferMatrix() {
        return this._transferMatrix;
    }

    set transferMatrix(value) {
        this._transferMatrix = value;
    }

    get taille() {
        return this._taille;
    }

    set taille(value) {
        this._taille = value;
        console.log('implant talaire taille', this.taille);
        let scope = this;
        console.log(`${pathToLink}object/implantTalaire/${scope.type}/${scope.preplanification.side}/T${scope.taille}.obj`);
        new Promise(function (resolve,reject) {
            const loader = new THREE.OBJLoader();
            loader.load(`${pathToLink}object/implantTalaire/${scope.type}/${scope.preplanification.side}/T${scope.taille}.obj`, function (obj) {
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
        });
        if(this.type === 'flatcutwithkeel' && this.taille > 3){
            let className = browser !== 'firefox' ? 'swal-zoom' : 'swal-modal';
            let title = this.preplanification.lang === 'fr'? "Taille non disponible" : "Size not available";
            let texte = this.preplanification.lang === 'fr'? `La taille sélectionnée de la gamme flat cut with keel n'est pas disponible, veuillez choisir une taille entre un et trois.` :
               `This selected size of the Flat Cut with keel range is not available, please choose a size between one and three`;
            swal({
                type: 'error',
                title: title,
                text: texte,
                className : className
            });
            $(".tailleTa")
                .slider({
                    value : 3,
                })
        }
    }

    get deplacement() {
        return this._deplacement;
    }

    set deplacement(value) {
        this._deplacement = value;
        this.mesh.position.x = this.transferMatrix.positionX + value;
    }
    updateCoplanaire(value,meshPlane,matrix) {
        console.log(matrix);
        let constanteTranslate = this.preplanification.side === 'Gauche' ? -1.5 : 1.5;
        let taille =  parseInt(value[0]);
        if( taille === 1 ){
            this.transferMatrix.positionX = matrix.cop1 + constanteTranslate;
        }else if(taille === 2 ) {
            this.transferMatrix.positionX = matrix.cop2 + constanteTranslate;
        }else if(taille === 3 ) {
            this.transferMatrix.positionX = matrix.cop3 + constanteTranslate;
        }else if(taille === 4 ) {
            this.transferMatrix.positionX = matrix.cop4 + constanteTranslate;
        }else if(taille === 5 ) {
            this.transferMatrix.positionX = matrix.cop5 + constanteTranslate;
        }else if(taille === 6 ) {
            this.transferMatrix.positionX = matrix.cop6 + constanteTranslate;
        }
        this.mesh.position.x = this.transferMatrix.positionX + this.deplacement;
        meshPlane.position.x = this.transferMatrix.positionX;
    }
    get cote() {
        return this._cote;
    }

    set cote(value) {
        this._cote = value;
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
    changePipe(labelTailleImplantTibia){
        let tailleImplantTibia = parseInt(labelTailleImplantTibia[0]);
        let tailleMin = tailleImplantTibia -1;
        let tailleMax = tailleImplantTibia;
        if(tailleMin === 0) tailleMin = 1;
        $(".tailleTa")
            .slider({
                min: tailleMin,
                max: tailleMax,
                value : dataImplantTalaire.taille,
                step: 1
            })
            .slider("pips", {
                rest: "label"
            });
    }
    set type(value){
        this._type = value;
        if(this.type === 'flatcutàplot'){
            this._type = 'flatcutwithpeg'
        } else if(this.type ==='flatcutàquille') {
            this._type ='flatcutwithkeel';
        }
        let scope = this;
        new Promise(function (resolve,reject) {
            const loader = new THREE.OBJLoader();
            loader.load(`${pathToLink}object/implantTalaire/${scope.type}/${scope.preplanification.side}/T${scope.taille}.obj`, function (obj) {
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
        });
        if(this.type === 'flatcutwithkeel' && this.taille > 3){
            let className = browser !== 'firefox' ? 'swal-zoom' : 'swal-modal';
            let title = this.preplanification.lang === 'fr'? "Taille non disponible" : "Size not available";
            let texte = this.preplanification.lang === 'fr'? `La taille sélectionnée de la gamme flat cut with keel n'est pas disponible, veuillez choisir une taille entre un et trois.` :
                `This selected size of the Flat Cut with keel range is not available, please choose a size between one and three`;
            swal({
                type: 'error',
                title: title,
                text: texte,
                className : className
            });
            $(".tailleTa")
                .slider({
                    value : 3,
                })
        }
    }
    visualizeTypeTaille(type,taille) {
        this._type = type;
        this._taille = taille;
        let scope = this;
        new Promise(function (resolve,reject) {
            const loader = new THREE.OBJLoader();
            loader.load(`${pathToLink}object/implantTalaire/${type}/${scope.preplanification.side}/T${taille}.obj`, function (obj) {
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
        });
    }
}
module.exports = ImplantTalaire;
