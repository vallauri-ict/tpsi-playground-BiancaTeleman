"use strict";
 
$(document).ready(function () {
	let elencoArticoli;
	let wrapper = $('#elencoArticoli');
	let details =$(".details")

    $.ajax({
	   "url": "http://localhost:3000/fotocamere",  
       "timeout": 5000,    
	   "success": visualizza,
	   "error": errore
	})
	details.hide();
	wrapper.on("mouseover","img",function()
	{
		$(this).next().html($(this)).prop("name");
	});

	wrapper.on("mouseout","img",function()
	{
		$(this).next().html("");
	});

	wrapper.on("click",".article",function()
	{
		details.slideDown(1000);
		let id=$(this).prop("id").split("-")[1];

		let div=$("<div>");
		div.addClass("detail-close");
		div.appendTo(details);
		let span=$("<span>");
		span.appendTo(div);
		span.html("X");
		span.on("click",function()
		{
			details.slideUp(1000);
		});

		let divImg=$("<div>");
		divImg.addClass("detail-img");
		divImg.appendTo(details);
		let img=$("<img>");
		img.appendTo(divImg);
		img.prop("src","img/"+elencoArticoli[id].src+".jpg");

		let divInfo=$("<div>");
		divInfo.appendTo(details);
		divInfo.addClass("detail-info");
		let h4=$("<h4>");
		h4.appendTo(divInfo);
		h4.addClass("item-title");
		h4.html(elencoArticoli[id].nome);
		let p=$("<p>");
		p.appendTo(divInfo);
		p.html(elencoArticoli[id].descrizione);
		let pPrezzo=$("<p>");
		pPrezzo.appendTo(divInfo);
		pPrezzo.html("$"+elencoArticoli[id].prezzo);
		let button=$("<button>");
		button.appendTo(divInfo);
		button.addClass("item-add");
		button.html("aggiungi al carrello");
		button.on("click",aggiungi);
	});

	let aperto=false;
	$("#btnCarrello").on("click",function()
	{
		if(aperto==false)
		{
			$("#carrello").slideDown(1000);
			$(this).html("&#709 Chiudi carrello");
		}
		else
		{
			$("#carrello").slideUp(1000);
			$(this).html("&#709 Apri carrello");
		}
		aperto=!aperto;
	});

	function aggiungi()
	{
		let nome=$(this).prop("nome");
		let prezzo=$(this).prop("prezzo");
		let trovato=false;
		let table=$("#carrello table");
		table.find("tr").each(function(i,ref)
		{
			let name=$(ref).children("td").eq(0).html();
			if(name==nome)
			{
				let qta=parseInt($(ref).children("td".eq(2).html()));
				qta++;
				$(ref).children("td".eq(2).html(qta));
				trovato=true;
			}
		})
		if(!trovato)
		{
			let tr=$("<tr>");
			tr.appendTo(table);

			let tdNome=$("<td>");
			tdNome.appendTo(tr);
			tdNome.html(nome);

			let tdPrezzo=$("<td>");
			tdPrezzo.appendTo(tr);
			tdPrezzo.html(prezzo);

			let tdQta=$("<td>");
			tdQta.appendTo(tr);
			tdQta.html("1");

			let td=$("<td>");
			td.appendTo(tr);
			let img=$("<img>");
			img.prop("src","img/_cestino.png");
			img.appendTo(td);
			img.on("click",function()
			{
				$(this).parent().parent().remove();
			})
		}
		
	}
	function visualizza (data) {
		console.log(data);
		elencoArticoli=data;
		let i=0;
		for(let item of data)
		{
			let articolo=$("<div>");
			articolo.prop("id","article"+i);
			articolo.addClass("article");
			articolo.appendTo(wrapper);

			let img=$("<img>");
			img.prop("name",item.nome);
			img.prop("src","img/"+item.src+".jpg");
			img.prop("title","Aggiungi al carrello");
			img.addClass("image");
			img.appendTo(articolo)

			let name=$("<div>");
			name.appendTo(articolo);
			name.addClass("name");
			i++;
		}
	}
});


/* **************************************************** */

function errore(jqXHR, textStatus, str_error){
	if(jqXHR.status==0)
	   alert("connection refused or server timeout");
	else if (jqXHR.status == 200)
	   alert("Errore Formattazione dati\n" + jqXHR.responseText);
	else
	   alert("Server Error: "+jqXHR.status+ " - " +jqXHR.responseText);
}

