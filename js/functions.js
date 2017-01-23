// js nel quale inserire funzioni di utilizzo generale

// funzione per comparare due stringhe, equals non è utilizzabile in js
function strcmp ( str1, str2 ) { 
    return ( ( str1 == str2 ) ? 0 : ( ( str1 > str2 ) ? 1 : -1 ) );
}

var ListenersHandler = new (function(){
    var evt_list={};
    var n=0;
    var debug=true;
            
    this.addListener = function(element, event, func_handler){
        this.removeListener(element, event);
        document.getElementById(element).addEventListener(event, func_handler);
        evt_list[n]={element: element, event: event, handler: func_handler};
        if(debug) console.debug("Element "+element+" has got attached event: "+event);
        n++;
    };
            
    this.removeListener = function(element, event){
        for(var i=0;i<n;i++){
            if(evt_list[i].element==element && evt_list[i].event==event){
                document.getElementById(element).removeEventListener(evt_list[i].event, evt_list[i].handler);
                evt_list[i]={};
                if(debug) console.debug("(!) Element "+element+" has got detached event: "+event);
                break;
            }
        }
    };
})();

var MaterialHelper = new (function(){
    this.setInnerHTML = function(element, new_html){
        $(element).empty().append(new_html);
        componentHandler.upgradeDom();
    };
    
    this.appendInnerHTML = function(element, new_html){
        $(element).append(new_html);
        componentHandler.upgradeDom();
    };
})();


function destroyHome(){
    window.location.href='.';
}