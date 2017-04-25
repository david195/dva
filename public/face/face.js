window.onload = function() {
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  var tracker = new tracking.ObjectTracker('face');
  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);

  tracking.track('#video', tracker, { camera: true });

  tracker.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    event.data.forEach(function(rect) {
      context.strokeStyle = '#a64ceb';
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = '11px Helvetica';
      context.fillStyle = "#fff";
      context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
      context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      img_check(rect);
    });
  });

  var gui = new dat.GUI();
  gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01);
  gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1);
  gui.add(tracker, 'stepSize', 1, 5).step(0.1);

  var n=0;
  var ctx1;
  var cv1;
  var rn=n_r=n_g=n_b=np=0;

  function img_check(rec){

    if(n==0){
      cv1 = document.getElementById('img1');
      ctx1 = cv1.getContext('2d');
      var img = new Image();
      /*img.src = "fc1.jpg";
      img.width = rec.width;
      img.height = rec.height;
      img.onload = function(){
        ctx1.drawImage(img,0,0);
      }*/
      ctx1.drawImage(video,rec.x+rec.width,rec.y+rec.height,2*rec.width,2*rec.height,0,0,rec.width,rec.height);
    }
    if(n==5){
      var cv2 = document.getElementById('img2');
      var ctx2 = cv2.getContext('2d');
      ctx2.drawImage(video,rec.x+rec.width,rec.y+rec.height,2*rec.width,2*rec.height,0,0,rec.width,rec.height);
      var imageData1 = ctx1.getImageData(0, 0, rec.width, rec.height);
      var data1 = imageData1.data;

      var imageData2 = ctx2.getImageData(0, 0, rec.width, rec.height);
      var data2 = imageData2.data;

      for(x=0;x<imageData1.width;x++){
        for(y=0;y<imageData2.height;y++){

          var components1 = [
              data1[ ( y * imageData1.width + x ) * 4 + 0],
              data1[ ( y * imageData1.width + x ) * 4 + 1],
              data1[ ( y * imageData1.width + x ) * 4 + 2],
              data1[ ( y * imageData1.width + x ) * 4 + 3]
          ]; // [Red, Green, Blue, Alpha] -> [226, 182, 155, 255]

          var components2 = [
              data2[ ( y * imageData2.width + x ) * 4 + 0],
              data2[ ( y * imageData2.width + x ) * 4 + 1],
              data2[ ( y * imageData2.width + x ) * 4 + 2],
              data2[ ( y * imageData2.width + x ) * 4 + 3]
          ]; // [Red, Green, Blue, Alpha] -> [226, 182, 155, 255]
          np++;
          var aux=0;
          if(components1[0]>=components2[0]-10 && components1[0]<=components2[0]+10 ){
            n_r++;
            aux++;
          }
          if(components1[1]>=components2[1]-10 && components1[1]<=components2[1]+10 ){
            n_g++;
            aux++;
          }
          if(components1[2]>=components2[2]-10 && components1[2]<=components2[2]+10 ){
            n_b++;
            aux++;
          };
          //rn+=aux/3;
        }
      }
      n=-1;
      console.log("R: "+(n_r/np)+"G: "+(n_g/np)+"B: "+(n_b/np));
      rn = (n_r+n_g+n_b)/(3*np);
      console.log("pixeles: "+np+" r: "+rn);
      if(rn<0.5)
        console.log("Byeeee");
    }
    n++;
  }
};
