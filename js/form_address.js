(function() {

  var btn = $("#btnSubmit").on("click", function() {
    var endereco = {
      rua: document.getElementById('rua').value,
      numero: document.getElementById('numero').value,
      cidade: document.getElementById('cidade').value,
      estado: document.getElementById('estado').value,
      bairro: document.getElementById('bairro').value
    };

    localStorage.setItem('endereco', JSON.stringify(endereco));

    window.setTimeout(function () {
      window.location.assign("form_address2.html");
    }, 1000);

  });

})();
