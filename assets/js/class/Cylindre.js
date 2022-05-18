import {mlib} from "./Material";
import {dataImplantTalaire} from './objectDeclaration';
import {pathToLink} from "./Version";
import {heightTibia, widthTibia} from "./Version";

export class Cylindre {
    get colorHex() {
        return this._colorHex;
    }

    set colorHex(value) {
        this._colorHex = value;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }

    constructor(preplanification, color) {
        this._preplanification = preplanification;
        this._mesh = null;
        this._colorHex = null;
        if (color === 'rouge') this.colorHex = 0xFF0000;
        else if (color === 'vert') this.colorHex = 0x00FF00;
        else if (color === 'orange') this.colorHex = 0xFFA500;
        let scope = this;
        this._objectPromise = new Promise(function (resolve, reject) {
            const loader = new THREE.OBJLoader();
            loader.load(`${scope.preplanification.path}/tuile_${color}.obj`, function (obj) {
                obj.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        let mesh = new THREE.Mesh(new THREE.Geometry().fromBufferGeometry(child.geometry), new THREE.MeshBasicMaterial({
                            color: scope.colorHex,
                            wireframe: false,
                            transparent: false,
                            side: THREE.DoubleSide,
                        }));
                        mesh.name = `cylindre`;
                        resolve(mesh);
                    }
                })
            });
        });
        this._meshPlan = null;
        this._color = color;
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

    setVisible(boolean) {
        this._mesh.visible = boolean;
    }

    setTransparent(boolean) {
        if (boolean) {
            this._mesh.material.opacity = 0.6;
        } else {
            this._mesh.material.opacity = 1;
        }
    }

    updateWidth(value) {
        if (this.preplanification.side === 'Gauche') {
            this.mesh.position.x = value - widthTibia;
        } else if (this.preplanification.side === 'Droite') {
            this.mesh.position.x = -(value - widthTibia);
        }

    }

    updateVarus(value) {
        this.mesh.rotation.z = THREE.Math.degToRad(-value);
    }
    updateSagittal (value) {
        this.mesh.rotation.x = THREE.Math.degToRad(-value);
    }
    updateTilt (value) {
        this.mesh.rotation.y = THREE.Math.degToRad(-value);
    }
    updateHeight(value) {
        this.mesh.position.y = value - heightTibia;
    }

    addPlane() {
        const geometry = new THREE.BoxGeometry(0.4, 40, 40);
        let material = new THREE.MeshBasicMaterial({color: 0xff7000});
        this._meshPlan = new THREE.Mesh(geometry, material);
        this._meshPlan.visible = false;
        this._meshPlan.position.x = dataImplantTalaire.transferMatrix.positionX;
        this._meshPlan.name = 'plane';
        return this._meshPlan;
    }

    get meshPlan() {
        return this._meshPlan;
    }

    set meshPlan(value) {
        this._meshPlan = value;
    }

    setVisiblePlane(value) {
        this.meshPlan.visible = value;
    }
}
