import framework from '../data/framework.json';
import manifest from '../data/manifest.json';
import {
  exampleSchema,
  criterionSchema,
  type Example,
  type CriterionRevision,
  type Transition,
} from './schema';
import { related, areaSummaries, topics, situations } from '../data/editorial';

const revisions = Object.values(
  import.meta.glob('../content/criteria/*.json', { eager: true, import: 'default' }),
)
  .map((r) => criterionSchema.parse(r))
  .filter((r) => ['published', 'imported'].includes(r.status));
const examples = Object.values(
  import.meta.glob('../content/examples/*.json', { eager: true, import: 'default' }),
)
  .map((r) => exampleSchema.parse(r))
  .filter((e) => ['published', 'demo'].includes(e.status));
const transitions = Object.values(
  import.meta.glob('../content/transitions/*.json', { eager: true, import: 'default' }),
) as Transition[];
export type Area = (typeof framework.areas)[number];
export type Competency = (typeof framework.competencies)[number];
export type Criterion = (typeof framework.identities)[number] &
  CriterionRevision & { stableId: string };
const criteria: Criterion[] = framework.identities.map((identity) => {
  const revision = revisions.find((r) => r.criterionId === identity.id)!;
  return { ...identity, ...revision, stableId: identity.id };
});
export interface ContentRepository {
  listAreas(): Area[];
  listCompetencies(areaId?: string): Competency[];
  listCriteria(competencyId?: string): Criterion[];
  getCriterion(codeOrId: string): Criterion | undefined;
  getExample(publicId: string): Example | undefined;
  listExamples(): Example[];
  listRelated(code: string): typeof related;
  getTransition(revisionId: string, from: number, to: number): Transition | undefined;
}
export const repository: ContentRepository = {
  listAreas: () => framework.areas,
  listCompetencies: (areaId) =>
    framework.competencies.filter((c) => !areaId || c.areaId === areaId),
  listCriteria: (competencyId) =>
    criteria.filter((c) => !competencyId || c.competencyId === competencyId),
  getCriterion: (codeOrId) =>
    criteria.find((c) => c.publicCode === codeOrId || c.stableId === codeOrId),
  getExample: (publicId) => examples.find((e) => e.publicId === publicId),
  listExamples: () => examples,
  listRelated: (code) => related.filter((r) => r.sourceCode === code),
  getTransition: (revisionId, from, to) =>
    transitions.find(
      (t) =>
        t.criterionRevisionId === revisionId &&
        t.fromLevel === Math.min(from, to) &&
        t.toLevel === Math.max(from, to) &&
        ['published', 'demo'].includes(t.status),
    ),
};
export { framework, manifest, topics, situations, areaSummaries };
export function contextFor(criterion: Criterion) {
  const competency = framework.competencies.find((c) => c.id === criterion.competencyId)!;
  const area = framework.areas.find((a) => a.id === competency.areaId)!;
  return { competency, area };
}
