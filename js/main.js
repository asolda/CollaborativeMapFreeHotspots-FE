/** Funzione di inizializzazione della pagina per visitatori **/
function createNotLoggedHome(){
    
    //setta l'id all'header
    $('.mdl-layout__header-row').attr('id','notlogged-header');
    
    //costruisce il menu
    menu = '<nav id="notlogged-menu" class="mdl-navigation">' +
             '<a id="show-login" class="mdl-navigation__link menuHeader" href="#">Accedi</a>' +
             '<span class="dividerHeader">|</span>' +
             '<a id="show-signup" class="mdl-navigation__link menuHeader" href="#">Registrati</a>' +
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
    
    // Crea il menu con la funzione per uscire
    hello = '<nav class="mdl-navigation">' +
              '<a href="#" class="mdl-navigation__link menuHeader">Ciao <span id="name">Utente</span>, esci</a>' +
            '</nav>'
    
    // Crea il menu 
    menu = '<div id="user-drawer" class="mdl-layout__drawer">' +
              '<span class="mdl-layout-title">AlwaysConnected</span>' +
              '<nav id="logged-user-navigation" class="mdl-navigation">' +
                '<hr/>' +
                '<span class="mdl-layout-title subtitle">Gestione account</span>' +
                '<a class="mdl-navigation__link" href=""><span class="space"/><i class="material-icons">wifi</i><span class="space"/>Le mie reti</a>' +
                '<a class="mdl-navigation__link" href=""><span class="space"/><i class="material-icons">notifications</i><span class="space"/><span class="mdl-badge" data-badge="2">Notifiche</span></a>'+
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
    
} //./createLoggedModal


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
    
    function setLoginModal(){
        
        document.getElementById('show-login').addEventListener('click', function(){
            
            login = document.getElementById('dialog-login'); //get dialog element
            
            if (! login.showModal) {
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
					login(email, password);
				}
				else {
					console.log('Email o password non inseriti');
				}
			});
            
            /**./Login request **/
            
           login.showModal();
                
        }); //./document
        
    } //./setLoginModal
    
    function setRecoverModal(){
        
            document.getElementById('show-recover').addEventListener('click', function(){
            
            recover = document.getElementById('dialog-recover'); //get dialog element
            
            if (! recover.showModal) {
                dialogPolyfill.registerDialog(recover);
            }
            
            /** close button function **/
            var v = document.getElementById('closebtn-recover');
            v.addEventListener('click', function() {
                
                //GO BACK to login modal, and hide recover 
                recover.close(); 
                login.showModal();
                
            });
            
            /** recover request **/
            
            
            /**./recover request **/
            
            login.close(); //nasconde il modale di login
            recover.showModal();
            
            
        });
    } //./setRecoverModal
    
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
            
            /** signup request **/
            
            
            /**./signup request **/
            
           signup.showModal();
            
            
        });
        
    } //./setSignupModal
    

    
} //./notloggedModal

/** Inizializza i modali di un utente connesso
    +Modifica Password
    +Elimina Account
    +Inserisci rete (mancante)
    +Notifiche (mancante)
    +Gestione reti (mancante)
**/
function addLoggedModal(){
    var editpassword, deleteaccount;
    
    setEditPasswordModal();
    setDeleteAccountModal();
    
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