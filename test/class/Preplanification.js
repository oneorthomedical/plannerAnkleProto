 class Preplanification {
    get lang() {
        return this._lang;
    }

    set lang(value) {
        this._lang = value;
    }
    get pathRadio() {
        return this._pathRadio;
    }

    set pathRadio(value) {
        this._pathRadio = value;
    }
    get path() {
        return this._path;
    }

    set path(value) {
        this._path = value;
    }
    get change() {
        return this._change;
    }

    set change(value) {
        this._change = value;
    }
    get state() {
        return this._state;
    }

    set state(value) {
        this._state = value;
    }

    constructor(object) {
        this._number = object.number;
        this._side = object.side;
        this._isTexture = object.isTexture;
        this._state = object.state;
        this._change = true;
        this._path = object.path;
        this._pathRadio = object.pathRadio;
        this._lang = object.lang;
    };
    get number() {
        if(this._number.length === 1) return `PPI2B000${this._number}`;
        else if(this._number.length === 2) return `PPI2B00${this._number}`;
        else if(this._number.length === 3) return `PPI2B0${this._number}`;
    }
    set number(value) {
        this._number = value;
    }
    get side() {
        return this._side;
    }

    set side(value) {
        this._side = value;
    }

    get isTexture() {
        return this._isTexture;
    }

    set isTexture(value) {
        this._isTexture = value;
    }
}
module.exports = Preplanification;
