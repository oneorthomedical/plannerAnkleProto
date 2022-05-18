/**
 * Created by Karrach on 12/10/2017.
 */


var THREE = require('three');
let assert = require('assert');
let Preplanification = require('../test/class/Preplanification');
let Talus = require('../test/class/TalusCalcaneum');
let objectPreplanif = {
    number : 206,
    side : 'Gauche',
    isTexture : true,
    state : false,
    change : true,
    path : 'test/test',
    pathRadio : 'pathRadio/radio',
    lang : 'En'
};
let preplanif = new Preplanification(objectPreplanif);
let object =  {
    preplanification : preplanif,
    height :9,
    pap : 5 ,
    pml: 2,
    varus : 3,
    aph : 2,
    aps : 0,
    epaisseurInsert : 5,
};

let talus = new Talus(object,true);

/**
 *  Test class Tibia
 */

describe('Class Talus', function() {
    describe('Test Talus', function () {
        it('Material talus', function () {
            assert.equal(talus.materiel, true);
        });
    });
    describe('Visible', function () {
        talus.setVisible(true);
        it('Material tibia', function () {
            assert.equal(talus.materiel, true);
        });
    });
});
