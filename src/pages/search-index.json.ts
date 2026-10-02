import type { APIRoute } from 'astro';
import { repository, contextFor, topics, situations } from '../lib/repository';
import { criterionUrl, displayTitle, exampleUrl } from '../lib/urls';
import type { SearchDocument } from '../lib/search';
export const GET: APIRoute = () => {
  const criteria: SearchDocument[] = repository.listCriteria().map((c) => {
    const { competency, area } = contextFor(c);
    return {
      id: c.stableId,
      type: 'kriteria',
      code: c.publicCode,
      title: displayTitle(c.title),
      url: criterionUrl(c.publicCode),
      context: `Oblast ${area.code} · ${area.title} / ${competency.code} ${competency.title}`,
      excerpt: c.levels[2].text,
      body: [...c.levels.map((l) => l.text), c.mindset].join(' '),
      area: [area.code],
      phase: c.phases,
      topic: c.topics,
      exampleType: [],
      subject: [],
      school: [],
      age: [],
      aliases: [
        ...c.aliases,
        ...topics.filter((t) => c.topics.includes(t.slug)).map((t) => t.title),
      ],
      situations: situations
        .filter((s) => s.codes.includes(c.publicCode))
        .map((s) => ({
          title: s.title,
          aliases: s.aliases,
          explanation: s.explanation,
          order: s.codes.indexOf(c.publicCode),
        })),
    };
  });
  const examples: SearchDocument[] = repository
    .listExamples()
    .map((e) => ({
      id: e.publicId,
      type: 'ukazky',
      code: '',
      title: e.title,
      url: exampleUrl(e.publicId),
      context: `${e.context.subject} · ${e.context.school} · ${e.context.age}`,
      excerpt: e.summary,
      body: [
        e.context.situation,
        ...e.body.map((p) => p.text),
        ...e.links.map((l) => l.commentary),
      ].join(' '),
      area: [
        ...new Set(
          e.links.map((l) => contextFor(repository.getCriterion(l.criterionCode)!).area.code),
        ),
      ],
      phase: e.phases,
      topic: e.topics,
      exampleType: [e.type],
      subject: [e.context.subject],
      school: [e.context.school],
      age: [e.context.age],
      aliases: topics.filter((t) => e.topics.includes(t.slug)).map((t) => t.title),
      situations: [],
    }));
  return new Response(JSON.stringify({ schemaVersion: 1, documents: [...criteria, ...examples] }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
