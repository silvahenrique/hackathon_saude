(function () {
var marker = null;
var latlng = null;
var API_KEY = "AIzaSyAefzKRkesd5paJ5myJCrhIp77SU0vDEac";
var location = null;

var travelModes = [{
    descrciption: "Carro",
    mode: "DRIVING"
  }, {
    descrciption: "Bicicleta",
    mode: "BICYCLING"
  }, {
    descrciption: "Transport Púbico",
    mode: "TRANSIT"
  }, {
    descrciption: "A Pé",
    mode: "WALKING"
  }
];

var mode = document.getElementById("modo");

travelModes.forEach(function(element) {
  mode.innerHTML += "<option value="+ element.mode +">" + element.descrciption + "</option>"
});

function exibirLocalizacaoUsuario(mapa, zoom) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (posicao) {
      latlng = {
        lat: posicao.coords.latitude,
        lng: posicao.coords.longitude
      }

      var marker = new google.maps.Marker({
        position: latlng,
        map: mapa
      });

      mapa.setCenter(latlng);
      mapa.setZoom(zoom);
    }
    //,
    //
    // function () {
    //   // LocalizacaoErro(true);
    // }
  );
   } else {
     LocalizacaoErro(false);
   }
}

function LocalizacaoErro(temGeocalizacao) {
  temGeocalizacao ? alert("Tem") : alert("Não");
}

function localizarEndereco(idEntradaTexto, idObjetoClique, mapa, zoom) {
  document.getElementById(idObjetoClique).addEventListener("click", function () {
    var geocodificador = new google.maps.Geocoder();
    var endereco = document.getElementById(idEntradaTexto).value;

    geocodificador.geocode({ "address": endereco }, function (resultados, estado) {
      if (estado == google.maps.GeocoderStatus.OK) {
        var local = resultados[0].geometry.location;

        mapa.setCenter(local);

        var marker = new google.maps.Marker({
          map: mapa,
          position: local
        });

        mapa.setZoom(zoom);
        mapa.panTo(local);
      } else {
        alert("Erro");
      }
    });
  });
}

function appMap() {
  return new google.maps.Map(document.getElementById("mapa"), {
    center: { lat: -23.533970, lng: -46.628870 },
    zoom: 8,
    panControl: true,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.LARGE,
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    overviewMapControl: true,
    rotateControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{
      featureType: 'poi',
      elementType: 'label.text',
      stylers: [{
        visibility: 'off'
      }]
    }, {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{
        visibility: 'on'
      }]
    }]


  });
  }


function generateRoute(end) {
  mapa = appMap();

  var start = latlng;
  var mode = document.getElementById('modo').value;

  directionsDisplay.setMap(mapa);

  var request = {
    origin: start,
    destination: end,
    travelMode: mode
  };

  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
  });
}

var mapa = appMap();

exibirLocalizacaoUsuario(mapa, 14);
// localizarEndereco("origem", "btnIr", mapa, 14);

var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();

// mode.addEventListener("change", generateRoute);
// document.getElementById("btnRota").addEventListener("click", generateRoute);

var geocoder = new google.maps.Geocoder();

var marker = new google.maps.Marker({
  // position: { lat: elemento.latitude, lng: elemento.longitude },
  map: mapa,
  title: 'UBS'
});

// Just repeting my self
$("#textoEndereco").autocomplete({
  source: function (request, response) {
    geocoder.geocode({ 'address': request.term + ', Brasil', 'region': 'BR' }, function (results, status) {

    response($.map(results, function (item) {
      return {
        label: item.formatted_address,
        value: item.formatted_address,
        latitude: item.geometry.location.lat(),
        longitude: item.geometry.location.lng()
      }
    }));
  })
},
select: function (event, ui) {
  var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
  marker.setPosition(location);
  mapa.setCenter(location);
  mapa.setZoom(16);
}});

$("#destino").autocomplete({
  source: function (request, response) {
    geocoder.geocode({ 'address': request.term + ', Brasil', 'region': 'BR' }, function (results, status) {

    response($.map(results, function (item) {
      return {
        label: item.formatted_address,
        value: item.formatted_address,
        latitude: item.geometry.location.lat(),
        longitude: item.geometry.location.lng()
      }
    }));
  })
},
select: function (event, ui) {
  console.log(ui)
  var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
  marker.setPosition(location);
  mapa.setCenter(location);
  mapa.setZoom(16);
}});

  var btn = $("#btnEnviar").on("click", function() {
    var endereco =  document.getElementById("textoEndereco").value;
    var textoAjuda = document.getElementById("textoAjuda").value;

    obj = {
      speakText: textoAjuda,
      enderecoPaciente: endereco
    };

    $.ajax({
      type : "POST",
      contentType : "application/json",
      url : "http://3987b24c.ngrok.io/projectnavi/message",
      dataType : "json",
      timeout : 100000,
      data : JSON.stringify(obj),

      success : function(data) {
        console.log(JSON.stringify(data));

        // {"emergencia":"N","agendado":"S","output":"","enderecos":[{"endereco":"R. DR JOVIANO PACHECO AGUIRRE, 255, CAMPO LIMPO","latitude":"-23.634146","longitude":"-46.776016"}]}

        ///

        var markers = [];
        var end = null;

        data.enderecos.forEach((elemento) => {
          var infowindow = new google.maps.InfoWindow({
            content: `
              <p><strong>ENDEREÇO: </strong>${elemento.endereco}</p>
            `
          });

          // content: `
          //   <p><strong>ENDEREÇO: </strong>${elemento.endereco}</p>
          //   <p><strong>TELEFONE: </strong>${elemento.telefone}</p>
          //   <p><strong>HORÁRIO DE FUNCIONAMENTO: </strong>${elemento.horarioFuncionamento}</p>
          // `

          end = { lat: parseFloat(elemento.latitude), lng: parseFloat(elemento.longitude) };

          var marker = new google.maps.Marker({
            position: end,
            map: mapa,
            title: 'UBS'
          });

          generateRoute(end);

          markers.push(marker);

          marker.addListener('click', function() {
            infowindow.open(mapa, marker);
          });
        }); // End of forEach
        ///

      },error : function(e) {
        console.log("ERROR: ", e);
      },

      done : function(e) {
        console.log("DONE");
      }
    });

  });

// $("#btnMyLocation").on("click", function() {
//   exibirLocalizacaoUsuario(mapa, 14);
// });


})();
