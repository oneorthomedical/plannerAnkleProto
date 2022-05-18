import {mlib} from "./Material";
import {pathToLink} from "./Version";
export class TibiaOrigin {
    constructor(preplanification) {
        this._preplanification = preplanification;
        this._mesh = null;
        let scope = this;
        this._objectPromise = new Promise(function (resolve, reject) {
            const loader = new THREE.OBJLoader();
            const progress = function ( xhr ) {
                $('#progressTibia').width(`${Math.round(xhr.loaded / xhr.total * 100 )}%`);
                $('#progressTibia').html(`${Math.round(xhr.loaded / xhr.total * 100 )}%`);
                let count = $(('#countTibia'));
                count.text(Math.ceil(Math.round(xhr.loaded / xhr.total * 100 ))+ "%");
                let s = Snap('#animatedTibia');
                let progress = s.select('#progressTibia');
                progress.attr({ 'stroke-dasharray':Math.round(xhr.loaded / xhr.total * 100 )*2.512+',251.2'});
            };
            loader.load(`${scope.preplanification.path}/Tibia.obj`, function (obj) {
                obj.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        let mesh = new THREE.Mesh(scope.assignUVs(new THREE.Geometry().fromBufferGeometry(child.geometry)), mlib.TextureTibia);
                        mesh.name = `TibiaReste`;
                        resolve(mesh);
                    }
                });
                $('.progressBar').hide();
                $('#progressSpinner').hide();
                $('.wrapper').fadeTo("slow",1);
            },progress);
        });
    }
    get preplanification() {
        return this._preplanification;
    }

    set preplanification(value) {
        this._preplanification = value;
    }

    get objectPromise() {
        return this._objectPromise;
    }

    set objectPromise(value) {
        this._objectPromise = value;
    }
    get mesh() {
        return this._mesh;
    }

    set mesh(value) {
        this._mesh = value;
    }
    setVisible (boolean) {
        this._mesh.material.visible = boolean;
    }
    setTransparent(boolean) {
        if(boolean){
            this._mesh.material.opacity = 0.6;
        }else {
            this._mesh.material.opacity = 1;
        }
    }
    assignUVs(geometry) {
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
