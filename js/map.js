(function () {
var marker = null;
var latlng = null;
var API_KEY = "AIzaSyAefzKRkesd5paJ5myJCrhIp77SU0vDEac";

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


function generateRoute() {
  mapa = appMap();

  var start = document.getElementById('origem').value;
  var end = document.getElementById('destino').value;
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

      //console.log(result.enderecos[0].endereco);
      //console.log(result.enderecos[0].latitude);
      //console.log(result.enderecos[0].longitude);
      // console.log(result.routes[0].legs);
      // console.log(JSON.stringify(result));

    }
  });
}

var mapa = appMap();

exibirLocalizacaoUsuario(mapa, 14)
localizarEndereco("origem", "btnIr", mapa, 14);

var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();

mode.addEventListener("change", generateRoute);
document.getElementById("btnRota").addEventListener("click", generateRoute);

var geocoder = new google.maps.Geocoder();

var marker = new google.maps.Marker({
  // position: { lat: elemento.latitude, lng: elemento.longitude },
  map: mapa,
  title: 'UBS'
});

var geocoder = new google.maps.Geocoder();

// Just repeting my self
$("#origem").autocomplete({
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
  map.setCenter(location);
  map.setZoom(16);
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

/// BAck here later
var ubs = [
  {
    endereco: '1',
    telefone: '',
    horarioFuncionamento: '',
    latitude: -25.363,
    longitude: 131.044
  },
  {
    endereco: '2',
    telefone: '',
    horarioFuncionamento: '',
    latitude: 25.363,
    longitude: 11.044
  },
  {
    endereco: '3',
    telefone: '',
    horarioFuncionamento: '',
    latitude: 15.363,
    longitude: 31.044
  }
];

var markers = [];

ubs.forEach((elemento) => {
  var infowindow = new google.maps.InfoWindow({
    content: `
      <p><strong>ENDEREÇO: </strong>${elemento.endereco}</p>
      <p><strong>TELEFONE: </strong>${elemento.telefone}</p>
      <p><strong>HORÁRIO DE FUNCIONAMENTO: </strong>${elemento.horarioFuncionamento}</p>
    `
  });

  var marker = new google.maps.Marker({
    position: { lat: elemento.latitude, lng: elemento.longitude },
    map: mapa,
    title: 'UBS'
  });

  markers.push(marker);

  marker.addListener('click', function() {
    infowindow.open(mapa, marker);
  });
}); // End of forEach
  var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
  marker.setPosition(location);
  map.setCenter(location);
  map.setZoom(16);
}});

})();
