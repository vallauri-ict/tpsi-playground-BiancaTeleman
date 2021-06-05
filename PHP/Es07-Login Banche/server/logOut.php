<?php
    header("content-type:application/json; charset=utf-8");
    session_start();
    session_unset(); // rimuove le variabili di sessione
    session_destroy(); // distruggo la sessione
    echo('{"ris":"ok"}');
?>