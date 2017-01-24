var showReport;

/** Funzione di servizio per ottenere l'id dell'utente la cui sessione è attiva **/
function getUser(){
    return user_id;
}

function destroyHome(){
    window.location.href='.';
}

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
    
    document.getElementById("badgeNotificheHeader").setAttribute("hidden", "true");
    document.getElementById("tooltipApriMenu").setAttribute("hidden", "true");
    
} //./createNotLoggedHome


/** Funzione di inizializzazione della pagina per utenti connessi **/
function createLoggedHome(){
    document.getElementById("tooltipApriMenu").removeAttribute("hidden");
    ListenersHandler.addListener('tooltipApriMenu', 'click', function(){
        $( 'div[class^="mdl-layout__obfuscator"]' ).trigger( "click" );
    });
    
    
    // Rimuove l'immagine(logo) e lo spazio
    var parent = document.getElementById("toDelete").parentNode;
    var childToRemove = document.getElementById("toDelete");
    parent.removeChild(childToRemove);
    
    parent = document.getElementById("toDelete2").parentNode;
    childToRemove = document.getElementById("toDelete2");
    parent.removeChild(childToRemove);
    
    
    // Crea il menu con la funzione per uscire
    hello = '<nav class="mdl-navigation">' +
    '<a id="exitSystem" href="#" class="mdl-navigation__link menuHeader">Ciao <span id="name">Utente</span>, esci</a>' +
    '</nav>';
    
    // Crea il menu
    menu = '<div id="user-drawer" class="mdl-layout__drawer">' +
    '<span id="closeDrawer" class="iconCloseDrawer">' +
    '<i id="iconCloseDrawerOne" class="material-icons">navigate_before</i>' +
    '<i id="iconCloseDrawerTwo" class="material-icons">navigate_before</i>' +
    '</span>' +
    '<div id="imageLogo"></div>' +
    '<span class="mdl-layout-title" id="mainTitle">' +
    'Always<span style="font-weight: bolder">connected</span>' +
    '</span>' +
    '<nav id="logged-user-navigation" class="mdl-navigation">' +
    '<hr/>' +
    '<span class="mdl-layout-title subtitle">Gestione account</span>' +
    '<a id="show-mywifi" class="mdl-button mdl-js-button mdl-js-ripple-effect drawerlink" href="#"><span class="space"/><i class="material-icons">wifi</i><span class="space"/>Le mie reti</a>' +
    '<a id="show-mynotification" class="mdl-button mdl-js-button mdl-js-ripple-effect drawerlink" href="#"><span class="space"/><i class="material-icons">notifications</i><span class="space"/>Notifiche&nbsp&nbsp&nbsp&nbsp&nbsp<span hidden class="mdl-badge" data-badge="" id="badgeNotificheMenu"></span></a>'+
    '<a id="show-editpassword" onclick="inizializzaModificaPassword().showModal();" class="mdl-button mdl-js-button mdl-js-ripple-effect drawerlink" href="#"><span class="space"/><i class="material-icons">vpn_key</i><span class="space"/>Modifica Password</a>' +
    '<a id="show-deleteaccount" class="mdl-button mdl-js-button mdl-js-ripple-effect drawerlink" href="#"><span class="space"/><i class="material-icons">delete</i><span class="space"/>Elimina Account</a>' +
    '<a hidden id="test" class="mdl-button mdl-js-button mdl-js-ripple-effect drawerlink" href="#"><span class="space"/><i class="material-icons">warning</i><span class="space"/>TEST FORM SEGNALAZIONI</a>' +
    '</nav>' +
    '</div>' +
    '<div class="mdl-tooltip mdl-tooltip--large" data-mdl-for="closeDrawer">' +
    'Chiudi men&ugrave' +
    '</div>' ;
    
    // Crea l'action button per inserire una mappa
    actionbtn = '<div id="left-actionbtn">'+
    '<button id="show-addwifi" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">' +
    '<i class="material-icons">add</i>'+
    '</button>'+
    '<div class="mdl-tooltip mdl-tooltip--left mdl-tooltip--large" data-mdl-for="show-addwifi">' +
    'Inserisci nuova rete Wi-Fi' +
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
    
    gestioneNotifiche();
}

function notification_badge_refresher(){
    notifications_amount(function(status_ok, data){
        if(status_ok==0){
            badgeHandler(data);
        }else{
            if(strcmp(data,'ERROR_SESSION_NOT_FOUND')==0){
                try{
                    setTimeout(function(){destroyHome();}, 1000);
                }catch(err){
                    window.location = window.location.href;
                }
            }
        }
        setTimeout(notification_badge_refresher, 5000);
    });
}

function badgeHandler(data){
    var badgeHeader = document.getElementById("badgeNotificheHeader");
    var badgeMenu = document.getElementById("badgeNotificheMenu");
    if(data==0){
        badgeHeader.setAttribute("hidden", "true");
        badgeMenu.setAttribute("hidden", "true");
    }else{
        badgeHeader.removeAttribute("hidden");
        badgeMenu.removeAttribute("hidden");
    }
    badgeHeader.setAttribute("data-badge", data);
    badgeMenu.setAttribute("data-badge", data);
}


function gestioneNotifiche(){
    //GESTIONE NOTIFICHE
    var badgeHeader = document.getElementById("badgeNotificheHeader");
    var badgeMenu = document.getElementById("badgeNotificheMenu");
    
    badgeHeader.setAttribute("hidden", "true");
    badgeMenu.setAttribute("hidden", "true");
    
    //apre il menù laterale al click sul badge nell'header
    ListenersHandler.addListener('badgeNotificheHeader', 'click', function(){
        $( 'div[class^="mdl-layout__obfuscator"]' ).trigger( "click" );
    });
    
    
    notification_badge_refresher();
    
    //Altrimenti nascondere il badge
    //badgeHeader.setAttribute("hidden", "true");
    //badgeMenu.setAttribute("hidden", "true");
}

/** Inizializza i modali di un utente non connesso
+Login
+Recupera password
+Registrati
**/
function addNotLoggedModal(){
    var signup, loginDialog, recover;
    
    setLoginModal();
    setSignupModal();
    setRecoverModal();
    setRecoverBisModal();
    
    function setLoginModal(){
        ListenersHandler.addListener('show-login', 'click', function(){
            loginDialog = document.getElementById('dialog-login'); //get dialog element
            if (!loginDialog.showModal){
                dialogPolyfill.registerDialog(loginDialog);
            }
            
            /** close button function **/
            ListenersHandler.addListener('closebtn-login', 'click', function(){
                loginDialog.close();
            });
            
            /** login request **/
            ListenersHandler.addListener('enterbtna-login', 'click', function(){
                var email = $('#in-l-email').val();/*document.forms["login-form"]["l-email"].value;*/
                var password = $('#in-l-password').val();/*document.forms["login-form"]["l-password"].value;*/
                
                console.debug("value="+ JSON.stringify(email));
                console.debug("value="+ JSON.stringify(password));
                signIn(email, password, function(status_ok, data){
                    console.debug("value s="+ JSON.stringify(status_ok));
                    console.debug("value d="+ JSON.stringify(data));
                    if (status_ok){ //login ok
                        userID = data;
                        try{
                            setTimeout(function(){destroyHome();}, 1000);
                        }catch(err){
                            window.location = window.location.href;
                        }
                    }else{ //errore nel login
                        $('#l-email').removeClass("is-invalid");
                        $('#l-password').removeClass("is-invalid");
                        
                        $('#l-email-error').html("");
                        $('#l-password-error').html("");
                        
                        if(strcmp(data,'CAMPI_EMAIL_PASSWORD_NON_COMPILATI')==0){
                            $('#l-email').addClass("is-invalid");
                            $('#l-email-error').html("Campo non compilato.");
                            
                            $('#l-password').addClass("is-invalid");
                            $('#l-password-error').html("Campo non compilato.");
                            
                        }else if(strcmp(data,'CAMPO_EMAIL_NON_COMPILATO')==0){
                            $('#l-email').addClass("is-invalid");
                            $('#l-email-error').html("Campo non compilato.");
                            
                        }else if(strcmp(data,'CAMPO_PASSWORD_NON_COMPILATO')==0){
                            $('#l-password').addClass("is-invalid");
                            $('#l-password-error').html("Campo non compilato.");
                            
                        }else if(strcmp(data,'ERROR_GENERATING_SESSION')==0){
                            showSnackbar({message: 'Errore nella generazione della sessione.'});
                            
                        }else if(strcmp(data,'ERROR_EMAIL_PASSWORD')==0){
                            $('#l-email').addClass("is-invalid");
                            $('#l-email-error').html("Campo non compilato.");
                            
                            $('#l-password').addClass("is-invalid");
                            $('#l-password-error').html("Campo non compilato.");
                            
                        }else if(strcmp(data,'ERROR_EMAIL')==0){
                            $('#l-email').addClass("is-invalid");
                            $('#l-email-error').html("Campo non valido.");
                            
                        }else if(strcmp(data,'ERROR_PASSWORD')==0){
                            $('#l-password').addClass("is-invalid");
                            $('#l-password-error').html("Campo non compilato.");
                            
                        }else if(strcmp(data,'ERROR_CREDENTIALS')==0){
                            $('#l-email').addClass("is-invalid");
                            $('#l-email-error').html("Credenziali non valide.");
                            
                            $('#l-password').addClass("is-invalid");
                            $('#l-password-error').html("Credenziali non valide.");
                        }
                    }
                });
                
            });
            
            /**./Login request **/
            loginDialog.showModal();
            
        });
    }
    
    function setRecoverModal(){
        ListenersHandler.addListener('show-recover', 'click', function(){
            recover = document.getElementById('dialog-recover'); //get dialog element
            if (!recover.showModal){
                dialogPolyfill.registerDialog(recover);
            }
            
            /** close button function **/
            ListenersHandler.addListener('closebtn-recover', 'click', function(){
                //GO BACK to login modal, and hide recover
                recover.close();
                loginDialog.showModal();
            });
            
            loginDialog.close(); //nasconde il modale di login
            recover.showModal();
        });
    }
    
    function setRecoverBisModal(){
        ListenersHandler.addListener('enterbtn-recover', 'click', function(){
            var email = $('#in-re-email').val();
            
            resetpassword(email, function(status_ok,data){
                if(status_ok){
                    recoverBis = document.getElementById('dialog-recoverBis');
                    if (!recoverBis.showModal){
                        dialogPolyfill.registerDialog(recover);
                    }
                    ListenersHandler.addListener('closebtn-recoverBis', 'click', function(){
                        recoverBis.close();
                    });
                    
                    recover.close();
                    recoverBis.showModal();
                }else{
                    $('#re-email').removeClass('is-invalid');
                    $('re-email-error').html("");
                    
                    if((strcmp(data,"EMPTY_FIELD")==0)){
                        $('#re-email').addClass('is-invalid');
                        $('re-email-error').html("Campo non compilato.")
                        
                    }else if((strcmp(data,"INVALID_EMAIL")==0)){
                        $('#re-email').addClass('is-invalid');
                        $('re-email-error').html("Email non valida.");
                        
                        
                    }else if((strcmp(data,"ERROR_EMAIL")==0)){
                        $('#re-email').toggleClass('is-invalid');
                        $('re-email-error').html("Email non valida.");
                        
                    }else if((strcmp(data,"ERROR_DB")==0)){
                        showErrorDB('#dialog-recover', 'ERROR_DB');
                        
                    }else if((strcmp(data,"ERROR_EMAIL_NOT_FOUND")==0)){
                        $('#re-email').addClass('is-invalid');
                        $('#re-email-error').html("Email inesistente.");
                    }
                }
            });
        });
        
        
        
    }
    
}

function setSignupModal(){
    ListenersHandler.addListener('show-signup', 'click', function(){
        signup = document.getElementById('dialog-signup'); //get dialog element
        if(!signup.showModal){
            dialogPolyfill.registerDialog(signup);
        }
        
        /** close button function **/
        ListenersHandler.addListener('closebtn-signup', 'click', function(){
            signup.close();
        });
        
        signup.showModal();
        
        ListenersHandler.addListener('enterbtn-signup', 'click', function(){
            var email= $('#in-r-email').val();
            var password=$('#in-r-password').val();
            var confermapassword=$('#in-r-confermapassword').val();
            
            /*console.debug("value="+ JSON.stringify(email));
            console.debug("value="+ JSON.stringify(password));
            console.debug("value="+ JSON.stringify(confermapassword));*/
            registration(email,password,confermapassword,function(status_ok,data){
                if(status_ok){
                    setSignupBisModal();
                }else{
                    $('#r-email').removeClass("is-invalid");
                    $('#r-password').removeClass("is-invalid");
                    $('#r-confermapassword').removeClass("is-invalid");
                    
                    $('#r-email-error').html("");
                    $('#r-password-error').html("");
                    $('#r-confermapassword-error').html("");
                    
                    if((strcmp(data,'CAMPI_EMAIL_PASSWORD_CONFERMAPASSWORD_NON_COMPILATI'))==0){
                        $('#r-email').addClass("is-invalid");
                        $('#r-email-error').html("Campo non compilato.");
                        
                        $('#r-password').addClass("is-invalid");
                        $('#r-password-error').html("Campo non compilato.");
                        
                        $('#r-confermapassword').addClass("is-invalid");
                        $('#r-confermapassword-error').html("Campo non compilato.");
                        
                    }else if((strcmp(data,"CAMPI_EMAIL_PASSWORD_NON_COMPILATI"))==0){
                        $('#r-email').addClass("is-invalid");
                        $('#r-email-error').html("Campo non compilato.");
                        
                        $('#r-password').addClass("is-invalid");
                        $('#r-password-error').html("Campo non compilato.");
                        
                    }else if((strcmp(data,"CAMPI_PASSWORD_CONFERMAPASSWORD_NON_COMPILATI"))==0){
                        $('#r-password').addClass("is-invalid");
                        $('#r-password-error').html("Campo non compilato.");
                        
                        $('#r-confermapassword').addClass("is-invalid");
                        $('#r-confermapassword-error').html("Campo non compilato.");
                        
                    }else if((strcmp(data,"CAMPI_EMAIL_CONFERMAPASSWORD_NON_COMPILATI"))==0){
                        $('#r-email').addClass("is-invalid");
                        $('#r-email-error').html("Campo non compilato.");
                        
                        $('#r-confermapassword').addClass("is-invalid");
                        $('#r-confermapassword-error').html("Campo non compilato.");
                        
                    }else if((strcmp(data,"CAMPO_EMAIL_NON_COMPILATO"))==0){
                        $('#r-email').addClass("is-invalid");
                        $('#r-email-error').html("Campo non compilato.");
                        
                    }else if((strcmp(data,"CAMPO_PASSWORD_NON_COMPILATO"))==0){
                        $('#r-password').addClass("is-invalid");
                        $('#r-password-error').html("Campo non compilato.");
                        
                    }else if((strcmp(data,"CAMPO_CONFERMAPASSWORD_NON_COMPILATO"))==0){
                        $('#r-confermapassword').addClass("is-invalid");
                        $('#r-confermapassword-error').html("Campo non compilato.");
                        
                    }else if((strcmp(data,"ERROR_EMAIL"))==0){
                        $('#r-email').addClass("is-invalid");
                        $('#r-email-error').html("Campo non valido.");
                        
                    }else if((strcmp(data,"ERROR_PASSWORD"))==0){
                        $('#r-password').addClass("is-invalid");
                        $('#r-password-error').html("Campo non valido.");
                        
                    }else if((strcmp(data,"ERROR_PASSWORD_LENGTH"))==0){
                        $('#r-password').addClass("is-invalid");
                        $('#r-password-error').html("Lunghezza password non valida.");
                        
                    }else if((strcmp(data,"CAMPI_NON_COINCIDENTI"))==0){
                        $('#r-password').addClass("is-invalid");
                        $('#r-password-error').html("Campi non coincidenti.");
                        
                        $('#r-confermapassword').addClass("is-invalid");
                        $('#r-confermapassword-error').html("Campi non coincidenti.");
                        
                    }else if((strcmp(data,"ERROR_EMAIL_PASSWORD"))==0){
                        $('#r-email').addClass("is-invalid");
                        $('#r-email-error').html("Campo non compilato.");
                        
                        $('#r-password').addClass("is-invalid");
                        $('#r-password-error').html("Campo non compilato.");
                        
                    }else if((strcmp(data,"ERROR_DB"))==0){
                        showErrorDB('#dialog-signup', 'ERROR_DB');
                        
                    }else if((strcmp(data,"ERROR_EMAIL_ALREADY_EXISTS"))==0){
                        $('#r-email').addClass("is-invalid");
                        $('#r-email-error').html("Email esistente.");
                        
                    }
                }
            });
        });
        
    });
    
}


function setSignupBisModal(){
    signupBis = document.getElementById('dialog-signupBis');
    if (!signupBis.showModal){
        dialogPolyfill.registerDialog(recover);
    }
    
    //* close button function **
    ListenersHandler.addListener('closebtn-signupBis', 'click', function(){
        signupBis.close();
    });
    
    //TODO controllo campi
    signup.close();
    signupBis.showModal();
}





/** Inizializza i modali di un utente connesso
+Modifica Password
+Elimina Account
+Inserisci rete (mancante)
+Notifiche (mancante)
+Gestione reti (da completare)
**/
function addLoggedModal(){
    var mywifi, func_handler_maps=null;
    
    setExitModal();
    //setEditPasswordBisModal();
    setMyWifiModal();
    setMyNotificationModal();
    setAskInsertWifiMode();
    setDeleteAccountModal();
    
    function setAskInsertWifiMode(){
        ListenersHandler.addListener('show-addwifi', 'click', function(){
            askInsertWifiMode = document.getElementById('dialog-askinsertwifimode'); //get dialog element
            if (!askInsertWifiMode.showModal){
                askInsertWifiMode.registerDialog(askInsertWifiMode);
            }
            
            current_pin_can_only_select=true;
            
            /** close button function **/
            ListenersHandler.addListener('closebtn-askinsertwifimode', 'click', function(){
                askInsertWifiMode.close();
                insertPinCustomMode(false);
                current_pin_can_only_select=false;
            });
            
            ListenersHandler.addListener('myposition-askinsertwifimode', 'click', function(){
                askInsertWifiMode.close();
                if(mutex_new_pin == 0){
                    //mutex_new_pin = 1;
                    addMarker(event.latLng, 'Click Generated Marker', map);
                }else{
                    alert("Completa prima l' inserimento di un pin");
                }
                
                getLocationFromLatLng(pos.lat, pos.lng, function(data){
                    data = jQuery.parseJSON(JSON.stringify(data))
                    data = data.results[0].formatted_address;
                    $('#dialog-insertnewwifi .mdl-dialog__sub').text(data);
                });
                
                insertnewwifi.showModal();
            });
            
            ListenersHandler.addListener('custom-askinsertwifimode', 'click', function(){
                askInsertWifiMode.close();
                insertPinCustomMode(true);
                
                $('#dialog-insertnewwifi p').empty();
                //va fatto comparire il modal dopo aver piazzato il pin
                //insertnewwifi.showModal();
            });
            
            inizializzaValutazione('#insert-quality',null);
            
            askInsertWifiMode.showModal();
        });
        
        insertnewwifi = document.getElementById('dialog-insertnewwifi'); //get dialog element
        if (!insertnewwifi.showModal){
            insertnewwifi.registerDialog(insertnewwifi);
        }
        
        
        /** close button function **/
        
        ListenersHandler.addListener('closebtn-insertnewwifi', 'click', function(){
            insertnewwifi.close();
            insertPinCustomMode(false);
        });
        
        ListenersHandler.addListener('enterbtn-insertnewwifi', 'click', function(){
            var ssid = $('#insert-nomerete input').val();
            var qualita = $('#insert-quality input').val();
            var necessita_login = $('#insert-login').is(':checked');
            if (necessita_login == false)
                necessita_login = 0;
            if (necessita_login == true)
                necessita_login = 1;
            var restrizioni = $('#insert-restrizioni input').val();
            var altre_informazioni = $('#insert-altreinfo textarea').val();
            var range = $('#insert-range input').val();
            var latitudine, longitudine;
            if(mutex_new_pin == 0){
                latitudine = pos.lat;
                longitudine = pos.lng;
            }
            if(mutex_new_pin == 1){
                latitudine = new_pin_position.lat();
                longitudine = new_pin_position.lng();
            }
            console.debug(ssid+","+qualita+","+latitudine+","+longitudine+","+necessita_login+","+restrizioni+","+altre_informazioni+","+range);
            inseriscipin(ssid,qualita,latitudine,longitudine,necessita_login,restrizioni,altre_informazioni,range,function(status_ok, data){
                console.debug(JSON.stringify(data));
                if(status_ok){
                    showSnackbar({message: 'Rete Wi-Fi aggiunta correttamente.'});
                    insertPinCustomMode(false);
                    insertnewwifi.close();
                    forceRefresh=true;
                }else{
                    if(strcmp(data, 'ERROR_SSID')==0){
                        $('#insert-nomerete-error').show();
                        $('#insert-input-error').html('Campo obbligatorio non compilato.');
                        $('#insert-input-error').show();
                    }else if(strcmp(data, 'ERROR_QUALITY')==0){
                        $('#insert-quality').toggleClass(".invalid");
                        $('#insert-input-error').html('Campo obbligatorio non compilato.');
                        $('#insert-input-error').show();
                    }else if(strcmp(data, 'ERROR_INVALID_DATA')==0){
                        $('#insert-input-error').html('Dati invalidi.');
                        $('#insert-input-error').show();
                    }else if(strcmp(data, 'ERROR_DB')==0){
                        showErrorDB('#dialog-insertnewwifi', 'ERROR_DB');
                    }
                }
                
            });
            
        });
    }
    
    function setExitModal(){
        ListenersHandler.addListener('exitSystem', 'click', function(){
            exitDialog = document.getElementById('dialog-exit');
            if (!exitDialog.showModal){
                dialogPolyfill.registerDialog(exitDialog);
            }
            
            
            ListenersHandler.addListener('closebtn-exit', 'click', function(){
                exitDialog.close();
            });
            
            ListenersHandler.addListener('enterbtn-exit', 'click', function(){
                signOut(function(status_ok,data){
                    if(status_ok){
                        try{
                            setTimeout(function(){destroyHome();}, 1000);
                        }catch(err){
                            window.location = window.location.href;
                        }
                    }
                });
            });
            
            exitDialog.showModal();
        });
        
        
    }
    
    function setEditPasswordBisModal(){
        ListenersHandler.addListener('enterbtn-editpassword', 'click', function(){
            editPasswordBis = document.getElementById('dialog-editPasswordBis');
            if (!editPasswordBis.showModal){
                dialogPolyfill.registerDialog(recover);
            }
            
            /** close button function **/
            ListenersHandler.addListener('closebtn-editPasswordBis', 'click', function(){
                editPasswordBis.close();
            });
            
            //TODO controllo campi
            editpassword.close();
            editPasswordBis.showModal();
        })
    }
    
    function setDeleteAccountModal(){
        ListenersHandler.addListener('show-deleteaccount', 'click', function(){
            deleteaccount = document.getElementById('dialog-deleteaccount'); //get dialog element
            
            if (!deleteaccount.showModal){
                dialogPolyfill.registerDialog(deleteaccount);
            }
            ListenersHandler.addListener('closebtn-deleteaccount', 'click', function(){
                deleteaccount.close();
            });
            ListenersHandler.addListener('enterbtn-deleteaccount','click', function(){
                var password= $('#in-da-password').val();
                
                deleteAccount(password, function(status_ok,data){
                    if(status_ok){
                        deleteaccountBis = document.getElementById('dialog-deleteaccountBis');
                        if (!deleteaccountBis.showModal){
                            dialogPolyfill.registerDialog(recover);
                        }
                        
                        /** close button function **/
                        ListenersHandler.addListener('closebtn-deleteaccountBis', 'click', function(){
                            deleteaccountBis.close();
                        });
                        
                        //TODO controllo campi
                        deleteaccount.close();
                        deleteaccountBis.showModal();
                    }else{
                        $('#da-password').removeClass("is-invalid");
                        $('#da-password-error').html("");
                        console.log(JSON.stringify(data));
                        
                        if(strcmp(data,'ERROR_SESSION')==0){
                            showSnackbar({message: 'Errore nella generazione della sessione.'});
                        }else if(strcmp(data,"ERROR_PASSWORD")==0){
                            $('#da-password').addClass('is-invalid');
                            $('#da-password-error').html("Password non valida.");
                        }else if(strcmp(data,"EMPTY_FIELD")==0){
                            $('#da-password').addClass('is-invalid');
                            $('#da-password-error').html("Campo non compilato.");
                        }
                    }
                });
            });
            deleteaccount.showModal();
        });
    }
    
    
    function setMyWifiModal(){
        ListenersHandler.addListener('show-mywifi', 'click', function(){
            mywifi = document.getElementById('dialog-mywifi'); //get dialog element
            
            
            get_user_wifi_list(function(status_ok, data){
                if(status_ok){
                    listwifi = document.getElementById('listWifi');
                    list_dom_networks='';
                    domIDgen=10000+Math.floor((Math.random() * 2000) + 1);
                    array_my_networks=[];
                    $.each(data, function(i, network){
                        array_my_networks.push(network.id);
                        i+=domIDgen;
                        list_dom_networks+='<li id="nomeRete'+i+'" class="mdl-list__item mdl-list__item--three-line">\n'+
                        ' <span class="mdl-list__item-primary-content">\n'+
                        '<i class="material-icons mdl-list__item-avatar">wifi</i>\n'+
                        '<span>'+network.ssid+'</span>\n'+
                        '<span id="span_zone_'+i+'" class="mdl-list__item-text-body">\n'+
                        ' Caricamento...\n'+
                        '</span>\n'+
                        ' </span>\n'+
                        '<span class="mdl-list__item-secondary-content">\n'+
                        ' <!-- Right aligned menu below button -->\n'+
                        ' <button id="'+i+'"\n'+
                        ' class="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect">\n'+
                        ' <i class="material-icons">more_vert</i>\n'+
                        ' </button>\n'+
                        ' <div class="mdl-tooltip mdl-tooltip--large" for="'+i+'"> <!-- Tooltip -->\n'+
                        ' Altro\n'+
                        '</div>\n'+
                        '\n'+
                        '<ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"\n'+
                        ' for="'+i+'">\n'+
                        '<li id="button_modifica_rete_'+network.id+'" class="mdl-menu__item show-editwifi">Modifica</li>\n'+
                        '<li id="button_elimina_rete_'+network.id+'" class="mdl-menu__item show-deletewifi">Elimina</li>\n'+
                        ' </ul>\n'+
                        ' </span>\n'+
                        ' </li>\n';
                        getLocationFromLatLng(network.latitudine, network.longitudine, function(data2){
                            if(data2!=null){
                                data2 = data2.results[0].formatted_address;
                                $('#span_zone_'+i).text(data2);
                            }
                        });
                    });
                    if(list_dom_networks == ''){
                        list_dom_networks = '<li>Non hai creato ancora nessuna rete.</li>';
                        MaterialHelper.setInnerHTML(listwifi, list_dom_networks);
                    }else{
                        MaterialHelper.setInnerHTML(listwifi, list_dom_networks);
                        for(i=0;i<array_my_networks.length;i++){
                            console.log("i="+array_my_networks[i]);
                            ListenersHandler.addListener('button_modifica_rete_'+array_my_networks[i], 'click', function(e){
                                var elem_id= e.target.id;
                                var elem_arr=elem_id.split("_");
                                var rete_id = elem_arr[3];
                                console.log("rete_id="+rete_id);
                                
                                getPinInfo(rete_id,function(data){
                                    console.log({id: rete_id, restrizioni: data.restrizioni, range_wifi: data.range_wifi, altre_informazioni: data.altre_informazioni});

                                    mywifi.close();
                                    inizializzaModificaRete({id: rete_id, restrizioni: data.restrizioni, range_wifi: data.range_wifi, altre_informazioni: data.altre_informazioni}).showModal();  
                                });                          
                            });
                            ListenersHandler.addListener('button_elimina_rete_'+array_my_networks[i], 'click', function(e){
                                var elem_id= e.target.id;
                                var elem_arr=elem_id.split("_");
                                var rete_id = elem_arr[3];
                                console.log("rete_id="+rete_id);
                                
                                getPinInfo(rete_id,function(data){
                                    
                                    mywifi.close();
                                    inizializzaCancellaRete({id: rete_id, ssid: data.ssid}).showModal();  
                                });
                            });
                        }
                    }
                    
                 
                }
            });
            
            
            if(!mywifi.showModal){
                dialogPolyfill.registerDialog(mywifi);
            }
            
            /** close button function **/
            ListenersHandler.addListener('closebtn-mywifi', 'click', function(){
                mywifi.close();
            });
            
            mywifi.showModal();
            
        /*ListenersHandler.addListener('','click', function(){
             inizializzaModificaRete();   
        });*/
            
            
        }); //./document
        
    } //./setMyWifiModal
    
    function setMyNotificationModal(){
        ListenersHandler.addListener('show-mynotification', 'click', function(){
            showMyNotificationModal = document.getElementById('dialog-mynotification'); //get dialog element
            if(!showMyNotificationModal.showModal){
                showMyNotificationModal.registerDialog(showMyNotificationModal);
            }
            
            
            ListenersHandler.addListener('closebtn-mynotification', 'click', function(){
                showMyNotificationModal.close();
            });
            showMyNotificationModal.showModal();
            
            notifications(function(status_ok, data){
                if(status_ok){
                    listnotifications = document.getElementById('listNotifiche');
                    list_dom_notif='';
                    domIDgen=10000+Math.floor((Math.random() * 2000) + 1);
                    $.each(data, function(i, notification){
                        i+=domIDgen;
                        list_dom_notif+='<li id="notifica'+i+'" class="mdl-list__item mdl-list__item--three-line">\n'+
                        ' <span class="mdl-list__item-primary-content">\n'+
                        ' <a class="toHide" id="ttt'+i+'" href="#">\n'+
                        '  <i class="material-icons mdl-list__item-avatar">notifications'+((notification.visualizzato==0) ? '' : '_none')+'</i>\n'+
                        ' <span>La rete \''+notification.ssid+'\' &egrave stata segnalata: \''+translateReport(notification.tipo)+'\'.</span>\n'+
                        ' <span id="notifica_rete_'+i+'" hidden>'+notification.rete_wifi+'</span>'+
                        ' <span id="notifica_tipo_'+i+'" hidden>'+notification.tipo+'</span>'+
                        ' <span id="notifica_dettagli_'+i+'" hidden>'+notification.dettagli+'</span>'+
                        '</a>\n'+
                        ' <span id="span_details_'+i+'" class="mdl-list__item-text-body" '+((notification.visualizzato==0) ? 'hidden' : '')+'>\n'+
                        ((notification.dettagli!=null) ? 'Dettagli: '+notification.dettagli : 'E\' stata segnalata la rete.')+'\n'+
                        '</span>\n'+
                        ' <div class="mdl-tooltip mdl-tooltip--top mdl-tooltip--large" for="ttt'+i+'">\n'+
                        '  Altro\n'+
                        '</div>\n'+
                        '</span>\n'+
                        '</li>\n';
                    });
                    if(list_dom_notif == '') list_dom_notif = '<li>Nessuna segnalazione effettuata sulle tue reti.</li>';
                    MaterialHelper.setInnerHTML(listnotifications, list_dom_notif);
                    
                    
                    var x = document.getElementsByClassName("toHide");
                    for (i = 0; i < x.length; i++){
                        x[i].addEventListener("click", handleMouseClick, false);
                    }
                }
            });
            
            
            
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

function translateReport(tipo){
    if(tipo==0){
        return "Rete non esistente";
    }else if(tipo==1){
        return "Range errato";
    }else if(tipo==2){
        return "Restrizioni incoerenti";
    }else if(tipo==3){
        return "Login necessario";
    }else{
        return "<Errore>";
    }
}

function handleMouseClick(e){
    //TODO Aggiornare il contatore notifiche e i 2 badge
    var clicked_element = e.target;
    
    if(clicked_element.nodeName == "I")
    clicked_element.innerHTML = "notifications_none";
    else if(clicked_element.nodeName == "SPAN")
    clicked_element.previousElementSibling.innerHTML = "notifications_none";
    
    clicked_element = clicked_element.parentNode.nextElementSibling;
    
    i=clicked_element.id.split("_")[2];
    
    notifications_watch($('#notifica_rete_'+i).text(), $('#notifica_tipo_'+i).text(), $('#notifica_dettagli_'+i).text(), null);
    
    if(clicked_element.hasAttribute("hidden")){
        clicked_element.removeAttribute("hidden");
    }else{
        clicked_element.setAttribute("hidden", "true");
    }
    
}

function insertPinCustomMode(if_enabled){
    try{
        let lazy_checker=func_handler_maps;
    }catch(e){
        if(e.name == "ReferenceError") func_handler_maps=null;
    }
    
    if(if_enabled){
        if(func_handler_maps==null){
            func_handler_maps=google.maps.event.addListener(map, 'click', function(event){
                if(mod_insert_pin){
                    if(mutex_new_pin == 0){
                        mutex_new_pin = 1;
                        addMarker(event.latLng, 'Click Generated Marker', map);
                    }else{
                        showSnackbar({message: 'Completa prima l\'inserimento di un pin.'});
                    }
                }
            });
        }
        mod_insert_pin=true;
    }else{
        if(func_handler_maps!=null){
            google.maps.event.removeListener(func_handler_maps);
            func_handler_maps=null;
        }
        
        mutex_new_pin=0;
        mod_insert_pin=false;
        if(new_marker!=null) new_marker.setMap(null);
    }
}


function inizializzaValutazione(stringselector,valoreiniziale){
    if(!valoreiniziale){valoreiniziale = 0;}
    var valutazione = {
        star: 5,
        selector: stringselector,
        htmlObj: $(stringselector +' .star-val button'),
        valoreiniziale: valoreiniziale,
        input: $(stringselector + ' input')
    }
    
    valutazione.setValutazione = function(val){
        if( !val ){ val = this.valoreiniziale;}
        console.log($(this.input));
        $(this.input).val(val);
        $(this.selector).attr( 'old' , val );
        $.each(this.htmlObj, function(i, star){
            
            if(i < val ){
                $(star).addClass('mdl-button--colored');
            }else{
                $(star).removeClass('mdl-button--colored');
            }//./if
            
        });//.each
        
    }//./setValutazione
    
    valutazione.setOnclick = function(){
        'use strict';
        var stars = this.htmlObj;
        var input = $(this.input);
        var selector = this.selector;
        var newval;
        $.each(stars, function(i,star){
            $(star).off('click'); // Removes previous listeners on stars if user opened another overlay
            if(current_pin_can_rank || current_pin_can_only_select){
                $(star).click(function(event){
                    console.debug("Selected star: "+(i+1));
                    if(!current_pin_can_only_select) vota(i+1);
                    newval = event.target.id;
                    for(var j=0; j < 5; j++){
                        if(j<=i){
                            $(stars[j]).addClass('mdl-button--colored');
                        }else{
                            $(stars[j]).removeClass('mdl-button--colored');
                        } //./if
                        
                    }//./for
                    $(selector).attr( 'old' , $(input).val() );
                    $(input).val(newval);
                    
                });//.click function
            }
        });//./each
        
    }//./setOnclick
    
    valutazione.setValutazione();
    valutazione.setOnclick();
    
}

function vota(voto){
    pinranking(current_pin_id, voto, function(status_ok, data){
        if(status_ok){
            showSnackbar({message: 'Valutazione effettuata con successo.'});
        }else{
            if(strcmp(data,"ERROR_SESSION_NOT_FOUND")==0){
                showSnackbar({message: 'Errore: devi effettuare l\'accesso.'});
            }else if(strcmp(data,"ERROR_RANKING")==0){
                showSnackbar({message: 'Errore nel ranking.'});
            }else if(strcmp(data,"ERROR_RANKING_ALREADY_DONE")==0){
                showSnackbar({message: 'Errore: hai già valutato questa rete.'});
            }else if(strcmp(data,"ERROR_DB")==0){
                showSnackbar({message: 'ERROR_DB'});
            }else if(strcmp(data,"ERROR_IS_OWNER")==0){
                showSnackbar({message: 'Errore: non sei il proprietario di questa rete!'});
            }
        }
    });
}

function showErrorDB(modale, codiceerrore){
    $(modale + ' .mdl-dialog__title').html('<h4 class="mdl-dialog__title"><i id="mdl-title-icon" class="material-icons">error</i>Ops!</h4>');
    $(modale + ' .mdl-dialog__sub').text('Si è verificato un errore');
    $(modale + ' .mdl-dialog__content').html("<p>Impossibile completare la richiesta. Riprova</p>");
    $(modale + ' .mdl-dialog__actions').html('<button onclick="location.reload();" type="button" class="mdl-button mdl-js-button mdl-js-ripple-effect dialog-close">Ricarica la pagina</button>');
    console.log('Impossibile completare la richiesta. Errore: '+codiceerrore);
}


function inizializzaSegnalazione(){
    showReport = document.getElementById('dialog-report'); //get dialog element
    if (!showReport.showModal){
        showReport.registerDialog(showReport);
    }
    ListenersHandler.addListener('closebtn-report','click', function(){
        showReport.close();
    });
    ListenersHandler.addListener('enterbtn-report','click', function(){
        if(document.getElementById("option-1").checked){
            showReport.close();
            rete = jQuery.parseJSON($('#dialog-report').attr('data'));
            $('#dialog-report-inexistent .mdl-dialog__sub').text('Rete: '+ rete.ssid);
            $('#enterbtn-inexistent').attr('data',rete.id);
            showInexistent.showModal();
        }
        if(document.getElementById("option-2").checked){
            showReport.close();
            rete = jQuery.parseJSON($('#dialog-report').attr('data'));
            $('#dialog-report-range .mdl-dialog__sub').text('Rete: '+ rete.ssid);
            $('#enterbtn-report-range').attr('data',rete.id);
            showRangeErrato.showModal();
        }
        if(document.getElementById("option-3").checked){
            showReport.close();
            rete = jQuery.parseJSON($('#dialog-report').attr('data'));
            $('#dialog-report-restriction .mdl-dialog__sub').text('Rete: '+ rete.ssid);
            $('#enterbtn-report-restriction').attr('data',rete.id);
            showRestrizioni.showModal();
        }
        if(document.getElementById("option-4").checked){
            showReport.close();
            rete = jQuery.parseJSON($('#dialog-report').attr('data'));
            $('#dialog-report-login .mdl-dialog__sub').text('Rete: '+ rete.ssid);
            $('#enterbtn-report-login').attr('data',rete.id);
            showLoginNecessario.showModal();
        }
    });
    
    showInexistent = document.getElementById('dialog-report-inexistent'); //get dialog element
    
    if(!showInexistent.showModal){
        showInexistent.registerDialog(showInexistent);
    }
    ListenersHandler.addListener('closebtn-inexistent','click', function(){
        showInexistent.close();
        showReport.showModal();
    });
    ListenersHandler.addListener('enterbtn-inexistent','click', function(){
        segnala(jQuery.parseJSON($('#dialog-report').attr('data')).id, 0, '', function(status_ok, data){
            if(status_ok){
                showSnackbar({message: 'Segnalazione effettuata con successo.'});
            }else{
                showSnackbar({message: 'Errore: segnalazione già effettuata per questa rete.'});
            }
        });
        showInexistent.close();
    });
    
    showLoginNecessario = document.getElementById('dialog-report-login'); //get dialog element
    if(!showLoginNecessario.showModal){
        showLoginNecessario.registerDialog(showLoginNecessario);
    }
    ListenersHandler.addListener('closebtn-report-login','click', function(){
        showLoginNecessario.close();
        showReport.showModal();
    });
    ListenersHandler.addListener('enterbtn-report-login','click', function(){
        segnala(jQuery.parseJSON($('#dialog-report').attr('data')).id, 3, '', function (status_ok, data){
            if(status_ok){
                showSnackbar({message: 'Segnalazione effettuata con successo.'});
            }else{
                showSnackbar({message: 'Errore: segnalazione già effettuata per questa rete.'});
            }
        });
        
        showLoginNecessario.close();
    });
    
    showRangeErrato = document.getElementById('dialog-report-range'); //get dialog element
    if(!showRangeErrato.showModal){
        showRangeErrato.registerDialog(showRangeErrato);
    }
    ListenersHandler.addListener('closebtn-report-range','click', function(){
        showRangeErrato.close();
        showReport.showModal();
    });
    ListenersHandler.addListener('enterbtn-report-range','click', function(){
        segnala(jQuery.parseJSON($('#dialog-report').attr('data')).id, 1, $('#re-range textarea').val(), function(status_ok, data){
            if(status_ok){
                showSnackbar({message: 'Segnalazione effettuata con successo.'});
            }else{
                showSnackbar({message: 'Errore: segnalazione già effettuata per questa rete.'});
            }
        });
        
        showRangeErrato.close();
    });
    
    showRestrizioni = document.getElementById('dialog-report-restriction'); //get dialog element
    if(!showRestrizioni.showModal){
        showRestrizioni.registerDialog(showRestrizioni);
    }
    ListenersHandler.addListener('closebtn-report-restriction','click', function(){
        showRestrizioni.close();
        showReport.showModal();
    });
    ListenersHandler.addListener('enterbtn-report-restriction','click', function(){
        segnala(jQuery.parseJSON($('#dialog-report').attr('data')).id, 2, $('#re-restriction textarea').val(), function(status_ok, data){
            if(status_ok){
                showSnackbar({message: 'Segnalazione effettuata con successo.'});
            }else{
                showSnackbar({message: 'Errore: segnalazione già effettuata per questa rete.'});
            }
        });
        showRestrizioni.close();
    });
    
    return showReport;
}

function inizializzaCancellaRete(json_data){
    deletewifi = document.getElementById('dialog-deletewifi'); //get dialog element
    if(!deletewifi.showModal){
        dialogPolyfill.registerDialog(deletewifi);
    }
    var rete = json_data;
    //console.log($('#toshow span').text());
    $('#dialog-deletewifi .mdl-dialog__content p').text(rete.ssid);
    ListenersHandler.addListener('closebtn-deletewifi','click', function(){
        deletewifi.close();
    });
    ListenersHandler.addListener('enterbtn-deletewifi','click', function(){
        deletepin(rete.id,function(status_ok, data){
            if(status_ok){
                showSnackbar({message: 'Rete WiFi cancellata con successo.'});
                deletewifi.close();
            }else{
                if(strcmp(data,'ERROR_SESSION_NOT_FOUND')==0){
                showSnackbar({message: 'Errore: sessione non trovata.'});
                }else if(strcmp(data,'ERROR_DB')==0){
                showSnackbar({message: 'Errore: problema del database.'});
                }else if(strcmp(data,'ERROR_IS_NOT_OWNER')==0){
                showSnackbar({message: 'Errore: non sei il proprietario della rete.'});
                }
            }
        });
    });
    
    return deletewifi;
}

function inizializzaModificaRete(json_data){
    editwifidialog = document.getElementById('dialog-editwifi'); //get dialog element
    if(!editwifidialog.showModal){
        dialogPolyfill.registerDialog(editwifidialog);
    }
    var rete = json_data;//jQuery.parseJSON($('#dialog-editwifi').attr('data'));
    $('#subtitleNomeEditRete').text(rete.ssid);
    
    $('#newRestrizioni').addClass('is-dirty');
    $('#newRestrizioni input').val(rete.restrizioni);
    
    $('#newRange').addClass('is-dirty');
    $('#newRange input').val(rete.range_wifi);
    
    $('#newInfo').addClass('is-dirty');
    $('#newInfo input').val(rete.altre_informazioni);
    
    ListenersHandler.addListener('closebtn-editwifi','click', function(){
        editwifidialog.close();
    });
    ListenersHandler.addListener('enterbtn-editwifi','click', function(){
        editpin(rete.id,$('#newRestrizioni input').val(),$('#newRange input').val(),$('#newInfo input').val(),function(status_ok, data){
            if(status_ok){
                showSnackbar({message: 'Modifica effettuata con successo.'});
                editwifidialog.close();
            }else{
                if(strcmp(data,'ERROR_SESSION_NOT_FOUND')==0){
                showSnackbar({message: 'Errore: sessione non trovata.'});
                }else if(strcmp(data,'ERROR_RANGE')==0){
                showSnackbar({message: 'Errore: range non valido.'});
                }else if(strcmp(data,'ERROR_DB')==0){
                showSnackbar({message: 'Errore: problema del database.'});
                }else if(strcmp(data,'ERROR_IS_NOT_OWNER')==0){
                showSnackbar({message: 'Errore: non sei il proprietario della rete.'});
                }
            }
        });
        
    });
    
    return editwifidialog;
}
/*
function inizializzaCancellaAccount(){
deleteaccount = document.getElementById('dialog-deleteaccount'); //get dialog element

if (!deleteaccount.showModal){
dialogPolyfill.registerDialog(deleteaccount);
}
ListenersHandler.addListener('closebtn-deleteaccount', 'click', function(){
deleteaccount.close();
});
ListenersHandler.addListener('enterbtn-deleteaccount','click', function(){
var password= $('#in-da-password').val();

deleteAccount(password, function(status_ok,data){
if(status_ok){
setDeleteAccountBisModal();
}else{
$('#da-password').removeClass("is-invalid");
$('#da-password-error').html("");
console.log(JSON.stringify(data));

if(strcmp(data,'ERROR_SESSION')==0){
showSnackbar({message: 'Errore nella generazione della sessione.'});
}else if(strcmp(data,"ERROR_PASSWORD")==0){
$('#da-password').addClass('is-invalid');
$('#da-password-error').html("Password non valida.");
}else if(strcmp(data,"EMPTY_FIELD")==0){
$('#da-password').addClass('is-invalid');
$('#da-password-error').html("Campo non compilato.");
}
}
});
console.log(getUser());
});
return deleteaccount;

}
*/
function inizializzaModificaPassword(){
    editpassword = document.getElementById('dialog-editpassword'); //get dialog element
    if(!editpassword.showModal){
        dialogPolyfill.registerDialog(editpassword);
    }
    ListenersHandler.addListener('closebtn-editpassword','click', function(){
        editpassword.close();
    });
    ListenersHandler.addListener('enterbtn-editpassword','click', function(){
        console.log($('#in-ep-password input').val()+";"+$('#in-ep-newpassword input').val()+";"+$('#in-ep-confermapassword input').val());
        changePassword($('#in-ep-password input').val(),$('#in-ep-newpassword input').val(),$('#in-ep-confermapassword input').val(), function(status_ok, data){
            console.log(JSON.stringify(data));
            if(status_ok){
                editPasswordBis = document.getElementById('dialog-editPasswordBis');
                if (!editPasswordBis.showModal){
                    dialogPolyfill.registerDialog(recover);
                }
                ListenersHandler.addListener('closebtn-editPasswordBis', 'click', function(){
                    editPasswordBis.close();
                });
                
                //TODO controllo campi
                editpassword.close();
                editPasswordBis.showModal();
            }else{
                    $('#in-ep-password').removeClass("is-invalid");
                    $('#in-ep-newpassword').removeClass("is-invalid");
                    $('#in-ep-confermapassword').removeClass("is-invalid");
                    
                    $('#in-ep-password-error').html("");
                    $('#in-ep-newpassword-error').html("");
                    $('#in-ep-confermapassword-error').html("");

                    if((strcmp(data,'CAMPI_PASSWORD_NUOVAPASSWORD_CONFERMANUOVAPASSWORD_NON_COMPILATI'))==0){
                        $('#in-ep-password').addClass("is-invalid");
                        $('#in-ep-password-error').html("Campo non compilato.");

                        $('#in-ep-newpassword').addClass("is-invalid");
                        $('#in-ep-newpassword-error').html("Campo non compilato.");
                        
                        $('#in-ep-confermapassword').addClass("is-invalid");
                        $('#in-ep-confermapassword-error').html("Campo non compilato.");
                    }else if((strcmp(data,"CAMPI_PASSWORD_NUOVAPASSWORD_NON_COMPILATI"))==0){
                        $('#in-ep-password').addClass("is-invalid");
                        $('#in-ep-password-error').html("Campo non compilato.");
                        
                        $('#in-ep-newpassword').addClass("is-invalid");
                        $('#in-ep-newpassword-error').html("Campo non compilato.");
                        
                    }else if((strcmp(data,"CAMPI_PASSWORD_CONFERMANUOVAPASSWORD_NON_COMPILATI"))==0){
                        $('#in-ep-password').addClass("is-invalid");
                        $('#in-ep-password-error').html("Campo non compilato.");
                        
                        $('#in-ep-confermapassword').addClass("is-invalid");
                        $('#in-ep-confermapassword-error').html("Campo non compilato.");
                        
                    }else if((strcmp(data,"CAMPI_NUOVAPASSWORD_CONFERMANUOVAPASSWORD_NON_COMPILATI"))==0){
                        $('#in-ep-newpassword').addClass("is-invalid");
                        $('#in-ep-newpassword-error').html("Campo non compilato.");
                        
                        $('#in-ep-confermapassword').addClass("is-invalid");
                        $('#in-ep-confermapassword-error').html("Campo non compilato.");
                        
                    }else if((strcmp(data,"CAMPO_PASSWORD_NON_COMPILATO"))==0){
                        $('#in-ep-password').addClass("is-invalid");
                        $('#in-ep-password-error').html("Campo non compilato.");
                        
                    }else if((strcmp(data,"CAMPO_NUOVAPASSWORD_NON_COMPILATO"))==0){
                        $('#in-ep-newpassword').addClass("is-invalid");
                        $('#in-ep-newpassword-error').html("Campo non compilato.");
                        
                    }else if((strcmp(data,"CAMPO_CONFERMANUOVAPASSWORD_NON_COMPILATO"))==0){
                        $('#in-ep-confermapassword').addClass("is-invalid");
                        $('#in-ep-confermapassword-error').html("Campo non compilato.");
                        
                    }else if((strcmp(data,"ERRORE_NUOVA_PASSWORD"))==0){
                        $('#in-ep-newpassword').addClass("is-invalid");
                        $('#in-ep-newpassword-error').html("Password non valida.");
                        
                    }else if((strcmp(data,"ERRORE_LUNGHEZZA_NUOVA_PASSWORD"))==0){
                        $('#in-ep-newpassword').addClass("is-invalid");
                        $('#in-ep-newpassword-error').html("Lunghezza password non valida.");
                        
                    }else if((strcmp(data,"CAMPI_NON_COINCIDENTI"))==0){
                        $('#in-ep-newpassword').addClass("is-invalid");
                        $('#in-ep-newpassword-error').html("Campi non coincidenti.");
                        
                        $('#in-ep-confermapassword').addClass("is-invalid");
                        $('#in-ep-confermapassword-error').html("Campi non coincidenti.");
                        
                    }else if((strcmp(data,"ERROR_SESSION"))==0){
                        showSnackbar({message: "Errore di sessione"});
                        
                    }else if((strcmp(data,"ERROR_OLD_PASSWORD"))==0){
                        console.log("lol");
                        $('#in-ep-password').addClass("is-invalid");
                        $('#in-ep-password-error').html("Password non valida.");
                        
                    }else if((strcmp(data,"ERROR_NOT_FOUND"))==0){
                        showSnackbar({message: "Utente non trovato (potrebbe essere stato eliminato)."});
                        
                    }else if((strcmp(data,"ERROR_PASSWORD_LENGTH"))==0){
                        showSnackbar({message: "Lunghezza password non valida."});
                        
                    }else if((strcmp(data,"ERROR_DB"))==0){
                        showErrorDB('#dialog-signup', 'ERROR_DB');
                        
                    }
            }
        });
    });
    
    return editpassword;
}

function getLocationFromLatLng(lat,lng, onsuccess){
    $.get({
        url: 'http://maps.googleapis.com/maps/api/geocode/json?',
        data: 'latlng='+lat+','+lng,
        success: function(data){
            onsuccess(data);
        }
    });
}

/**
function setDeleteWifi(){
var v = document.getElementById('closebtn-deletewifi');
v.addEventListener('click', function(){
deletewifi.close();
mywifi.showModal();
});

var vv = document.getElementById('enterbtn-deletewifi');
vv.addEventListener('click', function(){
deletewifi.close();
'use strict';
var snackbarContainer = document.querySelector('#sb-confirm-operation');
var data;
//TODO: send request TRUE o FALSE, delete wifi, delete pin on maps
//Se tutto va bene allora
//Snackbar
data = {message: 'Rete Wi-Fi eliminata con successo.'};
snackbarContainer.MaterialSnackbar.showSnackbar(data);
//refresh wifi list
document.getElementById(idToDelete).parentNode.removeChild(document.getElementById(idToDelete));
mywifi.showModal();
//Altrimenti
//data = {message: 'Rete Wi-Fi non eliminata.'};
//snackbarContainer.MaterialSnackbar.showSnackbar(data);

});

}


} //./setDeleteWifi **/
