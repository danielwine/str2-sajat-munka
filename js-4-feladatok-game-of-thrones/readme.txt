# Feladat
Feladatodként a Trónok harca karaktereivel, azaz a karakterek adataival kell dolgoznod.
Egy JSON-fájl a 3. évad elejéig tartja nyilván az adatokat, szóval nincs spoilerveszély,
csak ha eddig kimaradt az életedből a sorozat.

## Frontend-feladatok
A karakterek adatait egy weboldalon kell megjeleníteni, ehhez különböző funkciókra is
szükség lesz. Minden fájl, amelyre szükséged lesz, letölthető a feladat leírásának a 
végén.

1) HTML és CSS segítségével hozz létre egy hasonló elrendezésű oldalt!
   (Ne használj táblázatot!)
   ...

2) Az ÉLŐ karakterek profilképe és alatta a nevük legyen megjelenítve.
   Mivel ez összesen 48 karakter lesz,  pontosan 6 sorod legyen, soronként 8 karakterrel. 
   (A képen látható, középen lévő gappel ne foglalkozz.) 
   A képek útvonala ott van a JSON-objektumban.

A térkép a "site" nevű mappában található az „assets“-en belül.
A házak ikonja a "houses” mappában található az „assets"-en belül.
Ha bármelyik kép hiányzik, használj egy szabadon választott placeholder image-et.

3) A karakterek megjelenítése név szerint rendezve történjen!

4) Amennyiben egy karakter nevére rákattintok, a jobb oldali sávban jelenjen meg a 
   nagyobb méretű, filmből kivett képe, a karakter neve, a házának a címere (ha van) és
   a rövid leírása.
   ...

5) Amennyiben a keresőmezőbe beírok egy nevet (teljes nevet, kis- és nagybetűk közötti 
különbség nem számít), akkor az adott nevű karakterről jeleníti meg az adatokat.
Amennyiben nincs ilyen név, kiírja: "Character not found".

Plusz:

1. Font Awesome vagy egyéb ikonok használata a keresőmezőnél
2. Használj saját betűkészletet a szövegek megjelenítéséhez
3. A karakterek képeinek/nevének szövege legyen valamilyen effekttel ellátva, 
   amikor föléjük viszem a kurzort
4. A karakterek képeinek/nevének szövege legyen valamilyen effekttel ellátva, 
   amikor az adott karakter van kiválasztva
5. Legyen reszponzív a megjelenés

