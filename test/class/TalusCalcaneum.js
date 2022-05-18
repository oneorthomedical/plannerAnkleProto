 class TalusCalcaneum {
    get change() {
        return this._change;
    }

    set change(value) {
        this._change = value;
    }

    constructor(object,materiel){
        this._preplanification = object.preplanification;
        this._height = object.height;
        this._pap = object.pap ;
        this._pml= object.pml;
        this._varus = object.varus;
        this._aph = object.aph;
        this._aps = object.aps;
        this._epaisseurInsert = object.epaisseur;
        this._mesh = null;
        this._materiel = materiel;
        this._change = true;
        let scope = this;
        this._objectPromise =  new Promise((resolve, reject)=> {
            const loader = new THREE.OBJLoader();
            const progress = function ( xhr ) {
                $('#progressTalaire').width(`${Math.round(xhr.loaded / xhr.total * 100 )}%`);
                $('#progressTalaire').html(`${Math.round(xhr.loaded / xhr.total * 100 )}%`);
                let count = $(('#countTalus'));
                count.text(Math.ceil(Math.round(xhr.loaded / xhr.total * 100 ))+ "%");
                let s = Snap('#animatedTalus');
                let progress = s.select('#progressTalus');
                progress.attr({ 'stroke-dasharray':Math.round(xhr.loaded / xhr.total * 100 )*2.512+',251.2'});
            };
            loader.load(`${scope.preplanification.path}/talus.obj`, (obj)=> {
                obj.traverse((child)=> {
                    if(child instanceof THREE.Mesh){
                        let mesh = new THREE.Mesh(scope.assignUVs(new THREE.Geometry().fromBufferGeometry(child.geometry)), scope.materiel === true ? mlib.TextureTalaire : mlib.TextureFibula);
                        mesh.name = 'TalusCalcaneum';
                        resolve(mesh);
                    }
                });
            },progress);
        });
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    get pap() {
        return this._pap;
    }

    set pap(value) {
        if(this.preplanification.side === 'Gauche')  this._pap = value;
        else if (this.preplanification.side === 'Droite')  this._pap = -value;
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
    get epaisseurInsert() {
        return this._epaisseurInsert;
    }

    set epaisseurInsert(value) {
        this._epaisseurInsert = -value;
    }
    setEpaisseur(group,groupRecalage){
        group.position.y =  this.epaisseurInsert;
        groupRecalage.position.y =  this.epaisseurInsert;
    }
    resetEpaisseur(epaisseurInitial,group,groupRecalage){
        this.epaisseurInsert = epaisseurInitial;
        this.setEpaisseur(group,groupRecalage);
        $(".epaisseurInsert")
            .slider({
                value : 0,
            })
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
    cloneObject() {
        return this._mesh.clone();
    }
    get objectPromise() {
        return this._objectPromise;
    }

    set objectPromise(value) {
        this._objectPromise = value;
    }
    get materiel() {
        return this._materiel;
    }

    set materiel(value) {
        this._materiel = value;
    }
    setVisible (boolean) {
        this._mesh = boolean;
    }
    setMeshVisible (boolean) {
        this._mesh= boolean;
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
    update(mortaiseTalaire){
        this._mesh.position
            .set(
                 (this.pml),
                 (0),
                  this.pap);
        this._mesh.rotation
            .set(
                THREE.Math.degToRad((-this.aps)),
                THREE.Math.degToRad((this.aph)),
                THREE.Math.degToRad((this.varus)));
    }
    updateRegleHeight(mortaiseTibia){
        this.change = false;
        let value = 6 - (mortaiseTibia.height - this.mesh.position.y ) ;
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
        }else if (value>=1 || value<=9){
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
        console.log('meshTalus.mesh.position.y rock', this.mesh.position.y);
        $(".hauteurTa")
            .slider({
                value : value,
            });
        this.change = true;
    }
    updateBis(mortaiseTibia,mortaiseTalaire,parentGroupTalaire){
        let mortaiseTibiaWidth = 0;
        if( this.preplanification.side === 'Gauche') {
            mortaiseTibiaWidth =  mortaiseTibia.width;
        } else if(this.preplanification.side === 'Droite') {
            mortaiseTibiaWidth = - mortaiseTibia.width;
        }
        //
        // parentGroupTalaire.position
        //     .set(
        //           0  ,
        //           0  ,
        //           0);

    }
    updateBis2(mortaiseTibia,mortaiseTalaire){
        /**
         * Translation 1.5 mm
         */

        mortaiseTalaire.mesh.position.x =  this.preplanification.side === 'Gauche' ? mortaiseTibia.width : -mortaiseTibia.width;
      /*  mortaiseTalaire.mesh.position.y =  mortaiseTibia.height;*/
        mortaiseTalaire.mesh.position.z = mortaiseTibia.dap;
        mortaiseTalaire.mesh.rotation
            .set(
                THREE.Math.degToRad(mortaiseTibia.sagittalAngle ),
                THREE.Math.degToRad( mortaiseTibia.tilt ),
                THREE.Math.degToRad( mortaiseTibia.varus ));
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
module.exports = TalusCalcaneum;
