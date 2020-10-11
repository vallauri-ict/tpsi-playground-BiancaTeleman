"use strict";
window.onload=function()
{
    let vetPersoneJson=json.results;
    //console.log(vetPersoneJson);

    //listbox
    let _lstNazioni=document.getElementById("lstNazioni");

    //tabella
    let _table=document.getElementById("table");
    let _thead=document.getElementById("thead");
    let _tbody=document.getElementById("tbody");

    let _divDettagli=document.getElementById("dettagli");

    let array=[];
    caricaLstNazioni();
    //creaIntestazioni();
    caricaTabella();
    array[0].veroCampoNPersone=1;
    _lstNazioni.addEventListener("change",caricaTabella);

    /*************** Funzioni *******************************/
    function caricaLstNazioni()
    {
        let vetAus=[]; //vettore d appoggio per mettere le nazionalità
        for (const item of vetPersoneJson) 
        {
            if(!(vetAus.includes(item.nat)))
            {
                vetAus.push(item.nat);
            }
        }
        //carico lstNAzionalità
        for(let i=0;i<vetAus.length;i++)
        {
            let _option=document.createElement("option");
            _option.text=vetAus[i];   
           //_option.addEventListener("change",caricaTabellaNazioni);//occhio che se metti .value ti mette tutto il listbox bianco a caso
            _lstNazioni.appendChild(_option);

            array[i]={
                "nazionalita":vetAus[i],
                "nPersone":0,
                "veroCampoNPersone":0
            };
        }
        //console.log(array);
    }

    function creaIntestazioni()
    {
        //_table.innerHTML="";
        _thead.innerHTML="";
        let intestazioni=["name","username","state","nat","img"];
        for(let i=0;i<intestazioni.length;i++)
        {
            let _td=document.createElement("td");
            _td.innerHTML=intestazioni[i];
            _td.style.border="1px solid black";
            _thead.appendChild(_td);
        }
        
    }

    function caricaTabella()
    {
        _tbody.innerHTML="";
        _table.style.overflow="auto";
        //se poi vuoi salvarti la poszione del record da cancellare fai un for normale che parte dalla fine e bom
        //oppure aggiungi un campo a qualcosa come negli esercizi in classe
        creaIntestazioni();
        for (const item of vetPersoneJson) 
        {
            if((_lstNazioni.value=="tutti")||(_lstNazioni.value==item.nat))
            {

                let _tr=document.createElement("tr");
                _tbody.appendChild(_tr);

                //name e last name
                let _td=document.createElement("td");
                _td.innerHTML= item.name.first+" "+item.name.last;
                _tr.appendChild(_td);

                //username
                _td=document.createElement("td");
                _td.innerHTML= item.login.username;
                _tr.appendChild(_td);

                //state
                _td=document.createElement("td");
                _td.innerHTML= item.location.state;
                _tr.appendChild(_td);

                //nat
                _td=document.createElement("td");
                _td.innerHTML= item.nat;
                _tr.appendChild(_td);

                //img
                
                let _img=document.createElement("img");
                _td=document.createElement("td");
                _img.src=item.picture.thumbnail;
                _img.password=item.login.password;
                _img.addEventListener("click",visualizzaDettagli);
                
                _td.appendChild(_img);
                _tr.appendChild(_td);
                if(array[0].veroCampoNPersone==0)
                {
                    for(let i=0;i<array.length;i++)
                    {
                        if(array[i].nazionalita==item.nat)
                        {
                            array[i].nPersone++;
                        }
                    }
                    
                }
                
            }
            
        }
        
         console.log(array);
    }

    function visualizzaDettagli()
    {
        _divDettagli.innerHTML="";
        for (const item of vetPersoneJson) 
        {
            if(this.password==item.login.password)
            {
                //img
                let _img=document.createElement("img");
                _img.src=item.picture.large;
                _divDettagli.appendChild(_img);
                let _br=document.createElement("br");
                _divDettagli.appendChild(_br);
                //nome cognome
                let str=item.name.first+" "+item.name.last;
                _divDettagli.innerHTML+=str;
                
                //mail
                _br=document.createElement("br");
                _divDettagli.appendChild(_br);
                _divDettagli.innerHTML+=item.email;

                //i due phone
                _br=document.createElement("br");
                _divDettagli.appendChild(_br);
                _divDettagli.innerHTML+=item.phone;

                _br=document.createElement("br");
                _divDettagli.appendChild(_br);
                _divDettagli.innerHTML+=item.cell;

                //elimina
                _br=document.createElement("br");
                _divDettagli.appendChild(_br);
                let _button=document.createElement("button");
                _button.innerHTML="ELIMINA";
                _button.password=item.login.password;
                
                _button.addEventListener("click",elimina);
                _divDettagli.appendChild(_button);
            }
        }
    }

    function elimina()
    {
        

        for(let i=0;i<vetPersoneJson.length;i++)
        {
           let item=vetPersoneJson[i];
            if(this.password==item.login.password)
            {
                vetPersoneJson.splice(i,1); //tolgo l'utente dalla variabile che contiene il json

                //decremento il numero di nazionalità di tale utente
                for(let j=0;j<array.length;j++)
                {
                    let item=vetPersoneJson[i];
                    if(array[j].nazionalita==item.nat)
                    {
                        array[j].nPersone--;
                        if(array[j].nPersone==0)
                        {
                            //for che scorre i listbox
                            /*for(let k=0;k<array;k++)
                            {
                                let _option=document.createElement()
                                if(_option.text==array[]);  
                                 _lstNazioni.appendChild(_option);
                            }*/
                            for (const option in _lstNazioni) {
                                if (option.text==array[j].nazionalita) 
                                {
                                    _lstNazioni.removeChild(option);
                                }
                            }
                        }
                    }
                }
            }
        }
        _divDettagli.innerHTML="";
        caricaTabella();
        
    }
}