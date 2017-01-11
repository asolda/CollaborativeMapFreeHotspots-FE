function tokencheck(if_redirect){ //incompleta;relativa al primo tokencheck, in reimpostazione password dopo l'invio della mail
    
                var tokenvalue= getParameter("token");
                var action=getParameter("action");
                if(tokenvalue!=null){
                    $.ajax({
                        type: 'GET',
                        url: 'http://127.0.0.1:8080/token/'+tokenvalue,
                        crossDomain: true,
                        xhrFields: {
                            withCredentials: true
                        },
                        success: function(data) {
                          try {
                            var ret = data;
                            var tmp= '';
                            if(strcmp(action,'RESET_PASSWORD')==0){
                                tmp="reimposta_password";
                            }else if(strcmp(action,'DELETE_USER')==0){
                                tmp="conferma_eliminazione";
                            }    
                            
                            if(ret.status==0){
                               if(if_redirect){ //redirect a reimposta_password.html 
                                  window.location.href='.\\'+tmp;
                               } 
                            }else if(ret.status==1){
                                if(!if_redirect){ 
                                    window.location.href='.\\';
                                                //home
                                }
                                if(strcmp(ret.message,'ERROR_TOKEN')==0){
                                        $('#result').append(ret.message + '</br>');
                                }
                            
                            } 
                          } catch (err) {
                            alert('Errore imprevisto: ' + ret.message);
                          }
                        },
                        error: function(xhr, status, error) {
                          console.log('Error: ' + error.message);
                        }
                      });
                }
    
}

function tokencheck_registration(if_redirect){//incompleta;relativa al tokencheck in registrazione utente
    
                var tokenvalue= getParameter("token");
                
                if(tokenvalue!=null){
                    $.ajax({
                        type: 'GET',
                        url: 'http://127.0.0.1:8080/user/new/do/token/'+tokenvalue,
                        success: function(data) {
                          try {
                            var ret = data;
                            if(ret.status==0){
                               if(if_redirect){ //redirect a reimposta_password.html 
                                    
                               } 
                            }else if(ret.status==1){
                                if(!if_redirect){ 
                                                //home
                                }if(ret.message.equals('ERROR_TOKEN'))
                                        $('#result').append(ret.message + '</br>');
                            }
                            
                            
                          } catch (err) {
                            alert('Errore imprevisto: ' + ret.message);
                          }
                        },
                        error: function(xhr, status, error) {
                          console.log('Error: ' + error.message);
                        }
                      });
                }
    
}

function getParameter(param){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    var value_returned = null;
    for (var i=0: i<vars-lenght;i++) {
        var pair = vars[i].split("=");
         if(pair[0].equals(param)){
                value_returned= pair[1];
                break;
         }
    }
    return value_returned;
    
}