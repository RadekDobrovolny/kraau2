# Obsahový postup a předání

## Stav tohoto prototypu

Text rámce je importovaný pracovní zdroj. Stavy `imported` a `demo` umožňují výslovně označené technické preview, ale nenahrazují `approved` ani `published`. Veřejné `draft`, `methodological_review`, `approved` a `retired` revize se v katalogu ani indexu nezobrazují. `approved` přejde do `published` až při explicitním vydání.

Metodické schválení nebylo poskytnuto. Žádné datum schválení ani jméno garanta není vymyšlené. Původní dokument, potvrzení oprávnění k distribuci a celé mapování situací je třeba projít s obsahovým garantem.

## Redakční změna

1. Vytvořit novou revizi v novém souboru se stavem `draft` a novým ID. Nevyměňovat text již vydané revize.
2. Porovnat zdrojový text s PDF včetně umístění, čtyř úrovní a mindsetu. Zvlášť zaznamenat případné opravy zdrojových překlepů.
3. Zkontrolovat témata, fáze výuky, synonyma, přiřazení situací a příbuzné vztahy. U vazeb zachovat důvod a redakční pořadí.
4. U každého sousedního přechodu připravit konkrétní komentář, otázku k pozorování a přesné fráze z příslušných deskriptorů. Index výskytu fráze je od nuly.
5. U ukázky potvrdit kontext, přístupnou HTML alternativu, limity a každou jednotlivou vazbu. U skutečného média doložit oprávnění mimo veřejný repozitář a potvrdit rozsah zveřejnění.
6. Spustit validaci a preview. Získat explicitní metodické schválení s odkazem na schvalovací záznam mimo veřejná osobní data.
7. Připravit nové vydání manifestu, nastavit schválenou revizi na `published` a předchozí aktivní revizi odstranit z veřejného výběru (zachovat ji v archivu jako `retired`). Validace vyžaduje právě jednu veřejnou revizi kritéria.
8. Ověřit `npm run release:check`, testy, odkazy a diff. Nasadit nové vydání. Předchozí sestavení zachovat jako návratovou verzi.

## Zbývající požadavky PRD

| Požadavek           | Aktuální stav                                             | Potřebné rozhodnutí                                        |
| ------------------- | --------------------------------------------------------- | ---------------------------------------------------------- |
| Import rámce        | Strojově shodný s prvním importem a čerstvou extrakcí PDF | Ruční kontrola a potvrzení autoritativního vydání          |
| Situace a taxonomie | 22 funkčních redakčních námětů                            | Schválení metodikem a 20 referenčních očekávání relevance  |
| Přechody            | 9 modelových komentářů u 3 kritérií                       | Doplnit a schválit všech 183 sousedních přechodů           |
| Ukázky              | 6 autorských modelů; 4 typy; 5 oblastí                    | Schválit jejich užití nebo dodat skutečné ukázky a práva   |
| Příbuzná kritéria   | 13 odůvodněných směrových vazeb                           | Schválení vztahů                                           |
| Role a průvodci     | Funkční varianty doprovodných otázek a akcí               | Jazyková a metodická kontrola                              |
| Metodika, kontakt   | Zdroj a stav prototypu uvedeny, kontakt není odhadnut     | Potvrdit garanty a kontakt                                 |
| Uživatelé           | Automatické testy workflow                                | Moderovaný pilot nejméně 6 účastníků                       |
| Přístupnost a výkon | Chromium, axe, reflow, gzip rozpočty                      | Ruční čtečka, Safari/Firefox/Edge a reálné výkonové měření |
| HTTP přesměrování   | HTML přechody na GitHub Pages                             | Při požadavku na skutečnou 301/410 použít vhodný hosting   |

## Zdrojový audit

SHA-256 dodaného PDF: `d2763f675cb90b87d7240539cf55247b5b9f902a8d94f8dd7dbe150074d38b78`.

Strojová kontrola ověřuje všechny texty importu. Vizuální kontrola byla provedena na straně 20 (kritéria 4.2.3–4.2.5); text i členění se shodují. To nenahrazuje metodický audit všech tabulek. Názvy kritérií psané v PDF velkými písmeny se pro zobrazení převádějí na větný zápis; text v revizi zůstává původní.

Veřejné manifesty obsahují pouze nesenzitivní metadata. Budoucí neveřejné revize a oprávnění nevkládat do `public/`, komponentových props ani indexu.
