(function() {

  var btn = $("#btnEnviar").on("click", function() {

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
      type : "POST",
      contentType : "application/json",
      url : "http://c44282a4.ngrok.io/projectnavi/message",
      dataType : "json",
      timeout : 100000,
      data : JSON.stringify(obj),

      success : function(data) {
        alert(JSON.stringify(data));
      },

      error : function(e) {
        console.log("ERROR: ", e);
      },

      done : function(e) {
        console.log("DONE");
      }
    });

  });

})();
