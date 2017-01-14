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
   //TODO Eliminare effettivamente l'account.

   var buttonToDelete = document.getElementById("btnConfermaEliminazione");
   buttonToDelete.parentNode.removeChild(buttonToDelete);

   document.getElementById("text1").innerHTML = "Account eliminato correttamente.";
   document.getElementById("text2").innerHTML = "Tra pochi istanti verrai reindirizzato alla home page del sito.";
 });
}





function reimpostaPassword() {
    ListenersHandler.addListener('btnReimpostaPassword', 'click', function(){

       //TODO Reimpostare effettivamente la password.

       var toDelete = document.getElementById("one");
       toDelete.parentNode.removeChild(toDelete);

       toDelete = document.getElementById("two");
       toDelete.parentNode.removeChild(toDelete);

       toDelete = document.getElementById("btnReimpostaPassword");
       toDelete.parentNode.removeChild(toDelete);

       document.getElementById("text1").innerHTML = "Password reimpostata correttamente. Ora puoi effettuare il login.";
    });
    
    ListenersHandler.addListener('enterbtn-recover', 'click', function(){
            resetpassword(email, function(status_ok,data){
            if(status_ok){
              //mostra modale ci siamo quasi
            }else{
                if((strcmp(data,"EMPTY_FIELD")==0)){    
                   $('#re-email').toggleClass('.is-invalid'); 
                   $('re-email-error').html("Campo non compilato");
                   $('#re-email-error').show();
                   
                }else if((strcmp(data,"INVALID_EMAIL")==0)){
                   $('#re-email').toggleClass('.is-invalid');
                   $('#re-email-error').show();
                   
                }else if((strcmp(data,"ERROR_EMAIL")==0)){
                   $('#re-email').toggleClass('.is-invalid'); 
                   $('#re-email-error').show();
                   
                }else if((strcmp(data,"ERROR_DB")==0)){
                  showErrorDB('#dialog-recover', 'ERROR_DB');
                  
                }else if((strcmp(data,"ERROR_EMAIL_NOT_FOUND")==0)){    
                   $('#re-email').toggleClass('.is-invalid');
                   $('#re-email-error').html("Email inesistente");
                   $('#re-email-error').show(); 
                }
            }
       });  
    });  
     
    ListenersHandler.addListener('btnReimpostaPassword', 'click', function(){
            resetpassword2(password,conf_password,function(status_ok,data){
            if(satus_ok){
                //mostra password reimpostata correttamente
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