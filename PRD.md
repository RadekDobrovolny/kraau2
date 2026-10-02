# KRAAU — druhý digitální prototyp

**Product Requirements Document · verze 1.0 · 2. října 2026**  
**Rozsah:** P0 + P1; architektonická příprava pro P2.  
**Stav:** návrh připravený pro rozpad na implementační úkoly.  
**Adresáti:** produktový garant, metodický garant rámce, designér, vývojář a editor obsahu.

## 1. Účel a způsob použití dokumentu

Cílem druhého prototypu je převést digitální rámec z přehledné publikace na nástroj, který pomáhá uživateli najít relevantní kritérium, porozumět rozdílům mezi podobami profesního jednání a připravit další krok v praxi.

Hlavní cesta je **situace z praxe → relevantní kritéria ↔ popisy úrovní ↔ ukázky → reflexní otázka → další krok**. Vedle ní zůstává plnohodnotná cesta **oblast → kompetence → kritérium**.

Dokument je samostatné zadání. Obsahuje produktová pravidla, specifikaci obrazovek včetně textových wireframů, datový model, technická rozhodnutí, backlog i podmínky převzetí. Případné vizuální návrhy vznikající později musí zachovat zde popsané chování.

### 1.1 Podklady a hranice jistoty

- Produktový podklad: UX analýza vložená do zadání. Původní web, jeho repozitář ani autoritativní PDF nebyly pro tento dokument dodány a auditovány.
- Údaj **6 oblastí / 19 kompetencí / 61 kritérií** přebíráme z analýzy jako očekávanou vstupní strukturu; při importu jej musí potvrdit metodický garant. Počty v UI se vždy počítají z publikovaných dat.
- Názvy, kódy kritérií a ukázkové formulace z analýzy jsou pracovní příklady, nikoli ověřené přepisy rámce. Nesmějí se bez ověření stát publikovaným obsahem.
- Navržené štítky, mikrotexty, rozvržení a technická řešení jsou rozhodnutí tohoto PRD. Pedagogické interpretace a mapování situací podléhají metodické kontrole.
- Hostingové možnosti byly ověřeny v oficiální dokumentaci k 2. 10. 2026; odkazy jsou v kapitole 19. Neproběhl praktický deployment ani benchmark Django.

### 1.2 Závaznost

„Musí“ znamená podmínku převzetí dané fáze. „Doporučení“ lze změnit zdokumentovaným rozhodnutím. P0 je první implementační milník; druhý prototyp je dokončen až po P1 a obsahovém i uživatelském ověření. P2 je budoucí rozšíření, nikoli součást dodávky.

## 2. Produktové cíle a principy

### 2.1 Cíle

1. Člověk bez znalosti struktury rámce najde relevantní obsah podle běžně formulované situace.
2. Člověk se znalostí kódu nebo názvu najde kritérium přímo a může na něj odkázat.
3. Uživatel rozumí rozdílům mezi úrovněmi a dokáže je vztáhnout ke konkrétní situaci.
4. Ukázky propojují abstraktní popis s pozorovatelným jednáním a důkazy.
5. Každý detail nabízí konkrétní další aktivitu odpovídající roli uživatele.
6. Budoucí soukromé portfolio lze přidat bez změny identity obsahu a veřejných permalinků.

### 2.2 Pedagogická a UX pravidla

- Úrovně popisují jednání v kontextu. Nejsou známkou člověka, diagnózou ani žebříčkem.
- Žádný součet, průměr, procento dokončenosti kompetence, leaderboard ani radar kompetencí.
- Čísla 0–3 zůstávají kvůli návaznosti na zdroj, ale vizuálně dominují popisy jednání. Nepřidávat neověřené názvy typu „expert“.
- Žádná škála červená–zelená, hvězdičky, medaile či automatické doporučení „správné“ úrovně.
- Vyšší číslo samo o sobě neznamená vhodnější jednání v každé situaci. Metodický text musí vysvětlit kontext a opřít se o oficiální metodiku.
- Oficiální text rámce, redakční interpretace a autorská ukázka jsou vizuálně i datově oddělené.
- Základní obsah je veřejně dostupný bez účtu. Role je volitelný kontext, nikoli oprávnění.
- Úvod ukazuje možnosti vstupu a šest oblastí; celý seznam kritérií se nezobrazuje automaticky.
- Každá zobrazovaná akce skutečně funguje. Ukládání a osobní poznámky se objeví až v P2.

### 2.3 Co druhý prototyp neobsahuje

Účty koncových uživatelů, osobní záznamy, ukládání kritérií, formulář sebereflexe, cíle, historii, portfolio, sdílení soukromých dat, automatické hodnocení, AI chat, generování interpretací za běhu, embeddingové vyhledávání, uploady uživatelů a vlastní video platformu. P0/P1 neobsahují ani veřejný redakční CMS; obsah spravují editoři prostřednictvím souborů a schvalování změn.

## 3. Uživatelé a klíčové scénáře

| Uživatel | Potřeba | Úspěšné dokončení v P0/P1 |
| --- | --- | --- |
| Studující učitelství | Porozumět konkrétní situaci z praxe | Najde kritérium, porovná jednání, pojmenuje otázku pro příští hodinu |
| Provázející učitel | Připravit rozhovor a zpětnou vazbu | Najde relevantní deskriptory, ukázku a otázky; zkopíruje odkaz |
| VŠ vzdělavatel / didaktik | Propojit kurz a praxi s rámcem | Projde strukturu, vysvětlí úrovně, odkáže na kritérium či ukázku |
| Učitel pracující samostatně | Hledat inspiraci a reflektovat výuku | Použije neutrální režim bez nutnosti přiřazení k jiné roli |
| Editor / metodický garant | Udržet obsah přesný a dohledatelný | Zkontroluje změnu, zdroj a vazby před publikací |

### 3.1 Scénáře pro návrh a testování

**S1 — „Žáci se nezapojují.“** Úvod → hledání situace → relevantní kritéria s důvodem nalezení → detail → porovnání dvou sousedních úrovní → ukázka → otázka „Čeho si příště všimnout?“. Výsledky musí být schváleny metodikem; podobná situace může mít více příčin.

**S2 — „Potřebuji konkrétní kritérium.“** Zadání přesného kódu → odpovídající výsledek na prvním místě → detail s breadcrumbem → kopie odkazu. Kód nemusí uživatel zadávat s diakritikou ani názvem.

**S3 — „Reflektuji pozorovanou hodinu se studentem.“** Vstup podle potřeby → stručný průvodce pozorováním → hledání → detail → otázky pro provázejícího učitele. Průvodce vede od popisu situace k důkazům a dalšímu kroku, ale nic neukládá.

**S4 — „Přišel jsem přes odkaz od vyučujícího.“** Přímý odkaz na konkrétní úroveň nebo ukázku → vysvětlení kontextu → možnost otevřít celé kritérium a oblast. Není vyžadován průchod homepage.

**S5 — „Chci poznat celý rámec.“** Úvod → šest oblastí → kompetence jedné oblasti → kritéria jedné kompetence. Uživateli zůstává zřejmé, kde je a jak se vrátit.

## 4. Rozsah a návaznost priorit

| ID | Požadavek | Fáze | Hlavní výstup |
| --- | --- | --- | --- |
| P0-01 | Homepage podle potřeby a šest oblastí | P0 | Úvod se dvěma rovnocennými cestami |
| P0-02 | Postupné odkrývání struktury | P0 | Přehled rámce, oblast a kompetence |
| P0-03 | Breadcrumb a stabilní permalinky | P0 | Kontext na každém detailu a mapa přesměrování |
| P0-04 | Nový detail kritéria | P0 | Deskriptory, mindset, otázky, další krok |
| P0-05 | Vizuální porovnání čtyř úrovní | P0 | Všechny úrovně + porovnání libovolné dvojice |
| P0-06 | Výrazné hledání | P0 | Kód, text, základní kurátorovaná synonyma a situace |
| P0-07 | Obsahový model, tagy a ilustrátory | P0 | Validovaný datový balíček a vazby M:N |
| P1-08 | Filtrování | P1 | Sdílitelná kombinace dotazu a filtrů |
| P1-09 | Významové rozdíly mezi úrovněmi | P1 | Schválené přechody 0→1, 1→2 a 2→3 |
| P1-10 | Kontext role | P1 | Volitelné přizpůsobení otázek a doporučených akcí |
| P1-11 | Ukázky z praxe | P1 | Katalog, detail, metadata, komentované vazby |
| P1-12 | Příbuzná kritéria | P1 | Redakčně zdůvodněné odkazy |
| P1-13 | Sdílení | P1 | Odkaz na kritérium, úroveň, porovnání, ukázku a hledání |

Základní permalink kritéria patří již do P0. P1 přidává pohodlné kopírování a serializaci konkrétního zobrazení. P0 připravuje data ukázek a ověřovací fixture; skutečný katalog ukázek se publikuje v P1. „Interakce“ v P0/P1 znamená výběr zobrazení, nikoli zápis vlastního hodnocení.

## 5. Informační architektura a URL

### 5.1 Navigace

Hlavní navigace v P1: **Rámec · Ukázky z praxe · Jak s rámcem pracovat · Hledat**. Logo odkazuje na úvod. V P0 se nepřipravený katalog neobjevuje jako nefunkční položka. Sekundární navigace: **Úrovně · O projektu · Zdrojové dokumenty · Přístupnost a soukromí**.

Volba role je v P1 malý ovládací prvek „Používám rámec jako…“ v horní uživatelské oblasti. Nepřebíjí hledání. Výchozí režim je „Bez výběru role“ a funguje bez omezení.

| Stránka | Navržená URL | Fáze |
| --- | --- | --- |
| Úvod | `/` | P0 |
| Přehled rámce | `/ramec/` | P0 |
| Oblast | `/ramec/oblasti/{areaCode}/` | P0 |
| Kompetence | `/ramec/kompetence/{competencyCode}/` | P0 |
| Kritérium | `/ramec/kriteria/{criterionCode}/` | P0 |
| Jedna úroveň | `/ramec/kriteria/{code}/?uroven=2#urovne` | P1 |
| Porovnání | `/ramec/kriteria/{code}/?porovnat=1,2&rozdily=1#urovne` | P1 |
| Hledání | `/hledat/?q=...` | P0 |
| Hledání s filtry | `/hledat/?q=...&oblast=...&faze=...&tema=...&typ=...` | P1 |
| Ukázky | `/ukazky/` | P1 |
| Ukázka | `/ukazky/{stablePublicId}/` | P1 |
| Metodika a průvodce | `/jak-pracovat/` a `/jak-pracovat/{scenarioSlug}/` | P0 |
| Vysvětlení úrovní | `/urovne/` | P0 |
| Projekt a zdroje | `/o-projektu/`, `/zdroje/` | P0 |
| Chybová stránka | skutečná HTTP 404 | P0 |

Použít stávající URL, pokud existují a dávají smysl. Uvedené cesty jsou cílová konvence pro nové stránky. Před implementací se vytvoří inventář původních URL a explicitní mapa trvalých přesměrování. Kód je čitelný veřejný alias, interní stabilní ID se nemění ani při přečíslování. Změna názvu nesmí měnit permalink.

## 6. Společný design a komponenty

### 6.1 Vizuální směr

Klidný pracovní nástroj pro čtení a rozhovor. Světlé neutrální pozadí, tmavý text, dostatek prostoru, minimum dekorací. Barevně rozlišovat oblasti, nikoli kvalitu úrovní. Číslo a název oblasti jsou vždy přítomné i bez barvy.

Navržené tokeny: mezery 4/8/12/16/24/32/48/64 px, základní písmo 18 px a řádkování 1,55; pomocný text nejméně 14 px. Obsah do šířky 1200 px, souvislé čtení 65–75 znaků na řádek. Písmo systémové nebo lokálně hostované s českými znaky. Zakulacení karet 8–12 px. Akcenty oblastí a stavy focusu ověřit kontrastním testem před schválením.

### 6.2 Responzivita

| Režim | Šířka | Pravidla |
| --- | --- | --- |
| Mobil | pod 768 px | Jeden sloupec, okraje 16 px, nabídka pod tlačítkem, filtry v rozbalovacím panelu |
| Tablet | 768–1199 px | Dvě karty v řadě, čtení na plnou dostupnou šířku |
| Desktop | od 1200 px | Oblasti a potřeby po třech; čtyři úrovně vedle sebe; hledání s postranními filtry |

Výchozí breakpointy jsou návrhové, rozhodující je čitelnost skutečných deskriptorů. Dlouhý obsah se nezkracuje pomocí pevné výšky ani výpustky. Při zvětšení na 200 % se rozvržení zalomí. Mobil nesmí vyžadovat vodorovné posouvání celé stránky.

### 6.3 Komponenty a chování

| Komponenta | Obsah a interakce |
| --- | --- |
| GlobalHeader | Logo, navigace, hledání; v P1 role. Mobilní menu vrací focus na spouštěcí tlačítko |
| Breadcrumbs | Domů → Rámec → oblast → kompetence → kritérium; aktuální položka není odkaz |
| SearchBox | Viditelný label „Co ve výuce řešíte?“, příklad v placeholderu, tlačítko „Hledat“ |
| NeedCard | Název potřeby, jedna věta, jediný srozumitelný odkaz |
| AreaCard | Kód, ověřený název, krátký redakční popis, počty kompetencí/kritérií |
| CriterionCard | Kód, název, oblast/kompetence, krátký relevantní úryvek; v hledání také důvod shody |
| LevelCard | Malé číslo, celý oficiální deskriptor, případný schválený orientační titulek |
| ComparisonControls | Všechny úrovně / dvojice; dvě pojmenované volby; v P1 přepnutí zvýraznění |
| FilterGroup | Viditelný název, checkboxy, počty, možnost vše vymazat |
| Tag | Buď pasivní štítek, nebo jasně identifikovatelný odkaz do hledání; ne obojí současně |
| ExampleCard | Typ, název, kontext, délka/rozsah, související kritéria; skutečná miniatura nebo ikona typu |
| MindsetBlock | Princip, rozbalení „Proč je tu mindset?“, reflexní otázka |
| NextStepPanel | 2–3 relevantní funkční akce, odlišené od navigace na další kritérium |
| ShareControl | Kopie URL; potvrzení „Odkaz zkopírován“; při chybě označitelný text URL |
| EmptyState | Co chybí, proč, co lze udělat dále; žádný slepý konec |

Na každé stránce je odkaz „Přeskočit na obsah“. Akordeony používají sémantické ovladače se stavem rozbalení. Počty výsledků a potvrzení kopírování oznamuje přístupný stavový region. Aktivní stav nesmí být vyjádřen pouze barvou.

## 7. Typy stránek a textové wireframy

Tabulky níže určují pořadí bloků shora dolů; popis desktop/mobil určuje jejich prostorové uspořádání. Jsou závaznou obsahovou kostrou, nikoli finálním grafickým stylem.

### 7.1 Homepage — P0-01

**Primární úkol:** vybrat cestu podle potřeby nebo tématu. Sekundární: začít procházet rámec.

| Pořadí | Blok | Desktop | Mobil |
| --- | --- | --- | --- |
| 1 | Hlavička | Společná navigace | Logo, hledání, menu |
| 2 | Úvod | H1 „Rámec pro porozumění vlastní výuce“, stručná věta o účelu, výrazné hledání do 760 px | Nadpis, jedna věta, hledání přes šířku |
| 3 | „S čím dnes potřebujete pracovat?“ | Šest karet, mřížka 3 × 2 | Šest krátkých karet pod sebou |
| 4 | „6 oblastí učitelské praxe“ | Šest oblastí, mřížka 3 × 2 | Jeden sloupec |
| 5 | Jak číst rámec | Tři krátké kroky: situace, jednání, další krok; odkaz na úrovně | Stejné pořadí pod sebou |
| 6 | Ukázky z praxe | Až P1, tři vybrané publikované ukázky a odkaz do katalogu | Karty pod sebou, bez karuselu |
| 7 | Zápatí | Metodika, zdroje, projekt, verze rámce | Skupiny odkazů pod sebou |

Text pod H1: „Najděte téma ze své praxe, porovnejte popisy profesního jednání a promyslete další krok.“ Jde o navržený produktový mikrotext, nikoli citaci rámce.

| Potřeba | Cíl odkazu | Co uživatel dostane |
| --- | --- | --- |
| Chci najít konkrétní téma | `/hledat/` | Aktivní hledání a náměty situací |
| Chci prozkoumat rámec | `/ramec/` | Šest oblastí |
| Chci reflektovat svoji výuku | `/jak-pracovat/vlastni-vyuka/` | Krátký postup a vstup do hledání |
| Pozoroval/a jsem výuku někoho jiného | `/jak-pracovat/pozorovani/` | Rozlišení popisu a interpretace, hledání kritérií |
| Připravuji zpětnou vazbu studentovi | `/jak-pracovat/zpetna-vazba/` | Příprava rozhovoru a reflexní otázky |
| Chci si stanovit rozvojový krok | `/jak-pracovat/dalsi-krok/` | Návod, jak zvolit malé pozorovatelné jednání |

Průvodci v P0/P1 jsou obsahové stránky. Nemají pole pro osobní data ani tlačítko „Uložit cíl“. Pokud názvy karet při testování slibují více, doplnit vysvětlení „Průvodce reflexí“ přímo do karty.

**Převzetí:** na homepage se neobjevuje seznam všech kritérií; všech šest vstupů má funkční cíl; hledání je v úvodní části na desktopu i mobilu; počty oblastí vycházejí z dat.

### 7.2 Přehled rámce, oblast a kompetence — P0-02/03

**Přehled rámce:** H1, jednoodstavcové vysvětlení struktury, šest AreaCard. Volitelný odkaz „Zobrazit úplný přehled“ otevře explicitně vyžádaný seznam; nesmí být výchozím stavem.

**Oblast:** breadcrumb → číslo a oficiální název → krátký význam oblasti → karty kompetencí s počty kritérií → odkaz na metodiku. Desktop dvousloupcové karty, mobil jeden sloupec. Kritéria uvnitř kompetence lze odkrýt akordeonem; název kompetence je zároveň samostatný odkaz na její stránku, nikoli dvojznačné tlačítko.

**Kompetence:** breadcrumb → název → oficiální popis, existuje-li → seznam kritérií → související ukázky v P1 → předchozí/další kompetence. Celé názvy kritérií, žádné zkrácení jen na kódy.

Otevřené akordeony se při návratu tlačítkem Zpět obnoví pomocí historie stránky nebo session state. Vypnutý JavaScript musí umožnit průchod přes samostatné stránky.

**Převzetí:** z přehledu je každé kritérium dostupné nejvýše třemi kliknutími; přímé načtení oblasti a kompetence funguje; počet kritérií na kartě odpovídá obsahu; breadcrumb je správný i po vstupu z hledání.

### 7.3 Detail kritéria — P0-04/05 a P1-09/10/11/12/13

Tato stránka je hlavní pracovní obrazovka. Má používat šířku celé obsahové plochy pro srovnávání, užší sloupec pro souvislé vysvětlení.

| Pořadí | Blok | Obsah a rozvržení |
| --- | --- | --- |
| 1 | Breadcrumb | Rámec → oblast → kompetence → kód kritéria |
| 2 | Identita | Kód a H1, název kompetence, štítky témat v P1; sdílení vedle nadpisu na desktopu |
| 3 | Kontext | Jedna věta „Popisy vztahujte ke konkrétní situaci, ne k hodnocení člověka.“ + odkaz „Jak rozumět úrovním“ |
| 4 | Úrovně | H2 „Jak může profesní jednání vypadat“; ovladače; celé deskriptory |
| 5 | Rozdíl mezi úrovněmi | P1: schválený komentář pro vybranou sousední dvojici, včetně toho, čeho si všimnout |
| 6 | Ukázky | P1: relevantní karty s uvedením, které jednání a úroveň ilustrují |
| 7 | Mindset | „Co stojí za jednáním“, oficiální princip a vysvětlení pojmu |
| 8 | Reflexní otázky | Tři základní otázky; v P1 případná role-specifická varianta |
| 9 | Co dál | Metodický postup, ukázky, příbuzné kritérium; jen dostupné akce |
| 10 | Související kritéria | P1: 2–4 odkazy s vysvětlením vztahu, pokud existují |
| 11 | Navigace a zdroj | Předchozí/další v kompetenci, návrat na kompetenci, verze a odkaz na přesnou část zdroje |

#### Zobrazení úrovní

- Výchozí desktop: čtyři stejně široké karty 0–3, čitelné celé texty. Žádná karta není „doporučená“.
- Tablet: mřížka 2 × 2 v pořadí 0, 1, 2, 3.
- Mobil: všechny čtyři texty pod sebou. Ovladač „Porovnat dvě úrovně“ je před nimi. Nevyžadovat přejetí gestem ani horizontální scroll.
- Režim dvojice: dvě volby úrovní; desktop dvě karty vedle sebe, mobil dvě za sebou s jasnými nadpisy. Lze porovnat jakékoli dvě odlišné úrovně. Shodná dvojice se odmítne s vysvětlením.
- Číslo v kartě funguje jako odkaz na úroveň až v P1. Kliknutí na kartu nezapisuje sebehodnocení.
- Přímý odkaz `?uroven=2` zvýrazní cílový deskriptor neutrálním obrysem, ostatní zůstávají dostupné. Nápis „Zobrazená úroveň“, nikoli „Vaše úroveň“.
- Na úzkém displeji se po změně dvojice focus nepřesouvá bezdůvodně; změna se oznámí čtečce. Při přímém odkazu je sekce uvedena do zorného pole bez zakrytí hlavičkou.

#### Významové rozdíly — P1-09

Ovladač „Zvýraznit podstatné rozdíly“ zapíná schválené zvýraznění frází v původních textech. Výchozí stav je vypnuto. Zvýraznění nepoužívá editorský červenozelený diff.

Pod dvojicí je panel „Co se mezi těmito popisy mění“: 1–3 významové body, otázka k pozorování a případný odkaz na ukázku. Text má označení „Metodický komentář“. Vychází z konkrétních deskriptorů a je schválen metodikem; nejde o automatický návod na povinný lineární postup.

Pro nesousední dvojice zůstává porovnání plných textů; komentář se zobrazí jen tehdy, byl-li zvlášť schválen. Jinak text „Pro tuto dvojici není zpracovaný metodický komentář.“ Není dovoleno skládat komentář interpolací. Pro všechny publikované kriteriální přechody 0→1, 1→2, 2→3 je v cílovém P1 požadován schválený obsah; při 61 kritériích jde o 183 přechodů.

#### Mindset a reflexe

Vysvětlení po rozbalení: „Deskriptory popisují jednání. Mindset pojmenovává profesní přesvědčení, které za ním stojí.“ Metodický garant upraví formulaci podle zdroje. Chybějící oficiální mindset se nesmí doplnit neoznačeným autorským textem.

Výchozí reflexní otázky, určené ke schválení:

1. Co se v konkrétní situaci odehrálo a o jaké pozorování se opírám?
2. Který popis pomáhá této situaci porozumět a co o ní zatím nevím?
3. Co příště zkusím a podle čeho poznám, co se změnilo?

V P1 role mění pouze doprovodné otázky a pořadí doporučených akcí. Studující: „Co bych mohl/a příště vyzkoušet?“ Provázející: „Na co se studujícího zeptat, abych porozuměl/a jeho rozhodnutí?“ VŠ vzdělavatel: „Jak toto jednání propojit s cíli praxe nebo kurzu?“ Každá varianta má neutrální fallback.

**Převzetí:** plný oficiální text se nezmění při přepnutí role, porovnání ani zvýraznění; všechna čtyři čísla jsou dostupná; není přítomno ukládání sebehodnocení; zdroj je dohledatelný; další krok vede na skutečný obsah. Chybějící ukázka neblokuje práci s kritériem.

### 7.4 Vyhledávání — P0-06 a P1-08

| Pořadí | Blok | Desktop | Mobil |
| --- | --- | --- | --- |
| 1 | H1 a hledání | „Co ve výuce řešíte?“ + vstup a tlačítko | Totéž přes šířku |
| 2 | Náměty / aktivní stav | Při prázdném dotazu situace; jinak štítky aktivních filtrů | Stejné, zalamované |
| 3 | Filtry a výsledky | Levý sloupec 260 px, pravý výsledky | Rozbalovací panel filtrů nad výsledky |
| 4 | Seznam | Počet, řazení „Podle relevance“, karty, 20 výsledků na stránku | Karty pod sebou, přístupné stránkování |
| 5 | Pomoc | Tip přeformulovat dotaz nebo procházet rámec | Totéž |

P0 má vyhledávání v kritériích bez bočního panelu; P1 přidává ukázky a filtry. Hledání nepracuje jako autocomplete osobních dat. Odeslání Enterem nebo tlačítkem aktualizuje URL a výsledky. Prototyp nemusí vyhledávat při každém úhozu.

#### Pole, filtry a logika

| Filtr | Výběr | Hodnoty / pravidla |
| --- | --- | --- |
| Oblast | Více hodnot | Oficiální oblasti z dat |
| Fáze výuky | Více hodnot | Plánování, realizace, reflexe; kritérium může mít více fází |
| Téma | Více hodnot | Spravovaný slovník: např. komunikace, bezpečí, hodnocení, diferenciace; finální seznam schválí metodik |
| Typ obsahu | Více hodnot | Kritéria, ukázky |
| Typ ukázky | Více hodnot | Video, transkript, příprava, reflexe, artefakt, foto |

Uvnitř jedné skupiny platí OR, mezi skupinami AND. Volba typu ukázky nastaví typ obsahu na ukázky a tuto změnu viditelně zobrazí; nepřipustí se skrytý konflikt s „pouze kritéria“. Filtrování se provede po stisku „Použít filtry“; změny před potvrzením jsou rozpracovaný stav. „Vymazat filtry“ zachová dotaz, „Vymazat vše“ odstraní i dotaz. Změna dotazu nebo filtrů vrací stránkování na první stranu. Počty u voleb zohledňují dotaz a ostatní skupiny, ne vlastní skupinu.

Na mobilu je panel v toku stránky, nikoli modal. Ušetří správu focusu a zůstává snadno ovladatelný. Aktivní filtry a jejich počet jsou viditelné i po sbalení.

#### Hledání a relevance

Pro desítky kritérií doporučujeme statický lokální index v prohlížeči a deterministické pořadí. Nevytvářet server ani AI jen kvůli hledání.

1. Přesná shoda kódu má absolutní prioritu v nefiltrovaném výsledku.
2. Následují shody v názvu a kurátorované přiřazení konkrétní situace.
3. Poté synonyma a tagy, jména kompetencí/oblastí.
4. Nakonec deskriptory, mindset, redakční komentáře a publikované texty ukázek.

Normalizace: lowercase, trim, sjednocení mezer a hledání bez diakritiky; původní text se zobrazuje beze změny. Kódy rozpoznat odděleně od běžných slov. České tvary řešit explicitními aliasy, ne tvrzením o plné lemmatizaci. Případná fuzzy shoda smí být jen doplňková a nesmí narušit přesné hledání kódu.

V P0 vznikne nejméně 10 ověřených situací s aliasy a odůvodněnými vazbami; P1 nejméně 20. Například „žáci se nezapojují“, „nikdo neodpovídá“, „nevím, jak dát zpětnou vazbu“. Skutečné cílové kódy určí metodik nad oficiálním rámcem. Negativní dotazy typu „žáci se nebojí chyb“ musí být součástí testů, aby mechanická shoda nevydávala opačný význam za přesnou odpověď.

Každý výsledek obsahuje kód/název, typ, kontext, relevantní úryvek a důvod: „Souvisí s tématem zapojování žáků“ nebo „Shoda v popisu jednání“. Neprezentovat algoritmické skóre jako pedagogickou relevanci.

#### Stavy

- Bez dotazu a filtrů: náměty situací a vstup do rámce, nikoli všech 61 výsledků.
- Bez dotazu, ale s filtrem: všechny odpovídající položky podle přirozeného pořadí rámce; ukázky podle redakčního pořadí, pak stabilního ID.
- Nula výsledků: zopakovat dotaz, nabídnout odstranění filtrů, kratší výraz a rámec. Nevymýšlet odpověď.
- Načítání indexu: text „Připravuji vyhledávání…“; při chybě opakování a odkaz do rámce.
- Neznámý parametr: ignorovat neplatnou hodnotu, zachovat platné a sdělit, že část filtru není dostupná.
- Vypnutý JavaScript: vysvětlení, že hledání vyžaduje JavaScript, a funkční odkaz na úplný přehled rámce.

**Převzetí:** stejné URL vrací stejné nastavení; Zpět obnoví dotaz, filtry i stránku; hledání bez diakritiky funguje; přesný kód s aktivním vylučujícím filtrem nepřekoná filtr, ale nulový výsledek nabídne jeho zrušení.

### 7.5 Ukázky z praxe — P1-11

**Katalog:** H1 → vysvětlení, jak ukázky číst → hledání a filtry → karty → stránkování. Využívá stejný index a filtrovací logiku jako hledání, s pevným typem „ukázky“. Navíc lze filtrovat kontext: předmět, stupeň školy a věkovou skupinu. Hodnoty jsou pouze z publikovaných metadat. Úroveň není hlavním filtrem katalogu; patří ke konkrétní vazbě ukázky a kritéria.

**Detail ukázky, pořadí bloků:**

1. Breadcrumb „Ukázky z praxe → název“, název, typ, délka/rozsah, sdílení.
2. Kontext: předmět, věk/stupeň, situace, okolnosti nutné pro porozumění. Neidentifikovat žáky.
3. „Čeho si všimnout“: 1–3 otázky před zhlédnutím nebo čtením.
4. Média či dokument; video bez autoplay, titulky a textová alternativa. Na mobilu přes šířku, poměr stran zachován.
5. Komentované vazby na kritéria: kód, konkrétní úroveň, důkaz nebo časový úsek a vysvětlení, proč ukázka dané jednání ilustruje.
6. „Co z této ukázky nelze vyvodit“: limity výřezu a kontextu.
7. Reflexní otázky, související ukázky, další krok.
8. Autor, zdroj, licence či oprávnění k použití, verze a datum metodické revize.

Jedna ukázka může mít více vazeb na různá kritéria a jejich různé úrovně. Nikdy nemá jediné globální číslo úrovně. Každá vazba musí mít vlastní komentář. Dokument musí mít čitelný HTML souhrn; zásadní obsah nesmí být přístupný pouze stažením PDF.

Minimální obsah pilotního P1: **6 schválených ukázek**, alespoň 3 různé typy a 3 oblasti; alespoň 2 ukázky ilustrují více kritérií. Video není povinné, pokud nejsou vyřešená práva. Modelová situace vytvořená autorem je viditelně označená; nesmí předstírat záznam reálné výuky.

Stavy: žádná relevantní ukázka → „K tomuto kritériu zatím nemáme publikovanou ukázku“ a odkaz do katalogu; nedostupné médium → zachovat komentář a přepis, sdělit problém; stažená ukázka → vysvětlující stránka bez původních médií a funkční návrat, podle okolností HTTP 410.

### 7.6 Metodika, úrovně, projekt a zdroje

**Jak s rámcem pracovat:** účel, volba potřeby, v P1 role, průvodci a odkazy. Jednotlivý průvodce má H1, pro koho/na jak dlouho, 3–5 kroků, příklad otázky a odkaz do hledání. Doporučené pořadí je popis situace → pozorování → přiřazení kritérií → porovnání → další krok.

**Úrovně:** co popisují, co z nich nelze odvozovat, jak pracovat s kontextem, proč nejde o známky, příklad porovnání a odkaz zpět do rámce. Jedna ilustrace nesmí vytvářet univerzální význam čísel platný pro všechna kritéria.

**O projektu:** účel, autorství a odpovědnosti, stav prototypu, způsob zaslání podnětu prostřednictvím existujícího kontaktu. Kontakt nedoplňovat odhadem.

**Zdroje:** oficiální dokumenty s názvem, vydáním, datem, odkazem a vztahem k digitální verzi. Odkaz z kritéria má pokud možno mířit na stranu/sekci; jinak uvede číslo strany textem.

**404:** stručná informace, hledání, přehled rámce. Nevracet univerzální SPA s HTTP 200 pro neexistující obsah.

## 8. Role, sdílení a stav rozhraní

### 8.1 Role — P1-10

Možnosti: bez výběru, studující, provázející učitel, VŠ vzdělavatel. Volba není povinný onboarding. Ukládá se jen nesenzitivní preference do localStorage; při jeho nedostupnosti funguje v paměti aktuální stránky. Text „Role upraví otázky a doporučení, obsah rámce zůstává stejný.“

Role nemění oficiální deskriptory, hledání, viditelnost kritérií ani hodnocení relevance. Uživatel může volbu kdykoli vymazat. Role se standardně nepřidává do sdíleného odkazu; příjemce používá vlastní kontext.

### 8.2 Sdílení — P1-13

- Kritérium: sdílí kanonickou cestu bez aktuálního hledání.
- Úroveň: `uroven=0..3`, jednoznačná sekce.
- Porovnání: uspořádaná dvojice různých hodnot a stav zvýraznění. Hodnoty normalizovat vzestupně; obrácený vstup zobrazí totéž.
- Ukázka: stabilní ID, volitelně `#vazba-{linkId}` na komentovanou vazbu.
- Hledání: dotaz, potvrzené filtry, stránka. Více hodnot stejného filtru jsou opakované parametry, např. `tema=komunikace&tema=bezpeci`.
- Pokud současně přijdou `uroven` a `porovnat`, přednost má platné porovnání. Neplatný pár vede k zobrazení všech úrovní s krátkým vysvětlením. `rozdily=1` se uplatní jen s platnou dvojicí a dostupným komentářem.
- Clipboard API doplnit textovým fallbackem. Nativní share je volitelné zlepšení, nikdy jediná cesta.
- Kopie odkazu neznamená jeho odeslání jiné osobě. Žádné automatické e-maily.

### 8.3 Co se ukládá v P0/P1

URL nese sdílitelný stav zobrazení. Session state může nést stav akordeonů. LocalStorage smí obsahovat pouze roli a neosobní preference zobrazení. Žádná historie hledání, poznámka o žákovi ani údaj „moje úroveň“. Veřejné URL mohou být v historii a serverových záznamech; vyhledávací pole nesmí uživatele vybízet k zadávání jmen žáků.

## 9. Obsahový a datový model

### 9.1 Konvence

Interní ID je stabilní, neprůhledný identifikátor přenositelný do SQL. Kód a slug jsou samostatná pole. `schemaVersion` označuje strukturu dat, `contentReleaseId` publikovanou sadu obsahu, `frameworkEditionId` vydání zdrojového rámce. Publikované revize se nemění zpětně; oprava vytváří novou revizi.

| Entita | Klíčová pole | Vztahy / pravidla |
| --- | --- | --- |
| FrameworkEdition | id, title, versionLabel, sourceDocumentId, publishedAt | Jedno vydání má oblasti a publikované revize |
| Area | id, code, title, summary, order, accentKey | Patří k vydání, má kompetence |
| Competency | id, areaId, code, title, description, order | Má kritéria |
| Criterion | id, competencyId, publicCode, order, aliases | Trvalá identita; oficiální text je v revizi |
| CriterionRevision | id, criterionId, editionId, title, mindset, sourceLocator, status | Neměnná publikovaná verze textů |
| LevelDescriptor | id, criterionRevisionId, level, text, optionalSummary | Přesně jeden popis pro každou hodnotu 0–3 |
| Topic | id, slug, title, aliases | M:N s kritérii a ukázkami |
| CriterionTopic | criterionId, topicId | Unikátní dvojice |
| CriterionPhase | criterionId, phase | M:N k plánování/realizaci/reflexi |
| Situation | id, slug, title, aliases, description | Uživatelský jazyk, nikoli další strom rámce |
| SituationCriterion | situationId, criterionId, explanation, editorialOrder | Kurátorovaná relevance a důvod |
| Example | id, publicId, revisionId, title, type, context, assets, questions, limitations, status | Samostatný objekt; více vazeb |
| ExampleCriterionLink | id, exampleRevisionId, criterionRevisionId, level, evidenceLocator, commentary | M:N; level může být null jen pro vazbu bez tvrzení o úrovni |
| ExampleTopic / ExamplePhase | exampleId, topicId / phase | Explicitní metadata pro filtry |
| LevelTransition | id, criterionRevisionId, fromLevel, toLevel, summaryPoints, observationQuestion, highlights | Významový rozdíl v rámci konkrétní revize |
| RelatedCriterion | sourceId, targetId, relationType, explanation, order | Směrová vazba; opačný směr vyžaduje vlastní záznam |
| RoleGuidance | criterionRevisionId nebo guideId, role, questions, nextActions | Neutrální fallback; nesmí přepsat oficiální text |
| SourceDocument | id, title, edition, url, fileHash, licenseInfo | Doklad zdroje, u textu strana/sekce |
| MediaAsset | id, type, url, caption, alt, transcript, rightsRecordId | Video má titulky/textovou alternativu |
| RightsRecord | id, owner, permissionStatus, scope, reviewDate, internalReference | Veřejný export vynechá neveřejné doklady |
| PublicRouteAlias | oldPath, targetStableId, redirectType | Zachování původních odkazů |

`context` ukázky obsahuje předmět, stupeň školy, věkovou skupinu, popis situace a případně anonymizovanou roli aktérů. Nevynucovat identifikaci školy ani přesný věk konkrétního žáka. Typ „transkript“ může být samostatnou ukázkou i přístupnou alternativou videa.

#### Integrita dat

1. Každé publikované kritérium má právě jednu kompetenci, dohledatelnou oblast a čtyři deskriptory.
2. Každá publikovaná ukázka má nejméně jednu schválenou vazbu a vyřešené publikační oprávnění.
3. U úrovňové vazby musí deskriptor patřit ke stejnému kritériu a revizi; neexistuje globální úroveň ukázky.
4. Přechod se odkazuje na dva existující deskriptory téže revize. Sousední přechody mají unikátní dvojici.
5. Zvýraznění obsahuje přesnou citovanou frázi, index výskytu a identitu deskriptoru. Build ověří jednoznačné nalezení. Změna textu vyžaduje novou revizi komentáře; nesmí se tiše posunout zvýraznění na jinou frázi.
6. Příbuzné kritérium nesmí odkazovat samo na sebe; cykly mezi různými kritérii jsou přípustné.
7. Duplicitní kódy, neexistující vazby, neplatné URL a chybějící zdroj blokují publikaci.
8. Redakční i oficiální texty se ukládají zvlášť. HTML z obsahu musí projít sanitizací; preferovat omezené Markdown bloky bez vykonatelného kódu.
9. Neveřejné revize, interní poznámky a doklady souhlasů nesmějí být ve statickém balíčku ani v search indexu. Skrytí v UI není ochrana dat.

### 9.2 Praktický formát P0/P1

Obsah vést ve verzovaných UTF-8 JSON souborech, jeden soubor na revizi kritéria a ukázku; metodické stránky mohou používat Markdown s validovanými metadaty. Schéma v TypeScript/Zod; na hranici exportu generovat JSON Schema pro budoucí import do Pythonu. Build vytvoří veřejný katalog, stránky, vyhledávací index a přehled kontrolních chyb.

UI používá společné rozhraní `ContentRepository`: `getCriterion`, `listAreas`, `listCompetencies`, `getExample`, `listRelated`, `getTransition`. V P0/P1 jej plní statická data při buildu. Přechod na Django export později mění zdroj dat, nikoli komponenty ani URL. Nevytvářet nyní síťové API jen jako průchod ke stejnému JSON.

### 9.3 Redakční workflow

Stavy: **draft → methodological_review → approved → published → retired**. Autor a schvalující role mohou být v malé pilotní organizaci stejná osoba, ale schválení musí být explicitní a dohledatelné. Změna publikovaného textu vytvoří novou revizi se stavem draft.

Postup: import zdroje → kontrola proti PDF → tagy a situace → komentáře přechodů → ukázky a práva → automatická validace → preview změny → metodické schválení → vydání. Vývojář nerozhoduje o pedagogické interpretaci. P0/P1 redakce probíhá přes Git změny; není třeba budovat přihlašovací CMS.

## 10. Technologie a hosting

### 10.1 Doporučené rozhodnutí

**Pro P0/P1: Astro + TypeScript, malé React islands pro hledání a porovnání, staticky generovaný obsah na Cloudflare Workers Static Assets. Pro P2: veřejný frontend ponechat a doplnit Django + PostgreSQL pro účty, soukromé reflexe a případnou redakci.**

Důvodem je charakter aktuálního rozsahu: desítky obsahových detailů, čtení, hledání a několik lokálních interakcí. Neexistuje požadavek na serverové zápisy koncových uživatelů. Astro umí statický build; pro tento režim nepotřebuje Cloudflare adapter. Adapter dává smysl až pro on-demand vykreslování [T3, T4].

Nejde o příslib P2 bez práce: vznikne backend, autorizace, provoz databáze a správa soukromých dat. Zachovat lze identity obsahu, veřejné URL, komponenty, obsahová schémata a vyhledávací workflow.

### 10.2 Může Django běžet zdarma na Cloudflare?

**Technicky ano: Cloudflare dokumentuje Django na Python Workers, včetně adaptérů WSGI/ASGI a integrace D1 přes `django-cf`. Tyto databázové backendy vyžadují WSGI a nepodporují transakce; `transaction.atomic()` zde nezajišťuje rollback [T1]. Python běží přes Pyodide/WebAssembly, nejde o běžný Python server [T2].**

Free Workers mají podle aktuálního ceníku 100 000 dynamických požadavků denně a 10 ms CPU na invokaci. Přímé obsloužení statických assets je zdarma bez limitu počtu požadavků; nesmí se zbytečně směrovat přes Worker [T5, T6].

Z toho plyne: dostupnost Django na platformě není záruka, že konkrétní aplikace s ORM, administrací a přihlašováním bezpečně poběží ve Free limitech. Zvlášť pro soukromé reflexe je potřeba řešit atomické zápisy a oprávnění. Pro P2 doporučujeme běžné Django s PostgreSQL na samostatném Python hostingu; jeho bezplatnost není v tomto PRD slíbena.

### 10.3 Porovnání variant

| Varianta | P0/P1 | P2 | Rozhodnutí |
| --- | --- | --- | --- |
| Astro, statický Cloudflare; později Django/PostgreSQL | Nejmenší provozní rozsah, veřejný obsah bez dynamického serveru | Přidá soukromé API a auth | **Výchozí doporučení** |
| Django na Python Workers + D1 | Možné, nutný provozní spike a měření | Omezení databázového adaptéru a kompatibility | Experiment, nikoli výchozí základ portfolia |
| Django + PostgreSQL na běžném Python hostingu již od P0 | Výhoda při nutnosti Django adminu ihned; server pro převážně čtený obsah | Přímé rozšíření monolitu | Alternativa, pokud tým upřednostní jeden backend před nulovým hostingovým účtem |
| Full-stack TypeScript na Cloudflare | Možné, ale zatím zbytečná dynamika | Vlastní volba auth a bezpečného SQL přístupu | Znovu posoudit jen při podmínce „P2 výhradně Cloudflare“ |

Tabulka vyjadřuje návrhové posouzení, ne benchmark. Prototyp není důvodem současně implementovat všechny varianty.

### 10.4 Složení doporučeného stacku

| Vrstva | Volba | Účel |
| --- | --- | --- |
| Veřejné stránky | Astro, statický výstup | HTML pro obsah a stabilní URL |
| Jazyk | TypeScript v strict režimu | Konzistence dat a UI |
| Interaktivita | React islands | Hledání, filtry, dvojice úrovní; ne celé SPA |
| Styly | CSS custom properties + komponentové styly | Malý přístupný design systém bez těžké UI závislosti |
| Obsah | JSON + Markdown, Zod a export JSON Schema | Validace, revize, importovatelnost |
| Search | Lokální normalizovaný index a vlastní deterministický ranker | Malý korpus, řízená relevance a synonyma |
| Hosting | Cloudflare Workers Static Assets | Veřejný prototyp bez runtime databáze |
| Build/release | Git + CI + Wrangler | Reprodukovatelné preview a publikace |
| Kontroly | Typecheck, validace obsahu, Playwright, axe-core | Kritické cesty a přístupnost |
| P2 backend | Podporovaná Django LTS + PostgreSQL | Identita, autorizace, transakční záznamy |
| P2 API | Django REST Framework, verzované `/api/v1/` | Jasná hranice veřejného UI a soukromých dat |

Konkrétní verze balíčků zafixovat lockfilem v implementačním kroku; používat podporované stabilní řady kompatibilní s vybraným runtime. PRD úmyslně nepředstírá ověření kombinace konkrétních patch verzí.

### 10.5 Nasazování, provoz a náklady

- P0/P1 veřejné stránky jsou předgenerované. Žádná databáze, SSR ani placené AI volání nejsou podmínkou spuštění.
- Cíl je hosting veřejného textového prototypu za 0 v rámci Free podmínek. Doména, vývoj, CI nad bezplatnou kvótu a mediální služby jsou mimo tento příslib.
- Videa nebalit do frontendového buildu. Použít schválený externí zdroj nebo později samostatné objektové úložiště; jeho cenu a podmínky rozhodnout podle reálných médií. Pro pilot lze využít dokumenty a transkripty.
- Build musí generovat skutečné 404, sitemap, canonical URL a přesměrování starých cest. Filtrované varianty hledání nemají vytvářet tisíce indexovatelných kopií; použít noindex a kanonickou základní cestu.
- Preview nesmí obsahovat osobní či neveřejné zdrojové doklady. Před publikací tým zvolí požadovanou přístupnost pilotu; neveřejný pilot vyžaduje skutečné omezení přístupu, samotné noindex nestačí.
- CI: validace → build → testy kritických cest → preview → schválení obsahu → produkční release. Uchovávat manifest vydání a možnost návratu na předchozí build.
- Monitorovat chyby načítání, rozbité odkazy a velikost buildu. Volbu analytiky nedělat před podmínkami pilotu; minimální měření může proběhnout při moderovaných testech.

### 10.6 Volitelný technický spike Django/Cloudflare

Pokud tým chce ověřit Django variantu, vyhradit nejvýše 1–2 pracovní dny před jejím přijetím. Tento spike nesmí blokovat doporučený statický P0, pokud není Django stanoveno jako povinná podmínka.

Ověřit oficiální příklad, cílový runtime, vykreslení reálného detailu, ORM čtení, migraci testovacích dat, session login a logout, CSRF, dostupnost používaných balíčků, skutečný CPU čas, chování při chybě a oddělení statických assets. Zátěžový vzorek má zahrnout cold i warm požadavky; uvést p50/p95, chyby a rezervu proti Free limitům. Žádné produkční osobní údaje.

Go/no-go: všechny potřebné cesty fungují v cílovém tarifu, s rezervou a bez obcházení bezpečnostních vlastností. Podporu transakcí ověřit přímo pro konkrétní backend, nikoli předpokládat podle API Django. Nesplnění znamená volbu doporučené architektury nebo placeného běžného Python hostingu, ne skryté přepsání očekávané konzistence.

## 11. Příprava na P2 bez předčasné implementace

### 11.1 Budoucí entity

| Entita P2 | Předpokládaná data | Co připravit nyní |
| --- | --- | --- |
| User / Profile | Identita, preference | Žádný veřejný obsah nevázat na anonymní lokální ID |
| Bookmark | userId, targetStableId, targetType | Stabilní identity kritérií a ukázek |
| Reflection | ownerId, criterionRevisionId, occurredAt, context, evidence, interpretation, nextStep | Revize kritérií a oddělení obsahu od uživatelských záznamů |
| ReflectionLevelReference | reflectionId, level, note | Umožnit více odkazovaných úrovní nebo žádnou; nevyžadovat průměr |
| DevelopmentGoal | ownerId, text, relatedCriteria, reviewDate, status | Znovupoužitelné vazby ke kritériím |
| PortfolioEntry | ownerId, reflectionId, attachmentRefs | Média jako samostatné entity, explicitní oprávnění |
| ReflectionRevision | reflectionId, revision, changedAt, snapshot | Budoucí historie nesmí přepisovat staré důkazy |

Příklad budoucí reflexe: datum, anonymizovaný kontext hodiny, odkaz na revizi kritéria, konkrétní pozorování, jeden či více blízkých popisů jednání, nejistoty a další krok. Bez agregovaného skóre. Časová osa zobrazuje proměnu situací a uvažování, nikoli křivku „kvality učitele“.

### 11.2 Integrační hranice

- Veřejný katalog má vlastní rozhraní; soukromé portfolio druhé. Privátní data nesmí vstoupit do statického exportu nebo veřejného vyhledávání.
- P2 Django přebere zdroj obsahu až po importu a porovnání ID, textů a vazeb. Do té doby Git zůstává jediným autoritativním zdrojem. Nepovolit současné editování téhož obsahu ve dvou systémech.
- Při přidání soukromého API preferovat stejný origin pro session cookies a CSRF; konkrétní reverse proxy/routing ověřit v P2. Tokeny koncových uživatelů neukládat do localStorage.
- Každé soukromé čtení i zápis vyžaduje serverovou kontrolu vlastnictví. Role „provázející učitel“ sama o sobě nesmí otevírat cizí reflexe.
- Vztah reflexe k revizi je trvalý. Po aktualizaci rámce nabídnout informaci o nové verzi, nikoli automaticky přepočítat starý záznam.
- P2 musí doplnit retenční pravidla, export, smazání účtu, zálohy, test obnovy a pravidla sdílení před sběrem skutečných údajů.

### 11.3 Doporučené pořadí P2

Nejdříve ověřit poptávku po návratu k vlastní práci; poté účet a záložky, soukromé reflexe, cíle a nakonec historie/portfolio. Sdílení portfolia a skupinová oprávnění jsou samostatné další rozhodnutí. Účty nejsou povinnou podmínkou veřejného rámce ani po zavedení P2.

## 12. Nefunkční požadavky

| Oblast | Požadavek / rozpočet | Jak ověřit |
| --- | --- | --- |
| Přístupnost | Cílit na WCAG 2.2 AA; ovládání bez myši, labely, focus, kontrast, textové alternativy | Automatický audit + ruční klávesnice a čtečka |
| Reflow | Funkční od 320 CSS px a při 200% zoomu; dlouhé názvy bez ořezu | Mobilní a desktopové scénáře |
| Výkon | Cílové LCP ≤ 2,5 s, CLS ≤ 0,1, INP ≤ 200 ms při dostatku reálných dat | Před pilotem lab měření; po pilotu terénní data, jsou-li k dispozici |
| Rozpočet JavaScriptu | Cíl ≤ 150 kB gzip na běžném detailu; search index načítat až při potřebě | Build report |
| Index | Cíl ≤ 500 kB gzip pro pilotní korpus; přepočet výsledků do 150 ms po načtení | Reálná data a mobilní testovací profil |
| Dostupnost obsahu | Detaily rámce čitelné bez JavaScriptu | Vypnout JS a projít strom |
| Bezpečnost | Sanitizované texty, CSP podle schválených médií, žádná tajemství ve frontendu | Kontrola buildu a hlaviček |
| Soukromí | Bez osobních zápisů v P0/P1; neukládat surové vyhledávací dotazy do analytiky | Kontrola síťových požadavků |
| Tisk | Detail obsahuje všechny deskriptory a zdroj, ne ovládací prvky | Náhled tisku |
| Prohlížeče | Aktuální a předchozí hlavní verze Safari, Chrome, Firefox, Edge; iOS Safari | Smoke test matice |
| Obsah | Žádné neoznačené mocky v publikovaném rámci | Metodická kontrola |

Rozpočty výkonu jsou cíle návrhu, nikoli již naměřené výsledky. Pokud dlouhé autentické texty nebo přístupnost vyžadují úpravu, změnu zdůvodnit; neskracovat oficiální obsah kvůli skóre nástroje.

## 13. Měření úspěchu a uživatelské ověření

Pilot: nejméně 6 účastníků, ideálně 2 studující, 2 provázející učitelé a 2 VŠ vzdělavatelé. Prototyp ověřit na desktopu i mobilu. Jde o kvalitativní indikaci, ne statistický důkaz.

| Hypotéza | Úkol | Cíl pro pilot |
| --- | --- | --- |
| Vstup přes situaci funguje | Najděte obsah k běžné situaci bez znalosti kódů | Alespoň 5 ze 6 dokončí bez zásadní nápovědy do 2 minut |
| Porovnání je srozumitelné | Vysvětlete rozdíl dvou popisů vlastními slovy | Alespoň 5 ze 6 uvede rozdíl v jednání, ne jen čísle |
| UI nevyvolává dojem známky | Co zde podle vás znamená úroveň? | Žádný opakující se dojem skóre člověka; jednotlivé nedorozumění vede k úpravě a retestu |
| Kontext z odkazu stačí | Otevřete sdílenou úroveň a najděte její kompetenci | Alespoň 5 ze 6 uspěje |
| Ukázka pomáhá | Najděte důkaz pro komentovanou vazbu | Alespoň 5 ze 6 dokáže říci, čeho si všimnout |
| Co dál je konkrétní | Po práci s kritériem navrhněte další malý krok | Alespoň 4 ze 6 formulují pozorovatelnou změnu |

Před testem metodik připraví sadu 20 situací s přijatelnými výsledky. U nejméně 18 musí být alespoň jedno relevantní kritérium v prvních pěti výsledcích. Přesné platné kódy se testují všechny a v nefiltrovaném hledání musí být první. Testuje se také diakritika, zkrácené fráze, nula výsledků a opačné významy.

Pokud se zavedou události, stačí `search_submitted`, `result_opened`, `comparison_opened`, `example_opened`, `share_copied` a `guide_opened` s veřejnými ID a agregovanými počty. Bez obsahu dotazů, osobních poznámek a uživatelských profilů. Záznamy z uživatelských sezení vznikají odděleně podle domluvených podmínek pilotu.

## 14. Implementační plán a backlog

Odhady jsou orientační člověkodny soustředěné práce zkušeného vývojáře a nezahrnují čekání na obsah, grafické schvalování ani produkci videí. Předpokládají malý korpus a dostupný export prvního prototypu; při chybějícím exportu provést nové zpřesnění.

### 14.1 Milník M0 — podklady a základ (2–4 dny)

1. Získat repozitář, originální dokumenty, stávající URL a oprávnění k převzetí obsahu.
2. Potvrdit verzi rámce, názvy, počty, role a slovník pojmů.
3. Založit obsahové schéma, stabilní ID a manifest vydání.
4. Importovat celý rámec, označit chybějící zdroje a nesrovnalosti.
5. Nastavit build, CI, preview a společné design tokeny.

**Gate:** plný import má validační report; metodik schválil alespoň jednu kompletní vertikální ukázku kritéria; jsou známy staré permalinky. Neznámý obsah se nesmí maskovat generovaným textem.

### 14.2 Milník M1 — P0 (6–10 dnů)

| Úkol | Závislost | Hotovo, když |
| --- | --- | --- |
| P0-07a Import a validace | M0 | Kompletní oficiální texty, unikátní ID, čtyři úrovně, zdroje |
| P0-02 Strom rámce | P0-07a | Oblast a kompetence mají vlastní stránky, počty jsou správné |
| P0-03 Navigace a URL | Strom + inventář starých cest | Breadcrumb, přímé vstupy, přesměrování a 404 fungují |
| P0-04 Detail kritéria | Data + komponenty | Plné deskriptory, mindset, reflexe, zdroj a další krok |
| P0-05 Porovnání | Detail | Všechny úrovně a dvojice na mobilu i desktopu |
| P0-06 Hledání | Data + 10 situací | Přesné kódy, diakritika, aliasy, chybové stavy |
| P0-01 Homepage | Strom + hledání + průvodci | Šest potřeb a šest oblastí, žádné slepé odkazy |
| P0-07b Model ukázek | Schéma | Fixture pro M:N a více úrovní validovaná, neveřejná data neunikají |

**Gate P0:** všechny požadavky P0 splněny; projdou S1/S2/S5 v dostupném rozsahu, klávesnice a mobil; metodik odsouhlasí shodu importu. Opravdové ukázky a role ještě nejsou podmínkou tohoto interního milníku.

### 14.3 Milník M2 — P1 (8–13 dnů technické práce)

| Úkol | Závislost | Hotovo, když |
| --- | --- | --- |
| P1-08 Filtry | P0 hledání + taxonomie | AND/OR, počty, URL, Zpět, nulové stavy a katalogové kontexty |
| P1-09 Přechody | Deskriptory + schválené komentáře | Všechny sousední přechody, validovaná zvýraznění a fallback |
| P1-10 Role | Metodické varianty | Role mění jen doprovodný obsah; bez role vše funguje |
| P1-11 Ukázky | M:N model + práva + metadata | Katalog a detaily, nejméně 6 ukázek, přístupné alternativy |
| P1-12 Příbuzná kritéria | Redakční vazby | Každá vazba má vysvětlení, bez automatického plošného doplnění |
| P1-13 Sdílení | Stabilní URL + stavy UI | Kopie i fallback a přímé otevření všech podporovaných stavů |
| Rozšíření situací | Metodická mapa | Nejméně 20 schválených situací a ověřená relevance |

Pro příbuzná kritéria požadovat pilotně alespoň 12 schválených směrových vazeb napříč minimálně 3 oblastmi. Nevyžadovat 2–4 odkazy u každého kritéria za cenu umělých vztahů; bez vazeb sekci nezobrazovat.

### 14.4 Milník M3 — ověření a předání (3–5 dnů + organizace sezení)

1. Obsahový audit všech textů a vazeb, včetně rozdílů mezi úrovněmi.
2. Automatizovaná kontrola URL, revizí a kritických scénářů.
3. Moderované pilotní testy, třídění zjištění a opravy hlavních problémů.
4. Kontrola mobilu, přístupnosti, tisku, výkonu a fallbacků.
5. Předání README, redakčního postupu, manifestu vydání a seznamu známých omezení.

**Orientační technický součet:** 19–32 člověkodnů. Není to kalendářní termín ani nabídka ceny. Obsahová práce je samostatná a může být kritickou cestou.

### 14.5 Obsahová kapacita a odpovědnosti

| Balík | Odpovědnost | Minimální dodávka |
| --- | --- | --- |
| Autoritativní rámec | Metodický garant | Ověřený import všech oblastí, kompetencí, kritérií a deskriptorů |
| Situace a tagy | Editor + metodik | 10 situací v P0, 20 v P1, schválené vazby |
| Přechody | Metodik | 3 sousední přechody na kritérium, u očekávaných 61 celkem 183 |
| Ukázky | Autor ukázek + garant práv + metodik | Nejméně 6 publikovatelných položek a komentované vazby |
| Mikrotexty a průvodci | UX/editor + metodik | Čtyři situační průvodci, metodika úrovní, role a chybové stavy |
| Implementace a vydání | Vývojář | Funkční UI, validace, testy, preview a release |
| Převzetí | Produktový garant | Potvrzení rozsahu, výsledků pilotu a známých omezení |

Pro plánování obsahu lze použít pracovní předpoklad 15–30 minut na první návrh jednoho přechodu: 183 přechodů znamená přibližně 46–92 hodin pouze na návrhy, bez revize. Tento odhad je třeba ověřit na prvních pěti kritériích. Rozdíly mezi úrovněmi jsou významná redakční práce, nikoli jen přepínač v UI.

## 15. Akceptační scénáře a release checklist

### 15.1 Konkrétní scénáře Given / When / Then

**A01 Přesný kód.** Při nefiltrovaném hledání platného kódu se odpovídající kritérium zobrazí první a otevře stabilní detail.

**A02 Hledání situace.** Pro každou testovací frázi bez diakritiky systém vrátí stejnou sadu relevantních výsledků jako pro ekvivalentní frázi s diakritikou; správné cíle určuje schválený fixture.

**A03 Zachování textu.** Po zapnutí zvýraznění, změně role a výběru dvojice je text deskriptoru po odebrání markup totožný s publikovaným zdrojem.

**A04 M:N.** Z jedné ukázky vedou dvě různě komentované vazby na dvě kritéria; po otevření obou detailů je ukázka dohledatelná se správným lokálním vysvětlením a úrovní.

**A05 Filtry.** Dvě témata znamenají OR; oblast a téma znamenají AND. Zkopírované URL v novém prohlížeči obnoví shodný stav a pořadí.

**A06 Prázdný výsledek.** Dotaz s příliš úzkým filtrem zobrazí nulu, možnost odstranit filtr a průchod do rámce. UI nevytvoří neexistující relevantní obsah.

**A07 Přímá úroveň.** Otevření `?uroven=2#urovne` na mobilu ukáže správný deskriptor, celý kontext a možnost zobrazit jiné úrovně, bez tvrzení „Vaše úroveň“.

**A08 Neplatný stav.** `?porovnat=9,9` a neznámý tag nevedou k pádu. Platná část stavu zůstává, neplatná je vysvětlena.

**A09 Storage a clipboard.** Při zakázaném localStorage zůstává role dočasně funkční; při odmítnutém clipboardu je odkaz viditelný a označitelný.

**A10 Chyba média.** Nedostupné video neodstraní přepis, komentář a odkazy na kritéria. Neexistující ukázka má správný chybový stav.

**A11 Klávesnice.** Lze otevřít menu, projít hledání, filtry, porovnání a sdílení bez myši a bez pasti focusu. Pořadí odpovídá čtení.

**A12 Revize a neveřejná data.** Build obsahuje jen schválené publikované revize. Interní poznámka ani soubor souhlasu se nenachází v assets ani indexu.

**A13 Migrace URL.** Každá stará platná cesta z inventáře vede na správný obsah bez řetězu přesměrování; neznámá cesta je skutečná 404.

### 15.2 Definition of Done druhého prototypu

- [ ] P0-01 až P1-13 splněny podle akceptačních podmínek.
- [ ] Oficiální texty porovnány se schváleným zdrojem, počty potvrzeny.
- [ ] Každé kritérium má čtyři deskriptory a dohledatelný zdroj.
- [ ] Sousední přechody mají metodické schválení a validní zvýraznění.
- [ ] Nejméně 20 situací, 6 ukázek a 12 odůvodněných souvisejících vazeb.
- [ ] Ukázky mají vyřešená práva, anonymizaci a přístupné alternativy.
- [ ] Všechny podporované přímé odkazy a historie prohlížeče fungují.
- [ ] UI neobsahuje nefunkční akce ukládání ani osobní skóre.
- [ ] Automatické kontroly a ruční klávesnice/mobil prošly bez blokujících chyb.
- [ ] Pilotní úkoly vyhodnoceny; opakující se pedagogická nedorozumění opravena a znovu ověřena.
- [ ] Je zdokumentovaný postup vydání, rollbacku a redakční změny.
- [ ] Známá omezení mají vlastníka a jsou součástí předání.

Pokud chybí obsah potřebný pro P1, lze vydat omezený pilot, ale musí být označen jako neúplný a mít konkrétní seznam výjimek. Nelze jej převzít jako dokončené P0+P1 pouze na základě hotového frontendového přepínače.

## 16. Rizika a jejich řešení

| Riziko | Dopad | Opatření / rozhodovací bod |
| --- | --- | --- |
| Neověřený zdroj nebo změna rámce | Nesprávné popisy i URL | M0: potvrdit vydání a zmapovat identity před designem dat |
| Nedostatek redakční kapacity | P1 čeká na 183 přechodů a ukázky | Pilotně odhadnout na 5 kritériích, obsah plánovat souběžně s vývojem |
| Výběr úrovně působí jako známkování | Popření formativního účelu | Jazyk zobrazení, neutrální barvy, žádný vlastní rating; uživatelský test |
| Hledání zamění podobná slova za podobnou situaci | Nesprávné očekávání | Kurátorované fráze, důvod shody, testy negace a relevance |
| Ukázky bez kontextu | Přehnané zobecnění | Povinné okolnosti, komentář vazby a limity interpretace |
| Rozšíření rozsahu na osobní portfolio | Zdržení a soukromá data bez zázemí | P2 pouze jako kontrakt, žádné osobní formuláře v P0/P1 |
| Příliš mnoho frameworků | Údržba navíc | Astro pro veřejný obsah, React jen pro interakce; Django až při potřebě backendu |
| Záměna Free hostingu za Free celý produkt | Chybný rozpočet | Oddělit statický web, média, doménu, backend a redakční práci |
| Neověřená kompatibilita Django Workers | Provozní a datové chyby | Volitelný spike, žádná závislost P2 na neověřeném rollbacku |
| Únik draftů ve statickém exportu | Zveřejnění interních textů či dokladů | Exportní allowlist a kontrola výstupních souborů |

## 17. Otevřená rozhodnutí před implementací

Tyto body nebrání použití PRD jako zadání, ale musí mít vlastníka před příslušným milníkem. Výchozí doporučení dovolují zahájit technický základ.

| Rozhodnutí | Výchozí návrh | Kdy / kdo |
| --- | --- | --- |
| Autoritativní dokument a jeho vydání | Potvrdit z podkladů projektu; nevycházet jen z analýzy | M0, metodický garant |
| Zdrojový kód a staré permalinky | Převzít funkční strukturu a provést inventář | M0, vývojář |
| Stack | Astro/TypeScript na statickém Cloudflare | M0, technický garant |
| Je Django povinné již v prototypu? | Ne; preferovat jej pro P2, nebo provést spike při silné preferenci | M0, produktový a technický garant |
| Slovník témat a situací | Kurátorovaný, malý, spravovaný společně | P0 hledání, metodik/editor |
| Názvy rolí a jazyk | Studující, provázející učitel, VŠ vzdělavatel + bez role | P1-10, metodik |
| Ukázky a práva | 6 dostupných ukázek, video nepovinné | Před P1-11, obsahový garant |
| Vizuální identita | Neutrální podklad a stálé akcenty oblastí | P0 UI, designér |
| Publikum pilotu | Určit záměrně; žádné neveřejné doklady ve veřejném buildu | Před nasazením, produktový garant |
| Budoucí rozpočet P2 | Počítat s možností placeného Django/PostgreSQL provozu | Před P2, provozovatel |

## 18. Doporučený první implementační řez

Nejprve vytvořit jednu úplnou vertikální cestu nad skutečným schváleným obsahem: homepage → hledání jedné situace → detail kritéria → dvojice deskriptorů → jeden metodický přechod → jedna ukázka s dvěma vazbami → sdílený odkaz. Obsahové schéma přitom musí zvládnout celý rámec.

Na této cestě ověřit pedagogický jazyk, dlouhé texty, mobilní zobrazení a datové vazby. Teprve poté rozšířit ověřený vzor na celý korpus. Tento řez je interní ověření architektury; nenahrazuje úplnou dodávku P0 a P1.

## 19. Technické zdroje a evidence

Ověřeno 2. 10. 2026. Odkazy níže podporují technické skutečnosti, nikoli všechny návrhové volby v dokumentu. Limity a kompatibilitu znovu ověřit při implementaci.

| ID | Primární zdroj | Co dokládá |
| --- | --- | --- |
| T1 | [Cloudflare: Django](https://developers.cloudflare.com/workers/languages/python/packages/django/) | Podpora Django, WSGI/ASGI, `django-cf`, omezení transakcí databázových backendů |
| T2 | [Cloudflare: How Python Workers Work](https://developers.cloudflare.com/workers/languages/python/how-python-workers-work/) | Pyodide/WebAssembly runtime |
| T3 | [Cloudflare: Astro](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/) | Statické generování a nasazení assets |
| T4 | [Astro: Cloudflare adapter](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) | Rozdíl statického buildu a on-demand renderingu |
| T5 | [Cloudflare: Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/) | Free kvóty dynamických požadavků/CPU a statické assets |
| T6 | [Cloudflare: Workers limits](https://developers.cloudflare.com/workers/platform/limits/) | Provozní limity; ověřit pro finální konfiguraci |

Produktová analýza vložená do zadání je obsahovým východiskem, ne autoritativním zdrojem samotných deskriptorů KRAAU. Oficiální zdroje rámce se doplní v M0 a stanou se součástí verzovaného obsahového manifestu.
