<?php
    header("content-type:application/json; charset=utf-8");
    require("php-mysqli.php");

    // step 1
    if(isset($_REQUEST["cFiliale"]))
        $cFiliale = $_REQUEST["cFiliale"];
    else
    {
        http_response_code(400);
        die("Parametro mancante: codice filiale");
    }

    //step 2
    $con = _connection();
    //step 3
    // join delle 2 tabelle conti e correntisti
    $sql = "SELECT * FROM conti,correntisti WHERE correntisti.cCorrentista = conti.cCorrentista and conti.cFiliale=$cFiliale"; 
    $rs = _execute($con,$sql);
    // step 4
    if($rs)
    {
        echo(json_encode($rs)); // serializza $rs
    }
    else
    {
        http_response_code(500);
        die("Errore nell'esecuzione della query");
    }
    // step 5
    $con->close();

?>