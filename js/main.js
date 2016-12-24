/** Sign Up and Login Modal 
Quando l'utente non è loggato, chiamando questa funzione vengono inizializzati i dialog **/
function notLoggedModal(){
    /** seleziona i link accedi e registrati **/
    var signUp = document.querySelector('#show-signup'); 
    var login = document.querySelector('#show-login');
    
    login.addEventListener('click', function() {
        $.get('login.html', function(data){ //carica il form da file
            $('body').append(data); //aggiunge il form alla pagina
            $('.dialog-close').click(function(){ //aggiunge il listener per la chiusura del form
                dialog.close();
            });
            var dialog = document.getElementById('dialog-login'); //seleziona il dialog
            if (! dialog.showModal) { 
                dialogPolyfill.registerDialog(dialog);
            }
            dialog.showModal(); //mostra il dialog
            });
    });
    
    signUp.addEventListener('click', function() {
        $.get('registrati.html', function(data){ //carica il form da file
            $('body').append(data); //aggiunge il form alla pagina
            $('.dialog-close').click(function(){ //aggiunge il listener per la chiusura del form
                dialog.close();
            });
            var dialog = document.getElementById('dialog-signup'); //seleziona il dialog
            if (! dialog.showModal) { 
                dialogPolyfill.registerDialog(dialog);
            }
            dialog.showModal(); //mostra il dialog
            });
    });
    
}

