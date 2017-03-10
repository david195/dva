:- dynamic service/1.

service(youtube).
service(google).
service(wikipedia).

:- dynamic action/2.

action(pausa, youtube).
action(detener, youtube).
action(reanudar, youtube).
action(siguiente, youtube).
action(anterior, youtube).

:- dynamic short_cut/2.

short_cut('pon la que sigue','youtube siguiente').
