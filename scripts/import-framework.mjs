import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { stableId as id } from './stable-id.mjs';

const source = JSON.parse(readFileSync('src/data/imported/framework-v1.json', 'utf8'));
const editionId = id('edition');
const taxonomy = {
  1.1: ['obor', 'zdroje', 'technologie'],
  1.2: ['obor', 'porozumeni', 'diferenciace'],
  2.1: ['cile', 'hodnoceni'],
  2.2: ['metody', 'zapojeni'],
  2.3: ['materialy', 'diferenciace'],
  2.4: ['cas'],
  2.5: ['diferenciace'],
  3.1: ['bezpeci', 'komunikace', 'vztahy'],
  3.2: ['bezpeci', 'vztahy'],
  4.1: ['cile', 'porozumeni'],
  4.2: ['zapojeni', 'komunikace', 'metody'],
  4.3: ['porozumeni', 'hodnoceni', 'diferenciace'],
  4.4: ['samostatnost', 'reflexe'],
  5.1: ['zpetna-vazba', 'hodnoceni'],
  5.2: ['hodnoceni', 'samostatnost'],
  5.3: ['zpetna-vazba', 'chyba', 'komunikace'],
  6.1: ['spoluprace'],
  6.2: ['reflexe', 'rozvoj'],
  6.3: ['pece-o-sebe'],
};
const phases = (area) =>
  area === '1'
    ? ['planovani', 'realizace']
    : area === '2'
      ? ['planovani']
      : area === '6'
        ? ['reflexe']
        : ['realizace', 'reflexe'];
const areas = source.areas.map((a, order) => ({
  id: id(`area:${a.id}`),
  code: a.id,
  title: a.title,
  intro: a.intro,
  order,
  sourcePage: a.sourcePage,
  accentKey: `area-${a.id}`,
}));
const competencies = source.competences.map((c, order) => ({
  id: id(`competency:${c.id}`),
  areaId: id(`area:${c.areaId}`),
  code: c.id,
  title: c.title,
  order,
}));
const identities = source.criteria.map((c, order) => ({
  id: id(`criterion:${c.id}`),
  competencyId: id(`competency:${c.competenceId}`),
  publicCode: c.id,
  order,
  aliases: [c.id.replaceAll('.', '-')],
  topics: taxonomy[c.competenceId],
  phases: phases(c.competenceId[0]),
}));
mkdirSync('src/content/criteria', { recursive: true });
for (const c of source.criteria) {
  const revision = {
    id: id(`criterion-revision-v1:${c.id}`),
    criterionId: id(`criterion:${c.id}`),
    editionId,
    title: c.title,
    mindset: c.mindset,
    status: 'imported',
    sourceLocator: { documentId: id('source'), page: c.sourcePage },
    levels: c.levels.map((text, level) => ({
      id: id(`descriptor-v1:${c.id}:${level}`),
      level,
      text,
    })),
  };
  writeFileSync(`src/content/criteria/${c.id}.v1.json`, JSON.stringify(revision, null, 2) + '\n');
}
const aliases = [
  ...source.areas.map((a) => ({
    oldPath: `/oblasti/${a.id}/`,
    targetStableId: id(`area:${a.id}`),
    redirectType: 301,
  })),
  ...source.competences.map((c) => ({
    oldPath: `/kompetence/${c.id.replaceAll('.', '-')}/`,
    targetStableId: id(`competency:${c.id}`),
    redirectType: 301,
  })),
  ...source.criteria.map((c) => ({
    oldPath: `/kriteria/${c.id.replaceAll('.', '-')}/`,
    targetStableId: id(`criterion:${c.id}`),
    redirectType: 301,
  })),
];
writeFileSync(
  'src/data/framework.json',
  JSON.stringify(
    {
      schemaVersion: 1,
      editionId,
      areas,
      competencies,
      identities,
      aliases,
      methodology: source.methodology,
      editorialCorrections: source.editorialCorrections,
    },
    null,
    2,
  ) + '\n',
);
writeFileSync(
  'src/data/manifest.json',
  JSON.stringify(
    {
      schemaVersion: 1,
      contentReleaseId: 'kraau-prototype-2-2026-10-02',
      frameworkEditionId: editionId,
      title: 'Kompetenční rámec studentů a studentek učitelství pro střední školy',
      versionLabel: source.version,
      importedAt: '2026-10-02',
      methodologicalApproval: null,
      sourceDocument: {
        id: id('source'),
        title: 'Kompetenční rámec studentů a studentek učitelství pro střední školy',
        file: 'kompetencni-ramec-ss.pdf',
        edition: 'Dodaný pracovní dokument',
        fileHash: createHash('sha256')
          .update(readFileSync('Kompetenční rámec SŠ.pdf'))
          .digest('hex'),
        licenseInfo: 'Oprávnění k veřejné distribuci musí potvrdit obsahový garant.',
      },
      prototypeNotice:
        'Import pracovního rámce; redakční doprovodný obsah čeká na metodické ověření.',
    },
    null,
    2,
  ) + '\n',
);
console.log(
  `Imported ${areas.length} areas, ${competencies.length} competencies, ${identities.length} criterion revisions and ${aliases.length} legacy routes.`,
);
