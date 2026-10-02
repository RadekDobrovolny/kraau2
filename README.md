# KRAAU: druhý digitální prototyp

Nový statický web podle `PRD.md`: Astro 5, TypeScript, React islands, lokálně hostovaná písma a GitHub Pages. Žádný server, databáze, Cloudflare adaptér ani přihlášení nejsou potřeba.

## Spuštění a kontrola

```sh
npm ci
npm run dev
```

Výchozí adresa je `http://127.0.0.1:4321/`. Produkční kontrola:

```sh
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

`build` zahrnuje validaci dat, TypeScript, statické generování a kontrolu všech lokálních odkazů i kotev. Výsledky jsou v `content-validation.json` a `build-validation.json`. Playwright ověřuje desktop a mobil, přístupnost přes axe, režim bez JavaScriptu, historii, filtry, porovnání, tisk a sdílení.

## Rozsah

- Úvod se šesti potřebami a šesti oblastmi; postupné odkrývání oblasti → kompetence → kritéria.
- Všech 61 kritérií, 244 plných deskriptorů a mindsetů z dodaného pracovního PDF, s odkazy na konkrétní stránky.
- Deterministické hledání kódů, slov, témat a 22 redakčních situací, bez diakritiky; důvody shody.
- Potvrzované filtry s OR uvnitř skupiny a AND mezi skupinami, kontextové počty, sdílitelná URL, stránkování po 20 a návrat přes Zpět.
- Libovolné dvojice úrovní, cílová úroveň, sdílení a označitelný fallback při odmítnutí schránky. Tisk obsahuje všechny čtyři texty.
- Volitelná role mění pouze doprovodné otázky a další akce. Do localStorage se ukládá pouze tato preference.
- Čtyři průvodci reflexí, metodika, zdroje, soukromí a 404.
- Šest viditelně označených autorských modelových ukázek, čtyři typy, pět oblastí a více vazeb na kritéria. Katalog má i filtry předmětu, stupně a věku.
- Devět ukázkových komentářů přechodů u kritérií 2.1.2, 4.2.2 a 5.1.1, s ověřenými citovanými zvýrazněními. Ostatní dvojice mají pravdivý prázdný stav.
- Třináct odůvodněných redakčních vztahů mezi kritérii; 86 původních adres má přechod na nový detail.

## Důležitá obsahová hranice

Toto je funkční pracovní prototyp, **nikoli metodicky schválené vydání P0/P1**. Nejsou dodána schválení importu, mapování situací, ukázek, práv, reflexních otázek ani všech 183 přechodů. UI tuto skutečnost uvádí. Označení `demo` znamená výslovně autorský model pro posouzení, nikoli schválený pedagogický obsah. Neveřejné redakční poznámky a doklady souhlasů se do obsahu nevkládají.

Pro kontrolu připravenosti metodicky schváleného vydání slouží:

```sh
npm run release:check
```

V současnosti tento příkaz záměrně odmítne finální vydání. Pro veřejný **prototyp** lze použít běžný build, ale nesmí se prezentovat jako schválená metodika. K převzetí plného PRD zbývá metodický audit, dokončení komentářů, potvrzení práv, pilot nejméně šesti účastníků a ruční ověření čtečkou a dalšími prohlížeči. Lab průchody neprokazují terénní Core Web Vitals ani shodu celé aplikace s WCAG.

## GitHub Pages

Workflow `.github/workflows/deploy.yml` při PR pouze ověřuje a při pushi do `main` nebo ručním spuštění nasadí obsah `dist`. V nastavení repozitáře nastavte **Pages → Source → GitHub Actions**. Projekt zde zatím nemá Git remote ani propojený GitHub repozitář; samotný lokální build nic nepublikuje.

`GITHUB_REPOSITORY` automaticky určuje `site` a `base`, například `radekdobrovolny/kraau2` vytvoří web na `https://radekdobrovolny.github.io/kraau2/`. Web lze nasadit také do původního repozitáře `kraau`; není potřeba měnit komponenty. Vlastní doménu nastavují `SITE_URL` a `BASE_PATH`.

Lokální ověření projektové cesty:

```sh
SITE_URL=https://radekdobrovolny.github.io BASE_PATH=/kraau2/ npm run build
BASE_PATH=/kraau2/ npm run test:e2e
```

**Omezení hostingu:** GitHub Pages neposkytuje konfigurovatelné HTTP 301/410 ani vlastní bezpečnostní hlavičky. Původní cesty proto používají HTML/JavaScript přechod se zachováním query a kotvy; bez JavaScriptu funguje refresh a běžný odkaz. Mapa uvádí cílovou sémantiku 301, skutečná odpověď hostingu je 200. Pro neexistující stránky existuje `404.html`; žádná SPA fallback stránka není použita. Při přesunu do jiného repozitáře zůstanou staré absolutní odkazy na původní doménové cestě, dokud se stejné aliasy nenasadí i tam.

## Obsah a import

`src/data/imported/framework-v1.json` je zmrazený import prvního prototypu. `scripts/extract-source.py --check` jej porovná s čerstvou strukturovanou extrakcí původního PDF přes Poppler. SHA-256 zdroje je v manifestu. Zachován je jediný původní dokumentovaný zásah v kritériu 2.1.3, úrovni 3, kde PDF ořezává počátek posledního slova.

```sh
npm run source:check
```

`src/data/framework.json` obsahuje explicitní stabilní identity, kódy, strom a mapu původních cest. `src/content/criteria/` obsahuje samostatné revize se čtyřmi deskriptory. `src/content/examples/` a `src/content/transitions/` obsahují samostatné modelové revize; žádná ukázka nemá globální úroveň. Každá vazba má vlastní úroveň, důkaz, komentář a odkaz na konkrétní revizi.

`npm run import:framework` je nástroj pro prvotní import, který přepisuje současné importované revize. Nespouštět ho po redakčním vydání; nová vydání musí vznikat v samostatných souborech a zachovat již vydané ID. Obdobně `scripts/create-demo-content.mjs` je jednorázový generátor modelových ukázek pro tento prototyp.

Datové kontrakty jsou v `src/lib/schema.ts`; export JSON Schema a manifest jsou v `public/content-schema.json` a `public/content-manifest.json`. Stránky používají společný `ContentRepository` ze `src/lib/repository.ts`. Případný budoucí Django export může nahradit jeho zdroj dat při zachování identit a veřejných URL.

Redakční postup a obsahové nedostatky popisuje [CONTENT.md](CONTENT.md).
