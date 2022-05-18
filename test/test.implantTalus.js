
/**
 * Created by Karrach on 12/10/2017.
 */

var THREE = require('three');
let assert = require('assert');
let Preplanification = require('../test/class/Preplanification');
let ImplantTalaire = require('../test/class/ImplantTalaire');
let object = {
    number : 206,
    side : 'Gauche',
    isTexture : true,
    state : false,
    change : true,
    path : 'test/test',
    pathRadio : 'pathRadio/radio',
    lang : 'En'
};
let preplanif = new Preplanification(object);
implantTibiaTransferMatrix = {
    positionX : 20,
    positionY : 12,
    positionZ : 3.6,
    rotationX : 0,
    rotationY : 0,
    rotationZ : Math.PI,
    matrix  : {
        cop1 : 1,
        cop2 : 2,
        cop3 : 3,
        cop4 : 4,
        cop5 : 5,
        cop6 : 6
    }
};
let initImplantTalus = {
    preplanification : preplanif,
    type : 'standard',
    taille : '4',
    deplacement : 0,
    transferMatrix : implantTibiaTransferMatrix
};
let implantTalus = new ImplantTalaire(initImplantTalus);

/**
 *  Test class Tibia
 */

describe('Class Implant Talus', function() {
    describe('Type', function () {
        it('Type standard', function () {
            assert.equal(implantTalus.type , 'standard');
        });
    });
    describe('Tibia size', function () {
        it('tibia size', function () {
            assert.equal(implantTalus.taille , "4");
        });
    });
});
