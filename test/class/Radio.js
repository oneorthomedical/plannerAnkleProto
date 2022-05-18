export class Radio {
    constructor(preplanification){
        this._preplanification = preplanification;
        this._pathFace = `${ this.preplanification.pathRadio }/face.png`;
        this._pathProfil = `${ this.preplanification.pathRadio }/profil.png`;
        this.imageFaceExist();
    }
    imageFaceExist(){
        let scope = this;
            $.ajax({
                url: scope.pathFace, //or your url
                success: function(data){
                    console.log(scope.pathFace,'exists');
                },
                error: function(data){
                    scope.pathFace = `${ scope.preplanification.pathRadio }/face.jpg`;
                    console.log(scope.pathFace,' png does not exist/ switch to jpg');
                },
            });
        $.ajax({
            url: scope.pathProfil, //or your url
            success: function(data){
                console.log(scope.pathProfil,'exists');
            },
            error: function(data){
                scope.pathProfil = `${ scope.preplanification.pathRadio }/profil.jpg`;
                console.log(scope.pathProfil,' png does not exist/ switch to jpg');
            },
        })
        /*console.log(http.status)*/
    }
    get preplanification() {
        return this._preplanification;
    }

    set preplanification(value) {
        this._preplanification = value;
    }
    get pathFace() {
        return this._pathFace;
    }

    set pathFace(value) {
        this._pathFace = value;
    }

    get pathProfil() {
        return this._pathProfil;
    }

    set pathProfil(value) {
        this._pathProfil = value;
    }
}
