
/**
 * Created by Karrach on 12/10/2017.
 */

var THREE = require('three');
let assert = require('assert');
let Preplanification = require('../test/class/Preplanification');
let MortaiseTibia = require('../test/class/MortaiseTibia');
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
        a : 1,
        b : 2,
        c : 3,
        d : 4,
        e : 5,
        f : 6
    }
};
let initTibia = {
    preplanification : preplanif,
    type : 'standard',
    height : 9,
    width : 0,
    dap : 0,
    varus : 10,
    tilt : 10,
    sagittalAngle : 10,
    transferMatrix : implantTibiaTransferMatrix
};
let mortaiseTibia = new MortaiseTibia(initTibia);

/**
 *  Test class Tibia
 */

describe('Class Mortaise Tibia', function() {
    describe('Type', function () {
        it('Type standard', function () {
            assert.equal(mortaiseTibia.type , 'standard');
        });
    });
    describe('Tibia cut height', function () {
        it('tibia cut height mm', function () {
            assert.equal(mortaiseTibia.height , 0);
        });
    });
    describe('Medial lateral shift', function () {
        it('Medial lateral shift mm', function () {
            assert.equal(mortaiseTibia.width , 0);
        });
    });
    describe('Anterior posterior shift', function () {
        it('Anterior posterior shift mm', function () {
            assert.equal(mortaiseTibia.dap , 0);
        });
    });
    describe('Varus/Valgus Orientation ', function () {
        it('Varus/Valgus Orientation °', function () {
            assert.equal(mortaiseTibia.varus, 10);
        });
    });
    describe('Sagittal Rotation tilt', function () {
        it('Sagittal Rotation tilt °', function () {
            assert.equal(mortaiseTibia.tilt , 10);
        });
    }); describe('Axial Rotation Angle', function () {
        it('Axial Rotation Angle °', function () {
            assert.equal(mortaiseTibia.sagittalAngle , 10 );
        });
    });
});
