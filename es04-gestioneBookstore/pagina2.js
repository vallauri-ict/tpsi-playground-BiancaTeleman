"use strict";
    let json;
    let jsonVet;

    //creo i vari txt
    let _txtTitolo
    let _txtAutori
    let _txtCategoria
    let _txtAnno
    let _txtLingua
    let _txtPrezzo
window.onload=function(){
    json=localStorage.getItem("bookstore_json");
    console.log(json);
     jsonVet=JSON.parse(json);

    //creo i vari txt
     _txtTitolo=document.getElementById("txtTitolo");
    _txtAutori=document.getElementById("txtAutore");
     _txtCategoria=document.getElementById("txtCategoria");
     _txtAnno=document.getElementById("txtAnno");
     _txtLingua=document.getElementById("txtLingua");
     _txtPrezzo=document.getElementById("txtPrezzo");

    
}
function salva()
    {
        let jsonBook={};
            jsonBook.category=_txtCategoria.value;
            jsonBook.title=_txtTitolo.value;
            jsonBook.authors=_txtAutori.value;
            jsonBook.lang=_txtLingua.value;
            jsonBook.year=_txtAnno.value;
            jsonBook["price"]=_txtPrezzo.value;
            //inserisco jsonBook nel vettore
            jsonVet.push(jsonBook);
            localStorage.setItem("bookstore_json",JSON.stringify(jsonVet));
            window.location.href="index.html";
    }

    function ritorna()
    {
        window.location.href="index.html";
    }