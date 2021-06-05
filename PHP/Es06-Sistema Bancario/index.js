"use strict";

$(function () {
	let _wFiliali=$("#wrapFiliali");
	let _wCorrentisti= $("#wrapCorrentisti");
    let _lstBanche = $("#lstBanche");
	let _lstFiliali = $("#lstFiliali");
	let _table = $("#tabCorrentisti").children("tbody");

    //_wFiliali.css("display", "none");
	_wCorrentisti.css("display", "none");
	_table.empty();

	_lstBanche.prop("selectedIndex",-1);
	_lstBanche.on("change",function(){
		_lstFiliali.empty();
		_wCorrentisti.css("display","none");
		let request = inviaRichiesta("get","servizi/elencoFiliali.php",{"cBanca": _lstBanche.val()});
		request.fail(errore);
		request.done(function(filiali){
			console.log(filiali);
			for (const filiale of filiali) {
				let opt = $("<option>");
				opt.appendTo(_lstFiliali);
				opt.val(filiale["cFiliale"]);
				opt.text(filiale.Nome);
			}
			_lstFiliali.prop("selectedIndex",-1);
		})
	})

	_lstFiliali.on("change",function(){
		let request = inviaRichiesta("get","servizi/elencoCorrentisti.php",{"cFiliale": _lstFiliali.val()});
		request.fail(errore);
		request.done(function(correntisti){
			_table.empty();
			console.log(correntisti);
			for (const correntista of correntisti) {
				let tr = $("<tr>");
				tr.appendTo(_table);
				
				let td = $("<td>");
				td.appendTo(tr);
				td.text(correntista.cCorrentista);

				td = $("<td>");
				td.appendTo(tr);
				td.text(correntista.Nome);

				td = $("<td>");
				td.appendTo(tr);
				td.text(correntista.cComune);

				td = $("<td>");
				td.appendTo(tr);
				td.text(correntista.Telefono);

				td = $("<td>");
				td.appendTo(tr);
				td.text(correntista.cConto);

				td = $("<td>");
				td.appendTo(tr);
				td.text(correntista.Saldo);
			}
			_wCorrentisti.css("display","block");
		})
	});
    
	
	
});