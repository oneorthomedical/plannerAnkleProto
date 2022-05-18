/**
 * Created by karra on 26/04/2018.
 */
import RSVP from 'rsvp';
import {parseEnabled} from './Math';
import swal from 'sweetalert';
import {browser,boolLang} from "./Version";

export default class JsonCompute {
    constructor(){
        this._user = sessionStorage.getItem('user');
        this._patient =  sessionStorage.getItem('patient');
        this._admin  = sessionStorage.getItem('admin');
        this._surgeonTable = [
            '',
            'James Sferra',
            'Cooper Truitt',
            'Greg Horton',
            'Geoff Landis',
            'Jean-Luc Besse',
            'Thibault Leemrijse',
            'Bertrand Gauneau',
            'Christophe alepee',
            'Oneortho',
            'Administrator',
            'Alan Davis'
        ];
        this._response = JSON.parse(sessionStorage.getItem('JSonResponse'));
        this._path = null;

    }
    connexion(){
        if(this.user === null || this.patient === null){
            document.location.href = 'index.html'
        }
        else {
            console.log("connexion establish");
        }
    }
    get response() {
        return this._response;
    }

    set response(value) {
        this._response = value;
    }

    get path() {
        let surgeon = this.response.User;
        let patient = this.response.Patient;
        let intervention = this.response.Intervention;
        let cd = `../../../../uploads/surgeon/`;
        this._path = `${cd}${surgeon.id}-${surgeon.last_name}-${surgeon.first_name}/${patient.id}-${patient.last_name}-${patient.first_name}/PPI2B${intervention.id}/preplanning/stl/unziped`;
        return this._path;
    }
    set path(value) {
        this._path = value;
    }
    getPathRadio(){
        let surgeon = this.response.User;
        let patient = this.response.Patient;
        let intervention = this.response.Intervention;
        let cd = `../../../../uploads/surgeon/`;
        let pathRadio = `${cd}${surgeon.id}-${surgeon.last_name}-${surgeon.first_name}/${patient.id}-${patient.last_name}-${patient.first_name}/PPI2B${intervention.id}/preplanning/radio/unziped`;
        return pathRadio;
    }
    setStorage(user,patient){
        sessionStorage.setItem('user',user);
        sessionStorage.setItem('patient',patient);
        sessionStorage.setItem('admin','admin');
    }
    get admin() {
        return this._admin;
    }

    set admin(value) {
        this._admin = value;
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }

    get patient() {
        return this._patient;
    }

    set patient(value) {
        this._patient = value;
    }

    get surgeonTable() {
        return this._surgeonTable;
    }

    set surgeonTable(value) {
        this._surgeonTable = value;
    }
    getLang(){
        let lang = this.response.Route.split('/');
        if(boolLang === false)
            return lang[4];
        else return lang[1];
    }
    getJSON(url) {
            let promise = new RSVP.Promise(function(resolve, reject){
            let client = new XMLHttpRequest();
            client.open("GET", url);
            client.onreadystatechange = handler;
            client.responseType = "json";
            client.setRequestHeader("Accept", "application/json");
            client.send();
            function handler() {
                if (this.readyState === this.DONE) {
                    if (this.status === 200) { resolve(this.response); }
                    else { reject(this); }
                }
            }
        });
        return promise;
    }
    readJsonFromSymfony(){
        return JSON.parse(sessionStorage.getItem('JSonResponse'));
    };
    postData(url,data,state){
        $.post( url, data)
            .done(function( data ) {
                console.log( "Data Loaded: " + data );
                /*location.href = state === 2 ? "../showWorkflows" : "../showWorkflows";*/
            });
    };
    postDataWithAlertFinalValidation(url,data){
        console.log('browser',browser);
        let className = browser !== 'firefox' ? 'swal-zoom' : 'swal-modal';
        let state = 2;
        let title = this.getLang() === 'fr'? "Êtes-vous sûr ?" : "Are you sure ?";
        let text = this.getLang() === 'fr'? "La validation de la planification opératoire détermine la position définitive des coupes osseuses en vue de la pose de la prothèse de cheville In2Bones"
                                              : "The operative planning validation determines the final position of the bone sections for the placement of the In2bones TAR.";
        let textValidate = this.getLang() === 'fr'? "Les données de la planification sont envoyées" : "The planning data is sent";
        let textButtonOk = this.getLang() === 'fr'? 'Oui':'Yes';
        let textButtonNo = this.getLang() === 'fr'? 'Annuler':'Cancel';
            swal({
            title: title,
            text: text,
            icon: "info",
            buttons: [ textButtonNo , textButtonOk],
            dangerMode: true,
            className : className,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal(textValidate, {
                        icon: "success",
                        className : className
                    });
                 this.postData(url,data,state);
                }
            });
    }
    postDataWithAlertTempoValidation(url,data){
        let className = browser !== 'firefox' ? 'swal-zoom' : 'swal-modal';
        let state = 1;
        let title = this.getLang() === 'fr'? "Êtes-vous sûr ?" : "Are you sure ?";
        let text = this.getLang() === 'fr'? "Vous pouvez valider ultérieurement votre planification" : "You can validate your planning later.";
        let textValidate = this.getLang() === 'fr'? "Les données de la planification sont envoyées" : "Planning data is sent";
        let textButtonOk = this.getLang() === 'fr'? 'Oui':'Yes';
        let textButtonNo = this.getLang() === 'fr'? 'Annuler':'Cancel';
        swal({
            title: title,
            text: text,
            icon: "info",
            buttons: [ textButtonNo , textButtonOk],
            className : className
        })
            .then((willDelete) => {
                if (willDelete) {/*
                    swal( textValidate, {
                        icon: "success",
                        buttons : false,
                        className : className
                    });*/
                    this.postData(url,data,state);
                }
            });
    }
    resetPlanificationMessage(){
       /* let className = browser !== 'firefox' ? 'swal-zoom' : 'swal-modal';
        let text = this.getLang() === 'fr'? 'Retour aux valeurs de pré-planification efféctué avec succès!' : 'Back to pre-planning values successfully completed!';
        swal({
                text : text,
                icon : 'success',
                className : className,
        })*/
    }
    previousToWorkflow () {
        let className = browser !== 'firefox' ? 'swal-zoom' : 'swal-modal';
        let title = this.getLang() === 'fr'? "Êtes-vous sûr ?" : "Are you sure ?";
        let textButtonOk = this.getLang() === 'fr'? 'Oui':'Yes';
        let textButtonNo = this.getLang() === 'fr'? 'Annuler':'Cancel';
        swal({
            title: title,
            icon: "warning",
            buttons: [ textButtonNo , textButtonOk],
            className : className,
        })
            .then((willDelete) => {
                if (willDelete) {
                    location.href = "../showWorkflows";
                }
            });
    }
}
