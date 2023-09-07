# **Menu Frontend**

Simone Arnhold

> <https://github.com/simone-arnhold/Menu-Frontend-Design>
> Demo:
> https://simone-arnhold.github.io/Menu-Frontend-Design/

07\.09\.2023

Design frontend per la facile visualizzazione del menù di un ristorante.

Gli utenti finali della pagina saranno i clienti del ristorante, i quali potranno visionare i piatti offerti dal ristoratore.

Diversi elementi della pagina potranno essere personalizzati dal ristoratore, quali:

- logo del ristorante
- categorie del menu
- sottocategorie
- singole pietanze, “piatti”

Quest’ultimo elemento rappresenta l’unità del menù, il quale conterrà a sua volta i seguenti dati:

- immagine del piatto
- titolo
- lista allergeni
- descrizione
- prezzo

Il design è strutturato principalmente per gli schermi degli smartphone ( larghezza < di 768px per convenzione).

**Struttura**

La navbar in alto contiene logo e tasto per accedere al menù categorie.

La seconda navbar contiene le sottocategorie della categoria selezionata al momento.

La sezione principale, section#contenuto personalizzato contiene tutti gli elementi di tutte le sottocategorie.

A seconda di quale sottocategoria è selezionata, TODO apparirà solo il pannello corrispondente (“.sottocategoria-pannello). La classe “.selezionato” identifica il pannello da visualizzare al momento.

TODO Temporaneo? I pannelli hanno un loro id #tab1, #tab2 ecc.

**div .piatto**

Il div .piatto è l’elemento che contiene tutti i dati della singola pietanza, bevanda ecc.

Esso ha un id univoco #el_000001, #el_000002 ecc. e contiene due “righe”:

- una riga per il contenitore immagine e l’immagine;
- una riga per titolo, allergeni, descrizione, prezzo ecc.

Proposta: i dati del piatto si possono salvare e recuperare in un json dalla struttura simile:

\--

{

“piatti”: {

`	`{

`		`“piatto_id”: “el_003765”,

`		`“url_immagine”: “images/piatti/el_003765.jpg”,

`		`“titolo”:

`		`“descrizione”:

`		`prezzo: 12,

`		`“allergeni”: { "0": 32, "1": 33, "2": 35 }

`	`}

}

}

\--

**L’overlay allergeni**

Premendo sul tasto “i” presente nella descrizione di ogni piatto, si aprirà un overlay con una lista dinamica degli allergeni del piatto. TODO aggiungi popup che identifica meglio che questa è la lista allergeni?

L’overlay contiene una serie di 14 icone (“.overlay-icona) identificate dal parametro “item”, il quale va dai valori 30 a 43 inclusi.

`	`es. <li class="overlay-icona" item="30">

La lista allergeni si potrà recuperare con un dizionario simile:

`	`allergeni_items["el\_003765"] = { "allergeni": { "0": 32, "1": 33, "2": 35 } };

Gli allergeni si “accendono” tramite l’aggiunta della classe “.on”:

`	`es. <li class="overlay-icona **on**" item="36">

### **Features da aggiungere**

- Visualizzare dinamicamente piatti a seconda di quale sottocategoria è selezionata
- Modificare dinamicamente gli allergeni in base
- Possibilità di modificare la lingua, tra italiano a inglese, con la possibilità di aggiungere altre lingue in futuro
- Versione light/dark intercambiabile; possibilità di modificare lo schema colori in altri stili?
