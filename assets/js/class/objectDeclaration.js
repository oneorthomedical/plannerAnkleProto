import TalusCalcaneum from "./TalusCalcaneum";
import Tibia from "./Tibia";
import Preplanification from "./Preplanification";
import {ImplantTalaire} from "./ImplantTalaire";
import {ImplantTibia} from "./ImplantTibia";
import {MortaiseTalaire} from "./MortaiseTalaire";
import {MortaiseTibia} from "./MortaiseTibia";
import {Cylindre} from "./Cylindre";
import {Perone} from "./Perone";
import {TibiaOrigin} from "./TibiaOrigin";
import JsonCompute from "./JsonCompute";
import {Radio} from "./Radio";

/*
Test Json push
 */
const jsonRep = JSON.stringify({
    "User": {"id": 2, "first_name": "admin", "last_name": "oneortho", "profil": "surgeon"},
    "Patient": {
        "id": 318,
        "first_name": "JeffreyDwight",
        "last_name": "Wiek",
        "birth_date": {"date": "1970-01-02 00:00:00.000000", "timezone_type": 3, "timezone": "Europe/Paris"}
    },
    "Intervention": {
        "id": 363,
        "case_id": "GWWie70220503A",
        "intervention_cote": "Droite",
        "intervention_date": {"date": "2022-05-03 00:00:00.000000", "timezone_type": 3, "timezone": "Europe/Paris"}
    },
    "Preplanning": {
        "epaisseur": 0,
        "tibia": {
            "hauteur": 9,
            "dmr": 0,
            "vv": 0,
            "asag": 0,
            "amm": 0,
            "dap": 0,
            "implant": {
                "taille": "4XL",
                "dap": 0,
                "posx": -1.012,
                "posy": 9.75,
                "posz": -11,
                "rotx": 0,
                "roty": 0,
                "rotz": 0
            }
        },
        "talaire": {
            "hauteur": -6,
            "pap": 0,
            "pml": 0,
            "vv": 0,
            "aph": 0,
            "aps": 0,
            "implant": {
                "taille": 4,
                "dap": 0,
                "posx": -2.614,
                "posy": -6.75,
                "posz": 1,
                "rotx": 0,
                "roty": 0,
                "rotz": 0,
                "type": "standard",
                "coplanaireMatrix": {
                    "cop1": -1.012,
                    "cop2": -2.03,
                    "cop3": -3.073,
                    "cop4": -4.114,
                    "cop5": -5.161,
                    "cop6": -6.211
                }
            }
        }
    },
    "Planning": {
        "path_radio": "../../object/scene",
        "path_stl": "../../object/scene",
        "epaisseur": 0,
        "state": 0,
        "updated_at": {"date": "2022-03-07 20:41:48.000000", "timezone_type": 3, "timezone": "Europe/Paris"},
        "tibia": {
            "hauteur": 11,
            "dmr": -3,
            "vv": 0,
            "asag": 0,
            "amm": 0,
            "dap": 0,
            "implant": {
                "taille": "5XL",
                "dap": null,
                "posx": null,
                "posy": null,
                "posz": null,
                "rotx": null,
                "roty": null,
                "rotz": null
            }
        },
        "talaire": {
            "hauteur": -7,
            "pap": 0,
            "pml": 0,
            "vv": 0,
            "aph": 0,
            "aps": 0,
            "implant": {
                "taille": 5,
                "dap": null,
                "posx": null,
                "posy": null,
                "posz": null,
                "rotx": null,
                "roty": null,
                "rotz": null,
                "type": "standard"
            }
        }
    },
    "Workflow": {"id": "363"},
    "Route": "/en/workflow/getJSon"
});
sessionStorage.setItem('JSonResponse', jsonRep);
const jsonCompute = new JsonCompute();
export const dataResponse = jsonCompute.readJsonFromSymfony();
export const patient = jsonCompute.patient;
export const admin = jsonCompute.admin;

let dataPreplanification = null;
export let preplanification = null;
let dataTibia = null;
let implantTibiaTransferMatrix = null;
export let dataImplantTibia = null;
export let dataMortaiseTibia = null;
export let dataMortaiseTalaire = null;
export let dataTalaire = null;
let implantTalaireTransferMatrix = null;
export let dataImplantTalaire = null;
const state = dataResponse.Planning.state;
let dataPlanning = null;
if (state === 0) dataPlanning = dataResponse.Preplanning;
else if (state === 1 || state === 2) dataPlanning = dataResponse.Planning;
/**
 * Information patient initialisations
 */

dataResponse.User.profil === 'surgeon' ? $('#namePatient').text(`${dataResponse.Patient.first_name} ${dataResponse.Patient.last_name}`) : $('#namePatient').text(`${dataResponse.Intervention.case_id}`);
/**
 * Processin date for multi platform
 * @type {Date}
 */
let dateStr = dataResponse.Intervention.intervention_date.date;
let a = dateStr.split(" ");
let d = a[0].split("-");
let t = a[1].split(":");
let date = new Date(d[0], (d[1] - 1), d[2], t[0], t[1], t[2]);
let dateMonth = date.getMonth() + 1;
$('#interventionDate').text(`${date.getDate()}/${dateMonth}/${date.getFullYear()}`);
console.log("langue", jsonCompute.getLang(), dataResponse.Intervention.intervention_cote)
$('#interventionNumber').text(dataResponse.Intervention.id);
const $interventionSide = $('#interventionSide');
if (jsonCompute.getLang() === 'fr') {
    $interventionSide.text(dataResponse.Intervention.intervention_cote);

} else {
    dataResponse.Intervention.intervention_cote === 'Droite' ?
        $interventionSide.text('Right')
        : $interventionSide.text('Left');
}
const side = dataResponse.Intervention.intervention_cote;
dataPreplanification = {
    number: `${dataResponse.Intervention.id}`,
    side: side,
    isTexture: true,
    state: state,
    path: jsonCompute.path,
    pathRadio: jsonCompute.getPathRadio(),
    lang: jsonCompute.getLang()
};
preplanification = new Preplanification(dataPreplanification);

dataTibia = {
    preplanification: preplanification
};
implantTibiaTransferMatrix = {
    positionX: dataResponse.Preplanning.tibia.implant.posx,
    positionY: dataResponse.Preplanning.tibia.implant.posy,
    positionZ: dataResponse.Preplanning.tibia.implant.posz,
    rotationX: 0,
    rotationY: 0,
    rotationZ: side === 'Gauche' ? 0 : 0,
    matrix: dataResponse.Preplanning.talaire.implant.coplanaireMatrix
};
dataImplantTibia = {
    preplanification: preplanification,
    type: 'standard',
    transferMatrix: implantTibiaTransferMatrix,
    taille: `${dataPlanning.tibia.implant.taille}`,
    tailleImplantTalaire: dataPlanning.talaire.implant.taille,
    deplacement: dataPlanning.tibia.implant.dap,
    taillePreplanif: dataResponse.Preplanning.tibia.implant.taille
};
dataMortaiseTibia = {
    preplanification: preplanification,
    type: 'standard',
    height: dataPlanning.tibia.hauteur,
    width: dataPlanning.tibia.dmr,
    dap: dataPlanning.tibia.dap,
    varus: -dataPlanning.tibia.vv,
    tilt: -dataPlanning.tibia.amm,
    sagittalAngle: -dataPlanning.tibia.asag,
    transferMatrix: implantTibiaTransferMatrix
};
dataMortaiseTalaire = {
    preplanification: preplanification,
    type: dataPlanning.talaire.implant.type,
    height: -6,
    pap: side === 'Gauche' ? dataPlanning.talaire.pap : -dataPlanning.talaire.pap,
    pml: dataPlanning.talaire.pml,
    varus: dataPlanning.talaire.vv,
    aph: dataPlanning.talaire.aph,
    aps: dataPlanning.talaire.aps,
    taille: dataPlanning.talaire.implant.taille
};
dataTalaire = {
    preplanification: preplanification,
    height: -dataPlanning.talaire.hauteur,
    pap: side === 'Gauche' ? dataPlanning.talaire.pap : -dataPlanning.talaire.pap,
    pml: dataPlanning.talaire.pml,
    varus: dataPlanning.talaire.vv,
    aph: dataPlanning.talaire.aph,
    aps: dataPlanning.talaire.aps,
    epaisseur: -dataPlanning.epaisseur
};
implantTalaireTransferMatrix = {
    positionX: dataResponse.Preplanning.talaire.implant.posx,
    positionY: dataResponse.Preplanning.talaire.implant.posy,
    positionZ: dataResponse.Preplanning.talaire.implant.posz,
    rotationX: 0,
    rotationY: -Math.PI,
    rotationZ: side === 'Gauche' ? 0 : 0,
    matrix: dataResponse.Preplanning.talaire.implant.coplanaireMatrix
};
dataImplantTalaire = {
    preplanification: preplanification,
    type: dataPlanning.talaire.implant.type,
    transferMatrix: implantTalaireTransferMatrix,
    taille: dataPlanning.talaire.implant.taille,
    deplacement: dataPlanning.talaire.implant.dap
};


export const talaire = new TalusCalcaneum(dataTalaire, true);
export const talusCalcaneumRecalage = new TalusCalcaneum(dataTalaire, false);
export const tibia = new Tibia(dataTibia, true);
export const tibiaRecalage = new Tibia(dataTibia, false);
export const implantTalaire = new ImplantTalaire(dataImplantTalaire);
export const implantTibia = new ImplantTibia(dataImplantTibia);
export const mortaiseTalaire = new MortaiseTalaire(dataMortaiseTalaire);
export const mortaiseTibia = new MortaiseTibia(dataMortaiseTibia);
export const cylindreGreen = new Cylindre(preplanification, 'vert');
export const cylindreRed = new Cylindre(preplanification, 'rouge');
export const cylindreOrange = new Cylindre(preplanification, 'orange');
export const perone = new Perone(preplanification);
export const tibiaOrigin = new TibiaOrigin(preplanification);
export const radio = new Radio(preplanification);

