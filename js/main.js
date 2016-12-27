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
    
    addNotLoggedModal(); //aggiunge i modali alla pagina
    
} //./createNotLoggedHome


/** Funzione di inizializzazione della pagina per utenti connessi **/
function createLoggedHome(){
    hello = '<span class="menuHeader">Ciao, alberto. <a href="#">Esci</a></span>'
    
    $('.mdl-layout__header-row').append(hello);
    
    menu = '<div id="user-drawer" class="mdl-layout__drawer">' +
        '<span for="user-drawer" class="mdl-tooltip">Menu principale</span>' + 
        '<span class="mdl-layout-title">AlwaysConnected</span>' +
        '<nav id="logged-user-navigation" class="mdl-navigation">' +
        '<a class="mdl-navigation__link" href=""><i class="material-icons">wifi</i>Le mie reti</a>' +
        '<a class="mdl-navigation__link" href=""><i class="material-icons">notifications</i><span class="mdl-badge" data-badge="2">Notifiche</span></a>'+
        '<a class="mdl-navigation__link" href=""><i class="material-icons">vpn_key</i>Modifica Password</a>' +
        '<a class="mdl-navigation__link" href=""><i class="material-icons">delete</i>Elimina Account</a>' +
        '</nav>' +
        '</div>';
    
    //aggiunge il menù alla pagina
    $('.mdl-layout__header').after(menu);
                          
          
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
            
            login.close();
            recover.showModal();
            
            
        });
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
            
            /** signup request **/
            
            
            /**./signup request **/
            
           signup.showModal();
            
            
        });
        
    } //./setSignupModal
    

    
} //./notloggedModal

