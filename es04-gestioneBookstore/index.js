
"use strict";
window.onload=function(){
    let json=localStorage.getItem("bookstore_json");
    console.log(json);
    let jsonVet=JSON.parse(json);
    let indiceLibroCorrente=0; //variabile che mi dice in che parte sono
    console.log(jsonVet);
    let _table=document.createElement("table");
    let _body=document.getElementsByTagName("body")[0];
    _body.appendChild(_table);
    let _divDettagli;
    let _btnEliminaNorm;
    ///sono i btnElimina ma fatto con un altro modo
    let _btnEliminaVet=[]
    //crea intestazione
    creaIntestazioni();

    caricaDati();
    
    creaDettagli();
    
    visualizza();

    creaPulsanti();

    creaAggiungiElimina(); 

    
    function caricaDati()
    {
        let cont=-1;
        //for (const item of jsonVet) //l' item è book in questo caso aka jsonVet[i]= book
        for(let i=0;i<jsonVet.length;i++)
        {
            let item=jsonVet[i];
            let _tr=document.createElement("tr");
            _table.appendChild(_tr);

            let _td=document.createElement("td");
            _td.innerHTML=item.title;
            _tr.appendChild(_td);

            //authors è un vettore enumerativo
            _td=document.createElement("td");
            //join restituisce una stringa contenente tutte le voci del vettore separate dalla virgola e funge solo coi vettori enumerativi
            //in ogni caso nei vettori enumerativi la serializzazione viene fatto in automatico anyway
            _td.innerHTML=item.authors;
            _tr.appendChild(_td);

            //categoria
            _td=document.createElement("td");
            _td.innerHTML=item.category;
            _tr.appendChild(_td);

            //price
            _td=document.createElement("td");
            _td.innerHTML=item.price;
            _tr.appendChild(_td);
            /// btnElimina
            _td=document.createElement("td");
            _btnEliminaNorm=document.createElement("button");
            _btnEliminaNorm.innerHTML="ELIMINA";
            cont++;
            _btnEliminaNorm.recordDaEliminare=i
            _btnEliminaNorm.addEventListener("click",elimina);
            _td.appendChild(_btnEliminaNorm);
            _tr.appendChild(_td);
            

        }
    }

    function creaIntestazioni()
    {
        let _tr=document.createElement("tr");
        _table.appendChild(_tr);
        let intestazioni=["title","authors","category","price"];
        for (let i = 0; i < intestazioni.length; i++) {
            let _th=document.createElement("th");
            _th.innerHTML=intestazioni[i];
            _tr.appendChild(_th);
         }
    }

    function creaDettagli()
    {
        //creazione del tag div e dei dettagli
     _divDettagli=document.createElement("div");
        _body.appendChild(_divDettagli);
        //_divDettagli.classList.add('dettagli');
        _divDettagli.setAttribute("class","dettagli");  //aggiungere una classe dinamicamente
    }
    function visualizza()
    {
        _divDettagli.innerHTML="";
        let libroCorrente=jsonVet[indiceLibroCorrente] //è un json
        for (const key in libroCorrente) //key sono le chiavi aka se ti ricordi titolo,categoria etc
        {   //creo intestazione e appendo
            let _p1=document.createElement("p");
            _p1.innerHTML=key+"= ";
            // _p1.style.textAlign="right";
            _p1.style.fontWeight="bold";
            _divDettagli.appendChild(_p1);
            //creo contenuto e appendo 
            let _p2=document.createElement("p");
            _p2.innerHTML=libroCorrente[key]; //senza virgolette, tu vuoi prendere il contenuto della variabile
            _p2.style.overflow="auto";
            _divDettagli.appendChild(_p2);
        }
    }

    function creaPulsanti()
    {
        let _divPulsantiNavigazione=document.createElement("div");
        _divPulsantiNavigazione.setAttribute("class","pulsantiNavigazione");
        _body.appendChild(_divPulsantiNavigazione);
        let nomiPulsanti=["primo","indietro","avanti","ultimo"]; //vettore enumerativo
        for (const item of nomiPulsanti) 
        {
            let _button=document.createElement("button");
            //assegno come id il nome stesso del pulsante in modo che sia accessibile dalle altre procedure
            _button.id=item;
            _button.addEventListener("click",navigazione);
            _button.style.padding="5px 10px";
            _button.innerHTML=item;  //item = uno dei vari contenuti di nomiPulsanti
            _divPulsantiNavigazione.appendChild(_button);   
        }
        document.getElementById("indietro").disabled = true;
        
        
    }

    function navigazione() {
        //si usa il this perchè con l addEventListener se ti ricordi il this è l oggetto a cui ho dato l' addEventListener
        // e in questo caso this è il pulsante e quindi si eseguirà 4 volte
        let _indietro=document.getElementById("indietro");
        let _avanti=document.getElementById("avanti");
        switch(this.innerHTML)
        {
            case "primo":
                indiceLibroCorrente=0;
                document.getElementById("avanti").disabled = false;
                _indietro.disabled=true;
                break;
            case "indietro":
                indiceLibroCorrente--;
                document.getElementById("avanti").disabled = false;
                if(indiceLibroCorrente==0)
                {
                    _indietro.disabled=true;
                }
                break;
            case "avanti":
                document.getElementById("indietro").disabled = false;
                indiceLibroCorrente++;
                if(indiceLibroCorrente==jsonVet.length-1)
                {
                    _avanti.disabled=true;
                }
                break;
            case "ultimo":
                document.getElementById("indietro").disabled = false;
                indiceLibroCorrente=jsonVet.length-1;
                _avanti.disabled=true;
            }
        visualizza();
    }

    function creaAggiungiElimina()
    {
        let _divAgEl=document.createElement("div");
        _divAgEl.setAttribute("class","pulsantiNavigazione");
        _body.appendChild(_divAgEl);
         //creazione
         let _btnAggiungi=document.createElement("button");
        _btnAggiungi.innerHTML="Aggiungi";
        _btnAggiungi.style.padding="5px 10px";
       _divAgEl.appendChild(_btnAggiungi);
       _btnAggiungi.addEventListener("click",aggiungi);

       let _btnElimina=document.createElement("button");
        _btnElimina.innerHTML="Elimina per categoria";
        _btnElimina.addEventListener("click",eliminaCat);
        _btnElimina.style.padding="5px 10px";
       _divAgEl.appendChild(_btnElimina);

    }

    function aggiungi(){
        window.location.href="pagina2.html"
    }

   function elimina()
   {
       let pos=this.recordDaEliminare;
       jsonVet.splice(pos,1);
       localStorage.setItem("bookstore_json",JSON.stringify(jsonVet));
       window.location.reload();
       
       /*console.log(pos);
       console.log(cont);
        /*_table.removeChild(_table.children[pos]);
        pos=0;*/
        /*for (const item of jsonVet) {
            if(item==pos)
            {
                jsonVet(item);
                localStorage.setItem("bookstore_json",JSON.stringify(jsonVet));
                window.location.href="index.html"; //praticamente ricarica solo la pagina nascondendo l'elimina che non va
                ///document.getElementsByTagName("tr")[pos].remove();
            }
        }*/
        /*for(let i=jsonVet.length-1;i>=0;i++)
        {
            if(jsonVet[i].title==pos)
            {
                _table.removeChild(_tr[i]);
            }
        }*/
   }
   function eliminaCat() 
   //se mai devo cancellare elementi da cancellare devo partire a scorrere il vettore al contrario
   {
    let qta=0;   
    //prompt è tipo il message box di c#
       let categoria=prompt("Inserisci una categoria da cancellare ");
       for(let i=jsonVet.length-1;i>=0;i--)
       {
           if(jsonVet[i].category==categoria)
            {
                jsonVet.splice(i,1);
                qta++;
            }
       }
       if(qta>0)
       {
           alert("cancellati: "+qta+" record");
           localStorage.setItem("bookstore_json",JSON.stringify(jsonVet));
           window.location.reload(); //ricarica la pagina
       }
       else
       {
        alert("cancellato nessun record");
       }
   }
}




