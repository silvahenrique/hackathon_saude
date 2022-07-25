(function () {

  var btn = $("#btnEnviar").on("click", function () {

    var endereco = JSON.parse(localStorage.getItem('endereco'));
    var textoAjuda = document.getElementById("textoAjuda").value;

    var obj = {
      endereco: endereco,
      textoAjuda: textoAjuda
    };

    obj = {
      speakText: textoAjuda
    };

    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "http://3987b24c.ngrok.io/projectnavi/message",
      dataType: "json",
      timeout: 100000,
      data: JSON.stringify(obj),

      success: function (data) {
        console.log(data);

        //   var retornoMaps = [];
        //
        //   var params = {
        //     origin: 'alameda barao de limeira',
        //     destination: 'rua 25 de marco',
        //     key: 'KEY'
        //   };
        //
        //   fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${params.origin}&destination=${params.destination}&key=${params.key}`, {
        //     method: 'post',
        //   })
        //     .then(response => response.json())
        //     .then(response => console.log(response));
        //
        // },

        error: function(e) {
          console.log("ERROR: ", e);
        },

        done: function(e) {
          console.log("DONE");
        }
      });

  });


})();
