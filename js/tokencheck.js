function tokencheck_reset1(if_redirect){
    
                var tokenvalue= getParameter("token");
                
                if(tokenvalue!=null){
                    $.ajax({
                        type: 'GET',
                        url: 'http://127.0.0.1:8080/user/reset_password/token/'+tokenvalue,
                        success: function(data) {
                          try {
                            var ret = data;
                            if(ret.status==0){
                               if(if_redirect){ //redirect a reimposta_password.html 
                                  window.location.replace(url);
                               } 
                            }else if(ret.status==1){
                                if(!if_redirect){ 
                                                //home
                                }if(strcmp(ret.message,'ERROR_TOKEN')==0){
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

function tokencheck_reset2(if_redirect){
    
                var tokenvalue= getParameter("token");
                
                if(tokenvalue!=null){
                    $.ajax({
                        type: 'GET',
                        url: 'http://127.0.0.1:8080/user/reset_password/token/'+tokenvalue,
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

function tokencheck_registration(if_redirect){
    
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