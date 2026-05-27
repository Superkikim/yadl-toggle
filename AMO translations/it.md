### 🇮🇹 Italiano (it)

**Dark Light System Toggle**

Passa tra tema scuro, chiaro o sistema con un solo clic — oppure usa Ctrl+Maiusc+L.  
L'icona mostra la modalità attiva e un popup conferma brevemente l'opzione selezionata.

**Per Firefox versione ≥ 95**

**Perché questo?**
- **3 modalità:** scura, chiara e sistema (segue le impostazioni dell'OS) — la maggior parte delle estensioni simili ne offre solo 2
- **API nativa di Firefox** (`overrideContentColorScheme`) — nessuna iniezione CSS, funziona in modo affidabile su tutti i siti
- **Zero permessi invasivi** — solo `storage` e `browserSettings`, nient'altro

**⚠️ Nota importante**  
Questa estensione funziona solo con siti web che supportano sia il tema scuro che quello chiaro tramite tecnologie web standard.  
Se un sito non supporta il tema scuro, l'estensione non può forzarlo.

Gli sviluppatori possono scegliere di implementare entrambi i temi. Se non lo fanno, l'estensione non può compensare.  
Non esiste un metodo affidabile per rilevarlo in anticipo. Se il toggle non ha effetto, significa che il sito non supporta la funzione.  
**Si prega di indirizzare la frustrazione di conseguenza.**

**Estensione minimale**  
Questa è l'estensione più semplice possibile, con i permessi minimi necessari.

Cliccando sull'icona nella barra degli strumenti si alternano le preferenze di colore per i contenuti del browser tra:

- colori scuri
- colori chiari
- colori di sistema (scuri o chiari)

È possibile abilitare o disabilitare i valori nel ciclo dalle impostazioni dell'estensione.

Un piccolo popup conferma brevemente la modalità selezionata. Appare dopo il clic e si chiude automaticamente dopo un secondo.

**Supporto ai siti web**  
Questa estensione si basa sul fatto che i siti web forniscano fogli di stile propri per temi chiari e scuri, ad esempio DuckDuckGo.  
Sempre più siti supportano questa funzione, ma alcuni (es. Google, GitHub, StackOverflow) potrebbero richiedere l'attivazione manuale per ereditare i colori del browser.

## Licenza e crediti

Questo progetto è rilasciato sotto licenza MIT.  
Basato su [Toggle Dark Mode](https://github.com/Cimbali/toggle-dark-mode) di Cimbali, originariamente pubblicato sotto licenza WTFPL.

---
*Ti è stato utile? Lascia una valutazione ⭐ — aiuta davvero!*
