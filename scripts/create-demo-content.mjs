import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { stableId } from './stable-id.mjs';

const revision = (code) => JSON.parse(readFileSync(`src/content/criteria/${code}.v1.json`, 'utf8'));
const id = (key) => stableId(key, 'kraau-demo-v1');
const examples = [
  {
    publicId: 'prostor-pro-kazdy-hlas',
    title: 'Prostor pro každý hlas',
    type: 'transkript',
    duration: '4 min čtení',
    summary:
      'Krátká diskuse nad historickým pramenem, ve které dostanou prostor i žáci, kteří se běžně nehlásí.',
    context: {
      subject: 'Dějepis',
      school: 'Střední škola',
      age: '15–18 let',
      situation:
        'Třída porovnává dva popisy stejné historické události. Na první otázku odpoví dva žáci.',
    },
    topics: ['zapojeni', 'komunikace'],
    phases: ['realizace'],
    questions: [
      'Kdo dostal příležitost připravit si odpověď?',
      'Jak vyučující navazuje na odpovědi?',
      'Co se dozvídáme o žácích, kteří zatím nemluví?',
    ],
    body: [
      {
        heading: '1 · První otázka',
        text: 'Vyučující: „V čem se tyto dva popisy události liší?“ Dva žáci se přihlásí. Jeden odpoví, že se liší v tom, komu připisují odpovědnost.',
      },
      {
        heading: '2 · Čas na přemýšlení',
        text: 'Vyučující: „Než budeme pokračovat, každý si poznamenejte jeden rozdíl a větu z pramene, která ho dokládá. Pak svůj výběr vysvětlete spolužákovi ve dvojici.“ Třída dvě minuty pracuje.',
      },
      {
        heading: '3 · Další hlasy',
        text: 'Vyučující nabídne, že odpověď může přednést dvojice společně, nebo ji může přečíst z poznámek. Osloví i dvojici, která se předtím nehlásila. Žáci zvolí společnou odpověď.',
      },
      {
        heading: '4 · Propojení odpovědí',
        text: 'Vyučující: „Jak vaše vysvětlení navazuje na to první? V čem se shodujete a v čem ne?“ Další žákyně odkazuje na konkrétní formulaci v pramenu a nabídne jinou interpretaci.',
      },
    ],
    limitations:
      'Výřez neukazuje celou hodinu ani to, zda se zapojili všichni. Z četnosti odpovědí nelze vyvodit, kolik se jednotliví žáci naučili.',
    links: [
      {
        criterionCode: '4.2.2',
        level: 3,
        evidence:
          'Oddíly 2 a 3: individuální příprava, sdílení ve dvojici a nabídka společné odpovědi.',
        commentary:
          'Model ilustruje hledání různých cest k zapojení žáků, kteří původně nepromluvili. Nejde o hodnocení vyučujícího.',
      },
      {
        criterionCode: '4.2.3',
        level: 3,
        evidence: 'Oddíl 4: otázka k návaznosti a rozdílům mezi odpověďmi.',
        commentary:
          'Žáci mají příležitost porovnat a zdůvodnit interpretace a reagovat na sebe navzájem.',
      },
    ],
  },
  {
    publicId: 'cil-a-dukaz-o-uceni',
    title: 'Cíl hodiny a důkaz o učení',
    type: 'priprava',
    duration: '3 min čtení',
    summary: 'Příprava hodiny o argumentaci propojuje cíl, učební činnost a závěrečný výstup.',
    context: {
      subject: 'Český jazyk',
      school: 'Střední škola',
      age: '15–18 let',
      situation:
        'Vyučující plánuje hodinu, ve které mají žáci rozlišit tvrzení a argument a vlastní tvrzení podpořit.',
    },
    topics: ['cile', 'hodnoceni', 'materialy'],
    phases: ['planovani'],
    questions: [
      'Jaký konkrétní výkon dovolí ověřit cíl?',
      'Co bude v žákovském výstupu důkazem porozumění?',
    ],
    body: [
      {
        heading: 'Cíl',
        text: 'Na konci hodiny žák v krátkém textu rozliší tvrzení od argumentu a napíše vlastní tvrzení podpořené relevantním argumentem.',
      },
      {
        heading: 'Učební činnost',
        text: 'Dvojice porovnají dva krátké texty. V každém označí tvrzení a informace, které ho podporují. Své označení vysvětlí další dvojici.',
      },
      {
        heading: 'Ověření',
        text: 'Každý žák na závěr samostatně napíše tvrzení k novému tématu a jeden argument. Vyučující sleduje, zda argument tvrzení skutečně podporuje, a podle výstupů upraví začátek další hodiny.',
      },
      {
        heading: 'Otázka do přípravy',
        text: 'Pokud žák dokáže text správně označit, ale nevytvoří vlastní argument, kterou část cíle už výstup dokládá a kterou ještě ne?',
      },
    ],
    limitations:
      'Příprava ukazuje zamýšlený postup. Sama nedokládá, že se výuka podle plánu odehrála nebo že žáci cíle dosáhli.',
    links: [
      {
        criterionCode: '2.1.2',
        level: 3,
        evidence: 'Oddíly Cíl a Ověření.',
        commentary:
          'Příprava obsahuje ověřitelný cíl i odpovídající způsob ověření. Jde o model plánovaného jednání.',
      },
    ],
  },
  {
    publicId: 'zpetna-vazba-k-argumentu',
    title: 'Zpětná vazba, se kterou lze pracovat',
    type: 'artefakt',
    duration: '3 min čtení',
    summary:
      'Dvě podoby komentáře k modelovému žákovskému textu a otázka, co s nimi může žák udělat.',
    context: {
      subject: 'Český jazyk',
      school: 'Střední škola',
      age: '15–18 let',
      situation:
        'Žák napsal krátký argumentační odstavec. Kritériem je podpořit tvrzení konkrétním důkazem a vysvětlit jeho souvislost.',
    },
    topics: ['zpetna-vazba', 'hodnoceni'],
    phases: ['realizace', 'reflexe'],
    questions: ['Které části výkonu komentář pojmenovává?', 'Je další krok pro žáka srozumitelný?'],
    body: [
      {
        heading: 'Modelový žákovský odstavec',
        text: '„Škola by měla začínat později, protože by to bylo lepší. Řada spolužáků ráno nestíhá. Pozdější začátek by proto mohl pomoci.“',
      },
      { heading: 'Obecný komentář', text: '„Dobrý začátek. Argumentaci ještě trochu vylepši.“' },
      {
        heading: 'Popisný komentář',
        text: '„Tvoje stanovisko je v první větě jasné. Ve druhé větě uvádíš zkušenost spolužáků, ale zatím nevysvětluješ, jak souvisí s učením. Doplň konkrétní doklad a větu, která vysvětlí, proč tvé tvrzení podporuje.“',
      },
      {
        heading: 'Navazující činnost',
        text: 'Žák vybere jednu změnu, kterou v textu provede. Poté porovná obě verze a označí, kde se jeho argument stal konkrétnějším.',
      },
    ],
    limitations:
      'Komentář sám nedokládá, že mu žák porozuměl nebo jej využil. Ukázka neobsahuje skutečnou žákovskou práci.',
    links: [
      {
        criterionCode: '5.1.1',
        level: 3,
        evidence: 'Oddíl Popisný komentář: pojmenování části výkonu a dalšího kroku.',
        commentary:
          'Komentář se vztahuje ke konkrétním částem práce a nabízí možnost jejího dalšího posunu.',
      },
      {
        criterionCode: '5.1.2',
        level: 2,
        evidence: 'Kontext a oddíl Popisný komentář.',
        commentary:
          'Zpětná vazba je vztažena ke kritériu důkazu a jeho souvislosti s tvrzením. Výřez neumožňuje posoudit pravidelnost této praxe.',
      },
    ],
  },
  {
    publicId: 'kdyz-se-ozve-posmech',
    title: 'Když se po odpovědi ozve výsměch',
    type: 'transkript',
    duration: '3 min čtení',
    summary: 'Model krátké reakce na výsměch a návratu k domluveným pravidlům diskuse.',
    context: {
      subject: 'Občanská výchova',
      school: 'Střední škola',
      age: '15–18 let',
      situation: 'Během společné diskuse se po odpovědi žákyně ozve posměšný komentář.',
    },
    topics: ['bezpeci', 'vztahy', 'chyba'],
    phases: ['realizace'],
    questions: [
      'Co vyučující popisuje a na jaké pravidlo se odvolává?',
      'Jak může být zachována důstojnost všech aktérů?',
    ],
    body: [
      {
        heading: 'Zastavení situace',
        text: 'Vyučující: „Teď zazněl komentář, který zesměšňuje odpověď. Zastavíme se u toho. Máme domluveno, že můžeme nesouhlasit s myšlenkou, ale neshazujeme člověka.“',
      },
      {
        heading: 'Návrat k pravidlu',
        text: 'Vyučující připomene pravidlo diskuse a pojmenuje domluvený důsledek jeho nedodržení. Nabídne žákyni možnost doplnit odpověď teď, nebo se k ní vrátit později.',
      },
      {
        heading: 'Pokračování',
        text: 'Vyučující: „Kdo vidí tuto otázku jinak? Zkuste navázat na myšlenku a vysvětlit svůj důvod.“ Po hodině se k situaci s dotčenými žáky vrátí.',
      },
    ],
    limitations:
      'Model není univerzálním postupem pro řešení konfliktu. Neznáme předchozí vztahy, potřeby žáků ani následný vývoj situace.',
    links: [
      {
        criterionCode: '3.2.2',
        level: 2,
        evidence: 'Oddíly Zastavení situace a Návrat k pravidlu.',
        commentary:
          'Model ukazuje přímou reakci na narušení bezpečí a transparentní oporu v pravidlech. Nemůže doložit dlouhodobou konzistenci.',
      },
    ],
  },
  {
    publicId: 'ruzne-cesty-ke-stejnemu-cili',
    title: 'Různé cesty ke stejnému cíli',
    type: 'priprava',
    duration: '4 min čtení',
    summary:
      'Společný matematický cíl, různá míra opory a navazující otázka pro žáky, kteří jsou hotovi dříve.',
    context: {
      subject: 'Matematika',
      school: 'Střední škola',
      age: '15–18 let',
      situation:
        'Třída bude interpretovat graf lineární funkce. Žáci přicházejí s různými předchozími zkušenostmi.',
    },
    topics: ['diferenciace', 'materialy', 'cile'],
    phases: ['planovani'],
    questions: ['Co zůstává společné pro celou třídu?', 'Jaká opora odpovídá konkrétní potřebě?'],
    body: [
      {
        heading: 'Společný cíl',
        text: 'Žáci vysvětlí, co sklon přímky vyjadřuje v dané situaci, a své vysvětlení opřou o dvě hodnoty z grafu.',
      },
      {
        heading: 'Nabídka opory',
        text: 'V přípravě je varianta pracovního listu s vyznačenými souřadnicemi a pomocnými otázkami. Další varianta ponechává volbu bodů žákům. Rozdělení opory se opírá o předchozí krátký výstup, ne o trvalé skupiny „slabých“ a „silných“.',
      },
      {
        heading: 'Navazující úkol',
        text: 'Žáci, kteří vysvětlení dokončí, porovnají dvě přímky a navrhnou reálnou situaci, ve které by rozdílné sklony dávaly smysl.',
      },
      {
        heading: 'Ověření',
        text: 'Každý žák na závěr vysvětlí nový graf bez ohledu na to, jakou oporu při práci použil. Podle odpovědí bude upravena další příprava.',
      },
    ],
    limitations:
      'Příprava nedokládá účinnost opory v konkrétní třídě. Potřeby žáků je nutné průběžně zjišťovat a podporu upravovat.',
    links: [
      {
        criterionCode: '2.5.1',
        level: 3,
        evidence: 'Oddíly Nabídka opory a Navazující úkol.',
        commentary:
          'Model plánuje více podob podpory podle různých potřeb a předchozích zkušeností žáků.',
      },
      {
        criterionCode: '2.3.2',
        level: 2,
        evidence: 'Oddíl Nabídka opory.',
        commentary:
          'Varianta materiálu je upravena pro konkrétní potřebu čtení grafu. Nejde o ukázku dlouhodobého způsobu práce.',
      },
    ],
  },
  {
    publicId: 'od-pozorovani-k-dalsimu-kroku',
    title: 'Od pozorování k jednomu dalšímu kroku',
    type: 'reflexe',
    duration: '3 min čtení',
    summary: 'Model reflexe po hodině rozlišuje pozorování, interpretaci a malou změnu pro příště.',
    context: {
      subject: 'Napříč předměty',
      school: 'Střední škola',
      age: '15–18 let',
      situation:
        'Studující a provázející učitel společně mluví o rozložení příležitostí odpovídat během hodiny.',
    },
    topics: ['reflexe', 'rozvoj', 'spoluprace'],
    phases: ['reflexe'],
    questions: [
      'Které věty jsou popisem a které interpretací?',
      'Jaký důkaz dovolí posoudit další krok?',
    ],
    body: [
      {
        heading: 'Pozorování',
        text: '„Během prvních deseti minut odpověděli na sedm otázek čtyři stejní žáci. Ve dvojicích jsem slyšel odpovědi i od žáků, kteří v plénu nepromluvili.“',
      },
      {
        heading: 'Interpretace a nejistota',
        text: '„Možná pomohl čas na přípravu odpovědi. Z tohoto pozorování ale nevím, proč ostatní v plénu mlčeli ani zda jejich odpovědi byly věcně správné.“',
      },
      {
        heading: 'Další krok',
        text: '„Příště zařadím před první společnou otázkou krátkou individuální přípravu a sdílení ve dvojici. Provázející učitel si všimne, kdo potom dostane a využije příležitost promluvit.“',
      },
      {
        heading: 'Návrat k důkazům',
        text: 'Po další hodině společně porovnají konkrétní pozorování. Pokud se nic nezmění, prozkoumají jinou možnou příčinu mlčení a zvolí další pokus.',
      },
    ],
    limitations:
      'Model nezachycuje skutečný reflektivní rozhovor. Jeden výřez ani jeden pokus neprokazuje trvalou změnu profesního jednání.',
    links: [
      {
        criterionCode: '6.2.3',
        level: 2,
        evidence: 'Oddíly Pozorování a Interpretace a nejistota.',
        commentary: 'Reflexe se opírá o konkrétní popis a rozlišuje důkazy od možné interpretace.',
      },
      {
        criterionCode: '6.2.2',
        level: 2,
        evidence: 'Oddíly Další krok a Návrat k důkazům.',
        commentary:
          'Model spojuje malý rozvojový krok s plánem jeho vyhodnocení. Vazba vyžaduje metodické ověření.',
      },
    ],
  },
];
mkdirSync('src/content/examples', { recursive: true });
for (const e of examples) {
  const complete = {
    ...e,
    id: id(`example:${e.publicId}`),
    revisionId: id(`example-revision-v1:${e.publicId}`),
    status: 'demo',
    author: 'Autorský model pro digitální prototyp KRAAU',
    rights: {
      permissionStatus: 'original-demo',
      scope: 'Modelový text vytvořený pro prototyp; neobsahuje skutečné osobní údaje.',
    },
    reviewedAt: null,
    links: e.links.map((l, i) => ({
      ...l,
      id: id(`example-link-v1:${e.publicId}:${i + 1}`),
      criterionRevisionId: revision(l.criterionCode).id,
    })),
  };
  writeFileSync(
    `src/content/examples/${e.publicId}.v1.json`,
    JSON.stringify(complete, null, 2) + '\n',
  );
}
const transitionDrafts = [
  [
    '4.2.2',
    0,
    1,
    [
      'Mění se rozložení mluvení: prostor začínají dostávat někteří žáci.',
      'Důležité je všímat si, koho vyučující oslovuje a z jakého důvodu.',
    ],
    'Kdo v této situaci dostal příležitost promluvit?',
    ['komunikuji dominantně já', 'jen některé'],
  ],
  [
    '4.2.2',
    1,
    2,
    [
      'Popis se posouvá od některých žáků ke značné části třídy.',
      'Samotný počet odpovědí ještě neříká nic o jejich myšlenkové náročnosti.',
    ],
    'Jak se příležitosti promluvit rozdělily mezi různé žáky?',
    ['jen některé', 'značnou část'],
  ],
  [
    '4.2.2',
    2,
    3,
    [
      'K zapojení značné části třídy přibývá pozornost k tichým žákům.',
      'Popis zmiňuje aktivní hledání způsobu, jak jejich zapojení umožnit.',
    ],
    'Jaké různé cesty k účasti mohli využít žáci, kteří obvykle mlčí?',
    ['značnou část', 'Všímám si tzv. tichých žáků'],
  ],
  [
    '5.1.1',
    0,
    1,
    [
      'Obecné hodnocení začíná doplňovat popis konkrétních aspektů práce.',
      'V popisu úrovně 1 je tato praxe zatím příležitostná.',
    ],
    'Co se žák z komentáře dozví o své práci?',
    ['obecné hodnocení', 'konkrétním aspektům práce'],
  ],
  [
    '5.1.1',
    1,
    2,
    [
      'Popisná zpětná vazba se objevuje pravidelně.',
      'Komentář pojmenovává konkrétní části výkonu a to, co se daří nebo nedaří.',
    ],
    'Který konkrétní důkaz z práce žáka je v komentáři pojmenován?',
    ['jen příležitostně', 'pravidelně'],
  ],
  [
    '5.1.1',
    2,
    3,
    [
      'K popisu výkonu přibývá pojmenování pokroku a možnost dalšího posunu.',
      'Pozorování by mělo sledovat i to, jak žák s komentářem naloží.',
    ],
    'Dokáže žák na základě komentáře zvolit konkrétní úpravu své práce?',
    ['konkrétní části výkonu', 'jak mohou svůj výkon dále posunout'],
  ],
  [
    '2.1.2',
    0,
    1,
    ['U některých nastavených cílů už lze zjistit, zda jich žáci dosahují.'],
    'U kterého cíle lze popsat pozorovatelný důkaz jeho dosažení?',
    ['není možné ověřit', 'u některých lze ověřit'],
  ],
  [
    '2.1.2',
    1,
    2,
    [
      'Všechny cíle jsou formulovány jako ověřitelné.',
      'U některých je navíc předem plánován odpovídající způsob ověření.',
    ],
    'Ke kterému cíli je připraven konkrétní způsob ověření?',
    ['u některých lze ověřit', 'U některých plánuji'],
  ],
  [
    '2.1.2',
    2,
    3,
    ['Plán ověření nyní odpovídá všem nastaveným cílům.'],
    'Jak zvolený výstup dovolí ověřit jednotlivé cíle?',
    ['U některých', 'a odpovídající způsob ověření'],
  ],
];
mkdirSync('src/content/transitions', { recursive: true });
for (const [
  code,
  fromLevel,
  toLevel,
  summaryPoints,
  observationQuestion,
  phrases,
] of transitionDrafts) {
  const r = revision(code);
  const item = {
    id: id(`transition-v1:${code}:${fromLevel}:${toLevel}`),
    criterionRevisionId: r.id,
    fromLevel,
    toLevel,
    status: 'demo',
    summaryPoints,
    observationQuestion,
    highlights: phrases.map((phrase, i) => ({
      descriptorId: r.levels[i === 0 ? fromLevel : toLevel].id,
      phrase,
      occurrence: 0,
    })),
  };
  writeFileSync(
    `src/content/transitions/${code}.${fromLevel}-${toLevel}.v1.json`,
    JSON.stringify(item, null, 2) + '\n',
  );
}
console.log(
  `Created ${examples.length} explicitly synthetic examples and ${transitionDrafts.length} unapproved demonstration comments.`,
);
