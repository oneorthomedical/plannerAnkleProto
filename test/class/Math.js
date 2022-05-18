/**
 * Created by karra on 01/05/2018.
 */
export function parseEnabled(bool) {
    if(bool == true) return 'enabled';
    else if(bool ==false) return 'disabled';
}
export  function setStorage(user,patient){
    sessionStorage.setItem('user',user);
    sessionStorage.setItem('patient',patient);
    sessionStorage.setItem('admin','admin');
}
