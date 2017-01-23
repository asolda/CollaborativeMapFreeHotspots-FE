function confermaRegistrazione() {
    ListenersHandler.addListener('btnEffettuaLogin', 'click', function(){
        try{
            setTimeout(function(){
                window.location.href='.';
            }, 1000);
            
        }catch(err){
            window.location = window.location.href;
        }
        
    });
    
}




function confermaEliminazione() {
    ListenersHandler.addListener('btnConfermaEliminazione', 'click', function(){
        console.log(getParameter("token"));
        deleteAccountDo(getParameter("token"), function(status_ok,data){
            if(status_ok){
                
                var buttonToDelete = document.getElementById("btnConfermaEliminazione");
                buttonToDelete.parentNode.removeChild(buttonToDelete);
                
                document.getElementById("text1").innerHTML = "Account eliminato correttamente.";
                document.getElementById("text2").innerHTML = "Tra pochi istanti verrai reindirizzato alla home page del sito.";
            }else{
                if(strcmp(ret.message,'ERROR_SESSION')==0){
                    document.getElementById("text1").innerHTML = "Errore nella sessione.";
                    document.getElementById("text2").innerHTML = "La sessione non è stata rilevata, potrebbe essere scaduta.";
                }else if(strcmp(ret.message,'ERROR_TOKEN')==0){
                    document.getElementById("text1").innerHTML = "Operazione non consentita.";
                    document.getElementById("text2").innerHTML = "Sarai reindirizzato alla hompage del sito.";
                }else if(strcmp(ret.message,'ERROR_DB')==0){
                    document.getElementById("text1").innerHTML = "Errore nel Database.";
                    document.getElementById("text2").innerHTML = "Sarai reindirizzato alla hompage del sito.";
                }  
            }
            setTimeout(function(){destroyHome();}, 2000);
        });
    });
}





function reimpostaPassword() {
    /*ListenersHandler.addListener('btnReimpostaPassword', 'click', function(){
        
        //TODO Reimpostare effettivamente la password.
        
        
    }); */
    

    ListenersHandler.addListener('btnReimpostaPassword', 'click', function(){
        resetpassword2(password,conf_password,function(status_ok,data){
            if(satus_ok){
                var toDelete = document.getElementById("one");
                    toDelete.parentNode.removeChild(toDelete);
                    
                    toDelete = document.getElementById("two");
                    toDelete.parentNode.removeChild(toDelete);
                    
                    toDelete = document.getElementById("btnReimpostaPassword");
                    toDelete.parentNode.removeChild(toDelete);
                    
                    document.getElementById("text1").innerHTML = "Password reimpostata correttamente. Ora puoi effettuare il login.";
            }else{
                if(strcmp(data,"INVALID_PASSWORD")==0){
                    $('#one').toggleClass('.is-invalid');
                    $('#reimposta-new-error').show();
                    
                }else if(strcmp(data,"INVALID_PASSWORD_LENGTH")==0){
                    $('#one').toggleClass('.is-invalid');
                    $('#reimposta-new-error').show();
                    
                }else if(strcmp(data,"NOT_IDENTICAL_FIELDS")==0){
                    $('#one').toggleClass('.is-invalid');
                    $('#two').toggleClass('.is-invalid');
                    $('#reimposta-confirm-new-error').show();
                    
                }else if(strcmp(data,"ERROR_TOKEN")==0){
                    showSnackbar({message: 'Token non valido, potrebbe esserci un errore nel sistema.'});
                    
                }else if(strcmp(data,"ERROR_DB")==0){
                    showErrorDB('#conferma', 'ERROR_DB');
                    
                }else if(strcmp(data,"ERROR_PASSWORD")==0){
                    $('#one').toggleClass('.is-invalid');
                    $('#reimposta-new-error').show();
                    
                }else if(strcmp(data,"ERROR_PASSWORD_LENGTH")==0){
                    $('#one').toggleClass('.is-invalid');
                    $('#reimposta-new-error').show();
                }
            }
        });
    });
}