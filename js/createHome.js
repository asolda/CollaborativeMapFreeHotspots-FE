function createHome() {
	var cookie = getCookie("actoken32");
			if (strcmp(cookie, "") != 0) { // getcookie restituisce il valore del cookie, se esiste, o la stringa vuota, se non esiste; dopodiché, si controlla se tale cookie esiste confrontando il valore restituito con la stringa vuota
				var id_utente = sessionCheck(); // sessioncheck deve restituire l'id dell'utente da passare a createloggedhome o 0 se la sessione non esiste nel DB
				if (id_utente != 0) {
					// SE IL COOKIE E LA SESSIONE ESISTONO E GLI ID CORRISPONDONO
					//Inizializza la home per l'utente loggato
					createLoggedHome(id_utente);
                                        //chiude il menù laterale al click sull'icona <<
                                        document.getElementById("closeDrawer").addEventListener("click", function(){
                                          $( 'div[class^="mdl-layout__obfuscator"]' ).trigger( "click" );
                                        });
				}
				else {
					// SE LA SESSIONE NON ESISTE
					//Inizializza la home per l'utente non loggato
					createNotLoggedHome();
				}
			}
			else {
				//SE IL COOKIE NON ESISTE
				//Inizializza la home per l'utente non loggato
				createNotLoggedHome();
			}
}