function google(q){
  url= 'https://www.google.com.mx/search?q='+q;
  window.open(url);
}

function wikipedia(title){
  var url = 'https://es.wikipedia.org/wiki/'+title;
  window.open(url);
}

function youtube(id){
  //$('youtube').src = "http://www.youtube.com/embed/?enablejsapi=1&version=3&listType=search&list="+id;
  switch (id) {
    case "reproducir":
      player.playVideo();
      break;
    case "detener":
      player.stopVideo();
      break;
    case "pausa":
      player.pauseVideo();
      break;
    case "siguiente":
      player.nextVideo();
      break;
    case "anterior":
      player.previousVideo();
      break;
    default:
      player.loadPlaylist({list:id,listType:"search"});
      break;
  }
}
