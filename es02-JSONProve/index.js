"use strict";
function init(){
    let studente= {
        "nome" : "mario",
        "cognome" : "rossi",
        "eta" : 16,
        "studente" : true,
        "images" : ["smile.gif","grim.gif","frown.gif","bomb.gif"],
        "hobbies" : [],
        "pos" : {"x": 40, "y": 300},
        "stampa" : function () {alert("Hello "+this.nome);},
        "fullName":function(){return this.nome+ " "+this.cognome}
    };

    console.log(studente["eta"]);
    studente.eta++;
    console.log(studente.eta);
    console.log(studente.fullName());

    //aggiunta di una nuova chiave
    studente["residenza"]="fossano"; //se uso quadre o puntino non cambia nulla
    studente.classe="4B info";
    console.log(studente.residenza); //anche qui non cambia nulla
    if("classe" in studente) //si lege: se questa chiave appartiene a studente --> chiave è il "genitore" e il primo a venir scritto
    {
        console.log(studente["classe"]);
    }
    else
    {
        console.log("Chiave inesistente");
    }

    //dichiarazione di un nuovo object
    let studente2={};
    studente2.nome="Pluto";
    studente2.residenza="Alba";

    //scansione delle proprietà di un oggetto
    console.log("STUDENTE2");
    for (let key in studente2)  //per ogni chiave in studente
    {
        if(studente2.hasOwnProperty(key))
        {
            console.log(key +" = "+studente2[key]);  //devo usare le quadre perchè è una variabile in questo caso
        }
    }
    console.log("STUDENTE");
    for (let key in studente)  //per ogni chiave in studente chiave
    {
        if(!(studente[key].toString().includes("function"))) //converto in stringa perchè non tutti i campi sono string e poi si impalla
        {
            console.log(key +" = "+studente[key]);  //devo usare le quadre perchè è una variabile in questo caso
        }
    }

    //serializzazione di un oggetto
    console.log(studente); //serializza in automatico
    alert(studente); //NON serializza in automatico
    alert(JSON.stringify(studente));//metodo per serializzare con alert

    //vettore enumerativo delle chiavi
    let keys=Object.keys(studente);
    //consente di scorrere i valori di un vettore enumerativo
    for (let iterator of keys)
    {
        console.log(iterator); //solo il contenuto scorre, senza gli indici
    }
    console.log("----------------------------");
    console.log(studente.images[0]);
    studente.st2=studente2; //annido in studente studente 2
    console.log(studente.st2);
}







