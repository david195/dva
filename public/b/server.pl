:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).

:-http_server(http_dispatch, [port(8080)]).

:- http_handler('/dva', query, []).
:- http_handler('/dva/add', add, []).

:-consult("data.pl").

vname(alice).

query(Request):-
  http_parameters(Request,[q(Query,   [ length >= 2 ])]),
  exec(Query).

query(Request):-
  http_parameters(Request,[q(Query,   [ length >= 2 ])]),
  short_cut(Query,SC),
  exec(SC).

add(Request):-
  http_parameters(Request,[sc(Sc,   [ length >= 2 ]),cmd(Cmd,   [ length >= 2 ])]),
  not(short_cut(Sc,Cmd)),
  not(service(Cmd)),
  assert(short_cut(Sc,Cmd)),
  tell('data.pl'),
  listing(service),
  listing(action),
  listing(short_cut),
  told,
  format('Content-type: text/plain~n~n'),
  format('Short-cut agregado correctamente').

add(Request):-
  http_parameters(Request,[sc(Sc,   [ length >= 2 ]),cmd(Cmd,   [ length >= 2 ])]),
  not(short_cut(Sc,Cmd)),
  service(Cmd),
  assert(service(Sc):-service(Cmd)),
  tell('data.pl'),
  listing(service),
  listing(action),
  listing(short_cut),
  told,
  format('Content-type: text/plain~n~n'),
  format('Short-cut agregado correctamente').

exec(MF):-
  atomic_list_concat(L,' ',MF),
  process(L,F),
  atomic_list_concat(F,' ', Prm),
  format(Prm).

send(A,S):- format('Content-type: text/plain~n~n'),format(S),format(" "),format(A).

process --> ser(Sn),act(Sn).
ser(S) --> [S],{service(S)}.
act(S) --> [A],{action(A,S),service(S),send(A,S)}.
act(S) --> [],{service(S),send("",S)}.
