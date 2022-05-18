import {mlib} from './Material.js';
import {pathToLink} from "./Version";
import {dataImplantTalaire, dataResponse} from "./objectDeclaration";
import {labelTaille} from "./Utils";

export class ImplantTibia {
    get taillePreplanif() {
        return this._taillePreplanif;
    }

    set taillePreplanif(value) {
        this._taillePreplanif = value;
    }

    constructor(object) {
        this._preplanification = object.preplanification;
        this._type = object.type;
        this._transferMatrix = object.transferMatrix;
        this._taille = object.taille;
        this._tailleImplantTalaire = object.tailleImplantTalaire;
        this._deplacement = object.deplacement;
        this._mesh = null;
        this._state = object.preplanification.state;
        this._newLabelTaille = [];
        this._taillePreplanif = object.taillePreplanif;
        if(this.state === 0) {
            this.newLabelTaille.push(`${parseInt(this.tailleImplantTalaire)}L`);
            this.newLabelTaille.push(`${parseInt(this.tailleImplantTalaire)}XL`);
            if(this.tailleImplantTalaire < 6 ) {
                this.newLabelTaille.push(`${parseInt(this.tailleImplantTalaire) + 1 }L`);
                this.newLabelTaille.push(`${parseInt(this.tailleImplantTalaire) + 1}XL`);
            }
            $(".tailleTibiaTi")
                .slider({
                    min: 0,
                    max: this.tailleImplantTalaire < 6 ? 3 : 1,
                    value : this.newLabelTaille.indexOf(`${this.taille}`),
                })
                .slider("pips", {
                    rest: "label",
                    labels :  this.newLabelTaille
                });
        } else if(this.state === 1) {
            this.newLabelTaille.push(`${parseInt(this.tailleImplantTalaire)}L`);
            this.newLabelTaille.push(`${parseInt(this.tailleImplantTalaire)}XL`);
            if(this.tailleImplantTalaire < 6 ) {
                this.newLabelTaille.push(`${parseInt(this.tailleImplantTalaire) + 1 }L`);
                this.newLabelTaille.push(`${parseInt(this.tailleImplantTalaire) + 1}XL`);
            }
            if(this.newLabelTaille.includes(this.taillePreplanif)){
                console.log('include', this.taillePreplanif, this.taillePreplanif ,this.newLabelTaille.includes(this.taillePreplanif) );
                if(this.taille === this.taillePreplanif){
                    $(".tailleTibiaTi")
                        .slider({
                            min: 0,
                            max: this.tailleImplantTalaire < 6 ? 3 : 1,
                            value : this.newLabelTaille.indexOf(`${this.taillePreplanif}`),
                        })
                        .slider("pips", {
                            rest: "label",
                            labels :  this.newLabelTaille
                        });
                } else {
                        $(".tailleTibiaTi")
                            .slider({
                                min: 0,
                                max: this.tailleImplantTalaire < 6 ? 3 : 1,
                                value :this.newLabelTaille.indexOf(`${this.taillePreplanif}`),
                            })
                            .slider("pips", {
                                rest: "label",
                                labels :  this.newLabelTaille
                            });
                        $(".tailleTibiaTi")
                            .slider({
                                value : this.newLabelTaille.indexOf(`${this.taille}`),
                            })
                }
            } else {
                console.log('not include');
                $(".tailleTibiaTi")
                    .slider({
                        min: 0,
                        max: this.tailleImplantTalaire < 6 ? 3 : 1,
                        value : 0,
                    })
                    .slider("pips", {
                        rest: "label",
                        labels :  this.newLabelTaille
                    });
                $(".tailleTibiaTi")
                    .slider({
                        value : this.newLabelTaille.indexOf(`${this.taille}`),
                    })
            }

        }
        else {
                this.newLabelTaille.push(this.taillePreplanif);
                this.newLabelTaille.push(this.taille);
                $(".tailleTibiaTi")
                    .slider({
                        min: 0,
                        max:  1,
                        value : 0,
                    })
                    .slider("pips", {
                        rest: "label",
                        labels :  this.newLabelTaille
                    });

                $(".tailleTibiaTi")
                    .slider({
                        value : 1,
                    })
        }
        let x = null;
        let taille = parseInt(this.taille[0]);
        if( taille === 1 ){
            x =  this.transferMatrix.matrix.cop1 ;
        }else if( taille === 2 ) {
            x =  this.transferMatrix.matrix.cop2 ;
        }else if( taille === 3 ) {
            x =  this.transferMatrix.matrix.cop3 ;
        }else if( taille === 4 ) {
            x =  this.transferMatrix.matrix.cop4 ;
        }else if( taille === 5 ) {
            x =  this.transferMatrix.matrix.cop5 ;
        }else if( taille === 6 ) {
            x =  this.transferMatrix.matrix.cop6 ;
        }
        this._objectPromise = new Promise(function (resolve, reject) {
            const loader = new THREE.OBJLoader();
            loader.load(`${pathToLink}object/implantTibia/${object.type}/${object.preplanification.side}/${object.taille}.obj`, function (obj) {
                obj.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        let mesh = new THREE.Mesh(new THREE.Geometry().fromBufferGeometry(child.geometry), mlib.Darckchrome2);
                        mesh.name = `ImplantTibia`;
                        mesh.position.set(x,object.transferMatrix.positionY,object.transferMatrix.positionZ);
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

    set type(value) {
        this._type = value;
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
    get state() {
        return this._state;
    }

    set state(value) {
        this._state = value;
    }
    set taille(value) {
        this._taille = value;
        let x = null;
        let taille = parseInt(this.taille[0]);
        if( taille === 1 ){
            x =  this.transferMatrix.matrix.cop1 ;
        }else if( taille === 2 ) {
            x =  this.transferMatrix.matrix.cop2 ;
        }else if( taille=== 3 ) {
            x =  this.transferMatrix.matrix.cop3 ;
        }else if( taille === 4 ) {
            x =  this.transferMatrix.matrix.cop4 ;
        }else if( taille === 5 ) {
            x =  this.transferMatrix.matrix.cop5 ;
        }else if( taille === 6 ) {
            x =  this.transferMatrix.matrix.cop6 ;
        }
        let scope = this;
        new Promise(function (resolve,reject) {
            const loader = new THREE.OBJLoader();
            loader.load(`${pathToLink}object/implantTibia/${scope.type}/${scope.preplanification.side}/${scope.taille}.obj`, function (obj) {
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
            this.mesh.position.x = x;
        }).catch((error)=>{
            console.log(error);
        })
    }
    get newLabelTaille() {
        return this._newLabelTaille;
    }

    set newLabelTaille(value) {
        this._newLabelTaille = value;
    }
    get deplacement() {
        return this._deplacement;
    }

    set deplacement(value) {
        this._deplacement = value;
        this.mesh.position.z = this.transferMatrix.positionZ + value;
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
    get tailleImplantTalaire() {
        return this._tailleImplantTalaire;
    }

    set tailleImplantTalaire(value) {
        this._tailleImplantTalaire = value;
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
    changePipe(labelTailleImplantTalaire){
        this.newLabelTaille = [];
 // TODO BUG
        let tailleImplantTalaire = parseInt(labelTailleImplantTalaire);
        console.log(tailleImplantTalaire);
        let tailleMin = parseInt(tailleImplantTalaire);
        let tailleMax = tailleMin + 1;
        this.newLabelTaille.push(`${tailleMin}L`);
        this.newLabelTaille.push(`${tailleMin}XL`);
        if(tailleImplantTalaire < 6) {
            this.newLabelTaille.push(`${tailleMax}L`);
            this.newLabelTaille.push(`${tailleMax}XL`);
        }
        $(".tailleTibiaTi")
            .slider({
                min : 0,
                max:  tailleImplantTalaire < 6 ? 3 : 1 ,
                value : this.newLabelTaille.indexOf(`${tailleImplantTalaire}L`),
            })
            .slider("pips", {
                rest: "label",
                labels : this.newLabelTaille
            });

        return this.newLabelTaille;
    }
    reset(labelTailleImplantTalaire,labelTailleImplantTibia){
        this.newLabelTaille = [];
        // TODO BUG
        let tailleImplantTalaire = parseInt(labelTailleImplantTalaire);
        console.log(tailleImplantTalaire);
        let tailleMin = parseInt(tailleImplantTalaire);
        let tailleMax = tailleMin + 1;
        this.newLabelTaille.push(`${tailleMin}L`);
        this.newLabelTaille.push(`${tailleMin}XL`);
        if(tailleImplantTalaire < 6) {
            this.newLabelTaille.push(`${tailleMax}L`);
            this.newLabelTaille.push(`${tailleMax}XL`);
        }
        $(".tailleTibiaTi")
            .slider({
                min : 0,
                max:  tailleImplantTalaire < 6 ? 3 : 1 ,
                value : this.newLabelTaille.indexOf(labelTailleImplantTibia),
            })
            .slider("pips", {
                rest: "label",
                labels : this.newLabelTaille
            });

        return this.newLabelTaille;
    }
}
