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
/*const jsonRep = JSON.stringify({"User":{"id":8,"first_name":"houssam","last_name":"karrach", "profil" : "surgeon"},"Patient":{"id":3,"first_name":"Toto","last_name":"Test","birth_date":{"date":"2017-02-04 00:00:00.000000","timezone_type":3,"timezone":"Europe/Paris"}},"Intervention":{"id":6,"intervention_cote":"Gauche","intervention_date":{"date":"2018-07-27 00:00:00.000000","timezone_type":3,"timezone":"Europe/Paris"}},"Preplanning":{"tibia":{"hauteur":8,"dmr":12,"vv":0,"asag":0,"amm":0,"implant":{"taille":2,"dap":0,"posx":-13,"posy":9.61,"posz":13,"rotx":3,"roty":3,"rotz":3}},"talaire":{"hauteur":-6,"pap":8,"pml":0,"vv":0,"aph":0,"aps":0,"implant":{"taille":1,"dap":0,"posx":0,"posy":-6,"posz":1,"rotx":0,"roty":0,"rotz":0,"type":"standard","coplanaireMatrix" : {"cop1":0.51,"cop2":1.53,"cop3":2.57,"cop4":3.61,"cop5":4.66,"cop6":5.71}}}},"Planning":{"state": 0,"updated_at":{"date":"2018-07-23 16:19:18.000000","timezone_type":3,"timezone":"Europe/Paris"},"tibia":{"hauteur":null,"dmr":null,"vv":null,"asag":null,"amm":null,"implant":{"taille":null,"dap":null,"posx":null,"posy":null,"posz":null,"rotx":null,"roty":null,"rotz":null}},"talaire":{"hauteur":null,"pap":null,"pml":null,"vv":null,"aph":null,"aps":null,"implant":{"taille":null,"dap":null,"posx":null,"posy":null,"posz":null,"rotx":null,"roty":null,"rotz":null,"type":null}}},"Workflow":{"id":"3"},"Route":"/fr/workflow/getJSon"});
sessionStorage.setItem('JSonResponse',jsonRep);*/
const jsonCompute = new JsonCompute();
export const dataResponse = jsonCompute.readJsonFromSymfony();
export const patient = jsonCompute.patient;
export const admin = jsonCompute.admin;

let dataPreplanification = null;
export let preplanification = null;
let dataTibia = null;
let  implantTibiaTransferMatrix = null;
export let dataImplantTibia = null;
export let dataMortaiseTibia = null;
export let dataMortaiseTalaire = null;
export let dataTalaire = null;
let implantTalaireTransferMatrix = null;
export let dataImplantTalaire = null;
console.log(jsonCompute.getLang());
const state = dataResponse.Planning.state;
let dataPlanning = null;
if(state === 0) dataPlanning = dataResponse.Preplanning;
else if(state === 1 || state === 2 ) dataPlanning = dataResponse.Planning;
/**
 * Information patient initialisations
 */

    dataResponse.User.profil === 'surgeon' ? $('#namePatient').text(`${dataResponse.Patient.first_name} ${dataResponse.Patient.last_name}`) : $('#namePatient').text(`${dataResponse.Intervention.case_id}`);
    /**
     * Processin date for multi platform
     * @type {Date}
     */
    let dateStr = dataResponse.Intervention.intervention_date.date;
    let a=dateStr.split(" ");
    let d=a[0].split("-");
    let t=a[1].split(":");
    let date = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);
    console.log(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);
    let dateMonth = date.getMonth() +1;
    $('#interventionDate').text(`${date.getDate()}/${dateMonth}/${date.getFullYear()}`);
    $('#interventionSide').text(dataResponse.Intervention.intervention_cote);
    $('#interventionNumber').text(dataResponse.Intervention.id);
    const  side = dataResponse.Intervention.intervention_cote;
    dataPreplanification = {
        number : `${dataResponse.Intervention.id }`,
        side : side ,
        isTexture : true,
        state : state,
        path : jsonCompute.path,
        pathRadio : jsonCompute.getPathRadio(),
        lang : jsonCompute.getLang()
    };
    preplanification = new Preplanification(dataPreplanification);

    dataTibia = {
        preplanification : preplanification
    };
    implantTibiaTransferMatrix = {
        positionX : dataResponse.Preplanning.tibia.implant.posx,
        positionY : dataResponse.Preplanning.tibia.implant.posy,
        positionZ : dataResponse.Preplanning.tibia.implant.posz,
        rotationX : 0,
        rotationY : 0,
        rotationZ : side === 'Gauche' ? 0: 0,
        matrix  : dataResponse.Preplanning.talaire.implant.coplanaireMatrix
    };
    dataImplantTibia = {
        preplanification : preplanification,
        type : 'standard',
        transferMatrix : implantTibiaTransferMatrix,
        taille : `${dataPlanning.tibia.implant.taille}` ,
        tailleImplantTalaire : dataPlanning.talaire.implant.taille,
        deplacement : dataPlanning.tibia.implant.dap,
        taillePreplanif : dataResponse.Preplanning.tibia.implant.taille
    };
    dataMortaiseTibia = {
        preplanification : preplanification,
        type : 'standard',
        height : dataPlanning.tibia.hauteur,
        width : dataPlanning.tibia.dmr,
        dap : dataPlanning.tibia.dap,
        varus : -dataPlanning.tibia.vv,
        tilt : -dataPlanning.tibia.amm,
        sagittalAngle : -dataPlanning.tibia.asag,
        transferMatrix : implantTibiaTransferMatrix
    };
    dataMortaiseTalaire = {
        preplanification : preplanification,
        type : dataPlanning.talaire.implant.type,
        height : -6,
        pap : side === 'Gauche' ? dataPlanning.talaire.pap : -dataPlanning.talaire.pap,
        pml : dataPlanning.talaire.pml,
        varus : dataPlanning.talaire.vv,
        aph : dataPlanning.talaire.aph,
        aps : dataPlanning.talaire.aps,
        taille : dataPlanning.talaire.implant.taille
    };
    dataTalaire = {
        preplanification : preplanification,
        height : -dataPlanning.talaire.hauteur,
        pap : side === 'Gauche' ? dataPlanning.talaire.pap : -dataPlanning.talaire.pap,
        pml : dataPlanning.talaire.pml,
        varus : dataPlanning.talaire.vv,
        aph : dataPlanning.talaire.aph,
        aps : dataPlanning.talaire.aps,
        epaisseur : -dataPlanning.epaisseur
    };
    implantTalaireTransferMatrix = {
        positionX : dataResponse.Preplanning.talaire.implant.posx,
        positionY : dataResponse.Preplanning.talaire.implant.posy,
        positionZ : dataResponse.Preplanning.talaire.implant.posz,
        rotationX : 0,
        rotationY : - Math.PI,
        rotationZ : side === 'Gauche' ? 0 : 0,
        matrix  : dataResponse.Preplanning.talaire.implant.coplanaireMatrix
    };
    dataImplantTalaire = {
        preplanification : preplanification,
        type : dataPlanning.talaire.implant.type,
        transferMatrix : implantTalaireTransferMatrix,
        taille : dataPlanning.talaire.implant.taille ,
        deplacement : dataPlanning.talaire.implant.dap
    };


export const talaire = new TalusCalcaneum(dataTalaire,true);
export const talusCalcaneumRecalage = new TalusCalcaneum(dataTalaire,false);
export const tibia = new Tibia(dataTibia,true);
export const tibiaRecalage = new Tibia(dataTibia,false);
export const implantTalaire = new ImplantTalaire(dataImplantTalaire);
export const implantTibia= new ImplantTibia(dataImplantTibia);
export const mortaiseTalaire = new MortaiseTalaire(dataMortaiseTalaire);
export const mortaiseTibia = new MortaiseTibia(dataMortaiseTibia);
export const cylindreGreen = new Cylindre(preplanification,'vert');
export const cylindreRed = new Cylindre(preplanification,'rouge');
export const cylindreOrange = new Cylindre(preplanification,'orange');
export const perone = new Perone(preplanification);
export const tibiaOrigin = new TibiaOrigin(preplanification);
export const radio = new Radio(preplanification);

