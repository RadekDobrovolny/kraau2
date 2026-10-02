export const guides = [
  {
    slug: 'vlastni-vyuka',
    title: 'Chci reflektovat svoji výuku',
    icon: 'notebook-pen',
    summary: 'Vraťte se ke konkrétní situaci a promyslete, co vyzkoušet příště.',
    audience: 'Pro samostatnou reflexi nebo rozhovor po hodině',
    duration: '10–15 minut',
    query: 'Chci reflektovat svoji výuku',
    question: 'Co mi tato situace říká o učení žáků a co o ní ještě nevím?',
    steps: [
      [
        'Vyberte jednu situaci',
        'Zaměřte se na krátký konkrétní výřez hodiny, který vás zaujal. Nesnažte se zhodnotit všechno najednou.',
      ],
      [
        'Vraťte se k pozorování',
        'Pojmenujte, co jste viděli a slyšeli. Oddělte popis situace od svého vysvětlení a od domněnek o žácích.',
      ],
      [
        'Najděte relevantní kritérium',
        'Hledejte podle situace nebo tématu. Přečtěte si všechny popisy jednání a zvažte, který vám pomáhá situaci pochopit.',
      ],
      [
        'Promyslete jednu změnu',
        'Zvolte malý pozorovatelný krok. Předem si řekněte, jaký důkaz bude užitečný při příští reflexi.',
      ],
    ],
  },
  {
    slug: 'pozorovani',
    title: 'Pozoroval/a jsem výuku někoho jiného',
    icon: 'scan-eye',
    summary: 'Rozlište to, co jste viděli, od toho, jak si situaci vysvětlujete.',
    audience: 'Pro studující, provázející učitele a kolegiální pozorování',
    duration: '10–15 minut',
    query: 'pozorování výuky',
    question:
      'Které konkrétní pozorování podporuje mou interpretaci a jaké jiné vysvětlení je možné?',
    steps: [
      [
        'Vyjasněte zaměření',
        'Domluvte se s vyučujícím, na kterou situaci nebo jednání se budete soustředit.',
      ],
      [
        'Popište konkrétní výřez',
        'Zachyťte otázky, odpovědi, zadání nebo jiné pozorovatelné jednání. Nepřipisujte aktérům motivy, které neznáte.',
      ],
      [
        'Propojte pozorování s rámcem',
        'Najděte kritéria, která výřez pomáhají pojmenovat. Čtěte je v kontextu, jako podklad pro otázky.',
      ],
      [
        'Otevřete rozhovor',
        'Ověřte svou interpretaci s vyučujícím. Zeptejte se na jeho záměr i na to, co situaci předcházelo.',
      ],
    ],
  },
  {
    slug: 'zpetna-vazba',
    title: 'Připravuji zpětnou vazbu studentovi',
    icon: 'messages-square',
    summary: 'Připravte rozhovor opřený o pozorování a otázky.',
    audience: 'Pro provázející učitele a VŠ vzdělavatele',
    duration: '15 minut',
    query: 'zpětná vazba studentovi',
    question: 'Na co se studujícího zeptat, abych porozuměl/a jeho rozhodnutí?',
    steps: [
      [
        'Vraťte se ke společnému záměru',
        'Pojmenujte téma, které jste si se studujícím domluvili. Zjistěte, co by chtěl z rozhovoru získat.',
      ],
      [
        'Vyberte několik důkazů',
        'Připravte konkrétní pozorování z hodiny. Oddělte je od svých interpretací.',
      ],
      [
        'Čtěte popisy společně',
        'Najděte relevantní kritérium. Ptejte se, co v popisech odpovídá situaci a co v pozorovaném výřezu chybí.',
      ],
      [
        'Nechte zaznít uvažování studujícího',
        'Ptejte se na záměr, rozhodnutí a nejistoty. Prostor pro jeho vysvětlení je součástí zpětné vazby.',
      ],
      [
        'Domluvte další krok',
        'Pomozte studujícímu zvolit malou změnu a způsob, jak se k ní při dalším rozhovoru vrátíte.',
      ],
    ],
  },
  {
    slug: 'dalsi-krok',
    title: 'Chci si stanovit rozvojový krok',
    icon: 'route',
    summary: 'Vyberte jednu malou změnu a způsob, jak si všimnout jejího účinku.',
    audience: 'Pro každého, kdo chce navázat na reflexi výuky',
    duration: '10 minut',
    query: 'Chci si stanovit rozvojový krok',
    question: 'Co přesně příště udělám jinak a čeho si budu všímat?',
    steps: [
      [
        'Začněte konkrétní situací',
        'Vycházejte z něčeho, co jste ve své výuce pozorovali. Zvolte téma, které má pro vás a pro učení žáků smysl.',
      ],
      [
        'Prozkoumejte popisy jednání',
        'Porovnejte dvě relevantní úrovně. Zvažte, které jednání by mohlo být v daném kontextu užitečné.',
      ],
      [
        'Zmenšete krok na jeden pokus',
        'Formulujte, co v příští hodině uděláte. Vyberte změnu, kterou lze vyzkoušet a pozorovat.',
      ],
      [
        'Domluvte návrat k důkazům',
        'Pojmenujte, čeho si všimnete a kdy se k pokusu vrátíte. Můžete přizvat provázejícího učitele nebo kolegu.',
      ],
    ],
  },
];
export const needs = [
  {
    title: 'Chci najít konkrétní téma',
    summary: 'Vstupte do rámce přes situaci z vaší výuky.',
    path: 'hledat/',
    icon: 'search',
  },
  {
    title: 'Chci prozkoumat rámec',
    summary: 'Projděte oblasti, kompetence a jednotlivá kritéria.',
    path: 'ramec/',
    icon: 'compass',
  },
  ...guides.map((g) => ({ ...g, path: `jak-pracovat/${g.slug}/` })),
];
