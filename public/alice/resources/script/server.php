<?php

if(isset($_GET['wikipedia']))
  wikipedia($_GET['wikipedia']);

function wikipedia($title){
  $json = file_get_contents("https://es.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=".$title);
  $txt = json_decode($json);
  //print_r($txt);

  foreach ($txt as $k1 => $v1) {
    foreach ($v1 as $k2 => $v2) {
      foreach ($v2 as $k3 => $v3) {
        echo $v3->extract;
      }
    }
  }
}

?>
