export class Planification {
    constructor(object){
        this._state = object.state;
        this._lastChange = object._lastChange;
        this._endChange = object._endChange;
    }
    get state() {
        return this._state;
    }

    get lastChange() {
        return this._lastChange;
    }

    get endChange() {
        return this._endChange;
    }

    set state(value) {
        this._state = value;
    }

    set lastChange(value) {
        this._lastChange = value;
    }

    set endChange(value) {
        this._endChange = value;
    }
}
