(function() {

  var btn = $("#btnEnviar").on("click", function() {

    var endereco = JSON.parse(localStorage.getItem('endereco'));
    var textoAjuda = document.getElementById("textoAjuda").value;

    var obj = {
      endereco: endereco,
      textoAjuda: textoAjuda
    };

    alert(JSON.stringify(obj));

    $.ajax({
      type : "POST",
      contentType : "application/json",
      url : "URL",
      dataType : "json",
      timeout : 100000,
      data : JSON.stringify(obj),

      success : function(data) {
        console.log(JSON.stringify(data));
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
