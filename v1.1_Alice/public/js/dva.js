var dva = function(name){
    console.log(name);
    var socket = io();

    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

    var recognition = new SpeechRecognition();
    var devices,data;

    socket.on('init', function(dataJS){
        responsiveVoice.setDefaultVoice("Spanish Latin American Female");
        data = dataJS
    });   
    
    socket.on('execution', function(data){
        responsiveVoice.speak(data.description);
    });  
    
    //var speechRecognitionList = new SpeechGrammarList();
    //speechRecognitionList.addFromString(grammar, 1);
    //recognition.grammars = speechRecognitionList;
    //recognition.lang = 'en-US';
    //recognition.interimResults = false;
    //recognition.maxAlternatives = 1;
    
    function listen(){
        console.log('escuchando...');
        recognition.start();
    }

    function debug(cmd){
        process(cmd)
    }

    function greet(){
        var txt = 'Hola señor David, mi nombre es Alice, soy el asistente virtual del sistema domótico DeVeA, ¿En que puedo ayudarlo?.'
        responsiveVoice.speak(txt);
    }
    function getData(){return data}

    recognition.onresult = function(event) {
        var r = event.results[0][0].transcript;
        console.log(r);
        process(r);        
    }

    function process(r){
        /*var p = data[r];
        if(p.device == 'assistant'){
            if(p.type == 'question')
                responsiveVoice.speak(p.result);
                //console.log(p.result);
        }
        if(p.device == 'actuator'){
            devices[p.id][p.result]()
        }*/
        r = r.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
        r = r.toLowerCase();
        console.log(r);
        var p = data.query[r];
        if(p == null) p = data.order[r];
        if(p == null){
            console.log("Comando no encontrado");
            //Preguntar si se desea vincular

        }else{
            if(p.device == 'assistant'){
                console.log(p.exec);
                responsiveVoice.speak(p.exec);
            }
            if(p.device == 'actuator' || p.device=='sensor'){
                socket.emit('cmd', p);
            }
        }
    }

    recognition.onspeechend = function() {
        recognition.stop();
      }
    
    recognition.onerror = function(event) {
        console.log('Error occurred in recognition: ' + event.error);
        document.getElementById('log').innerHTML = 'Error: ' + event.error;
    }
    
    recognition.onaudiostart = function(event) {
        //Fired when the user agent has started to capture audio.
        console.log('SpeechRecognition.onaudiostart');
    }
    
    recognition.onaudioend = function(event) {
        //Fired when the user agent has finished capturing audio.
        console.log('SpeechRecognition.onaudioend');
    }
    
    recognition.onend = function(event) {
        //Fired when the speech recognition service has disconnected.
        console.log('SpeechRecognition.onend');
    }
    
    recognition.onnomatch = function(event) {
        //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
        console.log('SpeechRecognition.onnomatch');
    }
    
    recognition.onsoundstart = function(event) {
        //Fired when any sound — recognisable speech or not — has been detected.
        console.log('SpeechRecognition.onsoundstart');
    }
    
    recognition.onsoundend = function(event) {
        //Fired when any sound — recognisable speech or not — has stopped being detected.
        console.log('SpeechRecognition.onsoundend');
    }
    
    recognition.onspeechstart = function (event) {
        //Fired when sound that is recognised by the speech recognition service as speech has been detected.
        console.log('SpeechRecognition.onspeechstart');
    }
    recognition.onstart = function(event) {
        //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
        console.log('SpeechRecognition.onstart');
        document.getElementById('log').innerHTML = 'listening...';
    }
      
    return {
        listen:listen,
        greet: greet,
        getData:getData,
        debug:debug
    }
}