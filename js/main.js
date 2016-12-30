/** Funzione di inizializzazione della pagina per visitatori **/
function createNotLoggedHome(){
    
    //setta l'id all'header
    $('.mdl-layout__header-row').attr('id','notlogged-header');
    
    //costruisce il menu
    menu = '<nav id="notlogged-menu" class="mdl-navigation">' +
             '<a id="show-login" class="mdl-navigation__link menuHeader" href="#">Accedi</a>' +
             '<span class="dividerHeader">|</span>' +
             '<a id="show-signup" class="mdl-navigation__link menuHeader" href="#">Crea un nuovo account</a>' +
           '</nav>';
    
    //lo aggiunge alla pagina
    $('.mdl-layout__header-row').append(menu);
    
    // [TEMP] Carica i modali da file
    $.get('notLoggedModal.html',function(data){
       $('body').append(data); //Li aggiunge all'index
        addNotLoggedModal(); //Li inizializza
    });
     
} //./createNotLoggedHome


/** Funzione di inizializzazione della pagina per utenti connessi **/
function createLoggedHome(){

    // Rimuove l'immagine e lo spazio
    var parent = document.getElementById("toDelete").parentNode;
    var childToRemove = document.getElementById("toDelete");
    parent.removeChild(childToRemove);

    parent = document.getElementById("toDelete2").parentNode;
    childToRemove = document.getElementById("toDelete2");
    parent.removeChild(childToRemove);


    // Crea il menu con la funzione per uscire
    hello = '<nav class="mdl-navigation">' +
              '<a id="exitSystem" href="#" class="mdl-navigation__link menuHeader">Ciao <span id="name">Utente</span>, esci</a>' +
            '</nav>'
    
    // Crea il menu 
    menu = '<div id="user-drawer" class="mdl-layout__drawer">' +
              '<div id="imageLogo"></div>' +
              '<span class="mdl-layout-title" id="mainTitle">' +
                'Alwaysconnected' + 
              '</span>' +
              '<nav id="logged-user-navigation" class="mdl-navigation">' +
                '<hr/>' +
                '<span class="mdl-layout-title subtitle">Gestione account</span>' +
                '<a id="show-mywifi" class="mdl-navigation__link" href="#"><span class="space"/><i class="material-icons">wifi</i><span class="space"/>Le mie reti</a>' +
                '<a id="show-mynotification" class="mdl-navigation__link" href="#"><span class="space"/><i class="material-icons">notifications</i><span class="space"/><span class="mdl-badge" data-badge="2">Notifiche</span></a>'+
                '<a id="show-editpassword" class="mdl-navigation__link" href="#"><span class="space"/><i class="material-icons">vpn_key</i><span class="space"/>Modifica Password</a>' +
                '<a id="show-deleteaccount" class="mdl-navigation__link" href="#"><span class="space"/><i class="material-icons">delete</i><span class="space"/>Elimina Account</a>' +
              '</nav>' +
           '</div>';
    
    // Crea l'action button per inserire una mappa 
    actionbtn = '<div id="left-actionbtn">'+
                  '<button id="show-addwifi" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">' +
                    '<i class="material-icons">add</i>'+
                  '</button>'+
                  '<div class="mdl-tooltip mdl-tooltip--left mdl-tooltip--large" data-mdl-for="show-addwifi">' +
                    'Inserisci nuova rete WiFi' +
                  '</div>' +
                '</div>';

    
    /** Aggiunge le 3 componenti prima create:
        hello, nell'header;
        il menu, nell'header;
        l'action button, dopo il layout della pagina;
    **/
    $('.mdl-layout__header-row').append(hello); 
    $('.mdl-layout__header').after(menu);
    $('.mdl-layout').after(actionbtn);
    
    
    // [TEMP] Carica i modali da file
    $.get('LoggedModal.html',function(data){
       $('body').append(data); //Li aggiunge all'index
        addLoggedModal(); //Li inizializza
    });
    
} 


/** Inizializza i modali di un utente non connesso 
    +Login
    +Recupera password 
    +Registrati
**/
function addNotLoggedModal(){
    
    var signup, login, recover;
    
    setLoginModal();
    setSignupModal();
    setRecoverModal();
    setRecoverBisModal();  
    setSignupBisModal();  

    function setLoginModal(){
        document.getElementById('show-login').addEventListener('click', function(){
             login = document.getElementById('dialog-login'); //get dialog element
             if (!login.showModal) {
                dialogPolyfill.registerDialog(login);
             }
            
             /** close button function **/
             var v = document.getElementById('closebtn-login');
             v.addEventListener('click', function() {
                login.close();
             });
            
            /** login request **/
            document.getElementById('enterbtn-login').addEventListener('click', function() {
				var email = document.forms["login-form"]["l-email"].value;
				var password = document.forms["login-form"]["l-password"].value;
				if (!email.equals("") && !password.equals("")) {
					login(email, password); //TODO gestire l'accesso
				}
				else {
				        console.log('Email o password non inseriti');
				}
	    });
            
            /**./Login request **/
            
           login.showModal();
                
        });
     } 
    
    function setRecoverModal(){
            document.getElementById('show-recover').addEventListener('click', function(){
                recover = document.getElementById('dialog-recover'); //get dialog element
                  if (!recover.showModal) {
                    dialogPolyfill.registerDialog(recover);
                  }
            
                  /** close button function **/
                  var v = document.getElementById('closebtn-recover');
                  v.addEventListener('click', function() {
                     //GO BACK to login modal, and hide recover 
                     recover.close(); 
                     login.showModal();
                  });
            
                  login.close(); //nasconde il modale di login
                  recover.showModal();
            });
    } 


    function setRecoverBisModal() {
      document.getElementById('enterbtn-recover').addEventListener('click', function(){
         recoverBis = document.getElementById('dialog-recoverBis');
            if (!recoverBis.showModal) {
                    dialogPolyfill.registerDialog(recover);
            }
         
                 /** close button function **/
                  var v = document.getElementById('closebtn-recoverBis');
                  v.addEventListener('click', function() {
                     recoverBis.close(); 
                  });
      

                  // Richiesta di recupero password
		  var email = document.forms["reimposta-form"]["re-email"].value;
		    if (!(email === "")) {
			//  TODO controllo corrispondenza email e visualizza prossimo form
                        recover.close();
                        recoverBis.showModal();
		    }
		    else {
                        console.log('Email o password non inseriti');
		    }
      })
    }
    
    function setSignupModal(){
        document.getElementById('show-signup').addEventListener('click', function(){
            signup = document.getElementById('dialog-signup'); //get dialog element
            if (! signup.showModal) {
                dialogPolyfill.registerDialog(signup); 
            }
            
            /** close button function **/
            var v = document.getElementById('closebtn-signup');
            v.addEventListener('click', function() {
                signup.close();
            });
            
            signup.showModal();
            
        });
    } 


    function setSignupBisModal() {
      document.getElementById('enterbtn-signup').addEventListener('click', function(){
         signupBis = document.getElementById('dialog-signupBis');
            if (!signupBis.showModal) {
                    dialogPolyfill.registerDialog(recover);
            }
         
                 /** close button function **/
                  var v = document.getElementById('closebtn-signupBis');
                  v.addEventListener('click', function() {
                     signupBis.close(); 
                  });

             //TODO controllo campi
             signup.close();
             signupBis.showModal();
      })
    }

} 




/** Inizializza i modali di un utente connesso
    +Modifica Password
    +Elimina Account
    +Inserisci rete (mancante)
    +Notifiche (mancante)
    +Gestione reti (da completare)
**/
function addLoggedModal(){
    var editpassword, deleteaccount,mywifi;
    
    setExitModal();
    setEditPasswordModal();
    setEditPasswordBisModal();
    setDeleteAccountModal();
    setDeleteAccountBisModal();
    setMyWifiModal();
    setMyNotificationModal();

    
    function setExitModal() {
      document.getElementById('exitSystem').addEventListener('click', function(){
        exitDialog = document.getElementById('dialog-exit');
        if (!exitDialog.showModal){
          dialogPolyfill.registerDialog(exitDialog);
        }

        var v = document.getElementById('closebtn-exit');
        v.addEventListener('click', function(){
          exitDialog.close();
        });

         var vv = document.getElementById('enterbtn-exit');
         vv.addEventListener('click', function(){
          // TODO logout()
         });
        exitDialog.showModal();
      });
    }

    function setEditPasswordModal(){
        
        document.getElementById('show-editpassword').addEventListener('click', function(){
            
            editpassword = document.getElementById('dialog-editpassword'); //get dialog element
            
            if (! editpassword.showModal) {
                dialogPolyfill.registerDialog(editpassword);
            }
            
            /** close button function **/
            var v = document.getElementById('closebtn-editpassword');
            v.addEventListener('click', function() {
                
                editpassword.close();
            });
            
            /** editpassword request **/
            
            
            /**./editpassword request **/
            
           editpassword.showModal();
                
        }); //./document
        
    } //./setEditPasswordModal
    

    function setEditPasswordBisModal() {
      document.getElementById('enterbtn-editpassword').addEventListener('click', function(){
         editPasswordBis = document.getElementById('dialog-editPasswordBis');
            if (!editPasswordBis.showModal) {
                    dialogPolyfill.registerDialog(recover);
            }
         
                 /** close button function **/
                  var v = document.getElementById('closebtn-editPasswordBis');
                  v.addEventListener('click', function() {
                     editPasswordBis.close(); 
                  });

             //TODO controllo campi
             editpassword.close();
             editPasswordBis.showModal();
      })
    }

    function setDeleteAccountModal(){
        
        document.getElementById('show-deleteaccount').addEventListener('click', function(){
            
            deleteaccount = document.getElementById('dialog-deleteaccount'); //get dialog element
            
            if (! deleteaccount.showModal) {
                dialogPolyfill.registerDialog(deleteaccount);
            }
            
            /** close button function **/
            var v = document.getElementById('closebtn-deleteaccount');
            v.addEventListener('click', function() {
                
                deleteaccount.close();
            });
            
            /** deleteaccount request **/
            
            
            /**./deleteaccount request **/
            
           deleteaccount.showModal();
                
        }); //./document
        
    } //./setDeleteaccountModal
    
    
    function setDeleteAccountBisModal() {
      document.getElementById('enterbtn-deleteaccount').addEventListener('click', function(){
         deleteaccountBis = document.getElementById('dialog-deleteaccountBis');
            if (!deleteaccountBis.showModal) {
                    dialogPolyfill.registerDialog(recover);
            }
         
                 /** close button function **/
                  var v = document.getElementById('closebtn-deleteaccountBis');
                  v.addEventListener('click', function() {
                     deleteaccountBis.close(); 
                  });

             //TODO controllo campi
             deleteaccount.close();
             deleteaccountBis.showModal();
      })
    }



    
        function setMyWifiModal(){
        
        document.getElementById('show-mywifi').addEventListener('click', function(){
            
            mywifi = document.getElementById('dialog-mywifi'); //get dialog element
            
            if (! mywifi.showModal) {
                dialogPolyfill.registerDialog(mywifi);
            }
            
            /** close button function **/
            var v = document.getElementById('closebtn-mywifi');
            v.addEventListener('click', function() {
                
                mywifi.close();
            });
            

            
           mywifi.showModal();
                
        }); //./document
            
        setDeleteWifi(); //aggiunge il modale per eliminare una rete
        
    } //./setMyWifiModal
       
    
    
    function setDeleteWifi(){
        
        document.getElementById('show-deletewifi').addEventListener('click', function(){
            
            deletewifi = document.getElementById('dialog-deletewifi'); //get dialog element
            
            if (! deletewifi.showModal) {
                dialogPolyfill.registerDialog(deletewifi);
            }
            
            /** close button function **/
            var v = document.getElementById('closebtn-deletewifi');
            v.addEventListener('click', function() {
                deletewifi.close();
                mywifi.showModal();
            });
            

            /** delete button **/
                //TODO
                //send request
                //refresh wifi list
                //close this modal
                //show wifi list
            
            mywifi.close();
           deletewifi.showModal();
                
        }); //./document
        
    } //./setDeleteWifi
    
    

    function setMyNotificationModal() {
      document.getElementById('show-mynotification').addEventListener('click', function(){
            showMyNotificationModal = document.getElementById('dialog-mynotification'); //get dialog element
            if (! showMyNotificationModal.showModal) {
                showMyNotificationModal.registerDialog(showMyNotificationModal);
            }
            var v = document.getElementById('closebtn-mynotification');
            v.addEventListener('click', function() {
                showMyNotificationModal.close();
            });
            showMyNotificationModal.showModal();

            function handleMouseClick(e) {
              //TODO Aggiornare il contatore notifiche e il badge
              var clicked_element = e.target;

              if (clicked_element.nodeName == "I")
                 clicked_element.innerHTML = "notifications_none";
              else if (clicked_element.nodeName == "SPAN")
                 clicked_element.previousElementSibling.innerHTML = "notifications_none";

              clicked_element = clicked_element.parentNode.nextElementSibling;
              
              if (clicked_element.hasAttribute("hidden"))
              {
                clicked_element.removeAttribute("hidden");
              }
              else
              {
                clicked_element.setAttribute("hidden", "true");
              }
              
            }
            var x = document.getElementsByClassName("toHide");
             for (i = 0; i < x.length; i++) {
               x[i].addEventListener("click", handleMouseClick, false);
             }
            
      });
    }
    
}//./addLoggedModal


/** Gestisce lo snackbar. Accetta come parametro un oggetto con i seguenti attributi
        +string message,
        +int timeout *optional
        +string actionText, *optional
        +function actionHandler *optional
**/
function showSnackbar(sb){    
    //get the snackbar component
    var snackbar = document.getElementById('sb-confirm-operation');
    
    //check the optional parameter
    if(!sb.timeout){sb.timeout = 2000;}
    if(!sb.actionText){sb.actionText = 'Annulla'; }
    if(!sb.actionHandler){sb.actionHandler = null;};
    
    //show the snackbar
    snackbar.MaterialSnackbar.showSnackbar(sb);
}