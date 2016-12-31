function confermaRegistrazione() {

  //TODO creare/attivare effettivamente l'account.
 
  document.getElementById("btnEffettuaLogin").addEventListener("click", function(){
       //TODO reindirizzare l'utente alla home page del sito, dove poi si potrà effettuare il login.
  });

}




function confermaEliminazione() {
 document.getElementById("btnConfermaEliminazione").addEventListener("click", function(){

   //TODO Eliminare effettivamente l'account.

   var buttonToDelete = document.getElementById("btnConfermaEliminazione");
   buttonToDelete.parentNode.removeChild(buttonToDelete);

   document.getElementById("text1").innerHTML = "Account eliminato correttamente.";
   document.getElementById("text2").innerHTML = "Tra pochi istanti verrai reindirizzato alla home page del sito.";
 });
}





function reimpostaPassword() {
 document.getElementById("btnReimpostaPassword").addEventListener("click", function(){

   //TODO Reimpostare effettivamente la password.

   var toDelete = document.getElementById("one");
   toDelete.parentNode.removeChild(toDelete);

   toDelete = document.getElementById("two");
   toDelete.parentNode.removeChild(toDelete);

   toDelete = document.getElementById("btnReimpostaPassword");
   toDelete.parentNode.removeChild(toDelete);

   document.getElementById("text1").innerHTML = "Password reimpostata correttamente. Ora puoi effettuare il login.";
 });
}