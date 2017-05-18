:- dynamic service/1.

service(youtube).
service(google).
service(wikipedia).
service(home).

action(pausa, youtube).
action(detener, youtube).
action(reanudar, youtube).
action(siguiente, youtube).
action(anterior, youtube).

:- dynamic short_cut/2.

short_cut('pon la que sigue', 'youtube siguiente').
short_cut('pon un himno', 'youtube no cambio santa grifa').
