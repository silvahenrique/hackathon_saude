function callFiltrarViaAJAX() {
			var filtro = {};
			filtro["speakText"] = $("#speakText").val();

			$.ajax({
				type : "POST",
				contentType : "application/json",
				url : "filtrar", //Colocar aqui o endereço da request
				dataType : "json", //O que esperamos que o servidor retorne (quando especificado JSON, receberemos um objeto do tipo JSON)
				timeout : 100000,
				data : JSON.stringify(filtro), //O que está sendo enviado para o servidor

				success : function(data) {
					exibeRetornoRequisicao(data);
				},

				error : function(e) {
					console.log("ERROR: ", e);
				},

				done : function(e) {
					console.log("DONE");
				}
			});
		}


var exibeRetornoRequisicao = function(data) {
  console.log(JSON.stringify(data));
}


var btn = $("#search").on("click",callFiltrarViaAJAX);
