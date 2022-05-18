/**
 * Created by Karrach on 12/10/2017.
 */


var THREE = require('three');
let assert = require('assert');
let Preplanification = require('../test/class/Preplanification');
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

/**
 *  Test class Tibia
 */

describe('Class Preplanification', function() {
    describe('Test language EN', function () {
        let preplanif = new Preplanification(object);
        it('Language EN', function () {
            assert.equal(preplanif.lang, 'En');
        });
    });
    describe('Test path radio', function () {
        let preplanif = new Preplanification(object);
        it('path radio', function () {
            assert.equal(preplanif.pathRadio, 'pathRadio/radio');
        });
    });
    describe('change', function () {
        let preplanif = new Preplanification(object);
        it('change', function () {
            assert.equal(preplanif.change, true);
        });
    });
    describe('state', function () {
        let preplanif = new Preplanification(object);
        it('state', function () {
            assert.equal(preplanif.state, false);
        });
    });
    describe('isTexture', function () {
        let preplanif = new Preplanification(object);
        it('Texture', function () {
            assert.equal(preplanif.isTexture, true);
        });
    });
    describe('Side', function () {
        let preplanif = new Preplanification(object);
        it('Left side', function () {
            assert.equal(preplanif.side, 'Gauche');
        });
    });
});
