

:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:-use_module(library(http/http_parameters)).
:-use_module(library(http/http_cors)).

:-http_server(http_dispatch, [port(8080)]).

:- http_handler('/alice', query, []).
:- http_handler('/alice/add', add, []).

:-consult("data.pl").

vname(alice).

query(Request):-
  http_parameters(Request,[q(Query,   [ length >= 2 ])]),
  cors_enable,
  format('Content-type: text/plain~n~n'),
  exec(Query).

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
  format('Short-cut agregado correctamente').

exec(MF):-
  atomic_list_concat(L,' ',MF),
  process(L,F),
  atomic_list_concat(F,' ', Prm),
  format(Prm),!.

exec(MF):-
  atomic_list_concat(L,' ',MF),
  not(process(L,_F)),
  format("ERROR").

send(A,S):- format(S),format(" "),format(A).

process --> ser(Sn),act(Sn).
ser(S) --> [S],{service(S)}.
act(S) --> [A],{action(A,S),service(S),send(A,S)}.
act(S) --> [],{service(S),send("",S)}.
