import {
    dataMortaiseTibia,
    dataImplantTibia,
    dataMortaiseTalaire,
    dataImplantTalaire,
    dataTalaire,
    patient,
    admin
} from './objectDeclaration.js';
import {dataResponse} from "./objectDeclaration";
import {heightTibia, widthTibia} from "./Version";
import swal from 'sweetalert';

export const labelTaille = [];
export const labelEpaisseur = ['5', '6', '7', '8', '9', '11', '13', '15'];
export default class Utils {
    constructor() {
        this.elem = document.querySelector('.collapsible');
        this.instance = M.Collapsible.init(this.elem, {
            accordion: true
        });
    }

    constuctLabelleTaille() {
        let tailleTalaire = parseInt(dataResponse.Planning.talaire.implant.taille);
        if (dataResponse.Planning.state !== 2) {
            labelTaille.push(`${tailleTalaire}L`);
            labelTaille.push(`${tailleTalaire}XL`);
            console.log('taille talaire for create label taille ', tailleTalaire);
            if (tailleTalaire < 6) {
                labelTaille.push(`${tailleTalaire + 1}L`);
                labelTaille.push(`${tailleTalaire + 1}XL`);
            }
        } else {
            labelTaille.push(`${dataResponse.Preplanning.tibia.implant.taille}`);
            labelTaille.push(`${dataResponse.Planning.tibia.implant.taille}`);
        }
        console.log(labelTaille);
        return labelTaille;
    }

    configModal() {
        $(document).ready(function () {
            $('.collapsible').collapsible();
            $('ul.tabs').tabs({
                swipeable: false,
                responsiveThreshold: 1920
            });
            $('select').formSelect();
        });
    }

    configInitialisationTibia() {
        $(".hauteurTi")
            .slider({
                min: 6,
                max: 14,
                value: heightTibia,
                step: 1
            })
            .slider("pips", {
                rest: "label"
            });
        $(".distanceMRTi")
            .slider({
                min: -10,
                max: 10,
                value: widthTibia,
                step: 1
            })
            .slider("pips", {
                rest: "label"
            });
        $(".angleMMTi")
            .slider({
                min: -16,
                max: 16,

                value: 0,
                step: 1
            })
            .slider("pips", {
                rest: "label"
            });
        $(".varusValgusTi")
            .slider({
                min: -16,
                max: 16,
                value: 0,
                step: 1
            })
            .slider("pips", {
                rest: "label"
            });
        $(".angleSagittalTi")
            .slider({
                min: -16,
                max: 16,
                value: 0,
                step: 1
            })
            .slider("pips", {
                rest: "label"
            });
        $(".deplacementAPTi")
            .slider({
                min: -10,
                max: 10,
                value: 0,
                step: 1
            })
            .slider("pips", {
                rest: "label"
            });
        /**
         * Tibia translation
         */
        /**
         * Hauteur config
         */
        $('#removeHauteurTi').click(() => {
            let currentValue = $(".hauteurTi").slider("value");
            $('.hauteurTi').slider('value', currentValue - 1);
        });
        $('#addHauteurTi').click(() => {
            let currentValue = $(".hauteurTi").slider("value");
            $('.hauteurTi').slider('value', currentValue + 1);
        });
        /**
         *  Distance malleolaire
         */
        $('#removeDistanceMRTi').click(() => {
            let currentValue = $(".distanceMRTi").slider("value");
            $('.distanceMRTi').slider('value', currentValue - 1);
        });
        $('#addDistanceMRTi').click(() => {
            let currentValue = $(".distanceMRTi").slider("value");
            $('.distanceMRTi').slider('value', currentValue + 1);
        });
        /**
         * Tibia RotaTion
         */
        /**
         * Varus valgus config
         */
        $('#removeVarusValgusTi').click(() => {
            let currentValue = $(".varusValgusTi").slider("value");
            $('.varusValgusTi').slider('value', currentValue - 2);
        });
        $('#addVarusValgusTi').click(() => {
            let currentValue = $(".varusValgusTi").slider("value");
            $('.varusValgusTi').slider('value', currentValue + 2);
        });
        /**
         *  Angle sagittal
         */
        $('#removeAngleSagittalTi').click(() => {
            let currentValue = $(".angleSagittalTi").slider("value");
            $('.angleSagittalTi').slider('value', currentValue - 1);
        });
        $('#addAngleSagittalTi').click(() => {
            let currentValue = $(".angleSagittalTi").slider("value");
            $('.angleSagittalTi').slider('value', currentValue + 1);
        });
        /**
         *  Angle medial maleollaire
         */
        $('#removeAngleMMTi').click(() => {
            let currentValue = $(".angleMMTi").slider("value");
            $('.angleMMTi').slider('value', currentValue - 1);
        });
        $('#addAngleMMTi').click(() => {
            let currentValue = $(".angleMMTi").slider("value");
            $('.angleMMTi').slider('value', currentValue + 1);
        });
        /**
         * Implant Tibia
         */
        $('#removeTailleTibiaTi').click(() => {
            let currentValue = $(".tailleTibiaTi").slider("value");
            $('.tailleTibiaTi').slider('value', currentValue - 1);
        });
        $('#addTailleTibiaTi').click(() => {
            let currentValue = $(".tailleTibiaTi").slider("value");
            $('.tailleTibiaTi').slider('value', currentValue + 1);
        });
        $('#removeDeplacementAPTi').click(() => {
            let currentValue = $(".deplacementAPTi").slider("value");
            $('.deplacementAPTi').slider('value', currentValue - 1);
        });
        $('#addDeplacementAPTi').click(() => {
            let currentValue = $(".deplacementAPTi").slider("value");
            $('.deplacementAPTi').slider('value', currentValue + 1);
        });
    }

    configResetTibia() {
        $(".hauteurTi")
            .slider({
                value: heightTibia,
            });
        $(".distanceMRTi")
            .slider({
                value: widthTibia,
            });
        $(".angleMMTi")
            .slider({
                value: 0,
            });
        $(".varusValgusTi")
            .slider({
                value: 0,
            });
        $(".angleSagittalTi")
            .slider({
                value: 0,
            });
        $(".tailleTibiaTi")
            .slider({
                value: `${dataResponse.Preplanning.tibia.implant.taille}`,
            });
        $(".deplacementAPTi")
            .slider({
                value: 0,
            });
    }

    configInitialisationTalaire() {
        $(".hauteurTa")
            .slider({
                min: 3,
                max: 9,
                value: 6,
                step: 1
            })
            .slider("pips", {
                rest: "label"
            });
        $('#removeHauteurTa').click(() => {
            let currentValue = $(".hauteurTa").slider("value");
            $('.hauteurTa').slider('value', currentValue - 1);
        });
        $('#addHauteurTa').click(() => {
            let currentValue = $(".hauteurTa").slider("value");
            $('.hauteurTa').slider('value', currentValue + 1);
        });
        $(".positionAPTa")
            .slider({
                min: -10,
                max: 10,
                value: 0,
                step: 1
            })
            .slider("pips", {
                rest: "label"
            });
        $('#removePositionAPTa').click(() => {
            let currentValue = $(".positionAPTa").slider("value");
            $('.positionAPTa').slider('value', currentValue - 1);
        });
        $('#addPositionAPTa').click(() => {
            let currentValue = $(".positionAPTa").slider("value");
            $('.positionAPTa').slider('value', currentValue + 1);
        });
        $(".positionMLTa")
            .slider({
                min: -10,
                max: 10,
                value: 0,
                step: 1
            })
            .slider("pips", {
                rest: "label"
            });
        $('#removePositionMLTa').click(() => {

            let currentValue = $(".positionMLTa").slider("value");
            $('.positionMLTa').slider('value', currentValue - 1);

        });
        $('#addPositionMLTa').click(() => {
            let currentValue = $(".positionMLTa").slider("value");
            $('.positionMLTa').slider('value', currentValue + 1);
        });
        $(".varusValgusTa")
            .slider({
                min: -16,
                max: 16,
                value: 0,
                step: 1
            })
            .slider("pips", {
                rest: "label"
            });
        $('#removeVarusValgusTa').click(() => {
            let currentValue = $(".varusValgusTa").slider("value");
            $('.varusValgusTa').slider('value', currentValue - 2);
        });
        $('#addVarusValgusTa').click(() => {
            let currentValue = $(".varusValgusTa").slider("value");
            $('.varusValgusTa').slider('value', currentValue + 2);
        });
        $(".anglePSTa")
            .slider({
                min: -16,
                max: 16,
                value: 0,
                step: 1
            })
            .slider("pips", {
                rest: "label"
            });
        $('#removeAnglePSTa').click(() => {
            let currentValue = $(".anglePSTa").slider("value");
            $('.anglePSTa').slider('value', currentValue - 2);
        });
        $('#addAnglePSTa').click(() => {
            let currentValue = $(".anglePSTa").slider("value");
            $('.anglePSTa').slider('value', currentValue + 2);
        });
        console.log('taille ta', $(".tailleTa"));
        $(".tailleTa")
            .slider({
                min: 2,
                max: 6,
                value: `${dataResponse.Preplanning.talaire.implant.taille}`,
                step: 1
            })
            .slider("pips", {
                rest: "label"
            });
        $('#addTailleTa').click(() => {
            let currentValue = $(".tailleTa").slider("value");
            $('.tailleTa').slider('value', currentValue + 1);
        });
        $('#removeTailleTa').click(() => {
            let currentValue = $(".tailleTa").slider("value");
            $('.tailleTa').slider('value', currentValue - 1);
        });
        $(".deplacementAPTa")
            .slider({
                min: -10,
                max: 10,
                value: 0,
                step: 1
            })
            .slider("pips", {
                rest: "label"
            });
        $('#addDeplacementAPTa').click(() => {
            let currentValue = $(".deplacementAPTa").slider("value");
            $('.deplacementAPTa').slider('value', currentValue + 1);
        });
        $('#removeDeplacementAPTa').click(() => {
            let currentValue = $(".deplacementAPTa").slider("value");
            $('.deplacementAPTa').slider('value', currentValue - 1);
        });
        $(".anglePHTa")
            .slider({
                min: -16,
                max: 16,
                value: 0,
                step: 1
            })
            .slider("pips", {
                rest: "label"
            });
        $('#removeAnglePHTa').click(() => {
            let currentValue = $(".anglePHTa").slider("value");
            $('.anglePHTa').slider('value', currentValue - 1);
        });
        $('#addAnglePHTa').click(() => {
            let currentValue = $(".anglePHTa").slider("value");
            $('.anglePHTa').slider('value', currentValue + 1);
        });
        let type = 1;
        $('select').val(type);
        $('select').formSelect();
        $(".epaisseur")
            .slider({
                min: -10,
                max: 10,
                value: 0,
                step: 1
            })
            .slider("pips", {
                rest: "label",
            });
        $('#removeEpaisseur').click(() => {
            let currentValue = $(".epaisseur").slider("value");
            $('.epaisseur').slider('value', currentValue - 1);
        });
        $('#addEpaisseur').click(() => {
            let currentValue = $(".epaisseur").slider("value");
            $('.epaisseur').slider('value', currentValue + 1);
        });
    }

    configResetTalaire() {
        $(".hauteurTa")
            .slider({
                value: 6,
            });
        $(".positionAPTa")
            .slider({
                value: 0,
            });
        $(".positionMLTa")
            .slider({
                value: 0,
            });
        $(".varusValgusTa")
            .slider({
                value: 0,
            });
        $(".anglePSTa")
            .slider({
                value: 0,
            });
        $(".tailleTa")
            .slider({
                value: `${dataResponse.Preplanning.talaire.implant.taille}`,
            });
        $(".anglePHTa")
            .slider({
                value: 0,
            });
        $(".epaisseur")
            .slider({
                min: -10,
                max: 10,
                value: 0,
                step: 1
            })
            .slider("pips", {
                rest: "label",
            });
        let type = 1;
        $('select').val(type);
        $('select').formSelect();
    }

    configVisualisationPage() {
        if ((dataResponse.User.profil === 'administrator' || dataResponse.User.profil === 'provider') || dataResponse.Planning.state === 2) {
            /**
             * Case admin et planification en cours
             */
            if ((dataResponse.User.profil === 'administrator' || dataResponse.User.profil === 'provider') && dataResponse.Planning.state !== 2) {
                this.instance.open(1);
                $('#bodyConfigTibia').addClass('configTibia');
                $('#bodyConfigTalaire').addClass('configTibia');
                $('#collapsibleInsert').show();
                $('#bodyConfigInsert').addClass('configTibia');
                $('.hideAdmin').hide();
                /*   $('.hideProgress').hide();*/
                console.log('Case admin et planification en cours');
            } else {
                this.instance.open(1);
                $('#bodyConfigTibia').addClass('configTibia');
                $('#bodyConfigTalaire').addClass('configTibia');
                $('#collapsibleInsert').show();
                $('#bodyConfigInsert').addClass('configTibia');
                $('.hideAdmin').hide();
            }
        } else {
            $('.pageTalaire').hide();
            $('.pageInsert').hide();
            $('.hideSurgeon').hide();
            this.instance.open(1);
        }
    }

    nextToInsert() {
        $('.pageTalaire').hide();
        $('.pageTibia').hide();
        $('.pageInsert').show();
        if ((dataResponse.User.profil === 'administrator' || dataResponse.User.profil === 'provider') && dataResponse.Planning.state !== 2) {
            $('.hideAdmin').hide();
        }
        $('#bodyConfigTibia').addClass('configTibia');
        $('#bodyConfigTalaire').addClass('configTibia');
        $('#collapsibleInsert').show();
        this.instance.open(3);
    }

    previousToTibia() {
        $('.pageTalaire').show();
        $('.pageTibia').show();
        $('.pageInsert').hide();
        if ((dataResponse.User.profil === 'administrator' || dataResponse.User.profil === 'provider') && dataResponse.Planning.state !== 2) {
            $('#bodyConfigTibia').addClass('configTibia');
        } else {
            $('#bodyConfigTibia').removeClass('configTibia');
            $('#bodyConfigTalaire').removeClass('configTibia');
        }
        $('#collapsibleInsert').hide();
        $('#next').show();
        this.instance.open(1);
    }

    configStateVisualisation() {
        if (dataResponse.Planning.state === 1 || dataResponse.Planning.state === 2) {
            $(".hauteurTi")
                .slider({
                    value: dataResponse.Planning.tibia.hauteur,
                });
            $(".distanceMRTi")
                .slider({
                    value: dataResponse.Planning.tibia.dmr,
                });
            $(".angleMMTi")
                .slider({
                    value: -dataResponse.Planning.tibia.amm,
                });
            $(".varusValgusTi")
                .slider({
                    value: -dataResponse.Planning.tibia.vv,
                });
            $(".angleSagittalTi")
                .slider({
                    value: -dataResponse.Planning.tibia.asag,
                });
            $(".deplacementAPTi")
                .slider({
                    value: dataResponse.Planning.tibia.dap,
                });
            /**
             * Talaire
             */
            $(".hauteurTa")
                .slider({
                    value: -dataResponse.Planning.talaire.hauteur,
                });
            $(".positionAPTa")
                .slider({
                    value: dataResponse.Planning.talaire.pap,
                });
            $(".positionMLTa")
                .slider({
                    value: dataResponse.Planning.talaire.pml,
                });
            $(".varusValgusTa")
                .slider({
                    value: dataResponse.Planning.talaire.vv,
                });
            $(".anglePSTa")
                .slider({
                    value: dataResponse.Planning.talaire.aps,
                });
            $(".anglePHTa")
                .slider({
                    value: dataResponse.Planning.talaire.aph,
                });
            console.log(dataResponse.Planning.tibia.implant.taille);
            $(".tailleTibiaTi")
                .slider({
                    value: this.constuctLabelleTaille().indexOf(`${dataResponse.Planning.tibia.implant.taille}`),
                });
            $(".tailleTa")
                .slider({
                    value: dataResponse.Planning.talaire.implant.taille,
                });
            $(".epaisseur")
                .slider({
                    value: dataResponse.Planning.epaisseur,
                });
            let type = 0;
            if (dataResponse.Planning.talaire.implant.type === 'standard') type = 1;
            else if (dataResponse.Planning.talaire.implant.type === 'flatcutwithpeg') type = 2;
            else if (dataResponse.Planning.talaire.implant.type === 'flatcutwithkeel') type = 3;
            $('select').val(type);
            $('select').formSelect();
        }
    }

    configButtonVisualisation() {
        let lang = dataResponse.Route.split('/')[1];
        let side = dataResponse.Intervention.intervention_cote;
        let distal;
        let proximal;
        let post;
        let ant;
        let medial;
        let lateral;
        let interne;
        let externe;
        let dorsal;
        let plantaire;
        let varus = 'Varus';
        let valgus = 'Valgus';

        if (lang === 'fr') {
            distal = 'Distal';
            proximal = "Proximal";
            medial = 'Médial';
            lateral = 'Latéral';
            interne = 'Interne';
            externe = 'Externe';
            dorsal = 'Dorsale';
            plantaire = 'Plantaire';
            post = 'Postérieur';
            ant = 'Antérieur';
        } else {
            // TODO à changer les translations
            distal = 'Distal';
            proximal = "Proximal";
            medial = 'Medial';
            lateral = 'Lateral';
            interne = 'Internal';
            externe = 'External';
            dorsal = 'Dorsal';
            plantaire = 'Plantar';
            post = 'Posterior';
            ant = 'Anterior';
        }
        /**
         * complexe prothétique
         */
        $('#addHauteurTi').html(proximal);
        $('#removeHauteurTi').html(distal);

        $('#addDistanceMRTi').html(lateral);
        $('#removeDistanceMRTi').html(medial);

        $('#addDeplacementAPTi').html(ant);
        $('#removeDeplacementAPTi').html(post);

        side === 'Gauche' ? $('#removeVarusValgusTi').html(valgus) : $('#removeVarusValgusTi').html(varus);
        side === 'Gauche' ? $('#addVarusValgusTi').html(varus) : $('#addVarusValgusTi').html(valgus);

        $('#addAngleSagittalTi').html(post);
        $('#removeAngleSagittalTi').html(ant);

        side === 'Gauche' ? $('#removeAngleMMTi').html(externe) : $('#removeAngleMMTi').html(interne);
        side === 'Gauche' ? $('#addAngleMMTi').html(interne) : $('#addAngleMMTi').html(externe);

        /**
         * Talus
         */
        $('#addHauteurTa').html(distal);
        $('#removeHauteurTa').html(proximal);

        $('#addEpaisseur').html(distal);
        $('#removeEpaisseur').html(proximal);

        side === 'Gauche' ? $('#addPositionAPTa').html(ant) : $('#addPositionAPTa').html(post);
        side === 'Gauche' ? $('#removePositionAPTa').html(post) : $('#removePositionAPTa').html(ant);

        side === 'Gauche' ? $('#addPositionMLTa').html(lateral) : $('#addPositionMLTa').html(medial);
        side === 'Gauche' ? $('#removePositionMLTa').html(medial) : $('#removePositionMLTa').html(lateral);

        side === 'Gauche' ? $('#addVarusValgusTa').html(valgus) : $('#addVarusValgusTa').html(varus);
        side === 'Gauche' ? $('#removeVarusValgusTa').html(varus) : $('#removeVarusValgusTa').html(valgus);

        side === 'Gauche' ? $('#addAnglePHTa').html(externe) : $('#addAnglePHTa').html(interne);
        side === 'Gauche' ? $('#removeAnglePHTa').html(interne) : $('#removeAnglePHTa').html(externe);

        $('#addAnglePSTa').html(dorsal);
        $('#removeAnglePSTa').html(plantaire);
    }

    exit() {
        document.location.href = '';
        sessionStorage.clear();
    }

    setRange() {
        const oddNumber = [1, 3, 5, 7, 9, 11, 13, 15];
        const className =
            [
                '.angleMMTi', '.angleSagittalTi',
                '.anglePHTa', '.varusValgusTi',
                '.varusValgusTa', '.anglePSTa',
                '.angleMMTi', '.varusValgusTi',
                '.angleSagittalTi'
            ];
        oddNumber.forEach(el => {
            const classNamePos = `.ui-slider-pip-${el}`;
            const classNameNeg = `.ui-slider-pip--${el}`;

            className.forEach(elClassName => {
                $(`${elClassName} ${classNameNeg} .ui-slider-label`).css('display', 'none');
                $(`${elClassName} ${classNamePos} .ui-slider-label`).css('display', 'none');
                $(`${elClassName} ${classNameNeg} .ui-slider-line`).css('height', '7px');
                $(`${elClassName} ${classNamePos} .ui-slider-line`).css('height', '7px');
            })
        })
        this.changeTextDisplay()
    }

    changeTextDisplay() {
        const slider = $('.tailleTibiaTi .ui-slider-label')
        console.log('changeTextDisplay', slider[0])
        console.log(Object.entries(slider));
        Object.entries(slider).forEach(el => {
            if (el[0].length === 1) {
                if (el[1].textContent.charAt(1) === 'L') el[1].textContent = el[1].textContent.replace('L', 'Standard')
                if (el[1].textContent.charAt(1) === 'X') el[1].textContent = el[1].textContent.replace('XL', 'Long')
            }
        })
    }

    exportToStl(object) {
        let exporter = new THREE.STLBinaryExporter();
        let objtext = exporter.parse(object);
        return objtext;
    }

    saveData(data, fileName) {
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        let blob = new Blob([data], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = `${fileName}.stl`;
        a.click();
        window.URL.revokeObjectURL(url);
        console.log(fileName);
    }
};
