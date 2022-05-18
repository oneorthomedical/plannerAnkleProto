import ThreeBSP from './ThreeBSP';
import {mlib} from "./Material";

export default class Os {
    constructor(scene, talaire, tibia, talaireRecalage) {
        this.scene = scene;
        this.tibia = tibia;
        this.talaire = talaire;
        this.talaireRecalage = talaireRecalage;
        this.tibiaGeometry = this.assignUVs(tibia.mesh.geometry);
        this.talaireGeometry = this.assignUVs(talaire.mesh.geometry);
    }

    initial() {
        this.tibia.mesh.geometry = this.tibiaGeometry;
        this.talaire.mesh.geometry = this.talaireGeometry;
    }

    update(mortaiseTalaire, mortaiseTibia, parentGroupTalaire) {
        /**
         * Affect the initial geometry
         */
        this.tibia.mesh.geometry = this.tibiaGeometry;
        this.talaire.mesh.geometry = this.talaireGeometry;
        /*  this.tibia.mesh.material.wireframe = false;
          this.talaire.mesh.material.wireframe = false;*/
        this.tibia.mesh.material.color = new THREE.Color(0xFFFFFF);
        this.talaire.mesh.material.color = new THREE.Color(0xFFFFFF);
        this.talaire.updateBis2(mortaiseTibia, mortaiseTalaire);
        /**
         * Create BSP object
         * @type {ThreeBSP}
         */
        let tibiaBsp = new ThreeBSP(this.tibia.mesh);
        let talaireBsp = new ThreeBSP(this.talaire.mesh);
        let mortaiseTibiaBsp = new ThreeBSP(mortaiseTibia.mesh);
        let mortaiseTalaireBsp = new ThreeBSP(mortaiseTalaire.mesh);
        /**
         * Substract object
         */
        let substractTibia = tibiaBsp.subtract(mortaiseTibiaBsp).toMesh(mlib.White);
        let substractTalaire = talaireBsp.subtract(mortaiseTalaireBsp).toMesh(mlib.White);
        /**
         * Buffer memory
         */
        this.tibia.mesh.geometry.dispose();
        this.talaire.mesh.geometry.dispose();
        /**
         * Affect the new geometry
         */
        this.tibia.mesh.geometry = substractTibia.geometry;
        this.talaire.mesh.geometry = substractTalaire.geometry;
        this.talaire.mesh.geometry.computeVertexNormals();
        this.tibia.mesh.geometry.computeVertexNormals();
        this.talaire.updateBis(mortaiseTibia, mortaiseTalaire, parentGroupTalaire);
    }

    updateTalaire(mortaiseTibia, mortaiseTalaire) {

        this.talaire.update(mortaiseTalaire);
        this.talaire.mesh.geometry = this.talaireGeometry;
        let talaireBsp = new ThreeBSP(this.talaire.mesh);
        let mortaiseTalaireBsp = new ThreeBSP(mortaiseTalaire.mesh);
        let substractTalaire = talaireBsp.subtract(mortaiseTalaireBsp).toMesh(mlib.White);
        this.talaire.mesh.geometry.dispose();
        this.talaire.mesh.geometry = substractTalaire.geometry;
        /**
         *  Os brut follow os
         */
        this.talaireRecalage.mesh.position.copy(this.talaire.mesh.position);
        this.talaireRecalage.mesh.rotation.set(this.talaire.mesh.rotation.x, this.talaire.mesh.rotation.y, this.talaire.mesh.rotation.z);
        // TODO AFFICHAGE DES OS BRUT
        if ($('input[name=os]').prop("checked")) {
            this.tibia.mesh.geometry = this.tibiaGeometry;
            let tibiaBsp = new ThreeBSP(this.tibia.mesh);
            let mortaiseTibiaBsp = new ThreeBSP(mortaiseTibia.mesh);
            /**
             * Substract object
             */
            let substractTibia = tibiaBsp.subtract(mortaiseTibiaBsp).toMesh(mlib.White);
            /**
             * Buffer memory
             */
            this.tibia.mesh.geometry.dispose();
            /**
             * Affect the new geometry
             */
            this.tibia.mesh.geometry = substractTibia.geometry;
            this.tibia.mesh.geometry.computeVertexNormals();
        }
    }

    assignUVs(geometry) {
        geometry.mergeVertices();
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        geometry.faceVertexUvs[0] = [];
        geometry.faces.forEach(function (face) {
            let components = ['x', 'y', 'z'].sort((a, b) => {
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

    computeHauteurPatin(mortaiseTibia, mortaiseTalaire, talus) {
        let epaisseur = 5 + mortaiseTibia.height - mortaiseTalaire.height - talus.epaisseurInsert;
        $('#labelPatin').text(`${epaisseur} mm`);
        if (epaisseur < 5) {
            this.redLeftPosition();
        } else if (epaisseur > 15) {
            this.redLeftPosition();
        } else if (epaisseur === 10) {
            this.redLeftPosition();
        } else if (epaisseur === 12) {
            this.redLeftPosition();
        } else if (epaisseur === 14) {
            this.redLeftPosition();
        } else {
            this.greenLeftPosition();
        }
    }

    redLeftPosition() {
        const redLeft = "-49%";
        const hauteurPatinRight = "0"
        $('#hauteurPatin').removeClass('green').addClass('red');
        $('#warningPatin').show();
        $('#notAvailable').show();
       /* $('.directionsViewsRelative').css('left', redLeft);*/
       /* $('#hauteurPatin').css("right", hauteurPatinRight);*/
    }

    greenLeftPosition() {
        const greenLeft = "-49%";
        const hauteurPatinRight = "0";
        $('#hauteurPatin').removeClass('red').addClass('green');
        $('#warningPatin').hide();
        $('#notAvailable').hide();
       /* $('.directionsViewsRelative').css('left', greenLeft);*/
      /*  $('#hauteurPatin').css("right", hauteurPatinRight);*/
    }

}
