<!DOCTYPE html>
<html lang="it">
 <head>
 <meta charset="UTF-8"/>
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> PHP </title>
	<script> src="https://code.jqeury.com/jquery-3.6.0.js"
	integrity="sha256-H+K7U5CnX"
	crossorigin="anonymus"</script>
	<link rel="stylesheet" href="index.css"/>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
	<script type="application/javascript" src="risultati.js"> </script>
</head>

	<body style="text-align:center;">
		<?php
            require("php-mysqli.php");
            // step 1: lettura e controllo parametri
            if(isset($_REQUEST["optRisposta"]))
                $ris = $_REQUEST["optRisposta"];
            else die("Parametro mancante: optRisposta");

            if(isset($_REQUEST["id"]))
                $id = $_REQUEST["id"];
            else die("Parametro mancante: id");

			// step 2: connessione
            $con = _openConnection("4b_sondaggi");
            
			// step 3: esecuzione query
			$sql = "UPDATE sondaggi SET $ris = $ris + 1 WHERE id=$id";
            $rs = _eseguiQuery($con,$sql);
            
			// step 4: visualizzazione dati
            if($rs)
            {
                echo("<h2 style='margin:15px;'> Grazie per aver votato! </h2>");
            }
            else
                echo("Errore nell'esecuzione della query");
               
            // lancio una seconda query per poter visualizzare i risultati
            $sql2 = "SELECT * FROM sondaggi WHERE id=$id";
            $rs = _eseguiQuery($con,$sql2);
            $nSi = $rs[0]["nSi"];
            $nNo = $rs[0]["nNo"];
            $nNs = $rs[0]["nNs"];
            $totale = $nSi + $nNo + $nNs;
            echo("<h3> Numero totale dei votanti: $totale</h3>");
            echo("<h3> Risposte: </h3>");
            echo("<p> Si: $nSi </p>");
            echo("<p> No: $nNo </p>");
            echo("<p> Non so: $nNs </p>");
            echo("<div style='margin:20px auto; width:400px;'>");
            echo("<canvas id='canvas'> </canvas>");
            echo("</div>");
            echo("<script>creaGrafico($nSi,$nNo,$nNs);</script>");

            // SALVATAGGIO COOKIES SUL CLIENT:
            // nome, true, durata cookie (10 secondi in questo caso), path fisso (x ogni risorsa)
            setcookie("sondaggio-$id","true",time() + 10, "/");

		?>
        
        <?php
			// step 5: chiusura della connessione
			$con->close();
		?>
	</body>
</html>