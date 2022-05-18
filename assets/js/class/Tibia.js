import {mlib} from './Material.js';
import {pathToLink} from "./Version";


export default class Tibia {
    constructor(object,materiel){
        this._preplanification = object.preplanification;
        this._mesh = null;
        this._materiel = materiel;
        let scope = this;
        this._objectPromise =  new Promise((resolve, reject) =>{
            const loader = new THREE.OBJLoader();
            loader.load(`${scope.preplanification.path}/Tibia.obj`, (obj)=> {
                obj.traverse( (child)=> {
                    if(child instanceof THREE.Mesh){
                        let mesh = new THREE.Mesh(scope.assignUVs(new THREE.Geometry().fromBufferGeometry(child.geometry)), scope.materiel === true ? mlib.TextureTibia: mlib.TextureFibula);
                        mesh.name = 'Tibia';
                        resolve(mesh);
                    }
                });
            });
        });
    }
    get preplanification() {
        return this._preplanification;
    }

    set preplanification(value) {
        this._preplanification = value;
    }

    get mesh() {
        return this._mesh;
    }

    set mesh(value) {
        this._mesh = value;
    }
    get objectPromise() {
        return this._objectPromise;
    }

    set objectPromise(value) {
        this._objectPromise = value;
    }
    setVisible (boolean) {
        this._mesh.material.visible = boolean;
    }
    setMeshVisible (boolean) {
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
    get materiel() {
        return this._materiel;
    }

    set materiel(value) {
        this._materiel = value;
    }
    assignUVs(geometry) {
        geometry.mergeVertices();
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        geometry.faceVertexUvs[0] = [];
        geometry.faces.forEach(function(face) {
            let components = ['x', 'y', 'z'].sort((a, b)=> {
                return Math.abs(face.normal[a]) > Math.abs(face.normal[b]);
            });
            let v1 = geometry.vertices[face.a];
            let v2 = geometry.vertices[face.b];
            let v3 = geometry.vertices[face.c];
            geometry.faceVertexUvs[0].push([
                new THREE.Vector2(v1[components[0]], v1[components[1]]),
                new THREE.Vector2(v2[components[0]], v2[components[1]]),
                new THREE.Vector2(v3[components[0]], v3[components[1]])
            ]);
        });
        geometry.uvsNeedUpdate = true;
        return geometry;
    }
}
