var data = {
    //Here are the questions and answers directly
    "query":{
        "saca perro":{
            device:"assistant",
            result:"tu mero"
        },
        "cual es tu nombre":{
            device:"assistant",
            result:"mi nombre es Alice"
        },
        "que eres":{
            device:"assistant",
            result:"soy un sistema domotico generico, controlado por una interfaz natural."
        },
    },
    //Here are the posibles actions of the diferents devices
    "order":{
        "prende ese papel":{
            device:"actuator",
            id:'porro',
            result:"prender"
        },
        "enciende la luz de la sala":{
            device:"actuator",
            id:'rele4',
            result:"on1"
        },
        "cual es la temperatura actual":{
            device:"sensor",
            id:'th0',
            result:"getTemperature"
        }
    }
}