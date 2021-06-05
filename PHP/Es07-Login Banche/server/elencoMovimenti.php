<?php
    header("content-type:application/json; charset=utf-8");
    require("php-mysqli.php");

    // step 0 controllo sessione
    _checkSession("cCorrentista");

    // step 1
    $cCorrentista = $_SESSION["cCorrentista"];
    if(isset($_REQUEST["cFiliale"]))
    {
        $cFiliale = $_REQUEST["cFiliale"];
    }
    else
    {
        http_response_code(400);
        die("Parametro mancante: codice filiale");
    }

    //step 2
    $con = _connection();
    //step 3
    $sql = "SELECT movimenti.cMov,operazioni.Descrizione,movimenti.Data,movimenti.Importo FROM movimenti,conti,operazioni " .
    "WHERE movimenti.cConto=conti.cConto  AND movimenti.cOperazione=operazioni.cOperazione" .
     "AND conti.cCorrentista=$cCorrentista AND conti.cFiliale=$cFiliale";
    $rs = _execute($con,$sql);
    // step 4
    if($rs)
    {
        echo(json_encode($rs)); // serializza $ris
    }
    else
    {
        http_response_code(500);
        $con->close();
        die("Errore nell'esecuzione della query");
    }
    // step 5
    $con->close();

?>