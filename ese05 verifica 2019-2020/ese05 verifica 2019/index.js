"use strict"
window.onload=function()
{
    //creo json cocktail
    localStorage.setItem("cocktails_json",JSON.stringify(cocktails));
    //let cocktailProv=localStorage.getItem("cocktails_json"); //non devo fare nessun parse strano perchè io prendo già da json
    let vetCocktails=cocktails.drinks;
    
    //creo json ingredienti
    localStorage.setItem("ingredients_json",JSON.stringify(ingredients));
    let vetIngredienti=ingredients.ingredients;

    //creo tabella
    //let _body=document.getElementsByTagName("body")[0];
    let _table=document.getElementById("table");
    let _lstIngredienti=document.getElementById("lstIngredienti");
    //opt
    let _optTutti=document.getElementById("optTutti");
    _optTutti.addEventListener("click",creaTabella);
    let _optAlcoholic=document.getElementById("optAlcoholic");
    _optAlcoholic.addEventListener("click",creaTabella);
    let _optNonAlcoholic=document.getElementById("optNonAlcoholic");
    _optNonAlcoholic.addEventListener("click",creaTabella);
    
    ///aggiuni addeventlistener ai lst
    
    //creaIntestazioni();

    creaTabella();

    aggiungiLista();

    


    function creaIntestazioni() //per ordinare il json c'è il json a pagina 14 degli appunti json
    {
        let _tr=document.createElement("tr");
        _table.appendChild(_tr);
        let intestazioni=["","id","name","alcoholic","ingredient",""];
        let dims=[40,40, 60, 70, 70, 40];
        for (let i = 0; i < intestazioni.length; i++) {
            let _th=document.createElement("th");
            _th.innerHTML=intestazioni[i];
            _th.style.width=dims[i]+"px";
            _tr.appendChild(_th);
         }

    }

    function creaTabella()
    {
        _table.innerHTML="";
        creaIntestazioni();
        for (let item of vetCocktails) 
        //for(let i=0;i<vetCocktails.length;i++)
        {
            if(((_optTutti.checked==true)||(_optAlcoholic.checked && item.strAlcoholic=="Alcoholic")||
            (_optNonAlcoholic.checked && item.strAlcoholic=="Non alcoholic"))&&(_lstIngredienti.value=="" || _lstIngredienti.value==item.strIngredient1))
            {
                //let item=vetCocktails[i];                                                  
                let _tr=document.createElement("tr");
                _table.appendChild(_tr);

                //immagini strDrinkThumb  //crea il tag img bruh
                let _img = document.createElement("img");
                _img.style.width=40+"px";
                _img.src=item['strDrinkThumb'];
                let _td=document.createElement("td");
                _td.appendChild(_img);
                //_td.innerHTML=item["strDrinkThumb"];
                _tr.appendChild(_td);

                //idDrink
                _td=document.createElement("td");
                _td.innerHTML=item.idDrink;
                _tr.appendChild(_td);

                //strDrinks
                _td=document.createElement("td");
                _td.innerHTML=item['strDrink'];
                _tr.appendChild(_td);

                //strAlcoholic
                _td=document.createElement("td");
                _td.innerHTML=item['strAlcoholic'];
                _tr.appendChild(_td);

                //strIngredient1
                _td=document.createElement("td");
                _td.innerHTML=item['strIngredient1'];
                _tr.appendChild(_td);

                //dettagli
                _td=document.createElement("td");
                let _a=document.createElement("a");
                _td.appendChild(_a);
                _a.href="#";
                _a.idCocktail=item.idDrink;
                _a.text="dettagli"
                _a.addEventListener("click",visualizzaDettagli);
                _tr.appendChild(_td);
            }
            
        }
    }

    function aggiungiLista()
    {
        let _option=document.createElement("option");
        _option.value="";
        _lstIngredienti.appendChild(_option);
        
        //ordinamente del vettore
        vetIngredienti.sort(function(record1, record2) {
            let str1 = record1.strIngredient1.toUpperCase();
            let str2 = record2.strIngredient1.toUpperCase();
            if (str1 < str2)
                return -1;
            else if (str1 > str2)
                return 1;
            else return 0;
            }
            );
            for (const item of vetIngredienti) 
            {
                _option=document.createElement("option");
                _option.text=item.strIngredient1;
                _lstIngredienti.appendChild(_option);
            }     
    }

    function visualizzaDettagli()
    {
        let _divDettagli=document.getElementById("dettagli");
        _divDettagli.innerHTML="";
        for (const item of vetCocktails) 
        {
            if(item.idDrink==this.idDrink)
            {
                //h3
                let _h3=document.createElement("h3");
                
                _divDettagli.appendChild(_h3);
                _h3.innerHTML=item.strDrink;
                //i 5 ingredienti
                let ingredientis="";
                for(let i=1;i<=5;i++)
                {
                    if(item["strIngredient"+i]!=null)
                    {
                        ingredientis+=item["strIngredient"+i]+" - "; //devo usare le quadre per concatenare i al numerino dell'ingrediente
                    }
                }
                let _pIngredients=document.createElement("p");
               
               // _pIngredients.style.width="100px"
                _divDettagli.appendChild(_pIngredients);
                _pIngredients.innerHTML="Ingredients: "+ingredientis;
                
                //img
                let img=document.createElement("img");
                
                _divDettagli.appendChild(_img);
                _img.src=item.strDrinkThumb;
                _img.style.width="140px";
                break;
            }
        }
    }
}