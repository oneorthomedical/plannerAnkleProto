/**
 * Created by Karrach on 12/10/2017.
 */


var THREE = require('three');
let assert = require('assert');
let Preplanification = require('../test/class/Preplanification');
let Tibia = require('../test/class/Tibia');
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
let tibia = new Tibia(preplanif,true);

/**
 *  Test class Tibia
 */

describe('Class Tibia', function() {
    describe('Test Tibia', function () {
        it('Material tibia', function () {
            assert.equal(tibia.materiel, true);
        });
    });
    describe('Visible', function () {
        tibia.setVisible(true);
        it('Material tibia', function () {
            assert.equal(tibia.materiel, true);
        });
    });
});
