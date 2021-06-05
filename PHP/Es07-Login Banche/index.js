"use strict";

$(function () {
	let _wrapper=$("#wrapper");
	let _divTitolo = $("#divTitolo");
    let _divFiliali = $("#divFiliali");
	let _divMovimenti = $("#divMovimenti");
	let tbody = $("#divMovimenti").find("tbody");
	let _btnLogOut = $("#btnLogout");
	let btnPass=$("#btnPass");
	_wrapper.hide();
	
	_btnLogOut.on("click",function(){
		let request = inviaRichiesta("POST","server/logOut.php");
		request.fail(errore);
		request.done(function(data){
			alert("Sei stato disconnesso correttamente");
			window.location.href = "login.html";
		})
	})
	btnPass.on("click",function()
	{
		let request = inviaRichiesta("POST","_cambiaPassword.php");
		request.fail(errore);
		request.done(function(data){
		alert("Sei stato disconnesso correttamente");
		window.location.href="_cambiaPassword.php";
		})
	})

	let _richiestaFiliali = inviaRichiesta("get", "server/elencoFiliali.php");
	
	_richiestaFiliali.fail(errore);
	
	_richiestaFiliali.done(function (data) {
		let p = $("<p>").text("Benvenuto " + data["Nome"]).appendTo(_divTitolo);
		p.css({"text-align":"right","font-weight":"bold"});

		console.log(data)
		_wrapper.show();
		_divMovimenti.hide();
		_divFiliali.css("text-align","center");
		for (const filiale of data["filiali"]) {
			let opt = $("<input type='radio' name='optFiliali'>");
			opt.appendTo(_divFiliali);
			opt.val(filiale.cFiliale);
			let span = $("<span>");
			span.text(" " + filiale.nome);
			span.appendTo(_divFiliali);
			let br = $("<br>");
			br.appendTo(_divFiliali);
		}
		let button = $("<button class='btn btn-primary'>");
		button.appendTo(_divFiliali);
		button.css({"margin":"15px"});
		button.text("Visualizza movimenti");
		button.on("click",function(){
			let cFiliale = $("input[type=radio]:checked").val();
			let request = inviaRichiesta("get","server/elencoMovimenti.php",{"cFiliale":cFiliale});
			request.fail(errore);
			request.done(function(movimenti){
				
				console.log(movimenti);
				for (const mov of movimenti) {
					_divMovimenti.show();
					let tr = $("<tr>");
					tr.appendTo(tbody);

					let td = $("<td>");
					td.text(mov.cMov);
					td.appendTo(tr);

					td = $("<td>");
					td.text(mov.Descrizione);
					td.appendTo(tr);

					td = $("<td>");
					td.text(mov.Data);
					td.appendTo(tr);

					td = $("<td>");
					td.text(mov.Importo);
					td.appendTo(tr);
				}
			});
		})
		
    });
	
		
	
});
