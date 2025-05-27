<?php

$t = time();
echo ($t . "<br>");
fwrite($myfile, $t);
$txt = ",";
$txt = "\n";

$result = $_POST["name"];
fwrite($myfile, $result);
echo ($result . "<br>");

$result = $_POST["email"];
fwrite($myfile, $result);
echo ($result . "<br>");


fclose($myfile);



?>