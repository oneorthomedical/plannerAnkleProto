
/**
 * Created by Karrach on 12/10/2017.
 */

var THREE = require('three');
let assert = require('assert');
let Preplanification = require('../test/class/Preplanification');
let ImplantTibia = require('../test/class/ImplantTibia');
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
let initImplantTibia = {
    preplanification : preplanif,
    type : 'standard',
    taille : '4L',
    tailleImplantTalaire : 4,
    deplacement : 0,
    taillePreplanif : '3XL',
    transferMatrix : implantTibiaTransferMatrix
};
let implantTibia = new ImplantTibia(initImplantTibia);

/**
 *  Test class Tibia
 */

describe('Class Implant Tibia', function() {
    describe('Type', function () {
        it('Type standard', function () {
            assert.equal(implantTibia.type , 'standard');
        });
    });
    describe('Tibia size', function () {
        it('tibia size', function () {
            assert.equal(implantTibia.taille , "4L");
        });
    });
});
