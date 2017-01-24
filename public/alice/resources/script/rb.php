<?php

  $cmd = $_GET['cmd'];
  $py = "";
  switch ($cmd) {
    case 'luces':
      $py = "luces";
      break;
    case 'puerta':
      $py = "puerta";
      break;
    case 'cochera':
      $py = "cochera";
      break;
    default:
      $py = "";
      break;
  }
  if($py==""){
    echo "Error";
    return;
  }
  $r = exec("python rb.py ".$py);
  echo $r;

?>
