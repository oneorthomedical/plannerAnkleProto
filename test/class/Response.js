import {heightTalaire, heightTibia, widthTibia} from "./Version";

export class Response {
    constructor(dataMortaiseTibia,dataImplantTibia,dataMortaiseTalaire,dataTalaire,dataImplantTalaire,state){
        this.dataMortaiseTibia = dataMortaiseTibia;
        this.dataTalaire = dataTalaire;
        this.dataMortaiseTalaire = dataMortaiseTalaire;
        this.dataImplantTalaire = dataImplantTalaire;
        this.dataImplantTibia = dataImplantTibia;
        this.state = state;
        this.jsonResponse = null;
        console.log(dataMortaiseTalaire,dataMortaiseTibia)
    }
    setResponse(objectResponse) {
        /**
         * Save tibia parameters
         */
        objectResponse.Planning.state = this.state;

        objectResponse.Planning.tibia.hauteur = this.dataMortaiseTibia.height + heightTibia ;
        objectResponse.Planning.tibia.dmr = this.dataMortaiseTibia.width + widthTibia ;
        objectResponse.Planning.tibia.dap = this.dataMortaiseTibia.dap;

        objectResponse.Planning.tibia.vv = this.dataMortaiseTibia.varus;
        objectResponse.Planning.tibia.asag = this.dataMortaiseTibia.sagittalAngle;
        objectResponse.Planning.tibia.amm = this.dataMortaiseTibia.tilt;
        /**
         * Implant
         */
        objectResponse.Planning.tibia.implant.taille = this.dataImplantTibia.taille;

        /**
         * Save talaire parameters
         */
        objectResponse.Planning.talaire.hauteur = -(-this.dataMortaiseTalaire.height + heightTalaire);
        objectResponse.Planning.talaire.pap = objectResponse.Intervention.intervention_cote === 'Gauche' ? this.dataTalaire.pap : -this.dataTalaire.pap;
        objectResponse.Planning.talaire.pml = this.dataTalaire.pml;

        objectResponse.Planning.talaire.vv  = this.dataTalaire.varus;
        objectResponse.Planning.talaire.aph  = this.dataTalaire.aph;
        objectResponse.Planning.talaire.aps  = this.dataTalaire.aps;
        /**
         * Implant
         */
        objectResponse.Planning.talaire.implant.type = this.dataMortaiseTalaire.type;
        objectResponse.Planning.talaire.implant.taille = this.dataImplantTalaire.taille;
        /**
         * Save planification
         */
        objectResponse.Planning.epaisseur = -this.dataTalaire.epaisseurInsert;
        console.log(' this.dataTalaire.epaisseurInsert',  this.dataTalaire.epaisseurInsert);
        /**
         * Save response in session
         */
        this.jsonResponse = JSON.stringify(objectResponse);
        sessionStorage.setItem('JSonResponseSave', this.jsonResponse);

        /**
         *  A terminer
         */
    }
    getJson(){
        return this.jsonResponse;
    }

}
