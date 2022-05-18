
import JsonCompute from "./class/JsonCompute";
sessionStorage.clear();
let bool = 0;
$('#login').click(function () {
    const username =  document.getElementById('username').value;
    const password =  document.getElementById('password').value;
    if(username === 'jsferra' && password ==='in2bones') bool = 1;
    else if(username === 'tcooper' && password ==='in2bones') bool= 2;
    else if(username === 'ghorton' && password ==='in2bones') bool = 3;
    else if(username === 'glandis' && password ==='in2bones') bool = 4;
    else if(username === 'jbesse' && password ==='in2bones') bool = 5;
    else if(username === 'tleemrijse' && password ==='in2bones') bool = 6;
    else if(username === 'bgauneau' && password ==='in2bones') bool = 7;
    else if(username === 'calepee' && password ==='oneortho') bool = 8;
    else if(username === 'one' && password ==='one') bool = 9;
    else if(username === 'admin' && password ==='admin') bool = 10;
    else if(username === 'adavis' && password ==='in2bones') bool = 11;
    if(bool !== 0) {
        console.log('bool',bool,'username',username,'password',password);
        sessionStorage.setItem('user',bool);
        $('#error').html('Connection successfully established');
        $("#login-page").hide();
        $("#patientTable").show();
        $('#patient1').click(function () {
            console.log('patient1');
            sessionStorage.setItem('user',bool);
            sessionStorage.setItem('patient',1);
            document.location.href = 'planification.html';
        });
        $('#patient2').click(function () {
            console.log('patient2');
            sessionStorage.setItem('user',bool);
            sessionStorage.setItem('patient',2);
            document.location.href = 'planification.html'
        });
        $('#patient3').click(function () {
            console.log('patient3');
            sessionStorage.setItem('user',bool);
            sessionStorage.setItem('patient',3);
            document.location.href = 'planification.html'
        });
        $('#patient4').click(function () {
            console.log('patient4');
            sessionStorage.setItem('user',bool);
            sessionStorage.setItem('patient',4);
            document.location.href = 'planification.html'
        });

            let jsonCompute = new JsonCompute();
            if(bool !== 10) jsonCompute.planificationIsDone();
            if(bool === 10){
                $('.admin').show();
                $('.surgeon').hide();
                jsonCompute.getPlanificationAdmin();
            }
        }

        if(bool === 0 ) {
        $('#error').html('Incorrect Username/Password');
        $('#username').html('');
        $('#password').html('');
        }
});
$('select').material_select();


