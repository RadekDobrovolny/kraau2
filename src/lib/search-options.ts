import { repository, topics } from './repository';
import { phaseLabels, typeLabels } from '../data/editorial';
import type { FilterOptions } from './search';
export function searchOptions(): FilterOptions {
  const examples = repository.listExamples();
  const unique = (field: 'subject' | 'school' | 'age') =>
    [...new Set(examples.map((e) => e.context[field]))]
      .sort((a, b) => a.localeCompare(b, 'cs'))
      .map((value) => ({ value, label: value }));
  return {
    area: repository.listAreas().map((a) => ({ value: a.code, label: `${a.code} · ${a.title}` })),
    phase: Object.entries(phaseLabels).map(([value, label]) => ({ value, label })),
    topic: topics.map((t) => ({ value: t.slug, label: t.title })),
    contentType: [
      { value: 'kriteria', label: 'Kritéria' },
      { value: 'ukazky', label: 'Ukázky' },
    ],
    exampleType: Object.entries(typeLabels)
      .filter(([value]) => examples.some((e) => e.type === value))
      .map(([value, label]) => ({ value, label })),
    subject: unique('subject'),
    school: unique('school'),
    age: unique('age'),
  };
}
