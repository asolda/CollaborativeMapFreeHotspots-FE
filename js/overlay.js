var overlay;
      USGSOverlay.prototype = new google.maps.OverlayView();

      /** @constructor */
      function USGSOverlay(bounds, image, map, data) {

        // Initialize all properties.
        this.bounds_ = bounds;
        this.image_ = image;
        this.map_ = map;
        this.data_ = data;
        console.debug(bounds+" creato");
        // Define a property to hold the image's div. We'll
        // actually create this div upon receipt of the onAdd()
        // method so we'll leave it null for now.
        this.div_ = null;

        // Explicitly call setMap on this overlay.
        this.setMap(map);
      }

      /**
       * onAdd is called when the map's panes are ready and the overlay has been
       * added to the map.
       */

function setData(data){
  this.data_ = data;
}
      USGSOverlay.prototype.onAdd = function() {

        // Create the img element and attach it to the div.
        var finestra_dett = document.createElement('div');

        finestra_dett.style.width = '300px';
        finestra_dett.style.height = '400px;';
        finestra_dett.style.cursor = 'pointer';
        finestra_dett.style.position = 'absolute';
        var data = this.data_;
        if(data!= null){
          var necessità_login, restrizioni;
          if(data.necessità_login == 0)
            necessità_login = "No";
          else
            necessità_login = "Si";
            if(data.restrizioni == "")
              restrizioni = "Nessuna";
            else
              restrizioni = data.restrizioni;
        var pindetail =
            "<div class='pin-detail-container'>"+
              "<div class='pin-detail-title'>"+
                "<div id='close-pin-detail'><i class='material-icons'>close</i></div>"+
                "<h4 class='mdl-dialog__title'><i id='mdl-title-icon' class='material-icons'>wifi</i>Dettagli rete</h4>"+
                "<p class='mdl-dialog__sub'>"+data.ssid+"</p>"+
              "</div>"+
              "<div class='pin-detail-info'>"+
                "<div class='pin-detail-star'>"+

                "<ul>"+

                  "<li class='star-val'>"+
                    "<button id='star1' class='mdl-button mdl-js-button mdl-button--icon'><i class='material-icons'>star_rate</i></button>"+
                  "</li>"+

                  "<li class='star-val'>"+
                    "<button id='star2' class='mdl-button mdl-js-button mdl-button--icon star-selected'><i class='material-icons'>star_rate</i></button>"+
                  "</li>"+

                  "<li class='star-val'>"+
                    "<button id='star3' class='mdl-button mdl-js-button mdl-button--icon'><i class='material-icons'>star_rate</i></button>"+
                  "</li>"+

                  "<li class='star-val'>"+
                    "<button id='star4' class='mdl-button mdl-js-button mdl-button--icon'><i class='material-icons'>star_rate</i></button>"+
                  "</li>"+

                  "<li class='star-val'>"+
                    "<button id='star5' class='mdl-button mdl-js-button mdl-button--icon'><i class='material-icons'>star_rate</i></button>"+
                  "</li>"+

                "</ul>"+

                "</div>"+

                "<div style='clear:both;'><p>Restrizioni "+data.restrizioni+"</p>"+
                "<p>Range "+data.range_wifi+"</p>"+
                "<p>Login Necessario"+necessità_login+"</p>"+
                "<p>Altre informazioni"+data.altre_informazioni+"</p></div>"+

              "</div>"+
            "</div>";
}else{
        var pindetail =
            "<div class='pin-detail-container'>"+
              "<div class='pin-detail-title'>"+
                "<div id='close-pin-detail'><i class='material-icons'>close</i></div>"+
                "<h4 class='mdl-dialog__title'><i id='mdl-title-icon' class='material-icons'>wifi</i>Dettagli rete</h4>"+
                "<p class='mdl-dialog__sub'>Rete1</p>"+
              "</div>"+
              "<div class='pin-detail-info'>"+
                "<div class='pin-detail-star'>"+

                "<ul>"+

                  "<li class='star-val'>"+
                    "<button id='star1' class='mdl-button mdl-js-button mdl-button--icon'><i class='material-icons'>star_rate</i></button>"+
                  "</li>"+

                  "<li class='star-val'>"+
                    "<button id='star2' class='mdl-button mdl-js-button mdl-button--icon star-selected'><i class='material-icons'>star_rate</i></button>"+
                  "</li>"+

                  "<li class='star-val'>"+
                    "<button id='star3' class='mdl-button mdl-js-button mdl-button--icon'><i class='material-icons'>star_rate</i></button>"+
                  "</li>"+

                  "<li class='star-val'>"+
                    "<button id='star4' class='mdl-button mdl-js-button mdl-button--icon'><i class='material-icons'>star_rate</i></button>"+
                  "</li>"+

                  "<li class='star-val'>"+
                    "<button id='star5' class='mdl-button mdl-js-button mdl-button--icon'><i class='material-icons'>star_rate</i></button>"+
                  "</li>"+

                "</ul>"+

                "</div>"+

                "<div style='clear:both;'><p>Restrizioni</p>"+
                "<p>Range</p>"+
                "<p>Login Necessario</p>"+
                "<p>Altre informazioni</p></div>"+

              "</div>"+
            "</div>";
}
          finestra_dett.innerHTML= pindetail;

        this.div_ = finestra_dett;

        // Add the element to the "overlayLayer" pane.
        var panes = this.getPanes();
        panes.overlayImage.appendChild(finestra_dett);

        inizializzaValutazione();
      };

      //function to draw the overlay
      USGSOverlay.prototype.draw = function() {

        // We use the south-west and north-east
        // coordinates of the overlay to peg it to the correct position and size.
        // To do this, we need to retrieve the projection from the overlay.
        var overlayProjection = this.getProjection();

        // Retrieve the south-west and north-east coordinates of this overlay
        // in LatLngs and convert them to pixel coordinates.
        // We'll use these coordinates to resize the div.
        var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
        var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

        // Resize the image's div to fit the indicated dimensions.
        var div = this.div_;
        div.style.left = sw.x + 'px';
        div.style.top = ne.y + 'px';
        
      };

      // The onRemove() method will be called automatically from the API if
      // we ever set the overlay's map property to 'null'.
      USGSOverlay.prototype.onRemove = function() {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
      };

      USGSOverlay.prototype.toggle = function() {
        if (this.div_) {
          if (this.div_.style.visibility === 'hidden') {
            this.show();
          } else {
            this.hide();
          }
        }
      };

      USGSOverlay.prototype.toggleDOM = function(data) {
        this.data_ = data;
        if (this.getMap()) {
          console.debug("disabilito");
          // Note: setMap(null) calls OverlayView.onRemove()
          this.setMap(null);
        } else {
                    console.debug("abilito");

          this.setMap(this.map_);
        }
      };

      //inizializza la valutazione e la chiusura dell'overlay
      function inizializzaValutazione(){

        //ajax call for valutation parameter

        //valutazione temporanea
        val = 3;

        //colora le stelle in base alla qualità
        var stars = $('.star-val button'); //seleziona le stelle
        $.each(stars, function(i, star){
          if(i < val){
            $(star).addClass('mdl-button--colored');
          }

          $(star).click(function(){
            for(j=0; j <= 4; j++){
              if(j<=i){
                $(stars[j]).addClass('mdl-button--colored');
              }else{
                $(stars[j]).removeClass('mdl-button--colored');
              }
            }

          })
        });

        $('#close-pin-detail').click(function(){
            overlay.toggleDOM();
        });

      }
