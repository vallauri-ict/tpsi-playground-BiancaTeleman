'use strict';
function crea(){
    localStorage.setItem("bookstore_xml", bookstore);
    alert("Dati salvati corretamente all'interno del local storage");
}
function visualizza(){
    let xml = localStorage.getItem("bookstore_xml");
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xml,"text/xml");
    /*let serialiser = new XMLSerializer();
    let aus = serialiser.serializeToString(xmlDoc);
    alert(aus);*/
    let root = xmlDoc.documentElement;//accedo alla radice dell'albero
    let nlibri = root.children.length;
    let figlio=root.firstChild;

    //alert("dati letti in modo corretto dal local storage. N.Record letti =" + nlibri)

    //console.log();

    let _tbody=document.getElementById("tabLibri");
    _tbody.innerHTML="";
    for(let i = 0; i < nlibri ; i++){
        let Record = root.children[i];
        console.log(Record.children[1].nodeType);
        let titolo, categoria , lingua, autori = "", anno, prezzo;
        for(let j = 0;j < Record.children.length;j++){
            if(Record.hasAttribute("category"))
                categoria = Record.getAttribute("category");
            else categoria = "none";
            let campo = Record.children[j].nodeName;
            if(campo == "title")
            {
                titolo = Record.children[j].textContent;
                if(Record.children[j].hasAttribute("lang"))
                    lingua = Record.children[j].getAttribute("lang");
                else lingua = "none"
            }
            else if(campo == "year")
                anno = Record.children[j].textContent;
            else if(campo == "author")
                autori += Record.children[j].textContent+"-";
            else if(campo == "price")
                prezzo = Record.children[j].textContent;
        }
        //creo appendo e scrivo le celle
        let tr = document.createElement("tr");
        _tbody.appendChild(tr);
        //creo celle
        let td = document.createElement("td");
        tr.appendChild(td);
        td.innerHTML = titolo;
        td = document.createElement("td");
        tr.appendChild(td);
        td.innerHTML = categoria;
        td = document.createElement("td");
        tr.appendChild(td);
        td.innerHTML = lingua;
        td = document.createElement("td");
        tr.appendChild(td);
        td.innerHTML = autori;
        td = document.createElement("td");
        tr.appendChild(td);
        td.innerHTML = anno;
        td = document.createElement("td");
        tr.appendChild(td);
        td.innerHTML = prezzo;
    }
}