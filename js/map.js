(function () {
var marker = null;
var latlng = null;
var API_KEY = "AIzaSyAefzKRkesd5paJ5myJCrhIp77SU0vDEac";

var travelModes = [
  { descrciption: "Carro", mode: "DRIVING" },
  { descrciption: "Bicicleta", mode: "BICYCLING" },
  { descrciption: "Transport púbico", mode: "TRANSIT" },
  { descrciption: "A pé", mode: "WALKING" }
];

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
    },

    function () {
      // LocalizacaoErro(true);
    });
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

var mapa = new google.maps.Map(document.getElementById("mapa"), {
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
  mapTypeId: google.maps.MapTypeId.ROADMAP
});

exibirLocalizacaoUsuario(mapa, 14)
localizarEndereco("origem", "btnIr", mapa, 14);

var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();

document.getElementById("btnRota").addEventListener("click", function () {

  var start = document.getElementById('origem').value;
  var end = document.getElementById('destino').value;

  directionsDisplay.setMap(mapa);

  var request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  };

  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);

      console.log(JSON.stringify(result));
    }
  });
});

})();


//
// var vm  = new Vue({
//   el: "#app"
// });
