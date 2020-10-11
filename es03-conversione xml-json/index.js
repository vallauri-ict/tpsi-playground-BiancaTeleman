"use strict"
function init(){
    let _button=document.getElementById("btnConverti");
    _button.addEventListener("click",converti);

    function converti()
    {
        let xml=localStorage.getItem("bookstore_xml"); //ricevo la stringadal server ed è così che appunto si chiama sull'application
        //parsifico una volta presa la bestia dal server
        let parser=new DOMParser();
        let xmlDoc=parser.parseFromString(xml,"text/xml");
        let root=xmlDoc.documentElement; //accedo alla root in questo caso bookstore

        //vettore enumerativo in cui salveremo i libri in formato JSON
        let vetJSON=[]; 
        //scansione dell'albero xml
        //root.children è un vettore enumerativo che contiene tutti i book
        for (let i = 0; i < root.children.length; i++) 
        {
            let book=root.children[i]; //book-iesimo
            let title= "", category= "", lang= "", authors = [], year= "", price= "";
            if(book.hasAttribute("category")) //fuori dal for perchè non ho bisogno che mi scorra tutto dato che devo piazzarmi solo sul book
            {
                category=book.getAttribute("category");
            }
            for (let j = 0; j < book.children.length; j++) {
                let campo=book.children[j];  //children i-esimo di book
                switch(campo.nodeName)
                {
                    case "title": //qui mi piazzo nel for perchè l'attributo è dentro titolo
                        title=campo.textContent;
                        if(campo.hasAttribute("lang"))
                        {
                            lang=campo.getAttribute("lang");
                        }
                        break;
                    case "author":
                        authors.push(campo.textContent); //è un vettore quindi devo fare così(prendo il contenuto di campo e con textContent ne prendo il contenuto). 
                                                        //con push semplicemento accodo
                        break;
                    case "year":
                        year=campo.textContent;
                        break;
                    case "price":
                        price=campo.textContent;
                        break;
                    default:
                        break;
                }
            }
            //vettore associativo/JSON aka sono la stessa cosa
            let jsonBook={};
            jsonBook.category=category;
            jsonBook.title=title;
            jsonBook.authors=authors;
            jsonBook.lang=lang;
            jsonBook.year=year;
            jsonBook["price"]=price;
            //inserisco jsonBook nel vettore
            vetJSON.push(jsonBook);
        }
        /*console.log("BOOK");
        console.log(titolo);
        console.log(categoria);
        console.log(autori);
        console.log(lingua);
        console.log(prezzo);
        console.log(anno);*/
        //alert(JSON.stringify(vetJSON));
        alert("dati convertiti salvati correttamente");
        localStorage.setItem("bookstore_json",JSON.stringify(vetJSON));
    }
}
