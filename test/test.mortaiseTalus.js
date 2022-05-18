
/**
 * Created by Karrach on 12/10/2017.
 */

var THREE = require('three');
let assert = require('assert');
let Preplanification = require('../test/class/Preplanification');
let MortaiseTalus = require('../test/class/MortaiseTalaire');
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

let initTalus = {
    preplanification : preplanif,
    type : 'standard',
    height : 9,
    pap : 0,
    pml : 0,
    varus : 10,
    aph : 10,
    aps : 10,
    taille : 4
};
let mortaiseTalus = new MortaiseTalus(initTalus);

/**
 *  Test class Talus
 *
 */

describe('Class Mortaise talus', function() {
    describe('Type', function () {
        it('Type standard', function () {
            assert.equal(mortaiseTalus.type , 'standard');
        });
    });
    describe('Talus/Tibia cut height', function () {
        it('Talus/Tibia cut height mm', function () {
            assert.equal(mortaiseTalus.height , 0);
        });
    });
    describe('Medial lateral shift', function () {
        it('Medial lateral shift mm', function () {
            assert.equal(mortaiseTalus.pap , 0);
        });
    });
    describe('Anterior posterior shift', function () {
        it('Anterior posterior shift mm', function () {
            assert.equal(mortaiseTalus.pml , 0);
        });
    });
    describe('Varus/Valgus Orientation ', function () {
        it('Varus/Valgus Orientation °', function () {
            assert.equal(mortaiseTalus.varus, 10);
        });
    });
    describe('Sagittal Rotation tilt', function () {
        it('Sagittal Rotation tilt °', function () {
            assert.equal(mortaiseTalus.aph , 10);
        });
    }); describe('Axial Rotation Angle', function () {
        it('Axial Rotation Angle °', function () {
            assert.equal(mortaiseTalus.aps , 10 );
        });
    });
});
